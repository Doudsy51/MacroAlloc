---
name: generate-article-package
description: Produces two separate Word deliverables from an approved US-English MacroAlloc article: a lightweight Publication Package containing only the complete article and publication-ready SEO fields, and an internal Workflow Report containing process evidence, verification, review, provenance, and diagnostics. Use after final editorial approval; block non-en-US primary artifacts, missing TOPIC_SELECTED lineage, topic drift, or leakage of internal workflow material into the publication document.
metadata:
  version: 1.2.1
  status: TESTING
  owner: MacroAlloc Content Factory
  language: en-US
  output_formats:
    - DOCX
    - Markdown
    - HTML
    - JSON
  content_types:
    - Morning Macro Insight
    - Evening Macro Insight
    - Market Analysis
    - ETF Research
    - Education Article
  compatibility_aliases:
    - build-article-package
    - assemble-article-package
    - export-article-package
---

# generate-article-package

## 0. Workflow invariants

- Require traceable upstream status `TOPIC_SELECTED` and explicit user-selection evidence tied to the preserved shortlist.
- Require the primary article, metadata and package to remain in US English (`en-US`).
- Return `BLOCKED` if the topic or angle differs materially from the human-selected topic or locked brief.
- Do not translate, replace, broaden, reselect or rewrite the approved primary content during assembly.
- Place any approved secondary-language adaptation in a clearly separate optional artifact; never substitute it for the US-English primary package.

## 1. Mission

Assemble the approved output of the MacroAlloc editorial workflow into two standardized and strictly separated Word documents:

1. `PublicationPackageDOCX` — the lightweight human-review and website-publication document;
2. `WorkflowReportDOCX` — the internal process, quality and traceability report.

The skill is responsible for document assembly, information mapping, formatting instructions, metadata normalization, provenance, export readiness and package integrity.

It must not perform financial research, rewrite the article, alter verified facts, change the approved SEO strategy, re-score editorial quality, create new analysis, approve publication, publish content or invent missing information.

Both DOCX files are mandatory during the v1.2 testing phase. The publication document must preserve the exact approved public article and approved publication metadata. The workflow report must preserve the internal evidence needed to evaluate and improve the Content Factory.

Never combine the two documents. Internal workflow material must not appear anywhere in the Publication Package.

## 2. Position in the workflow

Expected upstream states:

- `DRAFT_READY_FOR_VERIFICATION` from the Writer before verification;
- `APPROVED_FOR_SEO` from `verify-financial-article`;
- `DISCOVERABILITY_READY_FOR_REVIEW` from `optimize-content-discoverability`;
- `EDITORIALLY_APPROVED` from `review-article`;
- no unresolved `CRITICAL`, `MAJOR`, `BLOCKED` or human-decision issue;
- a locked final article version;
- a complete source register;
- a complete verification report;
- a complete discoverability package;
- a complete editorial review;
- the relevant skill versions and workflow metadata.

Required downstream states:

- `DUAL_ARTIFACTS_READY_FOR_HUMAN_VALIDATION` when both documents are complete but human publication approval is still required;
- `PUBLICATION_PACKAGE_READY_FOR_EXPORT` when the Publication Package is complete and the workflow has explicitly authorized export after human approval;
- `PACKAGE_REVISION_REQUIRED` when a non-substantive packaging defect can be corrected automatically;
- `EDITORIAL_INPUT_REQUIRED` when information is missing and cannot be inferred;
- `BLOCKED` when upstream approvals or mandatory sections are missing or contradictory.

No automatic publication is allowed.

## 3. Core operating principles

### 3.1 Assembly, not authorship

The skill assembles approved components. It does not become a second Writer, Verifier, SEO optimizer or Reviewer.

It may normalize labels, dates, field order, typography and presentation. It must not change the meaning of reader-facing content.

### 3.2 Approved article is immutable

The final approved article body is a locked artifact.

The skill may:

- apply Word styles;
- convert Markdown headings into Word heading styles;
- normalize spacing and list formatting;
- preserve tables, quotations, disclaimers and source markers;
- remove internal workflow markers from the public article body only when the mapping is deterministic and recorded.

The skill must not:

- rewrite sentences;
- replace terminology;
- shorten or expand explanations;
- modify numbers, dates, units or quotations;
- add new claims;
- remove caveats;
- alter the title selected by the approved discoverability package;
- change source attribution;
- alter the disclaimer.

### 3.3 One source of truth per field

Every package field must have one authoritative upstream source.

Examples:

