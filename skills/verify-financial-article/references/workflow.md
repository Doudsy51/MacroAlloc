# Verify Financial Article — Workflow

## Contents

- 1. Mission
- 2. Position in the workflow
- 3. Inputs
- 4. Verification procedure
- 5. Revision instructions

## 1. Mission

Independently verify a MacroAlloc financial article before SEO optimization or packaging.

This skill is the factual, analytical, contextual and compliance quality gate between `write-macro-insight` and `optimize-content-discoverability`.

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

- if `APPROVED_FOR_SEO`: call `optimize-content-discoverability`;
- if `REVISION_REQUIRED`: return the structured report to `write-macro-insight` in revision mode;
- if `BLOCKED`: stop the workflow;
- if `EDITORIAL_DECISION_REQUIRED`: request human resolution before any automated continuation.

No publication approval is granted by this skill.

## 3. Inputs

### 3.1 Mandatory inputs

The skill must receive:

- `UPSTREAM_STATUS`: exactly `DRAFT_READY_FOR_VERIFICATION`
- `SHORTLIST_ID`
- `SELECTED_TOPIC_ID`
- `SELECTION_EVIDENCE`
- `DRAFT_VERSION`
- `LANGUAGE`: exactly `en-US`
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

## 4. Verification procedure

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

## 5. Revision instructions

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
