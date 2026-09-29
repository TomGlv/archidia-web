import { defineField, defineType } from "sanity";

export const projet = defineType({
  name: "projet",
  title: "Projet / Réalisation",
  type: "document",
  fields: [
    defineField({
      name: "titre",
      title: "Titre",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Adresse (URL)",
      type: "slug",
      description: "Générée automatiquement depuis le titre. Cliquez sur « Generate ».",
      options: { source: "titre", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "categorie",
      title: "Catégorie",
      type: "string",
      options: {
        list: [
          { title: "AMO / MOE", value: "AMO / MOE" },
          { title: "Diagnostics & Copropriétés", value: "Diagnostics & Copropriétés" },
          { title: "Maison individuelle", value: "Maison individuelle" },
          { title: "Autonomie", value: "Autonomie" },
        ],
        layout: "dropdown",
      },
    }),
    defineField({ name: "lieu", title: "Lieu", type: "string" }),
    defineField({
      name: "annee",
      title: "Année",
      type: "string",
      description: "Ex. 2024",
    }),
    defineField({
      name: "cover",
      title: "Photo de couverture",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", title: "Texte alternatif", type: "string" }],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "galerie",
      title: "Galerie de photos",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "alt", title: "Texte alternatif", type: "string" }],
        },
      ],
      options: { layout: "grid" },
    }),
    defineField({
      name: "video_url",
      title: "Lien vidéo (YouTube ou Vimeo)",
      type: "url",
      description: "Collez simplement l'adresse de la vidéo (facultatif).",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "meta_description",
      title: "Description SEO (facultatif)",
      type: "text",
      rows: 2,
      description: "Résumé de ~150 caractères pour Google. Sinon généré automatiquement.",
      validation: (r) => r.max(160),
    }),
  ],
  orderings: [
    {
      title: "Année (récent → ancien)",
      name: "anneeDesc",
      by: [{ field: "annee", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "titre", subtitle: "categorie", media: "cover" },
  },
});
