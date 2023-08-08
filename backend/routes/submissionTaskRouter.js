import { getAllTask, submitAssignment, getSpecificSolution, getAssignmentSolutionsForTeacher } from '../controllers/submissionTaskController.js';
import express from 'express';
const router = express.Router();

//! GET ALL TASK FOR SPECIFIC TEACHER

router.route('/').post(submitAssignment)
router.route('/:id').get(getAllTask)
router.route('/:assignmentId/:userId').get(getSpecificSolution)
router.route('/teacher/:teacherId/solutions').get(getAssignmentSolutionsForTeacher);


export default router