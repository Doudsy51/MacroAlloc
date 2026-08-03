---
name: review-article
description: Performs the final independent editorial review of a verified, optimized US-English MacroAlloc article while preserving the exact human-selected topic and locked angle. Use after discoverability optimization; block non-en-US primary content, missing TOPIC_SELECTED lineage, or topic drift.
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
    - Education Article
  compatibility_aliases:
    - editorial-review
    - review-financial-content
---

# review-article

## 0. Workflow invariants

- Require traceable upstream status `TOPIC_SELECTED` and explicit user-selection evidence tied to the preserved shortlist.
- Require the primary article and metadata to remain in US English (`en-US`).
- Return `BLOCKED` if the topic or angle differs materially from the human-selected topic or locked brief.
- Do not translate, replace, broaden or reselect the topic during review.
- Any requested language adaptation belongs to a separate downstream artifact after approval of the US-English package.

## 1. Mission

Act as the final independent editorial quality gate for a MacroAlloc article after factual verification and discoverability optimization.

The skill determines whether the article is sufficiently clear, coherent, useful, distinctive, brand-consistent and publication-ready to represent MacroAlloc.

It reviews the complete content package rather than isolated sentences. It must assess the article as an Editor-in-Chief would assess a finished draft before publication.

The skill is responsible for editorial judgment, not factual research, SEO strategy, topic selection, financial verification, legal advice, publication, or Word assembly.

Its final decision must be one of:

- `PUBLISH`
- `MINOR_REVISIONS`
- `MAJOR_REVISIONS`
- `REJECT`
- `EDITORIAL_DECISION_REQUIRED`
- `BLOCKED`

The skill must never declare content published. It may only declare it editorially ready for the next workflow step.

## 2. Position in the workflow

Expected upstream state:

- `APPROVED_FOR_SEO` from `verify-financial-article`;
- `DISCOVERABILITY_READY_FOR_REVIEW` from `optimize-content-discoverability`;
- no unresolved factual hard-gate defect;
- a complete optimized article;
- a complete verification report;
- a complete discoverability package;
- a locked topic, angle, content type and audience.

Required downstream state:

- `EDITORIALLY_APPROVED` when the decision is `PUBLISH`;
- `EDITORIAL_REVISION_REQUIRED` when the decision is `MINOR_REVISIONS` or `MAJOR_REVISIONS`;
- `EDITORIAL_REJECTED` when the decision is `REJECT`;
- `EDITORIAL_DECISION_REQUIRED` when human judgment is needed;
- `BLOCKED` when required inputs are missing or inconsistent.

Required downstream action:

- if `PUBLISH`: send the full approved package to the Word/package-generation workflow;
- if `MINOR_REVISIONS`: return a targeted revision plan to the appropriate upstream skill;
- if `MAJOR_REVISIONS`: stop packaging and return a structured revision brief;
- if `REJECT`: stop the workflow and explain why the article should not be published in its current form;
- if `EDITORIAL_DECISION_REQUIRED`: request human resolution before any automated continuation;
- if `BLOCKED`: identify the missing or contradictory inputs.

No automatic publication is allowed.

## 3. Core operating principles

### 3.1 Independent editorial judgment

Do not assume that the Writer, Verifier or Discoverability skill is correct merely because an upstream state says it passed.

Review the final reader-facing article independently.

Use upstream reports as evidence and constraints, not as substitutes for judgment.

### 3.2 No duplication of upstream responsibilities

This skill must not repeat full factual verification or rebuild the SEO package.

It may identify a suspected factual, compliance or discoverability issue when it is visible in the final article, but it must route the issue to the relevant upstream skill.

Examples:

- suspected unsupported number → route to `verify-financial-article`;
- misleading meta title → route to `optimize-content-discoverability`;
- weak causal explanation → route to `write-macro-insight` unless the verifier already identified it;
- broken article-package field → route to the workflow/package builder.

### 3.3 Reader-first standard

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

### 3.4 MacroAlloc brand standard

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

### 3.5 No silent repair

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

### 3.6 Proportionality

Do not block publication for cosmetic preferences.

Differentiate between:

- defects that harm accuracy, meaning, trust or usefulness;
- weaknesses that reduce quality but remain publishable;
- optional improvements with low marginal value.

