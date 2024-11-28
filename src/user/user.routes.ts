import express from 'express';
import { validateDto } from '../middleware/validateDto';
import { ChangeUserInfoDto } from './dto/request/change-user-info.dto';
import { protect } from '../middleware/protect';
import { addFriend, changeUserInfo, deleteFriend } from './user.handler';

const userRoutes = express.Router();

userRoutes.patch('/', protect, validateDto(ChangeUserInfoDto), changeUserInfo);

userRoutes.post('/:friendId', protect, addFriend);
userRoutes.delete('/:friendId', protect, deleteFriend);

export default userRoutes;
