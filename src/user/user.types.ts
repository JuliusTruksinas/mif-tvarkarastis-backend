import mongoose, { Document } from 'mongoose';
import { IUserEvent } from '../user-event/userEvent.types';

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  email: string;
  password: string;
  programName: string;
  group: number;
  subGroup: number;
  events: mongoose.ObjectId[];
}
