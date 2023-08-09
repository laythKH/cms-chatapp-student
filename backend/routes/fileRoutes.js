import { createFile } from '../controllers/fileController.js';
import express from 'express';
const router = express.Router();

//! GET ALL TASK FOR SPECIFIC TEACHER
router.route('/')
   .post(createFile)
router.route('/:teacherId')

export default router