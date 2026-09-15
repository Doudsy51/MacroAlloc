# Adapt Article French — Domain Rules

## Contents

- 1. Scope
- 2. French prose standard
- 3. Terminology and entity rules
- 4. Numbers, dates, and units
- 5. Hedge-strength preservation
- 6. SEO adaptation

## 1. Scope

This skill translates and locally adapts an already-approved article. It does not:

- perform any new fact-checking, causal analysis, or editorial judgment on the substance; that is closed once `verify-financial-article` and `review-article` have run and the human has approved the English package;
- change the locked topic, angle, content type, or edition;
- produce a secondary adaptation into any language other than French;
- generate the final `.docx` file itself; that is `generate-article-package`'s French-render mode.

A French reader must receive the same facts, the same thesis, and the same level of certainty as an English reader, expressed in natural French.

## 2. French prose standard

Apply the same human-sounding-prose objective as `write-macro-insight` (its domain-rules.md Section 2.4), adapted to French:

- vary sentence rhythm; do not produce a uniform, mechanically even cadence throughout a section;
- avoid mechanical French transition words used repeatedly ("En outre," "Par ailleurs," "Il convient de noter que," "De plus") more than once in the article, or opening more than one paragraph;
- do not force a "règle de trois" or a systematic "d'un côté... de l'autre" framing where the material does not call for it;
- avoid generic signposting ("Voyons cela plus en détail," "Voici ce que cela signifie") that announces a point instead of making it;
- hedge only where the English original hedges, at the same strength, not as a uniform verbal tic;
- never use the em dash ("—") or a double hyphen used as one. Zero tolerance, identical to the English rule.
- do not pad or compress a section relative to what the English original actually needs to say in French; French is often slightly longer than English for the same content, and that is acceptable, but it must not become padding.

## 3. Terminology and entity rules

- Use the standard French financial-press name for a well-known institution when one exists and is itself standard usage (for example, "the Federal Reserve" / "the Fed" becomes "la Réserve fédérale" / "la Fed"; "the European Central Bank" becomes "la Banque centrale européenne" / "la BCE"). Keep the English name in parentheses on first use if the French name is less commonly recognized than the English one for that specific entity.
- Do not translate a company name, a ticker, or a product name; keep it exactly as in the English original.
- Do not translate a direct quotation's substance into a different register than the original; preserve whether a statement was formal, cautious, or assertive.
- Use recognized French financial terminology for standard concepts (for example, "hausse de taux" for a rate hike, "point de base" for a basis point, "rendement obligataire" for a bond yield) rather than a literal, unnatural calque of the English phrase.
- When no natural French equivalent exists for a specific technical term, keep the English term and add a brief French gloss on first use rather than inventing a French term that does not exist in French financial usage.

## 4. Numbers, dates, and units

- Preserve every number, percentage, and currency figure exactly; do not round, adjust, or re-derive a value that was already stated in the English original.
- Adapt only the formatting convention: decimal comma instead of decimal point where French convention calls for it, and thousands separators per French usage, without changing the underlying value.
- Render dates in standard French format and, where the original specifies a US Eastern Time or other timezone-specific detail material to the point being made, preserve that detail rather than silently converting or dropping it.
- Preserve basis-point and percentage-point distinctions exactly; these are common sources of translation error and must be checked explicitly in the fidelity audit.

## 5. Hedge-strength preservation

This is the most common way a translation can silently distort meaning without any factual error being introduced.

- A claim marked as confirmed fact in the English original must read as confirmed fact in French, with the same confidence.
- A claim explicitly attributed and hedged in the English original ("could not be independently verified," "remains unresolved," "is disputed") must carry an equivalent hedge in French, not a more confident or more tentative framing.
- A scenario or conditional statement in the English original must remain conditional in French; do not let a French subjunctive or conditional construction accidentally read as more certain or less certain than the English modal verb it replaces.
- When in doubt between two French renderings of a hedge, prefer the one that is closer in strength to the English original over the one that reads more naturally, and note the choice in the fidelity audit.

## 6. SEO adaptation

- Do not translate English keywords literally; use the French terms a French-speaking reader would actually search for the same information need.
- Do not invent French search-volume data, French competitor evidence, or French-market ranking claims; none of that is available to this skill, and the discoverability package this skill receives was built for English search behavior.
- Mark any French keyword choice that required editorial judgment, rather than being a direct equivalent, in `keyword_choice_notes` (contracts.md) so a human reviewer can assess it later if needed.
