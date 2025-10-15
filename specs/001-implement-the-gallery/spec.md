# Feature Specification: Gallery Grid Homepage

**Feature Branch**: `001-implement-the-gallery`
**Created**: 2025-01-15
**Status**: Draft
**Input**: User description: "implement the gallery grid as landing page using the first image of each blog post as the thumbnail image on the grid."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Visual Blog Discovery Through Image Grid (Priority: P1)

A visitor lands on the homepage and wants to discover travel blog posts through a visual-first interface. They see a responsive grid of square thumbnail images, each representing a blog post. They can hover over images to see post titles and quickly scan multiple posts at once.

**Why this priority**: This is the core UX transformation that provides immediate value. A visual-first interface is essential for a travel blog where images are the primary content. This can be shipped as a complete MVP that transforms the entire user experience.

**Independent Test**: Can be fully tested by visiting the homepage, observing the grid layout, hovering over thumbnails, and clicking through to blog posts. Delivers immediate value by showcasing travel imagery and improving visual discovery.

**Acceptance Scenarios**:

1. **Given** a visitor loads the homepage, **When** the page renders, **Then** they see a grid of square thumbnail images (2 columns on mobile, 4 columns on desktop) with minimal gaps between items
2. **Given** a visitor hovers over a thumbnail, **When** the cursor enters the image area, **Then** a gradient overlay fades in and the post title appears centered on the image with elegant typography
3. **Given** a visitor clicks on a thumbnail, **When** the click event fires, **Then** they navigate to the full blog post page with the selected post's content
4. **Given** a visitor scrolls to the bottom of the grid, **When** more posts exist, **Then** pagination controls allow loading additional posts

---

### User Story 2 - Fast Visual Scanning on Mobile Devices (Priority: P2)

A mobile user on a 3G connection wants to quickly browse recent travel posts without waiting for heavy text content to load. They see a compact 2-column grid that loads images progressively and can scroll through dozens of posts efficiently.

**Why this priority**: Mobile performance is critical for travel blogs often accessed while traveling. This builds on P1 by optimizing the grid for mobile constraints. Can be tested independently by accessing the site on mobile devices.

**Independent Test**: Can be fully tested on mobile devices or responsive mode by verifying 2-column layout, checking load times under throttled network conditions, and confirming smooth scrolling performance.

**Acceptance Scenarios**:

1. **Given** a mobile user on 3G, **When** they load the homepage, **Then** the grid renders with 2 columns and images load progressively (blur-up effect)
2. **Given** a mobile user scrolls through the grid, **When** they reach images not yet in viewport, **Then** images lazy-load as they approach the visible area
3. **Given** a mobile user taps a thumbnail, **When** the touch event registers, **Then** they navigate to the post without accidental double-taps or hover state issues

---

### User Story 3 - SEO and Accessibility Preservation (Priority: P3)

A search engine crawler indexes the homepage and screen reader users navigate the gallery. The grid maintains semantic HTML structure, proper alt text, and sufficient metadata for search engines to understand content hierarchy despite the visual-first design.

**Why this priority**: SEO and accessibility are non-negotiable but can be validated after the visual interface works. This ensures the transformation doesn't sacrifice existing SEO performance or accessibility standards.

**Independent Test**: Can be fully tested using Lighthouse accessibility audit, screen reader testing (NVDA/VoiceOver), and verifying search engine metadata remains intact in page source.

**Acceptance Scenarios**:

1. **Given** a screen reader user navigates the grid, **When** they tab through thumbnails, **Then** each image announces the post title and descriptive alt text
2. **Given** a search engine crawler indexes the page, **When** it parses the HTML, **Then** it finds properly structured heading tags, semantic links, and image alt attributes
3. **Given** a visitor with images disabled, **When** they load the page, **Then** they see post titles as text links with descriptions as fallback content

---

### Edge Cases

- What happens when a blog post has no featured image (`post.image` is null/undefined)?
  - System falls back to placeholder image at `/images/placeholder.webp` (already implemented in current BlogPostPreview)

