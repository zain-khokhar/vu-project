'use server';

import connectDB  from '@/lib/mongodb';
import Author from '@/models/Author';

// Helper function to generate slug from name
function generateSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim('-'); // Remove leading/trailing hyphens
}

// Get all active authors
export async function getAuthors() {
  try {
    await connectDB();

    const authors = await Author.find({ isActive: true })
      .select('_id name slug bio avatar')
      .sort({ name: 1 })
      .lean();

    return {
      success: true,
      authors: JSON.parse(JSON.stringify(authors))
    };
  } catch (error) {
    console.error('Error fetching authors:', error);
    return { success: false, error: 'Failed to fetch authors' };
  }
}

// Get author by ID
export async function getAuthorById(id) {
  try {
    await connectDB();

    const author = await Author.findById(id).lean();

    if (!author) {
      return { success: false, error: 'Author not found' };
    }

    return {
      success: true,
      author: JSON.parse(JSON.stringify(author))
    };
  } catch (error) {
    console.error('Error fetching author:', error);
    return { success: false, error: 'Failed to fetch author' };
  }
}

// Get author by slug
export async function getAuthorBySlug(slug) {
  try {
    await connectDB();

    const author = await Author.findOne({ slug, isActive: true }).lean();

    if (!author) {
      return { success: false, error: 'Author not found' };
    }

    return {
      success: true,
      author: JSON.parse(JSON.stringify(author))
    };
  } catch (error) {
    console.error('Error fetching author:', error);
    return { success: false, error: 'Failed to fetch author' };
  }
}

// Create a new author
export async function createAuthor(authorData) {
  try {
    await connectDB();

    const { name, bio, avatar, email, social = {} } = authorData;

    if (!name || !bio || !avatar || !email) {
      return { success: false, error: 'Name, bio, avatar, and email are required' };
    }

    // Generate unique slug
    let baseSlug = generateSlug(name);
    let slug = baseSlug;
    let counter = 1;

    // Check if slug already exists and make it unique
    while (await Author.findOne({ slug })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    const author = new Author({
      name,
      slug,
      bio,
      avatar,
      email,
      social,
    });

    await author.save();

    return {
      success: true,
      author: JSON.parse(JSON.stringify(author)),
      message: 'Author created successfully!'
    };
  } catch (error) {
    console.error('Error creating author:', error);
    if (error.code === 11000) {
      return { success: false, error: 'Author with this email already exists' };
    }
    return { success: false, error: 'Failed to create author' };
  }
}