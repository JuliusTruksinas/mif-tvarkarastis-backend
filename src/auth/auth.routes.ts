import express from 'express';
import { validateDto } from '../middleware/validateDto';
import { RegisterDto } from './dto/request/register.dto';
import { getCurrentUser, login, register } from './auth.handler';
import { LoginDto } from './dto/request/login.dto';
import { protect } from '../middleware/protect';

const authRoutes = express.Router();

authRoutes.post('/register', validateDto(RegisterDto), register);

authRoutes.post('/login', validateDto(LoginDto), login);

authRoutes.post('/me', protect, getCurrentUser);

export default authRoutes;
