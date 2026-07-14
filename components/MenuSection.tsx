'use client';

import { itemsByCategory } from '@/lib/menuData';
import type { Language, MenuCategory, MenuItem } from '@/lib/types';
import { getStrings } from '@/lib/i18n';
import { MenuItemCard } from './MenuItemCard';

type Props = {
  category: MenuCategory;
  language: Language;
  onAskAi: (item: MenuItem) => void;
};

export function MenuSection({ category, language, onAskAi }: Props) {
  const t = getStrings(language);
  const items = itemsByCategory(category);

  return (
    <section aria-label={t.categories[category]} className="flex flex-col gap-3 px-4">
      {items.map((item) => (
        <MenuItemCard key={item.id} item={item} language={language} onAskAi={onAskAi} />
      ))}
    </section>
  );
}
