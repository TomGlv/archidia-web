# ArchidiA — Guide de mise en ligne

Site construit avec **Astro** (générateur de site statique) + **Tailwind CSS**,
CMS **Storyblok** pour les réalisations, hébergé sur **Netlify**, domaine
**archidia.fr** chez **OVH**.

---

## 1. Développement local

```bash
npm install
cp .env.example .env      # puis renseigner STORYBLOK_TOKEN
npm run dev               # http://localhost:4321
npm run build             # génère le site dans dist/
npm run preview           # prévisualise le build
```

Optimiser les photos sources (dossier `../archidia-web`) → `public/images` :

```bash
node scripts/prepare-images.mjs
```

---

## 2. Storyblok (CMS des réalisations)

1. Créer un compte sur https://app.storyblok.com (choisir la **région Europe / EU**).
2. Créer un **Space** « ArchidiA ».
3. **Créer le type de contenu `projet`** (Block library → New block → nommé `projet`,
   type *Content type / Nestable*), avec les champs suivants :

   | Champ | Nom technique | Type |
   |---|---|---|
   | Titre | `titre` | Text |
   | Catégorie | `categorie` | Single-Option (AMO / MOE, Diagnostics & Copropriétés, Maison individuelle, Autonomie) |
   | Lieu | `lieu` | Text |
   | Année | `annee` | Text (ou Number) |
   | Image de couverture | `cover` | Asset (image) |
   | Galerie | `galerie` | Multi-Assets (images) |
   | Lien vidéo | `video_url` | Text (URL YouTube ou Vimeo) |
   | Description | `description` | Richtext |
   | Description SEO | `meta_description` | Text (optionnel) |

4. Créer un **dossier `realisations`** (Content → New folder), puis y ajouter les
   projets (chaque projet = une *story* de type `projet`).
5. **Access Tokens** (Settings → Access Tokens) : copier le token **Preview**.
   - En local : le mettre dans `.env` → `STORYBLOK_TOKEN=...`
   - Sur Netlify : Site settings → Environment variables → `STORYBLOK_TOKEN`.

### Publication automatique (sans redéploiement manuel)

Pour que la mise en ligne se fasse toute seule quand Claudia publie un projet :

1. Netlify : Site settings → Build & deploy → **Build hooks** → créer un hook,
   copier l'URL.
2. Storyblok : Settings → **Webhooks** → *Story published* → coller l'URL du build hook.

Résultat : Claudia clique sur **Publier** dans Storyblok → Netlify reconstruit et met
en ligne automatiquement (~1 min). Elle ne touche jamais au code.

> Les vidéos s'ajoutent en collant simplement un lien **YouTube** ou **Vimeo** dans
> le champ `video_url`.

---

## 3. Netlify (hébergement + formulaire)

1. Pousser le dépôt sur GitHub/GitLab.
2. Netlify → **Add new site → Import from Git** → sélectionner le dépôt.
   Build command et publish dir sont déjà dans `netlify.toml`.
3. Ajouter la variable d'environnement `STORYBLOK_TOKEN`.
4. Déployer.

### Formulaire de contact

- Le formulaire de la page **/contact** utilise **Netlify Forms** (détection
  automatique au déploiement). Anti-spam : honeypot + **reCAPTCHA**.
- **Recevoir les messages par email** : Netlify → Forms → *contact* →
  **Settings & notifications** → *Add notification → Email notification* →
  destinataire `claudia.aubert@archidia.fr`.
- Après envoi, le visiteur est redirigé vers la page **/merci**.

---

## 4. Domaine archidia.fr (OVH)

Le domaine **reste chez OVH**, on modifie seulement où il pointe.

1. Netlify → Domain settings → **Add custom domain** → `archidia.fr`.
2. Netlify propose soit ses DNS, soit des enregistrements à créer chez OVH.
   **Option recommandée (records chez OVH)** — dans l'espace OVH → zone DNS :
   - `A` `@` → `75.2.60.5` (IP de load balancer Netlify — vérifier la valeur
     exacte indiquée par Netlify au moment de la config)
   - `CNAME` `www` → `<votre-site>.netlify.app.`
3. Activer le **HTTPS** (certificat Let's Encrypt automatique par Netlify).
4. Forcer la redirection `www → apex` (ou l'inverse) dans Netlify.

> La propagation DNS peut prendre de quelques minutes à quelques heures.

---

## 5. Structure du projet

```
src/
  layouts/Layout.astro        En-tête HTML, SEO, nav, footer
  components/Header.astro      Navigation responsive (menu mobile)
  components/Footer.astro
  pages/                       Une page = une URL propre
    index.astro                Accueil
    amo-moe.astro
    diagnostics.astro
    maisons-individuelles.astro
    autonomie.astro
    a-propos.astro
    contact.astro              Formulaire Netlify
    merci.astro                Confirmation d'envoi (noindex)
    mentions-legales.astro
    realisations/
      index.astro              Liste des projets (Storyblok)
      [slug].astro             Page d'un projet (Storyblok)
  storyblok/Projet.astro       Rendu d'une fiche projet
  lib/video.ts                 YouTube/Vimeo → iframe
scripts/prepare-images.mjs     Optimisation des photos
public/images/                 Images du site (optimisées)
```
