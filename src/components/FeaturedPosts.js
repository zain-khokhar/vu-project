'use client';

import Image from "next/image";
import Link from "next/link";

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

    return (
        <section className="w-full mt-16 sm:mt-24 md:mt-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-10">Featured Posts</h2>

            <div className="grid grid-cols-12 grid-rows-2 gap-6 lg:gap-8">
                {/* --- Left Big Post --- */}
                {first && (
                    <article className="col-span-12 lg:col-span-6 row-span-2 relative rounded-xl overflow-hidden group h-[400px] lg:h-[400px]">
                        <Link href={`/blogs/${first.slug}`} className="block relative w-full h-full">
                            <Image
                                src={first.coverImage}
                                alt={first.title}
                                fill
                                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                            <div className="absolute bottom-6 left-6 right-6 text-white">
                                <span className="bg-black text-white text-sm font-medium px-4 py-1 rounded-full inline-block mb-3">
                                    {first.tags?.[0] || "FEATURED"}
                                </span>
                                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold leading-snug">
                                    {first.title}
                                </h3>
                            </div>
                        </Link>
                    </article>
                )}

                {/* --- Right Top Post --- */}
                {second && (
                    <article className="col-span-12 lg:col-span-6 row-span-1 flex items-center gap-4">
                        <Link
                            href={`/blogs/${second.slug}`}
                            className="w-44 h-44 relative flex-shrink-0 rounded-lg overflow-hidden"
                        >
                            <Image
                                src={second.coverImage}
                                alt={second.title}
                                fill
                                className="object-cover object-center"
                            />
                        </Link>
                        <div className="flex flex-col justify-center">
                            <span className="uppercase text-xs font-semibold text-purple-600 mb-1">
                                {second.tags?.[0] || "PRODUCTIVITY"}
                            </span>
                            <Link href={`/blogs/${second.slug}`}>
                                <h4 className="font-bold text-[20px]">
                                    {second.title}
                                </h4>
                            </Link>
                            <time className=" text-[16px] font-semibold text-[#747474]">
                                {formatDate(second.createdAt)}
                            </time>
                        </div>
                    </article>
                )}

                {/* --- Right Bottom Post --- */}
                {third && (
                    <article className="col-span-12 lg:col-span-6 row-span-1 flex items-center gap-4">
                        <Link
                            href={`/blogs/${third.slug}`}
                            className="w-44 h-44 relative flex-shrink-0 rounded-lg overflow-hidden"
                        >
                            <Image
                                src={third.coverImage}
                                alt={third.title}
                                fill
                                className="object-cover object-center"
                            />
                        </Link>
                        <div className="flex flex-col justify-center">
                            <span className="uppercase text-xs font-semibold text-purple-600 mb-1">
                                {second.tags?.[0] || "PRODUCTIVITY"}
                            </span>
                            <Link href={`/blogs/${second.slug}`}>
                                <h4 className="font-bold text-[20px]">
                                    {second.title}
                                </h4>
                            </Link>
                            <time className=" text-[16px] font-semibold text-[#747474]">
                                {formatDate(second.createdAt)}
                            </time>
                        </div>
                    </article>
                )}
            </div>
        </section>
    );
}
