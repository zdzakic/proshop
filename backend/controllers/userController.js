import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'


//@DESC     Auth user and get token 
//@ROUTE    POST /api/users/login
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
         // token: null,
         token: generateToken(user._id),
      })
   } else {
      res.status(401)
      throw new Error('Invalid email or password!')
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
      res.status(400)
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
      res.status(201).json({
          _id: user._id,
         name: user.name,
         email: user.email,
         isAdmin: user.isAdmin,
         token: generateToken(user._id),
      })
   }else {
      res.status(400)
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


//@DESC     GEt all users
//@ROUTE    GET /api/users
//@ACCESS   access : Private /Admin
const getUsers = asyncHandler(async(req, res) => {
   const users = await User.find({})
   res.json(users)

})

//@DESC     Delete user
//@ROUTE    DELETE /api/user/:id
//@ACCESS   access : Private /Admin
const deleteUser = asyncHandler(async(req, res) => {

   const user = await User.findById(req.params.id)

   if (user) {
      await user.remove()
      res.json({message: 'User removed'})
   }else {
      res.status(404)
      throw new Error('User not found!')
   }
})


//@DESC     GEt user by id
//@ROUTE    GET /api/users/:id
//@ACCESS   access : Private /Admin
const getUserById = asyncHandler(async(req, res) => {

   const user = await User.findById(req.params.id).select('-password')

   if (user) {
      res.json(user)
   }else {
      res.status(404)
      throw new Error('User not found!') 
   }
   
})


//@DESC     Update user 
//@ROUTE    PUT /api/users/:id
//@ACCESS   access : Private/Admin
// const updateUser = asyncHandler(async(req, res) => {
//    const user = await User.findById(req.params.id)

//    if (user ) {

//       user.name = req.body.name || user.name
//       user.email = req.body.email || user.email
//       user.isAdmin = req.body.isAdmin 

//       const updatedUser = await user.save()

//       res.send({
//           _id: updatedUser._id,
//          name: updatedUser.name,
//          email: updatedUser.email,
//          isAdmin: updatedUser.isAdmin,
//       })
//    }else {
//       res.status(404)
//       throw new Error('User not found')
//    }
// })

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.isAdmin = req.body.isAdmin || user.isAdmin

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})


export { 
   authUser,
   getUserProfile,
   registerUser,
   updateUserProfile,
   getUsers, deleteUser, updateUser, getUserById
}