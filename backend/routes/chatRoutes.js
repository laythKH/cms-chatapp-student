import express from 'express';
import { protect } from '../middleware/authMiddleware.js';

import { accessChat, fetchChats, createGroupChat, renameGroup, addToGroup, removeFromGroup, removeChat } from '../controllers/chatController.js';

const router = express.Router();

//! accessing the chat or create the chat
router.route('/').post(protect, accessChat)

//! get all chat from database for particular user
router.route('/').get(protect, fetchChats);

//! for creating groups
router.route('/group').post(protect, createGroupChat);

//! for renaming the group
router.route('/rename').put(protect, renameGroup);

//! remove someone from group or leaving the group
router.route('/groupremove').put(protect, removeFromGroup);

//! add someone to the group
router.route('/groupadd').put(protect, addToGroup);

//! remove chat from chats
router.route('/removechat').post(protect, removeChat)

export default router