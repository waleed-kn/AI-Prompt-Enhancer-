/**
 * app/layout.tsx
 * ─────────────────────────────────────────────────────────────
 * Root layout — wraps every page in the app.
 * Sets HTML metadata and imports global styles.
 */

import type { Metadata } from "next";
import "../styles/globals.css";

// ── Metadata ───────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Prompt Enhancer — Turn Weak Prompts Into Powerful Ones",
  description:
    "Paste any weak AI prompt and get an improved, structured, and context-rich version instantly using OpenAI.",
  keywords: ["prompt engineering", "AI prompts", "OpenAI", "prompt enhancer"],
  authors: [{ name: "Prompt Enhancer App" }],
};

// ── Layout Component ───────────────────────────────────────────

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">{children}</body>
    </html>
  );
}
