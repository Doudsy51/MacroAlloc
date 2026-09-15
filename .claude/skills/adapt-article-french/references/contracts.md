# Adapt Article French — Contracts

## Contents

- Version field resolution
- Output contract
- Blocked report

## Version field resolution

Populate any field marked `read_from_bundle_manifest` from this deployment's `skill-versions.json` bundle manifest (the `version` entry for `adapt-article-french`). If no bundle manifest is reachable, for example when this skill runs as a standalone package, state the version declared in this skill's own package metadata instead. If neither is available, use `UNKNOWN` rather than inventing a version number.

## Output contract

```yaml
status: FRENCH_ADAPTATION_READY_FOR_PACKAGING | BLOCKED
skill: adapt-article-french
skill_version: read_from_bundle_manifest
lineage:
  region: US | EUROPE | ASIA
  upstream_status: APPROVE
  approved_article_hash: string
  locked_topic: string
  locked_angle: string
content_type: string
edition: Morning | Evening
source_language: en-US
target_language: fr-FR
french_article:
  h1_fr: string
  subtitle_fr: string
  key_takeaways_fr:
    - string
    - string
    - string
  article_markdown_fr: string
  disclaimer_fr: string
french_seo:
  meta_title_fr: string
  meta_description_fr: string
  slug_candidate_fr: string
  primary_keyword_fr: string
  keyword_choice_notes:
    - string
fidelity_audit:
  - claim_id: string
    english_source_excerpt: string
    french_rendering: string
    claim_type: NUMBER | DATE | ENTITY | CAUSAL_CLAIM | HEDGE_STRENGTH
    match: EXACT | CORRECTED_TO_MATCH
    note: string
disclosure:
  independent_human_language_review: false
  statement: "This French adaptation was produced automatically after human approval of the English package. It has not received a separate, independent human review in French. Treat it as a secondary adaptation of already-approved content, not as an independently vetted publication."
issues: []
handoff:
  next_skill: generate-article-package
  next_mode: french_render
  required_state: FRENCH_ADAPTATION_READY_FOR_PACKAGING
```

The `disclosure` block is mandatory and must be passed through unchanged by every downstream consumer, including into the French DOCX file itself (see generate-article-package references/domain-rules.md, French-render mode).

## Blocked report

For `BLOCKED`, return only `status`, the available lineage fields, the specific missing input or unresolved drift, and the next action. Do not fabricate an empty fidelity audit or a false "no drift found" result.

```yaml
status: BLOCKED
lineage:
  region: string | null
  upstream_status: string | null
  approved_article_hash: string | null
issue:
  reason: string
  unresolved_drift: string | null
next_action: string
next_actor: run-macroalloc-content-factory | HUMAN_EDITORIAL_REVIEW
```
