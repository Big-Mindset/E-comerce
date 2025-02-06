import express from "express";
import { protectedRoute } from "../middleware/auth.middleware.js";
import { checkoutSuccess, createCheckoutSession } from "../controller/payment.controller.js";

let router = express.Router()

router.post("/create-ckeckout-session",protectedRoute,createCheckoutSession)
router.post("/checkout-success",protectedRoute,checkoutSuccess)

export default router