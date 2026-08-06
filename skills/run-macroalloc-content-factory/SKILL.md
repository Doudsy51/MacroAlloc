---
name: run-macroalloc-content-factory
description: Orchestrates the complete MacroAlloc editorial workflow, producing up to three regional articles per run (US, Europe, Asia) across topic discovery, mandatory human selection, evidence research, writing, verification, discoverability, editorial review, and two-document Word delivery. Runs each selected region's production sequentially with its own isolated state and its own final validation. Use for end-to-end Content Factory runs. Always stop at AWAITING_USER_SELECTION and never bypass human gates, specialist approvals, loop limits, or final validation.
---

# Run MacroAlloc Content Factory

## Preconditions

- Confirm the primary artifact and metadata are produced in US English throughout every stage, for every region.
- Create and preserve one `ArticleJob` state **per region** (US, Europe, Asia), each with its own `TOPIC_SELECTED`, explicit selection evidence, selected topic, locked angle, and revision-loop counters. Never share, sum, or let one region's state affect another's.
- Treat a missing specialist skill, an ambiguous human decision, or a contract mismatch between stages as blocking for the affected region only.
- Never invent a human approval, external fact, source, status, or completed action.

## Workflow

1. Run preflight and preserve one normalized workflow state that tracks all three regions.
2. Invoke `discover-content-opportunities` once; present 3 to 5 topics per region (US, Europe, Asia) and stop at `AWAITING_USER_SELECTION`.
3. Resume only after explicit selections from the active shortlists create `TOPIC_SELECTED` for one or more regions. A region left unaddressed simply stays pending; it does not block the regions that were selected.
4. For each region with `TOPIC_SELECTED`, **in sequence — US, then Europe, then Asia** — run that region's full production to completion before starting the next region: invoke `research-macro-evidence`, then writer, verifier, discoverability optimizer, and reviewer in order, honoring every status and loop limit **for that region alone**.
5. Invoke packaging for that region only after `PUBLISH`; require both final DOCX files and integrity evidence.
6. Stop at that region's own human final-validation gate before starting the next region; never claim publication or invent approval.

## Boundaries

- Upstream producer: A user request to run the complete Content Factory.
- Downstream consumer: Each region's own human final-validation gate after its two DOCX deliverables pass checks.
- Allowed terminal statuses: The normalized specialist statuses plus `AWAITING_USER_SELECTION`, `AWAITING_FINAL_HUMAN_VALIDATION` (per region), `COMPLETED` (per region), or `BLOCKED` (per region).
- Keep the public article separate from internal workflow evidence, for every region.
- One region reaching `BLOCKED`, `REJECT`, or a loop-limit escalation must never stop or alter the other regions' independent progress.
- Ask only for information that cannot be retrieved safely from the available artifacts.

## Load references

- Read [references/workflow.md](references/workflow.md) before execution for the complete stage sequence, inputs, and routing rules.
- Read [references/contracts.md](references/contracts.md) whenever validating or emitting structured fields, statuses, versions, handoffs, filenames, or artifacts.
- Read [references/domain-rules.md](references/domain-rules.md) for task-specific editorial, financial, SEO, research, writing, or formatting rules relevant to the request.
- Read [references/quality-and-tests.md](references/quality-and-tests.md) before a terminal decision and when diagnosing failures, gates, regressions, security, or compliance.

## Completion

Return the authorized output, its exact status, material issues, evidence of passed gates, unresolved risks, and the next responsible actor. Do not claim completion without observable evidence.
