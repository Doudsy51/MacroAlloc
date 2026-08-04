# Review Article — Workflow

## Contents

- 1. Mission
- 2. Position in the workflow
- 4. Responsibilities
- 5. Non-responsibilities
- 6. Inputs
- 7. Review sequence
- 13. Revision routing
- 14. Revision-loop rules

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

The decision itself is the downstream state. Use only `PUBLISH`, `MINOR_REVISIONS`, `MAJOR_REVISIONS`, `REJECT`, `EDITORIAL_DECISION_REQUIRED`, or `BLOCKED`. Do not emit legacy compatibility aliases in new runs.

Required downstream action:

- if `PUBLISH`: send the full approved package to the Word/package-generation workflow;
- if `MINOR_REVISIONS`: return a targeted revision plan to the appropriate upstream skill;
- if `MAJOR_REVISIONS`: stop packaging and return a structured revision brief;
- if `REJECT`: stop the workflow and explain why the article should not be published in its current form;
- if `EDITORIAL_DECISION_REQUIRED`: request human resolution before any automated continuation;
- if `BLOCKED`: identify the missing or contradictory inputs.

No automatic publication is allowed.

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
