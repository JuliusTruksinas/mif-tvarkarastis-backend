import mongoose from 'mongoose';
import { IUserEvent } from '../../userEvent.types';

export class CreateUserEventResponseDto {
  id: mongoose.Types.ObjectId;
  startDateTime: Date;
  endDateTime: Date;
  title: string;
  note: string | null;
  location: string | null;

  constructor(userEvent: IUserEvent) {
    this.id = userEvent._id;
    this.startDateTime = userEvent.startDateTime;
    this.endDateTime = userEvent.endDateTime;
    this.title = userEvent.title;
    this.note = userEvent.note ?? null;
    this.location = userEvent.location ?? null;
  }
}
