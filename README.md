# DonislKI

Mobile-first menu for restaurant **Donisl** in Munich. 80% traditional menu
browsing, 20% optional AI assistant — the chat is a bottom sheet over the
menu, never the primary interface.

## Stack

Next.js (App Router) + TypeScript + Tailwind CSS + React + lucide-react.
No auth, no payments, no database, no admin dashboard — menu data is local
and typed (`lib/menuData.ts`).

## Run locally

```
npm install
cp .env.example .env   # fill in ANTHROPIC_API_KEY
npm run dev
```

Open http://localhost:3000

```
npm run typecheck   # tsc --noEmit
npm run lint        # next lint
npm run build        # production build
```

## Structure

```
app/page.tsx                  — main screen, owns all top-level state
app/api/chat/route.ts         — server route, calls the Anthropic API (key never reaches the client)
app/layout.tsx, globals.css   — shell + Tailwind entry
lib/types.ts                  — MenuCategory / MenuItem / ChatContext / ChatMessage types
lib/menuData.ts                — real dish data (curated from the official Sommerkarte), category metadata
lib/i18n.ts                    — UI strings (en / de / uk) + quick-suggestion text
lib/systemPrompt.ts            — builds the system prompt sent to Claude (menu + context + language)
lib/restaurant.ts              — name / subtitle / logo
components/                    — RestaurantHeader, CategoryGrid, CategoryChips, MenuSection,
                                  MenuItemCard, FloatingAiButton, AiBottomSheet, ChatMessages,
                                  QuickSuggestions, ChatComposer, LanguageSelector
hooks/useVisualViewportHeight.ts — tracks the real visible viewport (--vvh) so the AI sheet
                                    never sits behind the on-screen keyboard on iOS Safari
hooks/useScrollLock.ts          — locks page scroll while the AI sheet is open, restores
                                    the exact scroll position on close
```

## AI assistant

The bottom sheet calls a real Claude endpoint (`app/api/chat/route.ts`), not a mock — the
system prompt only ever sees the local menu data plus the current `{category, dish}`
context and answers in the guest's selected language. It never invents dishes, prices,
ingredients, allergens, or pairings; this menu has no verified per-dish allergen data, so
it always tells the guest to confirm with staff.

## Menu data

`lib/menuData.ts` maps the real Donisl menu into six categories: traditional, soups,
vegan, desserts, beer, wine. The full source list (23 categories, ~120 items) lives in
`data/menu.json` for reference — only a curated, representative subset was ported here to
keep the mock data model readable; extending a category is just adding another object to
the `menuItems` array.

## Deploy

Railway, one service, Dockerfile does a standard Next.js standalone build. Set
`ANTHROPIC_API_KEY` as a service variable. Domain: `donislki.nocodly.com`.
