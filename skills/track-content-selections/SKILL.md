---
name: track-content-selections
description: Maintains the append-only cross-run registry of every topic a human has explicitly selected in the MacroAlloc Content Factory (region, category, score, freshness, keywords, locked angle), and answers content-memory queries from it so discover-content-opportunities can flag near-duplicate candidates before they reach a shortlist. Use only through the orchestrator, in LOG mode right after a region's TOPIC_SELECTED and in QUERY mode before a region's discovery pass. Do not use it to decide duplication outcomes, to log an unselected candidate, or to rewrite or delete a prior entry.
---

# Track Content Selections

## Preconditions

- Log an entry only for a topic that has actually reached `TOPIC_SELECTED` for a region; never log a shortlist candidate that was not chosen.
- Treat the registry as append-only: never edit, reorder, or delete an existing row. A correction is a new row with a note, not a rewrite.
- Never invent a score, freshness class, keyword, or locked angle that the caller did not supply; a missing required field blocks the write instead of being guessed.
- Distinguish `run_mode: real` from `run_mode: test`; a query for real production content memory excludes `test` entries by default.

## Workflow

1. **LOG mode** — after a region's `TOPIC_SELECTED`, receive the selection record (see `references/contracts.md`), validate required fields, append one row to `data/content-log/selected-topics.csv`, and regenerate `data/content-log/selected-topics.xlsx` from the full CSV. Return `LOGGED` with the row's identifiers, or `BLOCKED` if a required field is missing or the registry file cannot be safely written.
2. **QUERY mode** — before a region's discovery pass, read the registry, filter by region (and, when supplied, a lookback window, content type, or keyword), exclude `run_mode: test` entries unless explicitly asked to include them, and return the matching entries sorted by most recent selection first. Return `CONTENT_MEMORY_READY` with the entries (possibly an empty list — that is a normal, truthful outcome, not an error).
3. Never resolve overlap or cannibalization itself; return the raw matching history so `discover-content-opportunities`'s own content-memory and cannibalization engine (its `references/domain-rules.md` §13) makes that judgment.

## Boundaries

- Upstream producer: `run-macroalloc-content-factory` only, calling LOG mode right after a region's `TOPIC_SELECTED` and QUERY mode before that region's `discover-content-opportunities` invocation.
- Downstream consumer: `discover-content-opportunities`, which receives QUERY mode's output as its `RECENT_CONTENT_LIBRARY` input; and the human user, who may open `data/content-log/selected-topics.xlsx` directly.
- Allowed terminal statuses: `LOGGED`, `CONTENT_MEMORY_READY`, `BLOCKED`.
- Never let a registry write failure block or delay the region's editorial pipeline; a `BLOCKED` LOG result is a warning to surface to the user, not a reason to halt research, writing, or publication for that region.
- Never treat the presence of a logged entry as a publication or approval record; it only means a human selected that topic at that moment.

## Load references

- Read [references/workflow.md](references/workflow.md) before execution for the complete LOG/QUERY stage sequence, inputs, and routing rules.
- Read [references/contracts.md](references/contracts.md) whenever validating or emitting the registry schema, statuses, file paths, or the `RECENT_CONTENT_LIBRARY` handoff shape.
- Read [references/domain-rules.md](references/domain-rules.md) for the registry's field definitions, append-only rules, and test/real separation.
- Read [references/quality-and-tests.md](references/quality-and-tests.md) before a terminal decision and when diagnosing a blocked write, a malformed registry, or a query mismatch.

## Completion

Return the authorized output, its exact status, the affected row or query result, and the next responsible actor. Do not claim a write succeeded without the script's own confirmation.
