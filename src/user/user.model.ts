import mongoose from 'mongoose';
import { IUser } from './user.types';

const userSchema = new mongoose.Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    maxlength: 100,
    
  },
  password: {
    type: String,
    required: true,
    select: false,
    minlength: 6,
    maxlength: 100,
  },
  programName:{
    type: String,
    required: true,
    IsString: true,
    maxlength: 100,
  },
  group:{
    type: Number,
    required: true,
    IsNumber: true,
  },
  subGroup:{
    type: Number,
    required: true,
    IsNumber: true, 
  }
});

// TODO: add english group and subGroup

export const User = mongoose.model<IUser>('User', userSchema);
