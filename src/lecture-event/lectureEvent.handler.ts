import { catchAsync } from '../utils/catchAsync';
import { transformMongoDbObjectId } from '../utils/transformMongoDbObjectId';
import { LectureEvent } from './lectureEvent.model';

export const getUserLectureEvents = catchAsync(async (req, res, next) => {
  const { user } = req;

  const lectureEvents = await LectureEvent.find({
    programName: user.programName,
    course: user.course,
    groups: user.group,
    $or: [{ subgroup: user.subgroup }, { subgroup: null }],
  }).lean();

  res.json({
    status: 'success',
    data: lectureEvents.map((event) => transformMongoDbObjectId(event)),
  });
});
