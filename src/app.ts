import express from 'express';
import cors from 'cors';
import authRoutes from './auth/auth.routes';
import AppError from './utils/appError';
import { globalErrorHandler } from './error/error.handler';
import userRoutes from './user/user.routes';
import userEventRoutes from './user-event/userEvent.routes';
import studyOptionsRoutes from './study-options/studyOptions.routes';
import lectureEventRoutes from './lecture-event/lectureEvent.routes';
import friendRoutes from './friend/friend.routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/user-events', userEventRoutes);
app.use('/api/study-options', studyOptionsRoutes);
app.use('/api/users/friends', userRoutes);
app.use('/api/lecture-events', lectureEventRoutes);
app.use('/api/friends', friendRoutes);

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
