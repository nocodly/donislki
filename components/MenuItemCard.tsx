'use client';

import { Sparkles } from 'lucide-react';
import type { Language, MenuItem } from '@/lib/types';
import { STRINGS } from '@/lib/i18n';

type Props = {
  item: MenuItem;
  language: Language;
  onAskAi: (item: MenuItem) => void;
  compact?: boolean;
};

export function MenuItemCard({ item, language, onAskAi, compact }: Props) {
  const t = STRINGS[language];
  const fromPrice = item.sizes?.[0]?.price ?? item.price;

  return (
    <article
      className={`flex flex-col gap-1.5 rounded-card border border-border bg-card p-3.5 ${
        compact ? 'w-64 shrink-0' : ''
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-[15px] font-medium leading-snug text-ink">{item.name}</h3>
        <span className="shrink-0 text-[15px] font-medium text-accent">
          {item.sizes ? 'from ' : ''}
          {fromPrice.toFixed(2)}&nbsp;€
        </span>
      </div>

      <p className="text-[13px] leading-snug text-muted">{item.description}</p>

      {item.sizes && (
        <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-[12.5px] text-muted">
          {item.sizes.map((size) => (
            <span key={size.label}>
              {size.label}: <span className="font-medium text-ink">{size.price.toFixed(2)}&nbsp;€</span>
            </span>
          ))}
        </div>
      )}

      {item.pairing && (
        <p className="text-[12.5px] text-ink">
          <span className="text-muted">{t.pairing}:</span> {item.pairing}
        </p>
      )}

      {(item.tags.length > 0 || item.allergens.length > 0) && (
        <div className="flex flex-wrap gap-1.5 pt-0.5">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-accent/10 px-2 py-0.5 text-[11px] font-medium text-accent-deep"
            >
              {tag}
            </span>
          ))}
          {item.allergens.length === 0 ? (
            <span className="rounded-full bg-border px-2 py-0.5 text-[11px] text-muted">
              {t.allergensLabel}: {t.allergensUnknown}
            </span>
          ) : (
            item.allergens.map((allergen) => (
              <span
                key={allergen}
                className="rounded-full bg-gold/15 px-2 py-0.5 text-[11px] font-medium text-accent-deep"
              >
                {allergen}
              </span>
            ))
          )}
        </div>
      )}

      <button
        type="button"
        onClick={() => onAskAi(item)}
        className="mt-1 flex min-h-[36px] items-center gap-1.5 self-start rounded-full border border-border px-3 text-[12.5px] font-medium text-accent-deep transition-colors hover:border-accent/40"
      >
        <Sparkles aria-hidden="true" size={14} strokeWidth={1.75} />
        {t.askAboutThis}
      </button>
    </article>
  );
}
