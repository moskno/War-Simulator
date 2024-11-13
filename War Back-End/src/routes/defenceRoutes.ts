import express from 'express';
import {defences} from '../controllers/defenceController'

const router = express.Router();

router.get('/defences', defences)

export default router;