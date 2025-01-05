import { IUser } from '../user/user.types';
import { LectureEvent } from './lectureEvent.model';
import { ILectureEvent } from './lectureEvent.types';

export type GetUsersLectureEventsQueryOptions = {
  areSelectableLecturesIncluded: boolean;
};

export const getUsersLectureEventsQuery = async (
  user: IUser,
  fromTimeInMs: number,
  toTimeInMs: number,
  options: GetUsersLectureEventsQueryOptions,
) => {
  const lectureEventsQuery = LectureEvent.find()
    .where('programName')
    .equals(user.programName)
    .where('course')
    .equals(user.course)
    .where('group')
    .equals(user.group)
    .or([{ subgroup: user.subgroup }, { subgroup: null }])
    .where('startDateTime')
    .gte(fromTimeInMs)
    .where('endDateTime')
    .lte(toTimeInMs);

  if (!options.areSelectableLecturesIncluded) {
    lectureEventsQuery.and([
      {
        $or: [
          { lectureTypes: { $elemMatch: { $eq: 'egzaminas' } } },
          { lectureTypes: { $elemMatch: { $eq: 'privalomasis' } } },
        ],
      },
    ]);
  }

  return await lectureEventsQuery.lean<ILectureEvent[]>();
};