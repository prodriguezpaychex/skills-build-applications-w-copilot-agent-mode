import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, min: 0 },
    calories: { type: Number, min: 0 },
    recordedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

export default mongoose.model('Activity', activitySchema);
