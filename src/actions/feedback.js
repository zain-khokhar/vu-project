'use server';

import connectDB from '@/lib/mongodb';
import Feedback from '@/models/Feedback';

// Create new feedback
export async function createFeedback(formData) {
  try {
    await connectDB();
    
    const { name, description, contact, contactType } = formData;
    
    // Basic validation
    if (!name || !description) {
      return { success: false, error: 'Name and description are required' };
    }
    
    if (name.length > 100) {
      return { success: false, error: 'Name cannot be more than 100 characters' };
    }
    
    if (description.length > 1000) {
      return { success: false, error: 'Description cannot be more than 1000 characters' };
    }
    
    if (contact && contact.length > 100) {
      return { success: false, error: 'Contact cannot be more than 100 characters' };
    }
    
    const feedback = new Feedback({
      name: name.trim(),
      description: description.trim(),
      contact: contact ? contact.trim() : '',
      contactType: contactType || '',
    });
    
    await feedback.save();
    
    return { 
      success: true, 
      message: 'Feedback submitted successfully',
      feedback: {
        id: feedback._id.toString(),
        name: feedback.name,
        description: feedback.description,
        createdAt: feedback.createdAt
      }
    };
  } catch (error) {
    console.error('Error creating feedback:', error);
    return { success: false, error: 'Failed to submit feedback' };
  }
}

// Get all feedback with filtering and pagination (Admin only)
export async function getFeedback({
  page = 1,
  limit = 10,
  status = '',
  search = ''
} = {}) {
  try {
    await connectDB();
    
    const skip = (page - 1) * limit;
    
    // Build search query
    const query = {};
    
    if (status && status !== 'all') {
      query.status = status;
    }
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { contact: { $regex: search, $options: 'i' } }
      ];
    }
    
    const [feedback, totalCount] = await Promise.all([
      Feedback.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Feedback.countDocuments(query)
    ]);
    
    const totalPages = Math.ceil(totalCount / limit);
    
    return {
      success: true,
      feedback: feedback.map(item => ({
        id: item._id.toString(),
        name: item.name,
        description: item.description,
        contact: item.contact,
        contactType: item.contactType,
        status: item.status,
        adminNotes: item.adminNotes,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt
      })),
      pagination: {
        currentPage: page,
        totalPages,
        totalCount,
        hasNext: page < totalPages,
        hasPrev: page > 1
      },
      stats: {
        total: await Feedback.countDocuments(),
        pending: await Feedback.countDocuments({ status: 'pending' }),
        reviewed: await Feedback.countDocuments({ status: 'reviewed' }),
        responded: await Feedback.countDocuments({ status: 'responded' })
      }
    };
  } catch (error) {
    console.error('Error fetching feedback:', error);
    return { 
      success: false, 
      error: 'Failed to fetch feedback',
      feedback: [],
      pagination: {
        currentPage: 1,
        totalPages: 1,
        totalCount: 0,
        hasNext: false,
        hasPrev: false
      },
      stats: {
        total: 0,
        pending: 0,
        reviewed: 0,
        responded: 0
      }
    };
  }
}

// Update feedback status only
export async function updateFeedbackStatus(id, status) {
  try {
    await connectDB();
    
    const feedback = await Feedback.findByIdAndUpdate(
      id,
      { 
        status,
        updatedAt: new Date()
      },
      { new: true, runValidators: true }
    );
    
    if (!feedback) {
      return { success: false, error: 'Feedback not found' };
    }
    
    return { 
      success: true, 
      message: 'Status updated successfully',
      feedback: {
        id: feedback._id.toString(),
        status: feedback.status,
        updatedAt: feedback.updatedAt
      }
    };
  } catch (error) {
    console.error('Error updating feedback status:', error);
    return { success: false, error: 'Failed to update status' };
  }
}

// Update feedback status and admin notes
export async function updateFeedback(id, updateData) {
  try {
    await connectDB();
    
    const feedback = await Feedback.findByIdAndUpdate(
      id,
      {
        ...updateData,
        updatedAt: new Date()
      },
      { new: true, runValidators: true }
    );
    
    if (!feedback) {
      return { success: false, error: 'Feedback not found' };
    }
    
    return { 
      success: true, 
      message: 'Feedback updated successfully',
      feedback: {
        id: feedback._id.toString(),
        name: feedback.name,
        description: feedback.description,
        contact: feedback.contact,
        contactType: feedback.contactType,
        status: feedback.status,
        adminNotes: feedback.adminNotes,
        createdAt: feedback.createdAt,
        updatedAt: feedback.updatedAt
      }
    };
  } catch (error) {
    console.error('Error updating feedback:', error);
    return { success: false, error: 'Failed to update feedback' };
  }
}

// Delete feedback
export async function deleteFeedback(id) {
  try {
    await connectDB();
    
    const feedback = await Feedback.findByIdAndDelete(id);
    
    if (!feedback) {
      return { success: false, error: 'Feedback not found' };
    }
    
    return { success: true, message: 'Feedback deleted successfully' };
  } catch (error) {
    console.error('Error deleting feedback:', error);
    return { success: false, error: 'Failed to delete feedback' };
  }
}

// Get feedback statistics
export async function getFeedbackStats() {
  try {
    await connectDB();
    
    const [
      total,
      pending,
      reviewed,
      resolved,
      thisWeek,
      thisMonth
    ] = await Promise.all([
      Feedback.countDocuments(),
      Feedback.countDocuments({ status: 'pending' }),
      Feedback.countDocuments({ status: 'reviewed' }),
      Feedback.countDocuments({ status: 'resolved' }),
      Feedback.countDocuments({
        createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
      }),
      Feedback.countDocuments({
        createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
      })
    ]);
    
    return {
      success: true,
      stats: {
        total,
        pending,
        reviewed,
        resolved,
        thisWeek,
        thisMonth
      }
    };
  } catch (error) {
    console.error('Error fetching feedback stats:', error);
    return {
      success: false,
      error: 'Failed to fetch feedback stats',
      stats: {
        total: 0,
        pending: 0,
        reviewed: 0,
        resolved: 0,
        thisWeek: 0,
        thisMonth: 0
      }
    };
  }
}