---
name: generate-article-package
description: Creates two separate Word deliverables from an approved US-English MacroAlloc article: a public Publication Package and an internal Workflow Report. Also renders a third, French-language Publication Package once adapt-article-french has produced a fidelity-audited translation, in a distinct French-render mode. Use only after final editorial PUBLISH approval (English mode) or after adapt-article-french's FRENCH_ADAPTATION_READY_FOR_PACKAGING (French-render mode). Do not rewrite the article, mix internal workflow data into the public document, accept missing TOPIC_SELECTED lineage, or package inconsistent article versions.
---

# Generate Article Package

## Preconditions

- Confirm the primary artifact and metadata are in US English.
- Require `PUBLISH` from `review-article` and preserve the `TOPIC_SELECTED` lineage, explicit selection evidence, and locked angle it carries.
- Treat missing mandatory evidence, ambiguous human decisions, and contract mismatches as blocking.
- Never invent a human approval, external fact, source, status, or completed action.

## Workflow

1. Validate upstream approvals, lineage, authoritative versions, language, and mandatory inputs.
2. Freeze the approved article and resolve metadata conflicts without rewriting substance.
3. Assemble the public Publication Package with publication-ready content only.
4. Assemble the separate internal Workflow Report with provenance, ledgers, review evidence, and diagnostics.
5. Render and inspect both DOCX files; run leakage, consistency, link, placeholder, and manifest checks.
6. Return both files and the manifest for explicit human final validation.

## Boundaries

- Upstream producer: `review-article` with `PUBLISH` and all authoritative artifacts (English mode); `adapt-article-french` with `FRENCH_ADAPTATION_READY_FOR_PACKAGING` (French-render mode).
- Downstream consumer: The human final-validation gate (English mode); direct delivery alongside it, with no separate gate (French-render mode, per its own documented disclosure).
- Allowed terminal statuses: `DUAL_ARTIFACTS_READY_FOR_HUMAN_VALIDATION`, `FRENCH_ARTIFACT_READY`, `PACKAGE_REVISION_REQUIRED`, `EDITORIAL_INPUT_REQUIRED`, or `BLOCKED`.
- In French-render mode, never re-render, alter, or regenerate the English Publication Package or the Workflow Report; only the third, French file is produced.
- Keep the public article separate from internal workflow evidence.
- Ask only for information that cannot be retrieved safely from the available artifacts.

## Load references

- Read [references/workflow.md](references/workflow.md) before execution for the complete stage sequence, inputs, and routing rules.
- Read [references/contracts.md](references/contracts.md) whenever validating or emitting structured fields, statuses, versions, handoffs, filenames, or artifacts.
- Read [references/domain-rules.md](references/domain-rules.md) for task-specific editorial, financial, SEO, research, writing, or formatting rules relevant to the request.
- Read [references/quality-and-tests.md](references/quality-and-tests.md) before a terminal decision and when diagnosing failures, gates, regressions, security, or compliance.
- Use [scripts/build_package.js](scripts/build_package.js) to render every DOCX file (Publication Package, Workflow Report, and French-render mode's Publication Package) instead of writing a new one-off script. Build a JSON config per the schema documented in `references/domain-rules.md` Section 9, then run `node scripts/build_package.js <config.json>`. Requires the `docx` npm package (install once per environment: `npm install docx`); does not require LibreOffice or pandoc. The script never overwrites an existing file. Its current template is a functional baseline, not yet a full implementation of the Section 5 Word formatting standard — see Section 9 for the known gap.

## Completion

Return the authorized output, its exact status, material issues, evidence of passed gates, unresolved risks, and the next responsible actor. Do not claim completion without observable evidence.
