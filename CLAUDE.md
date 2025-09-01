# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A Next.js 15 travel blog featuring an interactive travel map, comprehensive Spain guide, and blog powered by Wisp CMS. Built with React Server Components, TypeScript, Tailwind CSS, and Shadcn UI.

## Development Commands

```bash
# Install dependencies (MUST use legacy peer deps for React 19)
npm i --legacy-peer-deps

# Development server with Turbopack
npm run dev

# Production build
npm run build

# Start production server  
npm start

# Linting
npm run lint
```

## Architecture

### Core Stack
- **Next.js 15** with App Router and React 19
- **Wisp CMS** (`@wisp-cms/client`) for blog content management  
- **TypeScript** with strict mode and `@/` path alias for `src/`
- **Tailwind CSS** + **Shadcn UI** components
- **Framer Motion** for animations
- **Leaflet** for interactive maps

### Data Flow
1. **Blog Content**: Wisp CMS → `src/lib/wisp.ts` (cached API client) → Server Components
2. **Configuration**: Environment variables → `src/config.ts` → Components
3. **OG Images**: Dynamic generation with signing at `/api/og-image`

### Key Directories
- `src/app/` - App Router pages and API routes
- `src/components/` - Shared components
- `src/components/ui/` - Shadcn UI components  
- `src/lib/` - Utilities, Wisp client, animations
- `src/hooks/` - Custom React hooks

### Route Structure
- `/` - Blog homepage with pagination
- `/blog/[slug]` - Individual blog posts
- `/tag/[slug]` - Posts filtered by tag
- `/map` - Interactive travel map with Leaflet
- `/spain` - Comprehensive Spain travel guide
- `/api/og-image` - Dynamic OG image generation
- `/rss` - RSS feed

### Travel-Specific Components

**TravelMap** (`src/components/TravelMap.tsx`)
- Leaflet map with watercolor tiles
- Custom markers: home (gold pulse), visited (coral), upcoming (teal)
- Animated routes between destinations
- Three view modes: Journey, Story, Mi Casa
- Location details with blog post links

**Spain Guide** (`src/app/spain/page.tsx`)  
- 8 sections: History, Geography, Culture, Cuisine, Destinations, Hidden Gems, Festivals, Travel Tips
- Expandable cards with Framer Motion animations
- Lonely Planet style content organization

**Newsletter System** (`src/components/NewsletterSubscribe.tsx`)
- Email subscription component with inline and card variants
- Available in header (desktop popover), mobile menu, and footer
- Form validation with react-hook-form and Zod
- Success/error state management with animations
- Integrated email service (`src/lib/email.ts`) supporting Gmail and Resend
- API endpoint at `/api/subscribe` with in-memory storage (production needs database)

### Environment Variables

Required in `.env`:
```
NEXT_PUBLIC_BLOG_ID=<wisp-blog-id>  # Required
NEXT_PUBLIC_BLOG_DISPLAY_NAME=<name>
NEXT_PUBLIC_BLOG_COPYRIGHT=<copyright>
NEXT_PUBLIC_BASE_URL=<base-url>
OG_IMAGE_SECRET=<signing-secret>

# Email Configuration (Optional - for newsletter)
GMAIL_USER=<gmail-address>           # Gmail address for sending emails
GMAIL_APP_PASSWORD=<app-password>    # Gmail app-specific password
GMAIL_FROM_NAME=<sender-name>        # Display name for emails
# OR
RESEND_API_KEY=<resend-api-key>      # Resend API key
RESEND_FROM_EMAIL=<from-email>       # Resend from email
# Admin notification email
ADMIN_EMAIL=<admin-email>            # Email to receive subscription notifications
```

### Critical Implementation Details

**React 19 Compatibility**
- Dependencies require `--legacy-peer-deps` flag
- Vercel deployment: Set install command to `npm i --legacy-peer-deps`
- Check `vercel.json` for configuration

**Server Components vs Client Components**
- Default to Server Components (no directive)
- Use `'use client'` for interactivity (maps, animations, forms)
- Wisp data fetching happens in Server Components only

**Wisp Integration Pattern**
- Cached read operations in `src/lib/wisp.ts`
- Uncached write operations (comments)
- Blog ID from environment variable

**Image Handling**
- Remote images from `imagedelivery.net` configured in `next.config.mjs`
- Local images in `public/images/` for travel content
- Next/Image component for optimization

**Styling Hierarchy**
1. Tailwind utility classes
2. Shadcn UI components (`src/components/ui/`)
3. Global styles in `app/globals.css`
4. Component-specific animations via Framer Motion

### Performance Considerations
- Server Components for initial page load
- React.cache() for Wisp API calls
- Dynamic imports for heavy client components (Leaflet)
- Turbopack in development for faster rebuilds