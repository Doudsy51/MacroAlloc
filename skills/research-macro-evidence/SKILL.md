---
name: research-macro-evidence
description: Builds a traceable macroeconomic and market evidence dossier for one explicitly selected MacroAlloc topic before drafting. Use after TOPIC_SELECTED to retrieve and reconcile current sources, confirmed facts, data series, causal pivots, uncertainty, counter-interpretations, and prohibited claims. Do not select a topic, write the article, verify the final draft, or proceed without selection evidence.
---

# Research Macro Evidence

## Preconditions

- Require `TOPIC_SELECTED`, the active shortlist, explicit selection evidence, selected topic ID, locked topic, and locked angle.
- Require US English as the primary workflow language and preserve the US target market.
- Use current, traceable evidence; never invent a source, fact, quotation, data point, or retrieval result.
- Treat unavailable research tools, missing selection lineage, and irreconcilable identity conflicts as blocking.

## Workflow

1. Validate selection lineage and the selected research plan.
2. Retrieve the planned primary sources first, then add credible secondary sources only where useful.
3. Record provenance, publication time, retrieval time, scope, limitations, and freshness for every source.
4. Reconcile facts, revisions, base effects, definitions, quotations, causal pivots, and competing interpretations.
5. Build the source register, evidence ledger, context factors, uncertainty register, recheck list, and prohibited-claims list.
6. Run the evidence gates and return `EVIDENCE_DOSSIER_READY_FOR_WRITING` only when the writer can use the dossier without inventing missing support.

## Boundaries

- Upstream producer: `discover-content-opportunities` with `TOPIC_SELECTED` and a selected research plan.
- Downstream consumer: `write-macro-insight` with `EVIDENCE_DOSSIER_READY_FOR_WRITING`.
- Allowed terminal statuses: `EVIDENCE_DOSSIER_READY_FOR_WRITING`, `RESEARCH_REVISION_REQUIRED`, `EDITORIAL_DECISION_REQUIRED`, or `BLOCKED`.
- Do not draft article prose beyond short evidence summaries and exact handoff fields.
- Do not treat the dossier as independent verification of the later article.

## Load references

- Read [references/workflow.md](references/workflow.md) before research.
- Read [references/contracts.md](references/contracts.md) when validating or emitting the evidence dossier.
- Read [references/domain-rules.md](references/domain-rules.md) for source hierarchy, freshness, causal reasoning, and financial-content rules.
- Read [references/quality-and-tests.md](references/quality-and-tests.md) before returning a terminal status.

## Completion

Return the canonical status, lineage object, complete dossier, unresolved evidence gaps, recheck requirements, and next responsible actor. Stop instead of weakening evidence gates to meet a deadline.

