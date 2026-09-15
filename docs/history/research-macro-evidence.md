# Changelog — research-macro-evidence

## 1.5.0 — First logged entry (2026-09-15)

This skill had no `docs/history/` file before this entry, even though it has existed since the multi-region/architecture work that introduced it. This entry documents its current state rather than a specific change.

### Current scope

- Builds one evidence dossier per region (US, Europe, Asia) after that region's `TOPIC_SELECTED`, before any drafting begins.
- Deliberately narrower than its downstream neighbors: no scoring model, no editorial-quality engine; fact-level scoring belongs to `verify-financial-article`, editorial-quality scoring to `review-article`.
- Never invents a source, fact, quotation, data point, or retrieval result; marks unavailable or unverified planned evidence explicitly.
- Terminal statuses: `EVIDENCE_DOSSIER_READY_FOR_WRITING`, `RESEARCH_REVISION_REQUIRED`, `EDITORIAL_DECISION_REQUIRED`, `BLOCKED`.

This 1.5.0 tag matches the shared bundle version in `skill-versions.json`, not a skill-by-skill semantic increment.
