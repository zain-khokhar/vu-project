// No 'use client' needed - this is a Server Component!

export default function ExpandableDescription({ description, maxLines = 3 }) {
    if (!description) return null;

    // Generate unique ID for the checkbox hack
    const checkboxId = `expand-desc-${Math.random().toString(36).substr(2, 9)}`;
    const needsExpansion = description && description.length > 150;

    return (
        <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">About This Quiz</h3>
            <div className="relative">
                {/* Minimal CSS for checkbox hack - only what Tailwind can't do */}
                <style>{`
                    .expandable-toggle:checked ~ .expandable-content {
                        display: block !important;
                        -webkit-line-clamp: unset !important;
                        overflow: visible !important;
                    }
                    .expandable-toggle:checked ~ .expandable-btn .expand-text,
                    .expandable-toggle:checked ~ .expandable-btn .expand-icon {
                        display: none !important;
                    }
                    .expandable-toggle:checked ~ .expandable-btn .collapse-text,
                    .expandable-toggle:checked ~ .expandable-btn .collapse-icon {
                        display: inline !important;
                    }
                `}</style>

                {/* Hidden checkbox controls the state */}
                <input
                    type="checkbox"
                    id={checkboxId}
                    className="expandable-toggle absolute opacity-0 w-0 h-0 pointer-events-none"
                    aria-hidden="true"
                />

                <p
                    className="expandable-content text-gray-600 text-sm leading-relaxed line-clamp-3 transition-all duration-300"
                    itemProp="description"
                >
                    {description}
                </p>

                {needsExpansion && (
                    <label
                        htmlFor={checkboxId}
                        className="expandable-btn mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 rounded-lg cursor-pointer transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        role="button"
                        tabIndex={0}
                    >
                        <span className="expand-text">Read More</span>
                        <span className="collapse-text hidden">Read Less</span>
                        <svg className="expand-icon w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                        <svg className="collapse-icon hidden w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <polyline points="18 15 12 9 6 15"></polyline>
                        </svg>
                    </label>
                )}
            </div>
        </div>
    );
}