- How does the system handle very long post titles in hover overlays?
  - Titles are truncated with CSS `line-clamp-2` to 2 lines maximum, with ellipsis

- What happens when fewer than 4 posts exist (grid not full)?
  - Grid uses `grid-cols-2 md:grid-cols-4` with auto-placement, allowing partial rows without layout breaks

- How does the grid behave during Wisp CMS API failures?
  - Maintains existing error boundary from page.tsx:44-56, showing "Unable to load posts" message

- What happens when images have different aspect ratios?
  - All images forced to `aspect-square` container with `object-cover` to maintain consistent grid

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST display blog post thumbnails in a responsive grid layout (2 columns mobile, 4 columns desktop)
- **FR-002**: System MUST extract the featured image from each Wisp blog post using the `post.image` field
- **FR-003**: System MUST render all thumbnail images with square aspect ratio (`aspect-square`) regardless of source image dimensions
- **FR-004**: System MUST show post titles on hover with gradient overlay animation
- **FR-005**: System MUST maintain clickable navigation to individual blog posts when thumbnail is clicked
- **FR-006**: System MUST preserve existing pagination functionality (6 posts per page via `POSTS_PER_PAGE` constant)
- **FR-007**: System MUST lazy-load images using Next.js Image component for performance optimization
- **FR-008**: System MUST provide fallback placeholder image when `post.image` is null or undefined
- **FR-009**: System MUST maintain Server Component architecture (no 'use client' directive on page.tsx)
- **FR-010**: System MUST apply Garamond font-light typography for post titles in hover state
- **FR-011**: System MUST implement gradient overlay with `from-primary-500/20 to-transparent` pattern
- **FR-012**: System MUST use `gap-4` spacing between grid items
- **FR-013**: System MUST preserve existing error handling for Wisp API failures
- **FR-014**: System MUST maintain SEO metadata (title, description, OG tags) from current implementation
- **FR-015**: System MUST render semantic HTML with proper heading hierarchy for accessibility

### Key Entities *(include if feature involves data)*

- **BlogPost**: Represents a single travel blog post from Wisp CMS with attributes:
  - `id`: Unique identifier
  - `slug`: URL-friendly identifier for routing
  - `title`: Post headline displayed on hover
  - `image`: Featured image URL (nullable, falls back to placeholder)
  - `description`: Post summary (not displayed in grid, preserved for SEO)
  - `publishedAt`: Publication date (not displayed in grid)
  - `tags`: Array of tag objects (not displayed in grid)

- **GridLayout**: Visual container for blog post thumbnails with attributes:
  - `columns`: Responsive configuration (2 mobile, 4 desktop)
  - `aspectRatio`: Square (1:1) for all thumbnails
  - `gap`: 1rem spacing between items

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Visual discovery performance - Users can scan and identify posts of interest 40% faster than current linear layout (measured by time to first post click in user testing)
- **SC-002**: Mobile performance - Grid renders completely in under 2 seconds on 3G connection (measured via Lighthouse performance audit)
- **SC-003**: Image display reliability - 95% of blog posts display correct featured image without fallback to placeholder (measured by production monitoring)
- **SC-004**: Accessibility compliance - Lighthouse accessibility score remains at 95+ (same as current implementation)
- **SC-005**: Core Web Vitals preservation - LCP (Largest Contentful Paint) remains under 2.5 seconds on desktop and 4 seconds on mobile
- **SC-006**: Click-through rate improvement - Homepage-to-post navigation increases by 25% within first month (measured via analytics)
- **SC-007**: Code quality - Zero TypeScript errors, zero ESLint warnings, production build succeeds
- **SC-008**: Server Component compliance - page.tsx remains Server Component (no 'use client' directive added)

## Design Specifications *(implementation guidance)*

### Typography
- **Post Titles**: `font-garamond text-lg md:text-xl font-light tracking-normal`
- **Hover State**: White text with 100% opacity against gradient overlay
- **Line Clamping**: `line-clamp-2` for titles exceeding 2 lines

### Grid Layout
```tsx
// Desktop (≥768px): 4 columns
// Mobile (<768px): 2 columns
className="grid grid-cols-2 md:grid-cols-4 gap-4"
```

