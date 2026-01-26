/**
 * DocumentRelatedLinks Component
 * Shows related documents links (same subject, university, type)
 * Semantic navigation with proper accessibility
 */

import Link from 'next/link';

export default function DocumentRelatedLinks({ document, typeConfig }) {
  const links = [
    {
      href: `/documents?subject=${encodeURIComponent(document.subject)}`,
      label: `More from ${document.subject}`,
      id: 'subject-link',
    },
    {
      href: `/documents?university=${encodeURIComponent(document.university)}`,
      label: `More from ${document.university}`,
      id: 'university-link',
    },
    {
      href: `/documents?type=${document.type}`,
      label: `More ${typeConfig.label}s`,
      id: 'type-link',
    },
  ];

  return (
    <nav 
      className="mt-8 mb-8"
      aria-labelledby="related-links-heading"
    >
      <h2 id="related-links-heading" className="sr-only">
        Related Documents
      </h2>
      
      <div className="flex flex-col sm:flex-row gap-3">
        {links.map(({ href, label, id }) => (
          <Link
          prefetch={false}
            key={id}
            href={href}
            className="bg-gray-100 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors text-center font-medium focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            aria-label={label}
          >
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
