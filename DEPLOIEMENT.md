# ArchidiA — Guide de mise en ligne

Site construit avec **Astro** (générateur de site statique) + **Tailwind CSS**,
CMS **Sanity** pour les réalisations, hébergé sur **Netlify**, domaine
**archidia.fr** chez **OVH**.

---

## 1. Développement local

```bash
npm install
cp .env.example .env      # puis renseigner SANITY_PROJECT_ID / SANITY_DATASET
npm run dev               # http://localhost:4321
npm run build             # génère le site dans dist/
npm run preview           # prévisualise le build
```

Optimiser les photos sources (dossier `../archidia-web`) → `public/images` :

```bash
node scripts/prepare-images.mjs
```

---

## 2. Sanity (CMS des réalisations — gratuit)

Le schéma du contenu est **déjà prêt** dans le dossier `studio/`. Il suffit de créer
le projet Sanity et de le connecter.

1. Créer un compte gratuit sur https://www.sanity.io (connexion Google/GitHub/email).
2. Depuis le dossier `studio/` :
   ```bash
   cd studio
   npm install
   npx sanity login
   npx sanity init --env    # crée le projet, écrit studio/.env (region UE au choix)
   ```
   > `--env` écrit `SANITY_STUDIO_PROJECT_ID` et `SANITY_STUDIO_DATASET` dans `studio/.env`.
   > Choisir le dataset **production** et le laisser **public** (lecture seule côté site).
3. Lancer le Studio en local pour vérifier : `npm run dev` → http://localhost:3333
   (le type **« Projet / Réalisation »** apparaît, avec titre, catégorie, lieu, année,
   photo de couverture, galerie, lien vidéo YouTube/Vimeo, description, SEO).
4. **Mettre le Studio en ligne pour Claudia** (interface hébergée, connexion par email) :
   ```bash
   npx sanity deploy      # → https://<nom-choisi>.sanity.studio
   ```
   Inviter Claudia comme membre du projet (sanity.io/manage → Members) : elle se
   connecte à cette URL, ajoute ses projets, clique **Publish**.

### Connecter le site au CMS

- Récupérer le **Project ID** (visible dans `studio/.env` ou sur sanity.io/manage).
- En local : `.env` → `SANITY_PROJECT_ID=...` et `SANITY_DATASET=production`.
- Sur Netlify : Site settings → Environment variables → mêmes deux variables.

### Publication automatique (sans redéploiement manuel)

1. Netlify : Site settings → Build & deploy → **Build hooks** → créer un hook, copier l'URL.
2. Sanity : sanity.io/manage → projet → **API → Webhooks** → *Create webhook*,
   coller l'URL du build hook, déclencheur *Create / Update / Delete*.

Résultat : Claudia clique sur **Publish** dans Sanity → Netlify reconstruit et met en
ligne automatiquement (~1 min). Elle ne touche jamais au code.

> Les vidéos s'ajoutent en collant simplement un lien **YouTube** ou **Vimeo** dans
> le champ prévu. Les photos sont optimisées automatiquement par le CDN de Sanity.

---

## 3. Netlify (hébergement + formulaire)

1. Pousser le dépôt sur GitHub/GitLab.
2. Netlify → **Add new site → Import from Git** → sélectionner le dépôt.
   Build command et publish dir sont déjà dans `netlify.toml`.
3. Ajouter les variables d'environnement `SANITY_PROJECT_ID` et `SANITY_DATASET`.
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
      index.astro              Liste des projets (Sanity)
      [slug].astro             Page d'un projet (Sanity)
  components/Projet.astro      Rendu d'une fiche projet
  lib/sanity.ts                Client Sanity + requêtes + images
  lib/video.ts                 YouTube/Vimeo → iframe
scripts/prepare-images.mjs     Optimisation des photos
public/images/                 Images du site (optimisées)
studio/                        Sanity Studio (interface d'édition de Claudia)
```
