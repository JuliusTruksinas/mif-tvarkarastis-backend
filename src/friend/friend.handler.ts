import { ResponseStatus } from '../constants/responseStatus';
import { Notification } from '../notifications/notification.model';
import { NotificationType } from '../notifications/notification.types';
import { SendBasicUserInfoResponseDto } from '../user/dto/response/send-basic-user-info-response.dto';
import { User } from '../user/user.model';
import AppError from '../utils/appError';
import { catchAsync } from '../utils/catchAsync';

export const sendFriendRequest = catchAsync(async (req, res, next) => {
  const { friendId } = req.params;
  const userId = req.user._id;

  const friendToAdd = await User.findById(friendId);

  if (!friendToAdd) {
    return next(
      new AppError(
        `The friend you want to add with id: ${friendId} does not exist`,
        400,
      ),
    );
  }

  if (friendId === userId.toString()) {
    return next(new AppError('Are you really your only friend? :(', 400));
  }

  if (req.user.friends.includes(friendToAdd._id)) {
    return next(new AppError('The user is already in your friend list', 400));
  }

  if (req.user.sentFriendRequests.includes(friendToAdd._id)) {
    return next(
      new AppError('You have already sent this user a friend request', 400),
    );
  }

  if (friendToAdd.sentFriendRequests.includes(req.user._id)) {
    return next(
      new AppError('This user has already sent you a friend request', 400),
    );
  }

  req.user.sentFriendRequests.push(friendToAdd._id);

  const notification = new Notification({
    notificationType: NotificationType.friendRequestNotification,
    data: { user: new SendBasicUserInfoResponseDto(req.user) },
    isSeen: false,
    createdAt: new Date(),
  });
  const savedNotification = await notification.save();
  friendToAdd.notifications.push(savedNotification._id);

  await friendToAdd.save();
  await req.user.save();

  res.json({
    status: ResponseStatus.SUCCESS,
    data: null,
  });
});

export const removeFriend = catchAsync(async (req, res, next) => {
  const { friendId } = req.params;
  const userId = req.user._id;
  const friendToRemove = await User.findById(friendId);

  if (!req.user.friends.includes(friendId)) {
    return next(
      new AppError(
        'A friend with id: ${friendID} doesnt not exist in your friend list',
        400,
      ),
    );
  }

  req.user.friends = req.user.friends.filter(
    (id) => id.toString() !== friendId,
  );

  await req.user.save();

  if (friendToRemove) {
    friendToRemove.friends = friendToRemove.friends.filter(
      (id) => id.toString() !== userId.toString(),
    );

    await friendToRemove.save();
  }

  res.json({
    status: ResponseStatus.SUCCESS,
    data: null,
  });
});

export const acceptFriendRequest = catchAsync(async (req, res, next) => {
  const { friendId } = req.params;
  const userId = req.user._id;
  const friendToAccept = await User.findById(friendId);

  if (!friendToAccept) {
    return next(
      new AppError('The friend who sent you the request does not exist', 400),
    );
  }

  if (!friendToAccept.sentFriendRequests.includes(userId)) {
    return next(
      new AppError('This user has not sent you a friend request', 400),
    );
  }

  req.user.friends.push(friendToAccept._id);

  friendToAccept.friends.push(userId);
  friendToAccept.sentFriendRequests = friendToAccept.sentFriendRequests.filter(
    (id) => id.toString() !== userId.toString(),
  );

  const notification = new Notification({
    notificationType: NotificationType.friendRequestAcceptedNotification,
    data: { user: new SendBasicUserInfoResponseDto(req.user) },
    isSeen: false,
    createdAt: new Date(),
  });

  const savedNotification = await notification.save();

  friendToAccept.notifications.push(savedNotification._id);

  await req.user.save();
  await friendToAccept.save();

  res.json({
    status: ResponseStatus.SUCCESS,
    data: null,
  });
});

export const declineFriendRequest = catchAsync(async (req, res, next) => {
  const { friendId } = req.params;
  const userId = req.user._id;
  const friendToDecline = await User.findById(friendId);

  if (!friendToDecline) {
    return next(
      new AppError('The friend who sent you the request does not exist', 400),
    );
  }

  friendToDecline.sentFriendRequests =
    friendToDecline.sentFriendRequests.filter(
      (id) => id.toString() !== userId.toString(),
    );

  const notification = new Notification({
    notificationType: NotificationType.friendRequestDeclinedNotification,
    data: { user: new SendBasicUserInfoResponseDto(req.user) },
    isSeen: false,
    createdAt: new Date(),
  });

  const savedNotification = await notification.save();
  friendToDecline.notifications.push(savedNotification._id);
  await friendToDecline.save();

  res.json({
    status: ResponseStatus.SUCCESS,
    data: null,
  });
});
