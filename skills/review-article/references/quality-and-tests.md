# Review Article — Quality And Tests

## Contents

- 1. Core operating principles
- 2. Issue taxonomy
- 3. Mandatory quality gates
- 4. Regression checks
- 5. Acceptance-test examples
- 6. Final rule

## 1. Core operating principles

### 1.1 Independent editorial judgment

Do not assume that the Writer, Verifier or Discoverability skill is correct merely because an upstream state says it passed.

Review the final reader-facing article independently.

Use upstream reports as evidence and constraints, not as substitutes for judgment.

### 1.2 No duplication of upstream responsibilities

This skill must not repeat full factual verification or rebuild the SEO package.

It may identify a suspected factual, compliance or discoverability issue when it is visible in the final article, but it must route the issue to the relevant upstream skill.

Examples:

- suspected unsupported number → route to `verify-financial-article`;
- misleading meta title → route to `optimize-content-discoverability`;
- weak causal explanation → route to `write-macro-insight` unless the verifier already identified it;
- broken article-package field → route to the workflow/package builder.

### 1.3 Reader-first standard

The article must serve the reader before it serves the workflow.

Reject editorial changes that make the article:

- more repetitive;
- more generic;
- more promotional;
- more difficult to read;
- less precise;
- less nuanced;
- less useful;
- more obviously AI-generated.

### 1.4 MacroAlloc brand standard

The final article must feel recognizably MacroAlloc:

- macro-first;
- mechanism-led;
- cross-asset aware;
- evidence-based;
- educational;
- neutral in tone;
- explicit about uncertainty;
- internationally understandable;
- useful to informed retail and professional readers;
- free from hype, sensationalism and personalized investment advice.

### 1.5 No silent repair

The reviewer may make limited copy edits only when explicitly authorized by the workflow.

Otherwise, it must not silently rewrite the article and return it as approved.

Every material issue must be recorded with:

- issue ID;
- severity;
- location;
- problem;
- reader impact;
- required action;
- responsible upstream skill;
- acceptance test.

### 1.6 Proportionality

Do not block publication for cosmetic preferences.

Differentiate between:

- defects that harm accuracy, meaning, trust or usefulness;
- weaknesses that reduce quality but remain publishable;
- optional improvements with low marginal value.

The review must be demanding without becoming perfectionistic or arbitrary.

## 2. Issue taxonomy

Use the following issue categories:

- `ED_STRUCTURE` — structural coherence;
- `ED_FLOW` — transitions and progression;
- `ED_CLARITY` — ambiguity or unclear wording;
- `ED_REDUNDANCY` — repetition or padding;
- `ED_OPENING` — weak introduction;
- `ED_CONCLUSION` — weak or generic conclusion;
- `ED_PROMISE` — title/body mismatch;
- `ED_READER_QUESTION` — unresolved high-value question;
- `ED_EDUCATION` — insufficient explanation;
- `ED_INSIGHT` — generic or shallow analysis;
- `ED_OBJECTIVITY` — loaded or unbalanced language;
- `ED_UNCERTAINTY` — poor calibration;
- `ED_COGNITIVE_LOAD` — excessive complexity;
- `ED_JARGON` — unexplained terminology;
- `ED_BRAND` — MacroAlloc voice mismatch;
- `ED_AI_PATTERN` — formulaic machine-like phrasing;
- `ED_ORIGINALITY` — insufficient added value;
- `ED_PACKAGE` — incomplete content package;
- `ED_DISCOVERABILITY` — unnatural or misleading optimization;
- `ED_COMPLIANCE_SIGNAL` — suspected advice or sensitive formulation;
- `ED_FACT_SIGNAL` — suspected factual inconsistency requiring verifier review;
- `ED_METADATA` — misleading or inconsistent metadata.

Severity levels:

- `CRITICAL` — publication must stop;
- `MAJOR` — material revision required;
- `MODERATE` — correction required before publication;
- `MINOR` — small improvement required or strongly recommended;
- `OPTIONAL` — useful but not required.

