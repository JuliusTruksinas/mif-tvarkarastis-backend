import express from 'express';
import { protect } from '../middleware/protect';
import { CreateUserEventDto } from './dto/request/create-user-event.dto';
import { validateDto } from '../middleware/validateDto';
import {
  createUserEvent,
  deleteRepeatableEvents,
  deleteUserEvent,
  fetchUserEvents,
  updateUserEvent,
} from './userEvent.handler';
import { UpdateUserEventDto } from './dto/request/update-user-event.dto';
import { GetUserLectureEventsRequestDto } from '../lecture-event/dto/request/get-user-lecture-events.dto';

const userEventRoutes = express.Router();

userEventRoutes.patch(
  '',
  protect,
  validateDto(GetUserLectureEventsRequestDto),
  fetchUserEvents,
);

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
userEventRoutes.delete(
  '/repeatable-group/:repeatableId',
  protect,
  deleteRepeatableEvents,
);

export default userEventRoutes;
