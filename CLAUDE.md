# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 blog application using React Server Components and Wisp CMS for content management. The project uses TypeScript, Tailwind CSS, Shadcn UI components, and follows the App Router pattern.

## Development Commands

```bash
# Install dependencies (React 19 compatibility issue requires legacy peer deps)
npm i --legacy-peer-deps

# Development server with Turbopack
npm run dev

# Production build
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## Environment Setup

Create a `.env` file with:
```
NEXT_PUBLIC_BLOG_ID=<your-wisp-blog-id>
NEXT_PUBLIC_BLOG_DISPLAY_NAME=<optional>
NEXT_PUBLIC_BLOG_COPYRIGHT=<optional>
NEXT_PUBLIC_BASE_URL=<optional>
OG_IMAGE_SECRET=<optional>
```

The `NEXT_PUBLIC_BLOG_ID` is required and obtained from Wisp CMS setup.

## Architecture

### Core Structure
- **App Router**: All routes in `src/app/` using Next.js 15 App Router patterns
- **Server Components**: Default to RSC, client components marked with "use client"
- **Data Fetching**: Wisp CMS client (`@wisp-cms/client`) for blog content
- **Styling**: Tailwind CSS with Shadcn UI component library

### Key Paths
- `src/app/`: App Router pages and API routes
- `src/components/`: Reusable components (UI components in `ui/` subdirectory)
- `src/lib/`: Utilities and Wisp client configuration
- `src/config.ts`: Central configuration file

### Important Patterns
- **Wisp Integration**: Configured in `src/lib/wisp.ts`, uses environment variable for blog ID
- **Open Graph Images**: Dynamic generation via `src/app/api/og-image/` with signing mechanism
- **Theming**: Dark mode support via `next-themes` provider
- **Component Library**: Shadcn UI components are in `src/components/ui/`

### Key Routes
- `/`: Blog post listing with pagination
- `/blog/[slug]`: Individual blog post pages
- `/tag/[slug]`: Posts filtered by tag
- `/about`: About page
- `/api/og-image`: Dynamic OG image generation
- `/rss`: RSS feed generation

## Important Notes

- **React 19 Compatibility**: The project uses React 19 with some dependencies requiring `--legacy-peer-deps` flag
- **Image Optimization**: Remote images from `imagedelivery.net` are configured in `next.config.mjs`
- **TypeScript**: Strict mode enabled with path alias `@/` for `src/` directory
- **Deployment**: When deploying to Vercel, ensure install command uses `npm i --legacy-peer-deps`