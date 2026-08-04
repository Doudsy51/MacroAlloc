# MacroAlloc Content Factory

Repository for the MacroAlloc editorial skills and their shared workflow contracts.

## Current bundle

- Bundle version: **1.4.0**
- Lifecycle status: **TESTING**
- Primary production language: **en-US**
- Target market: **United States**

The bundle contains eight interoperable skills:

1. `discover-content-opportunities`
2. `research-macro-evidence`
3. `write-macro-insight`
4. `verify-financial-article`
5. `optimize-content-discoverability`
6. `review-article`
7. `generate-article-package`
8. `run-macroalloc-content-factory`

## Repository structure

- `skills/`: one directory per Codex skill.
- `docs/architecture.md`: canonical design and new-skill conventions.
- `docs/history/`: historical change records.
- `skill-versions.json`: authoritative bundle and skill versions.
- `workflow-contracts.json`: stage order, statuses, handoffs, and human gates.
- `tests/`: structural validator and 51 behavioral evaluation fixtures.

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
