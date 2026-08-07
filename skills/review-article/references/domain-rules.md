# Review Article — Domain Rules

## Contents

- 1. Workflow invariants
- 2. Editorial review modules
- 3. Scoring model
- 4. Decision rules
- 5. Human-readable AI Review Summary
- 6. Writing requirements for the review report
- 7. Content-type adaptations
- 8. Evaluation dataset recommendations

## 1. Workflow invariants

- Require traceable upstream status `TOPIC_SELECTED` and explicit user-selection evidence tied to the preserved shortlist.
- Require the primary article and metadata to remain in US English (`en-US`).
- Return `BLOCKED` if the topic or angle differs materially from the human-selected topic or locked brief.
- Do not translate, replace, broaden or reselect the topic during review.
- Any requested language adaptation belongs to a separate downstream artifact after approval of the US-English package.

## 2. Editorial review modules

### 2.1 Editorial Quality Engine

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

### 2.2 Reader Experience Engine

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

### 2.3 Educational Value Engine

Evaluate whether the article improves the reader's mental model.

A strong article should help the reader understand at least one of:

- a causal mechanism;
- a data relationship;
- a policy trade-off;
- a market-pricing dynamic;
- a cross-asset transmission channel;
- a scenario framework;
- a monitoring framework.

### 2.4 Insight Quality Engine

Rate the insight as:

- `DISTINCTIVE`;
- `STRONG`;
- `ADEQUATE`;
- `LIMITED`;
- `GENERIC`.

A `GENERIC` result is a hard barrier to `PUBLISH` unless the content type is a basic educational article whose purpose is purely explanatory and the explanation itself is unusually clear.

### 2.5 Narrative Flow Engine

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

### 2.6 Reader Questions Engine

Produce a table containing:

- question;
- importance;
- answer status;
- answer location;
- deficiency;
- required fix.

Any unanswered high-importance question must prevent `PUBLISH` unless it falls clearly outside the locked angle.

### 2.7 Cognitive Load Engine

Classify cognitive load as:

- `LOW`;
- `CONTROLLED`;
- `HIGH_BUT_JUSTIFIED`;
- `EXCESSIVE`.

`EXCESSIVE` prevents `PUBLISH`.

### 2.8 Objectivity and Trust Engine

Evaluate:

- neutrality;
- attribution;
- calibration;
- uncertainty;
- separation of fact and interpretation;
- absence of sensationalism;
- absence of advice language;
- consistency with source quality.

### 2.9 Brand Consistency Engine

Evaluate whether the article reflects MacroAlloc's positioning:

- macro analysis;
- ETF and portfolio relevance where appropriate;
- educational clarity;
- institutional-quality discipline;
- accessible language;
- no unsupported bravado;
- no artificial personalization.

### 2.10 Publication Decision Engine

Use scores and hard gates to select the final decision.

The decision must not be based on the global score alone.

A high average cannot compensate for a critical defect.

### 2.11 AI-Pattern and Human-Voice Engine

Assess whether a reader would conclude a person wrote this article. This is independent of factual accuracy and of the Editorial Quality Engine (2.1): a flawlessly accurate article can still read as generated. This assessment is performed by `review-article` only. `write-macro-insight` follows the writing rules in its own domain-rules Section 2.4 but never scores or certifies its own draft.

**Important limitation to disclose alongside every score**: this is a structured rubric applied by the reviewing skill itself, not an independently trained AI-detection classifier. Report it as `human_writing_score`, not as the output of a third-party detection tool, and never imply a certainty level that a rubric-based self-assessment cannot support.

#### Scoring method

Start at 100 and apply every deduction that applies, once per distinct instance found (not once per criterion):

| Criterion | Deduction per instance | Cap |
|---|---|---|
| A section where sentences run uniform length/rhythm throughout, with no deliberate short/long mix | -15 | -15 (once per article) |
| Three or more consecutive sentences opening with the same word or grammatical construction | -10 | -20 |
| A mechanical transition word ("Moreover," "Furthermore," "Additionally," "It is worth noting that," "Importantly") repeated a second time in the article, or opening a second paragraph | -10 | -20 |
| A "rule of three" list or "on one hand / on the other hand" framing applied where the material does not call for exactly three items or two balanced sides | -10 | -20 |
| Generic signposting ("Let's break this down," "Here's what this means," "In today's environment") | -10 | -20 |
| A hedge phrase repeated identically across paragraphs regardless of the actual certainty of each claim | -15 | -15 (once per article) |
| Section lengths/shapes suspiciously uniform rather than matched to what each section needs | -10 | -10 (once per article) |

Floor the result at 0. Record every deduction applied, with its location, in `human_voice_audit.deductions`. Do not return a bare number without the itemized basis for it.

`ai_pattern_risk` is a derived label for quick reading, not a separate judgment: `LOW` for a score of 90-100, `MEDIUM` for 80-89, `HIGH` for below 80.

