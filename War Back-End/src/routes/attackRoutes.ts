import express from 'express';
import { launch, getMissiles } from '../controllers/attackController';
import protect from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/launch', protect, launch)
router.get('/missiles', protect, getMissiles);

export default router;