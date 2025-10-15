import { config } from "@/config";
import { signOgImageUrl } from "@/lib/og-image";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import "./fonts.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: {
    absolute: config.blog.metadata.title.absolute,
    default: config.blog.metadata.title.default,
    template: config.blog.metadata.title.template,
  },
  description: config.blog.metadata.description,
  openGraph: {
    title: config.blog.metadata.title.default,
    description: config.blog.metadata.description,
    images: [
      signOgImageUrl({
        title: config.blog.name,
      }),
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Adobe Fonts: Garamond Premier Pro & Lorimer No 2 */}
        <link rel="stylesheet" href="https://use.typekit.net/1bp8vud.css" />
      </head>
      <body
        className="min-h-screen bg-background font-cerebri antialiased max-w-6xl m-auto"
      >
        <Providers>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
