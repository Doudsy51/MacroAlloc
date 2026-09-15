# Review Article — Contracts

## Contents

- 1. Output contract
- 2. Performance and observability fields

## Version field resolution

Populate any field marked `read_from_bundle_manifest` from this deployment's `skill-versions.json` bundle manifest (the `version` entry for `review-article`). If no bundle manifest is reachable, for example when this skill runs as a standalone package, state the version declared in this skill's own package metadata instead. If neither is available, use `UNKNOWN` rather than inventing a version number.

## 1. Output contract

Return a normalized `EditorialReview` object with the following structure.

```yaml
EditorialReview:
  skill:
    name: review-article
    version: read_from_bundle_manifest
    executed_at: ISO-8601 timestamp
    workflow_version: string
  identity:
    shortlist_id: string
    region: US | EUROPE | ASIA
    selected_topic_id: string
    selection_evidence: string
    content_type: string
    edition: string | null
    locked_topic: string
    locked_angle: string
    target_audience: string
    language: string
    article_version: string
    approved_article_hash: string
  approved_article:
    markdown: string
    hash: string
  upstream_validation:
    verification_status: string
    discoverability_status: string
    unresolved_hard_gates: []
    input_contract: PASS | FAIL
  editorial_promise:
    promise_statement: string
    fulfilled: true | false
    evidence: string
  reader_question_map:
    - question_id: RQ-001
      question: string
      importance: HIGH | MEDIUM | LOW
      status: FULLY_ANSWERED | PARTIALLY_ANSWERED | NOT_ANSWERED | NOT_APPLICABLE
      answer_location: string
      required_action: string | null
  structure_map:
    - section: string
      function: CONTEXT | EVENT | MECHANISM | EVIDENCE | IMPLICATION | COUNTERPOINT | WATCHLIST | CONCLUSION | OTHER
      assessment: string
  scores:
    editorial_quality: 0-100
    reader_experience: 0-100
    educational_value: 0-100
    insight_quality: 0-100
    objectivity_and_trust: 0-100
    macroalloc_brand_fit: 0-100
    structural_metadata_alignment: 0-100
    originality_added_value: 0-100
    package_completeness: 0-100
    human_writing_score: 0-100
    global_score: 0-100
  human_voice_audit:
    human_writing_score: 0-100
    deductions:
      - criterion: string
        instances_found: integer
        points_deducted: integer
        example_location: string
    em_dash_count: integer
  qualitative_classifications:
    insight_classification: DISTINCTIVE | STRONG | ADEQUATE | LIMITED | GENERIC
    cognitive_load: LOW | CONTROLLED | HIGH_BUT_JUSTIFIED | EXCESSIVE
    ai_pattern_risk: LOW | MEDIUM | HIGH
    originality: HIGH | MEDIUM | LOW
  quality_gates:
    upstream_integrity: PASS | FAIL
    editorial_promise: PASS | FAIL
    central_thesis_coherence: PASS | FAIL
    reader_question_completeness: PASS | FAIL
    insight_threshold: PASS | FAIL
    educational_value: PASS | FAIL
    objectivity_uncertainty: PASS | FAIL
    cognitive_load: PASS | FAIL
    conclusion_quality: PASS | FAIL
    brand_consistency: PASS | FAIL
    metadata_fidelity: PASS | FAIL
    compliance_signal: PASS | FAIL
    package_completeness: PASS | FAIL
    human_voice_score: PASS | FAIL
    no_em_dash: PASS | FAIL
  strengths:
    - strength_id: STR-001
      description: string
      evidence_location: string
  issues:
    - issue_id: ED-001
      category: string
      severity: CRITICAL | MAJOR | MODERATE | MINOR | OPTIONAL
      location: string
      problem: string
      reader_impact: string
      required_action: string
      responsible_component: string
      acceptance_test: string
  revision_plan:
    priority_1: []
    priority_2: []
    priority_3: []
  regression_checks:
    - check: string
      status: PASS | FAIL | NOT_APPLICABLE
      note: string
  distinctive_value:
    statement: string
    sufficient: true | false
  publication_decision:
    decision: PUBLISH | MINOR_REVISIONS | MAJOR_REVISIONS | REJECT | EDITORIAL_DECISION_REQUIRED | BLOCKED
    workflow_state: string
    rationale: string
    next_action: string
  word_package_summary:
    editorial_status_label: string
    global_score: number
    strongest_dimension: string
    weakest_dimension: string
    key_strengths: []
    key_risks: []
    publication_readiness: string
```

`identity.approved_article_hash` and `approved_article.hash` must be identical and must match the exact `approved_article.markdown` supplied to the packager.

## 2. Performance and observability fields

The workflow should log:

- execution timestamp;
- model identifier;
- skill version;
- article version;
- token or compute cost where available;
- review duration;
- issue count by severity;
- decision;
- revision cycle count;
- final approval status;
- human override;
- override reason;
- later publication outcome;
- post-publication defects linked back to the review.

These fields support future evaluation and regression testing.
