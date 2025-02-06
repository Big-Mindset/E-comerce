import mongoose from "mongoose";

let productSchema = new mongoose.Schema({
    name : {type : String , required : true},
    description : {type : String , required : true},
    prize : {type : Number , required : true},
    image : {type : String , required : true},
    isfeatured : {type : Boolean , default  : false},
    category : {type : String , required  :true}

},{timestamps : true})

let Product = mongoose.model("Product",productSchema)

export default Product