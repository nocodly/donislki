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
cp .env.example .env   # fill in OPENAI_API_KEY
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
app/api/chat/route.ts         — server route, calls the OpenAI API (key never reaches the client)
app/layout.tsx, globals.css   — shell + Tailwind entry
lib/types.ts                  — MenuCategory / MenuItem / ChatContext / ChatMessage types
lib/menuData.ts                — real dish data (curated from the official Sommerkarte), category metadata
lib/i18n.ts                    — UI strings (41 languages) + quick-suggestion text
lib/systemPrompt.ts            — builds the system prompt sent to Claude (menu + context + language)
lib/restaurant.ts              — name / subtitle / logo
components/                    — RestaurantHeader, CategoryGrid, CategoryChips, MenuSection,
                                  MenuItemCard, FloatingAiButton, AiBottomSheet, ChatMessages,
                                  QuickSuggestions, ChatComposer
hooks/useVisualViewportHeight.ts — tracks the real visible viewport (--vvh) so the AI sheet
                                    never sits behind the on-screen keyboard on iOS Safari
hooks/useScrollLock.ts          — locks page scroll while the AI sheet is open, restores
                                    the exact scroll position on close
```

## AI assistant

The bottom sheet calls a real OpenAI endpoint (`app/api/chat/route.ts`, model `gpt-5-mini`),
not a mock — the system prompt only ever sees the local menu data plus the current
`{category, dish}` context and answers in the guest's selected language. It never invents
dishes, prices, ingredients, allergens, or pairings; this menu has no verified per-dish
allergen data, so it always tells the guest to confirm with staff.

## Languages

The UI is auto-detected from the phone's locale (`navigator.languages`) and falls back to
English for anything unrecognized. 41 languages are pre-translated and shipped as static
JSON (`lib/generated/*.json`, generated once via `npm run generate:translations` — see
`scripts/generate-translations.mjs`, an OpenAI API call, not hand-typed):

Ukrainian, English, German, French, Spanish, Italian, Polish, Czech, Slovak, Hungarian,
Romanian, Bulgarian, Greek, Turkish, Portuguese, Dutch, Danish, Swedish, Norwegian, Finnish,
Lithuanian, Latvian, Estonian, Serbian, Croatian, Slovenian, Albanian, Russian, Arabic,
Hebrew, Persian, Hindi, Urdu, Chinese (Simplified), Chinese (Traditional), Japanese, Korean,
Thai, Vietnamese, Indonesian, Malay.

Arabic, Hebrew, Persian, and Urdu additionally flip the layout to right-to-left.

## Menu data

`lib/menuData.ts` maps the real Donisl menu into browsing categories: weekly specials,
traditional, sausages, starters, vegan, desserts, beer, wine, aperitif, spirits,
non-alcoholic drinks, and kids. The full Sommerkarte source list (23 categories, ~120 items)
lives in `data/menu.json` for reference — only a curated, representative subset was ported
into the app's categories. The "weekly" category additionally tracks the restaurant's
physical Wochenkarte (chanterelle-season dishes plus Monday–Friday lunch specials) and needs
manual updating when that card changes — there's no day-of-week filtering, each lunch
special just states its day in the name. Extending a category is just adding another object
to the `menuItems` array.

## Deploy

Railway, one service, Dockerfile does a standard Next.js standalone build. Set
`OPENAI_API_KEY` as a service variable. Domain: `donislki.nocodly.com`.
