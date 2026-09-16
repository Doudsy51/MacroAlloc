# Track Content Selections — Workflow

## Contents

- 1. Mission
- 2. Position in the workflow
- 3. LOG mode
- 4. QUERY mode
- 5. Registry storage
- 6. Failure handling

## 1. Mission

Give the MacroAlloc Content Factory a durable, cross-run memory of which topics a human has actually selected, so `discover-content-opportunities` can be told what was already chosen this week instead of treating every run as if the content library were empty.

This skill does not discover, score, or select topics. It only records confirmed selections and answers questions about them.

## 2. Position in the workflow

Expected upstream state: `run-macroalloc-content-factory` is executing Stage 0 (before discovery) or has just recorded a region's `TOPIC_SELECTED` (Stage 2).

Possible outputs: `LOGGED`, `CONTENT_MEMORY_READY`, `BLOCKED`.

This skill is never invoked directly by `discover-content-opportunities`, `research-macro-evidence`, or any other specialist; the orchestrator is the sole caller and the sole party that threads QUERY mode's output into `discover-content-opportunities`'s `RECENT_CONTENT_LIBRARY` input.

## 3. LOG mode

Invoke immediately after a region's `TOPIC_SELECTED`, once per confirmed region per run.

Required fields (see `references/contracts.md` for the full schema): `run_id`, `job_id`, `region`, `selection_date_utc`, `opportunity_id`, `topic`, `content_type`, `score`, `event_date`, `freshness_class`, `keywords`, `run_mode`.

Optional field: `locked_angle`.

Steps:

1. Validate every required field is present and non-empty; a missing field returns `BLOCKED` and writes nothing.
2. Validate `region` is one of `US`, `EUROPE`, `ASIA`; `content_type` is one of `Macro Insights`, `Market Analysis`, `ETF Research`, `Education`; `run_mode` is `real` or `test`.
3. Append exactly one row to `data/content-log/selected-topics.csv` (create the file with its header row if it does not yet exist). Never rewrite or remove an existing row.
4. Regenerate `data/content-log/selected-topics.xlsx` from the complete, now-updated CSV.
5. Return `LOGGED` with the appended row's `run_id`, `job_id`, `region`, and `opportunity_id`.

A LOG failure (e.g., the registry file is unreadable or the disk write fails) returns `BLOCKED` with the raw error. Per the Boundaries in `SKILL.md`, this never halts the region's own editorial pipeline; the orchestrator surfaces it as a warning and continues.

## 4. QUERY mode

Invoke before a region's `discover-content-opportunities` call, once per region per run.

Inputs: `region` (required); `lookback_days` (optional, default 45 — long enough to catch a topic proposed again within the same publication cycle, short enough not to permanently exclude a recurring institutional event like the next scheduled central-bank meeting); `content_type` (optional filter); `keyword` (optional filter); `include_test` (optional, default `false`).

Steps:

1. Read the full registry; if it does not exist yet, return `CONTENT_MEMORY_READY` with an empty `entries` list — an empty registry is a normal first-run state, not an error.
2. Filter to the requested `region`, to `selection_date_utc` within `lookback_days` of the current run, and to `run_mode: real` unless `include_test` is `true`.
3. Apply `content_type` and `keyword` filters when supplied.
4. Sort matching rows by `selection_date_utc` descending.
5. Return `CONTENT_MEMORY_READY` with the matching entries (topic, content_type, event_date, freshness_class, keywords, locked_angle, score, selection_date_utc). This becomes the orchestrator's `RECENT_CONTENT_LIBRARY` input to `discover-content-opportunities`; that skill's own content-memory and cannibalization engine decides what, if anything, to do with the overlap.

## 5. Registry storage

- Source of truth: `data/content-log/selected-topics.csv`, one row per logged selection, append-only, tracked in Git.
- Human-readable view: `data/content-log/selected-topics.xlsx`, regenerated from the CSV after every LOG call; never hand-edited.
- Both files are shared, cross-skill data, not a per-skill private asset; they live at the repository root under `data/`, not under `skills/track-content-selections/`.

## 6. Failure handling

- Malformed or corrupted CSV on read: return `BLOCKED` with the parse error; never guess at the damaged row's content, and never silently drop or repair it without saying so.
- Unknown `region` or `content_type` value in a LOG request: `BLOCKED`, listing the accepted values.
- QUERY with no upstream registry file: `CONTENT_MEMORY_READY` with `entries: []`, not `BLOCKED` — a missing file only means nothing has ever been logged yet.