- final article body → `review-article` approved article;
- meta title → approved `DiscoverabilityPackage`;
- factual confidence and claim status → `VerificationReport`;
- editorial decision → `EditorialReview`;
- skill versions → workflow execution metadata;
- publication status → workflow state;
- source list → verified source register.

When two upstream outputs conflict, do not choose silently. Return `EDITORIAL_INPUT_REQUIRED` or `BLOCKED` with the exact conflict.

### 3.4 Public and internal content separation

The package contains two classes of content:

**Public publication content**

- final headline;
- subtitle or dek when approved;
- executive summary or excerpt when intended for publication;
- article body;
- reader-facing tables and callouts;
- source list when MacroAlloc publication policy requires it;
- disclaimer;
- approved author/byline information.

**Internal production content**

- SEO strategy;
- verification report;
- claim ledger;
- AI review summary;
- workflow metadata;
- skill versions;
- internal scores;
- unresolved minor limitations;
- distribution assets;
- visual prompts;
- update checklist;
- analytics placeholders.

Public and internal content must be emitted as different files. Labels, color, page breaks or section headings are not sufficient separation inside one DOCX.

### 3.5 Traceability by design

Every substantive package element must be traceable to its origin.

Traceability must identify:

- source skill;
- skill version;
- article version;
- workflow run identifier;
- execution timestamp;
- approval state;
- field-level provenance when relevant.

### 3.6 Deterministic package structure

The order and naming of sections must remain stable across articles unless the content type explicitly requires a documented variation.

Stable structure enables:

- human review;
- CMS mapping;
- regression testing;
- automatic export;
- historical comparison;
- future API integration.

## 4. Responsibilities

The skill is responsible for:

1. validating upstream states and package completeness;
2. selecting the correct package template by content type;
3. normalizing metadata;
4. mapping approved outputs into standardized sections;
5. preserving public article integrity;
6. generating two professional Word document specifications with distinct purposes;
7. creating a traceability ledger;
8. assembling SEO and publication metadata;
9. assembling visual recommendations;
10. assembling the verified source register;
11. assembling the fact-check report;
12. assembling the editorial review and AI Review Summary;
13. assembling distribution assets when supplied;
14. generating technical and workflow metadata;
15. running package-level completeness and consistency checks;
16. producing both required DOCX files and optional Markdown, HTML or JSON representations when requested;
17. returning explicit handoff states.

## 5. Non-responsibilities

This skill must not:

- discover a topic;
- conduct web research;
- verify facts independently;
- resolve disputed financial claims;
- create a new thesis;
- rewrite the approved article;
- optimize search intent;
- generate new keywords;
- make an editorial approval decision;
- override an upstream rejection;
- invent author credentials;
- invent analytics;
- invent source dates or URLs;
- create legal advice;
- create personalized investment recommendations;
- publish to a CMS;
- publish to LinkedIn, X, newsletters or other channels;
- claim that the article is live;
- mark the article finally approved without human authorization.

## 6. Mandatory inputs

The skill must receive the following normalized inputs.

### 6.1 Identity and workflow inputs

- `ARTICLE_ID`
- `WORKFLOW_RUN_ID`
- `CONTENT_TYPE`
- `EDITION` when applicable
- `LANGUAGE`
- `TARGET_MARKET`
- `ARTICLE_VERSION`
- `PACKAGE_VERSION`
- `GENERATION_TIMESTAMP`
- `WORKFLOW_STATE`
- `HUMAN_APPROVAL_REQUIRED`
- `SKILL_VERSION_REGISTER`

### 6.2 Approved public-content inputs

- `FINAL_APPROVED_HEADLINE`
- `FINAL_APPROVED_ARTICLE`
- `FINAL_EXECUTIVE_SUMMARY`
- `FINAL_DISCLAIMER`
- `AUTHOR_OR_BYLINE`
- `PUBLICATION_CATEGORY`
- `PUBLICATION_TAGS`

Optional public inputs:

- `SUBTITLE_OR_DEK`
- `KEY_TAKEAWAYS`
- `PUBLIC_FAQ`
- `PUBLIC_SOURCE_LIST`
- `PUBLIC_TABLES`
- `PUBLIC_CALLOUTS`

### 6.3 Verification inputs

- `VERIFICATION_STATUS`
- `VERIFICATION_REPORT`
- `CLAIM_REGISTER`
- `SOURCE_REGISTER`
- `CAUSAL_PIVOT_REVIEW`
- `CONTEXT_RECONCILIATION`
- `VERIFICATION_LIMITATIONS`

### 6.4 Discoverability inputs

