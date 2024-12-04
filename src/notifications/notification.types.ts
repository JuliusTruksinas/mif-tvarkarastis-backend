import mongoose, { Mixed } from 'mongoose';

export interface INotification extends Document {
  _id: mongoose.Types.ObjectId;
  notificationType: NotificationType;
  data: Mixed;
  IsSeen: boolean;
  createdAt: Date;
}

export enum NotificationType {
  friendRequestNotification = 'FriendRequestNotification',
  friendRequestAcceptedNotification = 'FriendRequestAcceptedNotification',
  friendRequestDeclinedNotification = 'FriendRequestDeclinedNotification',
}
