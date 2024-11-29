import mongoose from 'mongoose';
import { ILectureEvent } from './lectureEvent.types';

const lectureEventSchema = new mongoose.Schema<ILectureEvent>({
  startDateTime: {
    type: Date,
    required: true,
  },
  endDateTime: {
    type: Date,
    required: true,
  },
  title: {
    type: String,
    required: true,
    maxlength: 200,
    minlength: 1,
  },
  groups: {
    type: [Number],
    required: true,
  },
  subgroup: {
    type: Number,
    required: false,
  },
  lecturer: {
    type: String,
    required: true,
  },
  lectureTypes: {
    type: [String],
    required: true,
  },
  comment: {
    type: String,
    required: false,
    maxlength: 2000,
    minlength: 1,
  },
  location: {
    type: String,
    required: true,
    maxlength: 100,
    minlength: 1,
  },
  room: {
    type: Number,
    required: false,
  },
});

export const LectureEvent = mongoose.model<ILectureEvent>(
  'LectureEvent',
  lectureEventSchema,
);