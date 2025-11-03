import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
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
    },
    excerpt: {
      type: String,
      required: true,
    },
    coverImage: {
      url: {
        type: String,
        required: true,
      },
      alt: {
        type: String,
        required: true,
        default: '',
      },
      publicId: {
        type: String,
        required: false,
      },
      width: {
        type: Number,
        required: false,
      },
      height: {
        type: Number,
        required: false,
      },
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author", // Assuming you have an Author model
      required: true,
    },
    published: {
      type: Boolean,
      default: true, // Changed to true so blogs are published by default
    },
  },
  {
    timestamps: true, // automatically adds createdAt & updatedAt
  }
);

export default mongoose.models.Blog || mongoose.model("Blog", BlogSchema);
