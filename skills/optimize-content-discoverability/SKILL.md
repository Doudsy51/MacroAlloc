---
name: optimize-content-discoverability
description: Optimizes a financially verified US-English MacroAlloc article for US-priority search and AI discovery while preserving the exact human-selected topic, locked angle, facts, and thesis. Use only after financial approval; block non-en-US primary articles or inputs without TOPIC_SELECTED lineage.
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
    - optimize-macro-insight-seo
    - optimize-article-seo
---

# optimize-content-discoverability

## 0. Workflow invariants

- Require traceable upstream status `TOPIC_SELECTED` and explicit user-selection evidence tied to the preserved shortlist.
- Require the primary article and all primary metadata to remain in US English (`en-US`) with US organic search as the priority market.
- Return `BLOCKED` if the topic or angle differs materially from the human-selected topic or locked brief.
- Do not translate, replace, broaden or reselect the topic during optimization.
- Treat French or other-language SEO as a separate secondary adaptation, never as a replacement for the US-English package.

## 1. Mission

Transform a financially verified MacroAlloc article into a discoverability-optimized publication package without altering its factual substance, analytical thesis, causal logic, uncertainty, or compliance posture.

The skill optimizes the article for:

- traditional search engines;
- semantic and entity-based retrieval;
- AI-assisted search and answer engines;
- Google AI Overviews;
- featured snippets;
- Google Discover;
- internal site search;
- topical-authority development;
- long-term content maintenance;
- controlled cross-channel distribution.

This skill is a post-verification editorial optimization layer. It is not a writer, researcher, fact checker, investment analyst, compliance reviewer, publisher, or market-intelligence agent.

The skill must preserve the verified article as the source of truth. Discoverability improvements are allowed only when they do not change meaning.

## 2. Position in the workflow

Expected upstream state:

- `APPROVED_FOR_SEO` from `verify-financial-article`;
- a complete verified article;
- a verification report with no unresolved hard-gate defect;
- a locked topic, angle, edition and audience;
- the source register used by the verified article.

Required downstream state:

- `DISCOVERABILITY_READY_FOR_REVIEW` when all mandatory quality gates pass;
- `DISCOVERABILITY_REVISION_REQUIRED` when optimization defects remain but can be corrected without changing substance;
- `BLOCKED` when required inputs or reliable optimization evidence are missing;
- `EDITORIAL_DECISION_REQUIRED` when discoverability improvements would materially change editorial intent, positioning or content architecture.

Required downstream action:

- send the optimized article and `DiscoverabilityPackage` to `review-article`;
- do not publish;
- do not declare the article finally approved or ready for publication.

## 3. Core operating principles

### 3.1 Substance preservation

The verified article is authoritative for:

- facts;
- figures;
- dates;
- quotations;
- source attribution;
- macroeconomic interpretation;
- market-transmission logic;
- scenario framing;
- uncertainty;
- conclusions;
- disclaimers.

The skill may improve discoverability, structure and presentation. It must not change the verified substance.

### 3.2 No factual invention

Never add:

- a new number;
- a new market move;
- a new quotation;
- a new causal claim;
- a new forecast;
- a new historical comparison;
- a new institutional position;
- a new investment implication;
- a new source-derived fact that did not pass verification.

When an optimization opportunity requires new factual content, return it as a research or editorial recommendation. Do not insert it into the article.

### 3.3 No optimization theatre

Do not claim that an article will rank, be cited by an AI system, appear in Google Discover, win a featured snippet, or outperform competitors.

Use calibrated language:

- `supports discoverability`;
- `improves retrieval readiness`;
- `creates a candidate answer block`;
- `reduces ambiguity`;
- `strengthens topical alignment`.

### 3.4 Human-first quality

Search optimization must improve or preserve reader value.

Reject any change that:

- makes the article less natural;
- weakens analytical nuance;
- delays the answer;
- increases repetition;
- adds empty headings;
- fragments coherent reasoning;
- introduces keyword stuffing;
- creates clickbait;
- overstates confidence.

### 3.5 Evidence-aware optimization

Do not treat every external optimization signal as equally reliable.

- Search-result comparisons must be current and traceable.
- Keyword-volume or difficulty metrics must identify the provider and retrieval date.
- Competitor analysis must distinguish primary/institutional sources from commercial pages.
- Existing MacroAlloc content must be identified from a supplied content inventory or connected knowledge base.
- Missing tool data must be marked `NOT ASSESSED`, not guessed.

## 4. Responsibilities

The skill is responsible for:

1. identifying the dominant search intent;
2. creating a defensible keyword and question map;
3. improving titles, headings, metadata and URL recommendations;
4. strengthening semantic clarity and entity consistency;
5. improving answer extractability for search and AI systems;
6. identifying featured-snippet candidates;
7. assessing Google Discover readiness without sensationalism;
8. improving E-E-A-T signals already supported by the article and its sources;
9. recommending internal links and topical-cluster placement;
10. detecting duplicate-content and cannibalization risks when a content inventory exists;
11. comparing the article with current competitors when competitor data is supplied or research is authorized;
12. recommending structured-data types and required properties;
13. preparing image SEO metadata and visual recommendations;
14. producing a content-decay and refresh plan;
15. preparing controlled distribution derivatives that introduce no new claims;
16. producing the normalized `DiscoverabilityPackage` for final review and Word assembly.

