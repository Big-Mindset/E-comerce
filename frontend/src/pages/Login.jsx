import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, AlertCircle, Check, Loader2, SkipBack } from "lucide-react";
import AnimatedBolls from "../components/AnimatedBolls";
import AuthIllustration  from "../assets/store1.jpg";
import { authStore } from "../store/auth.store";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  let {Login , isLoading} = authStore()
  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()){
      await Login(formData.email , formData.password)

    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-50 to-white flex items-center justify-center p-4">
      <AnimatedBolls x={-400} y={-400} color="bg-indigo-600/10" />
      <AnimatedBolls x={400} y={-400} color="bg-indigo-600/10" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-2xl w-full max-w-6xl shadow-xl border border-gray-100"
      >
        <div className="grid grid-cols-1 items-center lg:grid-cols-2">
          {/* Left Form Section */}
          <div className="p-8 md:p-12">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
              <p className="text-gray-500">Sign in to continue your shopping experience</p>
            </div>

            <form onSubmit={(e)=>handleSubmit(e)} className="space-y-6">
              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className={`flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg transition-all duration-200 ${errors.email ? "ring-2 ring-red-500" : "focus-within:ring-2 focus-within:ring-indigo-500"}`}>
                  <Mail className="w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-transparent outline-none border-none text-gray-900 placeholder-gray-400"
                    placeholder="your@email.com"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" /> {errors.email}
                  </p>
                )}
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className={`flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg transition-all duration-200 ${errors.password ? "ring-2 ring-red-500" : "focus-within:ring-2 focus-within:ring-indigo-500"}`}>
                  <Lock className="w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full bg-transparent outline-none border-none text-gray-900 placeholder-gray-400"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-indigo-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" /> {errors.password}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                    Remember me
                  </label>
                </div>
                <Link to="/forgot-password" className="text-sm text-indigo-600 hover:underline">
                  Forgot password?
                </Link>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isLoading}
                className="w-full bg-indigo-600 cursor-pointer text-white py-4 px-6 rounded-lg font-semibold shadow-lg hover:shadow-indigo-500/30 transition-all duration-200 relative"
                type="submit"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                ) : (
                  <div className="flex justify-center items-center gap-2">
                      <SkipBack/>
                      Login
                  </div>
                )}
              </motion.button>
            </form>

            <p className="mt-6 text-center text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-indigo-600 font-semibold hover:underline hover:text-indigo-700"
              >
                Create account
              </Link>
            </p>
          </div>

          {/* Right Graphic Section */}
          <div className="hidden lg:flex flex-col items-center justify-center p-12 bg-gradient-to-br from-indigo-50 to-blue-50 relative">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Your Shopping Cart Awaits
              </h3>
              <p className="text-gray-600 max-w-xs mx-auto">
                Access your saved items, order history, and personalized recommendations
              </p>
            </div>
            
            <div className="relative w-full max-w-md">
              <img
                src={AuthIllustration}
                alt="Shopping Experience"
                className="rounded-xl shadow-2xl border-8 border-white transform rotate-1"
              />
              <div className="absolute -bottom-6 -right-6 bg-white px-4 py-3 rounded-lg shadow-md">
                <div className="flex items-center gap-2">
                  <div className="bg-green-100 p-2 rounded-full">
                    <Lock className="w-5 h-5 text-green-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">Secure Login</span>
                </div>
              </div>
            </div>

            <div className="mt-8 flex gap-4">
              {['24/7 Support', 'Easy Returns', 'SSL Encryption'].map((text) => (
                <div key={text} className="flex items-center gap-2 bg-white/50 px-4 py-2 rounded-full">
                  <Check className="w-4 h-4 text-indigo-600" />
                  <span className="text-sm text-gray-700">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;