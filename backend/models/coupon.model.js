import mongoose from "mongoose";

let couponSchema = new mongoose.Schema({
    code : {type : String , required : true , unique : true},
    isActive : {type : Boolean , default : true},
    exipirationDate : {type : Date, required  :true },
    discountPercentage : {type : Number , min : 0 , max : 100,required :true},
    userId : {type : mongoose.Schema.Types.ObjectId , ref  : "User",required : true , unique : true} 
},{timestamps : true})

let Coupon = mongoose.model("Coupon",couponSchema)

export default Coupon