import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
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
  programName: {
    type: String,
    required: true,
    maxlength: 100,
  },
  group: {
    type: Number,
    required: true,
  },
  subgroup: {
    type: Number,
    required: true,
  },
  events: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UserEvent' }],
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);

  next();
});

// TODO: add english group and subgroup

export const User = mongoose.model<IUser>('User', userSchema);
