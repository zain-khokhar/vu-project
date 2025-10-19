import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const blogPosts = [
  {
    title: "Mastering Computer Science Fundamentals: A Complete Study Guide",
    slug: "mastering-computer-science-fundamentals",
    excerpt: "Build a strong foundation in computer science with this comprehensive guide covering algorithms, data structures, and programming paradigms.",
    coverImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop",
    content: `
      <h2>Why Computer Science Fundamentals Matter</h2>
      <p>Computer science fundamentals form the backbone of all programming and software development. Understanding core concepts like algorithms, data structures, and computational thinking is essential for any aspiring developer.</p>

      <h2>Key Topics to Master</h2>
      <ul>
        <li><strong>Algorithms:</strong> Learn sorting, searching, and optimization techniques</li>
        <li><strong>Data Structures:</strong> Arrays, linked lists, stacks, queues, trees, and graphs</li>
        <li><strong>Time Complexity:</strong> Big O notation and performance analysis</li>
        <li><strong>Programming Paradigms:</strong> Object-oriented, functional, and procedural programming</li>
      </ul>

      <h2>Study Tips for CS Students</h2>
      <p>Practice coding daily, work on real projects, and don't be afraid to make mistakes. Learning computer science is a journey that requires consistent effort and curiosity.</p>

      <blockquote>
        "The best error message is the one that never shows up." - Thomas Fuchs
      </blockquote>
    `,
    published: true
  },
  {
    title: "Effective Study Techniques for Programming Exams",
    slug: "effective-study-techniques-programming-exams",
    excerpt: "Discover proven study methods specifically designed for programming and computer science examinations.",
    coverImage: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    content: `
      <h2>Active Learning Strategies</h2>
      <p>Programming exams require more than just memorization. Focus on active learning techniques that help you understand and apply concepts.</p>

      <h2>Best Practices for Programming Exams</h2>
      <ul>
        <li><strong>Code Regularly:</strong> Practice coding problems daily</li>
        <li><strong>Debugging Skills:</strong> Learn to identify and fix errors quickly</li>
        <li><strong>Algorithm Analysis:</strong> Understand time and space complexity</li>
        <li><strong>Problem-Solving:</strong> Break down complex problems into smaller parts</li>
      </ul>

      <h2>Quiz Preparation Tips</h2>
      <p>Use our quiz section to test your knowledge regularly. Spaced repetition and active recall are proven methods for retaining programming concepts.</p>
    `,
    published: true
  },
  {
    title: "The Ultimate Guide to Academic Document Organization",
    slug: "ultimate-guide-academic-document-organization",
    excerpt: "Learn how to organize your study materials effectively for better academic performance and easier review.",
    coverImage: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=400&fit=crop",
    content: `
      <h2>Digital Document Management</h2>
      <p>In today's digital age, organizing academic documents is crucial for efficient studying and quick information retrieval.</p>

      <h2>Organization Strategies</h2>
      <ul>
        <li><strong>File Naming:</strong> Use consistent naming conventions</li>
        <li><strong>Folder Structure:</strong> Create logical hierarchies</li>
        <li><strong>Tagging System:</strong> Use metadata and tags for easy search</li>
        <li><strong>Backup Solutions:</strong> Multiple backup locations for security</li>
      </ul>

      <h2>Tools and Platforms</h2>
      <p>Platforms like DocLibrary make it easy to share and access organized academic materials. Upload your well-organized documents to help fellow students.</p>
    `,
    published: true
  },
  {
    title: "CS201: Object-Oriented Programming Mastery",
    slug: "cs201-object-oriented-programming-mastery",
    excerpt: "Complete guide to mastering object-oriented programming concepts with practical examples and study materials.",
    coverImage: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=400&fit=crop",
    content: `
      <h2>OOP Fundamentals</h2>
      <p>Object-oriented programming is a paradigm that uses objects and classes to structure software. Understanding OOP is essential for modern software development.</p>

      <h2>Core Concepts</h2>
      <ul>
        <li><strong>Classes and Objects:</strong> Blueprints and instances</li>
        <li><strong>Encapsulation:</strong> Data hiding and protection</li>
        <li><strong>Inheritance:</strong> Code reuse and hierarchy</li>
        <li><strong>Polymorphism:</strong> Multiple forms and interfaces</li>
      </ul>

      <h2>Practical Applications</h2>
      <p>OOP concepts are used in everything from web applications to mobile apps. Practice implementing these concepts in real projects.</p>
    `,
    published: true
  },
  {
    title: "Mathematics for Computer Science: Essential Concepts",
    slug: "mathematics-computer-science-essential-concepts",
    excerpt: "Bridge the gap between mathematics and computer science with this comprehensive guide to essential mathematical concepts.",
    coverImage: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&h=400&fit=crop",
    content: `
      <h2>Why Math Matters in CS</h2>
      <p>Mathematics provides the foundation for understanding algorithms, data structures, and computational complexity.</p>

      <h2>Key Mathematical Areas</h2>
      <ul>
        <li><strong>Discrete Mathematics:</strong> Logic, sets, and graph theory</li>
        <li><strong>Calculus:</strong> Derivatives and integrals for optimization</li>
        <li><strong>Linear Algebra:</strong> Matrices and vector operations</li>
        <li><strong>Probability:</strong> Statistical analysis and algorithms</li>
      </ul>

      <h2>Study Resources</h2>
      <p>Access our collection of mathematical handouts and practice problems to strengthen your understanding of these crucial concepts.</p>
    `,
    published: true
  },
  {
    title: "Database Design Principles and Best Practices",
    slug: "database-design-principles-best-practices",
    excerpt: "Learn the fundamentals of database design, normalization, and SQL with practical examples and real-world applications.",
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
    content: `
      <h2>Database Design Fundamentals</h2>
      <p>A well-designed database is crucial for application performance, data integrity, and scalability.</p>

      <h2>Design Principles</h2>
      <ul>
        <li><strong>Normalization:</strong> Eliminating data redundancy</li>
        <li><strong>Entity-Relationship Modeling:</strong> Visual database design</li>
        <li><strong>Indexing Strategies:</strong> Optimizing query performance</li>
        <li><strong>Data Integrity:</strong> Constraints and validation</li>
      </ul>

      <h2>SQL Mastery</h2>
      <p>Master SQL queries, joins, and database operations. Practice with our collection of database design problems and solutions.</p>
    `,
    published: true
  },
  {
    title: "Web Development Roadmap: From Beginner to Expert",
    slug: "web-development-roadmap-beginner-to-expert",
    excerpt: "A comprehensive learning path for aspiring web developers covering HTML, CSS, JavaScript, and modern frameworks.",
    coverImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop",
    content: `
      <h2>Frontend Development Journey</h2>
      <p>Web development offers endless opportunities for creativity and problem-solving. Start your journey with the fundamentals.</p>

      <h2>Learning Path</h2>
      <ol>
        <li><strong>HTML & CSS:</strong> Structure and styling fundamentals</li>
        <li><strong>JavaScript:</strong> Programming logic and interactivity</li>
        <li><strong>React/Vue/Angular:</strong> Modern frontend frameworks</li>
        <li><strong>Backend Development:</strong> Server-side programming</li>
        <li><strong>Database Integration:</strong> Full-stack applications</li>
      </ol>

      <h2>Resources and Practice</h2>
      <p>Use our platform to access web development tutorials, code samples, and project ideas. Build your portfolio and gain practical experience.</p>
    `,
    published: true
  },
  {
    title: "Data Structures and Algorithms: Complete Guide",
    slug: "data-structures-algorithms-complete-guide",
    excerpt: "Master the essential data structures and algorithms that form the foundation of efficient programming.",
    coverImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop",
    content: `
      <h2>Why DSA Matters</h2>
      <p>Data structures and algorithms are the building blocks of efficient software. Understanding DSA is crucial for technical interviews and real-world applications.</p>

      <h2>Essential Data Structures</h2>
      <ul>
        <li><strong>Arrays and Strings:</strong> Basic data manipulation</li>
        <li><strong>Linked Lists:</strong> Dynamic data storage</li>
        <li><strong>Stacks and Queues:</strong> LIFO and FIFO operations</li>
        <li><strong>Trees and Graphs:</strong> Hierarchical and network data</li>
        <li><strong>Hash Tables:</strong> Fast data retrieval</li>
      </ul>

      <h2>Algorithm Categories</h2>
      <p>Study sorting, searching, dynamic programming, and graph algorithms. Practice regularly with coding challenges and our quiz section.</p>
    `,
    published: true
  },
  {
    title: "Mobile App Development: iOS and Android Guide",
    slug: "mobile-app-development-ios-android-guide",
    excerpt: "Learn to build mobile applications for both iOS and Android platforms with cross-platform development strategies.",
    coverImage: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=400&fit=crop",
    content: `
      <h2>Mobile Development Landscape</h2>
      <p>Mobile app development offers exciting opportunities in a growing market. Choose the right platform and tools for your projects.</p>

      <h2>Development Approaches</h2>
      <ul>
        <li><strong>Native Development:</strong> Swift for iOS, Kotlin for Android</li>
        <li><strong>Cross-Platform:</strong> React Native, Flutter</li>
        <li><strong>Hybrid Apps:</strong> Cordova, Ionic frameworks</li>
        <li><strong>Progressive Web Apps:</strong> Web technologies for mobile</li>
      </ul>

      <h2>Getting Started</h2>
      <p>Begin with one platform, master the fundamentals, then expand to cross-platform development. Our resources include tutorials and sample projects.</p>
    `,
    published: true
  },
  {
    title: "Cybersecurity Fundamentals for Developers",
    slug: "cybersecurity-fundamentals-developers",
    excerpt: "Learn essential security practices to protect your applications and user data from common threats and vulnerabilities.",
    coverImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=400&fit=crop",
    content: `
      <h2>Security in Development</h2>
      <p>Security should be integrated into every stage of the development process, not added as an afterthought.</p>

      <h2>Key Security Concepts</h2>
      <ul>
        <li><strong>Authentication & Authorization:</strong> User verification and permissions</li>
        <li><strong>Data Encryption:</strong> Protecting sensitive information</li>
        <li><strong>Input Validation:</strong> Preventing injection attacks</li>
        <li><strong>Secure Coding:</strong> Best practices and common pitfalls</li>
      </ul>

      <h2>Practical Security</h2>
      <p>Learn to implement security measures in your applications. Study real-world vulnerabilities and how to prevent them.</p>
    `,
    published: true
  },
  {
    title: "Cloud Computing and DevOps Essentials",
    slug: "cloud-computing-devops-essentials",
    excerpt: "Master cloud platforms, containerization, and DevOps practices for modern software deployment and scaling.",
    coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop",
    content: `
      <h2>Cloud Computing Revolution</h2>
      <p>Cloud computing has transformed how we build, deploy, and scale applications. Understanding cloud platforms is essential for modern developers.</p>

      <h2>Cloud Services</h2>
      <ul>
        <li><strong>IaaS:</strong> Infrastructure as a Service (AWS, Azure, GCP)</li>
        <li><strong>PaaS:</strong> Platform as a Service for rapid development</li>
        <li><strong>SaaS:</strong> Software as a Service applications</li>
        <li><strong>Serverless:</strong> Function-as-a-Service computing</li>
      </ul>

      <h2>DevOps Practices</h2>
      <p>Learn CI/CD pipelines, containerization with Docker, and infrastructure as code. Master the tools that power modern software delivery.</p>
    `,
    published: true
  },
  {
    title: "Machine Learning for Beginners: Getting Started",
    slug: "machine-learning-beginners-getting-started",
    excerpt: "Introduction to machine learning concepts, algorithms, and practical applications for aspiring data scientists.",
    coverImage: "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800&h=400&fit=crop",
    content: `
      <h2>ML Fundamentals</h2>
      <p>Machine learning is transforming industries and creating new opportunities. Start your journey with the core concepts and algorithms.</p>

      <h2>Learning Path</h2>
      <ol>
        <li><strong>Mathematics:</strong> Linear algebra, calculus, statistics</li>
        <li><strong>Programming:</strong> Python, NumPy, Pandas</li>
        <li><strong>Algorithms:</strong> Supervised and unsupervised learning</li>
        <li><strong>Deep Learning:</strong> Neural networks and frameworks</li>
      </ol>

      <h2>Practical Projects</h2>
      <p>Build real ML projects and apply algorithms to solve practical problems. Access our collection of ML tutorials and datasets.</p>
    `,
    published: true
  },
  {
    title: "Software Engineering Best Practices",
    slug: "software-engineering-best-practices",
    excerpt: "Learn professional software development practices including version control, testing, documentation, and team collaboration.",
    coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
    content: `
      <h2>Professional Development</h2>
      <p>Software engineering is about more than just writing code. Learn the practices that make you a professional developer.</p>

      <h2>Essential Practices</h2>
      <ul>
        <li><strong>Version Control:</strong> Git workflows and collaboration</li>
        <li><strong>Testing:</strong> Unit tests, integration tests, TDD</li>
        <li><strong>Code Quality:</strong> Reviews, linting, formatting</li>
        <li><strong>Documentation:</strong> Code comments and project docs</li>
      </ul>

      <h2>Team Collaboration</h2>
      <p>Learn to work effectively in teams, communicate clearly, and contribute to open-source projects. Build your professional network.</p>
    `,
    published: true
  }
];

