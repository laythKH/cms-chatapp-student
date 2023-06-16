import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


const userSchema = new mongoose.Schema({
   firstName: {
      type: String,
      required: [true, 'Please provide name'],
      minlength: 3,
      maxlength: 20,
      trim: true,
   },
   lastName: {
      type: String,
      required: [true, 'Please provide name'],
      minlength: 3,
      maxlength: 20,
      trim: true,
   },
   collageNumber: {
      type: String,
      required: [true, 'Please provide number'],
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
      required: false,
      minlength: 6,
      select: false,
      default: '100200300'
   },
   role: {
      type: String,
      required: [true, 'please provide the Role of user']
   }
})


export default mongoose.model('User', userSchema)