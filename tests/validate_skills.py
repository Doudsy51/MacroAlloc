from __future__ import annotations

import json
import re
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SKILLS = ROOT / "skills"
VERSIONS = ROOT / "skill-versions.json"
CONTRACTS = ROOT / "workflow-contracts.json"
EVALUATIONS = ROOT / "tests" / "evaluations.json"
REQUIRED_REFS = {"workflow.md", "contracts.md", "domain-rules.md", "quality-and-tests.md"}
REQUIRED_INVARIANTS = {
    "discover-content-opportunities": ["AWAITING_USER_SELECTION", "TOPIC_SELECTED", "3 to 5"],
    "research-macro-evidence": ["TOPIC_SELECTED", "EVIDENCE_DOSSIER_READY_FOR_WRITING", "selection_evidence"],
    "write-macro-insight": ["TOPIC_SELECTED", "DRAFT_READY_FOR_VERIFICATION", "US English"],
    "verify-financial-article": ["APPROVED_FOR_SEO", "independently", "TOPIC_SELECTED"],
    "optimize-content-discoverability": ["APPROVED_FOR_SEO", "preserving verified facts", "locked angle"],
    "review-article": ["PUBLISH", "independent", "locked topic and angle"],
    "generate-article-package": ["Publication Package", "Workflow Report", "DUAL_ARTIFACTS_READY_FOR_HUMAN_VALIDATION"],
    "adapt-article-french": ["APPROVE", "FRENCH_ADAPTATION_READY_FOR_PACKAGING", "disclosure"],
    "run-macroalloc-content-factory": ["AWAITING_USER_SELECTION", "both final DOCX files", "human final-validation"],
}


def parse_frontmatter(text: str) -> tuple[dict[str, str], str]:
    match = re.match(r"\A---\n(.*?)\n---\n", text, re.S)
    if not match:
        raise ValueError("missing or malformed YAML delimiters")
    fields: dict[str, str] = {}
    for line in match.group(1).splitlines():
        key, separator, value = line.partition(":")
        if not separator:
            raise ValueError(f"invalid frontmatter line: {line!r}")
        fields[key.strip()] = value.strip()
    return fields, text[match.end():]


