---
name: assessment-task-gen
description: >
  Generate assessment materials for A lessons in the IT Curriculum repo
  (PauliusPadrostis/IT_Curriculum). Use this skill whenever the teacher asks to
  create, generate, write, or build an assessment, test, quiz, kontrolinis,
  atsiskaitomasis darbas, or vertinimo užduotis. Also triggers on: "sugeneruok
  vertinimą", "sukurk testą", "paruošk atsiskaitomąjį darbą", "generate
  assessment", "create test for this lesson", "build assessment materials".
  Only generates for A lesson types. Do NOT use for lesson plans (use
  lesson-plan-gen), student tasks (use student-task-gen), theory packs (use
  theory-pack-gen), or visual aids (use visual-aid-gen).
---

# Assessment Task Generator

Generates assessment materials for A (Assessment) lessons in the IT Curriculum
repo. Produces Assessment_Task.pdf (practical) or .xlsx (Testmoz), plus
Rubric.pdf. All generated content is in **Lithuanian**. Respond to the teacher
in whatever language they use.

**Design principle:** Backward design. The assessment anchors the learning arc.
A before P before answer keys. Read all preceding L/I lesson content, analyze
objectives against Bloom's and competency levels, propose a format with
reasoning, wait for teacher approval, then generate.

---

## Step 0 — Read References

**Before generating any assessment, always read these files:**

1. `references/assessment_design_guide.md` — pedagogy knowledge base
2. `references/grading_policy.md` — school grading rules and constraints
3. `references/question_design.md` — item writing rules and variant generation
4. `references/cs_assessment_progression.md` — grade-appropriate question type defaults
5. `references/assessment_format.md` — output document structure
6. If Testmoz format: `references/testmoz_format.md` — import file specification AND `references/testmoz_import_template.xlsx` — official Testmoz template (open and study before generating)
7. Relevant exemplar from `references/exemplars/`

**Lithuanian QA (mandatory):**
8. Read the lt-qa skill and run Phase 1 (PRE-GEN) before writing any Lithuanian text.

**Lessons learned (mandatory):**
9. Read `tasks/lessons.md` from the repo root. Follow every rule in it.

**Note on paths:** Items 1-7 use paths relative to the skill directory. Items 8-9 reference external files.

---

## Step 1 — Gather Context

### Input priority

| Priority | Source | What to Extract |
|----------|--------|-----------------|
| 1 | **A lesson README** | Format hints, Bloom's level, success criteria, question types, platform, duration, conditions, required files |
| 2 | **All L/I Teacher_Plans in scope** | Learning objectives, key concepts, task types used, common mistakes (Dažniausios klaidos), Bloom's levels per lesson |
| 3 | **All L/I Theory_Packs in scope** | Actual content taught, terminology, depth |
| 4 | **All L/I Student_Tasks in scope** | What students practiced, scaffolding level, task formats |
| 5 | **Module README** | Lesson sequence, A lesson position, sibling A lessons |
| 6 | **Curriculum reference** (`_references/informatika_programa.md`) | National competency expectations |
| 7 | **VBE reference files** (grades 11-12 only) | Exam format alignment |
| 8 | **Skill reference docs** | Assessment design rules, grading policy |
| 9 | **lt-mistakes.yaml** | Lithuanian QA pre-generation |

### Path parsing

Extract from the lesson folder path:
- Grade (Grade_9, Grade_10, etc.)
- Semester
- Module name
- Lesson number and type (must be A)

### Scope rules for multi-A modules

When a module has multiple A lessons:
- An A lesson's scope = L/I lessons since the previous A (or since module start if first A)
- Example: L1-L2-L3-A1-L4-L5-A2 → A1 scope: L1-L3. A2 scope: L4-L5.
- Coverage must not overlap in core items between A lessons (warm-up recall items may overlap)
- Build the full distribution before generating any individual A

### Batch mode

When generating assessments for a module or grade:
1. Read the module README for full lesson index
2. Filter to A lessons only
3. Build scope boundaries for each A lesson
4. Process in sequence order
5. Ensure no coverage overlap between A lessons

---

## Abort / Degrade Conditions

| Condition | Action |
|-----------|--------|
| A lesson README does not exist or has no learning objectives | **Stop.** Cannot generate without objectives. |
| No L/I Teacher_Plans exist in scope (all Šablonas) | **Stop.** "Siūlau pirma sugeneruoti L/I pamokų planus, kad vertinimas atitiktų dėstytą turinį." |
| Some L/I Teacher_Plans exist but not all | **Warn and proceed.** Generate from available plans. Flag uncovered objectives in the proposal. |
| Module README missing | **Proceed with degraded context.** Use lesson README and available plans only. |
| VBE reference files missing (grades 11-12) | **Proceed.** Use cs_assessment_progression.md defaults. |

---

## Step 2 — Content Inventory

Build a coverage matrix mapping every learning objective from every L/I lesson in scope:

| # | Objective | Source Lesson | Bloom's Level | Content Type | Practiced in I? | Common Mistakes |
|---|-----------|--------------|---------------|-------------|----------------|-----------------|
| 1 | ... | 001_L | Apply | Theory | Yes (005_I) | Students confuse X with Y |

