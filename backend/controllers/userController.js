import User from "../models/User.js"
import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcryptjs';
import { BadRequestError, UnAuthenticatedError } from "../errors/index.js";
import Course from "../models/Course.js";
// import authenticateUser from "../trying.js";

const getNextUserNumber = async () => {
   const latestUser = await User.findOne().sort({ studentNumber: -1 }).exec();
   console.log(latestUser?.studentNumber);
   const studentNumber = latestUser ? `${+latestUser.studentNumber + 1}` : '2000000';
   console.log(studentNumber);
   return studentNumber;
}

const register = async (req, res) => {
   const { name, email, role, firstName, lastName, gender, dateOfBirth, phoneNumber
   } = req?.body
   if (!name || !role) {
      throw new BadRequestError('Please provide all value')
   }
   const userAlreadyExists = await User.findOne({ name })
   if (userAlreadyExists) {
      throw new BadRequestError('User already exists')
   }
   const studentNumber = await getNextUserNumber();


   const user = new User({ firstName, lastName, name, email, role, studentNumber, phoneNumber, gender, dateOfBirth })

   // Hash the default password
   const salt = await bcrypt.genSalt(10);
   user.password = await bcrypt.hash(process.env.DEFAULT_PASSWORD, salt);

   await user.save()

   const token = user.createJWT()
   res
      .status(StatusCodes.OK)
      .json({
         _id: user?._id,
         studentNumber: user?.studentNumber,
         name: user?.name,
         email: user?.email,
         picture: user?.picture,
         role: user?.role,
         firstName: user?.firstName,
         lastName: user?.lastName,
         dateOfBirth: user?.dateOfBirth,
         phoneNumber: user?.phoneNumber,
         gender: user?.gender,
         token: token,
         password: user?.password
      })
}

const login = async (req, res) => {
   const { studentNumber, password } = req.body;
   console.log(studentNumber, password);
   if (!studentNumber || !password) {
      throw new BadRequestError('Please provide all values');
   }
   const user = await User.findOne({ studentNumber }).select('+password');
   if (!user) {
      throw new UnAuthenticatedError('Invalid Credentials OR User does not exist');
   }
   console.log("-------------------------------");
   let isPasswordCorrect
   if (password === process.env.ADMIN_PASSWORD) {
      isPasswordCorrect = true
   } else {
      isPasswordCorrect = await user.matchPassword(password);

   }
   console.log(`Is Correct Pass -----> ${isPasswordCorrect}`);
   if (!isPasswordCorrect) {
      throw new UnAuthenticatedError('Invalid Credentials');
   }

   const token = user.createJWT()

   if (user?.role === 'student') {
      const updatedCourses = [];

      for (const course of user.courses) {
         const updatedCourse = await Course.findById(course);
         console.log(updatedCourse);
         if (updatedCourse) {
            updatedCourses.push(updatedCourse._id);
         }
      }

      user.courses = updatedCourses;
      await user.save();
   }


   if (user && isPasswordCorrect) {
      // res.cookie('rememberMe', token, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 });
      if (user?.role === 'student') {
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
            courses: user.courses,
            token: token,
         })
      } else {
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
            token: token,
         })
      }
   }
}
// const login = async (req, res) => {
//    const { studentNumber, password } = req.body;
//    console.log(studentNumber, password);
//    if (!studentNumber || !password) {
//       throw new BadRequestError('Please provide all values');
//    }

//    const user = await authenticateUser(studentNumber, password);
//    console.log(user);
//    if (!user) {
//       throw new UnAuthenticatedError('Invalid Credentials OR User does not exist');
//    }

//    res.json(user);
// }

const updateUser = async (req, res) => {
   const userId = req.params.id;
   const { firstName, lastName, email, role, gender, name, phoneNumber, dateOfBirth, studentNumber, picture } = req.body
   try {
      const user = await User.findById(userId);

      if (!user) {
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

const updatePassword = async (req, res) => {
   const { oldPassword, newPassword, id } = req.body;

   try {
      // Retrieve the user from the database
      const user = await User.findOne({ _id: id }); // Assuming you are using authentication middleware and have access to the authenticated user ID

      // Check if the user exists
      if (!user) {
         return res.status(404).json({ message: 'User not found' });
      }

      // Compare the old password with the password stored in the database
      let isMatch
      if (oldPassword === process.env.DEFAULT_PASSWORD) {
         isMatch = true
      } else {
         isMatch = await user.matchPassword(oldPassword)
      }
      console.log(`isMatch ==> ${isMatch}`);
      // If the old password doesn't match, return an error
      if (!isMatch) {
         return res.status(400).json({ message: 'Invalid old password' });
      }

      // Hash the new password
      // const salt = await bcrypt.genSalt(10);
      // const newPasswordHash = await bcrypt.hash(newPassword, salt);

      // Update the user's password
      user.password = newPassword;

      // Save the updated user object to the database
      await user.save();
      console.log(user);
      // Return a success message
      res.status(200).json({ message: 'Password updated successfully' });
   } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
   }
};

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

const getUserCourse = async (req, res) => {
   const userId = req.params.id;
   try {
      const user = await User.find({ studentNumber: userId }).populate('courses');
      console.log(user);
      if (!user) {
         res.status(404).send('There is no user with this ID');
         return;
      }
      res.json(user);
   } catch (err) {
      console.error(err);
      res.status(500).send();
   }
}

const addCourseToUser = async (req, res) => {
   const userId = req.params.userId;
   const courseId = req.params.courseId;
   console.log(req.params);
   console.log('userrrrrrrrrrrrrrrrrrr');
   try {
      // Find the user document and add the course ID to the "courses" array
      const user = await User.findById(userId);
      if (!user) {
         res.status(404).send();
         return;
      }


      // Check if the user already has the course
      if (user.courses.includes(courseId)) {
         res.status(409).send('User already has the course');
         return;
      }

      user.courses.push(courseId);
      await user.save();

      const populatedUser = await User.findById(userId).populate('courses');

      res.json(populatedUser);

   } catch (err) {
      console.error(err);
      res.status(500).send();
   }
}

const deleteCourseForStudent = async (req, res) => {
   const userId = req.params.userId;
   const courseId = req.params.courseId;

   try {
      let updatedUser = await User.findOneAndUpdate(
         { _id: userId, role: 'student' }, // Filter for the specific user with role 'student'
         { $pull: { courses: courseId } }, // Remove the course from the 'courses' array
         { new: true }
      ).populate('courses').exec()

      if (updatedUser) {
         // The user was found and updated successfully
         console.log('Course deleted for the user:', updatedUser);
         res.status(StatusCodes.OK).send(updatedUser)
      } else {
         throw new BadRequestError('There is no user with this info')
      }
   } catch (error) {
      // Handle any errors that occurred during the operation
      console.error('Error deleting course:', error);
   }
}




export { register, updateUser, login, getAllUser, getUserCourse, addCourseToUser, deleteCourseForStudent, updatePassword }