import mongoose from 'mongoose';
import connectDB from './mongodb.js';
import Document from '../models/Document.js';

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
    description: "Laboratory manual for organic chemistry containing detailed procedures for synthesis reactions, purification techniques, and analytical methods. Includes safety protocols and troubleshooting guides.",
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
    fileUrl: "https://www.adobe.com/content/dam/acom/en/devnet/acrobat/pdfs/pdf_open_parameters.pdf",
    subject: "Computer Science",
    university: "Stanford University",
    year: 2023,
    tags: ["algorithms", "data structures", "programming", "computer science"]
  },
  {
    title: "Physics Midterm Exam - Mechanics",
    slug: "physics-midterm-exam-mechanics",
    description: "Previous year's midterm examination covering classical mechanics, including kinematics, dynamics, energy, momentum, rotational motion, and oscillations. Includes answer key and detailed solutions.",
    type: "exam",
    coverImage: "https://images.unsplash.com/photo-1636953056323-9c09fdd74fa6?w=500&h=700&fit=crop",
    fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    subject: "Physics",
    university: "California Institute of Technology",
    year: 2023,
    tags: ["physics", "mechanics", "exam", "kinematics", "dynamics"]
  },
  {
    title: "Microeconomics Textbook - Market Theory",
    slug: "microeconomics-textbook-market-theory",
    description: "Advanced textbook on microeconomic theory focusing on market structures, consumer behavior, producer theory, game theory, and welfare economics. Suitable for undergraduate and graduate students.",
    type: "book",
    coverImage: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=500&h=700&fit=crop",
    fileUrl: "https://example.com/microeconomics-textbook.pdf",
    subject: "Economics",
    university: "University of Chicago",
    year: 2024,
    tags: ["economics", "microeconomics", "market theory", "game theory"]
  },
  {
    title: "Introduction to Psychology Study Guide",
    slug: "introduction-psychology-study-guide",
    description: "Study guide for introductory psychology covering cognitive psychology, behavioral psychology, developmental psychology, social psychology, and research methods. Includes key terms and concepts.",
    type: "note",
    coverImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&h=700&fit=crop",
    fileUrl: "https://example.com/psychology-guide.pdf",
    subject: "Psychology",
    university: "Yale University",
    year: 2024,
    tags: ["psychology", "cognitive", "behavioral", "developmental", "social"]
  },
  {
    title: "Linear Algebra Problem Set Solutions",
    slug: "linear-algebra-problem-set-solutions",
    description: "Complete solutions to linear algebra problem sets covering vector spaces, linear transformations, eigenvalues, eigenvectors, matrix operations, and systems of linear equations.",
    type: "handout",
    coverImage: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=500&h=700&fit=crop",
    fileUrl: "https://example.com/linear-algebra-solutions.pdf",
    subject: "Mathematics",
    university: "Princeton University",
    year: 2023,
    tags: ["linear algebra", "mathematics", "matrices", "vectors", "eigenvalues"]
  },
  {
    title: "Database Systems Final Exam",
    slug: "database-systems-final-exam",
    description: "Final examination for database systems course covering relational model, SQL, normalization, transaction processing, concurrency control, and database design principles.",
    type: "exam",
    coverImage: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=500&h=700&fit=crop",
    fileUrl: "https://example.com/database-final.pdf",
    subject: "Computer Science",
    university: "UC Berkeley",
    year: 2023,
    tags: ["database", "SQL", "normalization", "transactions", "computer science"]
  }
];

async function seedDatabase() {
  try {
    console.log('Connecting to MongoDB...');
    await connectDB();

    console.log('Clearing existing documents...');
    await Document.deleteMany({});

    console.log('Inserting sample documents...');
    const insertedDocs = await Document.insertMany(sampleDocuments);

    console.log(`Successfully seeded ${insertedDocs.length} documents!`);
    console.log('Sample documents:');
    insertedDocs.forEach((doc, index) => {
      console.log(`${index + 1}. ${doc.title} (${doc.type})`);
    });

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seed function if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedDatabase();
}

export default seedDatabase;