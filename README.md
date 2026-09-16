# MacroAlloc Content Factory

Repository for the MacroAlloc editorial skills and their shared workflow contracts.

## Current bundle

- Bundle version: **1.6.0**
- Lifecycle status: **TESTING**
- Primary production language: **en-US**
- Target market: **United States**

The bundle contains ten interoperable skills:

1. `discover-content-opportunities`
2. `research-macro-evidence`
3. `write-macro-insight`
4. `verify-financial-article`
5. `optimize-content-discoverability`
6. `review-article`
7. `generate-article-package`
8. `adapt-article-french`
9. `run-macroalloc-content-factory`
10. `track-content-selections` — auxiliary: logs every human-confirmed `TOPIC_SELECTED` to the Git-tracked registry in `data/content-log/`, and answers the content-memory queries `discover-content-opportunities` uses to avoid re-proposing a topic it already covered.

## Repository structure

- `skills/`: one directory per Codex skill — the development source of truth.
- `.claude/skills/`: deployment copy for Claude Code, kept in sync with `skills/`.
- `claude-online-skills/`: deployment copy for claude.ai, with ready-to-import `.zip` packages.
- `docs/architecture.md`: canonical design and new-skill conventions.
- `docs/artifact-policy.md`: protection rules for untracked article and test artifacts.
- `docs/history/`: historical change records.
- `skill-versions.json`: authoritative bundle and skill versions.
- `workflow-contracts.json`: stage order, statuses, handoffs, and human gates.
- `tests/`: structural validator and behavioral evaluation fixtures.
- `test-packages/`, `docs/article-jobs/`, `docs/article-packages/`: generated test and production artifacts. Their presence is not an approval; they stay out of version control by default (see `docs/artifact-policy.md`).
- `data/content-log/`: the `track-content-selections` registry (`selected-topics.csv` source of truth, `selected-topics.xlsx` human-readable export). Unlike the generated artifacts above, this registry is deliberately Git-tracked and append-only.

Every skill follows the standardized layout:

```text
skills/<skill-name>/
├── SKILL.md
├── agents/openai.yaml
└── references/
    ├── workflow.md
    ├── contracts.md
    ├── domain-rules.md
    └── quality-and-tests.md
```

## Validation

Run the bundle validator from the repository root:

```powershell
python tests/validate_skills.py
```

The validator checks structure, contracts, handoffs, metadata, reference routing, line budgets, evaluation coverage, and critical workflow invariants.

## Safety gates

- Explicit human topic selection is mandatory before research or drafting.
- Selected-topic evidence and the locked angle are preserved throughout the workflow.
- Financial verification is independent from writing.
- Discoverability optimization cannot alter verified substance.
- Public publication content and internal workflow evidence are emitted as separate documents.
- Final human validation is mandatory; the workflow never publishes automatically.
- French adaptation runs only after that human approval, as a secondary artifact, never a substitute for the primary US-English package.
