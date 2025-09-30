'use server';

import connectDB from '@/lib/mongodb';
import Comment from '@/models/Comment';
import mongoose from 'mongoose';

// Get comments for a document with pagination
export async function getComments(documentId, page = 1, limit = 4) {
  try {
    await connectDB();
    
    if (!mongoose.Types.ObjectId.isValid(documentId)) {
      return { success: false, error: 'Invalid document ID' };
    }

    const skip = (page - 1) * limit;
    
    const [comments, totalCount] = await Promise.all([
      Comment.find({ documentId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Comment.countDocuments({ documentId })
    ]);

    const totalPages = Math.ceil(totalCount / limit);
    
    return {
      success: true,
      comments: JSON.parse(JSON.stringify(comments)),
      pagination: {
        currentPage: page,
        totalPages,
        totalCount,
        hasMore: page < totalPages
      }
    };
  } catch (error) {
    console.error('Error fetching comments:', error);
    return { success: false, error: 'Failed to fetch comments' };
  }
}

// Create a new comment
export async function createComment(documentId, name, content) {
  try {
    await connectDB();
    
    if (!mongoose.Types.ObjectId.isValid(documentId)) {
      return { success: false, error: 'Invalid document ID' };
    }

    // Basic validation
    if (!name?.trim()) {
      return { success: false, error: 'Name is required' };
    }
    
    if (!content?.trim()) {
      return { success: false, error: 'Comment content is required' };
    }

    if (name.trim().length > 100) {
      return { success: false, error: 'Name cannot be more than 100 characters' };
    }

    if (content.trim().length > 2000) {
      return { success: false, error: 'Comment cannot be more than 2000 characters' };
    }

    const comment = await Comment.create({
      documentId: new mongoose.Types.ObjectId(documentId),
      name: name.trim(),
      content: content.trim()
    });

    return { 
      success: true, 
      comment: JSON.parse(JSON.stringify(comment)) 
    };
  } catch (error) {
    console.error('Error creating comment:', error);
    return { success: false, error: 'Failed to create comment' };
  }
}