## 5. Non-responsibilities

This skill must not:

- select the editorial topic;
- change the locked angle;
- conduct primary financial research;
- verify or correct facts independently of the verifier workflow;
- resolve disputed evidence;
- modify the MacroAlloc thesis;
- create personalized investment advice;
- create transaction instructions;
- make legal or regulatory determinations;
- perform the final editorial review;
- generate final images;
- publish to a CMS or social platform;
- approve the article for publication;
- fabricate keyword metrics, traffic estimates, rankings or competitor data.

## 6. Inputs

### 6.1 Mandatory inputs

The skill must receive:

- `CONTENT_TYPE`;
- `EDITION` where applicable;
- `LOCKED_TOPIC`;
- `LOCKED_ANGLE`;
- `TARGET_AUDIENCE`;
- `TARGET_MARKET`;
- `LANGUAGE`;
- `VERIFIED_ARTICLE`;
- `EXECUTIVE_SUMMARY`;
- `VERIFICATION_STATUS` equal to `APPROVED_FOR_SEO`;
- `VERIFICATION_REPORT`;
- `SOURCE_REGISTER`;
- `PUBLICATION_DATE` or expected publication window;
- `BRAND_AND_EDITORIAL_RULES`;
- `ARTICLE_CATEGORY`;
- `DISCLAIMER_TEXT`;
- `REVISION_ATTEMPT`: `0`, `1`, or `2`.

### 6.2 Recommended inputs

- `PRIMARY_KEYWORD_HYPOTHESIS`;
- `SECONDARY_KEYWORD_HYPOTHESES`;
- `SEARCH_INTENT_HYPOTHESIS`;
- `SITE_TAXONOMY`;
- `CONTENT_INVENTORY`;
- `INTERNAL_LINK_CATALOG`;
- `EXISTING_URL`;
- `EXISTING_METADATA`;
- `COMPETITOR_SET`;
- `SERP_SNAPSHOT`;
- `KEYWORD_DATA` with provider and timestamp;
- `SEARCH_CONSOLE_DATA`;
- `ANALYTICS_DATA`;
- `IMAGE_ASSETS`;
- `AUTHOR_INFORMATION` actually approved for publication;
- `CANONICAL_DOMAIN`;
- `CMS_CONSTRAINTS`;
- `SCHEMA_CAPABILITIES`;
- `DISTRIBUTION_CHANNELS`.

### 6.3 Blocking conditions

Return `BLOCKED` when:

- verification status is not `APPROVED_FOR_SEO`;
- the verified article or verification report is missing;
- the article is materially incomplete;
- the locked topic or angle is missing;
- the requested optimization requires a factual rewrite;
- a central SEO recommendation depends on invented keyword or competitor data;
- the article's language, audience or target market is undefined;
- the source register is missing;
- the disclaimer required by the content type is absent and cannot be preserved;
- a previous optimization has altered facts and no clean verified version is available.

Return `EDITORIAL_DECISION_REQUIRED` when:

- the dominant search intent conflicts with the locked editorial angle;
- the best keyword target would require materially repositioning the article;
- two existing MacroAlloc pages create a high cannibalization risk and consolidation requires a human decision;
- the proposed headline materially changes the thesis or level of certainty;
- a competitor gap can only be closed by adding new research;
- the article cannot satisfy both breaking-news freshness and evergreen depth without a scope decision.

## 7. Allowed transformations

The skill may:

- refine the H1 while preserving the verified meaning;
- create alternative headline candidates;
- improve H2/H3 wording and hierarchy;
- move existing paragraphs when meaning and citation context remain intact;
- split or combine paragraphs;
- create concise answer blocks exclusively from verified content;
- convert verified information into a list or table when no nuance is lost;
- reduce repetition;
- clarify explicit antecedents and entity names;
- add navigational transitions that contain no new claim;
- generate metadata and structured publication fields;
- create internal-link recommendations;
- create derivative summaries using only verified content.

The skill may not:

- add unsupported explanatory depth;
- remove caveats required for accuracy;
- simplify a causal chain beyond what the verifier approved;
- replace attribution with unqualified fact;
- turn a scenario into a forecast;
- turn market expectations into MacroAlloc conclusions;
- change a number, unit, period or comparison;
- modify citation-to-claim relationships without re-verification.

## 8. Execution pipeline

Execute in this order:

1. Validate the input contract.
2. Freeze the verified substance.
3. Build a before-optimization content fingerprint.
4. Determine content lifecycle and freshness class.
5. Determine primary and secondary search intent.
6. Build keyword, question and entity maps.
7. Assess competitor landscape when evidence is available.
8. Assess topical authority and content-memory risks.
9. Optimize headline, metadata and URL recommendation.
10. Optimize heading architecture and answer extractability.
11. Optimize semantic clarity and entity consistency.
12. Identify featured-snippet and AI-retrieval candidates.
13. Assess E-E-A-T and Google Discover readiness.
14. Recommend internal links, schema and image metadata.
15. Produce the content-decay plan.
16. Produce controlled distribution derivatives where requested.
17. Run the substance-preservation diff.
18. Run all quality gates.
19. Generate the normalized `DiscoverabilityPackage`.
20. Return the required workflow status.

No downstream package may be produced if the substance-preservation gate fails.

