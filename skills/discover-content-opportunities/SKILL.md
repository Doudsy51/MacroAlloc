---
name: discover-content-opportunities
description: Identifies, evaluates, and ranks macroeconomic, market, ETF, and educational content opportunities for MacroAlloc, then presents 3 to 5 qualified topics for mandatory human selection before research or drafting. Use when ChatGPT needs to discover event-driven or evergreen topics, assess editorial fit, evidence feasibility, timeliness, differentiation, and duplication risk, or validate the user's explicit selection from the active shortlist. Never choose the final topic autonomously.
metadata:
  version: 1.1.0
  status: TESTING
  owner: MacroAlloc Content Factory
  language: en-US
  content_types:
    - Morning Macro Insight
    - Evening Macro Insight
    - Market Analysis
    - ETF Research
    - Education
---

# discover-content-opportunities

## 1. Mission

Identify, evaluate, rank and brief the best content opportunities for MacroAlloc before research and drafting begin.

This skill acts as the strategic entry gate of the MacroAlloc Content Factory. It converts a broad, fast-moving information environment into a short list of defensible editorial opportunities, then produces a locked content brief for the selected item.

The skill must answer five questions:

1. What happened or what persistent reader need exists?
2. Why does the subject matter to MacroAlloc's audience now?
3. What differentiated angle can MacroAlloc credibly own?
4. Which content format and publication window are appropriate?
5. Is the opportunity sufficiently sourced, non-duplicative and strategically valuable to enter production?

The skill must not draft the article, perform the final financial verification, optimize the completed article for SEO, assemble the Word package, or publish content.

## 2. Position in the workflow

Expected upstream state:

- scheduled editorial trigger, manual request or detected event;
- access to approved source channels, editorial calendar and content library;
- current MacroAlloc category quotas and publication priorities;
- current date, time and target publication window.

Possible outputs:

- `AWAITING_USER_SELECTION`
- `TOPIC_SELECTED`
- `NO_SUITABLE_SHORTLIST`
- `BLOCKED`

Required downstream action:

- if `AWAITING_USER_SELECTION`: present 3 to 5 qualified topics and stop the turn;
- if `TOPIC_SELECTED`: hand off only the topic explicitly selected by the user from the active shortlist;
- if `NO_SUITABLE_SHORTLIST`: stop without forcing publication or padding the shortlist;
- if `BLOCKED`: stop and state the missing inputs.

The skill is a strategic discovery and ranking component, not an autonomous topic selector or publisher.

### Mandatory human-selection gate

Discovery and selection are separate turns.

1. During discovery, return exactly 3 to 5 qualified topics and `AWAITING_USER_SELECTION`.
2. End the response immediately after requesting the user's choice.
3. Do not create a locked brief, research dossier, draft, SEO package or article package in that turn.
4. Resume only after the user explicitly selects one option by its shortlist number, `OPPORTUNITY_ID`, or unambiguous exact title.
5. Return `TOPIC_SELECTED` only for that exact option. Never infer selection from ranking, score, urgency, a request to “continue,” or a request to run the full workflow.

This gate cannot be overridden by execution mode, deadlines, automation requests or contradictory user parameters.

## 3. Responsibilities

The skill is responsible for:

- detecting relevant macroeconomic, market, ETF and educational opportunities;
- separating transient noise from material developments;
- evaluating audience relevance and editorial fit;
- assessing source availability and evidence quality;
- estimating urgency, freshness and useful shelf life;
- identifying an original, defensible MacroAlloc angle;
- checking the content library for duplication and cannibalization risk;
- balancing topical opportunities with the editorial calendar;
- selecting the correct content category and edition;
- ranking opportunities using a transparent scorecard;
- producing a locked topic brief and research instructions;
- documenting uncertainty, prohibited claims and required rechecks;
- deciding not to publish when no opportunity clears the minimum standard.

## 4. Non-responsibilities

This skill must not:

- write the article body;
- fabricate a trend, search volume, source or audience signal;
- treat popularity as proof of materiality;
- verify every article-level claim;
- convert an allegation into an established fact;
- provide personalized investment advice;
- choose securities for a user;
- make a publication decision after the article has been written;
- optimize final metadata or rewrite headings for SEO;
- create the Word package;
- publish to the CMS or social platforms;
- prioritize a topic solely because it is sensational;
- force a daily article when no publishable subject exists.

