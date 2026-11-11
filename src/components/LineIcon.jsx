/* ============================================================
   LineIcon — simple outline icons used in place of emojis.
   Accepts an icon name, or one of the emojis the site data
   already uses (so the data does not have to change).
   ============================================================ */

const EMOJI = {
  "📊": "receipt", "📒": "book", "💰": "wallet", "⚖️": "scale", "⚖": "scale",
  "🏢": "building", "💼": "briefcase", "📈": "trending", "👨‍👩‍👧": "family",
  "🌏": "globe", "🌐": "globe", "₿": "coins", "🤝": "heart", "🏗️": "hardhat", "🏗": "hardhat",
  "🍽️": "utensils", "🍽": "utensils", "🏥": "medical", "🚛": "truck", "🛍️": "bag", "🛍": "bag",
  "🏠": "home", "💇": "scissors", "💻": "laptop", "🔍": "search", "🏦": "landmark",
  "🛠️": "wrench", "🛠": "wrench", "📍": "pin", "⚠": "alert", "⚠️": "alert", "💡": "bulb",
  "📞": "phone", "✉": "mail", "✉️": "mail", "🍗": "utensils",
};

const PATHS = {
  receipt: (<><path d="M6 3h12v18l-3-2-3 2-3-2-3 2z" /><path d="M9 8h6M9 12h6M9 16h3.5" /></>),
  book: (<><path d="M5 5.5A2.5 2.5 0 0 1 7.5 3H19v15H7.5A2.5 2.5 0 0 0 5 20.5z" /><path d="M5 20.5A2.5 2.5 0 0 1 7.5 18H19v3H7.5A2.5 2.5 0 0 1 5 20.5" /><path d="M9 7.5h6" /></>),
  wallet: (<><rect x="3" y="6" width="18" height="14" rx="2" /><path d="M3 10h18" /><path d="M16 15h2" /><path d="M6 6l9-3 1.5 3" /></>),
  scale: (<><path d="M12 4v16M8 20h8M5 7h14" /><path d="M5 7l-2.5 6a2.5 2.5 0 0 0 5 0z" /><path d="M19 7l-2.5 6a2.5 2.5 0 0 0 5 0z" /></>),
  building: (<><rect x="5" y="3" width="14" height="18" rx="1" /><path d="M9 7h1.5M13.5 7H15M9 11h1.5M13.5 11H15M9 15h1.5M13.5 15H15" /><path d="M10.5 21v-3h3v3" /></>),
  briefcase: (<><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7" /><path d="M3 12.5h18" /></>),
  trending: (<><path d="M3 17l6-6 4 4 8-8" /><path d="M15 7h6v6" /></>),
  family: (<><circle cx="8.5" cy="7.5" r="2.8" /><path d="M3 20a5.5 5.5 0 0 1 11 0" /><circle cx="17" cy="9" r="2.2" /><path d="M14.8 14.6A4.5 4.5 0 0 1 21 19" /></>),
  globe: (<><circle cx="12" cy="12" r="9" /><path d="M3 12h18" /><path d="M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z" /></>),
  coins: (<><ellipse cx="12" cy="6" rx="7" ry="2.8" /><path d="M5 6v6c0 1.5 3.1 2.8 7 2.8s7-1.3 7-2.8V6" /><path d="M5 12v6c0 1.5 3.1 2.8 7 2.8s7-1.3 7-2.8v-6" /></>),
  heart: (<><path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.2a4.3 4.3 0 0 1 7.5 2.6C19.5 15.4 12 20 12 20z" /></>),
  hardhat: (<><path d="M2.5 18.5h19" /><path d="M4.5 18.5v-1.5a7.5 7.5 0 0 1 15 0v1.5" /><path d="M9.5 10V6.2a2.5 2.5 0 0 1 5 0V10" /><path d="M7 12.5v3M17 12.5v3" /></>),
  utensils: (<><path d="M6 3v7a2 2 0 0 0 4 0V3M8 3v18" /><path d="M18 21V3c-2.2 1.2-3.5 3.5-3.5 6.5V14H18" /></>),
  medical: (<><rect x="3.5" y="3.5" width="17" height="17" rx="3" /><path d="M12 8v8M8 12h8" /></>),
  truck: (<><path d="M2.5 6h11v10h-11z" /><path d="M13.5 9.5h4l3.5 3.5v3h-7.5" /><circle cx="6.5" cy="17.5" r="1.8" /><circle cx="17" cy="17.5" r="1.8" /></>),
  bag: (<><path d="M5 8h14l-1.2 12.5H6.2z" /><path d="M9 8V6.5a3 3 0 0 1 6 0V8" /></>),
  home: (<><path d="M3.5 11L12 4l8.5 7" /><path d="M6 9.5V20h12V9.5" /><path d="M10 20v-5h4v5" /></>),
  scissors: (<><circle cx="6" cy="6.5" r="2.5" /><circle cx="6" cy="17.5" r="2.5" /><path d="M8.2 7.8L20 17M8.2 16.2L20 7" /></>),
  laptop: (<><rect x="4.5" y="5" width="15" height="10.5" rx="1.2" /><path d="M2.5 19h19" /></>),
  search: (<><circle cx="11" cy="11" r="6.5" /><path d="M16 16l4.5 4.5" /></>),
  landmark: (<><path d="M3 9l9-5 9 5" /><path d="M5.5 10.5v6.5M10 10.5v6.5M14 10.5v6.5M18.5 10.5v6.5" /><path d="M3 20.5h18" /></>),
  wrench: (<><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></>),
  pin: (<><path d="M12 21s-6.5-5.6-6.5-11.2a6.5 6.5 0 0 1 13 0C18.5 15.4 12 21 12 21z" /><circle cx="12" cy="9.8" r="2.3" /></>),
  alert: (<><path d="M12 3.5l9.5 16.5h-19z" /><path d="M12 10v4.5M12 17.2v.3" /></>),
  bulb: (<><path d="M9 18h6M10 21h4" /><path d="M12 3a6 6 0 0 0-3.6 10.8c.7.6 1.1 1.4 1.1 2.2h5c0-.8.4-1.6 1.1-2.2A6 6 0 0 0 12 3z" /></>),
  phone: (<><path d="M5 4h3.5l2 5-2.5 1.6a11 11 0 0 0 5.4 5.4L15 13.5l5 2V19a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2z" /></>),
  mail: (<><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3.5 6.5L12 13l8.5-6.5" /></>),
  car: (<><path d="M5 11l1.6-4.2A1.5 1.5 0 0 1 8 5.8h8a1.5 1.5 0 0 1 1.4 1L19 11" /><rect x="3" y="11" width="18" height="6" rx="1.5" /><path d="M6 17v2.2M18 17v2.2" /><path d="M6.8 14h1.6M15.6 14h1.6" /></>),
  package: (<><path d="M3.5 7.5L12 3l8.5 4.5v9L12 21l-8.5-4.5z" /><path d="M3.5 7.5L12 12l8.5-4.5M12 12v9" /><path d="M7.8 5.2l8.5 4.6" /></>),
  factory: (<><path d="M3 20.5v-9l5 2.8v-2.8l5 2.8v-2.8l5 2.8V4.5h3v16z" /><path d="M6.5 17.5h1.5M11 17.5h1.5M15.5 17.5h1.5" /></>),
  cart: (<><circle cx="9" cy="19.5" r="1.4" /><circle cx="17" cy="19.5" r="1.4" /><path d="M2.5 4h2.6l2.2 10.5h11l2-7.5H6.2" /></>),
  shirt: (<><path d="M8.5 3.5L4 5.8 2.5 10l3 1.3v9.2h13v-9.2l3-1.3L20 5.8l-4.5-2.3a3.5 3.5 0 0 1-7 0z" /></>),
  cap: (<><path d="M2.5 9L12 4.5 21.5 9 12 13.5z" /><path d="M6.5 11v4.5c0 1.4 2.5 2.8 5.5 2.8s5.5-1.4 5.5-2.8V11" /><path d="M21.5 9v5" /></>),
  bottle: (<><path d="M9.5 3h5v3.2h-5z" /><path d="M8 9a2.8 2.8 0 0 1 2-2.8h4A2.8 2.8 0 0 1 16 9v10.5a1.5 1.5 0 0 1-1.5 1.5h-5A1.5 1.5 0 0 1 8 19.5z" /><path d="M8 13h8" /></>),
  jar: (<><path d="M7.5 3.5h9" /><path d="M8.5 3.5V6L6.5 8.5v10a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2v-10L15.5 6V3.5" /><path d="M6.5 12h11" /></>),
};

export default function LineIcon({ name, size = 24, color = "currentColor", stroke = 1.6, style, title }) {
  const key = PATHS[name] ? name : EMOJI[name] || EMOJI[(name || "").replace(/️/g, "")];
  const paths = PATHS[key];
  if (!paths) return null;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={stroke}
      strokeLinecap="round" strokeLinejoin="round" style={{ display: "block", flexShrink: 0, ...style }}
      role={title ? "img" : undefined} aria-label={title} aria-hidden={title ? undefined : "true"}>
      {paths}
    </svg>
  );
}
