import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUserSettings {
  theme: 'light' | 'dark';
  defaultInstrument: string;
  defaultProductType: 'MIS' | 'NRML';
  defaultStrategies: string[];
  timezone: string;
  timeFormat: '12h' | '24h';
}

export interface IUser extends Document {
  _id: string;
  email: string;
  password: string;
  name: string;
  avatar?: string;
  settings: IUserSettings;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSettingsSchema = new Schema<IUserSettings>({
  theme: {
    type: String,
    enum: ['light', 'dark'],
    default: 'light'
  },
  defaultInstrument: {
    type: String,
    default: 'NIFTY'
  },
  defaultProductType: {
    type: String,
    enum: ['MIS', 'NRML'],
    default: 'MIS'
  },
  defaultStrategies: [{
    type: String
  }],
  timezone: {
    type: String,
    default: 'Asia/Kolkata'
  },
  timeFormat: {
    type: String,
    enum: ['12h', '24h'],
    default: '24h'
  }
});

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please enter a valid email address'
    ]
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long'],
    select: false
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  avatar: {
    type: String,
    default: ''
  },
  settings: {
    type: userSettingsSchema,
    default: () => ({})
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(this: IUser, next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Remove password from JSON output
userSchema.methods.toJSON = function() {
  const userObject = this.toObject();
  delete (userObject as any).password;
  return userObject;
};

export default mongoose.model<IUser>('User', userSchema);