# Assessment Task Generator Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create the `assessment-task-gen` skill that generates assessment materials (Assessment_Task.pdf, Testmoz .xlsx, Rubric.pdf) for A lessons in the IT Curriculum.

**Architecture:** A new skill at `~/.claude/skills/assessment-task-gen/` following the established skill pattern (SKILL.md + references/). The skill reads all L/I lesson content in scope, proposes an assessment format with pedagogical reasoning, waits for teacher approval, then generates assessment documents. Reference docs condense research into token-efficient files.

**Tech Stack:** Markdown (SKILL.md, reference docs), openpyxl (Testmoz .xlsx generation), docx library (Assessment_Task/Rubric .docx generation), docx2pdf (PDF conversion).

**Spec:** `docs/superpowers/specs/2026-03-28-assessment-task-gen-design.md`

**Parallelization:** Tasks 1-5 and Task 7 are fully independent and can run in parallel. Task 6 depends on reading existing format specs but not on Tasks 1-5. Task 8 depends on all reference docs (Tasks 1-7) being complete. Tasks 9-10 are independent of Tasks 1-8. Task 11 depends on completion of Tasks 8-10. Task 12 can run anytime after Task 8. Task 13 requires all previous tasks.

**Step numbering:** The SKILL.md adds a "Step 1 (Gather Context)" not present as a numbered step in the spec. This shifts all subsequent step numbers by +1 compared to the spec. The spec's "Inputs" section becomes an operational step in the skill.

---

## File Structure

```
~/.claude/skills/assessment-task-gen/
  SKILL.md                                    # Main skill file (~400 lines)
  references/
    assessment_design_guide.md                # Condensed pedagogy knowledge base
    grading_policy.md                         # School grading rules (Zemynos gimnazija)
    question_design.md                        # Item writing rules + variant generation
    cs_assessment_progression.md              # Grade-appropriate question type defaults
    assessment_format.md                      # Output .docx structure for Assessment_Task + Rubric
    testmoz_format.md                         # Testmoz import .xlsx specification
    exemplars/
      theory_safety_example.md                # Theory assessment exemplar (MCQ + scenario)
      practical_graphics_example.md           # Tool-based practical exemplar
      programming_algorithms_example.md       # Code completion/writing exemplar
```

Files modified in existing repo:
```
CLAUDE.md                                     # No changes needed (rules already cover A lessons)
tasks/decisions.md                            # Append: assessment-task-gen skill decisions
```

Files to update after skill is complete (separate task):
```
Grade_9/.../007_A .../README.md               # Update file table: .docx -> .pdf
(other A lesson READMEs as needed)            # Migration handled in final task
```

---

## Task 1: Create `assessment_design_guide.md`

**Files:**
- Create: `~/.claude/skills/assessment-task-gen/references/assessment_design_guide.md`

