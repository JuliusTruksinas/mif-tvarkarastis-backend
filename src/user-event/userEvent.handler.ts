import { NextFunction, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import {
  addDays,
  addWeeks,
  addMonths,
  differenceInYears,
  startOfDay,
  setHours,
  setMinutes,
  setSeconds,
  setMilliseconds,
} from 'date-fns';
import { ResponseStatus } from '../constants/responseStatus';
import AppError from '../utils/appError';
import { catchAsync } from '../utils/catchAsync';
import { transformMongoDbObjectId } from '../utils/transformMongoDbObjectId';
import { CreateUserEventDto } from './dto/request/create-user-event.dto';
import { UpdateUserEventDto } from './dto/request/update-user-event.dto';
import { UpdateUserEventResponseDto } from './dto/response/update-user-event-response-dto';
import { UserEvent } from './userEvent.model';
import { convertToUTC } from '../helpers/time';
import { AuthenticatedRequest } from '../domain/authenticatedRequest';
import { GetUserLectureEventsRequestDto } from '../lecture-event/dto/request/get-user-lecture-events.dto';
import { User } from '../user/user.model';
import { getUsersUserEventsQuery } from './userEvent.query';
import { IUserEvent, RepeatableUserEventUpdateType } from './userEvent.types';

export const fetchUserEvents = catchAsync(
  async (req: AuthenticatedRequest, res, next) => {
    const {
      startDateTime,
      endDateTime,
      userId,
    }: GetUserLectureEventsRequestDto = req.body;

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
          "You can't view the calendars of users who aren't your friends.",
          400,
        ),
      );
    }

    const isRequestingSelfUserEvents = userId === req.user.id;

    const fromTimeInMs = new Date(
      convertToUTC(startDateTime, req.timezone),
    ).getTime();

    const toTimeInMs = new Date(
      convertToUTC(endDateTime, req.timezone),
    ).getTime();

    const userEvents = await getUsersUserEventsQuery(
      foundUser.id,
      fromTimeInMs,
      toTimeInMs,
      isRequestingSelfUserEvents,
    );

    res.json({
      status: ResponseStatus.SUCCESS,
      data: userEvents.map((userEvent) => transformMongoDbObjectId(userEvent)),
    });
  },
);

const createRepeatableEvents = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  const {
    startDateTime,
    endDateTime,
    title,
    note,
    location,
    isPrivate,
    occurrenceType,
    repeatableUntil,
  }: CreateUserEventDto = req.body;

  const repeatableUntilDate = new Date(repeatableUntil);
  const today = new Date();

  if (today >= repeatableUntilDate) {
    return next(
      new AppError('Repeatable until date must be greater than today', 400),
    );
  }

  if (differenceInYears(repeatableUntilDate, today) >= 1) {
    return next(
      new AppError(
        'Repeatable until date must be less than one year from today',
        400,
      ),
    );
  }

  const repeatableUserEventsGroupId = uuidv4();
  const events: any[] = [];

  let currentStartDateTime = new Date(startDateTime);
  let currentEndDateTime = new Date(endDateTime);

  while (startOfDay(currentStartDateTime) <= repeatableUntilDate) {
    events.push({
      startDateTime: currentStartDateTime,
      endDateTime: currentEndDateTime,
      title,
      note,
      location,
      isPrivate,
      repeatableUserEventsGroupId,
      user: req.user.id,
    });

    if (occurrenceType === 'day') {
      currentStartDateTime = addDays(currentStartDateTime, 1);
      currentEndDateTime = addDays(currentEndDateTime, 1);
    } else if (occurrenceType === 'week') {
      currentStartDateTime = addWeeks(currentStartDateTime, 1);
      currentEndDateTime = addWeeks(currentEndDateTime, 1);
    } else if (occurrenceType === 'month') {
      currentStartDateTime = addMonths(currentStartDateTime, 1);
      currentEndDateTime = addMonths(currentEndDateTime, 1);
    }
  }

  const createdEvents = await UserEvent.insertMany(events);

  req.user.events.push(...createdEvents.map((event) => event.id));
  await req.user.save();

  res.json({
    status: ResponseStatus.SUCCESS,
    data: createdEvents,
  });
};

export const createUserEvent = catchAsync(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const {
      startDateTime,
      endDateTime,
      title,
      note,
      location,
      isPrivate,
      isRepeatable,
    }: CreateUserEventDto = req.body;

    if (new Date(startDateTime) >= new Date(endDateTime)) {
      return next(new AppError('Start time must be before end time', 400));
    }

    if (isRepeatable) {
      return createRepeatableEvents(req, res, next);
    }

    const createdUserEvent = await UserEvent.create({
      startDateTime: convertToUTC(startDateTime, req.timezone),
      endDateTime: convertToUTC(endDateTime, req.timezone),
      title,
      note,
      location,
      isPrivate,
      user: req.user.id,
    });

    req.user.events.push(createdUserEvent.id);
    await req.user.save();

    res.json({
      status: ResponseStatus.SUCCESS,
      data: null,
    });
  },
);

