# MacroAlloc skill architecture v1.4.0

## Purpose

Standardize current and future MacroAlloc skills for efficient discovery, progressive disclosure, contract safety, testing, and portability across OpenAI/Codex and Agent Skills-compatible hosts.

## Canonical layout

```text
skills/<skill-name>/
├── SKILL.md
├── agents/
│   └── openai.yaml
└── references/
    ├── workflow.md
    ├── contracts.md
    ├── domain-rules.md
    └── quality-and-tests.md
```

Create `scripts/` or `assets/` only when the skill actually needs deterministic processing or reusable output material.

## Source-of-truth rules

- `SKILL.md`: trigger boundary, preconditions, essential execution sequence, stops, handoffs, and reference routing.
- `references/workflow.md`: full inputs, stages, routing, loops, and revision behavior.
- `references/contracts.md`: schemas, statuses, artifacts, metadata, handoffs, and naming.
- `references/domain-rules.md`: detailed editorial, financial, research, SEO, writing, or formatting policy.
- `references/quality-and-tests.md`: gates, issue taxonomy, acceptance cases, regression fixtures, security, and compliance.
- `agents/openai.yaml`: OpenAI user-interface metadata and invocation policy when needed.
- `skill-versions.json`: bundle and skill versions; runtime instructions must not duplicate these values.
- `workflow-contracts.json`: canonical stage order, accepted terminal statuses, handoffs, and mandatory human stops.
- `tests/evaluations.json`: direct, indirect, incomplete-input, non-trigger, edge, and human-gate cases for every skill.
- `docs/history/`: historical change records only.

## Mandatory invariants

1. Produce the primary article and metadata in US English.
2. Present 3 to 5 qualified topics without padding.
3. Stop for explicit human topic selection before research or drafting.
4. Preserve selection evidence, selected topic, and locked angle downstream.
5. Keep financial verification independent and make hard gates non-bypassable by scores.
6. Prevent discoverability optimization from changing verified facts or thesis.
7. Keep the public Publication Package separate from the internal Workflow Report.
8. Require explicit human final validation; never invent approval or publication.

## New-skill workflow

1. Define one recognizable user goal, positive triggers, non-triggers, inputs, outputs, human decisions, stops, risks, and evidence of success.
2. Search the existing skills, contracts, references, scripts, and plugins before creating anything.
3. Use the official skill initializer when creating a new skill from scratch.
4. Keep the initial implementation instruction-only unless deterministic processing or reusable assets are demonstrably needed.
5. Add `agents/openai.yaml`, register the version centrally, and link every reference directly from `SKILL.md`.
6. Add activation, non-activation, incomplete-input, edge, blocking, integration, and regression evaluations.
7. Run structural validation and fresh-context behavioral tests before installation or distribution.

## Versioning

Use semantic versions in `skill-versions.json`. Treat changes to human gates, status vocabularies, required inputs, output contracts, selected-topic preservation, language, or public/internal boundaries as major contract changes. Use Git history and centralized release notes when the project is moved into a repository.