## 9. Content fingerprint and preservation ledger

Before editing, record:

- article title;
- thesis statement;
- key takeaways;
- major claims;
- causal pivots;
- numerical claims;
- forecasts and scenarios;
- caveats;
- conclusions;
- source markers;
- disclaimer;
- word count;
- heading structure.

After editing, compare the optimized article with this ledger.

Every material change must be classified as:

- `PRESENTATIONAL_ONLY`;
- `CLARIFICATION_WITHOUT_NEW_CLAIM`;
- `REORDERED_WITH_MEANING_PRESERVED`;
- `SUBSTANTIVE_CHANGE_REQUIRING_REVERIFICATION`.

Any item in the last category fails the preservation gate and must be removed or returned for re-verification.

## 10. Module 1 — Search intent engine

### 10.1 Objective

Identify why a reader would search for the article and ensure that the article directly satisfies one dominant intent.

Supported primary intents:

- `NEWS_EXPLANATION`;
- `EVENT_ANALYSIS`;
- `EDUCATIONAL_DEFINITION`;
- `HOW_IT_WORKS`;
- `COMPARISON`;
- `DATA_INTERPRETATION`;
- `MARKET_IMPLICATIONS`;
- `ETF_RESEARCH`;
- `EVERGREEN_REFERENCE`;
- `NAVIGATIONAL`;
- `TRANSACTIONAL_INFORMATION` only when consistent with non-advisory content.

### 10.2 Procedure

- Extract all explicit questions answered by the article.
- Infer likely questions from the locked topic and article structure.
- Map each section to a user need.
- Identify one primary intent and no more than three secondary intents.
- Detect conflicting intents.
- Confirm that the opening answers the primary intent promptly.
- Confirm that the conclusion resolves, rather than merely repeats, the central question.

### 10.3 Output

- primary intent;
- secondary intents;
- questions covered;
- material unanswered questions;
- conflict assessment;
- intent-alignment score;
- required changes.

Do not broaden the article solely to cover every adjacent query.

## 11. Module 2 — Keyword and question strategy engine

### 11.1 Objective

Create a natural search vocabulary based on article meaning, audience and verified entities.

### 11.2 Keyword classes

- primary keyword;
- secondary keywords;
- long-tail queries;
- question queries;
- entity terms;
- indicator and policy terms;
- accepted abbreviations;
- semantic alternatives;
- terms to avoid because they misstate the article.

### 11.3 Rules

- Relevance outranks volume.
- Search intent outranks superficial keyword matching.
- Use supplied tool metrics only when provider and retrieval date are recorded.
- Never fabricate volume, difficulty, CPC, trend or ranking data.
- Do not calculate simplistic keyword density targets.
- Flag obvious repetition and unnatural placement instead.
- Preserve standard financial terminology.
- Do not replace precise terms with popular but inaccurate phrases.

### 11.4 Placement review

Review the primary concept in:

- H1;
- opening paragraph;
- one appropriate H2;
- meta title;
- meta description;
- slug;
- image metadata where relevant;
- conclusion only when natural.

No exact-match repetition is mandatory.

## 12. Module 3 — Semantic coverage engine

### 12.1 Objective

Improve conceptual completeness without adding unverified facts.

Build a semantic map linking:

- event;
- institution;
- policy or data point;
- economic mechanism;
- asset-class transmission;
- market implication;
- uncertainty;
- next observable catalyst.

### 12.2 Checks

- Are essential terms defined or clear from context?
- Are abbreviations introduced once before reuse?
- Are causal links explicit without being overstated?
- Are related entities named consistently?
- Does each section contribute to the locked angle?
- Are any required concepts absent from the verified article?

When a required concept is absent, recommend research or editorial expansion; do not invent it.

### 12.3 Output

- semantic map;
- covered concepts;
- weakly connected concepts;
- missing concepts requiring new research;
- redundant concepts;
- semantic-completeness score.

## 13. Module 4 — Entity recognition and consistency engine

### 13.1 Entity classes

- countries and regions;
- central banks;
- governments and public institutions;
- international organizations;
- companies;
- ETFs and funds;
- indices;
- currencies;
- commodities;
- economic indicators;
- policy instruments;
- regulations;
- public figures;
- asset classes;
- investment styles.

### 13.2 Rules

For each entity:

- record canonical name;
- record acceptable abbreviation;
- record first-use form;
- remove ambiguous aliases;
- preserve official product names and identifiers where supplied;
- avoid repetitive full naming after the abbreviation is established;
- do not infer legal entity relationships not present in the verified content.

### 13.3 Output

- entity inventory;
- canonical-name table;
- alias table;
- ambiguous references;
- missing disambiguation;
- entity-consistency score.

## 14. Module 5 — E-E-A-T and trust engine

### 14.1 Objective

Strengthen supported signals of experience, expertise, authoritativeness and trust without inventing credentials or overstating authority.

### 14.2 Signals to evaluate

- source quality and transparency;
- distinction between evidence and interpretation;
- acknowledgment of uncertainty;
- methodological clarity;
- accurate professional terminology;
- original analytical synthesis;
- author and organization information actually approved for use;
- publication and update dates;
- corrections and review process;
- conflict-of-interest and informational disclaimers;
- accessible source list;
- balanced treatment of competing interpretations.

### 14.3 Prohibitions

