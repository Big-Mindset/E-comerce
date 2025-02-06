import { create } from "zustand";
import axiosInstance from "./axios";
import toast from "react-hot-toast";

export let cartStore = create((set,get)=>({
    cartItems : [],
    isAddingToCart : false,
    subtotal : null,
    total : null,
    coupon : null,
    isCouponApllied : false,
    
    
    getCartItems : async ()=>{
        try {
            
            const { data } = await axiosInstance.get("/cart");
            
            if (data.success){
                set({cartItems : data.cartItems})
                get().calculateTotals()
            }
        } catch (error) {
            console.log(error.message);
            
        }

    },


    addToCart: async (product) => {
        try {
          // Optimistically update the UI
          set((state) => {
            const cartItems = Array.isArray(state.cartItems) ? state.cartItems : [];
            const existingIndex = cartItems.findIndex((item) => item._id === product._id);
      
            let updatedCart;
            if (existingIndex > -1) {
              updatedCart = cartItems.map((item, index) =>
                index === existingIndex
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              );
            } else {
              updatedCart = [...cartItems, { ...product, quantity: 1 }];
            }
      
            return { cartItems: updatedCart };
          });
      
          // Make the API call
          const { data } = await axiosInstance.post("/cart", { productId: product._id });
      
          if (!data.success) {
            // Rollback if the API call fails
            set((state) => {
              const cartItems = Array.isArray(state.cartItems) ? state.cartItems : [];
              const existingIndex = cartItems.findIndex((item) => item._id === product._id);
      
              let updatedCart;
              if (existingIndex > -1) {
                updatedCart = cartItems.map((item, index) =>
                  index === existingIndex
                    ? { ...item, quantity: Math.max(0, item.quantity - 1) }
                    : item
                );
              } else {
                updatedCart = cartItems.filter((item) => item._id !== product._id);
              }
      
              return { cartItems: updatedCart };
            });

      
            toast.error(data.message);
          }else{
            toast.success(data.message)
            get().calculateTotals()
            
          }
        } catch (error) {
          console.error("Cart error:", error.response?.data || error.message);
          toast.error(error.response?.data?.message || "Failed to add to cart");
        } finally {
          set({ isAddingToCart: false });
        }
      },
      calculateTotals : ()=>{
        let subtotal = get().cartItems.reduce((acc,curr)=>{
            return acc + curr.prize * curr.quantity
        },0)
        let total = subtotal;
        let coupon = get().coupon
        if (coupon){
            let discount = subtotal * (coupon.discountPercentage/100)
            total = subtotal - discount
        }
        set({subtotal , total})
      },
      deleteFromCart : async (product)=>{
        try {
            let {data} = await axiosInstance.delete(`/cart/${product._id}`)
            if (data.success){
                let updatedcartItems = get().cartItems.filter(item=>item._id !== product._id)
                set({cartItems : updatedcartItems})
            }
        } catch (error) {
            console.log(error.message);
            
        }
      },
      updateFromCart : async (item,quantity)=>{
        try {
            
            let {data} = await axiosInstance.put(`/cart/${item._id}`,{quantity})
            if (data.success){
                get().calculateTotals()
                let isExisted  = get().cartItems.find(items=>items._id === item._id)
                if (isExisted){
                    if (quantity === 0){
                        set({cartItems : get().cartItems.filter(val=>val._id !== isExisted._id)})
                        return
                        
                    }
                        let updatedCartItems = get().cartItems.map(item=>{
                            if (item._id === isExisted._id){
                                return {...item,quantity : quantity}
                            }else{
                                return item
                            }
                        })
                    
                    set({cartItems : updatedCartItems})
                }
            }
        } catch (error) {
            console.log(error.message);
            
        }
      },
      clearCart : ()=>{
        set({cartItems : [],subtotal : null , total : null,coupon :null })
      },
      getCoupon : async ()=>{
        try {
          let {data} = await axiosInstance.get("/coupon/getCoupan") 
          set({coupon : data})
        } catch (error) {
          console.log(error.message);
          
        }
      },
      ValidateCoupon : async (code)=>{
        
        try {
          let {data} = await axiosInstance.post("/coupon/validateCoupon",{code})
          if (data.success){
            set({coupon : data.coupon , isCouponApllied : true})
           get().calculateTotals()
           toast.success(data.message)
          }else{
            set({coupon : null , isCouponApllied : false})
            toast.error(data.message)

          }
        } catch (error) {
          console.log(error.message);
          
        }
      }
      
}))