'use client';

import { itemsByCategory } from '@/lib/menuData';
import type { Language, MenuCategory, MenuItem } from '@/lib/types';
import { getStrings } from '@/lib/i18n';
import { MenuItemCard } from './MenuItemCard';

type Props = {
  category: MenuCategory;
  language: Language;
  onAskAi: (item: MenuItem) => void;
  onOpenDetail: (item: MenuItem) => void;
};

export function MenuSection({ category, language, onAskAi, onOpenDetail }: Props) {
  const t = getStrings(language);
  const items = itemsByCategory(category);

  return (
    <section aria-label={t.categories[category]} className="flex flex-col gap-3 px-4">
      {category === 'oktoberfest' && (
        <p className="rounded-card border border-wiesn/30 bg-wiesn-tint px-3.5 py-2.5 text-[13px] leading-snug text-wiesn-deep">
          {t.oktoberfestBannerText}
        </p>
      )}
      {items.map((item) => (
        <MenuItemCard
          key={item.id}
          item={item}
          language={language}
          onAskAi={onAskAi}
          onOpenDetail={onOpenDetail}
        />
      ))}
    </section>
  );
}