async function seedBlogs() {
  try {
    console.log('🌱 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    const { default: Blog } = await import('./src/models/Blog.js');
    const { default: Author } = await import('./src/models/Author.js');

    // Find or create a default author
    let author = await Author.findOne({ name: 'DocLibrary Team' });

    if (!author) {
      console.log('👤 Creating default author...');
      author = new Author({
        name: 'DocLibrary Team',
        slug: 'doclibrary-team',
        bio: 'Educational content creators and technology enthusiasts sharing knowledge with students worldwide.',
        avatar: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=150&h=150&fit=crop&crop=face',
        email: 'team@doclibrary.com',
        website: 'https://doclibrary.com'
      });
      await author.save();
      console.log('✅ Default author created');
    }

    console.log('📝 Checking existing blogs...');
    const existingBlogs = await Blog.countDocuments();
    console.log(`📊 Found ${existingBlogs} existing blogs`);

    console.log('🚀 Seeding new blog posts...');
    let createdCount = 0;

    for (const blogData of blogPosts) {
      // Check if blog already exists
      const existingBlog = await Blog.findOne({ slug: blogData.slug });

      if (!existingBlog) {
        const blog = new Blog({
          ...blogData,
          author: author._id,
          createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000), // Random date within last 30 days
          updatedAt: new Date()
        });

        await blog.save();
        createdCount++;
        console.log(`✅ Created: "${blog.title}"`);
      } else {
        console.log(`⏭️  Skipped: "${blogData.title}" (already exists)`);
      }
    }

    console.log(`\n🎉 Seeding complete!`);
    console.log(`📈 Created ${createdCount} new blog posts`);
    console.log(`📊 Total blogs in database: ${await Blog.countDocuments()}`);

    // Show summary
    console.log('\n📋 Blog Summary:');
    const allBlogs = await Blog.find({ published: true })
      .select('title slug createdAt')
      .sort({ createdAt: -1 })
      .limit(15)
      .lean();

    allBlogs.forEach((blog, index) => {
      console.log(`${index + 1}. ${blog.title}`);
      console.log(`   📅 ${blog.createdAt.toLocaleDateString()}`);
      console.log(`   🔗 /blogs/${blog.slug}`);
      console.log('');
    });

  } catch (error) {
    console.error('❌ Error seeding blogs:', error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
    process.exit(0);
  }
}

// Run the seeder
seedBlogs();