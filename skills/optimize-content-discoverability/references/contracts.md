# Optimize Content Discoverability — Contracts

## Contents

- 1. Headline package
- 2. Metadata package
- 3. Normalized output contract
- 4. Human-readable output order
- 5. Compatibility and migration

## Version field resolution

Populate any field marked `read_from_bundle_manifest` from this deployment's `skill-versions.json` bundle manifest (the `version` entry for `optimize-content-discoverability`). If no bundle manifest is reachable, for example when this skill runs as a standalone package, state the version declared in this skill's own package metadata instead. If neither is available, use `UNKNOWN` rather than inventing a version number. Apply the same resolution to the "contract version declared compatible by the bundle manifest" check in Section 5.

## 1. Headline package

Generate:

- one recommended H1;
- two to four alternatives;
- one meta title;
- one Open Graph title;
- one social headline when justified.

Rules:

- state the subject clearly;
- preserve certainty and time frame;
- prefer descriptive titles over vague curiosity;
- avoid punctuation gimmicks;
- avoid unverified superlatives;
- avoid promises such as `everything you need to know` unless the page is genuinely comprehensive;
- do not force a keyword to the front when unnatural;
- record character count but do not treat a rigid character limit as a hard ranking rule.

For each candidate provide:

- title;
- intended channel;
- intent alignment;
- main strength;
- material risk.

## 2. Metadata package

Produce:

- meta title;
- meta description;
- URL slug;
- canonical URL recommendation;
- Open Graph title;
- Open Graph description;
- social-card recommendation;
- article excerpt;
- primary keyword;
- secondary keywords;
- entities;
- tags;
- category;
- estimated word count;
- estimated reading time;
- publication date field;
- modified-date field policy;
- author field requirement;
- robots recommendation only when context justifies it.

### 2.1 Slug rules

- concise;
- lowercase;
- hyphenated;
- stable over time;
- no unnecessary stop words;
- no date unless the date is essential to the content identity;
- no keyword stuffing;
- preserve existing slug when changing it would create migration risk, unless a redirect plan is approved.

### 2.2 Canonical rules

- do not invent the final production URL;
- use `CANONICAL_PENDING` when the domain or path is unknown;
- identify duplicate or syndicated-content risks;
- do not recommend cross-domain canonicalization without an explicit publishing arrangement.

## 3. Normalized output contract

Return a structured `DiscoverabilityPackage` containing the following fields.

```yaml
skill:
  name: optimize-content-discoverability
  version: read_from_bundle_manifest
status: DISCOVERABILITY_READY_FOR_REVIEW | DISCOVERABILITY_REVISION_REQUIRED | CONSOLIDATION_DECISION_REQUIRED | BLOCKED | EDITORIAL_DECISION_REQUIRED
lineage:
  upstream_status: APPROVED_FOR_SEO
  shortlist_id:
  selected_topic_id:
  selection_evidence:
content_identity:
  content_type:
  edition:
  locked_topic:
  locked_angle:
  target_audience:
  target_market:
  language:
  publication_window:
upstream_verification:
  status:
  verifier_version:
  unresolved_issues: []
substance_preservation:
  pass:
  changes:
    - classification:
      location:
      description:
      reverification_required:
search_strategy:
  primary_intent:
  secondary_intents: []
  primary_keyword:
  secondary_keywords: []
  long_tail_queries: []
  questions_covered: []
  questions_not_covered: []
headline_package:
  recommended_h1:
  alternatives: []
  meta_title:
  open_graph_title:
metadata_package:
  meta_description:
  slug:
  canonical:
  open_graph_description:
  excerpt:
  category:
  tags: []
  word_count:
  estimated_reading_time:
entity_package:
  canonical_entities: []
  aliases: []
  ambiguities: []
semantic_package:
  concept_map: []
  weak_connections: []
  research_required_gaps: []
answer_extraction:
  featured_snippet_candidates: []
  ai_answer_blocks: []
  faq_candidates: []
eeat_and_trust:
  supported_signals: []
  implementation_recommendations: []
  prohibited_or_unsupported_signals: []
internal_linking:
  assessed:
  recommendations: []
competitor_intelligence:
  assessed:
  evidence_timestamp:
  competitors: []
  gaps: []
  differentiation: []
topical_authority:
  assessed:
  primary_pillar:
  primary_cluster:
  related_clusters: []
  missing_content: []
content_memory:
  assessed:
  overlap_classification:
  closest_pages: []
  recommended_action:
visual_package:
  hero_image:
    concept:
    filename:
    alt_text:
    caption:
    aspect_ratio:
    credit_requirement:
  additional_visuals: []
schema_package:
  recommended_types: []
  required_properties: []
  missing_properties: []
content_lifecycle:
  freshness_class:
  decay_risk:
  review_timing:
  update_triggers: []
  refresh_checklist: []
distribution_package:
  assessed:
  primary_channel:
  secondary_channels: []
  assets: []
scores:
  assessed_dimensions: []
  not_assessed_dimensions: []
  overall:
  dimensions: {}
quality_gates:
  - gate:
    pass:
    notes:
issues: []
optimized_article:
  markdown:
handoff:
  next_actor: review-article | HUMAN_EDITORIAL_DECISION | verify-financial-article | STOP_WORKFLOW
  required_state: DISCOVERABILITY_READY_FOR_REVIEW | CONSOLIDATION_DECISION_REQUIRED | APPROVED_FOR_SEO | BLOCKED
  notes: []
```

Set `next_actor: review-article` only for `DISCOVERABILITY_READY_FOR_REVIEW`. Set `next_actor: HUMAN_EDITORIAL_DECISION` for `CONSOLIDATION_DECISION_REQUIRED`. Route substantive changes to `verify-financial-article`; use `STOP_WORKFLOW` for blocking dependencies.

## 4. Human-readable output order

In addition to the normalized object, provide the package in this order for the future MacroAlloc Article Package:

1. Optimization status.
2. Executive optimization summary.
3. Search strategy.
4. Headline and metadata package.
5. Entity and semantic package.
6. Featured-snippet, AI-answer and FAQ opportunities.
7. E-E-A-T and trust recommendations.
8. Internal-linking recommendations.
9. Competitor intelligence.
10. Topical-authority and content-memory analysis.
11. Visual package.
12. Schema recommendations.
13. Content-lifecycle plan.
14. Distribution package.
15. Scores and quality gates.
16. Issues and required decisions.
17. Final optimized article.
18. Technical handoff metadata.

## 5. Compatibility and migration

Use only the canonical skill name `optimize-content-discoverability` in active workflows and handoffs.

Compatibility requirements:

- accept verified output whose contract version is declared compatible by the bundle manifest;
- preserve the writer's `EXECUTIVE_SUMMARY`, `CAUSAL_PIVOTS`, `CONTEXT_RECONCILIATION` and source markers;
- emit a structured package suitable for `review-article` and final Word assembly;
- do not require competitor, analytics or content-memory data for basic execution;
- mark unavailable advanced modules `NOT_ASSESSED` rather than failing the entire skill.
