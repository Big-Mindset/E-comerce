import React from 'react'
import { useEffect } from 'react'
import { productStore } from '../store/product.store'
import { useParams } from 'react-router-dom'
import { CarTaxiFront, Loader2, ShoppingBag, ShoppingCart } from 'lucide-react'
import { ErrorIcon } from 'react-hot-toast'
import { motion } from 'framer-motion'
import { cartStore } from '../store/cart.store'
const CategoryPage = () => {
  let { getProductByCategory, products } = productStore()
  let { addToCart,  isAddingToCart } = cartStore()
  let category = useParams().category
  useEffect(() => {
    getProductByCategory(category)
  }, [])

  let handleCart = async (product) => {

    await addToCart(product)
  }

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-indigo-950 via-slate-900/40 to-blue-950 via-45% text-slate-100/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Enhanced Header */}
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-indigo-300/95 via-emerald-200 to-blue-300 bg-clip-text text-transparent mb-6 [letter-spacing:-0.03em]">
          {category}
          <span className="block mt-3 w-20 h-1.5 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full"></span>
        </h1>

        {/* Optimized Product Grid */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Premium Product Card */}
          {products.length > 0 ? products.map((product) => {

            return <div 
            key={product._id} 
            className="group relative bg-gradient-to-br from-slate-800/50 to-slate-900/30 rounded-2xl p-6 backdrop-blur-lg border border-slate-700/30
             hover:border-emerald-400/20 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5"
             >
              <div 
              className="absolute -z-10 inset-0 bg-[radial-gradient(at_top_right,_var(--tw-gradient-stops))] from-emerald-500/10 to-transparent rounded-2xl
               opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <img src={product.image} className="w-full aspect-square object-cover rounded-xl mb-4 border border-slate-700/40" />
              <h3 className="text-lg font-semibold text-slate-50/95 mb-2">{product.name}</h3>
              <p className="text-slate-400/90 text-sm mb-4 font-[450] leading-relaxed">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="font-mono text-emerald-300 text-xl">${product.prize}</span>
                <button onClick={() => handleCart(product)} className="bg-slate-700/40 hover:bg-emerald-500/10 border cursor-pointer border-slate-600/30 hover:border-emerald-400/30 text-slate-300 hover:text-emerald-300 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200">
                  {isAddingToCart ? <Loader2 className='animate-spin' /> : "Add to Cart"}

                </button>
              </div>
            </div>
          }) : <div className='text-3xl flex gap-3 items-center font-semibold text-center text-slate-50/95'>
            No Products Found
            <ErrorIcon className='animate-bounce' />
          </div>}
        </motion.div>
      </div>
    </div>
  )
}

export default CategoryPage