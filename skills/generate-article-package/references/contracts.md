# Generate Article Package — Contracts

## Contents

- 1. Metadata normalization rules
- 2. Traceability ledger
- 3. Package integrity checks
- 4. Package issue taxonomy
- 5. Export specifications
- 6. Normalized output contract
- 7. Human-readable output order
- 8. File naming convention
- 9. Package manifest
- 10. Observability fields

## 1. Metadata normalization rules

### 1.1 Dates

Store machine-readable dates in ISO 8601 format.

Display dates according to the package language and publication market.

Never change the underlying timestamp.

### 1.2 Article identifiers

Article IDs must remain stable across revisions.

Package versions may change without changing the article ID.

### 1.3 Versioning

Use semantic versioning for the package template and skills.

Use a separate article-version field for editorial revisions.

Example:

- article ID: `MA-MI-2026-00042`;
- article version: `1.3`;
- package skill version: read from the bundle's authoritative version manifest;
- package file revision: `2`.

### 1.4 Status vocabulary

Allowed terminal package statuses:

- `PACKAGE_REVISION_REQUIRED`
- `EDITORIAL_INPUT_REQUIRED`
- `DUAL_ARTIFACTS_READY_FOR_HUMAN_VALIDATION`
- `BLOCKED`

`DRAFT_DUAL_ARTIFACTS`, `PUBLICATION_PACKAGE_READY_FOR_EXPORT`, `EXPORTED`, and `ARCHIVED` may be recorded only as internal lifecycle events; they are not terminal skill outputs. This skill must never emit `PUBLISHED`.

## 2. Traceability ledger

The package must contain a normalized provenance ledger.

Minimum fields:

- `FIELD_ID`
- `PACKAGE_SECTION`
- `FIELD_NAME`
- `VALUE_VERSION`
- `SOURCE_SKILL`
- `SOURCE_SKILL_VERSION`
- `SOURCE_OBJECT`
- `SOURCE_FIELD`
- `APPROVAL_STATE`
- `TRANSFORMATION_APPLIED`
- `NOTES`

Examples of allowed transformations:

- `NONE`
- `FORMAT_ONLY`
- `MARKDOWN_TO_WORD_STYLE`
- `DATE_DISPLAY_FORMAT`
- `TABLE_NORMALIZATION`
- `LINK_NORMALIZATION`
- `SECTION_REORDERING`

Any transformation affecting meaning is forbidden.

## 3. Package integrity checks

### 3.1 Article immutability check

Compare the packaged public article against the approved article.

Allowed differences:

- Word style markup;
- whitespace normalization;
- deterministic Markdown rendering;
- hyperlink styling;
- table rendering;
- removal of non-public internal markers explicitly listed in the provenance ledger.

Any other difference fails the check.

### 3.2 Version consistency check

All upstream objects must refer to the same article ID and compatible article version.

### 3.3 Status consistency check

The package status must reflect all upstream states.

### 3.4 Metadata completeness check

All mandatory publication and SEO fields must be complete or explicitly marked for human input.

### 3.5 Source integrity check

All source IDs referenced in claims must exist in the source register.

### 3.6 Claim integrity check

All material verified claims must retain their resolution status.

### 3.7 Review integrity check

No unresolved mandatory revision may remain when the decision is `PUBLISH`.

### 3.8 Placeholder check

Detect and block unresolved placeholders such as:

- `[TBD]`
- `[INSERT]`
- `TODO`
- `XX`
- dummy URLs;
- template instructions;
- empty required table cells.

### 3.9 Public/internal separation check

Fail if any internal score, workflow note, prompt, claim ledger, stage result, run ID, skill version, revision history, provenance field, diagnostic, analytics placeholder or non-public rationale appears anywhere in the Publication Package.

Confirm that the Workflow Report is marked `INTERNAL — NOT FOR PUBLICATION` on its cover and header or footer.

### 3.10 Hyperlink check

Verify syntax and presence of supplied links. Do not claim live HTTP validation unless an appropriate tool performed it.

### 3.11 Export check

