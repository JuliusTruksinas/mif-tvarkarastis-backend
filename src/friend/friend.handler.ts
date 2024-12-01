import { ResponseStatus } from '../constants/responseStatus';
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

  req.user.sentFriendRequests.push(friendToAdd._id);
  await req.user.save();

  res.json({
    status: ResponseStatus.SUCESS,
    data: req.user.friends,
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
    status: ResponseStatus.SUCESS,
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

  await req.user.save();
  await friendToAccept.save();

  res.json({
    status: ResponseStatus.SUCESS,
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
  await friendToDecline.save();

  res.json({
    status: ResponseStatus.SUCESS,
    data: null,
  });
});

export const getAllFriends = catchAsync(async (req, res, next) => {
  const { friends } = await req.user.populate('friends').execPopulate();

  res.json({
    status: ResponseStatus.SUCESS,
    data: friends,
  });
});