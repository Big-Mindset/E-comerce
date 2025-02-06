import { motion } from 'framer-motion'
import React, { useEffect } from 'react'
import { productStore } from '../store/product.store'
import { Delete, LucideTrash2, Star, Trash } from 'lucide-react'

const Products = () => {
          let {products,deleteProduct,getProducts , ChangeRoles} = productStore()
        let handleUpdate = async (id)=>{
            await ChangeRoles(id)
            getProducts()

        }
        let handleDelete = async (id)=>{
            await deleteProduct(id)
            getProducts()
        }
  return (
    <motion.div className='w-full max-w-6xl rounded-lg overflow-hidden mx-auto bg-gray-800'>

    <table className=' divide-y divide-gray-700 min-w-full'>
        <thead className='bg-gray-700 '>
            <tr>
                
                {["Product","Price","Category","Featured","Actions"].map((item)=>{
                    return <th scope='col' className='px-3.5 text-gray-300  text-xs font-medium uppercase tracking-wider py-2.5 text-left'>
                        {item}
                    </th>
                })}
            </tr>
        </thead>
        <tbody className='bg-gray-700 divide-y divide-gray-600'>
            {products.map((product)=>{

             return   <tr key={product._id} className='hover:bg-gray-700/20 duration-300'>
               
                    <td className='whitespace-nowrap'>
                        <div className='flex items-center px-3.5 py-4 '> 
                            <div className='size-14 rounded-full overflow-hidden '>
                                <img src={product.image} className='size-full object-cover '  />
                            </div>
                            <div className='text-xs text-white  font-bold ml-3'>
                                {product.name} 
                            </div>
                        </div>
                    </td>
                    <td>
                    <div className='text-md text-white  ml-3 whitespace-nowrap px-3.5 py-4'>
                                ${product.prize.toFixed(2)} 
                    </div>
                    </td>
                    <td>
                    <div className='text-md text-white  ml-3 whitespace-nowrap px-3.5 py-4'>
                                {product.category} 
                    </div>
                    </td>
                    <td>
                    <div onClick={()=>handleUpdate(product._id)} className='text-md font-bold ml-3 whitespace-nowrap px-3.5 py-4'>

                        
                                <Star fill={`${product.isfeatured  ? "yellow" : "white"} `} className='  cursor-pointer' />

                    </div>
                    </td>
                    <td>
                    <div onClick={()=>handleDelete(product._id)} className='text-xs font-bold ml-3 whitespace-nowrap px-3.5 py-4'>

                                <LucideTrash2   className='cursor-pointer text-white hover:text-red-600 duration-150'/> 
                    </div>
                    </td>
                    
            </tr>
            })}
        </tbody>
    </table>
                       </motion.div>
  )
}

export default Products