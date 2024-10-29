import { catchAsync } from '../utils/catchAsync';
import { ChangeUserInfoDto } from './dto/change-user-info-dto';

export const changeUserInfo = catchAsync(async (req, res, next) => {
  const changeUserInfoDto: ChangeUserInfoDto = req.body;
  for (const key of Object.keys(changeUserInfoDto)) {
    req.user[key] = changeUserInfoDto[key];
  }
  const updatedUser = await req.user.save();

  res.json({
    status: 'success',
    data: updatedUser,
  });
});