The review must be demanding without becoming perfectionistic or arbitrary.

## 4. Responsibilities

The skill is responsible for:

1. evaluating the article's editorial coherence;
2. assessing reader experience and cognitive load;
3. evaluating clarity, rhythm, structure and progression;
4. testing whether the article answers the reader's central questions;
5. assessing educational value and explanatory depth;
6. evaluating analytical insight and distinctiveness;
7. detecting generic conclusions, empty commentary and formulaic AI language;
8. evaluating tone, objectivity and MacroAlloc brand consistency;
9. assessing whether uncertainty and limitations are communicated appropriately;
10. checking that title, dek, takeaways, body and conclusion are aligned;
11. checking that the optimized metadata does not misrepresent the article;
12. evaluating the article as a complete publication package;
13. producing a prioritized revision plan;
14. assigning transparent scores with evidence;
15. issuing the final editorial decision;
16. producing the normalized `EditorialReview` object for Word assembly and workflow logging.

## 5. Non-responsibilities

This skill must not:

- select a topic;
- change the locked angle without human approval;
- conduct new primary research;
- invent or repair facts;
- independently validate every source;
- change numerical evidence;
- create new causal claims;
- create new investment implications;
- change the verified MacroAlloc thesis;
- perform full SEO research;
- estimate keyword volumes without data;
- generate final images;
- publish the article;
- assemble the final Word document;
- provide personalized investment advice;
- make legal or regulatory determinations;
- claim certainty about audience performance, rankings or conversion.

## 6. Inputs

### 6.1 Mandatory inputs

The skill must receive:

- `CONTENT_TYPE`;
- `EDITION` where applicable;
- `LOCKED_TOPIC`;
- `LOCKED_ANGLE`;
- `TARGET_AUDIENCE`;
- `LANGUAGE`;
- `FINAL_ARTICLE`;
- `EXECUTIVE_SUMMARY`;
- `KEY_TAKEAWAYS`;
- `VERIFICATION_REPORT`;
- `VERIFICATION_STATUS`;
- `DISCOVERABILITY_PACKAGE`;
- `DISCOVERABILITY_STATUS`;
- `SOURCE_REGISTER`;
- `BRAND_GUIDELINES`;
- `DISCLAIMER_TEXT`;
- `REVISION_ATTEMPT`;
- `WORKFLOW_VERSION`;
- `WRITER_SKILL_VERSION`;
- `VERIFIER_SKILL_VERSION`;
- `DISCOVERABILITY_SKILL_VERSION`.

### 6.2 Optional inputs

Where available, also accept:

- article template;
- examples of approved MacroAlloc articles;
- rejected-article examples;
- human editorial notes;
- target word-count range;
- publication deadline;
- image package;
- chart recommendations;
- internal-link inventory;
- compliance notes;
- country-specific publication constraints;
- previous editorial review;
- previous draft for regression comparison;
- readability metrics;
- content performance data for similar articles;
- publication priority.

### 6.3 Blocking conditions

Return `BLOCKED` when:

- the final article is missing or materially incomplete;
- the verification status is not `APPROVED_FOR_SEO`;
- the discoverability status is not `DISCOVERABILITY_READY_FOR_REVIEW`;
- unresolved hard-gate issues remain in either upstream report;
- the locked topic or angle cannot be identified;
- the article and executive summary materially contradict each other;
- the article version does not match the version evaluated by upstream skills;
- required brand guidelines or disclaimer are unavailable;
- the article contains corrupted, truncated or duplicated sections;
- the reviewer cannot determine which text is reader-facing and which text is internal metadata.

Return `EDITORIAL_DECISION_REQUIRED` when:

- the article is factually supportable but the locked angle is editorially misleading;
- competing valid narratives exist and choosing emphasis requires human judgment;
- a high-impact claim is technically verified but may damage trust without reframing;
- the article is publishable only after changing the brand position or target audience;
- the final decision depends on legal, regulatory or reputational risk outside the skill's authority;
- the publication deadline conflicts with the minimum quality standard;
- the article is strong but materially overlaps another scheduled MacroAlloc publication and the correct action requires editorial prioritization.

## 7. Review sequence

The skill must execute the following sequence in order.

