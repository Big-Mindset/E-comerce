import React, { useEffect, useState } from 'react'
import axiosInstance from '../store/axios'
import { motion } from 'framer-motion'
import { Users, Package, DollarSign, BarChart } from 'react-feather'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { toast } from 'react-hot-toast'
import { ResponsiveContainer , LineChart , XAxis , YAxis,Tooltip , Legend,CartesianGrid, Line } from 'recharts'

const Analytics = () => {
  const [analyticsData, setAnalyticsData] = useState(null)
  const [loading, setLoading] = useState(true)
  
  const metrics = [
    { 
      label: "Total Users",
      value: analyticsData?.Users,
      icon: <Users className="w-6 h-6" />,
      color: 'from-blue-600 to-cyan-500'
    },
    { 
      label: "Total Products",
      value: analyticsData?.products,
      icon: <Package className="w-6 h-6" />,
      color: 'from-purple-600 to-pink-500'
    },
    { 
      label: "Total Revenue",
      value: `$${analyticsData?.totalRevenue?.toLocaleString()}`,
      icon: <DollarSign className="w-6 h-6" />,
      color: 'from-green-600 to-emerald-400'
    },
    { 
      label: "Total Sales",
      value: analyticsData?.totalSales,
      icon: <BarChart className="w-6 h-6" />,
      color: 'from-orange-600 to-amber-400'
    }
  ]

  const getAnalyticsData = async () => {
    try {
      const { data } = await axiosInstance.get("/analatics/getAnalatics")
      
      setAnalyticsData(data)
    } catch (error) {
      toast.error(`Failed to load analytics: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }
  
console.log(analyticsData?.dailySales);

  useEffect(() => {
    getAnalyticsData()
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard Analytics</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading ? (
          Array(4).fill(0).map((_, index) => (
            <Skeleton 
              key={index}
              height={120}
              borderRadius={12}
              baseColor="#f3f4f6"
              highlightColor="#e5e7eb"
            />
          ))
        ) : metrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className={`bg-gradient-to-r ${metric.color} rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white/90 mb-2">{metric.label}</p>
                  <p className="text-3xl font-bold text-white">
                    {metric.value || 0}
                  </p>
                </div>
                <div className="p-3 bg-white/10 rounded-full">
                  {React.cloneElement(metric.icon, { className: 'w-8 h-8 text-white' })}
                </div>
              </div>
              
              <div className="mt-4">
                <div className="h-1 bg-white/20 rounded-full">
                  <div 
                    className="h-full bg-white/40 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((metric.value / 1000) * 100, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
        <motion.div
        initial={{y : 20 , opacity : 0 }}
        animate={{ y : 0 , opacity : 1}}
        transition={{duration : 0.5 , delay : 0.2}}
        className='mt-4'>
          <ResponsiveContainer width='100%' height={400}>
            <LineChart data={analyticsData?.dailySales}>
              <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="date" stroke='#D1D5DB'/>
            <YAxis yAxisId="left" stroke='#D1D5DB'/>
            <YAxis yAxisId="right" stroke='#D1D5DB' orientation='right'/>
            <Tooltip/>
            <Legend/>
            <Line
            yAxisId="left"
            type="monotone"
            dataKey="sales"
            stroke='green'
            activeDot={{r : 8}}
            name='Sales'
            />
            <Line
            yAxisId="right"
            type="monotone"
            dataKey="revenue"
            stroke='blue'
            activeDot={{r : 8}}
            name='Revenue'
            />
            </LineChart>
          </ResponsiveContainer>

        </motion.div>
      {!loading && !analyticsData && (
        <div className="text-center py-12 text-gray-500">
          Failed to load analytics data
        </div>
      )}
    </div>
  )
}

export default Analytics