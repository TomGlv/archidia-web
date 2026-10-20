// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import { createClient } from "@sanity/client";

// Date de dernière modification de chaque projet dans Sanity, pour le <lastmod>
// du sitemap (les pages fixes n'en ont pas : une date de build serait inexacte).
const projetsModifies = new Map();
try {
  const sanity = createClient({
    projectId: process.env.SANITY_PROJECT_ID || "qujk5ddu",
    dataset: process.env.SANITY_DATASET || "production",
    apiVersion: "2024-01-01",
    useCdn: false,
  });
  const projets = await sanity.fetch(
    `*[_type == "projet" && defined(slug.current)]{ "slug": slug.current, _updatedAt }`,
  );
  for (const p of projets) projetsModifies.set(`https://archidia.fr/realisations/${p.slug}/`, p._updatedAt);
} catch {
  // Sanity injoignable : le sitemap est produit sans <lastmod>.
}

// https://astro.build/config
export default defineConfig({
  site: "https://archidia.fr",
  // Toutes les URL se terminent par « / » (comme les canoniques et le sitemap)
  trailingSlash: "always",
  integrations: [
    sitemap({
      filter: (page) =>
        !page.includes("/merci") && !page.includes("/mentions-legales") && !page.includes("/404"),
      serialize: (item) => {
        const lastmod = projetsModifies.get(item.url);
        return lastmod ? { ...item, lastmod } : item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
