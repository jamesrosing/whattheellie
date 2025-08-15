interface BlogConfig {
  baseUrl: string;
  blog: {
    name: string;
    copyright: string;
    metadata: {
      title: {
        absolute: string;
        default: string;
        template: string;
      };
      description: string;
    };
  };
  ogImageSecret: string;
  wisp: {
    blogId: string;
  };
}

const buildConfig = (): BlogConfig => {
  const blogId = process.env.NEXT_PUBLIC_BLOG_ID;
  if (!blogId) {
    throw new Error(
      "NEXT_PUBLIC_BLOG_ID is missing. Please set it in your .env file."
    );
  }

  const name = process.env.NEXT_PUBLIC_BLOG_DISPLAY_NAME || "whattheellie";
  const copyright = process.env.NEXT_PUBLIC_BLOG_COPYRIGHT || "Ellie";
  const defaultTitle =
    process.env.NEXT_DEFAULT_METADATA_DEFAULT_TITLE || "What The Ellie - Travel & Adventure Blog";
  const defaultDescription = 
    process.env.NEXT_PUBLIC_BLOG_DESCRIPTION || "Digital nomad chasing sunsets, not deadlines. Join Ellie's journey around the world.";

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
    (process.env.NODE_ENV === "production" 
      ? "https://example.com" 
      : "http://localhost:3000");

  return {
    baseUrl,
    blog: {
      name,
      copyright,
      metadata: {
        title: {
          absolute: defaultTitle,
          default: defaultTitle,
          template: `%s - ${defaultTitle}`,
        },
        description: defaultDescription,
      },
    },
    ogImageSecret:
      process.env.OG_IMAGE_SECRET ||
      "secret_used_for_signing_and_verifying_the_og_image_url",
    wisp: {
      blogId,
    },
  } as const satisfies BlogConfig;
};

export const config = buildConfig();
export type { BlogConfig };
