import User from "../models/User.js"
import { StatusCodes } from 'http-status-codes';

import { BadRequestError } from "../errors/index.js";

const register = async (req, res) => {
   const { firstName, lastName, collageNumber, email, role } = req.body
   // console.log(firstName, lastName, collageNumber, email, role);
   if (!firstName || !collageNumber || !email || !role) {
      throw new BadRequestError('Please provide all value')
   }

   const userAlreadyExists = await User.findOne({ collageNumber })
   if (userAlreadyExists) {
      throw new BadRequestError('User already exists')
   }

   const user = await User.create({ firstName, lastName, collageNumber, email, role })

   const token = user.createJWT()

   res
      .status(StatusCodes.OK)
      .json({
         user: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            collageNumber: user.collageNumber,
            role: user.role
         },
         token
      })

}

const login = async (req, res) => {
   const { studentNumber, password } = req.body;
   if (!email || !password) {
      throw new BadRequestError('Please provide all values');
   }
   const user = await User.findOne({ studentNumber }).select('+password');
   if (!user) {
      throw new UnAuthenticatedError('Invalid Credentials');
   }
   const isPasswordCorrect = await user.comparePassword(password);
   if (!isPasswordCorrect) {
      throw new UnAuthenticatedError('Invalid Credentials');
   }

}

const updateUser = (req, res) => {
   res.status(200).json({ msg: 'updateUser' })
}



export { register, updateUser, login }