import express from 'express';
import { launch } from '../controllers/attackController';
import protect from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/launch', protect, launch)

export default router;