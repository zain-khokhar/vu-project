'use client';

import Image from "next/image";
import Link from "next/link";
import { Calendar } from 'lucide-react';

// Utility for formatting dates
function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
    });
}

export default function FeaturedPosts({ blogs }) {
    // Make sure we have blogs before accessing them
    if (!blogs || blogs.length === 0) {
        return null;
    }

    // Get the first three blogs for the featured section
    const [first, second, third] = blogs.slice(0, 3);

    // Helper function to get cover image URL (handles both old string and new object format)
    const getCoverImageUrl = (coverImage) => {
        if (!coverImage) return '/default-blog-cover.jpg';
        return typeof coverImage === 'string' ? coverImage : coverImage.url || '/default-blog-cover.jpg';
    };

    // Helper function to get cover image alt text
    const getCoverImageAlt = (coverImage, title) => {
        if (typeof coverImage === 'object' && coverImage?.alt) {
            return coverImage.alt;
        }
        return title;
    };

    return (
        <section className="w-full relative">
            {/* Liquid Background Orbs */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-400/15 via-cyan-300/10 to-transparent rounded-full blur-3xl  "></div>
                <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-gradient-to-tl from-purple-400/15 via-pink-300/10 to-transparent rounded-full blur-3xl  " style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header with Liquid Badge */}
                <div className="inline-block mb-4 group">
                    <div className="backdrop-blur-3xl bg-gradient-to-r from-white/60 via-white/40 to-white/60 border border-white/80 rounded-full px-4 py-2 shadow-lg hover:shadow-xl transition-all duration-300 ">
                        <span className="text-xs font-medium bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent tracking-wide">FEATURED COLLECTION</span>
                    </div>
                </div>
                <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-12 bg-gradient-to-r from-gray-900 via-purple-800 to-pink-800 bg-clip-text text-transparent">Featured Posts</h2>

                <div className="grid grid-cols-12 grid-rows-2 gap-6 lg:gap-8">
                    {/* --- Left Big Post --- */}
                    {first && (
                        <article className="col-span-12 lg:col-span-6 row-span-2 relative rounded-3xl overflow-hidden group h-[400px] lg:h-[500px] backdrop-blur-2xl bg-gradient-to-br from-white/70 via-white/60 to-white/50 border border-white/90 shadow-2xl hover:shadow-3xl transition-all duration-500  hover:border-white/100">
                            <Link href={`/blogs/${first.slug}`} className="block relative w-full h-full">
                                <Image
                                    src={getCoverImageUrl(first.coverImage)}
                                    alt={getCoverImageAlt(first.coverImage, first.title)}
                                    fill
                                    className="object-cover object-center group-hover:scale-110 transition-transform duration-700 rounded-3xl"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent rounded-3xl"></div>
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 group-hover:  transition-opacity duration-500 rounded-3xl"></div>
                                <div className="absolute bottom-6 left-6 right-6 text-white">
                                    <div className="inline-block backdrop-blur-xl bg-gradient-to-r from-purple-500/70 via-pink-500/70 to-purple-500/70 px-4 py-2 rounded-full mb-4 shadow-lg">
                                        <span className="text-xs font-medium text-white">
                                            {first.tags?.[0]?.toUpperCase() || "FEATURED"}
                                        </span>
                                    </div>
                                    <h3 className="text-xl sm:text-2xl md:text-3xl font-light leading-snug group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:via-white group-hover:to-white/80 group-hover:bg-clip-text transition-all duration-300">
                                        {first.title}
                                    </h3>
                                </div>
                            </Link>
                        </article>
                    )}

                    {/* --- Right Top Post --- */}
                    {second && (
                        <article className="col-span-12 lg:col-span-6 row-span-1 p-[8px] rounded-3xl bg-gradient-to-r from-purple-400/40 via-blue-400/40 to-purple-400/40 hover:from-purple-500/50 hover:via-blue-500/50 hover:to-purple-500/50 transition-all duration-500 group">
                            <div className="bg-white rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500  overflow-hidden h-full backdrop-blur-2xl">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:  transition-opacity duration-500 pointer-events-none"></div>
                                <div className="relative p-6 flex items-center gap-4 h-full">
                                    <Link
                                        href={`/blogs/${second.slug}`}
                                        className="w-32 h-32 md:w-40 md:h-40 relative flex-shrink-0 rounded-2xl overflow-hidden"
                                    >
                                        <Image
                                            src={getCoverImageUrl(second.coverImage)}
                                            alt={getCoverImageAlt(second.coverImage, second.title)}
                                            fill
                                            className="object-cover object-center group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </Link>
                                    <div className="flex flex-col justify-center flex-1">
                                        <div className="inline-block backdrop-blur-xl bg-gradient-to-r from-purple-500/60 via-blue-500/60 to-purple-500/60 px-3 py-1 rounded-full mb-2 w-fit">
                                            <span className="uppercase text-xs font-medium text-white">
                                                {second.tags?.[0] || "INSIGHTS"}
                                            </span>
                                        </div>
                                        <Link href={`/blogs/${second.slug}`}>
                                            <h4 className="font-light text-lg md:text-xl text-gray-900 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:via-purple-600 group-hover:to-pink-600 group-hover:bg-clip-text transition-all duration-300 line-clamp-2">
                                                {second.title}
                                            </h4>
                                        </Link>
                                        <div className="flex items-center space-x-2 text-gray-600 text-sm font-light mt-2">
                                            <Calendar className="h-3.5 w-3.5 text-purple-500/70" />
                                            <time>{formatDate(second.createdAt)}</time>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </article>
                    )}

                    {/* --- Right Bottom Post --- */}
                    {third && (
                        <article className="col-span-12 lg:col-span-6 row-span-1 p-[8px] rounded-3xl bg-gradient-to-r from-purple-400/40 via-blue-400/40 to-purple-400/40 hover:from-purple-500/50 hover:via-blue-500/50 hover:to-purple-500/50 transition-all duration-500 group">
                            <div className="bg-white rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500  overflow-hidden h-full backdrop-blur-2xl">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:  transition-opacity duration-500 pointer-events-none"></div>
                                <div className="relative p-6 flex items-center gap-4 h-full">
                                    <Link
                                        href={`/blogs/${third.slug}`}
                                        className="w-32 h-32 md:w-40 md:h-40 relative flex-shrink-0 rounded-2xl overflow-hidden"
                                    >
                                        <Image
                                            src={getCoverImageUrl(third.coverImage)}
                                            alt={getCoverImageAlt(third.coverImage, third.title)}
                                            fill
                                            className="object-cover object-center group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </Link>
                                    <div className="flex flex-col justify-center flex-1">
                                        <div className="inline-block backdrop-blur-xl bg-gradient-to-r from-pink-500/60 via-purple-500/60 to-pink-500/60 px-3 py-1 rounded-full mb-2 w-fit">
                                            <span className="uppercase text-xs font-medium text-white">
                                                {third.tags?.[0] || "LEARNING"}
                                            </span>
                                        </div>
                                        <Link href={`/blogs/${third.slug}`}>
                                            <h4 className="font-light text-lg md:text-xl text-gray-900 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:via-purple-600 group-hover:to-pink-600 group-hover:bg-clip-text transition-all duration-300 line-clamp-2">
                                                {third.title}
                                            </h4>
                                        </Link>
                                        <div className="flex items-center space-x-2 text-gray-600 text-sm font-light mt-2">
                                            <Calendar className="h-3.5 w-3.5 text-purple-500/70" />
                                            <time>{formatDate(third.createdAt)}</time>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </article>
                    )}
                </div>
            </div>
        </section>
    );
}
