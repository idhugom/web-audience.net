export const SITE = {
  name: 'web-audience',
  domain: 'web-audience.net',
  url: 'https://www.web-audience.net',
  title: 'web-audience — Le web expliqué, décrypté, maîtrisé',
  description:
    "web-audience décrypte le web, le numérique et la vie connectée : guides complets, comparatifs et réponses claires pour comprendre et agir en ligne.",
  locale: 'fr-FR',
  lang: 'fr',
  email: 'contact@web-audience.net',
  nav: [
    { label: 'Accueil', href: '/' },
    { label: 'Articles', href: '/blog/' },
    { label: 'Thématiques', href: '/thematiques/' },
    { label: 'À propos', href: '/a-propos/' },
  ],
} as const;

export type Category = {
  slug: string;
  name: string;
  tagline: string;
  icon: string; // key used by the Icon component
};
