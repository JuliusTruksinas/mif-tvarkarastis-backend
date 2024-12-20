import { ResponseStatus } from '../constants/responseStatus';
import AppError from '../utils/appError';
import { catchAsync } from '../utils/catchAsync';
import { transformMongoDbObjectId } from '../utils/transformMongoDbObjectId';
import { CreateUserEventDto } from './dto/request/create-user-event.dto';
import { UpdateUserEventDto } from './dto/request/update-user-event.dto';
import { CreateUserEventResponseDto } from './dto/response/create-user-event-response.dto';
import { UpdateUserEventResponseDto } from './dto/response/update-user-event-response-dto';
import { UserEvent } from './userEvent.model';
import { convertToUTC } from '../helpers/time';
import { AuthenticatedRequest } from '../domain/authenticatedRequest';
import { GetUserLectureEventsRequestDto } from '../lecture-event/dto/request/get-user-lecture-events.dto';
import { User } from '../user/user.model';

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

    const userEvents = await UserEvent.find()
      .where('user')
      .equals(foundUser._id)
      .where('startDateTime')
      .gte(new Date(convertToUTC(startDateTime, req.timezone)).getTime())
      .where('endDateTime')
      .lte(new Date(convertToUTC(endDateTime, req.timezone)).getTime())
      .or([{ isPrivate: false }, { user: req.user.id }])
      .lean();

    res.json({
      status: ResponseStatus.SUCCESS,
      data: userEvents.map((userEvent) => transformMongoDbObjectId(userEvent)),
    });
  },
);

export const createUserEvent = catchAsync(
  async (req: AuthenticatedRequest, res, next) => {
    const {
      startDateTime,
      endDateTime,
      title,
      note,
      location,
    }: CreateUserEventDto = req.body;

    if (new Date(startDateTime) >= new Date(endDateTime)) {
      return next(new AppError('Start time must be before end time', 400));
    }

    const createdUserEvent = await UserEvent.create({
      startDateTime: convertToUTC(startDateTime, req.timezone),
      endDateTime: convertToUTC(endDateTime, req.timezone),
      title,
      note,
      location,
      user: req.user.id,
    });

    req.user.events.push(createdUserEvent.id);
    await req.user.save();

    res.json({
      status: ResponseStatus.SUCCESS,
      data: new CreateUserEventResponseDto(createdUserEvent),
    });
  },
);

export const updateUserEvent = catchAsync(
  async (req: AuthenticatedRequest, res, next) => {
    const updateUserEventDto: UpdateUserEventDto = req.body;
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

    //@ts-ignore
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

export const deleteUserEvent = catchAsync(async (req, res, next) => {
  const { userEventId } = req.params;
  const userEvent = await UserEvent.findById(userEventId);

  if (!userEvent) {
    return next(
      new AppError('User event with provided ID does not exist', 400),
    );
  }

  if (!req.user.events.includes(userEvent.id)) {
    return next(new AppError("You can't delete other peoples' events", 400));
  }

  await UserEvent.findOneAndDelete({ _id: userEventId });

  res.json({
    status: ResponseStatus.SUCCESS,
    data: null,
  });
});
