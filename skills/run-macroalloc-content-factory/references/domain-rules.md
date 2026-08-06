# Run MacroAlloc Content Factory — Domain Rules

## Contents

- 1. Normalized workflow state
- 2. Error handling

## 1. Normalized workflow state

Create and maintain one `Run` object for every invocation, containing one independent `ArticleJob` per region (US, Europe, Asia). The discovery phase is shared; from `TOPIC_SELECTED` onward, each region's `ArticleJob` is a fully separate object with its own stage, status, counters, and artifacts.

```yaml
run:
  run_id: "MA-CF-YYYYMMDD-HHMMSS-<short-id>"
  created_at_utc: "ISO-8601"
  requested_content_type: null
  requested_language: "en-US"
  requested_window: null
  current_stage: "DISCOVERY"
  regions:
    US:
      article_job:
        job_id: "MA-CF-YYYYMMDD-HHMMSS-<short-id>-US"
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
    EUROPE:
      article_job: { ... same shape as US, job_id suffixed -EUROPE ... }
    ASIA:
      article_job: { ... same shape as US, job_id suffixed -ASIA ... }
```

Each region's `article_job` is the source of truth for that region's production only. A region with no confirmed `TOPIC_SELECTED` after Stage 2 stays at `current_stage: "DISCOVERY"` and is never advanced. No field under one region's `article_job` may read from or write to another region's.

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
