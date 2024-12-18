import mongoose from 'mongoose';
import { IUserEvent } from './userEvent.types';

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
  note: {
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
  repeatable: {
    type: Boolean,
    required: true,
    default: false,
  },
  repeatableUntil: {
    type: Date,
    required: false,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

export const UserEvent = mongoose.model<IUserEvent>(
  'UserEvent',
  userEventSchema,
);
