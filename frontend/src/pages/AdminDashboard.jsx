import { BaggageClaimIcon, LineChart, PlusCircle } from 'lucide-react'

import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import CreateProducts from '../components/CreateProducts'
import Products from '../components/Products'
import Analytics from '../components/Analytics'
import { productStore } from '../store/product.store'

const AdminDashboard = () => {
  const [dashboard, setdashboard] = useState("Create-product")

      let {getProducts,products} = productStore()
      useEffect(() => {
        if (dashboard === "Products"){
          getProducts()
        }
      }, [dashboard])
  return (
    <div className='pt-20 min-h-screen  overflow-hidden from-purple-600 via-40% via-blue-400 bg-gradient-to-r to-indigo-600'>
      <div className='space-y-9 '>

      <motion.div
      initial={{y : -20 , opacity : 0}}
      animate = {{opacity : 1 , y : 0}}
      transition={{duration : 0.5}}
      className='flex mt-4 items-center flex-col space-y-9'>

      <div className='heading '>
        <h1 className='font-bold text-blue-900 text-4xl '>
          Admin Dashboard
        </h1>
      </div>
      <div className='flex space-x-3.5'>
        {[{name : "Create-product",icon : <PlusCircle/> },{name : "Products",icon : <BaggageClaimIcon /> },{name : "Analytics",icon : <LineChart/>}].map((dash)=>{

         return  <motion.div 
         key={dash.name}
          onClick={()=>setdashboard(dash.name)}
          whileTap={{scaleX : 1.05,}}
          className={`flex gap-2  ${dash.name === dashboard ?  "bg-pink-700" : "bg-purple-600 hover:bg-pink-600"} hover:-translate-y-1  duration-300 cursor-pointer text-white font-bold px-3 py-2 rounded-sm`}>
          {dash.icon}
          <span>{dash.name}</span>
          </motion.div>
        })}
        </div>
        </motion.div>

        <div className='Componets flex justify-center p-4'>
          {console.log(dashboard)
          }
          {dashboard === "Create-product" && <CreateProducts/>  }
          {dashboard === "Products" && <Products/>  }
          {dashboard === "Analytics" && <Analytics/>  }
          
        </div>
      </div>
      
    </div>
  )
}

export default AdminDashboard