---
name: verify-financial-article
description: Independently verifies a US-English MacroAlloc article against its evidence while preserving the exact human-selected topic and locked angle. Use after write-macro-insight returns DRAFT_READY_FOR_VERIFICATION. Block drafts lacking TOPIC_SELECTED lineage, written in another primary language, or diverging from the selected shortlist item.
metadata:
  version: 1.1.0
  status: TESTING
  owner: MacroAlloc Content Factory
  language: en-US
  content_types:
    - Morning Macro Insight
    - Evening Macro Insight
---

# verify-financial-article

## 0. Workflow invariants

- Require traceable upstream status `TOPIC_SELECTED` and explicit user-selection evidence tied to the preserved shortlist.
- Require the primary article language to be exactly `en-US`.
- Return `BLOCKED` if the topic or angle differs materially from the human-selected topic or locked brief.
- Do not translate, replace, broaden or reselect the topic during verification.
- Preserve these invariants in every revision request and downstream handoff.

## 1. Mission

Independently verify a MacroAlloc financial article before SEO optimization or packaging.

This skill is the factual, analytical, contextual and compliance quality gate between `write-macro-insight` and `optimize-macro-insight-seo`.

It must determine whether the draft:

- is supported by the supplied evidence;
- distinguishes facts, interpretation, uncertainty and scenarios;
- uses defensible macroeconomic and market-transmission logic;
- preserves material context from the research dossier;
- avoids misleading precision, unsupported causality and investment-advice language;
- is internally coherent and complete enough to proceed.

The verifier must not rewrite the whole article, optimize SEO, assemble the final Word package, select a new topic, or declare the content published.

## 2. Position in the workflow

Expected upstream state:

- `DRAFT_READY_FOR_VERIFICATION`
- output from `write-macro-insight`
- complete research dossier and source register
- locked topic, angle and edition

Possible outputs:

- `APPROVED_FOR_SEO`
- `REVISION_REQUIRED`
- `BLOCKED`
- `EDITORIAL_DECISION_REQUIRED`

Required downstream action:

- if `APPROVED_FOR_SEO`: call `optimize-macro-insight-seo`;
- if `REVISION_REQUIRED`: return the structured report to `write-macro-insight` in revision mode;
- if `BLOCKED`: stop the workflow;
- if `EDITORIAL_DECISION_REQUIRED`: request human resolution before any automated continuation.

No publication approval is granted by this skill.

## 3. Inputs

### 3.1 Mandatory inputs

The skill must receive:

- `EDITION`: `Morning` or `Evening`
- `LOCKED_TOPIC`
- `LOCKED_ANGLE`
- `WRITER_OUTPUT`
- `ARTICLE_MARKDOWN`
- `EXECUTIVE_SUMMARY`
- `SOURCE_REGISTER`
- `RESEARCH_DOSSIER`
- `UNCERTAINTIES`
- `DISPUTED_OR_AMBIGUOUS_POINTS`
- `PROHIBITED_CLAIMS`
- `CONTEXT_FACTORS`
- `CAUSAL_PIVOTS`
- `CONTEXT_RECONCILIATION`
- `RECHECK_ITEMS`
- `REVISION_ATTEMPT`: `0`, `1`, or `2`

Where available, also accept:

- source snapshots or extracted passages;
- timestamps for fast-changing claims;
- prior verifier report;
- human editorial instructions;
- market-data calculation notes;
- exact word-count target.

### 3.2 Blocking conditions

Return `BLOCKED` when any of the following prevents reliable verification:

- the article body is missing or materially incomplete;
- the source register is absent;
- the central thesis depends on evidence not supplied;
- a cited source cannot be identified or accessed from the dossier;
- the topic or angle differs materially from the locked brief without approval;
- a core claim relies on an invented, unverifiable or contradictory source;
- a required fresh-data recheck cannot be completed and the claim is central;
- the article contains a serious legal, compliance or personalized-advice issue that cannot be fixed without changing scope;
- the maximum two automatic revision attempts have already been used and material defects remain.

Return `EDITORIAL_DECISION_REQUIRED` when:

