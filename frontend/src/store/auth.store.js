import {create} from "zustand"
import axiosInstance from "./axios"
import {toast} from "react-hot-toast"
export let authStore = create((set)=>({
    isLoading : false,
    userData : null ,

    SignUp : async (fullname , email , password)=>{
        try {
            
            set({isLoading : true})
            let {data} = await axiosInstance.post("/auth/signup",{name : fullname,email,password})
            
            if (data.success){
                toast.success(data.message)
                set({userData : data.user})
            }else{
                toast.error(data.message)

            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Network problem please wait")
        }finally{
            set({isLoading : false})

        }
    },
    Login : async ( email , password)=>{
        try {
            
            set({isLoading : true})
            let {data} = await axiosInstance.post("/auth/login",{email,password})
            if (data.success){
                toast.success(data.message)
                set({userData : data.user})

            }else{
                toast.error(data.message)

            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Network problem please wait")
        }finally{
            set({isLoading : false})

        }
    },
    Logout : async ()=>{
        try {
            let {data} = await axiosInstance.post("/auth/logout")
            if (data.success){
                toast.success(data.message)
                set({userData : null})

            }else{
                toast.error(data.message)

            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Network problem please wait")
        }
    },
    getUserData : async ()=>{
        try {
            let {data} = await axiosInstance.get("/auth/user-profile")
            if (data.success){
                set({userData : data.user})
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Network problem please wait")
        }
    },
    refreshToken : async ()=>{
        try {
            await axiosInstance("/auth/refresh-token")
            
        } catch (error) {
            console.log(error.message);
            
        }
    }

}))
let interceptorPromise = null
axiosInstance.interceptors.response.use(
    (response) =>response,
    async (error)=>{
        let originalData = error.config
        if (error.response?.status === 401 && !originalData._retry){
            originalData._retry = true

            try {
                if (interceptorPromise){
                    await interceptorPromise;
                    return axiosInstance(originalData)

                }
                interceptorPromise = authStore().get().refreshToken()
                await interceptorPromise
                interceptorPromise = null
                return axiosInstance(originalData)
            } catch (error) {
                useUserStore.getState().Logout();
				return Promise.reject(error);
            }
        }
        return Promise.reject(error);
    }
)