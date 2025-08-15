import { EnhancedHeader } from "@/components/EnhancedHeader";
import { Footer } from "@/components/Footer";
import { BlogPostsSkeletonGrid } from "@/components/BlogPostSkeleton";

export default function Loading() {
  return (
    <div className="container mx-auto px-5 mb-10">
      <EnhancedHeader />
      <BlogPostsSkeletonGrid />
      <Footer />
    </div>
  );
}