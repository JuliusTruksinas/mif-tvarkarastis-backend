import mongoose, { Mixed } from 'mongoose';

export interface INotification extends Document {
  _id: mongoose.Types.ObjectId;
  notificationType: NotificationType;
  data: Mixed;
  isSeen: boolean;
  createdAt: Date;
}

export enum NotificationType {
  friendRequestNotification = 'FriendRequestNotification',
  friendRequestAcceptedNotification = 'FriendRequestAcceptedNotification',
  friendRequestDeclinedNotification = 'FriendRequestDeclinedNotification',
}