Never invent:

- author credentials;
- years of experience;
- institutional affiliations;
- awards;
- client relationships;
- proprietary datasets;
- first-hand market access;
- endorsements.

### 14.4 Output

- supported trust signals;
- missing but legitimate implementation signals;
- weak or unsupported claims of authority;
- E-E-A-T assessment;
- recommendations for the CMS or author page.

## 15. Module 6 — AI search and retrieval engine

### 15.1 Objective

Improve the probability that retrieval-based systems can understand, extract and cite the article accurately.

The skill must not claim guaranteed inclusion or citation.

### 15.2 Retrieval checks

Determine whether a system can identify:

- the topic;
- the event or question;
- the concise answer;
- the central thesis;
- supporting evidence;
- causal chain;
- uncertainty;
- limitations;
- time frame;
- implications;
- what to watch next.

### 15.3 Section independence

Each major section should:

- have a descriptive heading;
- identify the relevant entity explicitly;
- contain a clear topic sentence;
- avoid ambiguous pronouns at the start;
- remain understandable when extracted with limited context;
- preserve source markers where evidence is quoted or summarized.

Do not make every paragraph unnaturally self-contained.

### 15.4 Answer blocks

Create answer blocks only from verified content.

A candidate answer block should:

- answer one identifiable question;
- normally contain 35–80 words;
- begin with the answer, not background;
- retain necessary caveats;
- avoid promotional language;
- avoid claims that require missing context.

### 15.5 Output

- retrieval-readiness assessment;
- candidate questions;
- answer-block candidates;
- citation-readiness issues;
- ambiguous sections;
- AI-discoverability score.

## 16. Module 7 — Google AI Overview readiness

Assess whether the article offers:

- direct answers;
- explanatory structure;
- source-supported evidence;
- clear entity naming;
- useful lists or tables;
- definitions;
- comparisons;
- caveats;
- a visible publication date;
- transparent sourcing.

Recommend answer blocks, lists or tables only when they improve reader value and preserve nuance.

Output:

- readiness assessment;
- candidate answer sections;
- structural weaknesses;
- unsupported opportunities requiring research;
- readiness score.

Do not represent the score as a probability of inclusion.

## 17. Module 8 — Featured-snippet engine

### 17.1 Candidate types

- paragraph definition;
- concise explanation;
- numbered process;
- bulleted factors;
- comparison table;
- timeline;
- FAQ-style answer.

### 17.2 Procedure

For each H2, determine:

- the likely query;
- whether the verified article contains a direct answer;
- the appropriate snippet form;
- whether necessary caveats fit the format;
- whether extraction would remain accurate outside the full article.

Reject a candidate if shortening would materially distort the meaning.

### 17.3 Output

For each candidate:

- query;
- snippet type;
- exact candidate text;
- source section;
- caveat requirement;
- priority;
- risk of oversimplification.

## 18. Module 9 — Google Discover readiness engine

### 18.1 Objective

Assess whether a timely or evergreen article has strong reader value and presentation signals for content recommendation surfaces.

### 18.2 Evaluate

- timeliness;
- enduring relevance;
- originality of synthesis;
- headline clarity;
- non-sensational reader interest;
- visual quality opportunity;
- mobile readability;
- transparent dates and authorship;
- source authority;
- title-to-content alignment.

### 18.3 Headline rules

A Discover-oriented headline must not:

- withhold the central subject;
- use false urgency;
- exaggerate market consequences;
- imply certainty absent from the article;
- imitate tabloid language;
- use curiosity gaps that obscure meaning.

### 18.4 Output

- content-type classification;
- freshness assessment;
- headline assessment;
- visual opportunity;
- reader-value assessment;
- readiness score;
- practical recommendations.

## 19. Module 10 — Knowledge graph engine

Map explicit relationships among verified entities.

Relationship examples:

- institution `sets` policy rate;
- data release `measures` inflation;
- policy decision `affects` financial conditions;
- financial conditions `transmit to` asset classes;
- ETF `tracks` an index;
- index `represents` a market segment.

Rules:

- use only relationships supported by the verified article;
- do not infer ownership, legal status or policy authority;
- distinguish direct, indirect and conditional relationships;
- flag ambiguous entity references;
- preserve time dependence.

Output:

- entity-relationship map;
- ambiguous relationships;
- missing context requiring research;
- knowledge-graph clarity score.

## 20. Module 11 — Schema recommendation engine

### 20.1 Objective

Recommend structured-data types for implementation by the CMS or developer.

Possible types include:

- `Article`;
- `NewsArticle`;
- `BlogPosting`;
- `WebPage`;
- `BreadcrumbList`;
- `Organization`;
- `Person`;
- `ImageObject`;
- `VideoObject` when applicable;
- `Dataset` only when a real dataset exists;
- `FAQPage` only when the page genuinely contains visible FAQs and implementation remains appropriate;
- product or fund schema only when supported by the page type and implementation policy.

### 20.2 Rules

- Do not generate false ratings, reviews or author credentials.
- Do not recommend schema solely to pursue rich results.
- Do not assume a schema type is eligible for a visible enhancement.
- Distinguish recommended type from implementation-ready data.
- Record missing required properties.

### 20.3 Output

- recommended types;
- rationale;
- required properties;
- available properties;
- missing properties;
- implementation warnings;
- schema-readiness score.

