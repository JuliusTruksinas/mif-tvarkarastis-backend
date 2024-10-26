import mongoose from 'mongoose';
import { IUser } from './user.types';

const userSchema = new mongoose.Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

export const User = mongoose.model<IUser>('User', userSchema);
