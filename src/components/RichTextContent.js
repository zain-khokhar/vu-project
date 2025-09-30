export default function RichTextContent({ content }) {
  // If content is empty or just whitespace, don't render anything
  if (!content || content.trim() === '' || content.trim() === '<p></p>') {
    return null;
  }

  return (
    <div 
      className="prose max-w-none prose-headings:text-gray-900 prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-p:text-gray-700 prose-strong:text-gray-900 prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:p-4 prose-blockquote:rounded prose-ul:text-gray-700 prose-ol:text-gray-700 prose-li:text-gray-700"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}