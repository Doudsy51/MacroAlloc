# Discover Content Opportunities — Workflow

## Contents

- 1. Mission
- 2. Position in the workflow
- 3. Responsibilities
- 4. Non-responsibilities
- 5. Inputs
- 6. Handoff contract

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

- if `AWAITING_USER_SELECTION`: present 3 to 5 qualified topics per region (US, Europe, Asia) and stop the turn;
- if `TOPIC_SELECTED`: hand off only the topics explicitly selected by the user, one per confirmed region, each from its own active shortlist;
- if `NO_SUITABLE_SHORTLIST`: stop without forcing publication or padding the shortlist — this applies per region; a region with no qualified candidates does not force the same outcome on the other two;
- if `BLOCKED`: stop and state the missing inputs.

The skill is a strategic discovery and ranking component, not an autonomous topic selector or publisher.

### Mandatory human-selection gate

Discovery and selection are separate turns.

1. During discovery, return exactly 3 to 5 qualified topics **for each of the three regional focuses (US, Europe, Asia)** evaluated in this run, and `AWAITING_USER_SELECTION`. A region that cannot produce 3 qualified candidates returns its own `NO_SUITABLE_SHORTLIST` note for that region only; it does not block the other regions.
2. End the response immediately after requesting the user's choice for every region that has a shortlist.
3. Do not create a locked brief, research dossier, draft, SEO package or article package in that turn.
4. Resume only after the user explicitly selects one option per region by its shortlist number, `OPPORTUNITY_ID`, or unambiguous exact title. A region may be left unselected if the user chooses not to proceed with it; this does not invalidate the selections made for the other regions.
5. Return `TOPIC_SELECTED` only for the exact options selected, one per confirmed region. Never infer selection from ranking, score, urgency, a request to “continue,” or a request to run the full workflow.

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

The skill must receive or resolve from explicit orchestrator defaults:

- `CURRENT_DATETIME`
- `TARGET_LANGUAGE`
- `TARGET_REGIONS`: the three regional focuses evaluated independently in every run — `US`, `EUROPE`, `ASIA`
- `EDITORIAL_CATEGORIES`
- `CATEGORY_FREQUENCY_RULES`
- `TARGET_PUBLICATION_WINDOW`
- `APPROVED_SOURCE_POLICY`
- `RECENT_CONTENT_LIBRARY`
- `EDITORIAL_CALENDAR`
- `BRAND_POSITIONING`
- `COMPLIANCE_BOUNDARIES`
- `EXECUTION_PHASE`: `DISCOVERY` or `SELECTION_CONFIRMATION`

Do not require the user to restate safe canonical defaults already supplied by the orchestrator. Inputs marked unavailable remain unavailable; never simulate content memory, analytics, competitor evidence, or calendar events.

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

## 6. Handoff contract

When `TOPIC_SELECTED`, the next component receives one complete selected-opportunity object **per confirmed region**, each carrying:

- its `region` (`US`, `EUROPE`, or `ASIA`);
- the complete selected-opportunity object;
- the locked topic and angle;
- research questions;
- source plan;
- uncertainty and disputed-points register;
- prohibited claims;
- timing and recheck requirements;
- relevant content-memory results.

Each region's object is handed off and processed independently by the downstream chain; a defect, revision loop, or block in one region's article must never alter or delay another region's object.

The research stage must return an evidence-backed dossier before any writing skill executes, for each region in turn.

The writing skill must not silently change the locked topic or angle. A material change requires a return to this skill or human editorial approval.

No handoff is permitted for a region while its status is `AWAITING_USER_SELECTION`, `NO_SUITABLE_SHORTLIST` or `BLOCKED`.
