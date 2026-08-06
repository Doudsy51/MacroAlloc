# Write Macro Insight — Workflow

## Contents

- 1. Mission
- 2. Position in the workflow
- 3. Inputs
- 4. Revision mode

## 1. Mission

Produce or revise a publication-quality MacroAlloc Macro Insight in US English from a locked, human-selected topic brief and an evidence-backed research dossier.

The skill is responsible for editorial drafting only. It must create a complete, traceable article draft that can be independently verified by `verify-financial-article`, then optimized by `optimize-content-discoverability`.

It must never claim that an article is publishable, approved, verified, or ready for publication.

## 2. Position in the workflow

Expected upstream state:

- `EVIDENCE_DOSSIER_READY_FOR_WRITING`
- preserved `TOPIC_SELECTED` lineage and selection evidence
- a locked Morning or Evening edition
- a fixed topic and angle chosen by the user
- an evidence dossier containing sources, confirmed facts, uncertainties, disputed points, relevant context, and prohibited claims

Required downstream state:

- `DRAFT_READY_FOR_VERIFICATION`

Valid modes:

- `DRAFT`: initial article, `REVISION_ATTEMPT = 0`
- `REVISION`: targeted correction of an existing draft after a verifier report, `REVISION_ATTEMPT = 1` or `2`

No third automatic revision is allowed.

## 3. Inputs

### 3.1 Mandatory inputs

The skill must receive all of the following:

- `EDITION`: `Morning` or `Evening`
- `UPSTREAM_STATUS`: exactly `EVIDENCE_DOSSIER_READY_FOR_WRITING`
- `SELECTION_EVIDENCE`: the user's explicit shortlist number, `OPPORTUNITY_ID`, or exact title
- `SELECTED_TOPIC_ID`: matching an item in the preserved shortlist
- `PRIMARY_LANGUAGE`: exactly `en-US`
- `MODE`: `DRAFT` or `REVISION`
- `REVISION_ATTEMPT`: `0`, `1`, or `2`
- `LOCKED_TOPIC`
- `LOCKED_ANGLE`
- `WORKING_TITLE`
- `MACROALLOC_THESIS`
- `TRANSMISSION_CHANNELS`: two to four mechanisms
- `RESEARCH_DOSSIER`
- `SOURCE_REGISTER`
- `UNCERTAINTIES`
- `DISPUTED_OR_AMBIGUOUS_POINTS`
- `PROHIBITED_CLAIMS`
- `CONTEXT_FACTORS`
- `RECHECK_ITEMS`

For `REVISION`, also require:

- `EXISTING_DRAFT`
- `VERIFIER_REPORT`
- exact issue locations and correction instructions

### 3.2 Blocking conditions

Return `BLOCKED` without drafting when:

- `UPSTREAM_STATUS` is not exactly `EVIDENCE_DOSSIER_READY_FOR_WRITING`;
- explicit `SELECTION_EVIDENCE` is missing, ambiguous, or does not match `SELECTED_TOPIC_ID`;
- the selected topic is absent from the preserved shortlist;
- `PRIMARY_LANGUAGE` is not exactly `en-US`;
- the edition is missing or ambiguous;
- the topic or angle is not locked;
- the evidence dossier is materially incomplete;
- the core thesis cannot be supported by the available evidence;
- fewer than two credible independent sources support the central factual basis, unless one authoritative primary source is corroborated by one independent financial source;
- a requested revision would require inventing evidence or overriding the verifier;
- the content cannot be written without unsubstantiated accusation, personalized investment advice, a transaction instruction, or a promise of performance.

When blocked, state only the missing or conflicting inputs required to continue.

## 4. Revision mode

In `REVISION` mode:

- preserve all verified content not identified for correction;
- modify only the passages necessary to resolve the verifier’s issues and any directly affected transitions;
- do not introduce new facts unless they are supported and explicitly required by the verifier;
- do not silently change the thesis, source set, certainty level or article scope;
- produce a precise revision summary mapping each verifier issue to the change made;
- return unresolved conflicts explicitly;
- never override a `BLOCKED` verifier decision.

If the requested correction changes the locked topic or angle materially, return `EDITORIAL_DECISION_REQUIRED`.