Confirm that both generated DOCX files open successfully and contain only their expected sections when the execution environment supports validation. A successful single-file export is incomplete and must return `PACKAGE_REVISION_REQUIRED`.

## 4. Package issue taxonomy

Use the following issue categories:

- `PKG-STATE` — invalid workflow state;
- `PKG-VERSION` — article or package version conflict;
- `PKG-CONTENT` — missing or inconsistent content;
- `PKG-METADATA` — metadata defect;
- `PKG-SOURCE` — source-register defect;
- `PKG-CLAIM` — claim-ledger defect;
- `PKG-REVIEW` — review-status conflict;
- `PKG-FORMAT` — formatting defect;
- `PKG-TRACE` — provenance defect;
- `PKG-LINK` — hyperlink defect;
- `PKG-VISUAL` — visual-package defect;
- `PKG-EXPORT` — export failure;
- `PKG-PLACEHOLDER` — unresolved placeholder;
- `PKG-POLICY` — publication-policy input required.

Issue severities:

- `CRITICAL`
- `MAJOR`
- `MODERATE`
- `MINOR`
- `INFORMATIONAL`

Each issue must include:

- issue ID;
- category;
- severity;
- section;
- exact field or location;
- description;
- source objects involved;
- required action;
- route owner;
- acceptance test;
- resolution status.

## 5. Export specifications

### 5.1 DOCX

DOCX is the required human-review format.

Generate two files:

- `PublicationPackageDOCX` — lightweight, public-facing article and SEO handoff;
- `WorkflowReportDOCX` — internal process and quality report.

Each file must have professional MacroAlloc formatting appropriate to its purpose. The publication document prioritizes uninterrupted reading and simple CMS handoff. The report prioritizes traceability and analysis.

### 5.2 Markdown

Markdown export should:

- preserve section hierarchy;
- preserve tables where practical;
- preserve links;
- clearly separate public and internal sections;
- avoid Word-specific field instructions except as comments.

### 5.3 HTML

HTML export should:

- use semantic headings;
- separate public and internal sections with classes or containers;
- preserve metadata in a structured block;
- avoid embedding unsupported scripts;
- avoid claiming CMS compatibility without testing.

### 5.4 JSON

JSON is the canonical machine-readable package.

It should preserve every field, provenance entry, issue and state without formatting loss.

## 6. Normalized output contract

Return a machine-readable object with the following structure. The top-level status is authoritative and both nested documents must match it.

```yaml
status: DUAL_ARTIFACTS_READY_FOR_HUMAN_VALIDATION | PACKAGE_REVISION_REQUIRED | EDITORIAL_INPUT_REQUIRED | BLOCKED
PublicationPackage:
  identity:
    article_id:
    region: US | EUROPE | ASIA
    content_type:
    edition:
    language:
    article_version:
    generated_at:
    status:
  article:
    headline:
    subtitle:
    byline:
    publication_date:
    key_takeaways: []
    article_markdown:
    faq: []
    public_sources: []
    disclaimer:
  seo_for_publication:
    final_h1:
    meta_title:
    meta_description:
    url_slug:
    canonical_url:
    primary_keyword:
    secondary_keywords: []
    search_intent:
    target_audience:
    category:
    tags: []
    open_graph:
      title:
      description:
    internal_links: []
    featured_answer:
    schema_recommendations: []
  publication_asset_details:
    filename:
    alt_text:
    caption:
    aspect_ratio:
    rights_note:
  validation:
    article_hash:
    internal_leakage_check:
    structural_check:
    visual_render_check:
  export:
    filename:
    checksum:

WorkflowReport:
  package_identity:
    article_id:
    workflow_run_id:
    region: US | EUROPE | ASIA
    content_type:
    edition:
    language:
    target_market:
    article_version:
    package_version:
    generated_at:
    status:
    human_approval_required:
  selection_lineage:
    upstream_status: TOPIC_SELECTED
    region: US | EUROPE | ASIA
    shortlist_id:
    selected_topic_id:
    selection_evidence:
  document_control:
    owner:
    author_byline:
    publication_category:
    publication_tags: []
    intended_channels: []
    canonical_url:
    classification:
    version_history: []
    skill_versions: {}
  publication_package_reference:
    filename:
    article_hash:
    package_checksum:
  publication_readiness:
    verification_status:
    discoverability_status:
    editorial_decision:
    global_editorial_score:
    factual_score:
    discoverability_score:
    mandatory_human_actions: []
    accepted_limitations: []
  seo_package:
    meta_title:
    meta_description:
    url_slug:
    canonical_url:
    primary_keyword:
    secondary_keywords: []
    search_intent:
    target_audience:
    open_graph:
      title:
      description:
    internal_links: []
    featured_snippets: []
    schema_recommendations: []
    lifecycle:
      freshness_class:
      review_timing:
      update_triggers: []
  visual_package:
    hero_image:
      concept:
      filename:
      alt_text:
      caption:
      aspect_ratio:
      credit_requirement:
      generation_prompt:
    supporting_visuals: []
  source_register: []
  claim_ledger: []
  causal_pivot_review: []
  context_reconciliation: []
  verification_report:
  editorial_review:
  ai_editorial_review_summary:
  distribution_package:
  analytics_lifecycle:
    publication_date:
    cms_id:
    canonical_url:
    indexing_date:
    metrics:
      impressions:
      clicks:
      ctr:
      average_position:
      reading_time:
      engagement:
      conversions:
      backlinks:
    review_dates:
      j_plus_1:
      j_plus_7:
      j_plus_30:
      next_refresh:
    post_publication_defects: []
  provenance_ledger: []
  package_issues: []
  quality_gates: []
  export_manifest:
    requested_formats: []
    generated_files: []
    validation_results: []
  handoff:
    next_step:
    required_state:
    notes: []
```