## 5. Inputs

### 5.1 Mandatory inputs

The skill must receive:

- `CURRENT_DATETIME`
- `TARGET_LANGUAGE`
- `TARGET_MARKET`: normally international audience with US organic search priority
- `EDITORIAL_CATEGORIES`
- `CATEGORY_FREQUENCY_RULES`
- `TARGET_PUBLICATION_WINDOW`
- `APPROVED_SOURCE_POLICY`
- `RECENT_CONTENT_LIBRARY`
- `EDITORIAL_CALENDAR`
- `BRAND_POSITIONING`
- `COMPLIANCE_BOUNDARIES`
- `EXECUTION_PHASE`: `DISCOVERY` or `SELECTION_CONFIRMATION`

For event-driven execution, also require:

- `EVENT_CANDIDATES` or access to approved discovery tools;
- source title, publisher, timestamp and URL for each candidate;
- known market or economic context;
- any supplied user constraints.

For evergreen discovery, also require where available:

- known topic clusters;
- content gaps;
- internal search queries;
- audience questions;
- Search Console or analytics signals;
- seasonality and scheduled economic events.

### 5.2 Optional inputs

- competitor content;
- social engagement signals;
- Google Trends or equivalent trend evidence;
- newsletter feedback;
- site search data;
- ranking and traffic history;
- commercial priorities;
- product launch calendar;
- target keyword hypotheses;
- existing research dossiers;
- geographical priorities;
- human editorial preferences for the day.

Optional inputs must be treated as unavailable when not supplied. Never simulate them.

### 5.3 Blocking conditions

Return `BLOCKED` when:

- the target publication window is unknown;
- the editorial categories or frequency rules are missing;
- no approved discovery or source material is available;
- the content library cannot be checked and duplication risk is material;
- the user requests a category outside the approved scope;
- the requested subject cannot be handled without prohibited advice or unsupported accusation;
- timestamps are missing for a fast-moving event;
- the current date or edition cannot be established.

## 6. Editorial scope

### 6.1 Core categories

The skill may select opportunities for:

- `Macro Insights`
- `Market Analysis`
- `ETF Research`
- `Education`

### 6.2 Macro Insights

Use for a material recent development requiring timely explanation.

Typical subjects:

- central-bank decisions or communications;
- inflation, employment, growth or fiscal data;
- geopolitics with a defensible economic or cross-asset transmission mechanism;
- material moves in rates, currencies, commodities, credit or global equities;
- trade, sanctions, tariffs, industrial policy or energy disruption;
- market repricing around a clearly identified macro catalyst.

Morning and Evening editions must not become generic recaps. Each edition needs one dominant subject and one differentiated angle.

### 6.3 Market Analysis

Use for broader or more durable market interpretation requiring deeper context than a rapid Macro Insight.

Examples:

- regime shifts;
- cross-asset divergences;
- valuation or positioning debates;
- multi-week market developments;
- structural risk transmission;
- comparative regional analysis.

### 6.4 ETF Research

Use for product, index, structure, implementation or category analysis.

Examples:

- newly relevant ETF exposures;
- structural comparisons;
- index methodology changes;
- market segment access;
- tracking, liquidity, replication or portfolio-construction questions.

ETF Research must not be selected merely because a specific fund is receiving publicity.

### 6.5 Education

Use for durable reader questions and knowledge gaps.

Examples:

- macroeconomic mechanisms;
- fixed-income concepts;
- ETF structures;
- portfolio-construction concepts;
- risk measurement;
- economic indicators;
- transmission from policy to assets.

Education opportunities should build topical authority and support more advanced MacroAlloc content.

## 7. Discovery architecture

Every execution must follow this sequence:

1. Load editorial constraints.
2. Build the candidate universe.
3. Normalize and cluster candidates.
4. Eliminate ineligible or weak candidates.
5. Evaluate materiality and audience relevance.
6. Check evidence availability and source quality.
7. define potential MacroAlloc angles.
8. Check duplication, cannibalization and calendar conflicts.
9. Score and rank opportunities.
10. Apply category and frequency constraints.
11. Prepare a shortlist of 3 to 5 qualified opportunities.
12. Return `AWAITING_USER_SELECTION` and stop.
13. Record rejected candidates and reasons.

