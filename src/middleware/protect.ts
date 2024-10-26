import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import { catchAsync } from '../utils/catchAsync';
import { User } from '../user/user.model';
import AppError from '../utils/appError';

export const protect = catchAsync(async (req, res, next) => {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith('Bearer')
  ) {
    return next(
      new AppError('You are not logged in. Please log in to get access', 400),
    );
  }

  const token = req.headers.authorization.split(' ')[1];

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(decoded.id);

  if (!currentUser) {
    return next(
      new AppError(
        'The user belonging to this token does no longer exist',
        401,
      ),
    );
  }

  req.user = currentUser;
  next();
});
