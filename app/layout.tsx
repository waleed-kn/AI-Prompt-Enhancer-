/**
 * app/layout.tsx — Root Layout (Dark Glassmorphism Theme)
 */

import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Prompt Enhancer — AI-Powered Prompt Optimization",
  description:
    "Transform vague, weak prompts into clear, structured, and highly effective AI instructions instantly using OpenAI.",
  keywords: ["prompt engineering", "AI prompts", "OpenAI", "prompt enhancer", "GPT"],
  authors: [{ name: "Prompt Enhancer App" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect for faster Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
