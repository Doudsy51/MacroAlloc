# Documentation complète des skills MacroAlloc Content Factory

Version documentée : v1.4.0 + corrections d'architecture + support multi-régions (US/Europe/Asie) + règle anti-plagiat (voir [CLAUDE_SKILLS_INSTALLATION_REPORT.md](CLAUDE_SKILLS_INSTALLATION_REPORT.md))
Statut de tous les skills : **`TESTING`** — aucun n'est validé pour la production réelle sans revue humaine.
Dernière mise à jour : 2026-08-06

Ce document synthétise le contenu de `SKILL.md` et des 4 fichiers `references/{contracts,domain-rules,quality-and-tests,workflow}.md` de chaque skill. Pour le détail ligne par ligne d'une règle, le fichier source exact est toujours indiqué en fin de section — cette documentation est un point d'entrée, pas un substitut au code source du skill.

---

## 1. Vue d'ensemble du pipeline

### 1.1 Les 8 skills et leur rôle en une phrase

| # | Skill | Rôle |
|---|---|---|
| 0 | `run-macroalloc-content-factory` | Orchestre les 7 autres skills dans l'ordre, applique les portes humaines et les limites de boucle |
| 1 | `discover-content-opportunities` | Trouve 3 à 5 sujets qualifiés et **s'arrête** pour que l'humain choisisse |
| 2 | `research-macro-evidence` | Construit un dossier de preuves traçable pour le sujet choisi, avant toute rédaction |
| 3 | `write-macro-insight` | Rédige l'article à partir du dossier de preuves |
| 4 | `verify-financial-article` | Vérifie indépendamment les faits, les calculs, la logique causale et la conformité |
| 5 | `optimize-content-discoverability` | Optimise le SEO/la découvrabilité IA sans changer le fond vérifié |
| 6 | `review-article` | Revue éditoriale finale et indépendante avant publication |
| 7 | `generate-article-package` | Assemble deux documents Word séparés (public + interne) |

### 1.2 La chaîne complète — découverte unique, production séquentielle par région

Depuis l'extension multi-régions, `discover-content-opportunities` évalue **US, Europe et Asie en un seul passage**, mais chaque région sélectionnée est ensuite produite **entièrement, l'une après l'autre**, avec son propre état isolé (compteurs de révision, lignage, statuts) et sa propre validation humaine finale.

```
Utilisateur
   │
   ▼
[1] discover-content-opportunities ──► AWAITING_USER_SELECTION ──► ARRÊT OBLIGATOIRE
   │        3 shortlists groupées : US / Europe / Asie          (tour séparé, sélection humaine)
   ▼ (TOPIC_SELECTED pour une ou plusieurs régions)
┌─────────────────────────────────────────────────────────────────────┐
│  Pour chaque région sélectionnée, DANS L'ORDRE US → Europe → Asie : │
│                                                                       │
│  [2] research-macro-evidence ──► EVIDENCE_DOSSIER_READY_FOR_WRITING  │
│     ▼                                                                │
│  [3] write-macro-insight ──► DRAFT_READY_FOR_VERIFICATION            │
│     ▼                                                                │
│  [4] verify-financial-article ──► APPROVED_FOR_SEO                   │
│     │   └── si REVISION_REQUIRED, retour à [3] (max. 2 boucles       │
│     │        — comptées pour CETTE région seulement)                 │
│     ▼                                                                │
│  [5] optimize-content-discoverability ──► DISCOVERABILITY_READY...   │
│     ▼                                                                │
│  [6] review-article ──► PUBLISH                                      │
│     ▼                                                                │
│  [7] generate-article-package ──► DUAL_ARTIFACTS_READY_FOR_...       │
│     ▼                                                                │
│  VALIDATION HUMAINE — CETTE RÉGION SEULE ──► ARRÊT OBLIGATOIRE       │
│     (présentée dès que ses 2 fichiers sont prêts, sans attendre       │
│      les autres régions)                                             │
│     │                                                                 │
│     └──► région suivante dans l'ordre, ou COMPLETED si c'était        │
│          la dernière                                                  │
└─────────────────────────────────────────────────────────────────────┘
```

Chaque flèche correspond à un **statut exact** que le skill amont doit retourner pour que le skill aval accepte de continuer. Un statut différent (ou absent) bloque la chaîne — c'est voulu, pas un bug. Un blocage, un rejet, ou une escalade de boucle sur une région **n'affecte jamais** les autres régions.

### 1.3 Invariants communs à tous les skills

Ces règles s'appliquent partout dans la chaîne, formulées de façon spécifique à chaque skill (voir critique d'architecture antérieure : le bloc générique identique a été remplacé par une formulation propre à chaque étape) :

