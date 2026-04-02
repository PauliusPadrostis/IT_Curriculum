---
name: practice-task-gen
description: >
  Generate Practice_Task.docx for P lessons in the IT Curriculum repo
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

Generates Practice_Task.docx for P (Practice) lessons in the IT Curriculum
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

## Step 0 — Load References & Lithuanian Mistake Prevention

**Before generating any practice task, always read these files:**

### Skill references

1. `references/practice_task_format.md` — document structure and formatting specs
2. `references/difficulty_elevation_guide.md` — A-to-P elevation techniques
3. `references/practice_task_example.md` — complete exemplar with elevation map

### Cross-skill references

4. `.claude/skills/assessment-task-gen/references/question_design.md` — MCQ rules, short answer rules, code task hierarchy
5. `.claude/skills/assessment-task-gen/references/testmoz_format.md` — Testmoz .xlsx import specification and pool structure
6. `.claude/skills/student-task-gen/references/task_format.md` — student-facing document formatting baseline

### Lithuanian mistake prevention (mandatory)

7. Read `_references/lt-mistakes.yaml` — CRITICAL section only (stop at "FULL LIBRARY" marker).
   Keep these patterns in mind while generating. Do not produce any of the listed "wrong" forms.
8. Determine target audience from the P lesson README (grade, prior knowledge assumptions)

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

### .docx format