### Content type classification

- **Theory:** safety, networks, ethics, digital literacy
- **Programming:** C++, algorithms, data structures
- **Tool-based:** Excel, Inkscape, Canva, Word
- **Data:** spreadsheets, data analysis, visualization

This matrix drives all subsequent decisions. Every objective must have at least one assessment item. No item may test content not in the matrix.

### Common mistakes extraction

The "Dažniausios klaidos" sections from Teacher_Plans become:
- MCQ distractors (the wrong answer a student would pick)
- Debugging task errors (the bug a student must find)
- Scenario analysis traps (the mistake a student must identify)

If no common mistakes data exists, use domain knowledge from cs_assessment_progression.md defaults.

---

## Step 3 — Assessment Format Proposal

**The skill proposes a format, presents it to the teacher, and STOPS to wait for approval.**

### Decision factors

| Factor | How It Influences the Proposal |
|--------|-------------------------------|
| **Domain** | Theory → Testmoz/written test. Programming → practical coding task. Tools → practical product task. Data → spreadsheet task. Mixed → combined format. |
| **Bloom's level** (from README) | Remember/Understand → closed questions (MCQ, matching, fill-in-blank). Apply → practical tasks, code completion. Analyze/Evaluate → scenario analysis, debugging, code tracing. Create → open-ended production. |
| **Grade** | 9-10: more structure, lower cognitive ceiling. 11-12: VBE-adjacent formats, higher autonomy. |
| **Module position** | Mid-module A: narrower scope. End-module A: cumulative, full module coverage. |
| **Duration** (from README) | Determines item count. Atsiskaitomasis darbas >= 30 min. |
| **README constraints** | If README specifies platform/format/question types, those are constraints, not suggestions. |

### Competency level design

Every assessment must be designed around four competency levels:

| Level | Name | Grade Range | % of Assessment | What It Tests |
|-------|------|-------------|-----------------|---------------|
| I | Slenkstinis | 4 (30-44%) | ~20% of items | Basic recall and recognition |
| II | Patenkinamas | 5-6 (45-64%) | ~30% of items | Standard tasks independently |
| III | Pagrindinis | 7-8 (65-84%) | ~30% of items | Applies in new situations, justifies |
| IV | Aukštesnysis | 9-10 (85-100%) | ~20% of items | Analyzes, evaluates, creates independently |

### Proposal output

Present to teacher:

