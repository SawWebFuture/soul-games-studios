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
    "Strategic AI board of agents for founders building sustainable companies. Get calm, thoughtful guidance on key decisions, long-term planning, and sustainable growth—without hustle culture pressure.",
  openGraph: {
    title: "Soul Games Studios — Strategic AI for Founders",
    description:
      "Your AI board of agents provides calm, strategic guidance for building sustainable companies. For founders who build for the long term.",
    images: ["/brand/LinkedIn_Banner_003.png"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/brand/LinkedIn_Banner_003.png"],
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
