# Discover Content Opportunities — Domain Rules

## Contents

- 1. Editorial scope
- 2. Discovery architecture
- 3. Candidate universe
- 4. Signal interpretation rules
- 5. Materiality engine
- 6. Audience-demand engine
- 7. Angle-generation engine
- 8. MacroAlloc differentiation engine
- 9. Source-feasibility engine
- 10. Freshness and timing engine
- 11. Seasonality and calendar engine
- 12. Content-gap engine
- 13. Content-memory and cannibalization engine
- 14. Category and frequency control
- 15. Opportunity scoring model
- 16. Priority engine
- 17. Editorial selection rules
- 18. Research-brief generator
- 19. Research questions
- 20. Handling uncertainty and disputed narratives
- 21. Breaking-news protocol
- 22. Evergreen opportunity protocol
- 23. ETF opportunity protocol

## 1. Editorial scope

### 1.1 Core categories

The skill may select opportunities for:

- `Macro Insights`
- `Market Analysis`
- `ETF Research`
- `Education`

### 1.2 Macro Insights

Use for a material recent development requiring timely explanation.

Typical subjects:

- central-bank decisions or communications;
- inflation, employment, growth or fiscal data;
- geopolitics with a defensible economic or cross-asset transmission mechanism;
- material moves in rates, currencies, commodities, credit or global equities;
- trade, sanctions, tariffs, industrial policy or energy disruption;
- market repricing around a clearly identified macro catalyst.

Morning and Evening editions must not become generic recaps. Each edition needs one dominant subject and one differentiated angle.

### 1.3 Market Analysis

Use for broader or more durable market interpretation requiring deeper context than a rapid Macro Insight.

Examples:

- regime shifts;
- cross-asset divergences;
- valuation or positioning debates;
- multi-week market developments;
- structural risk transmission;
- comparative regional analysis.

### 1.4 ETF Research

Use for product, index, structure, implementation or category analysis.

Examples:

- newly relevant ETF exposures;
- structural comparisons;
- index methodology changes;
- market segment access;
- tracking, liquidity, replication or portfolio-construction questions.

ETF Research must not be selected merely because a specific fund is receiving publicity.

### 1.5 Education

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

## 2. Discovery architecture

Every execution evaluates three regional focuses — US, Europe, Asia — within a single pass, and must follow this sequence:

1. Load editorial constraints.
2. Build the candidate universe across all three regions.
3. Normalize and cluster candidates, tagging each with its region from `GEOGRAPHY` (§3.2). A candidate with cross-regional relevance is assigned to the region where its primary economic or market effect is concentrated, not duplicated across regions.
4. Eliminate ineligible or weak candidates, applying every gate identically regardless of region.
5. Evaluate materiality and audience relevance, per region.
6. Check evidence availability and source quality, per region.
7. define potential MacroAlloc angles, per region.
8. Check duplication, cannibalization and calendar conflicts, per region.
9. Score and rank opportunities, per region.
10. Apply category and frequency constraints, per region.
11. Prepare a shortlist of 3 to 5 qualified opportunities **for each region independently**. A region that cannot reach 3 qualified opportunities returns its own `NO_SUITABLE_SHORTLIST` note (§17.1) without altering the other two regions' shortlists.
12. Return `AWAITING_USER_SELECTION` and stop, presenting all three regional shortlists (or no-shortlist notes) together in one turn.
13. Record rejected candidates and reasons, per region.

No scoring step may replace editorial judgment. Hard gates always override the numerical score. The materiality engine, scoring model, and eligibility gates are identical across regions — only the candidate universe and geography differ.

## 3. Candidate universe

### 3.1 Candidate types

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

### 3.2 Required candidate record

Each candidate must be normalized into:

- `CANDIDATE_ID`
- `EVENT_OR_TOPIC`
- `DISCOVERY_TIME`
- `EVENT_TIME`
- `SOURCE_IDS`
- `SOURCE_TYPES`
- `CATEGORY_HYPOTHESIS`
- `GEOGRAPHY`: also determines the candidate's regional bucket (`US`, `EUROPE`, or `ASIA`) for the three parallel shortlists
- `ENTITIES`
- `INITIAL_MATERIALITY`
- `KNOWN_UNCERTAINTIES`
- `POTENTIAL_TRANSMISSION_CHANNELS`
- `FRESHNESS_WINDOW`

