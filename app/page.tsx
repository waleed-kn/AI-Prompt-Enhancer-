"use client";

import { useState } from "react";
import PromptForm from "@/components/PromptForm";
import ResultBox from "@/components/ResultBox";

// ── Page Component ─────────────────────────────────────────────

export default function Home() {
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  return (
    <main className="relative min-h-screen px-4 py-10 sm:px-6 lg:px-8">

      {/* ── Decorative Orbs ─────────────────────────────────── */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
        {/* Top violet orb */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[600px] w-[600px] rounded-full bg-violet-600/20 blur-[120px] animate-glow-pulse" />
        {/* Bottom right cyan orb */}
        <div className="absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-cyan-500/15 blur-[80px] animate-glow-pulse" style={{ animationDelay: "1.5s" }} />
        {/* Left rose orb */}
        <div className="absolute top-1/2 -left-32 h-64 w-64 rounded-full bg-rose-500/10 blur-[80px] animate-glow-pulse" style={{ animationDelay: "3s" }} />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* ── Content ─────────────────────────────────────────── */}

      <div className="relative mx-auto max-w-2xl">

        {/* ── Header ──────────────────────────────────────────── */}
        <header className="mb-10 text-center">
          {/* Developer credit badge */}
          <div className="mb-5 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-500/25 bg-cyan-500/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-cyan-300 backdrop-blur-sm">
              <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              Developed by Muhammad Waleed
            </span>
          </div>

          {/* Title */}
          <h1 className="font-display text-5xl font-bold leading-tight text-white sm:text-6xl md:text-7xl">
            Prompt{" "}
            <span className="text-gradient">Enhancer</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-4 max-w-md mx-auto text-base text-slate-400 leading-relaxed sm:text-lg">
            Transform vague prompts into clear, structured, and highly
            effective AI instructions — in seconds.
          </p>

          {/* Stats row */}
          <div className="mt-6 flex items-center justify-center gap-6 text-xs text-slate-500">
            {[
              { icon: "⚡", text: "Instant results" },
              { icon: "🎯", text: "4 tone styles" },
              { icon: "🔒", text: "Not stored" },
            ].map((item) => (
              <span key={item.text} className="flex items-center gap-1.5">
                <span>{item.icon}</span>
                {item.text}
              </span>
            ))}
          </div>
        </header>

        {/* ── Main Glass Card ──────────────────────────────────── */}
        <div className="glass-card rounded-2xl p-6 sm:p-8">
          {/* Card header */}
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 shadow-glow-violet">
              <svg className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Enhance your prompt</p>
              <p className="text-xs text-slate-500">Enter a prompt and let AI perfect it</p>
            </div>
          </div>

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

        {/* ── Result / Error ───────────────────────────────────── */}
        <div className="mt-6">
          <ResultBox result={result} error={error} isLoading={isLoading} />
        </div>

        {/* ── How it works ────────────────────────────────────── */}
        {!result && !isLoading && !error && (
          <div className="mt-10 animate-fade-up">
            <p className="mb-4 text-center text-xs font-semibold uppercase tracking-widest text-slate-600">
              How it works
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {[
                {
                  step: "01",
                  title: "Paste your prompt",
                  desc: "Type or paste any rough prompt idea",
                  color: "from-violet-500/20 to-violet-500/5",
                  border: "border-violet-500/20",
                  icon: "✏️",
                },
                {
                  step: "02",
                  title: "Choose your tone",
                  desc: "Pick the style that fits your use case",
                  color: "from-cyan-500/20 to-cyan-500/5",
                  border: "border-cyan-500/20",
                  icon: "🎚️",
                },
                {
                  step: "03",
                  title: "Get enhanced",
                  desc: "AI returns a polished, effective prompt",
                  color: "from-rose-500/20 to-rose-500/5",
                  border: "border-rose-500/20",
                  icon: "🚀",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className={`rounded-xl border ${item.border} bg-gradient-to-b ${item.color} p-4 text-center backdrop-blur-sm`}
                >
                  <div className="mb-2 text-2xl">{item.icon}</div>
                  <span className="mb-1 block text-[10px] font-mono text-slate-600">{item.step}</span>
                  <p className="text-sm font-semibold text-slate-200">{item.title}</p>
                  <p className="mt-1 text-xs text-slate-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Footer ──────────────────────────────────────────── */}
        <footer className="mt-12 text-center">
          <p className="text-xs text-slate-600">
            Prompts are sent to OpenAI and not stored by this app.{" "}
            <a
              href="https://openai.com/policies/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 underline underline-offset-2 hover:text-slate-300 transition-colors"
            >
              Privacy Policy ↗
            </a>
          </p>
          <p className="mt-2 text-[11px] text-slate-700">
            Built with Next.js + OpenAI
          </p>
        </footer>
      </div>
    </main>
  );
}
