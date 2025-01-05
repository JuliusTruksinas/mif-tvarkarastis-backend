import mongoose, { Document } from 'mongoose';

export type RepeatableUserEventUpdateType = 'single' | 'all' | 'future';

export enum RepeatableUserEventUpdateEnum {
  SINGLE = 'single',
  ALL = 'all',
  FUTURE = 'future',
}

export interface IUserEvent extends Document {
  _id: mongoose.Types.ObjectId;
  startDateTime: Date;
  endDateTime: Date;
  title: string;
  note?: string;
  location?: string;
  user: mongoose.ObjectId;
  isPrivate: boolean;
  repeatableUserEventsGroupId?: string | null;
}
