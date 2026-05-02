"use client";

import React, { useState } from "react";

// ── Types ──────────────────────────────────────────────────────

type Tone = "neutral" | "professional" | "casual" | "creative";

interface ToneOption {
  value: Tone;
  label: string;
  description: string;
  icon: string;
  gradient: string;
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
    gradient: "from-slate-400 to-slate-600",
  },
  {
    value: "professional",
    label: "Professional",
    description: "Formal & precise",
    icon: "💼",
    gradient: "from-violet-400 to-violet-600",
  },
  {
    value: "casual",
    label: "Casual",
    description: "Friendly & warm",
    icon: "☕",
    gradient: "from-amber-400 to-orange-500",
  },
  {
    value: "creative",
    label: "Creative",
    description: "Bold & imaginative",
    icon: "✨",
    gradient: "from-pink-400 to-rose-500",
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

  const MAX_CHARS = 2000;
  const charCount = prompt.length;
  const isNearLimit = charCount > MAX_CHARS * 0.85;
  const isOverLimit = charCount > MAX_CHARS;
  const fillPct = Math.min((charCount / MAX_CHARS) * 100, 100);

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
    onError("");

    try {
      const response = await fetch("/api/enhance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: trimmed, tone }),
      });

      const data = await response.json();

      if (!response.ok) {
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

      {/* ── Textarea Section ───────────────────────────────────── */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label
            htmlFor="prompt"
            className="text-xs font-semibold uppercase tracking-widest text-slate-400"
          >
            Your Prompt
          </label>
          <span
            className={`text-xs font-mono tabular-nums transition-colors ${
              isOverLimit
                ? "text-rose-400 font-semibold"
                : isNearLimit
                ? "text-amber-400"
                : "text-slate-500"
            }`}
            aria-live="polite"
          >
            {charCount.toLocaleString()} / {MAX_CHARS.toLocaleString()}
          </span>
        </div>

        <div className="relative">
          <textarea
            id="prompt"
            rows={7}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g. write me something about marketing strategies for a startup…"
            disabled={isLoading}
            className="field-glass"
            aria-describedby="char-progress"
          />

          {/* Progress bar */}
          <div
            id="char-progress"
            className="mt-1.5 h-0.5 w-full overflow-hidden rounded-full bg-white/5"
            role="progressbar"
            aria-valuenow={charCount}
            aria-valuemax={MAX_CHARS}
            aria-label="Character usage"
          >
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                isOverLimit
                  ? "bg-rose-500"
                  : isNearLimit
                  ? "bg-amber-400"
                  : "bg-gradient-to-r from-violet-500 to-cyan-500"
              }`}
              style={{ width: `${fillPct}%` }}
            />
          </div>
        </div>
      </div>

      {/* ── Tone Selector ─────────────────────────────────────── */}
      <div className="space-y-3">
        <span className="block text-xs font-semibold uppercase tracking-widest text-slate-400">
          Output Tone
        </span>

        <div
          className="grid grid-cols-2 gap-2 sm:grid-cols-4"
          role="group"
          aria-label="Select output tone"
        >
          {TONE_OPTIONS.map((option) => {
            const isSelected = tone === option.value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => setTone(option.value)}
                disabled={isLoading}
                aria-pressed={isSelected}
                className={`tone-pill ${isSelected ? "selected" : ""}`}
              >
                {/* Glow dot for selected */}
                {isSelected && (
                  <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse-soft" />
                )}

                <span className="text-2xl leading-none" aria-hidden="true">
                  {option.icon}
                </span>
                <span
                  className={`text-xs font-semibold ${
                    isSelected ? "text-violet-300" : "text-slate-300"
                  }`}
                >
                  {option.label}
                </span>
                <span className="text-[10px] leading-tight text-slate-500 text-center">
                  {option.description}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Submit Button ─────────────────────────────────────── */}
      <button
        type="submit"
        id="enhance-btn"
        disabled={isLoading || !prompt.trim() || isOverLimit}
        className="btn-primary btn-shimmer"
      >
        <span className="flex items-center justify-center gap-2.5">
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
                  cx="12" cy="12" r="10"
                  stroke="currentColor" strokeWidth="3" strokeOpacity="0.25"
                />
                <path
                  d="M12 2a10 10 0 0 1 10 10"
                  stroke="currentColor" strokeWidth="3" strokeLinecap="round"
                />
              </svg>
              <span>Enhancing your prompt…</span>
            </>
          ) : (
            <>
              {/* Sparkle */}
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
              </svg>
              <span>Enhance Prompt</span>
            </>
          )}
        </span>
      </button>
    </form>
  );
}
