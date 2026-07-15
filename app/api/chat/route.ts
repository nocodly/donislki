import { NextRequest, NextResponse } from 'next/server';
import { buildSystemPrompt } from '@/lib/systemPrompt';
import type { ChatContext, Language } from '@/lib/types';

export const runtime = 'nodejs';

const OPENAI_MODEL = 'gpt-4o-mini';

type OpenAiChoice = {
  message?: { content?: string };
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

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'AI service not configured' }, { status: 500 });
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: OPENAI_MODEL,
        max_tokens: 1024,
        messages: [
          { role: 'system', content: buildSystemPrompt(context ?? { category: null, dish: null }, language ?? 'en') },
          ...messages,
        ],
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('[chat] OpenAI API error', response.status, errText);
      return NextResponse.json({ error: 'AI service unavailable' }, { status: 502 });
    }

    const data = (await response.json()) as { choices?: OpenAiChoice[] };
    const reply = data.choices?.[0]?.message?.content ?? '';
    return NextResponse.json({ reply });
  } catch (err) {
    console.error('[chat] unexpected error', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
