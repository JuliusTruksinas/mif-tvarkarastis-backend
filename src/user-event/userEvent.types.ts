import mongoose, { Document } from 'mongoose';

export interface IUserEvent extends Document {
  _id: mongoose.Types.ObjectId;
  startDateTime: Date;
  endDateTime: Date;
  title: string;
  note?: string;
  location?: string;
  repeatable: Boolean;
  private: Boolean;
  repeatableUntil?: Date;
  user: mongoose.ObjectId;
  repeatableId?: string;
}
