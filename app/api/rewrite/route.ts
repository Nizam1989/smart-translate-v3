import { NextRequest, NextResponse } from "next/server";
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY,
});

export async function POST(req: NextRequest) {
  const { text } = await req.json();
  const prompt = `Please rewrite the following text to make it more professional and engaging:\n\n"${text}"`;

  const response = await anthropic.messages.create({
    model: "claude-3-opus-20240229",
    max_tokens: 1024,
    messages: [{ role: "user", content: prompt }],
  });

  const rewritten = response.content[0].text;
  return NextResponse.json({ result: rewritten });
}
