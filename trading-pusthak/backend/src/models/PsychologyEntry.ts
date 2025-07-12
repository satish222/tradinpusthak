import mongoose, { Schema, Document } from 'mongoose';

export interface IPsychologyEntry extends Document {
  _id: string;
  userId: mongoose.Types.ObjectId;
  date: Date;
  overallMindset: string;
  topEmotions: string[];
  emotionImpact: string;
  disciplineRating: number; // 1-10
  improvementPlan: string;
  createdAt: Date;
  updatedAt: Date;
}

const psychologyEntrySchema = new Schema<IPsychologyEntry>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: [true, 'Date is required']
  },
  overallMindset: {
    type: String,
    required: [true, 'Overall mindset is required'],
    maxlength: 1000
  },
  topEmotions: [{
    type: String,
    trim: true
  }],
  emotionImpact: {
    type: String,
    required: [true, 'Emotion impact is required'],
    maxlength: 1000
  },
  disciplineRating: {
    type: Number,
    required: [true, 'Discipline rating is required'],
    min: 1,
    max: 10
  },
  improvementPlan: {
    type: String,
    required: [true, 'Improvement plan is required'],
    maxlength: 1000
  }
}, {
  timestamps: true
});

// Add indexes for better query performance
psychologyEntrySchema.index({ userId: 1, date: -1 });
psychologyEntrySchema.index({ userId: 1, disciplineRating: 1 });

export default mongoose.model<IPsychologyEntry>('PsychologyEntry', psychologyEntrySchema);