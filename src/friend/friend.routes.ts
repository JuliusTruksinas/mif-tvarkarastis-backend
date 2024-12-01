import express from 'express';
import { protect } from '../middleware/protect';
import {
  acceptFriendRequest,
  sendFriendRequest,
  declineFriendRequest,
  removeFriend,
  getAllFriends,
} from './friend.handler';

const friendRoutes = express.Router();

friendRoutes.get('/', protect, getAllFriends);
friendRoutes.post('/request/:friendId', protect, sendFriendRequest);
friendRoutes.post('/accept/:friendId', protect, acceptFriendRequest);
friendRoutes.patch('/decline/:friendId', protect, declineFriendRequest);
friendRoutes.delete('/remove/:friendId', protect, removeFriend);

export default friendRoutes;
