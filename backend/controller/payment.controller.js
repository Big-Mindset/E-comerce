import cookieParser from "cookie-parser"
import { stripe } from "../lib/stripe.js"
import Coupon from "../models/coupon.model.js"
import dotenv from "dotenv"
import Order from "../models/payment.model.js"
dotenv.config()
export let createCheckoutSession = async (req, res) => {
    try {
        const { products, couponCode } = req.body;
        console.log(products);
        
        // Validate products
        if (!Array.isArray(products) || products.length === 0) {
            return res.status(400).json({ success: false, message: "Invalid products data" });
        }

        // Calculate total amount
        let lineItems = products.map(item => {
            if (!item.prize || !item.name || !item.image) {
                throw new Error("Invalid product structure");
            }
            
            return {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: item.name,
                        images: [item.image]
                    },
                    unit_amount: Math.round(item.prize * 100)
                },
                quantity: item.quantity || 1
            };
        });

        // Coupon validation
        let coupon = null;
        if (couponCode) {
            coupon = await Coupon.findOne({
                code: couponCode,
                isActive: true,
                exipirationDate: { $gt: new Date() }
            });

            if (!coupon) {
                return res.status(400).json({ 
                    success: false, 
                    message: "Invalid or expired coupon code" 
                });
            }
        }

        // Create Stripe session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: `${process.env.CLIENT_URL}/purchase-success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.CLIENT_URL}/purchase-failed`,
            discounts: coupon ? [{
                coupon: await createStripeCoupon(coupon.discountPercentage)
            }] : [],
            metadata: {
                userId: req.user._id.toString(),
                couponCode: coupon?.code || "",
                products: JSON.stringify(products.map(p => ({
                    id: p._id,
                    quantity: p.quantity,
                    price: p.prize
                })))
            }
        });

        // Create reward coupon if applicable
        if (session.amount_total >= 20000) {
            await createRewardCoupon(req.user._id);
        }

        return res.json({ 
            success: true, 
            id: session.id,
            amountTotal: session.amount_total / 100
        });

    } catch (error) {
        console.error("Checkout Error:", error);
        return res.status(500).json({ 
            success: false, 
            message: "Checkout processing failed",
            error: error.message 
        });
    }
};

// Helper function to create reward coupon
const createRewardCoupon = async (userId) => {
    try {
        await Coupon.deleteMany({ userId }); // Delete existing user coupons
        
        const newCoupon = new Coupon({
            code: `GIFT${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
            exipirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
            userId,
            discountPercentage: 10,
            isActive: true
        });

        await newCoupon.save();
        return newCoupon;

    } catch (error) {
        console.error("Coupon Creation Error:", error);
        throw new Error("Failed to create reward coupon");
    }
};

// Stripe coupon creation
const createStripeCoupon = async (discountPercentage) => {
    try {
        const coupon = await stripe.coupons.create({
            percent_off: discountPercentage,
            duration: "once"
        });
        return coupon.id;
    } catch (error) {
        console.error("Stripe Coupon Error:", error);
        throw new Error("Failed to create Stripe coupon");
    }
};

export let checkoutSuccess = async (req, res) => {
    try {
        const { sessionId } = req.body;
        console.log("This is"+sessionId);
        
        // Validate session ID
        if (!sessionId) {
            return res.status(400).json({ 
                success: false, 
                message: "Missing session ID" 
            });
        }

        // Retrieve Stripe session
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        
        // Validate payment status
        if (session.payment_status !== "paid") {
            return res.status(400).json({ 
                success: false, 
                message: "Payment not completed" 
            });
        }

        // Deactivate coupon if used
        if (session.metadata.couponCode) {
            await Coupon.findOneAndUpdate(
                { code: session.metadata.couponCode },
                { isActive: false },
                { new: true }
            );
        }

        // Create order
        const products = JSON.parse(session.metadata.products);
        
        const newOrder = new Order({
            products: products.map(product => ({
                product: product.id,
                quantity: product.quantity,
                price: product.price
            })),
            totalAmount: session.amount_total / 100,
            stripSessionId: sessionId,
            user: session.metadata.userId
        });

        await newOrder.save();

        return res.json({ 
            success: true, 
            message: "Payment successful",
            order: newOrder 
        });

    } catch (error) {
        console.error("Checkout Success Error:", error);
        return res.status(500).json({ 
            success: false, 
            message: "Order processing failed",
            error: error.message 
        });
    }
};