### Step 1 — Validate the input contract

Confirm:

- all mandatory inputs are present;
- upstream states are valid;
- article version identifiers match;
- no hard-gate defect is unresolved;
- the content type, audience and edition are coherent;
- internal notes are separated from reader-facing content.

### Step 2 — Establish the editorial promise

Identify the promise created by:

- H1;
- subtitle or dek;
- meta title;
- meta description;
- opening paragraph;
- key takeaways.

Express the promise in one sentence.

Example:

> The article promises to explain why a policy decision matters now, how it transmits across markets, and what indicators will determine the next phase.

The body and conclusion must fulfill that promise.

### Step 3 — Build the reader-question map

Extract the explicit and implicit questions a reasonable reader would expect the article to answer.

At minimum test:

- What happened?
- Why did it happen?
- Why does it matter now?
- Through which economic or market mechanisms does it matter?
- Which asset classes, regions or sectors are most relevant?
- What is uncertain or disputed?
- What would confirm or invalidate the thesis?
- What should the reader watch next?
- What is the article's distinctive contribution?

Classify each question as:

- `FULLY_ANSWERED`;
- `PARTIALLY_ANSWERED`;
- `NOT_ANSWERED`;
- `NOT_APPLICABLE`.

### Step 4 — Review macro structure

Assess whether the article follows a coherent analytical progression.

The structure does not need to be identical for every article, but it should normally move through functions such as:

1. event or context;
2. significance;
3. mechanism;
4. evidence;
5. cross-asset or portfolio relevance;
6. uncertainty and alternative interpretation;
7. observable next steps;
8. conclusion.

Detect:

- chronology without analysis;
- analysis before sufficient context;
- conclusions introduced before evidence;
- sections that repeat rather than advance;
- sections that belong elsewhere;
- abrupt shifts in geography, asset class or time horizon;
- conclusion-first writing that never substantiates the thesis;
- fragmented heading structures created only for SEO.

### Step 5 — Review paragraph-level flow

For each paragraph assess:

- one primary function;
- clear topic sentence;
- logical relation to the previous paragraph;
- sufficient evidence or explanation;
- appropriate length;
- no unnecessary repetition;
- no unresolved pronoun or vague reference;
- no hidden change of time horizon;
- no unsupported jump from fact to implication.

Flag paragraphs that contain multiple unrelated ideas or that can be removed without information loss.

### Step 6 — Review sentence-level clarity

Evaluate:

- sentence length;
- syntax;
- ambiguity;
- jargon;
- nominalizations;
- passive voice where it obscures agency;
- excessive subordinate clauses;
- stacked qualifiers;
- repeated sentence openings;
- machine-like rhythm;
- imprecise verbs;
- unnecessary intensifiers.

Do not enforce simplistic style rules. Complex financial ideas may require complex sentences, but complexity must remain controlled and readable.

### Step 7 — Review educational value

Determine whether the article helps the reader understand mechanisms rather than merely remember facts.

Assess:

- definitions of necessary concepts;
- explanation of causal channels;
- distinction between structural and cyclical forces;
- distinction between level, rate of change and expectations;
- distinction between nominal and real variables where relevant;
- explanation of why market reactions may differ from economic outcomes;
- use of historical context when useful;
- explanation of uncertainty and competing interpretations;
- usefulness to a reader with limited specialist knowledge.

The article should not become a textbook chapter. Explanations must be proportionate to the content type and audience.

### Step 8 — Review insight quality

Assess whether the article contributes meaningful analysis beyond a summary of available news.

Strong insight may include:

- a clear macroeconomic mechanism;
- identification of the variable that matters more than the headline;
- reconciliation of apparently contradictory data;
- cross-asset transmission;
- regime implications;
- conditional scenarios;
- overlooked risks;
- a useful distinction between consensus and MacroAlloc interpretation;
- identification of observable confirmation signals.

Weak insight includes:

- generic statements that markets dislike uncertainty;
- restating price moves without explaining them;
- listing risks without prioritization;
- repeating consensus without additional structure;
- ending with “investors should remain cautious” without specifying why or what to monitor;
- claiming significance without defining the transmission mechanism.

### Step 9 — Review objectivity and nuance

Check that the article:

