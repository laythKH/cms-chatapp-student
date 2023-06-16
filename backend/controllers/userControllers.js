import User from "../models/User.js"
import { StatusCodes } from 'http-status-codes';



const register = async (req, res) => {
   const { firstName, lastName, collageNumber, email, role } = req.body
   // console.log(firstName, lastName, collageNumber, email, role);
   if (!firstName || !lastName || !collageNumber || !email || !role) {
      throw new Error('Please provide all value')
   }

   const userAlreadyExists = await User.findOne({ collageNumber })
   if (userAlreadyExists) {
      throw new Error('User already exists')
   }

   const user = await User.create({ firstName, lastName, collageNumber, email, role })

   res
      .status(StatusCodes.OK)
      .json({
         user: {
            firstName: user.firstName,
            lastName: user.lastname,
            collageNumber: user.collageNumber,
            email: user.email,
            role: user.role
         }
      })
   // res.status(200).json({ msg: 'register' })
}

const login = (req, res) => {
   res.status(200).json({ msg: 'login' })

}

const logout = (req, res) => {
   res.status(200).json({ msg: 'logout' })
}


export { register, logout, login }