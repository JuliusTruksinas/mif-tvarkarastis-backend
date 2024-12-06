import express from 'express';
import { validateDto } from '../middleware/validateDto';
import { ChangeUserInfoDto } from './dto/request/change-user-info.dto';
import { protect } from '../middleware/protect';
import { changeUserInfo, getAllFriends, searchUsers } from './user.handler';

const userRoutes = express.Router();

userRoutes.patch('/', protect, validateDto(ChangeUserInfoDto), changeUserInfo);
userRoutes.get('/search', protect, searchUsers);
userRoutes.get('/friends', protect, getAllFriends);

export default userRoutes;
