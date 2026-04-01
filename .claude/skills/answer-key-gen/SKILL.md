---
name: answer-key-gen
description: >
  Generate answer keys for A and P lessons in the IT Curriculum repo
  (PauliusPadrostis/IT_Curriculum). Use this skill whenever the teacher asks to
  create, generate, write, or build an answer key, marking scheme, grading key,
  atsakymų raktas, or vertinimo schema. Also triggers on: "sugeneruok
  atsakymų raktą", "sukurk answer key", "generate answer key", "paruošk
  atsakymus", "sukurk vertinimo schemą".
  Two modes auto-detected: A lessons produce teacher-facing Grading Key (.docx),
  P lessons produce student-facing Study Key (.docx).
  Only generates for A and P lesson types. Do NOT use for assessments (use
  assessment-task-gen), student tasks (use student-task-gen), theory packs (use
  theory-pack-gen), or visual aids (use visual-aid-gen).
---

# Answer Key Generator

Generates answer keys for A (Assessment) and P (Practice) lessons in the IT
Curriculum repo. Two modes auto-detected from lesson folder name:

| Mode | Lesson Type | Audience | Output | Purpose |
|------|------------|----------|--------|---------|
| **Grading Key** | A | Teacher | `Answer_Key.docx` | Exhaustive marking scheme for grading consistency |
| **Study Key** | P | Student | `Answer_Key.docx` | Teaching document explaining correct/incorrect answers |

All generated content is in **Lithuanian**. Respond to the teacher in whatever
language they use.

**Design principle:** The answer key is derived from existing assessment/task
files. It does not create new questions. Read the source, answer every question,
follow mode-specific rules.

---

## Step 0 — Read References

**Before generating any answer key, always read these files:**

1. `references/answer_key_format.md` — document structure for both modes
2. `references/marking_scheme_guide.md` — accept/reject/partial credit rules
3. Relevant exemplar from `references/exemplars/`:
   - Theory/safety assessments: `grading_key_safety_example.md` (A mode) or `study_key_safety_example.md` (P mode)
   - Programming assessments: `grading_key_programming_example.md` (A mode)
4. `.claude/skills/assessment-task-gen/references/grading_policy.md` — percentage scale (cross-skill read)
5. `.claude/skills/assessment-task-gen/references/cs_assessment_progression.md` — grade expectations (cross-skill read)

**Lithuanian mistake prevention (mandatory):**
6. Read `_references/lt-mistakes.yaml` — CRITICAL section only (stop at "FULL LIBRARY" marker).
   Keep these patterns in mind while generating. Do not produce any of the listed "wrong" forms.

**Lessons learned (mandatory):**
7. Read `tasks/lessons.md` from the repo root. Follow every rule in it.

**Note on paths:** Items 1-3 use paths relative to this skill's directory (`.claude/skills/answer-key-gen/`). Items 4-5 use sibling skill paths. Items 6-7 use repo-root paths.

---

## Step 1 — Gather Context & Detect Mode

### Path parsing

Extract from the lesson folder path:
- Grade (Grade_9, Grade_10, etc.)
- Semester
- Module name
- Lesson number and type letter

### Mode detection

- `NNN_A` → Grading Key mode (teacher-facing .docx)
- `NNN_P` → Study Key mode (student-facing .docx)
- Any other type → abort: "Atsakymų raktai generuojami tik A ir P pamokoms."

### Input files (A mode)

Read from lesson folder:
1. Assessment_Task (.xlsx or .pdf) — questions and structure
2. Rubric.docx — criteria, point breakdown, conversion table

### Input files (P mode)

Read from lesson folder:
1. Practice_Task.docx — questions and structure
2. Sibling A lesson Rubric.docx (if exists) — optional, for explanation depth calibration

### Teaching context (both modes)

Read L/I Teacher_Plans and Theory_Packs in scope:
- **A scope:** L/I lessons since previous A (or since module start if first A)
- **P scope:** Same as the next A lesson in sequence (the A that P prepares for)

Source from these: learning objectives, key concepts, common mistakes (for explanations and reject lists).

---

## Step 2 — Extract Questions

Parse the source file question by question:
- For .xlsx (Testmoz): read pools, extract one representative question per pool (first variant). The answer key covers the question concept, not each individual variant.
- For .pdf: extract questions in order.

Build a question inventory:

| # | Question text (summary) | Type | Points | Competency Level |
|---|------------------------|------|--------|-----------------|

