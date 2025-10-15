# Implementation Tasks: Gallery Grid Homepage

**Feature**: Gallery Grid Homepage
**Branch**: `001-implement-the-gallery`
**Generated**: 2025-01-15
**Estimated Time**: 3-4 hours

## Overview

Transform the homepage from a linear blog list to a visual-first gallery grid. This implementation is organized by user story (P1, P2, P3) to enable incremental delivery and independent testing.

**MVP Scope**: User Story 1 (P1) - delivers core visual grid functionality
**Full Feature**: All 3 user stories - adds mobile optimization and accessibility validation

## Task Format

```
- [ ] [TaskID] [P?] [Story?] Description with file path
```

- **TaskID**: Sequential number (T001, T002...)
- **[P]**: Parallelizable task (can run simultaneously with other [P] tasks)
- **[Story]**: User story label ([US1], [US2], [US3])
- **Description**: Specific action + exact file path

## Task Summary

**Total Tasks**: 14
- **Setup**: 2 tasks
- **User Story 1 (P1)**: 6 tasks (Core MVP)
- **User Story 2 (P2)**: 2 tasks (Mobile optimization)
- **User Story 3 (P3)**: 2 tasks (SEO & Accessibility)
- **Polish**: 2 tasks

**Parallel Opportunities**: 5 tasks can run in parallel (marked with [P])

---

## Phase 1: Setup (2 tasks)

**Goal**: Verify project prerequisites and environment readiness

### Tasks

- [x] T001 Verify placeholder image exists at `/public/images/placeholder.webp` (or create if missing)
- [x] T002 Verify current BlogPostPreview component structure in `src/components/BlogPostPreview.tsx` (understand existing implementation)

**Completion Criteria**:
- [ ] Placeholder image file exists and is 1:1 aspect ratio
- [ ] Current component structure documented (aspect ratio, metadata layout)

---

## Phase 2: User Story 1 (P1) - Visual Blog Discovery Through Image Grid

**Story Goal**: Visitors see a responsive grid of square thumbnails with hover overlays showing titles

**Why MVP**: This is the core UX transformation providing immediate value. Can be shipped independently as complete feature.

**Independent Test Criteria**:
- [ ] Visit homepage and see 2-column grid (mobile) / 4-column grid (desktop)
- [ ] Hover over thumbnail shows gradient overlay + centered title
- [ ] Click thumbnail navigates to blog post page
- [ ] Pagination works (if > 6 posts exist)

### Tasks

- [x] T003 [US1] Refactor BlogPostPreview component structure to use Link wrapper with square image container in `src/components/BlogPostPreview.tsx`
- [x] T004 [US1] Implement square aspect ratio image with Next.js Image component (aspect-square, object-cover) in `src/components/BlogPostPreview.tsx`
- [x] T005 [US1] Add gradient hover overlay layer with proper z-index in `src/components/BlogPostPreview.tsx`
- [x] T006 [US1] Implement centered title overlay with Garamond typography and line-clamp-2 in `src/components/BlogPostPreview.tsx`
- [x] T007 [US1] Remove visible text metadata (date, description, tags) from DOM in `src/components/BlogPostPreview.tsx`
- [x] T008 [US1] Update BlogPostsPreview grid container from `grid-cols-1 gap-16 lg:gap-28 md:grid-cols-2` to `grid-cols-2 md:grid-cols-4 gap-4` in `src/components/BlogPostPreview.tsx`

**Completion Criteria**:
- [ ] Grid layout shows 2 columns on mobile (< 768px)
- [ ] Grid layout shows 4 columns on desktop (>= 768px)
- [ ] All images are square (1:1 aspect ratio)
- [ ] Hover shows gradient overlay (300ms transition)
- [ ] Hover shows title centered in white Garamond font
- [ ] Click navigates to correct blog post
- [ ] TypeScript compiles with zero errors
- [ ] No ESLint warnings

**Detailed Component Changes** (T003-T008):

