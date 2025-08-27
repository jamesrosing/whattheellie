"use client";
import { cn } from "@/lib/utils";
import { GetPostsResult } from "@/lib/wisp";
import { formatDate } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { FunctionComponent } from "react";

export const BlogPostPreview: FunctionComponent<{
  post: GetPostsResult["posts"][0];
  index?: number;
}> = ({ post, index = 0 }) => {
  return (
    <div 
      className="break-words group animate-fade-in-up"
      style={{
        animationDelay: `${index * 100}ms`,
        animationFillMode: "backwards"
      }}
    >
      <Link href={`/blog/${post.slug}`}>
        <div className="aspect-[16/9] relative overflow-hidden rounded-lg">
          <Image
            alt={post.title}
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            src={post.image || "/images/placeholder.webp"}
            fill
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </Link>
      <div className="grid grid-cols-1 gap-2 md:col-span-2 mt-4">
        <h2 className="font-garamond text-2xl md:text-3xl text-primary transition-colors duration-200 group-hover:text-primary/80">
          <Link href={`/blog/${post.slug}`} className="hover:underline decoration-2 underline-offset-4">
            {post.title}
          </Link>
        </h2>
        <div className="caption italic text-muted-foreground -mt-1">
          {formatDate(post.publishedAt || post.updatedAt, "dd MMMM yyyy")}
        </div>
        <div className="text-sm md:text-base leading-relaxed line-clamp-4 text-muted-foreground mt-2">
          {post.description}
        </div>
        <div className="text-sm text-muted-foreground flex flex-wrap gap-2 justify-end mt-3">
          {post.tags.map((tag) => (
            <Link 
              key={tag.id} 
              href={`/tag/${tag.name}`}
              className="inline-block px-2 py-1 rounded-md bg-accent/50 hover:bg-accent transition-colors duration-200 hover:scale-105 transform"
            >
              #{tag.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export const BlogPostsPreview: FunctionComponent<{
  posts: GetPostsResult["posts"];
  className?: string;
}> = ({ posts, className }) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-16 lg:gap-28 md:grid-cols-2 md:my-16 my-8",
        className
      )}
    >
      {posts.map((post, index) => (
        <BlogPostPreview key={post.id} post={post} index={index} />
      ))}
    </div>
  );
};
