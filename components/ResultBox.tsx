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
      setTimeout(() => setCopied(false), 2000);
    } catch {
      alert("Copy failed — please select and copy the text manually.");
    }
  }

  return (
    <button
      onClick={handleCopy}
      id="copy-btn"
      aria-label={copied ? "Copied!" : "Copy enhanced prompt to clipboard"}
      className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold
        transition-all duration-200 active:scale-95 border
        ${
          copied
            ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
            : "bg-white/5 text-slate-300 border-white/10 hover:bg-white/10 hover:text-white"
        }`}
    >
      {copied ? (
        <>
          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Copied!
        </>
      ) : (
        <>
          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
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
    <div className="space-y-3 animate-pulse" role="status" aria-label="Loading enhanced prompt">
      <div className="h-3.5 rounded-full bg-white/8 w-full" />
      <div className="h-3.5 rounded-full bg-white/6 w-5/6" />
      <div className="h-3.5 rounded-full bg-white/8 w-full" />
      <div className="h-3.5 rounded-full bg-white/5 w-4/6" />
      <div className="h-3.5 rounded-full bg-white/8 w-full" />
      <div className="h-3.5 rounded-full bg-white/6 w-3/4" />
      <div className="mt-4 flex items-center gap-2">
        <div className="h-2 w-2 rounded-full bg-violet-500/60 animate-bounce" style={{ animationDelay: "0ms" }} />
        <div className="h-2 w-2 rounded-full bg-violet-500/60 animate-bounce" style={{ animationDelay: "150ms" }} />
        <div className="h-2 w-2 rounded-full bg-violet-500/60 animate-bounce" style={{ animationDelay: "300ms" }} />
        <span className="ml-1 text-xs text-slate-500">AI is enhancing…</span>
      </div>
      <span className="sr-only">Enhancing your prompt, please wait…</span>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────

export default function ResultBox({ result, error, isLoading }: ResultBoxProps) {
  const hasContent = isLoading || result || error;
  if (!hasContent) return null;

  const wordCount = result.split(/\s+/).filter(Boolean).length;

  return (
    <div className="animate-fade-up">
      {/* ── Section Heading ──────────────────────────────────── */}
      <div className="section-divider mb-4">
        <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-slate-400">
          {/* Star icon */}
          <svg className="h-3.5 w-3.5 text-violet-400" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
          </svg>
          Enhanced Result
        </span>
      </div>

      {/* ── Content Card ─────────────────────────────────────── */}
      <div
        className={`result-card ${error ? "result-card-error" : ""}`}
        role={error ? "alert" : "region"}
        aria-label={error ? "Error message" : "Enhanced prompt result"}
      >
        {/* Loading state */}
        {isLoading && <SkeletonLoader />}

        {/* Error state */}
        {!isLoading && error && (
          <div className="flex items-start gap-3 animate-fade-in">
            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-rose-500/15 border border-rose-500/20">
              <svg className="h-4 w-4 text-rose-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-rose-400">Enhancement failed</p>
              <p className="mt-1 text-sm text-rose-300/80">{error}</p>
            </div>
          </div>
        )}

        {/* Success state */}
        {!isLoading && result && !error && (
          <div className="animate-fade-in">
            {/* Top bar */}
            <div className="mb-4 flex items-center justify-between flex-wrap gap-2">
              <span className="badge-glow">
                <span className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse-soft" />
                Enhanced
              </span>

              <div className="flex items-center gap-2">
                {/* Word count */}
                <span className="text-xs text-slate-500 font-mono">{wordCount} words</span>
                <CopyButton text={result} />
              </div>
            </div>

            {/* Result text */}
            <p className="text-sm leading-relaxed text-slate-200 whitespace-pre-wrap font-mono">
              {result}
            </p>

            {/* Bottom hint */}
            <p className="mt-4 text-xs text-slate-600 text-right">
              ✓ Ready to use — copy and paste into your AI tool
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
