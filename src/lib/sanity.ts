import { createClient, type SanityClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const projectId = import.meta.env.SANITY_PROJECT_ID;
const dataset = import.meta.env.SANITY_DATASET || "production";

/** true si les identifiants Sanity sont configurés (sinon le site se construit
 *  quand même, avec un état « réalisations à venir »). */
export const hasSanity = Boolean(projectId);

export const sanity: SanityClient | null = hasSanity
  ? createClient({
      projectId,
      dataset,
      apiVersion: "2024-01-01",
      useCdn: true,
      perspective: "published",
    })
  : null;

const builder = sanity ? imageUrlBuilder(sanity) : null;

/** Génère une URL d'image optimisée depuis une référence d'asset Sanity. */
export function urlFor(source: any) {
  if (!builder || !source) return null;
  return builder.image(source);
}

export interface ProjetListItem {
  _id: string;
  titre: string;
  slug: string;
  categorie?: string;
  lieu?: string;
  annee?: string;
  cover?: any;
}

export interface Projet extends ProjetListItem {
  galerie?: any[];
  video_url?: string;
  description?: any; // Portable Text
  meta_description?: string;
}

export async function getProjets(): Promise<ProjetListItem[]> {
  if (!sanity) return [];
  return sanity.fetch(
    `*[_type == "projet"] | order(annee desc, _createdAt desc){
      _id, titre, "slug": slug.current, categorie, lieu, annee, cover
    }`,
  );
}

export async function getProjet(slug: string): Promise<Projet | null> {
  if (!sanity) return null;
  return sanity.fetch(
    `*[_type == "projet" && slug.current == $slug][0]{
      _id, titre, "slug": slug.current, categorie, lieu, annee,
      cover, galerie, video_url, description, meta_description
    }`,
    { slug },
  );
}
