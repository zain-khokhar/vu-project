'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function ExpandableDescription({ description, maxLines = 3 }) {
    const [isExpanded, setIsExpanded] = useState(false);

    // Check if description is long enough to need expansion
    const needsExpansion = description && description.length > 150;

    if (!description) return null;

    return (
        <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">About This Quiz</h3>
            <div className="relative">
                <p
                    className={`text-gray-600 text-sm leading-relaxed transition-all duration-300 ${!isExpanded && needsExpansion ? 'line-clamp-3' : ''
                        }`}
                    itemProp="description"
                >
                    {description}
                </p>

                {needsExpansion && (
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100"
                        aria-expanded={isExpanded}
                        aria-label={isExpanded ? 'Show less description' : 'Show more description'}
                    >
                        <span>{isExpanded ? 'Read Less' : 'Read More'}</span>
                        {isExpanded ? (
                            <ChevronUp className="h-3 w-3" aria-hidden="true" />
                        ) : (
                            <ChevronDown className="h-3 w-3" aria-hidden="true" />
                        )}
                    </button>
                )}
            </div>
        </div>
    );
}
