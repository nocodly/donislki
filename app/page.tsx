'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Tent } from 'lucide-react';
import { RestaurantHeader } from '@/components/RestaurantHeader';
import { CategoryGrid } from '@/components/CategoryGrid';
import { CategoryChips } from '@/components/CategoryChips';
import { MenuSection } from '@/components/MenuSection';
import { MenuItemCard } from '@/components/MenuItemCard';
import { FloatingAiButton } from '@/components/FloatingAiButton';
import { AiBottomSheet } from '@/components/AiBottomSheet';
import { DishDetailModal } from '@/components/DishDetailModal';
import { useVisualViewportHeight } from '@/hooks/useVisualViewportHeight';
import {
  categoryOrder,
  featuredItemIds,
  findItem,
  lunchSpecialForDay,
  oktoberfestItems,
} from '@/lib/menuData';
import { getStrings, formatAskAboutDish, detectLanguage, isRtlLanguage, normalizeToSupported } from '@/lib/i18n';
import type { ChatContext, ChatMessage, Language, MenuCategory, MenuItem } from '@/lib/types';

function newId() {
  return typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export default function Home() {
  useVisualViewportHeight();

  const [language, setLanguage] = useState<Language>('en');
  useEffect(() => setLanguage(detectLanguage()), []);

  // Resolved after mount so the server-rendered markup stays deterministic.
  const [weekday, setWeekday] = useState<number | null>(null);
  useEffect(() => setWeekday(new Date().getDay()), []);
  const t = getStrings(language);
  const dir = isRtlLanguage(normalizeToSupported(language)) ? 'rtl' : 'ltr';

  const [activeCategory, setActiveCategory] = useState<MenuCategory | null>(null);
  // Deep link: /?category=oktoberfest opens straight into a section (handy for
  // QR codes that should land on a specific card, and for previews).
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get('category');
    if (requested && categoryOrder.includes(requested as MenuCategory)) {
      setActiveCategory(requested as MenuCategory);
    }
  }, []);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [context, setContext] = useState<ChatContext>({ category: null, dish: null });
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [detailItem, setDetailItem] = useState<MenuItem | null>(null);

  const menuSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([{ id: 'greeting', role: 'assistant', text: t.welcome }]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  function selectCategory(category: MenuCategory) {
    setActiveCategory(category);
    requestAnimationFrame(() => {
      menuSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  function openSheet(nextContext: ChatContext) {
    setContext(nextContext);
    setSheetOpen(true);
  }

  function handleAskAiGlobal() {
    // The floating button is the general chat entry point — it must stay
    // scoped to the whole menu, not silently inherit whatever category tab
    // happens to be open underneath it.
    openSheet({ category: null, dish: null });
  }

  function handleAskAboutItem(item: MenuItem) {
    const nextContext: ChatContext = { category: item.categories[0] ?? null, dish: item.id };
    openSheet(nextContext);
    setDetailItem(null);
    handleSend(formatAskAboutDish(t, item.name), nextContext);
  }

  function openDetail(item: MenuItem) {
    setDetailItem(item);
  }

  async function handleSend(text: string, contextOverride?: ChatContext) {
    const activeContext = contextOverride ?? context;
    const dishImage = activeContext.dish ? findItem(activeContext.dish)?.image : undefined;

    const userMessage: ChatMessage = { id: newId(), role: 'user', text };
    const history = [...messages, userMessage];
    setMessages(history);
    setIsTyping(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          messages: history
            .filter((m) => m.id !== 'greeting')
            .map((m) => ({ role: m.role, content: m.text })),
          context: activeContext,
          language,
        }),
      });
      const data = (await res.json()) as { reply?: string; error?: string };
      const replyText = res.ok && data.reply ? data.reply : t.noInfo;
      setMessages((prev) => [...prev, { id: newId(), role: 'assistant', text: replyText, dishImage }]);
    } catch {
      setMessages((prev) => [...prev, { id: newId(), role: 'assistant', text: t.noInfo, dishImage }]);
    } finally {
      setIsTyping(false);
    }
  }

  const featuredItems = useMemo(
    () =>
      featuredItemIds
        .map((id) => findItem(id))
        .filter((item): item is MenuItem => Boolean(item?.image)),
    [],
  );

  const todaysLunch = weekday === null ? null : lunchSpecialForDay(weekday);
  const isWeekend = weekday !== null && (weekday === 0 || weekday === 6);
  const hasOktoberfest = oktoberfestItems().length > 0;

  return (
    <div dir={dir} className="min-h-[100dvh] bg-bg pb-24">
      <RestaurantHeader />

      <main className="mx-auto max-w-lg">
        <p className="px-4 pb-2 pt-4 text-[13.5px] text-muted">{t.welcome}</p>

        {hasOktoberfest && (
          <section className="px-4 pb-5">
            <button
              type="button"
              onClick={() => selectCategory('oktoberfest')}
              className="flex w-full items-center gap-3 rounded-card border border-wiesn/40 bg-wiesn-tint px-4 py-3 text-left transition-colors hover:border-wiesn"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-wiesn text-white">
                <Tent aria-hidden="true" size={18} strokeWidth={1.75} />
              </span>
              <span className="flex min-w-0 flex-1 flex-col">
                <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <span className="shrink-0 rounded-full bg-wiesn px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                    {t.oktoberfestBadge}
                  </span>
                  <span className="text-[15px] font-semibold text-wiesn-deep">{t.oktoberfestBannerTitle}</span>
                </span>
                <span className="mt-0.5 text-[12.5px] leading-snug text-wiesn-deep/80">
                  {t.oktoberfestBannerText}
                </span>
              </span>
            </button>
          </section>
        )}

        {todaysLunch && (
          <section className="pb-5">
            <h2 className="px-4 pb-2.5 text-[13px] font-semibold uppercase tracking-wide text-muted">
              {t.todaysLunchTitle}
            </h2>
            <div className="px-4">
              <MenuItemCard
                item={todaysLunch}
                language={language}
                onAskAi={handleAskAboutItem}
                onOpenDetail={openDetail}
              />
            </div>
            <button
              type="button"
              onClick={() => selectCategory('weekly')}
              className="mt-2 px-4 text-[12.5px] font-medium text-accent-deep underline"
            >
              {t.categories.weekly}
            </button>
          </section>
        )}

        {isWeekend && (
          <section className="px-4 pb-5">
            <div className="rounded-card border border-border bg-card px-4 py-3">
              <p className="text-[13px] font-semibold text-ink">{t.weekendLunchTitle}</p>
              <p className="mt-0.5 text-[12.5px] leading-snug text-muted">{t.weekendLunchText}</p>
            </div>
          </section>
        )}

        <section className="px-4 pb-5">
          <h2 className="pb-2.5 text-[13px] font-semibold uppercase tracking-wide text-muted">
            {t.categoriesTitle}
          </h2>
          <CategoryGrid activeCategory={activeCategory} onSelect={selectCategory} language={language} />
        </section>

        {featuredItems.length > 0 && (
          <section className="pb-5">
            <h2 className="px-4 pb-2.5 text-[13px] font-semibold uppercase tracking-wide text-muted">
              {t.featuredTitle}
            </h2>
            <div className="flex gap-3 overflow-x-auto px-4 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {featuredItems.map((item) => (
                <MenuItemCard
                  key={item.id}
                  item={item}
                  language={language}
                  onAskAi={handleAskAboutItem}
                  onOpenDetail={openDetail}
                  compact
                />
              ))}
            </div>
          </section>
        )}

        {activeCategory && (
          <div ref={menuSectionRef} className="scroll-mt-16">
            <CategoryChips activeCategory={activeCategory} onSelect={selectCategory} language={language} />
            <MenuSection
              category={activeCategory}
              language={language}
              onAskAi={handleAskAboutItem}
              onOpenDetail={openDetail}
            />
          </div>
        )}

        <p className="px-4 pb-4 pt-6 text-center text-[11px] text-muted">
          Created by{' '}
          <a href="https://nocodly.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-ink">
            nocodly.com
          </a>
        </p>
      </main>

      <FloatingAiButton onClick={handleAskAiGlobal} language={language} />

      <DishDetailModal
        item={detailItem}
        language={language}
        onClose={() => setDetailItem(null)}
        onAskAi={handleAskAboutItem}
      />

      <AiBottomSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        language={language}
        context={context}
        messages={messages}
        isTyping={isTyping}
        onSend={handleSend}
      />
    </div>
  );
}
