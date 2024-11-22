import { ResponseStatus } from '../constants/responseStatus';
import AppError from '../utils/appError';
import { catchAsync } from '../utils/catchAsync';
import { transformMongoDbObjectId } from '../utils/transformMongoDbObjectId';
import { CreateUserEventDto } from './dto/request/create-user-event.dto';
import { UpdateUserEventDto } from './dto/request/update-user-event.dto';
import { CreateUserEventResponseDto } from './dto/response/create-user-event-response.dto';
import { UpdateUserEventResponseDto } from './dto/response/update-user-event-response-dto';
import { UserEvent } from './userEvent.model';

export const fetchUserEvents = catchAsync(async (req, res, next) => {
  const userEvents = await UserEvent.find({}).lean();

  res.json({
    status: ResponseStatus.SUCESS,
    data: userEvents.map((userEvent) => transformMongoDbObjectId(userEvent)),
  });
});

export const createUserEvent = catchAsync(async (req, res, next) => {
  const {
    startDateTime,
    endDateTime,
    title,
    notes,
    location,
  }: CreateUserEventDto = req.body;

  const createdUserEvent = await UserEvent.create({
    startDateTime,
    endDateTime,
    title,
    notes,
    location,
    user: req.user,
  });
  res.json({
    status: ResponseStatus.SUCESS,
    data: new CreateUserEventResponseDto(createdUserEvent),
  });
});

export const updateUserEvent = catchAsync(async (req, res, next) => {
  const updateUserEventDto: UpdateUserEventDto = req.body;
  const { userEventId } = req.params;
  const userEvent = await UserEvent.findById(userEventId);

  if (!userEvent) {
    return next(
      new AppError('User event with provided ID does not exist', 400),
    );
  }

  for (const key of Object.keys(updateUserEventDto)) {
    userEvent[key] = updateUserEventDto[key];
  }

  const updatedUserEvent = await userEvent.save();
  res.json({
    status: ResponseStatus.SUCESS,
    data: new UpdateUserEventResponseDto(updatedUserEvent),
  });
});

export const deleteUserEvent = catchAsync(async (req, res, next) => {
  const { userEventId } = req.params;
  const userEvent = await UserEvent.findById(userEventId);
  if (!userEvent) {
    return next(
      new AppError('User event with provided ID does not exist', 400),
    );
  }

  await UserEvent.findOneAndDelete({ _id: userEventId });

  res.json({
    status: ResponseStatus.SUCESS,
    data: null,
  });
});