```tsx
// T003-T008: Complete BlogPostPreview refactor
export const BlogPostPreview: FunctionComponent<{
  post: GetPostsResult["posts"][0];
  index?: number;
}> = ({ post, index = 0 }) => {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="break-words group animate-fade-in-up"
      style={{
        animationDelay: `${index * 100}ms`,
        animationFillMode: "backwards"
      }}
    >
      {/* T004: Square aspect ratio container */}
      <div className="group relative aspect-square bg-gray-200 dark:bg-zinc-800 rounded-lg overflow-hidden cursor-pointer">
        {/* T004: Next.js Image with hover scale */}
        <Image
          alt={post.title}
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          src={post.image || "/images/placeholder.webp"}
          fill
        />

        {/* T005: Gradient hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* T006: Title overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <h2 className="font-garamond text-lg md:text-xl font-light tracking-normal text-white text-center px-4 line-clamp-2">
            {post.title}
          </h2>
        </div>
      </div>

      {/* T007: Metadata removed (was visible, now removed from DOM) */}
    </Link>
  );
};

// T008: Grid container update
export const BlogPostsPreview: FunctionComponent<{
  posts: GetPostsResult["posts"];
  className?: string;
}> = ({ posts, className }) => {
  return (
    <div className={cn(
      "grid grid-cols-2 md:grid-cols-4 gap-4 md:my-16 my-8",
      className
    )}>
      {posts.map((post, index) => (
        <BlogPostPreview key={post.id} post={post} index={index} />
      ))}
    </div>
  );
};
```

---

## Phase 3: User Story 2 (P2) - Fast Visual Scanning on Mobile Devices

**Story Goal**: Mobile users on 3G see 2-column grid with progressive image loading

**Why P2**: Builds on P1 by optimizing for mobile performance. Can be validated independently on mobile devices.

**Independent Test Criteria**:
- [ ] Open homepage on mobile device (or Chrome DevTools mobile mode)
- [ ] Verify 2-column layout renders
- [ ] Throttle network to 3G and reload
- [ ] Verify images load progressively (blur-up effect)
- [ ] Verify grid renders in < 2 seconds
- [ ] Tap thumbnail navigates without double-tap issues

### Tasks

- [x] T009 [P] [US2] Verify Next.js Image lazy loading is active (should be default behavior) in `src/components/BlogPostPreview.tsx`
- [x] T010 [P] [US2] Test mobile responsiveness in Chrome DevTools with 3G throttling

**Completion Criteria**:
- [ ] Images lazy-load as user scrolls (verified in Network tab)
- [ ] Blur-up placeholder shows before image loads
- [ ] Grid renders in < 2 seconds on 3G (Lighthouse audit)
- [ ] Touch events work without hover state conflicts
- [ ] Mobile layout matches desktop functionality (navigation works)

**Notes**:
- T009 is verification only - Next.js Image already provides lazy loading via `fill` prop
- T010 is manual testing using Chrome DevTools Performance tab + Network throttling

---

## Phase 4: User Story 3 (P3) - SEO and Accessibility Preservation

**Story Goal**: Screen readers and search engines navigate grid with proper semantic HTML and metadata

**Why P3**: Validates that visual transformation doesn't sacrifice SEO or accessibility. Can be tested independently with Lighthouse.

**Independent Test Criteria**:
- [ ] Run Lighthouse audit - Accessibility score >= 95
- [ ] Run Lighthouse audit - SEO score = 100
- [ ] Test with screen reader (NVDA/VoiceOver) - each thumbnail announces title
- [ ] View page source - find hidden description text for SEO
- [ ] Test with images disabled - links still work

### Tasks

- [x] T011 [P] [US3] Add visually-hidden description text for SEO (sr-only class) to BlogPostPreview component in `src/components/BlogPostPreview.tsx`
- [x] T012 [P] [US3] Run Lighthouse accessibility audit and verify 95+ score

**Completion Criteria**:
- [ ] Lighthouse Accessibility: 95+ (maintained from current baseline)
- [ ] Lighthouse SEO: 100
- [ ] Lighthouse Performance: 90+ desktop, 70+ mobile
- [ ] Screen reader announces title and description for each post
- [ ] Alt text present on all images
- [ ] Semantic HTML structure preserved (proper heading hierarchy)

**Implementation Detail** (T011):

