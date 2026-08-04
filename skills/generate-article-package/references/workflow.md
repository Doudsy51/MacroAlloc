# Generate Article Package — Workflow

## Contents

- 1. Mission
- 2. Position in the workflow
- 4. Responsibilities
- 5. Non-responsibilities
- 6. Mandatory inputs
- 13. Assembly process
- 18. Revision routing
- 31. Handoff

## 1. Mission

Assemble the approved output of the MacroAlloc editorial workflow into two standardized and strictly separated Word documents:

1. `PublicationPackageDOCX` — the lightweight human-review and website-publication document;
2. `WorkflowReportDOCX` — the internal process, quality and traceability report.

The skill is responsible for document assembly, information mapping, formatting instructions, metadata normalization, provenance, export readiness and package integrity.

It must not perform financial research, rewrite the article, alter verified facts, change the approved SEO strategy, re-score editorial quality, create new analysis, approve publication, publish content or invent missing information.

Both DOCX files are mandatory while the bundle status is `TESTING`. The publication document must preserve the exact approved public article and approved publication metadata. The workflow report must preserve the internal evidence needed to evaluate and improve the Content Factory.

Never combine the two documents. Internal workflow material must not appear anywhere in the Publication Package.

## 2. Position in the workflow

Expected upstream states:

- `DRAFT_READY_FOR_VERIFICATION` from the Writer before verification;
- `APPROVED_FOR_SEO` from `verify-financial-article`;
- `DISCOVERABILITY_READY_FOR_REVIEW` from `optimize-content-discoverability`;
- `PUBLISH` from `review-article`;
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
