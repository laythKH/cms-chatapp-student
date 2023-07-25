import User from "../models/User.js"
import Course from "../models/Course.js"

import { StatusCodes } from 'http-status-codes';

import { BadRequestError, UnAuthenticatedError } from "../errors/index.js";


const createCourse = async (req, res) => {
   const { name, mangerID, description, teacher, assignment } = req.body

   if(!name || !mangerID) {
      throw new BadRequestError('Please provide all value')
   }

   const courseIsAlreadyExists = await Course.findOne({ name: name }); 
   if(courseIsAlreadyExists) {
      console.log(courseIsAlreadyExists);
      throw new BadRequestError('Course already exists')
   }

   let course = await Course.create({
      name,
      mangerID, 
      description, 
      teacher,
      assignment
   })

   course = await course.populate('teacher')

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

   if(isCourseFound) {
      await Course.deleteOne({_id: courseId})

      res.send(`Course with ID ${courseId} has been deleted`);
   } else {
      throw new BadRequestError(`Course with ID ${courseId} not found`)
   }

}


const updateCourse = async (req, res) => {
   const courseId = req.params.id;
   const newUpdates = req.body;

   const isFound = await Course.findByIdAndUpdate(courseId, newUpdates);

   if(isFound) {
      console.log(isFound);
      res.send(`Course with ID ${courseId} has been updated`);
   } else {
      throw new BadRequestError(`Course with ID ${courseId} not found`)
   }
}


const getCoursesBasedOnTeacher = async (req, res) => {
   const teacherId = req.params.id;

   const isTeacherFound = await User.findById(teacherId)

   if(isTeacherFound) {
      console.log("Inside The If");
      console.log(isTeacherFound);
   }

   const courses = await Course.find({ teacher: teacherId})

   if(!courses) {
      res.send("There no courses yet")
   } else {
      res.send(courses)
   }
}




export { getAllCourses, createCourse, updateCourse, deleteCourse, getCoursesBasedOnTeacher }