```tsx
// Add sr-only description for SEO
<Link href={`/blog/${post.slug}`}>
  <div className="group relative aspect-square...">
    {/* Image and overlays */}
  </div>

  {/* Visually hidden description for SEO/screen readers */}
  <span className="sr-only">
    {post.description}
  </span>
</Link>
```

---

## Phase 5: Polish & Validation (2 tasks)

**Goal**: Ensure code quality, build success, and dark mode support

### Tasks

- [ ] T013 Run TypeScript build check (`npm run build`) and fix any type errors
- [ ] T014 Verify dark mode colors render correctly (bg-gray-200 dark:bg-zinc-800)

**Completion Criteria**:
- [ ] `npm run build` succeeds with zero errors
- [ ] `npm run lint` passes with zero warnings
- [ ] Dark mode thumbnail backgrounds render correctly
- [ ] Dark mode hover states work (gradient visible on dark backgrounds)
- [ ] No TypeScript `any` types introduced
- [ ] GetPostsResult types used correctly

---

## Dependencies & Execution Order

### Dependency Graph

```
Setup Phase (T001-T002)
  ↓
User Story 1 [P1] (T003-T008) ← MVP
  ↓ (blocks)
User Story 2 [P2] (T009-T010)
  ↓ (blocks)
User Story 3 [P3] (T011-T012)
  ↓ (blocks)
Polish (T013-T014)
```

### Parallel Execution Opportunities

**Within Setup Phase**: T001 and T002 can run in parallel (different files)

**Within User Story 1**: All tasks (T003-T008) must run sequentially (same file, dependent changes)

**Within User Story 2**: T009 and T010 can run in parallel (verification tasks)

**Within User Story 3**: T011 and T012 can run in parallel (different concerns)

**Within Polish**: T013 and T014 can run in parallel (different validation types)

### Story Completion Order

**MUST complete in order**:
1. Setup → User Story 1 (P1)
2. User Story 1 (P1) → User Story 2 (P2)
3. User Story 2 (P2) → User Story 3 (P3)
4. User Story 3 (P3) → Polish

**Why**: Each story builds on the previous implementation:
- US2 requires US1's grid to exist before testing mobile performance
- US3 validates US1+US2's combined implementation for accessibility
- Polish validates the complete implementation

---

## Implementation Strategy

### MVP-First Approach

**Minimum Viable Product**: User Story 1 (P1) - Tasks T001-T008

This delivers the core value proposition:
- ✅ Visual-first gallery grid
- ✅ Square thumbnail images
- ✅ Hover overlays with titles
- ✅ Responsive 2-col/4-col layout
- ✅ Click-through navigation

**Total MVP Time**: ~2 hours

**MVP Test**:
1. Visit homepage
2. See grid layout (not linear list)
3. Hover shows title
4. Click navigates to post

**Ship Decision Point**: After completing US1, team can decide:
- **Ship MVP now**: Deploy P1 for immediate user feedback
- **Continue to P2/P3**: Add mobile optimization + accessibility validation

### Incremental Delivery Plan

**Sprint 1** (2 hours): Setup + User Story 1 (P1)
- Deploy: MVP gallery grid to production

**Sprint 2** (1 hour): User Story 2 (P2)
- Deploy: Mobile-optimized grid

**Sprint 3** (1 hour): User Story 3 (P3) + Polish
- Deploy: Fully validated, accessible implementation

---

## Validation Checklist

After completing ALL tasks, verify:

### Functional Requirements (from spec.md)
- [ ] FR-001: Responsive grid (2 cols mobile, 4 cols desktop) ✓
- [ ] FR-002: Extract post.image field ✓
- [ ] FR-003: Square aspect ratio (aspect-square) ✓
- [ ] FR-004: Hover shows title with gradient overlay ✓
- [ ] FR-005: Click navigates to blog post ✓
- [ ] FR-006: Pagination preserved (6 posts per page) ✓
- [ ] FR-007: Lazy loading via Next.js Image ✓
- [ ] FR-008: Placeholder image fallback ✓
- [ ] FR-009: Server Component architecture maintained ✓
- [ ] FR-010: Garamond font-light typography ✓
- [ ] FR-011: Gradient overlay (from-primary-500/20) ✓
- [ ] FR-012: gap-4 spacing ✓
- [ ] FR-013: Error handling preserved ✓
- [ ] FR-014: SEO metadata maintained ✓
- [ ] FR-015: Semantic HTML with proper headings ✓

