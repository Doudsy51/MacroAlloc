# Track Content Selections — Quality And Tests

## Contents

- 1. Core operating principles
- 2. Acceptance criteria
- 3. Failure modes
- 4. Test scenarios

## 1. Core operating principles

- Log only confirmed `TOPIC_SELECTED` choices, never shortlist candidates.
- Never rewrite or delete an existing row.
- Never let a registry failure block a region's editorial pipeline.
- Never invent a field value; a gap blocks the write instead.
- Keep `real` and `test` selections separable at query time.
- Hand the raw overlap evidence to `discover-content-opportunities`; never pre-judge duplication here.

## 2. Acceptance criteria

The skill passes only if:

- every LOG call with a complete, valid entry appends exactly one row and regenerates the `.xlsx` export from the full CSV;
- every LOG call with a missing or invalid required field returns `BLOCKED` and appends nothing;
- every QUERY call returns `CONTENT_MEMORY_READY`, even when `entries` is empty;
- a QUERY call excludes `run_mode: test` rows unless `include_test: true` is explicitly set;
- the registry file is never reordered, edited in place, or had a row removed by this skill;
- the CSV remains the single source of truth; the `.xlsx` is always regenerated from it, never edited independently.

## 3. Failure modes

### 3.1 Silent data loss

Symptom: a LOG call appears to succeed but the row is missing on the next QUERY.

Action: treat any write whose read-back verification fails as `BLOCKED`, not `LOGGED`; never report success without confirming the row is present.

### 3.2 Keyword-only false duplicate

Symptom: a fresh, legitimate FOMC-decision candidate is treated as a duplicate of one logged six weeks earlier merely because both are tagged `Fed`.

Action: this skill only returns matching history; if `discover-content-opportunities` treats a shared keyword alone as sufficient grounds for exclusion, that is a defect in that skill's cannibalization engine, not in this skill's query logic. This skill must keep `event_date` and `freshness_class` present in every returned entry so the consuming skill can make that distinction.

### 3.3 Test contamination

Symptom: a skill-testing run's selections cause a later real production run to see topics as already covered.

Action: confirm `run_mode: test` rows are excluded by default before returning any `CONTENT_MEMORY_READY` result.

### 3.4 Corrupted registry

Symptom: the CSV has a malformed row (wrong column count, broken quoting).

Action: `BLOCKED`, citing the malformed row's position; never skip it silently or guess its intended values.

## 4. Test scenarios

The skill should be evaluated on at least:

- a complete, valid LOG entry for a real US Macro Insight selection, which must append one row and regenerate the `.xlsx`;
- a LOG entry missing `score`, which must return `BLOCKED` without appending;
- a LOG entry with `run_mode: test`, which must still be appended but excluded from a subsequent default QUERY;
- a QUERY for a region with no prior entries, which must return `CONTENT_MEMORY_READY` with `entries: []`, not `BLOCKED`;
- a QUERY with `include_test: true`, which must surface `test`-mode rows alongside `real`-mode ones;
- two LOG entries for the same region six weeks apart both mentioning `Fed`, followed by a QUERY, which must return both entries with their distinct `event_date` values rather than collapsing or excluding either;
- an attempt to log a shortlist candidate that was never selected, which this skill's caller (the orchestrator) must never construct in the first place — this skill has no independent way to verify `TOPIC_SELECTED` occurred and relies on the orchestrator's contract.

End of skill.
