---
name: write-macro-insight
description: Produces or revises a publication-quality MacroAlloc Macro Insight in US English only after receiving proof of the user's explicit selection from the active 3-to-5-topic shortlist. Use when ChatGPT needs to draft a complete, traceable Morning or Evening Macro Insight for verification. Refuse drafting without TOPIC_SELECTED, and never replace the primary US-English article with another language.
metadata:
  version: 1.1.0
  status: TESTING
  owner: MacroAlloc Content Factory
  language: en-US
  content_types:
    - Morning Macro Insight
    - Evening Macro Insight
---

# write-macro-insight

## 1. Mission

Produce or revise a publication-quality MacroAlloc Macro Insight in US English from a locked, human-selected topic brief and an evidence-backed research dossier.

The skill is responsible for editorial drafting only. It must create a complete, traceable article draft that can be independently verified by `verify-financial-article`, then optimized by `optimize-macro-insight-seo`.

It must never claim that an article is publishable, approved, verified, or ready for publication.

## 2. Position in the workflow

Expected upstream state:

- `TOPIC_SELECTED`
- a locked Morning or Evening edition
- a fixed topic and angle chosen by the user
- an evidence dossier containing sources, confirmed facts, uncertainties, disputed points, relevant context, and prohibited claims

Required downstream state:

- `DRAFT_READY_FOR_VERIFICATION`

Valid modes:

- `DRAFT`: initial article, `REVISION_ATTEMPT = 0`
- `REVISION`: targeted correction of an existing draft after a verifier report, `REVISION_ATTEMPT = 1` or `2`

No third automatic revision is allowed.

## 3. Inputs

### 3.1 Mandatory inputs

The skill must receive all of the following:

- `EDITION`: `Morning` or `Evening`
- `UPSTREAM_STATUS`: exactly `TOPIC_SELECTED`
- `SELECTION_EVIDENCE`: the user's explicit shortlist number, `OPPORTUNITY_ID`, or exact title
- `SELECTED_TOPIC_ID`: matching an item in the preserved shortlist
- `PRIMARY_LANGUAGE`: exactly `en-US`
- `MODE`: `DRAFT` or `REVISION`
- `REVISION_ATTEMPT`: `0`, `1`, or `2`
- `LOCKED_TOPIC`
- `LOCKED_ANGLE`
- `WORKING_TITLE`
- `MACROALLOC_THESIS`
- `TRANSMISSION_CHANNELS`: two to four mechanisms
- `RESEARCH_DOSSIER`
- `SOURCE_REGISTER`
- `UNCERTAINTIES`
- `DISPUTED_OR_AMBIGUOUS_POINTS`
- `PROHIBITED_CLAIMS`
- `CONTEXT_FACTORS`
- `RECHECK_ITEMS`

For `REVISION`, also require:

- `EXISTING_DRAFT`
- `VERIFIER_REPORT`
- exact issue locations and correction instructions

### 3.2 Blocking conditions

Return `BLOCKED` without drafting when:

- `UPSTREAM_STATUS` is not exactly `TOPIC_SELECTED`;
- explicit `SELECTION_EVIDENCE` is missing, ambiguous, or does not match `SELECTED_TOPIC_ID`;
- the selected topic is absent from the preserved shortlist;
- `PRIMARY_LANGUAGE` is not exactly `en-US`;
- the edition is missing or ambiguous;
- the topic or angle is not locked;
- the evidence dossier is materially incomplete;
- the core thesis cannot be supported by the available evidence;
- fewer than two credible independent sources support the central factual basis, unless one authoritative primary source is corroborated by one independent financial source;
- a requested revision would require inventing evidence or overriding the verifier;
- the content cannot be written without unsubstantiated accusation, personalized investment advice, a transaction instruction, or a promise of performance.

When blocked, state only the missing or conflicting inputs required to continue.

## 4. Editorial scope

### 4.1 In scope

- monetary policy;
- inflation, growth, labor, fiscal policy and public finance;
- trade, sanctions and industrial policy;
- commodities and energy;
- geopolitics with a defensible macroeconomic or cross-asset transmission mechanism;
- material repricing across equities, rates, credit, currencies or commodities;
- Morning and Evening Macro Insights for an international audience, with US organic search as the priority market.

### 4.2 Out of scope

- ETF product research;
- individual-security recommendations;
- personalized asset allocation;
- pure political commentary without an economic or market mechanism;
- unsourced speculation;
- social-media posts, newsletters, video scripts or French adaptation;
- SEO metadata generation beyond recording an upstream keyword hypothesis;
- final Word assembly;
- publication or CMS actions.