- `DISCOVERABILITY_STATUS`
- `DISCOVERABILITY_PACKAGE`
- `META_TITLE`
- `META_DESCRIPTION`
- `URL_SLUG`
- `PRIMARY_KEYWORD`
- `SECONDARY_KEYWORDS`
- `SEARCH_INTENT`
- `INTERNAL_LINK_RECOMMENDATIONS`
- `SCHEMA_RECOMMENDATIONS`
- `VISUAL_PACKAGE`
- `CONTENT_LIFECYCLE_PLAN`

### 6.5 Editorial review inputs

- `EDITORIAL_DECISION`
- `EDITORIAL_REVIEW`
- `AI_EDITORIAL_REVIEW_SUMMARY`
- `EDITORIAL_SCORES`
- `ACCEPTED_LIMITATIONS`
- `REQUIRED_HUMAN_NOTES`

### 6.6 Optional distribution and analytics inputs

- `DISTRIBUTION_PACKAGE`
- `LINKEDIN_ASSET`
- `X_ASSET`
- `NEWSLETTER_ASSET`
- `EMAIL_SUBJECT_LINES`
- `SOCIAL_PREVIEW_TEXT`
- `ANALYTICS_PLACEHOLDERS`
- `POST_PUBLICATION_REVIEW_DATES`

## 7. Blocking conditions

Return `BLOCKED` without assembling the package when:

- `EDITORIAL_DECISION` is not `PUBLISH`;
- `VERIFICATION_STATUS` is not approved for downstream use;
- `DISCOVERABILITY_STATUS` is not ready for review or approved after review;
- the final article is missing;
- the final article version differs from the version reviewed;
- the source register is missing for a financially factual article;
- a critical or major issue remains unresolved;
- two authoritative upstream fields conflict;
- the article body contains unresolved placeholders;
- required disclaimer language is missing;
- the public article contains internal QA notes;
- the package would require inventing metadata or evidence;
- the workflow cannot identify which article version is authoritative.

Return `EDITORIAL_INPUT_REQUIRED` when:

- a non-critical field such as author, category, canonical URL or publication date requires human selection;
- a visual asset requires a rights or credit decision;
- a package section is optional but the workflow requests it without supplying content;
- the title and meta title are both valid but a human must choose between approved alternatives;
- public visibility of the source list is a policy decision not supplied by the workflow.

## 8. Dual-document architecture

Generate two independent DOCX files. Never place Workflow Report sections after the article in the Publication Package.

### 8.0A Publication Package — required order

Keep this document short and directly usable by the human editor and CMS operator:

1. publication header: MacroAlloc, content type, edition, language, final headline and optional approved dek;
2. complete approved article, including key takeaways, reader-facing tables or FAQ, disclaimer and public sources;
3. `SEO FOR PUBLICATION` appendix containing only approved CMS and discoverability fields;
4. optional `PUBLICATION ASSET DETAILS` containing approved hero filename, alt text, caption and rights note.

Do not add a cover sheet, document-control page, table of contents, executive workflow summary, readiness dashboard, scores, claim ledger, AI-review content, technical metadata, workflow identifiers, provenance, revision history, prompts, diagnostics, analytics placeholders or internal lifecycle notes.

### 8.0B Workflow Report — required order

Keep this document internal and optimized for evaluation of the Content Factory:

1. workflow identity, versions and execution status;
2. discovery shortlist and rejected-candidate summary;
3. explicit human-selection evidence and locked topic/angle;
4. research plan, verified source register and freshness checks;
5. claim ledger, causal-pivot review and verification report;
6. discoverability assessment and internal SEO rationale;
7. editorial review, issue register and revision history;
8. package validation, rendering/accessibility results and limitations;
9. provenance, hashes, cycle counts, overrides and final human action.

The Workflow Report may reference the Publication Package by filename and hash. It need not duplicate the full article unless a short immutable excerpt or article hash is required for traceability.

When embedding an upstream job record or another historical artifact, label it explicitly as a `HISTORICAL INPUT SNAPSHOT` and preserve its original version values only inside that labeled snapshot. Never present a legacy status or skill version as the current package state. The document-control page, readiness dashboard and final action section must use the current packaging contract and must not conflict with one another.

The detailed mappings below identify the owning document for each component.

### 8.1 Workflow Report cover page

Required fields:

- MacroAlloc brand mark or text logo;
- `MacroAlloc Workflow Report` label;
- final article headline;
- content type;
- edition when applicable;
- language;
- target market;
- article ID;
- article version;
- package version;
- generation date;
- workflow status;
- confidentiality or internal-use label when applicable.

Do not display internal model names or technical costs prominently on the cover page.

