import { getAllCourses, createCourse, updateCourse, deleteCourse } from '../controllers/courseController.js'

import express from 'express';
const router = express.Router();

router.route('/').get(getAllCourses).post(createCourse)
router.route('/:id').delete(deleteCourse).patch(updateCourse)

export default router