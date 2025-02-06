import express from "express"
import { AdminRoute, protectedRoute } from "../middleware/auth.middleware.js"
import { getAnalatics } from "../controller/analarics.routes.js"

let router = express.Router()

router.get("/getAnalatics",protectedRoute,AdminRoute,getAnalatics)

export default router