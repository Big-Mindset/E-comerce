import Coupon from "../models/coupon.model.js"

export let getCoupan =  async (req,res)=>{
    try {
        let coupon = await Coupon.findOne({userId : req.user._id,isActive : true})
        return res.json(coupon || null)
    } catch (error) {
        return res.json({success :false , message : "server Error",error : error.message})
    }
}

export let validateToken = async (req,res)=>{
    try {
        let {code} = req.body
        console.log(code);
        
        let coupon = await Coupon.findOne({code : code , userId : req.user._id,isActive : true})
        if (!coupon){
            return res.json({success :false , message : "Coupon not Found"})
        }
        if(coupon.exipirationDate < new Date()){
            coupon.isActive = false
            await coupon.save()
            return res.json({success :false , message : "Coupon has been Expired"})
        }
        return res.json({message : "Coupon Applied",coupon : coupon,success :true})
    } catch (error) {
        return res.json({success :falase , message : "server Error",error : error.message})
    }
}