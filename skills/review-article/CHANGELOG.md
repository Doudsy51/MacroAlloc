# Changelog — review-article

All notable changes to this skill are documented here.

## [1.0.0] — 2026-08-02

### Added

- Initial production-grade version of the MacroAlloc final editorial review skill.
- Explicit workflow interface with `verify-financial-article` and `optimize-content-discoverability`.
- Final editorial decisions: `PUBLISH`, `MINOR_REVISIONS`, `MAJOR_REVISIONS`, `REJECT`, `EDITORIAL_DECISION_REQUIRED`, and `BLOCKED`.
- Independent editorial-promise test linking title, metadata, opening, body and conclusion.
- Reader Question Map with answer-completeness classification.
- Macro-structure, paragraph-flow and sentence-clarity review procedures.
- Editorial Quality, Reader Experience, Educational Value, Insight Quality, Narrative Flow, Cognitive Load, Objectivity, Brand Consistency and Publication Decision engines.
- MacroAlloc-specific brand and tone requirements.
- Generic conclusion, empty commentary and AI-pattern detection.
- Originality and distinctive-value assessment.
- Complete issue taxonomy, severity model and upstream routing rules.
- Weighted scoring model with mandatory hard gates.
- Content-type-specific review standards for Macro Insights, Market Analysis, ETF Research and Education Articles.
- Two-cycle automated editorial revision limit and regression checks.
- Normalized `EditorialReview` YAML output contract.
- Page-ready `AI Editorial Review Summary` for the final MacroAlloc Article Package.
- Observability and evaluation-dataset recommendations.

### Preserved

- Separation of responsibilities between writing, factual verification, discoverability optimization, editorial review, publication and Word assembly.
- Human validation before publication.
- No silent repair of material defects.
- No personalized investment advice or performance promises.

### Compatibility

Designed for use after:

- `write-macro-insight` v0.7.0 or later;
- `verify-financial-article` v0.7.0 or later;
- `optimize-content-discoverability` v1.0.0 or later.

Expected downstream consumer:

- MacroAlloc Article Package generation workflow.

## 1.1.0 — Workflow invariant preservation

- Requires `TOPIC_SELECTED` lineage and explicit human-selection evidence.
- Requires US English for the primary article and metadata.
- Blocks topic drift, reselection and translation during review.
