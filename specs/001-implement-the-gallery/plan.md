# Implementation Plan: Gallery Grid Homepage

**Branch**: `001-implement-the-gallery` | **Date**: 2025-01-15 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-implement-the-gallery/spec.md`

## Summary

Transform the homepage from a linear blog list (16:9 images with text metadata) to a visual-first gallery grid (square thumbnails with hover overlays). This is a pure frontend refactor using existing Wisp CMS data, requiring modifications to 2 components only. Implementation leverages CSS Grid, Next.js Image optimization, and Tailwind utilities to create a responsive 2-column (mobile) / 4-column (desktop) layout with gradient hover effects.

**Primary Requirement**: Display blog posts as square thumbnail grid with titles appearing on hover
**Technical Approach**: Refactor BlogPostPreview component to use aspect-square containers, CSS Grid layout, and group-hover pseudo-classes (zero JavaScript state management)

## Technical Context

**Language/Version**: TypeScript 5 (strict mode enabled)
**Primary Dependencies**: Next.js 15.1.6, React 19.0.0, Tailwind CSS 3.4.7, @wisp-cms/client 0.0.22
**Storage**: N/A (Wisp CMS external API, no local database)
**Testing**: Manual testing (no test suite exists - Technical Debt Priority 2)
**Target Platform**: Web (Vercel deployment), responsive mobile-first design
**Project Type**: Next.js App Router application (Server Components default)
**Performance Goals**:
- LCP < 2.5s desktop, < 4s mobile
- Grid renders in < 2s on 3G
- 95% image display reliability
- 40% faster visual discovery vs linear layout

**Constraints**:
- MUST remain Server Component (no 'use client' directive on page.tsx)
- MUST use CSS-only hover effects (no JavaScript event handlers)
- MUST preserve existing pagination (6 posts per page)
- MUST maintain SEO metadata (hidden text content for crawlers)
- MUST use --legacy-peer-deps for npm install (React 19 compatibility)

**Scale/Scope**:
- 2 files to modify (BlogPostPreview.tsx, page.tsx)
- ~150 lines of code changes
- Zero new dependencies
- Zero API changes

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Principle I: Server Components First ✅ PASS
- **Requirement**: Default to Server Components unless explicit interactivity required
- **Compliance**: Gallery grid uses Server Components + CSS pseudo-classes
- **Justification**: Hover interactions via `:hover` (no useState), data fetching via Wisp client in page.tsx
- **Impact**: Zero client-side JavaScript for grid functionality

### Principle II: TypeScript Strict Mode ✅ PASS
- **Requirement**: All code complies with strict mode, no `any` types
- **Compliance**: Uses `GetPostsResult["posts"][0]` type from Wisp client
- **Justification**: Nullable `post.image` handled with explicit fallback operator
- **Impact**: Full type safety on blog post entities

### Principle III: Security-by-Design ✅ N/A
- **Requirement**: Validate user inputs, keep secrets server-side
- **Compliance**: N/A (read-only feature, no user input)
- **Justification**: Only displays existing blog posts from Wisp CMS
- **Impact**: Zero security surface area changes

### Principle IV: React 19 Compatibility ✅ PASS
- **Requirement**: Use --legacy-peer-deps, no deprecated React APIs
- **Compliance**: No new dependencies, existing install command unchanged
- **Justification**: Modifications use standard JSX, Server Components syntax
- **Impact**: No build process changes required

### Principle V: Progressive Enhancement ✅ PASS
- **Requirement**: Core content accessible without JavaScript
- **Compliance**: Semantic <Link> elements work without JS, images have alt text
- **Justification**: Hover effects are progressive enhancement only
- **Impact**: Screen readers and no-JS users get functional links + images

### Principle VI: Performance-First Development ✅ PASS
- **Requirement**: Preserve/improve Core Web Vitals
- **Compliance**: Next.js Image lazy loading, CSS Grid (no JS layout), GPU-accelerated transforms
- **Justification**: Smaller images (square crop), fewer DOM nodes (removed metadata)
- **Impact**: Expected LCP improvement (fewer elements to render)

**Gate Status**: ✅ **ALL PRINCIPLES PASS** - Proceed to implementation

## Project Structure

### Documentation (this feature)

```
specs/001-implement-the-gallery/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command) ✅ COMPLETE
├── data-model.md        # Phase 1 output (/speckit.plan command) ✅ COMPLETE
├── quickstart.md        # Phase 1 output (/speckit.plan command) ✅ COMPLETE
├── contracts/           # Phase 1 output (/speckit.plan command) - N/A (no APIs)
├── checklists/          # Quality validation checklists
│   └── requirements.md  # 120/120 items passed ✅
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT YET CREATED)
```

### Source Code (repository root)

```
src/
├── app/
│   ├── page.tsx                      # 🔧 MODIFY: Minimal changes (grid container unchanged)
│   ├── globals.css                   # 🔧 OPTIONAL: Animation keyframes if needed
│   └── blog/[slug]/page.tsx          # ✓ UNCHANGED: Individual post pages
├── components/
│   ├── BlogPostPreview.tsx           # 🔧 MODIFY: Complete restructure for gallery grid
│   ├── Header.tsx                    # ✓ UNCHANGED: Navigation
│   └── Footer.tsx                    # ✓ UNCHANGED: Footer
├── lib/
│   ├── wisp.ts                       # ✓ UNCHANGED: Wisp CMS client (React.cache)
│   └── utils.ts                      # ✓ UNCHANGED: Utilities
└── hooks/                             # ✓ UNCHANGED: Custom hooks

