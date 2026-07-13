/* ---------- Localization ---------- */
const TRANSLATIONS = {
  uk: {
    subtitle: 'KI консультант',
    greeting: 'Grüß Gott! 👋 Я DonislKI — допоможу обрати страву чи напій із меню ресторану Donisl 🥨🍺. Що вам сьогодні до смаку?',
    placeholder: 'Запитай DonislKi',
    credit: 'Розроблено',
    typing: 'друкує…',
    errorApi: '😕 Вибачте, зараз не можу відповісти. Спробуйте ще раз за хвилину.',
    errorConnection: '📶 Проблема з підключенням. Перевірте інтернет і спробуйте ще раз.',
    chips: [
      { icon: '🍖', label: 'Традиційні страви', q: 'Покажи традиційні страви' },
      { icon: '🥗', label: 'Закуски', q: 'Що є із закусок?' },
      { icon: '🌱', label: 'Вегетаріанські / веганські', q: 'Що є вегетаріанського чи веганського?' },
      { icon: '🍰', label: 'Десерти', q: 'Що є на десерт?' },
      { icon: '🍺', label: 'Пиво', q: 'Яке пиво у вас є?' },
      { icon: '🍷', label: 'Вино', q: 'Яке вино у вас є?' },
      { icon: '☕', label: 'Безалкогольні напої та кава', q: 'Які безалкогольні напої та кава є?' },
    ],
  },
  de: {
    subtitle: 'KI-Berater',
    greeting: 'Grüß Gott! 👋 Ich bin DonislKI — ich helfe Ihnen, ein Gericht oder Getränk aus der Speisekarte von Donisl zu wählen 🥨🍺. Worauf haben Sie heute Lust?',
    placeholder: 'Frag DonislKi',
    credit: 'Entwickelt von',
    typing: 'schreibt…',
    errorApi: '😕 Entschuldigung, ich kann gerade nicht antworten. Bitte versuchen Sie es in einer Minute erneut.',
    errorConnection: '📶 Verbindungsproblem. Bitte Internet prüfen und erneut versuchen.',
    chips: [
      { icon: '🍖', label: 'Traditionelle Gerichte', q: 'Zeig mir traditionelle Gerichte' },
      { icon: '🥗', label: 'Vorspeisen', q: 'Was gibt es an Vorspeisen?' },
      { icon: '🌱', label: 'Vegetarisch / vegan', q: 'Was gibt es Vegetarisches oder Veganes?' },
      { icon: '🍰', label: 'Desserts', q: 'Was gibt es zum Nachtisch?' },
      { icon: '🍺', label: 'Bier', q: 'Welche Biere gibt es?' },
      { icon: '🍷', label: 'Wein', q: 'Welche Weine gibt es?' },
      { icon: '☕', label: 'Alkoholfrei & Kaffee', q: 'Welche alkoholfreien Getränke und Kaffee gibt es?' },
    ],
  },
  en: {
    subtitle: 'AI Consultant',
    greeting: "Grüß Gott! 👋 I'm DonislKI — I'll help you pick a dish or drink from Donisl's menu 🥨🍺. What are you in the mood for today?",
    placeholder: 'Ask DonislKi',
    credit: 'Developed by',
    typing: 'typing…',
    errorApi: "😕 Sorry, I can't respond right now. Please try again in a minute.",
    errorConnection: '📶 Connection problem. Check your internet and try again.',
    chips: [
      { icon: '🍖', label: 'Traditional dishes', q: 'Show me traditional dishes' },
      { icon: '🥗', label: 'Starters', q: 'What starters do you have?' },
      { icon: '🌱', label: 'Vegetarian / vegan', q: 'What vegetarian or vegan options do you have?' },
      { icon: '🍰', label: 'Desserts', q: 'What desserts do you have?' },
      { icon: '🍺', label: 'Beer', q: 'What beers do you have?' },
      { icon: '🍷', label: 'Wine', q: 'What wines do you have?' },
      { icon: '☕', label: 'Soft drinks & coffee', q: 'What soft drinks and coffee do you have?' },
    ],
  },
  it: {
    subtitle: 'Consulente KI',
    greeting: 'Grüß Gott! 👋 Sono DonislKI — ti aiuto a scegliere un piatto o una bevanda dal menù di Donisl 🥨🍺. Cosa ti va oggi?',
    placeholder: 'Chiedi a DonislKi',
    credit: 'Sviluppato da',
    typing: 'sta scrivendo…',
    errorApi: '😕 Spiacente, al momento non posso rispondere. Riprova tra un minuto.',
    errorConnection: '📶 Problema di connessione. Controlla internet e riprova.',
    chips: [
      { icon: '🍖', label: 'Piatti tradizionali', q: 'Mostrami i piatti tradizionali' },
      { icon: '🥗', label: 'Antipasti', q: 'Quali antipasti avete?' },
      { icon: '🌱', label: 'Vegetariano / vegano', q: 'Cosa avete di vegetariano o vegano?' },
      { icon: '🍰', label: 'Dolci', q: 'Cosa avete per dessert?' },
      { icon: '🍺', label: 'Birra', q: 'Quali birre avete?' },
      { icon: '🍷', label: 'Vino', q: 'Quali vini avete?' },
      { icon: '☕', label: 'Bevande analcoliche e caffè', q: 'Quali bevande analcoliche e caffè avete?' },
    ],
  },
  fr: {
    subtitle: 'Consultant KI',
    greeting: "Grüß Gott ! 👋 Je suis DonislKI — je vous aide à choisir un plat ou une boisson du menu de Donisl 🥨🍺. Qu'est-ce qui vous ferait plaisir aujourd'hui ?",
    placeholder: 'Demande à DonislKi',
    credit: 'Développé par',
    typing: 'écrit…',
    errorApi: "😕 Désolé, je ne peux pas répondre pour le moment. Réessayez dans une minute.",
    errorConnection: '📶 Problème de connexion. Vérifiez votre internet et réessayez.',
    chips: [
      { icon: '🍖', label: 'Plats traditionnels', q: 'Montrez-moi les plats traditionnels' },
      { icon: '🥗', label: 'Entrées', q: 'Quelles entrées avez-vous ?' },
      { icon: '🌱', label: 'Végétarien / végan', q: "Qu'avez-vous de végétarien ou végan ?" },
      { icon: '🍰', label: 'Desserts', q: 'Qu\'avez-vous comme dessert ?' },
      { icon: '🍺', label: 'Bière', q: 'Quelles bières avez-vous ?' },
      { icon: '🍷', label: 'Vin', q: 'Quels vins avez-vous ?' },
      { icon: '☕', label: 'Boissons sans alcool et café', q: 'Quelles boissons sans alcool et cafés avez-vous ?' },
    ],
  },
  es: {
    subtitle: 'Consultor KI',
    greeting: 'Grüß Gott! 👋 Soy DonislKI — te ayudo a elegir un plato o una bebida del menú de Donisl 🥨🍺. ¿Qué se te antoja hoy?',
    placeholder: 'Pregunta a DonislKi',
    credit: 'Desarrollado por',
    typing: 'escribiendo…',
    errorApi: '😕 Lo siento, ahora mismo no puedo responder. Inténtalo de nuevo en un minuto.',
    errorConnection: '📶 Problema de conexión. Comprueba tu internet e inténtalo de nuevo.',
    chips: [
      { icon: '🍖', label: 'Platos tradicionales', q: 'Muéstrame los platos tradicionales' },
      { icon: '🥗', label: 'Entrantes', q: '¿Qué entrantes tenéis?' },
      { icon: '🌱', label: 'Vegetariano / vegano', q: '¿Qué opciones vegetarianas o veganas tenéis?' },
      { icon: '🍰', label: 'Postres', q: '¿Qué postres tenéis?' },
      { icon: '🍺', label: 'Cerveza', q: '¿Qué cervezas tenéis?' },
      { icon: '🍷', label: 'Vino', q: '¿Qué vinos tenéis?' },
      { icon: '☕', label: 'Bebidas sin alcohol y café', q: '¿Qué bebidas sin alcohol y café tenéis?' },
    ],
  },
};

