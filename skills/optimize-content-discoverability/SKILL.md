---
name: optimize-content-discoverability
description: Optimizes a financially approved US-English MacroAlloc article for US-priority search and AI discovery while preserving verified facts, thesis, topic, and locked angle. Use only after APPROVED_FOR_SEO. Do not invent search data, competitor evidence, links, credentials, or alter substance without re-verification.
---

# Optimize Content Discoverability

## Preconditions

- Confirm the primary artifact and metadata are in US English.
- Require `APPROVED_FOR_SEO` from `verify-financial-article` and preserve the `TOPIC_SELECTED` lineage, explicit selection evidence, and locked angle it carries.
- Treat missing mandatory evidence, ambiguous human decisions, and contract mismatches as blocking.
- Never invent a human approval, external fact, source, status, or completed action.

## Workflow

1. Validate approval, lineage, language, locked topic and angle, and authoritative article version.
2. Freeze verified substance in a preservation ledger.
3. Optimize intent alignment, semantic coverage, entities, retrieval structure, headlines, and metadata.
4. Run optional competitor, authority, linking, and lifecycle modules only with traceable inputs.
5. Compare the optimized article with the frozen substance and route material changes back for verification.
6. Return the optimized article, discoverability package, and preservation evidence.

## Boundaries

- Upstream producer: `verify-financial-article` with `APPROVED_FOR_SEO`.
- Downstream consumer: `review-article` with the optimized article and preservation ledger.
- Allowed terminal statuses: `DISCOVERABILITY_READY_FOR_REVIEW`, `DISCOVERABILITY_REVISION_REQUIRED`, `CONSOLIDATION_DECISION_REQUIRED`, `EDITORIAL_DECISION_REQUIRED`, or `BLOCKED`.
- Keep the public article separate from internal workflow evidence.
- Ask only for information that cannot be retrieved safely from the available artifacts.

## Load references

- Read [references/workflow.md](references/workflow.md) before execution for the complete stage sequence, inputs, and routing rules.
- Read [references/contracts.md](references/contracts.md) whenever validating or emitting structured fields, statuses, versions, handoffs, filenames, or artifacts.
- Read [references/domain-rules.md](references/domain-rules.md) for task-specific editorial, financial, SEO, research, writing, or formatting rules relevant to the request.
- Read [references/quality-and-tests.md](references/quality-and-tests.md) before a terminal decision and when diagnosing failures, gates, regressions, security, or compliance.

## Completion

Return the authorized output, its exact status, material issues, evidence of passed gates, unresolved risks, and the next responsible actor. Do not claim completion without observable evidence.
