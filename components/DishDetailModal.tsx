'use client';

import { useEffect } from 'react';
import { Sparkles, X } from 'lucide-react';
import { useScrollLock } from '@/hooks/useScrollLock';
import { getStrings, getTranslatedItemText } from '@/lib/i18n';
import type { Language, MenuItem } from '@/lib/types';

type Props = {
  item: MenuItem | null;
  language: Language;
  onClose: () => void;
  onAskAi: (item: MenuItem) => void;
};

export function DishDetailModal({ item, language, onClose, onAskAi }: Props) {
  const open = item !== null;
  const t = getStrings(language);
  useScrollLock(open);

  useEffect(() => {
    if (!open) return;
    function handleKey(e: globalThis.KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  if (!item) return null;

  const translated = getTranslatedItemText(language, item.id);
  const description = translated?.description ?? item.description;
  const pairing = translated?.pairing ?? item.pairing;
  const fromPrice = item.sizes?.[0]?.price ?? item.price;

  return (
    <div className="fixed inset-0 z-50" role="presentation">
      <button
        type="button"
        aria-label={t.close}
        onClick={onClose}
        className="absolute inset-0 bg-ink/35"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={item.name}
        className="absolute inset-x-0 bottom-0 mx-auto flex max-h-[88dvh] w-full max-w-lg flex-col overflow-y-auto rounded-t-[20px] border border-border bg-surface shadow-[0_-8px_30px_rgba(0,0,0,0.12)]"
      >
        {item.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.image}
            alt={item.name}
            className={`h-56 w-full shrink-0 rounded-t-[20px] ${
              item.imageFit === 'contain' ? 'bg-surface object-contain p-4' : 'object-cover'
            }`}
          />
        ) : (
          <div className="h-3 shrink-0" />
        )}

        <button
          type="button"
          onClick={onClose}
          aria-label={t.close}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-surface/90 text-ink shadow-sm hover:bg-card"
        >
          <X aria-hidden="true" size={18} strokeWidth={2} />
        </button>

        <div className="flex flex-col gap-2.5 p-4">
          <div className="flex items-start justify-between gap-2">
            <h2 className="text-[18px] font-medium leading-snug text-ink">{item.name}</h2>
            <span className="shrink-0 text-[17px] font-medium text-accent">
              {item.sizes ? t.fromPricePrefix : ''}
              {fromPrice.toFixed(2)}&nbsp;€
            </span>
          </div>

          <p className="text-[14px] leading-relaxed text-muted">{description}</p>

          {item.sizes && (
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-[13px] text-muted">
              {item.sizes.map((size) => (
                <span key={size.label}>
                  {size.label}: <span className="font-medium text-ink">{size.price.toFixed(2)}&nbsp;€</span>
                </span>
              ))}
            </div>
          )}

          {pairing && (
            <p className="text-[13.5px] text-ink">
              <span className="text-muted">{t.pairing}:</span> {pairing}
            </p>
          )}

          <div className="flex flex-wrap gap-1.5 pt-0.5">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-accent/10 px-2.5 py-1 text-[12px] font-medium text-accent-deep"
              >
                {t.tagLabels[tag] ?? tag}
              </span>
            ))}
            {item.allergens.length > 0 && (
              <span className="rounded-full bg-gold/15 px-2.5 py-1 text-[12px] font-medium text-accent-deep">
                {t.allergensLabel}: {item.allergens.map((a) => t.tagLabels[a] ?? a).join(', ')}
              </span>
            )}
            <span className="rounded-full bg-border px-2.5 py-1 text-[12px] text-muted">
              {t.allergensUnknown}
            </span>
          </div>

          <button
            type="button"
            onClick={() => onAskAi(item)}
            className="mt-1.5 flex min-h-[44px] items-center justify-center gap-1.5 rounded-full bg-accent px-4 text-[14px] font-medium text-white"
          >
            <Sparkles aria-hidden="true" size={16} strokeWidth={1.75} />
            {t.askAboutThis}
          </button>
        </div>
      </div>
    </div>
  );
}