## 5. Core writing standard

### 5.1 Language and tone

Write in clear, professional US English.

US English is the immutable primary-production language. A user request for French or another language may be recorded as a future secondary adaptation request, but it must not change this draft's language. Do not produce the secondary adaptation in this skill.

The tone must be:

- analytical rather than promotional;
- precise rather than dramatic;
- accessible to an informed non-specialist;
- cautious where evidence is provisional;
- substantive without academic padding;
- recognizably MacroAlloc: macro-first, mechanism-led, cross-asset aware, and explicit about uncertainty.

Avoid:

- clickbait;
- generic market commentary;
- rhetorical exaggeration;
- unexplained jargon;
- empty transitions;
- formulaic AI phrasing;
- repeated conclusions;
- recommendations framed as what investors “should” buy, sell or hold.

### 5.2 Target length

- Standard article: 700–1,000 words.
- Complex topic: 1,000–1,300 words.
- Maximum: 1,500 words only when the evidence and angle justify the additional length.

Do not lengthen an article merely to meet a target.

### 5.3 Required editorial architecture

The draft should normally include:

1. A descriptive H1 stating the event and the economic or market consequence.
2. A concise subtitle or dek.
3. Three key takeaways.
4. An opening that answers what happened, why it matters now, and what remains uncertain.
5. Two to five H2 sections organized by analytical logic, not chronology alone.
6. A substantive MacroAlloc analysis section linking the event to economic and market transmission.
7. A “What to Watch Next” section with observable indicators, dates or conditions.
8. The standard informational disclaimer.
9. A numbered source list.
10. Internal editorial notes and structured output metadata.

The structure may be adapted when the topic demands it, but the essential functions must remain present.

## 6. Evidence and attribution rules

### 6.1 No unsupported facts

Every externally verifiable claim must be traceable to the research dossier or source register.

This includes:

- numbers;
- dates;
- votes;
- policy decisions;
- quotations and paraphrases;
- market levels and movements;
- causal attributions made by officials, economists or journalists;
- historical comparisons;
- institutional roles;
- legal or regulatory claims;
- consensus expectations.

Do not infer a missing number, date, quote, position or cause.

### 6.2 Source markers

Use discreet numbered markers such as `[1]`, `[2]` and `[3]` in the body.

- Place markers immediately after the supported sentence or clause.
- Do not overload every sentence when several adjacent sentences rely on the same source and the attribution remains clear.
- List full URLs only in the final Sources section.
- Do not invent or normalize a URL that was not supplied or verified.

### 6.3 Source hierarchy

Prefer:

1. authoritative primary sources;
2. Reuters, Bloomberg, Financial Times, Wall Street Journal, Associated Press or similarly rigorous financial/news organizations;
3. recognized institutions, exchanges and research organizations;
4. other sources only when necessary and explicitly qualified.

A primary source does not eliminate the need for independent corroboration when the interpretation is disputed or when the source is an interested party.

### 6.4 Attribution of uncertain or interested-party claims

Claims from governments, armed forces, companies, political actors, state media or anonymous officials must remain explicitly attributed unless independently established.

Use formulations such as:

- “according to…”;
- “the ministry said…”;
- “Reuters reported, citing…”;
- “the claim could not be independently verified.”

Never convert an attributed allegation into an established fact.

## 7. Facts, interpretation, scenarios and forecasts

The article must distinguish four layers:

### 7.1 Confirmed facts

Events and data supported by the evidence dossier.

### 7.2 Uncertainty

Missing, provisional, disputed or fast-changing information.

### 7.3 MacroAlloc interpretation

The analytical inference drawn from facts. It must be clearly framed as analysis, not fact.

### 7.4 Scenarios or forecasts

Conditional outcomes that depend on future developments. Use explicit conditional language.

Prohibited certainty formulations include:

- “will definitely”;
- “guarantees”;
- “proves” when evidence only supports consistency;
- “the market will”;
- “investors must.”

## 8. MacroAlloc analysis standard

The article must add more than a news summary.

### 8.1 Required analytical chain

Where relevant, explain:

`event or data → economic mechanism → policy or financial-condition effect → market transmission → observable conditions that could confirm or invalidate the thesis`

The analysis must identify at least two supported transmission channels from the topic brief.

Examples include:

