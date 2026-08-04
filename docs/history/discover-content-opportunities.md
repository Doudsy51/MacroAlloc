# Changelog — discover-content-opportunities

## 1.1.0 — Mandatory human topic selection

### Changed

- Removed autonomous topic selection and manual bypass modes.
- Required a shortlist of 3 to 5 qualified topics in every discovery run.
- Added `NO_SUITABLE_SHORTLIST` when fewer than three candidates pass all hard gates.
- Added the blocking `AWAITING_USER_SELECTION` status and required the turn to stop before research or drafting.
- Added `TOPIC_SELECTED` only after an explicit, unambiguous user choice from the active shortlist.
- Prohibited ranking, urgency, automation requests and full-workflow prompts from being treated as human selection.
- Added regression scenarios for shortlist size, ambiguous replies and the mandatory stop.

## 1.0.0 — Initial production candidate

### Added

- Strategic opportunity-discovery gate for the MacroAlloc Content Factory.
- Support for Macro Insights, Market Analysis, ETF Research and Education.
- Candidate normalization, clustering and deduplication.
- Hard eligibility gates for editorial fit, materiality, evidence, differentiation, compliance, timing and duplication.
- Materiality, audience-demand, angle-generation and MacroAlloc differentiation engines.
- Preliminary source-feasibility and evidence-risk assessment.
- Freshness, publication-window and stale-event controls.
- Seasonality and editorial-calendar handling.
- Content-gap, content-memory and cannibalization analysis.
- Category-frequency control without forced publication.
- Transparent 100-point opportunity-scoring framework.
- Priority classification and autonomous-selection rules.
- Human shortlist and manual-topic-assessment modes.
- Structured research-brief generator.
- Breaking-news, evergreen and ETF-specific protocols.
- Explicit uncertainty, disputed-points, prohibited-claims and recheck registers.
- Structured YAML output contract and downstream handoff contract.
- Failure modes, quality gates, test scenarios and governance requirements.

### Compatibility

- Upstream: scheduled trigger, manual request, approved discovery tools, content library and editorial calendar.
- Downstream: evidence-research stage, then the relevant writing skill such as `write-macro-insight`.
- Designed for later orchestration by the MacroAlloc editorial workflow.

### Migration note

This skill replaces informal topic brainstorming with a traceable, scored and gated opportunity-selection process. It does not replace research, writing, verification, SEO optimization, editorial review, packaging or publication.
