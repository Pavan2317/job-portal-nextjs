import mongoose from 'mongoose';

const ApplicationSchema = new mongoose.Schema({
  userId: { type: String, required: false },
  jobId: { type: String, required: true },
  email: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.Application || mongoose.model('Application', ApplicationSchema);