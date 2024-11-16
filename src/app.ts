import express from 'express';
import authRoutes from './auth/auth.routes';
import AppError from './utils/appError';
import { globalErrorHandler } from './error/error.handler';
import userRoutes from './user/user.routes';
import userEventRoutes from './user-event/userEvent.routes';

const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/user-events', userEventRoutes);

app.all('*', (req, res, next) => {
  next(
    new AppError(
      `The endpoint: ${req.originalUrl} doesn't exist on this server`,
      404,
    ),
  );
});

app.use(globalErrorHandler);

export default app;
