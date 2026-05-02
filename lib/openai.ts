/**
 * lib/openai.ts
 * ─────────────────────────────────────────────────────────────
 * Initialises and exports a singleton Groq client using the
 * OpenAI-compatible SDK. The API key is read from GROQ_API_KEY
 * in your .env.local file.
 */

import OpenAI from "openai";

if (!process.env.GROQ_API_KEY) {
  throw new Error(
    "Missing GROQ_API_KEY — add it to your .env.local file.\n" +
    "See .env.example for the required format."
  );
}

/**
 * Groq client using the OpenAI-compatible interface.
 * Groq's API is a drop-in replacement — same methods, same types.
 */
const openai = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export default openai;