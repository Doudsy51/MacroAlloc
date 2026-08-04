---
name: discover-content-opportunities
description: Identifies and ranks 3 to 5 qualified MacroAlloc content opportunities, then stops for explicit human selection. Use for event-driven or evergreen topic discovery, editorial-fit assessment, evidence-feasibility screening, or validation of a user's selection from the active shortlist. Do not use to research, draft, or choose the final topic autonomously.
---

# Discover Content Opportunities

## Preconditions

- Confirm the primary artifact and metadata are in US English.
- Preserve `TOPIC_SELECTED`, the explicit selection evidence, the selected topic, and the locked angle.
- Treat missing mandatory evidence, ambiguous human decisions, and contract mismatches as blocking.
- Never invent a human approval, external fact, source, status, or completed action.

## Workflow

1. Validate editorial scope, timing, available evidence, and content-memory inputs.
2. Build and deduplicate the candidate universe; never pad a weak shortlist.
3. Apply every eligibility gate before scoring eligible candidates.
4. Return 3 to 5 qualified topics with locked angles and evidence risks.
5. Return `AWAITING_USER_SELECTION` and stop the turn.
6. On a later explicit selection from the active shortlist, return `TOPIC_SELECTED` with selection evidence.

## Boundaries

- Upstream producer: A manual request or scheduled editorial discovery trigger.
- Downstream consumer: `research-macro-evidence` after an explicit `TOPIC_SELECTED` handoff.
- Allowed terminal statuses: `AWAITING_USER_SELECTION`, `TOPIC_SELECTED`, `NO_SUITABLE_SHORTLIST`, or `BLOCKED`.
- Keep the public article separate from internal workflow evidence.
- Ask only for information that cannot be retrieved safely from the available artifacts.

## Load references

- Read [references/workflow.md](references/workflow.md) before execution for the complete stage sequence, inputs, and routing rules.
- Read [references/contracts.md](references/contracts.md) whenever validating or emitting structured fields, statuses, versions, handoffs, filenames, or artifacts.
- Read [references/domain-rules.md](references/domain-rules.md) for task-specific editorial, financial, SEO, research, writing, or formatting rules relevant to the request.
- Read [references/quality-and-tests.md](references/quality-and-tests.md) before a terminal decision and when diagnosing failures, gates, regressions, security, or compliance.

## Completion

Return the authorized output, its exact status, material issues, evidence of passed gates, unresolved risks, and the next responsible actor. Do not claim completion without observable evidence.
