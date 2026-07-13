import type { Language, MenuCategory } from './types';

type Strings = {
  welcome: string;
  categoriesTitle: string;
  featuredTitle: string;
  askAi: string;
  chatTitle: string;
  discussing: string;
  askAboutThis: string;
  pairing: string;
  allergensLabel: string;
  allergensUnknown: string;
  composerPlaceholder: string;
  send: string;
  close: string;
  quickSuggestions: string[];
  categories: Record<MenuCategory, string>;
};

export const LANGUAGES: { code: Language; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'de', label: 'DE' },
  { code: 'uk', label: 'UA' },
];

export const STRINGS: Record<Language, Strings> = {
  en: {
    welcome: 'Browse the menu below, or ask our AI assistant for a recommendation.',
    categoriesTitle: 'Menu',
    featuredTitle: 'Featured',
    askAi: 'Ask AI',
    chatTitle: 'DonislKI',
    discussing: 'Discussing',
    askAboutThis: 'Ask AI about this',
    pairing: 'Best with',
    allergensLabel: 'Allergens',
    allergensUnknown: 'Please confirm with staff',
    composerPlaceholder: 'Ask about the menu…',
    send: 'Send',
    close: 'Close',
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
      soups: 'Soups',
      vegan: 'Vegan',
      desserts: 'Desserts',
      beer: 'Beer',
      wine: 'Wine',
    },
  },
  de: {
    welcome: 'Stöbern Sie in der Karte oder fragen Sie unseren KI-Assistenten um Rat.',
    categoriesTitle: 'Speisekarte',
    featuredTitle: 'Empfehlungen',
    askAi: 'KI fragen',
    chatTitle: 'DonislKI',
    discussing: 'Thema',
    askAboutThis: 'KI dazu fragen',
    pairing: 'Passt gut zu',
    allergensLabel: 'Allergene',
    allergensUnknown: 'Bitte beim Personal nachfragen',
    composerPlaceholder: 'Frage zur Speisekarte…',
    send: 'Senden',
    close: 'Schließen',
    quickSuggestions: [
      'Was empfehlen Sie?',
      'Welches Getränk passt dazu?',
      'Zeig vegane Optionen',
      'Was enthält Allergene?',
      'Etwas Leichtes',
      'Etwas Traditionelles',
    ],
    categories: {
      traditional: 'Traditionell',
      soups: 'Suppen',
      vegan: 'Vegan',
      desserts: 'Desserts',
      beer: 'Bier',
      wine: 'Wein',
    },
  },
  uk: {
    welcome: 'Перегляньте меню нижче або запитайте нашого AI-асистента про рекомендацію.',
    categoriesTitle: 'Меню',
    featuredTitle: 'Рекомендуємо',
    askAi: 'Запитати AI',
    chatTitle: 'DonislKI',
    discussing: 'Обговорюємо',
    askAboutThis: 'Запитати AI про це',
    pairing: 'Добре поєднується з',
    allergensLabel: 'Алергени',
    allergensUnknown: 'Уточніть в офіціанта',
    composerPlaceholder: 'Запитай про меню…',
    send: 'Надіслати',
    close: 'Закрити',
    quickSuggestions: [
      'Що порадите?',
      'Який напій пасує до цієї страви?',
      'Покажи веганські варіанти',
      'Що містить алергени?',
      'Щось легке',
      'Щось традиційне',
    ],
    categories: {
      traditional: 'Традиційні',
      soups: 'Супи',
      vegan: 'Веганські',
      desserts: 'Десерти',
      beer: 'Пиво',
      wine: 'Вино',
    },
  },
};
