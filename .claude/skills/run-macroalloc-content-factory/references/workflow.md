# Run MacroAlloc Content Factory — Workflow

## Contents

- 1. Mission
- 2. Required execution chain
- 3. Stage 0 — Preflight
- 4. Stage 1 — Discover content opportunities
- 5. Stage 2 — Topic-selection gate
- 6. Stage 3 — Research the selected topic
- 7. Stage 4 — Write the article
- 8. Stage 5 — Financial verification
- 9. Stage 6 — Discoverability optimization
- 10. Stage 7 — Final editorial review
- 11. Stage 8 — Generate the two final Word deliverables
- 12. Stage 9 — Human final-validation gate
- 13. Revision-routing matrix
- 14. Loop limits
- 15. User-facing execution behavior

## 1. Mission

Orchestrate the complete MacroAlloc editorial production process from content-opportunity discovery to the generation of two final DOCX files: a publication-ready article-and-SEO document and a separate internal workflow-analysis report.

This orchestrator does not replace specialist skills. It invokes them in the required order, passes normalized outputs between them, interprets status codes, controls revision loops, records traceability, and stops execution when a mandatory quality or human-validation gate is not satisfied.

The orchestrator must never publish content automatically during the launch phase.

## 2. Required execution chain

1. `discover-content-opportunities` — one call, producing three regional shortlists (US, Europe, Asia)
2. Mandatory human topic selection in a separate turn — one selection per region the user wants to proceed with
3. For each region with a confirmed selection, run steps 3 through 9 **concurrently across regions** — a region's pipeline never waits for another region's pipeline to progress or complete:
   1. `research-macro-evidence`
   2. `write-macro-insight`
   3. `verify-financial-article`
   4. `optimize-content-discoverability`
   5. `review-article`
   6. `generate-article-package` produces both required DOCX files for that region
   7. Human final approval for that region
   8. On `APPROVE` only: automatically invoke `adapt-article-french` then `generate-article-package` (French-render mode) for that region — see Section 12.1

The orchestrator must not skip a stage unless this skill explicitly defines the stage as optional. Steps 1-6 (research through packaging) may run in parallel across regions; step 7 (human final approval) must always be presented to the user one region at a time, in the order each region's package becomes ready — never present two regions' final-validation gates in the same turn.

### 2.1 Region isolation (mandatory)

Each region's `ArticleJob` — lineage, evidence dossier, draft, verification report, discoverability package, editorial review, revision-loop counters, and package — is a fully separate object. Regions with a confirmed selection begin their steps 1-6 (research through packaging) concurrently; a region's pipeline never waits on another region's pipeline state or gate. Only the human final-validation gate (step 7) is serialized: present one region's gate at a time, in the order its package becomes ready, and never open a second region's gate before the previous one presented has received a response. Never:

- reuse or carry over a revision-loop counter from one region into another;
- let a `BLOCKED`, `REJECT`, or loop-limit escalation in one region change, pause, or cancel another region's independent progress;
- merge two regions' evidence, sources, or drafts into a single article;
- present one region's internal data (scores, ledgers, workflow IDs) inside another region's Publication Package.

If a region has no confirmed selection (the user did not select a topic for it), skip that region's step 3-9 sequence entirely — this is not a blocking condition for the regions that were selected.

## 3. Stage 0 — Preflight

Before execution:

1. Confirm that all eight specialist skills, including `adapt-article-french`, are available to the current execution environment.
2. Record their versions.
3. Confirm that web research is available for current-event content.
4. Set the primary language to `en-US` and record any other requested language as an optional secondary adaptation.
5. Confirm that topic selection is human and cannot be delegated to the workflow.
6. Confirm that the final output must contain both `PublicationPackageDOCX` and `WorkflowReportDOCX` for each region that reaches `TOPIC_SELECTED`.
7. Confirm that final human approval remains mandatory, granted separately per region.
8. Create the run ID and initialize logs; each region will derive its own job ID from it once selected.

Resolve discovery inputs from user-provided artifacts or canonical project defaults. When absent, use these safe minimums: current system date/time; `en-US`; the three regional focuses US, Europe, and Asia evaluated independently; approved MacroAlloc categories; no forced publication frequency; the next reasonable publication window; official-primary-source-first policy; no known editorial-calendar conflict; the brand and compliance rules bundled with the relevant skills. Treat content memory, recent-content library, analytics, and competitor data as unavailable rather than inventing them. Ask the user only when an unavailable input creates a material duplication, timing, category, brand, or compliance decision.

If any required skill is unavailable, return:

Return `BLOCKED` with issue code `MISSING_SKILL`.

Do not replace a missing skill with improvised instructions.

## 4. Stage 1 — Discover content opportunities

Invoke `discover-content-opportunities` **once**.

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

