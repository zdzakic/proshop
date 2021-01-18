import express from 'express'
const router = express.Router()
import {
   authUser, 
   registerUser, 
   getUserProfile, 
   updateUserProfile} from '../controllers/userController.js'
import {protect} from '../middleware/authMiddleware.js'

//route for registered user 
router.route('/').post(registerUser)
//root route for login 
router.post('/login', authUser)
//add middleware protect route (login required)
router
   .route('/profile')
   .get(protect, getUserProfile)
   .put(protect, updateUserProfile)


export default router