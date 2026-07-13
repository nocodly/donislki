export type MenuCategory =
  | 'traditional'
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
  category: MenuCategory;
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

export type Language = 'en' | 'de' | 'uk';

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
