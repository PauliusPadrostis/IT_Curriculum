# Assessment Task Generator — Design Spec

**Date:** 2026-03-28
**Status:** Draft
**Scope:** New skill `assessment-task-gen` that generates assessment materials for A lessons across the IT Curriculum.

---

## Problem

38 A (Assessment) lessons exist across Grades 9-12. All are bare READMEs. No skill exists to generate assessment materials. Downstream dependencies (P lesson practice tasks, answer keys) cannot be built until assessments are designed. The assessment is the anchor of the backward design chain: **A task -> P task -> Answer keys**.

## What This Skill Does

Generates assessment materials for A lessons. Reads all preceding L/I lesson content in the module, analyzes learning objectives against Bloom's taxonomy and national competency levels, proposes an assessment format with pedagogical justification, waits for teacher approval, then generates the assessment documents.

## What This Skill Does NOT Do

- Does not generate answer keys (separate `answer-key-gen` skill).
- Does not generate P lesson practice tasks (handled by extended `student-task-gen`).
- Does not generate Teacher_Plan.docx for A lessons (handled by `lesson-plan-gen`, which already supports A type).
- Does not upload to Testmoz (teacher does this manually using the generated import file).

---

## Dependency Chain

```
L/I lesson content (Teacher_Plans, Theory_Packs, Student_Tasks)
        |
        v
  assessment-task-gen  <-- THIS SKILL
        |
        v
  student-task-gen (P type) — models practice on the assessment format
        |
        v
  answer-key-gen (planned) — generates answer keys for both A and P tasks
```

---

## Inputs (What the Skill Reads)

Read in this order. Higher priority sources override lower ones.

| Priority | Source | What to Extract |
|----------|--------|-----------------|
| 1 | **A lesson README** | Assessment format hints, Bloom's level, success criteria, question types, platform, duration, conditions, required files |
| 2 | **All L/I Teacher_Plans in scope** | Learning objectives, key concepts, task types used, common mistakes (Dazniausios klaidos sections), Bloom's levels per lesson |
| 3 | **All L/I Theory_Packs in scope** | Actual content taught, terminology, depth of coverage |
| 4 | **All L/I Student_Tasks in scope** | What students practiced, scaffolding level, task formats used |
| 5 | **Module README** | Lesson sequence, where this A sits in the arc, sibling A lessons (for coverage distribution) |
| 6 | **Curriculum reference** (`_references/informatika_programa.md`) | National competency expectations, achievement area codes |
| 7 | **VBE reference files** (grades 11-12 only) | Exam format alignment, task type expectations |
| 8 | **Skill reference docs** (see Reference Docs section) | Assessment design rules, grading policy, question writing standards |
| 9 | **lt-mistakes.yaml** | Lithuanian QA pre-generation |

### Scope Rules for Multi-A Modules

When a module has multiple A lessons:

- An A lesson's scope is the L/I lessons since the previous A lesson (or since module start if first A).
- Example: Module with L1-L2-L3-A1-L4-L5-A2 -> A1 scope: L1-L3. A2 scope: L4-L5.
- Coverage must not overlap in core items between A lessons (warm-up recall items may overlap).
- The skill must build the full distribution before generating any individual A.

---

## Step 0 — Read References

Before generating any assessment, always read:

1. `references/assessment_design_guide.md` — pedagogy knowledge base
2. `references/grading_policy.md` — school grading rules and constraints
3. `references/question_design.md` — item writing rules and variant generation
4. `references/cs_assessment_progression.md` — grade-appropriate question type defaults
5. `references/assessment_format.md` — output document structure
6. If Testmoz format: `references/testmoz_format.md` — import file specification
7. Relevant exemplar from `references/exemplars/`

**Lithuanian QA (mandatory):**
8. Read `/mnt/skills/user/lt-qa/SKILL.md` and run Phase 1 (PRE-GEN) before writing any Lithuanian text.

**Lessons learned (mandatory):**
9. Read `tasks/lessons.md` from the repo root. Follow every rule in it.

**Note on paths:** Items 1-7 use paths relative to the skill directory (e.g., `~/.claude/skills/assessment-task-gen/references/`). Items 8-9 reference external files by absolute or repo-root paths.

