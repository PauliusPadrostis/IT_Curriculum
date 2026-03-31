---
name: practice-task-gen
description: >
  Generate Practice_Task.pdf for P lessons in the IT Curriculum repo
  (PauliusPadrostis/IT_Curriculum). Use this skill whenever the teacher asks
  to create, generate, write, or build a practice task, practice set,
  praktikos užduotis, or P lesson practice materials. Also triggers on:
  "sugeneruok praktikos užduotį", "sukurk practice task", "paruošk P pamoką",
  "generate practice task", "create practice materials".
  Only generates for P lesson types. Do NOT use for assessments (use
  assessment-task-gen), student tasks for L/I (use student-task-gen), theory
  packs (use theory-pack-gen), or answer keys (use answer-key-gen).
---

# Practice Task Generator

Generates Practice_Task.pdf for P (Practice) lessons in the IT Curriculum
repo. The practice document is student-facing, with questions cognitively
harder than the upcoming A (Assessment) lesson. All generated content is in
**Lithuanian**. Respond to the teacher in whatever language they use.

**Design principle:** Practice anchors to assessment. Every P lesson maps to
the next A lesson in the module's numerical sequence. The A lesson's
Assessment_Task must exist before generation can begin. Read the assessment,
elevate difficulty per question, propose the elevation strategy to the
teacher, wait for approval, then generate.

**Hard gate:** The corresponding A lesson's Assessment_Task (.xlsx or .pdf)
must exist. If no A lesson follows the P lesson in the module sequence, abort.

---

## Step 0 — Load References & Lithuanian QA Phase 1 (PRE-GEN)

**Before generating any practice task, always read these files:**

### Skill references

1. `references/practice_task_format.md` — document structure and formatting specs
2. `references/difficulty_elevation_guide.md` — A-to-P elevation techniques
3. `references/practice_task_example.md` — complete exemplar with elevation map

### Cross-skill references

4. `.claude/skills/assessment-task-gen/references/question_design.md` — MCQ rules, short answer rules, code task hierarchy
5. `.claude/skills/assessment-task-gen/references/testmoz_format.md` — Testmoz .xlsx import specification and pool structure
6. `.claude/skills/student-task-gen/references/task_format.md` — student-facing document formatting baseline

### Lithuanian QA Phase 1 (PRE-GEN)

7. `lt-qa/lt-mistakes.yaml` — growing mistake library
8. `.claude/skills/lt-qa/references/ai-patterns.md` — AI text pattern detection
9. `.claude/skills/lt-qa/references/audience-calibration.md` — grade-appropriate language calibration
10. Determine target audience from the P lesson README (grade, prior knowledge assumptions)

### Lessons learned (mandatory)

11. `tasks/lessons.md` — accumulated corrections. Follow every rule in it.

**Note on paths:** Items 1-3 use paths relative to the skill directory. Items 4-11 reference files from other locations in the repo.

---

## Step 1 — Locate, Gather Context & Gate

### 1.1 Read P lesson README (Priority 1)

Extract from the lesson folder path:
- Grade (Grade_9, Grade_10, etc.)
- Semester
- Module name
- Lesson number and type (must be P)

Read the P lesson README for: learning objectives, topic scope, duration, conditions, required files.

### 1.2 Find paired A lesson

The P lesson maps to the **next A lesson** in the module's numerical sequence by folder number. Scan the module directory for lessons with type A that have a higher folder number than the P lesson.

- Example: `005_P` pairs with `007_A` (next A after 005).
- If multiple A lessons follow, pair with the nearest one.

### 1.3 Gate check

The Assessment_Task file (.xlsx or .pdf) **must exist** in the paired A lesson folder. If missing:

> **Abort.** "Pirmiausia sugeneruokite atsiskaitomąjį darbą naudodami /assessment-task-gen."

If no A lesson follows the P lesson in the module:

> **Abort.** "Modulyje po šios P pamokos nėra A pamokos. Patikrinkite modulio struktūrą."

### 1.4 Read A lesson README (Priority 2)

Extract: learning objectives, Bloom's levels, success criteria, question types, platform, duration, competency distribution.

