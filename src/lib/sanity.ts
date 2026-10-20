import { createClient, type SanityClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const projectId =
  import.meta.env.SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID || "qujk5ddu";
const dataset =
  import.meta.env.SANITY_DATASET || process.env.SANITY_DATASET || "production";

/** true si les identifiants Sanity sont configurés (sinon le site se construit
 *  quand même, avec un état « réalisations à venir »). */
export const hasSanity = Boolean(projectId);

export const sanity: SanityClient | null = hasSanity
  ? createClient({
      projectId,
      dataset,
      apiVersion: "2024-01-01",
      useCdn: false,
      perspective: "published",
    })
  : null;

const builder = sanity ? imageUrlBuilder(sanity) : null;

/** Génère une URL d'image optimisée depuis une référence d'asset Sanity. */
export function urlFor(source: any) {
  if (!builder || !source) return null;
  return builder.image(source);
}

// `value` = valeur enregistrée dans Sanity (ne pas modifier) ; `label` = libellé affiché.
export const CATEGORIES = [
  { value: "AMO / MOE", label: "AMO & MOE", slug: "amo-moe", page: "/amo-moe" },
  { value: "Diagnostics & Copropriétés", label: "Diagnostics & Copropriétés", slug: "diagnostics", page: "/diagnostics" },
  { value: "Maison individuelle", label: "Habitats", slug: "habitats", page: "/habitats" },
  { value: "Autonomie", label: "Autonomie", slug: "autonomie", page: "/autonomie" },
] as const;

export type Categorie = (typeof CATEGORIES)[number]["value"];

export const slugify = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export interface ProjetListItem {
  _id: string;
  titre: string;
  slug: string;
  categories: string[];
  mission?: "AMO" | "MOE";
  ordre?: number;
  secteur?: string;
  lieu?: string;
  annee?: string;
  chiffres?: string;
  enAvant?: boolean;
  avantArchidia?: boolean;
  cover?: any;
  extrait?: string;
}

export interface Projet extends ProjetListItem {
  galerie?: any[];
  video_url?: string;
  description?: any; // Portable Text
  meta_description?: string;
}

// `categorie` (ancien champ simple) reste lu pour les documents créés avant le passage à `categories`.
const LIST_FIELDS = `
  _id, titre, "slug": slug.current,
  "categories": coalesce(categories, select(defined(categorie) => [categorie], [])),
  secteur, lieu, annee, chiffres, enAvant, avantArchidia, cover,
  "extrait": pt::text(description)
`;

// Ajustements gérés dans le code (pas dans Sanity), par slug de projet :
//  - `mission` : étiquette « AMO » ou « MOE » affichée sur la carte ;
//  - `ordre` : place le projet en tête des listes (1 = en premier) ;
//  - `enAvant` : force la mise en avant.
const AJUSTEMENTS: Record<string, Partial<Pick<ProjetListItem, "mission" | "ordre" | "enAvant">>> = {
  // Bureaux & patrimoine
  "pixel": { mission: "AMO" },
  "courcelles": { mission: "AMO" },
  "basalte-salles-de-marche": { mission: "MOE" },
  "valmy": { mission: "AMO", ordre: 2 },
  "optima": { mission: "AMO" },
  "immeuble-wellcome": { mission: "AMO" },
  "lemnys-siege-la-poste": { mission: "MOE" },
  "tour-generali": { mission: "MOE" },
  "immeuble-mondovi": { mission: "MOE", ordre: 1, enAvant: true },
  // Logements collectifs & résidences
  "arietis": { mission: "AMO" },
  "l-hevana": { mission: "AMO" },
  "woodeum": { mission: "AMO" },
  "residence-senior-montana-compiegne": { mission: "AMO" },
  "residence-senior-montana-dijon": { mission: "AMO" },
  // Hôtellerie
  "hotel-voco": { mission: "AMO" },
  "hotel-bellune": { mission: "AMO" },
  "hotel-melia": { mission: "MOE" },
  "hotel-novotel": { mission: "MOE" },
};

// Photos de couverture interverties entre deux projets (paires de slugs).
const COUVERTURES_INTERVERTIES: [string, string][] = [
  ["residence-senior-montana-compiegne", "residence-senior-montana-dijon"],
];

function ajuster<T extends ProjetListItem>(projets: T[]): T[] {
  const parSlug = new Map(projets.map((p) => [p.slug, p]));
  const covers = new Map<string, any>();
  for (const [a, b] of COUVERTURES_INTERVERTIES) {
    const pa = parSlug.get(a);
    const pb = parSlug.get(b);
    if (pa && pb) covers.set(a, pb.cover).set(b, pa.cover);
  }
  return projets.map((p) => ({
    ...p,
    ...AJUSTEMENTS[p.slug],
    ...(covers.has(p.slug) && { cover: covers.get(p.slug) }),
  }));
}

let cache: Promise<ProjetListItem[]> | null = null;

/** Tous les projets : ceux ayant un `ordre` d'abord, puis du plus récent au plus ancien
 *  (les projets sans année en dernier). Mis en cache pour la durée du build : plusieurs pages l'appellent. */
export function getProjets(): Promise<ProjetListItem[]> {
  if (!sanity) return Promise.resolve([]);
  cache ??= sanity
    .fetch<ProjetListItem[]>(
      `*[_type == "projet" && defined(slug.current)] | order(coalesce(annee, "0") desc, _createdAt desc){${LIST_FIELDS}}`,
    )
    .then((projets) =>
      ajuster(projets).sort((a, b) => (a.ordre ?? Infinity) - (b.ordre ?? Infinity)),
    );
  return cache;
}

/** Aperçu pour une page métier : projets « mis en avant » d'abord, puis les plus récents. */
export async function getApercu(categorie: Categorie, limit = 3) {
  const all = (await getProjets()).filter((p) => p.categories.includes(categorie));
  const featured = all.filter((p) => p.enAvant);
  const rest = all.filter((p) => !p.enAvant);
  return { projets: [...featured, ...rest].slice(0, limit), total: all.length };
}

/** Une ligne de références : projets d'une catégorie répondant au filtre,
 *  « mis en avant » d'abord puis les plus récents. */
export async function getLigne(categorie: Categorie, filtre: (p: ProjetListItem) => boolean, limit = 3) {
  const all = (await getProjets()).filter((p) => p.categories.includes(categorie) && filtre(p));
  return [...all.filter((p) => p.enAvant), ...all.filter((p) => !p.enAvant)].slice(0, limit);
}

/** Lien vers la page Réalisations filtrée sur une catégorie (et un secteur). */
export function lienRealisations(categorie: Categorie, secteur?: string) {
  const cat = CATEGORIES.find((c) => c.value === categorie)!.slug;
  return `/realisations?cat=${cat}${secteur ? `&secteur=${slugify(secteur)}` : ""}`;
}

export async function getProjet(slug: string): Promise<Projet | null> {
  if (!sanity) return null;
  const projet = await sanity.fetch<Projet | null>(
    `*[_type == "projet" && slug.current == $slug][0]{
      ${LIST_FIELDS}, galerie, video_url, description, meta_description
    }`,
    { slug },
  );
  if (!projet) return null;
  // Reprend les ajustements du code (étiquette, couverture intervertie…)
  const ajuste = (await getProjets()).find((p) => p.slug === slug);
  return ajuste ? { ...projet, ...ajuste } : projet;
}