## 21. Module 12 — Internal linking engine

### 21.1 Objective

Improve reader navigation, topical authority and crawl paths using meaningful links to existing MacroAlloc content.

### 21.2 Required evidence

Recommendations must rely on:

- `CONTENT_INVENTORY`;
- `INTERNAL_LINK_CATALOG`;
- a connected content database;
- or explicit placeholder categories when exact URLs are unavailable.

Never invent a published URL.

### 21.3 Link classes

- prerequisite explanation;
- deeper analysis;
- related event;
- relevant ETF research;
- methodology;
- glossary or definition;
- parent pillar page;
- sibling topic;
- conversion-oriented product page only when editorially appropriate.

### 21.4 Rules

- prioritize reader utility;
- use descriptive anchor text;
- avoid repeated exact anchors;
- avoid linking every possible keyword;
- preserve a natural reading flow;
- identify exact insertion location;
- distinguish confirmed destination from proposed future article.

### 21.5 Output

- source section;
- recommended anchor;
- destination title;
- destination URL or `URL_NOT_AVAILABLE`;
- relationship type;
- priority;
- rationale;
- topical-cluster impact.

## 22. Module 13 — Image and visual optimization engine

### 22.1 Objective

Prepare a visual metadata and recommendation package. The skill does not generate the final image.

### 22.2 Hero image output

- visual concept;
- informational purpose;
- recommended aspect ratio;
- safe-area guidance;
- suggested filename;
- concise alt text;
- caption;
- source or credit requirement;
- Open Graph suitability;
- Discover suitability;
- accessibility warnings.

### 22.3 Additional visual opportunities

Recommend only visuals that improve comprehension, such as:

- a time series;
- a comparison table;
- a transmission diagram;
- a yield-curve chart;
- an inflation-component chart;
- a policy timeline;
- an ETF exposure chart;
- a cross-asset performance table.

Do not invent chart data. Specify required verified data and source.

### 22.4 Alt-text rules

Alt text must:

- describe the informational content;
- be concise;
- avoid keyword stuffing;
- not repeat the caption verbatim;
- not include unverified interpretation;
- be empty for purely decorative images when appropriate.

## 23. Module 14 — Content structure and readability engine

Evaluate:

- heading hierarchy;
- opening efficiency;
- paragraph length;
- sentence complexity;
- information density;
- section balance;
- transitions;
- table and list usefulness;
- mobile scannability;
- conclusion quality;
- source-section clarity.

Rules:

- do not simplify technical meaning into inaccuracy;
- do not force every section to equal length;
- do not replace analytical prose with excessive bullets;
- avoid one-sentence sections unless functioning as a concise answer block;
- preserve the MacroAlloc tone.

Output:

- readability assessment;
- structural issues;
- changes applied;
- remaining recommendations;
- structure score.

## 24. Module 15 — Competitor intelligence engine

### 24.1 Activation

Run only when:

- a competitor set or SERP snapshot is supplied;
- or current web research is explicitly authorized and available.

Otherwise return `NOT_ASSESSED`.

### 24.2 Objective

Determine whether the article offers differentiated and complete value relative to current high-quality content without copying competitors.

### 24.3 Competitor classification

Classify each result as:

- primary/institutional;
- news;
- educational;
- research;
- commercial;
- opinion;
- aggregator;
- low-quality or irrelevant.

Prioritize authoritative and intent-matched competitors, not merely the first ten links.

### 24.4 Extract

- title;
- URL;
- publisher;
- publication/update date;
- search intent;
- target audience;
- structure;
- major topics;
- named entities;
- unique data;
- FAQ or answer blocks;
- visual assets;
- source quality;
- differentiating angle.

### 24.5 Gap classification

For each material topic classify:

- `MACROALLOC_STRONGER`;
- `COMPARABLE`;
- `MACROALLOC_WEAKER`;
- `MISSING_BUT_RELEVANT`;
- `MISSING_AND_OUT_OF_SCOPE`;
- `UNIQUE_MACROALLOC_ADVANTAGE`.

Never recommend adding a competitor topic that conflicts with the locked angle or lacks verified evidence.

### 24.6 Output

- competitive landscape;
- intent-matched competitors;
- strengths;
- weaknesses;
- gaps;
- differentiation opportunities;
- research-required opportunities;
- competitiveness assessment;
- evidence timestamp.

## 25. Module 16 — Topical authority engine

### 25.1 Activation

Requires a site taxonomy or content inventory. Otherwise provide category-level recommendations and mark exact cluster analysis `NOT_ASSESSED`.

### 25.2 Objective

Ensure that the article strengthens the MacroAlloc knowledge architecture rather than existing as an isolated page.

### 25.3 Classification

Assign:

- primary pillar;
- primary cluster;
- secondary clusters;
- parent topic;
- prerequisite topics;
- sibling topics;
- advanced follow-up topics;
- related entities.

### 25.4 Analyze

- coverage depth;
- coverage breadth;
- internal connectivity;
- educational progression;
- pillar support;
- missing cornerstone pages;
- weak clusters;
- disconnected articles;
- publication priority.

### 25.5 Output

- topic classification;
- cluster placement;
- cluster-health assessment;
- missing content;
- future-article recommendations;
- internal-authority flow;
- topical-authority score.

