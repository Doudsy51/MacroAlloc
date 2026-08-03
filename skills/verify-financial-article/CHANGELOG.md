# Changelog — verify-financial-article

## 0.7.0 — 2026-08-02

### Added

- Full structured verification contract aligned with `write-macro-insight` 0.7.0.
- Claim-level ledger covering facts, attributed claims, expectations, interpretations, causal inferences, scenarios and compliance-sensitive claims.
- Enhanced review of central causal pivots, including premise testing, link-by-link validation and counter-interpretations.
- Mandatory source-to-draft context audit to detect silent loss of material qualifiers.
- Dedicated checks for macro-data decomposition, revisions, base effects and temporary components.
- Dedicated checks for central-bank target, measure, framework, reaction function and guidance distinctions.
- Specific market-transmission verification and restrictions on unsupported causal attribution.
- Alternative-interpretation review without forced false balance.
- Detailed issue taxonomy, four-level severity framework and testable revision instructions.
- Six-component scoring model with non-bypassable hard gates.
- Structured AI Review Summary for the future MacroAlloc Article Package.
- Freshness and pre-publication recheck protocol.
- Explicit compatibility requirements for the final Word package.
- Minimum adversarial and regression test set before production approval.

### Workflow decisions

- `APPROVED_FOR_SEO`
- `REVISION_REQUIRED`
- `BLOCKED`
- `EDITORIAL_DECISION_REQUIRED`

### Safeguards

- The verifier cannot approve publication.
- Scores cannot override failed hard gates.
- No silent rewriting or repair.
- Maximum of two automatic Writer revision attempts.

## 1.1.0 — Workflow invariant verification

- Requires `TOPIC_SELECTED` lineage and explicit human-selection evidence.
- Requires US English for the primary article.
- Blocks verification when the topic or angle drifts from the human-selected brief.
