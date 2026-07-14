'use client';

import { useRef, type KeyboardEvent } from 'react';
import { Send } from 'lucide-react';
import type { Language } from '@/lib/types';
import { getStrings } from '@/lib/i18n';

type Props = {
  language: Language;
  disabled: boolean;
  onSend: (text: string) => void;
};

const MAX_ROWS = 4;

export function ChatComposer({ language, disabled, onSend }: Props) {
  const t = getStrings(language);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function submit() {
    const el = textareaRef.current;
    if (!el) return;
    const text = el.value.trim();
    if (!text) return;
    el.value = '';
    el.style.height = 'auto';
    onSend(text);
  }

  function handleInput() {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    const lineHeight = 20;
    el.style.height = `${Math.min(el.scrollHeight, lineHeight * MAX_ROWS)}px`;
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  }

  return (
    <div
      className="flex items-end gap-2 border-t border-border bg-surface px-3 py-2.5"
      style={{ paddingBottom: 'calc(0.625rem + env(safe-area-inset-bottom))' }}
    >
      <textarea
        ref={textareaRef}
        rows={1}
        placeholder={t.composerPlaceholder}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className="max-h-[80px] min-h-[36px] flex-1 resize-none rounded-2xl border border-border bg-bg px-3 py-2 text-[15px] leading-5 text-ink outline-none focus:border-accent/50 disabled:opacity-60"
      />
      <button
        type="button"
        onClick={submit}
        disabled={disabled}
        aria-label={t.send}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-white disabled:opacity-50"
      >
        <Send aria-hidden="true" size={16} strokeWidth={2} />
      </button>
    </div>
  );
}