No scoring step may replace editorial judgment. Hard gates always override the numerical score.

## 8. Candidate universe

### 8.1 Candidate types

Candidates may originate from:

- official releases;
- central banks;
- government agencies;
- international institutions;
- recognized exchanges and market-data providers;
- reputable financial news organizations;
- ETF issuers and index providers;
- academic or institutional research;
- scheduled events;
- internal content gaps;
- repeated audience questions;
- historical or seasonal opportunities;
- material contradictions between market pricing and economic data.

### 8.2 Required candidate record

Each candidate must be normalized into:

- `CANDIDATE_ID`
- `EVENT_OR_TOPIC`
- `DISCOVERY_TIME`
- `EVENT_TIME`
- `SOURCE_IDS`
- `SOURCE_TYPES`
- `CATEGORY_HYPOTHESIS`
- `GEOGRAPHY`
- `ENTITIES`
- `INITIAL_MATERIALITY`
- `KNOWN_UNCERTAINTIES`
- `POTENTIAL_TRANSMISSION_CHANNELS`
- `FRESHNESS_WINDOW`

### 8.3 Deduplication

Cluster candidates that describe the same underlying event or reader need.

Do not treat multiple headlines as multiple opportunities.

Deduplicate by:

- event identity;
- date and institution;
- underlying data release;
- policy decision;
- main entities;
- dominant search intent;
- semantic similarity.

Preserve source diversity inside the merged event cluster.

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

## 10. Signal interpretation rules

### 10.1 Trend is not materiality

High social engagement, search interest or headline volume may indicate attention, not significance.

The skill must ask:

- Is the underlying event material?
- Is the information confirmed?
- Does it change the economic, policy, market or educational picture?
- Can MacroAlloc explain a mechanism rather than amplify attention?

### 10.2 Market move is not cause

Do not assume a market move was caused by the nearest headline.

Separate:

- observed move;
- reported attribution;
- MacroAlloc interpretation;
- alternative explanations;
- unresolved uncertainty.

### 10.3 Scheduled event is not automatically an opportunity

A central-bank meeting, CPI release or earnings period is only a valid opportunity when there is a meaningful question, surprise, contradiction or educational angle.

### 10.4 Novelty is not quality

A new subject may be weak. A familiar subject may be highly valuable when the evidence, reader need or angle has changed.

## 11. Materiality engine

Evaluate the potential importance of each candidate across the following dimensions.

### 11.1 Economic materiality

Assess effects on:

- growth;
- inflation;
- employment;
- fiscal conditions;
- monetary policy;
- trade;
- financial conditions;
- credit creation;
- energy supply;
- business or consumer behavior.

### 11.2 Market materiality

Assess whether the candidate affects or helps explain:

- sovereign yields;
- yield curves;
- credit spreads;
- currencies;
- commodities;
- global or regional equities;
- volatility;
- liquidity;
- cross-asset correlations;
- ETF flows or implementation choices.

### 11.3 Reader materiality

Assess whether the candidate answers a real question for:

- informed retail investors;
- financial professionals;
- readers learning macroeconomics or ETFs;
- portfolio decision-makers seeking context rather than advice.

### 11.4 Strategic materiality

Assess whether the content strengthens MacroAlloc's positioning in:

- macro analysis;
- ETF selection;
- portfolio allocation;
- financial education;
- cross-asset interpretation.

Return a `MATERIALITY_SCORE` from 0 to 100, but block candidates that fail any hard gate regardless of score.

## 12. Audience-demand engine

Identify the reader's likely question before selecting the topic.

For each candidate define:

- `PRIMARY_AUDIENCE`
- `AWARENESS_LEVEL`
- `PRIMARY_READER_QUESTION`
- `SECONDARY_QUESTIONS`
- `READER_DECISION_OR_NEED`
- `EXPECTED_VALUE_AFTER_READING`

A strong opportunity allows the article to deliver a clear outcome such as:

- understanding what happened;
- understanding why it matters;
- learning a durable concept;
- comparing two structures;
- identifying observable risks and next indicators;
- placing a market move in a broader regime.

