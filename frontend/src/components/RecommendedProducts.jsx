import React, { useEffect } from 'react'
import { productStore } from '../store/product.store'
import { Loader2 } from 'lucide-react'
import { cartStore } from '../store/cart.store'

const RecommendedProducts = () => {
    let {products} = productStore()
    let {isAddingToCart,addToCart} = cartStore()
    {console.log(products);
    }
    let handleCart = async (product) => {

        await addToCart(product)
      }
    
  return (
    <div className='col-span-3 space-y-7 my-5'>
        <h1 className='text-3xl font-bold p-3.5 bg-gradient-to-r from-purple-600 to-pink-900 bg-clip-text text-transparent  '>Peoples Also bought</h1>
        <div className='flex  items-center justify-between gap-1.5'>
        {products.map(product=>{

            return <div 
            key={product._id} 
            className="group relative mt-1.5 bg-gradient-to-br from-slate-800/50 to-slate-900/30 rounded-2xl p-6 backdrop-blur-lg border border-slate-700/30
             hover:border-emerald-400/20 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5"
             >
              <div 
              className="absolute -z-10 inset-0 bg-[radial-gradient(at_top_right,_var(--tw-gradient-stops))] from-emerald-500/10 to-transparent rounded-2xl
              opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className='size-70'>

              <img src={product.image} className="w-full aspect-square object-cover rounded-xl mb-4 border border-slate-700/40" />
              </div>
              <h3 className="text-lg font-semibold text-slate-50/95 mb-2">{product.name}</h3>
              <p className="text-slate-400/90 text-sm mb-4 font-[450] leading-relaxed">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="font-mono text-emerald-300 text-xl">${product.prize}</span>
                <button 
                onClick={() => handleCart(product)}
                 className="bg-slate-700/40 hover:bg-emerald-500/10 border cursor-pointer border-slate-600/30 hover:border-emerald-400/30 text-slate-300 hover:text-emerald-300 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200">
                  {isAddingToCart ? <Loader2 className='animate-spin' /> : "Add to Cart"}

                </button>
              </div>
            </div>
              })}
        </div>
    </div>
  )
}

export default RecommendedProducts