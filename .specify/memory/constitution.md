<!--
Sync Impact Report
==================
Version Change: Template (1.0.0) → 1.0.0 (Initial Constitution)
Modified Principles: N/A (initial creation)
Added Sections:
  - Core Principles (6 principles defined)
  - Technology Standards
  - Development Workflow
  - Governance
Removed Sections: None
Templates Requiring Updates:
  - ✅ constitution.md (this file) - Created with project-specific values
  - ⚠ plan-template.md - Should be reviewed to ensure alignment with principles
  - ⚠ spec-template.md - Should be reviewed to ensure scope aligns with React 19 requirements
  - ⚠ tasks-template.md - Should be reviewed to ensure task types reflect testing priorities
Follow-up TODOs:
  - Review and update dependent templates for consistency
  - Validate CLAUDE.md references to constitution principles
-->

# Ellie's Travel Blog Constitution

## Core Principles

### I. Server Components First (NON-NEGOTIABLE)
All new components MUST default to React Server Components unless explicit client-side interactivity is required. Client Components (`'use client'`) are ONLY permitted when the component requires:
- State management (useState, useReducer)
- Browser APIs (window, localStorage, geolocation)
- Event handlers (onClick, onChange, onSubmit)
- DOM-dependent libraries (Leaflet, Framer Motion)

**Rationale**: Server Components enable better performance, smaller bundle sizes, and direct server-side data access. The travel blog's content-heavy nature benefits from server-side rendering for SEO and initial load performance.

### II. TypeScript Strict Mode (NON-NEGOTIABLE)
All code MUST comply with TypeScript strict mode. The `any` type is PROHIBITED except when:
- Explicitly documented with justification
- Temporary during migration (with TODO and timeline)
- External library types are unavailable (documented in type declarations)

**Rationale**: Type safety prevents runtime errors, improves developer experience, and ensures maintainability. The project's 74 TypeScript files must maintain consistent type safety standards.

### III. Security-by-Design
All user inputs MUST be validated using Zod schemas. All secrets MUST remain server-side (never exposed to client). Security measures MUST NOT be removed or weakened:
- HMAC-SHA256 signing for OG images
- Email validation and normalization
- Content sanitization for user-generated content
- Environment variable protection (NEXT_PUBLIC_* only for truly public values)

**Rationale**: Travel blogs handle user data through newsletters and comments. Security breaches would compromise user trust and GDPR compliance.

### IV. React 19 Compatibility
All dependency installations MUST use `npm i --legacy-peer-deps`. Vercel deployment MUST configure the install command with this flag. No deprecated React APIs may be used.

**Rationale**: React 19 has peer dependency conflicts with older packages. Without this flag, builds fail. This is a critical constraint for the project's tech stack (Next.js 15.1.6 + React 19.0.0).

### V. Progressive Enhancement for Travel Features
Interactive travel features (maps, Spain guide) MUST gracefully degrade on devices without JavaScript. Core content MUST remain accessible without client-side hydration.

**Rationale**: Travel content should be accessible to all users regardless of device capabilities. Server-rendered HTML ensures search engines can index travel guides and blog posts.

### VI. Performance-First Development
All features MUST preserve or improve Core Web Vitals. Performance regressions are blocking issues:
- Lazy load heavy components (Leaflet maps)
- Optimize images with Next/Image
- Use React.cache() for API calls
- Minimize client-side JavaScript bundles

**Rationale**: Travel blogs are often accessed on mobile networks with limited bandwidth. Fast load times directly impact user engagement and SEO rankings.

## Technology Standards

### Approved Stack
- **Framework**: Next.js 15.1.6 with App Router (REQUIRED)
- **Runtime**: React 19.0.0 (REQUIRED)
- **Language**: TypeScript 5 with strict mode (REQUIRED)
- **Styling**: Tailwind CSS 3.4.7 + Shadcn UI (REQUIRED)
- **CMS**: Wisp CMS (@wisp-cms/client 0.0.22) (REQUIRED)
- **Forms**: React Hook Form 7.54.2 + Zod 3.24.1 (REQUIRED)
- **Maps**: Leaflet 1.9.4 (primary), Mapbox GL 3.14.0 (secondary)
- **Email**: Nodemailer 7.0.5 or Resend 6.0.1

### Prohibited Actions
- Modifying core Next.js or React configurations without explicit approval
- Removing security measures (signing, validation, sanitization)
- Breaking changes to public APIs or deployment process
- Bypassing TypeScript strict mode
- Using `any` type without documented justification

### Technology Changes
New libraries or framework upgrades require:
1. Written justification with benefits analysis
2. Compatibility verification with React 19
3. Performance impact assessment
4. Migration plan for existing code
5. Documentation updates (CLAUDE.md, README.md)

## Development Workflow

### Code Quality Gates
All code changes MUST pass these gates before merge:
1. **Type Safety**: No TypeScript errors, no unjustified `any` types
2. **Linting**: ESLint passes with zero warnings
3. **Build**: Production build succeeds with `npm run build`
4. **Server/Client Boundaries**: Proper component directive placement verified
5. **Security**: No secrets exposed to client, input validation present

### Testing Requirements (Future Mandate)
Once test suite is implemented (Technical Debt Priority 2):
- **Critical paths**: Newsletter flow, email service, Wisp client, OG signing
- **Components**: Blog post rendering, navigation, form validation
- **Integration**: API routes, RSS feed, Server Component data fetching
- **Target coverage**: 60%+ on critical paths

### Documentation Requirements
All features MUST include:
- Updates to CLAUDE.md for architectural decisions
- Inline code comments for complex logic
- README updates for user-facing features
- Environment variable documentation for new configs

### Deployment Standards
Vercel deployment MUST:
- Use `npm i --legacy-peer-deps` for install command
- Include all required environment variables
- Pass preview deployment validation
- Test email functionality, OG image generation, mobile responsiveness

## Governance

### Constitution Authority
This constitution supersedes all other development practices. When conflicts arise between this constitution and other documentation, the constitution takes precedence.

### Amendment Process
Constitution amendments require:
1. Written proposal with rationale
2. Impact analysis on existing codebase
3. Updates to dependent templates (.specify/templates/)
4. Documentation migration plan
5. Version bump following semantic versioning:
   - **MAJOR**: Backward incompatible changes, principle removals
   - **MINOR**: New principles added, materially expanded guidance
   - **PATCH**: Clarifications, wording fixes, non-semantic refinements

### Compliance Verification
All pull requests MUST verify compliance with:
- Core Principles (Server Components First, TypeScript Strict, Security-by-Design)
- Technology Standards (approved stack, prohibited actions)
- Code Quality Gates (type safety, linting, build success)

### Complexity Justification
Complex solutions MUST be justified with:
- Problem statement
- Simpler alternatives considered
- Rationale for chosen approach
- Performance implications
- Maintenance considerations

### Runtime Guidance Reference
For day-to-day development guidance, consult `CLAUDE.md` (project development documentation). The constitution defines WHAT is required; CLAUDE.md explains HOW to implement it within the project's architecture.

**Version**: 1.0.0 | **Ratified**: 2025-01-15 | **Last Amended**: 2025-01-15
