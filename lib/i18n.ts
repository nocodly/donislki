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
 * Anthropic API call, not typed by hand) into lib/generated/<lang>.json,
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
  },
};

const SUPPORTED_LANGUAGES: SupportedLanguage[] = ['en', 'de', 'uk', 'it', 'fr', 'es'];

export type TranslatedItemText = { description: string; pairing?: string };
type GeneratedBundle = { strings: Strings; items: Record<string, TranslatedItemText> };

// Statically imported so translated content ships as part of the build —
// no runtime fetch/latency for the menu UI.
import de from './generated/de.json';
import uk from './generated/uk.json';
import it from './generated/it.json';
import fr from './generated/fr.json';
import es from './generated/es.json';

const GENERATED: Partial<Record<SupportedLanguage, GeneratedBundle>> = {
  de: de as GeneratedBundle,
  uk: uk as GeneratedBundle,
  it: it as GeneratedBundle,
  fr: fr as GeneratedBundle,
  es: es as GeneratedBundle,
};

export function normalizeToSupported(language: Language): SupportedLanguage {
  const primary = language.split('-')[0]?.toLowerCase();
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
