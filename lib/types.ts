export type MenuCategory =
  | 'traditional'
  | 'soups'
  | 'vegan'
  | 'desserts'
  | 'beer'
  | 'wine';

export type MenuItem = {
  id: string;
  category: MenuCategory;
  name: string;
  description: string;
  price: number;
  currency: string;
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
