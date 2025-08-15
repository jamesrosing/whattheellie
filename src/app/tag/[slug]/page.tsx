import { BlogPostsPreview } from "@/components/BlogPostPreview";
import { BlogPostsPagination } from "@/components/BlogPostsPagination";
import { Footer } from "@/components/Footer";
import { EnhancedHeader } from "@/components/EnhancedHeader";
import { Badge } from "@/components/ui/badge";
import { wisp } from "@/lib/wisp";
import { CircleX } from "lucide-react";
import Link from "next/link";

interface Params {
  slug: string;
}

interface PageProps {
  params: Promise<Params>;
  searchParams: Promise<{ 
    page?: string | string[];
    [key: string]: string | string[] | undefined;
  }>;
}

const POSTS_PER_PAGE = 6;

export async function generateMetadata({ params }: Pick<PageProps, 'params'>) {
  const { slug } = await params;

  return {
    title: `#${slug}`,
    description: `Posts tagged with #${slug}`,
  };
}

function parsePageNumber(page: string | string[] | undefined): number {
  if (!page) return 1;
  const pageStr = Array.isArray(page) ? page[0] : page;
  const parsed = parseInt(pageStr, 10);
  return isNaN(parsed) || parsed < 1 ? 1 : parsed;
}

const Page = async ({ params, searchParams }: PageProps) => {
  const [{ slug }, searchParamsResolved] = await Promise.all([
    params,
    searchParams
  ]);

  const page = parsePageNumber(searchParamsResolved.page);
  
  try {
    const result = await wisp.getPosts({ limit: POSTS_PER_PAGE, tags: [slug], page });
    
    return (
    <div className="container mx-auto px-5 mb-10">
      <EnhancedHeader />
      <Link href="/">
        <Badge className="px-2 py-1">
          <CircleX className="inline-block w-4 h-4 mr-2" />
          Posts tagged with <strong className="mx-2">#{slug}</strong>{" "}
        </Badge>
      </Link>
      <BlogPostsPreview posts={result.posts} />
      <BlogPostsPagination
        pagination={result.pagination}
        basePath={`/tag/${slug}/?page=`}
      />
      <Footer />
    </div>
  );
  } catch (error) {
    console.error(`Error fetching posts for tag ${slug}:`, error);
    return (
      <div className="container mx-auto px-5 mb-10">
        <EnhancedHeader />
        <div className="text-center py-10">
          <h2 className="text-2xl font-semibold">Unable to load posts</h2>
          <p className="text-muted-foreground mt-2">Please try again later.</p>
        </div>
        <Footer />
      </div>
    );
  }
};

export default Page;
