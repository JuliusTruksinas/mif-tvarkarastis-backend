import express from 'express';
import { validateDto } from '../middleware/validateDto';
import { ChangeUserInfoDto } from './dto/request/change-user-info.dto';
import { protect } from '../middleware/protect';
import { changeUserInfo } from './user.handler';

const userRoutes = express.Router();

userRoutes.patch('/', protect, validateDto(ChangeUserInfoDto), changeUserInfo);

export default userRoutes;
