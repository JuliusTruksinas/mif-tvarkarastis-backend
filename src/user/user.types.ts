import { Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
  programName: string;
  group: number;
  subGroup: number;
}
