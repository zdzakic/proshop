import mongoose from 'mongoose'
import colors from 'colors'
import dotenv from 'dotenv'
import users from './data/users.js'
import products from './data/products.js'
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'
import connectDB from './config/db.js'

dotenv.config()
connectDB()

// import data
const importData = async () => {
   try {
      //delete existing data first 
      await Order.deleteMany()
      await Product.deleteMany()
      await User.deleteMany()

      //create data
      const createdUsers = await User.insertMany(users)

      //admin user first in array 
      const adminUser = createdUsers[0]._id

      //sample products
      const sampleProducts = products.map(product => {
         return { ...product, user: adminUser}
      })

      //insert products
      await Product.insertMany(sampleProducts)
      console.log('Data imported'.green.inverse)
      
      process.exit()

   } catch (error) {
      console.log(`Error: ${error.message}`.red.inverse)
      process.exit(1)
   }
}

// destroy data
const destroyData = async () => {
   try {
      //delete existing data first 
      await Order.deleteMany()
      await Product.deleteMany()
      await User.deleteMany()

      console.log('Data destroyed:'.red.inverse)
      process.exit()
   } catch (error) {
      console.log(`Error: ${error.message}`.red.inverse)
      process.exit(1)
   }
}

// set the arguemnt for script (-d delete, else import data)
if (process.argv[2] === '-d') {
   destroyData()
}else {
   importData()
}