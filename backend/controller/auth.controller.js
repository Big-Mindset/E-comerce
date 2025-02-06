import User from "../models/user.model.js"
import dotenv from "dotenv"
dotenv.config()
import { generateToken, storeAccessTOKEN, storeRefreshToken } from "../utils/generateToken.js"
import jwt from "jsonwebtoken"
import redis from "../lib/redis.js"
export let SignUp = async (req, res) => {
    try {
        let { name, email, password } = req.body
        if (!name || !email || !password) {
            return res.json({ success: false, message: "Name,Email and Password are required try Again" })
        }
        let user = await User.findOne({ email })
        if (user) {
            return res.json({ success: false, message: "Account already exist with this Email" })
        }

        let newUser = await User.create({
            name,
            email,
            password
        })
        let { accessToken, refreshToken } = await generateToken(newUser._id)
        await storeRefreshToken(newUser._id, refreshToken)
        await storeAccessTOKEN(res, accessToken)
        await storeRefreshToken(res, refreshToken)
        return res.json({ success: true, message : "SignUp successfully",user : {name: newUser.name, email: newUser.email, id: newUser._id, role: newUser.role} })
    } catch (error) {
        return res.json({ success: false, message: "Network Problem", error: error.message })
    }
}

export let login = async (req, res) => {
    try {
        let { email, password } = req.body
        if (!email || !password) {
            return res.json({ success: false, message: "Email or passowrd are required" })
        }
        let user = await User.findOne({ email })
        if (!user) {
            return res.json({ success: false, message: "Account not Available" })
        }
        let Match = await user.comparePassword(password)
        if (!Match) {
            return res.json({ success: false, message: "Invalid email or password" })
        }
        let { accessToken, refreshToken } = await generateToken(user._id)

        await storeRefreshToken(user._id, refreshToken)
        await storeAccessTOKEN(res, accessToken)
        await storeRefreshToken(res, refreshToken)
        return res.json({ success: true, message : "Login successfully",user : {name: user.name, email: user.email, id: user._id, role: user.role} })
    } catch (error) {
        return res.json({ success: false, message: "Network Problem", error: error.message })

    }
}

export let logout = async (req, res) => {
    try {
        let refreshToken = req.cookies["refresh-Token"]
        if (refreshToken) {
            let decodedToken = await jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY)
            await redis.del(`refresh-Token:${decodedToken.userId}`)
        }
        res.clearCookie("access-Token")
        res.clearCookie("refresh-Token")
        return res.json({ success: true, message: "Logout Successfully" })
    } catch (error) {
        return res.json({ success: false, message: "Network Error", error: error.message })
    }
}

export let refreshToken = async (req, res) => {
    try {

        let refreshToken = req.cookies["refresh-Token"]
        if (refreshToken) {
            let decodedToken = await jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY)
            let refreshTOKEN = await redis.get(`refresh-Token:${decodedToken.userId}`)
            if (refreshTOKEN !== refreshTOKEN) {
                return res.json({ success: false, message: "invalid Token provided" })
            }
            let { accessToken } = await generateToken(decodedToken.userId)
            await storeAccessTOKEN(res, accessToken)
            return res.json({success  :true , message : "Token Refreshed successfully"})
        }else{
        return res.json({ success: false, message: "not Authorized please login or signup Again"})

        }

    } catch (error) {
        return res.json({ success: false, message: "Network Error", error: error.message })
    }
}

export let userProfile =  (req,res)=>{
    try {
        return res.json({success :true , user :  req.user})
    } catch (error) {
        return res.json({success : false , message : "User is not authorized"})
    }
}