# ArchidiA — Checklist de recette (avant mise en ligne)

À dérouler sur l'URL de préproduction Netlify (`*.netlify.app`) avant de brancher
le domaine `archidia.fr`.

## Conformité maquette & contenus
- [ ] Accueil : hero, approche, 4 piliers, citation, CTA
- [ ] AMO / MOE : secteurs + fiches projets
- [ ] Diagnostics : intro, tableau de tarification, certifications
- [ ] Maisons individuelles : frise du processus
- [ ] Autonomie : offre seniors + MaPrimeAdapt'
- [ ] À propos : bio Claudia + timeline parcours + portrait
- [ ] Contact : coordonnées exactes + formulaire
- [ ] Mentions légales : infos société correctes
- [ ] Aucune trace du bandeau « Brouillon de travail »
- [ ] Textes relus (orthographe, chiffres, coordonnées)
- [ ] Photos réelles en place (remplacer les emplacements `<!-- PHOTO: ... -->`)

## Formulaire de contact
- [ ] Envoi d'un message test → réception sur claudia.aubert@archidia.fr
- [ ] Redirection vers /merci après envoi
- [ ] reCAPTCHA actif
- [ ] Champs obligatoires vérifiés

## CMS Storyblok
- [ ] Création d'un projet test (photos + vidéo + texte)
- [ ] Publication → mise à jour automatique du site (build hook)
- [ ] Le projet apparaît dans /realisations et sa page dédiée

## Affichage responsive
- [ ] Mobile (≈375 px) : menu hamburger, lisibilité, images
- [ ] Tablette (≈768 px)
- [ ] Desktop (≥1280 px)

## Navigateurs
- [ ] Chrome
- [ ] Firefox
- [ ] Safari (macOS / iOS)
- [ ] Edge

## Technique / SEO
- [ ] `<title>` et meta description propres sur chaque page
- [ ] /sitemap-index.xml accessible
- [ ] /robots.txt accessible
- [ ] Liens internes tous fonctionnels (aucun 404)
- [ ] Images optimisées (poids raisonnable)
- [ ] HTTPS actif
- [ ] Performance correcte (Lighthouse mobile)

## Mise en ligne
- [ ] Variable `STORYBLOK_TOKEN` présente sur Netlify
- [ ] Notification email du formulaire configurée
- [ ] DNS OVH → Netlify
- [ ] Redirection www ↔ apex