function detectLang() {
  const candidates = navigator.languages && navigator.languages.length
    ? navigator.languages
    : [navigator.language || 'de'];
  for (const l of candidates) {
    const primary = l.split('-')[0].toLowerCase();
    if (TRANSLATIONS[primary]) return primary;
  }
  return 'de';
}

const lang = detectLang();
const t = TRANSLATIONS[lang] || TRANSLATIONS.de;
document.documentElement.lang = lang;

/* ---------- DOM refs ---------- */
const messagesEl = document.getElementById('messages');
const formEl = document.getElementById('form');
const inputEl = document.getElementById('input');
const landingEl = document.getElementById('landing');
const startBtn = document.getElementById('startBtn');
const suggestionsEl = document.getElementById('suggestions');
const subtitleEl = document.getElementById('subtitle');
const creditEls = document.querySelectorAll('.credit-text');

subtitleEl.textContent = t.subtitle;
inputEl.placeholder = t.placeholder;
creditEls.forEach((el) => { el.textContent = t.credit; });

/* ---------- Keep layout pinned above the mobile keyboard ---------- */
const appEl = document.querySelector('.app');
function syncViewportHeight() {
  const h = window.visualViewport ? window.visualViewport.height : window.innerHeight;
  appEl.style.height = `${h}px`;
}
syncViewportHeight();
if (window.visualViewport) {
  window.visualViewport.addEventListener('resize', syncViewportHeight);
  window.visualViewport.addEventListener('scroll', syncViewportHeight);
} else {
  window.addEventListener('resize', syncViewportHeight);
}