Future-article recommendations must be strategic, not an uncontrolled list of adjacent keywords.

## 26. Module 17 — Content memory and cannibalization engine

### 26.1 Activation

Requires a content inventory containing at least title, URL, status, primary topic and publication date. Semantic metadata is strongly preferred.

Without the inventory, return `NOT_ASSESSED` and do not claim that cannibalization is absent.

### 26.2 Article fingerprint

Record:

- primary topic;
- secondary topics;
- entities;
- intent;
- audience;
- content type;
- educational level;
- primary query;
- secondary queries;
- cluster;
- time horizon;
- expected lifespan.

### 26.3 Compare

Assess:

- semantic similarity;
- keyword overlap;
- intent overlap;
- entity overlap;
- audience overlap;
- conclusion overlap;
- educational-function overlap.

### 26.4 Classification

- `NO_MATERIAL_OVERLAP`;
- `HEALTHY_REINFORCEMENT`;
- `PARTIAL_DUPLICATION`;
- `HIGH_DUPLICATION`;
- `NEAR_DUPLICATE`;
- `CANNIBALIZATION_RISK`;
- `CONSOLIDATION_DECISION_REQUIRED`.

### 26.5 Allowed recommendations

- differentiate intent;
- narrow or broaden scope;
- link pages;
- merge;
- update existing page instead;
- create pillar/supporting relationship;
- redirect after human approval;
- retire or archive after human approval.

### 26.6 Terminology consistency

Create a canonical terminology table for recurring entities and concepts.

Do not require unnatural repetition of the full canonical name. Preserve readable abbreviation practices.

### 26.7 Output

- overlap report;
- closest pages;
- cannibalization assessment;
- recommended action;
- terminology issues;
- ecosystem impact;
- human decisions required.

## 27. Module 18 — Content decay and refresh engine

### 27.1 Objective

Assign a realistic maintenance plan based on the article's claims, content type and dependence on changing data.

### 27.2 Freshness classes

Use one of:

- `BREAKING_24_TO_72_HOURS`;
- `EVENT_DRIVEN_7_TO_30_DAYS`;
- `MARKET_ANALYSIS_MONTHLY_REVIEW`;
- `ETF_PRODUCT_QUARTERLY_REVIEW`;
- `STRUCTURAL_MACRO_SEMIANNUAL_REVIEW`;
- `EDUCATIONAL_ANNUAL_REVIEW`;
- `EVERGREEN_LOW_FREQUENCY`;
- `HISTORICAL_REFERENCE`.

Adjust the class when the article contains time-sensitive numbers, policy assumptions, ETF characteristics, regulation or market structure.

### 27.3 Decay factors

- publication age;
- data age;
- source stability;
- policy dependence;
- product-change risk;
- regulatory-change risk;
- link durability;
- chart freshness;
- competitor update frequency;
- search-performance trend when supplied.

### 27.4 Actions

- no action;
- metadata refresh;
- link check;
- numerical update;
- source replacement;
- section rewrite;
- chart replacement;
- expansion;
- merge;
- archive;
- redirect;
- historical-label addition.

### 27.5 Output

- freshness class;
- decay-risk assessment;
- review date;
- update triggers;
- update checklist;
- sections most likely to decay;
- lifecycle stage;
- maintenance priority.

Do not fabricate future dates when publication timing is unknown. Use relative schedules.

## 28. Module 19 — Editorial distribution intelligence

### 28.1 Scope

This module prepares derivative publication assets only when requested. It does not post them.

Supported outputs may include:

- LinkedIn post;
- X post;
- X thread outline;
- newsletter excerpt;
- email subject candidates;
- article excerpt;
- YouTube description;
- short-video hook and outline;
- podcast description;
- push-notification candidate;
- visual-carousel outline.

### 28.2 Preservation rules

Every derivative must:

- use only verified article content;
- preserve uncertainty;
- preserve dates and units;
- avoid new causal claims;
- avoid personalized advice;
- avoid performance promises;
- identify the source article;
- remain consistent with brand tone.

### 28.3 Channel rules

- LinkedIn: professional, analytical, substantive; no engagement bait.
- X: concise and explicit; no sensational compression.
- Newsletter: summarize value and context; do not duplicate the entire article.
- YouTube or short video: create a content outline, not unverified narration.
- Push notification: use only for genuinely timely content and preserve accurate framing.

### 28.4 Output

- recommended primary channel;
- secondary channels;
- channels not recommended;
- sequencing;
- derivative assets;
- consistency checklist;
- distribution-readiness score.

## 29. Headline package

Generate:

- one recommended H1;
- two to four alternatives;
- one meta title;
- one Open Graph title;
- one social headline when justified.

Rules:

- state the subject clearly;
- preserve certainty and time frame;
- prefer descriptive titles over vague curiosity;
- avoid punctuation gimmicks;
- avoid unverified superlatives;
- avoid promises such as `everything you need to know` unless the page is genuinely comprehensive;
- do not force a keyword to the front when unnatural;
- record character count but do not treat a rigid character limit as a hard ranking rule.

For each candidate provide:

- title;
- intended channel;
- intent alignment;
- main strength;
- material risk.

## 30. Metadata package

Produce:

