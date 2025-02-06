import express from "express"
import { getCoupan, validateToken } from "../controller/coupan.controller.js"
import { protectedRoute } from "../middleware/auth.middleware.js"

let router = express.Router()

router.get("/getCoupan",protectedRoute,getCoupan)
router.post("/validateCoupon",protectedRoute,validateToken)


export default router