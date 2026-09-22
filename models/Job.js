import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  companyId: { type: String, default: '' },

  location: { type: String, required: true },

  salary: { type: String, default: '' },
  skills: { type: String, default: '' },
  experience: { type: String, default: '' },
  type: { type: String, default: 'Full-time' },
  category: { type: String, default: '' },

  description: { type: String, default: '' },
  requirements: { type: [String], default: [] },

  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Job ||
  mongoose.model('Job', JobSchema);
