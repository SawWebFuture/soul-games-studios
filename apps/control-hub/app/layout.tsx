import type { ReactNode } from "react";

export const metadata = {
  title: "The Bridge",
  description: "Command view for sub-agent visibility and event timeline",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "Inter, system-ui, sans-serif", margin: 0, background: "#0b1020", color: "#e6ecff" }}>
        {children}
      </body>
    </html>
  );
}