#### Em dash: separate, zero-tolerance check

Count every em dash ("—", and any double-hyphen "--" used as an em-dash substitute) in the article body. This is checked independently of the score above:

- `em_dash_count` must be exactly `0`.
- Any occurrence fails Gate 15 (quality-and-tests.md) regardless of the `human_writing_score`, and regardless of whether the em dash is arguably well-used. There is no minimum-instance exception.
- Route a failure with the exact sentence and location; the required correction is to replace the em dash with a comma, a period, parentheses, or a restructured sentence. Keeping it because removal feels awkward is not an acceptable resolution.

#### Publication threshold

`PUBLISH` requires `human_writing_score >= 80` **and** `em_dash_count == 0`, both independently of every other score (see Gates 14 and 15 in quality-and-tests.md). Route a failure on either to `write-macro-insight` with the specific patterns and locations found. A vague instruction such as "make it sound more human" is not an acceptable revision instruction; name the exact repeated phrase, transition, structural tic, or em dash location.

## 3. Scoring model

Score each dimension from 0 to 100.

### 3.1 Editorial Quality — 20%

Measures:

- coherence;
- discipline;
- structure;
- economy;
- polish.

### 3.2 Reader Experience — 15%

Measures:

- readability;
- flow;
- pacing;
- navigability;
- fatigue.

### 3.3 Educational Value — 15%

Measures:

- explanatory depth;
- conceptual clarity;
- mechanism understanding;
- usefulness.

### 3.4 Insight Quality — 15%

Measures:

- distinctiveness;
- analytical contribution;
- prioritization;
- cross-asset or macro relevance.

### 3.5 Objectivity and Trust — 10%

Measures:

- calibration;
- neutrality;
- uncertainty;
- attribution;
- non-promotional tone.

### 3.6 MacroAlloc Brand Fit — 10%

Measures:

- macro-first identity;
- mechanism-led analysis;
- pedagogical quality;
- professional tone;
- audience fit.

### 3.7 Structural and Metadata Alignment — 5%

Measures:

- title/body alignment;
- takeaway consistency;
- conclusion alignment;
- metadata fidelity.

### 3.8 Originality and Added Value — 5%

Measures:

- reason to exist;
- differentiated contribution;
- avoidance of commodity commentary.

### 3.9 Package Completeness — 5%

Measures:

- presence and consistency of required deliverables.

### 3.10 Global score

Compute the weighted score.

Use one decimal place.

Do not fabricate mathematical precision. The score supports judgment; it does not replace it.

## 4. Decision rules

### 4.1 PUBLISH

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

- `PUBLISH`.

### 4.2 MINOR_REVISIONS

Return `MINOR_REVISIONS` when:

- no `CRITICAL` or `MAJOR` issue exists;
- one or more correctable `MODERATE` or `MINOR` issues remain;
- the central thesis, facts and angle do not need to change;
- corrections can be completed through targeted editing;
- global score is normally 80–87.9, or higher with an unresolved mandatory gate.

Output state:

- `MINOR_REVISIONS`.

### 4.3 MAJOR_REVISIONS

Return `MAJOR_REVISIONS` when:

- one or more `MAJOR` issues exist;
- the article's structure, insight, reader-question coverage or educational value is materially insufficient;
- significant sections must be rewritten;
- the article remains salvageable without selecting a new topic;
- global score is normally 65–79.9.

Output state:

- `MAJOR_REVISIONS`.

### 4.4 REJECT

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

- `REJECT`.

### 4.5 EDITORIAL_DECISION_REQUIRED

Return when a human editorial decision is necessary under the blocking conditions in [references/workflow.md](workflow.md) Section 5.3.

### 4.6 BLOCKED

Return when the review cannot be performed reliably because mandatory inputs or valid upstream states are missing.

## 5. Human-readable AI Review Summary

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

## 6. Writing requirements for the review report

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

## 7. Content-type adaptations

### 7.1 Morning Macro Insight

Prioritize:

- immediacy;
- clear overnight or recent development;
- concise mechanism;
- observable day-ahead watchlist;
- avoidance of stale recap.

### 7.2 Evening Macro Insight

Prioritize:

- synthesis of the session;
- explanation of what changed during the day;
- distinction between event and market interpretation;
- next-session or next-data watchlist.

### 7.3 Market Analysis

Require:

- stronger depth;
- multi-factor reasoning;
- cross-asset consistency;
- alternatives and risks;
- a clear time horizon.

### 7.4 ETF Research

Require:

- product relevance;
- methodology clarity;
- objective comparison;
- no product promotion;
- clear separation between index, fund and market exposure;
- appropriate risk disclosure.

### 7.5 Education Article

Prioritize:

- conceptual progression;
- definitions;
- examples;
- prerequisite awareness;
- avoidance of unnecessary market commentary;
- long-term usefulness.

## 8. Evaluation dataset recommendations

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
