import { getAllAssignment, createAssignment } from '../controllers/taskController.js';
import express from 'express';
const router = express.Router();

//! GET ALL TASK FOR SPECIFIC TEACHER
router.route('/')
   .post(createAssignment)
router.route('/:userId')
   .get(getAllAssignment)



export default router