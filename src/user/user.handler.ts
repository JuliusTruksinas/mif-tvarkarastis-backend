import { catchAsync } from '../utils/catchAsync';
import { ChangeUserInfoDto } from './dto/request/change-user-info.dto';
import { ChangeUserInfoResponseDto } from './dto/response/change-user-info-response.dto';
import { ResponseStatus } from '../constants/responseStatus';
import AppError from '../utils/appError';
import { User } from './user.model';

export const changeUserInfo = catchAsync(async (req, res, next) => {
  const changeUserInfoDto: ChangeUserInfoDto = req.body;

  for (const key of Object.keys(changeUserInfoDto)) {
    req.user[key] = changeUserInfoDto[key];
  }

  const updatedUser = await req.user.save();

  res.json({
    status: ResponseStatus.SUCESS,
    data: new ChangeUserInfoResponseDto(updatedUser),
  });
});

export const addFriend = catchAsync(async (req, res, next) => {
  const { friendId } = req.params;
  const userId = req.user.id;
  const user = await User.findById(userId);

  if (!friendId) {
    throw new AppError('User with id: ${friendId} does not exist', 400);
  }

  if (friendId == userId) {
    throw new AppError('Are you really your only friend? :(', 400);
  }
  if (user != null) {
    if (user.friends.includes(friendId)) {
      throw new AppError('The user is already in your friend list', 400);
    }
    user.friends.push(friendId);
    await user.save();
  }

  res.json({
    status: ResponseStatus.SUCESS,
    data: user?.friends,
  });
});

export const deleteFriend = catchAsync(async (req, res, next) => {
  const { friendId } = req.params;
  const userId = req.user.id;
  const user = await User.findById(userId);

  if (user != null) {
    if (!user.friends.includes(friendId)) {
      throw new AppError('A friend with id: ${friendID} doesnt not exist', 400);
    }
    user.friends = user.friends.filter((id) => id.toString() !== friendId);
    await user.save();
  }

  res.json({
    status: ResponseStatus.SUCESS,
    data: null,
  });
});
