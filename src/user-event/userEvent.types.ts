import mongoose, { Document } from 'mongoose';

export interface IUserEvent extends Document {
  _id: mongoose.Types.ObjectId;
  startDateTime: Date;
  endDateTime: Date;
  title: string;
  notes?: string;
  location?: string;
}
