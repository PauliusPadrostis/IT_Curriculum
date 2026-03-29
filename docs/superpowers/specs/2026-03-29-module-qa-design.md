# module-qa — Skill Design Spec

**Date:** 2026-03-29
**Skill:** `module-qa`
**Location:** `.claude/skills/module-qa/SKILL.md`
**Output:** `tasks/qa-report-{module-name}.md`

---

## 1. Scope & Trigger

**YAML frontmatter (for SKILL.md):**
```yaml
name: module-qa
description: >
  Audit a completed module in the IT Curriculum repo
  (PauliusPadrostis/IT_Curriculum). Use this skill whenever the teacher asks
  to check, review, audit, or QA a module — e.g., "check 01_Safety",
  "review module", "audit module", "module QA".
```

**Trigger phrases:** check module, review module, audit module, module QA, `/module-qa`

**Input:** Module path, e.g., `Grade_9/Semester_1/01_Safety`

**Produces:** `tasks/qa-report-{module-name}.md` — a structured report of all issues found, organized by severity, with issue IDs, file locations, suggested actions, and status checkboxes.

**Does NOT produce:** Fixed files. This skill diagnoses; it does not repair. The teacher decides what to fix and how.

---

## 2. Sources of Truth (priority order)

1. **Actual files on disk** — what exists and what's in them
2. **Pedagogical logic** — does the content make sense for the topic, grade, and sequence
3. **`tasks/lessons.md`** — accumulated correction rules that override defaults
4. **Module/lesson READMEs** — treated as claims to verify, not facts

READMEs are not trusted. The skill verifies README claims against reality and flags discrepancies.

---

## 3. Check Dimensions

### Dimension 1 — Structure & Metadata (mechanical)

- Every lesson folder has all required files for its type. The canonical file list per type is:
  - **L:** Teacher_Plan.docx, Theory_Pack.pdf, Student_Task.pdf, Visual_Aid.pdf
  - **I:** Teacher_Plan.docx, Student_Task.pdf, Visual_Aid.pdf
  - **P:** Teacher_Plan.docx, Practice_Task.pdf, Answer_Key.pdf
  - **A:** Teacher_Plan.docx, Assessment_Task.xlsx, Rubric.pdf, Answer_Key.docx
  - **Other types (D, T, MOCK, G):** No canonical file list defined yet. The skill should flag these lesson types as "no file checklist available" and skip structural file checks for them.

  > **Note:** The I-lesson and P-lesson file lists above reflect decisions from 2026-03-28 (Visual_Aid added for I lessons, Answer_Key Study Key for P lessons). As of 2026-03-29, the `lesson-readme-gen` skill references and some existing lesson READMEs have not been updated to match these decisions. The module-qa skill should use the lists above (from decisions.md) as the source of truth, and flag READMEs that are missing expected file entries.