- distinguishes fact from interpretation;
- distinguishes consensus from MacroAlloc view;
- labels scenarios and forecasts;
- acknowledges material uncertainty;
- avoids political advocacy unless directly relevant and evidence-based;
- avoids loaded language;
- avoids false balance when evidence is asymmetric;
- avoids unwarranted certainty;
- avoids personalizing institutional actions;
- does not imply that one market move proves a broad thesis.

### Step 10 — Review MacroAlloc voice

The article should be:

- professional;
- analytical;
- direct;
- pedagogical;
- internationally understandable;
- neutral but not bland;
- confident in supported analysis;
- humble about uncertainty;
- concise where the point is simple;
- detailed where the mechanism is complex.

Reject tone that is:

- sensational;
- promotional;
- moralizing;
- patronizing;
- chatty without purpose;
- academic for its own sake;
- derivative of generic AI prose;
- written as personal financial advice.

### Step 11 — Review headline-to-body alignment

Check that:

- the H1 accurately reflects the article;
- the subtitle clarifies rather than repeats;
- key takeaways are supported by the body;
- the meta title and description do not exaggerate;
- all major terms used in the title are explained;
- the conclusion answers the promise created by the opening;
- no section heading promises content that is not delivered.

### Step 12 — Review the opening

The opening should rapidly establish:

- what changed;
- why it matters;
- the core analytical tension;
- what the article will explain.

Flag openings that:

- begin with generic statements about uncertainty;
- repeat the headline;
- delay the main point;
- contain too many numbers before context;
- use dramatic framing unsupported by the article;
- introduce several themes without prioritization;
- sound like a newswire summary rather than MacroAlloc analysis.

### Step 13 — Review the conclusion

The conclusion must do more than repeat prior sentences.

It should:

- synthesize the central mechanism;
- explain the main conditional implication;
- identify what would confirm, weaken or invalidate the view;
- connect to the “What to Watch Next” section;
- preserve uncertainty;
- avoid personalized recommendations;
- avoid generic final lines.

Flag conclusions that could be appended to almost any financial article.

### Step 14 — Review cognitive load

Assess the effort required from the target reader.

Consider:

- jargon density;
- concept count per paragraph;
- unexplained abbreviations;
- number of time horizons;
- number of geographic frames;
- number of market variables introduced at once;
- sentence complexity;
- excessive parenthetical detail;
- repeated caveats that disrupt flow;
- tables or lists that would reduce load.

High information density is acceptable when the hierarchy is clear.

### Step 15 — Review originality and added value

Determine whether the article has a clear reason to exist.

Classify the contribution as one or more of:

- timely synthesis;
- original interpretation;
- superior explanation;
- cross-asset integration;
- educational framework;
- data decomposition;
- scenario analysis;
- actionable monitoring framework;
- distinctive MacroAlloc perspective.

If no meaningful contribution is identifiable, the article cannot receive `PUBLISH` solely because it is factually correct and optimized.

### Step 16 — Review repetition and redundancy

Detect:

- repeated facts;
- repeated thesis statements;
- takeaways copied into the introduction;
- conclusion copied from the opening;
- headings that repeat adjacent paragraphs;
- synonyms used to restate the same point without adding meaning;
- repeated caveats;
- repeated explanations of the same mechanism.

Distinguish useful reinforcement from redundancy.

### Step 17 — Review AI-pattern risk

Detect signals associated with generic machine-generated writing:

- excessive “not only... but also” constructions;
- repeated “this underscores/highlights” phrasing;
- empty “in a rapidly evolving landscape” language;
- mechanical three-part lists in every section;
- identical paragraph lengths;
- repeated transition formulas;
- broad claims followed by weak evidence;
- generic “investors should monitor” conclusions;
- artificial symmetry;
- unnecessary recaps;
- overuse of em dashes, colons or bold emphasis;
- excessive sectioning.

Do not reject an article merely because it is structured. Reject formulaic writing that reduces credibility or readability.

### Step 18 — Review discoverability integration

Confirm that optimization remains natural.

Check:

- headings improve navigation;
- keywords are not forced;
- answer blocks do not interrupt analytical flow;
- internal-link suggestions are relevant;
- metadata is faithful;
- schema recommendations match the content type;
- distribution variants preserve the original meaning;
- no discoverability field introduces an unverified claim.

