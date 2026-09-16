# Changelog — track-content-selections

## 1.6.0 — Initial production candidate (2026-09-16)

### Added

- New auxiliary skill maintaining an append-only, Git-tracked registry of every human-confirmed `TOPIC_SELECTED` selection across all Content Factory runs, at `data/content-log/selected-topics.csv` with a regenerated `selected-topics.xlsx` human-readable export.
- LOG mode: validates and appends one row per confirmed regional selection (region, content type, score, event date, freshness class, keywords, locked angle, `run_mode`); read-back verification before reporting `LOGGED`; `BLOCKED` on any missing/invalid required field, with nothing written.
- QUERY mode: returns a region's recent selections (default 45-day lookback, `real`-mode only unless `include_test` is set) as `CONTENT_MEMORY_READY`, feeding `discover-content-opportunities`'s `RECENT_CONTENT_LIBRARY` input via the orchestrator.
- `scripts/content_log.js`: deterministic Node CSV reader/writer and `exceljs`-based `.xlsx` exporter (`exceljs` added to `package.json`).
- Wired into `run-macroalloc-content-factory` (QUERY before Stage 1, LOG right after each region's Stage 2 `TOPIC_SELECTED`) as a non-blocking auxiliary call — a `BLOCKED` result from this skill never halts, delays, or gates a region's pipeline.

### Compatibility

- Upstream: `run-macroalloc-content-factory` only; never invoked directly by `discover-content-opportunities` or any other specialist.
- Downstream: `discover-content-opportunities` (via the orchestrator's `RECENT_CONTENT_LIBRARY` handoff), and the human user, who may open `data/content-log/selected-topics.xlsx` directly.
- Excluded from `workflow-contracts.json`'s linear stage chain, alongside `adapt-article-french`, since it is conditional/auxiliary rather than a pipeline stage with its own success hand-off.

### Migration note

This skill does not decide duplication outcomes; `discover-content-opportunities`'s existing content-memory and cannibalization engine (§13 of its `domain-rules.md`) still makes that judgment. This skill only supplies the previously-unavailable `RECENT_CONTENT_LIBRARY` data source that engine was already designed to consume.