```
VERTINIMO FORMATO PASIŪLYMAS: [Lesson code + title]

Formatas: [e.g., Testmoz testas + praktinė užduotis]
Trukmė: [e.g., 35 min]
Platforma: [e.g., Testmoz (testas) + Code::Blocks (praktika)]

Turinio paskirstymas:
- Slenkstinis (20%): [N items], [description]
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

**THE SKILL STOPS HERE AND WAITS FOR TEACHER CONFIRMATION.**

If the teacher modifies the proposal, incorporate changes before proceeding.

---

## Step 4 — Item Generation

After teacher approval, generate assessment items.

### 4.1 General item rules

- Every item traces to a specific objective in the coverage matrix
- Every item tagged with competency level (I-IV)
- Points shown next to every question/task
- Items progress easier to harder (school policy §29.3)
- Total points convert cleanly to 1-10 via percentage table
- C++ only for programming (locked decision)
- Em dash (—) banned in all generated text
- Code completion: "Duoto kodo keisti negalima" stated explicitly

### 4.2 Question type specifications

**MCQ:**
- 3-4 options. Distractors from real misconceptions.
- No "all/none of above." No negative stems unless objective requires it.
- Same length/structure across options. Vary correct answer position.

**Short Answer / Fill-in-Blank:**
- Specify scope ("1-2 sakiniais paaiškinkite...")
- One concept per question. Cannot be answered by verbatim recall.

**Scenario Analysis:**
- Realistic situation. Requires application, not recall.
- "nes..." justification format. Clear answer length constraint.

**Code Tracing / Output Prediction:**
- Complete, compilable code. Ask for specific output or variable values.
- Grade 10: linear + one control structure. Grade 11: loops, arrays, strings. Grade 12: file I/O, structs, functions.

**Code Completion:**
- Working program with marked completion zone (// === JŪSŲ KODAS ČIA === //)
- "Duoto kodo keisti negalima" stated explicitly
- Rubric: correct logic + compiles + handles edge cases

**Code Writing (grades 11-12 only):**
- Problem description, input format, output format, sample I/O
- Rubric: correct I/O, logic correctness, edge cases, readability

**Practical Tool Tasks:**
- Clear deliverable with exact constraints
- Success criteria tied to measurable outcomes
- Per-criterion rubric (3-6 criteria, 3-4 levels each)

### 4.3 Testmoz question banks

When format is Testmoz:
- 3-4 variants per question in the same pool
- **Change between variants:** names, numbers, scenario details, data, option ordering
- **Keep identical:** structure, cognitive demand, distractor logic, point value, competency level
- **Never:** change concept tested, make one variant easier, reuse same distractor across variants
- Output as .xlsx per testmoz_format.md. Pools separated by blank rows.

### 4.4 Rubric generation

Every assessment gets a Rubric document:
- MCQ/short answer: point allocation per question + percentage-to-grade conversion
- Practical tasks: per-criterion rubric with 3-4 performance levels and specific observable descriptors
- Descriptors must be concrete ("Teisingai identifikuoja abu kintamuosius," not "Gerai supranta")
- Rubric is student-facing (shared before assessment per §29.2)
- Maximum 6 criteria for practical task rubrics

---

## Step 5 — Validity Self-Check

Before outputting, verify every item:

| Check | Rule |
|-------|------|
| **Coverage** | Every objective in the matrix has >= 1 assessment item |
| **No extras** | No item tests content not taught in scope L/I lessons |
| **Bloom's alignment** | Each item's cognitive demand matches its tagged competency level |
| **Competency distribution** | ~20% slenkstinis, ~30% patenkinamas, ~30% pagrindinis, ~20% aukštesnysis |
| **Difficulty ordering** | Items progress from easier to harder |
| **Point total** | Converts cleanly to 1-10 via school percentage scale |
| **Distractor quality** | MCQ distractors represent real misconceptions |
| **Rubric specificity** | Every criterion uses observable, measurable descriptors |
| **Time realism** | Item count x expected time per item <= available duration |
| **Format match** | Output matches the teacher-approved proposal |
| **No P leakage** | Items are NOT identical to what P lessons will use (similar format, different content) |
| **Tool validity** | Only approved software (Code::Blocks, Excel, Word, Inkscape, Canva, Testmoz) |
| **Language** | Lithuanian, formal, no teacher jargon in student-facing materials |
| **Em dash ban** | No em dashes (—) anywhere. Replace with comma, period, colon, or restructure. |
| **Grade appropriateness** | Question types match grade level per cs_assessment_progression.md |

---

## Step 6 — Output Files

### Assessment pattern → output mapping

| Pattern | Assessment_Task | Rubric | Additional |
|---------|----------------|--------|------------|
| **Testmoz test** | .xlsx (import file with question banks) | Rubric.pdf (percentage-to-grade + per-question point map) | None |
| **Practical task** | Assessment_Task.pdf (task instructions) | Rubric.pdf (per-criterion scoring rubric) | Input data files if needed (.txt, .csv) |
| **Mixed format** | Assessment_Task.pdf + .xlsx (if applicable) | Rubric.pdf (combined rubric) | Input data files if needed |

### Output location

- Single assessment: save to the lesson folder
- Batch: save each to its respective lesson folder

### File format rules

- Student-facing documents → PDF (docx-to-PDF pipeline)
- Testmoz import files → .xlsx (teacher uploads)
- Rubric → PDF (student-facing, shared before assessment)
- Input data files → .txt or .csv

### Document generation

Use the docx skill for .docx creation, then convert to PDF via docx2pdf.
Use openpyxl for Testmoz .xlsx generation.
Follow assessment_format.md for exact document structure and visual identity.

---

## Step 7 — Lithuanian QA Pass

After generating all files and before presenting to the teacher, run Phase 2 (POST-GEN) from the lt-qa skill on all Lithuanian text. Fix all issues before presenting.

---

## Source Priority

When sources disagree:

1. **A lesson README** — assessment-specific scope, format, constraints
2. **Teacher-approved proposal** (Step 3) — format decisions confirmed by teacher
3. **School grading policy** — institutional rules (percentage scale, difficulty distribution)
4. **L/I lesson content** — what was actually taught (coverage matrix)
5. **Skill reference docs** — assessment design standards and defaults
6. **Curriculum reference** — national expectations
7. **cs_assessment_progression.md** — grade-appropriate defaults (lowest priority)

---

## Reference Files

Read before every generation:

### Core references
- `references/assessment_design_guide.md` — Backward design, Bloom's mapping, constructive alignment, validity, formative vs summative
- `references/grading_policy.md` — Žemynos gimnazija percentage scale, difficulty distribution, assessment rules
- `references/question_design.md` — MCQ rules, short answer rules, rubric design, code task hierarchy, variant generation
- `references/cs_assessment_progression.md` — Grade-appropriate question types and code task ceiling per grade
- `references/assessment_format.md` — Assessment_Task.pdf and Rubric.pdf document structure and formatting
- `references/testmoz_format.md` — Testmoz .xlsx import specification and pool structure
- `references/testmoz_import_template.xlsx` — Official Testmoz template file. Open and study before generating any .xlsx.

### Exemplars
- `references/exemplars/theory_safety_example.md` — Theory assessment: MCQ + short answer + scenario + practical. Grade 9 safety.
- `references/exemplars/practical_graphics_example.md` — Tool-based practical: theory test + Inkscape task. Grade 9 graphics.
- `references/exemplars/programming_algorithms_example.md` — Code completion: 5 C++ tasks with scaffolds. Grade 10-11 algorithms.
