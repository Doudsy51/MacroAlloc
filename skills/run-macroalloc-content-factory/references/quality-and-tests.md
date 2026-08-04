# Run MacroAlloc Content Factory — Quality And Tests

## Contents

- 3. Core operating principles
- 22. Acceptance criteria

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
