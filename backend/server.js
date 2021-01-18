import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js' 
// import products from './data/products.js'
import {notFound, errorHandler} from './middleware/errorMiddleware.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'


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

// backend server root path 
app.get('/', (req, res) => {
   res.send('API is running')
})

// import routes
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)

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