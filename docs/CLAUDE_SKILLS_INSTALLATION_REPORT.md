# Rapport d'installation des skills MacroAlloc dans Claude

Date : 2026-08-06
Périmètre : synchronisation depuis GitHub (v1.4.0), audit d'architecture, corrections, installation Claude Code, préparation Claude online.

## 1. Skills trouvés

Source de vérité locale après synchronisation avec `origin/main` (commit `83ce542`, standardisation `0155fb3`, `bundle_version: 1.4.0` déclaré dans `skill-versions.json` sur origin) : `C:\Users\EC\Documents\MacroAlloc\skills\`.

| Skill | Rôle | Version déclarée (origin) |
|---|---|---|
| `discover-content-opportunities` | Identifie 3 à 5 sujets qualifiés, s'arrête pour sélection humaine | 1.4.0 |
| `research-macro-evidence` | Nouveau skill v1.4.0 : construit le dossier de preuves après sélection | 1.4.0 |
| `write-macro-insight` | Rédige l'article à partir du dossier de preuves | 1.4.0 |
| `verify-financial-article` | Vérification factuelle et de conformité indépendante | 1.4.0 |
| `optimize-content-discoverability` | Optimisation SEO/découvrabilité sans changer le fond | 1.4.0 |
| `review-article` | Revue éditoriale finale indépendante | 1.4.0 |
| `generate-article-package` | Assemble les deux fichiers Word (public + interne) | 1.4.0 |
| `run-macroalloc-content-factory` | Orchestrateur du workflow complet | 1.4.0 |

Chaque skill contient : `SKILL.md`, `agents/openai.yaml`, `references/{contracts,domain-rules,quality-and-tests,workflow}.md`. Les anciens `CHANGELOG.md` par skill n'existent plus dans cette version (l'historique est désormais dans `docs/history/` sur origin, hors périmètre `skills/`, non synchronisé localement sur demande explicite de rester strictement dans `skills/`).

**Statut de tous les skills : `TESTING`** (déclaré dans `skill-versions.json` sur origin). Aucun n'est encore validé pour la production.

## 2. Corrections et adaptations apportées avant installation

Une revue d'architecture a précédé l'installation. Six points ont été corrigés, avec effort proportionné au risque :

1. **Numérotation des étapes de l'orchestrateur** — [skills/run-macroalloc-content-factory/references/workflow.md](../skills/run-macroalloc-content-factory/references/workflow.md) contenait un doublon "Stage 4" (attribué à la fois à la rédaction et à la vérification) suite à l'insertion de `research-macro-evidence`. Corrigé : séquence Stage 0 à Stage 9 sans doublon, y compris l'index "Contents" et les renvois internes ("Continue to Stage 6").
2. **Préconditions/limites génériques** — Les 8 `SKILL.md` partageaient un bloc "Preconditions" identique, y compris une incohérence réelle sur `discover-content-opportunities` (sommé de "préserver TOPIC_SELECTED" alors qu'il le produit). Corrigé : chaque skill décrit désormais son état amont réel.
3. **Résolution de version pour l'usage autonome** — 5 `references/contracts.md` référençaient `read_from_bundle_manifest` sans expliquer où le trouver, ce qui casse l'autonomie d'un skill exporté seul (Claude online). Ajout d'une note définissant le repli explicite (`UNKNOWN` plutôt qu'une valeur inventée) si le manifeste `skill-versions.json` n'est pas accessible.
4. **Renumérotation locale des sections** — Un script Perl déterministe (non conservé dans le dépôt) a renuméroté séquentiellement les titres de 32 fichiers `references/*.md` (résidus de l'ancien fichier fusionné avant le découpage v1.4.0). **Un bug a été introduit puis corrigé pendant l'opération** : le script vidait par erreur la liste "Contents" des 4 fichiers de `research-macro-evidence` (qui n'avait pas de titres numérotés) ; restauré immédiatement depuis `origin/main` et revérifié.
5. **Périmètre de `research-macro-evidence` documenté** — Ce skill est nettement plus court que ses voisins (235 lignes contre 750-1700). Ajout d'une note explicite dans ses limites : c'est un choix de périmètre (un seul dossier de preuves, pas de moteur de scoring propre), pas un oubli.
6. **Hiérarchie de sources harmonisée** — `discover-content-opportunities`, `verify-financial-article` et `write-macro-insight` définissaient chacun une hiérarchie de sources légèrement différente (4 ou 5 niveaux, catégories reformulées). Harmonisée sur la version à 5 niveaux, déjà majoritaire. **Ceci est une décision de contenu métier, pas seulement d'architecture** — à faire valider par un responsable éditorial/conformité avant sortie du statut `TESTING`.

Un garde-fou a été ajouté : [scripts/check-canonical-text.sh](../scripts/check-canonical-text.sh), qui compare le disclaimer et la hiérarchie de sources entre leurs copies et échoue si elles divergent à nouveau. Testé (détection d'un écart simulé confirmée).

Aucune règle métier n'a été supprimée ; le point 6 est le seul qui touche à du contenu éditorial plutôt qu'à la présentation/structure.

## 3. Skills installés — Claude Code

Chemin source : `C:\Users\EC\Documents\MacroAlloc\skills\<nom>\`
Chemin destination : `C:\Users\EC\Documents\MacroAlloc\.claude\skills\<nom>\`

Structure copiée pour chacun des 8 skills :
```
.claude/skills/<nom>/
├── SKILL.md
├── VERSION              (nouveau : "1.4.0", ajouté pour l'autonomie du dossier)
├── agents/openai.yaml   (conservé, sans effet dans Claude, ne gêne pas)
└── references/
    ├── contracts.md
    ├── domain-rules.md
    ├── quality-and-tests.md
    └── workflow.md
```

Aucune installation `.claude/skills` préexistante n'a été trouvée avant cette opération (dossier absent) : aucune sauvegarde `.claude/skills-backup/` n'a donc été nécessaire.

## 4. Packages Claude online préparés

Chemin : `C:\Users\EC\Documents\MacroAlloc\claude-online-skills\<nom>\`

Structure allégée (sans `agents/openai.yaml`, spécifique à ChatGPT/OpenAI et inutile ici) :
```
claude-online-skills/<nom>/
├── SKILL.md
├── VERSION
└── references/
    ├── contracts.md
    ├── domain-rules.md
    ├── quality-and-tests.md
    └── workflow.md
```

Vérifié : aucun chemin absolu local, aucun lien markdown pointant hors du dossier du skill.

Archives ZIP individuelles dans `claude-online-skills/packages/` :

| Archive | Taille |
|---|---|
| `discover-content-opportunities.zip` | 17,3 Ko |
| `generate-article-package.zip` | 19,3 Ko |
| `optimize-content-discoverability.zip` | 19,9 Ko |
| `research-macro-evidence.zip` | 5,8 Ko |
| `review-article.zip` | 18,3 Ko |
| `run-macroalloc-content-factory.zip` | 9,8 Ko |
| `verify-financial-article.zip` | 13,9 Ko |
| `write-macro-insight.zip` | 13,0 Ko |

## 5. Incompatibilités et différences de plateforme

Aucune incompatibilité bloquante trouvée avec Claude Code ou Claude online.

- **Différence non bloquante** : `agents/openai.yaml` est une surface d'intégration spécifique à ChatGPT/OpenAI (nom d'affichage, prompt par défaut). Elle n'a aucune fonction dans Claude. Conservée dans `.claude/skills/` (fidélité à la structure source), exclue de `claude-online-skills/` (règle explicite : « aucun fichier inutile »).
- **Adaptation mineure** : ajout du fichier `VERSION` (texte brut, valeur `1.4.0`) dans chaque dossier installé, pour que chaque skill reste exploitable seul, sans dépendre de `skill-versions.json` situé hors de son propre dossier.
- **Aucune instruction dépendant exclusivement d'un outil OpenAI indisponible dans Claude** n'a été trouvée dans le contenu métier des skills.

## 6. Dépendances

| Dépendance | Requise pour | Statut | Commande |
|---|---|---|---|
| `docx` (npm) | Génération réelle des fichiers `.docx` (Test D) | **Installée**, localement, dans un dossier de projet du répertoire temporaire de la session — pas dans le dépôt, pas en global | `npm install docx` (exécutée avec votre accord explicite) |
| `pandoc` | Alternative de conversion Markdown → .docx | Absente, non nécessaire (le chemin `docx` npm a fonctionné) | — |
| LibreOffice (`soffice`) | Rendu visuel PDF/image pour vérification | Absente, non nécessaire pour produire les fichiers | — |
| Python | Scripts utilitaires de la compétence `docx` (rendu, validation) | Absent | — |

Aucune dépendance n'a été ajoutée au dépôt `MacroAlloc` lui-même.

## 7. Commandes disponibles

Dans Claude Code, sur ce projet, chaque skill s'invoque par son nom exact via le mécanisme de Skill :

```
discover-content-opportunities
research-macro-evidence
write-macro-insight
verify-financial-article
optimize-content-discoverability
review-article
generate-article-package
run-macroalloc-content-factory
```

La détection effective des 8 skills dans une session Claude Code a été confirmée (voir [MACROALLOC_WORKFLOW_TEST_REPORT.md](MACROALLOC_WORKFLOW_TEST_REPORT.md), Test A).

## 8. Limites connues

- Le workflow d'origine (Étape 6 de la demande initiale) prévoyait une "adaptation française" du contenu. **Aucun des 8 skills ne la produit** : `write-macro-insight` et `generate-article-package` déclarent tous deux explicitement que l'anglais US est la langue de production immuable et qu'une adaptation en français serait *"a separate downstream artifact"*, non couverte par ce pipeline. Ceci est un écart réel par rapport à la description du workflow attendu, pas une erreur d'installation.
- Les 8 skills restent en statut `TESTING`. Le point 2.6 ci-dessus (hiérarchie de sources) doit être validé par une personne habilitée côté édition/conformité avant toute sortie de ce statut.
