# Track Content Selections — Contracts

## Contents

- 1. Registry schema (CSV columns)
- 2. LOG mode input contract
- 3. LOG mode output contract
- 4. QUERY mode input contract
- 5. QUERY mode output contract (`RECENT_CONTENT_LIBRARY`)
- 6. File paths

## 1. Registry schema (CSV columns)

`data/content-log/selected-topics.csv` header, in order:

```text
run_id,job_id,region,selection_date_utc,opportunity_id,topic,content_type,score,event_date,freshness_class,keywords,locked_angle,run_mode,status
```

- `run_id`: the orchestrator's `run.run_id` for that execution.
- `job_id`: the region's `article_job.job_id`.
- `region`: `US` | `EUROPE` | `ASIA`.
- `selection_date_utc`: ISO-8601 date the human made the selection.
- `opportunity_id`: the `discover-content-opportunities` candidate ID that was chosen.
- `topic`: the working title / locked topic, in US English.
- `content_type`: `Macro Insights` | `Market Analysis` | `ETF Research` | `Education`.
- `score`: the shortlist's 0-100 opportunity score at selection time.
- `event_date`: the date of the underlying event or data point the topic is anchored to (drives freshness, independent of `selection_date_utc`).
- `freshness_class`: one of `discover-content-opportunities`'s own §10.1 timing classes — `IMMEDIATE`, `SAME_DAY`, `NEXT_24_HOURS`, `THIS_WEEK`, `EVERGREEN`, `SEASONAL`.
- `keywords`: semicolon-separated list, e.g. `Fed;S&P 500;Inflation`.
- `locked_angle`: optional; the locked angle text, or empty.
- `run_mode`: `real` | `test`.
- `status`: literal value recorded at logging time; currently always `TOPIC_SELECTED` (this skill does not track later lifecycle stages).

## 2. LOG mode input contract

```yaml
mode: LOG
entry:
  run_id:
  job_id:
  region: US | EUROPE | ASIA
  selection_date_utc:
  opportunity_id:
  topic:
  content_type: Macro Insights | Market Analysis | ETF Research | Education
  score:
  event_date:
  freshness_class:
  keywords: []
  locked_angle: null
  run_mode: real | test
```

All fields except `locked_angle` are required; a missing or empty required field returns `BLOCKED` and appends nothing.

## 3. LOG mode output contract

```yaml
status: LOGGED | BLOCKED
row:
  run_id:
  job_id:
  region:
  opportunity_id:
issue: null
```

`issue` is populated only when `status: BLOCKED`, naming the missing or invalid field.

## 4. QUERY mode input contract

```yaml
mode: QUERY
region: US | EUROPE | ASIA
lookback_days: 45
content_type: null
keyword: null
include_test: false
```

Only `region` is required.

## 5. QUERY mode output contract (`RECENT_CONTENT_LIBRARY`)

```yaml
status: CONTENT_MEMORY_READY | BLOCKED
region:
entries_found:
entries:
  - topic:
    content_type:
    event_date:
    freshness_class:
    keywords: []
    locked_angle:
    score:
    selection_date_utc:
issue: null
```

This `entries` array is exactly what the orchestrator passes as `RECENT_CONTENT_LIBRARY` to `discover-content-opportunities` for that region. An empty array is a valid, truthful result — it is not converted into a fabricated "no overlap confirmed" claim; `discover-content-opportunities` treats an empty `RECENT_CONTENT_LIBRARY` the same as an unavailable one.

## 6. File paths

- Registry (source of truth, Git-tracked): `data/content-log/selected-topics.csv`
- Human-readable export (Git-tracked, regenerated on every LOG call): `data/content-log/selected-topics.xlsx`
- Script: `skills/track-content-selections/scripts/content_log.js`

Neither file is subject to `docs/artifact-policy.md`'s untracked-artifact protections (that policy covers generated article jobs, packages, and test outputs); this registry is deliberately versioned and additive, not a per-run disposable artifact.
