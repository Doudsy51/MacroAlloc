# Generate Article Package — Quality And Tests

## Contents

- 1. Core operating principles
- 2. Quality gates
- 3. Security and confidentiality
- 4. Compliance and financial-content safeguards
- 5. Acceptance tests
- 6. Completion criteria
- 7. Final rule

## 1. Core operating principles

### 1.1 Assembly, not authorship

The skill assembles approved components. It does not become a second Writer, Verifier, SEO optimizer or Reviewer.

It may normalize labels, dates, field order, typography and presentation. It must not change the meaning of reader-facing content.

### 1.2 Approved article is immutable

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

### 1.3 One source of truth per field

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

### 1.4 Public and internal content separation

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

### 1.5 Traceability by design

Every substantive package element must be traceable to its origin.

Traceability must identify:

- source skill;
- skill version;
- article version;
- workflow run identifier;
- execution timestamp;
- approval state;
- field-level provenance when relevant.

### 1.6 Deterministic package structure

The order and naming of sections must remain stable across articles unless the content type explicitly requires a documented variation.

Stable structure enables:

- human review;
- CMS mapping;
- regression testing;
- automatic export;
- historical comparison;
- future API integration.

## 2. Quality gates

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

### Gate 9 — French disclosure (French-render mode only)

Pass only when the French Publication Package carries the `disclosure` statement from `adapt-article-french` verbatim and visibly, and shares the same `article_id` and `approved_article_hash` as the English package it adapts.

If any mandatory gate fails, return `PACKAGE_REVISION_REQUIRED`, `EDITORIAL_INPUT_REQUIRED` or `BLOCKED` according to the nature of the defect.

## 3. Security and confidentiality

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

## 4. Compliance and financial-content safeguards

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

## 5. Acceptance tests

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

Given a valid Publication Package but no Workflow Report while the bundle status is `TESTING`, the skill returns `PACKAGE_REVISION_REQUIRED` rather than declaring the job complete.

### Test 13 — Missing Publication Package

Given a valid Workflow Report but no Publication Package, the skill returns `BLOCKED` because no human-review or CMS handoff document exists.

### Test 14 — Article mismatch across documents

Given different article hashes in the Publication Package and Workflow Report, the skill returns `BLOCKED` and reports the mismatch.

## 6. Completion criteria

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

## 7. Final rule

The purpose of the Publication Package is to minimize human-review and CMS friction. The purpose of the Workflow Report is to preserve the temporary operational evidence needed to improve the Content Factory.

A visually polished output is not valid if it changes the approved article, hides unresolved issues, loses source traceability, omits either required document during testing, or leaks internal production material into the Publication Package.

Package integrity takes precedence over presentation speed.

End of Skill.
