# Adapt Article French — Quality and Tests

## Contents

- Hard gates
- Self-review checklist
- Prohibited behavior
- Minimum test set before production approval

## Hard gates

The skill must not return `FRENCH_ADAPTATION_READY_FOR_PACKAGING` if any of the following is true:

- the upstream status is not exactly `APPROVE`;
- the approved article hash is missing or does not match the source used for translation;
- any number, date, percentage, or currency figure in the French text does not trace exactly to the English original;
- any named entity, institution, or instrument was altered beyond an accepted standard French rendering (domain-rules.md Section 3);
- any hedge, causal claim, or certainty level was strengthened, weakened, or dropped relative to the English original;
- the disclaimer's legal meaning was altered;
- more than one direct quotation appears, or any quotation exceeds 15 words, in the French text;
- an em dash or double-hyphen substitute appears anywhere in the French text;
- the `disclosure` block (contracts.md) is missing or altered from its required wording;
- the fidelity audit is absent, incomplete, or reports "no drift" without the itemized comparison behind it.

## Self-review checklist

Before returning the output, verify:

### Fidelity

- [ ] Every number, date, and percentage in the French text traces exactly to the English original.
- [ ] Every entity name follows domain-rules.md Section 3.
- [ ] Every hedge and causal claim carries the same strength as the English original.
- [ ] The disclaimer's legal meaning is preserved.
- [ ] The fidelity audit is itemized, not a bare summary.

### French prose quality

- [ ] Sentence rhythm varies; no uniform mechanical cadence.
- [ ] No mechanical French transition word repeated across the article.
- [ ] No em dash or double-hyphen substitute anywhere.
- [ ] At most one direct quotation, 15 words or fewer.

### Workflow

- [ ] Upstream status is exactly `APPROVE`.
- [ ] The `disclosure` block is present and unaltered.
- [ ] Status is exactly `FRENCH_ADAPTATION_READY_FOR_PACKAGING` when successful.
- [ ] Downstream action is exactly `generate-article-package` in French-render mode.

## Prohibited behavior

The skill must never:

- translate a draft that has not received the region's human `APPROVE`;
- add, remove, soften, or strengthen a fact, causal claim, or hedge relative to the approved English article;
- invent a French source, a French search-volume figure, or French competitor evidence;
- silently drop the `disclosure` block or weaken its wording;
- claim independent human-in-language review occurred when it did not;
- generate the final `.docx` file itself;
- change the locked topic, angle, content type, or edition;
- exceed the quotation or em-dash rules that apply to the English original.

## Minimum test set before production approval

This skill remains in `TESTING` until it passes at least:

- 5 straightforward articles with no ambiguous terminology;
- 5 articles containing basis-point and percentage-point figures, to test Section 4;
- 5 articles with a mix of confirmed facts, hedges, and disputed claims, to test Section 5;
- 5 articles referencing an institution with a standard French name and one without, to test Section 3;
- 5 cases where the upstream status is not `APPROVE` (still `PUBLISH`, `REQUEST_CHANGES`, or mid-revision), which must all return `BLOCKED`;
- 5 cases with a deliberately seeded hedge-strength drift, which the fidelity audit must catch before return.

Required production targets:

- 100% preservation of numeric values;
- 100% preservation of hedge strength;
- 100% blocking when the upstream status is not `APPROVE`;
- zero occurrences of the em dash or an unresolved excessive quotation in any approved output.
