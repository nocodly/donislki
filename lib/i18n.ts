import type { Language, MenuCategory, SupportedLanguage } from './types';

export type Strings = {
  welcome: string;
  categoriesTitle: string;
  featuredTitle: string;
  askAi: string;
  chatTitle: string;
  discussing: string;
  askAboutThis: string;
  /** Home screen — "today's lunch special" card. */
  todaysLunchTitle: string;
  /** Shown on weekends when there is no weekday lunch special. */
  weekendLunchTitle: string;
  weekendLunchText: string;
  /** Oktoberfest home-screen banner + category badge. */
  oktoberfestBadge: string;
  oktoberfestBannerTitle: string;
  oktoberfestBannerText: string;
  /** Contains the literal token `{dish}`, replaced client-side with the dish name. */
  askAboutDishTemplate: string;
  pairing: string;
  /** Prefix shown before the lowest price of a multi-size item, e.g. "from 6.50 €". */
  fromPricePrefix: string;
  allergensLabel: string;
  allergensUnknown: string;
  composerPlaceholder: string;
  send: string;
  close: string;
  noInfo: string;
  quickSuggestions: string[];
  categories: Record<MenuCategory, string>;
  tagLabels: Record<string, string>;
};

/**
 * English is the single hand-written source of truth. Every other language
 * is machine-translated once by scripts/generate-translations.mjs (an
 * OpenAI API call, not typed by hand) into lib/generated/<lang>.json,
 * committed as static files so the menu still renders instantly at runtime —
 * no per-request translation call.
 */
export const BASE_STRINGS: Strings = {
  welcome: 'Browse the menu below, or ask our AI assistant for a recommendation.',
  categoriesTitle: 'Menu',
  featuredTitle: 'Featured',
  askAi: 'Ask AI',
  chatTitle: 'DonislKI',
  discussing: 'Discussing',
  askAboutThis: 'Ask AI about this',
  todaysLunchTitle: "Today's lunch special",
  weekendLunchTitle: 'Weekend at the Donisl',
  weekendLunchText: 'No weekday lunch special today — our Oktoberfest Schmankerl are on all weekend.',
  oktoberfestBadge: "It's Oktoberfest",
  oktoberfestBannerTitle: 'Oktoberfest Schmankerl',
  oktoberfestBannerText: "Wiesn time has started — our Oktoberfest specials are being served now.",
  askAboutDishTemplate: 'Tell me about {dish}',
  pairing: 'Best with',
  fromPricePrefix: 'from ',
  allergensLabel: 'Allergens',
  allergensUnknown: 'Please confirm with staff',
  composerPlaceholder: 'Ask about the menu…',
  send: 'Send',
  close: 'Close',
  noInfo: "I don't have that information in the current menu.",
  quickSuggestions: [
    'What do you recommend?',
    'Which drink matches this dish?',
    'Show vegan options',
    'What contains allergens?',
    'Something light',
    'Something traditional',
  ],
  categories: {
    weekly: 'Lunch specials',
    oktoberfest: 'Oktoberfest',
    traditional: 'Traditional',
    sausages: 'Sausages',
    starters: 'Starters',
    vegan: 'Vegan',
    desserts: 'Desserts',
    beer: 'Beer',
    wine: 'Wine',
    aperitif: 'Aperitif',
    spirits: 'Spirits',
    drinks: 'Non-alcoholic drinks & coffee',
    kids: 'Kids',
  },
  tagLabels: {
    sharing: 'sharing',
    signature: 'signature',
    hearty: 'hearty',
    classic: 'classic',
    light: 'light',
    seasonal: 'seasonal',
    strong: 'strong',
    'non-alcoholic': 'non-alcoholic',
    vegetarian: 'vegetarian',
    vegan: 'vegan',
    spirit: 'spirit',
    water: 'water',
    coffee: 'coffee',
    'hot-drink': 'hot drink',
    aperitif: 'aperitif',
    bowl: 'bowl',
    white: 'white',
    red: 'red',
    rose: 'rosé',
    sparkling: 'sparkling',
    'dessert-wine': 'dessert wine',
    'by-glass': 'by the glass',
    bottle: 'bottle',
    'lunch-special': 'lunch special',
    gluten: 'gluten',
    dairy: 'dairy',
    egg: 'egg',
    mustard: 'mustard',
    nuts: 'nuts',
    peanuts: 'peanuts',
    fish: 'fish',
    soy: 'soy',
    celery: 'celery',
    sulphites: 'sulphites',
    sesame: 'sesame',
  },
};

