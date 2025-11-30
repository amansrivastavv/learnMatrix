import express from 'express';
import { register, login, forgotPassword, logout } from '../controllers/authController';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/forgot', forgotPassword);
router.post('/logout', logout);

export default router;
