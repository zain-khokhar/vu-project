import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot be more than 200 characters']
  },
  slug: {
    type: String,
    required: [true, 'Slug is required'],
    unique: true,
    trim: true,
    lowercase: true
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: [2000, 'Description cannot be more than 2000 characters']
  },
  type: {
    type: String,
    required: [true, 'Type is required'],
    enum: {
      values: ['handout', 'book', 'note', 'exam'],
      message: 'Type must be one of: handout, book, note, exam'
    }
  },
  fileUrl: {
    type: String,
    required: [true, 'File URL is required']
  },
  subject: {
    type: String,
    required: [true, 'Subject is required'],
    trim: true,
    maxlength: [100, 'Subject cannot be more than 100 characters']
  },
  university: {
    type: String,
    required: [true, 'University is required'],
    trim: true,
    maxlength: [200, 'University cannot be more than 200 characters']
  },
  year: {
    type: Number,
    required: [true, 'Year is required'],
    min: [1900, 'Year must be after 1900'],
    max: [new Date().getFullYear() + 10, 'Year cannot be more than 10 years in the future']
  },
  tags: [{
    type: String,
    trim: true,
    maxlength: [50, 'Each tag cannot be more than 50 characters']
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Create indexes for better query performance (slug index auto-created by unique: true)
documentSchema.index({ type: 1 });
documentSchema.index({ subject: 1 });
documentSchema.index({ university: 1 });
documentSchema.index({ year: 1 });
documentSchema.index({ tags: 1 });
documentSchema.index({ createdAt: -1 });

// Create compound indexes for common filter combinations
documentSchema.index({ type: 1, subject: 1 });
documentSchema.index({ university: 1, year: 1 });

const Document = mongoose.models.Document || mongoose.model('Document', documentSchema);

export default Document;