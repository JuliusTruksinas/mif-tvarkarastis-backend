import mongoose, { Document } from 'mongoose';
import { PreferredNavigationApp } from '../domain/navigation';

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  studyType: number;
  programName: string;
  course: number;
  group: number;
  subgroup: number;
  resetPasswordToken: string | null;
  preferredNavigationApp: PreferredNavigationApp;
  events: mongoose.ObjectId[];
  friends: mongoose.ObjectId[];
  sentFriendRequests: mongoose.ObjectId[];
  notifications: mongoose.Types.ObjectId[];
}
