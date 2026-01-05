import mongoose from 'mongoose';

// Helper function to generate URL-safe slug
function generateSlug(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')        // Replace spaces with -
    .replace(/[^\w\-]+/g, '')    // Remove all non-word chars
    .replace(/\-\-+/g, '-')      // Replace multiple - with single -
    .replace(/^-+/, '')          // Trim - from start of text
    .replace(/-+$/, '');         // Trim - from end of text
}

const documentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot be more than 200 characters']
  },
  slug: {
    type: String,
    required: false,  // Made optional - will auto-generate if not provided
    trim: true,
    lowercase: true,
    index: true
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: [4000, 'Description cannot be more than 4000 characters']
  },
  type: {
    type: String,
    required: [true, 'Type is required'],
    enum: {
      values: ['book', 'note', 'handout', 'pastpaper', 'assignment', 'exam', 'mcqs', 'syllabus'],
      message: 'Type must be one of: book, notes, handout, pastpaper, assignment, exam, mcqs, syllabus'
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

// Auto-generate slug from title if not provided
documentSchema.pre('validate', async function (next) {
  if (!this.slug && this.title) {
    let baseSlug = generateSlug(this.title);
    let slug = baseSlug;
    let counter = 1;

    // Check for uniqueness within the same type
    while (await mongoose.models.Document.findOne({ type: this.type, slug: slug, _id: { $ne: this._id } })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    this.slug = slug;
  }
  next();
});

// Update slug when title changes (only if slug was auto-generated)
documentSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Create indexes for better query performance
documentSchema.index({ type: 1 });
documentSchema.index({ subject: 1 });
documentSchema.index({ university: 1 });
documentSchema.index({ year: 1 });
documentSchema.index({ tags: 1 });
documentSchema.index({ createdAt: -1 });

// Compound unique index: slug must be unique per type
documentSchema.index({ type: 1, slug: 1 }, { unique: true });

// Create compound indexes for common filter combinations
documentSchema.index({ type: 1, subject: 1 });
documentSchema.index({ university: 1, year: 1 });

const Document = mongoose.models.Document || mongoose.model('Document', documentSchema);

export default Document;