### 1.5 Read module README

Extract: lesson sequence, module scope, sibling lessons, module learning arc.

### 1.6 Read all preceding L/I lesson content

Read all L/I lesson Teacher_Plans and Theory_Packs that fall within the scope of the paired A lesson (lessons between module start or previous A and the paired A). Extract:
- Key concepts taught
- Common mistakes (Dažniausios klaidos sections)
- Task types used
- Terminology

---

## Step 2 — Analyze A Assessment

### .xlsx (Testmoz format)

Read the Assessment_Task.xlsx with openpyxl. Walk rows:
- POOL / END markers to identify question pools
- Question text in column A, points in column B
- `*` prefix marks the correct answer
- Extract per question: text, type (MCQ/short answer/scenario), correct answer, distractors, points, pool membership
- Use one variant per pool (first variant is sufficient for analysis)

### .pdf format

Read the PDF text. Extract sections by headings. Identify question types from format cues (lettered options = MCQ, "Atsakykite N sakiniais" = short answer, scenario descriptions = scenario, code blocks = code task). Cross-reference Rubric.pdf if present in the A lesson folder.

### Build content inventory table

Map each A question to its content characteristics:

| # | A Question (summary) | Topic | Bloom's Level | Competency Tier | Question Type |
|---|---------------------|-------|---------------|-----------------|---------------|

This table drives the elevation strategy in Step 3.

---

## Step 3 — Propose Difficulty Elevation Strategy

Present the content inventory to the teacher with a proposed elevation technique per question:

| # | Topic | A Bloom's | A Tier | A Type | Proposed P Elevation |
|---|-------|-----------|--------|--------|---------------------|
| 1 | ... | Remember | I | MCQ | Technique 4: Context Shift, classroom to home scenario |
| 2 | ... | Understand | II | Short answer | Technique 1: Bloom's +1 (Understand to Apply) |

### Elevation techniques (from difficulty_elevation_guide.md)

- **Technique 1: Bloom's +1** — shift cognitive demand up one level on Bloom's taxonomy
- **Technique 2: Added Complexity** — same Bloom's level, add a layer (distractor, justification, edge case, constraint)
- **Technique 3: Composite Questions** — merge two related A objectives into one P question (max 2 objectives per composite)
- **Technique 4: Context Shift** — same concept and cognitive level, unfamiliar scenario

### Rules

- Every P question must be at least as difficult as its paired A question
- Elevation is per-question, not blanket. Each row gets its own technique.
- Elevated questions must remain answerable by a prepared student.
- When in doubt, prefer Technique 2 (safest elevation path).

**STOP AND WAIT FOR TEACHER APPROVAL.** The teacher can override any row: change technique, adjust difficulty, merge or split questions, add or remove rows. Incorporate all changes before proceeding.

---

## Step 4 — Generate Practice_Task

Build the document following `practice_task_format.md` structure.

### Document sections (exact order)

#### 1. HEADER

```
[centered, grey #808080, 9pt, allcaps] PRAKTINES UZDUOTYS
[centered, navy #1F4E79, 18pt bold] {Practice task title in Lithuanian}
[centered, grey #808080, 10pt] {Grade} klase  *  {Module name}  *  tipas "P"
[navy #1F4E79 horizontal rule, 1pt]
```

#### 2. KA PADARYSITE

2-3 sentences linking this practice to the upcoming A lesson. Explains what the student is preparing for. References the A lesson code and the L/I lessons covered.

- Second person formal ("jus" form)
- No motivational fluff. Plain statement of purpose.

#### 3. UZDUOTYS

Questions grouped by topic. One H3 heading per topic group. Questions elevated per the teacher-approved strategy from Step 3.

- No point values anywhere
- Mix of question types as appropriate
- 2-5 questions per topic group
- Total: 8-16 questions (2-4 pages)
- No correct answer marking

#### 4. PATIKRINKITE SAVE

Self-assessment checklist. Items in "Ar galiu uztikrintai [verb]?" format using the checkbox character (U+2610).

- 4-8 items, one per major competency
- Follow the order of topic groups in UZDUOTYS

#### 5. KA DARYTI, JEI SUNKU

