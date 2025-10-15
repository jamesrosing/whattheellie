# Quickstart: Gallery Grid Homepage

**Feature**: Gallery Grid Homepage
**Branch**: `001-implement-the-gallery`
**Date**: 2025-01-15
**Estimated Time**: 30 minutes for basic implementation, 1 hour with testing

## Prerequisites

- Node.js 18+ installed
- Repository cloned and on branch `001-implement-the-gallery`
- Dependencies installed: `npm i --legacy-peer-deps`
- Wisp CMS configured with `NEXT_PUBLIC_BLOG_ID` in `.env`

## Quick Implementation (30 minutes)

### Step 1: Verify Current Setup (2 minutes)

```bash
# Confirm you're on the correct branch
git branch --show-current
# Should output: 001-implement-the-gallery

# Start development server
npm run dev

# Visit http://localhost:3000
# You should see current linear blog layout
```

### Step 2: Modify BlogPostPreview Component (15 minutes)

**File**: `src/components/BlogPostPreview.tsx`

**Changes**:
1. Change grid container from `grid grid-cols-1 gap-16 lg:gap-28 md:grid-cols-2` to `grid grid-cols-2 md:grid-cols-4 gap-4`
2. Change image aspect ratio from `aspect-[16/9]` to `aspect-square`
3. Remove text metadata (date, description, tags) from visible DOM
4. Add hover overlay with title inside image container
5. Update typography to `font-garamond text-lg md:text-xl font-light`

**Key Code Blocks**:

```tsx
// OLD: Linear layout with metadata
<div className="break-words group animate-fade-in-up">
  <Link href={`/blog/${post.slug}`}>
    <div className="aspect-[16/9] relative overflow-hidden rounded-lg">
      {/* Image */}
    </div>
  </Link>
  <div className="grid grid-cols-1 gap-2 md:col-span-2 mt-4">
    {/* Title, Date, Description, Tags */}
  </div>
</div>

// NEW: Gallery grid with hover overlay
<Link href={`/blog/${post.slug}`}>
  <div className="group relative aspect-square bg-gray-200 dark:bg-zinc-800 rounded-lg overflow-hidden cursor-pointer">
    <Image
      alt={post.title}
      className="object-cover transition-transform duration-500 group-hover:scale-110"
      src={post.image || "/images/placeholder.webp"}
      fill
    />
    <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <h2 className="font-garamond text-lg md:text-xl font-light tracking-normal text-white text-center px-4 line-clamp-2">
        {post.title}
      </h2>
    </div>
  </div>
</Link>
```

### Step 3: Update Grid Container (5 minutes)

**File**: `src/components/BlogPostPreview.tsx` (BlogPostsPreview function)

```tsx
// OLD
<div className={cn(
  "grid grid-cols-1 gap-16 lg:gap-28 md:grid-cols-2 md:my-16 my-8",
  className
)}>

// NEW
<div className={cn(
  "grid grid-cols-2 md:grid-cols-4 gap-4 md:my-16 my-8",
  className
)}>
```

### Step 4: Verify Placeholder Image (2 minutes)

```bash
# Check if placeholder exists
ls public/images/placeholder.webp

# If missing, add a placeholder image
# (Download any 1:1 aspect ratio image and save as placeholder.webp)
```

### Step 5: Test Implementation (6 minutes)

```bash
# Development server should hot-reload automatically
# Visit http://localhost:3000

# Test checklist:
# ☐ Grid shows 2 columns on mobile (resize browser < 768px)
# ☐ Grid shows 4 columns on desktop (>= 768px)
# ☐ Images are square (1:1 aspect ratio)
# ☐ Hover shows gradient overlay + title
# ☐ Click navigates to blog post
# ☐ Pagination works (if > 6 posts exist)
```

## Full Implementation with Testing (1 hour)

Follow Step 1-5 above, then add:

### Step 6: TypeScript Validation (10 minutes)

```bash
# Check for type errors
npm run build

# Expected output:
# ✓ Compiled successfully
# ✓ Collecting page data
# ✓ Generating static pages

# If errors occur, verify:
# - post.image handling (should allow null)
# - No 'any' types used
# - GetPostsResult types imported correctly
```

### Step 7: Linting (5 minutes)

```bash
# Run ESLint
npm run lint

# Expected output:
# ✓ No ESLint warnings
```

### Step 8: Accessibility Audit (10 minutes)

```bash
# Open Chrome DevTools (F12)
# Navigate to Lighthouse tab
# Run audit for:
# - Performance
# - Accessibility
# - Best Practices
# - SEO

# Target scores:
# Performance: 90+ (desktop), 70+ (mobile)
# Accessibility: 95+
# Best Practices: 95+
# SEO: 100
```

### Step 9: Cross-Browser Testing (5 minutes)

