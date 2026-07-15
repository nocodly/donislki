// One-off generator: translates the base (English) UI strings and menu item
// descriptions/pairings into each supported language via the OpenAI API,
// and writes the result as static JSON under lib/generated/. Run manually
// with `npm run generate:translations` whenever menuData.ts or the English
// strings in i18n.ts change — the app itself never calls the AI for this,
// it just ships the generated files, so menu browsing stays instant.
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { BASE_STRINGS } from '../lib/i18n.ts';
import { menuItems } from '../lib/menuData.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const envPath = path.join(__dirname, '..', '.env');
try {
  for (const line of readFileSync(envPath, 'utf8').split('\n')) {
    const m = line.match(/^([A-Z_]+)=(.*)$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim();
  }
} catch {
  // no .env file — rely on the environment already having OPENAI_API_KEY
}

const MODEL = 'gpt-4o-mini';

const LANGUAGES = {
  uk: 'Ukrainian',
  de: 'German',
  fr: 'French',
  es: 'Spanish',
  it: 'Italian',
  pl: 'Polish',
  cs: 'Czech',
  sk: 'Slovak',
  hu: 'Hungarian',
  ro: 'Romanian',
  bg: 'Bulgarian',
  el: 'Greek',
  tr: 'Turkish',
  pt: 'Portuguese',
  nl: 'Dutch',
  da: 'Danish',
  sv: 'Swedish',
  no: 'Norwegian',
  fi: 'Finnish',
  lt: 'Lithuanian',
  lv: 'Latvian',
  et: 'Estonian',
  sr: 'Serbian',
  hr: 'Croatian',
  sl: 'Slovenian',
  sq: 'Albanian',
  ru: 'Russian',
  ar: 'Arabic',
  he: 'Hebrew',
  fa: 'Persian (Farsi)',
  hi: 'Hindi',
  ur: 'Urdu',
  'zh-hans': 'Chinese (Simplified)',
  'zh-hant': 'Chinese (Traditional)',
  ja: 'Japanese',
  ko: 'Korean',
  th: 'Thai',
  vi: 'Vietnamese',
  id: 'Indonesian',
  ms: 'Malay',
};

const translatableItems = menuItems.map((item) => ({
  id: item.id,
  description: item.description,
  ...(item.pairing ? { pairing: item.pairing } : {}),
}));

const { categories, tagLabels, quickSuggestions, ...restStrings } = BASE_STRINGS;

const sourcePayload = {
  strings: { ...restStrings, categories, tagLabels, quickSuggestions },
  items: translatableItems,
};

async function translate(languageName) {
  const prompt = `Translate the "strings" and "items" values in this JSON into ${languageName}. This is UI copy and menu descriptions for a Bavarian restaurant's mobile menu app.

Rules:
- Translate every string VALUE. Never translate JSON keys/ids.
- In "askAboutDishTemplate", keep the literal token {dish} unchanged — translate only the surrounding words.
- Keep dish/drink proper names that appear inside descriptions untranslated where they are brand/German culinary terms (e.g. "Kaiserschmarrn", "Spätzle"), but translate the descriptive words around them.
- Keep the output natural and idiomatic, not a literal word-for-word translation.
- Output ONLY raw JSON, no markdown code fences, no commentary, matching exactly this shape:
{"strings": {...same keys as input strings...}, "items": {"<id>": {"description": "...", "pairing": "..." (only if the input item had a pairing field)}}}

Input:
${JSON.stringify(sourcePayload)}`;

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 16000,
      response_format: { type: 'json_object' },
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  if (!res.ok) {
    throw new Error(`OpenAI API error ${res.status}: ${await res.text()}`);
  }

  const data = await res.json();
  console.error(`\n[debug] finish_reason=${data.choices?.[0]?.finish_reason} usage=${JSON.stringify(data.usage)}`);
  const text = data.choices?.[0]?.message?.content ?? '';
  try {
    return JSON.parse(text);
  } catch (err) {
    const debugPath = path.join(__dirname, '..', 'lib', 'generated', `_debug-${languageName}.txt`);
    writeFileSync(debugPath, text);
    console.error(`\nJSON parse failed, raw response saved to ${debugPath}`);
    throw err;
  }
}

async function main() {
  if (!process.env.OPENAI_API_KEY) {
    console.error('OPENAI_API_KEY is not set');
    process.exit(1);
  }

  for (const [code, name] of Object.entries(LANGUAGES)) {
    process.stdout.write(`Translating to ${name}... `);
    const result = await translate(name);
    const outPath = path.join(__dirname, '..', 'lib', 'generated', `${code}.json`);
    writeFileSync(outPath, JSON.stringify(result, null, 2) + '\n');
    console.log(`done (${outPath})`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
