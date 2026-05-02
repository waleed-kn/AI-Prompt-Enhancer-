/**
 * app/page.tsx
 * ─────────────────────────────────────────────────────────────
 * The home page — composes PromptForm + ResultBox and manages
 * shared state (result, error, loading).
 *
 * Aesthetic direction:
 *  Warm editorial — parchment tones, Playfair Display headings,
 *  ember accent colour, paper-like card surfaces. Feels like a
 *  thoughtful writer's tool rather than a generic SaaS app.
 */

"use client";

import { useState } from "react";
import PromptForm from "@/components/PromptForm";
import ResultBox from "@/components/ResultBox";

// ── Page Component ─────────────────────────────────────────────

export default function Home() {
  // Shared state lifted to parent so PromptForm and ResultBox can communicate
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  return (
    /* ── Page Shell ─────────────────────────────────────────── */
    <main className="relative min-h-screen bg-ink-50 px-4 py-16 sm:px-6 lg:px-8">
      {/* Decorative background blobs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {/* Top-left warm blob */}
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-ember-400/10 blur-3xl" />
        {/* Bottom-right ink blob */}
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-ink-300/20 blur-3xl" />
        {/* Centre subtle circle */}
        <div className="absolute left-1/2 top-1/4 h-64 w-64 -translate-x-1/2 rounded-full bg-ink-200/30 blur-2xl" />
      </div>

      <div className="relative mx-auto max-w-2xl">
        {/* ── Header ─────────────────────────────────────────── */}
        <header className="mb-12 text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-4 py-1.5 text-xs font-semibold text-ink-500 shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-ember-500" />
            Powered by OpenAI
          </div>

          {/* Title */}
          <h1 className="font-display text-4xl font-bold leading-tight text-ink-950 sm:text-5xl">
            Prompt{" "}
            <span className="text-gradient italic">Enhancer</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-4 font-body text-base text-ink-500 sm:text-lg">
            Transform vague, weak prompts into clear, structured,&nbsp;
            <br className="hidden sm:block" />
            and highly effective AI instructions — instantly.
          </p>

          {/* Decorative rule */}
          <div className="mx-auto mt-6 h-px w-16 bg-ember-500/40" />
        </header>

        {/* ── Main Card ──────────────────────────────────────── */}
        <div className="card-surface noise-overlay relative rounded-3xl p-8">
          <PromptForm
            onResult={(enhanced) => {
              setResult(enhanced);
              setError("");
            }}
            onError={(msg) => {
              setError(msg);
              setResult("");
            }}
            onLoading={setIsLoading}
            isLoading={isLoading}
          />
        </div>

        {/* ── Result / Error Box ─────────────────────────────── */}
        {/* Rendered below the card with a top margin */}
        <div className="mt-8">
          <ResultBox result={result} error={error} isLoading={isLoading} />
        </div>

        {/* ── Footer ─────────────────────────────────────────── */}
        <footer className="mt-16 text-center">
          <p className="text-xs text-ink-400">
            Your prompts are sent to OpenAI and not stored by this app.{" "}
            <a
              href="https://openai.com/policies/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-ink-300 underline-offset-2 hover:text-ink-700 transition-colors"
            >
              OpenAI Privacy Policy ↗
            </a>
          </p>
        </footer>
      </div>
    </main>
  );
}
