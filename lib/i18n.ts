import type { Language, MenuCategory, SupportedLanguage } from './types';

export type Strings = {
  welcome: string;
  categoriesTitle: string;
  featuredTitle: string;
  askAi: string;
  chatTitle: string;
  discussing: string;
  askAboutThis: string;
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
    weekly: 'Weekly specials',
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
type GeneratedBundle = { strings: Strings; items: Record<string, TranslatedItemText> };

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
  uk: uk as GeneratedBundle,
  de: de as GeneratedBundle,
  fr: fr as GeneratedBundle,
  es: es as GeneratedBundle,
  it: it as GeneratedBundle,
  pl: pl as GeneratedBundle,
  cs: cs as GeneratedBundle,
  sk: sk as GeneratedBundle,
  hu: hu as GeneratedBundle,
  ro: ro as GeneratedBundle,
  bg: bg as GeneratedBundle,
  el: el as GeneratedBundle,
  tr: tr as GeneratedBundle,
  pt: pt as GeneratedBundle,
  nl: nl as GeneratedBundle,
  da: da as GeneratedBundle,
  sv: sv as GeneratedBundle,
  no: no as GeneratedBundle,
  fi: fi as GeneratedBundle,
  lt: lt as GeneratedBundle,
  lv: lv as GeneratedBundle,
  et: et as GeneratedBundle,
  sr: sr as GeneratedBundle,
  hr: hr as GeneratedBundle,
  sl: sl as GeneratedBundle,
  sq: sq as GeneratedBundle,
  ru: ru as GeneratedBundle,
  ar: ar as GeneratedBundle,
  he: he as GeneratedBundle,
  fa: fa as GeneratedBundle,
  hi: hi as GeneratedBundle,
  ur: ur as GeneratedBundle,
  'zh-hans': zhHans as GeneratedBundle,
  'zh-hant': zhHant as GeneratedBundle,
  ja: ja as GeneratedBundle,
  ko: ko as GeneratedBundle,
  th: th as GeneratedBundle,
  vi: vi as GeneratedBundle,
  id: id as GeneratedBundle,
  ms: ms as GeneratedBundle,
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
  return bundle ? { ...BASE_STRINGS, ...bundle.strings } : BASE_STRINGS;
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