- meta title;
- meta description;
- URL slug;
- canonical URL recommendation;
- Open Graph title;
- Open Graph description;
- social-card recommendation;
- article excerpt;
- primary keyword;
- secondary keywords;
- entities;
- tags;
- category;
- estimated word count;
- estimated reading time;
- publication date field;
- modified-date field policy;
- author field requirement;
- robots recommendation only when context justifies it.

### 30.1 Slug rules

- concise;
- lowercase;
- hyphenated;
- stable over time;
- no unnecessary stop words;
- no date unless the date is essential to the content identity;
- no keyword stuffing;
- preserve existing slug when changing it would create migration risk, unless a redirect plan is approved.

### 30.2 Canonical rules

- do not invent the final production URL;
- use `CANONICAL_PENDING` when the domain or path is unknown;
- identify duplicate or syndicated-content risks;
- do not recommend cross-domain canonicalization without an explicit publishing arrangement.

## 31. FAQ and question coverage

FAQ content is optional.

Create FAQs only when:

- the article already supports the answer;
- the question reflects genuine reader need;
- the answer adds navigational value;
- the answer does not duplicate the article mechanically;
- the implementation plan will display the FAQ visibly.

For each FAQ:

- question;
- answer;
- source section;
- whether new verification is required;
- schema suitability.

Reject FAQ generation when the article is too narrow, highly time-sensitive or would require speculative answers.

## 32. Scoring model

Scores are diagnostic, not guarantees.

Use a 0–100 scale for assessed dimensions:

- intent alignment;
- metadata quality;
- semantic clarity;
- entity consistency;
- E-E-A-T support;
- AI retrieval readiness;
- answer extractability;
- internal linking;
- topical authority;
- competitive differentiation;
- content-memory safety;
- structure and readability;
- visual readiness;
- lifecycle readiness;
- distribution readiness.

Use `NOT_ASSESSED` when required data is unavailable.

Do not convert `NOT_ASSESSED` to zero.

### 32.1 Overall score

Calculate an overall score only from assessed dimensions and disclose which dimensions were excluded.

A high score cannot override a failed hard gate.

## 33. Mandatory quality gates

### Gate 1 — Upstream verification

Pass only when `VERIFICATION_STATUS = APPROVED_FOR_SEO` and no unresolved material verifier issue exists.

### Gate 2 — Substance preservation

Pass only when no substantive factual, analytical, causal, scenario or compliance change was introduced.

### Gate 3 — Search intent

Pass only when one dominant intent is identified and the article visibly satisfies it.

### Gate 4 — Metadata completeness

Pass only when the required publication metadata is complete or explicitly marked pending for unavailable implementation data.

### Gate 5 — Headline integrity

Pass only when the recommended headline accurately represents the article and preserves uncertainty.

### Gate 6 — Semantic and entity clarity

Pass only when major entities and relationships are unambiguous.

### Gate 7 — Citation preservation

Pass only when restructuring has not separated a material claim from its source marker or attribution.

### Gate 8 — Human readability

Pass only when optimization has not made the article repetitive, mechanical or less coherent.

### Gate 9 — No fabricated external intelligence

Pass only when competitor, keyword, analytics and content-inventory claims are traceable or marked `NOT_ASSESSED`.

### Gate 10 — Compliance preservation

Pass only when the informational disclaimer remains and no advice or performance promise was added.

If any mandatory gate fails, return `DISCOVERABILITY_REVISION_REQUIRED` or `BLOCKED` as appropriate.

## 34. Revision mode

When `REVISION_ATTEMPT` is `1` or `2`:

- change only the issues identified by the downstream reviewer or prior gate report;
- preserve all previously approved sections unless necessary;
- produce a change log;
- rerun the substance-preservation gate;
- rerun all gates affected by the changes.

No third automatic revision is allowed.

If material defects remain after attempt `2`, return `EDITORIAL_DECISION_REQUIRED`.

## 35. Failure taxonomy

Use these issue codes:

- `DISC-001`: upstream verification missing;
- `DISC-002`: mandatory input missing;
- `DISC-003`: search intent conflict;
- `DISC-004`: unsupported keyword or metric claim;
- `DISC-005`: headline changes meaning;
- `DISC-006`: substantive article alteration;
- `DISC-007`: citation detached from claim;
- `DISC-008`: keyword stuffing or unnatural optimization;
- `DISC-009`: fabricated competitor or content-memory conclusion;
- `DISC-010`: cannibalization decision required;
- `DISC-011`: new research required;
- `DISC-012`: metadata incomplete;
- `DISC-013`: entity ambiguity;
- `DISC-014`: schema misrepresentation risk;
- `DISC-015`: distribution derivative introduces new claim;
- `DISC-016`: disclaimer or compliance posture changed;
- `DISC-017`: maximum revision attempts reached;
- `DISC-018`: existing URL migration risk;
- `DISC-019`: freshness or publication timing unresolved;
- `DISC-020`: human editorial decision required.

Every issue must include:

- issue ID;
- severity: `CRITICAL`, `MAJOR`, `MODERATE`, or `MINOR`;
- location;
- problem;
- evidence;
- required action;
- whether re-verification is required.

## 36. Normalized output contract

Return a structured `DiscoverabilityPackage` containing the following fields.

