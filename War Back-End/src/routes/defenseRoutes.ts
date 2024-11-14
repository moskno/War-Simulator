import express from 'express';
import { intercept, getDefenseSystems } from '../controllers/defenseController';
import protect from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/intercept', protect, intercept);
router.get('/systems', protect, getDefenseSystems);

export default router;