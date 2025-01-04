import { UserEvent } from './userEvent.model';
import { IUserEvent } from './userEvent.types';

export const getUsersUserEventsQuery = async (
  userId: number,
  fromTimeInMs: number,
  toTimeInMs: number,
) => {
  return await UserEvent.find()
    .where('user')
    .equals(userId)
    .where('startDateTime')
    .gte(fromTimeInMs)
    .where('endDateTime')
    .lte(toTimeInMs)
    .or([{ isPrivate: false }, { user: userId }])
    .lean<IUserEvent[]>();
};