---

## Abort / Degrade Conditions

The skill stops or degrades when input is insufficient:

| Condition | Action |
|-----------|--------|
| A lesson README does not exist or has no learning objectives | **Stop.** Cannot generate without objectives. |
| No L/I Teacher_Plans exist in scope (all Šablonas) | **Stop.** Assessment cannot test content that has not been defined. Inform teacher: "Siūlau pirma sugeneruoti L/I pamokų planus, kad vertinimas atitiktų dėstytą turinį." |
| Some L/I Teacher_Plans exist but not all | **Warn and proceed.** Generate from available plans. Flag uncovered objectives in the proposal. |
| Module README missing | **Proceed with degraded context.** Use lesson README and available plans only. |
| VBE reference files missing (grades 11-12) | **Proceed.** Use cs_assessment_progression.md defaults. |

---

## Step 1 — Content Inventory

Build a coverage matrix mapping every learning objective from every L/I lesson in scope:

| # | Objective | Source Lesson | Bloom's Level | Content Type | Practiced in I? | Common Mistakes |
|---|-----------|--------------|---------------|-------------|----------------|-----------------|
| 1 | ... | 001_L | Apply | Theory | Yes (005_I) | Students confuse X with Y |

**Content type classification:**
- Theory (safety, networks, ethics, digital literacy)
- Programming (C++, algorithms, data structures)
- Tool-based (Excel, Inkscape, Canva, Word)
- Data (spreadsheets, data analysis, visualization)

This matrix drives all subsequent decisions. Every objective must have at least one assessment item. No item may test content not in the matrix.

### Common Mistakes Extraction

The "Dazniausios klaidos" sections from Teacher_Plans are critical input. These become:
- MCQ distractors (the wrong answer a student would pick)
- Debugging task errors (the bug a student must find)
- Scenario analysis traps (the mistake a student must identify)

If no common mistakes data exists, the skill uses domain knowledge from `cs_assessment_progression.md` defaults.

---

## Step 2 — Assessment Format Proposal

The skill proposes a format, presents it to the teacher with pedagogical reasoning, and **stops to wait for approval**.

### Decision Factors

| Factor | How It Influences the Proposal |
|--------|-------------------------------|
| **Domain** | Theory -> Testmoz/written test. Programming -> practical coding task. Tools -> practical product task. Data -> spreadsheet task. Mixed -> combined format. |
| **Bloom's level** (from README) | Remember/Understand -> closed questions (MCQ, matching, fill-in-blank). Apply -> practical tasks, code completion. Analyze/Evaluate -> scenario analysis, debugging, code tracing. Create -> open-ended production. |
| **Grade** | 9-10: more structure, lower cognitive ceiling. 11-12: VBE-adjacent formats, higher autonomy. |
| **Module position** | Mid-module A: narrower scope, one block of L lessons. End-module A: cumulative, full module coverage. |
| **Duration** (from README) | Determines item count. Atsiskaitomasis darbas >= 30 min. |
| **README constraints** | If README specifies platform/format/question types, those are constraints, not suggestions. |

### Competency Level Design

Every assessment must be designed around four competency levels, per national curriculum and school policy:

| Level | Name | Grade Range | % of Assessment | What It Tests |
|-------|------|-------------|-----------------|---------------|
| I | Slenkstinis | 4 (30-44%) | ~20% of items | Basic recall and recognition. Uses given tools with guidance. |
| II | Patenkinamas | 5-6 (45-64%) | ~30% of items | Explains concepts, performs standard tasks independently. |
| III | Pagrindinis | 7-8 (65-84%) | ~30% of items | Applies knowledge in new situations, justifies choices. |
| IV | Aukstesnysis | 9-10 (85-100%) | ~20% of items | Analyzes, evaluates, creates independently. Solves non-standard problems. |

This maps to the school's difficulty distribution rule (20% easy, 50% medium, 30% hard) with slight rounding: Slenkstinis items (20%) are easy. Patenkinamas items (30%) bridge easy-to-medium. Pagrindinis items (30%) are medium-to-hard. Aukstesnysis items (20%) are hard. The ~20/30/30/20 competency split is the primary constraint; the 20/50/30 difficulty rule is satisfied because patenkinamas items span the easy-medium boundary.

