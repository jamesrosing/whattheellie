"use client";
import { cn } from "@/lib/utils";
import { GetPostsResult } from "@/lib/wisp";
import Image from "next/image";
import Link from "next/link";
import { FunctionComponent, useState } from "react";

export const BlogPostPreview: FunctionComponent<{
  post: GetPostsResult["posts"][0];
  index?: number;
}> = ({ post, index = 0 }) => {
  const [imageError, setImageError] = useState(false);
  const imageSrc = imageError
    ? "/images/placeholder.webp"
    : (post.image || "/images/placeholder.webp");

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="break-words group animate-fade-in-up"
      style={{
        animationDelay: `${index * 100}ms`,
        animationFillMode: "backwards"
      }}
    >
      <div className="group relative aspect-square bg-gray-200 dark:bg-zinc-800 overflow-hidden cursor-pointer">
        <Image
          alt={post.title}
          className="object-cover transition-all duration-500 blur-[2px] group-hover:blur-none group-hover:scale-110"
          src={imageSrc}
          fill
          onError={() => setImageError(true)}
        />
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/0 transition-all duration-300" />
        {/* Lower third gradient for title visibility on hover */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute inset-0 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <h2 className="font-garamond text-lg md:text-xl font-[300] tracking-normal text-white text-center px-4 line-clamp-2 uppercase">
            {post.title}
          </h2>
        </div>
      </div>
      <span className="sr-only">
        {post.description}
      </span>
    </Link>
  );
};

export const BlogPostsPreview: FunctionComponent<{
  posts: GetPostsResult["posts"];
  className?: string;
}> = ({ posts, className }) => {
  return (
    <div
      className={cn(
        "grid grid-cols-3 md:grid-cols-4 gap-px md:gap-4 px-px md:px-0 md:my-16 md:container md:mx-auto",
        className
      )}
    >
      {posts.map((post, index) => (
        <BlogPostPreview key={post.id} post={post} index={index} />
      ))}
    </div>
  );
};
