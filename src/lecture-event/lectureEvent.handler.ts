import { NextFunction, Response } from 'express';
import { AuthenticatedRequest } from '../domain/authenticatedRequest';
import { convertToUTC } from '../helpers/time';
import { User } from '../user/user.model';
import AppError from '../utils/appError';
import { catchAsync } from '../utils/catchAsync';
import { transformMongoDbObjectId } from '../utils/transformMongoDbObjectId';
import { GetUserLectureEventsRequestDto } from './dto/request/get-user-lecture-events.dto';
import { getUsersLectureEventsQuery } from './lectureEvent.query';
import { addYears, endOfDay, startOfDay, subYears } from 'date-fns';
import { ResponseStatus } from '../constants/responseStatus';

export const getUserLectureEvents = catchAsync(
  async (req: AuthenticatedRequest, res, next) => {
    const {
      startDateTime,
      endDateTime,
      userId,
    }: GetUserLectureEventsRequestDto = req.body;

    const foundUser = await User.findById(userId);

    if (!foundUser) {
      return next(new AppError('User does not exist', 400));
    }

    if (
      foundUser.id !== req.user.id &&
      !req.user.friends.includes(foundUser.id)
    ) {
      return next(
        new AppError(
          "You can't view the calendars of users who aren't your friends.",
          400,
        ),
      );
    }

    const fromTimeInMs = new Date(
      convertToUTC(startDateTime, req.timezone),
    ).getTime();
    const toTimeInMs = new Date(
      convertToUTC(endDateTime, req.timezone),
    ).getTime();

    const lectureEvents = await getUsersLectureEventsQuery(
      foundUser,
      fromTimeInMs,
      toTimeInMs,
      { areHiddenLecturesExcluded: true },
    );

    res.json({
      status: 'success',
      data: lectureEvents.map((event) => transformMongoDbObjectId(event)),
    });
  },
);

export const getUniqueLectureTitles = catchAsync(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const { userId } = req.params;

    const foundUser = await User.findById(userId);
    if (!foundUser) {
      return next(new AppError("The user doesn't exist", 400));
    }

    const now = new Date();
    const startDate = subYears(now, 1);
    const endDate = addYears(now, 1);

    const fromTimeInMs = startOfDay(startDate).getTime();
    const toTimeInMs = endOfDay(endDate).getTime();

    const lectureEvents = await getUsersLectureEventsQuery(
      foundUser,
      fromTimeInMs,
      toTimeInMs,
      { areHiddenLecturesExcluded: false },
    );

    const uniqueLectureTitles = new Set<string>();

    lectureEvents.forEach((event) => {
      uniqueLectureTitles.add(event.title);
    });

    const response = Array.from(uniqueLectureTitles).reduce((acc, title) => {
      acc[title] = foundUser.hiddenLectureTitles.includes(title);
      return acc;
    }, {} as Record<string, boolean>);

    res.json({
      status: ResponseStatus.SUCCESS,
      data: response,
    });
  },
);
