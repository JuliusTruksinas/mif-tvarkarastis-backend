import mongoose from 'mongoose';
import { IUserEvent } from '../../userEvent.types';

export class UpdateUserEventResponseDto {
  id: mongoose.Types.ObjectId;
  startDateTime: Date;
  endDateTime: Date;
  title: string;
  notes: string | null;
  location: string | null;

  constructor(userEvent: IUserEvent) {
    this.id = userEvent._id;
    this.startDateTime = userEvent.startDateTime;
    this.endDateTime = userEvent.endDateTime;
    this.title = userEvent.title;
    this.notes = userEvent.notes || null;
    this.location = userEvent.location || null;
  }
}