- energy supply → inflation → central-bank reaction → real yields and equity valuations;
- tariffs → import prices and margins → growth/inflation mix → rates, FX and equities;
- fiscal issuance → term premium → financing conditions → housing and long-duration assets;
- labor data → income and demand → policy expectations → curve and currency repricing.

### 8.2 Central causal pivot

Identify the one to three claims on which the central thesis depends.

For each causal pivot:

- ensure the claim exists in the evidence dossier;
- avoid presenting a disputed interpretation as settled;
- mention a material counter-interpretation when supplied;
- do not build a conclusion on a single ambiguous remark or market move;
- flag the pivot explicitly in internal notes for enhanced verifier scrutiny.

### 8.3 Alternative explanations

When plausible alternatives materially affect the interpretation, include them or explain their exclusion in internal notes.

Do not manufacture false balance. Alternatives must be evidence-based and relevant.

### 8.4 Specificity of market implications

Avoid generic conclusions such as:

> “Bonds may remain volatile, equities could face pressure and the dollar may move.”

Instead, connect each implication to a mechanism supported by the article, such as:

- term-premium repricing;
- changes in the expected policy path;
- real-rate sensitivity of long-duration valuations;
- refinancing costs;
- margin compression;
- currency-rate differentials;
- physical supply constraints;
- liquidity or funding stress.

If the evidence does not support asset-specific implications, state that limitation rather than filling space.

## 9. Context-completeness control

This control is mandatory before finalizing the draft.

### 9.1 Source-to-draft reconciliation

Review every primary source and every material secondary source used in the research dossier.

For each material contextual factor contained in a cited source, classify it as:

- `INTEGRATED_IN_ARTICLE`;
- `EXCLUDED_AS_IMMATERIAL`;
- `EXCLUDED_TO_PRESERVE_SCOPE`;
- `EXCLUDED_DUE_TO_INSUFFICIENT_CORROBORATION`;
- `REQUIRES_VERIFIER_REVIEW`.

A material contextual factor includes information that could:

- change the interpretation of a data release;
- weaken or qualify the article’s thesis;
- reveal a temporary or base effect;
- identify a geopolitical, regulatory or supply-side confounder;
- alter the meaning of an official’s position;
- affect the stated market transmission.

No material factor present in a cited source may disappear silently between research and drafting.

### 9.2 Central-bank communication granularity

When describing a central bank or policymaker, distinguish when relevant between:

- the formal inflation target;
- the inflation measure used;
- the strategic framework;
- the reaction function;
- current policy guidance;
- the interpretation placed on remarks by financial markets or the press.

Do not collapse these into a single claim.

### 9.3 Macro-data decomposition

For important data releases, check whether the headline move reflects:

- base effects;
- temporary energy or food moves;
- revisions;
- seasonal adjustment;
- one-off government or trade effects;
- composition changes;
- divergence between headline and core measures.

Include the decomposition when it materially changes the reader’s interpretation.

## 10. Historical comparisons

Use a historical comparison only when:

- the comparison period is objectively relevant;
- the source is reliable;
- the comparison helps readers judge magnitude or regime significance;
- it does not create a misleading analogy.

Do not force a historical benchmark into every rates, spreads or market-move article.

When no reliable comparison exists, omit it and record `NOT_USED_NO_RELIABLE_BENCHMARK` in internal notes.

## 11. Title and opening requirements

### 11.1 H1

The H1 must be descriptive and analytical.

It should usually state:

- the event or development;
- the asset, economy or policy area affected;
- the key consequence or unresolved tension.

Avoid vague titles such as:

- “What Happened Today?”
- “Markets React”
- “A Major Shift Is Underway”

Do not optimize for an exact SEO keyword at the expense of factual precision. The SEO skill may later refine presentation without changing meaning.

### 11.2 Opening answer

Within the first 100–150 words, answer:

- What happened?
- Why does it matter now?
- What is the MacroAlloc analytical angle?
- What remains uncertain?

Do not delay the answer with scene-setting or generic background.

## 12. Key takeaways

Provide exactly three concise takeaways.

Each must contain a distinct function:

1. confirmed development;
2. macro or market mechanism;
3. principal uncertainty, condition or next indicator.

Do not repeat the title or three versions of the same claim.

## 13. “What to Watch Next” standard

List concrete observables, not generic risks.

Prefer:

- scheduled data releases;
- policy meetings;
- specific market levels only when sourced and materially relevant;
- physical flows;
- official decisions;
- implementation dates;
- conditions that would confirm or weaken the thesis.

Distinguish between:

