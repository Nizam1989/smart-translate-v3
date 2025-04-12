import { NextRequest, NextResponse } from "next/server";
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY,
});

export async function POST(req: NextRequest) {
  const { text } = await req.json();
  const prompt = `Translate the following Malay text to English. Keep the meaning accurate and maintain a professional tone. Only respond with the translated text, no explanations:\n\n"${text}"`;

  const response = await anthropic.messages.create({
    model: "claude-3-haiku-20240307",
    max_tokens: 1024,
    messages: [{ role: "user", content: prompt }],
  });

  const translated = (response.content[0] as { text: string }).text;
  return NextResponse.json({ result: translated });
}