### Proposal Output Format

The skill presents to the teacher (this is a structural template, not verbatim output; actual output uses proper Lithuanian with diacritics):

```
VERTINIMO FORMATO PASIŪLYMAS: [Lesson code + title]

Formatas: [e.g., Testmoz testas + praktinė užduotis]
Trukmė: [e.g., 35 min]
Platforma: [e.g., Testmoz (testas) + Code::Blocks (praktika)]

Turinio paskirstymas:
- Slenkstinis (20%): [N items], [description of what they test]
- Patenkinamas (30%): [N items], [description]
- Pagrindinis (30%): [N items], [description]
- Aukštesnysis (20%): [N items], [description]

Klausimų tipai:
- [N] MCQ (vieno atsakymo)
- [N] trumpas atviras atsakymas
- [N] scenarijaus analizė
- [1] praktinė užduotis

Taškų paskirstymas: [total points], konvertavimas į pažymį pagal mokyklos skalę.

Pedagoginis pagrindimas:
[2-3 sentences explaining WHY this format fits this assessment]
```

**The skill stops here and waits for teacher confirmation.**

If the teacher modifies the proposal, the skill incorporates changes before proceeding.

---

## Step 3 — Item Generation

After teacher approval of the format, generate assessment items.

### 3.1 — General Item Rules

- Every item traces back to a specific objective in the coverage matrix.
- Every item is tagged with its competency level (I-IV).
- Points are shown next to every question/task.
- Items progress from easier to harder within the assessment (per school policy rule 29.3).
- Total points must convert cleanly to the 1-10 scale via the school's percentage table.

### 3.2 — Question Type Specifications

#### Multiple Choice (MCQ)

- 3-4 options per question. 3 is acceptable (research: equally effective as 5).
- Distractors represent common student misconceptions, not random wrong answers. Source: common mistakes from Teacher_Plans, or domain knowledge from `cs_assessment_progression.md`.
- No "all of the above" / "none of the above."
- No negative stems ("which is NOT...") unless the objective specifically requires identifying exceptions.
- All options same grammatical structure and approximate length.
- Correct answer position varies across questions (no patterns).

#### Short Answer / Fill-in-Blank

- Specify expected scope: "1-2 sakiniais paaiskinkite..." or "Parasykite bent du..."
- One concept per question. No multi-part "and" questions.
- Cannot be answered by copying a definition verbatim from Theory_Pack.

#### Scenario Analysis

- Realistic situation within the module's domain.
- Requires application of principles, not recall.
- "nes..." justification format where the objective requires reasoning.
- Clear scope constraint on expected answer length.

#### Code Tracing / Output Prediction (Programming)

- Provide complete, compilable code.
- Ask for specific output, variable values at a specific line, or execution count.
- Grade 10: simple linear code with one control structure.
- Grade 11: loops, arrays, string operations.
- Grade 12: file I/O, structs, functions.

#### Code Completion (Programming)

- Provide a working program with a clearly marked section to complete.
- The given code must not be modified (state this explicitly).
- Rubric awards points for: correct logic, compiles without errors, handles edge cases.
- Provide C++ scaffolds only (Python is not used in this curriculum per locked decision).

#### Code Writing (Programming)

- Only for grades 11-12. Grade 10 students use code completion, not writing from scratch.
- Provide: problem description, input format, expected output format, sample input/output.
- Rubric criteria: correct I/O, logic correctness, edge case handling, code readability.

#### Practical Tool Tasks (Excel, Inkscape, etc.)

- Clear deliverable specification with exact constraints.
- Success criteria tied to measurable outcomes (correct formula results, specific file format, exact dimensions).
- Rubric uses per-criterion scoring (3-6 criteria, 3-4 performance levels each).

### 3.3 — Testmoz Question Banks

When the assessment format is Testmoz:

- Generate 3-4 variants of each question in the same pool.
- **What to change between variants:** names, numbers, scenario details, example data, ordering of concepts.
- **What to keep identical:** structure, cognitive demand, distractor logic, point value, competency level.
- **What never to do:** change the concept being tested, make one variant obviously easier/harder, use the same distractor across variants.
- Output as .xlsx file matching Testmoz import format (see `testmoz_format.md`).
- Each pool is separated by a blank row in the spreadsheet.

