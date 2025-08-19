# How to Create New Pages

## Overview

This Next.js blog uses two different systems for content:
1. **Static Pages** - Created directly in the codebase (About, Contact, etc.)
2. **Blog Posts** - Managed through Wisp CMS

## Creating Static Pages

To create a new static page like "Contact" or "Portfolio":

### 1. Create the Page File

Create a new folder and `page.tsx` file in `src/app/`:

```
src/app/contact/page.tsx
```

### 2. Page Template

```tsx
import { Footer } from "@/components/Footer";
import { EnhancedHeader } from "@/components/EnhancedHeader";
import { config } from "@/config";
import { signOgImageUrl } from "@/lib/og-image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with me",
  openGraph: {
    title: "Contact",
    description: "Get in touch with me",
    images: [
      signOgImageUrl({
        title: "Contact",
        brand: config.blog.name,
      }),
    ],
  },
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-5">
      <EnhancedHeader />
      <div className="max-w-prose mx-auto mt-20 mb-10 animate-fade-in-up">
        <h1 className="text-4xl font-bold mb-8">Contact Me</h1>
        <div className="prose lg:prose-lg dark:prose-invert">
          {/* Your page content here */}
          <p>Feel free to reach out!</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
```

### 3. Add to Navigation

Edit `src/components/EnhancedHeader.tsx` to add your new page:

```tsx
const menuItems: MenuItem[] = [
  { name: "Blog", href: "/", icon: Home },
  { name: "About", href: "/about", icon: User },
  { name: "Contact", href: "/contact", icon: Mail }, // Add this line
];
```

## Creating Blog Posts

Blog posts are managed through Wisp CMS, not in the codebase:

1. Log into your Wisp CMS dashboard
2. Click "Create Post"
3. Write your content using the editor
4. Add images, tags, and metadata
5. Publish when ready

The post will automatically appear on your blog.

## Page Features

### Animations

All pages automatically get subtle animations. You can use these classes:
- `animate-fade-in` - Fade in effect
- `animate-fade-in-up` - Fade in with upward motion
- `animate-scale-in` - Scale in effect
- `group hover:scale-105` - Hover scaling effect

### Dark Mode

Dark mode is automatically supported. Use these classes:
- `dark:prose-invert` - For text content
- `dark:bg-gray-800` - For backgrounds
- `text-muted-foreground` - Adapts to theme

### Mobile Responsive

The Enhanced Header automatically adapts to mobile with:
- Large, readable fonts (text-2xl)
- Smooth animations
- Dark mode toggle
- Touch-friendly spacing

## Examples

### Portfolio Page
```tsx
src/app/portfolio/page.tsx
```

### Services Page
```tsx
src/app/services/page.tsx
```

### Contact Page with Form
```tsx
src/app/contact/page.tsx (with form components)
```

## Important Notes

- Static pages are built at compile time
- Blog posts from Wisp are fetched dynamically
- Always use `EnhancedHeader` for consistency
- Include proper metadata for SEO
- Test on mobile devices for responsive design