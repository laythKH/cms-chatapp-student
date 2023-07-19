import { register, login, updateUser, getAllUser } from '../controllers/userController.js';
import express from 'express';
const router = express.Router();
import { protect } from '../middleware/authMiddleware.js'


router.route('/').get(protect, getAllUser);
router.route('/register').post(register);
router.route('/login').post(login);
router.route('/updateUser/:id').put(updateUser);


export default router