Do not infer search volume or audience demand without supplied evidence. When no quantitative audience data exists, classify the demand assessment as editorial judgment.

## 13. Angle-generation engine

For each eligible candidate, generate two to four potential angles.

Valid angle types include:

- mechanism-led;
- contradiction-led;
- cross-asset;
- policy transmission;
- historical comparison;
- regional comparison;
- educational explanation;
- ETF implementation;
- scenario and risk framing;
- data decomposition;
- market-pricing versus economic-fundamentals.

Each angle must specify:

- the central question;
- the proposed thesis;
- why it is useful now;
- the evidence needed;
- what would make the angle misleading;
- likely alternative interpretation;
- expected article category and length.

Reject angles that:

- merely restate the event;
- depend on unavailable evidence;
- require a predetermined conclusion;
- exaggerate certainty;
- duplicate a recent MacroAlloc article;
- cannot be explained to the target audience.

## 14. MacroAlloc differentiation engine

The selected opportunity must offer at least one clear form of differentiation:

- clearer economic mechanism;
- better distinction between fact and interpretation;
- stronger cross-asset transmission analysis;
- useful decomposition of a data release;
- better historical or regional context;
- ETF-specific implementation insight;
- more transparent uncertainty;
- stronger educational progression;
- explicit indicators to monitor next;
- connection to portfolio construction without personalized advice.

Record the proposed differentiation in `MACROALLOC_EDGE`.

Generic statements such as “better analysis” or “more detail” are not sufficient.

## 15. Source-feasibility engine

Before selection, build a preliminary evidence map.

### 15.1 Source hierarchy

Prefer:

1. authoritative primary sources;
2. recognized official data providers and exchanges;
3. Reuters, Bloomberg, Financial Times, Wall Street Journal, Associated Press or similarly rigorous financial news organizations;
4. recognized research institutions, index providers and ETF issuers;
5. other sources only when necessary and clearly qualified.

### 15.2 Preliminary source package

For each shortlisted opportunity provide:

- authoritative primary sources;
- independent corroborating sources;
- expected data sources;
- sources for alternative interpretations;
- sources requiring recheck near publication;
- known access limitations.

### 15.3 Evidence risk

Classify:

- `LOW`: primary and independent evidence readily available;
- `MEDIUM`: evidence exists but interpretation is disputed or data is incomplete;
- `HIGH`: central claims rely on anonymous, interested or inaccessible sources;
- `UNACCEPTABLE`: the opportunity cannot be reliably sourced.

An `UNACCEPTABLE` evidence risk blocks selection.

## 16. Freshness and timing engine

For each candidate determine:

- discovery time;
- event time;
- likely information half-life;
- deadline for a useful publication;
- required recheck time;
- risk of material updates before publication;
- whether a Morning or Evening edition is appropriate;
- whether a deeper later article should replace a rushed immediate article.

### 16.1 Timing classes

- `IMMEDIATE`: useful only within hours;
- `SAME_DAY`: useful during the current session;
- `NEXT_24_HOURS`: remains useful through the next publication window;
- `THIS_WEEK`: suitable for deeper analysis;
- `EVERGREEN`: durable educational or structural demand;
- `SEASONAL`: tied to a recurring calendar window.

### 16.2 Stale-event rule

Do not select a late article that merely repeats an event already fully covered by stronger sources.

A late article may still be selected when MacroAlloc offers:

- a new data decomposition;
- a cross-asset consequence;
- a misunderstood mechanism;
- a durable educational conversion;
- a material update.

## 17. Seasonality and calendar engine

Use the editorial and economic calendar to anticipate, not fabricate, opportunities.

Relevant recurring windows may include:

- central-bank meetings;
- inflation, employment and GDP releases;
- fiscal announcements;
- earnings seasons;
- index rebalances;
- ETF launches or methodology changes;
- year-end outlooks;
- tax, regulatory or reporting deadlines;
- major institutional conferences;
- seasonal commodity or energy dynamics.

For scheduled topics define:

- event date;
- pre-event educational opportunity;
- same-day analytical opportunity;
- post-event review opportunity;
- evergreen follow-up opportunity.

Do not create duplicate articles across these windows unless each has a distinct reader question.

## 18. Content-gap engine

