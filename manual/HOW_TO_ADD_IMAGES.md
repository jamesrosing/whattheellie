# How to Add Images to Your Pages

## Quick Start

### For Static Pages (About, Contact, etc.)

1. **Add image to public folder**:
   ```
   public/
   └── images/
       ├── profile.jpg
       ├── travel.jpg
       └── placeholder.webp
   ```

2. **Reference in your page**:
   ```jsx
   import Image from "next/image";

   // In your component:
   <Image 
     src="/images/profile.jpg"  // Note: no "public" prefix
     alt="Description of image"
     width={600}
     height={400}
     className="rounded-lg shadow-lg"
   />
   ```

## Methods for Adding Images

### Method 1: Next.js Image Component (Recommended)

**Benefits**: Automatic optimization, lazy loading, responsive sizing

```jsx
import Image from "next/image";

export default function AboutPage() {
  return (
    <div>
      {/* Local image */}
      <Image 
        src="/images/profile.jpg"
        alt="My profile"
        width={600}
        height={400}
        className="rounded-lg"
        priority // Use for above-the-fold images
      />

      {/* External image */}
      <Image 
        src="https://imagedelivery.net/your-image.jpg"
        alt="Travel photo"
        width={800}
        height={600}
        className="object-cover"
      />
    </div>
  );
}
```

### Method 2: In Markdown Content

For pages using Markdown (like the About page):

```markdown
# About Me

![Profile Photo](/images/profile.jpg)

Some text here...

![Another Photo](/images/travel.jpg)
```

### Method 3: Background Images

Using CSS/Tailwind for background images:

```jsx
<div 
  className="h-96 bg-cover bg-center rounded-lg"
  style={{ backgroundImage: "url('/images/hero.jpg')" }}
>
  {/* Content */}
</div>
```

## Image Organization

### Recommended Folder Structure
```
public/
├── images/
│   ├── about/
│   │   ├── profile.jpg
│   │   └── team.jpg
│   ├── blog/
│   │   └── placeholder.webp
│   └── common/
│       ├── logo.png
│       └── hero.jpg
└── favicon.ico
```

## Adding Images to the About Page

The About page already uses Markdown. To add images:

1. **Place your images in `public/images/`**
2. **Update the markdown content in `src/app/about/page.tsx`**:

```jsx
const content = `# About Me

![My Profile](/images/profile.jpg)

Text about yourself...

![Travel Photo](/images/travel-photo.jpg)

More text...
`;
```

## Image Optimization Tips

### 1. File Formats
- **JPEG**: Best for photos
- **PNG**: Best for images with transparency
- **WebP**: Modern format, smaller file sizes
- **SVG**: Best for logos and icons

### 2. Image Sizes
- Keep images under 1MB
- Use appropriate dimensions (don't use 4000px wide images for 400px display)
- Consider using multiple sizes for responsive design

### 3. Naming Convention
- Use descriptive names: `profile-photo.jpg` not `IMG_1234.jpg`
- Use lowercase and hyphens: `travel-photo.jpg` not `Travel Photo.jpg`

## External Image Services

### Using Cloudflare Images (Already Configured)

Your app is configured to use Cloudflare's image service. To use:

1. Upload images to Wisp CMS or Cloudflare
2. Use the provided URL:

```jsx
<Image 
  src="https://imagedelivery.net/your-account/image-id/public"
  alt="Description"
  width={800}
  height={600}
/>
```

## Responsive Images

Make images responsive with Tailwind classes:

```jsx
<Image 
  src="/images/profile.jpg"
  alt="Profile"
  width={600}
  height={400}
  className="w-full h-auto max-w-2xl mx-auto rounded-lg shadow-lg"
/>
```

## Common Patterns

### Hero Image
```jsx
<div className="relative h-[400px] w-full">
  <Image 
    src="/images/hero.jpg"
    alt="Hero"
    fill
    className="object-cover"
    priority
  />
  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
    <h1 className="text-white text-4xl">Welcome</h1>
  </div>
</div>
```

### Gallery Grid
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {[1, 2, 3, 4, 5, 6].map((i) => (
    <Image 
      key={i}
      src={`/images/gallery-${i}.jpg`}
      alt={`Gallery ${i}`}
      width={400}
      height={300}
      className="rounded-lg hover:scale-105 transition-transform"
    />
  ))}
</div>
```

### Profile Card
```jsx
<div className="flex items-center space-x-4">
  <Image 
    src="/images/profile.jpg"
    alt="Profile"
    width={100}
    height={100}
    className="rounded-full"
  />
  <div>
    <h3 className="font-bold">Samantha</h3>
    <p className="text-muted-foreground">Travel Blogger</p>
  </div>
</div>
```

## Troubleshooting

### Image Not Showing?
1. Check file is in `public` folder
2. Path starts with `/` not `/public/`
3. File extension is correct
4. Check browser console for errors

### External Images Not Loading?
1. Add domain to `next.config.mjs`:
```js
images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "example.com",
    },
  ],
}
```

### Images Too Large?
- Resize before uploading
- Use image optimization tools
- Consider using Cloudflare Images for automatic optimization