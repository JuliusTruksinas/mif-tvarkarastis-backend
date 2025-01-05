import { UserEvent } from './userEvent.model';
import { IUserEvent } from './userEvent.types';

export const getUsersUserEventsQuery = async (
  userId: string,
  fromTimeInMs: number,
  toTimeInMs: number,
  isRequestingSelfUserEvents: boolean,
) => {
  const query = UserEvent.find()
    .where('startDateTime')
    .gte(fromTimeInMs)
    .where('endDateTime')
    .lte(toTimeInMs);

  if (isRequestingSelfUserEvents) {
    query.where('user').equals(userId);
  } else {
    query
      .where('user')
      .equals(userId)
      .and([{ isPrivate: false }]);
  }

  return await query.lean<IUserEvent[]>();
};
