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

  const foundFriend = await User.findById(friendId);

  if (!foundFriend) {
    return next(new AppError('User with id: ${friendId} does not exist', 400));
  }

  if (friendId === req.user.id) {
    return next(new AppError('Are you really your only friend? :(', 400));
  }

  if (req.user.friends.includes(friendId)) {
    return next(
      new AppError(
        `The user with id: ${friendId} is already a friend of user with id: ${req.user.id}`,
        400,
      ),
    );
  }

  req.user.friends.push(friendId);
  await req.user.save();

  res.json({
    status: ResponseStatus.SUCESS,
    data: null,
  });
});

export const deleteFriend = catchAsync(async (req, res, next) => {
  const { friendId } = req.params;

  if (!req.user.friends.includes(friendId)) {
    return next(
      new AppError('A friend with id: ${friendID} doesnt not exist', 400),
    );
  }

  req.user.friends = req.user.friends.filter(
    (id) => id.toString() !== friendId,
  );

  await req.user.save();

  res.json({
    status: ResponseStatus.SUCESS,
    data: null,
  });
});