### Step 19 — Review package completeness

Confirm that the final package contains, where required:

- article metadata;
- executive summary;
- SEO/discoverability package;
- final article;
- sources;
- verification report;
- visual package;
- distribution package;
- technical metadata;
- disclaimer;
- editorial review output.

This skill assesses completeness but does not assemble the Word file.

### Step 20 — Score, decide and route

Apply all scoring rules and hard gates.

Produce the final decision and exact downstream routing.

## 8. Editorial review modules

### 8.1 Editorial Quality Engine

Evaluate the article as a complete piece of professional financial publishing.

Dimensions:

- coherence;
- precision;
- economy;
- flow;
- hierarchy;
- balance;
- editorial discipline;
- completeness.

Questions:

- Does every section have a clear purpose?
- Does the argument progress?
- Is the central thesis stable?
- Is the strongest evidence given appropriate prominence?
- Are side issues controlled?
- Can any section be removed without loss?
- Does the article feel edited rather than merely generated?

### 8.2 Reader Experience Engine

Evaluate:

- ease of entry;
- sustained engagement;
- navigability;
- paragraph rhythm;
- sentence variation;
- information pacing;
- clarity of transitions;
- usefulness of headings;
- fatigue risk;
- satisfaction at the end.

The target is not entertainment. The target is efficient, rewarding comprehension.

### 8.3 Educational Value Engine

Evaluate whether the article improves the reader's mental model.

A strong article should help the reader understand at least one of:

- a causal mechanism;
- a data relationship;
- a policy trade-off;
- a market-pricing dynamic;
- a cross-asset transmission channel;
- a scenario framework;
- a monitoring framework.

### 8.4 Insight Quality Engine

Rate the insight as:

- `DISTINCTIVE`;
- `STRONG`;
- `ADEQUATE`;
- `LIMITED`;
- `GENERIC`.

A `GENERIC` result is a hard barrier to `PUBLISH` unless the content type is a basic educational article whose purpose is purely explanatory and the explanation itself is unusually clear.

### 8.5 Narrative Flow Engine

Map each section to a function:

- `CONTEXT`;
- `EVENT`;
- `MECHANISM`;
- `EVIDENCE`;
- `IMPLICATION`;
- `COUNTERPOINT`;
- `WATCHLIST`;
- `CONCLUSION`.

Identify missing functions, duplicate functions and illogical ordering.

### 8.6 Reader Questions Engine

Produce a table containing:

- question;
- importance;
- answer status;
- answer location;
- deficiency;
- required fix.

Any unanswered high-importance question must prevent `PUBLISH` unless it falls clearly outside the locked angle.

### 8.7 Cognitive Load Engine

Classify cognitive load as:

- `LOW`;
- `CONTROLLED`;
- `HIGH_BUT_JUSTIFIED`;
- `EXCESSIVE`.

`EXCESSIVE` prevents `PUBLISH`.

### 8.8 Objectivity and Trust Engine

Evaluate:

- neutrality;
- attribution;
- calibration;
- uncertainty;
- separation of fact and interpretation;
- absence of sensationalism;
- absence of advice language;
- consistency with source quality.

### 8.9 Brand Consistency Engine

Evaluate whether the article reflects MacroAlloc's positioning:

- macro analysis;
- ETF and portfolio relevance where appropriate;
- educational clarity;
- institutional-quality discipline;
- accessible language;
- no unsupported bravado;
- no artificial personalization.

### 8.10 Publication Decision Engine

Use scores and hard gates to select the final decision.

The decision must not be based on the global score alone.

A high average cannot compensate for a critical defect.

## 9. Issue taxonomy

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

## 10. Scoring model

Score each dimension from 0 to 100.

### 10.1 Editorial Quality — 20%

Measures:

- coherence;
- discipline;
- structure;
- economy;
- polish.

### 10.2 Reader Experience — 15%

Measures:

- readability;
- flow;
- pacing;
- navigability;
- fatigue.

### 10.3 Educational Value — 15%

Measures:

- explanatory depth;
- conceptual clarity;
- mechanism understanding;
- usefulness.

### 10.4 Insight Quality — 15%

Measures:

- distinctiveness;
- analytical contribution;
- prioritization;
- cross-asset or macro relevance.