Revision pointers table. One row per topic group.

| Tema | Kur perziureti |
|------|----------------|
| {Topic} | {Lesson number}, Theory_Pack: {section reference} |

### Grade scaffolding

- **Grade 9:** maximum detail, assume zero prior computer experience. Contexts must not introduce unfamiliar tools or technical concepts.
- **Grade 10:** moderate detail, basic file skills assumed.
- **Grades 11-12:** tool-specific only, higher autonomy expected.

### Text encoding

Plain UTF-8 for all Lithuanian text. No `\u` unicode escapes except typographic quotes (`\u201E` and `\u201C`) if needed in string context.

---

## Step 5 — Quality Self-Check

Before outputting, verify every item against these checks:

| Check | Rule |
|-------|------|
| **Coverage** | Every A lesson learning objective appears in at least one practice question |
| **Difficulty** | Every practice item is >= the corresponding A item in cognitive demand |
| **Grade appropriateness** | Question types and contexts match the grade level |
| **Time realism** | Total question load fits the P lesson duration (default <= 37 min) |
| **Question quality** | MCQ rules from question_design.md applied: 3-4 options, real misconception distractors, no "all/none of above", answer length equalization, no stem-answer echo |
| **No point values** | Zero point values visible anywhere in the document |
| **Code task ceiling** | Code tasks do not exceed the grade's allowed level (Grade 9: Level 1 only, Grade 10: up to Level 3, Grade 11+: up to Level 4) |
| **No A leakage** | Practice questions are elevated versions, not copies of A questions |
| **No answer leakage** | Self-assessment items and hints must not narrow the answer space for any question. If a checklist item reveals whether the student's answer is correct, rephrase to check process, not outcome. |

---

## Step 6 — Lithuanian QA Phase 2 (POST-GEN)

**Before running QA, write a plain-text sidecar:** Write all Lithuanian text
to `Practice_Task_text.txt` in the same lesson folder (see lt-qa SKILL.md
"Plain-Text Sidecar Protocol"). Collect every paragraph, heading, table cell,
checklist item, and hint text as plain UTF-8, one paragraph per line. Delete
the sidecar after POST-GEN passes and the .docx is converted to PDF.

After writing the sidecar, run the 7-step checklist on it:

1. **Mistake library scan** — check every sentence against `lt-qa/lt-mistakes.yaml`. Fix all matches.
2. **Grammar and morphology** — verify noun cases, verb conjugations, agreement. Lithuanian morphology is complex; double-check instrumental case, genitive plurals, and reflexive verbs.
3. **Punctuation audit** — em dash (---) banned everywhere (replace with comma, period, colon, or restructure). Quotation marks: lower-upper only.
4. **AI pattern elimination** — scan against `ai-patterns.md`. Remove formulaic openings, triad structures, transition stuffing, hedging language.
5. **Audience calibration** — verify language matches the target grade per `audience-calibration.md`. Grade 9 = simplest vocabulary. Grade 11-12 = technical precision.
6. **VLKK terminology** — use VLKK-approved Lithuanian IT terms as baseline. Teacher overrides from lt-mistakes.yaml take precedence.
7. **Final natural-read test** — read the full document aloud mentally. Every sentence must sound like a Lithuanian teacher wrote it, not a machine.

Fix all issues before proceeding to Step 7.

---

## Step 7 — Render

### 7.1 Em dash post-processing

The generation script MUST include a mechanical em dash removal step.
Add this helper and apply it to every text string before inserting into
the document:

```python
def no_em_dash(s):
    return s.replace('\u2014', ':')
```

LLMs naturally produce em dashes regardless of prompt instructions.
Automated code-level replacement is the only reliable fix.

### 7.2 Generate .docx

Use python-docx to build Practice_Task.docx following the formatting specs in `practice_task_format.md`:
- Page: A4, 1" margins
- Font: Arial throughout
- All heading styles, spacing, colors per the format reference
- Tables with navy header rows
- Checklist items with U+2610 character

### 7.3 Convert to PDF

```python
from docx2pdf import convert
convert('Practice_Task.docx', 'Practice_Task.pdf')
```

