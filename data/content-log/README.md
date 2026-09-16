# Content selection registry

This folder is the shared, Git-tracked memory of every topic a human has explicitly selected (`TOPIC_SELECTED`) across all runs of the MacroAlloc Content Factory, maintained by the `track-content-selections` skill.

- `selected-topics.csv` — source of truth. Append-only. Never hand-edit; use the skill's script.
- `selected-topics.xlsx` — human-readable export, regenerated from the CSV after every logged selection. Never hand-edit; changes will be overwritten on the next log.

See [skills/track-content-selections/SKILL.md](../../skills/track-content-selections/SKILL.md) for how entries are logged and queried, and [skills/track-content-selections/references/contracts.md](../../skills/track-content-selections/references/contracts.md) for the column schema.

This registry is distinct from `docs/article-jobs/`, `docs/article-packages/`, and `test-packages/`, which are per-run generated artifacts excluded from version control by default (see `docs/artifact-policy.md`). The content-selection registry is deliberately versioned: its entire value is a durable history that survives across sessions and machines.
