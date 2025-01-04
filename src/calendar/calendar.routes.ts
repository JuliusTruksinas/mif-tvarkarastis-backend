import express from 'express';
import { validateDto } from '../middleware/validateDto';
import { ExportCalendarRequestDto } from './dto/request/export-calendar-request.dto';
import { protect } from '../middleware/protect';
import { exportCalendar } from './calendar.handler';

const calendarRoutes = express.Router();

calendarRoutes.post(
  '/export',
  protect,
  validateDto(ExportCalendarRequestDto),
  exportCalendar,
);

export default calendarRoutes;
