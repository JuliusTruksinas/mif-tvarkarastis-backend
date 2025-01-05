import mongoose from 'mongoose';
import { IUser } from '../../user.types';

export class SendBasicUserInfoResponseDto {
  id: mongoose.Types.ObjectId;
  firstName: string;
  lastName: string;
  programName: string;
  course: number;
  profilePhotoUrl?: string | null;

  constructor(user: IUser) {
    this.id = user._id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.programName = user.programName;
    this.course = user.course;
    this.profilePhotoUrl = user.profilePhotoUrl;
  }
}
