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

// Load all posts for infinite scroll effect (100 posts max per page)
const POSTS_PER_PAGE = 100;

const Page = async () => {
  try {
    const result = await wisp.getPosts({ limit: POSTS_PER_PAGE, page: 1 });
    
    return (
      <>
        <div className="container mx-auto px-5">
          <Header />
        </div>
        <BlogPostsPreview posts={result.posts} />
        <div className="container mx-auto px-5 mb-10">
          <Footer />
        </div>
      </>
    );
  } catch (error) {
    console.error("Error fetching posts:", error);
    return (
      <>
        <div className="container mx-auto px-5">
          <Header />
        </div>
        <div className="container mx-auto px-5">
          <div className="text-center py-10">
            <h2 className="text-2xl font-display font-medium">Unable to load posts</h2>
            <p className="text-muted-foreground mt-2">Please try again later.</p>
          </div>
        </div>
        <div className="container mx-auto px-5 mb-10">
          <Footer />
        </div>
      </>
    );
  }
};

export default Page;
