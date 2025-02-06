import mongoose from "mongoose";

let paymentSchema = new mongoose.Schema({
    user : {type : mongoose.Schema.Types.ObjectId,ref : "User",required  :true},
    Products : [
        {
            product : {type : mongoose.Schema.Types.ObjectId,ref : "Product",required :true},
            quantity : {type : Number , min : 1 , required : true},
            prize : {type : Number , min : 0 , required :true}
           
        }
    ],
    totalAmount : {type : Number,required  :true , min : 0},
    stripSessionId : {type : String , unique : true}
},{timestamps : true})

let Order = mongoose.model("Order",paymentSchema)


export default Order