- File naming follows repo conventions
- No orphaned files (files that exist but aren't expected for the lesson type)
- Lesson README status claims match actual file existence on disk
- Module README lesson table matches the actual folders that exist
- Module README rollup status is consistent with individual lesson states

### Dimension 2 — Content & Pedagogical Coherence (judgment)

This is the heavyweight dimension. The skill reads and thinks critically, not just cross-references.

**Per-lesson checks:**
- **Topic completeness:** Does the lesson actually cover its topic fully, or are obvious subtopics missing? (e.g., a C++ loops lesson that only covers `for` but omits `while` and range-based `for`)
- **Cross-document alignment:** Do objectives in README, Teacher_Plan, and Student_Task align semantically (not just word-for-word)? Does Theory_Pack cover what Student_Task asks students to do?
- **Scope realism:** Can the target student actually do what's being asked, in the time given? Is any single lesson trying to cover too much for 37 minutes?
- **Internal logic:** Do examples contradict each other? Do analogies make sense? Are instructions clear and unambiguous?

**Cross-lesson checks (require full module picture):**
- **Sequencing logic:** Are concepts introduced in an order that makes sense? Foundational before advanced. Concrete before abstract.
- **Bloom progression:** Does cognitive demand build across the module, or does it spike and drop randomly?
- **Prerequisite coverage:** Does lesson N assume something that lessons 1..N-1 didn't actually cover?
- **Assessment fairness:** The A lesson tests only what L/I lessons taught. Nothing tested that wasn't taught.
- **Practice-harder-than-assessment rule:** P lesson practice tasks are cognitively harder than the corresponding A assessment.
- **Difficulty scaffolding:** If multiple lessons teach the same skill at different difficulty levels, difficulty should increase, not decrease.
- **Common sense:** Would a real teacher look at this module and say "yes, this works"? Flag anything that feels off, even if it doesn't fit a named check.

### Dimension 3 — Lithuanian Language (rule-based)

- Re-run lt-qa checks across all generated text in the module
- Em dash violations (banned everywhere)
- Quotation mark format: „..." only
- AI text patterns (formulaic openings, triad structures, transition stuffing, hedging)
- Check against `lt-qa/lt-mistakes.yaml`
- **Terminology consistency within the module:** The same concept must use the same Lithuanian term across all documents in all lessons. Flag inconsistencies.

---

## 4. Architecture

**Coordinator + parallel per-lesson subagents + synthesis pass.**

This is not a single-pass sequential read. Modules are 6-10 lessons with 3-5 files each (20-50 documents). A single context window would degrade on later lessons. Instead:

### Step 1 — Load context & structural scan (coordinator)

- Read `tasks/lessons.md` (correction rules to enforce)
- Read `lt-qa/lt-mistakes.yaml` (language rules)
- Read the module README
- List all lesson folders on disk
- Run Dimension 1 (Structure & Metadata) checks
- Accumulate structural findings

### Step 2 — Per-lesson deep audit (parallel subagents)

- Coordinator dispatches **one subagent per lesson**
- Each subagent receives:
  - All files from its lesson folder — binary formats (.docx, .pdf, .xlsx) are read using the appropriate tools (pdf skill for PDFs, docx skill for Word documents, xlsx skill for spreadsheets). The subagent extracts and works with the text content.
  - The module README (for context on where this lesson sits in the sequence)
  - The lesson's position in the module (e.g., "lesson 3 of 7")
  - The `tasks/lessons.md` rules
  - The `lt-qa/lt-mistakes.yaml` rules
- Each subagent runs:
  - **Dimension 2 per-lesson checks:** topic completeness, cross-document alignment, scope realism, internal logic
  - **Dimension 3 checks:** lt-qa rules, terminology within the lesson
- Each subagent returns:
  1. A **content summary** (structured, for cross-lesson synthesis):
     - `topics_covered`: what the lesson actually teaches
     - `bloom_level`: observed cognitive demand level
     - `concepts_introduced`: new concepts students encounter
     - `prerequisites_assumed`: what the lesson assumes students already know
  2. A **findings list** with severity, location, and description per finding

**Handling incomplete lessons:** If a lesson within the module is still at WIP or Šablonas status (files missing despite the module being nominally complete), the coordinator flags it as a structural issue in Step 1 and skips it in Step 2. Subagents are only dispatched for lessons that have their content files.

### Step 3 — Cross-lesson synthesis (coordinator)

- Coordinator collects all per-lesson findings and content summaries
- Uses the content summaries to run Dimension 2 cross-lesson checks:
  - Bloom progression
  - Sequencing logic
  - Prerequisite coverage
  - Assessment fairness
  - Practice-harder-than-assessment
  - Difficulty scaffolding
  - Terminology consistency across the whole module
- Adds cross-lesson findings

### Step 4 — Compile report (coordinator)

- Merge structural findings + per-lesson findings + cross-lesson findings
- Assign severity:
  - **Critical:** Content is incorrect, misleading, or has major gaps
  - **Major:** Weakens quality — misalignment, bad sequencing, scope issues
  - **Minor:** Cosmetic, terminological, style issues
- Organize by severity tier, then by lesson within each tier
- Write to `tasks/qa-report-{module-name}.md`
- Print summary to console

---

## 5. Report Format

```markdown
# QA Report: {Module Name}
Generated: {date} | Lessons audited: {N}

## Summary
- Issues found: {total}
- Critical: {n} | Major: {n} | Minor: {n}
- By dimension: Structure ({n}) | Content ({n}) | Language ({n})

## Critical Issues
> Issues that make the module incorrect or misleading

### [C-01] Lesson {NNN} — {title}: {short description}
- **Dimension:** {Structure & Metadata | Content & Pedagogical Coherence | Lithuanian Language}
- **Location:** {specific file(s)}
- **Problem:** {clear description of what's wrong and why it matters}
- **Suggested action:** {which skill to re-run or what edit to make}
- **Status:** ☐ Open

## Major Issues
> Issues that weaken quality but don't make content wrong

### [M-01] ...

## Minor Issues
> Cosmetic, terminological, or style issues

### [m-01] ...
```

**Report conventions:**
- Issue IDs: `C-01`, `M-01`, `m-01` (Critical, Major, minor)
- Each issue names specific files, not just lessons
- Suggested actions name the specific skill or manual edit needed
- Status checkboxes for tracking resolution across sessions
- Cross-lesson issues (from Step 3) reference multiple lessons in their location

---

## 6. What the Skill Does NOT Do

- **Does not auto-fix anything.** Diagnosis only.
- **Does not flip README status fields.** Those are teacher-controlled.
- **Does not modify any files** other than writing the report.
- **Does not run on modules below "Failai sukurti."** The teacher confirmed: the skill won't be invoked until all lessons have their files. No precondition gate needed — this is a usage convention, not an enforcement rule.
- **Does not replace lt-qa.** lt-qa runs during generation. This re-checks after the fact, across the module as a whole.

---

## 7. Future Considerations (not in scope)

- **Repo health skill:** A separate skill with a "satellite view" across the entire repository. Checks cross-module consistency, naming conventions repo-wide, orphaned files, format compliance. Designed separately.
- **Auto-fix mode:** If the report format proves stable and the suggested actions are reliable, a future iteration could offer to execute fixes. Not now.
- **Parallel agent escalation:** The design already uses parallel subagents. If even per-lesson audits prove too large (unlikely given current lesson sizes), subagents could be further decomposed per-file.
