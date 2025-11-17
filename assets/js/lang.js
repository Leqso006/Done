/*====================================================================
  assets/js/lang.js
  Internationalisation (i18n) – EN / DE – FULLY FIXED
====================================================================*/

const translations = {
  en: {
    nav: { home: "Home", team: "Team", services: "Services", pricing: "Pricing", contact: "Contact", News: "News" },
    hero: { title: "Georgian Tax Partners", subtitle: "Precision Tax & Growth Advisory", cta: "Meet the Team" },
    team: "Leadership",
    map: "Current Locations",
    stats: ["Years of Excellence", "Clients Worldwide", "Tax Savings Delivered", "Compliance Rate"],
    clients: "Trusted by Industry Leaders",
    process: "Our Proven Process",
    processSteps: {
      0: { title: "Discovery Call", desc: "We analyze your current tax structure and goals." },
      1: { title: "Custom Strategy", desc: "Tailored plan with legal, compliant optimizations." },
      2: { title: "Implementation", desc: "Seamless execution with full documentation." },
      3: { title: "Ongoing Support", desc: "Annual reviews and proactive adjustments." }
    },
    testimonials: "What Our Clients Say",
    certs: "Certified Excellence",
    cta: { title: "Ready to Optimize?", text: "Let’s discuss your strategy. No obligation.", button: "Schedule a Call" },
    footer: { title: "Georgian Business Partners", copyright: "© 2025 Georgian Business Partners. All rights reserved.", location: "Georgia" },
    pricing: {
      preview: { title: "Transparent Pricing", text: "No hidden fees. Clear, results-driven packages tailored to your business size and goals.", button: "View Full Pricing" },
      hero: { title: "Transparent Pricing", subtitle: "No hidden fees. No surprises. Just results." },
      starter: { name: "Starter", price: "€1,500/month", features: ["Tax Filing (DE/GE)", "Basic Optimization", "1-Hour Monthly Call", "Email Support"], cta: "Get Started" },
      pro: { name: "Pro", price: "€4,500/month", badge: "Most Popular", features: ["Full Tax Strategy", "Cross-Border Optimization", "Weekly Sync", "Priority Support", "Annual Review"], cta: "Get Started" },
      enterprise: { name: "Enterprise", price: "Custom", features: ["Multi-Jurisdiction", "IPO/Exit Planning", "Dedicated Advisor", "Real-Time Reporting", "Custom Contracts"], cta: "Contact Us" },
      "news.page.title": "News & Insights",
      "news.page.subtitle": "Stay ahead with tax, growth, and compliance updates.",
      "news.back": "Back to News"
    },
    "news.page.title": "News & Insights",
  "news.page.subtitle": "Stay ahead with tax, growth, and compliance updates.",
  "news.back": "Back to News"
  },
  de: {
    nav: { home: "Start", team: "Team", services: "Dienstleistungen", pricing: "Preise", contact: "Kontakt", News: "Nachrichten" },
    hero: { title: "Georgian Business Partners", subtitle: "Präzise Steuer- und Wachstumsberatung", cta: "Unser Team" },
    team: "Führungsteam",
    map: "Aktuelle Standorte",
    stats: ["Jahre Exzellenz", "Kunden weltweit", "Steuerersparnisse", "Compliance-Rate"],
    clients: "Vertraut von Branchenführern",
    process: "Unser bewährter Prozess",
    processSteps: {
      0: { title: "Erstgespräch", desc: "Wir analysieren Ihre aktuelle Steuerstruktur und Ziele." },
      1: { title: "Maßgeschneiderte Strategie", desc: "Maßgeschneiderter Plan mit legalen, konformen Optimierungen." },
      2: { title: "Umsetzung", desc: "Nahtlose Ausführung mit vollständiger Dokumentation." },
      3: { title: "Laufende Betreuung", desc: "Jährliche Überprüfungen und proaktive Anpassungen." }
    },
    testimonials: "Was unsere Kunden sagen",
    certs: "Zertifizierte Exzellenz",
    cta: { title: "Bereit zu optimieren?", text: "Lassen Sie uns Ihre Strategie besprechen. Keine Verpflichtung.", button: "Termin vereinbaren" },
    footer: { title: "Georgian Business Partners", copyright: "© 2025 Georgian Business Partners. Alle Rechte vorbehalten.", location: "Georgien" },
    pricing: {
      preview: { title: "Transparente Preise", text: "Keine versteckten Gebühren. Klare, ergebnisorientierte Pakete, abgestimmt auf Ihre Unternehmensgröße und Ziele.", button: "Alle Preise anzeigen" },
      hero: { title: "Transparente Preise", subtitle: "Keine versteckten Gebühren. Keine Überraschungen. Nur Ergebnisse." },
      starter: { name: "Starter", price: "€1.500/Monat", features: ["Steuererklärung (DE/GE)", "Basisoptimierung", "1-Stunden monatliches Gespräch", "E-Mail-Support"], cta: "Loslegen" },
      pro: { name: "Pro", price: "€4.500/Monat", badge: "Beliebtestes", features: ["Vollständige Steuerstrategie", "Grenzüberschreitende Optimierung", "Wöchentliches Sync", "Prioritätssupport", "Jährliche Überprüfung"], cta: "Loslegen" },
      enterprise: { name: "Enterprise", price: "Individuell", features: ["Mehrere Rechtsräume", "Börsengang/Exit-Planung", "Dedizierter Berater", "Echtzeit-Reporting", "Maßgeschneiderte Verträge"], cta: "Kontakt" },
      "news.page.title": "Neuigkeiten & Einblicke",
  "news.page.subtitle": "Bleiben Sie mit Steuer-, Wachstums- und Compliance-Updates voraus.",
  "news.back": "Zurück zu Neuigkeiten"
    },
    "news.page.title": "Neuigkeiten & Einblicke",
  "news.page.subtitle": "Bleiben Sie mit Steuer-, Wachstums- und Compliance-Updates voraus.",
  "news.back": "Zurück zu Neuigkeiten"
  }
};

