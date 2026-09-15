# Optimize Content Discoverability — Workflow

## Contents

- 1. Mission
- 2. Position in the workflow
- 3. Responsibilities
- 4. Non-responsibilities
- 5. Inputs
- 6. Execution pipeline
- 7. Revision mode
- 8. Handoff to `review-article`

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
- `CONSOLIDATION_DECISION_REQUIRED` when cannibalization or overlap requires a human consolidation choice;
- `BLOCKED` when required inputs or reliable optimization evidence are missing;
- `EDITORIAL_DECISION_REQUIRED` when discoverability improvements would materially change editorial intent, positioning or content architecture.

Required downstream action:

- for `DISCOVERABILITY_READY_FOR_REVIEW`, send the optimized article and `DiscoverabilityPackage` to `review-article`;
- for `CONSOLIDATION_DECISION_REQUIRED`, stop and route the overlap or cannibalization choice to `HUMAN_EDITORIAL_DECISION`;
- for a substantive change requiring re-verification, route to `verify-financial-article`;
- for `BLOCKED`, stop the workflow;
- never publish or declare the article finally approved.

## 3. Responsibilities

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

## 4. Non-responsibilities

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

## 5. Inputs

### 5.1 Mandatory inputs

The skill must receive:

- `UPSTREAM_STATUS` equal to `APPROVED_FOR_SEO`;
- `SHORTLIST_ID`, `SELECTED_TOPIC_ID`, and explicit `SELECTION_EVIDENCE`;
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

### 5.2 Recommended inputs

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

### 5.3 Blocking conditions

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

## 6. Execution pipeline

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

## 7. Revision mode

When `REVISION_ATTEMPT` is `1` or `2`:

- change only the issues identified by the downstream reviewer or prior gate report;
- preserve all previously approved sections unless necessary;
- produce a change log;
- rerun the substance-preservation gate;
- rerun all gates affected by the changes.

No third automatic revision is allowed.

If material defects remain after attempt `2`, return `EDITORIAL_DECISION_REQUIRED`.

## 8. Handoff to `review-article`

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
