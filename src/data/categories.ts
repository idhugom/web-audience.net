import type { Category } from './site';

/**
 * Fixed thematic taxonomy. The AI classifier assigns every post to exactly
 * one of these slugs. Order defines display order on hubs/menus.
 */
export const CATEGORIES: Category[] = [
  { slug: 'tech-web-numerique', name: 'Tech, Web & Numérique', tagline: 'Le web, les outils et la vie connectée décryptés.', icon: 'globe' },
  { slug: 'finance-assurance', name: 'Argent, Finance & Assurance', tagline: 'Crédit, assurance et budget expliqués simplement.', icon: 'wallet' },
  { slug: 'maison-jardin', name: 'Maison, Jardin & Bricolage', tagline: 'Aménager, rénover, entretenir et cultiver.', icon: 'home' },
  { slug: 'cuisine-gastronomie', name: 'Cuisine & Gastronomie', tagline: 'Recettes, conservation et savoir-faire en cuisine.', icon: 'chef' },
  { slug: 'sante-bien-etre', name: 'Santé & Bien-être', tagline: 'Comprendre son corps et vivre mieux au quotidien.', icon: 'heart' },
  { slug: 'voyage-evasion', name: 'Voyage & Évasion', tagline: 'Destinations, conseils et inspirations pour partir.', icon: 'compass' },
  { slug: 'auto-mobilite', name: 'Auto, Moto & Mobilité', tagline: 'Véhicules, entretien et nouvelles mobilités.', icon: 'car' },
  { slug: 'sport-plein-air', name: 'Sport & Plein air', tagline: 'Pratiques, matériel et sécurité en activité.', icon: 'activity' },
  { slug: 'famille-education', name: 'Famille, Enfants & Éducation', tagline: 'Grandir, apprendre et accompagner au quotidien.', icon: 'users' },
  { slug: 'mode-style', name: 'Mode, Style & Shopping', tagline: 'Bien choisir, bien porter, acheter malin.', icon: 'bag' },
  { slug: 'nature-environnement', name: 'Nature & Environnement', tagline: 'Écologie, biodiversité et gestes durables.', icon: 'leaf' },
  { slug: 'developpement-personnel', name: 'Développement personnel & Productivité', tagline: 'Mieux s’organiser, apprendre et progresser.', icon: 'spark' },
];

export const CATEGORY_BY_SLUG: Record<string, Category> = Object.fromEntries(
  CATEGORIES.map((c) => [c.slug, c]),
);

export const DEFAULT_CATEGORY = CATEGORIES[0];

export function categoryFor(slug?: string): Category {
  if (slug && CATEGORY_BY_SLUG[slug]) return CATEGORY_BY_SLUG[slug];
  return { slug: 'general', name: 'Général', tagline: 'Tous nos articles.', icon: 'globe' };
}
