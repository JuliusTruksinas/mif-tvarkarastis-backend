import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../user/user.model';
import { RegisterDto } from './dto/request/register.dto';
import { catchAsync } from '../utils/catchAsync';
import AppError from '../utils/appError';
import { LoginDto } from './dto/request/login.dto';

const signToken = (id: mongoose.Types.ObjectId) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  res.status(statusCode).json({
    status: 'success',
    token,
  });
};

export const register = catchAsync(async (req, res, next) => {
  const { email, password, group, subGroup, programName }: RegisterDto =
    req.body;

  const foundUser = await User.findOne({ email });

  if (foundUser) {
    return next(
      new AppError(`The user with email: ${email} already exists`, 400),
    );
  }

  const newUser = await User.create({
    email,
    password,
    group,
    subGroup,
    programName,
  });

  createSendToken(newUser, 201, res);
});

export const login = catchAsync(async (req, res, next) => {
  const { email, password }: LoginDto = req.body;

  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(
      new AppError(`The user with email: ${email} does not exist`, 400),
    );
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    return next(new AppError('Incorrect password', 401));
  }

  createSendToken(user, 200, res);
});