## 7. Human-readable output order

Return a concise status and manifest, then link the two documents.

Publication Package order:

1. publication header;
2. complete approved article;
3. public sources and disclaimer;
4. `SEO FOR PUBLICATION`;
5. optional publication asset details.

Workflow Report order:

1. internal cover and document control;
2. workflow summary and skill versions;
3. shortlist, rejected candidates and human-selection evidence;
4. locked brief, evidence plan and source register;
5. claim ledger and financial verification;
6. discoverability rationale and editorial review;
7. revision, issue and limitation registers;
8. formatting, accessibility and render QA;
9. lifecycle, provenance, manifest and next human action.

## 8. File naming convention

Use:

- `MacroAlloc_<content-type>_<region>_<YYYY-MM-DD>_<short-slug>_Publication_<article-version>.docx`
- `MacroAlloc_<content-type>_<region>_<YYYY-MM-DD>_<short-slug>_Workflow-Report_<report-version>.docx`

`<region>` is `US`, `Europe`, or `Asia`. It is mandatory whenever the orchestrator's run covers more than one region, so that two regions' files for the same content type and date are never confused with each other.

Examples:

- `MacroAlloc_Evening-Macro-Insight_US_2026-08-03_fed-hawkish-dissents_Publication_v1.0.docx`
- `MacroAlloc_Evening-Macro-Insight_US_2026-08-03_fed-hawkish-dissents_Workflow-Report_v1.0.docx`
- `MacroAlloc_Morning-Macro-Insight_Europe_2026-08-06_ecb-rate-path_Publication_v1.0.docx`

For the skill distribution package, use:

`MacroAlloc_generate-article-package_<bundle-version>.zip`

Avoid characters that create cross-platform file-system problems.

## 9. Package manifest

Every export manifest must contain one entry for each document, including:

- file name;
- format;
- file size when available;
- checksum when available;
- generated timestamp;
- article ID;
- article version;
- package version;
- validation result;
- intended use;
- public or internal classification;
- cross-reference to the paired document;
- article hash shared by both documents.

## 10. Observability fields

The workflow should log:

- execution timestamp;
- package skill version;
- template version;
- article ID and version;
- upstream skill versions;
- assembly duration;
- export duration;
- requested and generated formats;
- package issue count by severity;
- quality-gate results;
- article-integrity hash result;
- human-input requests;
- export validation results;
- file sizes;
- downstream publication result when later available.
