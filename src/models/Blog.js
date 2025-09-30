import mongoose from 'mongoose';

// Import Author model to ensure it's registered
import './Author.js';

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    default: function() {
      return this.title ? 
        this.title.toLowerCase().replace(/[^a-z0-9 -]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-') + '-' + Date.now() : 
        'blog-' + Date.now();
    }
  },
  excerpt: {
    type: String,
    required: true,
    maxLength: 300,
  },
  coverImage: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
    required: true,
  },
  published: {
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
  }
});

// Update the updatedAt field before saving
blogSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Create index for createdAt for faster queries (slug index is auto-created by unique: true)
blogSchema.index({ createdAt: -1 });

const Blog = mongoose.models.Blog || mongoose.model('Blog', blogSchema);

export default Blog;