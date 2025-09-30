import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Blog from '@/models/Blog';
import Author from '@/models/Author';

// GET - Fetch blogs with pagination
export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 12;
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

    return NextResponse.json({
      success: true,
      blogs,
      pagination: {
        currentPage: page,
        totalPages,
        totalCount,
        hasMore
      }
    });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch blogs' },
      { status: 500 }
    );
  }
}

// POST - Create a new blog
export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();
    const { title, excerpt, coverImage, content, author } = body;

    if (!title || !excerpt || !coverImage || !content || !author) {
      return NextResponse.json(
        { success: false, error: 'All fields including author are required' },
        { status: 400 }
      );
    }

    // Generate unique slug
    function generateSlug(title) {
      return title
        .toLowerCase()
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim('-');
    }

    let baseSlug = generateSlug(title);
    let slug = baseSlug;
    let counter = 1;

    while (await Blog.findOne({ slug })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    const blog = new Blog({
      title,
      slug,
      excerpt,
      coverImage,
      content,
      author,
    });

    await blog.save();

    return NextResponse.json({
      success: true,
      blog,
      message: 'Blog created successfully!'
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating blog:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create blog' },
      { status: 500 }
    );
  }
}