### 3.4 — Rubric Generation

Every assessment gets a Rubric document:

- For MCQ/short answer: point allocation per question + percentage-to-grade conversion table.
- For practical tasks: per-criterion rubric with 3-4 performance levels and specific, observable descriptors.
- Performance level descriptors must be concrete: "Teisingai identifikuoja abu kintamuosius" not "Gerai supranta."
- Rubric is student-facing (shared before assessment per school policy rule 29.2 and best practice).
- Maximum 6 criteria for practical task rubrics.

---

## Step 4 — Validity Self-Check

Before outputting, verify:

| Check | Rule |
|-------|------|
| **Coverage** | Every objective in the matrix has >= 1 assessment item |
| **No extras** | No item tests content not taught in scope L/I lessons |
| **Bloom's alignment** | Each item's cognitive demand matches its tagged competency level |
| **Competency distribution** | ~20% slenkstinis, ~30% patenkinamas, ~30% pagrindinis, ~20% aukstesnysis |
| **Difficulty ordering** | Items progress from easier to harder |
| **Point total** | Converts cleanly to 1-10 via school percentage scale |
| **Distractor quality** | MCQ distractors represent real misconceptions |
| **Rubric specificity** | Every criterion uses observable, measurable descriptors |
| **Time realism** | Item count x expected time per item <= available duration |
| **Format match** | Output matches the teacher-approved proposal from Step 2 |
| **No P leakage** | Items are NOT identical to what P lessons will use (similar format, different content) |
| **Tool validity** | Only approved software (Code::Blocks, Excel, Word, Inkscape, Canva, Testmoz) |
| **Language** | Lithuanian, formal, no teacher jargon in student-facing materials |
| **Em dash ban** | No em dashes (—) anywhere in generated text. Replace with comma, period, colon, or restructure. |
| **Grade appropriateness** | Question types match grade level per cs_assessment_progression.md |

---

## Step 5 — Output Files

### Assessment Pattern -> Output Mapping

| Pattern | Assessment_Task | Rubric | Additional |
|---------|----------------|--------|------------|
| **Testmoz test** | .xlsx (Testmoz import file with question banks) | Rubric.pdf (percentage-to-grade table + per-question point map) | None |
| **Practical task** (student-facing) | Assessment_Task.pdf (task instructions for students) | Rubric.pdf (per-criterion scoring rubric) | Input data files if needed (.txt, .csv) |
| **Mixed format** | Assessment_Task.pdf (written portion) + .xlsx (Testmoz portion if applicable) | Rubric.pdf (combined rubric covering both portions) | Input data files if needed |

### Output Location

- Single assessment: save to the lesson folder.
- Batch: save each to its respective lesson folder.

### File Format Rules

- Student-facing documents -> PDF (same docx-to-PDF pipeline as other student materials).
- Testmoz import files -> .xlsx (teacher uploads to Testmoz).
- Rubric -> PDF (student-facing, shared before assessment).
- Input data files -> .txt or .csv as specified.

**Migration note:** Existing A lesson READMEs list Assessment_Task.docx and Rubric.docx. These need updating to .pdf to match the locked decision that student-facing files are PDF. The implementation plan must include a step to update lesson-readme-gen's `lesson_types.md` reference and all existing A lesson READMEs.

---

## Step 6 — Lithuanian QA Pass

After generating all files and before presenting to the teacher, run Phase 2 (POST-GEN) from lt-qa skill on all Lithuanian text. Fix all issues before presenting.

---

## Reference Docs Specification

All reference docs live in the skill's `references/` directory. Each is a condensed, token-efficient document (max ~200 lines). The skill reads them before every generation.

### 1. `assessment_design_guide.md`

Condensed assessment pedagogy knowledge base. Contains:

