# Rapport de test du workflow MacroAlloc Content Factory

Date : 2026-08-06
Version testée : v1.4.0 (8 skills, statut `TESTING`)

## Statut final : **PASS WITH WARNINGS**

Le workflow fonctionne comme conçu, y compris ses portes de blocage. Les réserves ("warnings") portent sur des limites de portée et d'environnement, pas sur des défauts de fonctionnement — détaillées en fin de rapport.

---

## Test A — Détection des skills installés

**Résultat attendu** : Claude Code détecte les 8 skills installés dans `.claude/skills/` et identifie leur mode d'invocation.

**Résultat obtenu** :
- Contrôle structurel statique : les 8 dossiers ont un nom qui correspond exactement au `name` déclaré dans leur frontmatter (condition de découverte). Confirmé pour les 8.
- Détection effective : non vérifiable dans la session où l'installation a eu lieu (la liste des skills disponibles est chargée au démarrage de session, avant que les fichiers n'existent). **Confirmée dans une session ultérieure** : les 8 skills sont apparus dans la liste des skills disponibles, invocables par leur nom exact.

**Écart** : aucun. **Statut : PASS.**

---

## Test B — Sélection du sujet (arrêt obligatoire)

**Résultat attendu** : sur la demande *« Lance la MacroAlloc Content Factory en mode normal pour préparer le prochain Morning Macro Insight »*, le skill doit analyser de vraies actualités récentes, proposer 3 à 5 sujets, ne rien sélectionner automatiquement, et s'arrêter en attente du choix utilisateur.

**Résultat obtenu** :
- Recherche web réelle effectuée (décision Fed du 29 juillet 2026, rapport emploi attendu le 7 août, records boursiers du 4 août liés au pétrole/Ormuz, tarifs Section 338 sur le Canada).
- 4 sujets qualifiés présentés avec score, urgence, risque de preuve et risque de doublon.
- Statut retourné : `AWAITING_USER_SELECTION`, arrêt effectif, aucune poursuite automatique.
- Sur sélection explicite non ambiguë ("3"), le skill a correctement produit `TOPIC_SELECTED` avec l'objet de lignage attendu (`selected_opportunity_object`).
- **Point de contrôle supplémentaire respecté** : le sujet sélectionné étant réel (pas un jeu de test), le pipeline s'est arrêté avant `research-macro-evidence`, conformément à l'instruction *« n'utilise pas un sujet réel sans mon accord »*. Une confirmation explicite a été demandée et obtenue avant de choisir la suite (bascule vers un sujet fictif pour le Test C).

**Écart** : aucun. **Statut : PASS.**

---

## Test C — Workflow complet sur données de test

**Résultat attendu** : vérifier la transmission des inputs/outputs, l'appel des skills dans le bon ordre, les contrôles de vérification, la revue éditoriale, le SEO, l'adaptation française, la génération du package final — sur un sujet fictif clairement marqué comme tel.

**Résultat obtenu**, sujet fictif "Meridia Central Bank (MCB)" (pays et institution inexistants, marqués `[TEST]`/`FICTIONAL TEST SOURCE` à chaque étape) :

