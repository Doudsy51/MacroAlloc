# Changelog - generate-article-package

## 1.2.1 - Historical-state clarity

### Fixed

- Required embedded legacy job records to be labeled `HISTORICAL INPUT SNAPSHOT`.
- Prevented historical statuses and skill versions from being presented as the current package state.
- Required consistent current state across document control, readiness and final-action sections.

## 1.2.0 - Split publication and workflow deliverables

### Changed

- Replaced the combined Article Package DOCX with two mandatory Word outputs.
- Added a lightweight Publication Package containing the complete approved article, public sources, disclaimer, and publication-ready SEO metadata only.
- Added a separate internal Workflow Report containing discovery, human-selection evidence, verification, review, provenance, lifecycle controls, issues, and diagnostics.
- Prohibited workflow IDs, scores, claim ledgers, prompts, revision logs, and other internal material from appearing in the Publication Package.
- Added independent integrity, naming, manifest, and rendering checks for both documents.

All notable changes to this skill are documented here.

## [1.0.0] — 2026-08-02

### Added

- Initial complete production specification for `generate-article-package`.
- Standard MacroAlloc Article Package architecture.
- Primary DOCX output with optional Markdown, HTML and JSON exports.
- Strict separation between public article content and internal production content.
- Approved-article immutability rules.
- One-source-of-truth and conflict-detection rules.
- Cover page, document-control page and automatic table-of-contents requirements.
- SEO and discoverability package integration.
- Visual package integration.
- Source register, claim ledger, causal-pivot review and context-reconciliation integration.
- AI Editorial Review Summary and detailed editorial review integration.
- Distribution package and analytics-lifecycle placeholders.
- Technical metadata and provenance ledger.
- Word formatting and MacroAlloc branding standards.
- Content-type variations for Macro Insights, Market Analysis, ETF Research and Education.
- Package integrity checks and eight mandatory quality gates.
- Package issue taxonomy and revision-routing rules.
- Export specifications and normalized `ArticlePackage` output contract.
- File naming convention and export manifest.
- Security, confidentiality and financial-content safeguards.
- Acceptance tests, evaluation-dataset recommendations and completion criteria.

### Compatibility

- Designed for `write-macro-insight v0.7.0` or later.
- Designed for `verify-financial-article v0.7.0` or later.
- Designed for `optimize-content-discoverability v1.0.0` or later.
- Designed for `review-article v1.0.0` or later.

### Status

- `TESTING`
- Human validation remains mandatory before publication.

## 1.1.0 — Workflow invariant preservation

- Requires `TOPIC_SELECTED` lineage and explicit human-selection evidence.
- Requires the primary article, metadata and package to remain in US English.
- Blocks topic drift and keeps any secondary-language adaptation separate.
