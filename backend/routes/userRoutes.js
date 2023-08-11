import { register, login, updateUser, getAllUser, getUserCourse, addCourseToUser, deleteCourseForStudent, updatePassword } from '../controllers/userController.js';


import express from 'express';
const router = express.Router();
import { protect } from '../middleware/authMiddleware.js'

router.route('/').get(protect, getAllUser);
router.route('/:id').get(protect, getUserCourse);
router.route('/register').post(register);
router.route('/login').post(login);
router.route('/updateUser/:id').put(updateUser);
router.route('/:userId/courses/:courseId')
   .post(addCourseToUser)
   .delete(deleteCourseForStudent)
router.route('/update-password').post(updatePassword)



export default router