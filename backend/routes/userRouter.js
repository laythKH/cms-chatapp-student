import { register, login, logout } from '../controllers/userControllers.js';
import express from 'express';
const router = express.Router();





router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').get(logout);


export default router