### 8.2 Workflow Report document control page

Include:

- document owner;
- author/byline;
- workflow run ID;
- status;
- approval state;
- human approval requirement;
- version history;
- skill-version register;
- intended publication channel;
- canonical URL placeholder or confirmed value;
- document classification.

### 8.3 Workflow Report table of contents

The Word package must include a Word-compatible automatic table of contents field or a clearly marked placeholder that updates when opened.

Use heading styles consistently so the table of contents can be refreshed automatically.

### 8.4 Workflow Report executive summary

Include the approved executive summary.

This section must be concise, factual and consistent with the article.

Do not generate a new summary during packaging.

### 8.5 Workflow Report readiness dashboard

Include a compact internal dashboard containing:

- editorial decision;
- verification status;
- discoverability status;
- global editorial score;
- factual-quality score when supplied;
- discoverability score when supplied;
- publication-readiness status;
- mandatory human actions;
- accepted limitations.

Use `NOT_ASSESSED` for unavailable scores. Never invent or average missing values.

### 8.6 Publication Package SEO appendix and Workflow Report SEO rationale

Include:

- final H1;
- meta title;
- meta description;
- URL slug;
- primary keyword;
- secondary keywords;
- search intent;
- target audience;
- category and tags;
- canonical URL or placeholder;
- Open Graph title and description when supplied;
- internal-link recommendations;
- featured-snippet opportunities;
- schema recommendations;
- content-freshness classification;
- review timing;
- cannibalization or content-memory notes when assessed.

In the Publication Package, label this section `SEO FOR PUBLICATION` and include only fields required for human review or CMS entry. Put content-memory notes, cannibalization analysis, scoring, rationale, unresolved options, review timing and lifecycle diagnostics in the Workflow Report only.

### 8.7 Publication Package approved article

Include the exact final approved article.

Required ordering:

1. headline;
2. subtitle/dek when approved;
3. byline and publication date when intended for publication;
4. executive excerpt only when publication policy requires it;
5. article body;
6. public tables and callouts;
7. public FAQ when approved;
8. public source list when applicable;
9. disclaimer.

Internal annotations must not appear in the reader-facing article.

### 8.8 Publication asset details and internal visual rationale

Include, when supplied:

- hero image concept;
- suggested filename;
- alt text;
- caption;
- aspect ratio;
- credit or rights requirement;
- supporting visual recommendations;
- chart concepts;
- infographic concepts;
- social-preview image recommendation;
- image-generation prompt when approved for internal use.

The skill must not create a visual prompt that introduces unsupported facts or depicts a misleading market relationship.

In the Publication Package, include only the approved filename, alt text, caption, aspect ratio and rights note needed for publication. Put concepts, prompts, alternatives, charts, infographics and social-preview recommendations in the Workflow Report only.

### 8.9 Workflow Report source register

The source register must be normalized into a table.

Recommended columns:

- source ID;
- publisher or institution;
- title;
- source type;
- primary or secondary classification;
- publication date;
- access date;
- URL;
- relevant claims;
- reliability notes;
- status.

Do not expose internal reliability scores publicly unless explicitly requested.

Keep the reader-facing public source list in the Publication Package when required. Keep the normalized evidence register and reliability notes in the Workflow Report only.

### 8.10 Workflow Report fact-check and claim ledger

Include:

- claim ID;
- exact or summarized claim;
- location in article;
- evidence source IDs;
- verification status;
- confidence level when supplied;
- issue severity;
- resolution;
- residual limitation.

The package must preserve causal-pivot and context-reconciliation findings.

### 8.11 Workflow Report AI editorial review summary

Include the approved AI Review Summary:

- decision;
- global score;
- editorial quality;
- reader experience;
- educational value;
- insight quality;
- objectivity and trust;
- MacroAlloc brand fit;
- publication readiness;
- principal strengths;
- principal weaknesses;
- required revisions;
- editorial rationale.

If the decision is `PUBLISH`, required revisions must be `None` or limited to optional post-package actions.

### 8.12 Workflow Report detailed editorial review

Include the structured issue register and accepted limitations.

Recommended columns:

- issue ID;
- severity;
- section or location;
- issue description;
- route owner;
- required action;
- acceptance test;
- resolution status.

### 8.13 Workflow Report distribution package

Include only approved or supplied assets.

Possible fields:

- LinkedIn post;
- X post or thread;
- newsletter excerpt;
- email subject lines;
- social-preview text;
- push-notification text;
- article excerpt;
- key takeaways;
- channel priorities;
- publication timing.

Distribution assets must be marked `INTERNAL — DISTRIBUTION ASSETS`.

