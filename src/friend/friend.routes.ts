import express from 'express';
import { protect } from '../middleware/protect';
import {
  acceptFriendRequest,
  sendFriendRequest,
  declineFriendRequest,
  removeFriend,
} from './friend.handler';

const friendRoutes = express.Router();

friendRoutes.post('/request/:friendId', protect, sendFriendRequest);
friendRoutes.post('/accept/:friendId', protect, acceptFriendRequest);
friendRoutes.post('/decline/:friendId', protect, declineFriendRequest);
friendRoutes.delete('/remove/:friendId', protect, removeFriend);

export default friendRoutes;
