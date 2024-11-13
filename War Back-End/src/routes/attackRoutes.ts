import express from 'express';
import { launch } from '../controllers/attackController'

const router = express.Router();

router.post('/launch', launch)

export default router;