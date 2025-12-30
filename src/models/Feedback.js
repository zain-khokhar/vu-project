import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxlength: [1000, 'Description cannot be more than 1000 characters']
  },
  contact: {
    type: String,
    trim: true,
    maxlength: [100, 'Contact cannot be more than 100 characters'],
    default: ''
  },
  contactType: {
    type: String,
    enum: ['email', 'phone', 'other', ''],
    default: ''
  },
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'responded'],
    default: 'pending'
  },
  adminNotes: {
    type: String,
    default: '',
    maxlength: [500, 'Admin notes cannot be more than 500 characters']
  },
  ipAddress: {
    type: String,
    default: ''
  },
  userAgent: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

// Create indexes for better query performance
feedbackSchema.index({ status: 1 });
feedbackSchema.index({ createdAt: -1 });
feedbackSchema.index({ name: 1 });

// Create compound indexes for common filter combinations
feedbackSchema.index({ status: 1, createdAt: -1 });

const Feedback = mongoose.models.Feedback || mongoose.model('Feedback', feedbackSchema);

export default Feedback;