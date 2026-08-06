# Verify Financial Article — Contracts

## Contents

- 1. Output contract
- 2. Compatibility with the MacroAlloc Article Package

## Version field resolution

Populate any field marked `read_from_bundle_manifest` from this deployment's `skill-versions.json` bundle manifest (the `version` entry for `verify-financial-article`). If no bundle manifest is reachable, for example when this skill runs as a standalone package, state the version declared in this skill's own package metadata instead. If neither is available, use `UNKNOWN` rather than inventing a version number.

## 1. Output contract

Return a structured object containing every field below.

```yaml
status: APPROVED_FOR_SEO | REVISION_REQUIRED | BLOCKED | EDITORIAL_DECISION_REQUIRED
skill: verify-financial-article
skill_version: read_from_bundle_manifest
lineage:
  upstream_status: DRAFT_READY_FOR_VERIFICATION
  region: US | EUROPE | ASIA
  shortlist_id: string
  selected_topic_id: string
  selection_evidence: string
  draft_version: string
edition: Morning | Evening
language: en-US
locked_topic: string
locked_angle: string
revision_attempt: 0 | 1 | 2
verification_timestamp: string
article_identity:
  h1: string
  working_title: string
  word_count: integer
scores:
  factual_accuracy_score: integer
  source_quality_score: integer
  macro_reasoning_score: integer
  context_completeness_score: integer
  editorial_integrity_score: integer
  compliance_score: integer
  global_verification_score: integer
hard_gates:
  source_traceability_complete: true | false
  central_claims_supported: true | false
  causal_pivots_acceptable: true | false
  context_reconciliation_complete: true | false
  internal_consistency_passed: true | false
  compliance_passed: true | false
  disclaimer_present: true | false
  freshness_plan_defined: true | false
claim_ledger:
  - claim_id: string
    location: string
    claim_text: string
    claim_type: FACT | ATTRIBUTED_CLAIM | CONSENSUS_OR_EXPECTATION | MACROALLOC_INTERPRETATION | CAUSAL_INFERENCE | SCENARIO_OR_FORECAST | COMPLIANCE_SENSITIVE
    source_ids: [integer]
    verification_status: VERIFIED | VERIFIED_WITH_QUALIFICATION | DISPUTED_BUT_FAIRLY_PRESENTED | UNSUPPORTED | INCORRECT | NOT_VERIFIABLE_FROM_INPUTS
    confidence: HIGH | MEDIUM | LOW
    verifier_note: string
causal_pivot_review:
  - pivot_id: string
    pivot_claim: string
    source_ids: [integer]
    premises_verified: true | false
    logical_links:
      - link: string
        status: SUPPORTED | SUPPORTED_WITH_QUALIFICATION | DISPUTED | UNSUPPORTED
        note: string
    counter_interpretation: string | NONE_IDENTIFIED
    classification: SUPPORTED | SUPPORTED_WITH_QUALIFICATION | DISPUTED_BUT_FAIRLY_PRESENTED | INSUFFICIENTLY_SUPPORTED | MISLEADING_OR_OVERSTATED
    required_action: string | NONE
context_audit:
  - context_factor: string
    source_ids: [integer]
    writer_disposition: string
    verifier_status: CONFIRMED | DISPOSITION_REJECTED | SILENT_CONTEXT_LOSS | REQUIRES_HUMAN_REVIEW
    note: string
issues:
  - issue_id: string
    issue_type: string
    severity: CRITICAL | MAJOR | MODERATE | MINOR
    location: string
    passage: string
    explanation: string
    source_ids: [integer]
    required_correction: string
    permitted_scope: string
    acceptance_test: string
alternative_interpretations:
  - interpretation: string
    source_ids: [integer]
    materiality: HIGH | MEDIUM | LOW
    treatment_in_article: ADEQUATE | INADEQUATE | NOT_REQUIRED
    note: string
recheck_before_publication:
  required: YES | NO
  items:
    - item: string
      reason: string
      deadline_or_trigger: string
      blocking_if_unresolved: true | false
ai_review_summary:
  strengths:
    - string
  residual_risks:
    - string
  factual_confidence: HIGH | MEDIUM | LOW
  macro_reasoning_confidence: HIGH | MEDIUM | LOW
  context_completeness_confidence: HIGH | MEDIUM | LOW
  compliance_confidence: HIGH | MEDIUM | LOW
  human_review_focus:
    - string
  workflow_decision: APPROVED_FOR_SEO | REVISION_REQUIRED | BLOCKED | EDITORIAL_DECISION_REQUIRED
revision_instructions:
  - issue_id: string
    instruction: string
    acceptance_test: string
resolved_prior_issues:
  - prior_issue_id: string
    status: RESOLVED | PARTIALLY_RESOLVED | UNRESOLVED
    note: string
downstream_actions:
  - optimize-content-discoverability | write-macro-insight | HUMAN_EDITORIAL_REVIEW | STOP_WORKFLOW
```

For non-blocked decisions, use explicit empty arrays where no item exists and never silently omit a required field.

For `BLOCKED`, return this minimal object. Use `null` or `NOT_ASSESSED` for unavailable values; never fabricate scores, ledgers, or passed gates.

```yaml
BlockedReport:
  status: BLOCKED
  lineage:
    upstream_status: DRAFT_READY_FOR_VERIFICATION | null
    shortlist_id: string | null
    selected_topic_id: string | null
    selection_evidence: string | null
    draft_version: string | null
  issues:
    - issue_id: string
      missing_inputs: []
      conflicting_inputs: []
      checks_performed: []
      blocking_reason: string
  next_action: string
  next_actor: write-macro-insight | HUMAN_EDITORIAL_REVIEW | STOP_WORKFLOW
```

## 2. Compatibility with the MacroAlloc Article Package

The following verifier outputs are mandatory inputs to the future `.docx` Article Package:

- score table;
- hard-gate results;
- claim ledger or a summarized fact-check table;
- causal-pivot review;
- context audit;
- issue list;
- alternative interpretations;
- recheck requirements;
- AI Review Summary;
- verifier version and timestamp.

The package generator may format or summarize these outputs, but must not alter the verifier's decision or hide unresolved issues.
