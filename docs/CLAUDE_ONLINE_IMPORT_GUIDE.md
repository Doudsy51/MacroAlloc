# Guide d'import des skills MacroAlloc dans Claude online

Date : 2026-08-06

**Avertissement de portée** : ce guide décrit la procédure générale d'import d'un Custom Skill sur claude.ai, telle que connue au moment de la rédaction. Je n'ai pas de connexion active à votre compte Claude online et n'ai donc pas vérifié en direct les libellés exacts des menus au moment où vous lirez ceci — l'interface peut avoir changé. Vérifiez les libellés réels avant de suivre les étapes à la lettre. Aucun import n'a été effectué à votre place ; cette action requiert votre compte et votre validation.

## 1. Emplacement des packages

Tous les fichiers `.zip` prêts à importer se trouvent dans :

```
C:\Users\EC\Documents\MacroAlloc\claude-online-skills\packages\
```

| ZIP à importer | Rôle | Dépendances |
|---|---|---|
| `discover-content-opportunities.zip` | Découverte de sujets, s'arrête pour sélection humaine | Aucune (premier de la chaîne) |
| `research-macro-evidence.zip` | Construit le dossier de preuves après sélection | Attend un `TOPIC_SELECTED` (produit par le skill précédent, ou fourni manuellement) |
| `write-macro-insight.zip` | Rédige l'article | Attend `EVIDENCE_DOSSIER_READY_FOR_WRITING` |
| `verify-financial-article.zip` | Vérifie faits, calculs, conformité | Attend `DRAFT_READY_FOR_VERIFICATION` |
| `optimize-content-discoverability.zip` | Optimisation SEO sans changer le fond | Attend `APPROVED_FOR_SEO` |
| `review-article.zip` | Revue éditoriale finale indépendante | Attend le package de découvrabilité |
| `generate-article-package.zip` | Assemble les deux Word (public + interne) | Attend `PUBLISH` ; nécessite une compétence de génération `.docx` côté Claude online (voir §5) |
| `run-macroalloc-content-factory.zip` | Orchestre l'ensemble | Nécessite que les 7 skills ci-dessus soient déjà importés |

Chaque package est autonome (`SKILL.md` + `references/` + `VERSION`) : aucun ne dépend d'un fichier situé hors de son propre `.zip`.

## 2. Ordre d'import recommandé

1. `discover-content-opportunities`
2. `research-macro-evidence`
3. `write-macro-insight`
4. `verify-financial-article`
5. `optimize-content-discoverability`
6. `review-article`
7. `generate-article-package`
8. `run-macroalloc-content-factory` **en dernier**, car il fait référence aux 7 autres par leur nom exact dans ses propres instructions.

L'ordre n'est pas techniquement bloquant (chaque `.zip` est indépendant), mais respecter cet ordre évite d'avoir un orchestrateur actif qui référence des skills pas encore disponibles.

## 3. Procédure d'import (générale, à vérifier)

Pour chaque `.zip`, dans cet ordre :

1. Ouvrez claude.ai et allez dans les réglages de votre compte ou de votre espace de travail.
2. Cherchez la section liée aux compétences personnalisées (généralement nommée "Capabilities", "Skills" ou "Custom Skills" selon la version de l'interface).
3. Choisissez l'option d'ajout/import d'une compétence, puis sélectionnez le fichier `.zip` correspondant depuis `claude-online-skills\packages\`.
4. Confirmez l'import et attendez la validation (le nom affiché doit correspondre au `name` du frontmatter, par exemple `discover-content-opportunities`).
5. Passez au `.zip` suivant.

## 4. Paramètres ou instructions à renseigner

Aucun des 8 skills ne requiert de clé API, de secret ou de configuration externe pour fonctionner : ce sont des ensembles d'instructions, pas des intégrations techniques.

Deux points à noter au moment de l'import, pas des paramètres à saisir mais des limites à connaître :

- **Version** : chaque skill contient un fichier `VERSION` (`1.4.0`). Si Claude online propose un champ de version à l'import, utilisez cette valeur.
- **Statut** : tous les skills sont en `TESTING` (déclaré dans `skill-versions.json`, non inclus dans ces packages). Si votre organisation Claude online a un mécanisme de statut ou d'étiquette (beta/test/production), marquez-les comme non-production.

## 5. Dépendance non résolue pour `generate-article-package`

Ce skill produit des instructions pour assembler deux fichiers `.docx`, mais **ne contient aucun mécanisme de génération de fichier Word intégré** — la génération réelle a été effectuée, lors du test local, via la compétence `docx` (bibliothèque npm) disponible dans l'environnement Claude Code utilisé pour ce projet.

Je ne sais pas avec certitude si l'environnement Claude online associé à votre compte dispose d'une capacité équivalente de génération de fichiers Word. Si ce n'est pas le cas, ce skill produira la structure et le contenu du package (texte, métadonnées, tableaux) mais pas le fichier `.docx` final — il faudra alors le convertir manuellement (par exemple en copiant le contenu structuré dans un modèle Word) ou envisager un outil tiers connecté à votre espace Claude online. Vérifiez cette capacité avant de considérer ce skill comme utilisable de bout en bout.

## 6. Test minimal après import (par skill)

Pour chaque skill importé, avant de l'utiliser en conditions réelles, un test minimal équivalent à ce qui a été fait dans [MACROALLOC_WORKFLOW_TEST_REPORT.md](MACROALLOC_WORKFLOW_TEST_REPORT.md) :

| Skill | Test minimal |
|---|---|
| `discover-content-opportunities` | Demander une découverte de sujets ; vérifier qu'il s'arrête à `AWAITING_USER_SELECTION` sans choisir lui-même. |
| `research-macro-evidence` | Fournir un `TOPIC_SELECTED` fictif clairement marqué comme tel ; vérifier qu'il retourne un dossier de preuves structuré sans inventer de source réelle. |
| `write-macro-insight` | Fournir un dossier de preuves fictif ; vérifier qu'il distingue faits/incertitude/interprétation et inclut le disclaimer. |
| `verify-financial-article` | Fournir un article fictif avec une source unique et intéressée sur un point central ; vérifier qu'il **refuse** d'approuver malgré un bon score global. |
| `optimize-content-discoverability` | Vérifier qu'il marque les modules nécessitant des données externes réelles (concurrents, autorité thématique) en `NOT_ASSESSED` plutôt que de les inventer. |
| `review-article` | Vérifier qu'il rend une décision indépendante (pas un simple recopiage des statuts amont) et qu'il route chaque problème vers le skill responsable. |
| `generate-article-package` | Vérifier la séparation stricte entre le document public et le rapport interne (aucune donnée interne dans le document public). |
| `run-macroalloc-content-factory` | Lancer une demande de Morning Macro Insight ; vérifier l'arrêt obligatoire à la sélection humaine du sujet, sans jamais choisir automatiquement. |

## 7. Ce qui n'a pas été fait

Aucun import n'a été réalisé dans votre compte Claude online. Cette étape requiert une connexion à votre compte que je n'ai pas et ne dois pas effectuer à votre place. Les 8 packages listés en §1 sont prêts ; c'est à vous de les importer, dans l'ordre suggéré en §2, en suivant (et en adaptant si nécessaire) la procédure du §3.
