import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, trim: true, unique: true },
    email: { type: String, required: true, trim: true, lowercase: true, unique: true },
    displayName: { type: String, trim: true },
    passwordHash: { type: String, select: false },
  },
  { timestamps: true },
);

export default mongoose.model('User', userSchema);
