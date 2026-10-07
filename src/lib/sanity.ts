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

let cache: Promise<ProjetListItem[]> | null = null;

/** Tous les projets, du plus récent au plus ancien (les projets sans année en dernier).
 *  Mis en cache pour la durée du build : plusieurs pages l'appellent. */
export function getProjets(): Promise<ProjetListItem[]> {
  if (!sanity) return Promise.resolve([]);
  cache ??= sanity.fetch(
    `*[_type == "projet" && defined(slug.current)] | order(coalesce(annee, "0") desc, _createdAt desc){${LIST_FIELDS}}`,
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

export async function getProjet(slug: string): Promise<Projet | null> {
  if (!sanity) return null;
  return sanity.fetch(
    `*[_type == "projet" && slug.current == $slug][0]{
      ${LIST_FIELDS}, galerie, video_url, description, meta_description
    }`,
    { slug },
  );
}
