'use server';

import connectDB from '@/lib/mongodb';
import Blog from '@/models/Blog';
import Author from '@/models/Author';
import Document from '@/models/Document';
import Quiz from '@/models/Quiz';
import Feedback from '@/models/Feedback';
import Comment from '@/models/Comment';
import { revalidatePath } from 'next/cache';
import mongoose from 'mongoose';

// Get admin statistics
export async function getAdminStats() {
    try {
        await connectDB();

        const [
            totalBlogs,
            totalDocuments,
            totalQuizzes,
            totalFeedback,
            totalComments
        ] = await Promise.all([
            Blog.countDocuments({}),
            Document.countDocuments({}),
            Quiz.countDocuments({}),
            Feedback.countDocuments({}),
            Comment.countDocuments({ status: 'visible' })
        ]);

        return {
            success: true,
            stats: {
                blogs: totalBlogs,
                documents: totalDocuments,
                quizzes: totalQuizzes,
                feedback: totalFeedback,
                comments: totalComments
            }
        };
    } catch (error) {
        console.error('Error fetching admin stats:', error);
        return { success: false, error: 'Failed to fetch statistics' };
    }
}

// Get all blogs for admin with pagination and search
export async function getAllBlogsAdmin(page = 1, limit = 10, searchQuery = '') {
    try {
        await connectDB();

        const skip = (page - 1) * limit;

        // Build query
        const query = {};
        if (searchQuery) {
            query.$or = [
                { title: { $regex: searchQuery, $options: 'i' } },
                { excerpt: { $regex: searchQuery, $options: 'i' } }
            ];
        }

        const [blogs, totalCount] = await Promise.all([
            Blog.find(query)
                .populate('author', 'name')
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean(),
            Blog.countDocuments(query)
        ]);

        const totalPages = Math.ceil(totalCount / limit);

        return {
            success: true,
            blogs: JSON.parse(JSON.stringify(blogs)),
            currentPage: page,
            totalPages,
            totalCount
        };
    } catch (error) {
        console.error('Error fetching admin blogs:', error);
        return { success: false, error: 'Failed to fetch blogs' };
    }
}

// Get all documents for admin with pagination and search
export async function getAllDocumentsAdmin(page = 1, limit = 10, searchQuery = '') {
    try {
        await connectDB();

        const skip = (page - 1) * limit;

        // Build query
        const query = {};
        if (searchQuery) {
            query.$or = [
                { title: { $regex: searchQuery, $options: 'i' } },
                { description: { $regex: searchQuery, $options: 'i' } },
                { subject: { $regex: searchQuery, $options: 'i' } }
            ];
        }

        const [documents, totalCount] = await Promise.all([
            Document.find(query)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean(),
            Document.countDocuments(query)
        ]);

        const totalPages = Math.ceil(totalCount / limit);

        return {
            success: true,
            documents: JSON.parse(JSON.stringify(documents)),
            currentPage: page,
            totalPages,
            totalCount
        };
    } catch (error) {
        console.error('Error fetching admin documents:', error);
        return { success: false, error: 'Failed to fetch documents' };
    }
}

// Get all quizzes for admin with pagination and search
export async function getAllQuizzesAdmin(page = 1, limit = 10, searchQuery = '') {
    try {
        await connectDB();

        const skip = (page - 1) * limit;

        // Build query
        const query = {};
        if (searchQuery) {
            query.$or = [
                { title: { $regex: searchQuery, $options: 'i' } },
                { description: { $regex: searchQuery, $options: 'i' } },
                { category: { $regex: searchQuery, $options: 'i' } }
            ];
        }

        const [quizzes, totalCount] = await Promise.all([
            Quiz.find(query)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .select('-questions') // Exclude questions array for performance
                .lean(),
            Quiz.countDocuments(query)
        ]);

        const totalPages = Math.ceil(totalCount / limit);

        return {
            success: true,
            quizzes: JSON.parse(JSON.stringify(quizzes)),
            currentPage: page,
            totalPages,
            totalCount
        };
    } catch (error) {
        console.error('Error fetching admin quizzes:', error);
        return { success: false, error: 'Failed to fetch quizzes' };
    }
}

// Delete blog (hard delete)
export async function deleteBlogAdmin(id) {
    try {
        await connectDB();

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return { success: false, error: 'Invalid blog ID' };
        }

        const blog = await Blog.findByIdAndDelete(id);

        if (!blog) {
            return { success: false, error: 'Blog not found' };
        }

        // Revalidate relevant paths
        revalidatePath('/blogs');
        revalidatePath('/');
        revalidatePath('/admin');

        return {
            success: true,
            message: 'Blog deleted successfully'
        };
    } catch (error) {
        console.error('Error deleting blog:', error);
        return { success: false, error: 'Failed to delete blog' };
    }
}

// Delete document (hard delete)
export async function deleteDocumentAdmin(id) {
    try {
        await connectDB();

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return { success: false, error: 'Invalid document ID' };
        }

        const document = await Document.findByIdAndDelete(id);

        if (!document) {
            return { success: false, error: 'Document not found' };
        }

        // Delete associated comments
        await Comment.deleteMany({ documentId: id });

        // Revalidate relevant paths
        revalidatePath('/documents');
        revalidatePath('/');
        revalidatePath('/admin');

        return {
            success: true,
            message: 'Document deleted successfully'
        };
    } catch (error) {
        console.error('Error deleting document:', error);
        return { success: false, error: 'Failed to delete document' };
    }
}

// Delete quiz (hard delete)
export async function deleteQuizAdmin(slug) {
    try {
        await connectDB();

        const quiz = await Quiz.findOneAndDelete({ slug });

        if (!quiz) {
            return { success: false, error: 'Quiz not found' };
        }

        // Revalidate relevant paths
        revalidatePath('/quiz');
        revalidatePath('/');
        revalidatePath('/admin');

        return {
            success: true,
            message: 'Quiz deleted successfully'
        };
    } catch (error) {
        console.error('Error deleting quiz:', error);
        return { success: false, error: 'Failed to delete quiz' };
    }
}
