'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
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
            className={`max-w-[85%] overflow-hidden rounded-2xl text-[14.5px] leading-snug ${
              m.role === 'user'
                ? 'self-end rounded-br-md bg-accent text-white'
                : 'self-start rounded-bl-md border border-border bg-card text-ink'
            }`}
          >
            {m.dishImage && (
              <div className="relative h-32 w-full">
                <Image src={m.dishImage} alt="" fill sizes="(min-width: 512px) 435px, 85vw" className="object-cover" />
              </div>
            )}
            <div className="whitespace-pre-wrap px-3.5 py-2.5">{m.text}</div>
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
