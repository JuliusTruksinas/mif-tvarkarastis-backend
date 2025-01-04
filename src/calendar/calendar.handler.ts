import { NextFunction, Response } from 'express';
import { createEvents } from 'ics';
import { AuthenticatedRequest } from '../domain/authenticatedRequest';
import { ExportCalendarRequestDto } from './dto/request/export-calendar-request.dto';
import { catchAsync } from '../utils/catchAsync';
import AppError from '../utils/appError';
import { getUsersUserEventsQuery } from '../user-event/userEvent.query';
import { getUsersLectureEventsQuery } from '../lecture-event/lectureEvent.query';
import { transformCalendarEventsToIcsObjects } from '../helpers/calendar';

export const exportCalendar = catchAsync(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const {
      fromDate,
      toDate,
      areUserEventsIncluded,
      areSelectableLecturesIncluded,
    }: ExportCalendarRequestDto = req.body;

    const fromTimeInMs = new Date(fromDate).getTime();
    const toTimeInMs = new Date(toDate).getTime();

    if (fromTimeInMs > toTimeInMs) {
      return next(new AppError('Start date must be before end date', 400));
    }

    const lectureEvents = await getUsersLectureEventsQuery(
      req.user,
      fromTimeInMs,
      toTimeInMs,
      { areSelectableLecturesIncluded },
    );

    const userEvents = areUserEventsIncluded
      ? await getUsersUserEventsQuery(req.user.id, fromTimeInMs, toTimeInMs)
      : [];

    const allExportableEvents = transformCalendarEventsToIcsObjects([
      ...lectureEvents,
      ...userEvents,
    ]);

    createEvents(allExportableEvents, (error, value) => {
      if (error) {
        return next(new AppError('Error generating calendar file', 500));
      }

      res.setHeader('Content-Disposition', 'attachment; filename=calendar.ics');
      res.setHeader('Content-Type', 'text/calendar');
      res.send(value);
    });
  },
);