public/
└── images/
    └── placeholder.webp               # 🔍 VERIFY: Must exist for null image fallback

next.config.mjs                        # ✓ UNCHANGED: Image CDN already configured
tailwind.config.ts                     # ✓ UNCHANGED: Design system complete
tsconfig.json                          # ✓ UNCHANGED: Strict mode enabled
package.json                           # ✓ UNCHANGED: No new dependencies
```

**Structure Decision**: Next.js App Router (Single Project)

This is a standard Next.js application with App Router architecture. All modifications occur within the `src/components/` directory. No backend changes, no new pages, no new API routes required. The existing Server Component architecture is preserved.

## Complexity Tracking

*No constitution violations - this section is empty*

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| (none)    | -          | -                                   |

## Phase 0: Research ✅ COMPLETE

**Output**: [research.md](./research.md)

### Key Decisions Made

1. **Grid Layout**: CSS Grid with Tailwind utilities (`grid-cols-2 md:grid-cols-4`)
   - Rationale: Native responsive layout, no JavaScript overhead
   - Alternative rejected: Masonry layout (requires JS library)

2. **Image Optimization**: Continue using Next.js Image component
   - Rationale: Already configured, built-in lazy loading
   - Alternative rejected: Cloudinary (unnecessary complexity)

3. **Hover Interactions**: CSS pseudo-classes with Tailwind `group` utilities
   - Rationale: Zero JavaScript, maintains Server Component architecture
   - Alternative rejected: Framer Motion (12KB overhead)

4. **Typography**: Existing Garamond font with font-light utilities
   - Rationale: Already loaded, matches brand aesthetic
   - Alternative rejected: New font (increases LCP)

5. **Component Architecture**: Refactor BlogPostPreview, keep BlogPostsPreview wrapper
   - Rationale: Preserves existing component hierarchy
   - Alternative rejected: New GalleryGrid component (duplicates functionality)

**Research Status**: ✅ **COMPLETE** - All decisions made, zero unknowns

## Phase 1: Design & Contracts ✅ COMPLETE

### Data Model

**Output**: [data-model.md](./data-model.md)

**Summary**: NO data model changes. This is a pure presentation-layer transformation using existing Wisp CMS entities.

**Entities Used**:
- `BlogPost` (from `@wisp-cms/client`): id, slug, title, image, description, publishedAt, tags
- `GridLayout` (UI concept only): columns, aspectRatio, gap

**Data Flow**:
```
Wisp CMS API → getPosts({ limit: 6, page: N }) → BlogPostsPreview
  ↓
BlogPostPreview (1:1 image + hover overlay)
  ↓