```yaml
skill:
  name: optimize-content-discoverability
  version: 1.1.0
status: DISCOVERABILITY_READY_FOR_REVIEW | DISCOVERABILITY_REVISION_REQUIRED | BLOCKED | EDITORIAL_DECISION_REQUIRED
content_identity:
  content_type:
  edition:
  locked_topic:
  locked_angle:
  target_audience:
  target_market:
  language:
  publication_window:
upstream_verification:
  status:
  verifier_version:
  unresolved_issues: []
substance_preservation:
  pass:
  changes:
    - classification:
      location:
      description:
      reverification_required:
search_strategy:
  primary_intent:
  secondary_intents: []
  primary_keyword:
  secondary_keywords: []
  long_tail_queries: []
  questions_covered: []
  questions_not_covered: []
headline_package:
  recommended_h1:
  alternatives: []
  meta_title:
  open_graph_title:
metadata_package:
  meta_description:
  slug:
  canonical:
  open_graph_description:
  excerpt:
  category:
  tags: []
  word_count:
  estimated_reading_time:
entity_package:
  canonical_entities: []
  aliases: []
  ambiguities: []
semantic_package:
  concept_map: []
  weak_connections: []
  research_required_gaps: []
answer_extraction:
  featured_snippet_candidates: []
  ai_answer_blocks: []
  faq_candidates: []
eeat_and_trust:
  supported_signals: []
  implementation_recommendations: []
  prohibited_or_unsupported_signals: []
internal_linking:
  assessed:
  recommendations: []
competitor_intelligence:
  assessed:
  evidence_timestamp:
  competitors: []
  gaps: []
  differentiation: []
topical_authority:
  assessed:
  primary_pillar:
  primary_cluster:
  related_clusters: []
  missing_content: []
content_memory:
  assessed:
  overlap_classification:
  closest_pages: []
  recommended_action:
visual_package:
  hero_image:
    concept:
    filename:
    alt_text:
    caption:
    aspect_ratio:
    credit_requirement:
  additional_visuals: []
schema_package:
  recommended_types: []
  required_properties: []
  missing_properties: []
content_lifecycle:
  freshness_class:
  decay_risk:
  review_timing:
  update_triggers: []
  refresh_checklist: []
distribution_package:
  assessed:
  primary_channel:
  secondary_channels: []
  assets: []
scores:
  assessed_dimensions: []
  not_assessed_dimensions: []
  overall:
  dimensions: {}
quality_gates:
  - gate:
    pass:
    notes:
issues: []
optimized_article:
  markdown:
handoff:
  next_skill: review-article
  required_state: DISCOVERABILITY_READY_FOR_REVIEW
  notes: []
```

## 37. Human-readable output order

In addition to the normalized object, provide the package in this order for the future MacroAlloc Article Package:

1. Optimization status.
2. Executive optimization summary.
3. Search strategy.
4. Headline and metadata package.
5. Entity and semantic package.
6. Featured-snippet, AI-answer and FAQ opportunities.
7. E-E-A-T and trust recommendations.
8. Internal-linking recommendations.
9. Competitor intelligence.
10. Topical-authority and content-memory analysis.
11. Visual package.
12. Schema recommendations.
13. Content-lifecycle plan.
14. Distribution package.
15. Scores and quality gates.
16. Issues and required decisions.
17. Final optimized article.
18. Technical handoff metadata.

## 38. Final optimized article rules

The final optimized article must:

- remain in US English unless another language is explicitly requested;
- preserve all verified facts and source markers;
- preserve the MacroAlloc thesis;
- preserve the disclaimer;
- use one H1;
- use a coherent H2/H3 hierarchy;
- include the source list;
- avoid hidden technical notes in the public article body;
- avoid displaying internal scores or SEO terminology to readers;
- avoid adding URLs not verified or supplied;
- remain suitable for independent final review.

## 39. Handoff to `review-article`

When status is `DISCOVERABILITY_READY_FOR_REVIEW`, pass:

- original verified article;
- final optimized article;
- complete `DiscoverabilityPackage`;
- substance-preservation ledger;
- verifier report;
- source register;
- all issues marked `MINOR` or accepted limitations;
- the exact skill version;
- revision attempt count.

The reviewer must be able to compare the optimized article with the verified baseline.

## 40. Compatibility and migration

This skill supersedes the narrower names:

- `optimize-macro-insight-seo`;
- `optimize-article-seo`.

Workflows may use those aliases temporarily, but new workflow definitions should call `optimize-content-discoverability`.

Compatibility requirements:

- accept verified output from `verify-financial-article v0.7.0` or later;
- preserve the writer's `EXECUTIVE_SUMMARY`, `CAUSAL_PIVOTS`, `CONTEXT_RECONCILIATION` and source markers;
- emit a structured package suitable for `review-article` and final Word assembly;
- do not require competitor, analytics or content-memory data for basic execution;
- mark unavailable advanced modules `NOT_ASSESSED` rather than failing the entire skill.

## 41. Completion criteria

The skill is complete only when:

- all mandatory inputs have been validated;
- the verified substance is frozen and preserved;
- the dominant intent is explicit;
- headline and metadata fields are complete;
- the article structure is optimized without loss of nuance;
- source markers remain correctly attached;
- entity ambiguity is resolved or reported;
- advanced modules are either assessed or marked `NOT_ASSESSED`;
- all mandatory quality gates pass;
- the normalized output contract is complete;
- the handoff state is explicit.

The skill must never equate completion with final publication approval.
