import mongoose from 'mongoose';
import { IUserEvent } from './userEvent.types';
import { maxLength, minLength } from 'class-validator';

const userEventSchema = new mongoose.Schema<IUserEvent>({
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
  notes: {
    type: String,
    required: false,
    maxLength: 2000,
    minLength: 1,
  },
  location: {
    type: String,
    required: false,
    maxLength: 100,
    minLength: 1,
  },
});

export const UserEvent = mongoose.model<IUserEvent>(
  'UserEvent',
  userEventSchema,
);
