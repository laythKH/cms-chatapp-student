import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


const UserSchema = new mongoose.Schema({
   // firstName: {
   //    type: String,
   //    required: [true, 'Please provide name'],
   //    minlength: 3,
   //    maxlength: 20,
   //    trim: true,
   // },
   // lastName: {
   //    type: String,
   //    minlength: 3,
   //    maxlength: 20,
   //    trim: true,
   // },
   name: {
      type: String,
      minlength: 5,
      trim: true,
   },
   studentNumber: {
      type: String,
      required: [true, 'Please provide number'],
   },
   picture: {
      type: String,
      default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
   },
   email: {
      type: String,
      required: [true, 'Please provide email'],
      validate: {
         validator: validator.isEmail,
         message: 'Please provide a valid email'
      },
      unique: true
   },
   password: {
      type: String,
      minlength: 6,
      select: false,
      default: '100200300'
   },
   role: {
      type: String,
      required: [true, 'please provide the Role of user']
   }
})

UserSchema.pre('save', async function () {
   // console.log(this.modifiedPaths())
   if (!this.isModified('password')) return
   console.log('after isModified');
   const salt = await bcrypt.genSalt(10)
   this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.createJWT = function () {
   // console.log(this);
   return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME })
}

UserSchema.methods.matchPassword = async function (enteredPassword) {
   return await bcrypt.compare(enteredPassword, this.password);
};



export default mongoose.model('User', UserSchema)