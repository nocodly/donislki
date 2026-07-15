export type MenuCategory =
  | 'weekly'
  | 'traditional'
  | 'sausages'
  | 'starters'
  | 'vegan'
  | 'desserts'
  | 'beer'
  | 'wine'
  | 'aperitif'
  | 'spirits'
  | 'drinks'
  | 'kids';

export type MenuItemSize = {
  label: string;
  price: number;
};

export type MenuItem = {
  id: string;
  /** An item can appear under more than one tab (e.g. Currywurst is both Traditional and Sausages). categories[0] is the primary one used for chat context. */
  categories: MenuCategory[];
  name: string;
  description: string;
  /** Base/single price. For items with several pours or portions, see `sizes`. */
  price: number;
  currency: string;
  /** Present when the dish/drink comes in more than one size or portion. */
  sizes?: MenuItemSize[];
  image?: string;
  tags: string[];
  allergens: string[];
  pairing?: string;
  available: boolean;
};

/**
 * Languages the static UI (category labels, item descriptions, chips) has a
 * pre-generated translation bundle for — see lib/generated/*.json, produced
 * once by scripts/generate-translations.mjs (LLM-translated, not hand-typed).
 * Detected phone locales outside this set fall back to 'en' for the UI
 * chrome, but the AI chat itself is not limited to this list — see
 * lib/systemPrompt.ts, which answers in whatever raw language code it's given.
 *
 * 'zh-hans' / 'zh-hant' cover Simplified/Traditional Chinese — see
 * normalizeToSupported in lib/i18n.ts for the region-based disambiguation
 * (navigator.language rarely carries a bare 'zh').
 */
export type SupportedLanguage =
  | 'en'
  | 'uk'
  | 'de'
  | 'fr'
  | 'es'
  | 'it'
  | 'pl'
  | 'cs'
  | 'sk'
  | 'hu'
  | 'ro'
  | 'bg'
  | 'el'
  | 'tr'
  | 'pt'
  | 'nl'
  | 'da'
  | 'sv'
  | 'no'
  | 'fi'
  | 'lt'
  | 'lv'
  | 'et'
  | 'sr'
  | 'hr'
  | 'sl'
  | 'sq'
  | 'ru'
  | 'ar'
  | 'he'
  | 'fa'
  | 'hi'
  | 'ur'
  | 'zh-hans'
  | 'zh-hant'
  | 'ja'
  | 'ko'
  | 'th'
  | 'vi'
  | 'id'
  | 'ms';

/** Free-form BCP-47-ish language code/tag, e.g. from navigator.language. */
export type Language = string;

export type ChatContext = {
  category: MenuCategory | null;
  dish: string | null;
};

export type ChatRole = 'user' | 'assistant';

export type ChatMessage = {
  id: string;
  role: ChatRole;
  text: string;
};