const SUPPORTED_LANGUAGES: SupportedLanguage[] = [
  'en',
  'uk',
  'de',
  'fr',
  'es',
  'it',
  'pl',
  'cs',
  'sk',
  'hu',
  'ro',
  'bg',
  'el',
  'tr',
  'pt',
  'nl',
  'da',
  'sv',
  'no',
  'fi',
  'lt',
  'lv',
  'et',
  'sr',
  'hr',
  'sl',
  'sq',
  'ru',
  'ar',
  'he',
  'fa',
  'hi',
  'ur',
  'zh-hans',
  'zh-hant',
  'ja',
  'ko',
  'th',
  'vi',
  'id',
  'ms',
];

/** Languages written right-to-left — the UI flips container direction for these. */
const RTL_LANGUAGES: ReadonlySet<SupportedLanguage> = new Set(['ar', 'he', 'fa', 'ur']);

export function isRtlLanguage(language: SupportedLanguage): boolean {
  return RTL_LANGUAGES.has(language);
}

export type TranslatedItemText = { description: string; pairing?: string };
/**
 * A pre-generated language bundle. `strings` is `Partial` because bundles are
 * generated once and can lag behind newly-added `Strings` keys — getStrings()
 * fills any gap from the English BASE_STRINGS.
 */
type GeneratedBundle = {
  strings: Partial<Strings> & { categories?: Partial<Strings['categories']>; tagLabels?: Partial<Strings['tagLabels']> };
  items: Record<string, TranslatedItemText>;
};

// Statically imported so translated content ships as part of the build —
// no runtime fetch/latency for the menu UI.
import uk from './generated/uk.json';
import de from './generated/de.json';
import fr from './generated/fr.json';
import es from './generated/es.json';
import it from './generated/it.json';
import pl from './generated/pl.json';
import cs from './generated/cs.json';
import sk from './generated/sk.json';
import hu from './generated/hu.json';
import ro from './generated/ro.json';
import bg from './generated/bg.json';
import el from './generated/el.json';
import tr from './generated/tr.json';
import pt from './generated/pt.json';
import nl from './generated/nl.json';
import da from './generated/da.json';
import sv from './generated/sv.json';
import no from './generated/no.json';
import fi from './generated/fi.json';
import lt from './generated/lt.json';
import lv from './generated/lv.json';
import et from './generated/et.json';
import sr from './generated/sr.json';
import hr from './generated/hr.json';
import sl from './generated/sl.json';
import sq from './generated/sq.json';
import ru from './generated/ru.json';
import ar from './generated/ar.json';
import he from './generated/he.json';
import fa from './generated/fa.json';
import hi from './generated/hi.json';
import ur from './generated/ur.json';
import zhHans from './generated/zh-hans.json';
import zhHant from './generated/zh-hant.json';
import ja from './generated/ja.json';
import ko from './generated/ko.json';
import th from './generated/th.json';
import vi from './generated/vi.json';
import id from './generated/id.json';
import ms from './generated/ms.json';