Read the document text. Extract sections by headings. Identify question types from format cues (lettered options = MCQ, "Atsakykite N sakiniais" = short answer, scenario descriptions = scenario, code blocks = code task). Cross-reference Rubric.docx if present in the A lesson folder.

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
[centered, grey #808080, 10pt] {Grade} klase  *  {Module name}
[navy #1F4E79 horizontal rule, 1pt]
```

#### 2. KA PADARYSITE

2-3 sentences linking this practice to the upcoming assessment. Explains what the student is preparing for. References topics by name (e.g., "ergonomikos, privatumo, internetinių grėsmių pamokų"), never by lesson codes or file category names.

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
| {Topic} | Teorijos santrauka: {section reference} |

### Grade scaffolding

- **Grade 9:** maximum detail, assume zero prior computer experience. Contexts must not introduce unfamiliar tools or technical concepts.
- **Grade 10:** moderate detail, basic file skills assumed.
- **Grades 11-12:** tool-specific only, higher autonomy expected.

### Text encoding

Plain UTF-8 for all Lithuanian text. No `\u` unicode escapes. Use straight double quotes "..." only.

---

### Teacher_Plan coherence warning

After generating Practice_Task, check if the paired P lesson's Teacher_Plan.docx
exists. If it does, warn the teacher:

"Practice_Task.docx sukurtas. Teacher_Plan.docx šioje pamokoje jau egzistuoja,
bet gali neatspindėti Practice_Task turinio. Rekomenduojama peržiūrėti ir
atnaujinti Teacher_Plan, kad jis nukreiptų mokinius į Practice_Task.docx."

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
| **No option hints** | MCQ answer options must not contain parenthetical explanations or evaluative hints such as "(stipriausias)" or "(atsitiktiniai simboliai)". Options are shown raw; reasoning belongs in the answer key, not in the task. |

---

## Step 5b — Cross-file Coherence Check

After generating the Practice_Task content and passing the quality self-check,
verify alignment with sibling lesson files before proceeding to Lithuanian QA.

### What to check:

1. **No verbatim leakage from Assessment_Task:**
   - Compare every practice question against the paired A lesson's
     Assessment_Task (already read in Step 2). No practice question may
     reuse verbatim question stems, scenarios, or answer options from the
     assessment. Elevated versions must change wording, context, or structure,
     not just swap numbers.
   - If a practice question is too close to its A counterpart (same stem
     with only cosmetic changes) → rewrite the practice question to use a
     different scenario or formulation while preserving the elevated
     cognitive demand.

2. **Terminology alignment with Theory_Pack (if it exists on disk):**
   - Read Theory_Pack.docx from any L/I lesson in the P lesson's scope.
   - Every technical term used in practice questions must match the
     Theory_Pack's definition and spelling. If a practice question uses a
     term differently from the Theory_Pack → use the Theory_Pack definition
     (it is the authoritative reference for terminology).
   - If a practice question introduces a term not covered in any
     Theory_Pack → flag it to the teacher.

3. **Objective coverage vs. L/I lesson READMEs:**
   - Verify that practice questions collectively cover the learning
     objectives from the L/I lessons in scope. If an objective has no
     corresponding practice question → flag the gap.

### On mismatch:

- Practice_Task adapts to match Theory_Pack (authoritative for definitions)
  and Assessment_Task (authoritative for what must NOT be duplicated).
- Flag unresolvable contradictions to the teacher.

---

## Step 6 — Lithuanian POST-GEN Verification

**Before running QA, write a plain-text sidecar:** Write all Lithuanian text
to `Practice_Task_text.txt` in the same lesson folder. Collect every paragraph,
heading, table cell, checklist item, and hint text as plain UTF-8, one
paragraph per line. Delete the sidecar after POST-GEN passes.

**Lithuanian POST-GEN verification (mandatory):**
Read the sidecar `_text.txt` file. Scan its content against the FULL `_references/lt-mistakes.yaml`
(both CRITICAL and FULL LIBRARY sections). Also check for:
- Condition-last word order (jei clause should come first, not last)
- Register consistency (formal "jūs" throughout, no "tu" slips)
- AI text patterns (formulaic openings, triad structures, transition stuffing)
Fix any matches found, then update the sidecar.

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

### 7b — Mechanical Em Dash Strip (mandatory, non-skippable)

After the .docx file is saved to disk and BEFORE any QA or sidecar steps,
run this standalone post-processing step. This is NOT part of the generation
script — it runs on the saved .docx file as a separate operation.

```python
import zipfile, os, shutil, tempfile

def strip_em_dashes_from_docx(docx_path):
    """Strip all em dashes from a .docx file. Runs on the saved file."""
    tmpdir = tempfile.mkdtemp()
    with zipfile.ZipFile(docx_path, 'r') as z:
        z.extractall(tmpdir)
    docxml = os.path.join(tmpdir, 'word', 'document.xml')
    with open(docxml, 'rb') as f:
        data = f.read()
    em = '\u2014'.encode('utf-8')
    count = data.count(em)
    if count > 0:
        data = data.replace(em, ':'.encode('utf-8'))
        with open(docxml, 'wb') as f:
            f.write(data)
        outfile = docx_path + '.tmp'
        with zipfile.ZipFile(outfile, 'w', zipfile.ZIP_DEFLATED) as zout:
            for root, dirs, files in os.walk(tmpdir):
                for fn in files:
                    fpath = os.path.join(root, fn)
                    arcname = os.path.relpath(fpath, tmpdir)
                    zout.write(fpath, arcname)
        os.remove(docx_path)
        shutil.move(outfile, docx_path)
    shutil.rmtree(tmpdir)
    return count
```

This step is SEPARATE from the no_em_dash helper in the generation script.
Both layers must exist. This step must run even if the generation script claims to
have handled em dashes.

### 7.2 Generate .docx

Use python-docx to build Practice_Task.docx following the formatting specs in `practice_task_format.md`:
- Page: A4, 1" margins
- Font: Arial throughout
- All heading styles, spacing, colors per the format reference
- Tables with navy header rows
- Checklist items with U+2610 character

### 7.3 Verify

- Confirm Practice_Task.docx exists
- Confirm file size is non-zero
- Spot-check: open and verify key content renders correctly

---

## Abort / Degrade Conditions

| Condition | Action |
|-----------|--------|
| A lesson Assessment_Task missing | **Abort.** "Pirmiausia sugeneruokite atsiskaitomąjį darbą naudodami /assessment-task-gen." |
| No A lesson follows P in module | **Abort.** "Modulyje po šios P pamokos nėra A pamokos. Patikrinkite modulio struktūrą." |
| P lesson README missing or has no objectives | **Abort.** "P pamokos README nerastas arba neturi mokymosi tikslų." |
| A lesson Rubric missing | **Degrade.** Proceed with Assessment_Task alone. Warn teacher: "A pamokos Rubric.docx nerastas. Generuojama tik pagal Assessment_Task." |
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
- `_references/lt-mistakes.yaml` (CRITICAL section for PRE-GEN, full file for POST-GEN)

### Repo context
- `tasks/lessons.md` — accumulated corrections (mandatory read)

---

## Constraints

1. **Lithuanian only** — all student-facing content in Lithuanian, formal "jus" address, no motivational fluff
2. **Em dash banned** — no em dashes anywhere. Replace with comma, period, colon, or restructure.
3. **Quotation marks** — straight double quotes "..." only
4. **No AI text patterns** — no formulaic openings, no triad structures, no transition stuffing, no hedging
5. **Plain UTF-8** — no `\u` unicode escapes
6. **C++ only** — for all programming content (no Python, no JavaScript, no pseudocode)
7. **Approved software only** — Code::Blocks, Excel, Word, Inkscape, Canva, Google Classroom, Testmoz
8. **Grade scaffolding** — Grade 9 = max detail (zero prior experience), Grade 10 = moderate, Grade 11-12 = tool-specific
9. **No point values** — practice questions never show point values (this is preparation, not evaluation)
10. **Never regenerate in-place** — after structural changes (row insertions, deletions), always regenerate from scratch. In-place edits use stale row numbers and corrupt data silently.
