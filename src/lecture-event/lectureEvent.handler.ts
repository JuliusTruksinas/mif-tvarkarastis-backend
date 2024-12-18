import { AuthenticatedRequest } from '../domain/authenticatedRequest';
import { convertToUTC } from '../helpers/time';
import { catchAsync } from '../utils/catchAsync';
import { transformMongoDbObjectId } from '../utils/transformMongoDbObjectId';
import { GetUserLectureEventsRequestDto } from './dto/request/get-user-lecture-events.dto';
import { LectureEvent } from './lectureEvent.model';

export const getUserLectureEvents = catchAsync(
  async (req: AuthenticatedRequest, res, next) => {
    const { user } = req;
    const { startDateTime, endDateTime }: GetUserLectureEventsRequestDto =
      req.body;

    const lectureEvents = await LectureEvent.find({
      programName: user.programName,
      course: user.course,
      groups: user.group,
      $or: [{ subgroup: user.subgroup }, { subgroup: null }],
      $and: [
        {
          startDateTime: {
            $gte: new Date(convertToUTC(startDateTime, req.timezone)),
          },
        },
        {
          endDateTime: {
            $lte: new Date(convertToUTC(endDateTime, req.timezone)),
          },
        },
      ],
    }).lean();

    res.json({
      status: 'success',
      data: lectureEvents.map((event) => transformMongoDbObjectId(event)),
    });
  },
);