## 3. Mandatory quality gates

All mandatory gates must pass for `PUBLISH`.

### Gate 1 — Upstream integrity

Pass only if:

- factual verification is approved;
- discoverability optimization is approved;
- no unresolved hard-gate issue remains.

### Gate 2 — Editorial promise

Pass only if:

- the article fulfills the promise created by its title, dek, opening and metadata.

### Gate 3 — Central thesis coherence

Pass only if:

- the thesis remains consistent throughout;
- evidence, implications and conclusion align.

### Gate 4 — Reader-question completeness

Pass only if:

- all high-priority questions within scope are fully or sufficiently answered.

### Gate 5 — Insight threshold

Pass only if:

- insight quality is at least `ADEQUATE`;
- Macro Insights and Market Analysis require at least `STRONG` unless the human editor explicitly approves a purely explanatory angle.

### Gate 6 — Educational value

Pass only if:

- the article explains the key mechanism rather than merely reporting events.

### Gate 7 — Objectivity and uncertainty

Pass only if:

- facts, interpretation and scenarios remain distinguishable;
- material uncertainty is preserved;
- no sensationalism or unsupported certainty remains.

### Gate 8 — Cognitive load

Pass only if:

- cognitive load is not `EXCESSIVE`;
- essential jargon is explained or contextually clear.

### Gate 9 — Conclusion quality

Pass only if:

- the conclusion synthesizes, conditions and points forward;
- it is not generic or duplicative.

### Gate 10 — Brand consistency

Pass only if:

- the article meets MacroAlloc tone and positioning standards.

### Gate 11 — Metadata fidelity

Pass only if:

- metadata and distribution copy accurately represent the article.

### Gate 12 — Compliance signal

Pass only if:

- no visible personalized-advice, performance-promise or transaction-instruction language remains.

### Gate 13 — Package completeness

Pass only if:

- all mandatory article-package components required at this stage are present.

### Gate 14 — Human writing score

Pass only if:

- `human_writing_score` (Section 2.11 of domain-rules.md, rubric-based, computed by `review-article` only) is `80` or higher.

### Gate 15 — No em dash

Pass only if:

- `em_dash_count` is exactly `0`. No minimum-instance exception; this gate is independent of Gate 14 and of every other score.

## 4. Regression checks

When a previous version exists, verify that revisions did not:

- remove a verified material fact;
- weaken a required uncertainty statement;
- change the locked angle;
- alter a causal relationship;
- create a metadata mismatch;
- introduce new repetition;
- degrade readability;
- remove a necessary source reference;
- change the disclaimer;
- introduce advice language.

Record every regression check as `PASS`, `FAIL` or `NOT_APPLICABLE`.

## 5. Acceptance-test examples

Bad issue:

> The conclusion is weak.

Good issue:

> `ED-014 — MAJOR — Conclusion, paragraphs 2–3`: The conclusion repeats the opening market summary but does not state which observable conditions would confirm or weaken the article's thesis. Add a conditional synthesis linking inflation persistence, the next policy meeting and the relevant rate-market indicator. Acceptance test: the revised conclusion contains one confirmation condition, one invalidation condition and no personalized investment instruction.

Bad issue:

> The article is too technical.

Good issue:

> `ED-021 — MODERATE — Section “Term Premium and the Long End”`: The section introduces term premium, duration supply and real-rate decomposition within two paragraphs without defining term premium. Add a one-sentence definition before the decomposition and split the second paragraph. Acceptance test: a non-specialist can identify what term premium represents and why it matters for long-dated yields.

## 6. Final rule

The reviewer exists to protect reader trust and the MacroAlloc brand.

It must not approve an article because the workflow is complete, the deadline is near, or the average score is high.

It must approve only when the complete article is accurate enough upstream, editorially coherent, meaningfully useful, recognizably MacroAlloc and ready to enter the final packaging stage.

End of Skill.
