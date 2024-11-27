import mongoose, { Document } from 'mongoose';

export interface ILectureEvent extends Document {
  _id: mongoose.Types.ObjectId;
  startDateTime: Date;
  endDateTime: Date;
  title: string;
  groups: number[];
  subgroup?: number;
  lecturer: string;
  lectureTypes: string[];
  comment?: string;
  location: string;
  room?: number;
}