### 10.5 Objectivity and Trust — 10%

Measures:

- calibration;
- neutrality;
- uncertainty;
- attribution;
- non-promotional tone.

### 10.6 MacroAlloc Brand Fit — 10%

Measures:

- macro-first identity;
- mechanism-led analysis;
- pedagogical quality;
- professional tone;
- audience fit.

### 10.7 Structural and Metadata Alignment — 5%

Measures:

- title/body alignment;
- takeaway consistency;
- conclusion alignment;
- metadata fidelity.

### 10.8 Originality and Added Value — 5%

Measures:

- reason to exist;
- differentiated contribution;
- avoidance of commodity commentary.

### 10.9 Package Completeness — 5%

Measures:

- presence and consistency of required deliverables.

### 10.10 Global score

Compute the weighted score.

Use one decimal place.

Do not fabricate mathematical precision. The score supports judgment; it does not replace it.

## 11. Mandatory quality gates

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

## 12. Decision rules

### 12.1 PUBLISH

Return `PUBLISH` only when:

- every mandatory gate passes;
- no `CRITICAL`, `MAJOR` or unresolved `MODERATE` issue remains;
- global score is at least 88;
- Editorial Quality is at least 85;
- Objectivity and Trust is at least 90;
- MacroAlloc Brand Fit is at least 85;
- Insight Quality meets the content-type threshold;
- the reviewer can explain the article's distinctive value in one sentence.

Output state:

- `EDITORIALLY_APPROVED`.

### 12.2 MINOR_REVISIONS

Return `MINOR_REVISIONS` when:

- no `CRITICAL` or `MAJOR` issue exists;
- one or more correctable `MODERATE` or `MINOR` issues remain;
- the central thesis, facts and angle do not need to change;
- corrections can be completed through targeted editing;
- global score is normally 80–87.9, or higher with an unresolved mandatory gate.

Output state:

- `EDITORIAL_REVISION_REQUIRED`.

### 12.3 MAJOR_REVISIONS

Return `MAJOR_REVISIONS` when:

- one or more `MAJOR` issues exist;
- the article's structure, insight, reader-question coverage or educational value is materially insufficient;
- significant sections must be rewritten;
- the article remains salvageable without selecting a new topic;
- global score is normally 65–79.9.

Output state:

- `EDITORIAL_REVISION_REQUIRED`.

### 12.4 REJECT

Return `REJECT` when:

- the article lacks a defensible reason to exist;
- the insight is `GENERIC` and cannot be repaired without rebuilding the article;
- the locked angle is not supported by the final content;
- the article is structurally incoherent;
- the content substantially duplicates another article without a valid purpose;
- revision would effectively require a new article;
- global score is below 65;
- repeated revision attempts have failed to resolve material defects.

Output state:

- `EDITORIAL_REJECTED`.

### 12.5 EDITORIAL_DECISION_REQUIRED

Return when a human editorial decision is necessary under Section 6.3.

### 12.6 BLOCKED

Return when the review cannot be performed reliably because mandatory inputs or valid upstream states are missing.

## 13. Revision routing

Every issue must identify the responsible component.

Route to `write-macro-insight` when the issue concerns:

- article structure;
- explanation;
- flow;
- insight;
- conclusion;
- reader-question coverage;
- tone;
- repetition;
- cognitive load;
- MacroAlloc voice.

Route to `verify-financial-article` when the issue concerns:

- suspected unsupported fact;
- conflicting number;
- ambiguous attribution;
- altered causal claim;
- missing uncertainty;
- compliance-sensitive financial wording requiring factual context.

Route to `optimize-content-discoverability` when the issue concerns:

- meta title or description;
- search-intent mismatch;
- forced keyword use;
- unnatural heading;
- misleading answer block;
- internal linking;
- schema recommendation;
- distribution copy;
- image metadata.

Route to workflow/package generation when the issue concerns:

- missing fields;
- incorrect version metadata;
- Word assembly;
- table of contents;
- visual placement;
- document formatting;
- file naming;
- status labels.

Route to human editor when the issue concerns:

- editorial positioning;
- reputational risk;
- brand-policy exception;
- publication timing trade-off;
- unresolved overlap between equally valid articles;
- scope change.

