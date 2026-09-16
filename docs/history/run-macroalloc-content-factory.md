# Changelog - run-macroalloc-content-factory

## 1.6.0 - Content-selection tracking integration (2026-09-16)

### Added

- Preflight now queries the new auxiliary skill `track-content-selections` in QUERY mode, once per region, before Stage 1, to build that region's `RECENT_CONTENT_LIBRARY` input to `discover-content-opportunities` from prior human-confirmed `TOPIC_SELECTED` entries. An unavailable or `BLOCKED` result is treated as content memory being unavailable, not as a run-blocking failure.
- Immediately after a region's `TOPIC_SELECTED` is recorded (Stage 2), the orchestrator now invokes `track-content-selections` in LOG mode for that region. A `BLOCKED` LOG result is surfaced as a warning; it never reopens the selection or delays any region's pipeline.
- Added a required `run_mode` (`real` | `test`) established during preflight and threaded into every LOG call, so pipeline-QA runs never contaminate real production content memory.

### Changed

- Preflight item 1 now confirms nine specialist skills are available (previously eight); `track-content-selections` is explicitly the one auxiliary skill whose absence does not trigger `BLOCKED`/`MISSING_SKILL`.
- Updated `references/workflow.md` (Sections 3, 4, 5) accordingly.

## 1.5.0 - Concurrent region processing (2026-09-15)

### Changed

- Regions with a confirmed topic selection now run their machine-controlled stages (research through packaging) concurrently instead of strictly in sequence (US, then Europe, then Asia).
- The human final-validation gate remains serialized: exactly one region's gate is presented at a time, in the order its package becomes ready, never two at once.
- Updated `references/workflow.md` (Sections 2, 2.1, 5, 6, 11, 12, 12.1, 15) and `references/quality-and-tests.md` accordingly; loop limits and region-isolation guarantees are unchanged.

Note: the versions between 1.2.1 and this 1.5.0 entry (multi-region support, human-voice rule, French adaptation) were shipped without a changelog entry; see Git history for that period instead. This 1.5.0 tag matches the shared bundle version in `skill-versions.json`, not a skill-by-skill semantic increment.

## 1.2.1 - Packaging-state clarity

### Changed

- Updated the required `generate-article-package` version to 1.2.1.
- Required current dual-artifact status to remain distinct from labeled historical workflow snapshots.

## 1.2.0 - Dual final deliverables

### Changed

- Replaced the combined final Article Package with a lightweight Publication Package DOCX and a separate internal Workflow Report DOCX.
- Made both files mandatory during the testing phase.
- Added file-level public/internal separation and leakage checks.
- Updated the final human-validation gate, mandatory artifacts, output contract, statuses, and acceptance criteria.
- Updated required specialist versions to the current v1.1.0 set and `generate-article-package` v1.2.0.

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
