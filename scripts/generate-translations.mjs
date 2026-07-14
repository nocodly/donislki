// One-off generator: translates the base (English) UI strings and menu item
// descriptions/pairings into each supported language via the Anthropic API,
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
  // no .env file — rely on the environment already having ANTHROPIC_API_KEY
}

const LANGUAGES = {
  de: 'German',
  uk: 'Ukrainian',
  it: 'Italian',
  fr: 'French',
  es: 'Spanish',
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

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-5',
      max_tokens: 16000,
      thinking: { type: 'disabled' },
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  if (!res.ok) {
    throw new Error(`Anthropic API error ${res.status}: ${await res.text()}`);
  }

  const data = await res.json();
  console.error(`\n[debug] stop_reason=${data.stop_reason} usage=${JSON.stringify(data.usage)}`);
  const text = data.content?.find((b) => b.type === 'text')?.text ?? '';
  const jsonStart = text.indexOf('{');
  const jsonEnd = text.lastIndexOf('}');
  const jsonText = text.slice(jsonStart, jsonEnd + 1);
  try {
    return JSON.parse(jsonText);
  } catch (err) {
    const debugPath = path.join(__dirname, '..', 'lib', 'generated', `_debug-${languageName}.txt`);
    writeFileSync(debugPath, text);
    console.error(`\nJSON parse failed, raw response saved to ${debugPath}`);
    throw err;
  }
}

async function main() {
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('ANTHROPIC_API_KEY is not set');
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
