# Discover Content Opportunities — Contracts

## Contents

- 32. Output contract
- 33. Human-readable output

## 32. Output contract

Return a structured object with the following top-level fields.

```yaml
status: AWAITING_USER_SELECTION | TOPIC_SELECTED | NO_SUITABLE_SHORTLIST | BLOCKED
execution:
  current_datetime:
  phase: DISCOVERY | SELECTION_CONFIRMATION
  target_publication_window:
  skill_version: read_from_bundle_manifest
editorial_constraints:
  categories:
  frequency_rules:
  language:
  target_market:
candidate_summary:
  total_detected:
  total_clustered:
  eligible:
  rejected:
ranked_opportunities:
  - opportunity_id:
    topic:
    content_type:
    edition:
    proposed_angle:
    priority:
    score:
    materiality_score:
    audience_value_score:
    differentiation_score:
    evidence_score:
    timing_score:
    topical_authority_score:
    evidence_risk:
    duplication_risk:
    why_now:
    rejection_reason:
selected_opportunity: null | object
selection_gate:
  human_selection_required: true
  selection_received: true | false
  selected_opportunity_id: string | null
  drafting_authorized: true | false
selected_opportunity_object:
  opportunity_id:
  working_title:
  locked_topic:
  locked_angle:
  content_type:
  edition:
  priority:
  publication_deadline:
  primary_audience:
  primary_search_intent:
  reader_value:
  macroalloc_edge:
  macroalloc_thesis:
  transmission_channels:
  key_questions:
  alternative_interpretations:
  invalidation_conditions:
  source_plan:
  data_plan:
  uncertainties:
  disputed_points:
  prohibited_claims:
  recheck_items:
  related_content:
  internal_link_opportunities:
  expected_word_range:
  suggested_structure:
  visual_opportunities:
rejected_candidates:
  - candidate_id:
    reason:
    hard_gate_failed:
    score:
next_action:
```

## 33. Human-readable output

Alongside the structured object, provide a concise editorial report containing:

1. A numbered shortlist of 3 to 5 qualified subjects.
2. Why each subject matters now.
3. Proposed MacroAlloc angle for each subject.
4. Category, edition and score for each subject.
5. Main evidence plan and uncertainty for each subject.
6. The exact status `AWAITING_USER_SELECTION`.
7. A concise request for the user to choose one number or exact title.

Do not draft the article in this report.

When the status is `AWAITING_USER_SELECTION`, no content may appear after the selection request and no downstream skill may be invoked.
