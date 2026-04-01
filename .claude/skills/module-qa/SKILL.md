---
name: module-qa
description: >
  Audit a completed module in the IT Curriculum repo
  (PauliusPadrostis/IT_Curriculum). Use this skill whenever the teacher asks
  to check, review, audit, or QA a module. Triggers: "check 01_Safety",
  "review module", "audit module", "module QA", "patikrink modulį",
  "peržiūrėk modulį", "/module-qa".
  Does NOT generate or fix content — produces a diagnostic report only.
  Do NOT use for: generating lesson plans (lesson-plan-gen), student tasks
  (student-task-gen), assessments (assessment-task-gen), or Lithuanian QA
  during generation (lt-qa).
---

# Module QA

Audits a completed module in the IT Curriculum repo. Checks structure,
content quality, pedagogical coherence, and Lithuanian language across all
lessons. Produces a diagnostic report at `tasks/qa-report-{module-name}.md`.
Does not modify any content files.

All checks are performed in Lithuanian curriculum context. Respond to the
teacher in whatever language they use.

**Design principle:** Trust files on disk over READMEs. Think like an
experienced curriculum reviewer, not a linter. Flag real problems, not
hypothetical ones.

---

## Step 0 — Read References

**Before running any checks, always read these files:**

1. `references/file_requirements.md` — canonical file lists per lesson type
2. `references/structural_checks.md` — structural/metadata check rules
3. `references/pedagogical_checks.md` — content & pedagogical coherence guide
4. `references/report_format.md` — report template and conventions
5. `references/subagent_prompt.md` — per-lesson subagent prompt template

**External files (mandatory):**
6. `tasks/lessons.md` from the repo root — accumulated correction rules. Follow every rule.
7. `_references/lt-mistakes.yaml` from the repo root — Lithuanian mistake patterns.

---

## Step 1 — Gather Context & Structural Scan (coordinator)

### Input
The teacher provides a module path (e.g., `Grade_9/Semester_1/01_Safety`).

### Actions

1. **Read the module README.md.** Extract:
   - Module name and display title
   - Grade and semester
   - Lesson table (folder names, types, statuses claimed)

2. **List lesson folders on disk** using Glob: `{module_path}/*/README.md`
   - Extract lesson number, type letter, and title from each folder name
   - Pattern: `NNN_T - Title` where T is the type letter

3. **Run all structural checks** from `references/structural_checks.md`:
   - Folder-to-README alignment
   - File existence per lesson type (using `references/file_requirements.md`)
   - Naming conventions
   - README status accuracy (read each lesson's README)
   - Module README rollup accuracy
   - Incomplete lesson detection

4. **Accumulate structural findings** with severity, location, and description.

5. **Determine which lessons are eligible for subagent dispatch:**
   - A lesson is eligible if all its required content files (per file_requirements.md) exist on disk.
   - Ineligible lessons are noted in structural findings and skipped in Step 2.

### Output of Step 1
- List of structural findings
- List of eligible lessons (with their file paths and types)
- Module context (name, grade, lesson count) for passing to subagents

---

## Step 2 — Per-Lesson Deep Audit (parallel subagents)

### Dispatch

For each eligible lesson, dispatch a subagent using the Agent tool:
- **subagent_type:** `general-purpose`
- **description:** `Audit lesson {NNN}`
- **prompt:** Fill the template from `references/subagent_prompt.md` with:
  - `{lesson_number}`, `{total_lessons}`, `{module_name}`
  - `{lesson_folder_path}`, `{lesson_type}`, `{lesson_type_description}`
  - `{module_readme_summary}` — the module-level context (2-3 sentences)
  - `{grade_level}`, `{grade_number}`
  - `{file_list_with_paths}` — every file in the lesson folder, with full paths
  - `{pedagogical_checks_content}` — the full content of `references/pedagogical_checks.md` (inline, so subagent doesn't need to read it)
  - `{lt_mistakes_yaml_content}` — the full content of `_references/lt-mistakes.yaml` (inline, so subagent doesn't need to read it)
  - `{lessons_md_content}` — the full content of `tasks/lessons.md` (inline)

**Dispatch all subagents in parallel** — use a single message with multiple Agent tool calls. Do NOT dispatch sequentially.

### Expected return from each subagent
1. Content summary (topics_covered, bloom_level, concepts_introduced, prerequisites_assumed)
2. Findings list (severity, dimension, location, description, suggested_action)

---

## Step 3 — Cross-Lesson Synthesis (coordinator)

### Input
- All subagent content summaries
- All subagent findings lists
- Structural findings from Step 1

### Cross-lesson checks

Using the content summaries, run these checks (detailed guidance in `references/pedagogical_checks.md`, section "Cross-Lesson Checks"):

1. **Bloom progression:** Do L lesson Bloom levels generally increase across the module? Flag regressions.
2. **Sequencing logic:** Are foundational concepts introduced before dependent ones? Does difficulty increase?
3. **Prerequisite coverage:** For each lesson's `prerequisites_assumed`, verify those concepts appear in `concepts_introduced` of earlier lessons. Flag gaps.
4. **Difficulty scaffolding:** If multiple lessons teach the same skill at different difficulty levels, levels must progress upward. Flag any regression.
5. **Assessment fairness:** For each A lesson, verify its scope covers only L/I lessons in its range. Flag anything tested but not taught.
6. **Practice-harder-than-assessment:** Compare P and A content summaries. Flag if practice Bloom level is not higher than assessment.
7. **Terminology consistency:** Collect all Lithuanian terms from subagent findings. Flag cases where the same concept uses different terms in different lessons.

### Output
- List of cross-lesson findings (use X- prefix for issue IDs)

---

## Step 4 — Compile Report (coordinator)

### Actions

1. **Merge all findings:**
   - Structural findings (from Step 1)
   - Per-lesson findings (from Step 2 subagents)
   - Cross-lesson findings (from Step 3)

2. **Assign final severity** using the guide in `references/report_format.md`:
   - Critical: content wrong, misleading, or has gaps that would confuse students
   - Major: quality weakened but content not wrong
   - Minor: cosmetic, terminological, style

3. **Format the report** using the template in `references/report_format.md`:
   - Organize per-lesson issues by severity, then by lesson number within each tier
   - Cross-lesson issues go in their own section
   - Omit empty severity sections
   - If zero issues: "No issues found. Module passes QA."

4. **Write the report** to `tasks/qa-report-{module-name}.md`

5. **Print summary to console:**
   ```
   QA Report for {Module Name}: {total} issues found
   (Critical: {n} | Major: {n} | Minor: {n} | Cross-lesson: {n})
   Full report: tasks/qa-report-{module-name}.md
   ```

---

## Source Priority

When sources conflict, use this hierarchy:

| Priority | Source |
|----------|--------|
| 1 | Actual files on disk (what exists and what's in them) |
| 2 | Pedagogical logic (does it make sense for learners?) |
| 3 | `tasks/lessons.md` (teacher correction rules) |
| 4 | `tasks/decisions.md` (locked project decisions) |
| 5 | Module/lesson READMEs (treated as claims to verify) |

---

## Reference Files

| Path | Purpose |
|------|---------|
| `references/file_requirements.md` | Canonical file lists per lesson type |
| `references/structural_checks.md` | Structural/metadata check rules |
| `references/pedagogical_checks.md` | Content & pedagogical coherence guide |
| `references/report_format.md` | Report template and conventions |
| `references/subagent_prompt.md` | Per-lesson subagent prompt template |
| `tasks/lessons.md` (repo root) | Accumulated correction rules |
| `_references/lt-mistakes.yaml` (repo root) | Lithuanian mistake patterns |
