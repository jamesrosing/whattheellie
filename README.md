# Ellie's Travel Blog - A Next.js 15 Interactive Travel Experience

An immersive travel blog featuring an interactive map, comprehensive Spain guide, and personal travel stories. Built with Next.js 15, Server Components, and backed by Wisp CMS.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FWisp-CMS%2Fnextjs-blog-cms-wisp&env=NEXT_PUBLIC_BLOG_ID&envDescription=Blog%20ID%20obtained%20from%20the%20Setup%20Page%20on%20Wisp%20CMS&demo-title=Demo%20Travel%20Blog&demo-description=Demo%20travel%20blog%20using%20Nextjs%2015%20Server%20Component&demo-url=https%3A%2F%2Fnextjs-blog-cms-wisp.vercel.app%2F&demo-image=https%3A%2F%2Fimagedelivery.net%2FlLmNeOP7HXG0OqaG97wimw%2Fclvlugru90000o4g8ahxp069s%2F32432ccf-57a8-4992-8c51-e5a47e110018.png%2Fpublic)

## 🌍 Live Features

### Interactive Travel Map (`/map`)
- **Leaflet-powered interactive map** with artistic watercolor tiles
- **Spain-centric design** with Madrid as the glowing home base
- **Custom location markers**: Home (gold pulse), Visited (coral), Upcoming (teal)
- **Animated travel routes** showing connections between destinations
- **Three viewing modes**: Journey View, Story Mode, and Mi Casa (Spain focus)
- **Location details** with photos, memories, and blog post links
- **Travel statistics panel** tracking countries, cities, and miles traveled

### Comprehensive Spain Guide (`/spain`)
- **8 Major Sections** with smooth navigation:
  - **History**: 5,000 years from prehistoric Iberia to modern democracy
  - **Geography**: Detailed regional breakdown with climate zones
  - **People & Culture**: Languages, social customs, and flamenco heritage
  - **Cuisine**: Regional specialties with wine pairings
  - **Essential Destinations**: Madrid, Barcelona, Seville, Granada, and more
  - **Hidden Gems**: Secret villages and untouristed spots
  - **Festivals**: Semana Santa, San Fermín, La Tomatina
  - **Travel Tips**: Practical advice, survival Spanish, cultural intelligence
- **Lonely Planet style** encyclopedic content
- **Interactive cards** with expandable details
- **Insider tips** and local secrets throughout

### Original Blog Features
This travel blog extends the original [Next.js blog template](https://github.com/Wisp-CMS/nextjs-blog-cms-wisp) with travel-specific enhancements while maintaining all core blogging features.

## About Wisp

Wisp is a modern CMS for adding blogs to websites. It features an intuitive, medium-like editorial experience so that you can focus on writing instead of getting distracted by markdown.

## Features

### Core Blog Features
- Beautiful blog starter kit with server rendering using Next.js 15 Server Components
- Responsive layout for mobile devices
- Filter blog posts by tags
- Light & dark mode
- Automatic hierarchical sitemap generation
- Automatic Open Graph image generation
- Automatic [Related Posts suggestions](https://www.wisp.blog/blog/suggesting-related-blog-post-with-ai-content-recommendation)
- RSS Feed

### Travel-Specific Features
- **Interactive Travel Map**: Visual journey tracker with custom markers and routes
- **Spain Guide**: Comprehensive travel guide with history, culture, and destinations
- **Location-based content**: Connect blog posts to map locations
- **Travel statistics**: Track countries, cities, and miles traveled
- **Animated interfaces**: Smooth transitions with Framer Motion
- **Mobile-optimized**: Touch-friendly map controls and responsive design

## Technologies

### Core Stack
- [Next.js 15](https://nextjs.org/) using App Router & TypeScript
- [Wisp](https://wisp.blog/?utm_source=github&utm_medium=web&utm_campaign=nextjs-blog-cms-wisp) to manage blog posts
- [Tailwind CSS](https://tailwindcss.com/) for CSS framework
- [Shadcn UI](https://ui.shadcn.com/) for UI components
- [TypeScript](https://www.typescriptlang.org/) for type safety

### Travel Features Stack
- [Leaflet](https://leafletjs.com/) for interactive maps
- [Framer Motion](https://www.framer.com/motion/) for animations
- Custom watercolor map tiles from Stamen Design
- Responsive design with mobile-first approach

## Step-by-step Video Tutorial

We've now included a 3-part video tutorial to help you run this blog on your computer:

![3-part Video Tutorial to Launch Nextjs Blog](https://imagedelivery.net/lLmNeOP7HXG0OqaG97wimw/cluqyx1rl0000l5ds3f0vkfer/2a92b7b6-9b11-4e41-8719-bad7be99b912.png/public "3-part Video Tutorial to Launch Nextjs Blog")

- [Part 1: Running the Next JS blog (15 min)](https://www.wisp.blog/docs/next-js-blog-starter-kit/running-blog?utm_source=github&utm_medium=web&utm_campaign=nextjs-blog-cms-wisp)
- [Part 2: Personalizing Your Next.js Blog (15 min)](https://www.wisp.blog/docs/next-js-blog-starter-kit/personalizing-blog?utm_source=github&utm_medium=web&utm_campaign=nextjs-blog-cms-wisp)
- [Part 3: Deploying Your Next.js Blog (15 min)](https://www.wisp.blog/docs/next-js-blog-starter-kit/deploying-blog?utm_source=github&utm_medium=web&utm_campaign=nextjs-blog-cms-wisp)

## Quick Start Guide

First, install the dependencies:

```bash
npm i --legacy-peer-deps
```

**IMPORTANT**: This project uses React 19. Some dependencies require the `--legacy-peer-deps` flag during installation. Make sure that Vercel's install command is also set to use `npm i --legacy-peer-deps`!

Then, copy the `.env.example` file to `.env`:

```bash
cp .env.example .env
```

Note: You will need to populate the `NEXT_PUBLIC_BLOG_ID` variable with the Blog ID obtained from wisp after you've created an account.

Finally, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Available Routes

- `/` - Blog homepage with latest posts
- `/map` - Interactive travel map
- `/spain` - Comprehensive Spain travel guide
- `/blog/[slug]` - Individual blog posts
- `/tag/[slug]` - Posts filtered by tag

## Customization Guide

### Map Customization
The travel map data is stored in `src/components/TravelMap.tsx`. To add your own locations:

1. Edit the `locations` array with your destinations
2. Update `routes` array to show travel connections
3. Customize marker styles and colors
4. Add your own photos in the `public/images` directory

### Spain Guide Content
The Spain guide content is in `src/app/spain/page.tsx`. The page is organized into sections that can be easily modified:

- Update historical information and timelines
- Add your own favorite destinations
- Customize cuisine recommendations
- Include personal travel tips and experiences

## Deployment

This project is optimized for deployment on Vercel. Remember to:

1. Set the install command to `npm i --legacy-peer-deps`
2. Configure your environment variables
3. Ensure all images are optimized for web

## Getting Help

Full documentation on how to get started on wisp as well as this starter kit is available on [wisp's documentation site](https://www.wisp.blog/docs/next-js-blog-starter-kit/overview?utm_source=github&utm_medium=web&utm_campaign=nextjs-blog-cms-wisp)

## Credits

- Original template by [Wisp CMS](https://github.com/Wisp-CMS/nextjs-blog-cms-wisp)
- Map tiles by [Stamen Design](http://stamen.com)
- Icons by [Lucide](https://lucide.dev)