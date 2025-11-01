'use server';

import connectDB from '@/lib/mongodb';
import Document from '@/models/Document';

// Get latest documents for homepage
export async function getLatestDocuments(limit = 6) {
  try {
    await connectDB();
    
    const documents = await Document.find({})
      .sort({ createdAt: -1 })
      .limit(limit)
      .select('title slug type subject university year')
      .lean();
    
    return { success: true, documents: JSON.parse(JSON.stringify(documents)) };
  } catch (error) {
    console.error('Error fetching latest documents:', error);
    return { success: false, error: 'Failed to fetch documents' };
  }
}

// Get all documents with filtering and pagination
export async function getDocuments({
  page = 1,
  limit = 12,
  search = '',
  type = '',
  subject = '',
  university = '',
  year = ''
} = {}) {
  try {
    await connectDB();
    
    const query = {};
    
    // Build search query
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Add filters
    if (type) query.type = type;
    if (subject) query.subject = { $regex: subject, $options: 'i' };
    if (university) query.university = { $regex: university, $options: 'i' };
    if (year) query.year = parseInt(year);
    
    const skip = (page - 1) * limit;
    
    const [documents, totalCount] = await Promise.all([
      Document.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .select('title slug type subject university year')
        .lean(),
      Document.countDocuments(query)
    ]);
    
    const totalPages = Math.ceil(totalCount / limit);
    
    return {
      success: true,
      documents: JSON.parse(JSON.stringify(documents)),
      pagination: {
        currentPage: page,
        totalPages,
        totalCount,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    };
  } catch (error) {
    console.error('Error fetching documents:', error);
    return { success: false, error: 'Failed to fetch documents' };
  }
}

// Get single document by slug
export async function getDocumentBySlug(slug) {
  try {
    await connectDB();
    
    const document = await Document.findOne({ slug }).lean();
    
    if (!document) {
      return { success: false, error: 'Document not found' };
    }
    
    return { success: true, document: JSON.parse(JSON.stringify(document)) };
  } catch (error) {
    console.error('Error fetching document:', error);
    return { success: false, error: 'Failed to fetch document' };
  }
}

// Get filter options for documents page
export async function getFilterOptions() {
  try {
    await connectDB();
    
    const [subjects, universities, years] = await Promise.all([
      Document.distinct('subject'),
      Document.distinct('university'),
      Document.distinct('year')
    ]);
    
    return {
      success: true,
      filters: {
        subjects: subjects.sort(),
        universities: universities.sort(),
        years: years.sort((a, b) => b - a) // Most recent first
      }
    };
  } catch (error) {
    console.error('Error fetching filter options:', error);
    return { success: false, error: 'Failed to fetch filter options' };
  }
}

// Create a new document
export async function createDocument(documentData) {
  try {
    await connectDB();
    
    // Generate slug from title
    const slug = documentData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    
    // Check if slug already exists
    const existingDoc = await Document.findOne({ slug });
    let finalSlug = slug;
    
    if (existingDoc) {
      const timestamp = Date.now();
      finalSlug = `${slug}-${timestamp}`;
    }
    
    const document = await Document.create({
      ...documentData,
      slug: finalSlug
    });
    
    return { success: true, document: JSON.parse(JSON.stringify(document)) };
  } catch (error) {
    console.error('Error creating document:', error);
    return { success: false, error: error.message || 'Failed to create document' };
  }
}