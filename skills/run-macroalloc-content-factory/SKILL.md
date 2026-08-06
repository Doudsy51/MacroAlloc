---
name: run-macroalloc-content-factory
description: Orchestrates the complete US-first MacroAlloc editorial workflow across topic discovery, mandatory human selection, evidence research, writing, verification, discoverability, editorial review, and two-document Word delivery. Use for end-to-end Content Factory runs. Always stop at AWAITING_USER_SELECTION and never bypass human gates, specialist approvals, loop limits, or final validation.
---

# Run MacroAlloc Content Factory

## Preconditions

- Confirm the primary artifact and metadata are produced in US English throughout every stage.
- Create and preserve one `ArticleJob` state per run, including `TOPIC_SELECTED`, the explicit selection evidence, the selected topic, and the locked angle.
- Treat a missing specialist skill, an ambiguous human decision, or a contract mismatch between stages as blocking.
- Never invent a human approval, external fact, source, status, or completed action.

## Workflow

1. Run preflight and preserve one normalized workflow state.
2. Invoke `discover-content-opportunities`; present 3 to 5 topics and stop at `AWAITING_USER_SELECTION`.
3. Resume only after an explicit selection from the active shortlist creates `TOPIC_SELECTED`.
4. Invoke `research-macro-evidence`; require `EVIDENCE_DOSSIER_READY_FOR_WRITING` before the writer.
5. Invoke writer, verifier, discoverability optimizer, and reviewer in order; honor every status and loop limit.
6. Invoke packaging only after `PUBLISH`; require both final DOCX files and integrity evidence.
7. Stop at the human final-validation gate; never claim publication or invent approval.

## Boundaries

- Upstream producer: A user request to run the complete Content Factory.
- Downstream consumer: The human final-validation gate after both DOCX deliverables pass checks.
- Allowed terminal statuses: The normalized specialist statuses plus `AWAITING_USER_SELECTION`, `AWAITING_FINAL_HUMAN_VALIDATION`, `COMPLETED`, or `BLOCKED`.
- Keep the public article separate from internal workflow evidence.
- Ask only for information that cannot be retrieved safely from the available artifacts.

## Load references

- Read [references/workflow.md](references/workflow.md) before execution for the complete stage sequence, inputs, and routing rules.
- Read [references/contracts.md](references/contracts.md) whenever validating or emitting structured fields, statuses, versions, handoffs, filenames, or artifacts.
- Read [references/domain-rules.md](references/domain-rules.md) for task-specific editorial, financial, SEO, research, writing, or formatting rules relevant to the request.
- Read [references/quality-and-tests.md](references/quality-and-tests.md) before a terminal decision and when diagnosing failures, gates, regressions, security, or compliance.

## Completion

Return the authorized output, its exact status, material issues, evidence of passed gates, unresolved risks, and the next responsible actor. Do not claim completion without observable evidence.
