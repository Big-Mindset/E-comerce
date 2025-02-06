import  bcrypt  from "bcryptjs";
import mongoose from "mongoose";

let userSchema = new mongoose.Schema({
    name : {type : String , required : true},
    email : {type : String , required  :true , unique  :true},
    password : {type : String , required : true , minlength : 6},
    cartItems : [
        {
          quantity :   {type : Number , default : 1},
          products : {type : mongoose.Schema.Types.ObjectId , ref : "Product"}
        }
    ],
    role : {
        type : String,
        emun : ["customer","admin"],
        default : "customer"
    }
},{timestamps : true})
userSchema.pre("save", async  function hashPass(next) {
    if (!this.isModified("password")) return next()
    try {
        let salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password,salt)
        next()
    } catch (error) {
        next(error)
    }
})

userSchema.methods.comparePassword = async function (enteredPassword) {

    return bcrypt.compare(enteredPassword, this.password);
  };

let User = mongoose.model("User",userSchema)



export default User