const updateMultipleUserEvents = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
  userEvent: IUserEvent,
  repeatableUserEventUpdateType: RepeatableUserEventUpdateType,
) => {
  const filter: any = {
    repeatableUserEventsGroupId: userEvent.repeatableUserEventsGroupId,
  };

  if (repeatableUserEventUpdateType === 'future') {
    filter.startDateTime = { $gte: userEvent.startDateTime };
  }

  const eventsToUpdate = await UserEvent.find(filter);

  const updateUserEventDto: UpdateUserEventDto = req.body;

  const newStartTime = new Date(updateUserEventDto.startDateTime);
  const newEndTime = new Date(updateUserEventDto.endDateTime);

  for (const event of eventsToUpdate) {
    const originalStartDate = new Date(event.startDateTime);
    const originalEndDate = new Date(event.endDateTime);

    event.startDateTime = setHours(
      setMinutes(
        setSeconds(setMilliseconds(originalStartDate, 0), 0),
        newStartTime.getMinutes(),
      ),
      newStartTime.getHours(),
    );

    event.endDateTime = setHours(
      setMinutes(
        setSeconds(setMilliseconds(originalEndDate, 0), 0),
        newEndTime.getMinutes(),
      ),
      newEndTime.getHours(),
    );

    event.title = updateUserEventDto.title;
    event.note = updateUserEventDto.note;
    event.location = updateUserEventDto.location;
    event.isPrivate = updateUserEventDto.isPrivate;

    await event.save();
  }

  res.json({
    status: ResponseStatus.SUCCESS,
    data: null,
  });
};

const hasDayChanged = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() !== date2.getFullYear() ||
    date1.getMonth() !== date2.getMonth() ||
    date1.getDate() !== date2.getDate()
  );
};

export const updateUserEvent = catchAsync(
  async (req: AuthenticatedRequest, res, next) => {
    const updateUserEventDto: UpdateUserEventDto = req.body;
    const { repeatableUserEventUpdateType } = updateUserEventDto;
    const { userEventId } = req.params;
    const userEvent = await UserEvent.findById(userEventId);

    if (!userEvent) {
      return next(
        new AppError('User event with provided ID does not exist', 400),
      );
    }

    if (
      new Date(updateUserEventDto.startDateTime) >=
      new Date(updateUserEventDto.endDateTime)
    ) {
      return next(new AppError('Start time must be before end time', 400));
    }

    if (!req.user.events.includes(userEvent.id)) {
      return next(new AppError("You can't edit other peoples' events", 400));
    }

    const newStartDateTime = new Date(updateUserEventDto.startDateTime);
    const newEndDateTime = new Date(updateUserEventDto.endDateTime);

    if (
      userEvent.repeatableUserEventsGroupId &&
      repeatableUserEventUpdateType &&
      repeatableUserEventUpdateType !== 'single' &&
      (hasDayChanged(userEvent.startDateTime, newStartDateTime) ||
        hasDayChanged(userEvent.endDateTime, newEndDateTime))
    ) {
      return next(
        new AppError(
          'When updating multiple reccurring events updating the day is not allowed, only the time can be updated',
          400,
        ),
      );
    }

    if (
      userEvent.repeatableUserEventsGroupId &&
      repeatableUserEventUpdateType &&
      repeatableUserEventUpdateType !== 'single'
    ) {
      return updateMultipleUserEvents(
        req,
        res,
        next,
        userEvent,
        repeatableUserEventUpdateType,
      );
    }

    // @ts-ignore
    userEvent.startDateTime = convertToUTC(
      updateUserEventDto.startDateTime,
      req.timezone,
    );

    //@ts-ignore
    userEvent.endDateTime = convertToUTC(
      updateUserEventDto.endDateTime,
      req.timezone,
    );

    userEvent.title = updateUserEventDto.title;
    userEvent.note = updateUserEventDto.note;
    userEvent.location = updateUserEventDto.location;
    userEvent.isPrivate = updateUserEventDto.isPrivate;

    const updatedUserEvent = await userEvent.save();
    res.json({
      status: ResponseStatus.SUCCESS,
      data: new UpdateUserEventResponseDto(updatedUserEvent),
    });
  },
);

const deleteMultipleUserEvents = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
  userEvent: IUserEvent,
  repeatableUserEventUpdateType: RepeatableUserEventUpdateType,
) => {
  const filter: any = {
    repeatableUserEventsGroupId: userEvent.repeatableUserEventsGroupId,
  };

  if (repeatableUserEventUpdateType === 'future') {
    filter.startDateTime = { $gte: userEvent.startDateTime };
  }

  const deletedEvents = await UserEvent.find(filter);
  await UserEvent.deleteMany(filter);

  const deletedEventIds = deletedEvents.map((event) => event.id.toString());
  req.user.events = req.user.events.filter(
    (eventId) => !deletedEventIds.includes(eventId.toString()),
  );
  await req.user.save();

  res.json({
    status: ResponseStatus.SUCCESS,
    data: null,
  });
};

export const deleteUserEvent = catchAsync(async (req, res, next) => {
  const { userEventId } = req.params;

  const repeatableUserEventUpdateType:
    | RepeatableUserEventUpdateType
    | undefined
    | null = req.query?.repeatableUserEventUpdateType;

  const userEvent = await UserEvent.findById(userEventId);

  if (!userEvent) {
    return next(
      new AppError('User event with provided ID does not exist', 400),
    );
  }

  if (!req.user.events.includes(userEvent.id)) {
    return next(new AppError("You can't delete other peoples' events", 400));
  }

  if (
    userEvent.repeatableUserEventsGroupId &&
    repeatableUserEventUpdateType &&
    repeatableUserEventUpdateType !== 'single'
  ) {
    return deleteMultipleUserEvents(
      req,
      res,
      next,
      userEvent,
      repeatableUserEventUpdateType,
    );
  }

  await UserEvent.findOneAndDelete({ _id: userEventId });

  res.json({
    status: ResponseStatus.SUCCESS,
    data: null,
  });
});
