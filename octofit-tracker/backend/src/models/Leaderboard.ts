import mongoose from 'mongoose';

const leaderboardSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
    points: { type: Number, required: true, min: 0, default: 0 },
    rank: { type: Number, min: 1 },
  },
  { timestamps: true },
);

export default mongoose.model('Leaderboard', leaderboardSchema);