Compare candidates with MacroAlloc's current content architecture.

Evaluate:

- missing pillar pages;
- missing cluster articles;
- weak educational prerequisites;
- underdeveloped macro, ETF or allocation topics;
- outdated cornerstone content;
- recurring reader questions without a canonical answer;
- high-value topics covered only through short news articles.

Classify each opportunity as:

- `NEW_CLUSTER`
- `CLUSTER_EXPANSION`
- `CORNERSTONE_CONTENT`
- `UPDATE_EXISTING_CONTENT`
- `EVENT_DRIVEN_EXTENSION`
- `DUPLICATE_OR_LOW_INCREMENT`

## 19. Content-memory and cannibalization engine

Search the available content library for:

- identical topics;
- highly similar titles;
- overlapping primary keywords;
- identical search intent;
- repeated angle or thesis;
- overlapping entities and educational purpose;
- scheduled drafts on the same subject.

Classify the relationship:

- `NO_OVERLAP`
- `HEALTHY_REINFORCEMENT`
- `PARTIAL_OVERLAP`
- `HIGH_CANNIBALIZATION_RISK`
- `UPDATE_EXISTING_ARTICLE`
- `MERGE_REQUIRED`

When overlap exists, choose among:

- differentiate the angle;
- update the existing article;
- create a supporting article;
- postpone;
- merge;
- reject.

Never recommend a new URL when updating an existing canonical article would better serve the reader and the site's authority.

## 20. Category and frequency control

Apply the approved MacroAlloc editorial schedule.

Default strategic framework where confirmed by project settings:

- Macro Insights: two per day, Morning and Evening;
- Market Analysis: one per day to three per week depending on opportunity quality;
- ETF Research: one per day to three per week depending on opportunity quality;
- Education: three per week.

These are planning targets, not permission to publish weak content.

Rules:

- classify the content type before final subject selection;
- do not use an Education topic to fill a Macro Insight slot;
- do not publish two editions covering the same event with the same angle;
- balance timely content with durable authority-building content;
- document when a slot is intentionally skipped.

## 21. Opportunity scoring model

Score each eligible opportunity from 0 to 100.

### 21.1 Weighted dimensions

- Materiality: 20 points
- Audience value: 15 points
- MacroAlloc differentiation: 15 points
- Evidence quality and feasibility: 15 points
- Timeliness or durability: 10 points
- Strategic topical-authority value: 10 points
- Discoverability potential: 5 points
- Cross-channel potential: 5 points
- Production feasibility: 5 points

### 21.2 Penalties

Apply transparent penalties for:

- duplication or cannibalization;
- excessive uncertainty;
- weak source access;
- stale timing;
- mismatch with the editorial calendar;
- narrow relevance;
- dependence on sensational framing;
- risk that the central thesis will change before publication.

### 21.3 Score interpretation

- `85–100`: exceptional opportunity;
- `75–84`: strong opportunity;
- `65–74`: viable with a clear angle and evidence plan;
- `50–64`: weak; select only after human editorial decision;
- `<50`: reject.

The qualification threshold is 75, subject to all hard gates.

A lower-scoring topic may not outrank a stronger one merely because it is newer.

## 22. Priority engine

Assign one operational priority:

- `CRITICAL`: immediate material event with a rapidly closing publication window;
- `HIGH`: strong timely or strategic opportunity;
- `MEDIUM`: valuable but not urgent;
- `LOW`: useful backlog item;
- `REJECTED`: fails a hard gate or minimum score.

Priority must reflect both value and timing.

## 23. Editorial selection rules

### 23.1 Mandatory shortlist mode

Return the best 3 to 5 qualified candidates with:

- score;
- category;
- proposed angle;
- urgency;
- evidence risk;
- duplication risk;
- expected reader value;
- qualification rationale.

Do not conceal rejected alternatives that initially appeared important; summarize why they failed.

Do not label one candidate as the winner, recommended choice, preferred topic or automatic selection. Ranking communicates comparative editorial strength; it does not authorize the skill to choose for the user.

If at least 3 candidates qualify, return the top 3 to 5. If fewer than 3 candidates qualify, return `NO_SUITABLE_SHORTLIST`. Never add weak, ineligible or duplicative candidates merely to reach three.

### 23.2 Selection-confirmation mode

