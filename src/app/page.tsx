import { BlogPostsPreview } from "@/components/BlogPostPreview";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { NewsletterSubscribe } from "@/components/NewsletterSubscribe";
import { wisp } from "@/lib/wisp";
import { Metadata } from "next";
import { config } from "@/config";

export const metadata: Metadata = {
  title: config.blog.metadata.title.default,
  description: config.blog.metadata.description,
};

interface PageProps {
  searchParams: Promise<{ 
    page?: string | string[];
    [key: string]: string | string[] | undefined;
  }>;
}

const POSTS_PER_PAGE = 6;

function parsePageNumber(page: string | string[] | undefined): number {
  if (!page) return 1;
  const pageStr = Array.isArray(page) ? page[0] : page;
  const parsed = parseInt(pageStr, 10);
  return isNaN(parsed) || parsed < 1 ? 1 : parsed;
}

const Page = async ({ searchParams }: PageProps) => {
  const params = await searchParams;
  const page = parsePageNumber(params.page);
  
  try {
    const result = await wisp.getPosts({ limit: POSTS_PER_PAGE, page });
    
    return (
      <div className="container mx-auto px-5 mb-10">
        <Header />
        <BlogPostsPreview posts={result.posts} />
        <Footer />
      </div>
    );
  } catch (error) {
    console.error("Error fetching posts:", error);
    return (
      <div className="container mx-auto px-5 mb-10">
        <Header />
        <div className="text-center py-10">
          <h2 className="text-2xl font-display font-medium">Unable to load posts</h2>
          <p className="text-muted-foreground mt-2">Please try again later.</p>
        </div>
        <Footer />
      </div>
    );
  }
};

export default Page;