### Success Criteria (from spec.md)
- [ ] SC-001: 40% faster visual discovery (measure post-deployment)
- [ ] SC-002: Grid renders < 2s on 3G (Lighthouse)
- [ ] SC-003: 95% image display reliability (monitor production)
- [ ] SC-004: Lighthouse accessibility 95+
- [ ] SC-005: LCP < 2.5s desktop, < 4s mobile
- [ ] SC-006: +25% click-through rate (analytics after 1 month)
- [ ] SC-007: Zero TypeScript errors, zero ESLint warnings
- [ ] SC-008: page.tsx remains Server Component

### Constitution Compliance
- [ ] Principle I: No 'use client' directive added ✓
- [ ] Principle II: No `any` types, strict mode compliant ✓
- [ ] Principle III: No security changes (N/A) ✓
- [ ] Principle IV: No new dependencies, React 19 compatible ✓
- [ ] Principle V: Semantic HTML, alt text present ✓
- [ ] Principle VI: Next.js Image lazy loading, CSS Grid ✓

---

## File Modification Summary

### Files Modified (2)
1. **`src/components/BlogPostPreview.tsx`** - Complete refactor (T003-T012)
   - BlogPostPreview function: Square container, hover overlay, title display
   - BlogPostsPreview function: Grid container update

2. **`src/app/page.tsx`** - No changes required (already uses BlogPostsPreview)

### Files Verified (1)
1. **`public/images/placeholder.webp`** - Must exist (T001)

### Files Not Modified
- `src/app/globals.css` - Animation keyframes NOT needed (using Tailwind transitions)
- `src/lib/wisp.ts` - Wisp client unchanged
- `next.config.mjs` - Image config already correct
- `tailwind.config.ts` - Design system complete

---

## Testing Strategy

### Manual Testing Checklist (No Automated Tests)

**Desktop Testing** (Chrome, Firefox, Safari):
- [ ] Grid shows 4 columns
- [ ] Images are square
- [ ] Hover shows gradient + title
- [ ] Title uses Garamond font
- [ ] Click navigates to post
- [ ] Pagination works (?page=2)
- [ ] Dark mode renders correctly

**Mobile Testing** (Chrome DevTools + Real Device):
- [ ] Grid shows 2 columns
- [ ] Images load progressively
- [ ] Tap navigates (no double-tap issues)
- [ ] No hover states on touch devices
- [ ] Pagination works

**Performance Testing** (Lighthouse):
- [ ] Performance: 90+ desktop, 70+ mobile
- [ ] Accessibility: 95+
- [ ] Best Practices: 95+
- [ ] SEO: 100

**Accessibility Testing**:
- [ ] Screen reader announces titles
- [ ] Alt text on all images
- [ ] Keyboard navigation works (Tab key)
- [ ] Focus indicators visible

---

## Rollback Plan

If critical issues arise after deployment:

```bash
# Immediate rollback (< 1 minute)
git revert HEAD
git push origin 001-implement-the-gallery

# Vercel auto-redeploys previous version
```

**Rollback Safety**: ✅ HIGH
- Zero database changes
- Zero API changes
- Zero dependency changes
- Instant Next.js hot reload

---

## Next Steps

1. **Execute tasks sequentially**: Start with T001, mark complete with `[x]`
2. **Test after each user story**: Verify independent test criteria
3. **Ship MVP decision point**: After US1 (P1), decide to deploy or continue
4. **Final validation**: Run complete validation checklist
5. **Create pull request**: Compare with main branch
6. **Deploy to Vercel**: Auto-deploys on push to branch

---

**Tasks Ready**: ✅ YES
**Estimated Total Time**: 3-4 hours
**MVP Time**: 2 hours (Setup + User Story 1)
**Parallel Tasks**: 5 tasks marked [P]
**Sequential Tasks**: 9 tasks (same file dependencies)
