# Write Macro Insight — Contracts

## Contents

- 16. Output contract
- 17. Hard output gates

## 16. Output contract

The skill must return a structured object with all fields below. No required field may be omitted.

```yaml
status: DRAFT_READY_FOR_VERIFICATION | REVISION_REQUIRED | BLOCKED | EDITORIAL_DECISION_REQUIRED
skill: write-macro-insight
skill_version: read_from_bundle_manifest
lineage:
  upstream_status: EVIDENCE_DOSSIER_READY_FOR_WRITING
  shortlist_id: string
  selected_topic_id: string
  selection_evidence: string
  draft_version: string
mode: DRAFT | REVISION
revision_attempt: 0 | 1 | 2
edition: Morning | Evening
language: en-US
locked_topic: string
locked_angle: string
working_title: string
h1: string
subtitle: string
key_takeaways:
  - string
  - string
  - string
executive_summary: string
article_markdown: string
word_count: integer
sources:
  - source_id: integer
    publisher: string
    title: string
    publication_date: string | NOT_AVAILABLE
    access_timestamp: string
    url: string | NOT_AVAILABLE
    source_type: PRIMARY | SECONDARY
    reliability_note: string
internal_editorial_notes:
  macroalloc_thesis: string
  causal_pivots:
    - claim: string
      source_ids: [integer]
      counter_interpretation: string | NONE_IDENTIFIED
      verifier_priority: ENHANCED | STANDARD
  uncertainties:
    - string
  disputed_or_ambiguous_points:
    - string
  verification_flags:
    - string
  unreferenced_passages:
    - string
  source_limitations:
    - string
  context_reconciliation:
    - context_factor: string
      source_ids: [integer]
      disposition: INTEGRATED_IN_ARTICLE | EXCLUDED_AS_IMMATERIAL | EXCLUDED_TO_PRESERVE_SCOPE | EXCLUDED_DUE_TO_INSUFFICIENT_CORROBORATION | REQUIRES_VERIFIER_REVIEW
      rationale: string
  historical_comparison:
    status: USED | NOT_USED_NO_RELIABLE_BENCHMARK | NOT_RELEVANT
    note: string
  recheck_before_publication: YES | NO
  recheck_items:
    - string
  internal_link_opportunities:
    - string
  human_review_focus:
    - string
  revision_summary:
    - verifier_issue_id: string
      change_made: string
      status: RESOLVED | UNRESOLVED
  downstream_actions:
    - verify-financial-article
```

### 16.1 Executive summary purpose

The `executive_summary` is an internal 100–180 word summary for the future MacroAlloc Article Package. It must accurately summarize the article and uncertainty without introducing new facts.

It is not a substitute for the article opening and is not automatically published in the CMS.

### 16.2 Word-package responsibility

This skill does not create the final `.docx` file.

The final Word package is assembled only after:

1. `verify-financial-article` returns `APPROVED_FOR_SEO`;
2. `optimize-content-discoverability` returns a complete discoverability package;
3. the orchestrator validates all mandatory fields;
4. the Article Package generator combines the verified article, SEO package, verification report, AI review summary, sources, visual brief and technical metadata.

This separation prevents the writer from labeling its own work as verified.

## 17. Hard output gates

The skill may return `DRAFT_READY_FOR_VERIFICATION` only if all conditions are true:

- H1, subtitle, three key takeaways and article body are present;
- the article is in US English;
- the word count is within the permitted range or justified in notes;
- every factual claim is traceable to a numbered source or identified as an unreferenced passage;
- the Sources section is complete enough for independent checking;
- facts, analysis, uncertainty and scenarios are distinguishable;
- at least two transmission channels are developed;
- central causal pivots are listed;
- source-to-draft context reconciliation is complete;
- no material contextual factor from a cited source has disappeared silently;
- generic catch-all market conclusions have been removed or made mechanism-specific;
- the disclaimer is present;
- no personalized advice or publication approval language appears;
- all mandatory output fields are populated, using explicit `NOT_AVAILABLE`, `NONE_IDENTIFIED` or empty arrays where appropriate rather than silent omission.
