import express from 'express';
import { protect } from '../middleware/protect';
import { CreateUserEventDto } from './dto/request/create-user-event.dto';
import { validateDto } from '../middleware/validateDto';
import {
  createUserEvent,
  deleteUserEvent,
  updateUserEvent,
} from './userEvent.handler';
import { UpdateUserEventDto } from './dto/request/update-user-event.dto';

const userEventRoutes = express.Router();

userEventRoutes.post(
  '',
  protect,
  validateDto(CreateUserEventDto),
  createUserEvent,
);

userEventRoutes.patch(
  '/:userEventId',
  protect,
  validateDto(UpdateUserEventDto),
  updateUserEvent,
);
userEventRoutes.delete('/:userEventId', protect, deleteUserEvent);

export default userEventRoutes;
