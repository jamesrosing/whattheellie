<document_metadata>
  <version>2.0.0</version>
  <last_modified>2025-01-15</last_modified>
  <model_compatibility>Claude 4+ (Opus 4.1, Sonnet 4.5)</model_compatibility>
  <purpose>AI development guidance for Next.js 15 travel blog project</purpose>
  <optimization>200K context window, extended thinking enabled</optimization>
</document_metadata>

# CLAUDE.md

This file provides comprehensive guidance to Claude Code (claude.ai/code) and other Claude instances when working with code in this repository. It leverages Anthropic's best practices for prompt engineering, long context handling, and extended thinking optimization.

---

## Table of Contents

1. [Claude Interaction Framework](#claude-interaction-framework)
2. [Claude Model Selection](#claude-model-selection)
3. [Extended Thinking Guidelines](#extended-thinking-guidelines)
4. [Long Context Handling](#long-context-handling)
5. [Prompt Chaining Strategies](#prompt-chaining-strategies)
6. [Quick Reference](#quick-reference)
7. [Project Overview](#project-overview)
8. [Project Analysis Summary](#project-analysis-summary)
9. [Gallery Design Reference](#gallery-design-reference)
10. [Development Commands](#development-commands)
11. [Architecture](#architecture)
12. [Environment Variables](#environment-variables)
13. [Critical Implementation Details](#critical-implementation-details)
14. [Design Patterns Used](#design-patterns-used)
15. [API Routes Reference](#api-routes-reference)
16. [Component Architecture](#component-architecture)
17. [Security Implementation](#security-implementation)
18. [Deployment Guide](#deployment-guide)
19. [Application Testing Strategy](#application-testing-strategy)
20. [Technical Debt & Roadmap](#technical-debt--roadmap)

---

## Claude Interaction Framework

<task_description>
  <primary_purpose>
    Assist in developing, maintaining, and enhancing a Next.js 15 travel blog application featuring interactive maps, blog content management via Wisp CMS, and modern React patterns.
  </primary_purpose>

  <success_criteria>
    <criterion>Code changes maintain type safety and TypeScript strict mode compliance</criterion>
    <criterion>Implementations follow existing architectural patterns (Server Components default, explicit Client Components)</criterion>
    <criterion>Performance optimizations preserve or improve Core Web Vitals</criterion>
    <criterion>Security measures (HMAC signing, input validation, sanitization) remain intact</criterion>
    <criterion>All environment variable requirements and deployment constraints are respected</criterion>
    <criterion>Changes are well-documented with clear rationale</criterion>
  </success_criteria>

  <scope_boundaries>
    <included>
      <item>Feature development following Next.js 15 App Router patterns</item>
      <item>Component creation adhering to Server/Client boundary rules</item>
      <item>API route implementation following existing patterns</item>
      <item>Performance optimization and code refactoring</item>
      <item>Bug fixes and troubleshooting</item>
      <item>Testing strategy implementation</item>
      <item>Documentation improvements</item>
    </included>
    <excluded>
      <item>Modifying core Next.js or React configurations without explicit approval</item>
      <item>Removing security measures (signing, validation, sanitization)</item>
      <item>Breaking changes to public APIs or deployment process</item>
      <item>Ignoring React 19 peer dependency requirements</item>
      <item>Bypassing TypeScript strict mode</item>
    </excluded>
  </scope_boundaries>

  <interaction_style>
    <guideline>Be direct and technical - assume senior developer audience</guideline>
    <guideline>Explain reasoning behind architectural decisions</guideline>
    <guideline>Flag potential issues proactively (performance, security, maintainability)</guideline>
    <guideline>Suggest alternatives when constraints exist</guideline>
    <guideline>Use extended thinking for complex architectural decisions</guideline>
    <guideline>Cite specific file locations and line numbers when referencing code</guideline>
  </interaction_style>

  <decision_framework>
    <principle>Preserve existing functionality unless explicitly asked to modify</principle>
    <principle>Follow established patterns over introducing new paradigms</principle>
    <principle>Prioritize type safety and developer experience</principle>
    <principle>Optimize for production readiness and scalability</principle>
    <principle>Maintain consistency with Next.js 15 and React 19 best practices</principle>
  </decision_framework>
</task_description>

---

## Claude Model Selection

<model_guidance>
  <model name="Claude Opus 4.1">
    <best_for>
      <use_case>Complex architectural refactoring (e.g., Newsletter database migration)</use_case>
      <use_case>Multi-file feature implementation (e.g., Gallery Grid Homepage redesign)</use_case>
      <use_case>Deep analysis of technical debt and optimization strategies</use_case>
      <use_case>Extended thinking tasks requiring 16K+ token budgets</use_case>
      <use_case>Creative solutions to constrained problems (React 19 compatibility)</use_case>
    </best_for>
    <context_window>200K tokens - leverage for full codebase analysis</context_window>
  </model>

  <model name="Claude Sonnet 4.5">
    <best_for>
      <use_case>General development tasks (component creation, API routes)</use_case>
      <use_case>Bug fixes and debugging</use_case>
      <use_case>Documentation updates</use_case>
      <use_case>Code review and suggestions</use_case>
      <use_case>Balanced performance for most development workflows</use_case>
    </best_for>
    <context_window>200K tokens - efficient for targeted tasks</context_window>
  </model>

  <selection_strategy>
    For tasks in the Technical Debt & Roadmap:
    - Priority 1 (Gallery Grid redesign): Use Opus 4.1 with extended thinking
    - Priority 2 (DB migration, testing): Use Opus 4.1 for planning, Sonnet 4.5 for implementation
    - Priority 3-4 (features, enhancements): Use Sonnet 4.5

    For debugging and troubleshooting: Start with Sonnet 4.5, escalate to Opus 4.1 if complexity exceeds expectations.
  </selection_strategy>
</model_guidance>

---

## Extended Thinking Guidelines

<extended_thinking>
  <thinking_budget>
    <minimum>1024 tokens (simple component changes)</minimum>
    <recommended>
      <range tokens="1000-5000">Straightforward feature additions</range>
      <range tokens="5000-16000">Architectural decisions, multi-component features</range>
      <range tokens="16000-32000">Deep refactoring, complex optimizations</range>
    </recommended>
    <note>Use batch processing for tasks exceeding 32K tokens to avoid timeouts</note>
  </thinking_budget>

  <prompting_strategy>
    <general_instructions>
      Think thoroughly about this implementation in great detail.
      Consider multiple approaches and show complete reasoning.
      Try different solutions if your first approach hits constraints.
      Verify your work against existing patterns in the codebase.
    </general_instructions>

    <self_verification>
      After generating code, verify:
      1. TypeScript strict mode compliance (no 'any' types without justification)
      2. Proper Server/Client boundary placement
      3. React 19 compatibility (no deprecated APIs)
      4. Existing architectural pattern adherence
      5. Security measures preserved (validation, sanitization, signing)
    </self_verification>
  </prompting_strategy>

  <best_use_cases>
    <use_case priority="high">
      <task>Gallery Grid Homepage Redesign (Technical Debt Priority 1)</task>
      <complexity>High - requires design system translation, component creation, Server/Client coordination</complexity>
      <token_budget>12000-16000</token_budget>
      <reasoning>Multiple design decisions, responsive behavior, image optimization strategy</reasoning>
    </use_case>

    <use_case priority="high">
      <task>Newsletter Database Migration (Technical Debt Priority 2)</task>
      <complexity>High - schema design, migration strategy, API refactoring, error handling</complexity>
      <token_budget>16000-24000</token_budget>
      <reasoning>Database selection, data modeling, backward compatibility, testing strategy</reasoning>
    </use_case>
  </best_use_cases>
</extended_thinking>

---

## Long Context Handling

<long_context_strategy>
  <critical_rule>
    ⚠️ DOCUMENT PLACEMENT: When providing long documents (20K+ tokens) like design specifications or API documentation, place them at the TOP of the prompt before instructions or queries. This improves response quality by up to 30%.
  </critical_rule>

  <optimal_structure>
    <order>
      <step number="1">Long documents (design specs, code files, logs)</step>
      <step number="2">High-level instructions</step>
      <step number="3">Specific query or task</step>
      <step number="4">Examples (if needed)</step>
    </order>
  </optimal_structure>

  <quote_grounding_technique>
    <description>
      Before executing complex tasks involving long documents, request relevant quotes to help focus attention on key details.
    </description>

    <example>
      When implementing Gallery Grid Homepage:

      Prompt: "First, extract and quote all relevant specifications from the Gallery Design Reference section regarding:
      1. Grid column configurations
      2. Responsive breakpoint strategies
      3. Typography system for card titles
      4. Hover interaction patterns

      Then, use these quotes to guide the implementation."

      Benefit: Reduces noise in 200K context window, ensures critical details aren't missed.
    </example>
  </quote_grounding_technique>

  <codebase_context>
    <note>
      This CLAUDE.md file is comprehensive (~8000+ lines). When working with specific features:
      1. Read the full document once to understand overall architecture
      2. For subsequent queries, use quote grounding to reference specific sections
      3. Cross-reference related sections (see Table of Contents)
    </note>
  </codebase_context>
</long_context_strategy>

---

## Prompt Chaining Strategies

<prompt_chaining>
  <overview>
    Complex tasks should be broken into sequential prompts, each with a single clear objective. This reduces errors, simplifies debugging, and enables self-correction loops.
  </overview>

  <common_chain_patterns>
    <pattern name="Feature Implementation">
      <step number="1">Research & Design - Analyze requirements, review existing patterns</step>
      <step number="2">Component Structure - Define component hierarchy and props</step>
      <step number="3">Implementation - Write code following established patterns</step>
      <step number="4">Testing Strategy - Define test cases and validation</step>
      <step number="5">Documentation - Update relevant docs and comments</step>

      <example_task>Gallery Grid Homepage Redesign</example_task>
    </pattern>

    <pattern name="Debugging & Troubleshooting">
      <step number="1">Gather Information - Collect error messages, logs, context</step>
      <step number="2">Isolate Issue - Narrow down to specific component/function</step>
      <step number="3">Root Cause Analysis - Identify underlying problem</step>
      <step number="4">Solution Design - Propose fix with minimal side effects</step>
      <step number="5">Verification - Confirm fix resolves issue without introducing regressions</step>

      <example_task>React 19 Peer Dependency Conflicts</example_task>
    </pattern>
  </common_chain_patterns>
</prompt_chaining>

---

## Quick Reference

<quick_reference>
  <common_tasks>
    <task>
      <question>How do I add a new page/route?</question>
      <answer>See Architecture → Route Structure. Create new folder in src/app/ with page.tsx (Server Component) or page.client.tsx pattern.</answer>
    </task>

    <task>
      <question>How do I determine if a component should be Server or Client?</question>
      <answer>See Component Architecture → Server vs Client Boundaries. Default to Server Component unless you need interactivity, browser APIs, or DOM-dependent libraries.</answer>
    </task>

    <task>
      <question>How do I fetch blog content from Wisp CMS?</question>
      <answer>See Architecture → Data Flow and Critical Implementation Details → Wisp Integration Pattern. Use cached methods from src/lib/wisp.ts in Server Components only.</answer>
    </task>

    <task>
      <question>How do I fix React 19 peer dependency errors?</question>
      <answer>See Critical Implementation Details → React 19 Compatibility. Always use npm i --legacy-peer-deps. Update Vercel install command if deploying.</answer>
    </task>
  </common_tasks>

  <critical_notes>
    <note>⚠️ React 19 requires --legacy-peer-deps flag for all npm installs</note>
    <note>⚠️ Newsletter uses in-memory storage - data lost on restart</note>
    <note>⚠️ Server Components by default - only add 'use client' when necessary</note>
    <note>⚠️ OG_IMAGE_SECRET must remain server-side - never expose in client</note>
    <note>⚠️ Wisp data fetching only in Server Components</note>
  </critical_notes>
</quick_reference>

---

## Project Overview

A Next.js 15 travel blog featuring an interactive travel map, comprehensive Spain guide, and blog powered by Wisp CMS. Built with React Server Components, TypeScript, Tailwind CSS, and Shadcn UI.

## Project Analysis Summary

```yaml
Project: whattheellie (geek-wisp)
Version: 0.1.0
Type: Travel Blog Web Application
Status: Production-ready with identified enhancements

Technology_Stack:
  Core:
    Framework: Next.js 15.1.6
    Runtime: React 19.0.0
    Language: TypeScript 5 (strict mode)
    Styling: Tailwind CSS 3.4.7 + @tailwindcss/typography

  Frontend:
    UI_Library: Radix UI (comprehensive component primitives)
    Component_System: Shadcn UI (18 custom components)
    Animations: Framer Motion 12.23.12
    Icons: Lucide React 0.424.0
    Theme: next-themes 0.3.0 (dark mode)

  Backend:
    CMS: Wisp CMS (@wisp-cms/client 0.0.22)
    Email: Nodemailer 7.0.5 + Resend 6.0.1
    RSS: rss 1.2.2
    Validation: Zod 3.24.1

  Maps:
    Primary: Leaflet 1.9.4 + leaflet.markercluster
    Secondary: Mapbox GL 3.14.0 + react-map-gl

  Forms:
    Library: React Hook Form 7.54.2
    Resolver: @hookform/resolvers 3.10.0
    Validation: Zod schemas

  State_Management:
    Client: React Query (@tanstack/react-query 5.64.2)
    Server: React.cache() + Server Components

Quality_Metrics:
  TypeScript_Files: 74
  Test_Coverage: 0% (Critical gap - requires test suite)
  Documentation: Excellent (comprehensive CLAUDE.md)
  Type_Safety: Strong (TypeScript strict mode)
  Code_Complexity: Moderate (standard Next.js patterns)

Architecture_Patterns:
  - Hybrid Server/Client rendering (Server Components default)
  - Singleton pattern (Wisp client, Email service)
  - Factory pattern (Email provider selection)
  - Observer pattern (Newsletter notifications)
  - Container/Presenter pattern (Server data fetch, Client interactivity)
  - HOC pattern (Theme provider, Form provider)

Component_Inventory:
  Pages: 6 main routes (home, blog, tag, map, spain, admin)
  API_Routes: 8 endpoints (subscribe, og-image, webhook, test-email, rss)
  UI_Components: 18 Shadcn components (Alert, Badge, Button, Card, etc.)
  Feature_Components: 15+ custom (Header, Footer, TravelMap, etc.)

Dependencies_Summary:
  Total: 33 production + 13 dev dependencies
  Critical_Note: React 19 requires --legacy-peer-deps flag
  External_Services: Wisp CMS, imagedelivery.net CDN, Gmail/Resend

Security_Implementation:
  - HMAC-SHA256 OG image signing
  - Zod email validation
  - Content sanitization (sanitize-html)
  - Server-side secrets protection
  - Missing: API rate limiting, CSRF protection

Deployment_Status:
  Platform: Vercel-optimized
  Build: Requires --legacy-peer-deps
  Critical_Issue: In-memory newsletter storage (not production-scale)
  Environment_Vars: 9 required/recommended variables
```

## Gallery Design Reference

### Design System (from fal project templates)

The following design patterns are referenced from `/mnt/d/projects/fal/app/style-guide/templates/placeholders/` for the upcoming gallery grid homepage transformation.

**Typography System**
```yaml
Primary_Font: font-garamond (serif, elegant)
Weight: font-light (300) for sophistication
Tracking: tracking-normal (default letter-spacing)
Heading_Sizes:
  Hero: text-4xl md:text-6xl
  Section: text-3xl
  Card_Title: text-xl md:text-2xl
  Body: text-lg md:text-xl
  Meta: text-xs text-gray-500
```

**Grid Specifications**
```yaml
Collections_Grid:
  Columns: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
  Aspect_Ratio: aspect-[4/5] (portrait)
  Gap: gap-8
  Use_Case: High-level category cards

Albums_Grid:
  Columns: grid-cols-2 md:grid-cols-3 lg:grid-cols-4
  Aspect_Ratio: aspect-[3/4] (vertical)
  Gap: gap-6
  Use_Case: Album/collection items

Photos_Grid:
  Columns: grid-cols-2 md:grid-cols-4
  Aspect_Ratio: aspect-square
  Gap: gap-4
  Use_Case: Image gallery, blog post thumbnails
```

**Interaction Patterns**
```yaml
Hover_Overlay:
  Gradient: from-primary-500/20 to-transparent
  Initial_State: opacity-0
  Hover_State: opacity-100
  Transition: transition-opacity duration-300

Background_Overlays:
  Dark: bg-black/40
  Hover_Dark: bg-black/40
  Gradient_Fade: bg-gradient-to-t from-black/60 to-transparent

Card_States:
  Default: bg-gray-200 dark:bg-zinc-800
  Hover: group-hover:opacity-100
  Cursor: cursor-pointer
  Border: rounded-lg
```

**Hero Section Pattern**
```yaml
Height: h-[40vh] md:h-[50vh] (or h-[60vh] for home)
Background: bg-gradient-to-br from-gray-900 to-black
Overlay: absolute inset-0 bg-black/40
Bottom_Fade: h-1/4 bg-gradient-to-t from-black/60
Content_Position: absolute inset-0 flex items-center justify-center
Text_Color: text-white with gray-200 for subtitles
```

**Layout Patterns**
```yaml
Container: container mx-auto px-4 py-12
Section_Spacing: space-y-16 (major sections)
Heading_Margin: mb-8
Navigation:
  Back_Button: flex items-center gap-2
  Icon: ArrowLeft w-4 h-4
  Hover: hover:text-gray-900 dark:hover:text-white

Responsive_Strategy:
  Mobile_First: Base styles for mobile (320px+)
  Tablet: md: prefix (768px+)
  Desktop: lg: prefix (1024px+)
  Pattern: 1-2 cols → 2-3 cols → 3-4 cols
```

**Empty State Pattern**
```yaml
Container: py-16 bg-gray-50 dark:bg-zinc-900 rounded-lg
Border: border border-gray-200 dark:border-gray-800
Icon: w-16 h-16 text-gray-400 mx-auto mb-4
Heading: text-2xl font-light font-garamond
Body: text-gray-600 dark:text-gray-400
```

**Reference Files**
- GalleryHomeTemplate.tsx - Multi-section gallery (Collections, Albums, Discover)
- AlbumDetailTemplate.tsx - Photo grid with hero and back navigation
- CollectionDetailTemplate.tsx - Album grid with category organization

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

## Design Patterns Used

### Singleton Pattern
- **Wisp Client** (`src/lib/wisp.ts:11`) - Single instance with cached methods
- **Email Service** (`src/lib/email.ts:113`) - Singleton for email provider management

### Factory Pattern
- **Email Provider Selection** (`src/lib/email.ts:18-36`) - Auto-selects Gmail/Resend/None based on env vars

### Observer Pattern
- **Newsletter Subscriptions** (`src/app/api/subscribe/route.ts`) - Admin notifications on new subscribers

### Container/Presenter Pattern
- **Server/Client Split** - Server Components fetch data, Client Components handle interactivity
- Example: `src/app/spain/page.tsx:5` (Server) → `src/app/spain/SpainPageClient.tsx` (Client)

### HOC Pattern
- **Theme Provider** (`src/app/providers.tsx`) - Wraps app for dark mode
- **Form Provider** (react-hook-form) - Wraps forms for validation

## API Routes Reference

### Public APIs
- **POST /api/subscribe** - Newsletter subscription (email validation, welcome email)
- **GET /api/subscribe?token={token}** - Verify email subscription
- **DELETE /api/subscribe?token={token}** - Unsubscribe from newsletter
- **GET /api/subscribe/stats** - Subscription metrics (admin)
- **GET /api/og-image** - Dynamic OG image generation with signed URLs
- **GET /api/test-email** - Email service testing endpoint
- **GET /rss** - RSS feed generation
- **POST /api/webhook/new-post** - Wisp CMS webhook for new posts

### Route Handlers
All API routes use Next.js 15 Route Handlers (not Pages API). Request/response use `NextRequest`/`NextResponse`.

**IMPORTANT**: Newsletter storage is in-memory (`src/app/api/subscribe/route.ts:18`). Data lost on restart. Production requires database.

## Component Architecture

### Component Hierarchy
```
RootLayout (src/app/layout.tsx)
├── Providers (Theme, React Query)
├── Header (src/components/Header.tsx)
│   ├── Navigation (Desktop/Mobile)
│   ├── NewsletterSubscribe (Popover)
│   └── DarkModeToggle
├── Page Content (Server Components)
│   ├── BlogPostsPreview (src/components/BlogPostPreview.tsx)
│   ├── BlogPostContent (src/components/BlogPostContent.tsx)
│   │   ├── CommentSection (src/components/CommentSection.tsx)
│   │   └── RelatedPosts (src/components/RelatedPosts.tsx)
│   ├── TravelMap (src/components/TravelMap.tsx) - Client Component
│   └── SpainPageClient (src/app/spain/SpainPageClient.tsx) - Client Component
└── Footer (src/components/Footer.tsx)
    └── NewsletterSubscribe (Card variant)
```

### Server vs Client Boundaries
**Server Components** (default):
- All page.tsx files start as Server
- Data fetching with Wisp CMS
- SEO metadata generation
- Static content rendering

**Client Components** (`'use client'`):
- Interactive maps (Leaflet, Mapbox)
- Forms with validation
- Animations with Framer Motion
- Theme toggle, navigation state
- Modal/dialog interactions

**Rule**: Keep Server Components at top level. Only add `'use client'` when you need:
- useState, useEffect, event handlers
- Browser-only APIs (window, localStorage)
- Third-party libraries requiring DOM

## Security Implementation

### OG Image Signing
**Location**: `src/lib/og-image.ts`
- HMAC-SHA256 signing prevents unauthorized image generation
- Signature validates title/brand parameters
- Secret from `OG_IMAGE_SECRET` env var
- Prevents abuse of image generation endpoint

### Email Validation
**Location**: `src/app/api/subscribe/route.ts:26-31`
- Zod schema validation in `NewsletterSubscribe.tsx:14-16`
- Email normalization (lowercase)
- Duplicate subscription check
- No SQL injection risk (in-memory Map)

**IMPORTANT**: Production database implementation MUST use parameterized queries or ORM.

### Content Sanitization
**Location**: Dependencies include `sanitize-html`
- Used for rendering user-generated content
- Prevents XSS attacks in comments
- Wisp CMS handles sanitization for blog posts

### Environment Variables
- Never expose secrets in client components
- Use `NEXT_PUBLIC_*` prefix only for truly public values
- OG_IMAGE_SECRET must remain server-side
- Email credentials never sent to client

## Deployment Guide

### Vercel Configuration

**Install Command** (CRITICAL):
```bash
npm i --legacy-peer-deps
```

**Why**: React 19 has peer dependency conflicts with older packages. Without `--legacy-peer-deps`, build fails.

**vercel.json** (if needed):
```json
{
  "buildCommand": "npm i --legacy-peer-deps && npm run build",
  "installCommand": "npm i --legacy-peer-deps"
}
```

### Environment Variables Checklist
Required:
- [x] `NEXT_PUBLIC_BLOG_ID` - From Wisp CMS dashboard
- [x] `OG_IMAGE_SECRET` - Generate with `openssl rand -hex 32`

Recommended:
- [x] `NEXT_PUBLIC_BASE_URL` - Your production domain
- [x] `NEXT_PUBLIC_BLOG_DISPLAY_NAME` - Blog name
- [x] `NEXT_PUBLIC_BLOG_COPYRIGHT` - Copyright text

Email (choose one):
- [ ] Gmail: `GMAIL_USER`, `GMAIL_APP_PASSWORD`, `GMAIL_FROM_NAME`
- [ ] Resend: `RESEND_API_KEY`, `RESEND_FROM_EMAIL`
- [x] `ADMIN_EMAIL` - Receives subscription notifications

**IMPORTANT**: Set email provider OR newsletter feature won't send emails (falls back to console logging).

### Common Deployment Issues

**Build fails with peer dependency errors**
- Solution: Add `--legacy-peer-deps` to install command

**Newsletter emails not sending**
- Check email provider env vars are set
- Verify Gmail app password (not regular password)
- Check Vercel logs for email service errors

**OG images show verification failed**
- Ensure `OG_IMAGE_SECRET` matches between environments
- Check URL signature isn't truncated

**Images not loading**
- Verify `imagedelivery.net` in `next.config.mjs:7`
- Check Wisp CMS image URLs are valid

### Deployment Checklist
1. Set all required environment variables
2. Configure install command with `--legacy-peer-deps`
3. Test email functionality in preview deployment
4. Verify OG images generate correctly
5. Check newsletter subscription flow
6. Test mobile responsiveness
7. Validate dark mode toggle
8. Confirm RSS feed accessible

## Testing Strategy

### Current State
**No test suite configured** - Technical debt priority 1

### Recommended Setup
```bash
# Install testing dependencies
npm i --save-dev vitest @testing-library/react @testing-library/jest-dom @vitejs/plugin-react

# Add to package.json scripts
"test": "vitest"
"test:ui": "vitest --ui"
```

### Testing Priorities

**Priority 1 - Critical Paths**:
1. Newsletter subscription flow (`NewsletterSubscribe.tsx`)
2. Email service provider selection (`src/lib/email.ts`)
3. Wisp client caching behavior (`src/lib/wisp.ts`)
4. OG image signing/validation (`src/lib/og-image.ts`)

**Priority 2 - Component Testing**:
5. Blog post rendering (`BlogPostContent.tsx`)
6. Navigation state management (`Header.tsx`)
7. Form validation (react-hook-form + Zod)
8. Dark mode toggle functionality

**Priority 3 - Integration Testing**:
9. API route handlers (`/api/subscribe/route.ts`)
10. RSS feed generation (`/rss/route.ts`)
11. Server Component data fetching
12. Error boundaries and fallbacks

### Testing Patterns
- **Unit Tests**: Utilities, helpers, pure functions
- **Component Tests**: UI components with Testing Library
- **Integration Tests**: API routes with MSW (Mock Service Worker)
- **E2E Tests**: Critical user flows with Playwright (future)

## Technical Debt & Roadmap

### Priority 1 - Critical UX Transformation
1. **Gallery Grid Homepage Redesign**
   - Current: Linear blog list with text-heavy layout
   - Issue: Lacks visual impact for travel blog, doesn't showcase imagery
   - Desired Outcome: Visual-first gallery grid using post thumbnails
   - Reference: GalleryHomeTemplate.tsx from fal project (`/mnt/d/projects/fal/app/style-guide/templates/placeholders/`)
   - Design System:
     * 4-column responsive square grid (grid-cols-2 md:grid-cols-4 gap-4)
     * Extract first image from Wisp post (post.image field)
     * Hover overlays with gradient (from-primary-500/20) + title
     * Typography: Garamond font-light for elegance
     * Aspect ratio: aspect-square for consistency
     * Dark mode support via existing theme system
   - Implementation Details:
     * Update `src/app/page.tsx` - Server Component fetches posts
     * Create `src/components/BlogPostGridItem.tsx` - Client Component for grid cards
     * Maintain existing pagination with `BlogPostsPagination.tsx`
     * Preserve SEO metadata and semantic HTML
     * Add loading states with `BlogPostSkeleton.tsx` adapted for grid
     * Implement Next/Image optimization for thumbnails
   - Dependencies:
     * Verify/add Garamond font (may need to import via next/font/google)
     * Ensure primary color configured in tailwind.config
     * Test with imagedelivery.net CDN images
   - Accessibility:
     * Add ARIA labels for grid items
     * Keyboard navigation support
     * Alt text from post.title or post.description
   - Files:
     * Modify: `src/app/page.tsx`
     * Create: `src/components/BlogPostGridItem.tsx`
     * Optional: `src/components/BlogPostGridSkeleton.tsx`
     * Config: Verify tailwind.config.js has primary color
   - Effort: 3-4 hours
   - Impact: **High** - Transforms UX from text-heavy to visual-first, aligns with travel blog aesthetic
   - **NOTE**: Do not implement yet - documentation only per user request

### Priority 2 - Critical Infrastructure (Blocks Production Scale)
2. **Newsletter Database Migration**
   - Current: In-memory storage (`src/app/api/subscribe/route.ts:18`)
   - Issue: Data lost on restart, no persistence
   - Solution: Migrate to Supabase/PlanetScale/Postgres
   - Effort: 2-3 hours
   - Files: `src/app/api/subscribe/route.ts`, add DB schema

3. **Test Suite Implementation**
   - Current: Zero test coverage
   - Issue: No safety net for refactoring
   - Solution: Add Vitest + Testing Library
   - Effort: 4-6 hours initial setup
   - Target: 60%+ coverage on critical paths

4. **Error Monitoring**
   - Current: Console logging only
   - Issue: No visibility into production errors
   - Solution: Add Sentry or similar
   - Effort: 1-2 hours
   - Files: `src/app/layout.tsx`, error boundaries

### Priority 3 - Important (Production Ready)
5. **Email Unsubscribe Links**
   - Current: DELETE endpoint exists but no UI
   - Issue: GDPR compliance, user frustration
   - Solution: Add unsubscribe link to emails
   - Effort: 1-2 hours
   - Files: `src/lib/email.ts:79-96`, create unsubscribe page

6. **API Rate Limiting**
   - Current: No rate limits on `/api/subscribe`
   - Issue: Spam subscriptions, abuse potential
   - Solution: Add rate limiting middleware
   - Effort: 2-3 hours
   - Consider: Upstash Rate Limit or Vercel KV

7. **Enhanced Error Boundaries**
   - Current: Basic Next.js error.tsx
   - Issue: Poor UX on component failures
   - Solution: Granular error boundaries per section
   - Effort: 2-3 hours
   - Files: Add to `src/components/`, update layouts

8. **Web Analytics**
   - Current: No analytics
   - Issue: No visibility into user behavior
   - Solution: Add Plausible or Fathom
   - Effort: 1 hour
   - Privacy-focused, no cookies needed

### Priority 4 - Nice to Have (Enhancements)
9. **React Query Integration**
   - Current: Relies on React.cache() only
   - Benefit: Better client-side caching, refetching
   - Effort: 3-4 hours
   - Consider: May be overkill for current scale

10. **Internationalization (i18n)**
    - Current: English only
    - Benefit: Reach Spanish-speaking audience
    - Effort: 8-12 hours (significant)
    - Solution: next-intl or next-i18next

11. **PWA Features**
    - Current: Standard web app
    - Benefit: Offline reading, app-like experience
    - Effort: 4-6 hours
    - Files: Add service worker, manifest.json

12. **Image Optimization**
    - Current: Next/Image with remote patterns
    - Benefit: WebP/AVIF, lazy loading improvements
    - Effort: 2-3 hours
    - Consider: Cloudinary or Imgix integration

13. **SEO Enhancements**
    - Current: Basic metadata, sitemap
    - Benefit: Better discoverability
    - Effort: 2-3 hours
    - Add: JSON-LD breadcrumbs, FAQ schema, article schema

### Technical Debt Metrics
- **Total TypeScript Files**: 74
- **Source Size**: 444KB
- **Test Coverage**: 0%
- **Known Issues**: 13 items (1 new UX transformation + 12 existing)
- **Estimated Effort**: 38-54 hours to address all (3-4 hours added for gallery grid)

### Roadmap Recommendation
**Phase 0** (Immediate): Priority 1 - Gallery Grid Homepage (UX transformation)
**Phase 1** (Week 1): Priority 2 items (database, testing foundation, monitoring)
**Phase 2** (Week 2): Priority 3 items (production readiness)
**Phase 3** (Month 2): Priority 4 items (enhancements based on usage data)

**Rationale for Priority 1 Gallery Grid**:
- Travel blogs are inherently visual - current text-heavy layout undersells content
- Users expect Pinterest/Instagram-style browsing for travel content
- First impressions matter - gallery grid provides immediate visual engagement
- Easy to implement (3-4 hours) with high impact on user experience
- Leverages existing Wisp CMS data (post images already available)