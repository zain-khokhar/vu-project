# DocLibrary - Free Document Sharing Platform

A free document library website similar to StuDocu, built with Next.js 15 and MongoDB. Students can access and share educational materials including handouts, books, notes, and exams without any barriers, login requirements, or premium features.

## Features

- **Free Access**: No registration, payments, or premium features
- **Document Types**: Support for handouts, books, notes, and exams
- **Search & Filter**: Advanced filtering by type, subject, university, and year
- **Responsive Design**: Clean, modern UI built with Tailwind CSS
- **Server-Side Rendering**: Fast performance with Next.js 15 App Router
- **MongoDB Integration**: Efficient document storage and retrieval
- **Upload System**: Simple admin interface for adding documents

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Database**: MongoDB with Mongoose ODM
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Deployment**: Vercel-ready

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.js            # Homepage
│   ├── layout.js          # Root layout
│   ├── documents/         # Document pages
│   │   ├── page.js        # All documents listing
│   │   └── [slug]/        # Dynamic document detail pages
│   └── admin/
│       └── upload/        # Document upload page
├── components/            # Reusable UI components
│   ├── Navbar.js
│   ├── Footer.js
│   ├── DocumentCard.js
│   ├── SearchFilters.js
│   └── Pagination.js
├── models/               # Mongoose schemas
│   └── Document.js
├── lib/                  # Utility functions
│   ├── mongodb.js       # Database connection
│   ├── utils.js         # Helper functions
│   └── seed.js          # Sample data seeder
└── actions/             # Server actions
    └── documents.js     # Document CRUD operations
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- MongoDB Atlas account or local MongoDB installation
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd vu-project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Edit `.env.local` and add your MongoDB connection string:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/doclibrary?retryWrites=true&w=majority
   ```

4. **Seed the database with sample data (optional)**
   ```bash
   npm run seed
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open the application**
   Visit [http://localhost:3000](http://localhost:3000) in your browser

## Database Schema

The application uses a single Document model with the following structure:

```javascript
{
  title: String,           // Document title
  slug: String,           // URL-friendly identifier (unique)
  description: String,    // Detailed description
  type: Enum,            // 'handout', 'book', 'note', 'exam'
  coverImage: String,    // Image URL for document cover
  fileUrl: String,       // Direct download URL for the document
  subject: String,       // e.g., "Mathematics", "Physics"
  university: String,    // e.g., "Harvard University"
  year: Number,          // Publication/creation year
  tags: [String],        // Array of relevant tags
  createdAt: Date        // Auto-generated timestamp
}
```

## Key Features Explained

### Homepage (`/`)
- Hero section introducing the platform
- Latest 6 documents grid
- Platform statistics and benefits
- Call-to-action buttons

### Documents Listing (`/documents`)
- Server-side pagination (12 documents per page)
- Advanced filtering by type, subject, university, year
- Real-time search functionality
- Responsive grid layout

### Document Detail (`/documents/[slug]`)
- Full document information display
- Direct download button
- Related documents suggestions
- SEO-optimized with dynamic metadata

### Admin Upload (`/admin/upload`)
- Simple form for adding new documents
- File URL input (supports external hosting)
- Tag management system
- Form validation and error handling

## Environment Variables

Create a `.env.local` file with:

```
# Required
MONGODB_URI=your_mongodb_connection_string

# Optional
NEXT_PUBLIC_APP_URL=http://localhost:3000
UPLOADTHING_SECRET=your_uploadthing_secret (if using UploadThing)
UPLOADTHING_APP_ID=your_uploadthing_app_id (if using UploadThing)
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Manual Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Future Enhancements

- [ ] User authentication and profiles
- [ ] Document ratings and reviews
- [ ] Advanced search with full-text indexing
- [ ] File upload integration (UploadThing/Cloudinary)
- [ ] Document categories and collections
- [ ] Admin dashboard for content management
- [ ] API endpoints for external integrations
- [ ] Mobile app development

## Support

If you encounter any issues or have questions, please open an issue on GitHub or contact the development team.

---

**Built with ❤️ for the student community**