Accept a selection only when all conditions are true:

- an active shortlist from the immediately preceding discovery turn exists;
- the prior status is `AWAITING_USER_SELECTION`;
- the user explicitly identifies exactly one listed option;
- the selected option has not been altered, merged or replaced.

On success, return `TOPIC_SELECTED` and generate the locked research brief for the selected option only.

If the response is ambiguous, keep `AWAITING_USER_SELECTION` and ask for a number, `OPPORTUNITY_ID`, or exact title. If the user names a topic outside the shortlist, do not substitute it silently; return `BLOCKED` and require a new discovery run or an explicit editorial exception outside this workflow.

The highest score, greatest urgency or strongest evidence never counts as human selection.

## 24. Research-brief generator

For `TOPIC_SELECTED`, generate a structured research brief only after explicit human selection.

### 24.1 Identity

- `OPPORTUNITY_ID`
- `CONTENT_TYPE`
- `EDITION`
- `PRIORITY`
- `TARGET_PUBLICATION_TIME`
- `WORKING_TITLE`
- `LOCKED_TOPIC`
- `LOCKED_ANGLE`
- `PRIMARY_AUDIENCE`
- `PRIMARY_SEARCH_INTENT`

### 24.2 Strategic rationale

- `WHY_NOW`
- `READER_VALUE`
- `MACROALLOC_EDGE`
- `EXPECTED_SHELF_LIFE`
- `CONTENT_CLUSTER`
- `RELATED_CONTENT`

### 24.3 Thesis and mechanism

- `MACROALLOC_THESIS`
- `TRANSMISSION_CHANNELS`: two to four mechanisms
- `KEY_QUESTIONS`
- `EXPECTED_COUNTERARGUMENTS`
- `ALTERNATIVE_INTERPRETATIONS`
- `WHAT_WOULD_INVALIDATE_THE_ANGLE`

### 24.4 Evidence plan

- `PRIMARY_SOURCES_TO_RETRIEVE`
- `SECONDARY_SOURCES_TO_RETRIEVE`
- `DATA_SERIES_TO_CHECK`
- `HISTORICAL_COMPARISONS_TO_TEST`
- `SOURCE_DIVERSITY_REQUIREMENTS`
- `RECHECK_ITEMS`
- `KNOWN_UNCERTAINTIES`
- `DISPUTED_OR_AMBIGUOUS_POINTS`
- `PROHIBITED_CLAIMS`

### 24.5 Editorial plan

- expected word range;
- suggested structure;
- required definitions;
- expected visual or table opportunities;
- internal-link opportunities;
- intended “What to Watch Next” indicators;
- desired level of technical complexity.

The brief is an instruction for research and writing, not a substitute for evidence gathering.

## 25. Research questions

Generate precise, non-leading research questions.

Required classes:

### 25.1 Event verification

- What exactly happened?
- When did it happen?
- Which institution or source confirms it?
- What remains unverified or disputed?

### 25.2 Baseline and surprise

- What was expected beforehand?
- What changed relative to the prior release, decision or consensus?
- Were revisions, base effects or temporary components material?

### 25.3 Mechanism

- Through which economic and market channels could the event matter?
- Which links are established, which are interpretations and which are scenarios?

### 25.4 Alternative explanation

- What other credible factors may explain the observed market or economic response?
- Which evidence would distinguish the competing interpretations?

### 25.5 Historical context

- Is the proposed comparison genuinely analogous?
- Which structural differences limit the comparison?

### 25.6 Forward indicators

- Which observable data, dates or conditions should readers monitor next?

## 26. Handling uncertainty and disputed narratives

The skill must not lock an angle that depends on suppressing uncertainty.

For every material uncertainty classify:

- known unknown;
- source disagreement;
- unverified allegation;
- provisional data;
- market attribution uncertainty;
- scenario dependency;
- timing uncertainty.

When credible interpretations conflict:

- preserve the disagreement in the brief;
- specify evidence for each side;
- avoid a title that states one interpretation as fact;
- disqualify the affected angle when the emphasis is inherently subjective or reputationally sensitive; if fewer than three candidates remain, return `NO_SUITABLE_SHORTLIST`.

## 27. Breaking-news protocol

For fast-moving events:

