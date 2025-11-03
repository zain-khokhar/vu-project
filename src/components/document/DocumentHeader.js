/**
 * DocumentHeader Component
 * Displays document title badge with first 6 characters
 * Fully semantic and accessible
 */

export default function DocumentHeader({ title, ariaLabel }) {
  const displayText = (title || '').substring(0, 6).toUpperCase();
  
  return (
    <header 
      className="flex justify-center items-center bg-gradient-to-br from-gray-50 to-gray-100 py-12 border-b border-gray-200"
      role="banner"
      aria-label={ariaLabel || "Document identifier"}
    >
      <div 
        className="text-[140px] font-bold text-gray-800 tracking-wider select-none"
        aria-label={`Document code: ${displayText}`}
      >
        {displayText}
      </div>
    </header>
  );
}
