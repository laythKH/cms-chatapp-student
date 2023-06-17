import { createNote, updateNote, deleteNote, getAllNote } from '../controllers/noteController.js'

import express from 'express';
const router = express.Router();


router.route('/').get(getAllNote).post(createNote)
router.route('/:id').delete(deleteNote).patch(updateNote)


export default router