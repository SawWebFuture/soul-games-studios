import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Soul Games Studios",
    template: "%s · Soul Games Studios",
  },
  description:
    "Soul Games Studios builds calm, intentional AI-first products and philosophical web experiences.",
  openGraph: {
    title: "Soul Games Studios | Calm AI-First Products",
    description:
      "Calm software for a loud internet. Thoughtful AI experiments, identity tools, and creator products.",
    images: ["/og-image.svg"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.svg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
