# Copilot Instructions for `vu-project`

This document provides guidance for AI coding agents working on the `vu-project` codebase. Follow these instructions to ensure productivity and alignment with the project's architecture and conventions.

## Project Overview

The `vu-project` is a Next.js-based educational web application (VUEDU.dev) with the following key components:

- **Frontend**: Located in `src/app/`, this directory contains the main pages and layouts for the application. Each subdirectory represents a route (e.g., `quiz/`, `blogs/`, `contact/`).
- **Components**: Reusable UI components are stored in `src/components/`. Examples include `Navbar.js`, `Footer.js`, and `QuizClient.jsx`.
- **API Routes**: Backend logic is implemented in `src/app/api/`. Each subdirectory corresponds to an API endpoint (e.g., `blogs/route.js`, `comments/route.js`).
- **Data Models**: MongoDB models are defined in `src/models/` (e.g., `Author.js`, `Blog.js`).
- **Utilities**: Helper functions and utilities are in `src/lib/` and `src/utils/`.

## Key Conventions

1. **File Naming**:
   - Use PascalCase for React components (e.g., `BlogCard.js`).
   - Use camelCase for utility functions and hooks (e.g., `useWindowSize.js`).

2. **Styling**:
   - Tailwind CSS is used for styling. Configuration is in `tailwind.config.js`.
   - Global styles are defined in `src/app/globals.css`.
   - **Design System**: Modern flat/simple design with clean layouts (no glassmorphic effects).
   - **Blog Content Styling**: 
     - Blog content uses `.blog-content.prose` or `.blog-content.prose-lg` classes
     - Default text color: `#111827` (dark gray)
     - H1: 2.5rem, green color (#059669)
     - H2: 2rem, dark gray
     - H3: 1.5rem, H4: 1.25rem, H5: 1.125rem, H6: 1rem
     - Links: No underline by default, inherit text color, show blue (#2563eb) with underline on hover
     - Custom styled links (with `bg-`, `border-`, `inline-block` classes) maintain their design
   - **Quiz UI**: Full-width layouts with clean, flat cards and enhanced typography

3. **Routing**:
   - Follow Next.js conventions for file-based routing.
   - Dynamic routes are indicated with square brackets (e.g., `[slug]/page.js`).

4. **Data Management**:
   - MongoDB is used as the database. Connection logic is in `src/lib/mongodb.js`.
   - JSON files in `data/` are used for static data (e.g., quizzes).

## Developer Workflows

### Running the Project

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```

### Building for Production

1. Build the project:
   ```bash
   npm run build
   ```
2. Start the production server:
   ```bash
   npm start
   ```

### Testing

- No specific testing framework is configured. Add tests as needed.

## Integration Points

- **MongoDB**: Ensure the database is running and the connection string is configured in environment variables.
- **Tailwind CSS**: Modify `tailwind.config.js` for custom styles.

## Examples

- **Reusable Component**: `src/components/BlogCard.js` demonstrates how to create a card component for blogs.
- **API Route**: `src/app/api/blogs/route.js` shows how to define a backend API endpoint.
- **Rich Text Editor**: `src/components/BlogEditor.js` uses TipTap with custom link extensions for styled buttons.
- **Quiz Components**: `src/components/QuizSetup.jsx` and `QuizClient.jsx` show modern flat UI patterns.

## Component Guidelines

### Image Management System (Cloudinary)
- **Upload Flow**: Images upload via `/api/upload` route (server-side) for security
- **Alt Text Required**: All images must have alt text for accessibility (WCAG 2.1 Level AA)
- **Database Schema**: `coverImage` field stores object with `{url, alt, publicId, width, height}`
- **Backward Compatibility**: All components handle both old string format and new object format
- **Utilities**: 
  - `uploadToCloudinary(file, folder)` - Upload image to Cloudinary
  - `getCoverImageData(coverImage)` - Normalize image data (handles string or object)
  - Server-side upload uses Cloudinary SDK for secure credential handling
- **Environment Variables**: 
  - `CLOUD_NAME`, `API_KEY`, `API_SECRET` (server-side only)
  - No public credentials exposed to frontend
- **Components Updated**: BlogCard, FeaturedPosts, BlogWriteForm, blog detail page
- **SEO Integration**: Image metadata (url, alt, width, height) included in Open Graph and JSON-LD

### DocumentCard Component
- Shows cover image if available
- Falls back to displaying first 6 uppercase characters of title when no cover image exists
- Glossy liquid macOS theme with backdrop-blur effects
- Smooth hover animations with gradient accents

### Document Detail Page Components
- **DocumentHeader**: Displays first 6 characters badge with semantic HTML
- **DocumentActions**: Preview and download buttons with full accessibility
- **DocumentMetadata**: Structured metadata grid with proper semantic markup
- **DocumentTags**: Clickable tag list with navigation capabilities
- **DocumentRelatedLinks**: Related documents navigation
- All components follow WCAG 2.1 Level AA accessibility standards

### SEO & Structured Data
- **document-seo.js**: Comprehensive SEO utilities
  - `generateDocumentMetadata()`: Full metadata including Open Graph and Twitter Cards
  - `generateDocumentStructuredData()`: JSON-LD for EducationalOccupationalCredential
  - `generateBreadcrumbStructuredData()`: Breadcrumb navigation schema
  - `generateWebPageStructuredData()`: WebPage schema with mainEntity
  - All functions follow schema.org standards

### BlogEditor Component
- Uses TipTap editor with custom extensions
- Supports custom styled links with 6 design options (Primary, Success, Warning, Danger, Info, Outline)
- Custom Link extension adds className support for button-style links
- Professional modal interface for link insertion

### Quiz Components
- **QuizSetup**: Full-width layout with clean cards for quiz configuration
- **QuizClient**: Modern flat design with enhanced typography and horizontal separators
- Uses JSON files from `data/` folder for quiz questions

### Blog Content Rendering
- Blog posts render HTML content using `dangerouslySetInnerHTML`
- Must use `className="blog-content prose prose-lg max-w-none"` on content wrapper
- Styles defined in `globals.css` override default Tailwind prose styles
- All custom styles use `!important` to ensure proper application

## Notes for AI Agents

- Always follow the file and directory structure conventions.
- Use existing components and utilities whenever possible.
- Document any new patterns or conventions introduced.
- **SEO Best Practices**:
  - Always include comprehensive metadata (title, description, keywords, Open Graph, Twitter Cards)
  - Add JSON-LD structured data for all content pages
  - Use semantic HTML5 elements (article, section, nav, header, footer)
  - Include proper ARIA labels and roles for accessibility
  - Implement breadcrumb navigation with schema markup
  - Optimize for Core Web Vitals (LCP, FID, CLS)
- **Accessibility Standards**:
  - Follow WCAG 2.1 Level AA guidelines
  - Include skip links for keyboard navigation
  - Proper heading hierarchy (h1 → h6)
  - Alt text for all images
  - Focus indicators for interactive elements
  - Screen reader-friendly hidden text with `.sr-only`
  - Proper form labels and error messages
- **Code Organization**:
  - Separate concerns into dedicated component files
  - Use utility files for shared logic
  - Keep components small and focused (Single Responsibility Principle)
  - Add JSDoc comments for all exported functions
  - Use TypeScript-style prop validation comments

---

For further clarification, consult the project maintainers or refer to the source code.