### 8.14 Workflow Report analytics and lifecycle page

Create a structured placeholder for post-publication tracking.

Recommended fields:

- publication date;
- canonical URL;
- CMS ID;
- indexing date;
- impressions;
- clicks;
- CTR;
- average position;
- reading time;
- engagement;
- conversions;
- backlinks;
- J+1 review;
- J+7 review;
- J+30 review;
- next scheduled content refresh;
- observed defects;
- lessons for skill evaluation.

Do not populate unknown performance values with zeros. Use blank fields or `PENDING`.

### 8.15 Workflow Report technical metadata and provenance

Include:

- workflow run ID;
- article ID;
- article version;
- package version;
- generation timestamp;
- skill names and versions;
- model identifiers when supplied;
- revision-cycle counts;
- source-count statistics;
- issue counts by severity;
- human overrides;
- override reasons;
- file checksum or content hash when available;
- export formats generated;
- package validation result.

## 9. Content-type variations

### 9.1 Morning Macro Insight

Prioritize:

- edition label;
- time sensitivity;
- overnight or recent-event timestamp;
- concise public article presentation;
- same-day freshness and update warnings;
- day-ahead watchlist when approved.

### 9.2 Evening Macro Insight

Prioritize:

- session date;
- closing-market context;
- distinction between the event and the market interpretation;
- next-session watchlist;
- short review interval.

### 9.3 Market Analysis

Allow:

- longer executive summary;
- more detailed chart and table package;
- expanded methodology and assumptions;
- multi-asset source mapping;
- longer lifecycle and refresh plan.

### 9.4 ETF Research

Require, when applicable:

- fund name;
- ticker;
- ISIN;
- issuer;
- index name;
- share class;
- currency;
- domicile;
- replication method;
- income treatment;
- risk and methodology notes;
- clear distinction between fund, index and exposure.

Do not infer missing product data.

### 9.5 Education Article

Prioritize:

- definitions;
- learning objectives;
- prerequisite concepts;
- glossary;
- examples;
- evergreen classification;
- longer refresh interval;
- educational internal links.

## 10. Word formatting standard

The DOCX output must be professional, stable and suitable for repeated production.

### 10.1 Page setup

Default unless a MacroAlloc template overrides it:

- A4 page size;
- portrait orientation;
- professional margins;
- page numbers in the footer;
- document title or article ID in the header after the cover page;
- section breaks between major package groups;
- no orphaned headings when technically avoidable.

### 10.2 Styles

Use named Word styles rather than manual formatting.

Required styles:

- Title;
- Subtitle;
- Heading 1;
- Heading 2;
- Heading 3;
- Normal;
- Quote;
- Caption;
- Table text;
- Metadata label;
- Metadata value;
- Internal note;
- Warning;
- Status badge or equivalent;
- Disclaimer.

### 10.3 Branding

Apply the approved MacroAlloc visual identity when assets are available.

The package may use:

- MacroAlloc navy for primary headings;
- electric blue for accents;
- restrained green or violet for status and secondary information;
- neutral grey for internal metadata;
- white background for readability.

Do not invent a logo or brand asset. If no official asset is supplied, use a text-based MacroAlloc header.

### 10.4 Typography

Use a professional sans-serif font supported by the execution environment.

Prefer consistency and portability over decorative styling.

Do not embed or distribute font files.

### 10.5 Tables

Tables must:

- fit within page margins;
- repeat header rows when practical;
- use consistent header formatting;
- avoid excessive cell shading;
- preserve source IDs and statuses;
- split across pages cleanly;
- avoid tiny unreadable fonts.

### 10.6 Hyperlinks

Preserve verified URLs as clickable links.

Do not create hyperlinks from incomplete or unverified URLs.

### 10.7 Table of contents

Use heading levels consistently.

The document must contain an updateable TOC field or a clear instruction to refresh the table of contents when opened.

## 11. Metadata normalization rules

### 11.1 Dates

Store machine-readable dates in ISO 8601 format.

Display dates according to the package language and publication market.

Never change the underlying timestamp.

### 11.2 Article identifiers

Article IDs must remain stable across revisions.

Package versions may change without changing the article ID.

### 11.3 Versioning

Use semantic versioning for the package template and skills.

Use a separate article-version field for editorial revisions.

Example:

- article ID: `MA-MI-2026-00042`;
- article version: `1.3`;
- package skill version: `1.2.1`;
- package file revision: `2`.

### 11.4 Status vocabulary

Allowed package statuses:

