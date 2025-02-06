import express from "express"
import dotenv from "dotenv"
import route from "./routes/auth.routes.js"
import productRoute from "./routes/product.routes.js"
import cartRoute from "./routes/cart.routes.js"
import { ConnectDb } from "./lib/ConnectDb.js"
import cookieParser from "cookie-parser"
import router from "./routes/Coupon.routes.js"
import path from "path"
import paymentRoute from "./routes/paymentRoute.js"
import cors from "cors"
import analaticsRoute from "./routes/Analatics.routes.js"
dotenv.config()

let app = express()
let PORT  = process.env.PORT || 5000
let __dirname = path.resolve()
app.use(express.json({limit : "10mb"}))
app.use(cookieParser())
app.use(cors({
    origin : "http://localhost:5173",
    credentials : true
}))
app.use("/api/auth",route)
app.use("/api/product",productRoute)
app.use("/api/cart",cartRoute)
app.use("/api/coupon",router)
app.use("/api/payment",paymentRoute)
app.use("/api/analatics",analaticsRoute)

if (process.env.is_production === "production"){
    app.use(express.static(__dirname,"/frontend/dist"))

    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,"frontend","dist","index.html"))
    })
}

app.listen(PORT,()=>{
    ConnectDb()

    console.log("Listening to http://localhost:"+PORT);
    
})