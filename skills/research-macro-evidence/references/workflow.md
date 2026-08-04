# Research Macro Evidence — Workflow

## Contents

- Inputs
- Research sequence
- Blocking and routing

## Inputs

Require:

- upstream status `TOPIC_SELECTED`;
- shortlist ID and selected topic ID;
- exact human-selection evidence;
- locked topic, locked angle, target audience, content type, edition, and publication window;
- selected research plan, planned sources, questions, uncertainties, and prohibited claims;
- approved source policy and current date/time.

Optional inputs include content memory, editorial calendar, existing internal research, relevant data-series identifiers, and previous dossiers. Optional inputs must not be invented.

## Research sequence

1. Confirm the selected topic belongs to the preserved shortlist.
2. Expand the selected research plan into claim and question records.
3. Retrieve primary official sources and record retrieval evidence.
4. Retrieve credible secondary sources for context, interpretation, or dispute mapping.
5. Normalize units, dates, release periods, revisions, definitions, and jurisdictions.
6. Extract confirmed facts, attributed claims, expectations, uncertainty, and source limitations.
7. Test causal pivots and document alternative explanations without forcing false balance.
8. Reconcile central-bank communication, macro-data components, market reactions, and historical comparisons when relevant.
9. Mark every planned question as answered, partially answered, unanswered, or not applicable.
10. Run freshness, diversity, completeness, traceability, and writer-readiness gates.

## Blocking and routing

- Return `BLOCKED` for missing lineage, unavailable mandatory sources, corrupted evidence, or inability to distinguish current facts from stale material.
- Return `RESEARCH_REVISION_REQUIRED` when targeted retrieval or reconciliation can close material gaps.
- Return `EDITORIAL_DECISION_REQUIRED` when credible evidence invalidates the locked angle, multiple supportable narratives require a human choice, or publication timing conflicts with evidence quality.
- Return `EVIDENCE_DOSSIER_READY_FOR_WRITING` only when all material claims planned for the article have usable support or explicit prohibitions.