- `DRAFT_DUAL_ARTIFACTS`
- `PACKAGE_REVISION_REQUIRED`
- `EDITORIAL_INPUT_REQUIRED`
- `DUAL_ARTIFACTS_READY_FOR_HUMAN_VALIDATION`
- `PUBLICATION_PACKAGE_READY_FOR_EXPORT`
- `EXPORTED`
- `BLOCKED`
- `ARCHIVED`

The skill must not use `PUBLISHED` unless a downstream publication tool confirms publication and returns a valid CMS identifier or URL.

## 12. Traceability ledger

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

## 13. Assembly process

Execute the following stages in order.

### Stage 1 — Validate workflow state

Confirm all required upstream approvals and versions.

### Stage 2 — Lock authoritative article

Identify and hash the exact approved article body.

### Stage 3 — Validate input completeness

Check mandatory fields by content type.

### Stage 4 — Detect conflicts

Compare duplicate fields across upstream packages.

### Stage 5 — Select template

Choose the correct standard package structure.

### Stage 6 — Normalize metadata

Normalize labels, dates, lists, tags and status values.

### Stage 7 — Assemble Publication Package

Create a standalone DOCX containing the locked final article, reader-facing sources and disclaimer, approved publication SEO fields, and only the asset details required by the CMS operator. Run the public-content allowlist and internal-leakage checks before continuing.

### Stage 8 — Assemble Workflow Report

Create a separate internal DOCX containing process evidence, selection lineage, source and claim registers, verification, discoverability rationale, editorial review, revisions, diagnostics, lifecycle controls and provenance. Reference the Publication Package by filename and article hash.

### Stage 9 — Build traceability ledger

Record field provenance and allowed transformations.

### Stage 10 — Apply formatting specification

Map content to Word styles and section structure.

### Stage 11 — Run package integrity checks

Validate completeness, consistency, links, placeholders and article immutability.

### Stage 12 — Generate required and optional exports

Generate both required DOCX files by default. Generate optional Markdown, HTML or JSON only when requested.

### Stage 13 — Return manifest

Return package status, file manifest, validation results and handoff metadata.

## 14. Conflict-resolution rules

Use the following precedence only when the fields are not semantically conflicting.

1. `review-article` approved final article for reader-facing body;
2. approved `DiscoverabilityPackage` for metadata and final headline;
3. `VerificationReport` for factual status and source mapping;
4. Writer output for historical baseline and fields preserved downstream;
5. workflow metadata for IDs, timestamps and execution state;
6. human-supplied override for explicitly overrideable presentation fields.

Do not apply precedence to hide a contradiction.

Examples requiring a block:

- meta title states a causal conclusion rejected by the verifier;
- reviewed article differs from the article supplied for packaging;
- source register refers to deleted claim IDs;
- editorial decision is `PUBLISH` but mandatory revisions remain open;
- author name differs between approved metadata sources.

## 15. Package integrity checks

### 15.1 Article immutability check

Compare the packaged public article against the approved article.

Allowed differences:

- Word style markup;
- whitespace normalization;
- deterministic Markdown rendering;
- hyperlink styling;
- table rendering;
- removal of non-public internal markers explicitly listed in the provenance ledger.

Any other difference fails the check.

### 15.2 Version consistency check

All upstream objects must refer to the same article ID and compatible article version.

### 15.3 Status consistency check

The package status must reflect all upstream states.

### 15.4 Metadata completeness check

All mandatory publication and SEO fields must be complete or explicitly marked for human input.

### 15.5 Source integrity check

All source IDs referenced in claims must exist in the source register.

### 15.6 Claim integrity check

All material verified claims must retain their resolution status.

### 15.7 Review integrity check

No unresolved mandatory revision may remain when the decision is `PUBLISH`.

### 15.8 Placeholder check

Detect and block unresolved placeholders such as:

- `[TBD]`
- `[INSERT]`
- `TODO`
- `XX`
- dummy URLs;
- template instructions;
- empty required table cells.

### 15.9 Public/internal separation check

Fail if any internal score, workflow note, prompt, claim ledger, stage result, run ID, skill version, revision history, provenance field, diagnostic, analytics placeholder or non-public rationale appears anywhere in the Publication Package.

Confirm that the Workflow Report is marked `INTERNAL — NOT FOR PUBLICATION` on its cover and header or footer.

### 15.10 Hyperlink check

Verify syntax and presence of supplied links. Do not claim live HTTP validation unless an appropriate tool performed it.

### 15.11 Export check

Confirm that both generated DOCX files open successfully and contain only their expected sections when the execution environment supports validation. A successful single-file export is incomplete and must return `PACKAGE_REVISION_REQUIRED`.