1. Verify event identity and timestamp.
2. Establish what is confirmed.
3. Separate official statements from independent confirmation.
4. Identify what may change before publication.
5. Set a mandatory recheck deadline.
6. Narrow the angle to what can be responsibly supported.
7. Prefer a shorter high-confidence article over a broader speculative article.
8. Stop if the source environment is too unstable.

Do not use speed as justification for lower factual standards.

## 28. Evergreen opportunity protocol

For educational or durable content:

1. Identify the canonical reader question.
2. Check whether MacroAlloc already has a definitive answer.
3. map prerequisites and follow-up topics.
4. assess long-term topical-authority value.
5. define beginner, intermediate or advanced level.
6. specify examples, definitions and visual needs.
7. avoid unnecessary time-sensitive framing.
8. define a future refresh cadence.

## 29. ETF opportunity protocol

ETF candidates require additional checks:

- Is the subject a category or investor question rather than issuer marketing?
- Are comparable products or structures available?
- Can the article explain index, replication, liquidity, cost, tracking or portfolio role?
- Are fund characteristics current and sourced?
- Is the angle relevant across jurisdictions or limited to one market?
- Does the topic risk becoming a personalized product recommendation?

The research brief must specify the comparison universe and the data date.

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

## 32. Output contract

Return a structured object with the following top-level fields.

```yaml
status: AWAITING_USER_SELECTION | TOPIC_SELECTED | NO_SUITABLE_SHORTLIST | BLOCKED
execution:
  current_datetime:
  phase: DISCOVERY | SELECTION_CONFIRMATION
  target_publication_window:
  skill_version: 1.1.0
editorial_constraints:
  categories:
  frequency_rules:
  language:
  target_market:
candidate_summary:
  total_detected:
  total_clustered:
  eligible:
  rejected:
ranked_opportunities:
  - opportunity_id:
    topic:
    content_type:
    edition:
    proposed_angle:
    priority:
    score:
    materiality_score:
    audience_value_score:
    differentiation_score:
    evidence_score:
    timing_score:
    topical_authority_score:
    evidence_risk:
    duplication_risk:
    why_now:
    rejection_reason:
selected_opportunity: null | object
selection_gate:
  human_selection_required: true
  selection_received: true | false
  selected_opportunity_id: string | null
  drafting_authorized: true | false
selected_opportunity_object:
  opportunity_id:
  working_title:
  locked_topic:
  locked_angle:
  content_type:
  edition:
  priority:
  publication_deadline:
  primary_audience:
  primary_search_intent:
  reader_value:
  macroalloc_edge:
  macroalloc_thesis:
  transmission_channels:
  key_questions:
  alternative_interpretations:
  invalidation_conditions:
  source_plan:
  data_plan:
  uncertainties:
  disputed_points:
  prohibited_claims:
  recheck_items:
  related_content:
  internal_link_opportunities:
  expected_word_range:
  suggested_structure:
  visual_opportunities:
rejected_candidates:
  - candidate_id:
    reason:
    hard_gate_failed:
    score:
next_action:
```

## 33. Human-readable output

Alongside the structured object, provide a concise editorial report containing:

1. A numbered shortlist of 3 to 5 qualified subjects.
2. Why each subject matters now.
3. Proposed MacroAlloc angle for each subject.
4. Category, edition and score for each subject.
5. Main evidence plan and uncertainty for each subject.
6. The exact status `AWAITING_USER_SELECTION`.
7. A concise request for the user to choose one number or exact title.

Do not draft the article in this report.

When the status is `AWAITING_USER_SELECTION`, no content may appear after the selection request and no downstream skill may be invoked.

## 34. Handoff contract

When `TOPIC_SELECTED`, the next component may receive:

- the complete selected-opportunity object;
- the locked topic and angle;
- research questions;
- source plan;
- uncertainty and disputed-points register;
- prohibited claims;
- timing and recheck requirements;
- relevant content-memory results.

The research stage must return an evidence-backed dossier before any writing skill executes.

The writing skill must not silently change the locked topic or angle. A material change requires a return to this skill or human editorial approval.

No handoff is permitted while the status is `AWAITING_USER_SELECTION`, `NO_SUITABLE_SHORTLIST` or `BLOCKED`.

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
