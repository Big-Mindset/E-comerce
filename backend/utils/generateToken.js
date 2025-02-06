import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import redis from "../lib/redis.js"
dotenv.config()
export let generateToken = async (userId)=>{
    let accessToken = await jwt.sign({userId : userId.toString()},process.env.ACCESS_TOKEN_KEY,{
        expiresIn : "15m"
    })
    let refreshToken = await jwt.sign({userId : userId.toString()},process.env.REFRESH_TOKEN_KEY,{
        expiresIn : "7d"
    })
    return {accessToken , refreshToken}
}

export let storeRefreshToken = async (userId , refreshToken)=>{

    
    let userID = userId.toString()
    await redis.set(`refresh-Token:${userID}`,refreshToken,"EX",7*24*60*60)
    
}

export let storeRefreshTOKEN = async (res,refreshToken)=>{
    res.cookie("refresh-Token",refreshToken,{
        httpOnly : true,
        secure : process.env.is_production === "production",
        maxAge : 7 * 24 * 60 * 60 * 1000,
        sameSite : "strict"
    })
    
}
export let storeAccessTOKEN = async (res,accessToken)=>{
    res.cookie("access-Token",accessToken,{
        httpOnly : true,
        secure : process.env.is_production === "production",
        maxAge : 15 *  60 * 1000,
        sameSite : "strict"
    })
    
}