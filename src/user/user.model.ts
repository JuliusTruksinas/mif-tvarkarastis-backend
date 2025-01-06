import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { IUser } from './user.types';

const userSchema = new mongoose.Schema<IUser>({
  firstName: {
    type: String,
    required: true,
    maxlength: 100,
  },
  lastName: {
    type: String,
    required: true,
    maxlength: 100,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    maxlength: 100,
  },
  password: {
    type: String,
    required: true,
    select: false,
    minlength: 6,
    maxlength: 100,
  },
  studyType: {
    type: Number,
    required: true,
  },
  programName: {
    type: String,
    required: true,
    maxlength: 100,
  },
  course: {
    type: Number,
    required: true,
  },
  group: {
    type: Number,
    required: true,
  },
  subgroup: {
    type: Number,
    required: true,
  },
  resetPasswordToken: {
    type: String,
    required: false,
    default: null,
  },
  preferredNavigationApp: {
    type: String,
    required: true,
    enum: ['googleMaps', 'waze'],
    default: 'googleMaps',
  },
  profilePhotoUrl: {
    type: String,
    required: false,
  },
  hiddenLectureTitles: {
    type: [String],
    required: false,
    default: [],
  },
  events: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UserEvent' }],
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: [] }],
  sentFriendRequests: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: [] },
  ],
  notifications: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Notification', default: [] },
  ],
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);

  next();
});

// TODO: add english group and subgroup

export const User = mongoose.model<IUser>('User', userSchema);
