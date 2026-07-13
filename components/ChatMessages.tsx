'use client';

import { useEffect, useRef } from 'react';
import type { ChatMessage } from '@/lib/types';

type Props = {
  messages: ChatMessage[];
  isTyping: boolean;
  typingLabel: string;
};

export function ChatMessages({ messages, isTyping, typingLabel }: Props) {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'end' });
  }, [messages, isTyping]);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-3" aria-live="polite">
      <div className="flex flex-col gap-2.5">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[14.5px] leading-snug whitespace-pre-wrap ${
              m.role === 'user'
                ? 'self-end rounded-br-md bg-accent text-white'
                : 'self-start rounded-bl-md border border-border bg-card text-ink'
            }`}
          >
            {m.text}
          </div>
        ))}
        {isTyping && (
          <div className="self-start rounded-2xl rounded-bl-md border border-border bg-card px-3.5 py-2.5 text-[13px] italic text-muted">
            {typingLabel}
          </div>
        )}
        <div ref={endRef} />
      </div>
    </div>
  );
}
