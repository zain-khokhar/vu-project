import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Blog from '@/models/Blog';
import Author from '@/models/Author';

const sampleBlogs = [
  {
    title: "Getting Started with Academic Research: A Comprehensive Guide",
    slug: "getting-started-academic-research-guide",
    excerpt: "Learn the fundamentals of academic research including how to find reliable sources, structure your research, and avoid common pitfalls that students often encounter.",
    coverImage: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop",
    content: `
      <h2>Introduction to Academic Research</h2>
      <p>Academic research is the foundation of scholarly work and critical thinking. Whether you're writing a term paper, thesis, or dissertation, understanding how to conduct proper research is essential for academic success.</p>
      
      <h3>1. Defining Your Research Question</h3>
      <p>The first step in any research project is to clearly define what you want to investigate. A good research question should be:</p>
      <ul>
        <li>Specific and focused</li>
        <li>Researchable with available resources</li>
        <li>Relevant to your field of study</li>
        <li>Original or offering a new perspective</li>
      </ul>
      
      <h3>2. Finding Reliable Sources</h3>
      <p>Not all sources are created equal. When conducting academic research, prioritize:</p>
      <ul>
        <li>Peer-reviewed journal articles</li>
        <li>Academic books from reputable publishers</li>
        <li>Government and institutional reports</li>
        <li>Primary sources when available</li>
      </ul>
      
      <blockquote>
        "The quality of your research is only as good as the quality of your sources. Always verify the credibility and bias of your materials."
      </blockquote>
      
      <h3>3. Organizing Your Research</h3>
      <p>Keep detailed notes and organize your sources systematically. Use tools like Zotero or Mendeley to manage your references and create proper citations.</p>
      
      <p>Remember, good research takes time and patience. Don't rush the process, and always fact-check your information from multiple sources.</p>
    `
  },
  {
    title: "Effective Study Techniques for Different Learning Styles",
    slug: "effective-study-techniques-learning-styles",
    excerpt: "Discover proven study methods tailored to visual, auditory, and kinesthetic learners. Maximize your learning potential with strategies that match your natural preferences.",
    coverImage: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=600&fit=crop",
    content: `
      <h2>Understanding Your Learning Style</h2>
      <p>Everyone learns differently, and understanding your preferred learning style can significantly improve your academic performance. Let's explore the three main learning styles and effective study techniques for each.</p>
      
      <h3>Visual Learners</h3>
      <p>Visual learners process information best through images, charts, and diagrams. If you're a visual learner, try these techniques:</p>
      <ul>
        <li>Create mind maps and flowcharts</li>
        <li>Use color-coding in your notes</li>
        <li>Watch educational videos</li>
        <li>Draw diagrams and illustrations</li>
        <li>Use flashcards with images</li>
      </ul>
      
      <h3>Auditory Learners</h3>
      <p>Auditory learners absorb information through listening and speaking. Effective techniques include:</p>
      <ul>
        <li>Recording lectures and listening to them later</li>
        <li>Reading notes aloud</li>
        <li>Participating in study groups</li>
        <li>Using music or rhythm to memorize information</li>
        <li>Explaining concepts to others</li>
      </ul>
      
      <h3>Kinesthetic Learners</h3>
      <p>Kinesthetic learners learn through hands-on activities and movement. Try these approaches:</p>
      <ul>
        <li>Take frequent study breaks with physical activity</li>
        <li>Use manipulatives or models when possible</li>
        <li>Write out important information by hand</li>
        <li>Walk around while reviewing notes</li>
        <li>Practice with real-world applications</li>
      </ul>
      
      <blockquote>
        "The key to successful studying isn't working harder—it's working smarter by aligning your methods with how your brain naturally processes information."
      </blockquote>
      
      <h3>Combining Approaches</h3>
      <p>Most people have a dominant learning style but can benefit from incorporating multiple approaches. Experiment with different techniques to find what works best for you.</p>
    `
  },
  {
    title: "Time Management Tips for Busy Students",
    slug: "time-management-tips-busy-students",
    excerpt: "Master the art of balancing academics, work, and personal life with proven time management strategies. Learn how to prioritize tasks and avoid burnout.",
    coverImage: "https://images.unsplash.com/photo-1553484771-371a605b060b?w=800&h=600&fit=crop",
    content: `
      <h2>The Challenge of Student Life Balance</h2>
      <p>Being a student often means juggling multiple responsibilities: classes, assignments, part-time jobs, social activities, and personal commitments. Effective time management is crucial for maintaining both academic success and personal well-being.</p>
      
      <h3>1. The Power of Planning</h3>
      <p>Start each week by creating a comprehensive schedule that includes:</p>
      <ul>
        <li>Class times and locations</li>
        <li>Assignment due dates</li>
        <li>Work schedule</li>
        <li>Study blocks</li>
        <li>Personal time and self-care</li>
      </ul>
      
      <h3>2. Prioritization Techniques</h3>
      <p>Use the Eisenhower Matrix to categorize tasks:</p>
      <ul>
        <li><strong>Urgent and Important:</strong> Do immediately</li>
        <li><strong>Important but Not Urgent:</strong> Schedule</li>
        <li><strong>Urgent but Not Important:</strong> Delegate if possible</li>
        <li><strong>Neither Urgent nor Important:</strong> Eliminate</li>
      </ul>
      
      <h3>3. The Pomodoro Technique</h3>
      <p>Break your study sessions into focused 25-minute intervals followed by 5-minute breaks. This technique helps maintain concentration and prevents burnout.</p>
      
      <blockquote>
        "Time management is not about squeezing more activities into your day—it's about making sure the right activities get the attention they deserve."
      </blockquote>
      
      <h3>4. Avoiding Common Pitfalls</h3>
      <ul>
        <li>Don't over-schedule yourself</li>
        <li>Learn to say no to non-essential commitments</li>
        <li>Build buffer time for unexpected events</li>
        <li>Remember that rest is productive too</li>
      </ul>
      
      <p>Remember, effective time management is a skill that develops with practice. Be patient with yourself as you find the strategies that work best for your lifestyle.</p>
    `
  }
];

export async function GET() {
  try {
    await connectDB();
    
    // Get available authors
    const authors = await Author.find({ isActive: true }).select('_id');
    
    if (authors.length === 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'No authors found. Please seed authors first by visiting /api/seed-authors' 
        },
        { status: 400 }
      );
    }
    
    // Clear existing blog data
    await Blog.deleteMany({});
    
    // Assign random authors to blogs
    const blogsWithAuthors = sampleBlogs.map((blog, index) => ({
      ...blog,
      author: authors[index % authors.length]._id
    }));
    
    // Insert sample blogs
    const blogs = await Blog.insertMany(blogsWithAuthors);
    
    return NextResponse.json({
      success: true,
      message: `Successfully seeded ${blogs.length} blog posts!`,
      blogs: blogs.map(blog => ({
        id: blog._id,
        title: blog.title,
        slug: blog.slug
      }))
    });
  } catch (error) {
    console.error('Blog seeding error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to seed blog data',
        details: error.message 
      },
      { status: 500 }
    );
  }
}