## 16. Quality gates

### Gate 1 — Upstream approval

Pass only when all required upstream states are valid.

### Gate 2 — Article integrity

Pass only when the public article is unchanged in meaning and content.

### Gate 3 — Metadata integrity

Pass only when mandatory metadata is complete and non-conflicting.

### Gate 4 — Source and claim integrity

Pass only when all claim-source relationships remain valid.

### Gate 5 — Public/internal separation

Pass only when internal production content cannot be mistaken for public article copy.

### Gate 6 — Traceability

Pass only when mandatory package fields have provenance.

### Gate 7 — Formatting readiness

Pass only when heading hierarchy, tables, hyperlinks and document-control elements are structurally valid.

### Gate 8 — Export readiness

Pass only when requested export files can be generated without dropping mandatory sections.

If any mandatory gate fails, return `PACKAGE_REVISION_REQUIRED`, `EDITORIAL_INPUT_REQUIRED` or `BLOCKED` according to the nature of the defect.

## 17. Package issue taxonomy

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

## 18. Revision routing

Route issues as follows:

- article wording or thesis defect → `write-macro-insight` or relevant Writer;
- factual or source defect → `verify-financial-article`;
- SEO or metadata strategy defect → `optimize-content-discoverability`;
- editorial approval defect → `review-article`;
- missing human policy choice → human editor or workflow owner;
- formatting-only defect → rerun `generate-article-package`;
- export implementation defect → export tool or workflow engineering layer.

The skill may automatically correct only formatting, ordering, labeling and deterministic rendering defects.

## 19. Export specifications

### 19.1 DOCX

DOCX is the required human-review format.

Generate two files:

- `PublicationPackageDOCX` — lightweight, public-facing article and SEO handoff;
- `WorkflowReportDOCX` — internal process and quality report.

Each file must have professional MacroAlloc formatting appropriate to its purpose. The publication document prioritizes uninterrupted reading and simple CMS handoff. The report prioritizes traceability and analysis.

### 19.2 Markdown

Markdown export should:

- preserve section hierarchy;
- preserve tables where practical;
- preserve links;
- clearly separate public and internal sections;
- avoid Word-specific field instructions except as comments.

### 19.3 HTML

HTML export should:

- use semantic headings;
- separate public and internal sections with classes or containers;
- preserve metadata in a structured block;
- avoid embedding unsupported scripts;
- avoid claiming CMS compatibility without testing.

### 19.4 JSON

JSON is the canonical machine-readable package.

It should preserve every field, provenance entry, issue and state without formatting loss.

## 20. Normalized output contract

Return a machine-readable object with the following structure.