def main() -> int:
    errors: list[str] = []
    versions = json.loads(VERSIONS.read_text(encoding="utf-8"))
    contracts = json.loads(CONTRACTS.read_text(encoding="utf-8"))
    evaluations = json.loads(EVALUATIONS.read_text(encoding="utf-8"))
    if versions.get("bundle_version") != contracts.get("bundle_version"):
        errors.append("bundle versions differ between version manifest and workflow contracts")
    for name, record in versions.get("skills", {}).items():
        if record.get("version") != versions.get("bundle_version"):
            errors.append(f"{name}: skill version differs from bundle version")
    expected = set(versions["skills"])
    actual = {path.name for path in SKILLS.iterdir() if path.is_dir()}
    if actual != expected:
        errors.append(f"skill inventory mismatch: expected={sorted(expected)} actual={sorted(actual)}")

    for name in sorted(actual):
        folder = SKILLS / name
        skill_path = folder / "SKILL.md"
        try:
            text = skill_path.read_text(encoding="utf-8")
            fields, body = parse_frontmatter(text)
        except Exception as exc:
            errors.append(f"{name}: {exc}")
            continue
        if set(fields) != {"name", "description"}:
            errors.append(f"{name}: frontmatter fields must be only name and description")
        if fields.get("name") != name or not re.fullmatch(r"[a-z0-9-]{1,64}", name):
            errors.append(f"{name}: invalid or mismatched name")
        description = fields.get("description", "")
        if not 1 <= len(description) <= 1024:
            errors.append(f"{name}: description length must be 1..1024")
        if len(body.splitlines()) >= 500:
            errors.append(f"{name}: SKILL.md body is not under 500 lines")
        if not (folder / "agents" / "openai.yaml").is_file():
            errors.append(f"{name}: missing agents/openai.yaml")
        refs = {path.name for path in (folder / "references").glob("*.md")}
        if refs != REQUIRED_REFS:
            errors.append(f"{name}: reference set mismatch: {sorted(refs)}")
        combined = "\n".join(path.read_text(encoding="utf-8") for path in [skill_path, *(folder / "references").glob("*.md")])
        for marker in REQUIRED_INVARIANTS[name]:
            if marker.casefold() not in combined.casefold():
                errors.append(f"{name}: missing invariant marker {marker!r}")
        for relative in re.findall(r"\[[^]]+\]\((references/[^)]+)\)", body):
            if not (folder / relative).is_file():
                errors.append(f"{name}: broken reference {relative}")

    stages = contracts.get("stages", [])
    stage_names = [stage.get("skill") for stage in stages]
    # adapt-article-french is a conditional, post-approval secondary skill invoked only
    # after a region's human APPROVE (see run-macroalloc-content-factory
    # references/workflow.md Section 12.1); it is not part of the linear pre-approval
    # stage chain modeled in workflow-contracts.json's "stages" array.
    excluded_from_stage_chain = {"run-macroalloc-content-factory", "adapt-article-french"}
    specialist_names = [name for name in expected if name not in excluded_from_stage_chain]
    if set(stage_names) != set(specialist_names) or len(stage_names) != len(specialist_names):
        errors.append(f"contract stage order mismatch: {stage_names}")
    for index, stage in enumerate(stages[:-1]):
        next_skill = stages[index + 1]["skill"]
        declared = set(stage.get("next_on_success", {}).values())
        if next_skill not in declared:
            errors.append(f"{stage['skill']}: success does not hand off to {next_skill}")
    for stage in stages:
        skill_text = (SKILLS / stage["skill"] / "SKILL.md").read_text(encoding="utf-8")
        for status in stage.get("success", []) + stage.get("other_terminal", []):
            if status not in skill_text:
                errors.append(f"{stage['skill']}: canonical terminal status {status!r} missing from SKILL.md")

    required_types = set(evaluations.get("required_case_types", []))
    cases = evaluations.get("cases", [])
    ids = [case.get("id") for case in cases]
    if len(ids) != len(set(ids)):
        errors.append("evaluation case IDs are not unique")
    for name in sorted(expected):
        skill_cases = [case for case in cases if case.get("skill") == name]
        present_types = {case.get("type") for case in skill_cases}
        if present_types != required_types:
            errors.append(f"{name}: evaluation types mismatch: {sorted(present_types)}")
        for case in skill_cases:
            if not all(case.get(field) for field in ("id", "request", "expect")):
                errors.append(f"{name}: incomplete evaluation case {case.get('id')}")

    active_text = "\n".join(
        path.read_text(encoding="utf-8")
        for path in SKILLS.rglob("*.md")
    )
    forbidden_aliases = ["`EDITORIALLY_APPROVED`", "`EDITORIAL_REVISION_REQUIRED`", "`EDITORIAL_REJECTED`", "`READY_FOR_EDITORIAL_REVIEW`", "optimize-macro-insight-seo", "ORCHESTRATOR_BLOCKED_MISSING_SKILL"]
    for alias in forbidden_aliases:
        if alias in active_text:
            errors.append(f"active runtime references retain forbidden alias {alias}")
    stale_version_patterns = [r"(?m)^\s*(?:skill_)?version:\s*1\.[012]\.", r"verify-financial-article v0\.7\.0"]
    for pattern in stale_version_patterns:
        if re.search(pattern, active_text):
            errors.append(f"active runtime references retain stale version pattern {pattern!r}")

    lineage_consumers = ["research-macro-evidence", "write-macro-insight", "verify-financial-article", "optimize-content-discoverability", "review-article", "generate-article-package"]
    for name in lineage_consumers:
        combined = "\n".join(path.read_text(encoding="utf-8") for path in (SKILLS / name).rglob("*.md"))
        for marker in ("TOPIC_SELECTED", "selection_evidence"):
            if marker.casefold() not in combined.casefold():
                errors.append(f"{name}: lineage marker {marker!r} is not preserved")

    if errors:
        print("\n".join(f"FAIL {error}" for error in errors))
        return 1
    print(f"PASS {len(actual)} skills and {len(cases)} evaluations: structure, contracts, handoffs, metadata, references, line budgets, and critical invariants")
    return 0


if __name__ == "__main__":
    sys.exit(main())