- **Langue de production immuable** : anglais US (`en-US`). Une adaptation française est explicitement hors périmètre de ces 8 skills — c'est *"a separate downstream artifact"*, jamais un substitut à la version anglaise.
- **Lignage `TOPIC_SELECTED`** : le sujet et l'angle verrouillés lors de la sélection humaine doivent être préservés identiques jusqu'au bout de la chaîne. Tout skill qui détecte une dérive du sujet ou de l'angle doit retourner `BLOCKED`, jamais reformuler silencieusement.
- **Aucune invention** : aucun skill ne doit inventer un fait externe, une source, une citation, un score, une approbation humaine ou un statut de workflow.
- **Séparation public/interne** : l'article final destiné au lecteur et les données de travail internes (scores, ledgers, notes de révision) ne doivent jamais se mélanger dans un même document.
- **Disclaimer obligatoire** : *"This content is provided for informational purposes only and does not constitute investment advice or a personalized recommendation."* — présent dans tout article, jamais retiré ni affaibli.
- **Isolation par région** : chaque région (US, Europe, Asie) a son propre lignage, ses propres compteurs de révision et son propre article. Aucune donnée, aucun compteur, aucun blocage ne doit se propager d'une région à l'autre.
- **Originalité textuelle** : au plus une citation directe par article, sous 15 mots ; toute paraphrase doit être formulée de façon réellement indépendante de la source, y compris pour les sources primaires officielles (communiqués de banque centrale, etc.).

---

## 2. `run-macroalloc-content-factory` — L'orchestrateur

### Rôle
Exécute la chaîne complète des 7 autres skills, transmet les objets normalisés entre eux, interprète les statuts, contrôle les boucles de révision, et arrête l'exécution quand une porte de qualité ou de validation humaine n'est pas satisfaite. Depuis l'extension multi-régions, produit jusqu'à **3 articles par run (US, Europe, Asie)**, traités **séquentiellement**, chacun avec son propre état isolé.

### Quand l'utiliser
Pour un run complet du Content Factory de bout en bout. Ne remplace jamais les skills spécialistes — il les invoque, il ne fait pas leur travail à leur place.

### Ce qu'il ne doit jamais faire
- Sauter une étape sans que cette étape soit explicitement définie comme optionnelle.
- Choisir un sujet à la place de l'utilisateur, pour aucune région.
- Publier automatiquement, à n'importe quelle étape.
- Laisser une région démarrer sa production avant que la région précédente ait atteint sa propre validation humaine.
- Partager, cumuler ou laisser fuiter un compteur de révision, un lignage ou un contenu d'une région vers une autre.

### Déroulé (10 étapes ; les étapes 3 à 9 s'exécutent une fois par région sélectionnée, dans l'ordre US → Europe → Asie)

| Étape | Nom | Ce qui se passe |
|---|---|---|
| Stage 0 | Preflight | Vérifie que les 7 skills spécialistes sont disponibles, initialise l'ID de run et les logs, fixe `en-US` comme langue primaire |
| Stage 1 | Discover | Invoque `discover-content-opportunities` **une seule fois**, attend `AWAITING_USER_SELECTION` avec 3 shortlists groupées par région |
| Stage 2 | Topic-selection gate | **Porte humaine obligatoire.** Présente 3-5 candidats par région, retourne le statut exact et **termine le tour immédiatement**. Un choix par région, dans le même tour ou sur plusieurs tours |
| Stage 3 | Research | Invoque `research-macro-evidence` après `TOPIC_SELECTED` **pour la région active** |
| Stage 4 | Write | Invoque `write-macro-insight` **pour la région active** |
| Stage 5 | Verify | Invoque `verify-financial-article`. Boucle rédacteur/vérificateur : max. **2** itérations, **comptées indépendamment par région** |
| Stage 6 | Discoverability | Invoque `optimize-content-discoverability` après `APPROVED_FOR_SEO` uniquement |
| Stage 7 | Review | Invoque `review-article`. Boucle de correction finale : max. **2** cycles, par région |
| Stage 8 | Package | Invoque `generate-article-package` uniquement après approbation éditoriale (`PUBLISH`) ; le nom des 2 fichiers DOCX inclut la région |
| Stage 9 | Validation humaine finale | Présente les deux fichiers DOCX **de la région active seule**, attend `APPROVE` / `REQUEST_CHANGES` / `REJECT`, puis passe à la région suivante. Aucune publication CMS/réseau sans `APPROVE` |

### Matrice de routage des révisions

| Type de problème | Responsable | Reprise obligatoire |
|---|---|---|
| Fait nouveau ou modifié | Vérificateur, puis rédacteur si besoin | Vérif → SEO → Revue → Package |
| Affirmation causale non soutenue | Rédacteur + vérificateur | Vérif → SEO → Revue → Package |
| Contexte ou explication manquante | Rédacteur | Vérif → SEO → Revue → Package |
| Style, flux, pédagogie | Rédacteur | Vérif → SEO → Revue → Package |
| Titre meta, description, slug | SEO | Revue → Package |
| Liens internes, schema, snippets | SEO | Revue → Package |
| Désaccord de positionnement éditorial | Humain | Reprise à l'étape désignée |
| Mise en forme, couverture, tableau | Générateur de package | Package uniquement |
| Source indisponible ou contradictoire | Vérificateur / Humain | Chaîne complète en aval |
| Cannibalisation de sujet | Humain / SEO | Reprise après décision |

### Limites de boucles (dures, jamais dépassées — comptées séparément pour chaque région)
- Boucles rédacteur-vérificateur : **2**
- Reprises SEO seules : **1**
- Cycles de correction en revue finale : **2**
- Reprises de packaging : **1**
- Les compteurs ne sont **jamais réinitialisés** en créant un job caché, et **jamais partagés** entre régions.

