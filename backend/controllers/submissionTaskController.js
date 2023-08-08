import User from "../models/User.js"
import Course from "../models/Course.js"
import Assignment from '../models/Assignment.js'
import Solution from "../models/Solution.js";
import { StatusCodes } from 'http-status-codes';

import { BadRequestError, UnAuthenticatedError } from "../errors/index.js";


const getAllTask = async (req, res) => {
   const userId = req.params.id;

   const info = await User.findById({ _id: userId })
      .select('-name -firstName -lastName -phoneNumber -studentNumber -picture -gender -email -role')
      .populate({
         path: 'courses',
         populate: {
            path: 'teacher',
            select: 'name',
            model: 'User',
         },
      })
      .populate({
         path: 'courses',
         populate: {
            path: 'assignment',
            model: 'Assignment',
         },
      })

   if (!info) {
      throw new BadRequestError('There is no User With this ID')
   }

   res.send(info)
}

const submitAssignment = async (req, res) => {
   const { content, studentId, assignmentId, status } = req.body;

   const student = await User.findById(studentId);
   const assignment = await Assignment.findById(assignmentId);
   if (!student || !assignment) {
      throw new BadRequestError('Student or assignment not found')
   }
   // Create a new solution
   const solution = new Solution({
      content,
      student: studentId,
      assignment: assignmentId,
      status
   });
   // Save the solution to the database
   await solution.save();

   if (!solution) {
      throw new BadRequestError('There is an Error Try Again')
   }

   res.send(solution)
}


const getSpecificSolution = async (req, res) => {
   const { assignmentId, userId } = req.params;
   // Find the solution based on the assignment ID and user ID
   const solution = await Solution.findOne({
      assignment: assignmentId,
      student: userId
   }).populate('student assignment');
   if (!solution) {
      res.json({
         isThereSolution: false,
      })
   }
   res.json({
      isThereSolution: true,
      ...solution
   });
};

const getAssignmentSolutionsForTeacher = async (req, res) => {
   const teacherId = req.params.teacherId; // Assuming you can get the teacher ID from the request parameters

   try {
      // Find all the courses taught by the teacher
      const courses = await Course.find({ teacher: teacherId }).populate('teacher assignment');
      console.log(courses);
      if (courses) {
         const solutions = await Promise.all(
            courses.map(async (singleCourse) => {
               if (singleCourse?.assignment) {
                  const solutions = await Solution.find({
                     'assignment': singleCourse.assignment._id
                  }).populate({
                     path: 'student',
                     select: 'name _id'
                  });
                  // console.log(solutions);
                  const result = {
                     course: singleCourse.name,
                     courseId: singleCourse._id,
                     assignment: singleCourse.assignment.name,
                     assignmentId: singleCourse.assignment._id,
                     assignmentDesc: singleCourse.assignment.description,
                     solutions: [
                        ...solutions
                     ]
                  }
                  // console.log(result);
                  return {
                     ...result
                  }
               }
            })
         )
         res.json({
            isThereCourses: true,
            result: solutions
         })
      } else {
         res.json({
            isThereCourses: false,
         })
      }

   } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
   }
};





export {
   getAllTask,
   submitAssignment,
   getSpecificSolution,
   getAssignmentSolutionsForTeacher
}