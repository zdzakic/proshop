import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema({
   name: { 
      type: String,
      required: true
   },
   email: { 
      type: String,
      required: true,
      unique: true,
   },
   password: { 
      type: String,
      required: true
   },
   isAdmin: { 
      type: Boolean,
      required: true,
      default: false
   }
}, {
   timestamps: true
})

// compare passwords 
userSchema.methods.matchPassword = async function (enteredPassword) {
   return await bcrypt.compare(enteredPassword, this.password)
}

// hash the password before the save to db (pre method) | registerUer
userSchema.pre('save', async function (next) {
   //in case user is modifed, do nto hash password
   if(!this.isModified('password')) {
      next()
   }

   const salt = await bcrypt.genSalt(10)
   this.password = await bcrypt.hash(this.password, salt)
})


const User = mongoose.model('User', userSchema)

export default User