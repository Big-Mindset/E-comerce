import jwt from "jsonwebtoken"
import User from "../models/user.model.js"

export let protectedRoute = async (req,res,next)=>{
    try {
        let accessToken = req.cookies["access-Token"]
        if (!accessToken){
            return res.json({success :false , message : "You are not authorized"})
        }
        try {
            
            let decodedToken = jwt.verify(accessToken,process.env.ACCESS_TOKEN_KEY)
            if (!decodedToken){
                return res.json({success :false , message : "Invalid Token Provided"})
            }
            let user = await User.findById(decodedToken.userId).select("-password")
            req.user = user
        } catch (error) {
            if (error.name === "TokenExpiredError"){
                return res.json({success :false , message : "Token Expired"})
            }else{
                throw error
            }
        }
        next()
    } catch (error) {
        return res.json({success  :false , message : "Network error" , error : error.message})
    }
}

export let AdminRoute = async (req,res,next)=>{
    try {
        let user = req.user
        if (user && user.role === "admin"){
            next()
        }else{
            return res.json({success :true , message : "Access denied - Admin Only"})
        }
    } catch (error) {
        return res.json({success :false , message : "Problem in your Network" , error : error.message})
        
    }
}