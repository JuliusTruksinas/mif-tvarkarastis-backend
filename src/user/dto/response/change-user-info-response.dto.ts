import mongoose from 'mongoose';
import { IUser } from '../../user.types';

export class ChangeUserInfoResponseDto {
  id: mongoose.Types.ObjectId;
  email: string;
  programName: string;
  group: number;
  subgroup: number;

  constructor(user: IUser) {
    this.id = user._id;
    this.email = user.email;
    this.programName = user.programName;
    this.group = user.group;
    this.subgroup = user.subgroup;
  }
}
