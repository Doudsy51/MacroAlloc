# Run MacroAlloc Content Factory — Workflow

## Contents

- 1. Mission
- 2. Required execution chain
- 5. Stage 0 — Preflight
- 6. Stage 1 — Discover content opportunities
- 7. Stage 2 — Topic-selection gate
- 8. Stage 3 — Research the selected topic
- 8A. Stage 4 — Write the article
- 9. Stage 4 — Financial verification
- 10. Stage 5 — Discoverability optimization
- 11. Stage 6 — Final editorial review
- 12. Stage 7 — Generate the two final Word deliverables
- 13. Stage 8 — Human final-validation gate
- 14. Revision-routing matrix
- 15. Loop limits
- 20. User-facing execution behavior

## 1. Mission

Orchestrate the complete MacroAlloc editorial production process from content-opportunity discovery to the generation of two final DOCX files: a publication-ready article-and-SEO document and a separate internal workflow-analysis report.

This orchestrator does not replace specialist skills. It invokes them in the required order, passes normalized outputs between them, interprets status codes, controls revision loops, records traceability, and stops execution when a mandatory quality or human-validation gate is not satisfied.

The orchestrator must never publish content automatically during the launch phase.

## 2. Required execution chain

1. `discover-content-opportunities`
2. Mandatory human topic selection in a separate turn
3. `research-macro-evidence`
4. `write-macro-insight`
5. `verify-financial-article`
6. `optimize-content-discoverability`
7. `review-article`
8. `generate-article-package` produces both required DOCX files
9. Human final approval

The orchestrator must not skip a stage unless this skill explicitly defines the stage as optional.

## 5. Stage 0 — Preflight

Before execution:

1. Confirm that all seven specialist skills are available to the current execution environment.
2. Record their versions.
3. Confirm that web research is available for current-event content.
4. Set the primary language to `en-US` and record any other requested language as an optional secondary adaptation.
5. Confirm that topic selection is human and cannot be delegated to the workflow.
6. Confirm that the final output must contain both `PublicationPackageDOCX` and `WorkflowReportDOCX`.
7. Confirm that final human approval remains mandatory.
8. Create the job ID and initialize logs.

Resolve discovery inputs from user-provided artifacts or canonical project defaults. When absent, use these safe minimums: current system date/time; `en-US`; US priority market; approved MacroAlloc categories; no forced publication frequency; the next reasonable publication window; official-primary-source-first policy; no known editorial-calendar conflict; the brand and compliance rules bundled with the relevant skills. Treat content memory, recent-content library, analytics, and competitor data as unavailable rather than inventing them. Ask the user only when an unavailable input creates a material duplication, timing, category, brand, or compliance decision.

If any required skill is unavailable, return:

Return `BLOCKED` with issue code `MISSING_SKILL`.

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

## 8. Stage 3 — Research the selected topic

Invoke `research-macro-evidence` after `TOPIC_SELECTED`.

Pass the complete shortlist, selection evidence, selected topic ID, locked topic and angle, selected research plan, planned sources, publication window, approved source policy, content memory, and current date/time.

Expected successful status:

`EVIDENCE_DOSSIER_READY_FOR_WRITING`

Routing:

- `RESEARCH_REVISION_REQUIRED` → rerun targeted research once after resolving retrievable gaps;
- `EDITORIAL_DECISION_REQUIRED` → stop for a human decision when evidence conflicts with the locked angle or supports competing narratives;
- `BLOCKED` → stop and report missing lineage, sources, tools, or evidence.

Preserve the evidence dossier, source register, lineage, uncertainties, prohibited claims, and recheck items.

## 8A. Stage 4 — Write the article

Invoke `write-macro-insight`.

Hard preconditions: selection lineage must remain valid, `current_status` must equal `EVIDENCE_DOSSIER_READY_FOR_WRITING`, `human_topic_approval` must be `true`, and `selected_topic_id` must match the preserved shortlist. If selection is absent, return `AWAITING_USER_SELECTION`; if the evidence dossier is missing or incomplete, return `BLOCKED` and do not call the writer.

Pass the full approved research brief and evidence dossier, including:

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

The only successful editorial decision is:

- `PUBLISH`

Routing:

### `MINOR_REVISIONS`
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

### `REJECT` or `BLOCKED`
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