- confirmed upcoming events;
- conditional developments;
- fast-changing items requiring a publication recheck.

## 14. Financial-compliance boundaries

The article is informational content only.

It must not contain:

- personalized advice;
- suitability language;
- a direction to buy, sell, short, hedge or hold;
- guaranteed or near-certain return claims;
- a model allocation presented as appropriate for a reader;
- undisclosed conflicts;
- language implying MacroAlloc has verified facts that remain disputed.

Required disclaimer:

> This content is provided for informational purposes only and does not constitute investment advice or a personalized recommendation.

## 15. Revision mode

In `REVISION` mode:

- preserve all verified content not identified for correction;
- modify only the passages necessary to resolve the verifier’s issues and any directly affected transitions;
- do not introduce new facts unless they are supported and explicitly required by the verifier;
- do not silently change the thesis, source set, certainty level or article scope;
- produce a precise revision summary mapping each verifier issue to the change made;
- return unresolved conflicts explicitly;
- never override a `BLOCKED` verifier decision.

If the requested correction changes the locked topic or angle materially, return `EDITORIAL_DECISION_REQUIRED`.

## 16. Output contract

The skill must return a structured object with all fields below. No required field may be omitted.

```yaml
status: DRAFT_READY_FOR_VERIFICATION | BLOCKED | EDITORIAL_DECISION_REQUIRED
skill: write-macro-insight
skill_version: 1.1.0
mode: DRAFT | REVISION
revision_attempt: 0 | 1 | 2
edition: Morning | Evening
language: en-US
locked_topic: string
locked_angle: string
working_title: string
h1: string
subtitle: string
key_takeaways:
  - string
  - string
  - string
executive_summary: string
article_markdown: string
word_count: integer
sources:
  - source_id: integer
    publisher: string
    title: string
    publication_date: string | NOT_AVAILABLE
    access_timestamp: string
    url: string | NOT_AVAILABLE
    source_type: PRIMARY | SECONDARY
    reliability_note: string
internal_editorial_notes:
  macroalloc_thesis: string
  causal_pivots:
    - claim: string
      source_ids: [integer]
      counter_interpretation: string | NONE_IDENTIFIED
      verifier_priority: ENHANCED | STANDARD
  uncertainties:
    - string
  disputed_or_ambiguous_points:
    - string
  verification_flags:
    - string
  unreferenced_passages:
    - string
  source_limitations:
    - string
  context_reconciliation:
    - context_factor: string
      source_ids: [integer]
      disposition: INTEGRATED_IN_ARTICLE | EXCLUDED_AS_IMMATERIAL | EXCLUDED_TO_PRESERVE_SCOPE | EXCLUDED_DUE_TO_INSUFFICIENT_CORROBORATION | REQUIRES_VERIFIER_REVIEW
      rationale: string
  historical_comparison:
    status: USED | NOT_USED_NO_RELIABLE_BENCHMARK | NOT_RELEVANT
    note: string
  recheck_before_publication: YES | NO
  recheck_items:
    - string
  internal_link_opportunities:
    - string
  human_review_focus:
    - string
  revision_summary:
    - verifier_issue_id: string
      change_made: string
      status: RESOLVED | UNRESOLVED
  downstream_actions:
    - verify-financial-article
```

### 16.1 Executive summary purpose

The `executive_summary` is an internal 100–180 word summary for the future MacroAlloc Article Package. It must accurately summarize the article and uncertainty without introducing new facts.

It is not a substitute for the article opening and is not automatically published in the CMS.

### 16.2 Word-package responsibility

This skill does not create the final `.docx` file.

The final Word package is assembled only after:

1. `verify-financial-article` returns `APPROVED_FOR_SEO`;
2. `optimize-macro-insight-seo` returns a complete SEO package;
3. the orchestrator validates all mandatory fields;
4. the Article Package generator combines the verified article, SEO package, verification report, AI review summary, sources, visual brief and technical metadata.

This separation prevents the writer from labeling its own work as verified.

## 17. Hard output gates

The skill may return `DRAFT_READY_FOR_VERIFICATION` only if all conditions are true:

- H1, subtitle, three key takeaways and article body are present;
- the article is in US English;
- the word count is within the permitted range or justified in notes;
- every factual claim is traceable to a numbered source or identified as an unreferenced passage;
- the Sources section is complete enough for independent checking;
- facts, analysis, uncertainty and scenarios are distinguishable;
- at least two transmission channels are developed;
- central causal pivots are listed;
- source-to-draft context reconciliation is complete;
- no material contextual factor from a cited source has disappeared silently;
- generic catch-all market conclusions have been removed or made mechanism-specific;
- the disclaimer is present;
- no personalized advice or publication approval language appears;
- all mandatory output fields are populated, using explicit `NOT_AVAILABLE`, `NONE_IDENTIFIED` or empty arrays where appropriate rather than silent omission.