## 14. Revision-loop rules

- A maximum of two automated editorial revision cycles is allowed after the first review.
- Each cycle must address only the issue IDs listed in the review unless a correction introduces a new defect.
- The reviewer must compare the revised draft against the prior approved factual and discoverability versions.
- No revision may silently alter verified facts, causal pivots or source attribution.
- If material defects remain after two automated cycles, return `EDITORIAL_DECISION_REQUIRED` or `REJECT`.
- Do not lower the standard merely because the revision limit has been reached.

## 15. Regression checks

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

## 16. Output contract

Return a normalized `EditorialReview` object with the following structure.

```yaml
EditorialReview:
  skill:
    name: review-article
    version: 1.1.0
    executed_at: ISO-8601 timestamp
    workflow_version: string
  identity:
    content_type: string
    edition: string | null
    locked_topic: string
    locked_angle: string
    target_audience: string
    language: string
    article_version: string
  upstream_validation:
    verification_status: string
    discoverability_status: string
    unresolved_hard_gates: []
    input_contract: PASS | FAIL
  editorial_promise:
    promise_statement: string
    fulfilled: true | false
    evidence: string
  reader_question_map:
    - question_id: RQ-001
      question: string
      importance: HIGH | MEDIUM | LOW
      status: FULLY_ANSWERED | PARTIALLY_ANSWERED | NOT_ANSWERED | NOT_APPLICABLE
      answer_location: string
      required_action: string | null
  structure_map:
    - section: string
      function: CONTEXT | EVENT | MECHANISM | EVIDENCE | IMPLICATION | COUNTERPOINT | WATCHLIST | CONCLUSION | OTHER
      assessment: string
  scores:
    editorial_quality: 0-100
    reader_experience: 0-100
    educational_value: 0-100
    insight_quality: 0-100
    objectivity_and_trust: 0-100
    macroalloc_brand_fit: 0-100
    structural_metadata_alignment: 0-100
    originality_added_value: 0-100
    package_completeness: 0-100
    global_score: 0-100
  qualitative_classifications:
    insight_classification: DISTINCTIVE | STRONG | ADEQUATE | LIMITED | GENERIC
    cognitive_load: LOW | CONTROLLED | HIGH_BUT_JUSTIFIED | EXCESSIVE
    ai_pattern_risk: LOW | MEDIUM | HIGH
    originality: HIGH | MEDIUM | LOW
  quality_gates:
    upstream_integrity: PASS | FAIL
    editorial_promise: PASS | FAIL
    central_thesis_coherence: PASS | FAIL
    reader_question_completeness: PASS | FAIL
    insight_threshold: PASS | FAIL
    educational_value: PASS | FAIL
    objectivity_uncertainty: PASS | FAIL
    cognitive_load: PASS | FAIL
    conclusion_quality: PASS | FAIL
    brand_consistency: PASS | FAIL
    metadata_fidelity: PASS | FAIL
    compliance_signal: PASS | FAIL
    package_completeness: PASS | FAIL
  strengths:
    - strength_id: STR-001
      description: string
      evidence_location: string
  issues:
    - issue_id: ED-001
      category: string
      severity: CRITICAL | MAJOR | MODERATE | MINOR | OPTIONAL
      location: string
      problem: string
      reader_impact: string
      required_action: string
      responsible_component: string
      acceptance_test: string
  revision_plan:
    priority_1: []
    priority_2: []
    priority_3: []
  regression_checks:
    - check: string
      status: PASS | FAIL | NOT_APPLICABLE
      note: string
  distinctive_value:
    statement: string
    sufficient: true | false
  publication_decision:
    decision: PUBLISH | MINOR_REVISIONS | MAJOR_REVISIONS | REJECT | EDITORIAL_DECISION_REQUIRED | BLOCKED
    workflow_state: string
    rationale: string
    next_action: string
  word_package_summary:
    editorial_status_label: string
    global_score: number
    strongest_dimension: string
    weakest_dimension: string
    key_strengths: []
    key_risks: []
    publication_readiness: string
```

## 17. Human-readable AI Review Summary

Produce a concise page-ready summary for the MacroAlloc Article Package.

Required format:

### AI Editorial Review Summary