/*====================================================================
  State
====================================================================*/
let currentLang = 'en';

/*====================================================================
  Helpers – Safe Nested Key Access
====================================================================*/
function getTranslation(key, lang = currentLang) {
  const keys = key.split('.');
  let value = translations[lang];
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      return key; // Fallback: return key if not found
    }
  }
  return typeof value === 'string' ? value : key;
}

/*====================================================================
  Core: Apply Language
====================================================================*/
function setLanguage(lang) {
  if (!translations[lang]) lang = 'en';
  currentLang = lang;
  document.documentElement.lang = lang;
  localStorage.setItem('lang', lang);

  // Apply to all [data-i18n]
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    const text = getTranslation(key, lang);
    if (text && text !== key) {
      el.textContent = text;
    }
  });

  updateToggles();
}

/*====================================================================
  UI: Update Toggle Buttons & Labels
====================================================================*/
function updateToggles() {
  const desktopToggle = document.getElementById('lang-toggle');
  const mobileToggle = document.getElementById('lang-toggle-mobile');

  [desktopToggle, mobileToggle].forEach(toggle => {
    if (toggle) {
      toggle.classList.toggle('active', currentLang === 'de');
    }
  });

  document.querySelectorAll('.lang-label').forEach(label => {
    label.classList.toggle('active', label.dataset.lang === currentLang);
  });
}

/*====================================================================
  Detect Language (Saved or Browser)
====================================================================*/
function detectLanguage() {
  const saved = localStorage.getItem('lang');
  if (saved && translations[saved]) return saved;

  const browser = (navigator.language || navigator.userLanguage || 'en').split('-')[0];
  return translations[browser] ? browser : 'en';
}

/*====================================================================
  Init
====================================================================*/
document.addEventListener('DOMContentLoaded', () => {
  const initialLang = detectLanguage();
  setLanguage(initialLang);

  // Desktop Toggle
  const desktopToggle = document.getElementById('lang-toggle');
  if (desktopToggle) {
    desktopToggle.addEventListener('click', () => {
      setLanguage(currentLang === 'en' ? 'de' : 'en');
    });
  }

  // Mobile Toggle
  const mobileToggle = document.getElementById('lang-toggle-mobile');
  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      setLanguage(currentLang === 'en' ? 'de' : 'en');
    });
  }
});