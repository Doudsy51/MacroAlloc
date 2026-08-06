---
name: generate-article-package
description: Creates two separate Word deliverables from an approved US-English MacroAlloc article: a public Publication Package and an internal Workflow Report. Use only after final editorial PUBLISH approval. Do not rewrite the article, mix internal workflow data into the public document, accept missing TOPIC_SELECTED lineage, or package inconsistent article versions.
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

- Upstream producer: `review-article` with `PUBLISH` and all authoritative artifacts.
- Downstream consumer: The human final-validation gate; never direct publication.
- Allowed terminal statuses: `DUAL_ARTIFACTS_READY_FOR_HUMAN_VALIDATION`, `PACKAGE_REVISION_REQUIRED`, `EDITORIAL_INPUT_REQUIRED`, or `BLOCKED`.
- Keep the public article separate from internal workflow evidence.
- Ask only for information that cannot be retrieved safely from the available artifacts.

## Load references

- Read [references/workflow.md](references/workflow.md) before execution for the complete stage sequence, inputs, and routing rules.
- Read [references/contracts.md](references/contracts.md) whenever validating or emitting structured fields, statuses, versions, handoffs, filenames, or artifacts.
- Read [references/domain-rules.md](references/domain-rules.md) for task-specific editorial, financial, SEO, research, writing, or formatting rules relevant to the request.
- Read [references/quality-and-tests.md](references/quality-and-tests.md) before a terminal decision and when diagnosing failures, gates, regressions, security, or compliance.

## Completion

Return the authorized output, its exact status, material issues, evidence of passed gates, unresolved risks, and the next responsible actor. Do not claim completion without observable evidence.
