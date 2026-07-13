import express from 'express';
import dotenv from 'dotenv';
import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(express.json());

const BASE_PATH = process.env.BASE_PATH || '';
const PORT = process.env.PORT || 3000;

const menu = JSON.parse(readFileSync(path.join(__dirname, 'data/menu.json'), 'utf-8'));
const systemPromptTemplate = readFileSync(path.join(__dirname, 'prompts/system-prompt.md'), 'utf-8');

function buildSystemPrompt() {
  return systemPromptTemplate.replace('{{MENU_JSON}}', JSON.stringify(menu, null, 2));
}

app.get(`${BASE_PATH}/`, (req, res) => {
  console.log('[web] serving index');
  let html = readFileSync(path.join(__dirname, 'public/index.html'), 'utf-8');
  html = html.replaceAll('__BASE_PATH__', BASE_PATH);
  res.send(html);
});

app.use(BASE_PATH || '/', express.static(path.join(__dirname, 'public')));

app.post(`${BASE_PATH}/api/chat`, async (req, res) => {
  console.log('[chat] request received');
  try {
    const { messages } = req.body;
    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'messages must be a non-empty array' });
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-5',
        max_tokens: 1024,
        system: buildSystemPrompt(),
        messages,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('[chat] Anthropic API error', response.status, errText);
      return res.status(502).json({ error: 'AI service unavailable' });
    }

    const data = await response.json();
    const reply = data.content?.[0]?.text ?? '';
    console.log('[chat] request completed');
    res.json({ reply });
  } catch (err) {
    console.error('[chat] unexpected error', err);
    res.status(500).json({ error: 'Internal error' });
  }
});

app.listen(PORT, () => {
  console.log(`DonislKI listening on port ${PORT}, base path "${BASE_PATH || '/'}"`);
});
