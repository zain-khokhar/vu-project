# Blog System Documentation

## Overview
The blog system is organized following Next.js best practices with proper separation of concerns, SEO optimization, and static site generation.

## File Structure

```
src/
├── app/
│   └── blogs/
│       └── [slug]/
│           └── page.js          # Blog post page (main component)
├── actions/
│   └── blogs.js                 # Server actions for blog CRUD operations
├── lib/
│   └── blog-utils.js            # Blog utility functions (SEO, metadata, structured data)
└── components/
    └── AuthorInfo.js            # Author information component
```

## Key Features

### 1. Static Site Generation (SSG)
- **Function**: `generateStaticParams()`
- **Purpose**: Pre-generates all blog post pages at build time
- **Benefits**: 
  - Faster page loads
  - Better SEO
  - Reduced server load
  - Improved Core Web Vitals

### 2. Advanced SEO Metadata
- **Function**: `generateMetadata()`
- **Includes**:
  - Open Graph tags for social media
  - Twitter Card metadata
  - Canonical URLs
  - Article-specific metadata
  - Reading time and word count
  - Author attribution
  - Keywords and tags

### 3. JSON-LD Structured Data
- **Function**: `generateBlogStructuredData()`
- **Schema Types**:
  - BlogPosting
  - BreadcrumbList
  - WebPage
  - Person (author)
  - Organization (publisher)
  - ImageObject

### 4. Utility Functions

#### `blog-utils.js`
Contains reusable functions for blog operations:

- **`getReadingTime(content)`**: Calculates estimated reading time based on 200 WPM
- **`extractPlainText(html)`**: Strips HTML tags to get plain text
- **`getWordCount(content)`**: Counts words in content
- **`generateExcerpt(content, maxLength)`**: Creates SEO-optimized excerpts
- **`generateBlogMetadata(blog, slug)`**: Generates comprehensive metadata object
- **`generateBlogStructuredData(blog, readingTime)`**: Creates JSON-LD structured data

## Server Actions

### `blogs.js`

#### Main Functions:
1. **`getAllBlogs()`**: Fetches all blog slugs for static generation
2. **`getBlogBySlug(slug)`**: Retrieves single blog post with author details
3. **`getLatestBlogs(limit)`**: Gets recent blogs for homepage
4. **`createBlog(formData)`**: Creates new blog post with auto-slug generation
5. **`updateBlog(id, updateData)`**: Updates existing blog post
6. **`deleteBlog(id)`**: Deletes blog post

## Usage Examples

### Creating a New Blog Post
```javascript
const formData = new FormData();
formData.append('title', 'My Blog Post');
formData.append('excerpt', 'Short description');
formData.append('content', '<p>Full content</p>');
formData.append('coverImage', 'https://...');
formData.append('author', authorId);

const result = await createBlog(formData);
```

### Fetching Blog Posts
```javascript
// Get single blog
const { blog } = await getBlogBySlug('my-blog-post');

// Get all blogs (for static generation)
const { blogs } = await getAllBlogs();

// Get latest blogs
const { blogs } = await getLatestBlogs(6);
```

### Using Utility Functions
```javascript
import { getReadingTime, generateExcerpt } from '@/lib/blog-utils';

const content = '<p>Your blog content...</p>';
const readingTime = getReadingTime(content); // Returns: 5 (minutes)
const excerpt = generateExcerpt(content, 155); // Returns: "Your blog content..."
```

## SEO Best Practices Implemented

### ✅ Technical SEO
- Canonical URLs
- Meta descriptions (155 characters)
- Open Graph tags
- Twitter Cards
- Robots meta tags
- Structured data (JSON-LD)

### ✅ Content SEO
- Reading time indicators
- Word count metadata
- Author attribution
- Article sections
- Tags and keywords
- Breadcrumb navigation

### ✅ Performance SEO
- Static site generation
- Lazy loading images
- Optimized metadata
- Proper caching headers

## Environment Variables

Required in `.env.local`:
```bash
NEXT_PUBLIC_BASE_URL=http://localhost:3000  # Production: https://yourdomain.com
MONGODB_URI=mongodb://...                   # Your MongoDB connection string
```

## Page Generation Flow

1. **Build Time** (`next build`):
   - `generateStaticParams()` fetches all blog slugs
   - Next.js pre-renders each blog page
   - Static HTML files are generated

2. **Request Time**:
   - If page exists: Serve static HTML (fast)
   - If page doesn't exist: 404 (notFound)
   - Metadata is included in HTML head

3. **Revalidation**:
   - Manual: `revalidatePath('/blogs/[slug]')`
   - On-demand: ISR (Incremental Static Regeneration)

## Testing Structured Data

Use these tools to validate your implementation:

1. **Google Rich Results Test**: https://search.google.com/test/rich-results
2. **Schema.org Validator**: https://validator.schema.org/
3. **Facebook Sharing Debugger**: https://developers.facebook.com/tools/debug/
4. **Twitter Card Validator**: https://cards-dev.twitter.com/validator

## Future Enhancements

- [ ] Add blog categories
- [ ] Implement blog search
- [ ] Add related posts
- [ ] Enable comments system
- [ ] Add RSS feed
- [ ] Implement blog series/collections
- [ ] Add reading progress indicator
- [ ] Enable dark mode

## Notes

- All blog utility functions are pure and reusable
- Server actions handle database operations
- Metadata generation is separated for maintainability
- Structured data follows Schema.org standards
- Static generation improves performance and SEO
