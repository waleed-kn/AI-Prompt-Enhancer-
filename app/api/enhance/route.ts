import { NextRequest, NextResponse } from "next/server";
import openai from "@/lib/openai";

type Tone = "neutral" | "professional" | "casual";

interface EnhanceRequestBody {
  prompt: string;
  tone: Tone;
}

function getToneInstruction(tone: Tone): string {
  const instructions: Record<Tone, string> = {
    neutral: "Use a balanced, objective tone — neither too formal nor too informal.",
    professional: "Use a formal, precise, and business-appropriate tone. Prefer structured language.",
    casual: "Use a friendly, conversational, and approachable tone. Keep it human and warm.",
  };
  return instructions[tone] ?? instructions.neutral;
}

export async function POST(request: NextRequest) {
  try {
    const body: EnhanceRequestBody = await request.json();
    const { prompt, tone } = body;

    if (!prompt || typeof prompt !== "string" || prompt.trim().length === 0) {
      return NextResponse.json(
        { error: "Please provide a non-empty prompt." },
        { status: 400 }
      );
    }

    if (!["neutral", "professional", "casual"].includes(tone)) {
      return NextResponse.json(
        { error: "Invalid tone. Choose neutral, professional, or casual." },
        { status: 400 }
      );
    }

    const trimmedPrompt = prompt.trim().slice(0, 2000);
    const toneInstruction = getToneInstruction(tone);

    const systemPrompt = `You are an expert prompt engineer. Improve weak prompts into clear, detailed, structured prompts while keeping the original intent.

Tone instruction: ${toneInstruction}

Return ONLY the enhanced prompt — no explanations, no preamble, no labels.`;

    const completion = await openai.chat.completions.create({
      model: "llama-3.3-70b-versatile",  // ✅ updated — llama3-70b-8192 was decommissioned
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Enhance this prompt:\n\n"${trimmedPrompt}"` },
      ],
      max_tokens: 1024,
      temperature: 0.7,
    });

    const enhanced = completion.choices[0]?.message?.content?.trim();

    if (!enhanced) {
      return NextResponse.json(
        { error: "No response received. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ enhanced }, { status: 200 });

  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("[/api/enhance] error:", err.message);

      if (err.message.includes("401")) {
        return NextResponse.json(
          { error: "Invalid GROQ_API_KEY. Check your .env.local file." },
          { status: 401 }
        );
      }
      if (err.message.includes("429")) {
        return NextResponse.json(
          { error: "Rate limit reached. Please wait and retry." },
          { status: 429 }
        );
      }
    }
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}