# Sources officielles de référence

Consultées le 3 août 2026 pour établir l'environnement de Skill Engineering.

## OpenAI

- [Custom instructions with AGENTS.md](https://learn.chatgpt.com/docs/agent-configuration/agents-md)
- [Build skills](https://learn.chatgpt.com/docs/build-skills)
- [Build plugin skills](https://developers.openai.com/plugins/build/skills)

Principes retenus : hiérarchie d'instructions par portée, `AGENTS.md` concis et spécifique au dépôt, skills focalisés, description utilisée pour la découverte, divulgation progressive, ressources chargées à la demande et tests de déclenchement positifs/négatifs.

## Anthropic

- [Agent Skills overview](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview)
- [Skill authoring best practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices)
- [Manage Claude's memory](https://docs.anthropic.com/en/docs/claude-code/memory)

Principes retenus : skills modulaires chargés progressivement, descriptions de découverte précises, contexte concis, degrés de liberté adaptés à la fragilité de la tâche, ressources séparées et tests avec des usages réels.

## Open Agent Skills

- [Agent Skills specification](https://agentskills.io/specification)

Principes retenus : structure normalisée du dossier, contraintes exactes du frontmatter, chemins relatifs depuis la racine du skill, ressources chargées à la demande et recommandation de garder le `SKILL.md` principal sous 500 lignes.

## Convention de compatibilité

`AGENTS.md` est la source de vérité des instructions de dépôt. `CLAUDE.md` l'importe avec `@AGENTS.md`, mécanisme documenté par Claude Code, afin d'éviter deux ensembles de règles concurrents. Les sources de skills dans `skills/` restent distinctes des emplacements d'installation propres à chaque surface.