| Étape | Statut retourné | Observation |
|---|---|---|
| `research-macro-evidence` | `EVIDENCE_DOSSIER_READY_FOR_WRITING` | Dossier structuré conforme au contrat, toutes les portes qualité évaluées explicitement. |
| `write-macro-insight` (draft 0) | `DRAFT_READY_FOR_VERIFICATION` | Article complet, 512 mots, architecture éditoriale respectée. |
| `verify-financial-article` (1er passage) | `REVISION_REQUIRED` | 3 problèmes détectés sans preuve inventée : pivot causal à source unique intéressée (MAJOR), sources sans URL vérifiable (MODERATE), longueur sous le seuil (MINOR). Score global élevé (82) mais approbation refusée — comportement correct (*"a high average cannot override a hard gate"*). |
| `write-macro-insight` (révision, attempt 1) | `DRAFT_READY_FOR_VERIFICATION` | Thèse restructurée sur le mécanisme observable plutôt que sur le motif contesté ; 731 mots ; les 3 problèmes traités avec `revision_summary` détaillé. |
| `verify-financial-article` (2e passage) | **`BLOCKED`** | Vérification indépendante réelle, pas de confiance aveugle envers le rédacteur : la révision avait rendu une donnée de rendement (non corroborée par une source de marché) *plus* centrale à la thèse qu'avant. Règle dure appliquée : *"If the central thesis depends on the unresolved item, return BLOCKED."* **Résultat jugé positif** : le skill ne cède pas sous la pression du test. |
| Fixture-2 (sources corrigées, corroboration de marché ajoutée) | — | Nouveau jeu de données construit pour tester la suite de la chaîne sans relancer une 3e boucle de révision déjà validée. |
| `optimize-content-discoverability` | `DISCOVERABILITY_READY_FOR_REVIEW` | 10 portes qualité passées sur les dimensions évaluables ; modules nécessitant des données externes réelles (concurrents, autorité thématique, mémoire de contenu) honnêtement `NOT_ASSESSED`, pas inventés. |
| `review-article` | `PUBLISH` | Score global 87/100, jugement indépendant réel (identifie un point d'amélioration optionnel non bloquant), 13 portes qualité passées. |
| `generate-article-package` | `DUAL_ARTIFACTS_READY_FOR_HUMAN_VALIDATION` (structure) | Package assemblé, séparation public/interne vérifiée avant tout rendu physique. |

**Écart identifié — adaptation française** : aucun des 8 skills ne produit d'adaptation française. `write-macro-insight` et `generate-article-package` déclarent explicitement l'anglais US comme langue de production immuable et l'adaptation comme *"a separate downstream artifact"*, non couverte par ce pipeline. Ce n'est pas un défaut d'exécution : c'est une absence de fonctionnalité par rapport à la description du workflow attendu.

**Aucune donnée fictive n'a été présentée comme réelle** à aucune étape (vérifié par relecture de chaque sortie : marqueurs `[TEST]`, `FICTIONAL TEST SOURCE`, bandeau `[TEST FIXTURE NOTICE]`).

**Statut : PASS**, avec la réserve ci-dessus sur l'adaptation française (absente, pas dysfonctionnelle).

---

## Test D — Format final (DOCX)

**Résultat attendu** : le workflow produit un document Word unique par type de livrable, avec article complet, éléments SEO intégrés, sources et contrôles nécessaires. En cas de dépendance manquante, l'indiquer précisément sans l'installer sans accord.

**Résultat obtenu** :
- `generate-article-package` produit la structure complète du package mais ne contient aucun mécanisme de rendu `.docx` propre.
- Dépendance manquante identifiée et signalée avant toute action : bibliothèque `docx` (npm) absente ; alternatives `pandoc`, LibreOffice (`soffice`), Python également absentes dans cet environnement.
- **Accord explicite obtenu** avant toute installation.
- `npm install docx` exécuté localement (dossier de projet temporaire, hors du dépôt, pas en global).
- Script de génération écrit, exécuté avec succès. Deux fichiers `.docx` réels produits :
  - `MacroAlloc_Morning-Macro-Insight_2026-08-06_meridia-rate-cut-TEST_Publication_v0.2-test.docx` (13,1 Ko)
  - `MacroAlloc_Morning-Macro-Insight_2026-08-06_meridia-rate-cut-TEST_Workflow-Report_v0.1-test.docx` (12,7 Ko)
- Validation structurelle : archives ZIP/OOXML bien formées (`word/document.xml`, `styles.xml`, `numbering.xml`, en-têtes/pieds de page séparés).
- Validation de contenu : disclaimer et bandeau `[TEST FIXTURE NOTICE]` présents dans le document public ; **zéro fuite de contenu interne** vérifiée (aucun score, ID de workflow ou statut de vérification dans le fichier public) ; bandeau interne, tableaux de traçabilité et statut `APPROVED_FOR_SEO` présents dans le rapport interne.
- Fichiers envoyés à l'utilisateur pour inspection directe.

**Écart** : aucun défaut fonctionnel. **Statut : PASS**, avec la note que la génération DOCX dépend d'un outil qui n'est pas préinstallé dans cet environnement Claude Code local (contrairement à d'autres environnements, par exemple celui utilisé précédemment avec un autre assistant reposant sur LibreOffice) — voir §Correctifs nécessaires.

---

## Écarts, erreurs et correctifs

| # | Constat | Nature | Correctif nécessaire |
|---|---|---|---|
| 1 | Aucune adaptation française produite par le pipeline | Absence de fonctionnalité, pas un bug | Décision produit : soit ajouter un skill dédié, soit retirer cette étape de la description du workflow attendu |
| 2 | Hiérarchie de sources harmonisée par décision technique (voir rapport d'installation §2.6) | Décision de contenu métier prise pour corriger une divergence réelle entre 3 skills | Validation humaine par un responsable éditorial/conformité avant sortie du statut `TESTING` |
| 3 | Génération `.docx` dépend d'une bibliothèque non préinstallée dans cet environnement | Limite d'environnement, résolue localement pour ce test | Si ce pipeline doit tourner régulièrement dans cet environnement, installer `docx` (npm) de façon permanente et documentée, avec votre accord |
| 4 | Bug du script de renumérotation (Contents vidé pour `research-macro-evidence`) détecté et corrigé pendant les améliorations d'architecture | Erreur transitoire, corrigée avant tout impact | Aucun — déjà résolu et revérifié (voir rapport d'installation §2.4) |
| 5 | Tous les skills restent en statut `TESTING` | Statut hérité de la source, pas un défaut constaté ici | Ne pas utiliser en production réelle sans levée explicite de ce statut par vous |

## Conclusion

Le pipeline exécute correctement la séquence complète, respecte chaque porte humaine et chaque porte qualité rencontrée, y compris en refusant d'approuver du contenu structurellement faible malgré un test conçu pour explorer cette limite. Aucune donnée fictive n'a fui comme réelle. Les réserves ci-dessus sont des décisions produit ou des validations humaines en attente, pas des dysfonctionnements du code des skills.
