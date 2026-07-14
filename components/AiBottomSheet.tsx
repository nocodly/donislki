'use client';

import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';
import { X } from 'lucide-react';
import { useScrollLock } from '@/hooks/useScrollLock';
import { findItem } from '@/lib/menuData';
import type { ChatContext, ChatMessage, Language } from '@/lib/types';
import { getStrings } from '@/lib/i18n';
import { ChatMessages } from './ChatMessages';
import { QuickSuggestions } from './QuickSuggestions';
import { ChatComposer } from './ChatComposer';

type Props = {
  open: boolean;
  onClose: () => void;
  language: Language;
  context: ChatContext;
  messages: ChatMessage[];
  isTyping: boolean;
  onSend: (text: string) => void;
};

export function AiBottomSheet({
  open,
  onClose,
  language,
  context,
  messages,
  isTyping,
  onSend,
}: Props) {
  const t = getStrings(language);
  useScrollLock(open);

  const sheetRef = useRef<HTMLDivElement>(null);
  const dragState = useRef<{ startY: number; currentY: number } | null>(null);
  const [dragOffset, setDragOffset] = useState(0);

  useEffect(() => {
    if (!open) setDragOffset(0);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function handleKey(e: globalThis.KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  function handlePointerDown(e: ReactPointerEvent<HTMLDivElement>) {
    dragState.current = { startY: e.clientY, currentY: e.clientY };
  }

  function handlePointerMove(e: ReactPointerEvent<HTMLDivElement>) {
    if (!dragState.current) return;
    dragState.current.currentY = e.clientY;
    const delta = Math.max(0, dragState.current.currentY - dragState.current.startY);
    setDragOffset(delta);
  }

  function handlePointerUp() {
    if (!dragState.current) return;
    const delta = dragState.current.currentY - dragState.current.startY;
    dragState.current = null;
    if (delta > 90) {
      onClose();
    } else {
      setDragOffset(0);
    }
  }

  const dishLabel = context.dish
    ? (findItem(context.dish)?.name ?? context.dish)
    : context.category
      ? t.categories[context.category]
      : null;

  return (
    <div
      className={`fixed inset-0 z-40 ${open ? '' : 'pointer-events-none'}`}
      aria-hidden={!open}
    >
      <button
        type="button"
        aria-label={t.close}
        onClick={onClose}
        className={`absolute inset-0 bg-ink/35 transition-opacity duration-200 ${
          open ? 'opacity-100' : 'opacity-0'
        }`}
        tabIndex={open ? 0 : -1}
      />

      <div
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        aria-label={t.chatTitle}
        className="absolute inset-x-0 bottom-0 mx-auto flex w-full max-w-lg flex-col rounded-t-[20px] border border-border bg-surface shadow-[0_-8px_30px_rgba(0,0,0,0.12)] transition-transform duration-250 ease-out"
        style={{
          height: 'min(85dvh, var(--vvh, 85dvh))',
          transform: open
            ? `translateY(${dragOffset}px)`
            : 'translateY(100%)',
          transitionProperty: dragOffset ? 'none' : 'transform',
        }}
      >
        <div
          className="flex shrink-0 cursor-grab touch-none flex-col items-center gap-2 pb-1 pt-2.5 active:cursor-grabbing"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          <span className="h-1 w-9 rounded-full bg-border" aria-hidden="true" />
          <div className="flex w-full items-center justify-between px-4">
            <div className="min-w-0">
              <p className="text-sm font-semibold text-ink">{t.chatTitle}</p>
              {dishLabel && (
                <p className="truncate text-[11.5px] text-muted">
                  {t.discussing}: {dishLabel}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label={t.close}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-muted hover:bg-card"
            >
              <X aria-hidden="true" size={18} strokeWidth={2} />
            </button>
          </div>
        </div>

        <ChatMessages messages={messages} isTyping={isTyping} typingLabel="…" />

        {messages.length <= 1 && (
          <QuickSuggestions suggestions={t.quickSuggestions} onPick={onSend} />
        )}

        <ChatComposer language={language} disabled={isTyping} onSend={onSend} />
      </div>
    </div>
  );
}
