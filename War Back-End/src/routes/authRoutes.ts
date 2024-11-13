import express from 'express';
import {auth} from '../controllers/authController'

const router = express.Router();

router.get('/auth', auth)

export default router;