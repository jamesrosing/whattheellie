"use client";
import { GetPostResult } from "@/lib/wisp";
import Link from "next/link";
import sanitize, { defaults } from "sanitize-html";

export const PostContent = ({ content }: { content: string }) => {
  const sanitizedContent = sanitize(content, {
    allowedTags: [
      "b",
      "br",
      "i",
      "em",
      "strong",
      "a",
      "img",
      "h1",
      "h2",
      "h3",
      "code",
      "pre",
      "p",
      "li",
      "ul",
      "ol",
      "blockquote",
      // tables
      "td",
      "th",
      "table",
      "tr",
      "tbody",
      "thead",
      "tfoot",
      "small",
      "div",
      "iframe",
    ],
    allowedAttributes: {
      ...defaults.allowedAttributes,
      "*": ["style"],
      iframe: ["src", "allowfullscreen", "style"],
    },
    allowedIframeHostnames: ["www.youtube.com", "www.youtube-nocookie.com"],
  });
  return (
    <div
      className="blog-content mx-auto"
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
    ></div>
  );
};

export const BlogPostContent = ({ post }: { post: GetPostResult["post"] }) => {
  if (!post) return null;
  const { title, publishedAt, createdAt, content, tags } = post;
  return (
    <div>
      <div className="prose lg:prose-xl dark:prose-invert mx-auto mb-10 lg:mt-20 break-words">
        <h1 className="font-garamond !text-3xl lg:!text-4xl !mb-2">{title}</h1>
        <div className="text-sm opacity-60 mb-8">
          {Intl.DateTimeFormat("en-US", { 
            day: 'numeric', 
            month: 'long', 
            year: 'numeric' 
          }).format(new Date(publishedAt || createdAt))}
        </div>
        <PostContent content={content} />

        <div className="mt-10 text-sm text-right">
          {tags.map((tag) => (
            <Link
              key={tag.id}
              href={`/tag/${tag.name}`}
              className="text-primary ml-3 opacity-70 hover:opacity-100 transition-opacity"
            >
              #{tag.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
