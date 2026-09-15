'use client';

import Image from 'next/image';
import { Sparkles } from 'lucide-react';
import type { Language, MenuItem } from '@/lib/types';
import { getStrings, getTranslatedItemText } from '@/lib/i18n';

type Props = {
  item: MenuItem;
  language: Language;
  onAskAi: (item: MenuItem) => void;
  onOpenDetail: (item: MenuItem) => void;
  compact?: boolean;
};

export function MenuItemCard({ item, language, onAskAi, onOpenDetail, compact }: Props) {
  const t = getStrings(language);
  const translated = getTranslatedItemText(language, item.id);
  const description = translated?.description ?? item.description;
  const pairing = translated?.pairing ?? item.pairing;
  const fromPrice = item.sizes?.[0]?.price ?? item.price;

  return (
    <article
      className={`flex flex-col overflow-hidden rounded-card border border-border bg-card ${
        compact ? 'w-64 shrink-0' : ''
      }`}
    >
      <button
        type="button"
        onClick={() => onOpenDetail(item)}
        className="flex flex-col gap-1.5 p-3.5 text-left"
      >
        {item.image && (
          <div
            className={`relative -m-3.5 mb-0 h-32 w-[calc(100%+28px)] ${
              item.imageFit === 'contain' ? 'bg-surface' : ''
            }`}
          >
            <Image
              src={item.image}
              alt={item.name}
              fill
              sizes={compact ? '256px' : '(min-width: 512px) 512px, 100vw'}
              className={item.imageFit === 'contain' ? 'object-contain p-2' : 'object-cover'}
            />
          </div>
        )}
        <div className="flex items-start justify-between gap-2 pt-3">
          <h3 className="text-[15px] font-medium leading-snug text-ink">{item.name}</h3>
          <span className="shrink-0 text-[15px] font-medium text-accent">
            {item.sizes ? t.fromPricePrefix : ''}
            {fromPrice.toFixed(2)}&nbsp;€
          </span>
        </div>

        <p className="text-[13px] leading-snug text-muted">{description}</p>

        {item.sizes && (
          <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-[12.5px] text-muted">
            {item.sizes.map((size) => (
              <span key={size.label}>
                {size.label}: <span className="font-medium text-ink">{size.price.toFixed(2)}&nbsp;€</span>
              </span>
            ))}
          </div>
        )}

        {pairing && (
          <p className="text-[12.5px] text-ink">
            <span className="text-muted">{t.pairing}:</span> {pairing}
          </p>
        )}

        <div className="flex flex-wrap gap-1.5 pt-0.5">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-accent/10 px-2 py-0.5 text-[11px] font-medium text-accent-deep"
            >
              {t.tagLabels[tag] ?? tag}
            </span>
          ))}
          {item.allergens.length > 0 && (
            <span className="rounded-full bg-gold/15 px-2 py-0.5 text-[11px] font-medium text-accent-deep">
              {t.allergensLabel}: {item.allergens.map((a) => t.tagLabels[a] ?? a).join(', ')}
            </span>
          )}
          <span className="rounded-full bg-border px-2 py-0.5 text-[11px] text-muted">
            {t.allergensUnknown}
          </span>
        </div>
      </button>

      <button
        type="button"
        onClick={() => onAskAi(item)}
        className="mx-3.5 mb-3.5 mt-1 flex min-h-[36px] items-center gap-1.5 self-start rounded-full border border-border px-3 text-[12.5px] font-medium text-accent-deep transition-colors hover:border-accent/40"
      >
        <Sparkles aria-hidden="true" size={14} strokeWidth={1.75} />
        {t.askAboutThis}
      </button>
    </article>
  );
}
