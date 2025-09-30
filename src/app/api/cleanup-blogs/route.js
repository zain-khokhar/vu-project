import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Blog from '@/models/Blog';

// Helper function to generate slug from title
function generateSlug(title) {
  if (!title || typeof title !== 'string') {
    return 'untitled-' + Date.now();
  }
  
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
    || 'untitled-' + Date.now();
}

export async function POST() {
  try {
    await connectDB();
    
    // Find blogs with null, undefined, or empty slugs
    const blogsWithoutSlugs = await Blog.find({
      $or: [
        { slug: null },
        { slug: undefined },
        { slug: '' },
        { slug: { $exists: false } }
      ]
    });

    let updatedCount = 0;
    let deletedCount = 0;

    for (const blog of blogsWithoutSlugs) {
      if (blog.title) {
        // Generate a new slug for the blog
        let baseSlug = generateSlug(blog.title);
        let slug = baseSlug;
        let counter = 1;

        // Check if slug already exists and make it unique
        while (await Blog.findOne({ slug, _id: { $ne: blog._id } })) {
          slug = `${baseSlug}-${counter}`;
          counter++;
        }

        // Update the blog with the new slug
        await Blog.findByIdAndUpdate(blog._id, { slug });
        updatedCount++;
      } else {
        // If no title, delete the blog as it's incomplete
        await Blog.findByIdAndDelete(blog._id);
        deletedCount++;
      }
    }

    return NextResponse.json({
      success: true,
      message: `Cleanup completed. Updated ${updatedCount} blogs, deleted ${deletedCount} incomplete blogs.`,
      details: {
        totalProcessed: blogsWithoutSlugs.length,
        updated: updatedCount,
        deleted: deletedCount
      }
    });
  } catch (error) {
    console.error('Cleanup error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to cleanup blogs',
        details: error.message 
      },
      { status: 500 }
    );
  }
}