const GENERATED: Partial<Record<SupportedLanguage, GeneratedBundle>> = {
  uk: uk as unknown as GeneratedBundle,
  de: de as unknown as GeneratedBundle,
  fr: fr as unknown as GeneratedBundle,
  es: es as unknown as GeneratedBundle,
  it: it as unknown as GeneratedBundle,
  pl: pl as unknown as GeneratedBundle,
  cs: cs as unknown as GeneratedBundle,
  sk: sk as unknown as GeneratedBundle,
  hu: hu as unknown as GeneratedBundle,
  ro: ro as unknown as GeneratedBundle,
  bg: bg as unknown as GeneratedBundle,
  el: el as unknown as GeneratedBundle,
  tr: tr as unknown as GeneratedBundle,
  pt: pt as unknown as GeneratedBundle,
  nl: nl as unknown as GeneratedBundle,
  da: da as unknown as GeneratedBundle,
  sv: sv as unknown as GeneratedBundle,
  no: no as unknown as GeneratedBundle,
  fi: fi as unknown as GeneratedBundle,
  lt: lt as unknown as GeneratedBundle,
  lv: lv as unknown as GeneratedBundle,
  et: et as unknown as GeneratedBundle,
  sr: sr as unknown as GeneratedBundle,
  hr: hr as unknown as GeneratedBundle,
  sl: sl as unknown as GeneratedBundle,
  sq: sq as unknown as GeneratedBundle,
  ru: ru as unknown as GeneratedBundle,
  ar: ar as unknown as GeneratedBundle,
  he: he as unknown as GeneratedBundle,
  fa: fa as unknown as GeneratedBundle,
  hi: hi as unknown as GeneratedBundle,
  ur: ur as unknown as GeneratedBundle,
  'zh-hans': zhHans as unknown as GeneratedBundle,
  'zh-hant': zhHant as unknown as GeneratedBundle,
  ja: ja as unknown as GeneratedBundle,
  ko: ko as unknown as GeneratedBundle,
  th: th as unknown as GeneratedBundle,
  vi: vi as unknown as GeneratedBundle,
  id: id as unknown as GeneratedBundle,
  ms: ms as unknown as GeneratedBundle,
};

/** Region subtags that mean "Traditional" for a bare 'zh' locale (navigator.language rarely omits the region for Chinese). */
const CHINESE_TRADITIONAL_REGIONS = new Set(['TW', 'HK', 'MO']);

export function normalizeToSupported(language: Language): SupportedLanguage {
  const lower = language.toLowerCase();
  if (lower.startsWith('zh')) {
    const [, region] = language.split('-');
    if (region && CHINESE_TRADITIONAL_REGIONS.has(region.toUpperCase())) return 'zh-hant';
    if (lower.includes('hant')) return 'zh-hant';
    return 'zh-hans';
  }
  const primary = lower.split('-')[0];
  return (SUPPORTED_LANGUAGES.find((l) => l === primary) ?? 'en') as SupportedLanguage;
}

export function getStrings(language: Language): Strings {
  const supported = normalizeToSupported(language);
  if (supported === 'en') return BASE_STRINGS;
  const bundle = GENERATED[supported];
  if (!bundle) return BASE_STRINGS;
  // Shallow-merge top-level strings, but deep-merge the nested label maps so a
  // stale translation bundle (generated before a new category / tag existed)
  // still falls back to the English label instead of rendering `undefined`.
  return {
    ...BASE_STRINGS,
    ...bundle.strings,
    categories: { ...BASE_STRINGS.categories, ...bundle.strings?.categories },
    tagLabels: { ...BASE_STRINGS.tagLabels, ...bundle.strings?.tagLabels },
  };
}

export function getTranslatedItemText(language: Language, itemId: string): TranslatedItemText | undefined {
  const supported = normalizeToSupported(language);
  if (supported === 'en') return undefined;
  return GENERATED[supported]?.items[itemId];
}

export function formatAskAboutDish(strings: Strings, dishName: string): string {
  return strings.askAboutDishTemplate.replace('{dish}', dishName);
}

export function detectLanguage(): Language {
  if (typeof navigator === 'undefined') return 'en';
  const candidates = navigator.languages?.length ? navigator.languages : [navigator.language];
  return candidates[0] ?? 'en';
}
