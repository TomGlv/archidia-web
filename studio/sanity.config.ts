import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemaTypes";

// L'identifiant du projet est fourni via studio/.env (SANITY_STUDIO_PROJECT_ID),
// créé lors de `npx sanity init` ou depuis sanity.io/manage.
const projectId = process.env.SANITY_STUDIO_PROJECT_ID || "";
const dataset = process.env.SANITY_STUDIO_DATASET || "production";

export default defineConfig({
  name: "archidia",
  title: "ArchidiA",
  projectId,
  dataset,
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
});
