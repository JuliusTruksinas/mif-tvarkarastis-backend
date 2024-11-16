import express from 'express';
import { protect } from '../middleware/protect';
import { CreateUserEventDto } from './dto/request/create-user-event.dto';
import { validateDto } from '../middleware/validateDto';
import { createUserEvent } from './userEvent.handler';

const userEventRoutes = express.Router();

userEventRoutes.post(
  '',
  protect,
  validateDto(CreateUserEventDto),
  createUserEvent,
);
export default userEventRoutes;