### 3.3 Deduplication

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

## 4. Signal interpretation rules

### 4.1 Trend is not materiality

High social engagement, search interest or headline volume may indicate attention, not significance.

The skill must ask:

- Is the underlying event material?
- Is the information confirmed?
- Does it change the economic, policy, market or educational picture?
- Can MacroAlloc explain a mechanism rather than amplify attention?

### 4.2 Market move is not cause

Do not assume a market move was caused by the nearest headline.

Separate:

- observed move;
- reported attribution;
- MacroAlloc interpretation;
- alternative explanations;
- unresolved uncertainty.

### 4.3 Scheduled event is not automatically an opportunity

A central-bank meeting, CPI release or earnings period is only a valid opportunity when there is a meaningful question, surprise, contradiction or educational angle.

### 4.4 Novelty is not quality

A new subject may be weak. A familiar subject may be highly valuable when the evidence, reader need or angle has changed.

## 5. Materiality engine

Evaluate the potential importance of each candidate across the following dimensions.

### 5.1 Economic materiality

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

### 5.2 Market materiality

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

### 5.3 Reader materiality

Assess whether the candidate answers a real question for:

- informed retail investors;
- financial professionals;
- readers learning macroeconomics or ETFs;
- portfolio decision-makers seeking context rather than advice.

### 5.4 Strategic materiality

Assess whether the content strengthens MacroAlloc's positioning in:

- macro analysis;
- ETF selection;
- portfolio allocation;
- financial education;
- cross-asset interpretation.

Return a `MATERIALITY_SCORE` from 0 to 100, but block candidates that fail any hard gate regardless of score. This raw 0-100 assessment feeds the weighted "Materiality" dimension in Section 15.1; the `materiality_score` field in the output contract reports that weighted 0-20 contribution, not this raw 0-100 value.

## 6. Audience-demand engine

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

## 7. Angle-generation engine

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

## 8. MacroAlloc differentiation engine

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

## 9. Source-feasibility engine

Before selection, build a preliminary evidence map.

### 9.1 Source hierarchy

Prefer:

1. authoritative primary sources;
2. recognized official data providers and exchanges;
3. Reuters, Bloomberg, Financial Times, Wall Street Journal, Associated Press or similarly rigorous financial news organizations;
4. recognized research institutions, index providers and ETF issuers;
5. other sources only when necessary and clearly qualified.

### 9.2 Preliminary source package

For each shortlisted opportunity provide:

- authoritative primary sources;
- independent corroborating sources;
- expected data sources;
- sources for alternative interpretations;
- sources requiring recheck near publication;
- known access limitations.

### 9.3 Evidence risk

Classify:

- `LOW`: primary and independent evidence readily available;
- `MEDIUM`: evidence exists but interpretation is disputed or data is incomplete;
- `HIGH`: central claims rely on anonymous, interested or inaccessible sources;
- `UNACCEPTABLE`: the opportunity cannot be reliably sourced.

An `UNACCEPTABLE` evidence risk blocks selection.

## 10. Freshness and timing engine

For each candidate determine:

- discovery time;
- event time;
- likely information half-life;
- deadline for a useful publication;
- required recheck time;
- risk of material updates before publication;
- whether a Morning or Evening edition is appropriate;
- whether a deeper later article should replace a rushed immediate article.

### 10.1 Timing classes

- `IMMEDIATE`: useful only within hours;
- `SAME_DAY`: useful during the current session;
- `NEXT_24_HOURS`: remains useful through the next publication window;
- `THIS_WEEK`: suitable for deeper analysis;
- `EVERGREEN`: durable educational or structural demand;
- `SEASONAL`: tied to a recurring calendar window.

### 10.2 Stale-event rule

Do not select a late article that merely repeats an event already fully covered by stronger sources.

A late article may still be selected when MacroAlloc offers:

- a new data decomposition;
- a cross-asset consequence;
- a misunderstood mechanism;
- a durable educational conversion;
- a material update.

## 11. Seasonality and calendar engine

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

## 12. Content-gap engine

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

## 13. Content-memory and cannibalization engine

