import express from 'express';
import { validateDto } from '../middleware/validateDto';
import { RegisterDto } from './dto/register-dto';
import { login, register } from './auth.handler';
import { LoginDto } from './dto/login-dto';

const authRoutes = express.Router();

authRoutes.post('/register', validateDto(RegisterDto), register);

authRoutes.post('/login', validateDto(LoginDto), login);

export default authRoutes;
