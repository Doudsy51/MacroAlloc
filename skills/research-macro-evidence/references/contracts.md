# Research Macro Evidence — Contracts

## Contents

- Input lineage
- Output contract
- Handoff
- Blocked report

## Input lineage

```yaml
lineage:
  upstream_status: TOPIC_SELECTED
  shortlist_id:
  selected_topic_id:
  selection_evidence:
  locked_topic:
  locked_angle:
  primary_language: en-US
```

Every field is mandatory and immutable during research.

## Output contract

```yaml
status: EVIDENCE_DOSSIER_READY_FOR_WRITING | RESEARCH_REVISION_REQUIRED | EDITORIAL_DECISION_REQUIRED | BLOCKED
lineage:
  upstream_status: TOPIC_SELECTED
  shortlist_id:
  selected_topic_id:
  selection_evidence:
  locked_topic:
  locked_angle:
  primary_language: en-US
evidence_dossier:
  dossier_id:
  version:
  researched_at:
  publication_window:
  confirmed_facts: []
  attributed_claims: []
  data_series: []
  quotations: []
  causal_pivots: []
  alternative_interpretations: []
  context_factors: []
  historical_comparisons: []
  uncertainties: []
  disputed_points: []
  prohibited_claims: []
  recheck_items: []
source_register:
  - source_id: integer
    publisher: string
    title: string
    publication_date: ISO-8601 date | NOT_AVAILABLE
    access_timestamp: ISO-8601 timestamp
    url: string | NOT_AVAILABLE
    source_type: PRIMARY | SECONDARY
    jurisdiction: string | NOT_APPLICABLE
    scope: string
    reliability_note: string
    limitations: string | NONE_IDENTIFIED
    retrieved: true | false
question_coverage: []
quality_gates: []
issues: []
handoff:
  next_skill: write-macro-insight
  required_state: EVIDENCE_DOSSIER_READY_FOR_WRITING
```

## Handoff

The writer must receive the full lineage object, evidence dossier, source register, unresolved non-blocking uncertainties, and recheck items. It must not treat planned sources as retrieved sources.

## Blocked report

For `BLOCKED`, return only `status`, the available lineage fields, issue IDs, missing or conflicting inputs, checks actually performed, and the next action. Do not fabricate empty ledgers, scores, or passed gates.
