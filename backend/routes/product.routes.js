import express from "express"
import { createProduct, deleteProduct, featuredProducts, getAllProducts , RecommendedProducts , getProductByCetegory , changeRole } from "../controller/product.controller.js"
import { AdminRoute, protectedRoute } from "../middleware/auth.middleware.js"

let route = express.Router()

route.get("/getAllProducts",protectedRoute,AdminRoute,getAllProducts)
route.get("/featuredProducts",featuredProducts)
route.put("/changeRole/:id",changeRole)
route.post("/createProduct",protectedRoute,AdminRoute,createProduct)
route.get("/getRecommendedProducts",RecommendedProducts)
route.delete("/:id",protectedRoute,AdminRoute,deleteProduct)
route.get("/category/:category",getProductByCetegory)
export default route