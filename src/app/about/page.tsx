import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { config } from "@/config";
import { signOgImageUrl } from "@/lib/og-image";
import Markdown from "react-markdown";

const content = `![Ellie in her element](/images/ellie-profile.jpg)

Hi! I'm Ellie – adventurer, dreamer, and your guide to finding magic in the everyday and extraordinary alike.

After spending years in the corporate world, climbing ladders that led to offices with better views but less fulfillment, I made a decision that changed everything. I traded my business suits for backpacks, my conference rooms for cobblestone streets, and my spreadsheets for sunset views from mountaintops I never thought I'd climb.

![Ellie exploring new horizons](/images/image2.jpg)

## My Story

What started as a two-week vacation to "find myself" turned into a complete life transformation. That first solo trip taught me more about courage, resilience, and joy than any boardroom ever could. I discovered that the world is full of kind strangers who become friends, hidden cafes that serve the perfect cup of coffee, and moments that take your breath away when you least expect them.

Now, I'm on a mission to explore not just new places, but new ways of living. From learning to cook authentic pad thai from a grandmother in Bangkok to hiking through Scotland's highlands in the rain (and loving every minute), each experience adds another layer to this incredible journey.

## What You'll Find Here

This blog is my love letter to adventure – both the grand gestures and the quiet moments. I share:

- **Honest travel stories** – the good, the challenging, and the unexpectedly hilarious
- **Practical tips** for fellow adventurers (especially those taking their first solo steps)
- **Hidden gems** that you won't find in typical guidebooks
- **Life lessons** learned on the road (and sometimes the hard way)
- **Beautiful moments** that remind us why we explore

## Join the Adventure

Whether you're planning your own escape, living vicariously through my adventures, or just need a reminder that there's magic beyond the everyday routine – you're in the right place.

Let's explore this beautiful world together, one story at a time.

With love and wanderlust,

**Ellie** ✈️`;

export async function generateMetadata() {
  return {
    title: "About Me",
    description: "Learn more about Ellie and her travel adventures",
    openGraph: {
      title: "About Me",
      description: "Learn more about Ellie and her travel adventures",
      images: [
        signOgImageUrl({
          title: "Ellie",
          label: "About Me",
          brand: config.blog.name,
        }),
      ],
    },
  };
}

const Page = async () => {
  return (
    <div className="container mx-auto px-5">
      <Header />
      <div className="prose lg:prose-lg dark:prose-invert m-auto mt-20 mb-10 blog-content">
        <Markdown>{content}</Markdown>
      </div>
      <Footer />
    </div>
  );
};

export default Page;
