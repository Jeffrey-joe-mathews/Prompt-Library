import express from 'express';
const router = express.Router();
import { deletePrompt, getPrompt, postPrompt, updatePrompt } from '../controllers/prompt.controller.js';

router.get('/', getPrompt)

router.post('/', postPrompt) 

router.put('/:id', updatePrompt)

router.delete('/:id', deletePrompt)

export default router;