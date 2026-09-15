# Changelog - generate-article-package

## Unreleased - Reusable DOCX rendering script (2026-09-15)

### Added

- Added `scripts/build_package.js`, a deterministic Node/`docx` renderer driven by a JSON config, so a Publication Package, Workflow Report, or French-render Publication Package no longer requires writing a new one-off script per run.
- Documented the script's config schema and safety guarantees (never overwrites an existing file) in `references/domain-rules.md` Section 9.
- Flagged, in that same section, the script's current gap against the Section 5 Word formatting standard (US Letter and ad hoc styles rather than A4, named Word styles, brand colors, header/footer, and a table-of-contents field) as a known limitation, not yet closed by this change.

Note: this entry does not carry a numeric version because the versions between 1.2.1 and the skill's current `main` state (region support, dual-mode rendering, French-render mode) were not recorded here; see Git history for that period instead.

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