When available, the content library for this section is the `RECENT_CONTENT_LIBRARY` the orchestrator supplies from `track-content-selections` — each entry is a topic a human actually selected in a prior run, with its region, content type, event date, freshness class, keywords, and locked angle. A shared keyword or entity across two entries (e.g., two separate FOMC meetings both tagged `Fed`) is not by itself overlap; compare the underlying event, angle, and search intent, using each entry's `event_date` to judge whether it is the same story or a legitimately new one.

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

## 14. Category and frequency control

Apply the approved MacroAlloc editorial schedule **independently within each of the three regions** — a region reaching its Macro Insight quota does not reduce or inflate another region's quota.

Default strategic framework where confirmed by project settings, per region:

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

## 15. Opportunity scoring model

Score each eligible opportunity from 0 to 100.

### 15.1 Weighted dimensions

- Materiality: 20 points
- Audience value: 15 points
- MacroAlloc differentiation: 15 points
- Evidence quality and feasibility: 15 points
- Timeliness or durability: 10 points
- Strategic topical-authority value: 10 points
- Discoverability potential: 5 points
- Cross-channel potential: 5 points
- Production feasibility: 5 points

### 15.2 Penalties

Apply transparent penalties for:

- duplication or cannibalization;
- excessive uncertainty;
- weak source access;
- stale timing;
- mismatch with the editorial calendar;
- narrow relevance;
- dependence on sensational framing;
- risk that the central thesis will change before publication.

### 15.3 Score interpretation

- `85–100`: exceptional opportunity;
- `75–84`: strong opportunity;
- `65–74`: below the qualification threshold; record as a rejected candidate with this band as the stated reason;
- `50–64`: below the qualification threshold; weak, record as rejected;
- `<50`: reject.

The qualification threshold is 75, subject to all hard gates. Bands below 75 are diagnostic only, used to explain a rejection in `rejected_candidates`; they never create a path to the shortlist or to selection, and no separate "human editorial decision" bypass exists in this skill. The only way a sub-75 candidate reaches a human is the unrelated case in Section 17.2: a user naming a topic outside the active shortlist, which this skill treats as `BLOCKED` and refers to an editorial exception entirely outside this workflow, not as a use of this scoring band.

A lower-scoring topic may not outrank a stronger one merely because it is newer.

## 16. Priority engine

Assign one operational priority:

- `CRITICAL`: immediate material event with a rapidly closing publication window;
- `HIGH`: strong timely or strategic opportunity;
- `MEDIUM`: valuable but not urgent;
- `LOW`: useful backlog item;
- `REJECTED`: fails a hard gate or minimum score.

Priority must reflect both value and timing.

## 17. Editorial selection rules

### 17.1 Mandatory shortlist mode

For **each of the three regions (US, Europe, Asia) independently**, return the best 3 to 5 qualified candidates with:

- score;
- category;
- proposed angle;
- urgency;
- evidence risk;
- duplication risk;
- expected reader value;
- qualification rationale.

Do not conceal rejected alternatives that initially appeared important; summarize why they failed.

Do not label one candidate as the winner, recommended choice, preferred topic or automatic selection, in any region. Ranking communicates comparative editorial strength; it does not authorize the skill to choose for the user. Do not label one region's shortlist as stronger or more urgent than another's — regions are presented as independent, parallel options, not as a ranked competition against each other.

If at least 3 candidates qualify **in a region**, return the top 3 to 5 for that region. If fewer than 3 candidates qualify in a region, return `region_status: NO_SUITABLE_SHORTLIST` for that region only — the other regions proceed normally with their own shortlists. Never add weak, ineligible or duplicative candidates merely to reach three, in any region. Only return the top-level `status: NO_SUITABLE_SHORTLIST` when every region fails to qualify.

### 17.2 Selection-confirmation mode

Accept a selection **for a given region** only when all conditions are true:

- an active shortlist for that region from the immediately preceding discovery turn exists;
- the prior status is `AWAITING_USER_SELECTION`;
- the user explicitly identifies exactly one listed option from that region's shortlist;
- the selected option has not been altered, merged or replaced.

Evaluate each region's selection independently. The user is not required to select from every region in the same turn: a region left unaddressed simply remains `AWAITING_USER_SELECTION` for that region, while `TOPIC_SELECTED` is returned for the regions the user did address. On success for a region, return `TOPIC_SELECTED` for that region and generate the locked research brief for the selected option only.

