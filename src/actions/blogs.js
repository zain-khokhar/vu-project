'use server';

import connectDB from '@/lib/mongodb';
import Blog from '@/models/Blog';
import Author from '@/models/Author';
import { revalidatePath } from 'next/cache';

// Helper function to generate slug from title
function generateSlug(title) {
  if (!title || typeof title !== 'string') {
    return 'untitled-' + Date.now();
  }

  return (
    title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9 -]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens
      .replace(/^-+|-+$/g, '') || 'untitled-' + Date.now()
  );
}

// Create a new blog post
export async function createBlog(formData) {
  try {
    await connectDB();

    const title = formData.get('title');
    const excerpt = formData.get('excerpt');
    const coverImage = formData.get('coverImage');
    const content = formData.get('content');
    const author = formData.get('author');

    if (!title || !excerpt || !coverImage || !content || !author) {
      return { success: false, error: 'All fields including author are required' };
    }

    // Generate base slug
    let baseSlug = generateSlug(title);
    let slug = baseSlug || 'blog-' + Date.now();
    let counter = 1;
    // Ensure uniqueness
    while (await Blog.findOne({ slug })) {
        slug = `${baseSlug}-${counter}`;
        counter++;
    }
    console.log(slug)

    const blog = new Blog({
      title,
      slug,
      excerpt,
      coverImage,
      content,
      author,
    });

    await blog.save();

    // Revalidate ISR pages
    revalidatePath('/blogs');
    revalidatePath('/');

    return {
      success: true,
      blog: JSON.parse(JSON.stringify(blog)),
      message: 'Blog post created successfully!',
    };
  } catch (error) {
    console.error('Error creating blog:', error);

    // Handle duplicate slug error gracefully
    if (error.code === 11000 && error.keyPattern?.slug) {
      return { success: false, error: 'Slug already exists. Try a different title.' };
    }

    return { success: false, error: 'Failed to create blog post' };
  }
}


// Get all published blogs with pagination
export async function getBlogs(page = 1, limit = 12) {
  try {
    await connectDB();

    const skip = (page - 1) * limit;

    const [blogs, totalCount] = await Promise.all([
      Blog.find({ published: true })
        .select('title slug excerpt coverImage createdAt author')
        .populate('author', 'name slug avatar')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Blog.countDocuments({ published: true })
    ]);

    const totalPages = Math.ceil(totalCount / limit);
    const hasMore = page < totalPages;

    return {
      success: true,
      blogs: JSON.parse(JSON.stringify(blogs)),
      pagination: {
        currentPage: page,
        totalPages,
        totalCount,
        hasMore
      }
    };
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return { success: false, error: 'Failed to fetch blogs' };
  }
}

// Get a single blog by slug
export async function getBlogBySlug(slug) {
  try {
    await connectDB();

    const blog = await Blog.findOne({ slug, published: true })
      .populate('author', 'name slug bio avatar social')
      .lean();

    if (!blog) {
      return { success: false, error: 'Blog not found' };
    }

    return {
      success: true,
      blog: JSON.parse(JSON.stringify(blog))
    };
  } catch (error) {
    console.error('Error fetching blog:', error);
    return { success: false, error: 'Failed to fetch blog' };
  }
}

// Get latest blogs for homepage
export async function getLatestBlogs(limit = 6) {
  try {
    await connectDB();

    const blogs = await Blog.find({ published: true })
      .select('title slug excerpt coverImage createdAt author')
      .populate('author', 'name slug avatar')
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    return {
      success: true,
      blogs: JSON.parse(JSON.stringify(blogs))
    };
  } catch (error) {
    console.error('Error fetching latest blogs:', error);
    return { success: false, error: 'Failed to fetch latest blogs' };
  }
}

// Update a blog (for future admin functionality)
export async function updateBlog(id, updateData) {
  try {
    await connectDB();

    const blog = await Blog.findByIdAndUpdate(
      id,
      { ...updateData, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    if (!blog) {
      return { success: false, error: 'Blog not found' };
    }

    revalidatePath('/blogs');
    revalidatePath(`/blogs/${blog.slug}`);

    return {
      success: true,
      blog: JSON.parse(JSON.stringify(blog)),
      message: 'Blog updated successfully!'
    };
  } catch (error) {
    console.error('Error updating blog:', error);
    return { success: false, error: 'Failed to update blog' };
  }
}

// Delete a blog (for future admin functionality)
export async function deleteBlog(id) {
  try {
    await connectDB();

    const blog = await Blog.findByIdAndDelete(id);

    if (!blog) {
      return { success: false, error: 'Blog not found' };
    }

    revalidatePath('/blogs');

    return {
      success: true,
      message: 'Blog deleted successfully!'
    };
  } catch (error) {
    console.error('Error deleting blog:', error);
    return { success: false, error: 'Failed to delete blog' };
  }
}