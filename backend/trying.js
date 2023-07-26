import User from "./models/User.js";

async function authenticateUser(studentNumber, password) {
   const user = await User.findOne({ studentNumber }).select('+password');
   console.log(studentNumber, password);
   if (!user) {
      return null;
   }

   let isPasswordCorrect;

   if (password === process.env.DEFAULT_PASSWORD) {
      isPasswordCorrect = true;
   } else {
      isPasswordCorrect = await user.matchPassword(password);
   }

   if (!isPasswordCorrect) {
      return null;
   }

   const token = user.createJWT();

   // Return the authenticated user object with the token property
   return {
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
   };
}


export default authenticateUser