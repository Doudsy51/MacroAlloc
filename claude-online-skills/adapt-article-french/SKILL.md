---
name: adapt-article-french
description: Produces a French-language adaptation of a MacroAlloc article after its US-English package has received final human approval. Preserves every fact, figure, entity, and locked thesis exactly; never re-verifies facts independently. Use only after the human APPROVE gate on the English package for that region. Do not use to draft, verify, or approve the primary English content, and never let the French version substitute for or delay it.
---

# Adapt Article French

## Preconditions

- Require the region's human `APPROVE` decision on the English Publication Package before starting; never translate a draft, an unapproved article, or content still in a revision loop.
- Treat the approved English article as immutable: preserve every number, date, entity, causal claim, and hedge exactly as approved.
- Never invent a French term, a market convention, or a source that was not in the English original.
- Disclose plainly that this adaptation has no independent human-in-language review; it is not the same guarantee as the human-approved English package.

## Workflow

1. Validate that the upstream status is the region's `APPROVE`, not `PUBLISH` alone, and that the approved article hash matches the package just validated.
2. Translate the article into natural, professional French, preserving facts and hedges exactly and applying the same human-sounding-prose standard as the English original.
3. Translate the SEO metadata (title, description, slug candidate) into French terms a French-speaking reader would actually search, not a literal rendering of the English keywords.
4. Run the fidelity audit: reconcile every number, date, entity, and causal claim in the French text against the approved English text; flag and resolve any drift before returning.
5. Return the French content and audit as `FRENCH_ADAPTATION_READY_FOR_PACKAGING`, or `BLOCKED` if the audit finds an unresolved drift.

## Boundaries

- Upstream producer: the region's human `APPROVE` decision inside `run-macroalloc-content-factory`, carrying the approved English article and its hash.
- Downstream consumer: `generate-article-package` in its French-render mode, which renders the translated content into the third DOCX file.
- Allowed terminal statuses: `FRENCH_ADAPTATION_READY_FOR_PACKAGING`, `BLOCKED`.
- Never re-verify, add, remove, or soften a factual or causal claim relative to the approved English article; that responsibility belongs to `verify-financial-article` and stays closed once `APPROVE` is granted.
- Never use the em dash or a double hyphen as one, and apply the same quotation and paraphrase-originality limits as the English original, translated to French conventions.
- Never delay, gate, or substitute for the English Publication Package; it is already delivered and approved before this skill starts.

## Load references

- Read [references/workflow.md](references/workflow.md) before execution for the complete stage sequence, inputs, and routing rules.
- Read [references/contracts.md](references/contracts.md) whenever validating or emitting structured fields, statuses, versions, handoffs, filenames, or artifacts.
- Read [references/domain-rules.md](references/domain-rules.md) for translation, terminology, and French-language editorial rules.
- Read [references/quality-and-tests.md](references/quality-and-tests.md) before a terminal decision and when diagnosing failures, gates, or fidelity drift.

## Completion

Return the authorized output, its exact status, the fidelity audit, unresolved drift if any, and the next responsible actor. Do not claim completion without observable evidence.
