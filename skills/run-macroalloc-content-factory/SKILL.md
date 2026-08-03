---
name: run-macroalloc-content-factory
description: Orchestrates the complete US-first MacroAlloc editorial workflow from a 3-to-5-topic shortlist through mandatory human topic selection, drafting, verification, discoverability optimization, editorial review, and two-document Word delivery: a lightweight Publication Package and a separate internal Workflow Report. Use when ChatGPT needs to coordinate specialist skills and hard human approval gates. Always stop at AWAITING_USER_SELECTION and never draft until the user explicitly selects one shortlisted topic.
metadata:
  version: 1.2.1
  status: TESTING
  owner: MacroAlloc Content Factory
  language: en-US
  type: orchestrator
  replaces:
    - run-macro-insight-pipeline
  required_skills:
    - discover-content-opportunities@1.1.0
    - write-macro-insight@1.1.0
    - verify-financial-article@1.1.0
    - optimize-content-discoverability@1.1.0
    - review-article@1.1.0
    - generate-article-package@1.2.1
  primary_output:
    - PublicationPackageDOCX
    - WorkflowReportDOCX
  human_gates:
    - topic_selection
    - final_publication_approval
---

# run-macroalloc-content-factory

## 1. Mission

Orchestrate the complete MacroAlloc editorial production process from content-opportunity discovery to the generation of two final DOCX files: a publication-ready article-and-SEO document and a separate internal workflow-analysis report.

This orchestrator does not replace specialist skills. It invokes them in the required order, passes normalized outputs between them, interprets status codes, controls revision loops, records traceability, and stops execution when a mandatory quality or human-validation gate is not satisfied.

The orchestrator must never publish content automatically during the launch phase.

## 2. Required execution chain

1. `discover-content-opportunities`
2. Mandatory human topic selection in a separate turn
3. `write-macro-insight`
4. `verify-financial-article`
5. `optimize-content-discoverability`
6. `review-article`
7. `generate-article-package` produces both required DOCX files
8. Human final approval

The orchestrator must not skip a stage unless this skill explicitly defines the stage as optional.

## 3. Core operating principles

- Use the installed specialist skill corresponding to each stage.
- Never imitate or manually summarize a specialist skill when the actual skill is available.
- Preserve every structured output needed by downstream stages.
- Never allow SEO optimization before factual verification passes.
- Never allow packaging before editorial approval passes.
- Never allow publication without explicit human approval.
- Limit automatic revision loops.
- Maintain an immutable execution log.
- Keep facts, interpretations, forecasts, scenarios, and recommendations clearly separated.
- Stop rather than fabricate missing information.
- Treat US English (`en-US`) as the non-negotiable language of the primary article, SEO metadata, review and final package.
- Treat any requested French or other-language version only as an optional secondary adaptation after the US-English package is complete; it must never replace the primary deliverable.

## 4. Normalized workflow state

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

## 5. Stage 0 — Preflight

Before execution:

1. Confirm that all six required skills are installed and enabled.
2. Record their versions.
3. Confirm that web research is available for current-event content.
4. Set the primary language to `en-US` and record any other requested language as an optional secondary adaptation.
5. Confirm that topic selection is human and cannot be delegated to the workflow.
6. Confirm that the final output must contain both `PublicationPackageDOCX` and `WorkflowReportDOCX`.
7. Confirm that final human approval remains mandatory.
8. Create the job ID and initialize logs.

If any required skill is unavailable, return:

`ORCHESTRATOR_BLOCKED_MISSING_SKILL`

Do not replace a missing skill with improvised instructions.

## 6. Stage 1 — Discover content opportunities

Invoke `discover-content-opportunities`.

Pass:

- requested content type;
- publication cadence;
- target audience;
- language;
- current date and search window;
- MacroAlloc content priorities;
- existing-content memory when available;
- explicit user constraints.

Expected successful status:

`AWAITING_USER_SELECTION`

Other statuses:

- `NO_SUITABLE_SHORTLIST` → stop cleanly; do not force or pad the shortlist.
- `BLOCKED` → stop and report the blocking reason.

Preserve the complete shortlist and research brief.

## 7. Stage 2 — Topic-selection gate

Human selection is mandatory and is the only permitted mode.

Present the strongest 3–5 candidates with:

- proposed headline or topic;
- content type;
- timing;
- reader value;
- factual/source readiness;
- SEO/discoverability potential;
- duplication risk;
- strategic fit;
- total score;
- key risks.

Return the exact status `AWAITING_USER_SELECTION`, request one number or exact title, and end the turn immediately. Do not invoke research, writing, verification, SEO, review or packaging in the same turn.

Wait for explicit topic selection. A request to run the complete workflow, choose the best option, proceed automatically, meet a deadline or produce the final article does not satisfy this gate. Ranking, score and urgency never constitute user selection.

Resume only when the user's next message unambiguously identifies exactly one option from the active shortlist. Record `TOPIC_SELECTED` before Stage 3. If the reply is ambiguous, remain at `AWAITING_USER_SELECTION`. If it identifies an unlisted topic, stop and require a new discovery run.

Record:

- selected topic;
- explicit user selection evidence;
- selected candidate score;
- rejected candidates;
- decision rationale.

## 8. Stage 3 — Write the article

Invoke `write-macro-insight`.

Hard precondition: `current_status` must equal `TOPIC_SELECTED`, `human_topic_approval` must be `true`, and `selected_topic_id` must match an item in the preserved shortlist. If any condition fails, return `AWAITING_USER_SELECTION` and do not call the writer.

Pass the full approved research brief, including:

- selected angle;
- target reader;
- confirmed sources and claims;
- causal pivots;
- uncertainties;
- prohibited claims;
- SEO clues that do not dictate editorial conclusions;
- required content type and length;
- revision instructions when this is a retry.

Expected successful status:

`DRAFT_READY_FOR_VERIFICATION`

If the writer returns an incomplete draft, missing sources, unsupported claims, or a blocked status, stop or request correction according to the writer output.

Preserve the complete `ArticleDraft`, source ledger, context reconciliation, causal-pivot register, and writer notes.

## 9. Stage 4 — Financial verification

Invoke `verify-financial-article`.

Pass:

- full article draft;
- research brief;
- all sources;
- claim ledger;
- causal pivots;
- context-reconciliation record;
- previous verification report, if any.

Routing:

### `APPROVED_FOR_SEO`
Continue to Stage 5.

### `REVISION_REQUIRED`
Route the exact revision instructions to `write-macro-insight` in revision mode.

Increment `revision_counters.writer`.

Maximum writer-verifier loops: 2.

After the Writer revises, rerun the complete verification stage. Do not patch only selected claims without rerunning the verifier.

If the maximum is exceeded, return:

`HUMAN_EDITORIAL_INTERVENTION_REQUIRED`

### `EDITORIAL_DECISION_REQUIRED`
Pause and request a human decision. Preserve the disputed claims and alternatives.

### `BLOCKED`
Stop. Explain the blocking issue and required evidence.

The orchestrator must not reinterpret verification findings.

## 10. Stage 5 — Discoverability optimization

Invoke `optimize-content-discoverability` only after `APPROVED_FOR_SEO`.

Pass:

- verified article;
- verification report;
- source and claim ledgers;
- content type;
- target audience;
- language;
- publication date;
- site taxonomy and existing-content memory when available;
- internal-link inventory when available.

Expected successful status:

`DISCOVERABILITY_READY_FOR_REVIEW`

Routing:

### `DISCOVERABILITY_REVISION_REQUIRED`
Determine ownership of each issue:

- metadata, headings, slug, snippets, schema, internal links → return to discoverability skill;
- missing explanation or article-body content → return to writer, then rerun verification and discoverability;
- factual issue discovered incidentally → return to verifier;
- strategic consolidation or cannibalization decision → human gate.

Maximum discoverability-only retries: 1.

### `CONSOLIDATION_DECISION_REQUIRED`
Pause for human decision.