const chipButtons = suggestionsEl.querySelectorAll('.chip');
chipButtons.forEach((btn, i) => {
  const chip = t.chips[i];
  btn.textContent = `${chip.icon} ${chip.label}`;
  btn.dataset.q = chip.q;
});

function openChat() {
  landingEl.classList.add('hidden');
  inputEl.focus();
}
startBtn.addEventListener('click', openChat);

/* ---------- Landing button: typewriter cycling through languages ---------- */
const phrases = [
  'Запитай мене про меню',
  'Ask me about the menu',
  'Frag mich zum Menü',
  'Chiedimi del menù',
  'Demande-moi le menu',
  'Pregúntame sobre el menú',
];

const phraseLangOrder = ['uk', 'en', 'de', 'it', 'fr', 'es'];
const typedTextEl = document.getElementById('typedText');
let phraseIdx = Math.max(0, phraseLangOrder.indexOf(lang));
let charIdx = 0;
let deleting = false;

function typeLoop() {
  const current = phrases[phraseIdx];
  if (!deleting) {
    charIdx++;
    typedTextEl.textContent = current.slice(0, charIdx);
    if (charIdx === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1500);
      return;
    }
    setTimeout(typeLoop, 55);
  } else {
    charIdx--;
    typedTextEl.textContent = current.slice(0, charIdx);
    if (charIdx === 0) {
      deleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      setTimeout(typeLoop, 300);
      return;
    }
    setTimeout(typeLoop, 30);
  }
}
typeLoop();

/* ---------- Chat ---------- */
const history = [];

function addBubble(role, text) {
  const row = document.createElement('div');
  row.className = `msg-row ${role === 'user' ? 'user' : ''}`;

  if (role !== 'user') {
    const avatar = document.createElement('div');
    avatar.className = 'avatar';
    avatar.textContent = '🥨';
    row.appendChild(avatar);
  }

  const bubble = document.createElement('div');
  bubble.className = `msg ${role}`;
  bubble.textContent = text;
  row.appendChild(bubble);

  messagesEl.appendChild(row);
  messagesEl.scrollTop = messagesEl.scrollHeight;
  return row;
}

addBubble('bot', t.greeting);

async function sendMessage(text) {
  if (!text) return;
  suggestionsEl.classList.add('hidden');

  addBubble('user', text);
  history.push({ role: 'user', content: text });

  const typingEl = addBubble('typing', t.typing);
  formEl.querySelector('button').disabled = true;

  try {
    const res = await fetch(`${window.BASE_PATH}/api/chat`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ messages: history }),
    });
    const data = await res.json();
    typingEl.remove();

    if (!res.ok) {
      addBubble('bot', t.errorApi);
      return;
    }

    addBubble('bot', data.reply);
    history.push({ role: 'assistant', content: data.reply });
  } catch (err) {
    typingEl.remove();
    addBubble('bot', t.errorConnection);
  } finally {
    formEl.querySelector('button').disabled = false;
    suggestionsEl.classList.remove('hidden');
  }
}

formEl.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = inputEl.value.trim();
  inputEl.value = '';
  sendMessage(text);
});

suggestionsEl.addEventListener('click', (e) => {
  const chip = e.target.closest('.chip');
  if (!chip) return;
  sendMessage(chip.dataset.q);
});
