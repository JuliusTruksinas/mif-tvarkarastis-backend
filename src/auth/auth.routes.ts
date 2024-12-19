import express from 'express';
import { validateDto } from '../middleware/validateDto';
import { RegisterDto } from './dto/request/register.dto';
import {
  checkResetPasswordToken,
  getCurrentUser,
  login,
  register,
  remindPassword,
  resetPassword,
} from './auth.handler';
import { LoginDto } from './dto/request/login.dto';
import { protect } from '../middleware/protect';
import { RemindPasswordRequestDto } from './dto/request/remind-password-request.dto';
import { ResetPasswordRequestDto } from './dto/request/reset-password-request.dto';

const authRoutes = express.Router();

authRoutes.post('/register', validateDto(RegisterDto), register);

authRoutes.post('/login', validateDto(LoginDto), login);

authRoutes.post('/me', protect, getCurrentUser);

authRoutes.post(
  '/remind-password',
  validateDto(RemindPasswordRequestDto),
  remindPassword,
);

authRoutes.post(
  '/reset-password',
  validateDto(ResetPasswordRequestDto),
  resetPassword,
);

authRoutes.get(
  '/check-reset-password-token/:resetPasswordToken',
  checkResetPasswordToken,
);

export default authRoutes;