- **Backward design steps** (Wiggins & McTighe): objectives -> evidence -> instruction. The assessment is designed second (after objectives), instruction last.
- **Bloom's -> question type mapping table**: which formats test which cognitive levels effectively. Remember = MCQ/matching. Understand = short answer/explain. Apply = practical tasks/code completion. Analyze = scenario analysis/debugging/code tracing. Evaluate = code review/"which is better and why." Create = write program/design solution.
- **Constructive alignment** (Biggs): learning objectives <-> teaching activities <-> assessment tasks must align. Common pitfalls: testing what was not taught, testing wrong skill (reading comprehension instead of target skill), format artifacts in MCQ.
- **Validity checklist**: Does every item trace to an objective? Does it test the intended cognitive level? Could a student answer correctly without the target knowledge? Are instructions unambiguous? Would two teachers grade the same response the same way?
- **Formative vs summative design differences**: P lessons (formative) optimize for diagnostic value, can include hints, match current instruction level. A lessons (summative) optimize for validity and reliability, cover breadth, include items at multiple Bloom's levels, produce score distributions that differentiate mastery. Critical rule: do not reuse P items verbatim in A assessments.

### 2. `grading_policy.md`

School-specific grading rules from Zemynos gimnazija vertinimo tvarka. Contains:

- **Percentage-to-grade scale**: 95-100%=10, 85-94%=9, 75-84%=8, 65-74%=7, 55-64%=6, 45-54%=5, 30-44%=4, 20-29%=3, 10-19%=2, 0-9%=1.
- **Competency levels**: slenkstinis (4), patenkinamas (5-6), pagrindinis (7-8), aukstesnysis (9-10).
- **Difficulty distribution**: 20% easy, 50% medium, 30% hard.
- **Assessment types and durations**: atsiskaitomasis darbas >= 30 min, apklausa rastu 15-20 min, savarankiskas darbas 10-20 min.
- **Student notification**: inform students >= 1 week before, share structure, content scope, goals, criteria.
- **Item ordering**: easier to harder within one assessment.
- **Points required**: every question/task must show point value.
- **Academic integrity rules**: teacher may void work if copying suspected, reassess orally.
- **Result notification**: graded and returned within 2 weeks. Results analyzed with class, individual failures discussed privately.

### 3. `question_design.md`

Item writing quality standards. Contains:

- **MCQ rules**: 3-4 options, distractors from real misconceptions, write distractors first, no "all/none of above," same length/structure across options, vary correct answer position.
- **Short answer rules**: specify scope, one concept per question, cannot be answered by verbatim recall.
- **Rubric design**: 3-6 criteria, specific observable descriptors per level, 3-4 performance levels, share rubric with students before assessment.
- **Code task hierarchy** (Lister et al.): reading -> tracing -> completion -> writing. Students who cannot trace at >50% accuracy are not ready to write.
- **Variant generation rules** (for Testmoz pools): change surface details (names, numbers, scenario context), keep structure/difficulty/distractor logic identical, never change the concept being tested, never make one variant obviously easier.

### 4. `testmoz_format.md`

Testmoz import specification. Contains:

- **Column layout**: A = question text (* prefix on correct answers), B = points or answer text, C = options (shuffle, short, long, norightshuffle), D = explanation text.
- **Question types**: MCQ single (points in B1, options in B2+), MCQ multi (~points in B1), fill-in-blank (points in B1, * on accepted answers), matching (~points, pairs in B+C columns), essay (points + "long"), ungraded short answer ("short" in C), text blocks (text in A, no points).
- **Pool structure**: questions in same pool separated by blank rows between pools. Each pool contains 3-4 variants of the same question.
- **Ready-to-use template examples** for each question type.

### 5. `cs_assessment_progression.md`

Grade-appropriate assessment defaults. README overrides this when specific.

- **Grade 9** (digital literacy, safety, graphics): MCQ, short answer, practical tool tasks (do X in Inkscape/Word). No programming assessment. Testing tool usage and concepts.
- **Grade 10** (intro C++, data): Code tracing, output prediction, code completion, short answer, structured spreadsheet tasks. Code writing only as small extensions, not from scratch.
- **Grade 11** (intermediate C++, data workflows): Code writing (small independent programs), debugging, file-driven tasks, scenario analysis, data workflow assessments. VBE-adjacent formats for programming.
- **Grade 12** (advanced C++, data reporting): Modular programs, multi-part tasks, edge case handling, robustness assessment. Full VBE format alignment.
- **Code task hierarchy per grade**: Grade 10 ceiling = complete. Grade 11 = write small programs. Grade 12 = write modular programs with functions.

