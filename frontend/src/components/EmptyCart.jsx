
import { ShoppingCart } from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import React from 'react'

const EmptyCart = () => {
  return (
    <motion.div
    initial={{y : 30 , opacity : 0 }}
    animate={{opacity : 1 , y : 0 }}
    transition={{duration : 0.6}}
    className='mt-20'>
        <div className='flex flex-col items-center '>
            <ShoppingCart className='size-28'/>
            <div className='flex items-center flex-col '>
                <h1 className='text-2xl my-8 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-slate-400 font-bold'>Your cart is Empty</h1>
                <p className='font-bold text-gray-400/90'>It seems that you haven,t still add anything in the cart</p>
                <Link to={"/"} >
                <motion.button
                whileTap={{scaleX : 1.05}}
                className='px-3.5 py-2 bg-gradient-to-r from-indigo-400 to-indigo-700 hover:scale-105 duration-150 rounded-md mt-5 cursor-pointer via-purple-500 hover:from-indigo-500 text-white font-bold'>Start Shopping
                </motion.button>
                </Link>
            </div>
        </div>
    </motion.div>
  )
}

export default EmptyCart