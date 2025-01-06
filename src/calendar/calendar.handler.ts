import { NextFunction, Response } from 'express';
import { createEvents } from 'ics';
import { startOfDay, endOfDay } from 'date-fns';
import { AuthenticatedRequest } from '../domain/authenticatedRequest';
import { ExportCalendarRequestDto } from './dto/request/export-calendar-request.dto';
import { catchAsync } from '../utils/catchAsync';
import AppError from '../utils/appError';
import { getUsersUserEventsQuery } from '../user-event/userEvent.query';
import { getUsersLectureEventsQuery } from '../lecture-event/lectureEvent.query';
import { transformCalendarEventsToIcsObjects } from '../helpers/calendar';
import { User } from '../user/user.model';

export const exportCalendar = catchAsync(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const {
      fromDate,
      toDate,
      areUserEventsIncluded,
      areHiddenLecturesExcluded,
      userId,
    }: ExportCalendarRequestDto = req.body;
    const foundUser = await User.findById(userId);

    if (!foundUser) {
      return next(new AppError("The user doesn't exist", 400));
    }

    if (
      foundUser.id !== req.user.id &&
      !req.user.friends.includes(foundUser.id)
    ) {
      return next(
        new AppError(
          "You can't export the calendars of users who aren't your friends.",
          400,
        ),
      );
    }

    const fromTimeInMs = startOfDay(new Date(fromDate)).getTime();
    const toTimeInMs = endOfDay(new Date(toDate)).getTime();

    if (fromTimeInMs > toTimeInMs) {
      return next(new AppError('Start date must be before end date', 400));
    }

    const lectureEvents = await getUsersLectureEventsQuery(
      foundUser,
      fromTimeInMs,
      toTimeInMs,
      { areHiddenLecturesExcluded },
    );

    const isRequestingSelfUserEvents = userId === req.user.id;

    const userEvents = areUserEventsIncluded
      ? await getUsersUserEventsQuery(
          foundUser.id,
          fromTimeInMs,
          toTimeInMs,
          isRequestingSelfUserEvents,
        )
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
