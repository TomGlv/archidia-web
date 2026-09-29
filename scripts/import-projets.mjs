// Importe dans Sanity les projets de scripts/data/projets.mjs.
//
//   SANITY_WRITE_TOKEN=... node scripts/import-projets.mjs           # crée les projets manquants
//   SANITY_WRITE_TOKEN=... node scripts/import-projets.mjs --force   # écrase aussi les existants
//
// Chaque projet reçoit un identifiant stable (projet-<slug>) : relancer le script
// ne crée pas de doublons. Sans --force, un projet déjà présent (et les photos
// ajoutées depuis le Studio) n'est jamais modifié.
// Token : sanity.io/manage → projet → API → Tokens → « Add API token » (droits Editor).

import { createClient } from "@sanity/client";
import { projets } from "./data/projets.mjs";

const token = process.env.SANITY_WRITE_TOKEN;
if (!token) {
  console.error("SANITY_WRITE_TOKEN manquant (voir l'en-tête du script).");
  process.exit(1);
}

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || "qujk5ddu",
  dataset: process.env.SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

const force = process.argv.includes("--force");

const slugify = (s) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const toDoc = ({ texte, ...p }) => {
  const slug = slugify(p.titre);
  return {
    _id: `projet-${slug}`,
    _type: "projet",
    ...p,
    enAvant: Boolean(p.enAvant),
    avantArchidia: Boolean(p.avantArchidia),
    slug: { _type: "slug", current: slug },
    description: [
      {
        _type: "block",
        _key: "intro",
        style: "normal",
        markDefs: [],
        children: [{ _type: "span", _key: "intro-span", text: texte, marks: [] }],
      },
    ],
  };
};

const tx = client.transaction();
for (const p of projets) {
  const doc = toDoc(p);
  force ? tx.createOrReplace(doc) : tx.createIfNotExists(doc);
}
const res = await tx.commit();
console.log(
  `${projets.length} projets traités (${force ? "créés ou remplacés" : "créés si absents"}) — transaction ${res.transactionId}`,
);
