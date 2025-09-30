import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Author from '@/models/Author';

const sampleAuthors = [
  {
    name: "Dr. Sarah Johnson",
    slug: "dr-sarah-johnson",
    bio: "Professor of Computer Science at Stanford University with 15+ years of experience in machine learning and artificial intelligence. Published author of over 50 research papers.",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
    email: "sarah.johnson@example.com",
    social: {
      twitter: "@sarahj_ai",
      linkedin: "https://linkedin.com/in/sarah-johnson-ai",
      website: "https://sarahjohnson.ai"
    }
  },
  {
    name: "Michael Chen",
    slug: "michael-chen",
    bio: "Senior Software Engineer at Google and full-stack developer. Passionate about web technologies, cloud computing, and sharing knowledge through technical writing.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    email: "michael.chen@example.com",
    social: {
      twitter: "@michaelc_dev",
      linkedin: "https://linkedin.com/in/michael-chen-dev",
      website: "https://michaelchen.dev"
    }
  },
  {
    name: "Dr. Emily Rodriguez",
    slug: "dr-emily-rodriguez",
    bio: "Educational psychologist specializing in learning methodologies and student success strategies. Author of 'The Science of Effective Learning' and consultant for universities worldwide.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face",
    email: "emily.rodriguez@example.com",
    social: {
      twitter: "@dr_emily_edu",
      linkedin: "https://linkedin.com/in/emily-rodriguez-phd",
      website: "https://emilyrodriguez.edu"
    }
  },
  {
    name: "James Wilson",
    slug: "james-wilson",
    bio: "Graduate student in Data Science at MIT. Research focus on statistical analysis and data visualization. Experienced tutor and academic mentor for undergraduate students.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    email: "james.wilson@example.com",
    social: {
      twitter: "@jameswilson_ds",
      linkedin: "https://linkedin.com/in/james-wilson-datascience",
      website: ""
    }
  },
  {
    name: "Dr. Priya Patel",
    slug: "dr-priya-patel",
    bio: "Assistant Professor of Mathematics at UC Berkeley. Specializes in applied mathematics and statistics. Advocates for diversity in STEM and mentors underrepresented students.",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face",
    email: "priya.patel@example.com",
    social: {
      twitter: "@priya_math",
      linkedin: "https://linkedin.com/in/priya-patel-mathematics",
      website: "https://priyapatel.math.berkeley.edu"
    }
  }
];

export async function GET() {
  try {
    await connectDB();
    
    // Clear existing author data
    await Author.deleteMany({});
    
    // Insert sample authors
    const authors = await Author.insertMany(sampleAuthors);
    
    return NextResponse.json({
      success: true,
      message: `Successfully seeded ${authors.length} authors!`,
      authors: authors.map(author => ({
        id: author._id,
        name: author.name,
        slug: author.slug,
        email: author.email
      }))
    });
  } catch (error) {
    console.error('Author seeding error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to seed author data',
        details: error.message 
      },
      { status: 500 }
    );
  }
}