### Statuts terminaux possibles (par région, sauf `AWAITING_USER_SELECTION` qui couvre les 3)
`AWAITING_USER_SELECTION`, `AWAITING_FINAL_HUMAN_VALIDATION`, `COMPLETED`, `BLOCKED`

**Fichiers source** : [SKILL.md](../skills/run-macroalloc-content-factory/SKILL.md), [references/workflow.md](../skills/run-macroalloc-content-factory/references/workflow.md), [references/contracts.md](../skills/run-macroalloc-content-factory/references/contracts.md)

---

## 3. `discover-content-opportunities` — Découverte de sujets

### Rôle
Identifie et classe 3 à 5 opportunités de contenu qualifiées **pour chacune des trois régions US, Europe et Asie, en un seul passage**, puis s'arrête pour une sélection humaine explicite (un choix par région). Gère aussi la confirmation de cette sélection dans un tour ultérieur.

### Quand l'utiliser / ne pas l'utiliser
À utiliser pour la découverte de sujets événementiels ou evergreen, l'évaluation d'adéquation éditoriale, le criblage de faisabilité de preuves, ou la validation d'une sélection utilisateur depuis une shortlist active.
**Ne jamais l'utiliser** pour rechercher, rédiger, ou choisir le sujet final de façon autonome, pour aucune région.

### Les deux modes
- **`DISCOVERY`** : construit et classe les 3 shortlists régionales. Une région qui ne réunit pas 3 candidats qualifiés reçoit son propre `region_status: NO_SUITABLE_SHORTLIST` sans bloquer les deux autres. Le statut global `NO_SUITABLE_SHORTLIST` ne s'applique que si les 3 régions échouent.
- **`SELECTION_CONFIRMATION`** : reçoit le choix de l'utilisateur, **par région**, dans un tour séparé, et ne l'accepte que s'il correspond exactement à une option de la shortlist de cette région. L'utilisateur peut choisir 1, 2 ou 3 régions dans le même tour ou sur plusieurs tours — une région non adressée reste simplement en attente sans bloquer les autres.

