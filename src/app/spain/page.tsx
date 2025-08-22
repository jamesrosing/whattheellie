import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import SpainPageClient from "./SpainPageClient";

export default function SpainGuidePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-5">
        <Header />
      </div>
      <SpainPageClient />
      <div className="container mx-auto px-5">
        <Footer />
      </div>
    </div>
  );
}