This is the pedagogical knowledge base. Condensed from the research gathered during brainstorming (backward design, Bloom's mapping, constructive alignment, validity, formative vs summative). Must be under 200 lines.

- [ ] **Step 1: Write the reference doc**

Source material (already gathered in brainstorming session):
- Wiggins & McTighe backward design: objectives -> evidence -> instruction
- Bloom's taxonomy -> question type mapping (Remember=MCQ, Understand=short answer, Apply=practical, Analyze=scenario/debugging, Evaluate=code review, Create=write program)
- Biggs' constructive alignment: objectives <-> activities <-> assessment must align
- Validity checklist (5 items from spec Step 4)
- Formative (P) vs summative (A) design differences
- Competency levels: slenkstinis (I, grade 4), patenkinamas (II, 5-6), pagrindinis (III, 7-8), aukstesnysis (IV, 9-10) with descriptors from national curriculum

Structure the doc as quick-reference tables, not prose. Each section: principle name, 2-3 sentence explanation, actionable rule.

- [ ] **Step 2: Verify line count is under 200**

Run: `wc -l ~/.claude/skills/assessment-task-gen/references/assessment_design_guide.md`
Expected: under 200 lines.

- [ ] **Step 3: Commit**

```bash
git add ~/.claude/skills/assessment-task-gen/references/assessment_design_guide.md
git commit -m "docs(assessment-task-gen): add assessment design guide reference"
```

---

## Task 2: Create `grading_policy.md`

**Files:**
- Create: `~/.claude/skills/assessment-task-gen/references/grading_policy.md`

School-specific grading rules extracted from `VERTINIMO_TVARKA_2023n(1).pdf` (Zemynos gimnazija). This is a factual reference, not pedagogy.

- [ ] **Step 1: Write the reference doc**

Must include (extracted from vertinimo tvarka during brainstorming):
- Percentage-to-grade scale table: 95-100%=10, 85-94%=9, ..., 0-9%=1
- Competency level to grade mapping: slenkstinis=4, patenkinamas=5-6, pagrindinis=7-8, aukstesnysis=9-10
- Difficulty distribution rule: 20% easy, 50% medium, 30% hard (section 29.3)
- Assessment types with durations: atsiskaitomasis darbas >=30 min, apklausa rastu 15-20 min, savarankiskas darbas 10-20 min
- Student notification requirement: >=1 week before, share structure/content/criteria (section 29.2)
- Item ordering rule: easier to harder (section 29.3)
- Points required next to every question (section 29.6)
- Academic integrity: teacher may void work if copying suspected (section 29.9.5)
- Results timeline: graded and returned within 2 weeks (section 29.7)
- Max 1 assessment per day for grades I-II (section 30)

Format as numbered rules with section references to the original document.

- [ ] **Step 2: Commit**

```bash
git add ~/.claude/skills/assessment-task-gen/references/grading_policy.md
git commit -m "docs(assessment-task-gen): add school grading policy reference"
```

---

## Task 3: Create `question_design.md`

**Files:**
- Create: `~/.claude/skills/assessment-task-gen/references/question_design.md`

Item writing quality standards. Covers MCQ rules, short answer, rubric design, code task hierarchy, and Testmoz variant generation rules.

- [ ] **Step 1: Write the reference doc**

Sections:

**MCQ Rules** (from research):
- 3-4 options, distractors from real misconceptions, write distractors first
- No "all/none of above," same length/structure, vary correct answer position
- Avoid negative stems unless objective requires it

**Short Answer Rules:**
- Specify expected scope ("1-2 sakiniais..."), one concept per question
- Cannot be answered by verbatim recall from Theory_Pack

**Scenario Analysis Rules:**
- Realistic situation, requires application not recall
- "nes..." justification format, clear scope constraint on answer length

**Code Task Hierarchy** (Lister et al.):
- reading -> tracing -> completion -> writing
- Grade 10 ceiling: completion. Grade 11: small programs. Grade 12: modular programs.
- Students who cannot trace at >50% are not ready to write

**Rubric Design:**
- 3-6 criteria, specific observable descriptors, 3-4 performance levels
- Share rubric with students before assessment
- "Gerai supranta" is not a valid descriptor. "Teisingai identifikuoja abu kintamuosius" is.

**Variant Generation** (for Testmoz pools):
- Change: names, numbers, scenario details, example data, option ordering
- Keep identical: structure, cognitive demand, distractor logic, point value, competency level
- Never: change concept tested, make one variant easier, reuse same distractor across variants
- Each pool: 3-4 variants separated by blank rows in .xlsx

- [ ] **Step 2: Commit**

```bash
git add ~/.claude/skills/assessment-task-gen/references/question_design.md
git commit -m "docs(assessment-task-gen): add question design reference"
```

---

## Task 4: Create `cs_assessment_progression.md`

**Files:**
- Create: `~/.claude/skills/assessment-task-gen/references/cs_assessment_progression.md`

Grade-appropriate assessment defaults. The README always overrides this doc when it specifies format/types.

- [ ] **Step 1: Write the reference doc**

Structure as a table per grade:

| Grade | Domains | Primary Question Types | Code Task Ceiling | Notes |
|-------|---------|----------------------|-------------------|-------|

Grade 9: Digital literacy, safety, graphics. MCQ, short answer, practical tool tasks. No programming. Testing tool usage and concepts.

Grade 10: Intro C++, data/Excel. Code tracing, output prediction, code completion, short answer, structured spreadsheet tasks. Code writing only as small extensions.

Grade 11: Intermediate C++, data workflows, theory modules. Code writing (small independent programs), debugging, file-driven tasks, scenario analysis, data workflows. VBE-adjacent formats.

Grade 12: Advanced C++, data reporting. Modular programs, multi-part tasks, edge case handling, robustness. Full VBE format alignment.

Add a second section: "Assessment format by domain" mapping theory/programming/tool/data domains to recommended formats (Testmoz, practical task, mixed).

- [ ] **Step 2: Commit**

```bash
git add ~/.claude/skills/assessment-task-gen/references/cs_assessment_progression.md
git commit -m "docs(assessment-task-gen): add CS assessment progression reference"
```

---

## Task 5: Create `testmoz_format.md`

**Files:**
- Create: `~/.claude/skills/assessment-task-gen/references/testmoz_format.md`

Testmoz import .xlsx specification. Based on the template read during brainstorming.

- [ ] **Step 1: Write the reference doc**

Must include:

**Column layout:**
- Column A: question text. Prefix `*` on rows with correct answers.
- Column B: points (on question row) or answer text (on answer rows). Use `~N` for partial credit MCQ.
- Column C: options. `shuffle` (randomize answers), `long` (essay), `short` (ungraded short answer), `norightshuffle` (don't shuffle right column in matching).
- Column D: explanation text (shown after answering).
- Column E: (not imported, used for notes in template only).

**Question types with examples:**

1. MCQ (single answer): Question in A1 with points in B1. Answers in B2+. `*` prefix on correct answer row.
2. MCQ (multiple correct): Same but `~N` in B1 for partial credit. `*` on all correct rows.
3. Fill-in-blank: Points in B1. All accepted answers on separate rows with `*` prefix.
4. Matching: `~N` in B1, `shuffle, norightshuffle` in C1. Left items in B, right items in C.
5. Essay: Points in B1, `long` in C1.
6. Text block (not a question): Text in A only. No points.

**Pool structure:**
- Questions in same pool are adjacent rows.
- Pools separated by blank rows.
- Each pool = 3-4 variants of the same question.
- Testmoz randomly selects one variant per pool per student.

**Point allocation:**
- Points must convert to 1-10 scale via the percentage table in grading_policy.md.
- Recommended: use point totals that make the percentage boundaries land on clean numbers (e.g., 20 points total: 19-20=10, 17-18=9, 15-16=8, 13-14=7, 11-12=6, 9-10=5, 6-8=4, 4-5=3, 2-3=2, 0-1=1).

- [ ] **Step 2: Commit**

```bash
git add ~/.claude/skills/assessment-task-gen/references/testmoz_format.md
git commit -m "docs(assessment-task-gen): add Testmoz import format reference"
```

---

## Task 6: Create `assessment_format.md`

**Files:**
- Create: `~/.claude/skills/assessment-task-gen/references/assessment_format.md`

Output document structure for Assessment_Task.pdf and Rubric.pdf. Follows the visual identity of other student-facing documents (navy headings, same font family).

- [ ] **Step 1: Read existing format specs for consistency**

Read these files to extract the visual identity:
- `~/.claude/skills/student-task-gen/references/task_format.md`
- `~/.claude/skills/theory-pack-gen/references/content_format.md`

Note: font family, heading colors (navy), spacing values (TWIPs), info box styles, page margins.

- [ ] **Step 2: Write the reference doc**

**Assessment_Task.pdf structure:**

Header section:
- Lesson code + title (H1, navy)
- Metadata line: grade, duration, conditions, allowed tools (grey, smaller font)
- Horizontal rule

For Testmoz-based assessments, Assessment_Task is an .xlsx file, not PDF. This format spec applies only to practical/mixed assessments that produce a PDF.

Body sections (in order):
1. "Uzduoties aprasymas" (H2): what the student must do (2-4 sentences)
2. "Reikalavimai" (H2): numbered list of concrete requirements with point values
3. "Pradiniai duomenys" (H2, if applicable): description of input data files provided
4. "Pateikimo tvarka" (H2): what to submit (files, formats, naming)
5. "Vertinimo kriterijai" (H2): summary of how work will be graded (references Rubric)

For programming tasks, add:
- "Ivesties formatas" and "Isvesties formatas" sections with exact format specs
- "Pavyzdziai" section with sample input/output pairs

**Rubric.pdf structure:**

Header: same as Assessment_Task (matching pair).

Body:
1. Criteria table: Criterion | Aukstesnysis (9-10) | Pagrindinis (7-8) | Patenkinamas (5-6) | Slenkstinis (4) | Max points
2. For MCQ/short answer assessments: point-per-question table instead of criteria rubric
3. Percentage-to-grade conversion table (from grading_policy.md)
4. Total points line

**Formatting specs:**
- Match existing student-facing document visual identity
- Reference exact TWIPs from task_format.md
- Navy headings, same font/size hierarchy
- Tables: bordered, header row shaded

- [ ] **Step 3: Commit**

```bash
git add ~/.claude/skills/assessment-task-gen/references/assessment_format.md
git commit -m "docs(assessment-task-gen): add assessment output format reference"
```

---

## Task 7: Create exemplars

**Files:**
- Create: `~/.claude/skills/assessment-task-gen/references/exemplars/theory_safety_example.md`
- Create: `~/.claude/skills/assessment-task-gen/references/exemplars/practical_graphics_example.md`
- Create: `~/.claude/skills/assessment-task-gen/references/exemplars/programming_algorithms_example.md`

Synthesized from LInMA diagnostic tests downloaded during brainstorming. These calibrate tone, structure, and difficulty for the skill.

- [ ] **Step 1: Write theory_safety_example.md**

Based on LInMA test T12 (saugus darbas). Structure:
- Header: topic, grade, Bloom's level, duration, competency level distribution
- Test section (10 points): 5 MCQ (slenkstinis/patenkinamas) + 3 short answer (pagrindinis) + 2 scenario analysis (aukstesnysis)
- Practical section (10 points): ergonomics workspace evaluation with per-criterion rubric (4 performance levels)
- Show point allocation and grading notes
- Show how questions map to competency levels

- [ ] **Step 2: Write practical_graphics_example.md**

Based on LInMA test T2 (vektorine grafika). Structure:
- Theory test (5 points): definition, comparison, format identification, tool naming, pros/cons
- Practical task (5 points): create illustration in Inkscape, apply color palette, resize, export SVG and PNG
- Partial credit rules for practical work
- Show the theory/practical split pattern

- [ ] **Step 3: Write programming_algorithms_example.md**

Based on LInMA test T5 (algoritmai). Structure:
- 5 code completion tasks in C++ (sorting, deletion from array, array append, search, aggregate)
- Each task: given scaffold with marked completion zone + rubric (correct logic + compiles)
- "Given code must not be modified" constraint
- Show per-task point allocation with criteria table

- [ ] **Step 4: Commit**

```bash
git add ~/.claude/skills/assessment-task-gen/references/exemplars/
git commit -m "docs(assessment-task-gen): add 3 assessment exemplars"
```

---

## Task 8: Write SKILL.md

**Files:**
- Create: `~/.claude/skills/assessment-task-gen/SKILL.md`

The main skill file. Follows the canonical structure from existing skills. All logic from the design spec (Steps 0-6) goes here.

- [ ] **Step 1: Write the SKILL.md frontmatter and intro**

```markdown
---
name: assessment-task-gen
description: >
  Generate assessment materials for A lessons in the IT Curriculum repo.
  Use this skill whenever the teacher asks to create, generate, write,
  or build an assessment, test, quiz, kontrolinis, atsiskaitomasis darbas,
  or vertinimo uzduotis. Also triggers on: "sugeneruok vertinima",
  "sukurk testa", "paruosk atsiskaitomaji darba".
---
```

- [ ] **Step 2: Write Step 0 (Read References)**

List all 9 reference items from the spec. Include exact paths (relative to skill directory for items 1-7, absolute for lt-qa and tasks/lessons.md). Note path conventions.

- [ ] **Step 3: Write Step 1 (Gather Context)**

Input priority table (9 levels from spec). Path parsing rules. Scope rules for multi-A modules. Batch mode rules.

- [ ] **Step 4: Write Abort/Degrade Conditions**

5 conditions from the spec: no README, no Teacher_Plans (stop), partial plans (warn), no module README (degrade), no VBE refs (degrade).

- [ ] **Step 5: Write Step 2 (Content Inventory)**

Coverage matrix specification. Content type classification (theory/programming/tool/data). Common mistakes extraction logic.

- [ ] **Step 6: Write Step 3 (Assessment Format Proposal)**

Decision factors table (domain, Bloom's, grade, module position, duration, README constraints). Competency level design table with percentage mapping. Proposal output template. **Must state: skill stops here and waits for teacher confirmation.**

- [ ] **Step 7: Write Step 4 (Item Generation)**

General item rules. Question type specifications (MCQ, short answer, scenario, code tracing, code completion, code writing, practical tool tasks). Testmoz question bank rules. Rubric generation rules.

Critical rules to include:
- C++ only, no Python (locked decision)
- Em dash banned in all generated text
- Code completion: "given code must not be modified"
- Variant generation: change surface, keep structure/difficulty

- [ ] **Step 8: Write Step 5 (Validity Self-Check)**

15-item checklist from the spec (coverage, no extras, Bloom's alignment, competency distribution, difficulty ordering, point total, distractor quality, rubric specificity, time realism, format match, no P leakage, tool validity, language, em dash ban, grade appropriateness).

- [ ] **Step 9: Write Step 6 (Output Files)**

Assessment pattern -> output mapping table (Testmoz/practical/mixed). File format rules. Migration note about .docx -> .pdf in existing READMEs. Output location rules.

- [ ] **Step 10: Write Step 7 (Lithuanian QA Pass)**

Phase 2 (POST-GEN) from lt-qa. Reference the exact path.

- [ ] **Step 11: Write Source Priority and Reference Files sections**

Source priority (7 levels from spec). Reference files list with descriptions. Exemplar list.

- [ ] **Step 12: Verify SKILL.md completeness**

Cross-check every section of the design spec against SKILL.md. Every rule, every table, every condition must be present. No spec content should be missing from the skill.

Run: `wc -l ~/.claude/skills/assessment-task-gen/SKILL.md`
Expected: 350-500 lines.

- [ ] **Step 13: Commit**

```bash
git add ~/.claude/skills/assessment-task-gen/SKILL.md
git commit -m "feat(assessment-task-gen): create main SKILL.md"
```

---

## Task 9: Update student-task-gen for P type support

**Files:**
- Modify: `~/.claude/skills/student-task-gen/SKILL.md`

Remove the P type gate and add P lesson support. This is the downstream dependency from the spec.

- [ ] **Step 1: Read the current SKILL.md**

Read `~/.claude/skills/student-task-gen/SKILL.md` fully. Identify:
- The type gate in Step 1 that blocks P lessons
- The Darbo eiga section that defines L and I branches
- The quality self-check that validates type

- [ ] **Step 2: Remove the P type gate**

In Step 1 (or wherever the type gate is), change:
- Old: "Only generate for L and I lessons. If lesson type is P, A, D, T, MOCK, or G: ... Stop."
- New: "Only generate for L, I, and P lessons. If lesson type is A, D, T, MOCK, or G: ... Stop."

- [ ] **Step 3: Add P branch in Darbo eiga**

After the I lesson sub-tasks section, add a P lesson section:

**For P lessons: assessment-format exercises**

P lessons prepare students for the upcoming assessment. The Student_Task must model the assessment format.

Rules:
- Read the corresponding A lesson's Assessment_Task (if it exists) to match format and question types
- Structure as 2-4 independent exercises (situacijos/uzduotys), not progressive sub-tasks
- Each exercise: scenario/situation + what to produce + justification requirement ("nes..." format where applicable)
- No scaffolding, no Stuck? boxes (same as I)
- For programming P lessons: use code tracing, output prediction, or code completion matching the A lesson format
- For theory P lessons: use MCQ-style questions, short answer, scenario analysis matching the A lesson format
- Include "Issivertinkite" (self-assessment) section: 3-4 reflection questions about readiness

- [ ] **Step 4: Add P exemplar reference**

Add to the Reference Files section at the bottom:
- `references/P_example_01.md` -- P lesson: safety pre-assessment rehearsal. Demonstrates assessment-format exercises, self-assessment section, no scaffolding.

Note: The actual P exemplar file will be created in Task 10.

- [ ] **Step 5: Update quality self-check**

Add P-specific checks:
- P lesson exercises match the A lesson assessment format (if A lesson Assessment_Task exists)
- No scaffolding/Stuck? boxes in P lessons
- Self-assessment section present

- [ ] **Step 6: Commit**

```bash
git add ~/.claude/skills/student-task-gen/SKILL.md
git commit -m "feat(student-task-gen): add P lesson type support"
```

---

## Task 10: Create P exemplar for student-task-gen

**Files:**
- Create: `~/.claude/skills/student-task-gen/references/P_example_01.md`

- [ ] **Step 1: Write the P exemplar**

Model it on the existing I_example_01.md structure but with P-specific characteristics:
- Title: "Pasirengimas saugos vertinimui" (Grade 9, P lesson)
- 3 exercises in assessment format (MCQ-style + scenario analysis + short answer)
- No scaffolding, no Stuck? boxes, no step-by-step
- "nes..." justification format in scenario exercise
- Self-assessment section with 3 reflection questions
- Design notes explaining how this differs from I lessons

- [ ] **Step 2: Commit**

```bash
git add ~/.claude/skills/student-task-gen/references/P_example_01.md
git commit -m "docs(student-task-gen): add P lesson exemplar"
```

---

## Task 11: Log decisions

**Files:**
- Modify: `tasks/decisions.md` (append only)

- [ ] **Step 1: Append decisions to decisions.md**

Add these entries:

```markdown
## 2026-03-28 -- Assessment task generation skill created

**Decision**: New skill `assessment-task-gen` generates assessment materials for A lessons. Produces Assessment_Task.pdf (practical) or .xlsx (Testmoz), plus Rubric.pdf. Uses backward design: A before P before answer keys.

**Context**: 38 A lessons exist with no content beyond READMEs. P lessons and answer keys depend on assessments existing first.

**Rationale**: Assessments anchor the backward design chain. Practice tasks (P) must model the assessment format, so the assessment must be designed first. Answer keys derive from the assessment content.

## 2026-03-28 -- Assessment files output as PDF (student-facing) or XLSX (Testmoz)

**Decision**: Assessment_Task is .pdf for practical tasks (student-facing) and .xlsx for Testmoz tests (teacher uploads). Rubric is always .pdf (student-facing, shared before assessment). Existing A lesson READMEs listing .docx need migration to .pdf.

**Context**: Locked decision says student-facing files are PDF. Assessment_Task and Rubric are student-facing. Testmoz tests are an exception because the teacher needs an importable format.

**Rationale**: Consistent with Theory_Pack and Student_Task PDF output. Testmoz .xlsx is a platform requirement, not a format preference.

## 2026-03-28 -- student-task-gen extended to support P lessons

**Decision**: student-task-gen now accepts P lesson type. P tasks use assessment-format exercises (not micro-steps or sub-tasks). The skill reads the corresponding A lesson's Assessment_Task to match format.

**Context**: P lessons were blocked by a hard type gate. Practice tasks are structurally similar to I lesson tasks but with assessment-format content.

**Rationale**: A separate skill would duplicate the document generation pipeline. P is a third content branch alongside L and I, not a fundamentally different document type.

## 2026-03-28 -- Answer key is a separate skill (answer-key-gen)

**Decision**: Answer keys are generated by a separate answer-key-gen skill (planned), not by assessment-task-gen or student-task-gen. Answer_Key.pdf is student-facing.

**Context**: Answer keys serve both A and P lessons. The assessment skill knows the questions but would become too large. The student-task-gen handles different document types.

**Rationale**: answer-key-gen reads any task document (A or P) and generates the key. This avoids duplicating answer generation logic across multiple skills. Student-facing because students use answer keys to self-check and learn from mistakes.
```

- [ ] **Step 2: Commit**

```bash
git add tasks/decisions.md
git commit -m "docs: log assessment-task-gen and P-type decisions"
```

---

## Task 12: Migrate A lesson file references from .docx to .pdf

**Files:**
- Modify: `~/.claude/skills/lesson-readme-gen/references/lesson_types.md` (or equivalent file defining A lesson file tables)
- Modify: All 38 A lesson README.md files (file table rows: Assessment_Task.docx -> Assessment_Task.pdf, Rubric.docx -> Rubric.pdf, Answer_Key.docx -> Answer_Key.pdf)

This task is required by the spec (line 328): "The implementation plan must include a step to update lesson-readme-gen's lesson_types.md reference and all existing A lesson READMEs."

- [ ] **Step 1: Read lesson-readme-gen's lesson_types.md**

Read `~/.claude/skills/lesson-readme-gen/references/lesson_types.md` (or search for the file that defines which files A lessons require). Identify the lines listing Assessment_Task.docx, Rubric.docx, and Answer_Key.docx.

- [ ] **Step 2: Update lesson_types.md**

Change:
- `Assessment_Task.docx` -> `Assessment_Task.pdf`
- `Rubric.docx` -> `Rubric.pdf`
- `Answer_Key.docx` -> `Answer_Key.pdf`

Exception: For Testmoz-based assessments, Assessment_Task is .xlsx, but the README table should list the primary format (.pdf for practical, .xlsx for Testmoz). This can be noted in the Pastaba column.

- [ ] **Step 3: Update all 38 A lesson READMEs**

For each A lesson README in the repo, update the "Reikalingi failai" table to use .pdf instead of .docx for student-facing files. This is a bulk find-and-replace operation across all A lesson folders.

Use grep to find all affected files:
```bash
grep -rl "Assessment_Task.docx" Grade_*/
grep -rl "Rubric.docx" Grade_*/
grep -rl "Answer_Key.docx" Grade_*/
```

Then apply the replacements.

- [ ] **Step 4: Commit**

```bash
git add ~/.claude/skills/lesson-readme-gen/references/
git add Grade_*/
git commit -m "fix(A-lessons): migrate file references from .docx to .pdf"
```

---

## Task 13: Smoke test with Grade 9 Safety 007_A

**Files:**
- No new files created by this task (the skill generates them)

This is a manual verification step, not automated. The teacher runs the skill on the first real assessment and verifies the output.

- [ ] **Step 1: Verify skill loads**

Run: `/assessment-task-gen` or ask the skill to generate an assessment for `Grade_9/Semester_1/01_Safety/007_A`.

The skill should:
1. Read all reference docs (Step 0)
2. Read L lessons 001-004 Teacher_Plans, 005_I plan, 006_P plan
3. Build coverage matrix from safety module objectives
4. Propose a format (likely: Testmoz test + practical ergonomics task, based on README)
5. Stop and wait for teacher approval

- [ ] **Step 2: Review the proposal**

Check:
- Does the competency level distribution make sense for this module?
- Are the question types appropriate for Grade 9 safety content?
- Does the total point allocation convert cleanly to the 1-10 scale?
- Is the pedagogical reasoning sound?

- [ ] **Step 3: Approve and generate**

After teacher approves, the skill generates:
- Testmoz .xlsx with question banks (3-4 variants per pool)
- Rubric.pdf with criteria table
- (Practical portion if approved in the format)

- [ ] **Step 4: Verify outputs**

Check:
- .xlsx imports cleanly into Testmoz (or at least has correct column structure)
- Rubric.pdf renders correctly
- Lithuanian text has no errors (lt-qa should have caught them)
- No em dashes
- Questions trace to actual lesson content
- Competency levels are correctly distributed

- [ ] **Step 5: Note any issues for skill refinement**

If issues are found, fix them in the skill before marking complete. Add any new lessons to tasks/lessons.md.
