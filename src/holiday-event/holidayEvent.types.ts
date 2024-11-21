import mongoose, { Document } from 'mongoose';

export interface IHolidayEvent extends Document {
  _id: mongoose.Types.ObjectId;
  startDateTime: Date;
  endDateTime: Date;
  title: string;
}