- credible sources materially disagree on the central interpretation;
- correcting the article would materially change the locked thesis or angle;
- a claim is technically supportable but editorially misleading without reframing;
- the evidence supports multiple mutually inconsistent narratives and the correct emphasis is a human judgment;
- the article would need a new topic, new evidence set or new legal/compliance position.

## 4. Verification principles

### 4.1 Independence

Do not assume the Writer is correct.

Reconstruct the article's factual and analytical logic from the evidence supplied. Treat every material claim as unverified until checked.

### 4.2 Evidence hierarchy

Use the following hierarchy:

1. authoritative primary sources;
2. verified market or economic data from recognized providers;
3. Reuters, Bloomberg, Financial Times, Wall Street Journal, Associated Press or similarly rigorous financial/news organizations;
4. recognized research institutions, exchanges and official databases;
5. other sources only when clearly qualified.

A primary source can establish what an institution said or published. It does not automatically establish that the institution's interpretation, allegation or forecast is correct.

### 4.3 Claim-level traceability

Every material claim must be linked to one or more source IDs.

Material claims include:

- numbers, dates and market moves;
- policy decisions and official positions;
- quotations and paraphrases;
- historical comparisons;
- causal explanations;
- consensus expectations;
- claims about investor behavior;
- legal, regulatory or institutional statements;
- claims about the significance of an event.

### 4.4 No silent repair

The verifier may suggest exact corrections, but must not silently rewrite the article and return it as approved.

All material defects must appear in the report with an issue ID, location, severity and required action.

## 5. Verification procedure

The verifier must execute the following sequence.

### Step 1 — Validate the input contract

Confirm that all mandatory fields are present and internally consistent.

Check that:

- the edition matches the draft;
- the topic and angle remain locked;
- the article status is `DRAFT_READY_FOR_VERIFICATION`;
- revision attempt is valid;
- source IDs used in the article exist in the source register;
- the executive summary does not introduce facts absent from the article.

### Step 2 — Build the claim ledger

Extract every material claim from:

- H1 and subtitle;
- key takeaways;
- opening paragraphs;
- each H2/H3 section;
- MacroAlloc analysis;
- What to Watch Next;
- executive summary.

Classify each claim as:

- `FACT`;
- `ATTRIBUTED_CLAIM`;
- `CONSENSUS_OR_EXPECTATION`;
- `MACROALLOC_INTERPRETATION`;
- `CAUSAL_INFERENCE`;
- `SCENARIO_OR_FORECAST`;
- `COMPLIANCE_SENSITIVE`.

### Step 3 — Verify facts and calculations

For each factual claim, verify:

- exact value;
- unit;
- currency;
- date and time period;
- denominator or reference base;
- nominal versus real basis;
- seasonally adjusted versus unadjusted basis;
- preliminary versus revised status;
- source identity;
- whether the value is point-in-time, daily close, intraday or period return;
- arithmetic consistency.

Recalculate percentages, basis-point changes, spreads and simple derived metrics when possible.

Do not approve an approximately correct number when the wording implies exactness.

### Step 4 — Verify quotations and official communications

For every direct quote or close paraphrase:

- confirm the speaker or institution;
- confirm the wording or faithful meaning;
- confirm the date and context;
- determine whether the statement represents a formal decision, guidance, personal view, testimony, interview or market interpretation;
- preserve qualifying language.

For central banks, distinguish where relevant between:

- formal target;
- chosen inflation measure;
- strategic framework;
- reaction function;
- current policy guidance;
- market-implied interpretation.

### Step 5 — Verify causal pivots

Review every item in `CAUSAL_PIVOTS` with enhanced scrutiny.

For each pivot:

1. identify the factual premises;
2. identify each logical link;
3. identify the supporting source or accepted mechanism;
4. identify material counter-evidence or alternative interpretation;
5. determine whether the article's certainty level is justified;
6. determine whether the conclusion remains valid if one premise weakens.

Classify each pivot as:

- `SUPPORTED`;
- `SUPPORTED_WITH_QUALIFICATION`;
- `DISPUTED_BUT_FAIRLY_PRESENTED`;
- `INSUFFICIENTLY_SUPPORTED`;
- `MISLEADING_OR_OVERSTATED`.

A plausible mechanism is not proof that it caused a specific observed market move.

