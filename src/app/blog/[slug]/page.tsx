import { BlogPostContent } from "@/components/BlogPostContent";
import { CommentSection } from "@/components/CommentSection";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { NewsletterSubscribe } from "@/components/NewsletterSubscribe";
import { RelatedPosts } from "@/components/RelatedPosts";
import { config } from "@/config";
import { signOgImageUrl } from "@/lib/og-image";
import { wisp } from "@/lib/wisp";
import { notFound } from "next/navigation";
import type { BlogPosting, WithContext } from "schema-dts";

export async function generateMetadata(props: { params: Promise<Params> }) {
  const params = await props.params;
  const { slug } = params;

  try {
    const result = await wisp.getPost(slug);
    if (!result?.post) {
      return {
        title: "Blog post not found",
        description: "The requested blog post could not be found.",
      };
    }

    const { title, description, image } = result.post;
    const generatedOgImage = signOgImageUrl({ title, brand: config.blog.name });

    return {
      title,
      description: description || `Read ${title} on ${config.blog.name}`,
      openGraph: {
        title,
        description: description || `Read ${title} on ${config.blog.name}`,
        images: image ? [generatedOgImage, image] : [generatedOgImage],
      },
    };
  } catch (error) {
    console.error(`Error generating metadata for slug ${slug}:`, error);
    return {
      title: "Blog post not found",
      description: "The requested blog post could not be found.",
    };
  }
}
interface Params {
  slug: string;
}

const Page = async (props: { params: Promise<Params> }) => {
  const params = await props.params;
  const { slug } = params;

  try {
    const [postResult, relatedPostsResult] = await Promise.all([
      wisp.getPost(slug),
      wisp.getRelatedPosts({ slug, limit: 3 })
    ]);

    if (!postResult?.post) {
      return notFound();
    }

    const { posts: relatedPosts } = relatedPostsResult;
    const { title, publishedAt, updatedAt, image, author } = postResult.post;

  const jsonLd: WithContext<BlogPosting> = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    image: image ? image : undefined,
    datePublished: publishedAt ? publishedAt.toString() : undefined,
    dateModified: updatedAt.toString(),
    author: {
      "@type": "Person",
      name: author.name ?? undefined,
      image: author.image ?? undefined,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container mx-auto px-5">
        <Header />
        <div className="max-w-prose mx-auto text-xl">
          <BlogPostContent post={postResult.post} />
          <RelatedPosts posts={relatedPosts} />
          <CommentSection slug={slug} />
        </div>
        <Footer />
      </div>
    </>
  );
  } catch (error) {
    console.error(`Error loading blog post ${slug}:`, error);
    return notFound();
  }
};

export default Page;