```yaml
PublicationPackage:
  identity:
    article_id:
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
    content_type:
    edition:
    language:
    target_market:
    article_version:
    package_version:
    generated_at:
    status:
    human_approval_required:
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

## 21. Human-readable output order

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

## 22. File naming convention

Use:

- `MacroAlloc_<content-type>_<YYYY-MM-DD>_<short-slug>_Publication_<article-version>.docx`
- `MacroAlloc_<content-type>_<YYYY-MM-DD>_<short-slug>_Workflow-Report_<report-version>.docx`

Examples:

- `MacroAlloc_Evening-Macro-Insight_2026-08-03_fed-hawkish-dissents_Publication_v1.0.docx`
- `MacroAlloc_Evening-Macro-Insight_2026-08-03_fed-hawkish-dissents_Workflow-Report_v1.0.docx`

For the skill distribution package, use:

`MacroAlloc_generate-article-package_v1.0.0.zip`

Avoid characters that create cross-platform file-system problems.

## 23. Package manifest

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

## 24. Error handling

### 24.1 Recoverable packaging errors

Examples:

- table overflow;
- missing optional visual field;
- inconsistent date-display format;
- broken heading level;
- empty optional section;
- missing non-critical distribution asset.

Correct automatically when deterministic, then record the transformation.

### 24.2 Non-recoverable errors

Examples:

- missing approved article;
- unresolved major review issue;
- conflicting final titles;
- broken claim-source mapping;
- incorrect article version;
- missing mandatory disclaimer;
- request to alter verified content during packaging.

Stop and return a structured error.

## 25. Security and confidentiality

The package must not expose:

- API keys;
- system prompts;
- confidential credentials;
- private customer information;
- internal file-system paths in public content;
- unpublished proprietary datasets unless authorized;
- internal model reasoning;
- hidden chain-of-thought;
- personal data not approved for publication.

Internal technical metadata may be included only in clearly marked internal sections.

## 26. Compliance and financial-content safeguards

The package must preserve all approved disclaimers and compliance language.

It must not:

- transform analysis into personalized advice;
- create calls to buy or sell;
- remove uncertainty language;
- hide material risks;
- promote an ETF or security without approved editorial basis;
- display performance promises;
- mislabel opinions as facts.

Any suspected compliance regression must be routed back to the Reviewer or Verifier.

## 27. Observability fields

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

## 28. Acceptance tests

### Test 1 — Approved standard article

Given complete approved inputs, the skill produces both DOCX files, preserves the article exactly, keeps internal material out of the Publication Package and returns `DUAL_ARTIFACTS_READY_FOR_HUMAN_VALIDATION`.

### Test 2 — Article-version mismatch

Given an editorial review for version 1.2 and article body version 1.3, the skill returns `BLOCKED` and identifies the version conflict.

### Test 3 — Missing optional competitor analysis

The skill marks the advanced discoverability module `NOT_ASSESSED` and continues.

### Test 4 — Missing mandatory disclaimer

The skill returns `BLOCKED` and routes the issue to the relevant owner.

### Test 5 — Formatting-only defect

The skill corrects the heading style, records `FORMAT_ONLY` in provenance and continues.

### Test 6 — Public article contains internal SEO notes

The skill removes them only if they are deterministic internal markers, records the transformation and verifies the article text. Otherwise it blocks.

### Test 7 — Conflicting meta titles

The skill does not choose silently. It requests editorial input unless one is clearly marked approved and authoritative.

### Test 8 — Unknown analytics

The package uses `PENDING`, not zero or fabricated values.

### Test 9 — Source ID missing

The skill blocks when the claim ledger references a source absent from the register.

### Test 10 — Export manifest

Every generated file appears in the manifest with its validation result.

### Test 11 — Internal leakage into publication document

Given a Publication Package containing a workflow ID, score, claim ledger, AI-review note, prompt or provenance table, the skill returns `PACKAGE_REVISION_REQUIRED` and removes the material only through deterministic reassembly from the public allowlist.

### Test 12 — Missing Workflow Report

Given a valid Publication Package but no Workflow Report during the v1.2 testing phase, the skill returns `PACKAGE_REVISION_REQUIRED` rather than declaring the job complete.

### Test 13 — Missing Publication Package

Given a valid Workflow Report but no Publication Package, the skill returns `BLOCKED` because no human-review or CMS handoff document exists.

### Test 14 — Article mismatch across documents

Given different article hashes in the Publication Package and Workflow Report, the skill returns `BLOCKED` and reports the mismatch.

## 29. Evaluation dataset recommendations

Test the skill with at least:

- 20 complete approved Macro Insights;
- 10 packages with missing optional fields;
- 10 packages with version conflicts;
- 10 packages with unresolved placeholders;
- 10 packages with source-register defects;
- 10 packages with public/internal-content leakage;
- 10 packages containing complex tables;
- 10 ETF Research packages;
- 10 Education packages;
- 10 revision cycles with formatting regressions;
- 10 corrupted or incomplete export cases.

Measure:

- article-integrity preservation;
- field-mapping accuracy;
- conflict-detection rate;
- false blocking rate;
- missing-field detection;
- source and claim integrity;
- Word readability;
- export completeness;
- reproducibility across repeated runs;
- compatibility with CMS mapping.

## 30. Completion criteria

The skill is complete only when:

- all mandatory upstream states are valid;
- the authoritative article is identified and locked;
- both required DOCX files are present;
- all required sections are present in their owning document;
- public and internal content are separated at file level;
- the source and claim registers are internally consistent;
- provenance is recorded;
- mandatory quality gates pass;
- requested exports are generated or an explicit export limitation is reported;
- the two-entry package manifest is complete;
- the handoff state is explicit;
- no unresolved mandatory placeholder remains.

## 31. Handoff

When successful, return:

- the complete `PublicationPackage` object;
- the complete `WorkflowReport` object;
- both generated DOCX references;
- package manifest;
- package validation report;
- human-action list;
- final state.

Default next step:

- human validation;
- then CMS publication workflow after explicit approval.

The skill must never trigger publication itself.

## 32. Final rule

The purpose of the Publication Package is to minimize human-review and CMS friction. The purpose of the Workflow Report is to preserve the temporary operational evidence needed to improve the Content Factory.

A visually polished output is not valid if it changes the approved article, hides unresolved issues, loses source traceability, omits either required document during testing, or leaks internal production material into the Publication Package.

Package integrity takes precedence over presentation speed.

End of Skill.
