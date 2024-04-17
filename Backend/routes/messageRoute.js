import express from 'express';
import protectedRoute from '../middlewares/protectedRoute.js';
import { getMessage, sendMessage } from '../controllers/messageController.js';

const router = express.Router();

router.get('/:id', protectedRoute, getMessage);
router.post('/send/:id', protectedRoute, sendMessage);

export default router;
