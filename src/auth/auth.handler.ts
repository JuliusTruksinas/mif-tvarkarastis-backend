import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../user/user.model';
import { RegisterDto } from './dto/request/register.dto';
import { catchAsync } from '../utils/catchAsync';
import AppError from '../utils/appError';
import { LoginDto } from './dto/request/login.dto';
import { ResponseStatus } from '../constants/responseStatus';
import { GetCurrentUserDto } from './dto/response/get-current-user.dto';
import { RemindPasswordRequestDto } from './dto/request/remind-password-request.dto';
import { EmailService } from '../email/email.service';
import { EmailTemplate } from '../domain/email';
import { v4 as uuidv4 } from 'uuid';
import { ResetPasswordRequestDto } from './dto/request/reset-password-request.dto';

const signToken = (id: mongoose.Types.ObjectId) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  res.status(statusCode).json({
    status: ResponseStatus.SUCCESS,
    data: { token },
  });
};

export const register = catchAsync(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    password,
    studyType,
    group,
    subgroup,
    programName,
    course,
  }: RegisterDto = req.body;

  const foundUser = await User.findOne({ email });

  if (foundUser) {
    return next(
      new AppError(`The user with email: ${email} already exists`, 400),
    );
  }

  const newUser = await User.create({
    firstName,
    lastName,
    email,
    password,
    studyType,
    group,
    subgroup,
    programName,
    course,
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

export const getCurrentUser = catchAsync(async (req, res, next) => {
  res.json({
    status: ResponseStatus.SUCCESS,
    data: new GetCurrentUserDto(req.user),
  });
});

export const remindPassword = catchAsync(async (req, res, next) => {
  const { email }: RemindPasswordRequestDto = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return next(
      new AppError(`The user with email: ${email} does not exist`, 400),
    );
  }

  const resetPasswordToken = uuidv4();

  const messageId = await EmailService.sendEmail(
    'Password Reset',
    EmailTemplate.PASSWORD_RESET,
    email,
    {
      resetPasswordURL: `${process.env.FE_APP_BASE_URL}/reset-password/${resetPasswordToken}`,
    },
  );

  user.resetPasswordToken = resetPasswordToken;
  await user.save();

  return res.json({
    status: 'success',
    data: messageId,
  });
});

export const resetPassword = catchAsync(async (req, res, next) => {
  const {
    resetPasswordToken,
    newPassword,
    repeatedPassword,
  }: ResetPasswordRequestDto = req.body;

  if (newPassword !== repeatedPassword) {
    return next(new AppError('Passwords do not match', 400));
  }

  const user = await User.findOne({ resetPasswordToken });

  if (!user) {
    return next(
      new AppError(
        'The provided reset password token is not assigned to any user',
        400,
      ),
    );
  }

  user.password = newPassword;
  user.resetPasswordToken = null;
  await user.save();

  return res.json({
    status: 'success',
    data: null,
  });
});

export const checkResetPasswordToken = catchAsync(async (req, res, next) => {
  const { resetPasswordToken } = req.params;

  const user = await User.findOne({ resetPasswordToken });

  if (!user) {
    return res.json({
      status: ResponseStatus.SUCCESS,
      data: false,
    });
  }

  return res.json({
    status: ResponseStatus.SUCCESS,
    data: true,
  });
});