### Step 6 — Test alternative interpretations

Search the supplied dossier for credible alternative explanations that could materially affect the article's thesis.

Examples:

- base effects versus durable inflation pressure;
- growth optimism versus short covering;
- policy repricing versus liquidity or positioning;
- supply shock versus demand weakness;
- headline data versus revised or underlying components;
- official explanation versus independent reporting.

The article need not include every alternative. It must include or explicitly acknowledge those that could materially change the interpretation.

Do not manufacture false balance.

### Step 7 — Reconcile source context with the draft

Audit every item in `CONTEXT_RECONCILIATION`.

Confirm that each material source factor is:

- integrated accurately;
- excluded for a defensible reason; or
- escalated for review.

Flag any `SILENT_CONTEXT_LOSS` where a source contains a material qualifier, caveat, temporary factor, contradiction or confounder that disappeared from the article.

Particular attention is required for:

- base effects;
- one-off components;
- revisions;
- seasonal adjustment;
- geopolitical or supply-side confounders;
- divergence between headline and core data;
- interested-party allegations;
- limits of survey or market-implied data;
- disputed official statements.

### Step 8 — Verify market-transmission logic

For each asset or cross-asset implication, identify the explicit mechanism.

Acceptable transmission channels include:

- policy-path repricing;
- real-yield changes;
- term-premium changes;
- credit-spread changes;
- funding or liquidity stress;
- currency-rate differentials;
- earnings or margin effects;
- physical supply constraints;
- demand destruction;
- volatility or positioning effects.

Reject generic statements that list assets without explaining the mechanism.

Do not approve language claiming that an event "drove" or "caused" a market move unless the evidence supports attribution. Prefer "contributed to", "was consistent with", or "coincided with" when attribution is uncertain.

### Step 9 — Check internal consistency

Compare:

- H1 against the article body;
- key takeaways against the evidence;
- introduction against conclusion;
- section-level claims against the central thesis;
- executive summary against the article;
- uncertainty language across sections;
- What to Watch Next against known dates and conditions.

Flag contradictions, scope drift, repeated claims and conclusions that exceed the evidence developed earlier.

### Step 10 — Check editorial completeness

Confirm that the article contains:

- descriptive H1;
- concise subtitle;
- exactly three distinct key takeaways;
- prompt opening answer;
- mechanism-led analysis;
- at least two supported transmission channels where relevant;
- concrete What to Watch Next items;
- complete numbered sources;
- informational disclaimer.

Editorial quality is not a substitute for factual accuracy, but serious structural weakness may require revision.

### Step 11 — Check financial compliance

Flag or block:

- personalized investment advice;
- suitability language;
- direct buy, sell, hold, short or hedge instructions;
- promises or near-certainty of performance;
- undisclosed conflicts;
- statements implying facts are verified when they remain disputed;
- recommendations framed as appropriate for a specific reader;
- unnecessary accusatory or defamatory language;
- material legal or regulatory claims without authoritative support.

Required disclaimer:

> This content is provided for informational purposes only and does not constitute investment advice or a personalized recommendation.

### Step 12 — Check freshness and publication rechecks

For fast-changing claims, determine whether a pre-publication recheck is required.

Typical items include:

- intraday market levels;
- live conflict developments;
- ongoing votes or negotiations;
- provisional data;
- official statements expected shortly;
- trading-session performance before the close;
- policy decisions not yet formally published.

A draft may proceed to SEO with `RECHECK_BEFORE_PUBLICATION = YES` only when the article remains valid if the item changes and the exact recheck is operationally defined.

If the central thesis depends on the unresolved item, return `BLOCKED`.

## 6. Issue taxonomy

Each detected problem must use one primary issue type:

- `UNSUPPORTED_FACT`
- `INCORRECT_FACT`
- `NUMERICAL_ERROR`
- `DATE_OR_PERIOD_ERROR`
- `SOURCE_MISMATCH`
- `SOURCE_QUALITY_WEAKNESS`
- `MISQUOTATION_OR_MISPARAPHRASE`
- `ATTRIBUTION_ERROR`
- `CAUSALITY_OVERSTATEMENT`
- `CAUSAL_CHAIN_GAP`
- `MISSING_COUNTER_INTERPRETATION`
- `SILENT_CONTEXT_LOSS`
- `MACRO_DATA_DECOMPOSITION_MISSING`
- `CENTRAL_BANK_COMMUNICATION_CONFLATION`
- `MISLEADING_HISTORICAL_COMPARISON`
- `GENERIC_MARKET_IMPLICATION`
- `INTERNAL_CONTRADICTION`
- `EXECUTIVE_SUMMARY_DRIFT`
- `THESIS_OR_SCOPE_DRIFT`
- `UNCERTAINTY_UNDERSTATED`
- `FORECAST_PRESENTED_AS_FACT`
- `COMPLIANCE_RISK`
- `DISCLAIMER_MISSING_OR_INCORRECT`
- `FRESHNESS_RECHECK_REQUIRED`
- `EDITORIAL_STRUCTURE_DEFECT`
- `SOURCE_LIST_INCOMPLETE`
- `OTHER_MATERIAL_DEFECT`

## 7. Severity framework

Assign one severity to every issue.

### `CRITICAL`

A defect that invalidates the article, creates serious legal/compliance exposure, or materially misleads the reader.

Examples:

- invented source or quotation;
- materially false central claim;
- personalized investment instruction;
- central thesis built on unsupported evidence;
- unresolved contradiction in authoritative sources.

Required result: `BLOCKED` or `EDITORIAL_DECISION_REQUIRED`.

### `MAJOR`

A material defect that must be corrected before SEO.

Examples:

- unsupported causal pivot;
- important number or date wrong;
- silent loss of a material qualifier;
- meaningful alternative interpretation omitted;
- conclusion stronger than the evidence.

Required result: `REVISION_REQUIRED`.

### `MODERATE`

A non-central but meaningful defect affecting precision, completeness or reader interpretation.

Examples:

- weak attribution;
- missing data decomposition;
- ambiguous market-move timing;
- generic market implication.

Normally requires revision unless it can be resolved through a tightly scoped correction instruction.

### `MINOR`

A limited editorial or presentation issue that does not affect substantive accuracy.

Examples:

- repetitive wording;
- imprecise but non-misleading transition;
- source-list formatting inconsistency.

Minor issues alone do not prevent approval for SEO, but must be recorded for downstream cleanup.

## 8. Scoring model

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

### 8.1 Approval threshold

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

### 8.2 Revision threshold

Return `REVISION_REQUIRED` when defects are correctable without changing the locked topic, angle or source architecture.

### 8.3 Human escalation threshold

Return `EDITORIAL_DECISION_REQUIRED` when automated correction would require a substantive editorial choice.

## 9. Revision instructions

When returning `REVISION_REQUIRED`, produce targeted, executable instructions.

Each instruction must specify:

- issue ID;
- severity;
- exact location;
- problematic claim or passage;
- reason;
- supporting or contradicting source IDs;
- required correction;
- permitted scope of change;
- acceptance test.

Do not use vague instructions such as "add nuance" or "improve accuracy".

Example acceptance test:

> Replace the claim that the data "proved inflation was reaccelerating" with a formulation that distinguishes the headline increase from the three-month core trend, cites sources 2 and 4, and states that one release is insufficient to establish a durable reacceleration.

## 10. AI Review Summary

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

## 11. Output contract

Return a structured object containing every field below.