### `BLOCKED`
Stop and report the blocking dependency.

The discoverability skill must never silently alter verified claims, numbers, or conclusions.

## 11. Stage 6 — Final editorial review

Invoke `review-article`.

Pass:

- verified and optimized article;
- verification report;
- discoverability package;
- original research brief;
- source ledger;
- prior revision history.

Successful statuses include:

- `EDITORIALLY_APPROVED`
- `PUBLISH`

Routing:

### `MINOR_REVISIONS` or `EDITORIAL_REVISION_REQUIRED`
Route each issue by owner:

- prose, flow, clarity, pedagogy, narrative, conclusion → writer;
- metadata/discoverability → discoverability skill;
- fact, number, attribution, causal support → verifier;
- packaging/format only → package generator.

After any writer change, rerun verification, discoverability, and review.

After any factual change, rerun verification, discoverability, and review.

After discoverability-only changes that do not alter the article body, rerun review.

Maximum final-review correction cycles: 2.

### `MAJOR_REVISIONS`
Return to writer with the complete editorial revision plan. Then rerun:

Writer → Verifier → Discoverability → Reviewer.

### `EDITORIAL_DECISION_REQUIRED`
Pause for human decision.

### `EDITORIAL_REJECTED`, `REJECT`, or `BLOCKED`
Stop. Do not generate a final package marked as publishable.

The reviewer is the final editorial quality gate but cannot override a failed factual gate.

## 12. Stage 7 — Generate the two final Word deliverables

Invoke `generate-article-package` only after editorial approval.

Pass all validated artifacts:

- final approved article;
- executive summary;
- discoverability package;
- SEO metadata;
- visual package;
- complete sources;
- fact-check report;
- AI review summary;
- editorial review;
- distribution assets;
- technical metadata;
- skill versions;
- revision history;
- job ID.

Required outputs:

- `PublicationPackageDOCX` containing only the complete approved article, reader-facing sources and disclaimer, publication SEO fields, and approved CMS asset details;
- `WorkflowReportDOCX` containing the shortlist, human-selection evidence, locked brief, source and claim registers, verification, discoverability rationale, editorial review, revisions, diagnostics, provenance and next human action.

The two files must share the same article ID, article version and immutable article hash. Internal material must never appear in the Publication Package.

Expected successful status:

`DUAL_ARTIFACTS_READY_FOR_HUMAN_VALIDATION`

Routing:

### `PACKAGE_REVISION_REQUIRED`
Return packaging issues to `generate-article-package`.

Maximum package retries: 1.

### `BLOCKED`
Stop and report missing or inconsistent artifacts.

The package generator may format and assemble. It may not invent, rewrite, or override approved content.

## 13. Stage 8 — Human final-validation gate

Present both final DOCX files and a concise final status report. Identify the Publication Package as the document for human review and website publication. Identify the Workflow Report as internal and not for publication.

Required human action:

- `APPROVE`
- `REQUEST_CHANGES`
- `REJECT`

No CMS or social publication may occur without `APPROVE`.

If changes are requested, route them according to issue ownership and rerun all affected downstream gates.

## 14. Revision-routing matrix

| Issue type | Owner | Mandatory downstream reruns |
|---|---|---|
| New or changed fact | Verifier, then Writer if needed | Verifier → Discoverability → Reviewer → Package |
| Unsupported causal claim | Writer + Verifier | Verifier → Discoverability → Reviewer → Package |
| Missing context or explanation | Writer | Verifier → Discoverability → Reviewer → Package |
| Style, flow, pedagogy | Writer | Verifier → Discoverability → Reviewer → Package |
| Meta title, meta description, slug | Discoverability | Reviewer → Package |
| Internal links, schema, snippets | Discoverability | Reviewer → Package |
| Editorial positioning dispute | Human | Resume at designated stage |
| Formatting, cover, table, pagination | Package generator | Package only |
| Source unavailable or contradictory | Verifier / Human | Full downstream chain |
| Topic cannibalization | Human / Discoverability | Resume after decision |

