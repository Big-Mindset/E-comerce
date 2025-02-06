import { ArrowRight, CalendarClock, CheckCircle, HandCoins, Hash, MoveRight, TicketCheck } from 'lucide-react'
import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axiosInstance from '../store/axios'
import { cartStore } from '../store/cart.store'
import Confetti from 'react-confetti';
const PurchaseSuccess = () => {
  const [isProccessing, setisProccessing] = useState(false)
  const [Error, setError] = useState("")
  let {clearCart} = cartStore()
  useEffect(() => {
    let handlePaymentSuccess =  async (sessionId)=>{
      try {
        setisProccessing(true)
         await axiosInstance.post("/payment/checkout-success",{sessionId})
        clearCart()
      } catch (error) {
        console.log(error.message);
        
      }finally{
        setisProccessing(false)
      }
    }
    let sessionId = new URLSearchParams(window.location.search).get("session_id")
    if (sessionId){
      handlePaymentSuccess(sessionId)
    }else{
      setisProccessing(false)
      setError("No sessionId Found in the Url")
    }
  }, [])
  if (isProccessing) return "Processing..."
  if (Error) return "Error : "+Error
  return (
<div className='h-screen flex justify-center items-center bg-gradient-to-bl from-blue-600 to-purple-600 via-blue-600 via-30%'>
      <Confetti
      width={window.innerWidth}
      height={window.innerHeight}
      gravity={0.1}
      recycle={false}
      style={{zIndex : 999}}
      numberOfPieces={700}
      />
  <div className='w-full max-w-lg mx-4 rounded-xl overflow-hidden shadow-2xl backdrop-blur-lg bg-white/1'>
    <div className='p-6 md:p-8 flex flex-col space-y-6 items-center'>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      >
        <CheckCircle className='size-24 text-emerald-400 drop-shadow-md' />
      </motion.div>

      <div className='text-center space-y-2'>
        <motion.h1 
          className='text-3xl font-bold text-white tracking-tight'
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Purchase Confirmed!
        </motion.h1>
        <p className='text-blue-100/90 font-medium'>
          Thank you for your order! We're preparing it right now 🚀
        </p>
      </div>

      <motion.div 
        className='space-y-4 p-5 rounded-xl bg-white/5 backdrop-blur-sm w-full border border-white/10'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className='flex justify-between items-center px-2.5'>
          <div className='flex items-center gap-2'>
            <Hash className='size-5 text-blue-300' />
            <span className='font-medium text-blue-100'>Order Number</span>
          </div>
          <p className='text-blue-300 font-semibold tracking-wide'>203003T</p>
        </div>
        <div className='flex justify-between items-center px-2.5'>
          <div className='flex items-center gap-2'>
            <CalendarClock className='size-5 text-blue-300' />
            <span className='font-medium text-blue-100'>Estimated Delivery</span>
          </div>
          <p className='text-emerald-300 font-semibold'>2 - 3 days</p>
        </div>
      </motion.div>

      <motion.div 
        className='bg-gradient-to-br from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white flex items-center gap-2 justify-center rounded-xl w-full py-4 shadow-lg hover:shadow-blue-500/30 transition-all cursor-pointer'
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <HandCoins className='size-6 text-amber-200' />
        <p className='font-semibold tracking-wide'>View Order Details</p>
      </motion.div>

      <Link to="/" className='w-full'>
        <motion.div 
          className='bg-white/90 hover:bg-white text-indigo-600 font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-all hover:shadow-md'
          whileHover={{ x: 5 }}
          whileTap={{ scale: 0.98 }}
        >
          <span>Continue Shopping</span>
          <ArrowRight className='size-5' />
        </motion.div>
      </Link>
    </div>
  </div>
</div>
  )
}

export default PurchaseSuccess