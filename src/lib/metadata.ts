import { Metadata } from 'next';
import { config } from '@/config';

interface GenerateMetadataParams {
  title?: string;
  description?: string;
  image?: string;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  tags?: string[];
}

export function generateSEOMetadata({
  title,
  description,
  image,
  publishedTime,
  modifiedTime,
  author,
  tags,
}: GenerateMetadataParams): Metadata {
  const finalTitle = title || config.blog.metadata.title.default;
  const finalDescription = description || config.blog.metadata.description;
  
  return {
    title: finalTitle,
    description: finalDescription,
    authors: author ? [{ name: author }] : undefined,
    keywords: tags,
    openGraph: {
      title: finalTitle,
      description: finalDescription,
      type: 'article',
      publishedTime,
      modifiedTime,
      authors: author ? [author] : undefined,
      tags,
      images: image ? [{ url: image, alt: finalTitle }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: finalTitle,
      description: finalDescription,
      images: image ? [image] : undefined,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}