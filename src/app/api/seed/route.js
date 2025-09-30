import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Document from '@/models/Document';

const sampleDocuments = [
  {
    title: "Introduction to Calculus - Complete Guide",
    slug: "introduction-to-calculus-complete-guide",
    description: "<h2>Overview</h2><p>A <strong>comprehensive guide</strong> covering the fundamentals of calculus including limits, derivatives, and integrals. Perfect for first-year mathematics students.</p><h3>What You'll Learn</h3><ul><li>Limits and continuity</li><li>Differentiation techniques</li><li>Integration methods</li><li>Applications in real-world problems</li></ul><blockquote>This textbook has been the go-to resource for calculus students for over a decade.</blockquote><p>Includes detailed examples, practice problems, and step-by-step solutions.</p>",
    type: "book",
    coverImage: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=500&h=700&fit=crop",
    fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    subject: "Mathematics",
    university: "Harvard University",
    year: 2024,
    tags: ["calculus", "mathematics", "derivatives", "integrals", "limits"]
  },
  {
    title: "Organic Chemistry Lab Manual",
    slug: "organic-chemistry-lab-manual",
    description: "<p>Laboratory manual for organic chemistry containing detailed procedures for synthesis reactions, purification techniques, and analytical methods. Includes safety protocols and troubleshooting guides.</p>",
    type: "handout",
    coverImage: "https://images.unsplash.com/photo-1532634733-0d5f8aae96d6?w=500&h=700&fit=crop",
    fileUrl: "https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf",
    subject: "Chemistry",
    university: "MIT",
    year: 2024,
    tags: ["organic chemistry", "laboratory", "synthesis", "purification"]
  },
  {
    title: "Data Structures and Algorithms Notes",
    slug: "data-structures-algorithms-notes",
    description: "<h1>Data Structures & Algorithms</h1><p>Comprehensive notes covering fundamental concepts in computer science.</p><h2>Topics Covered</h2><ol><li><strong>Linear Data Structures</strong><ul><li>Arrays and Dynamic Arrays</li><li>Linked Lists (Single, Double, Circular)</li><li>Stacks and Queues</li></ul></li><li><strong>Non-Linear Data Structures</strong><ul><li>Binary Trees and BST</li><li>Heaps and Priority Queues</li><li>Graphs (Directed/Undirected)</li></ul></li><li><strong>Algorithms</strong><ul><li>Sorting (Quick, Merge, Heap Sort)</li><li>Searching (Binary Search, DFS, BFS)</li></ul></li></ol><p>Includes <code>complexity analysis</code> and implementation examples in <strong>multiple programming languages</strong>.</p>",
    type: "note",
    coverImage: "https://images.unsplash.com/photo-1516110833967-0b5ee0c84a9d?w=500&h=700&fit=crop",
    fileUrl: "https://drive.google.com/file/d/0B3bmAhp4nHmcbFhGS0Q2OGhYcUU/view?resourcekey=0-UaQ3nzSKjtGdfsEUAS75BA",
    subject: "Computer Science",
    university: "Stanford University",
    year: 2023,
    tags: ["algorithms", "data structures", "programming", "computer science"]
  },
  {
    title: "Physics Midterm Exam - Mechanics",
    slug: "physics-midterm-exam-mechanics",
    description: "<p>Previous year's midterm examination covering classical mechanics, including kinematics, dynamics, energy, momentum, rotational motion, and oscillations. Includes answer key and detailed solutions.</p>",
    type: "exam",
    coverImage: "https://images.unsplash.com/photo-1636953056323-9c09fdd74fa6?w=500&h=700&fit=crop",
    fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    subject: "Physics",
    university: "California Institute of Technology",
    year: 2023,
    tags: ["physics", "mechanics", "exam", "kinematics", "dynamics"]
  }
];

export async function GET() {
  try {
    await connectDB();

    // Clear existing documents
    await Document.deleteMany({});

    // Insert sample documents
    const insertedDocs = await Document.insertMany(sampleDocuments);

    return NextResponse.json({
      success: true,
      message: `Successfully seeded ${insertedDocs.length} documents!`,
      documents: insertedDocs.map(doc => ({
        title: doc.title,
        slug: doc.slug,
        type: doc.type
      }))
    });
  } catch (error) {
    console.error('Error seeding database:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to seed database' },
      { status: 500 }
    );
  }
}