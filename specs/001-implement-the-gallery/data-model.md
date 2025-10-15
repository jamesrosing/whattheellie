# Data Model: Gallery Grid Homepage

**Feature**: Gallery Grid Homepage
**Branch**: `001-implement-the-gallery`
**Date**: 2025-01-15

## Overview

This feature is a **pure frontend transformation** with NO data model changes. It modifies the presentation layer only, using existing Wisp CMS data structures.

## Existing Entities (No Changes)

### BlogPost (from Wisp CMS)

**Source**: `@wisp-cms/client` package, accessed via `src/lib/wisp.ts`
**Type Definition**: `GetPostsResult["posts"][0]`

```typescript
interface BlogPost {
  id: string;              // Unique identifier from Wisp CMS
  slug: string;            // URL-friendly identifier for routing
  title: string;           // Post headline (displayed on hover in gallery)
  image: string | null;    // Featured image URL (nullable, falls back to placeholder)
  description: string;     // Post summary (NOT displayed in grid, preserved for SEO)
  publishedAt: Date;       // Publication date (NOT displayed in grid)
  updatedAt: Date;         // Last modified date
  tags: Tag[];             // Array of tag objects (NOT displayed in grid)
}

interface Tag {
  id: string;
  name: string;
}
```

**Usage in Gallery Grid**:
- ✅ `id`: React key for grid items
- ✅ `slug`: Navigation target (`/blog/${post.slug}`)
- ✅ `title`: Displayed on hover overlay
- ✅ `image`: Primary thumbnail source (or placeholder)
- ⚠️ `description`: Hidden in grid UI, preserved in HTML for SEO
- ⚠️ `publishedAt`: Not displayed in gallery view
- ⚠️ `tags`: Not displayed in gallery view

### GridLayout (UI-only concept)

**NOT a data entity** - purely a visual container configuration

```typescript
// Conceptual model (not persisted)
type GridLayout = {
  columns: {
    mobile: 2;    // grid-cols-2
    desktop: 4;   // md:grid-cols-4
  };
  aspectRatio: '1:1';  // aspect-square
  gap: '1rem';         // gap-4 (Tailwind)
};
```

## Data Flow

### Current (Linear Blog List)

```
Wisp CMS API → getPosts({ limit: 6, page: N }) → BlogPostsPreview
  ↓
BlogPostPreview (16:9 image + text metadata)
  ↓
User sees: Image, Title, Date, Description, Tags
```

### New (Gallery Grid)

```
Wisp CMS API → getPosts({ limit: 6, page: N }) → BlogPostsPreview
  ↓
BlogPostPreview (1:1 image + hover overlay)
  ↓
User sees: Square thumbnail only
  ↓ (on hover)
User sees: Title overlay on gradient
```

**Data Changes**: None
**Presentation Changes**: Everything

## Validation Rules (Unchanged)

### Image Field Validation
- **Rule**: `post.image` can be null/undefined
- **Handling**: Fall back to `/images/placeholder.webp`
- **Location**: BlogPostPreview.tsx:26 (existing implementation)

### Title Length Validation
- **Rule**: No server-side truncation (Wisp CMS provides full titles)
- **Handling**: CSS truncation via `line-clamp-2` (visual only)
- **Rationale**: Preserves full title in HTML for accessibility/SEO

## State Management

**None required** - This is a stateless Server Component feature.

### Pagination State
- **Current**: URL search params (`?page=2`)
- **New**: Unchanged (existing implementation preserved)
- **Location**: src/app/page.tsx:14-19

### Hover State
- **Implementation**: CSS pseudo-classes (`:hover`)
- **State storage**: None (ephemeral browser rendering)
- **No JavaScript**: Maintains Server Component architecture

## Caching Strategy (Unchanged)

### Wisp API Response Caching
- **Implementation**: React.cache() wrapper in src/lib/wisp.ts:18
- **Behavior**: Deduplicates identical API calls within single request
- **Scope**: Server-side only (per-request cache)
- **No changes required**: Gallery grid benefits from existing caching

## Database Schema

**N/A** - This project uses Wisp CMS (external headless CMS). No local database exists.

## API Contracts

**N/A** - No API changes. This feature consumes existing Wisp CMS endpoints without modification.

## Type Safety

### TypeScript Strict Mode Compliance

All types derived from Wisp CMS client package:

```typescript
// Existing type (no changes)
import { GetPostsResult } from "@/lib/wisp";

type BlogPost = GetPostsResult["posts"][0];

// Component prop types (existing)
interface BlogPostPreviewProps {
  post: BlogPost;
  index?: number;
}

interface BlogPostsPreviewProps {
  posts: BlogPost[];
  className?: string;
}
```

**No `any` types** - All types are inferred from `@wisp-cms/client` package types.

## Migration Strategy

**N/A** - No data migration required. This is a presentation-layer-only change.

### Rollback Plan
If gallery grid needs to be reverted:
1. Git revert branch commits
2. No data cleanup required (no data changes)
3. Zero downtime (Next.js hot reload)

## Testing Considerations

### Data Scenarios to Test

1. **Null image field**:
   - Test: Post with `image: null`
   - Expected: Placeholder image renders

2. **Missing image field**:
   - Test: Post with `image: undefined`
   - Expected: Placeholder image renders

3. **Long titles**:
   - Test: Post with title > 100 characters
   - Expected: Title truncates to 2 lines with ellipsis

4. **Partial grid**:
   - Test: getPosts returns 3 posts (not divisible by 4)
   - Expected: Grid renders 3 items without layout breaks

5. **Empty state**:
   - Test: getPosts returns 0 posts
   - Expected: Existing error boundary handles gracefully

## Summary

**Data Model Impact**: **ZERO**

This feature requires:
- ❌ No new database tables/collections
- ❌ No schema migrations
- ❌ No API endpoint changes
- ❌ No data validation changes
- ❌ No caching strategy changes
- ✅ Only presentation layer modifications (React components)

The existing Wisp CMS data model is sufficient. All implementation work occurs in the view layer.
