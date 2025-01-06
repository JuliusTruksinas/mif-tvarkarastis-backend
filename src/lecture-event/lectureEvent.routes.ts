import express from 'express';
import { protect } from '../middleware/protect';
import {
  getUserLectureEvents,
  getUniqueLectureTitles,
} from './lectureEvent.handler';
import { validateDto } from '../middleware/validateDto';
import { GetUserLectureEventsRequestDto } from './dto/request/get-user-lecture-events.dto';

const lectureEventRoutes = express.Router();

lectureEventRoutes.post(
  '/',
  protect,
  validateDto(GetUserLectureEventsRequestDto),
  getUserLectureEvents,
);

lectureEventRoutes.get(
  '/unique-titles/:userId',
  protect,
  getUniqueLectureTitles,
);

export default lectureEventRoutes;