### 7.4 Verify

- Confirm Practice_Task.pdf exists
- Confirm file size is non-zero
- Spot-check: open and verify key content renders correctly

### 7.5 Clean up

Delete the intermediate Practice_Task.docx after successful PDF conversion.

---

## Abort / Degrade Conditions

| Condition | Action |
|-----------|--------|
| A lesson Assessment_Task missing | **Abort.** "Pirmiausia sugeneruokite atsiskaitomąjį darbą naudodami /assessment-task-gen." |
| No A lesson follows P in module | **Abort.** "Modulyje po šios P pamokos nėra A pamokos. Patikrinkite modulio struktūrą." |
| P lesson README missing or has no objectives | **Abort.** "P pamokos README nerastas arba neturi mokymosi tikslų." |
| A lesson Rubric missing | **Degrade.** Proceed with Assessment_Task alone. Warn teacher: "A pamokos Rubric.pdf nerastas. Generuojama tik pagal Assessment_Task." |
| No L/I Teacher_Plans in module | **Degrade.** Generate without common-mistakes context. Warn teacher: "Modulyje nerasta L/I pamokų planų. Generuojama be dažniausių klaidų konteksto." |
| No Theory_Packs available | **Degrade.** Omit KĄ DARYTI, JEI SUNKU section. Warn teacher: "Theory_Pack failų nerasta. Praleidžiamas skyrius 'Ką daryti, jei sunku'." |
| Module README missing | **Degrade.** Proceed without module context. Warn teacher: "Modulio README nerastas. Generuojama be modulio konteksto." |

---

## Source Priority

When sources disagree:

1. **P lesson README** — practice-specific scope, objectives, constraints
2. **Teacher-approved elevation strategy** (Step 3) — confirmed difficulty mapping
3. **A lesson Assessment_Task content** — the actual assessment items being elevated
4. **A lesson README + Rubric** — assessment objectives and grading criteria
5. **L/I lesson Teacher_Plans + Theory_Packs** — what was actually taught
6. **Skill reference docs** — practice task design standards and defaults

---

## Reference Files

Read before every generation:

### Skill references (relative to skill directory)
- `references/practice_task_format.md` — document structure, formatting specs, section order
- `references/difficulty_elevation_guide.md` — four elevation techniques with examples
- `references/practice_task_example.md` — complete exemplar with elevation map and student-facing content

### Cross-skill references
- `.claude/skills/assessment-task-gen/references/question_design.md` — MCQ rules, short answer rules, code task hierarchy, variant generation
- `.claude/skills/assessment-task-gen/references/testmoz_format.md` — Testmoz .xlsx import specification and pool structure
- `.claude/skills/student-task-gen/references/task_format.md` — student-facing document formatting baseline

### Lithuanian QA references
- `lt-qa/lt-mistakes.yaml` — growing mistake library
- `.claude/skills/lt-qa/references/ai-patterns.md` — AI text pattern detection rules
- `.claude/skills/lt-qa/references/audience-calibration.md` — grade-appropriate language calibration

### Repo context
- `tasks/lessons.md` — accumulated corrections (mandatory read)

---

## Constraints

1. **Lithuanian only** — all student-facing content in Lithuanian, formal "jus" address, no motivational fluff
2. **Em dash banned** — no em dashes anywhere. Replace with comma, period, colon, or restructure.
3. **Quotation marks** — lower-upper only
4. **No AI text patterns** — no formulaic openings, no triad structures, no transition stuffing, no hedging
5. **Plain UTF-8** — no `\u` unicode escapes except typographic quotes
6. **C++ only** — for all programming content (no Python, no JavaScript, no pseudocode)
7. **Approved software only** — Code::Blocks, Excel, Word, Inkscape, Canva, Google Classroom, Testmoz
8. **Grade scaffolding** — Grade 9 = max detail (zero prior experience), Grade 10 = moderate, Grade 11-12 = tool-specific
9. **No point values** — practice questions never show point values (this is preparation, not evaluation)
10. **Never regenerate in-place** — after structural changes (row insertions, deletions), always regenerate from scratch. In-place edits use stale row numbers and corrupt data silently.
