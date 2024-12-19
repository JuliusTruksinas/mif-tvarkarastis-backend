import { AuthenticatedRequest } from '../domain/authenticatedRequest';
import { convertToUTC } from '../helpers/time';
import { User } from '../user/user.model';
import AppError from '../utils/appError';
import { catchAsync } from '../utils/catchAsync';
import { transformMongoDbObjectId } from '../utils/transformMongoDbObjectId';
import { GetUserLectureEventsRequestDto } from './dto/request/get-user-lecture-events.dto';
import { LectureEvent } from './lectureEvent.model';

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

    const lectureEvents = await LectureEvent.find()
      .where('programName')
      .equals(foundUser.programName)
      .where('course')
      .equals(foundUser.course)
      .where('group')
      .equals(foundUser.group)
      .or([{ subgroup: foundUser.subgroup }, { subgroup: null }])
      .where('startDateTime')
      .gte(new Date(convertToUTC(startDateTime, req.timezone)).getTime())
      .where('endDateTime')
      .lte(new Date(convertToUTC(endDateTime, req.timezone)).getTime())
      .lean();

    res.json({
      status: 'success',
      data: lectureEvents.map((event) => transformMongoDbObjectId(event)),
    });
  },
);
