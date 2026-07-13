/* ---------- Localization ---------- */
const TRANSLATIONS = {
  uk: {
    subtitle: 'KI консультант',
    greeting: 'Grüß Gott! 👋 Я DonislKI — допоможу обрати страву чи напій із меню ресторану Donisl 🥨🍺. Що вам сьогодні до смаку?',
    placeholder: 'Напр.: щось ситне і місцеве пиво до нього',
    typing: 'друкує…',
    errorApi: '😕 Вибачте, зараз не можу відповісти. Спробуйте ще раз за хвилину.',
    errorConnection: '📶 Проблема з підключенням. Перевірте інтернет і спробуйте ще раз.',
    chips: [
      { icon: '🥨', label: 'Традиційна страва', q: 'Що традиційне порекомендуєте?' },
      { icon: '🍺', label: 'До пива', q: 'Що добре піде до пива?' },
      { icon: '🥗', label: 'Легке / вегетаріанське', q: 'Порадьте щось легке та вегетаріанське' },
      { icon: '🍰', label: 'Десерт', q: 'Порадьте десерт наостанок' },
    ],
  },
  de: {
    subtitle: 'KI-Berater',
    greeting: 'Grüß Gott! 👋 Ich bin DonislKI — ich helfe Ihnen, ein Gericht oder Getränk aus der Speisekarte von Donisl zu wählen 🥨🍺. Worauf haben Sie heute Lust?',
    placeholder: 'Z. B.: etwas Deftiges und ein passendes Bier dazu',
    typing: 'schreibt…',
    errorApi: '😕 Entschuldigung, ich kann gerade nicht antworten. Bitte versuchen Sie es in einer Minute erneut.',
    errorConnection: '📶 Verbindungsproblem. Bitte Internet prüfen und erneut versuchen.',
    chips: [
      { icon: '🥨', label: 'Traditionelles Gericht', q: 'Was empfehlen Sie Traditionelles?' },
      { icon: '🍺', label: 'Zum Bier', q: 'Was passt gut zum Bier?' },
      { icon: '🥗', label: 'Leicht / vegetarisch', q: 'Empfehlen Sie etwas Leichtes und Vegetarisches' },
      { icon: '🍰', label: 'Dessert', q: 'Empfehlen Sie zum Abschluss ein Dessert' },
    ],
  },
  en: {
    subtitle: 'AI Consultant',
    greeting: "Grüß Gott! 👋 I'm DonislKI — I'll help you pick a dish or drink from Donisl's menu 🥨🍺. What are you in the mood for today?",
    placeholder: 'E.g.: something hearty with a local beer to match',
    typing: 'typing…',
    errorApi: "😕 Sorry, I can't respond right now. Please try again in a minute.",
    errorConnection: '📶 Connection problem. Check your internet and try again.',
    chips: [
      { icon: '🥨', label: 'Traditional dish', q: 'What traditional dish do you recommend?' },
      { icon: '🍺', label: 'Beer pairing', q: 'What goes well with beer?' },
      { icon: '🥗', label: 'Light / vegetarian', q: 'Recommend something light and vegetarian' },
      { icon: '🍰', label: 'Dessert', q: 'Recommend a dessert to finish' },
    ],
  },
  it: {
    subtitle: 'Consulente KI',
    greeting: 'Grüß Gott! 👋 Sono DonislKI — ti aiuto a scegliere un piatto o una bevanda dal menù di Donisl 🥨🍺. Cosa ti va oggi?',
    placeholder: 'Es.: qualcosa di sostanzioso con una birra locale in abbinamento',
    typing: 'sta scrivendo…',
    errorApi: '😕 Spiacente, al momento non posso rispondere. Riprova tra un minuto.',
    errorConnection: '📶 Problema di connessione. Controlla internet e riprova.',
    chips: [
      { icon: '🥨', label: 'Piatto tradizionale', q: 'Cosa consigliate di tradizionale?' },
      { icon: '🍺', label: 'Abbinamento birra', q: 'Cosa si abbina bene alla birra?' },
      { icon: '🥗', label: 'Leggero / vegetariano', q: 'Consigliatemi qualcosa di leggero e vegetariano' },
      { icon: '🍰', label: 'Dessert', q: 'Consigliatemi un dessert per finire' },
    ],
  },
  fr: {
    subtitle: 'Consultant KI',
    greeting: "Grüß Gott ! 👋 Je suis DonislKI — je vous aide à choisir un plat ou une boisson du menu de Donisl 🥨🍺. Qu'est-ce qui vous ferait plaisir aujourd'hui ?",
    placeholder: 'Ex. : quelque chose de copieux avec une bière locale assortie',
    typing: 'écrit…',
    errorApi: "😕 Désolé, je ne peux pas répondre pour le moment. Réessayez dans une minute.",
    errorConnection: '📶 Problème de connexion. Vérifiez votre internet et réessayez.',
    chips: [
      { icon: '🥨', label: 'Plat traditionnel', q: 'Que recommandez-vous de traditionnel ?' },
      { icon: '🍺', label: 'Accord bière', q: "Qu'est-ce qui va bien avec une bière ?" },
      { icon: '🥗', label: 'Léger / végétarien', q: 'Recommandez-moi quelque chose de léger et végétarien' },
      { icon: '🍰', label: 'Dessert', q: 'Recommandez-moi un dessert pour finir' },
    ],
  },
  es: {
    subtitle: 'Consultor KI',
    greeting: 'Grüß Gott! 👋 Soy DonislKI — te ayudo a elegir un plato o una bebida del menú de Donisl 🥨🍺. ¿Qué se te antoja hoy?',
    placeholder: 'Ej.: algo contundente con una cerveza local a juego',
    typing: 'escribiendo…',
    errorApi: '😕 Lo siento, ahora mismo no puedo responder. Inténtalo de nuevo en un minuto.',
    errorConnection: '📶 Problema de conexión. Comprueba tu internet e inténtalo de nuevo.',
    chips: [
      { icon: '🥨', label: 'Plato tradicional', q: '¿Qué plato tradicional recomienda?' },
      { icon: '🍺', label: 'Maridaje con cerveza', q: '¿Qué combina bien con la cerveza?' },
      { icon: '🥗', label: 'Ligero / vegetariano', q: 'Recomiende algo ligero y vegetariano' },
      { icon: '🍰', label: 'Postre', q: 'Recomiende un postre para terminar' },
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

/* ---------- DOM refs ---------- */
const messagesEl = document.getElementById('messages');
const formEl = document.getElementById('form');
const inputEl = document.getElementById('input');
const landingEl = document.getElementById('landing');
const startBtn = document.getElementById('startBtn');
const suggestionsEl = document.getElementById('suggestions');
const subtitleEl = document.getElementById('subtitle');

subtitleEl.textContent = t.subtitle;
inputEl.placeholder = t.placeholder;

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

const typedTextEl = document.getElementById('typedText');
let phraseIdx = 0;
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
