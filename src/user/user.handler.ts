import { catchAsync } from '../utils/catchAsync';
import { ChangeUserInfoDto } from './dto/request/change-user-info.dto';
import { ChangeUserInfoResponseDto } from './dto/response/change-user-info-response.dto';
import { ResponseStatus } from '../constants/responseStatus';
import { User } from './user.model';
import { SendBasicUserInfoResponseDto } from './dto/response/send-basic-user-info-response.dto';

export const searchUsers = catchAsync(async (req, res, next) => {
  const { query } = req.query;

  if (!query) {
    return res.json({
      status: 'success',
      data: [],
    });
  }

  const regex = new RegExp(query, 'i');

  const users = await User.aggregate([
    {
      $addFields: {
        name: { $concat: ['$firstName', ' ', '$lastName'] },
      },
    },
    {
      $match: {
        name: { $regex: regex },
      },
    },
    {
      $match: {
        _id: { $ne: req.user._id },
      },
    },
    {
      $match: {
        _id: { $nin: req.user.sentFriendRequests },
      },
    },
    {
      $match: {
        _id: { $nin: req.user.friends },
      },
    },
  ]);

  res.json({
    status: 'success',
    data: users.map((user) => new SendBasicUserInfoResponseDto(user)),
  });
});

export const getAllFriends = catchAsync(async (req, res, next) => {
  const { friends } = await req.user.populate('friends');

  res.json({
    status: ResponseStatus.SUCCESS,
    data: friends.map((friend) => new SendBasicUserInfoResponseDto(friend)),
  });
});

export const changeUserInfo = catchAsync(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    password,
    studyType,
    group,
    subgroup,
    programName,
    course,
    preferredNavigationApp,
    profilePhotoUrl,
  }: ChangeUserInfoDto = req.body;

  Object.assign(req.user, {
    firstName,
    lastName,
    email,
    studyType,
    group,
    subgroup,
    programName,
    course,
    preferredNavigationApp,
    profilePhotoUrl,
    ...(password && { password }),
  });

  const updatedUser = await req.user.save();

  res.json({
    status: ResponseStatus.SUCCESS,
    data: new ChangeUserInfoResponseDto(updatedUser),
  });
});
