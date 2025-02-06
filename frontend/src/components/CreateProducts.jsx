import { Image, Loader2, SquareCheck } from 'lucide-react'
import React, { useState } from 'react'
import { productStore } from '../store/product.store'
import { motion } from 'framer-motion'
const CreateProducts = () => {
  let { createProduct  , isCreating} = productStore()
    let categories = ["jeans","t-shirt","shoes","glasses","jacket","suit","bag"]
  
  const [formData, setformData] = useState({
    name: "",
    description: "",
    prize: 0,
    category: "",
    image: ""
  })

  let hadleImage = (e) => {
    let file = e.target.files[0]
    let reader = new FileReader()
    reader.onloadend = ()=>{
        setformData({...formData,image : reader.result})
    }
    reader.readAsDataURL(file)
  }

  let handleSubmut = async (e)=>{
    e.preventDefault()
    await createProduct(formData)
  }

  return (
    <motion.div 
    initial={{opacity : 0 , y : 20}}
    animate={{ opacity  :1 , y : 0}}

    transition={{duration  : 1}}
    >
      <div className='w-full max-w-2xl bg-white rounded-xl shadow-xl overflow-hidden'>
        <div className='bg-indigo-600 p-6 border-b border-indigo-500'>
          <h1 className='font-bold text-3xl text-white/95 font-serif tracking-tight'>
            Create New Product
          </h1>
        </div>

        <div className='p-8 space-y-8'>
          <form 
          onSubmit={(e)=>handleSubmut(e)}
          className='space-y-6'>
            <div className='space-y-2'>
              <label className='block text-sm font-medium text-gray-700'>
                Product Name
                <span className='text-red-500 ml-1'>*</span>
              </label>
              <div className='relative rounded-lg shadow-sm'>
                <input
                  value={formData.name}
                  onChange={(e) => setformData({ ...formData, name: e.target.value })}
                  type="text"
                  className='block w-full px-4 py-3 border-0 ring-1 ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 rounded-lg transition-all duration-200'
                  placeholder='Enter product name'
                />
                <div className='absolute inset-y-0 right-3 flex items-center pr-3 pointer-events-none'>
                  <svg className='h-5 w-5 text-gray-400' fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
            <div className='space-y-2'>
              <label className='block text-sm font-medium text-gray-700'>
                Product Description
                <span className='text-red-500 ml-1'>*</span>
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setformData({ ...formData, description: e.target.value })}
                rows={4}
                className='block w-full px-4 py-3 border-0 ring-1 ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 rounded-lg transition-all duration-200'
                placeholder='Describe your product...'
              />
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div className='space-y-2'>
                <label className='block text-sm font-medium text-gray-700'>
                  Price
                  <span className='text-red-500 ml-1'>*</span>
                </label>
                <div className='relative rounded-lg shadow-sm'>
                  <div className='absolute inset-y-0 left-3 flex items-center pr-3 pointer-events-none'>
                    <span className='text-gray-500'>$</span>
                  </div>
                  <input
                    value={formData.prize}
                    onChange={(e) => setformData({ ...formData, prize: e.target.value })}
                    type="number"
                    className='block w-full pl-8 pr-4 py-3 border-0 ring-1 ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 rounded-lg transition-all duration-200'
                    placeholder='0.00'
                  />
                </div>
              </div>
              <div className='space-y-2'>
                <label className='block text-sm font-medium text-gray-700'>
                  Category
                  <span className='text-red-500 ml-1'>*</span>
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setformData({ ...formData, category: e.target.value })}
                  className='block w-full px-4 py-3 border-0 ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-500 rounded-lg appearance-none bg-white transition-all duration-200'
                >
                  <option value="">Select a category</option>
                  {categories.map(item=>{
                    return <option key={item} value={item}>{item}</option>
                  })}
                </select>
                <div className='pointer-events-none absolute inset-y-0 right-3 flex items-center px-2 text-gray-700'>
                  <svg className='h-5 w-5' fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
            <div>

            <label className='flex gap-2 bg-gray-50 w-fit mx-auto px-3 p-2.5 rounded-sm text-gray-400 cursor-pointer hover:bg-gray-200 hover:text-black duration-150' htmlFor="file">
              <Image />
              <span>Upload Image</span>
            </label>
            <input onChange={(e) => hadleImage(e)} className='hidden' type="file" id="file" />
            {formData.image && <div className='text-green-600 flex gap-2  justify-center items-center mt-2 text-center font-bold'>
                <p>Image Uploaded</p>
                <SquareCheck/>
            </div>}
            </div>
            <div className='pt-6'>
              <button
                type='submit'
                className='w-full bg-gradient-to-r cursor-pointer duration-200 flex justify-center from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-colors'
              >
                    {isCreating  ? <Loader2 className='animate-spin'/> : "Create Product" }
                
              </button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  )
}

export default CreateProducts
