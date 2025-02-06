import React, { useState } from "react";
import AnimatedBolls from "../components/AnimatedBolls";
import { Lock, LockKeyhole, Mail, User, Check, AlertCircle, Loader2, Plus, PlusIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import StoreImg from "../assets/store1.jpg";
import { authStore } from "../store/auth.store";
const SignUp = () => {
  const [formData, setformData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  let {SignUp , isLoading} = authStore()
  const [Errors, setErrors] = useState({})
    const validateForm = () => {
    const newErrors = {};
    if (formData.fullName.length < 4){
      newErrors.fullName = "FullName must contain atleast 6 characters"
    }
    if (!formData.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Password not matching!";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()){
      await SignUp(formData.fullName , formData.email , formData.password)
      setformData({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
      })
    }
    return
  };
  
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-50 to-white flex justify-center items-center p-4">
      <AnimatedBolls x={-400} y={-400} color={"bg-indigo-600/10"} />
      <AnimatedBolls x={-400} y={400} color={"bg-indigo-600/10"} />
      <AnimatedBolls x={400} y={-400} color={"bg-indigo-600/10"} />
      
      {/* Sign Up Card */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl w-full grid grid-cols-1 lg:grid-cols-2 max-w-[1200px] shadow-xl border border-gray-100"
      >
        {/* Left Form Section */}
        <div className="p-8 md:p-12">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Join Our Community</h2>
            <p className="text-gray-500">Create your account to start shopping</p>
          </div>

          <form onSubmit={(e)=>handleSubmit(e)} className="space-y-6">
            {[
              { label: "Full Name", icon: User, type: "text", placeholder: "Enter your full name",name : "fullName" },
              { label: "Email", icon: Mail, type: "email", placeholder: "Enter your email" , name : "email" },
              { label: "Password", icon: Lock, type: "password", placeholder: "Create password",  name : "password" },
              { label: "Confirm Password", icon: LockKeyhole, type: "password", placeholder: "Confirm password" ,   name : "confirmPassword"
              },
            ].map((field, index) => (
              <motion.div
                key={field.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >

                
                <label className="block text-sm font-medium text-gray-700 mb-2">{field.label}</label>
                <div className={`flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg transition-all duration-200 focus-within:bg-white  ${Errors[field.name] ? "ring-2 ring-red-600" : "focus-within:ring-indigo-500  focus-within:ring-2" }  focus-within:border-transparent`}>
                  <field.icon className="w-5 h-5 text-gray-400" />
                  <input
                    type={field.type}
                    className="w-full bg-transparent border-none outline-none text-gray-900 placeholder-gray-400"
                    placeholder={field.placeholder}
                    value={formData[field.name]}
                    onChange={(e)=>{setformData({...formData,[field.name] : e.target.value})}}
                  />
                </div>
                {console.log()
                }
                {Errors[field.name]  && 
                <div className="text-red-500 mt-3 flex items-center gap-2">
                  <AlertCircle className="size-5"/>
                  {Errors[field.name]}
                </div>
                }
              </motion.div>
            ))}

            <div className="flex items-center mb-6">
              <input
                type="checkbox"
                id="terms"
                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                I agree to the{' '}
                <a href="#" className="text-indigo-600 hover:underline">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-indigo-600 hover:underline">
                  Privacy Policy
                </a>
              </label>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-indigo-600 to-blue-500 cursor-pointer text-white py-4 px-6 rounded-lg font-semibold shadow-lg hover:shadow-indigo-500/30 transition-all duration-200"
            >
              {isLoading ? <Loader2 className="animate-spin"/> : <div className="flex  items-center gap-2 justify-center"><PlusIcon/> Create Account</div>}
              
            </motion.button>
          </form>

          <p className="mt-6 text-center text-gray-600">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-indigo-600 font-semibold hover:underline hover:text-indigo-700"
            >
              Login
            </Link>
          </p>
        </div>

        {/* Right Image Section */}
        <div className="hidden lg:flex flex-col items-center justify-center p-12 bg-gradient-to-br from-indigo-50 to-blue-50 relative">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Start Your Shopping Journey
            </h3>
            <p className="text-gray-600 max-w-xs mx-auto">
              Enjoy exclusive benefits, personalized recommendations, and faster checkout
            </p>
          </div>
          
          <div className="relative w-full max-w-md">
            <img
              src={StoreImg}
              alt="E-commerce"
              className="rounded-xl shadow-2xl border-8 border-white transform rotate-1"
            />
            <div className="absolute -bottom-6 -right-6 bg-white px-4 py-3 rounded-lg shadow-md">
              <div className="flex items-center gap-2">
                <div className="bg-green-100 p-2 rounded-full">
                  <Check className="w-5 h-5 text-green-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">Secure Checkout</span>
              </div>
            </div>
          </div>

          <div className="mt-8 flex gap-4">
            {['Fast Delivery', '24/7 Support', 'Easy Returns'].map((text) => (
              <div key={text} className="flex items-center gap-2 bg-white/50 px-4 py-2 rounded-full">
                <Check className="w-4 h-4 text-indigo-600" />
                <span className="text-sm text-gray-700">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUp;