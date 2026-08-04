# Optimize Content Discoverability — Quality And Tests

## Contents

- 3. Core operating principles
- 33. Mandatory quality gates
- 35. Failure taxonomy
- 41. Completion criteria

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