`AWAITING_USER_SELECTION`, carrying three grouped shortlists — one per region (US, Europe, Asia).

Other statuses:

- `NO_SUITABLE_SHORTLIST` → applies only when every region failed to qualify; stop cleanly, do not force or pad any region's shortlist. A single region lacking a shortlist while the others have one does not trigger this — proceed with the regions that do have a shortlist.
- `BLOCKED` → stop and report the blocking reason.

Preserve the complete shortlist and research brief, per region.

## 5. Stage 2 — Topic-selection gate

Human selection is mandatory and is the only permitted mode.

Present the strongest 3–5 candidates **for each region (US, Europe, Asia)**, grouped under clearly labeled regional headings, with:

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

Return the exact status `AWAITING_USER_SELECTION`, request one number or exact title **per region**, and end the turn immediately. Do not invoke research, writing, verification, SEO, review or packaging in the same turn.

Wait for explicit topic selection. A request to run the complete workflow, choose the best option, proceed automatically, meet a deadline or produce the final article does not satisfy this gate, for any region. Ranking, score and urgency never constitute user selection.

Resume only when the user's next message unambiguously identifies exactly one option per region from that region's active shortlist. The user is not required to select all three regions in the same reply — a region left unaddressed simply remains pending and does not block the regions that were selected. Record `TOPIC_SELECTED` for each region addressed, before that region's Stage 3. If a region's reply is ambiguous, that region alone remains at `AWAITING_USER_SELECTION`. If it identifies an unlisted topic for a region, stop that region and require a new discovery run for it — this does not affect the other regions' confirmed selections.

Record, per region:

- selected topic;
- explicit user selection evidence;
- selected candidate score;
- rejected candidates;
- decision rationale.

Once at least one region has `TOPIC_SELECTED`, proceed to Stage 3 **for that region**, concurrently with any other region that also has a confirmed selection, processing only the regions that have a confirmed selection.

## 6. Stage 3 — Research the selected topic

*(Run once per region that has `TOPIC_SELECTED`; regions with a confirmed selection run this stage concurrently with each other. Whichever region a given invocation is working on is called "the active region" throughout Stages 3-9; concurrent regions each have their own active-region context and never share state.)*

Invoke `research-macro-evidence` after the active region's `TOPIC_SELECTED`.

Pass the complete shortlist, selection evidence, selected topic ID, locked topic and angle, selected research plan, planned sources, publication window, approved source policy, content memory, and current date/time.

Expected successful status:

`EVIDENCE_DOSSIER_READY_FOR_WRITING`

Routing:

- `RESEARCH_REVISION_REQUIRED` → rerun targeted research once after resolving retrievable gaps;
- `EDITORIAL_DECISION_REQUIRED` → stop for a human decision when evidence conflicts with the locked angle or supports competing narratives;
- `BLOCKED` → stop and report missing lineage, sources, tools, or evidence.

Preserve the evidence dossier, source register, lineage, uncertainties, prohibited claims, and recheck items.

## 7. Stage 4 — Write the article

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

## 8. Stage 5 — Financial verification

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
Continue to Stage 6.

### `REVISION_REQUIRED`
Route the exact revision instructions to `write-macro-insight` in revision mode.

Increment `revision_counters.writer` **for the active region only**.

Maximum writer-verifier loops: 2, tracked independently per region.

After the Writer revises, rerun the complete verification stage. Do not patch only selected claims without rerunning the verifier.

If the maximum is exceeded, return:

`HUMAN_EDITORIAL_INTERVENTION_REQUIRED`

### `EDITORIAL_DECISION_REQUIRED`
Pause and request a human decision. Preserve the disputed claims and alternatives.

### `BLOCKED`
Stop. Explain the blocking issue and required evidence.

The orchestrator must not reinterpret verification findings.

## 9. Stage 6 — Discoverability optimization

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

Maximum discoverability-only retries: 1, tracked independently per region.

### `CONSOLIDATION_DECISION_REQUIRED`
Pause for human decision.

### `BLOCKED`
Stop and report the blocking dependency.

The discoverability skill must never silently alter verified claims, numbers, or conclusions.

## 10. Stage 7 — Final editorial review

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

Maximum final-review correction cycles: 2, tracked independently per region.

### `MAJOR_REVISIONS`
Return to writer with the complete editorial revision plan. Then rerun:

Writer → Verifier → Discoverability → Reviewer.

### `EDITORIAL_DECISION_REQUIRED`
Pause for human decision.

### `REJECT` or `BLOCKED`
Stop. Do not generate a final package marked as publishable.

The reviewer is the final editorial quality gate but cannot override a failed factual gate.

## 11. Stage 8 — Generate the two final Word deliverables

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

The two files must share the same article ID, article version and immutable article hash, and their filenames must identify the active region (e.g. a `-US-`, `-Europe-`, or `-Asia-` slug segment) so a region's pair is never confused with another's. Internal material must never appear in the Publication Package.

