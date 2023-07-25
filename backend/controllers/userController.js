import User from "../models/User.js"
import { StatusCodes } from 'http-status-codes';

import { BadRequestError, UnAuthenticatedError } from "../errors/index.js";

const getNextUserNumber = async () => {
  const latestUser = await User.findOne().sort({ studentNumber: -1 }).exec();
  console.log(latestUser?.studentNumber);
  const studentNumber = latestUser ? `${+latestUser.studentNumber + 1}` : '2000000';
  console.log(studentNumber);
  return studentNumber;
}

const register = async (req, res) => {
   const { name, email, role, firstName, lastName, gender, dateOfBirth, phoneNumber } = req.body
   // console.log(firstName, lastName, collageNumber, email, role);
   // if (!name || !studentNumber || !email || !role) {
   if (!name || !role) {
      throw new BadRequestError('Please provide all value')
   }

   const userAlreadyExists = await User.findOne({ name })
   if (userAlreadyExists) {
      throw new BadRequestError('User already exists')
   }

   const studentNumber = await getNextUserNumber();
   // console.log(studentNumber);

   const user = await User.create({firstName, lastName, name, email, role, studentNumber, phoneNumber, gender, dateOfBirth })

   const token = user.createJWT()

   // res
   //    .status(StatusCodes.OK)
   //    .json({
   //       _id: user._id,
   //       name: user.name,
   //       email: user.email,
   //       studentNumber: user.studentNumber,
   //       token,
   //       role: user.role
   //    })

   res
      .status(StatusCodes.OK)
      .json({
         _id: user._id,
         studentNumber: user.studentNumber,
         name: user.name,
         email: user.email,
         picture: user.picture,
         role: user.role,
         firstName: user.firstName,
         lastName: user.lastName,
         dateOfBirth: user.dateOfBirth,
         phoneNumber: user.phoneNumber,
         gender: user.gender,
         token: token
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
      // res.cookie('rememberMe', token, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 });

      res.json({
         _id: user._id,
         name: user.name,
         email: user.email,
         studentNumber: user.studentNumber,
         picture: user.picture,
         role: user.role,
         firstName: user.firstName,
         lastName: user.lastName,
         phoneNumber: user.phoneNumber,
         dateOfBirth: user.dateOfBirth,
         gender: user.gender,
         token: token
      })
   }
}

const updateUser = async (req, res) => { 
   const userId = req.params.id;
   const { firstName, lastName, email, role, gender, name, phoneNumber, dateOfBirth, studentNumber, picture} = req.body
   try {
      const user = await User.findById(userId);

      if(!user) {
         throw new BadRequestError('There No User For this ID')
      }
      // Update user information
      user.firstName = firstName;
      user.lastName = lastName;
      user.name = name;
      user.gender = gender;
      user.email = email;
      user.dateOfBirth = dateOfBirth;
      user.studentNumber = studentNumber;
      // user.picture = picture
      user.role = role;
      user.phoneNumber = phoneNumber;

      await user.save();

      res.status(200).json({ message: 'User updated successfully' });
   } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
   }
}

const getAllUser = async (req, res) => {
   const keyword = req.query.search ? {
      $or: [
         { name: { $regex: req.query.search, $options: "i" } },
         { studentNumber: { $regex: req.query.search } },
      ]
   } : {}

   console.log(req.query.search);


   const users = await User.find(keyword).find({ _id: { $ne: req.user._id } })


   res.send(users)

}

export { register, updateUser, login, getAllUser }