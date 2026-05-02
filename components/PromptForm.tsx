/**
 * components/PromptForm.tsx
 * ─────────────────────────────────────────────────────────────
 * The main input form:
 *  - Textarea for the weak prompt
 *  - Tone selector (Neutral / Professional / Casual)
 *  - Enhance button with loading state
 *
 * Props:
 *  - onResult(enhanced: string): called when the API returns
 *  - onError(msg: string): called when the API returns an error
 *  - onLoading(loading: boolean): parent tracks loading state
 */

"use client";

import React, { useState } from "react";

// ── Types ──────────────────────────────────────────────────────

type Tone = "neutral" | "professional" | "casual";

interface ToneOption {
  value: Tone;
  label: string;
  description: string;
  icon: string;
}

interface PromptFormProps {
  onResult: (enhanced: string) => void;
  onError: (msg: string) => void;
  onLoading: (loading: boolean) => void;
  isLoading: boolean;
}

// ── Tone Options Config ────────────────────────────────────────

const TONE_OPTIONS: ToneOption[] = [
  {
    value: "neutral",
    label: "Neutral",
    description: "Balanced & objective",
    icon: "⚖️",
  },
  {
    value: "professional",
    label: "Professional",
    description: "Formal & precise",
    icon: "💼",
  },
  {
    value: "casual",
    label: "Casual",
    description: "Friendly & warm",
    icon: "☕",
  },
];

// ── Component ──────────────────────────────────────────────────

export default function PromptForm({
  onResult,
  onError,
  onLoading,
  isLoading,
}: PromptFormProps) {
  const [prompt, setPrompt] = useState("");
  const [tone, setTone] = useState<Tone>("neutral");

  // Character counter helpers
  const MAX_CHARS = 2000;
  const charCount = prompt.length;
  const isNearLimit = charCount > MAX_CHARS * 0.85;
  const isOverLimit = charCount > MAX_CHARS;

  /**
   * handleSubmit — sends the prompt + tone to the API route
   * and delegates result/error handling to the parent.
   */
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const trimmed = prompt.trim();
    if (!trimmed) {
      onError("Please enter a prompt before enhancing.");
      return;
    }
    if (isOverLimit) {
      onError(`Prompt must be under ${MAX_CHARS} characters.`);
      return;
    }

    onLoading(true);
    onError(""); // Clear any previous error

    try {
      const response = await fetch("/api/enhance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: trimmed, tone }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Surface the API error message to the parent
        onError(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      onResult(data.enhanced);
    } catch {
      onError("Network error. Please check your connection and try again.");
    } finally {
      onLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {/* ── Textarea ─────────────────────────────────────────── */}
      <div className="space-y-2">
        <label
          htmlFor="prompt"
          className="block text-xs font-semibold uppercase tracking-widest text-ink-500"
        >
          Your Weak Prompt
        </label>

        <div className="relative">
          <textarea
            id="prompt"
            rows={6}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g. write me something about marketing…"
            disabled={isLoading}
            className="field-base resize-none font-body disabled:opacity-60 disabled:cursor-not-allowed"
            aria-describedby="char-count"
          />

          {/* Character counter */}
          <span
            id="char-count"
            className={`absolute bottom-3 right-4 text-xs tabular-nums transition-colors ${
              isOverLimit
                ? "text-red-500 font-semibold"
                : isNearLimit
                ? "text-ember-500"
                : "text-ink-400"
            }`}
          >
            {charCount}/{MAX_CHARS}
          </span>
        </div>
      </div>

      {/* ── Tone Selector ─────────────────────────────────────── */}
      <div className="space-y-2">
        <span className="block text-xs font-semibold uppercase tracking-widest text-ink-500">
          Output Tone
        </span>

        <div className="grid grid-cols-3 gap-3" role="group" aria-label="Select tone">
          {TONE_OPTIONS.map((option) => {
            const isSelected = tone === option.value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => setTone(option.value)}
                disabled={isLoading}
                aria-pressed={isSelected}
                className={`relative flex flex-col items-center gap-1.5 rounded-xl border px-3 py-3 text-center
                  transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed
                  ${
                    isSelected
                      ? "border-ember-500 bg-ember-500/8 shadow-sm ring-2 ring-ember-500/20"
                      : "border-ink-200 bg-white hover:border-ink-300 hover:bg-ink-50"
                  }`}
              >
                <span className="text-xl leading-none" aria-hidden="true">
                  {option.icon}
                </span>
                <span
                  className={`text-xs font-semibold ${
                    isSelected ? "text-ember-600" : "text-ink-700"
                  }`}
                >
                  {option.label}
                </span>
                <span className="text-[10px] leading-tight text-ink-400">
                  {option.description}
                </span>

                {/* Selected indicator dot */}
                {isSelected && (
                  <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-ember-500" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Submit Button ─────────────────────────────────────── */}
      <button
        type="submit"
        disabled={isLoading || !prompt.trim() || isOverLimit}
        className={`group relative w-full overflow-hidden rounded-xl py-3.5 px-6 font-body
          text-sm font-semibold tracking-wide text-white
          transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed
          ${
            isLoading
              ? "bg-ink-700 cursor-wait"
              : "bg-ink-900 hover:bg-ink-800 active:scale-[0.98] shadow-md hover:shadow-lg"
          }`}
      >
        {/* Shimmer on hover */}
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

        <span className="relative flex items-center justify-center gap-2">
          {isLoading ? (
            <>
              {/* Spinner */}
              <svg
                className="h-4 w-4 animate-spin"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeOpacity="0.3"
                />
                <path
                  d="M12 2a10 10 0 0 1 10 10"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
              Enhancing…
            </>
          ) : (
            <>
              {/* Sparkle icon */}
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
              </svg>
              Enhance Prompt
            </>
          )}
        </span>
      </button>
    </form>
  );
}
