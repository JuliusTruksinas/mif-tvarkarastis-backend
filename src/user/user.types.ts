import mongoose, { Document } from 'mongoose';

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  programName: string;
  group: number;
  subgroup: number;
  events: mongoose.ObjectId[];
  friends: mongoose.ObjectId[];
  sentFriendRequests: mongoose.ObjectId[];
  notifications: mongoose.Types.ObjectId[];
}
