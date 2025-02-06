import cloudinary from "../lib/cloudinary.js"
import redis from "../lib/redis.js"
import Product from "../models/product.model.js"

export let getAllProducts = async (req,res)=>{
    try {
        let products = await Product.find({})
        return res.json({success : true , products})
    } catch (error) {
        return res.json({success : false , message : "Network Problem",error : error.message})
        
    }
}
export let featuredProducts = async (req,res)=>{
    try {
        let featuredProducts;
        featuredProducts = await redis.get("featured_products")
        if (featuredProducts){
            return res.json({success : true , featuredProduct : JSON.parse(featuredProducts) })
        }
        featuredProducts = await Product.find({isfeatured : true}).lean()

        if (!featuredProducts){
            return res.json({success: false , message : "No featured products found"})
        }
        await redis.set("featured_products",JSON.stringify(featuredProducts))
        return res.json(featuredProducts)
    } catch (error) {
        return res.json({success : false , message : "Network Problem",error : error.message})
        
    }
}

export let createProduct = async (req,res)=>{
    try {
        let {name , description , image , category,prize} = req.body
        
        
        if (!name || !description || !category || !prize){
            return res.json({success  :false , message : "Please fill every Field in order to Continue"})
        }
        let result;
        if (image){
            result = await cloudinary.uploader.upload(image,{
                folder : "Product-Images"
        })}
        let newProduct = await Product.create({
            name,
            description,
            image : result ? result.secure_url : "",
            prize,
            category
        })
        return res.json({success : true , message : "Product created successfully",newProduct})

    } catch (error) {
        return res.json({success : false , message : "Network Problem",error : error.message})
        
    }
}

export let deleteProduct = async (req,res)=>{
    try {
        
        let productId = req.params.id
        let product = await Product.findById(productId)
        if (product.image){
            let imageurl = product.image.split("/").pop().split('.')[0]
            cloudinary.uploader.destroy(imageurl)
        }
         await Product.findByIdAndDelete(productId)
        return res.json({success : true , message : "Product Deleted"})
    } catch (error) {
        return res.json({success : false , message : "Error deleting Product",error : error.message})
        
    }
}

export let RecommendedProducts = async (req,res)=>{
try {
    let products = await Product.aggregate([
        {$sample : {size : 3}},
        {$project :{
            name : 1,
            description : 1,
            image : 1,
            prize : 1,
            _id : 1
        } }
    ])
    return res.json(products)
} catch (error) {
    return res.json({success : false , message : "Error getting Recommended Products please wait",error : error.message})
    
}
}

export let getProductByCetegory = async (req,res)=>{
    try {
        let category = req.params.category
        let product = await Product.find({category})
        if (!product){
            return res.json({success :false , message : "No products in that Category"})
        }
        return res.json({success : true , product})
    } catch (error) {
    return res.json({success : false , message : "Error getting Products in that category",error : error.message})
        
    }
}

export let changeRole = async (req,res)=>{
    try {
        let productId = req.params.id
        let product = await Product.findById(productId)
        product.isfeatured = !product.isfeatured
        let updatedProduct = await product.save()
        await featuredProductsCatch()
        return res.json({success : true,updatedProduct})
    } catch (error) {
        return res.json({success : false , message : "Network Problem",error : error.message})
        
    }
}

let featuredProductsCatch = async ()=>{
    try {
        
        let products = await Product.find({isfeatured : true}).lean()
        await redis.set("featured_products",JSON.stringify(products),"Ex",7*24*60*60)
    } catch (error) {
        console.log("error is appearing"+error.message);
        
    }
}