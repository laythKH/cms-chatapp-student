import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


const UserSchema = new mongoose.Schema({
   name: {
      type: String,
      minlength: 5,
      trim: true,
      required: [true, 'Please provide Full NAME'],
   },
   firstName: {
      type: String,
      minlength: 3,
      maxlength: 20,
      default: 'first name',
      trim: true,
      required: [true, 'Please provide First Name'],
      // required: false,
   },
   lastName: {
      type: String,
      minlength: 3,
      maxlength: 20,
      default: 'last name',
      trim: true,
      required: [true, 'Please provide Last Name'],
      // required: false,
   },
   phoneNumber: {
      type: String,
      default: '0000000000',
      required: false,
   },
   dateOfBirth: {
      type: Date,
      trim: true,
      default: Date.now,
      // required: false,
   },
   studentNumber: {
      type: String,
      // required: [true, 'Please provide number'],
   },
   picture: {
      type: String,
      default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
   },
   gender: {
      type: String,
      enum: ['male', 'female'],
      // required: false,
      default: 'male'
   },
   email: {
      type: String,
      // required: [true, 'Please provide email'],
      validate: {
         validator: validator.isEmail,
         message: 'Please provide a valid email'
      },
      unique: true,
   },
   password: {
      type: String,
      minlength: 6,
      select: false,
      default: '100200300'
   },
   role: {
      type: String,
      enum: ['student', 'teacher', 'manager', 'admin'],
      required: [true, 'please provide the Role of user']
   },
   courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
   // courses: [{ type: String }]
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