Test in:
- ✅ Chrome (primary)
- ✅ Firefox
- ✅ Safari (if on macOS)
- ✅ Mobile browser (Chrome/Safari on phone)

Verify:
- Hover effects work (desktop only)
- Touch navigation works (mobile)
- Images load correctly
- Grid layout is responsive

## Common Issues & Solutions

### Issue 1: Images Not Loading
**Symptom**: Broken image icons or placeholder for all posts
**Cause**: Wisp CMS image domain not configured in next.config.mjs
**Solution**:
```javascript
// next.config.mjs
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "imagedelivery.net", // Verify this matches Wisp image CDN
      },
    ],
  },
};
```

### Issue 2: Hover Overlay Not Appearing
**Symptom**: Title doesn't show on hover
**Cause**: Missing `group` class on container or `group-hover:` prefix on overlay
**Solution**: Ensure container has `className="group ..."` and overlay uses `group-hover:opacity-100`

### Issue 3: Grid Layout Broken
**Symptom**: Images stack vertically or overlap
**Cause**: Tailwind classes not applied correctly
**Solution**: Verify exact classes: `grid grid-cols-2 md:grid-cols-4 gap-4`

### Issue 4: TypeScript Errors on post.image
**Symptom**: Error: "Type 'null' is not assignable to type 'string'"
**Cause**: Image fallback not handling null case
**Solution**: Use nullish coalescing: `post.image || "/images/placeholder.webp"`

### Issue 5: Dark Mode Colors Wrong
**Symptom**: Thumbnail backgrounds too bright/dark in dark mode
**Cause**: Missing dark: variant
**Solution**: Ensure `bg-gray-200 dark:bg-zinc-800` on container

## Integration Scenarios

### Scenario 1: Adding Gallery to Existing Pages

To use the gallery grid on other pages (e.g., tag pages):

```tsx
// src/app/tag/[slug]/page.tsx
import { BlogPostsPreview } from "@/components/BlogPostPreview";

const posts = await wisp.getPosts({ tag: tag.slug });

return (
  <BlogPostsPreview posts={posts.posts} />
);
// Grid layout is now default behavior
```

### Scenario 2: Mixing Grid and Linear Layouts

If you need both layouts:

```tsx
// Option 1: Add layout prop to BlogPostsPreview
interface BlogPostsPreviewProps {
  posts: BlogPost[];
  layout?: 'grid' | 'linear'; // Add this
}

// Option 2: Create separate components
import { BlogPostsGridPreview } from "@/components/BlogPostGridPreview";
import { BlogPostsLinearPreview } from "@/components/BlogPostLinearPreview";
```

### Scenario 3: Customizing Posts Per Page

```tsx
// src/app/page.tsx
// Change from 6 to 8 or 12 for cleaner grid rows
const POSTS_PER_PAGE = 8; // 2 rows on desktop (4 cols × 2)

const result = await wisp.getPosts({ limit: POSTS_PER_PAGE, page });
```

## Performance Validation

### Lighthouse Metrics to Verify

Run Lighthouse after implementation:

```bash
# Install Lighthouse CLI (optional)
npm i -g lighthouse

# Run audit
lighthouse http://localhost:3000 --view

# Or use Chrome DevTools > Lighthouse tab
```

**Target Metrics**:
- **LCP** (Largest Contentful Paint): < 2.5s desktop, < 4s mobile
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1
- **Time to Interactive**: < 3.5s desktop, < 5s mobile

### Expected Performance Improvements

Compared to linear layout:
- ✅ **Faster visual discovery**: Users see 8 posts instead of 2 in first viewport (desktop)
- ✅ **Reduced scroll distance**: 4-column grid reduces page height by ~60%
- ⚠️ **Similar load time**: Image count unchanged, but images are smaller (square crop)

## Next Steps

After quickstart implementation:

1. **Run full test suite** (when tests exist): `npm test`
2. **Create pull request**: Compare with main branch
3. **Deploy preview**: Push to trigger Vercel preview deployment
4. **Get feedback**: Share preview URL with stakeholders
5. **Monitor analytics**: Track click-through rate improvement (SC-006 goal: +25%)

## Rollback Plan

If issues arise:

```bash
# Revert all changes
git checkout main -- src/components/BlogPostPreview.tsx

# Or revert entire branch
git reset --hard origin/main

# Restart dev server
npm run dev
```

**Rollback time**: < 1 minute (no data changes, pure presentation layer)

## Support

- **CLAUDE.md**: src/components/BlogPostPreview.tsx:1 (current implementation)
- **Specification**: specs/001-implement-the-gallery/spec.md
- **Research**: specs/001-implement-the-gallery/research.md
- **Constitution**: .specify/memory/constitution.md (Principles I, II, VI)
