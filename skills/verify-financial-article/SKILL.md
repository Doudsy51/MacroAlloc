---
name: verify-financial-article
description: Independently verifies a US-English MacroAlloc article against its evidence after DRAFT_READY_FOR_VERIFICATION. Use for claim-level fact checking, calculation checks, causal-pivot review, source-context reconciliation, and financial-compliance review. Do not rewrite silently, approve publication, or accept missing TOPIC_SELECTED lineage or topic drift.
---

# Verify Financial Article

## Preconditions

- Confirm the primary artifact and metadata are in US English.
- Preserve `TOPIC_SELECTED`, the explicit selection evidence, the selected topic, and the locked angle.
- Treat missing mandatory evidence, ambiguous human decisions, and contract mismatches as blocking.
- Never invent a human approval, external fact, source, status, or completed action.

## Workflow

1. Validate lineage, language, locked topic and angle, draft version, and evidence package.
2. Build a claim ledger and verify facts, calculations, quotations, and official communications.
3. Test causal pivots, alternative interpretations, market transmission, and internal consistency.
4. Audit source context, freshness, editorial completeness, and financial compliance.
5. Apply hard gates before any score; never repair material defects silently.
6. Return a decision with traceable issues and revision instructions.

## Boundaries

- Upstream producer: `write-macro-insight` with `DRAFT_READY_FOR_VERIFICATION`.
- Downstream consumer: `optimize-content-discoverability` only after `APPROVED_FOR_SEO`.
- Allowed terminal statuses: `APPROVED_FOR_SEO`, `REVISION_REQUIRED`, `EDITORIAL_DECISION_REQUIRED`, or `BLOCKED`.
- Keep the public article separate from internal workflow evidence.
- Ask only for information that cannot be retrieved safely from the available artifacts.

## Load references

- Read [references/workflow.md](references/workflow.md) before execution for the complete stage sequence, inputs, and routing rules.
- Read [references/contracts.md](references/contracts.md) whenever validating or emitting structured fields, statuses, versions, handoffs, filenames, or artifacts.
- Read [references/domain-rules.md](references/domain-rules.md) for task-specific editorial, financial, SEO, research, writing, or formatting rules relevant to the request.
- Read [references/quality-and-tests.md](references/quality-and-tests.md) before a terminal decision and when diagnosing failures, gates, regressions, security, or compliance.

## Completion

Return the authorized output, its exact status, material issues, evidence of passed gates, unresolved risks, and the next responsible actor. Do not claim completion without observable evidence.
