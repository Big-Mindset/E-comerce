import toast from "react-hot-toast";
import axiosInstance from "./axios";
import { create } from "zustand";
import { cartStore } from "./cart.store";
import axios from "axios";
export let productStore = create((set,get)=>({
    products : [],
    isCreating : false,

    createProduct : async (productData)=>{
        set({isCreating : true})
        try {
            let {data} = await axiosInstance.post("/product/createProduct",productData)
            if (data.success){
                toast.success(data.message)
                set({products : [...get().products,data.newProduct]})
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.response?.data?.message)
            console.log(error.message);
            
        }finally{
        set({isCreating : false})

        }
    },
    getProducts : async ()=>{
        try {
            let {data} = await axiosInstance.get("/product/getAllProducts")
            
            if (data.success){
                set({products : data.products})
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.response?.data?.message)
            console.log(error.message);
            
        }
    },
    deleteProduct : async (productId)=>{
        try {
            let {data} = await axiosInstance.delete(`/product/${productId}`)
            if (data.success){
                toast.success(data.message)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.response?.data?.message)
            console.log(error.message);
            
        }
    },
    ChangeRoles : async (productId)=>{
        try {
            let {data} = await axiosInstance.put(`/product/changeRole/${productId}`)
            if (data.success){
                toast.success("State Changed ")
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.response?.data?.message)
            console.log(error.message);
            
        }
    },
    getProductByCategory : async (category)=>{
        try {
            let {data} = await axiosInstance.get(`/product/category/${category}`)
            if (data.success){
                set({products : data.product})
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.response?.data?.message)
            console.log(error.message);
            
        }
    },
    getRecommendedProduct : async ()=>{
        try {
            cartStore.setState({isAddingToCart : true})
            
            
            let {data} = await axiosInstance.get("/product/getRecommendedProducts")
            
            set({products : data})
        } catch (error) {
            console.log(error.message);
            
        }finally{
            cartStore.setState({isAddingToCart :false})

          

        }
    },
    getFeacturedProducts : async ()=>{
        try {
            let {data} = await axiosInstance.get("/product/featuredProducts")
            return data
        } catch (error) {
            toast.error(error.message||"Error getting Featured Products")
            
        }
    }
}))