- **Decision:**
- **Global Score:**
- **Editorial Quality:**
- **Reader Experience:**
- **Educational Value:**
- **Insight Quality:**
- **Objectivity & Trust:**
- **MacroAlloc Brand Fit:**
- **Publication Readiness:**

#### Principal strengths

Three to five evidence-based strengths.

#### Principal weaknesses

Zero to five material weaknesses.

#### Required revisions

List only mandatory revisions. If none, write `None`.

#### Editorial rationale

A concise explanation of why the article did or did not receive approval.

The summary must not conceal material issues behind the global score.

## 18. Writing requirements for the review report

The report must be:

- direct;
- specific;
- evidence-based;
- actionable;
- concise relative to the article;
- free from praise inflation;
- free from vague criticism;
- professional in tone.

Avoid:

- “could be improved” without explaining how;
- generic comments such as “add more detail”;
- style preferences presented as mandatory rules;
- repeating the article;
- excessive commentary on minor wording;
- pretending to know reader behavior without evidence.

## 19. Acceptance-test examples

Bad issue:

> The conclusion is weak.

Good issue:

> `ED-014 — MAJOR — Conclusion, paragraphs 2–3`: The conclusion repeats the opening market summary but does not state which observable conditions would confirm or weaken the article's thesis. Add a conditional synthesis linking inflation persistence, the next policy meeting and the relevant rate-market indicator. Acceptance test: the revised conclusion contains one confirmation condition, one invalidation condition and no personalized investment instruction.

Bad issue:

> The article is too technical.

Good issue:

> `ED-021 — MODERATE — Section “Term Premium and the Long End”`: The section introduces term premium, duration supply and real-rate decomposition within two paragraphs without defining term premium. Add a one-sentence definition before the decomposition and split the second paragraph. Acceptance test: a non-specialist can identify what term premium represents and why it matters for long-dated yields.

## 20. Content-type adaptations

### 20.1 Morning Macro Insight

Prioritize:

- immediacy;
- clear overnight or recent development;
- concise mechanism;
- observable day-ahead watchlist;
- avoidance of stale recap.

### 20.2 Evening Macro Insight

Prioritize:

- synthesis of the session;
- explanation of what changed during the day;
- distinction between event and market interpretation;
- next-session or next-data watchlist.

### 20.3 Market Analysis

Require:

- stronger depth;
- multi-factor reasoning;
- cross-asset consistency;
- alternatives and risks;
- a clear time horizon.

### 20.4 ETF Research

Require:

- product relevance;
- methodology clarity;
- objective comparison;
- no product promotion;
- clear separation between index, fund and market exposure;
- appropriate risk disclosure.

### 20.5 Education Article

Prioritize:

- conceptual progression;
- definitions;
- examples;
- prerequisite awareness;
- avoidance of unnecessary market commentary;
- long-term usefulness.

## 21. Performance and observability fields

The workflow should log:

- execution timestamp;
- model identifier;
- skill version;
- article version;
- token or compute cost where available;
- review duration;
- issue count by severity;
- decision;
- revision cycle count;
- final approval status;
- human override;
- override reason;
- later publication outcome;
- post-publication defects linked back to the review.

These fields support future evaluation and regression testing.

## 22. Evaluation dataset recommendations

Test the skill against at least:

- 20 high-quality approved articles;
- 20 factually correct but editorially weak articles;
- 10 articles with generic conclusions;
- 10 articles with title/body mismatch;
- 10 articles with excessive jargon;
- 10 articles with strong facts but weak insight;
- 10 articles with SEO over-optimization;
- 10 articles containing subtle advice language;
- 10 articles with missing reader questions;
- 10 revised articles containing regressions.

Measure:

- agreement with expert editors;
- false approval rate;
- false rejection rate;
- issue-location accuracy;
- revision usefulness;
- consistency across repeated runs;
- sensitivity to content type;
- ability to distinguish critical defects from preferences.

## 23. Final rule

The reviewer exists to protect reader trust and the MacroAlloc brand.

It must not approve an article because the workflow is complete, the deadline is near, or the average score is high.

It must approve only when the complete article is accurate enough upstream, editorially coherent, meaningfully useful, recognizably MacroAlloc and ready to enter the final packaging stage.

End of Skill.
