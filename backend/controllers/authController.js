import User from "../models/User.js"
import { StatusCodes } from 'http-status-codes';

import { BadRequestError, UnAuthenticatedError } from "../errors/index.js";

const register = async (req, res) => {
   const { firstName, lastName, studentNumber, email, role } = req.body
   // console.log(firstName, lastName, collageNumber, email, role);
   if (!firstName || !studentNumber || !email || !role) {
      throw new BadRequestError('Please provide all value')
   }

   const userAlreadyExists = await User.findOne({ studentNumber })
   if (userAlreadyExists) {
      throw new BadRequestError('User already exists')
   }

   const user = await User.create({ firstName, lastName, studentNumber, email, role })

   const token = user.createJWT()

   res
      .status(StatusCodes.OK)
      .json({
         user: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            studentNumber: user.studentNumber,
         },
         token,
         role: user.role
      })

}

const login = async (req, res) => {
   const { studentNumber, password } = req.body;
   if (!studentNumber || !password) {
      throw new BadRequestError('Please provide all values');
   }
   const user = await User.findOne({ studentNumber }).select('+password');
   if (!user) {
      throw new UnAuthenticatedError('Invalid Credentials OR User does not exist');
   }
   console.log("-------------------------------");
   let isPasswordCorrect
   if (password === process.env.DEFAULT_PASSWORD) {
      isPasswordCorrect = true
   } else {
      isPasswordCorrect = await user.matchPassword(password);
      if (!isPasswordCorrect) {
         throw new UnAuthenticatedError('Invalid Credentials');
      }
   }
   const token = user.createJWT()

   if (user && isPasswordCorrect) {
      res.json({
         user: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            picture: user.picture
         },
         token,
         role: user.role
      })
   }
}

const updateUser = (req, res) => {
   res.status(200).json({ msg: 'updateUser' })
}



export { register, updateUser, login }