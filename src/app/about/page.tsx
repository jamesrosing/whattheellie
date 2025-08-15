import { Footer } from "@/components/Footer";
import { EnhancedHeader } from "@/components/EnhancedHeader";
import { config } from "@/config";
import { signOgImageUrl } from "@/lib/og-image";
import Markdown from "react-markdown";

const content = `# Meet Ellie

![Ellie Profile](/images/ellie-profile.jpg)

## The Journey Begins Where Comfort Ends

Hi, I'm Ellie – a wanderer, storyteller, and eternal optimist chasing sunsets across the globe.

Three years ago, I was sitting in a glass tower in London, managing investment portfolios and living what everyone called "the dream." But staring at those endless spreadsheets, I kept thinking about that quote: *"Twenty years from now, you will be more disappointed by the things you didn't do than by the ones you did."*

So I did something crazy. I sold my flat, packed my life into two backpacks, and bought a one-way ticket to New Zealand.

## Why I Travel

![Exploring new horizons](/images/malaga.jpg)

Travel isn't just about pretty Instagram photos (though I do love a good sunset). For me, it's about:

- **Connection** – Meeting locals who become lifelong friends, sharing meals with strangers who become family
- **Growth** – Pushing past comfort zones, whether it's hiking an active volcano or trying fermented shark in Iceland
- **Perspective** – Understanding that there are a thousand ways to live a meaningful life
- **Stories** – Collecting moments that become the tales I'll tell for decades

## What You'll Find Here

This blog is my digital diary, but it's also your guidebook. I share:

✈️ **Honest travel guides** – The good, the challenging, and the unexpectedly magical

🎒 **Solo travel tips** – Especially for women navigating the world independently

🌍 **Hidden gems** – Those off-the-beaten-path places that steal your heart

💭 **Real talk** – The mental health ups and downs of long-term travel

🍜 **Food adventures** – Because the best way to understand a culture is through its cuisine

## Current Location: Following Summer

Right now, I'm somewhere between yesterday's adventure and tomorrow's discovery. I chase summer around the globe – from the beaches of Bali to the fjords of Norway, always seeking those golden hour moments when the world feels infinite.

## Let's Connect

Whether you're planning your first solo trip, living vicariously through my misadventures, or just need a sign to book that flight – welcome to my corner of the internet.

Remember: Life begins at the end of your comfort zone, and the world is waiting.

*Adventure is out there – you just have to be brave enough to find it.*

**Love & wanderlust,**

**Ellie** ✨`;

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
      <EnhancedHeader />
      <div className="prose lg:prose-lg dark:prose-invert m-auto mt-20 mb-10 blog-content animate-fade-in-up">
        <Markdown>{content}</Markdown>
      </div>
      <Footer />
    </div>
  );
};

export default Page;
