/**
 * Optimise les images sources (dossier archidia-web) vers public/images.
 * Réutilisable : `node scripts/prepare-images.mjs`
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SRC = join(__dirname, "..", "..", "archidia-web");
const OUT = join(__dirname, "..", "public", "images");

/** [source relative à archidia-web, nom de sortie, largeur max, qualité] */
const jobs = [
  ["Claudia-Paredes/logo-grand.jpg", "logo.jpg", 280, 90],
  ["Claudia-Paredes/Photo-de-profil.jpg", "claudia.jpg", 900, 80],
  ["Maison-Bougival/8.jpg", "hero-home.jpg", 1920, 72],
  ["Maison-Bougival/2.jpg", "home-intro.jpg", 1200, 74],
  ["Maison-Bougival/8.jpg", "og-default.jpg", 1200, 74],
];

await mkdir(OUT, { recursive: true });

for (const [src, out, width, quality] of jobs) {
  const outPath = join(OUT, out);
  await sharp(join(SRC, src))
    .rotate()
    .resize({ width, withoutEnlargement: true })
    .jpeg({ quality, mozjpeg: true })
    .toFile(outPath);
  console.log(`✓ ${out} (${width}px, q${quality})`);
}

console.log("Terminé.");
