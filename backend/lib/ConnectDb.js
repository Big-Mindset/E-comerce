import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()
export let ConnectDb = async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Connected Successfully");
        
    } catch (error) {
        console.log(error.message);
        
    }
}