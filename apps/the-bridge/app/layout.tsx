import type { ReactNode } from "react";
import "./globals.css";

export const metadata = {
  title: "The Bridge",
  description: "Command view for sub-agent visibility and event timeline",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
