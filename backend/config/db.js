import mongoose from 'mongoose'
import colors from 'colors'
// const mongoose = require('mongoose')

const connectDB = async () => {
   try {
      const conn =  await mongoose.connect(process.env.MONGO_URI, {
         useUnifiedTopology: true,
         useNewUrlParser: true,
         useCreateIndex: true,
      })
      console.log(`MongoDB connected: ${conn.connection.host}`.cyan)
   } catch (error) {
      console.log(`Error: ${error.messsage}`.red)
      process.exit(1)
   }
}

export default connectDB
