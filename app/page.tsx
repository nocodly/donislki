'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { RestaurantHeader } from '@/components/RestaurantHeader';
import { CategoryGrid } from '@/components/CategoryGrid';
import { CategoryChips } from '@/components/CategoryChips';
import { MenuSection } from '@/components/MenuSection';
import { MenuItemCard } from '@/components/MenuItemCard';
import { FloatingAiButton } from '@/components/FloatingAiButton';
import { AiBottomSheet } from '@/components/AiBottomSheet';
import { useVisualViewportHeight } from '@/hooks/useVisualViewportHeight';
import { featuredItemIds, findItem } from '@/lib/menuData';
import { getStrings, formatAskAboutDish, detectLanguage } from '@/lib/i18n';
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
  const t = getStrings(language);

  const [activeCategory, setActiveCategory] = useState<MenuCategory | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [context, setContext] = useState<ChatContext>({ category: null, dish: null });
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);

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
    handleSend(formatAskAboutDish(t, item.name), nextContext);
  }

  async function handleSend(text: string, contextOverride?: ChatContext) {
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
          context: contextOverride ?? context,
          language,
        }),
      });
      const data = (await res.json()) as { reply?: string; error?: string };
      const replyText = res.ok && data.reply ? data.reply : t.noInfo;
      setMessages((prev) => [...prev, { id: newId(), role: 'assistant', text: replyText }]);
    } catch {
      setMessages((prev) => [...prev, { id: newId(), role: 'assistant', text: t.noInfo }]);
    } finally {
      setIsTyping(false);
    }
  }

  const featuredItems = useMemo(
    () => featuredItemIds.map((id) => findItem(id)).filter((item): item is MenuItem => Boolean(item)),
    [],
  );

  return (
    <div className="min-h-[100dvh] bg-bg pb-24">
      <RestaurantHeader />

      <main className="mx-auto max-w-lg">
        <p className="px-4 pb-2 pt-4 text-[13.5px] text-muted">{t.welcome}</p>

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
                  compact
                />
              ))}
            </div>
          </section>
        )}

        {activeCategory && (
          <div ref={menuSectionRef} className="scroll-mt-16">
            <CategoryChips activeCategory={activeCategory} onSelect={selectCategory} language={language} />
            <MenuSection category={activeCategory} language={language} onAskAi={handleAskAboutItem} />
          </div>
        )}
      </main>

      <FloatingAiButton onClick={handleAskAiGlobal} language={language} />

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
