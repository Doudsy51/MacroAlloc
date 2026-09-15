# Changelog — write-macro-insight

## 1.5.0 — Human-sounding prose rule and region-aware lineage (documented 2026-09-15, previously unlogged)

### Added

- Human-sounding prose rules (Section 2.4): vary sentence rhythm, avoid mechanical transitions and reflexive rule-of-three framing, hedge only where evidence is genuinely uncertain, and a zero-tolerance em-dash rule at the writer level (review-article scores compliance independently; this skill never scores its own draft).
- Explicit boundary that French or other-language adaptation is a future secondary request recorded but never produced by this skill.
- `region: US | EUROPE | ASIA` in the lineage contract.

### Fixed

- `references/domain-rules.md`: removed a "Version notes" section that duplicated `docs/history/write-macro-insight.md` near-verbatim, against `docs/architecture.md`'s "runtime instructions must not duplicate" rule; replaced with a pointer to this file.

This entry documents behavior already present in the skill's current files; it was not logged when originally shipped.

## 1.1.0 — 2026-08-02

### Changed

- Requires upstream status `TOPIC_SELECTED`.
- Requires explicit user-selection evidence tied to the preserved shortlist.
- Blocks drafting while the workflow is `AWAITING_USER_SELECTION` or the selection is ambiguous.
- Makes US English immutable for the primary article.
- Defers French and other-language adaptations to a separate downstream process.

## 0.7.0 — 2026-08-02

Refactored from the validated Macro Insights workflow and the post-audit improvements.

### Added

- Executive summary field for the final Article Package.
- Complete structured output contract.
- Source-to-draft context reconciliation.
- Central causal-pivot register.
- Enhanced rules for ambiguous policymaker statements.
- Macro-data decomposition control.
- Conditional historical-comparison rule.
- Generic conclusion detection.
- Word-package handoff boundaries and hard gates.

### Preserved

- Human-selected topic and angle.
- Morning/Evening lock.
- US English production.
- 700–1,000 word standard range, with controlled extensions.
- Fact/uncertainty/interpretation/scenario separation.
- Numbered source markers and source list.
- Independent verification before SEO.
- Maximum of two revisions.
- No publication status and no automated publication.
