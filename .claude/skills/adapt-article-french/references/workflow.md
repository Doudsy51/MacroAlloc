# Adapt Article French — Workflow

## Contents

- 1. Mission
- 2. Position in the workflow
- 3. Inputs
- 4. Translation sequence
- 5. Blocking and routing

## 1. Mission

Produce a French-language adaptation of a MacroAlloc article, once and only once the region's English Publication Package has received the human `APPROVE` decision. This skill exists to widen the audience for already-approved content, not to create a second, independently-vetted publication track.

This skill must never draft, verify, review, or approve the primary English content. It must never let translation work start before, or substitute for, human approval of the English package.

## 2. Position in the workflow

Expected upstream state:

- the region's human decision is exactly `APPROVE` on the English Publication Package produced by `generate-article-package`;
- the approved article's markdown and `approved_article_hash` are available unchanged;
- the discoverability package (for SEO field translation) is available.

Possible outputs:

- `FRENCH_ADAPTATION_READY_FOR_PACKAGING`
- `BLOCKED`

Required downstream action:

- if `FRENCH_ADAPTATION_READY_FOR_PACKAGING`: hand off to `generate-article-package` in its French-render mode;
- if `BLOCKED`: stop and report the missing input or unresolved fidelity drift; do not deliver a partial or unverified French file.

This skill runs automatically once its precondition is met. It does not present a separate human approval gate: the English `APPROVE` is treated as covering the decision to publish this article at all, and the French text is delivered as a labeled, lower-guarantee adaptation of already-approved content, not as a second independently-approved artifact. Every deliverable emitted by this skill must carry that disclosure; see references/contracts.md.

## 3. Inputs

### 3.1 Mandatory inputs

- `REGION`: `US`, `EUROPE`, or `ASIA`
- `UPSTREAM_STATUS`: exactly `APPROVE` (the region's human final-validation decision)
- `APPROVED_ARTICLE_MARKDOWN`
- `APPROVED_ARTICLE_HASH`
- `LOCKED_TOPIC` and `LOCKED_ANGLE`
- `DISCOVERABILITY_PACKAGE` (for the English SEO fields being adapted)
- `CONTENT_TYPE` and `EDITION`

### 3.2 Blocking conditions

Return `BLOCKED` without translating when:

- the upstream status is anything other than `APPROVE` (including `PUBLISH` alone, `REQUEST_CHANGES`, or a pending revision loop);
- the approved article markdown or hash is missing or does not match the package that was approved;
- a material number, date, entity, or causal claim cannot be rendered in French without altering its meaning, and no acceptable French formulation can be found;
- the fidelity audit (Section 4, Step 4) finds a drift that cannot be resolved by correcting the translation alone.

## 4. Translation sequence

1. Confirm the precondition (Section 3.2) before doing any translation work.
2. Freeze the approved English article and its hash as the immutable source; this skill never edits, corrects, or improves the English text, even if it notices an issue. A noticed issue in the English text is reported as an observation for a future run, not corrected here.
3. Translate the article body into French:
   - preserve every number, date, percentage, and currency figure exactly, adapting only decimal and thousands-separator conventions to French usage;
   - preserve every named institution, person, and instrument; use the standard French name for a well-established institution (for example "the Federal Reserve" becomes "la Réserve fédérale") only when that French name is itself standard financial-press usage, and keep the original name otherwise;
   - preserve the locked thesis, causal pivots, and every hedge exactly. A hedge in the English text must remain a hedge in French, at the same strength; a plain statement must remain plain, not softened or hardened by translation choices;
   - preserve the source markers and reproduce the disclaimer with the equivalent French legal meaning, not a literal word-for-word rendering that reads unnaturally;
   - write in natural, professional French a French reader would not flag as machine-translated: vary sentence rhythm, avoid mechanical transitions, and apply the same em-dash prohibition as the English original (domain-rules.md Section 2).
4. Translate the discoverability fields (meta title, meta description, slug candidate, primary keyword) into terms a French-speaking reader would actually search, not a literal rendering of the English keywords. Do not invent French search-volume or competitor data; if a French keyword choice is a judgment call rather than a direct equivalent, say so in the notes.
5. Run the fidelity audit: list every number, date, entity, and causal claim found in the French text, and confirm each one traces to an identical claim in the approved English text with no material change in meaning, strength, or certainty. Record the audit in full; do not report "no issues found" without the itemized comparison behind it.
6. If the audit finds a drift, correct only the French wording to remove it, re-run the affected part of the audit, and record the correction. Never resolve a drift by changing what the English original said.

## 5. Blocking and routing

- Return `BLOCKED` when the precondition in Section 3.2 is not met, or when a drift cannot be resolved by correcting the French wording alone.
- Return `FRENCH_ADAPTATION_READY_FOR_PACKAGING` only when the fidelity audit is complete, every item traces cleanly to the approved English article, and the French prose meets the human-sounding-prose and em-dash rules.
- Hand off directly to `generate-article-package`'s French-render mode; do not attempt to render the final `.docx` file in this skill.
