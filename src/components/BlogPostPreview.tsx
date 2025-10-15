"use client";
import { cn } from "@/lib/utils";
import { GetPostsResult } from "@/lib/wisp";
import Image from "next/image";
import Link from "next/link";
import { FunctionComponent } from "react";

export const BlogPostPreview: FunctionComponent<{
  post: GetPostsResult["posts"][0];
  index?: number;
}> = ({ post, index = 0 }) => {
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
          className="object-cover transition-all duration-500 group-hover:scale-110 group-hover:blur-sm"
          src={post.image || "/images/placeholder.webp"}
          fill
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <h2 className="font-garamond text-lg md:text-xl font-light tracking-normal text-white text-center px-4 line-clamp-2">
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
        "grid grid-cols-3 md:grid-cols-4 gap-0 md:gap-4 md:my-16 md:container md:mx-auto",
        className
      )}
    >
      {posts.map((post, index) => (
        <BlogPostPreview key={post.id} post={post} index={index} />
      ))}
    </div>
  );
};
