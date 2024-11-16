import mongoose, { Document } from 'mongoose';
import { IUser } from '../user/user.types';

export interface IUserEvent extends Document {
  _id: mongoose.Types.ObjectId;
  startDateTime: Date;
  endDateTime: Date;
  title: string;
  notes?: string;
  location?: string;
  user: mongoose.ObjectId;
}
