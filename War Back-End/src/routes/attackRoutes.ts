import express from 'express';
import {attacks} from '../controllers/attackController'

const router = express.Router();

router.get('/attacks', attacks)

export default router;