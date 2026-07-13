import { NextRequest, NextResponse } from 'next/server';
import { buildSystemPrompt } from '@/lib/systemPrompt';
import type { ChatContext, Language } from '@/lib/types';

export const runtime = 'nodejs';

type AnthropicContentBlock = {
  type: string;
  text?: string;
};

type ChatRequestBody = {
  messages: { role: 'user' | 'assistant'; content: string }[];
  context: ChatContext;
  language: Language;
};

export async function POST(req: NextRequest) {
  let body: ChatRequestBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { messages, context, language } = body;
  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({ error: 'messages must be a non-empty array' }, { status: 400 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'AI service not configured' }, { status: 500 });
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-5',
        max_tokens: 1024,
        system: buildSystemPrompt(context ?? { category: null, dish: null }, language ?? 'en'),
        messages,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('[chat] Anthropic API error', response.status, errText);
      return NextResponse.json({ error: 'AI service unavailable' }, { status: 502 });
    }

    const data = (await response.json()) as { content?: AnthropicContentBlock[] };
    const reply = data.content?.find((block) => block.type === 'text')?.text ?? '';
    return NextResponse.json({ reply });
  } catch (err) {
    console.error('[chat] unexpected error', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
