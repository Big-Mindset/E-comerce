import express from "express"
import { login, logout, SignUp , refreshToken , userProfile} from "../controller/auth.controller.js"
import { protectedRoute } from "../middleware/auth.middleware.js"

let route = express.Router()

route.post("/signup",SignUp)
route.post("/login",login)
route.post("/logout",logout)
route.post("/refresh-token",refreshToken)
route.get("/user-profile",protectedRoute,userProfile)

export default route