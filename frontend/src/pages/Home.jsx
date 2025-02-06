import React, { useEffect, useRef } from 'react'
import Bags from "../assets/bags.jpg"
import Glasses from "../assets/glasses.png"
import Jackates from "../assets/jackets.jpg"
import Jeans from "../assets/jeans.jpg"
import ScreenShot from "../assets/screenShot.png"
import Shoes from "../assets/shoes.jpg"
import Suits from "../assets/suits.jpg"
import Tshirt from "../assets/tshirts.jpg"
import {Link} from "react-router-dom"
import { motion } from 'framer-motion'
import { cartStore } from '../store/cart.store'
import { productStore } from '../store/product.store'
import { MoveLeft, MoveRight } from 'lucide-react'
import { useState } from 'react'
const Home = () => {
  let {getFeacturedProducts,isAddingToCart} = productStore()
  const [Allproducts, setAllproducts] = useState()
  let categories =  [
    {href : "/bag", name : "Bags" , ImageUrl : Bags},
    {href : "/glasses", name : "Glasses" , ImageUrl : Glasses},
    {href : "/jacket", name : "Jacket" , ImageUrl : Jackates},
    {href : "/shoes", name : "Shoes" , ImageUrl : Shoes},
    {href : "/suit", name : "Suits" , ImageUrl : Suits},
    {href : "/t-shirt", name : "Tshirt" , ImageUrl : Tshirt},
    {href : "/jeans", name : "Jeans" , ImageUrl : Jeans},
  ]
  useEffect(() => {
    let featuredData = async ()=>{

      let data = await getFeacturedProducts()
      setAllproducts(data.featuredProduct)
    }
    featuredData()
    
  }, [])

  const scrollContainerRef = useRef(null);

  // Function to scroll left by 300px
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -500,
        behavior: 'smooth'
      });
    }
    
  };
  
  // Function to scroll right by 300px
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 500,
        behavior: 'smooth'
      });
    }

    
  
  };
  let handleCart = async (product) => {

    await addToCart(product)
  }
  
  return (
<div className="min-h-screen pt-32 bg-gradient-to-b from-indigo-900 to-indigo-950">
  <div

  className="text-center ">

    <motion.h1
      initial={{y : 100 , opacity : 0.2}}
      animate={{y : 0 , opacity  :1}}
      transition={{duration : 0.4 , delay : 0.1}}

    className="text-5xl font-bold mb-4 text-white/95 font-serif tracking-tight">
      Explore our <span className="text-indigo-400">Collections</span>
    </motion.h1>
    <motion.p
      initial={{y : -100 , opacity : 0}}
      animate={{y : 0 , opacity  :1}}
      transition={{duration : 1}}
     className="text-lg text-indigo-200/90 font-medium max-w-2xl mx-auto">
      Discover sustainable fashion that combines elegance with environmental responsibility
    </motion.p>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl mx-auto px-4 mt-12">
      {categories.map((cat) => (
        <motion.div 

          key={cat.href} 
          className="h-[480px] rounded-xl overflow-hidden group relative border-2 border-indigo-800/30 hover:border-indigo-400/50 transition-all duration-300 shadow-2xl hover:shadow-indigo-900/50"
        >
          <Link to={"/category" + cat.href}>
            <div className="w-full h-full cursor-pointer">
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-indigo-900/20 to-transparent z-10"></div>
              
              {/* Image */}
              <img
                src={cat.ImageUrl}
                alt={cat.name}
                className="object-cover w-full h-full transform transition-all duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:scale-105"
                loading="lazy"
              />
              
              {/* Category label */}
              <div className="absolute bottom-6 left-6 z-20 space-y-1">
                <h2 className="text-3xl font-bold text-white/95 tracking-wide drop-shadow-lg">
                  {cat.name}
                </h2>
                <div className="w-12 h-1 mt-2 bg-indigo-400 group-hover:shadow-2xl group-hover:w-[120px] duration-300 rounded-full"></div>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  </div>
  {Allproducts?.length > 0  && 
  <div className="py-9 w-full mx-auto max-w-6xl">
  <h1 className="bg-gradient-to-tl from-red-600 to-indigo-600 bg-clip-text text-transparent text-3xl font-bold">
    Featured Products
  </h1>

  <div className="max-w-screen-xl relative mx-auto px-4 py-8">
      {/* Scroll container */}
      <div className="relative p-2.5">
        {/* Scroll content */}
        <div 
          ref={scrollContainerRef} 
          className="flex pb-4 overflow-hidden scrollbar-hide" 
        >
          {/* Scroll items */}
          {Allproducts.map((product) => (
            <div 
            key={product._id} 
            className="group flex-shrink-0 max-w-[400px] w-full relative bg-gradient-to-br from-slate-800/50 to-slate-900/30 rounded-2xl p-6 backdrop-blur-lg border border-slate-700/30
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
          ))}
        </div>

        {/* Left arrow */}
        <div 
          className="absolute left-0 cursor-pointer text-white top-1/2 z-20 -translate-y-1/2"
          onClick={scrollLeft}
          >
          <div className="bg-blue-600 flex duration-150 hover:bg-blue-700 w-8 h-8 rounded-md justify-center items-center">
            <MoveLeft size={16} />
          </div>
        </div>

        {/* Right arrow */}
        <div 
          className="absolute right-0 cursor-pointer text-white top-1/2 z-20 -translate-y-1/2"
          onClick={scrollRight}
          >
          <div className="bg-blue-600 flex duration-150 hover:bg-blue-700 w-8 h-8 rounded-md justify-center items-center">
            <MoveRight size={16} />
          </div>
        </div>
      </div>
    </div>
    </div>
        }


</div>

  )
}

export default Home