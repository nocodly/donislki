'use client';

import { Sparkles } from 'lucide-react';
import type { Language } from '@/lib/types';
import { getStrings } from '@/lib/i18n';

type Props = {
  onClick: () => void;
  language: Language;
};

export function FloatingAiButton({ onClick, language }: Props) {
  const t = getStrings(language);

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={t.askAi}
      className="fixed bottom-5 right-4 z-30 flex min-h-[44px] items-center gap-2 rounded-full bg-accent px-4 py-3 text-sm font-semibold text-white shadow-[0_6px_18px_rgba(158,27,27,0.3)] transition-transform active:scale-95"
      style={{ bottom: 'calc(1.25rem + env(safe-area-inset-bottom))' }}
    >
      <Sparkles aria-hidden="true" size={18} strokeWidth={2} />
      {t.askAi}
    </button>
  );
}