---

## Step 3 — Generate Answer Content

### A mode (Grading Key)

For each question, apply `marking_scheme_guide.md` rules:

**MCQ:**
- Correct answer (letter + full text)
- Accept/reject table with all options
- Why each distractor is wrong (misconception)
- Pre-emptive ruling for arguable distractors ("Nepriimtina, nes...")

**Short Answer / Scenario Analysis:**
- Model answer (full text)
- Acceptable alternative phrasings (minimum 2, each with credit level)
- Partial credit rules with explicit thresholds
- Reject list (minimum 2 common wrong answers with reasoning)
- Boundary cases with scoring decision

**Code Tasks:**
- Canonical solution in full with inline comments (Lithuanian, explaining logic)
- Alternative valid approaches listed by name + key structural difference
- Accept criteria checklist
- Reject criteria (hardcoded output, banned library functions, non-compiling code)
- Partial credit breakdown per rubric criterion

**Practical Tool Tasks:**
- Per-criterion scoring guide aligned with Rubric levels
- Accept/reject examples per criterion

Source explanations from L/I Teacher_Plans (common mistakes → reject list) and Theory_Packs (content details → alternative phrasings).

### P mode (Study Key)

For each question:

**MCQ:**
- Correct answer highlighted (bold + green)
- Why it's correct: 2-3 sentences explaining the reasoning
- Why each wrong option is wrong: 1-2 sentences per distractor explaining the misconception
- Optional: "Jei pasirinkote B, peržiūrėkite..." cross-reference to the relevant topic in the teorijos santrauka (never use file category names like "Theory_Pack" in student-facing text)

**Short Answer / Scenario Analysis:**
- Model answer in full
- Step-by-step reasoning: how to arrive at the answer
- "Dažna klaida:" callout box with common mistake + explanation
- Key vocabulary reinforced with brief definitions

**Code Tasks:**
- Canonical solution with inline comments explaining each logical step
- 1 alternative valid approach as complete code (only when structurally different enough to be instructive)
- "Kodėl tai veikia:" explanation paragraph in plain Lithuanian
- Common bugs section: 2-3 typical mistakes as broken code snippets with explanation

**Practical Tool Tasks:**
- Model response demonstrating the expected approach
- Methodology walkthrough
- Common oversights

Tone: teaching, not judging. Formal "jūs". No point values or grading language.

---

## Step 4 — Validity Self-Check

| Check | Rule |
|-------|------|
| **Coverage** | Every question/task in the source file has a matching answer key entry |
| **Point alignment** | Point values in key match Rubric exactly (A mode only) |
| **No extras** | No answers for questions that don't exist in the source |
| **Content grounding** | Explanations reference content actually taught in L/I lessons |
| **Mode consistency** | A mode has no student-facing language; P mode has no grading language |
| **Code compilation** | All C++ code solutions must be compiled and verified before inclusion. Warn teacher if compilation cannot be performed. |
| **Alternative coverage** | For short answer/scenario: at least 2 acceptable alternative phrasings listed (A mode) |
| **Reject coverage** | For short answer/scenario: at least 2 common wrong answers listed (A mode) |
| **Em dash ban** | No em dashes (—) anywhere |
| **Language** | Lithuanian, formal "jūs" in P mode student text |

---

## Step 4b — Cross-file Coherence Check

After generating answer content and passing the validity self-check,
verify alignment between the answer key and its source document before
proceeding to Lithuanian QA.

### What to check (A mode, Grading Key):

1. **Answer-to-question alignment:**
   - Re-read Assessment_Task (.xlsx or .pdf). Verify that every answer
     key entry references the correct question number and that the model
     answer actually answers the question as written. If the question was
     updated after answer key generation started → the answer key must
     reflect the current question text.

2. **Rubric point alignment:**
   - Re-read Rubric.docx. Verify that point values in the answer key match
     the rubric exactly. Partial credit thresholds must be consistent
     between the two documents.

3. **Terminology alignment with Theory_Pack (if it exists on disk):**
   - Read Theory_Pack.docx from L/I lessons in scope. Verify that
     explanations and model answers use the same terminology as the
     Theory_Pack. If the answer key uses a term differently → use the
     Theory_Pack definition (authoritative for terminology).

### What to check (P mode, Study Key):

