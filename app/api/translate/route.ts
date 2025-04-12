import { NextRequest, NextResponse } from "next/server";
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY,
});

export async function POST(req: NextRequest) {
  const { text } = await req.json();
  const prompt = `Please translate the following text into English and make the tone professional:\n\n"${text}"`;

  const response = await anthropic.messages.create({
    model: "claude-3-opus-20240229",
    max_tokens: 1024,
    messages: [{ role: "user", content: prompt }],
  });

  const translated = (response.content[0] as { text: string }).text;
  return NextResponse.json({ result: translated });
}
