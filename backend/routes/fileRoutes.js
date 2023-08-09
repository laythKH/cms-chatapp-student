import { createFile, getAllFilesRelatedTOTeacher } from '../controllers/fileController.js';
import express from 'express';
const router = express.Router();

//! GET ALL TASK FOR SPECIFIC TEACHER
router.route('/')
   .post(createFile)
router.route('/:teacherId').get(getAllFilesRelatedTOTeacher)

export default router