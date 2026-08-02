# Changelog — run-macroalloc-content-factory

## [1.1.0] — 2026-08-02

### Changed

- Required `discover-content-opportunities` 1.1.0 and `write-macro-insight` 1.1.0.
- Removed all automatic topic-selection paths.
- Required a separate-turn stop at `AWAITING_USER_SELECTION` after presenting 3 to 5 qualified topics.
- Required explicit user selection from the preserved shortlist before `TOPIC_SELECTED` and writer invocation.
- Made US English mandatory for the primary article and all primary downstream artifacts.
- Added acceptance criteria covering shortlist size, the human gate and language preservation.

## [1.0.0] — 2026-08-02

### Added

- Complete orchestrator for the MacroAlloc Content Factory.
- Integration contract for six specialist skills.
- Human topic-selection gate.
- Mandatory factual verification before discoverability optimization.
- Final editorial review gate.
- DOCX Article Package generation.
- Revision-routing matrix.
- Hard loop limits and escalation policy.
- Execution-state model and traceability requirements.
- Mandatory final human approval before publication.
- Replacement path for the legacy `run-macro-insight-pipeline` skill.

### Compatibility

Required skills:

- `discover-content-opportunities` 1.0.0
- `write-macro-insight` 0.7.0
- `verify-financial-article` 0.7.0
- `optimize-content-discoverability` 1.0.0
- `review-article` 1.0.0
- `generate-article-package` 1.0.0
