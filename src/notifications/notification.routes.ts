import express from 'express';
import { protect } from '../middleware/protect';
import {
  getAllNotifications,
  setNotificationToSeen,
} from './notification.handler';

const notificationRoutes = express.Router();

notificationRoutes.get('/', protect, getAllNotifications);
notificationRoutes.patch('/:notificationId/seen', setNotificationToSeen);

export default notificationRoutes;