Expected successful status:

`DUAL_ARTIFACTS_READY_FOR_HUMAN_VALIDATION`

Routing:

### `PACKAGE_REVISION_REQUIRED`
Return packaging issues to `generate-article-package`.

Maximum package retries: 1, tracked independently per region.

### `BLOCKED`
Stop and report missing or inconsistent artifacts. This blocks only the active region; every other region's pipeline continues unaffected, since regions run concurrently rather than in sequence.

The package generator may format and assemble. It may not invent, rewrite, or override approved content.

## 12. Stage 9 — Human final-validation gate

*(This gate runs separately for each region, immediately after that region's Stage 8 completes. It is never combined across regions: each region's two files are presented and resolved on their own, in the order that region's package becomes ready — not necessarily US, then Europe, then Asia, since regions' machine-controlled stages run concurrently and may finish in any order.)*

Present the active region's two final DOCX files and a concise final status report for that region alone. Identify the Publication Package as the document for human review and website publication. Identify the Workflow Report as internal and not for publication.

Required human action, for this region:

- `APPROVE`
- `REQUEST_CHANGES`
- `REJECT`

No CMS or social publication may occur for this region without its own `APPROVE`.

If changes are requested, route them according to issue ownership and rerun all affected downstream gates **for this region only**, then return to this same gate for this region before moving on.

### 12.1 Automatic French adaptation (after `APPROVE` only)

Immediately after this region's gate returns `APPROVE` — and only then, never after `REQUEST_CHANGES` or `REJECT` — automatically invoke `adapt-article-french` on the just-approved English package, then `generate-article-package` in French-render mode on its output. This runs unconditionally for every approved article; it is not optional and requires no separate human request.

- Pass `adapt-article-french` the approved article body, its `article_id`, its `approved_article_hash`, and the region.
- Expected successful chain: `adapt-article-french` returns `FRENCH_ADAPTATION_READY_FOR_PACKAGING`, then `generate-article-package` (French-render mode) returns `FRENCH_ARTIFACT_READY`.
- On `BLOCKED` from either skill, report the block for that region's French artifact alone. It does not reopen the region's `APPROVE` decision, does not block the region's overall completion, and does not delay the next region.
- The resulting French artifact carries `adapt-article-french`'s mandatory disclosure statement that no independent human-in-language review occurred; never add, imply, or fabricate a separate French approval.
- This step runs at most once per region, strictly after that region's own `APPROVE`.

Once this region's gate resolves — `APPROVE` (after the automatic French adaptation above completes or reports `BLOCKED`), `REJECT`, or an explicitly deferred `REQUEST_CHANGES` — that region's job is finished. Because every selected region's steps 1-6 already run concurrently, there is no next region to start at this point; simply present each remaining region's gate as soon as its own package becomes ready, in whatever order that happens to be. A region resolved as `REJECT` or `BLOCKED` does not cancel or delay the remaining regions. When every selected region has passed through this gate, return `COMPLETED` with a summary covering all regions, including each region's French-artifact status.

## 13. Revision-routing matrix

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

## 14. Loop limits

Hard limits **per region** (US, Europe, and Asia each get their own full budget; nothing is shared or summed across regions):

- writer-verifier loops: 2
- discoverability-only retries: 1
- editorial-review correction cycles: 2
- package retries: 1

Never reset counters by creating a hidden new job. Never let a region borrow from another region's remaining budget.

When a region's limit is reached, pause and require human intervention **for that region**; the other regions continue on their own counters, unaffected.

## 15. User-facing execution behavior

When the user starts the pipeline:

1. Run discovery once, across all three regions.
2. Present 3 to 5 qualified topic choices per region (US, Europe, Asia), return `AWAITING_USER_SELECTION`, and end the turn.
3. After the user selects one topic per region they want to proceed with, process the selected regions' machine-controlled stages **concurrently** — do not wait for one region's pipeline to progress or finish before starting another's.
4. Interrupt only for:
   - topic selection (once, covering all three regions);
   - a given region's editorial decision;
   - a given region's revision-limit escalation;
   - a given region's final human approval;
   - a given region's blocking failure.
   Present each interruption to the user one at a time, even when two regions reach one at nearly the same moment; never combine two regions' decisions into a single request.
5. Present each region's final human-validation gate on its own, right after that region's two DOCX files are ready, in whatever order regions finish — do not wait for all three regions to finish before asking for the first region's approval, and never present two regions' gates together.
6. At completion of all selected regions, return a short summary covering each region's outcome.

Do not narrate every internal stage unless requested. Show progress only when materially useful. Since regions run concurrently, a brief status note when one region's package becomes ready (e.g. "US package ready for review — Europe and Asia are still in progress") is materially useful and should be shown.