## 18. Self-review checklist

Before returning the draft, perform the following checks:

### Evidence

- [ ] Every number, date, quote and official position is sourced.
- [ ] Interested-party claims remain attributed.
- [ ] Central causal pivots have enhanced traceability.
- [ ] Disputed interpretations are not presented as settled.

### Context

- [ ] Every material factor in the cited sources is integrated or explicitly dispositioned.
- [ ] Important macro data have been checked for base effects, temporary components and revisions.
- [ ] Central-bank target, measure, framework and reaction function are not conflated.

### Analysis

- [ ] The article adds mechanism-led MacroAlloc analysis.
- [ ] At least two transmission channels are developed.
- [ ] Alternative explanations are considered where material.
- [ ] Conclusions are specific rather than generic cross-asset lists.
- [ ] Historical comparisons are used only when genuinely informative.

### Editorial quality

- [ ] The H1 is descriptive rather than vague or sensational.
- [ ] The opening answers the question quickly.
- [ ] Key takeaways are non-redundant.
- [ ] Paragraphs and headings follow analytical logic.
- [ ] No filler, repetition or artificial lengthening remains.

### Compliance and workflow

- [ ] The disclaimer is present.
- [ ] No personalized advice or transaction instruction appears.
- [ ] The draft does not use `PUBLISHABLE`, `APPROVED_FOR_PUBLICATION` or equivalent language.
- [ ] Status is exactly `DRAFT_READY_FOR_VERIFICATION` when successful.
- [ ] Downstream action is exactly `verify-financial-article`.

## 19. Prohibited behavior

The skill must never:

- interpret “continue,” “choose the best topic,” urgency, ranking or a full-workflow request as proof of human topic selection;
- draft while the upstream workflow is `AWAITING_USER_SELECTION`;
- write the primary article in French or any language other than US English;
- choose or replace the user-selected topic;
- change Morning to Evening or vice versa;
- invent facts, sources, URLs, quotations or market levels;
- treat a plausible URL as evidence;
- use SEO considerations to alter factual meaning;
- approve its own draft;
- suppress uncertainty to make the article sound stronger;
- produce a final Article Package that appears verified;
- publish, schedule or distribute content;
- hide unresolved verifier issues in revision mode;
- exceed revision attempt 2.

## 20. Regression fixtures

At minimum, test this skill against:

1. A central-bank article containing an ambiguous statement about the inflation target, inflation measure, strategic framework and reaction function.
2. A macro-data release distorted by energy prices, base effects or a temporary geopolitical factor already mentioned in a cited primary source.
3. A rates article where a historical comparison is useful.
4. A rates article where a historical comparison would be forced or misleading.
5. A geopolitical article relying partly on interested-party claims.
6. A draft with a generic catch-all market conclusion.
7. A revision request that can be resolved locally.
8. A revision request that would materially change the locked angle and must return `EDITORIAL_DECISION_REQUIRED`.
9. A dossier with a material context factor that is silently omitted, which must fail the output gate.
10. A compliant, fully sourced article that should pass on revision attempt 0.

## 21. Version notes

### 1.1.0

- Requires `TOPIC_SELECTED` plus explicit selection evidence tied to the preserved shortlist.
- Blocks drafting during `AWAITING_USER_SELECTION` or when the selection is ambiguous.
- Makes `en-US` immutable for the primary article and defers all translations to a separate downstream adaptation.

### 0.7.0

- Preserves the validated writer/verifier/SEO separation and `DRAFT_READY_FOR_VERIFICATION` status.
- Adds the structured executive summary required by the future MacroAlloc Article Package.
- Adds mandatory source-to-draft context reconciliation.
- Adds central causal-pivot identification for enhanced verification.
- Adds explicit protection against loss of material context already present in cited sources.
- Adds central-bank communication granularity.
- Adds macro-data decomposition checks.
- Makes historical comparison conditional rather than automatic.
- Adds a hard check against generic catch-all market conclusions.
- Defines a strict machine-readable output contract for reliable downstream Word assembly.
- Clarifies that final Word generation belongs to the orchestrated packaging layer, not the writer.
