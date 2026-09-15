# Run MacroAlloc Content Factory — Quality And Tests

## Contents

- 1. Core operating principles
- 2. Acceptance criteria

## 1. Core operating principles

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
- Treat US English (`en-US`) as the non-negotiable language of the primary article, SEO metadata, review and final package, in every region.
- Treat the French adaptation as an automatic secondary artifact triggered only by that region's own `APPROVE`, never a substitute for or a delay of the primary US-English deliverable, and never accompanied by a separate French human-approval gate.
- Process the three regions' machine-controlled stages (research through packaging) concurrently, each with a fully isolated `ArticleJob`; never let one region's state, counters, or outcome affect another's. Serialize only the human final-validation gate, presenting one region at a time in the order its package becomes ready.

## 2. Acceptance criteria

The workflow passes only if, **for each region that reached `TOPIC_SELECTED`**:

- all required skills were invoked in the correct order;
- discovery returned 3 to 5 qualified topics per region or stopped that region with `NO_SUITABLE_SHORTLIST` (without forcing the same outcome on the other regions);
- the discovery turn ended at `AWAITING_USER_SELECTION` without invoking the writer for any region;
- `TOPIC_SELECTED` is supported by an explicit user choice from that region's preserved shortlist;
- the primary article, metadata, review and package remain in US English;
- no factual or editorial hard gate was bypassed;
- revisions were routed to the correct owner and stayed confined to that region;
- loop limits were respected, counted independently for that region;
- the final article is verified, discoverability-optimized, and editorially approved;
- both final DOCX files are generated, with filenames that identify the region;
- the Publication Package contains the complete approved article and publication SEO but no internal workflow material, and no content from another region;
- the Workflow Report contains the process evidence needed for internal evaluation and is clearly marked non-public;
- both documents reference the same article identity and immutable article hash;
- human approval remains mandatory before publication, granted separately for this region;
- if this region reached `APPROVE`, `adapt-article-french` and `generate-article-package` (French-render mode) ran automatically and the resulting French artifact carries the mandatory disclosure statement verbatim, or the block was recorded without reopening the `APPROVE` decision;
- traceability is complete.

The overall run passes only if every region that reached `TOPIC_SELECTED` independently meets the criteria above; one region failing does not invalidate another region's passing result.

End of skill.
