import express from 'express';
import { createNote, getNotes, updateNote, deleteNote } from '../controllers/noteController';
import { authenticate } from '../middleware/auth';
import { noteValidation, validateRequest } from '../middleware/validation';

const router = express.Router();

router.use(authenticate); // All note routes require authentication

router.post('/', noteValidation, validateRequest, createNote);
router.get('/', getNotes);
router.put('/:id', noteValidation, validateRequest, updateNote);
router.delete('/:id', deleteNote);

export default router;