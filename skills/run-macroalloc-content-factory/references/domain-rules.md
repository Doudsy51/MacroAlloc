# Run MacroAlloc Content Factory — Domain Rules

## Contents

- 1. Normalized workflow state
- 2. Error handling

## 1. Normalized workflow state

Create and maintain one `ArticleJob` object for every run.

```yaml
article_job:
  job_id: "MA-CF-YYYYMMDD-HHMMSS-<short-id>"
  created_at_utc: "ISO-8601"
  requested_content_type: null
  requested_language: "en-US"
  requested_window: null
  current_stage: "DISCOVERY"
  current_status: "RUNNING"
  selected_topic_id: null
  human_topic_approval: false
  human_final_approval: false
  revision_counters:
    writer: 0
    verifier: 0
    discoverability: 0
    reviewer: 0
    package: 0
  skill_versions: {}
  artifacts: {}
  decisions: []
  warnings: []
  errors: []
```

The `ArticleJob` object is the source of truth for the run.

## 2. Error handling

Classify errors as:

- `INPUT_ERROR`
- `MISSING_SKILL`
- `SOURCE_FAILURE`
- `TOOL_FAILURE`
- `CONTRACT_MISMATCH`
- `QUALITY_GATE_FAILURE`
- `REVISION_LIMIT_REACHED`
- `HUMAN_DECISION_REQUIRED`
- `PACKAGE_EXPORT_FAILURE`

For transient tool failures, allow one retry.

For source failures affecting a material claim, block the job.

For contract mismatches, preserve the raw output and stop. Do not guess the missing fields.
