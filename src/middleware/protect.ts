import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import { catchAsync } from '../utils/catchAsync';
import { User } from '../user/user.model';
import AppError from '../utils/appError';
import { errorMessages } from '../constants/errorMessages';

export const protect = catchAsync(async (req, res, next) => {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith('Bearer')
  ) {
    return next(new AppError(errorMessages.notLoggedIn, 400));
  }

  const token = req.headers.authorization.split(' ')[1];

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(decoded.id);

  if (!currentUser) {
    return next(new AppError(errorMessages.loggedInUserNotFound, 401));
  }

  req.user = currentUser;
  next();
});
