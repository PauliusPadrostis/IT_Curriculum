# QA Report Format

## Output location
`tasks/qa-report-{module-name}.md`

Where `{module-name}` is the module folder name (e.g., `01_Safety`, `02_Technological_Foundations`).

## Template

---begin template---
# QA Report: {Module Display Name}
Generated: {YYYY-MM-DD} | Module: {module path} | Lessons audited: {N}

## Summary
- Issues found: {total}
- Critical: {n} | Major: {n} | Minor: {n}
- By dimension: Structure ({n}) | Content ({n}) | Language ({n})
- Lessons skipped (incomplete): {list or "none"}

## Critical Issues
> Content is incorrect, misleading, or has major gaps. Fix before using in classroom.

### [C-01] Lesson {NNN} — {lesson title}: {short description}
- **Dimension:** {Structure & Metadata | Content & Pedagogical Coherence | Lithuanian Language}
- **Location:** {specific file path(s) relative to module folder}
- **Problem:** {Clear description of what's wrong and why it matters for the learner or teacher.}
- **Suggested action:** {Specific: which skill to re-run with what parameters, or what manual edit to make. Name the skill if applicable.}
- **Status:** ☐ Open

## Major Issues
> Weakens quality — misalignment, bad sequencing, scope issues. Should fix before teacher review.

### [M-01] ...
(same fields as Critical)

## Minor Issues
> Cosmetic, terminological, or style issues. Fix when convenient.

### [m-01] ...
(same fields as Critical)

## Cross-Lesson Findings
> Issues that span multiple lessons (Bloom progression, prerequisite gaps, etc.)

### [X-01] {short description}
- **Dimension:** Content & Pedagogical Coherence
- **Lessons involved:** {NNN, NNN, NNN}
- **Problem:** {description}
- **Suggested action:** {description}
- **Status:** ☐ Open
---end template---

## Conventions

- **Issue ID prefixes:** C = Critical, M = Major, m = minor, X = cross-lesson
- **Numbering:** Sequential within each prefix (C-01, C-02, M-01, M-02, etc.)
- **Location paths:** Relative to the module folder (e.g., `001_L - Ergonomics/Theory_Pack.pdf`)
- **Suggested actions:** Must name the specific generation skill (e.g., "Re-run theory-pack-gen") or manual edit (e.g., "Update README Būsena from ✅ to 🚧"). Never vague ("fix this").
- **Cross-lesson findings** get their own section because they reference multiple lessons and don't sort neatly into per-lesson severity tiers.
- If zero issues found in a severity tier, omit that section entirely. Don't print empty sections.
- If zero issues total, print: "No issues found. Module passes QA."

## Severity assignment guide

| Severity | Criteria | Examples |
|----------|----------|----------|
| Critical | Content is wrong, misleading, or has gaps that would confuse students | Missing subtopic, assessment tests untaught material, contradictory instructions |
| Major | Quality is weakened but content isn't wrong | Objectives misaligned between files, Bloom regression, timing doesn't add up, practice easier than assessment |
| Minor | Cosmetic or style | Em dash slip, inconsistent terminology, AI text pattern, quotation mark format |
