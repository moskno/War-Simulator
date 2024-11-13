import express from 'express';
import {missiles} from '../controllers/missileController'

const router = express.Router();

router.get('/missiles', missiles)

export default router;