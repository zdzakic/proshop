import express from 'express'
const router = express.Router()
import {
   addOrderItems, 
   getOrderById, 
   updateOrderToPaid,
   updateOrderToDelivered,
   getMyOrders, getOrders} from '../controllers/orderController.js'
import {protect, admin} from '../middleware/authMiddleware.js'

//route for orders 
router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders)
router.route('/myorders').get(protect, getMyOrders)            // protected issue with token
router.route('/:id').get(getOrderById)                // fix protected issue with token
router.route('/:id/pay').put(updateOrderToPaid)  
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered)      // fix protected issue with token


export default router