If the response for a region is ambiguous, keep that region at `AWAITING_USER_SELECTION` and ask for a number, `OPPORTUNITY_ID`, or exact title. If the user names a topic outside a region's shortlist, do not substitute it silently; return `BLOCKED` for that region and require a new discovery run or an explicit editorial exception outside this workflow — this does not affect the other regions' already-confirmed selections.

The highest score, greatest urgency or strongest evidence never counts as human selection, in any region.

## 18. Research-brief generator

For `TOPIC_SELECTED`, generate a structured research brief only after explicit human selection.

### 18.1 Identity

- `REGION`: `US`, `EUROPE`, or `ASIA`
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

### 18.2 Strategic rationale

- `WHY_NOW`
- `READER_VALUE`
- `MACROALLOC_EDGE`
- `EXPECTED_SHELF_LIFE`
- `CONTENT_CLUSTER`
- `RELATED_CONTENT`

### 18.3 Thesis and mechanism

- `MACROALLOC_THESIS`
- `TRANSMISSION_CHANNELS`: two to four mechanisms
- `KEY_QUESTIONS`
- `EXPECTED_COUNTERARGUMENTS`
- `ALTERNATIVE_INTERPRETATIONS`
- `WHAT_WOULD_INVALIDATE_THE_ANGLE`

### 18.4 Evidence plan

- `PRIMARY_SOURCES_TO_RETRIEVE`
- `SECONDARY_SOURCES_TO_RETRIEVE`
- `DATA_SERIES_TO_CHECK`
- `HISTORICAL_COMPARISONS_TO_TEST`
- `SOURCE_DIVERSITY_REQUIREMENTS`
- `RECHECK_ITEMS`
- `KNOWN_UNCERTAINTIES`
- `DISPUTED_OR_AMBIGUOUS_POINTS`
- `PROHIBITED_CLAIMS`

### 18.5 Editorial plan

- expected word range;
- suggested structure;
- required definitions;
- expected visual or table opportunities;
- internal-link opportunities;
- intended “What to Watch Next” indicators;
- desired level of technical complexity.

The brief is an instruction for research and writing, not a substitute for evidence gathering.

## 19. Research questions

Generate precise, non-leading research questions.

Required classes:

### 19.1 Event verification

- What exactly happened?
- When did it happen?
- Which institution or source confirms it?
- What remains unverified or disputed?

### 19.2 Baseline and surprise

- What was expected beforehand?
- What changed relative to the prior release, decision or consensus?
- Were revisions, base effects or temporary components material?

### 19.3 Mechanism

- Through which economic and market channels could the event matter?
- Which links are established, which are interpretations and which are scenarios?

### 19.4 Alternative explanation

- What other credible factors may explain the observed market or economic response?
- Which evidence would distinguish the competing interpretations?

### 19.5 Historical context

- Is the proposed comparison genuinely analogous?
- Which structural differences limit the comparison?

### 19.6 Forward indicators

- Which observable data, dates or conditions should readers monitor next?

## 20. Handling uncertainty and disputed narratives

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
- disqualify the affected angle when the emphasis is inherently subjective or reputationally sensitive; if fewer than three candidates remain in that region, return `region_status: NO_SUITABLE_SHORTLIST` for that region only.

## 21. Breaking-news protocol

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

## 22. Evergreen opportunity protocol

For educational or durable content:

1. Identify the canonical reader question.
2. Check whether MacroAlloc already has a definitive answer.
3. map prerequisites and follow-up topics.
4. assess long-term topical-authority value.
5. define beginner, intermediate or advanced level.
6. specify examples, definitions and visual needs.
7. avoid unnecessary time-sensitive framing.
8. define a future refresh cadence.

## 23. ETF opportunity protocol

ETF candidates require additional checks:

- Is the subject a category or investor question rather than issuer marketing?
- Are comparable products or structures available?
- Can the article explain index, replication, liquidity, cost, tracking or portfolio role?
- Are fund characteristics current and sourced?
- Is the angle relevant across jurisdictions or limited to one market?
- Does the topic risk becoming a personalized product recommendation?

The research brief must specify the comparison universe and the data date.
