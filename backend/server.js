import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js' 
import morgan from 'morgan'
// import products from './data/products.js'
import {notFound, errorHandler} from './middleware/errorMiddleware.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'


// const express = require('express')
// const products = require('./data/products')
// const dotenv = require('dotenv')

//init .env
dotenv.config()

// init db connection
connectDB()

const app = express()

//used express body parser
app.use(express.json())

// add morgan in case of dev mode
if(process.env.NODE_ENV === 'development') {
   app.use(morgan('dev'))
}

// backend server root path 
// app.get('/', (req, res) => {
//    res.send('API is running')
// })

// import routes
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

// get PP details
app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))

// make uplaod folder static 
const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

// define build for prod
if(process.env.NODE_ENV === 'production'){
   app.use(express.static(path.join(__dirname,'/frontend/build')))
   app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend','build', 'index.html')))
}else {
   app.get('/', (req, res) => {
      res.send('API is running')
   })
}


// define non existing url
app.use(notFound)
//handle custom messages via middleware layer
app.use(errorHandler)



// set backend server ports
// call the .env 
const PORT = process.env.NODE_PORT || 5000

app.listen(
   PORT, 
   console.log(`Backend server running ${process.env.NODE_ENV} mode on port ${PORT}`.green.bold)
   )