```yaml
status: APPROVED_FOR_SEO | REVISION_REQUIRED | BLOCKED | EDITORIAL_DECISION_REQUIRED
skill: verify-financial-article
skill_version: 1.1.0
edition: Morning | Evening
language: en-US
locked_topic: string
locked_angle: string
revision_attempt: 0 | 1 | 2
verification_timestamp: string
article_identity:
  h1: string
  working_title: string
  word_count: integer
scores:
  factual_accuracy_score: integer
  source_quality_score: integer
  macro_reasoning_score: integer
  context_completeness_score: integer
  editorial_integrity_score: integer
  compliance_score: integer
  global_verification_score: integer
hard_gates:
  source_traceability_complete: true | false
  central_claims_supported: true | false
  causal_pivots_acceptable: true | false
  context_reconciliation_complete: true | false
  internal_consistency_passed: true | false
  compliance_passed: true | false
  disclaimer_present: true | false
  freshness_plan_defined: true | false
claim_ledger:
  - claim_id: string
    location: string
    claim_text: string
    claim_type: FACT | ATTRIBUTED_CLAIM | CONSENSUS_OR_EXPECTATION | MACROALLOC_INTERPRETATION | CAUSAL_INFERENCE | SCENARIO_OR_FORECAST | COMPLIANCE_SENSITIVE
    source_ids: [integer]
    verification_status: VERIFIED | VERIFIED_WITH_QUALIFICATION | DISPUTED_BUT_FAIRLY_PRESENTED | UNSUPPORTED | INCORRECT | NOT_VERIFIABLE_FROM_INPUTS
    confidence: HIGH | MEDIUM | LOW
    verifier_note: string
causal_pivot_review:
  - pivot_id: string
    pivot_claim: string
    source_ids: [integer]
    premises_verified: true | false
    logical_links:
      - link: string
        status: SUPPORTED | SUPPORTED_WITH_QUALIFICATION | DISPUTED | UNSUPPORTED
        note: string
    counter_interpretation: string | NONE_IDENTIFIED
    classification: SUPPORTED | SUPPORTED_WITH_QUALIFICATION | DISPUTED_BUT_FAIRLY_PRESENTED | INSUFFICIENTLY_SUPPORTED | MISLEADING_OR_OVERSTATED
    required_action: string | NONE
context_audit:
  - context_factor: string
    source_ids: [integer]
    writer_disposition: string
    verifier_status: CONFIRMED | DISPOSITION_REJECTED | SILENT_CONTEXT_LOSS | REQUIRES_HUMAN_REVIEW
    note: string
issues:
  - issue_id: string
    issue_type: string
    severity: CRITICAL | MAJOR | MODERATE | MINOR
    location: string
    passage: string
    explanation: string
    source_ids: [integer]
    required_correction: string
    permitted_scope: string
    acceptance_test: string
alternative_interpretations:
  - interpretation: string
    source_ids: [integer]
    materiality: HIGH | MEDIUM | LOW
    treatment_in_article: ADEQUATE | INADEQUATE | NOT_REQUIRED
    note: string
recheck_before_publication:
  required: YES | NO
  items:
    - item: string
      reason: string
      deadline_or_trigger: string
      blocking_if_unresolved: true | false
ai_review_summary:
  strengths:
    - string
  residual_risks:
    - string
  factual_confidence: HIGH | MEDIUM | LOW
  macro_reasoning_confidence: HIGH | MEDIUM | LOW
  context_completeness_confidence: HIGH | MEDIUM | LOW
  compliance_confidence: HIGH | MEDIUM | LOW
  human_review_focus:
    - string
  workflow_decision: APPROVED_FOR_SEO | REVISION_REQUIRED | BLOCKED | EDITORIAL_DECISION_REQUIRED
revision_instructions:
  - issue_id: string
    instruction: string
    acceptance_test: string
resolved_prior_issues:
  - prior_issue_id: string
    status: RESOLVED | PARTIALLY_RESOLVED | UNRESOLVED
    note: string
downstream_actions:
  - optimize-macro-insight-seo | write-macro-insight | HUMAN_EDITORIAL_REVIEW | STOP_WORKFLOW
```

Use explicit empty arrays where no item exists. Never silently omit a required field.

## 12. Decision rules

### 12.1 `APPROVED_FOR_SEO`

Return only when every approval threshold is met.

Downstream action:

```yaml
downstream_actions:
  - optimize-macro-insight-seo
```

### 12.2 `REVISION_REQUIRED`

Return when all material issues are correctable within the locked scope and revision attempt is below 2.

Downstream action:

```yaml
downstream_actions:
  - write-macro-insight
```

### 12.3 `BLOCKED`

Return when verification cannot reliably continue or a critical defect invalidates the draft.

Downstream action:

```yaml
downstream_actions:
  - STOP_WORKFLOW
```

### 12.4 `EDITORIAL_DECISION_REQUIRED`

Return when a human decision is needed on thesis, scope, disputed evidence or compliance framing.

