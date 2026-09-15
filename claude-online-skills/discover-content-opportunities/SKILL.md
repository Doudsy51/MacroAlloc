---
name: discover-content-opportunities
description: Identifies and ranks 3 to 5 qualified MacroAlloc content opportunities for each of three regional focuses (US, Europe, Asia), then stops for explicit human selection of one topic per region. Use for event-driven or evergreen topic discovery, editorial-fit assessment, evidence-feasibility screening, or validation of a user's selection from an active shortlist. Do not use to research, draft, or choose the final topic autonomously.
---

# Discover Content Opportunities

## Preconditions

- Confirm the primary output language is US English; evaluate candidates independently for each of the three configured regional focuses (US, Europe, Asia).
- Require the editorial categories, frequency rules, and target publication window before building a shortlist.
- In selection-confirmation mode, accept a choice only when it exactly matches one option from the immediately preceding `AWAITING_USER_SELECTION` shortlist, for each region being confirmed.
- Never invent a source, trend signal, audience metric, or completed action.

## Workflow

1. Validate editorial scope, timing, available evidence, and content-memory inputs.
2. Build and deduplicate the candidate universe; tag each candidate with its region (US, Europe, or Asia) using its geography.
3. Apply every eligibility gate before scoring eligible candidates, independently per region; never pad a weak shortlist in any region.
4. Return 3 to 5 qualified topics per region with locked angles and evidence risks. A region with fewer than 3 qualified candidates returns its own `NO_SUITABLE_SHORTLIST` note without blocking the other regions.
5. Return `AWAITING_USER_SELECTION` and stop the turn.
6. On a later explicit selection from the active shortlists, return `TOPIC_SELECTED` for each region the user selected, each with its own selection evidence.

## Boundaries

- Upstream producer: A manual request or scheduled editorial discovery trigger.
- Downstream consumer: `research-macro-evidence` after an explicit `TOPIC_SELECTED` handoff.
- Allowed terminal statuses: `AWAITING_USER_SELECTION`, `TOPIC_SELECTED`, `NO_SUITABLE_SHORTLIST`, or `BLOCKED`.
- Never treat ranking, score, urgency, or a request to run the full workflow as human selection.
- Ask only for information that cannot be retrieved safely from the available artifacts.

## Load references

- Read [references/workflow.md](references/workflow.md) before execution for the complete stage sequence, inputs, and routing rules.
- Read [references/contracts.md](references/contracts.md) whenever validating or emitting structured fields, statuses, versions, handoffs, filenames, or artifacts.
- Read [references/domain-rules.md](references/domain-rules.md) for task-specific editorial, financial, SEO, research, writing, or formatting rules relevant to the request.
- Read [references/quality-and-tests.md](references/quality-and-tests.md) before a terminal decision and when diagnosing failures, gates, regressions, security, or compliance.

## Completion

Return the authorized output, its exact status, material issues, evidence of passed gates, unresolved risks, and the next responsible actor. Do not claim completion without observable evidence.
