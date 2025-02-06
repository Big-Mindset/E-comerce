import Order from "../models/payment.model.js"
import Product from "../models/product.model.js"
import User from "../models/user.model.js"

export let getAnalatics = async (req,res)=>{
    try {
        let endDate = new Date()
        let startDate = new Date(endDate.getTime() - 7 * 24 * 60* 60 * 1000)
        
        let AllUsers = await User.countDocuments()
        let AllProducts= await Product.countDocuments()
        let allsales = await Order.aggregate([{
            $group : {
                _id : null,
                totalSales : {$sum : 1},
                totalRevenue : {$sum : "$totalAmount"}
            }
        }])
        
        
        let dailySales = await getDailySeles(startDate,endDate)
        return res.json({
            users : AllUsers,
            products : AllProducts,
            totalRevenue : allsales[0].totalRevenue ||  0,
            totalSales : allsales[0].totalSales || 0,
            dailySales 
        })
        
    } catch (error) {
        return res.json({success : false , message : "Server Error",error : error.message})
    }

}

let getDailySeles = async (startDate , endDate)=>{
    let dailySalesData = await Order.aggregate([
        {
        $match : {
            createdAt : {
                $gte : startDate,
                $lte : endDate,
            }
        }
        },

        {
            $group : {
                _id : {$dateToString : {format : "%Y-%m-%d",date : "$createdAt"}},
                sales : {$sum : 1},
                totalRevenue : {$sum : "$totalAmount"}
            }
        },
        { $sort : { _id : 1} }


        
    ])
    let dateRange = getDateRange(startDate,endDate)
    
    return dateRange.map((date)=>{
        let dailySales = dailySalesData.find((dailySale)=>dailySale._id === date)
        console.log("These are"+date,dailySales);
        console.log(dailySalesData);
        
        return {
            date,
            sales : dailySales?.sales || 0,
            revenue : dailySales?.totalRevenue || 0

        }
    })
}

let getDateRange = (start,end)=>{
    let dates = []
    let currentDate = new Date(start)
    while (currentDate <=end){
        dates.push(currentDate.toISOString().split("T")[0])
        currentDate.setDate(currentDate.getDate() + 1)
    }
    return dates
}