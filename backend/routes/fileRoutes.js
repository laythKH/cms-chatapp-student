import { createFile, getAllFilesRelatedTOTeacher, getAllFilesRelatedTORelated } from '../controllers/fileController.js';
import express from 'express';
const router = express.Router();

//! GET ALL TASK FOR SPECIFIC TEACHER
router.route('/')
   .post(createFile)
router.route('/:teacherId').get(getAllFilesRelatedTOTeacher)
router.route('/student/:userId').get(getAllFilesRelatedTORelated)

export default router