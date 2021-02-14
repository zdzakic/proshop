import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'


// @DESC create a new order
// @route POST /api/orders  
// @access  : public 
const addOrderItems = asyncHandler(async(req, res) => {
   const {orderItems, 
         shippingAddress, 
         paymentMethod, 
         itemsPrice,
         taxPrice, 
         shippingPrice, 
         totalPrice} = req.body

   if (orderItems && orderItems.length === 0) {
      res.status(400)
      throw new Error('No order items')
      return
   }else {
      const order = new Order ({
         orderItems,
         user: req.user._id,
         shippingAddress, 
         paymentMethod, 
         itemsPrice,
         taxPrice, 
         shippingPrice, 
         totalPrice
      })
      const createdOrder = await order.save()
      res.status(201).json(createdOrder)
   }
})

// @DESC Get order by ID
// @route GET /api/orders:id
// @access  : private 
const getOrderById = asyncHandler(async(req, res) => {
   const order = await Order.findById(req.params.id).populate('user','name email')

   if (order) {
      res.json(order)
   }else {
      res.status(404)
      throw new Error('Order does not exist')
   }
})

// @DESC    Update order to paid
// @route   GET /api/orders:id/pay
// @access  : Private 
const updateOrderToPaid = asyncHandler(async(req, res) => {

   const order = await Order.findById(req.params.id)

   if (order) {
      order.isPaid = true
      order.paidAt = Date.now()
      // here responce from PP in form of an object
      order.paymentResult = {
         id: req.body.id,
         status: req.body.status,
         update_time: req.body.update_time,
         email_adress: req.body.payer.email_adress,
      }
      const updatedOrder = await order.save()
      res.json(updatedOrder)

   }else {
      res.status(404)
      throw new Error('Order does not exist')
   }
})


// @DESC    get logged in user orders
// @route   GET /api/orders/myorders
// @access  : Private 
const getMyOrders = asyncHandler(async(req, res) => {
   const orders = await Order.find({user: req.user._id})
   res.json(orders)
})


// @DESC    get all orders 
// @route   GET /api/orders
// @access  : Private/Admin
const getOrders = asyncHandler(async(req, res) => {
   const orders = await Order.find({}).populate('user', 'id name')
   res.json(orders)
})


// @DESC    Update order to delivred
// @route   PUT /api/orders/:id/deliver
// @access  : Private/Admin
const updateOrderToDelivered = asyncHandler(async(req, res) => {

   const order = await Order.findById(req.params.id)

   if (order) {
      order.isDelivered = true
      order.deliveredAt = Date.now()
     
      const updatedOrder = await order.save()
      res.json(updatedOrder)

   }else {
      res.status(404)
      throw new Error('Order does not exist')
   }
})


export {addOrderItems, 
         getOrderById, 
         updateOrderToPaid, 
         getMyOrders, 
         getOrders, 
         updateOrderToDelivered}

