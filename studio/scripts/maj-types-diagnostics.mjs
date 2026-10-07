// Précise le type de mission des projets « Diagnostics & Copropriétés » dans Sanity :
//  - secteur « Copropriétés (PPPT / DTG) » → « Copropriétés (PPPT) », « (DTG) » ou « (audit) »
//    selon la description du projet ;
//  - corrige « (PPT) » en « (PPPT) » dans les descriptions.
//
// Depuis le dossier studio/ (utilise la session `sanity login`) :
//   npx sanity exec scripts/maj-types-diagnostics.mjs --with-user-token            # aperçu
//   npx sanity exec scripts/maj-types-diagnostics.mjs --with-user-token -- --apply # écrit

import * as sanityCli from "sanity/cli";
const getCliClient = sanityCli.getCliClient ?? sanityCli.default?.getCliClient;

const client = getCliClient({ apiVersion: "2024-01-01" });
const apply = process.argv.includes("--apply");

const ANCIEN = "Copropriétés (PPPT / DTG)";

const projets = await client.fetch(
  `*[_type == "projet" && "Diagnostics & Copropriétés" in categories]{_id, titre, secteur, description}`,
);

const texte = (blocks = []) =>
  blocks.map((b) => (b.children ?? []).map((c) => c.text ?? "").join("")).join("\n");

const typeDe = (t) => {
  if (/pluriannuel|\bPPPT\b|\(PPT\)/i.test(t)) return "Copropriétés (PPPT)";
  if (/Diagnostic Technique Global|\bDTG\b/i.test(t)) return "Copropriétés (DTG)";
  if (/audit/i.test(t)) return "Copropriétés (audit)";
  return null;
};

const tx = client.transaction();
let n = 0;
for (const p of projets) {
  const set = {};
  const t = texte(p.description);

  if (p.secteur === ANCIEN) {
    const nouveau = typeDe(t);
    if (nouveau) set.secteur = nouveau;
    else console.warn(`⚠ ${p.titre} : type introuvable dans la description, secteur inchangé`);
  }

  if (/\(PPT\)/.test(t)) {
    set.description = p.description.map((b) =>
      b.children
        ? { ...b, children: b.children.map((c) => (c.text ? { ...c, text: c.text.replace(/\(PPT\)/g, "(PPPT)") } : c)) }
        : b,
    );
  }

  if (Object.keys(set).length) {
    n++;
    console.log(
      `${p.titre} :`,
      set.secteur ? `secteur → ${set.secteur}` : "",
      set.description ? "· description (PPT) → (PPPT)" : "",
    );
    // Le document publié et un éventuel brouillon en cours sont mis à jour tous les deux.
    tx.patch(p._id, { set });
  }
}

const brouillons = await client.fetch(`*[_id in $ids]._id`, {
  ids: projets.map((p) => `drafts.${p._id}`),
});
if (brouillons.length) console.warn(`⚠ Brouillons non publiés à vérifier dans le Studio : ${brouillons.join(", ")}`);

if (!n) console.log("Rien à mettre à jour.");
else if (!apply) console.log(`\n${n} projet(s) à modifier — relancer avec « -- --apply » pour écrire.`);
else {
  await tx.commit();
  console.log(`\n✓ ${n} projet(s) mis à jour.`);
}
