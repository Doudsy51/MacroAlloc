# Track Content Selections — Domain Rules

## Contents

- 1. Append-only principle
- 2. Real vs. test separation
- 3. Freshness vs. selection date
- 4. Keyword discipline
- 5. What this skill must never do

## 1. Append-only principle

The registry is a ledger, not a database to update in place. Every LOG call adds exactly one new row. If a previously logged selection turns out to have been wrong (wrong region, wrong score), the correction is a new row plus a note in the orchestrator's own execution log — never an edit to the original row. This preserves an honest history of what was actually chosen and when, which is the entire point of the registry.

## 2. Real vs. test separation

`run_mode` distinguishes a genuine editorial production run from a skill-testing or pipeline-QA run. Both are logged (a test run's selections are still real information about what topics were exercised), but:

- QUERY mode excludes `run_mode: test` rows by default, so a QA session about the FOMC does not make the real production pipeline think that topic is stale.
- A caller may explicitly set `include_test: true` when the goal is to inspect or debug the tracking skill itself, not to run real content-memory checks.

Never infer `run_mode` from context; the caller (the orchestrator) must state it explicitly based on what the user told it about the run.

## 3. Freshness vs. selection date

`event_date` and `freshness_class` describe how fresh the underlying story was when chosen — they are what makes a future query useful for judging whether a similar candidate would be stale or genuinely new (e.g., "the last FOMC decision logged was for the September 16 meeting" is useful; "a topic was logged 3 days ago" alone is not, since the event itself could still be brand new).

`selection_date_utc` only records when the human clicked; do not use it as a proxy for the topic's own freshness.

## 4. Keyword discipline

Keywords exist to make the registry searchable and to make `mots-clés` visible in the Excel export (e.g., `Fed`, `S&P 500`, `ECB`, `Inflation`, `Gold`). They are:

- supplied by the orchestrator from the selected opportunity's own entities/topic, never invented by this skill;
- short entity or concept labels, not full sentences;
- not the mechanism for deduplication by themselves — a shared keyword (e.g., two different FOMC meetings six weeks apart both tagged `Fed`) does not mean duplication. `discover-content-opportunities`'s cannibalization engine, not this skill, judges whether two entries with overlapping keywords are actually the same story.

## 5. What this skill must never do

- Never decide that a candidate is a duplicate, or exclude it from a shortlist; that judgment belongs entirely to `discover-content-opportunities`.
- Never log a candidate that was only shortlisted, not selected.
- Never fabricate a `score`, `freshness_class`, or `keywords` value when the caller omits it; treat that as a missing required field.
- Never publish or expose `run_id` / `job_id` values in any public-facing artifact; they are internal workflow identifiers, consistent with the rest of the bundle's public/internal separation.
