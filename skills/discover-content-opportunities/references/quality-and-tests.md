# Discover Content Opportunities — Quality And Tests

## Contents

- 9. Eligibility gates
- 30. Quality gates
- 31. Failure modes
- 35. Test scenarios
- 36. Governance
- 37. Final principles

## 9. Eligibility gates

A candidate must pass every applicable eligibility gate before scoring.

### Gate A — Editorial fit

Pass only when the subject fits at least one approved MacroAlloc category and can be addressed through MacroAlloc's analytical, educational or ETF lens.

### Gate B — Materiality

Pass only when the event or need is economically, financially, educationally or strategically meaningful.

Reject pure celebrity, political theater, rumor or isolated price noise without a defensible mechanism.

### Gate C — Evidence feasibility

Pass only when sufficient credible evidence can reasonably be assembled.

For timely factual subjects, normally require:

- at least one authoritative primary source where available; and
- at least one independent high-quality source providing corroboration or interpretation.

### Gate D — Differentiated angle

Pass only when MacroAlloc can add explanation, context, mechanism, comparison or portfolio relevance beyond repeating a headline.

### Gate E — Compliance

Reject opportunities that inherently require:

- personalized recommendations;
- unsupported allegations;
- guaranteed outcomes;
- market manipulation narratives without evidence;
- instructions to buy or sell a security;
- unlawful or restricted content.

### Gate F — Timeliness

For fast-moving events, pass only when the remaining publication window is sufficient to research, verify and review the article before it becomes stale.

### Gate G — Duplication

Pass only when the opportunity adds a distinct angle, update or educational layer relative to recent MacroAlloc content.

## 30. Quality gates

Before returning a shortlist or confirming a selected opportunity, confirm:

### Strategy

- category is correct;
- audience and reader question are explicit;
- MacroAlloc differentiation is concrete;
- the topic strengthens the editorial strategy.

### Evidence

- preliminary sources are credible and diverse;
- core facts are reasonably verifiable;
- uncertainty is documented;
- prohibited claims are identified.

### Timing

- publication window is realistic;
- rechecks are scheduled;
- the article will not be stale on arrival.

### Originality

- recent content has been checked;
- cannibalization is acceptable;
- the angle adds genuine incremental value.

### Production

- the thesis is researchable;
- required inputs can be obtained;
- the expected length and complexity fit the deadline.

Any failed hard gate disqualifies that candidate. Human selection cannot override a failed hard gate inside this workflow.

## 31. Failure modes

### 31.1 False trend detection

Symptom: many headlines but no material underlying event.

Action: cluster the headlines, identify the common event and reassess materiality.

### 31.2 Headline chasing

Symptom: the proposed angle simply repeats the most dramatic claim.

Action: require confirmation, mechanism and reader value; reject if unavailable.

### 31.3 Topic overbreadth

Symptom: the candidate combines several unrelated events.

Action: narrow to one central question or split into separate opportunities.

### 31.4 Predetermined thesis

Symptom: the research brief demands evidence for a conclusion already chosen.

Action: rewrite neutral research questions and include falsification conditions.

### 31.5 Weak differentiation

Symptom: MacroAlloc would add no value beyond existing coverage.

Action: find a mechanism, data decomposition, cross-asset or educational angle; otherwise reject.

### 31.6 Cannibalization

Symptom: a recent article already satisfies the same intent.

Action: update, merge, reposition or reject.

### 31.7 Forced publication

Symptom: no candidate clears the threshold but a slot is scheduled.

Action: return `NO_SUITABLE_SHORTLIST`.

## 35. Test scenarios

The skill should be evaluated on at least:

- a clear central-bank decision with abundant sources;
- a viral but immaterial market rumor;
- an important event with conflicting official accounts;
- a stale event already covered by major media;
- a durable education gap;
- an ETF launch with heavy issuer marketing but limited investor relevance;
- two candidates describing the same underlying event;
- a high-scoring candidate that duplicates an existing article;
- a day with no candidate clearing the threshold;
- a discovery run with only two qualified candidates, which must return `NO_SUITABLE_SHORTLIST` without padding;
- a discovery run with six qualified candidates, which must return only the top five without choosing one;
- a request to run the complete factory in one turn, which must stop at `AWAITING_USER_SELECTION`;
- an ambiguous user reply after the shortlist, which must remain `AWAITING_USER_SELECTION`;
- an explicit selection by shortlist number, which must return `TOPIC_SELECTED` for that exact option;
- a scheduled event where the best opportunity is a pre-event explainer;
- a market move with no defensible single cause.

## 36. Governance

Every execution must log:

- skill version;
- candidate universe;
- source timestamps;
- scoring inputs;
- hard-gate decisions;
- selected and rejected opportunities;
- human overrides;
- final locked brief;
- estimated production deadline.

Human overrides must state the overridden rule and the reason.

Do not alter the scoring weights or eligibility gates silently. Changes require versioning and regression testing.

## 37. Final principles

- Quality beats publishing frequency.
- Evidence feasibility precedes drafting.
- Trend strength does not equal editorial value.
- A differentiated angle is mandatory.
- Uncertainty must be designed into the brief, not removed from it.
- One article should answer one dominant reader question.
- The content library is an asset that must be reinforced, not cannibalized.
- The skill may recommend silence.
- Topic selection is a strategic decision, not a headline-scraping task.

End of skill.
