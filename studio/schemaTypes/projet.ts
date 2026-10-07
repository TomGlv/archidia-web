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
      name: "categories",
      title: "Catégories",
      type: "array",
      of: [{ type: "string" }],
      description: "Pages du site où le projet peut apparaître (plusieurs choix possibles).",
      options: {
        list: [
          { title: "AMO / MOE", value: "AMO / MOE" },
          { title: "Diagnostics & Copropriétés", value: "Diagnostics & Copropriétés" },
          { title: "Habitats", value: "Maison individuelle" },
          { title: "Autonomie", value: "Autonomie" },
        ],
        layout: "grid",
      },
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: "secteur",
      title: "Secteur / type de mission",
      type: "string",
      description:
        "Sert de filtre sur la page Réalisations. Ex. « Bureaux & patrimoine », « Hôtellerie », « Copropriétés (PPPT / DTG) », « Rénovation & réaménagement »…",
    }),
    defineField({ name: "lieu", title: "Lieu", type: "string" }),
    defineField({
      name: "annee",
      title: "Année",
      type: "string",
      description: "Ex. 2024",
    }),
    defineField({
      name: "chiffres",
      title: "Chiffres clés (facultatif)",
      type: "string",
      description: "Affiché sous le titre. Ex. « 6 500 m² » ou « 105 chambres ».",
    }),
    defineField({
      name: "enAvant",
      title: "Mettre en avant",
      type: "boolean",
      description: "Affiché en priorité dans l'aperçu « Quelques réalisations » des pages métier.",
      initialValue: false,
    }),
    defineField({
      name: "avantArchidia",
      title: "Mission antérieure à ArchidiA",
      type: "boolean",
      description:
        "À cocher pour les missions menées avant 2019 (Artelia, agence Viguier…) : une mention l'indique sur le site.",
      initialValue: false,
    }),
    defineField({
      name: "cover",
      title: "Photo de couverture",
      type: "image",
      options: { hotspot: true },
      description: "Facultative : sans photo, le projet s'affiche sous forme de fiche texte.",
      fields: [{ name: "alt", title: "Texte alternatif", type: "string" }],
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
    select: { title: "titre", secteur: "secteur", lieu: "lieu", annee: "annee", media: "cover" },
    prepare: ({ title, secteur, lieu, annee, media }) => ({
      title,
      subtitle: [secteur, lieu, annee].filter(Boolean).join(" · "),
      media,
    }),
  },
});
