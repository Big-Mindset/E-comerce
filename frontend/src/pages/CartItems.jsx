import { Gift, InfoIcon, Minus, Plus, Trash2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { cartStore } from '../store/cart.store'
import EmptyCart from '../components/EmptyCart'
import { motion } from 'framer-motion'
import RecommendedProducts from '../components/RecommendedProducts'
import { productStore } from '../store/product.store'
import {loadStripe} from "@stripe/stripe-js"
import axiosInstance from '../store/axios'
import toast from 'react-hot-toast'
const CartItems = () => {
    let { total, subtotal, cartItems, deleteFromCart, updateFromCart ,coupon,ValidateCoupon} = cartStore()
    let savings = subtotal - total
    let Subtotal = subtotal?.toFixed(2)
    let Total = total?.toFixed(2)
    let Saving = savings?.toFixed(2)
    const [giftInput, setgiftInput] = useState("")
    let {getRecommendedProduct} = productStore()
    let {getCoupon} = cartStore()
    let deleteCart = async (item) => {
        await deleteFromCart(item)
    }
    let handleUpdate = async (item, quantity) => {
        await updateFromCart(item, quantity)

    }
   
    useEffect(() => {
        getRecommendedProduct()
        getCoupon()
    }, [getRecommendedProduct,getCoupon])

    let handleGift = async ()=>{
        await ValidateCoupon(giftInput)
    }
    let StripePromise = loadStripe("pk_test_51QmE6uKDgF5TcHwzZbir54iLWp63M67Bnj5zqAlRj73aoBd8xGJPShRtKT4QD8HQBmAvVB4p2QU5iEan5LF4vLPy00jy9Gidhm")
    let handlePayment = async ()=>{
        let stripe =  await StripePromise
        let {data} = await axiosInstance.post("/payment/create-ckeckout-session",{products : cartItems,couponCode : coupon ? coupon.code : null})
        if (data.success){
        let redierct = await stripe.redirectToCheckout({
            sessionId : data.id
        })
        
        if (redierct.error){
            console.log(redierct.error);
        }
        }else{
            toast.error(data.message)
        }
    }
    return (
        <div className="pt-20 min-h-screen bg-gradient-to-br from-indigo-900 via-slate-900 to-purple-900 text-slate-100">
            {cartItems.length > 0 ?
                <div className="mt-8 grid grid-cols-3 md:grid-cols-[2fr,1fr] gap-8 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Cart Item Section */}
                    <div className="space-y-6 col-span-2">
                        <h2 className="text-3xl font-bold text-white mb-6">Shopping Cart {cartItems.length}</h2>

                        <div className="flex  overflow-y-scroll scrollbar h-[50vh] scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-300  flex-col space-y-1.5">
                            {cartItems?.map((item,idx) => {

                                return <motion.div
                                key={item._id} 
                                className="flex bg-gray-900/90 rounded-xl p-6 border border-gray-700 shadow-2xl shadow-indigo-900/20 flex-col
                                md:flex-row gap-8 items-start w-full"
                                  initial={{y : 30 , opacity : 0}}
                                  animate={{opacity :  1 , y: 0}}
                                  transition={{duration : 0.5,delay : 0.1 * idx}}
                                  
                                  >
                                    {/* Product Image */}
                                    <div className="relative w-full md:w-48 h-40 rounded-xl overflow-hidden shadow-lg">
                                        <img
                                            src={item.image}
                                            className="object-cover w-full h-full"
                                            alt="Premium Wireless Headphones"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                                    </div>

                                    {/* Product Details */}
                                    <div className="flex-1 w-full space-y-4">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h1 className="text-2xl font-semibold text-white">{item.name}</h1>
                                                <p className="text-gray-400 text-sm mt-4 tracking-wide">{item.category}</p>
                                            </div>
                                            <button onClick={() => deleteCart(item)} className="text-red-400 hover:text-red-300 transition-colors p-2 -mt-2 -mr-2">
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>

                                        {/* Price & Quantity */}
                                        <div className="flex flex-wrap mt-10 items-center justify-between gap-4">
                                            <div className="text-2xl font-bold text-indigo-400">${item.prize}</div>
                                            <div className="flex items-center gap-3 bg-gray-800 rounded-lg px-4 py-2">
                                                <button
                                                    onClick={() => { handleUpdate(item, item.quantity - 1) }}
                                                    className="w-8 h-8 flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-white rounded-md transition-all"
                                                >
                                                    <Minus className="w-4 h-4" />
                                                </button>
                                                <span className="text-xl font-medium w-8 text-center">{item.quantity}</span>
                                                <button
                                                    onClick={() => { handleUpdate(item, item.quantity + 1) }}
                                                    className="w-8 h-8 flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-white rounded-md transition-all">
                                                    <Plus className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>

                                    </div>
                                </motion.div>
                            })}
                        </div>

                    </div>

                    {/* Checkout Summary */}
                    <div className="space-y-6 mt-16">
                        <motion.div
                            initial={{ y: 40, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="bg-gray-900/90 rounded-xl p-6 border border-gray-700 shadow-2xl shadow-indigo-900/20">
                            <h2 className="text-2xl font-semibold text-white mb-6">Order Summary</h2>
                            <div className="space-y-4">
                                <div className="flex justify-between text-gray-300">
                                    <span>Subtotal:</span>
                                    <span>{Subtotal}</span>
                                </div>
                                <div className="flex justify-between text-gray-300">
                                    <span>Shipping:</span>
                                    <span className="text-green-400">FREE</span>
                                </div>
                                <div className="flex justify-between text-gray-300">
                                    <span>Savings:</span>
                                   {Saving &&<span className="text-green-400">{Saving}</span>}
                                </div>
                                <div className="pt-4 border-t border-gray-800">
                                    <div className="flex justify-between text-white font-bold text-lg">
                                        <span>Total:</span>
                                        <span className="text-2xl text-indigo-400">${Total}</span>
                                    </div>
                                </div>
                            </div>
                            <button
                            onClick={handlePayment}
                            className="w-full mt-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-xl text-white font-semibold text-lg transition-all transform hover:scale-[1.02]">
                                Proceed to Checkout
                            </button>
                            {coupon &&
                            <div className='mt-2'>
                                
                                <p>Your Available Coupon :</p>
                                <p>{coupon.code} - {coupon.discountPercentage}%off</p>
                            </div>
}
                        </motion.div>

                        <motion.div
                            initial={{ y: 40, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                            className="bg-gray-900/90 rounded-xl p-6 border border-gray-700 shadow-2xl shadow-indigo-900/20">
                            <h2 className="text-xl font-semibold text-white mb-4">Apply Discount</h2>
                            <div className="relative">
                                <div className='flex bg-gray-800/50 border items-center border-gray-700 duration-150  rounded-lg px-4 py-2  text-white placeholder-gray-500 focus-within:outline-none focus-within:ring-2 focus-within-indigo-500'>

                                <input
                                    type="text"
                                    placeholder="Enter coupon code"
                                    className="w-full border-none outline-none"
                                    value={giftInput}
                                    onChange={(e)=>setgiftInput(e.target.value)}
                                    />
                                <button onClick={handleGift} className="p-2 text-gray-400 justify-self-end hover:text-indigo-400 transition-colors">
                                    <Gift className="w-5 h-5" />
                                </button>
                                    </div>
                            <div className="mt-4 text-sm text-gray-400">
                                <p className="flex items-center gap-2">
                                    <InfoIcon className="w-4 h-4 text-blue-400" />
                                    Available coupons will be shown here during checkout
                                </p>
                            </div>
                            </div>
                        </motion.div>
                    </div>
                        <RecommendedProducts/>
                </div>
                : <EmptyCart />}
        </div>

    )
}

export default CartItems