### 6. `assessment_format.md`

Output document structure for Assessment_Task.pdf and Rubric.pdf. Contains:

- **Assessment_Task.pdf structure**: header (lesson code, title, grade, duration, conditions, allowed tools), task instructions section, point allocation per section, input data description (if applicable), submission requirements.
- **Rubric.pdf structure**: header matching Assessment_Task, criteria table (criterion | level descriptors at 4 levels | max points), percentage-to-grade conversion table, total points.
- **Formatting specs**: consistent with other student-facing documents (navy headings, same font/spacing family as Student_Task and Theory_Pack).
- **Programming task addenda**: sample input/output display format, code formatting rules.

### 7. `exemplars/`

3 condensed exemplars synthesized from LInMA diagnostic tests and curriculum context:

- `theory_safety_example.md` — Theory-heavy assessment (safety module). Demonstrates: MCQ + short answer + scenario analysis + practical ergonomics evaluation. Shows per-criterion rubric with 4 performance levels.
- `practical_graphics_example.md` — Tool-based practical assessment (vector graphics). Demonstrates: theory test (5 points) + practical creation task (5 points). Shows point-based grading with partial credit rules.
- `programming_algorithms_example.md` — Programming assessment (algorithms). Demonstrates: code completion tasks with scaffolded programs, per-task rubrics, "given code must not be modified" constraint. Shows C++ task format.

---

## Source Priority

When sources disagree:

1. **A lesson README** — assessment-specific scope, format, constraints
2. **Teacher-approved proposal** (Step 2) — format decisions confirmed by teacher
3. **School grading policy** — institutional rules (percentage scale, difficulty distribution, notification requirements)
4. **L/I lesson content** — what was actually taught (coverage matrix)
5. **Skill reference docs** — assessment design standards and defaults
6. **Curriculum reference** — national expectations
7. **cs_assessment_progression.md** — grade-appropriate defaults (lowest priority, README overrides)

---

## Relationship to Other Skills

| Skill | Relationship |
|-------|-------------|
| `lesson-plan-gen` | Generates Teacher_Plan.docx for A lessons (assessment administration plan). This skill generates the assessment content itself. |
| `student-task-gen` (P extension) | Reads this skill's Assessment_Task output to model P lesson practice tasks on the same format. P tasks use similar question types but different specific content. |
| `answer-key-gen` (new) | Reads this skill's Assessment_Task + Rubric to generate Answer_Key.pdf with model answers, explanations, alternative valid answers, and common wrong answers. |
| `lt-qa` | Mandatory pre-gen and post-gen Lithuanian quality assurance. |

---

## Implementation Notes

### Testmoz .xlsx Generation

Use openpyxl to generate the import file. Follow the exact column layout from `testmoz_format.md`. Each question pool is a group of 3-4 variant rows separated by blank rows. The file must be importable without modification.

### PDF Generation

Use the same docx-to-PDF pipeline as other student-facing skills (generate .docx with docx library, convert via docx2pdf, delete intermediate .docx).

### Input Data Files

For programming assessments that require input data, generate .txt or .csv files alongside the Assessment_Task. These files must contain realistic but not trivially small datasets (minimum 10 records for Grade 11+, per existing README conventions).

---

## Open Questions (Resolved During Brainstorming)

| Question | Resolution |
|----------|-----------|
| Who decides assessment format? | Skill proposes with reasoning, teacher confirms. |
| What format is Assessment_Task? | PDF for student-facing practical tasks, .xlsx for Testmoz. |
| Answer key in same skill? | No. Separate answer-key-gen skill (serves both A and P). |
| Rubric format? | PDF, student-facing (shared before assessment per policy). |
| P before A or A before P? | A first. P models the assessment format. Backward design. |
| Question banks? | Yes. Testmoz tests get 3-4 variants per question in pools. |
| Competency levels? | Built into the design: slenkstinis/patenkinamas/pagrindinis/aukstesnysis with percentage mapping. |
