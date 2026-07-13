# DonislKI

AI-чат консультант для ресторану **Donisl** у Мюнхені. Гість пише про смаки/настрій — бот радить страву й напій із реального літнього меню ресторану.

## Стек
Node.js + Express (бекенд), ванільний HTML/CSS/JS (чат на фронті), Claude API (Anthropic) для відповідей.

## Запуск локально
```
npm install
cp .env.example .env   # вписати ANTHROPIC_API_KEY
npm start
```
Відкрити http://localhost:3000

## Меню
Меню лежить у `data/menu.json` — перенесене з офіційного "Sommerkarte" ресторану Donisl (категорії, страви, ціни, об'єми).
Коли з'явиться нова карта (наприклад, зимова) — оновити цей файл у тому ж форматі (categories → items → name/description/price або sizes/tags).

## Промпт і бренд
Системний промпт консультанта — `prompts/system-prompt.md`. Туди підставляється меню замість `{{MENU_JSON}}`.
Логотип узятий з офіційного PDF-меню (`public/assets/donisl-logo.png`), кольорова гама чату — золото/кремовий, як у фірмовому меню ресторану.

## Деплой на nocodly.com/donislki
1. Підняти застосунок (Docker або pm2) на сервері, порт 3000.
2. У `.env` виставити `BASE_PATH=/donislki`.
3. Додати в nginx конфіг сервера блок з `deploy/nginx-donislki.conf.example`.
4. Перезавантажити nginx (`nginx -s reload`).

### Docker
```
docker build -t donislki .
docker run -d --restart unless-stopped -p 3000:3000 --env-file .env donislki
```
