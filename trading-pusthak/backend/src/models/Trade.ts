import mongoose, { Schema, Document } from 'mongoose';

export interface IEmotion {
  type: 'fear' | 'greed' | 'confidence' | 'regret' | 'euphoria' | 'anger' | 'anxiety' | 'excitement';
  intensity: number; // 1-10
}

export interface IPsychologyData {
  moodBefore: 'excellent' | 'good' | 'neutral' | 'anxious' | 'stressed';
  confidenceLevel: number; // 1-10
  focusLevel: number; // 1-10
  emotions: IEmotion[];
  mistakesMade: string[];
  followedRules: boolean;
  disciplineScore: number; // 1-10
  reflectionNotes: string;
}

export interface ITrade extends Document {
  _id: string;
  userId: mongoose.Types.ObjectId;
  tradeDate: Date;
  segment: 'Futures' | 'Options';
  instrument: string;
  tradeType: 'Buy' | 'Sell';
  strikePrice?: number;
  optionType?: 'CE' | 'PE';
  expiryDate?: Date;
  productType: 'MIS' | 'NRML';
  entryPrice: number;
  exitPrice: number;
  positionSize: number;
  lots: number;
  stopLoss?: number;
  target?: number;
  pnl: number;
  strategy: string;
  tags: string[];
  screenshot?: string;
  psychology: IPsychologyData;
  createdAt: Date;
  updatedAt: Date;
}

const emotionSchema = new Schema<IEmotion>({
  type: {
    type: String,
    enum: ['fear', 'greed', 'confidence', 'regret', 'euphoria', 'anger', 'anxiety', 'excitement'],
    required: true
  },
  intensity: {
    type: Number,
    required: true,
    min: 1,
    max: 10
  }
});

const psychologyDataSchema = new Schema<IPsychologyData>({
  moodBefore: {
    type: String,
    enum: ['excellent', 'good', 'neutral', 'anxious', 'stressed'],
    required: true
  },
  confidenceLevel: {
    type: Number,
    required: true,
    min: 1,
    max: 10
  },
  focusLevel: {
    type: Number,
    required: true,
    min: 1,
    max: 10
  },
  emotions: [emotionSchema],
  mistakesMade: [{
    type: String
  }],
  followedRules: {
    type: Boolean,
    required: true
  },
  disciplineScore: {
    type: Number,
    required: true,
    min: 1,
    max: 10
  },
  reflectionNotes: {
    type: String,
    maxlength: 1000
  }
});

const tradeSchema = new Schema<ITrade>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  tradeDate: {
    type: Date,
    required: [true, 'Trade date is required']
  },
  segment: {
    type: String,
    enum: ['Futures', 'Options'],
    required: [true, 'Segment is required']
  },
  instrument: {
    type: String,
    required: [true, 'Instrument is required'],
    uppercase: true,
    trim: true
  },
  tradeType: {
    type: String,
    enum: ['Buy', 'Sell'],
    required: [true, 'Trade type is required']
  },
  strikePrice: {
    type: Number,
    required: function(this: ITrade) {
      return this.segment === 'Options';
    }
  },
  optionType: {
    type: String,
    enum: ['CE', 'PE'],
    required: function(this: ITrade) {
      return this.segment === 'Options';
    }
  },
  expiryDate: {
    type: Date,
    required: function(this: ITrade) {
      return this.segment === 'Options';
    }
  },
  productType: {
    type: String,
    enum: ['MIS', 'NRML'],
    required: [true, 'Product type is required']
  },
  entryPrice: {
    type: Number,
    required: [true, 'Entry price is required'],
    min: 0
  },
  exitPrice: {
    type: Number,
    required: [true, 'Exit price is required'],
    min: 0
  },
  positionSize: {
    type: Number,
    required: [true, 'Position size is required'],
    min: 1
  },
  lots: {
    type: Number,
    required: [true, 'Lots is required'],
    min: 1
  },
  stopLoss: {
    type: Number,
    min: 0
  },
  target: {
    type: Number,
    min: 0
  },
  pnl: {
    type: Number,
    required: [true, 'P&L is required']
  },
  strategy: {
    type: String,
    required: [true, 'Strategy is required'],
    trim: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  screenshot: {
    type: String
  },
  psychology: {
    type: psychologyDataSchema,
    required: true
  }
}, {
  timestamps: true
});

// Calculate P&L before saving
tradeSchema.pre('save', function(this: ITrade, next) {
  if (this.isModified('entryPrice') || this.isModified('exitPrice') || this.isModified('positionSize')) {
    if (this.tradeType === 'Buy') {
      this.pnl = (this.exitPrice - this.entryPrice) * this.positionSize;
    } else {
      this.pnl = (this.entryPrice - this.exitPrice) * this.positionSize;
    }
  }
  next();
});

// Add indexes for better query performance
tradeSchema.index({ userId: 1, tradeDate: -1 });
tradeSchema.index({ userId: 1, instrument: 1 });
tradeSchema.index({ userId: 1, strategy: 1 });
tradeSchema.index({ userId: 1, pnl: 1 });
tradeSchema.index({ userId: 1, segment: 1 });

export default mongoose.model<ITrade>('Trade', tradeSchema);