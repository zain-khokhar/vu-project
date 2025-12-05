'use server';

import connectDB from '@/lib/mongodb';
import Comment from '@/models/Comment';
import Document from '@/models/Document';
import mongoose from 'mongoose';

// Get comments for a document with pagination (only visible comments)
export async function getComments(documentId, page = 1, limit = 4) {
  try {
    await connectDB();

    if (!mongoose.Types.ObjectId.isValid(documentId)) {
      return { success: false, error: 'Invalid document ID' };
    }

    const skip = (page - 1) * limit;

    const [comments, totalCount] = await Promise.all([
      Comment.find({ documentId, status: 'visible' })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Comment.countDocuments({ documentId, status: 'visible' })
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

// Admin: Get all comments with pagination and filters
export async function getAllCommentsAdmin(page = 1, limit = 10, statusFilter = 'all', searchQuery = '') {
  try {
    await connectDB();

    const skip = (page - 1) * limit;

    // Build query
    const query = {};
    if (statusFilter !== 'all') {
      query.status = statusFilter;
    }
    if (searchQuery) {
      query.$or = [
        { name: { $regex: searchQuery, $options: 'i' } },
        { content: { $regex: searchQuery, $options: 'i' } }
      ];
    }

    const [comments, totalCount] = await Promise.all([
      Comment.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Comment.countDocuments(query)
    ]);

    // Get document titles for each comment
    const documentIds = [...new Set(comments.map(c => c.documentId.toString()))];
    const documents = await Document.find({ _id: { $in: documentIds } })
      .select('_id title')
      .lean();

    const documentMap = {};
    documents.forEach(doc => {
      documentMap[doc._id.toString()] = doc.title;
    });

    // Add document titles to comments
    const commentsWithDocuments = comments.map(comment => ({
      ...comment,
      documentTitle: documentMap[comment.documentId.toString()] || 'Unknown Document'
    }));

    const totalPages = Math.ceil(totalCount / limit);

    return {
      success: true,
      comments: JSON.parse(JSON.stringify(commentsWithDocuments)),
      currentPage: page,
      totalPages,
      totalCount
    };
  } catch (error) {
    console.error('Error fetching admin comments:', error);
    return { success: false, error: 'Failed to fetch comments' };
  }
}

// Admin: Get comment statistics
export async function getCommentStatsAdmin() {
  try {
    await connectDB();

    const [total, visible, deleted] = await Promise.all([
      Comment.countDocuments({}),
      Comment.countDocuments({ status: 'visible' }),
      Comment.countDocuments({ status: 'deleted' })
    ]);

    return {
      success: true,
      stats: {
        total,
        visible,
        deleted
      }
    };
  } catch (error) {
    console.error('Error fetching comment stats:', error);
    return { success: false, error: 'Failed to fetch statistics' };
  }
}

// Admin: Update comment status
export async function updateCommentStatus(commentId, status) {
  try {
    await connectDB();

    if (!mongoose.Types.ObjectId.isValid(commentId)) {
      return { success: false, error: 'Invalid comment ID' };
    }

    if (!['visible', 'deleted'].includes(status)) {
      return { success: false, error: 'Invalid status' };
    }

    const comment = await Comment.findByIdAndUpdate(
      commentId,
      { status },
      { new: true }
    ).lean();

    if (!comment) {
      return { success: false, error: 'Comment not found' };
    }

    return {
      success: true,
      comment: JSON.parse(JSON.stringify(comment))
    };
  } catch (error) {
    console.error('Error updating comment status:', error);
    return { success: false, error: 'Failed to update comment status' };
  }
}

// Admin: Delete comment (soft delete)
export async function deleteCommentAdmin(commentId) {
  try {
    await connectDB();

    if (!mongoose.Types.ObjectId.isValid(commentId)) {
      return { success: false, error: 'Invalid comment ID' };
    }

    const comment = await Comment.findByIdAndUpdate(
      commentId,
      { status: 'deleted' },
      { new: true }
    ).lean();

    if (!comment) {
      return { success: false, error: 'Comment not found' };
    }

    return {
      success: true,
      message: 'Comment deleted successfully'
    };
  } catch (error) {
    console.error('Error deleting comment:', error);
    return { success: false, error: 'Failed to delete comment' };
  }
}