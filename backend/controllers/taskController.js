import User from "../models/User.js"
import Course from "../models/Course.js"
import Assignment from '../models/Assignment.js'

import { StatusCodes } from 'http-status-codes';

import { BadRequestError, UnAuthenticatedError } from "../errors/index.js";

const getAllAssignment = async (req, res) => {
   const teacherId = req.params.userId

   try {
      const courses = await Course.find({ teacher: teacherId });

      if (!courses) {
         res.status(StatusCodes.OK).send('There No Courses Yet')
      } else {
         res.send(courses)
      }

   } catch (error) {
      console.log(error);
      throw new BadRequestError('Failed to get courses by teacher ID');
   }
}


const createAssignment = async (req, res) => {
   const { name, description, course, dueDate } = req.body

   if (!name || !description || !course || !dueDate) {
      throw new BadRequestError('There is missing info')
   }

   const isThereAssignmentForSpecificCourse = await Assignment.find({ course: course })

   if (isThereAssignmentForSpecificCourse?.length !== 0) {
      console.log(isThereAssignmentForSpecificCourse);
      throw new BadRequestError('There is Already Assignment For this course')
   }

   const assignment = new Assignment({
      name: name,
      description: description,
      course: course,
      dueDate: dueDate
   });

   await assignment.save()

   // ==============================================

   let findTheTargetCourse = await Course.findById({ _id: course })

   findTheTargetCourse.assignment = assignment._id;

   await findTheTargetCourse.save()

   // ==============================================

   if (assignment) {
      res.status(StatusCodes.OK).send(assignment)
   } else {
      throw new BadRequestError('There is messing info')
   }
}


export {
   getAllAssignment,
   createAssignment
}