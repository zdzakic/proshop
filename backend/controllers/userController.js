import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'


//@DESC     Auth user and get token 
//@ROUTE    POST /api/user/login
//@ACCESS   access : public 
const authUser = asyncHandler(async(req, res) => {
   const {email, password} = req.body

   const user = await User.findOne({email})

   //check user and match pass
   if (user && (await user.matchPassword(password))) {
      res.json({
         _id: user._id,
         name: user.name,
         email: user.email,
         isAdmin: user.isAdmin,
         token: generateToken(user._id),
      })
   } else {
      res.status(401)
      throw new Error('Invalid user or password!')
   }
})


//@DESC     Create a new user  
//@ROUTE    POST /api/users
//@ACCESS   access : public 
const registerUser = asyncHandler(async(req, res) => {

   const {name, email, password} = req.body

   const userExists = await User.findOne({email})

   //check if user exists 
   if (userExists) {
      res.send(400)
      throw new Error('User already exists')
   }

   //create user with User model 
   const user = await User.create({
      name, 
      email, 
      password
   })

   //once user created, authenticate it automatically
   if (user) {
      res.send({
          _id: user._id,
         name: user.name,
         email: user.email,
         isAdmin: user.isAdmin,
         token: generateToken(user._id),
      })
   }else {
      res.send(400)
      throw new Error('Invalid User Data')
   }

})


//@DESC     Get user profile
//@ROUTE    GET /api/users/profile
//@ACCESS   access : Private 
const getUserProfile = asyncHandler(async(req, res) => {
   const user = await User.findById(req.user._id)

   if (user ) {
      res.json({
         _id: user._id,
         name: user.name,
         email: user.email,
         isAdmin: user.isAdmin
      })
   }else {
      res.send(404)
      throw new Error('User not found')
   }
})


//@DESC     Update user profile
//@ROUTE    PUT /api/users/profile
//@ACCESS   access : Private 
const updateUserProfile = asyncHandler(async(req, res) => {
   const user = await User.findById(req.user._id)

   if (user ) {

      user.name = req.body.name || user.name
      user.email = req.body.email || user.email
      if (req.body.password) {
         user.password = req.body.password
      }

      const updatedUser = await user.save()

      res.send({
          _id: updatedUser._id,
         name: updatedUser.name,
         email: updatedUser.email,
         isAdmin: updatedUser.isAdmin,
         token: generateToken(updatedUser._id),
      })

   }else {
      res.send(404)
      throw new Error('User not found')
   }
})


export { 
   authUser,
   getUserProfile,
   registerUser,
   updateUserProfile
}