Downstream action:

```yaml
downstream_actions:
  - HUMAN_EDITORIAL_REVIEW
```

## 13. Hard verification gates

The skill must not return `APPROVED_FOR_SEO` if any of the following is true:

- a factual claim central to the thesis is unsupported or incorrect;
- a source marker points to a non-matching source;
- a central causal pivot is insufficiently supported;
- a material counter-interpretation is omitted;
- material source context disappeared silently;
- a forecast is presented as a fact;
- a market move is attributed to one cause without adequate evidence;
- the executive summary is stronger than the article;
- the title overstates the evidence;
- a critical or major issue exists;
- an unresolved moderate issue could affect reader interpretation;
- the disclaimer is missing or altered materially;
- personalized advice or transaction instructions appear;
- a required fresh-data check is undefined;
- the article's topic or angle drifted materially;
- the source list does not permit independent checking.

## 14. Self-review checklist

Before returning the report, verify:

### Inputs and traceability

- [ ] All mandatory inputs are present.
- [ ] Every article source marker maps to the source register.
- [ ] Every material claim appears in the claim ledger.
- [ ] Every issue has an exact location and source basis.

### Facts and sources

- [ ] Numbers, units, dates and periods were checked.
- [ ] Quotes and paraphrases preserve context.
- [ ] Interested-party claims remain attributed.
- [ ] Source quality is appropriate to claim importance.

### Reasoning

- [ ] Every central causal pivot was tested link by link.
- [ ] Plausible correlation was not treated as demonstrated causation.
- [ ] Material alternatives were considered.
- [ ] Market implications use specific mechanisms.

### Context

- [ ] Source-to-draft reconciliation was audited.
- [ ] No material qualifier disappeared silently.
- [ ] Macro data were checked for base effects, revisions and temporary components.
- [ ] Central-bank communications were classified precisely.

### Coherence and compliance

- [ ] H1, takeaways, article and executive summary agree.
- [ ] Facts, analysis, expectations and scenarios are distinguishable.
- [ ] The disclaimer is present.
- [ ] No personalized advice or guarantee appears.

### Workflow

- [ ] Status matches the decision rules.
- [ ] Scores do not override hard gates.
- [ ] Revision instructions are specific and testable.
- [ ] Downstream action is valid.
- [ ] The verifier has not declared the article published or publication-ready.

## 15. Prohibited behavior

The verifier must never:

- invent a source, URL, quote, data point or correction;
- approve a claim merely because it sounds plausible;
- rely on unsupplied memory when the dossier should contain the evidence;
- replace an interested-party claim with an unattributed fact;
- hide disagreement between credible sources;
- rewrite the entire article instead of issuing a structured report;
- change the locked topic, angle or edition;
- perform SEO optimization;
- generate the final Word package;
- publish or schedule the article;
- use a high score to bypass a failed hard gate;
- label the article `READY_TO_PUBLISH` or `APPROVED_FOR_PUBLICATION`.

## 16. Compatibility with the MacroAlloc Article Package

The following verifier outputs are mandatory inputs to the future `.docx` Article Package:

- score table;
- hard-gate results;
- claim ledger or a summarized fact-check table;
- causal-pivot review;
- context audit;
- issue list;
- alternative interpretations;
- recheck requirements;
- AI Review Summary;
- verifier version and timestamp.

The package generator may format or summarize these outputs, but must not alter the verifier's decision or hide unresolved issues.

## 17. Minimum test set before production approval

This skill remains in `TESTING` until it passes at least:

- 10 straightforward, well-sourced macro articles;
- 10 articles with ambiguous causality;
- 5 articles with conflicting credible sources;
- 5 articles containing revised or provisional data;
- 5 articles with interested-party claims;
- 5 articles containing deliberate numerical or date errors;
- 5 articles with silent context loss;
- 5 compliance-sensitive articles;
- 5 revision-loop tests;
- 5 cases that must be blocked or escalated.

Required production targets:

- 100% detection of seeded critical errors;
- 100% blocking of personalized-advice cases;
- at least 95% detection of seeded factual errors;
- 100% escalation of unresolved central-source conflicts;
- zero approval when a hard gate fails.
