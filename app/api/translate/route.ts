import { NextRequest, NextResponse } from "next/server";
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY,
});

export async function POST(req: NextRequest) {
  const { text } = await req.json();
  const prompt = `You are a professional translator. First detect the language of this text, then translate it to professional English:

"${text}"

Rules:
1. First detect the language
2. Then translate to professional English
3. Respond ONLY with the English translation
4. Do not include any explanations or language detection info
5. Maintain formal and professional tone`;

  const response = await anthropic.messages.create({
    model: "claude-3-haiku-20240307",
    max_tokens: 1024,
    temperature: 0.7,
    messages: [{ role: "user", content: prompt }],
  });

  const translated = (response.content[0] as { text: string }).text.trim();
  return NextResponse.json({ result: translated });
}
