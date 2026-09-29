// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import { storyblok } from "@storyblok/astro";
import { loadEnv } from "vite";

const env = loadEnv(process.env.NODE_ENV ?? "", process.cwd(), "");
const STORYBLOK_TOKEN = env.STORYBLOK_TOKEN;

// L'intégration Storyblok n'est chargée que si un token est fourni,
// pour permettre de construire le site avant la création du compte CMS.
const integrations = [
  sitemap({
    filter: (page) =>
      !page.includes("/merci") && !page.includes("/mentions-legales"),
  }),
];
if (STORYBLOK_TOKEN) {
  integrations.push(
    storyblok({
      accessToken: STORYBLOK_TOKEN,
      apiOptions: { region: "eu" }, // espace Storyblok européen
      bridge: true,
      components: {
        projet: "storyblok/Projet",
      },
    }),
  );
}

// https://astro.build/config
export default defineConfig({
  site: "https://archidia.fr",
  integrations,
  vite: {
    plugins: [tailwindcss()],
  },
});
