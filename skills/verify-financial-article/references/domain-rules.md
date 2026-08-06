# Verify Financial Article — Domain Rules

## Contents

- 1. Workflow invariants
- 2. Scoring model
- 3. AI Review Summary
- 4. Decision rules

## 1. Workflow invariants

- Require traceable upstream status `TOPIC_SELECTED` and explicit user-selection evidence tied to the preserved shortlist.
- Require the primary article language to be exactly `en-US`.
- Return `BLOCKED` if the topic or angle differs materially from the human-selected topic or locked brief.
- Do not translate, replace, broaden or reselect the topic during verification.
- Preserve these invariants in every revision request and downstream handoff.

## 2. Scoring model

Produce six component scores from 0 to 100:

- `factual_accuracy_score`
- `source_quality_score`
- `macro_reasoning_score`
- `context_completeness_score`
- `editorial_integrity_score`
- `compliance_score`

Calculate the global verification score using:

- factual accuracy: 30%
- source quality: 15%
- macro reasoning: 20%
- context completeness: 15%
- editorial integrity: 10%
- compliance: 10%

A high average cannot override a hard gate.

### 2.1 Approval threshold

`APPROVED_FOR_SEO` requires:

- global score at least 90;
- factual accuracy at least 95;
- compliance score 100;
- no `CRITICAL`, `MAJOR` or unresolved `MODERATE` issue;
- every central causal pivot classified at least `SUPPORTED_WITH_QUALIFICATION`;
- context reconciliation complete;
- all mandatory sources identifiable;
- no thesis drift;
- no unresolved contradiction;
- recheck requirements operationally defined.

### 2.2 Revision threshold

Return `REVISION_REQUIRED` when defects are correctable without changing the locked topic, angle or source architecture.

### 2.3 Human escalation threshold

Return `EDITORIAL_DECISION_REQUIRED` when automated correction would require a substantive editorial choice.

## 3. AI Review Summary

The verifier must generate a concise review summary for the future MacroAlloc Article Package.

It must include:

- strongest verified qualities;
- principal residual risks;
- factual confidence;
- macro-reasoning confidence;
- context-completeness confidence;
- compliance confidence;
- required human-review focus;
- current workflow decision.

Use only these confidence labels:

- `HIGH`
- `MEDIUM`
- `LOW`

The AI Review Summary must not call the article "published", "approved for publication" or "ready to publish". The maximum positive status at this stage is `APPROVED_FOR_SEO`.

## 4. Decision rules

### 4.1 `APPROVED_FOR_SEO`

Return only when every approval threshold is met.

Downstream action:

```yaml
downstream_actions:
  - optimize-content-discoverability
```

### 4.2 `REVISION_REQUIRED`

Return when all material issues are correctable within the locked scope and revision attempt is below 2.

Downstream action:

```yaml
downstream_actions:
  - write-macro-insight
```

### 4.3 `BLOCKED`

Return when verification cannot reliably continue or a critical defect invalidates the draft.

Downstream action:

```yaml
downstream_actions:
  - STOP_WORKFLOW
```

### 4.4 `EDITORIAL_DECISION_REQUIRED`

Return when a human decision is needed on thesis, scope, disputed evidence or compliance framing.

Downstream action:

```yaml
downstream_actions:
  - HUMAN_EDITORIAL_REVIEW
```
