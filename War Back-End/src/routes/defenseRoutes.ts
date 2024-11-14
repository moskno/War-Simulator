import express from 'express';
import { intercept } from '../controllers/defenseController';
import protect from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/intercept', protect, intercept)

export default router;