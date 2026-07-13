'use client';

import { LANGUAGES } from '@/lib/i18n';
import type { Language } from '@/lib/types';

type Props = {
  language: Language;
  onChange: (language: Language) => void;
};

export function LanguageSelector({ language, onChange }: Props) {
  return (
    <div
      role="group"
      aria-label="Select language"
      className="flex items-center gap-1 rounded-full border border-border bg-surface p-1"
    >
      {LANGUAGES.map((l) => (
        <button
          key={l.code}
          type="button"
          aria-pressed={language === l.code}
          onClick={() => onChange(l.code)}
          className={`min-h-[32px] rounded-full px-2.5 text-xs font-semibold transition-colors ${
            language === l.code
              ? 'bg-accent text-white'
              : 'text-muted hover:bg-card'
          }`}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
