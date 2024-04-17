import express from 'express';
import protectedRoute from '../middlewares/protectedRoute.js';
import { getUsersForSideBar } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/', protectedRoute, getUsersForSideBar);

export default router;
