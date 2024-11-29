import express from 'express';
import { protect } from '../middleware/protect';
import { getUserLectureEvents } from './lectureEvent.handler';

const lectureEventRoutes = express.Router();

lectureEventRoutes.get('/', protect, getUserLectureEvents);

export default lectureEventRoutes;