1. **Answer-to-question alignment:**
   - Re-read Practice_Task.docx. Verify that every study key entry
     references the correct question number and that the model answer
     actually answers the question as written. If Practice_Task was
     updated after answer key generation started → the answer key must
     reflect the current question text.

2. **Explanation grounding:**
   - Verify that "Kodėl tai veikia" explanations and "Dažna klaida"
     callouts reference content actually taught in L/I lessons. Do not
     explain using concepts that were never covered in scope.

3. **Terminology alignment with Theory_Pack (if it exists on disk):**
   - Same rule as A mode: Theory_Pack definitions are authoritative.

### On mismatch:

- Answer key adapts to match the source document (Assessment_Task or
  Practice_Task) and Theory_Pack (authoritative for definitions).
- Flag unresolvable contradictions to the teacher.

---

## Step 5 — Lithuanian QA

**Lithuanian POST-GEN verification (mandatory):**
Read the sidecar `_text.txt` file. Scan its content against the FULL `_references/lt-mistakes.yaml`
(both CRITICAL and FULL LIBRARY sections). Also check for:
- Condition-last word order (jei clause should come first, not last)
- Register consistency (formal "jūs" throughout, no "tu" slips)
- AI text patterns (formulaic openings, triad structures, transition stuffing)
Fix any matches found, then update the sidecar.

Fix all issues before rendering.

---

## Step 6 — Render Document

### Em dash post-processing

The generation script MUST include a mechanical em dash removal step.
Add this helper and apply it to every text string before inserting into
the document:

```javascript
const noEmDash = (s) => s.replace(/\u2014/g, ':');
```

LLMs naturally produce em dashes regardless of prompt instructions.
Automated code-level replacement is the only reliable fix.

### Mechanical Em Dash Strip (mandatory, non-skippable)

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

This step is SEPARATE from the noEmDash helper in the generation script.
Both layers must exist. This step must run even if the generation script claims to
have handled em dashes.

### Document rendering

Use the docx skill to create Answer_Key.docx following `answer_key_format.md` specs.

- **A mode:** Save as .docx in lesson folder. Done.
- **P mode:** Save Answer_Key.docx in lesson folder.

Verify: open generated file, confirm key content at known positions (first question answer, last question answer, footer text for A mode).

---

## Step 7 — Constraints

- MUST read source assessment/task file before generating (never generate from memory)
- MUST include footer "Vidinis dokumentas. Neskelbti mokiniams." on every page of A-mode output
- MUST NOT include point values or grading language in P-mode output
- MUST NOT include em dashes (—) anywhere
- MUST compile all C++ code solutions before including them
- MUST run lt-qa POST-GEN on final text
- MUST follow every rule in tasks/lessons.md

---

## Abort / Degrade Conditions

| Condition | Action |
|-----------|--------|
| No Assessment_Task in A lesson folder | **Stop.** "Pirma sugeneruokite vertinimo užduotį." |
| No Rubric.docx in A lesson folder | **Stop.** "Nėra vertinimo kriterijų failo." |
| No Practice_Task in P lesson folder | **Stop.** "Pirma sugeneruokite praktikos užduotį naudodami /practice-task-gen." |
| Lesson type is not A or P | **Stop.** "Atsakymų raktai generuojami tik A ir P pamokoms." |
| Some L/I Teacher_Plans missing | **Warn and proceed.** Flag which explanations may lack depth due to missing source material. |
| No Theory_Packs available | **Warn and proceed.** Study Key cross-references will be omitted. |

---

## Source Priority

When sources disagree:

1. **Rubric** — point values and criteria are authoritative
2. **Assessment_Task / Practice_Task** — question content as written
3. **L/I Teacher_Plans** — learning objectives, common mistakes
4. **L/I Theory_Packs** — content details for explanations
5. **Skill reference docs** — format and marking scheme rules
6. **cs_assessment_progression.md** — grade-appropriate defaults (lowest priority)

---

## Reference Files

Read before every generation:

### Core references
- `references/answer_key_format.md` — Document structure and formatting for Grading Key and Study Key
- `references/marking_scheme_guide.md` — Accept/reject/partial credit rules, code evaluation criteria

### Exemplars
- `references/exemplars/grading_key_safety_example.md` — A-mode: theory assessment with MCQ + short answer + scenario + practical
- `references/exemplars/study_key_safety_example.md` — P-mode: same questions, teaching treatment
- `references/exemplars/grading_key_programming_example.md` — A-mode: code completion tasks with canonical + alternatives
