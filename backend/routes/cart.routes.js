import express from "express"
import { addCartItem, deleteAllfromCart, getCartItems, updateQuantity } from "../controller/cart.routes.js"
import { protectedRoute } from "../middleware/auth.middleware.js"

let route = express.Router()

route.get("/",protectedRoute,getCartItems)
route.post("/",protectedRoute,addCartItem)
route.put("/:id",protectedRoute,updateQuantity)
route.delete("/:id",protectedRoute,deleteAllfromCart)


export default route