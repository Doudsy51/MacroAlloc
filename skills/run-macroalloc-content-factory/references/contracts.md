# Run MacroAlloc Content Factory — Contracts

## Contents

- 1. Traceability requirements
- 2. Mandatory artifacts
- 3. Final orchestrator statuses
- 4. Output contract

## 1. Traceability requirements

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

## 2. Mandatory artifacts

`OpportunityShortlist` is produced once, covering all three regions.

For **each region that reached `TOPIC_SELECTED`**, that region's job record must independently contain:

- `SelectedResearchBrief`
- `EvidenceDossier`
- `SourceRegister`
- `ArticleDraft`
- `VerificationReport`
- `DiscoverabilityPackage`
- `EditorialReview`
- `FinalApprovedArticle`
- `PublicationPackageDOCX`
- `WorkflowReportDOCX`
- `ExecutionLog`
- `RevisionHistory`

If any mandatory artifact is absent for a region that reached `TOPIC_SELECTED`, that region's job cannot be marked complete. This does not block the other regions from being marked complete independently.

## 3. Final orchestrator statuses

- `AWAITING_USER_SELECTION`
- `TOPIC_SELECTED`
- `EVIDENCE_DOSSIER_READY_FOR_WRITING`
- `RESEARCH_REVISION_REQUIRED`
- `EDITORIAL_DECISION_REQUIRED`
- `DRAFT_READY_FOR_VERIFICATION`
- `REVISION_IN_PROGRESS`
- `APPROVED_FOR_SEO`
- `DISCOVERABILITY_READY_FOR_REVIEW`
- `PUBLISH`
- `DUAL_ARTIFACTS_READY_FOR_HUMAN_VALIDATION`
- `AWAITING_FINAL_HUMAN_VALIDATION`
- `PUBLICATION_PACKAGE_READY_FOR_EXPORT`
- `HUMAN_EDITORIAL_INTERVENTION_REQUIRED`
- `HUMAN_FINAL_APPROVAL_REQUIRED`
- `COMPLETED_APPROVED`
- `COMPLETED_REJECTED`
- `NO_SUITABLE_SHORTLIST`
- `BLOCKED`
- `FAILED`

## 4. Output contract

Return:

```yaml
orchestrator_result:
  run_id: ""
  language: ""
  regions:
    - region: US | EUROPE | ASIA
      job_id: ""
      final_status: ""
      selected_topic: ""
      selection_evidence: ""
      article_title: ""
      content_type: ""
      skill_versions: {}
      stage_results: []
      revision_summary: {}
      warnings: []
      blocking_issues: []
      final_artifacts:
        evidence_dossier: null
        source_register: null
        publication_package_docx: null
        workflow_report_docx: null
        execution_log: null
        review_summary: null
      next_human_action: ""
```

Each entry in `regions` is fully independent. A region with no confirmed selection is omitted from this array rather than represented with empty/null fields.
