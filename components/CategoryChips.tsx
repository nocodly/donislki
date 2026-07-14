'use client';

import { categoryMeta, categoryOrder } from '@/lib/menuData';
import { CATEGORY_ICONS } from '@/lib/categoryIcons';
import type { MenuCategory, Language } from '@/lib/types';
import { getStrings } from '@/lib/i18n';

type Props = {
  activeCategory: MenuCategory;
  onSelect: (category: MenuCategory) => void;
  language: Language;
};

export function CategoryChips({ activeCategory, onSelect, language }: Props) {
  const t = getStrings(language);

  return (
    <div
      className="flex gap-2 overflow-x-auto px-4 py-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      role="tablist"
      aria-label={t.categoriesTitle}
    >
      {categoryOrder.map((category) => {
        const Icon = CATEGORY_ICONS[categoryMeta[category].icon];
        const active = activeCategory === category;
        return (
          <button
            key={category}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onSelect(category)}
            className={`flex min-h-[44px] shrink-0 items-center gap-1.5 rounded-full border px-3.5 text-sm font-medium transition-colors ${
              active
                ? 'border-accent bg-accent text-white'
                : 'border-border bg-card text-ink hover:border-accent/40'
            }`}
          >
            {Icon ? <Icon aria-hidden="true" size={16} strokeWidth={1.75} /> : null}
            {t.categories[category]}
          </button>
        );
      })}
    </div>
  );
}
