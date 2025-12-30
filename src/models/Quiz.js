import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    required: true,
  },
  correct: {
    type: String,
    required: true,
  },
  explanation: {
    type: String,
    default: 'N/A',
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    default: 'Medium',
  },
  importance: {
    type: Number,
    min: 1,
    max: 5,
    default: 3,
  },
});

const QuizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Quiz title is required'],
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Quiz description is required'],
    trim: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  icon: {
    type: String,
    default: '📚',
  },
  color: {
    type: String,
    default: 'from-gray-500 to-slate-500',
  },
  questions: {
    type: [QuestionSchema],
    required: true,
    validate: {
      validator: function(v) {
        return v.length > 0;
      },
      message: 'Quiz must have at least one question'
    }
  },
  totalQuestions: {
    type: Number,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update totalQuestions before saving
QuizSchema.pre('save', function(next) {
  this.totalQuestions = this.questions.length;
  this.updatedAt = Date.now();
  next();
});

// Create slug from title if not provided
QuizSchema.pre('validate', function(next) {
  if (this.title && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

const Quiz = mongoose.models.Quiz || mongoose.model('Quiz', QuizSchema);

export default Quiz;
