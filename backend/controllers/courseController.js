import User from "../models/User.js"
import Course from "../models/Course.js"

import { StatusCodes } from 'http-status-codes';

import { BadRequestError, UnAuthenticatedError } from "../errors/index.js";


const createCourse = async (req, res) => {
   const { name, description, teacher, assignment } = req.body

   if (!name) {
      throw new BadRequestError('Please provide course name')
   }

   const courseIsAlreadyExists = await Course.findOne({ name: name });
   if (courseIsAlreadyExists) {
      console.log(courseIsAlreadyExists);
      throw new BadRequestError('Course already exists')
   }

   let course = await Course.create({
      name,
      description,
      teacher,
      assignment
   })

   course = await course.populate('teacher')
   console.log(course);
   res
      .status(StatusCodes.OK)
      .json(course)
}

const getAllCourses = async (req, res) => {
   const courses = await Course.find().populate('teacher');

   if (!courses) {
      res.send('There no courses yet')
   } else {
      res.send(courses)
   }
}

const deleteCourse = async (req, res) => {
   const courseId = req.params.id;

   const isCourseFound = await Course.findById(courseId)

   if (isCourseFound) {
      await Course.deleteOne({ _id: courseId })

      res.send(`Course with ID ${courseId} has been deleted`);
   } else {
      throw new BadRequestError(`Course with ID ${courseId} not found`)
   }

}

const updateCourse = async (req, res) => {
   const courseId = req.params.id;
   const newUpdates = req.body;

   if (!(newUpdates?.name)) {
      throw new BadRequestError('Please Provide Full Value')
   }

   try {
      const course = await Course.findById(courseId);

      if (!course) {
         throw new NotFoundError(`Course with ID ${courseId} not found`);
      }

      // Only update the fields that are present in the newUpdates object
      if (newUpdates.name) {
         course.name = newUpdates.name;
      }

      if (newUpdates.description) {
         course.description = newUpdates.description;
      }

      if (newUpdates.teacher) {
         course.teacher = newUpdates.teacher;
      } else {
         course.teacher = null; // Set the teacher field to null if it's not present in the newUpdates object
      }

      const updatedCourse = await course.save();

      console.log(updatedCourse);
      res.send(`Course with ID ${courseId} has been updated`);
   } catch (error) {
      console.log(error);
      throw new InternalServerError('Failed to update course');
   }
}


const getCoursesBasedOnTeacher = async (req, res) => {
   const teacherId = req.params.id;

   const isTeacherFound = await User.findById(teacherId)

   if (isTeacherFound) {
      console.log("Inside The If");
      console.log(isTeacherFound);
   }

   const courses = await Course.find({ teacher: teacherId })

   if (!courses) {
      res.send("There no courses yet")
   } else {
      res.send(courses)
   }
}

// const addCourseToUser = async (req, res) => {
//    const userId = req.params.userId;
//    const courseId = req.params.courseId;
//    console.log(req.params);
//    console.log('userrrrrrrrrrrrrrrrrrr');
//    try {
//       // Find the user document and add the course ID to the "courses" array
//       const user = await User.findById(userId);
//       if (!user) {
//          res.status(404).send();
//          return;
//       }


//       // Check if the user already has the course
//       if (user.courses.includes(courseId)) {
//          res.status(409).send('User already has the course');
//          return;
//       }

//       user.courses.push(courseId);
//       await user.save();

//       const populatedUser = await User.findById(userId).populate('courses');

//       res.json(populatedUser);

//    } catch (err) {
//       console.error(err);
//       res.status(500).send();
//    }
// }

const searchCourseByName = async (req, res) => {
   const courseName = req.params.id;

   try {
      const courses = await Course.find({ name: { $regex: courseName } }).exec();

      if (courses.length > 0) {
         // Courses matching the search criteria were found
         // console.log('Matching courses:', courses);
         console.log('full of courses');
         res.status(StatusCodes.OK).json({
            isThereData: true,
            data: courses
         })
      } else {
         // No courses matching the search criteria were found
         res.status(StatusCodes.OK).json({
            isThereData: false,
         })
      }
   } catch (error) {
      // Handle any errors that occurred during the operation
      console.error('Error searching for courses:', error);
   }
}


export {
   getAllCourses,
   createCourse,
   updateCourse,
   deleteCourse,
   getCoursesBasedOnTeacher,
   // addCourseToUser, 
   searchCourseByName
}