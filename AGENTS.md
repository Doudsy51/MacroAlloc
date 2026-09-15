# MacroAlloc Skill Engineering

## Mission

Ce dépôt conçoit, teste et versionne les skills du MacroAlloc Content Factory. L'architecture, les invariants et le versionnement techniques sont définis dans [docs/architecture.md](docs/architecture.md) — le lire avant toute création ou modification de skill.

## Sources de vérité

- [README.md](README.md) — orientation générale et structure du dépôt.
- [docs/architecture.md](docs/architecture.md) — mise en page canonique, invariants obligatoires, versionnement (`skill-versions.json`, `workflow-contracts.json`).
- [tests/validate_skills.py](tests/validate_skills.py) — validateur structurel automatisé ; l'exécuter avant de déclarer un changement prêt.
- [docs/artifact-policy.md](docs/artifact-policy.md) — protection des artefacts d'articles et de tests non suivis.
- Le `SKILL.md` de chaque skill définit son comportement courant ; `docs/history/<skill>.md` documente les changements publiés.

## Règles de travail

- Inspecter l'arborescence et `git status --short --untracked-files=all` avant toute modification.
- Préserver tous les fichiers utilisateur et tous les artefacts d'articles non suivis (voir `docs/artifact-policy.md`). Ne jamais les supprimer, déplacer, renommer, écraser, nettoyer ou ajouter à Git sans demande explicite.
- Limiter chaque changement au périmètre demandé. Ne pas refactoriser un autre skill opportunément.
- Ne pas ajouter de dépendance, de service externe ou de configuration machine sans demande explicite.
- Préférer des instructions claires aux scripts. Ajouter un script uniquement lorsqu'un traitement déterministe le justifie, sous `skills/<nom>/scripts/`.
- Ne jamais inventer une donnée financière, une preuve de sélection humaine, une approbation, un statut de workflow ou un résultat de validation.
- Respecter les portes humaines du Content Factory, notamment la sélection explicite du sujet et l'approbation finale de publication.

## Copies d'installation

`skills/` est la source de développement. `.claude/skills/` (Claude Code) et `claude-online-skills/` (claude.ai) sont des copies de déploiement pour leur surface respective ; les garder synchronisées avec `skills/` mais ne jamais les traiter comme une source de vérité indépendante.

## Validation minimale

- Exécuter `python tests/validate_skills.py` et corriger tout échec avant de déclarer un changement prêt.
- Tester au minimum : déclenchement direct, formulation indirecte, entrée incomplète, non-déclenchement, cas limite ou blocage.
- Pour un changement de contrat, tester le handoff amont/aval et l'orchestrateur.
- Ne pas déclarer un test réussi s'il n'a pas été exécuté ; signaler clairement les validations non réalisables.

## Communication

- Communiquer en français clair avec l'utilisateur ; expliquer ce qui est fait, pourquoi, et avec quel impact.
- Ne jamais présenter une hypothèse comme un fait vérifié, ni déclarer un test, une synchronisation ou une publication sans preuve.
- Signaler les conséquences avant une action difficilement réversible (suppression, écrasement, force-push, publication).

## Définition de fini

Un changement est fini lorsque son périmètre est respecté, `tests/validate_skills.py` passe, la documentation durable (`docs/history/`) est à jour, les artefacts utilisateur sont intacts, et le compte rendu distingue résultats vérifiés, limites et suites éventuelles.
