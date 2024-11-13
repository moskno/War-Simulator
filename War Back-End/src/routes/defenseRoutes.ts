import express from 'express';
import { intercept } from '../controllers/defenseController'

const router = express.Router();

router.post('/intercept', intercept)

export default router;