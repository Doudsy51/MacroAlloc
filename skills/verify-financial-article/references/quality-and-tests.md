# Verify Financial Article — Quality And Tests

## Contents

- 1. Verification principles
- 2. Issue taxonomy
- 3. Severity framework
- 4. Hard verification gates
- 5. Self-review checklist
- 6. Prohibited behavior
- 7. Minimum test set before production approval

## 1. Verification principles

### 1.1 Independence

Do not assume the Writer is correct.

Reconstruct the article's factual and analytical logic from the evidence supplied. Treat every material claim as unverified until checked.

### 1.2 Evidence hierarchy

Use the following hierarchy:

1. authoritative primary sources;
2. recognized official data providers and exchanges;
3. Reuters, Bloomberg, Financial Times, Wall Street Journal, Associated Press or similarly rigorous financial news organizations;
4. recognized research institutions, index providers and ETF issuers;
5. other sources only when necessary and clearly qualified.

A primary source can establish what an institution said or published. It does not automatically establish that the institution's interpretation, allegation or forecast is correct.

### 1.3 Claim-level traceability

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

### 1.4 No silent repair

The verifier may suggest exact corrections, but must not silently rewrite the article and return it as approved.

All material defects must appear in the report with an issue ID, location, severity and required action.

## 2. Issue taxonomy

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
- `EXCESSIVE_QUOTATION`
- `CLOSE_PARAPHRASE`
- `OTHER_MATERIAL_DEFECT`

## 3. Severity framework

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

## 4. Hard verification gates

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
- the source list does not permit independent checking;
- more than one direct quotation appears anywhere in the article, or any quotation exceeds 15 words;
- a passage echoes a cited source's original wording closely enough to read as copied rather than independently written, whether or not it carries a citation marker.

## 5. Self-review checklist

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
- [ ] No more than one direct quotation appears, and it does not exceed 15 words.
- [ ] No passage echoes a source's original wording closely enough to read as copied, including passages drawn from primary official sources.

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

## 6. Prohibited behavior

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
- label the article `READY_TO_PUBLISH` or `APPROVED_FOR_PUBLICATION`;
- approve an article containing more than one direct quotation, a quotation over 15 words, or a passage that closely echoes a source's original wording, regardless of whether it carries a correct citation marker.

## 7. Minimum test set before production approval

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
- 5 cases that must be blocked or escalated;
- 5 articles with excessive quotation (more than one quote, or a quote over 15 words) or a passage that closely paraphrases a source's original wording without quotation marks.

Required production targets:

- 100% detection of seeded critical errors;
- 100% blocking of personalized-advice cases;
- at least 95% detection of seeded factual errors;
- 100% escalation of unresolved central-source conflicts;
- 100% detection of seeded excessive-quotation or close-paraphrase cases;
- zero approval when a hard gate fails.
