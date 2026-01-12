'use client';

import { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight, Menu } from 'lucide-react';
// import { cn } from '@/lib/utils';

export default function TableOfContents({ toc }) {
    const [activeId, setActiveId] = useState('');
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    useEffect(() => {
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const headings = document.querySelectorAll('h2[id], h3[id]');
                    let currentActiveId = '';

                    // Find the first heading that is currently visible or above the viewport
                    for (const heading of headings) {
                        const rect = heading.getBoundingClientRect();
                        // Check if the heading is in the top part of the viewport (with some buffer)
                        // 150px buffer works well for sticky headers
                        if (rect.top >= 0 && rect.top < 300) {
                            currentActiveId = heading.id;
                            break;
                        } else if (rect.top < 0) {
                            // If we've scrolled past this heading, it's a candidate for being the active one
                            currentActiveId = heading.id;
                        }
                    }

                    if (currentActiveId) {
                        setActiveId((prev) => (prev !== currentActiveId ? currentActiveId : prev));
                    }
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial check

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (!toc || toc.length === 0) return null;

    const handleClick = (e, id) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            // Smooth scroll with offset for sticky header
            const yOffset = -100; // Adjust based on your header height
            const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
            setActiveId(id);
            setIsMobileOpen(false);
        }
    };

    return (
        <nav aria-label="Table of Contents" className="toc-nav">
            {/* Mobile Toggle */}
            <div className="lg:hidden mb-8 border rounded-lg overflow-hidden bg-gray-50 border-gray-200">
                <button
                    onClick={() => setIsMobileOpen(!isMobileOpen)}
                    className="w-full flex items-center justify-between p-4 font-medium text-gray-900 bg-gray-50 hover:bg-gray-100 transition-colors"
                    aria-expanded={isMobileOpen}
                >
                    <span className="flex items-center gap-2">
                        <Menu className="h-4 w-4" />
                        Table of Contents
                    </span>
                    {isMobileOpen ? (
                        <ChevronDown className="h-4 w-4 text-gray-500" />
                    ) : (
                        <ChevronRight className="h-4 w-4 text-gray-500" />
                    )}
                </button>

                {isMobileOpen && (
                    <div className="border-t border-gray-200 max-h-[60vh] overflow-y-auto bg-white p-4">
                        <ul className="space-y-3">
                            {toc.map((item) => (
                                <li
                                    key={item.id}
                                    className={`${item.level === 3 ? 'pl-4' : ''}`}
                                >
                                    <a
                                        href={`#${item.id}`}
                                        onClick={(e) => handleClick(e, item.id)}
                                        className={`block text-sm transition-colors ${activeId === item.id
                                            ? 'text-purple-600 font-medium'
                                            : 'text-gray-600 hover:text-gray-900'
                                            }`}
                                    >
                                        {item.text}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {/* Desktop Sidebar */}
            <div className="hidden lg:block sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-4">
                <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                    On this page
                </h2>
                <ul className="space-y-3 relative">
                    {/* Vertical line track */}
                    <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gray-100 rounded-full" />

                    {toc.map((item) => (
                        <li key={item.id} className="relative">
                            {/* Active indicator overlay on the track */}
                            {activeId === item.id && (
                                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-purple-600 rounded-full transition-all duration-300 ease-in-out" />
                            )}

                            <a
                                href={`#${item.id}`}
                                onClick={(e) => handleClick(e, item.id)}
                                className={`block pl-4 text-sm transition-all duration-200 ${activeId === item.id
                                    ? 'text-purple-700 font-medium translate-x-1'
                                    : 'text-gray-500 hover:text-gray-900 hover:translate-x-1'
                                    } ${item.level === 3 ? 'ml-2 text-xs' : ''}`}
                            >
                                {item.text}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}
