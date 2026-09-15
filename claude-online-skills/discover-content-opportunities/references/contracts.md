# Discover Content Opportunities — Contracts

## Contents

- 1. Output contract
- 2. Human-readable output

## Version field resolution

Populate any field marked `read_from_bundle_manifest` from this deployment's `skill-versions.json` bundle manifest (the `version` entry for `discover-content-opportunities`). If no bundle manifest is reachable, for example when this skill runs as a standalone package, state the version declared in this skill's own package metadata instead. If neither is available, use `UNKNOWN` rather than inventing a version number.

## 1. Output contract

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
regions:
  - region: US | EUROPE | ASIA
    region_status: SHORTLISTED | NO_SUITABLE_SHORTLIST
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
        discoverability_score:
        cross_channel_score:
        production_feasibility_score:
        evidence_risk:
        duplication_risk:
        why_now:
    rejected_candidates:
      - candidate_id:
        reason:
        hard_gate_failed:
        score:
selection_gate:
  human_selection_required: true
  regions_with_shortlist: [US, EUROPE, ASIA]
  regions_selected: []
  drafting_authorized: true | false
selected_opportunities:
  - region: US | EUROPE | ASIA
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
next_action:
```

`status: NO_SUITABLE_SHORTLIST` at the top level applies only when **every** region fails to produce a qualified shortlist. A single region failing while others succeed is recorded as that region's own `region_status: NO_SUITABLE_SHORTLIST` inside `regions`, while the top-level status remains `AWAITING_USER_SELECTION` for the regions that do have a shortlist.

## 2. Human-readable output

Alongside the structured object, provide a concise editorial report containing, **grouped under three clearly labeled headings — US, Europe, Asia**:

1. A numbered shortlist of 3 to 5 qualified subjects for that region (or an explicit note that the region has no suitable shortlist today).
2. Why each subject matters now.
3. Proposed MacroAlloc angle for each subject.
4. Category, edition and score for each subject.
5. Main evidence plan and uncertainty for each subject.

Followed by:

6. The exact status `AWAITING_USER_SELECTION`.
7. A concise request for the user to choose one number or exact title **per region that has a shortlist**.

Do not draft the article in this report.

When the status is `AWAITING_USER_SELECTION`, no content may appear after the selection request and no downstream skill may be invoked.
