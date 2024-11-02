import express from 'express';
import authRoutes from './auth/auth.routes';
import AppError from './utils/appError';
import { globalErrorHandler } from './error/error.handler';
import userRoutes from './user/user.routes';
import { errorMessages } from './constants/errorMessages';

const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.all('*', (req, res, next) => {
  next(
    new AppError(
      errorMessages.endpointNotFound.replace(':endpoint', req.originalUrl),
      404,
    ),
  );
});

app.use(globalErrorHandler);

export default app;
