import mongoose, { Schema } from 'mongoose';
import { INotification, NotificationType } from './notification.types';

const NotificationSchema = new mongoose.Schema<INotification>({
  notificationType: {
    required: true,
    type: String,
    enum: Object.values(NotificationType),
  },
  data: {
    required: true,
    type: Schema.Types.Mixed,
  },
  IsSeen: {
    required: true,
    type: Boolean,
  },
  createdAt: {
    required: true,
    type: Date,
  },
});

export const Notification = mongoose.model<INotification>(
  'Notification',
  NotificationSchema,
);
