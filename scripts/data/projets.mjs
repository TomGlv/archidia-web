// Projets repris des anciennes listes écrites en dur dans les pages métier
// (amo-moe, diagnostics, maisons-individuelles, autonomie).
// Importés une fois dans Sanity via `node scripts/import-projets.mjs`.

const AMO = "AMO / MOE";
const DIAG = "Diagnostics & Copropriétés";
const MAISON = "Maison individuelle";
const AUTONOMIE = "Autonomie";

export const projets = [
  // ── AMO / MOE — Bureaux & patrimoine ─────────────────────────────
  {
    titre: "Pixel",
    categories: [AMO],
    secteur: "Bureaux & patrimoine",
    lieu: "Levallois-Perret",
    annee: "2025",
    chiffres: "6 500 m²",
    enAvant: true,
    texte:
      "Aménagement des espaces intérieurs et extérieurs et rénovation des façades d'un immeuble R+7 et d'un immeuble R+4, au cœur de Levallois-Perret — 6 500 m², 16 M€ de travaux, livraison en septembre 2025. Mission de réception réalisée pour Delpha Conseil.",
  },
  {
    titre: "Valmy",
    categories: [AMO],
    secteur: "Bureaux & patrimoine",
    lieu: "Montreuil",
    annee: "2025",
    texte:
      "Rénovation des espaces intérieurs d'un bâtiment de bureaux construit en 2006, afin d'améliorer la qualité des espaces et d'augmenter le nombre d'usagers du bâtiment. Mission de livraison réalisée pour Delpha Conseil.",
  },
  {
    titre: "Courcelles",
    categories: [AMO],
    secteur: "Bureaux & patrimoine",
    lieu: "Paris 17",
    annee: "2024",
    texte:
      "Restructuration d'un hôtel particulier construit à la fin du XIXe siècle, avec la création de 262 m² d'extension, une façade entièrement vitrée et une façade contemporaine sur rue aux niveaux R+4, R+5 et R+6. Labels visés : BREEAM RFO Very Good, WiredScore Silver, BiodiverCity et Effinergie Rénovation 2009. Mission de livraison réalisée pour Delpha Conseil.",
  },
  {
    titre: "Optima",
    categories: [AMO],
    secteur: "Bureaux & patrimoine",
    lieu: "Ivry-sur-Seine",
    annee: "2023",
    texte:
      "Rénovation d'un immeuble de bureaux : rénovation du socle avec intégration de nouveaux services en parties communes — parkings modernisés, hall repensé, R+1 transformé en lieu de vie hybride (restauration, réunion, wellness) — et création d'une terrasse au R+2. Labels visés : BREEAM Very Good, OSMOZ levier bâti et WiredScore Gold. Mission de réception réalisée pour Delpha Conseil.",
  },
  {
    titre: "Immeuble Wellcome",
    categories: [AMO],
    secteur: "Bureaux & patrimoine",
    lieu: "Malakoff",
    annee: "2022",
    chiffres: "14 200 m²",
    texte:
      "Immeuble neuf construit après la démolition de trois immeubles de bureaux et d'une maison individuelle, composé de neuf niveaux de superstructure et trois niveaux d'infrastructure — 14 200 m², livraison en octobre 2022. Certifié BREEAM NC 2016 Very Good, HQE Bâtiment Durable 2016 Très performant et Ready to OSMOZ. Mission de réception réalisée pour Delpha Conseil.",
  },
  {
    titre: "Immeuble Mondovi",
    categories: [AMO],
    secteur: "Bureaux & patrimoine",
    lieu: "Paris 1",
    chiffres: "97 menuiseries",
    texte:
      "Projet de conception pour la Cour des comptes : remplacement de 97 menuiseries extérieures sur un immeuble inscrit et situé dans un périmètre de protection de monuments historiques — 1 177 m², 424 k€ de travaux. Le projet concilie économie d'énergie et respect de l'architecture protégée : menuiseries bois de type mouton et gueule de loup à deux vantaux ; porte cochère restaurée à l'identique.",
  },
  {
    titre: "LEMNYS — Siège La Poste",
    categories: [AMO],
    secteur: "Bureaux & patrimoine",
    lieu: "Paris",
    annee: "2017",
    chiffres: "40 000 m²",
    avantArchidia: true,
    texte:
      "Chez Artelia, chef de projet pour le compte de Poste Immo, en charge du pilotage de l'aménagement de trois immeubles de bureaux connectés (40 000 m², 30 M€), livrés en trois tranches : sept étages de bureaux et deux restaurants, un espace ERP de 1 000 m², puis un espace de co-working. Coordination d'une équipe de dix ingénieurs, architectes et décorateurs.",
  },
  {
    titre: "BASALTE — Salles de marché",
    categories: [AMO],
    secteur: "Bureaux & patrimoine",
    lieu: "La Défense",
    annee: "2012",
    chiffres: "78 000 m²",
    avantArchidia: true,
    texte:
      "Chez Artelia, ingénieur coordonnateur principal pour Nexity Entreprises sur un immeuble de salles de marché de 78 000 m² à La Défense (230 M€, livré en 2012), construit au-dessus d'un tunnel coupe-feu 4h : opérations préalables à la réception, suivi financier des fiches modificatives et navettes, études et pilotage de la salle à manger de direction.",
  },
  {
    titre: "Tour Generali",
    categories: [AMO],
    secteur: "Bureaux & patrimoine",
    lieu: "La Défense",
    annee: "2008",
    chiffres: "90 000 m²",
    avantArchidia: true,
    texte:
      "Chez Artelia, pour Vinci Immobilier et Nexity, architecte coordonnateur des études sur un projet de tour de bureaux IGH R+50 de 90 000 m² à La Défense (300 M€ estimés), avec auditorium et RIE. Management des études mené sur 25 mois autour de trois variantes, visant HQE, LEED, BREEAM et le label BBC. Projet finalement abandonné avant réalisation.",
  },

  // ── AMO / MOE — Hôtellerie ───────────────────────────────────────
  {
    titre: "Hôtel VOCO",
    categories: [AMO],
    secteur: "Hôtellerie",
    lieu: "Clichy",
    annee: "2023",
    chiffres: "9 600 m²",
    enAvant: true,
    texte:
      "Rénovation de 262 chambres et salles de bain, avec création de deux nouvelles chambres, relocalisation du fitness, restructuration du lobby, du restaurant et du bar en rez-de-chaussée, et rénovation des salles de réunion au R+1 — 9 600 m², 4,5 M€ de travaux, livraison en septembre 2023. Mission de conduite d'opération réalisée pour Delpha Conseil.",
  },
  {
    titre: "Hôtel Bellune",
    categories: [AMO],
    secteur: "Hôtellerie",
    lieu: "Paris 15",
    annee: "2022",
    chiffres: "105 chambres",
    texte:
      "Hôtel de 105 chambres sur 10 étages, en face du Parc des expositions de la porte de Versailles, avec un bar, un spa avec piscine et un salon de réception — livraison en novembre 2022. Mission de réception réalisée pour Delpha Conseil.",
  },
  {
    titre: "Hôtel Melia",
    categories: [AMO],
    secteur: "Hôtellerie",
    lieu: "La Défense",
    annee: "2015",
    avantArchidia: true,
    texte:
      "Chez Artelia, pour Vinci Immobilier, coordination et suivi des travaux tous corps d'état, de la phase de sous-œuvre jusqu'au parfait achèvement, ainsi que des interfaces avec l'Epadesa et les concessionnaires. Un hôtel construit sur l'emprise du tunnel de liaison du boulevard circulaire et du tunnel de ventilation de l'A14, réalisés dans le cadre de l'opération.",
  },
  {
    titre: "Hôtel Novotel",
    categories: [AMO],
    secteur: "Hôtellerie",
    lieu: "Le Havre",
    annee: "2005",
    chiffres: "7 000 m²",
    avantArchidia: true,
    texte:
      "Au sein de l'agence Jean Paul Viguier, pour Novotel, architecte responsable des études sur un hôtel 3 étoiles de 7 000 m² (136 chambres) au Havre, livré en 2005, du permis de construire au dossier de marché. Un projet de forme triangulaire organisé autour d'un grand atrium central, avec une double façade — intérieure en béton et verre, extérieure entièrement vitrée.",
  },

  // ── AMO / MOE — Logements collectifs & résidences ────────────────
  {
    titre: "Woodeum",
    categories: [AMO],
    secteur: "Logements collectifs & résidences",
    lieu: "La Garenne-Colombes",
    annee: "2025",
    chiffres: "80 logements",
    enAvant: true,
    texte:
      "Livraison de 80 logements en accession et de deux commerces, RDC +10 à La Garenne-Colombes. La parcelle accueille trois bâtiments, l'ensemble formant un U et créant, en son centre, un cœur d'îlot protégé et paysagé. Mission de livraison réalisée pour Delpha Conseil.",
  },
  {
    titre: "Résidence senior Montana Dijon",
    categories: [AMO, AUTONOMIE],
    secteur: "Logements collectifs & résidences",
    lieu: "Dijon",
    annee: "2024",
    texte:
      "Résidence senior avec des appartements du studio à 3 pièces et de nombreux espaces communs : salon avec cheminée, salon de thé, atelier artistique, restaurant gastronomique, piscine et spa, salle de gym, bibliothèque, cinéma, espace beauté. Appartements avec douche de plain-pied et cuisine équipée. Mission de livraison réalisée pour Delpha Conseil.",
  },
  {
    titre: "Résidence senior Montana Compiègne",
    categories: [AMO, AUTONOMIE],
    secteur: "Logements collectifs & résidences",
    lieu: "Compiègne",
    annee: "2022",
    texte:
      "Résidence senior avec des appartements du studio à 3 pièces et de nombreux espaces communs : salon avec cheminée, salon de thé, atelier artistique, restaurant gastronomique, piscine et spa, salle de gym, bibliothèque, cinéma, espace beauté. Appartements avec douche de plain-pied et cuisine équipée. Mission de livraison des espaces communs réalisée pour Delpha Conseil.",
  },
  {
    titre: "Arietis",
    categories: [AMO],
    secteur: "Logements collectifs & résidences",
    lieu: "Avoriaz",
    annee: "2020",
    chiffres: "15 appartements",
    texte:
      "Pilotage de la livraison d'Arietis, une résidence de 15 appartements haut de gamme (37 à 90 m²) à la station de ski d'Avoriaz, dans la continuité du concept déployé à Méribel avec L'Hevana — intervention menée en parallèle de la mise en exploitation du site. Livraison en 2020, réalisée avec ChicagoMO pour Pierre et Vacances.",
  },
  {
    titre: "L'Hevana",
    categories: [AMO],
    secteur: "Logements collectifs & résidences",
    lieu: "Méribel",
    annee: "2019",
    chiffres: "30 appartements",
    texte:
      "Pilotage de la livraison de L'Hevana, une résidence de 30 appartements haut de gamme (37 à 112 m²) à la station de ski de Méribel — un nouveau concept de résidences de luxe, livré en 2019 en parallèle de la mise en exploitation du site, réalisé avec ChicagoMO pour Pierre et Vacances.",
  },

  // ── Diagnostics — Copropriétés (PPPT / DTG / audit)────────────────────
  {
    titre: "Copropriété Serrurier",
    categories: [DIAG],
    secteur: "Copropriétés (DTG)",
    lieu: "Paris 19",
    annee: "2026",
    enAvant: true,
    texte:
      "Diagnostic Technique Global (DTG) pour la copropriété Serrurier, construite en 1968. 58 lots dont 32 appartements.",
  },
  {
    titre: "Copropriété Championnière",
    categories: [DIAG],
    secteur: "Copropriétés (PPPT)",
    lieu: "Paris 13",
    annee: "2026",
    texte:
      "Projet de Plan Pluriannuel de Travaux (PPPT) pour la copropriété Championnière, construite en 1935. 47 lots dont 45 appartements.",
  },
  {
    titre: "Copropriété Poliveau",
    categories: [DIAG],
    secteur: "Copropriétés (PPPT)",
    lieu: "Paris 5",
    annee: "2026",
    texte:
      "Projet de Plan Pluriannuel de Travaux (PPPT) pour la copropriété Poliveau, construite en 1965. 45 lots, tous appartements.",
  },
  {
    titre: "Copropriété La Jonchère",
    categories: [DIAG],
    secteur: "Copropriétés (DTG)",
    lieu: "Bougival",
    annee: "2025",
    chiffres: "5 180 m²",
    enAvant: true,
    texte:
      "Diagnostic Technique Global (DTG) pour la copropriété La Jonchère, un ensemble de 7 bâtiments construit en 1982/1983 — environ 5 180 m², 219 lots dont 58 appartements.",
  },
  {
    titre: "Copropriété Entrepreneurs",
    categories: [DIAG],
    secteur: "Copropriétés (DTG)",
    lieu: "Paris 15",
    annee: "2025",
    texte:
      "Diagnostic Technique Global (DTG) pour la copropriété Entrepreneurs, construite avant 1948. 66 lots dont 34 appartements.",
  },
  {
    titre: "Copropriété Le Concerto",
    categories: [DIAG],
    secteur: "Copropriétés (audit)",
    lieu: "Franconville",
    annee: "2024",
    texte:
      "Audit architectural pour la copropriété Le Concerto, un ensemble de 2 bâtiments construit en 2015. 156 lots dont 76 appartements.",
  },
  {
    titre: "Copropriété Ferrus",
    categories: [DIAG],
    secteur: "Copropriétés (PPPT)",
    lieu: "Paris 14",
    annee: "2024",
    texte:
      "Projet de Plan Pluriannuel de Travaux (PPPT) pour la copropriété Ferrus, construite en 1965. 288 lots dont 102 logements.",
  },

  // ── Diagnostics — DAE maisons individuelles / petits collectifs ──
  {
    titre: "Maison Anna Jacquin",
    categories: [DIAG],
    secteur: "Maisons & petits collectifs (DAE)",
    lieu: "Boulogne-Billancourt",
    annee: "2024",
    chiffres: "180 m²",
    enAvant: true,
    texte:
      "Diagnostic architectural et énergétique (DAE) sur une maison individuelle de 180 m² construite en 1930, pour le compte d'un particulier.",
  },
  {
    titre: "Maison Nungesser et Coli",
    categories: [DIAG],
    secteur: "Maisons & petits collectifs (DAE)",
    lieu: "Sèvres",
    annee: "2024",
    chiffres: "135 m²",
    texte:
      "Diagnostic architectural et énergétique (DAE) sur une maison individuelle de 135 m² construite en 1830, pour le compte d'un particulier.",
  },
  {
    titre: "Maison Maréchal de Lattre de Tassigny",
    categories: [DIAG],
    secteur: "Maisons & petits collectifs (DAE)",
    lieu: "Maisons-Alfort",
    annee: "2024",
    chiffres: "175 m²",
    texte:
      "Diagnostic architectural et énergétique (DAE) sur une maison individuelle de 175 m² construite en 1900, pour le compte d'un particulier.",
  },
  {
    titre: "Maison Valentine Jacquet",
    categories: [DIAG],
    secteur: "Maisons & petits collectifs (DAE)",
    lieu: "Vanves",
    annee: "2024",
    chiffres: "175 m²",
    texte:
      "Diagnostic architectural et énergétique (DAE) sur une maison individuelle de 175 m² construite en 1926, pour le compte d'un particulier.",
  },
  {
    titre: "Maison Paul Doumer",
    categories: [DIAG],
    secteur: "Maisons & petits collectifs (DAE)",
    lieu: "Rueil-Malmaison",
    annee: "2024",
    chiffres: "≈120 m²",
    texte:
      "Diagnostic architectural et énergétique (DAE) sur une maison individuelle d'environ 120 m² construite entre 1948 et 1974, pour le compte d'un particulier.",
  },
  {
    titre: "Maison Marquis de Coriolis",
    categories: [DIAG],
    secteur: "Maisons & petits collectifs (DAE)",
    lieu: "Rueil-Malmaison",
    annee: "2023",
    chiffres: "200 m²",
    texte:
      "Audit et diagnostic architectural et énergétique (DAE) sur une maison individuelle de 200 m² construite avant 1949, pour le compte d'un particulier.",
  },
  {
    titre: "Maison Marnes",
    categories: [DIAG],
    secteur: "Maisons & petits collectifs (DAE)",
    lieu: "Ville-d'Avray",
    annee: "2023",
    chiffres: "150 m²",
    texte:
      "Diagnostic architectural et énergétique (DAE) sur une maison individuelle de 150 m² construite en 1995, pour le compte d'un particulier.",
  },
  {
    titre: "Maison Albert 1er",
    categories: [DIAG],
    secteur: "Maisons & petits collectifs (DAE)",
    lieu: "Rueil-Malmaison",
    annee: "2023",
    chiffres: "150 m²",
    texte:
      "Diagnostic architectural et énergétique (DAE) et étude de faisabilité sur une maison individuelle de 150 m² construite avant 1949, pour le compte d'un particulier.",
  },
  {
    titre: "Maison Ferrié",
    categories: [DIAG],
    secteur: "Maisons & petits collectifs (DAE)",
    lieu: "Saint-Maur-des-Fossés",
    annee: "2023",
    chiffres: "106 m²",
    texte:
      "Diagnostic architectural et énergétique (DAE) sur une maison individuelle de 106 m² construite en 1971, pour le compte d'un particulier.",
  },
  {
    titre: "Maison Bons Raisins",
    categories: [DIAG],
    secteur: "Maisons & petits collectifs (DAE)",
    lieu: "Rueil-Malmaison",
    annee: "2023",
    chiffres: "200 m² + studios",
    texte:
      "Diagnostic architectural et énergétique (DAE) sur une maison individuelle de 200 m² (avec 100 m² de sous-sol et des studios de 35/40 m²) construite vers 1965, pour le compte d'un particulier.",
  },
  {
    titre: "Petit collectif rue des Rosiers",
    categories: [DIAG],
    secteur: "Maisons & petits collectifs (DAE)",
    lieu: "Rueil-Malmaison",
    annee: "2023",
    chiffres: "500 m²",
    texte:
      "Audit et diagnostic architectural et énergétique (DAE) pour la copropriété rue des Rosiers, un petit collectif de 500 m² construit en 1973.",
  },
  {
    titre: "Petit collectif Paul Vaillant Couturier",
    categories: [DIAG],
    secteur: "Maisons & petits collectifs (DAE)",
    lieu: "Nanterre",
    annee: "2022",
    chiffres: "145 m²",
    texte:
      "Diagnostic architectural et énergétique (DAE) et étude de faisabilité sur un petit collectif de 3 logements (145 m²) construit avant 1921, pour le compte d'une SCI.",
  },

  // ── Maisons individuelles ────────────────────────────────────────
  {
    titre: "Maison Bougival",
    categories: [MAISON],
    secteur: "Construction & extension",
    lieu: "Bougival",
    annee: "2024",
    chiffres: "Façade & véranda",
    enAvant: true,
    texte:
      "Une maison construite en 1974, avec une toiture en ardoise, pensée autour de la transparence et de l'ouverture sur le jardin. Le projet intègre le volume de la véranda pour créer une continuité des façades et de la toiture ; côté Sud, la modification d'une baie existante et la création de deux baies, conservant la largeur d'origine, dessinent une forme fine et élancée qui épouse les lignes de la toiture et apporte de la lumière à la pièce de vie.",
  },
  {
    titre: "Maison Buzenval",
    categories: [MAISON],
    secteur: "Rénovation & réaménagement",
    lieu: "Rueil-Malmaison",
    annee: "2026",
    chiffres: "200 m² · chantier en cours",
    enAvant: true,
    texte:
      "La maison existante, construite en 1940, présente une façade longue de 26,50 m, résultat du rassemblement de plusieurs petites maisons de l'époque. Le projet restructure l'espace de vie — cuisine, salle à manger, salon et salle de piano — avec le déplacement des poteaux existants vers la façade pour dégager la pièce et laisser entrer la lumière, à travers la création de deux verrières et de deux portes-fenêtres. Toutes les menuiseries extérieures et les volets sont en cours de changement.",
  },
  {
    titre: "Maison Boulogne-Billancourt",
    categories: [MAISON],
    secteur: "Rénovation & réaménagement",
    lieu: "Boulogne-Billancourt",
    annee: "2025",
    chiffres: "Avant-projet · ITE",
    texte:
      "Une maison de 1936 (surélevée en 1993) en zone inondable, dont l'isolation thermique par l'extérieur — fibre de bois et enduit minéral — est à l'étude sur tous les étages sauf le rez-de-chaussée. La véranda existante sera conservée, les baies traitées avec des modénatures, et la façade reprise dans des tonalités de gris.",
  },
  {
    titre: "Maison Varengeville",
    categories: [MAISON],
    secteur: "Rénovation & réaménagement",
    lieu: "Varengeville-sur-Mer",
    annee: "2021",
    chiffres: "50 m²",
    texte:
      "Le réaménagement d'un sous-sol semi-enterré, au sein d'une demeure construite en 1936 au-dessus d'une falaise, qui logeait jusqu'alors une salle de billard et l'ensemble des équipements techniques de la maison. L'objectif était de regrouper la chaudière et le chauffe-eau dans un seul local, pour libérer un maximum de surface côté façades et profiter de la lumière naturelle dans les pièces à vivre — avec, entre le local technique et la chambre voisine, un passage secret dissimulé dans la cloison acoustique. Le programme prévoyait deux chambres, une kitchenette et une salle de bain, sans modification structurelle de la maison.",
  },
  {
    titre: "Appartement New Hall",
    categories: [MAISON],
    secteur: "Rénovation & réaménagement",
    lieu: "New Hall, Californie",
    annee: "2022",
    chiffres: "46 m²",
    texte:
      "La création d'un appartement indépendant à l'emplacement d'un garage existant, au sein d'une maison californienne de 200 m² — chambre, walking-closet, salle d'eau, cuisine et salon, privilégiant la lumière naturelle et des matériaux nobles. Un projet à l'anecdote singulière, mené à distance depuis la France, qui illustre la capacité d'ArchidiA à suivre un projet en dehors de sa zone d'intervention habituelle.",
  },
  {
    titre: "Maison Denise",
    categories: [MAISON],
    secteur: "Rénovation & réaménagement",
    lieu: "Régusse, Haut Var",
    annee: "2020",
    chiffres: "180 m²",
    enAvant: true,
    texte:
      "La maison était abandonnée depuis 20 ans et se trouvait dans un état délabré : elle était composée de deux logements imbriqués entre eux. Trois planchers ont été démolis, ainsi qu'une citerne au sous-sol. Lors de la démolition, un volume important a été découvert entre la toiture et le faux-plafond, ce qui a permis de créer une mezzanine et des espaces plus lumineux.",
  },
];
