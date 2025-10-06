import Image from 'next/image';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';

export default function BlogCard({ blog }) {
  return (
    <div className="group flex flex-col items-center ">
      <Link href={`/blogs/${blog.slug}`} className="h-full rounded-xl overflow-hidden">
        <Image
          src={blog.coverImage}
          alt={blog.title}
          width={400}
          height={400}
          className="rounded-xl object-cover object-center"
        />

      </Link>

      <div className="flex flex-col w-full mt-4">
        <Link href={`/blogs/${blog.slug}`} className="inline-block my-1">
          <h2 className="font-semibold capitalize text-[20px]">
            <span
              className="bg-gradient-to-r from-accent/50 to-accent/50
              bg-[length:0px_6px]
              group-hover:bg-[length:100%_6px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 "
            >
              {blog.title}
            </span>
          </h2>
        </Link>

        <span className="capitalize text-[#747474] font-semibold text-[16px]">
          {formatDate(blog.createdAt)}
        </span>
      </div>
    </div>
  );
}