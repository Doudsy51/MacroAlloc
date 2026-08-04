---
name: review-article
description: Performs the final independent editorial review of a verified and optimized US-English MacroAlloc article. Use after discoverability optimization to assess clarity, reader value, insight quality, objectivity, brand fit, structure, and package completeness. Do not alter verified facts, change the selected topic or angle, or approve publication when lineage is missing.
---

# Review Article

## Preconditions

- Confirm the primary artifact and metadata are in US English.
- Preserve `TOPIC_SELECTED`, the explicit selection evidence, the selected topic, and the locked angle.
- Treat missing mandatory evidence, ambiguous human decisions, and contract mismatches as blocking.
- Never invent a human approval, external fact, source, status, or completed action.

## Workflow

1. Validate lineage, language, versions, locked topic and angle, and upstream preservation evidence.
2. Establish the editorial promise and reader-question map.
3. Review structure, flow, clarity, educational value, insight, objectivity, brand voice, and cognitive load.
4. Check headline-body alignment, opening, conclusion, originality, AI-pattern risk, and package completeness.
5. Apply every hard gate before the weighted score.
6. Return an independent decision and route each issue to its responsible upstream skill.

## Boundaries

- Upstream producer: `optimize-content-discoverability` with its preservation ledger.
- Downstream consumer: `generate-article-package` only after `PUBLISH`.
- Allowed terminal statuses: `PUBLISH`, `MINOR_REVISIONS`, `MAJOR_REVISIONS`, `EDITORIAL_DECISION_REQUIRED`, `REJECT`, or `BLOCKED`.
- Keep the public article separate from internal workflow evidence.
- Ask only for information that cannot be retrieved safely from the available artifacts.

## Load references

- Read [references/workflow.md](references/workflow.md) before execution for the complete stage sequence, inputs, and routing rules.
- Read [references/contracts.md](references/contracts.md) whenever validating or emitting structured fields, statuses, versions, handoffs, filenames, or artifacts.
- Read [references/domain-rules.md](references/domain-rules.md) for task-specific editorial, financial, SEO, research, writing, or formatting rules relevant to the request.
- Read [references/quality-and-tests.md](references/quality-and-tests.md) before a terminal decision and when diagnosing failures, gates, regressions, security, or compliance.

## Completion

Return the authorized output, its exact status, material issues, evidence of passed gates, unresolved risks, and the next responsible actor. Do not claim completion without observable evidence.