### Moteurs d'évaluation (domain-rules)
Le skill fait passer chaque candidat par une chaîne de moteurs avant de le noter :
1. **Architecture de découverte** — construction de l'univers de candidats, déduplication.
2. **Règles d'interprétation des signaux** — une tendance n'est pas une matérialité ; un mouvement de marché n'est pas automatiquement une cause ; un événement calendaire n'est pas automatiquement une opportunité ; la nouveauté n'est pas la qualité.
3. **Moteur de matérialité** — économique, de marché, pour le lecteur, stratégique.
4. **Moteur de demande de l'audience.**
5. **Moteur de génération d'angle.**
6. **Moteur de différenciation MacroAlloc.**
7. **Moteur de faisabilité des sources** — applique la même hiérarchie de sources que les autres skills (primaires officielles > fournisseurs de données/bourses > Reuters/Bloomberg/FT/WSJ/AP > instituts de recherche/fournisseurs d'indices/émetteurs ETF > autres sources qualifiées).
8. **Moteur de fraîcheur et de timing** — classes de timing, règle anti-événement périmé.
9. **Moteur de saisonnalité et calendrier.**
10. **Moteur de lacune de contenu.**
11. **Moteur de mémoire de contenu et anti-cannibalisation.**
12. **Moteur de scoring** — dimensions pondérées + pénalités.
13. **Moteur de priorité.**

### Protocoles spéciaux
- **Actualité chaude** (breaking news) : protocole dédié.
- **Sujets evergreen** : protocole dédié.
- **Opportunités ETF** : protocole dédié.

### Ce qu'il ne doit jamais faire
- Traiter un classement, un score, l'urgence, ou une demande de "lancer tout le workflow" comme une sélection humaine.
- Forcer une shortlist faible à atteindre 3 candidats — mieux vaut retourner `NO_SUITABLE_SHORTLIST`.

### Statuts terminaux
`AWAITING_USER_SELECTION`, `TOPIC_SELECTED`, `NO_SUITABLE_SHORTLIST`, `BLOCKED`

**Fichiers source** : [SKILL.md](../skills/discover-content-opportunities/SKILL.md), [references/domain-rules.md](../skills/discover-content-opportunities/references/domain-rules.md) (le plus long des 4 fichiers de ce skill, 23 sections)

---

## 4. `research-macro-evidence` — Dossier de preuves

### Rôle
Construit un dossier de preuves macroéconomiques et de marché traçable pour le sujet explicitement sélectionné, avant toute rédaction. C'est le skill le plus récent (nouveau en v1.4.0) et le plus court des 8 (par choix de périmètre, pas par négligence — il ne porte pas de taxonomie de sévérité ni de moteur de scoring propre, ces responsabilités restent chez `verify-financial-article` et `review-article`).

### Quand l'utiliser / ne pas l'utiliser
Après `TOPIC_SELECTED`, pour retrouver et réconcilier des sources actuelles, faits confirmés, séries de données, pivots causaux, incertitudes, interprétations concurrentes et affirmations interdites.
**Ne jamais l'utiliser** pour sélectionner un sujet, écrire l'article, vérifier le brouillon final, ou procéder sans preuve de sélection.

### Séquence de recherche (10 étapes)
1. Confirmer que le sujet sélectionné appartient à la shortlist préservée.
2. Décomposer le plan de recherche sélectionné en réclamations et questions.
3. Récupérer les sources primaires officielles prévues, en enregistrant la preuve de récupération.
4. Ajouter des sources secondaires crédibles pour le contexte ou la cartographie des désaccords.
5. Normaliser unités, dates, périodes de publication, révisions, définitions, juridictions.
6. Extraire faits confirmés, réclamations attribuées, attentes, incertitude, limites des sources.
7. Tester les pivots causaux et documenter les explications alternatives sans forcer un faux équilibre.
8. Réconcilier communication des banques centrales, composantes des données macro, réactions de marché, comparaisons historiques.
9. Marquer chaque question prévue comme répondue, partiellement répondue, sans réponse, ou non applicable.
10. Exécuter les portes de fraîcheur, diversité, complétude, traçabilité et de préparation pour la rédaction.

### Hiérarchie de sources (règle partagée avec `verify-financial-article` et `write-macro-insight`)
1. Sources primaires officielles
2. Fournisseurs de données officiels reconnus et bourses
3. Reuters, Bloomberg, Financial Times, Wall Street Journal, Associated Press ou organisations de presse financière similairement rigoureuses
4. Instituts de recherche reconnus, fournisseurs d'indices, émetteurs ETF
5. Autres sources seulement si nécessaire et clairement qualifiées

*(Cette liste a été harmonisée entre les 3 skills qui la partagent — voir [rapport d'installation](CLAUDE_SKILLS_INSTALLATION_REPORT.md) §2.6. Un [script de contrôle](../scripts/check-canonical-text.sh) vérifie qu'elle reste identique dans les 3 skills.)*

### Ce qu'il ne doit jamais faire
- Rédiger de la prose d'article au-delà de courts résumés de preuves et des champs de handoff exacts.
- Traiter le dossier comme une vérification indépendante du futur article.

### Statuts terminaux
`EVIDENCE_DOSSIER_READY_FOR_WRITING`, `RESEARCH_REVISION_REQUIRED`, `EDITORIAL_DECISION_REQUIRED`, `BLOCKED`

**Fichiers source** : [SKILL.md](../skills/research-macro-evidence/SKILL.md), [references/workflow.md](../skills/research-macro-evidence/references/workflow.md)

---

## 5. `write-macro-insight` — Rédaction

### Rôle
Rédige ou révise un Morning ou Evening Macro Insight publication-ready, en anglais US, à partir d'un sujet verrouillé et humainement sélectionné, et d'un dossier de preuves.

### Quand l'utiliser / ne pas l'utiliser
Uniquement avec `EVIDENCE_DOSSIER_READY_FOR_WRITING` et le lignage `TOPIC_SELECTED` préservé.
**Ne jamais l'utiliser** pour rechercher des preuves manquantes, rédiger avant sélection, changer le sujet ou l'angle verrouillé, vérifier indépendamment, ou emballer pour publication.

### Périmètre éditorial
**Dans le périmètre** : politique monétaire ; inflation, croissance, emploi, politique fiscale et finances publiques ; commerce, sanctions et politique industrielle ; matières premières et énergie ; géopolitique avec un mécanisme de transmission macroéconomique ou cross-asset défendable ; repricing matériel sur actions, taux, crédit, devises ou matières premières.
**Hors périmètre** : recherche de produits ETF, recommandations sur titres individuels, allocation d'actifs personnalisée, commentaire politique pur sans mécanisme économique, spéculation non sourcée, réseaux sociaux/newsletters/scripts vidéo, adaptation française, génération finale du fichier Word.

### Architecture éditoriale requise
1. H1 descriptif énonçant l'événement et la conséquence économique/de marché.
2. Sous-titre concis.
3. **Exactement 3** points clés, chacun avec une fonction distincte (développement confirmé / mécanisme / incertitude ou prochain indicateur).
4. Ouverture répondant en 100-150 mots à : que s'est-il passé, pourquoi maintenant, quel est l'angle MacroAlloc, qu'est-ce qui reste incertain.
5. 2 à 5 sections H2 organisées par logique analytique, pas seulement chronologique.
6. Section d'analyse MacroAlloc substantielle liant l'événement aux transmissions économiques et de marché — **au moins 2 canaux de transmission distincts** requis (ex. énergie → inflation → réaction banque centrale → rendements réels et valorisations actions).
7. Section "What to Watch Next" avec indicateurs, dates ou conditions observables.
8. Disclaimer standard.
9. Liste de sources numérotée.
10. Notes éditoriales internes et métadonnées de sortie structurées.

### Longueur cible
700-1000 mots (standard), 1000-1300 mots (sujet complexe), 1500 mots maximum si justifié. Ne jamais allonger artificiellement pour atteindre une cible.

### Les 4 couches à distinguer
1. **Faits confirmés** — événements et données soutenus par le dossier de preuves.
2. **Incertitude** — information manquante, provisoire, disputée ou changeant rapidement.
3. **Interprétation MacroAlloc** — l'inférence analytique, clairement présentée comme analyse, pas comme fait.
4. **Scénarios ou prévisions** — résultats conditionnels avec langage conditionnel explicite.

Formulations de certitude interdites : *"will definitely"*, *"guarantees"*, *"proves"* (quand la preuve ne montre qu'une cohérence), *"the market will"*, *"investors must"*.

### Originalité textuelle et limite de citation (règle ajoutée après le run réel du 6 août 2026)
- **Une seule citation directe maximum par article, sous 15 mots.** Toute autre déclaration attribuée doit être reformulée en discours indirect (*"Hammack argued that..."*), jamais reproduite mot pour mot.
- **Aucune paraphrase trop proche d'une source** : si plus de 8 à 10 mots consécutifs reprennent l'ordre exact d'une source, même sans guillemets, la phrase doit être réécrite de façon réellement indépendante.
- **S'applique aussi aux sources primaires officielles** (communiqués de banque centrale, textes gouvernementaux) — leur langage opératoire est facile à reprendre sans s'en rendre compte, mais reste soumis à la règle.
- Découverte en pratique : lors du premier run réel multi-régions, un brouillon a reproduit 3 citations de dirigeants de la Fed dépassant la limite, et un autre a repris presque mot pour mot une phrase d'un communiqué de la BCE — les deux ont dû être corrigés en révision. C'est ce qui a motivé l'ajout de cette règle formelle plutôt que de compter sur une vigilance ponctuelle.

### Contrôle de complétude contextuelle (obligatoire avant finalisation)
Chaque facteur contextuel matériel d'une source citée doit être classé : `INTEGRATED_IN_ARTICLE`, `EXCLUDED_AS_IMMATERIAL`, `EXCLUDED_TO_PRESERVE_SCOPE`, `EXCLUDED_DUE_TO_INSUFFICIENT_CORROBORATION`, ou `REQUIRES_VERIFIER_REVIEW`. Aucun facteur matériel ne peut disparaître silencieusement entre la recherche et la rédaction.

### Mode révision
Attempt 0 (brouillon initial), 1 ou 2 (révision ciblée). **Jamais de 3e révision automatique.** Si la correction demandée changerait matériellement le sujet ou l'angle verrouillé → `EDITORIAL_DECISION_REQUIRED`, jamais un changement silencieux.

### Ce qu'il ne doit jamais faire
Interpréter "continuer", "choisir le meilleur sujet", l'urgence ou une demande de workflow complet comme preuve de sélection humaine ; rédiger pendant `AWAITING_USER_SELECTION` ; écrire en français ; changer Morning en Evening ; inventer faits/sources/URLs/citations/niveaux de marché ; approuver son propre brouillon ; produire un Package qui a l'air vérifié ; publier.

### Statuts terminaux
`DRAFT_READY_FOR_VERIFICATION`, `REVISION_REQUIRED`, `EDITORIAL_DECISION_REQUIRED`, `BLOCKED`

**Fichiers source** : [SKILL.md](../skills/write-macro-insight/SKILL.md), [references/domain-rules.md](../skills/write-macro-insight/references/domain-rules.md)

---

## 6. `verify-financial-article` — Vérification indépendante

### Rôle
Vérifie indépendamment un article contre ses preuves après `DRAFT_READY_FOR_VERIFICATION`. C'est la porte de qualité factuelle, analytique, contextuelle et de conformité entre le rédacteur et l'optimiseur SEO.

### Principe fondamental : indépendance
*"Do not assume the Writer is correct."* Reconstruit la logique factuelle et analytique de l'article à partir des preuves fournies. Traite chaque affirmation matérielle comme non vérifiée jusqu'à contrôle.

### Procédure de vérification (12 étapes)
1. Valider le contrat d'entrée (langue, édition, sujet/angle verrouillés, statut, cohérence des IDs de source).
2. Construire le claim ledger (extraire chaque affirmation matérielle du H1, takeaways, ouverture, sections, analyse, watchlist, résumé exécutif).
3. Vérifier faits et calculs (valeur exacte, unité, devise, période, base nominale/réelle, ajustement saisonnier, statut préliminaire/révisé, cohérence arithmétique).
4. Vérifier citations, **originalité textuelle**, et communications officielles (locuteur, formulation, date, nature de la déclaration ; compter les citations directes et détecter toute paraphrase trop proche d'une source, y compris une source primaire officielle).
5. Vérifier les pivots causaux avec scrutin renforcé : prémisses, liens logiques, source ou mécanisme accepté, contre-preuve, niveau de certitude justifié.
6. Tester les interprétations alternatives (effets de base vs pression durable, optimisme de croissance vs rachat de positions courtes, etc.) sans fabriquer un faux équilibre.
7. Réconcilier le contexte des sources avec le brouillon — détecter toute `SILENT_CONTEXT_LOSS`.
8. Vérifier la logique de transmission de marché — rejeter les affirmations génériques, préférer *"contributed to"* à *"caused"* quand l'attribution est incertaine.
9. Vérifier la cohérence interne (H1 vs corps, takeaways vs preuves, introduction vs conclusion).
10. Vérifier la complétude éditoriale.
11. Vérifier la conformité financière (pas de conseil personnalisé, pas de langage de suitability, pas d'instruction d'achat/vente).
12. Vérifier la fraîcheur et les rechecks de publication — **si la thèse centrale dépend d'un élément non résolu, retourner `BLOCKED`**, jamais laisser passer avec un recheck non défini.

### Modèle de scoring
6 scores de 0 à 100 : `factual_accuracy` (30%), `source_quality` (15%), `macro_reasoning` (20%), `context_completeness` (15%), `editorial_integrity` (10%), `compliance` (10%).

**`APPROVED_FOR_SEO` exige tout ceci simultanément** : score global ≥ 90, précision factuelle ≥ 95, conformité = 100, aucun problème `CRITICAL`/`MAJOR`/`MODERATE non résolu`, chaque pivot causal central classé au moins `SUPPORTED_WITH_QUALIFICATION`, réconciliation de contexte complète, toutes les sources mandatoires identifiables, pas de dérive de thèse, **au plus une citation directe sous 15 mots, et aucune paraphrase trop proche d'une source**. **Un score élevé ne peut jamais compenser une porte dure ratée.**

### Taxonomie de sévérité
| Sévérité | Exemple | Résultat requis |
|---|---|---|
| `CRITICAL` | Source ou citation inventée, thèse centrale non soutenue | `BLOCKED` ou `EDITORIAL_DECISION_REQUIRED` |
| `MAJOR` | Pivot causal non soutenu, date/nombre important faux | `REVISION_REQUIRED` |
| `MODERATE` | Attribution faible, décomposition de données manquante | Révision sauf correction ciblée possible |
| `MINOR` | Formulation répétitive, mise en forme de sources incohérente | N'empêche pas l'approbation, doit être noté |

### Ce qu'il ne doit jamais faire
Inventer une source/citation/donnée/correction ; approuver une affirmation parce qu'elle semble plausible ; remplacer une affirmation d'une partie intéressée par un fait non attribué ; réparer silencieusement l'article ; utiliser un score élevé pour contourner une porte ratée ; qualifier l'article de "prêt à publier".

### Statuts terminaux
`APPROVED_FOR_SEO`, `REVISION_REQUIRED`, `EDITORIAL_DECISION_REQUIRED`, `BLOCKED`

**Fichiers source** : [SKILL.md](../skills/verify-financial-article/SKILL.md), [references/workflow.md](../skills/verify-financial-article/references/workflow.md), [references/quality-and-tests.md](../skills/verify-financial-article/references/quality-and-tests.md)

---

## 7. `optimize-content-discoverability` — SEO et découvrabilité

### Rôle
Optimise un article financièrement approuvé pour la recherche et la découverte IA prioritaire US, en préservant faits vérifiés, thèse, sujet et angle verrouillé.

### Quand l'utiliser / ne pas l'utiliser
Uniquement après `APPROVED_FOR_SEO`.
**Ne jamais l'utiliser** pour inventer des données de recherche, des preuves concurrentielles, des liens, des accréditations, ou altérer le fond sans re-vérification.

### Principe fondamental : pas de théâtre d'optimisation
Interdit d'affirmer qu'un article "va être classé", "sera cité par une IA", "apparaîtra dans Google Discover", ou "surpassera les concurrents". Langage calibré obligatoire : *"supports discoverability"*, *"improves retrieval readiness"*, *"creates a candidate answer block"*.

### Les 19 modules
Après avoir gelé la substance vérifiée dans un ledger de préservation, le skill exécute :

| Module | Fonction |
|---|---|
| Stratégie de recherche | Intention dominante, mots-clés, requêtes longue traîne |
| Package de titres | H1 recommandé + 2-4 alternatives, meta title, Open Graph |
| Package de métadonnées | Meta description, slug, canonical, excerpt, tags |
| Moteur d'intention de recherche | Objectif, procédure, sortie |
| Stratégie mots-clés/questions | Classes de mots-clés, règles, revue de placement |
| Couverture sémantique | Vérifications, sortie |
| Reconnaissance d'entités | Classes d'entités, règles |
| E-E-A-T et confiance | Signaux soutenus, prohibés |
| Recherche et récupération IA | Vérifications de récupération, blocs de réponse |
| Google AI Overview | Préparation |
| Featured snippet | Candidats, procédure |
| Google Discover | Objectif, règles de titre |
| Knowledge graph | — |
| Recommandation de schema | Types, propriétés |
| Maillage interne | Preuves requises, classes de liens |
| Optimisation image/visuel | Image héro, texte alt |
| Structure et lisibilité | — |
| **Intelligence concurrentielle** (optionnel) | Activation, classification, extraction, gaps |
| **Autorité thématique** (optionnel) | Activation, classification, analyse |
| **Mémoire de contenu / anti-cannibalisation** (optionnel) | Empreinte article, comparaison, classification |
| **Décroissance et rafraîchissement** (optionnel) | Classes de fraîcheur, facteurs de décroissance |
| **Intelligence de distribution éditoriale** (optionnel) | Portée, règles de préservation, règles de canal |

Les modules marqués optionnels **doivent** être classés `NOT_ASSESSED` plutôt qu'inventés quand les données externes réelles (concurrents, volumes de recherche) sont indisponibles — testé et confirmé dans le Test C.

### 10 portes qualité obligatoires
Vérification amont, préservation de substance, intention de recherche, complétude des métadonnées, intégrité du titre, clarté sémantique/entités, préservation des citations, lisibilité humaine, absence d'intelligence externe fabriquée, préservation de la conformité.

### Ce qu'il ne doit jamais faire
Ajouter un nouveau nombre, mouvement de marché, citation, affirmation causale, prévision, comparaison historique ; traiter chaque signal externe comme également fiable ; rejeter une amélioration qui rend l'article moins naturel, plus répétitif, ou qui retarde la réponse.

### Statuts terminaux
`DISCOVERABILITY_READY_FOR_REVIEW`, `DISCOVERABILITY_REVISION_REQUIRED`, `CONSOLIDATION_DECISION_REQUIRED`, `EDITORIAL_DECISION_REQUIRED`, `BLOCKED`

**Fichiers source** : [SKILL.md](../skills/optimize-content-discoverability/SKILL.md), [references/domain-rules.md](../skills/optimize-content-discoverability/references/domain-rules.md) (le plus long des 32 fichiers `references/`, 25 sections)

---

## 8. `review-article` — Revue éditoriale finale

### Rôle
Revue éditoriale finale et indépendante d'un article vérifié et optimisé, pour évaluer clarté, valeur pour le lecteur, qualité de l'insight, objectivité, adéquation à la marque, structure et complétude du package.

### Principe fondamental : jugement indépendant
*"Do not assume that the Writer, Verifier or Discoverability skill is correct merely because an upstream state says it passed."* Ce skill ne duplique pas la vérification factuelle complète ni ne reconstruit le package SEO — il route les problèmes suspectés vers le skill amont responsable.

### 10 moteurs de revue
Qualité éditoriale (cohérence, précision, économie, hiérarchie), Expérience lecteur (facilité d'entrée, rythme, fatigue), Valeur éducative (mécanisme causal, dynamique de pricing, cadre de scénario), **Qualité de l'insight** (`DISTINCTIVE` / `STRONG` / `ADEQUATE` / `LIMITED` / `GENERIC` — un résultat `GENERIC` est une barrière dure sauf article purement pédagogique), Flux narratif (fonction de chaque section), Questions du lecteur, Charge cognitive, Objectivité et confiance, Cohérence de marque, Décision de publication.

### Modèle de scoring (9 dimensions pondérées)
Qualité éditoriale (20%), Expérience lecteur (15%), Valeur éducative (15%), Qualité de l'insight (15%), Objectivité et confiance (10%), Adéquation à la marque MacroAlloc (10%), Alignement structurel/métadonnées (5%), Originalité et valeur ajoutée (5%), Complétude du package (5%).

### 13 portes qualité obligatoires pour `PUBLISH`
Intégrité amont, promesse éditoriale tenue, cohérence de la thèse centrale, complétude des questions du lecteur, seuil d'insight (au moins `ADEQUATE`, `STRONG` requis pour Macro Insight sauf angle purement explicatif approuvé), valeur éducative, objectivité et incertitude préservées, charge cognitive non excessive, qualité de conclusion, cohérence de marque, fidélité des métadonnées, signal de conformité, complétude du package.

### Principe de proportionnalité
*"Do not block publication for cosmetic preferences."* Distingue défauts qui nuisent à l'exactitude/au sens/à la confiance, faiblesses qui réduisent la qualité mais restent publiables, et améliorations optionnelles à faible valeur marginale. Testé en pratique : un point d'amélioration optionnel (originalité) n'a pas empêché une décision `PUBLISH`.

### Ce qu'il ne doit jamais faire
Réparer silencieusement l'article ; approuver parce que le workflow est complet, le délai proche, ou le score moyen élevé ; dupliquer la vérification factuelle complète.

### Statuts terminaux
`PUBLISH`, `MINOR_REVISIONS`, `MAJOR_REVISIONS`, `EDITORIAL_DECISION_REQUIRED`, `REJECT`, `BLOCKED`

**Fichiers source** : [SKILL.md](../skills/review-article/SKILL.md), [references/domain-rules.md](../skills/review-article/references/domain-rules.md), [references/quality-and-tests.md](../skills/review-article/references/quality-and-tests.md)

---

## 9. `generate-article-package` — Package final

### Rôle
Crée deux livrables Word **séparés** à partir d'un article approuvé : un Publication Package public et un Workflow Report interne. Uniquement après approbation éditoriale finale (`PUBLISH`).

### Principe fondamental : assemblage, pas création
*"The skill assembles approved components. It does not become a second Writer, Verifier, SEO optimizer or Reviewer."* L'article approuvé est un artefact immuable : le skill peut appliquer des styles Word, convertir le Markdown, normaliser l'espacement — il ne peut pas réécrire une phrase, changer un chiffre, ou retirer une réserve.

### Architecture à deux documents

**Publication Package** (public, court, réutilisable en CMS) :
1. En-tête (MacroAlloc, type de contenu, édition, langue, titre final)
2. Article complet approuvé (takeaways, tableaux, disclaimer, sources publiques)
3. Appendice "SEO FOR PUBLICATION" (champs approuvés uniquement)
4. Détails d'asset visuel optionnels

**Interdit dans ce document** : page de garde, sommaire, résumé exécutif de workflow, tableau de bord de préparation, scores, claim ledger, contenu de revue IA, métadonnées techniques, ID de workflow, provenance, historique de révision, prompts, diagnostics.

**Workflow Report** (interne, marqué "INTERNAL — NOT FOR PUBLICATION") :
1. Identité du workflow, versions, statut d'exécution
2. Shortlist de découverte et candidats rejetés
3. Preuve de sélection humaine explicite, sujet/angle verrouillés
4. Plan de recherche, registre de sources vérifiées
5. Claim ledger, revue des pivots causaux, rapport de vérification
6. Évaluation de découvrabilité, rationale SEO interne
7. Revue éditoriale, registre des problèmes, historique de révision
8. Validation du package, résultats de rendu/accessibilité
9. Provenance, hachages, compteurs de cycle, action humaine finale

### 11 contrôles d'intégrité avant tout rendu
Immuabilité de l'article, cohérence de version, cohérence de statut, complétude des métadonnées, intégrité des sources, intégrité des réclamations, intégrité de la revue, détection de placeholders non résolus (`[TBD]`, `[INSERT]`, `TODO`, `XX`, URLs factices), séparation public/interne, validité des hyperliens, **export réussi des deux fichiers** (un seul fichier exporté = `PACKAGE_REVISION_REQUIRED`).

### Ce qu'il ne doit jamais faire
Traduire, remplacer, élargir, resélectionner ou réécrire le contenu primaire approuvé ; choisir silencieusement entre deux champs amont en conflit (`EDITORIAL_INPUT_REQUIRED` ou `BLOCKED` à la place) ; déclarer le contenu `PUBLISHED`.

### Point technique important
Ce skill décrit la **structure et le formatage** requis (styles Word nommés, page A4/Letter, table des matières actualisable) mais ne contient **aucun mécanisme de rendu `.docx` intégré**. La génération physique du fichier nécessite un outil externe (voir Test D dans le [rapport de test](MACROALLOC_WORKFLOW_TEST_REPORT.md) — utilisé avec succès : bibliothèque `docx` npm).

### Statuts terminaux
`DUAL_ARTIFACTS_READY_FOR_HUMAN_VALIDATION`, `PACKAGE_REVISION_REQUIRED`, `EDITORIAL_INPUT_REQUIRED`, `BLOCKED`

**Fichiers source** : [SKILL.md](../skills/generate-article-package/SKILL.md), [references/domain-rules.md](../skills/generate-article-package/references/domain-rules.md), [references/contracts.md](../skills/generate-article-package/references/contracts.md)

---

## 10. Tableau récapitulatif des statuts

| Skill | Statuts de succès | Statuts d'échec/blocage |
|---|---|---|
| `discover-content-opportunities` | `AWAITING_USER_SELECTION`, `TOPIC_SELECTED` | `NO_SUITABLE_SHORTLIST`, `BLOCKED` |
| `research-macro-evidence` | `EVIDENCE_DOSSIER_READY_FOR_WRITING` | `RESEARCH_REVISION_REQUIRED`, `EDITORIAL_DECISION_REQUIRED`, `BLOCKED` |
| `write-macro-insight` | `DRAFT_READY_FOR_VERIFICATION` | `REVISION_REQUIRED`, `EDITORIAL_DECISION_REQUIRED`, `BLOCKED` |
| `verify-financial-article` | `APPROVED_FOR_SEO` | `REVISION_REQUIRED`, `EDITORIAL_DECISION_REQUIRED`, `BLOCKED` |
| `optimize-content-discoverability` | `DISCOVERABILITY_READY_FOR_REVIEW` | `DISCOVERABILITY_REVISION_REQUIRED`, `CONSOLIDATION_DECISION_REQUIRED`, `EDITORIAL_DECISION_REQUIRED`, `BLOCKED` |
| `review-article` | `PUBLISH` | `MINOR_REVISIONS`, `MAJOR_REVISIONS`, `EDITORIAL_DECISION_REQUIRED`, `REJECT`, `BLOCKED` |
| `generate-article-package` | `DUAL_ARTIFACTS_READY_FOR_HUMAN_VALIDATION` | `PACKAGE_REVISION_REQUIRED`, `EDITORIAL_INPUT_REQUIRED`, `BLOCKED` |
| `run-macroalloc-content-factory` | `COMPLETED` | `AWAITING_USER_SELECTION`, `AWAITING_FINAL_HUMAN_VALIDATION`, `BLOCKED` |

## 11. Ce qui a été vérifié en conditions réelles vs simulées

- **Réel, 1 région** : découverte de sujets sur de vraies actualités (Test B) — fonctionne, s'arrête correctement.
- **Simulé (données fictives), 1 région** : la chaîne complète recherche → rédaction → vérification → SEO → revue → package (Test C) — a produit un vrai résultat `BLOCKED` en vérification avant d'être corrigé, preuve que les portes dures fonctionnent sous pression.
- **Simulé (données fictives), 3 régions** : retest complet du support multi-régions — isolation des compteurs de révision confirmée (Europe a nécessité 1 révision sans affecter US ni Asie), 3 validations humaines présentées séparément dans l'ordre séquentiel, nommage de fichiers par région vérifié.
- **Réel, 3 régions, avec production DOCX complète** : run entièrement réel (actualités Fed, BCE, KOSPI du 6 août 2026) jusqu'à 6 fichiers `.docx` réels. A révélé en pratique le besoin de la règle anti-plagiat (§5-6 ci-dessus) et une vraie omission de ma part (bloc SEO manquant sur le premier fichier généré, corrigée immédiatement).
- **Non couvert par ces 8 skills** : l'adaptation française, qui reste un besoin déclaré mais non implémenté.

Détails complets des tests : [MACROALLOC_WORKFLOW_TEST_REPORT.md](MACROALLOC_WORKFLOW_TEST_REPORT.md).