## 15. Loop limits

Hard limits per job:

- writer-verifier loops: 2
- discoverability-only retries: 1
- editorial-review correction cycles: 2
- package retries: 1

Never reset counters by creating a hidden new job.

When a limit is reached, pause and require human intervention.

## 16. Error handling

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

## 17. Traceability requirements

Record for every stage:

- stage name;
- skill name and version;
- start and end time;
- input artifact IDs;
- output artifact IDs;
- status;
- scores;
- warnings;
- errors;
- decisions;
- revision number;
- model/tool identifiers when available.

The Workflow Report must include the skill versions and job ID. The Publication Package must not expose workflow IDs or skill versions.

## 18. Mandatory artifacts

The final job record must contain:

- `OpportunityShortlist`
- `SelectedResearchBrief`
- `ArticleDraft`
- `VerificationReport`
- `DiscoverabilityPackage`
- `EditorialReview`
- `FinalApprovedArticle`
- `PublicationPackageDOCX`
- `WorkflowReportDOCX`
- `ExecutionLog`
- `RevisionHistory`

If any mandatory artifact is absent, the job cannot be marked complete.

## 19. Final orchestrator statuses

- `AWAITING_USER_SELECTION`
- `TOPIC_SELECTED`
- `DRAFT_READY_FOR_VERIFICATION`
- `REVISION_IN_PROGRESS`
- `APPROVED_FOR_SEO`
- `DISCOVERABILITY_READY_FOR_REVIEW`
- `EDITORIALLY_APPROVED`
- `DUAL_ARTIFACTS_READY_FOR_HUMAN_VALIDATION`
- `PUBLICATION_PACKAGE_READY_FOR_EXPORT`
- `HUMAN_EDITORIAL_INTERVENTION_REQUIRED`
- `HUMAN_FINAL_APPROVAL_REQUIRED`
- `COMPLETED_APPROVED`
- `COMPLETED_REJECTED`
- `NO_SUITABLE_SHORTLIST`
- `BLOCKED`
- `FAILED`

## 20. User-facing execution behavior

When the user starts the pipeline:

1. Run discovery.
2. Present 3 to 5 qualified topic choices, return `AWAITING_USER_SELECTION`, and end the turn.
3. After selection, continue automatically through all machine-controlled stages.
4. Interrupt only for:
   - topic selection;
   - editorial decision;
   - revision-limit escalation;
   - final human approval;
   - blocking failure.
5. At completion, return both DOCX files and a short execution summary.

Do not narrate every internal stage unless requested. Show progress only when materially useful.

## 21. Output contract

Return:

```yaml
orchestrator_result:
  job_id: ""
  final_status: ""
  selected_topic: ""
  article_title: ""
  content_type: ""
  language: ""
  skill_versions: {}
  stage_results: []
  revision_summary: {}
  warnings: []
  blocking_issues: []
  final_artifacts:
    publication_package_docx: null
    workflow_report_docx: null
    execution_log: null
    review_summary: null
  next_human_action: ""
```

## 22. Acceptance criteria

The workflow passes only if:

- all required skills were invoked in the correct order;
- discovery returned 3 to 5 qualified topics or stopped with `NO_SUITABLE_SHORTLIST`;
- the discovery turn ended at `AWAITING_USER_SELECTION` without invoking the writer;
- `TOPIC_SELECTED` is supported by an explicit user choice from the preserved shortlist;
- the primary article, metadata, review and package remain in US English;
- no factual or editorial hard gate was bypassed;
- revisions were routed to the correct owner;
- loop limits were respected;
- the final article is verified, discoverability-optimized, and editorially approved;
- both final DOCX files are generated;
- the Publication Package contains the complete approved article and publication SEO but no internal workflow material;
- the Workflow Report contains the process evidence needed for internal evaluation and is clearly marked non-public;
- both documents reference the same article identity and immutable article hash;
- human approval remains mandatory before publication;
- traceability is complete.

End of skill.
