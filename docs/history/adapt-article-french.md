# Changelog — adapt-article-french

## 1.5.0 — First logged entry (2026-09-15)

This skill had no `docs/history/` file before this entry, and was also missing from `skill-versions.json`, `workflow-contracts.json`, and `tests/validate_skills.py`'s `REQUIRED_INVARIANTS` until a separate fix registered it (see this file's Git history and `skill-versions.json`). This entry documents its current state.

### Current scope

- Produces a French-language adaptation of an already-approved MacroAlloc article, triggered only by that region's human `APPROVE` decision — never before, never independently.
- Preserves every fact, figure, entity, and locked thesis exactly; never re-verifies facts independently (that responsibility stays closed with `verify-financial-article` and `review-article`).
- Always carries a mandatory, visible disclosure that no independent human-in-language review occurred.
- Terminal statuses: `FRENCH_ADAPTATION_READY_FOR_PACKAGING`, `BLOCKED`.

This 1.5.0 tag matches the shared bundle version in `skill-versions.json`, not a skill-by-skill semantic increment.