### Thumbnail Styling
```tsx
// Container
className="group relative aspect-square bg-gray-200 dark:bg-zinc-800 rounded-lg overflow-hidden cursor-pointer"

// Image
className="object-cover transition-transform duration-500 group-hover:scale-110"

// Hover Overlay
className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
```

### Animation Specifications
- **Hover Scale**: Images scale from 1.0 to 1.1 (10% zoom) over 500ms
- **Overlay Fade**: Gradient fades from 0 to 100% opacity over 300ms
- **Stagger Load**: Initial page load animates items with 100ms delay between each (existing fade-in-up animation)

## Technical Constraints

### Constitution Compliance

**Server Components First (Principle I)**:
- Gallery grid component MUST remain Server Component
- Only hover interactions use CSS pseudo-classes (no useState)
- Data fetching continues via Wisp client in page.tsx

**TypeScript Strict Mode (Principle II)**:
- All post type definitions use `GetPostsResult["posts"][0]`
- No `any` types permitted
- Nullable `post.image` handled explicitly with fallback

**Performance-First Development (Principle VI)**:
- Images use Next.js Image component with lazy loading
- Grid uses CSS Grid (no JavaScript layout calculations)
- Hover effects use GPU-accelerated transforms (scale, opacity)

**React 19 Compatibility (Principle IV)**:
- No deprecated React APIs
- Server Components syntax matches Next.js 15 patterns
- Async/await for searchParams (already implemented)

### Technology Standards
- **Next.js 15.1.6**: Uses App Router, Image component, Metadata API
- **React 19.0.0**: Server Components default, no client-side state
- **TypeScript 5**: Strict mode, proper typing of Wisp API responses
- **Tailwind CSS 3.4.7**: Utility classes for all styling
- **Wisp CMS Client 0.0.22**: Existing `getPosts()` API with pagination

## Implementation Notes

### Files to Modify
1. **`src/app/page.tsx`** - Homepage Server Component (minimal changes)
2. **`src/components/BlogPostPreview.tsx`** - Complete restructure for gallery grid
3. **`src/app/globals.css`** - May need hover animation keyframes (optional)

### Files to Create
None - all changes are modifications to existing components

### Considerations
- Current pagination (6 posts per page) may need adjustment for grid aesthetic (consider 8 or 12 posts for cleaner rows)
- Tags are removed from grid view but remain on individual post pages
- Post descriptions remain in metadata for SEO but not visible in grid
- Dark mode support already exists via Tailwind dark: variants

## Out of Scope

The following are explicitly **NOT** included in this specification:

- Filtering posts by tags from homepage grid
- Search functionality within grid
- Infinite scroll (pagination controls remain)
- Masonry layout with variable heights
- Lightbox/modal view for images
- Image galleries within posts (separate feature)
- Video thumbnail support
- Admin dashboard for managing featured images
- A/B testing framework for grid variants

## Assumptions

1. All blog posts from Wisp CMS have `post.image` field available (nullable)
2. Featured images from Wisp are optimized for web (reasonable file sizes)
3. Placeholder image at `/images/placeholder.webp` exists and is suitable for travel blog aesthetic
4. Users expect hover interactions on desktop (common pattern for image grids)
5. Mobile users expect tap-to-navigate without hover states
6. Current pagination UI components work with gallery grid layout
7. Wisp API response time remains consistent (< 500ms average)
8. Dark mode theme colors (`dark:bg-zinc-800`, `dark:text-white`) provide sufficient contrast

## Validation Checklist

- [x] All user stories have assigned priorities (P1, P2, P3)
- [x] Each user story is independently testable
- [x] Edge cases cover null images, long titles, API failures
- [x] Functional requirements are specific and measurable
- [x] Success criteria define observable outcomes
- [x] Design specifications match fal template patterns
- [x] Technical constraints reference constitution principles
- [x] Implementation notes identify exact files to modify
- [x] Out of scope section prevents scope creep
- [x] Assumptions document dependencies and expectations
