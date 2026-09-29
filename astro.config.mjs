// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://archidia.fr",
  integrations: [
    sitemap({
      filter: (page) =>
        !page.includes("/merci") && !page.includes("/mentions-legales"),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
