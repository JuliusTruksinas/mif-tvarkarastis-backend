import mongoose, { Document } from 'mongoose';

export interface IUserEvent extends Document {
  _id: mongoose.Types.ObjectId;
  startDateTime: Date;
  endDateTime: Date;
  title: string;
  note?: string;
  location?: string;
  repeatable: boolean;
  repeatableUntil?: Date;
  user: mongoose.ObjectId;
  private: boolean;
  repeatableId: string;
}
