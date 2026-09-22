import mongoose from 'mongoose';

const ApplicationSchema = new mongoose.Schema({
  userId: { type: String, default: '' },
  candidateId: { type: String, default: '' },

  jobId: { type: String, required: true },

  email: { type: String, default: '' },
  candidateEmail: { type: String, default: '' },
  candidateName: { type: String, default: '' },

  companyId: { type: String, default: '' },
  company: { type: String, default: '' },
  jobTitle: { type: String, default: '' },

  status: {
    type: String,
    enum: ['pending', 'reviewing', 'accepted', 'rejected'],
    default: 'pending'
  }
}, { timestamps: true });

export default mongoose.models.Application ||
  mongoose.model('Application', ApplicationSchema);
