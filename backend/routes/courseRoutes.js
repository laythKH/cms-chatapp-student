import { getAllCourses, createCourse, updateCourse, deleteCourse, getCoursesBasedOnTeacher } from '../controllers/courseController.js'

import { protect } from '../middleware/authMiddleware.js'

import express from 'express';
const router = express.Router();

router.route('/')
   .get(protect, getAllCourses)
   .post(protect, createCourse)
router.route('/:id')
   .delete(protect, deleteCourse)
   .patch(protect, updateCourse)
router.route('/search/:id')
   .get(protect, getCoursesBasedOnTeacher)

export default router