User sees: Square thumbnail → (hover) → Title overlay
```

### API Contracts

**Output**: N/A - No API changes

This feature uses existing Wisp CMS endpoints without modification:
- `GET /api/posts?limit=6&page={N}` (via wisp.getPosts)

No new endpoints created. No request/response schema changes.

### Integration Guide

**Output**: [quickstart.md](./quickstart.md)

**30-Minute Implementation**:
1. Modify BlogPostPreview component (15 min)
2. Update grid container (5 min)
3. Verify placeholder image (2 min)
4. Test implementation (6 min)

**1-Hour Full Implementation**:
- Add TypeScript validation, linting, accessibility audit, cross-browser testing

**Integration Scenarios**:
- Using gallery on tag pages
- Mixing grid and linear layouts
- Customizing posts per page

## Phase 2: Tasks Breakdown

**Status**: ⏳ **PENDING** - Run `/speckit.tasks` to generate

The tasks will include:
- **Setup**: Verify placeholder image exists
- **Core**: Modify BlogPostPreview component
- **Core**: Update BlogPostsPreview grid container
- **Validation**: TypeScript build check
- **Validation**: ESLint check
- **Testing**: Manual browser testing (no automated tests)
- **Testing**: Lighthouse performance audit
- **Polish**: Dark mode verification
- **Documentation**: Update CLAUDE.md with implementation notes

**Expected Task Count**: ~10-12 tasks (sequential, estimated 3-4 hours)

## Risk Assessment

### Technical Risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Placeholder image missing | Low | Medium | Verify file exists, use existing BlogPostPreview fallback |
| Grid aspect ratio breaks on ultra-wide | Low | Low | Container max-width already exists |
| Hover animation stutters on mobile | Medium | Low | CSS transitions gracefully degrade |
| TypeScript strict mode violations | Low | High | Use existing GetPostsResult types |

### Process Risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| No automated tests to verify behavior | High | Medium | Comprehensive manual testing checklist in quickstart.md |
| Vercel deployment issues | Low | High | Use --legacy-peer-deps flag (already configured) |
| SEO metadata loss | Low | High | Keep description in DOM (hidden visually) |

## Success Metrics (from spec.md)

### User Experience
- **SC-001**: 40% faster post discovery (time to first click)
- **SC-004**: Lighthouse accessibility 95+ (maintained)
- **SC-006**: +25% click-through rate within 1 month

### Performance
- **SC-002**: Grid renders < 2s on 3G
- **SC-005**: LCP < 2.5s desktop, < 4s mobile
- **SC-003**: 95% image display reliability

### Code Quality
- **SC-007**: Zero TypeScript errors, zero ESLint warnings
- **SC-008**: page.tsx remains Server Component

## Implementation Milestones

### Milestone 1: Component Refactor (Day 1, 2 hours)
- ✅ Research complete
- ✅ Plan complete
- ⏳ Modify BlogPostPreview.tsx
- ⏳ Update grid container classes
- ⏳ Verify TypeScript types

### Milestone 2: Validation & Testing (Day 1, 1 hour)
- ⏳ Run production build
- ⏳ ESLint check
- ⏳ Browser testing (Chrome, Firefox, Safari, Mobile)
- ⏳ Lighthouse audit

### Milestone 3: Polish & Documentation (Day 1, 1 hour)
- ⏳ Dark mode verification
- ⏳ Accessibility testing (screen reader)
- ⏳ Update CLAUDE.md
- ⏳ Create pull request

**Total Estimated Time**: 3-4 hours (as specified in Technical Debt Priority 1)

## Deployment Checklist

Pre-deployment verification:
- [ ] `npm run build` succeeds
- [ ] `npm run lint` passes (zero warnings)
- [ ] Placeholder image exists at `/public/images/placeholder.webp`
- [ ] Dark mode colors correct (`bg-gray-200 dark:bg-zinc-800`)
- [ ] Hover effects work on desktop
- [ ] Touch navigation works on mobile
- [ ] Pagination preserved (test with ?page=2)
- [ ] SEO metadata intact (view page source)
- [ ] Lighthouse scores meet targets (95+ accessibility)

Vercel deployment settings:
- [ ] Install command: `npm i --legacy-peer-deps` (already configured)
- [ ] Build command: `npm run build` (default)
- [ ] Environment variables: No changes required

Post-deployment validation:
- [ ] Preview URL accessible
- [ ] Test on real mobile device (3G throttling)
- [ ] Verify Wisp CMS images load correctly
- [ ] Check analytics tracking still works
- [ ] Monitor Core Web Vitals in Vercel dashboard

## Rollback Plan

If critical issues arise:

```bash
# Immediate rollback (< 1 minute)
git revert HEAD
git push origin 001-implement-the-gallery

# Or revert to main
git reset --hard main
git push --force origin 001-implement-the-gallery
```

**Rollback safety**: ✅ **HIGH**
- Zero data changes (no database)
- Zero API changes (no breaking contracts)
- Zero dependency changes (no package.json modifications)
- Instant hot reload (Next.js development)
- Instant Vercel redeployment (< 2 minutes)

## Next Steps

1. **Generate tasks**: Run `/speckit.tasks` to create tasks.md
2. **Begin implementation**: Follow tasks.md sequentially
3. **Track progress**: Mark tasks complete as they finish
4. **Create PR**: Compare branch with main
5. **Deploy preview**: Vercel auto-deploys on push
6. **Monitor metrics**: Track click-through rate (SC-006)

---

**Plan Status**: ✅ **COMPLETE**
**Constitution Compliance**: ✅ **ALL GATES PASS**
**Implementation Ready**: ✅ **YES**

**Artifacts Generated**:
- ✅ research.md (Phase 0)
- ✅ data-model.md (Phase 1)
- ✅ quickstart.md (Phase 1)
- ✅ plan.md (this file)

**Next Command**: `/speckit.tasks` to generate task breakdown for `/speckit.implement`
