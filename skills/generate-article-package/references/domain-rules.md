# Generate Article Package — Domain Rules

## Contents

- 1. Workflow invariants
- 2. Blocking conditions
- 3. Dual-document architecture
- 4. Content-type variations
- 5. Word formatting standard
- 6. Conflict-resolution rules
- 7. Error handling
- 8. Evaluation dataset recommendations

## 1. Workflow invariants

- Require traceable upstream status `TOPIC_SELECTED` and explicit user-selection evidence tied to the preserved shortlist.
- Require the primary article, metadata and package to remain in US English (`en-US`).
- Return `BLOCKED` if the topic or angle differs materially from the human-selected topic or locked brief.
- Do not translate, replace, broaden, reselect or rewrite the approved primary content during assembly.
- Place any approved secondary-language adaptation in a clearly separate optional artifact; never substitute it for the US-English primary package. This skill does not perform the translation itself: `adapt-article-french` produces the fidelity-audited French content, and this skill only renders it, in a distinct French-render mode (Section 3.16), after the English package has already been delivered.

## 2. Blocking conditions

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

## 3. Dual-document architecture

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

### 3.1 Workflow Report cover page

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

### 3.2 Workflow Report document control page

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

### 3.3 Workflow Report table of contents

The Word package must include a Word-compatible automatic table of contents field or a clearly marked placeholder that updates when opened.

Use heading styles consistently so the table of contents can be refreshed automatically.

### 3.4 Workflow Report executive summary

Include the approved executive summary.

This section must be concise, factual and consistent with the article.

Do not generate a new summary during packaging.

### 3.5 Workflow Report readiness dashboard

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

### 3.6 Publication Package SEO appendix and Workflow Report SEO rationale

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

### 3.7 Publication Package approved article

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

### 3.8 Publication asset details and internal visual rationale

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

### 3.9 Workflow Report source register

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

### 3.10 Workflow Report fact-check and claim ledger

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

### 3.11 Workflow Report AI editorial review summary

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

### 3.12 Workflow Report detailed editorial review

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

### 3.13 Workflow Report distribution package

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

### 3.14 Workflow Report analytics and lifecycle page

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

### 3.15 Workflow Report technical metadata and provenance

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

### 3.16 French-render mode

A third document, produced only when `adapt-article-french` returns `FRENCH_ADAPTATION_READY_FOR_PACKAGING`, after the English Publication Package and Workflow Report already exist.

Required content, in order:

1. publication header, in French, mirroring the English header's fields;
2. the `disclosure` statement from `adapt-article-french`'s output, verbatim, displayed visibly on the first page, not in a footnote;
3. the complete translated article, including French key takeaways, disclaimer, and public sources;
4. a `SEO POUR PUBLICATION` appendix with the translated metadata fields only.

This document must never include the Workflow Report's internal content, must never be generated without the `disclosure` statement, and must never replace or be substituted for the English Publication Package, which remains the primary deliverable.

## 4. Content-type variations

### 4.1 Morning Macro Insight

Prioritize:

- edition label;
- time sensitivity;
- overnight or recent-event timestamp;
- concise public article presentation;
- same-day freshness and update warnings;
- day-ahead watchlist when approved.

### 4.2 Evening Macro Insight

Prioritize:

- session date;
- closing-market context;
- distinction between the event and the market interpretation;
- next-session watchlist;
- short review interval.

### 4.3 Market Analysis

Allow:

- longer executive summary;
- more detailed chart and table package;
- expanded methodology and assumptions;
- multi-asset source mapping;
- longer lifecycle and refresh plan.

### 4.4 ETF Research

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

### 4.5 Education Article

Prioritize:

- definitions;
- learning objectives;
- prerequisite concepts;
- glossary;
- examples;
- evergreen classification;
- longer refresh interval;
- educational internal links.

## 5. Word formatting standard

The DOCX output must be professional, stable and suitable for repeated production.

### 5.1 Page setup

Default unless a MacroAlloc template overrides it:

- A4 page size;
- portrait orientation;
- professional margins;
- page numbers in the footer;
- document title or article ID in the header after the cover page;
- section breaks between major package groups;
- no orphaned headings when technically avoidable.

### 5.2 Styles

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

### 5.3 Branding

Apply the approved MacroAlloc visual identity when assets are available.

The package may use:

- MacroAlloc navy for primary headings;
- electric blue for accents;
- restrained green or violet for status and secondary information;
- neutral grey for internal metadata;
- white background for readability.

Do not invent a logo or brand asset. If no official asset is supplied, use a text-based MacroAlloc header.

### 5.4 Typography

Use a professional sans-serif font supported by the execution environment.

Prefer consistency and portability over decorative styling.

Do not embed or distribute font files.

### 5.5 Tables

Tables must:

- fit within page margins;
- repeat header rows when practical;
- use consistent header formatting;
- avoid excessive cell shading;
- preserve source IDs and statuses;
- split across pages cleanly;
- avoid tiny unreadable fonts.

### 5.6 Hyperlinks

Preserve verified URLs as clickable links.

Do not create hyperlinks from incomplete or unverified URLs.

### 5.7 Table of contents

Use heading levels consistently.

The document must contain an updateable TOC field or a clear instruction to refresh the table of contents when opened.

## 6. Conflict-resolution rules

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

## 7. Error handling

### 7.1 Recoverable packaging errors

Examples:

- table overflow;
- missing optional visual field;
- inconsistent date-display format;
- broken heading level;
- empty optional section;
- missing non-critical distribution asset.

Correct automatically when deterministic, then record the transformation.

### 7.2 Non-recoverable errors

Examples:

- missing approved article;
- unresolved major review issue;
- conflicting final titles;
- broken claim-source mapping;
- incorrect article version;
- missing mandatory disclaimer;
- request to alter verified content during packaging.

Stop and return a structured error.

## 8. Evaluation dataset recommendations

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
