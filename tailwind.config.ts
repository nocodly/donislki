import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#FAF6EF',
        surface: '#FFFDF9',
        card: '#FFFFFF',
        ink: '#241F1A',
        muted: '#7A6A6A',
        border: '#EDE2D3',
        accent: '#9E1B1B',
        'accent-deep': '#7A1414',
        gold: '#C9A227',
        // Oktoberfest / Wiesn accent — Bavarian meadow green
        wiesn: '#2E7D32',
        'wiesn-deep': '#1B5E20',
        'wiesn-tint': '#EAF3EA',
      },
      borderRadius: {
        card: '16px',
      },
      fontFamily: {
        serif: ['Georgia', '"Iowan Old Style"', '"Times New Roman"', 'serif'],
        sans: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
