'use client';

import { categoryMeta, categoryOrder, itemsByCategory } from '@/lib/menuData';
import { CATEGORY_ICONS } from '@/lib/categoryIcons';
import type { MenuCategory, Language } from '@/lib/types';
import { getStrings } from '@/lib/i18n';

type Props = {
  activeCategory: MenuCategory | null;
  onSelect: (category: MenuCategory) => void;
  language: Language;
};

export function CategoryGrid({ activeCategory, onSelect, language }: Props) {
  const t = getStrings(language);

  return (
    <div className="grid grid-cols-3 gap-3">
      {categoryOrder.map((category) => {
        const Icon = CATEGORY_ICONS[categoryMeta[category].icon];
        const count = itemsByCategory(category).length;
        const active = activeCategory === category;
        return (
          <button
            key={category}
            type="button"
            onClick={() => onSelect(category)}
            aria-pressed={active}
            className={`flex min-h-[44px] flex-col items-center gap-1.5 rounded-card border px-2 py-4 text-center transition-colors ${
              active
                ? 'border-accent bg-accent/5'
                : 'border-border bg-card hover:border-accent/40'
            }`}
          >
            {Icon ? (
              <Icon
                aria-hidden="true"
                size={22}
                className={active ? 'text-accent' : 'text-ink'}
                strokeWidth={1.75}
              />
            ) : null}
            <span className="text-sm font-medium text-ink">{t.categories[category]}</span>
            <span className="text-[11px] text-muted">{count}</span>
          </button>
        );
      })}
    </div>
  );
}
