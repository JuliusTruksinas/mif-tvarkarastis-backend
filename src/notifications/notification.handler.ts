import { ResponseStatus } from '../constants/responseStatus';
import AppError from '../utils/appError';
import { catchAsync } from '../utils/catchAsync';
import { Notification } from './notification.model';

export const getAllNotifications = catchAsync(async (req, res, next) => {
  const { notifications } = await req.user
    .populate('notifications')
    .execPopulate();

  const unreadNotifications = notifications.filter(
    (notification) => !notification.isSeen,
  );

  res.json({
    status: ResponseStatus.SUCESS,
    data: unreadNotifications,
  });
});

export const setNotificationToSeen = catchAsync(async (req, res, next) => {
  const { notificationId } = req.params;
  const notification = await Notification.findById(notificationId);

  if (!notification) {
    throw new AppError('Notification with this id does not exist', 400);
  }

  notification.IsSeen = true;
  await notification.save();

  res.json({
    status: ResponseStatus.SUCESS,
    data: null,
  });
});
