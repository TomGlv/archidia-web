import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemaTypes";

// Identifiant du projet ArchidiA par défaut ; surchargeable via studio/.env
// (SANITY_STUDIO_PROJECT_ID), voir sanity.io/manage.
const projectId = process.env.SANITY_STUDIO_PROJECT_ID || "qujk5ddu";
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
