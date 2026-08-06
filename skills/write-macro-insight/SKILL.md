---
name: write-macro-insight
description: Writes or revises a publication-quality US-English MacroAlloc Morning or Evening Macro Insight from a researched, human-selected topic. Use only with EVIDENCE_DOSSIER_READY_FOR_WRITING plus preserved TOPIC_SELECTED lineage. Do not research missing evidence, draft before selection, change the locked topic or angle, verify independently, or package for publication.
---

# Write Macro Insight

## Preconditions

- Confirm the primary artifact and metadata are in US English.
- Require `EVIDENCE_DOSSIER_READY_FOR_WRITING` from `research-macro-evidence` and preserve the `TOPIC_SELECTED` lineage, explicit selection evidence, and locked angle it carries.
- Treat missing mandatory evidence, ambiguous human decisions, and contract mismatches as blocking.
- Never invent a human approval, external fact, source, status, or completed action.

## Workflow

1. Validate `EVIDENCE_DOSSIER_READY_FOR_WRITING`, preserved `TOPIC_SELECTED` lineage, content type, locked angle, and source package.
2. Block ambiguous selection, topic drift, missing evidence, or non-US-English primary output.
3. Draft the article using the required editorial architecture and source markers.
4. Separate confirmed facts, uncertainty, MacroAlloc interpretation, and scenarios.
5. Reconcile the draft against every material source and run the hard output gates.
6. Return the article and evidence registers as `DRAFT_READY_FOR_VERIFICATION`.

## Boundaries

- Upstream producer: `research-macro-evidence` with `EVIDENCE_DOSSIER_READY_FOR_WRITING` and preserved `TOPIC_SELECTED` lineage.
- Downstream consumer: `verify-financial-article` with `DRAFT_READY_FOR_VERIFICATION`.
- Allowed terminal statuses: `DRAFT_READY_FOR_VERIFICATION`, `REVISION_REQUIRED`, `EDITORIAL_DECISION_REQUIRED`, or `BLOCKED`.
- Write every source's content in independent wording; at most one direct quotation of 15 words or fewer per article, and never a passage that echoes a source's original phrasing closely enough to read as copied.
- Keep the public article separate from internal workflow evidence.
- Ask only for information that cannot be retrieved safely from the available artifacts.

## Load references

- Read [references/workflow.md](references/workflow.md) before execution for the complete stage sequence, inputs, and routing rules.
- Read [references/contracts.md](references/contracts.md) whenever validating or emitting structured fields, statuses, versions, handoffs, filenames, or artifacts.
- Read [references/domain-rules.md](references/domain-rules.md) for task-specific editorial, financial, SEO, research, writing, or formatting rules relevant to the request.
- Read [references/quality-and-tests.md](references/quality-and-tests.md) before a terminal decision and when diagnosing failures, gates, regressions, security, or compliance.

## Completion

Return the authorized output, its exact status, material issues, evidence of passed gates, unresolved risks, and the next responsible actor. Do not claim completion without observable evidence.
