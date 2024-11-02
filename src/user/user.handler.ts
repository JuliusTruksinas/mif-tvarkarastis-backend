import { catchAsync } from '../utils/catchAsync';
import { ChangeUserInfoDto } from './dto/request/change-user-info.dto';
import { ChangeUserInfoResponseDto } from './dto/response/change-user-info-response.dto';

export const changeUserInfo = catchAsync(async (req, res, next) => {
  const changeUserInfoDto: ChangeUserInfoDto = req.body;

  for (const key of Object.keys(changeUserInfoDto)) {
    req.user[key] = changeUserInfoDto[key];
  }

  const updatedUser = await req.user.save();

  res.json({
    status: 'success',
    data: new ChangeUserInfoResponseDto(updatedUser),
  });
});
