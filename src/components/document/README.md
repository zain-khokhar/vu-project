# Document Components

Professional, accessible, and SEO-optimized components for displaying educational documents.

## Components Overview

### DocumentHeader
Displays the document identifier badge with the first 6 characters of the title.

**Features:**
- Semantic HTML with proper ARIA labels
- Large, bold display for visual impact
- Fully accessible with screen reader support

**Usage:**
```jsx
<DocumentHeader 
  title={document.title}
  ariaLabel="Document identifier for Computer Science Notes"
/>
```

### DocumentActions
Preview and download action buttons with full accessibility.

**Features:**
- Keyboard navigation support
- Focus indicators
- External link indicators
- Proper ARIA labels

**Usage:**
```jsx
<DocumentActions
  slug={slug}
  previewInfo={previewInfo}
  title={document.title}
/>
```

### DocumentMetadata
Structured metadata grid displaying subject, university, year, and upload date.

**Features:**
- Semantic HTML with dl/dt/dd elements
- Icon-based visual hierarchy
- Responsive grid layout
- Proper accessibility labels

**Usage:**
```jsx
<DocumentMetadata document={document} />
```

### DocumentTags
Displays clickable document tags with navigation.

**Features:**
- Semantic list markup
- Keyboard accessible links
- Hover and focus states
- Links to filtered document search

**Usage:**
```jsx
<DocumentTags tags={document.tags} />
```

### DocumentRelatedLinks
Shows links to related documents (same subject, university, or type).

**Features:**
- Semantic navigation
- Proper ARIA labels
- Focus indicators
- Responsive layout

**Usage:**
```jsx
<DocumentRelatedLinks 
  document={document}
  typeConfig={typeConfig}
/>
```

## SEO Utilities

### document-seo.js

Comprehensive SEO utilities for document pages.

**Functions:**

#### generateDocumentMetadata(document, slug)
Generates complete metadata including:
- Title, description, keywords
- Open Graph tags
- Twitter Card data
- Robots directives
- Canonical URLs

#### generateDocumentStructuredData(document, slug)
Creates JSON-LD for EducationalOccupationalCredential schema.

#### generateBreadcrumbStructuredData(document, slug)
Generates breadcrumb navigation schema.

#### generateWebPageStructuredData(document, slug)
Creates WebPage schema with mainEntity.

#### generateAllDocumentStructuredData(document, slug)
Returns array of all structured data for a document.

## Accessibility Features

✅ WCAG 2.1 Level AA compliant
✅ Semantic HTML5 elements
✅ Proper ARIA labels and roles
✅ Keyboard navigation support
✅ Focus indicators on all interactive elements
✅ Screen reader-friendly hidden text
✅ Skip links for navigation
✅ Proper heading hierarchy

## SEO Features

✅ Comprehensive metadata (title, description, keywords)
✅ Open Graph protocol support
✅ Twitter Card optimization
✅ JSON-LD structured data (schema.org)
✅ Breadcrumb navigation
✅ Canonical URLs
✅ Semantic HTML structure
✅ Mobile-friendly responsive design

## Code Standards

- **Separation of Concerns**: Each component has a single responsibility
- **JSDoc Comments**: All functions documented
- **Prop Validation**: Types documented in comments
- **Error Handling**: Graceful fallbacks for missing data
- **Performance**: Optimized with proper React patterns
- **Maintainability**: Clear naming and organization

## File Structure

```
src/
├── components/
│   └── document/
│       ├── index.js                    # Central export
│       ├── DocumentHeader.js           # Title badge component
│       ├── DocumentActions.js          # Action buttons
│       ├── DocumentMetadata.js         # Metadata grid
│       ├── DocumentTags.js             # Tags list
│       └── DocumentRelatedLinks.js     # Related navigation
└── lib/
    └── document-seo.js                 # SEO utilities
```

## Best Practices

1. **Always use semantic HTML**: Use proper elements (article, section, nav, etc.)
2. **Include ARIA labels**: Make content accessible to screen readers
3. **Add structured data**: Help search engines understand your content
4. **Test keyboard navigation**: Ensure all interactive elements are accessible
5. **Validate HTML**: Use proper nesting and valid attributes
6. **Optimize performance**: Lazy load when appropriate
7. **Mobile-first**: Ensure responsive design

## Testing

Test these components for:
- ✅ Keyboard navigation (Tab, Enter, Escape)
- ✅ Screen reader compatibility (NVDA, JAWS, VoiceOver)
- ✅ Mobile responsiveness
- ✅ SEO validation (Google Rich Results Test)
- ✅ Accessibility audit (Lighthouse, axe DevTools)

## Future Enhancements

- [ ] Add download tracking with analytics
- [ ] Implement related documents recommendations
- [ ] Add social sharing buttons
- [ ] Include document preview thumbnails
- [ ] Add print-friendly styles
- [ ] Implement offline support with service workers
