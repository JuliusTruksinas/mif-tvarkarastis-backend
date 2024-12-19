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
import notificationRoutes from './notifications/notification.routes';
import { detectTimezone } from './middleware/detectTimeZone';
// import swaggerUi from 'swagger-ui-express';
// import swaggerDocs from './swaggerConfiguration';
// import vuDataRoutes from './vu-data/vuData.routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(detectTimezone);

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/user-events', userEventRoutes);
app.use('/api/study-options', studyOptionsRoutes);
app.use('/api/users/friends', userRoutes);
app.use('/api/lecture-events', lectureEventRoutes);
app.use('/api/friends', friendRoutes);
app.use('/api/notifications', notificationRoutes);
// TODO: Implament internal cron-job  app.use('/api/vu-data', vuDataRoutes);

// app.get('/api/api-docs/json', (req, res) => {
//   res.json(swaggerDocs);
// });

// app.use('/api/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

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
