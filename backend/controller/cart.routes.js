import Product from "../models/product.model.js"

export let addCartItem = async (req,res)=>{
    try {
        let {productId} = req.body
        let user = req.user
        
        let isExisted = user.cartItems.find(item=>{
            return item.products.toString() === productId
            
        })
        
        if (isExisted){

            isExisted.quantity +=1
            await user.save()
        }else{
            user.cartItems.push({
                products : productId
            })
        }
        await user.save()
        return res.json({success : true , message : "Added to cart",cartItems : user.cartItems})
    } catch (error) {
        console.log(error.message);
        return res.json({success :false , message : "Error in Adding Item"})
        
    }
}
export let deleteAllfromCart = async (req,res)=>{
    try {
        
        let {productId} = req.body
        let user = req.user

        if (!productId){
            user.cartItems = []
        }else{
            user.cartItems = user.cartItems.filter(items=>items.products !==productId)
        }
        await user.save()
        res.json({success: true , cartItems : user.cartItems})
    } catch (error) {
        return res.json({success : false , message : "Network Error", error  : error.message})
    }
}

export let updateQuantity = async (req,res)=>{
    try {
        let {quantity} = req.body
        let productId = req.params.id
        let user = req.user
        


        let isExisted = user.cartItems.find(item=>item.products.toString() === productId)
        
        if (isExisted){
            if(isExisted.quantity === 0){
                user.cartItems.filter(item=>item.products.toString() !==productId)
            }else{
                isExisted.quantity = quantity
            }
            await user.save()
            return res.json({success : true ,  cartItems : user.cartItems}) 
        }else{
            return res.json({success  : false , message : "Item Not Found"})
        }

    } catch (error) {
        return res.json({success  : false , message : "error updating quantity",error : error.message})
        
    }
}

export let getCartItems = async (req,res)=>{
    try {
        
        let products = await Product.find({_id:{$in : req.user.cartItems.map(item=>item.products)}})
        
        let cartItems = products.map(prodct=>{
            let product = req.user.cartItems.find(item=>item.products.toString() === prodct._id.toString())
            
            return {...prodct.toJSON(),quantity : product.quantity}

        })
        return res.json({success : true , cartItems})
    } catch (error) {
        return res.json({success  : false , message : "Error getting cartItems",error : error.message})

        
    }
}