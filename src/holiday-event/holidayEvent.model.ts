import mongoose from 'mongoose';
import { IHolidayEvent } from './holidayEvent.types';

const holidayEventSchema = new mongoose.Schema<IHolidayEvent>({
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
    maxlength: 100,
    minlength: 1,
  },
});

export const HolidayEvent = mongoose.model<IHolidayEvent>(
  'HolidayEvent',
  holidayEventSchema,
);
