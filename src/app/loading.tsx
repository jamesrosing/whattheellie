import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BlogPostsSkeletonGrid } from "@/components/BlogPostSkeleton";

export default function Loading() {
  return (
    <div className="container mx-auto px-5 mb-10">
      <Header />
      <BlogPostsSkeletonGrid />
      <Footer />
    </div>
  );
}