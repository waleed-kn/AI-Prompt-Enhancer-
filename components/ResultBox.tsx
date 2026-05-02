/**
 * components/ResultBox.tsx
 * ─────────────────────────────────────────────────────────────
 * Displays the enhanced prompt returned by the API.
 * Features:
 *  - Animated entry when result arrives
 *  - Copy-to-clipboard button with visual feedback
 *  - Error state with icon
 *  - Skeleton loader while API is in flight
 */

"use client";

import React, { useState } from "react";

// ── Types ──────────────────────────────────────────────────────

interface ResultBoxProps {
  result: string;
  error: string;
  isLoading: boolean;
}

// ── Copy Button ────────────────────────────────────────────────

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      // Reset after 2 seconds
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API not available (e.g., non-secure context)
      alert("Copy failed — please select and copy the text manually.");
    }
  }

  return (
    <button
      onClick={handleCopy}
      aria-label={copied ? "Copied!" : "Copy enhanced prompt to clipboard"}
      className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold
        transition-all duration-200 active:scale-95
        ${
          copied
            ? "bg-green-100 text-green-700 border border-green-200"
            : "bg-ink-100 text-ink-600 border border-ink-200 hover:bg-ink-200 hover:text-ink-900"
        }`}
    >
      {copied ? (
        <>
          {/* Checkmark icon */}
          <svg
            className="h-3.5 w-3.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            aria-hidden="true"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Copied!
        </>
      ) : (
        <>
          {/* Copy icon */}
          <svg
            className="h-3.5 w-3.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
          Copy
        </>
      )}
    </button>
  );
}

// ── Skeleton Loader ────────────────────────────────────────────

function SkeletonLoader() {
  return (
    <div
      className="space-y-3 animate-pulse"
      role="status"
      aria-label="Loading enhanced prompt"
    >
      <div className="h-4 rounded-md bg-ink-200 w-full" />
      <div className="h-4 rounded-md bg-ink-200 w-5/6" />
      <div className="h-4 rounded-md bg-ink-200 w-full" />
      <div className="h-4 rounded-md bg-ink-200 w-4/6" />
      <div className="h-4 rounded-md bg-ink-200 w-full" />
      <div className="h-4 rounded-md bg-ink-200 w-3/4" />
      <span className="sr-only">Enhancing your prompt, please wait…</span>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────

export default function ResultBox({ result, error, isLoading }: ResultBoxProps) {
  // Don't render anything until there's something to show
  const hasContent = isLoading || result || error;
  if (!hasContent) return null;

  return (
    <div className="animate-fade-up">
      {/* ── Section Heading ────────────────────────────────── */}
      <div className="mb-4 flex items-center gap-3">
        {/* Decorative divider line */}
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-ink-200 to-transparent" />
        <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-ink-400">
          {/* Sparkle/star icon */}
          <svg
            className="h-3.5 w-3.5 text-ember-500"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
          </svg>
          Enhanced Prompt
        </span>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-ink-200 to-transparent" />
      </div>

      {/* ── Content Card ───────────────────────────────────── */}
      <div
        className={`relative rounded-2xl border p-6 transition-all duration-300
          ${
            error
              ? "border-red-200 bg-red-50"
              : "card-surface border-ink-100"
          }`}
        role={error ? "alert" : "region"}
        aria-label={error ? "Error message" : "Enhanced prompt result"}
      >
        {/* Loading state */}
        {isLoading && <SkeletonLoader />}

        {/* Error state */}
        {!isLoading && error && (
          <div className="flex items-start gap-3">
            {/* Error icon */}
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-100">
              <svg
                className="h-4 w-4 text-red-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-red-700">
                Enhancement failed
              </p>
              <p className="mt-1 text-sm text-red-600">{error}</p>
            </div>
          </div>
        )}

        {/* Success state */}
        {!isLoading && result && !error && (
          <>
            {/* Top bar: quality badge + copy button */}
            <div className="mb-4 flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-ember-500/10 px-3 py-1 text-xs font-semibold text-ember-600">
                <span className="h-1.5 w-1.5 rounded-full bg-ember-500 animate-pulse-soft" />
                Enhanced
              </span>

              <CopyButton text={result} />
            </div>

            {/* The enhanced prompt text */}
            <p className="font-body text-sm leading-relaxed text-ink-800 whitespace-pre-wrap">
              {result}
            </p>

            {/* Bottom word count */}
            <p className="mt-4 text-right text-xs text-ink-400">
              {result.split(/\s+/).filter(Boolean).length} words
            </p>
          </>
        )}
      </div>
    </div>
  );
}
