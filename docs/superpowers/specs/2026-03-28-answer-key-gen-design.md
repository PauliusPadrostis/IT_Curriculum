# Answer Key Generator — Design Spec

**Date:** 2026-03-28
**Status:** Draft
**Scope:** New skill `answer-key-gen` that generates answer keys for A and P lessons across the IT Curriculum.

---

## Problem

A and P lessons produce assessment/practice tasks but have no answer keys. Without answer keys:
- A lessons: grading is inconsistent across graders (teacher, substitute, AI). Same answer gets different scores.
- P lessons: students complete practice tasks but have no way to self-check or learn from mistakes.

Answer keys are the final piece of the backward design chain: **assessment-task-gen -> student-task-gen (P) -> answer-key-gen**.

## What This Skill Does

Generates answer keys in two modes, auto-detected from lesson type:

| Mode | Lesson Type | Audience | Output | Purpose |
|------|------------|----------|--------|---------|
| **Grading Key** | A (Assessment) | Teacher | `Answer_Key.docx` | Exhaustive marking scheme for grading consistency |
| **Study Key** | P (Practice) | Student | `Answer_Key.pdf` | Teaching document that explains correct/incorrect answers |

## What This Skill Does NOT Do

- Does not generate assessments (use `assessment-task-gen`)
- Does not generate practice tasks (use `student-task-gen` with P type)
- Does not generate rubrics (produced by `assessment-task-gen`)
- Does not grade student work

---

## Dependency Chain

```
L/I lesson content (Teacher_Plans, Theory_Packs, Student_Tasks)
        |
        v
  assessment-task-gen
        |
        v
  student-task-gen (P type)
        |
        v
  answer-key-gen  <-- THIS SKILL
```

**Prerequisites:**
- A lessons: Assessment_Task (.xlsx or .pdf) + Rubric.pdf must exist in the lesson folder.
- P lessons: Student_Task.pdf must exist in the lesson folder. **Note:** student-task-gen P extension must be implemented before answer-key-gen can serve P lessons. Until then, only A mode is functional.

---

## Inputs

### A mode (Grading Key)

| Priority | Source | What to Extract |
|----------|--------|-----------------|
| 1 | **Assessment_Task.xlsx/.pdf** | Questions, point values, task structure |
| 2 | **Rubric.pdf** | Criteria, performance levels, point breakdown, conversion table |
| 3 | **L/I Teacher_Plans in scope** | Learning objectives, key concepts, common mistakes (for accept/reject decisions) |
| 4 | **L/I Theory_Packs in scope** | Content details (for alternative phrasing sourcing) |
| 5 | **lt-mistakes.yaml** | Lithuanian QA pre-generation |
| 6 | **tasks/lessons.md** | Accumulated corrections |

### P mode (Study Key)

| Priority | Source | What to Extract |
|----------|--------|-----------------|
| 1 | **Student_Task.pdf** | Questions, task structure |
| 2 | **L/I Teacher_Plans in scope** | Learning objectives, key concepts, common mistakes (for misconception explanations) |
| 3 | **L/I Theory_Packs in scope** | Actual content taught (for explanations and cross-references) |
| 4 | **Sibling A lesson Rubric.pdf** (if exists) | Point structure context for explanation depth calibration |
| 5 | **lt-mistakes.yaml** | Lithuanian QA pre-generation |
| 6 | **tasks/lessons.md** | Accumulated corrections |

**Key difference:** A mode requires Rubric.pdf (grading consistency depends on it). P mode does not require a Rubric (it is a teaching document, not a scoring document). If the sibling A lesson has a Rubric, the Study Key may reference it for calibrating explanation depth, but it is not a hard dependency.

### Mode auto-detection

Skill reads the lesson folder name, extracts the type letter:
- `NNN_A` -> Grading Key mode (teacher-facing .docx)
- `NNN_P` -> Study Key mode (student-facing .pdf)
- Any other type -> abort with message

### Scope rules

- **A lessons:** Same as assessment-task-gen: scope = L/I lessons since the previous A (or since module start if first A).
- **P lessons:** Scope matches the A lesson the P lesson prepares students for (the next A in sequence). Example: L1-L2-L3-P1-A1 -> P1 scope = L1-L3 (same as A1).

The skill reads scoped lessons for explanation sourcing, not for question generation.

---

## Grading Key Mode (A lessons)

**Audience:** Teacher and anyone else who may grade the work.
**Output:** `Answer_Key.docx` (editable, teacher may annotate after first grading session)
**Footer on every page:** "Vidinis dokumentas. Neskelbti mokiniams."

### Content per question type

**MCQ:**
- Correct answer (letter + full text)
- Why each distractor is wrong (one line each)
- Pre-emptive ruling for arguable distractors ("Nepriimtina, nes...")

**Short Answer / Scenario Analysis:**
- Model answer (full text)
- Acceptable alternative phrasings (numbered list, each marked: full credit / partial credit)
- Partial credit rules with explicit thresholds (e.g., "1 taškas, jei paminėti bent 2 aspektai; 0,5 taško, jei tik 1 aspektas")
- Reject list: common wrong answers with reasoning why zero credit
- Boundary cases: technically correct but incomplete answers with scoring decision

**Code Tasks (completion/writing):**
- One canonical solution in full with inline comments
- Alternative valid approaches: listed by name + key structural difference (not full code). Example: "Selection sort: naudoja vidinį ciklą minimumui rasti vietoj gretimų elementų keitimo"
- Accept criteria checklist: what makes any solution acceptable regardless of approach
- Reject criteria: what disqualifies (e.g., "std::sort naudojimas, hardcoded output")
- Partial credit breakdown per rubric criterion

### Design principle

Every answer entry must eliminate interpretation. Two graders reading the same student answer and the same key must assign the same score. No entry may say "panašus atsakymas priimtinas" without specifying what "panašus" means.

---

## Study Key Mode (P lessons)

**Audience:** Students, after attempting the practice task.
**Output:** `Answer_Key.pdf` (locked, student-facing)
**Visual identity:** Matches Student_Task formatting (same fonts, colors, navy #1F4E79 accent).
**No point values or grading info** in this document.

### Content per question type

**MCQ:**
- Correct answer highlighted
- Why it's correct: 2-3 sentences explaining the reasoning, referencing the concept
- Why each wrong option is wrong: 1-2 sentences per distractor explaining the misconception
- Optional cross-reference: "Jei pasirinkote B, peržiūrėkite..." pointer to Theory_Pack section

**Short Answer / Scenario Analysis:**
- Model answer in full
- Step-by-step reasoning: how to arrive at the answer (the thinking process, not just the result)
- Common mistakes section: "Dažna klaida: ..." with explanation why it's wrong
- Key vocabulary reinforced: terms the student should have used, with brief definitions

**Code Tasks:**
- Canonical solution in full with inline comments explaining each logical step
- 1 alternative valid approach shown as complete code when the approach is structurally different enough to be instructive (not every code task gets an alternative)
- "Kodėl tai veikia" paragraph after each solution: plain Lithuanian explanation of the algorithm logic
- Common bugs section: 2-3 typical student mistakes shown as broken code snippets with explanation of what goes wrong and how to fix it

### Design principle

The study key teaches. A student who got a question wrong should be able to read the key entry and understand not just WHAT the right answer is, but WHY it's right, WHY their likely answer was wrong, and HOW to think about similar questions in the future.

---

## Generation Pipeline

1. **Read references** — lt-mistakes.yaml, skill format spec, lessons.md
2. **Detect mode** — Parse lesson folder path for type letter (A or P)
3. **Read source files** — Assessment_Task or Student_Task + Rubric from the lesson folder
4. **Read teaching context** — L/I Teacher_Plans and Theory_Packs in scope (for sourcing explanations and misconception data)
5. **Generate content** — Question by question, applying mode-specific content rules
6. **Validity self-check** — See checklist below
7. **Lithuanian QA** — lt-qa Phase 1 (PRE-GEN) before writing, Phase 2 (POST-GEN) after
8. **Render** — docx skill for both modes. A mode: save as .docx. P mode: convert to PDF via docx2pdf, delete intermediate .docx
9. **Verify** — Open generated file, confirm key content at known positions

### No proposal gate

Unlike assessment-task-gen, the answer key format is deterministic (dictated by the source assessment structure). No teacher approval step needed before generation. The skill reads the source and generates directly.

### Validity self-check

| Check | Rule |
|-------|------|
| **Coverage** | Every question/task in the source file has a matching answer key entry |
| **Point alignment** | Point values in key match Rubric exactly |
| **No extras** | No answers for questions that don't exist in the source |
| **Content grounding** | Explanations reference content actually taught in L/I lessons |
| **Mode consistency** | A mode has no student-facing language; P mode has no grading language |
| **Code compilation** | All C++ code solutions must be compiled and verified before inclusion. Warn teacher if compilation cannot be performed. |
| **Alternative coverage** | For short answer/scenario: at least 2 acceptable alternative phrasings listed |
| **Reject coverage** | For short answer/scenario: at least 2 common wrong answers listed |
| **Em dash ban** | No em dashes anywhere |
| **Language** | Lithuanian, formal "jūs" in P mode student text |

---

## Abort / Degrade Conditions

| Condition | Action |
|-----------|--------|
| No Assessment_Task in A lesson folder | **Stop.** "Pirma sugeneruokite vertinimo užduotį." |
| No Rubric.pdf in A lesson folder | **Stop.** "Nėra vertinimo kriterijų failo." |
| No Student_Task in P lesson folder | **Stop.** "Pirma sugeneruokite praktikos užduotį (student-task-gen su P tipo palaikymu)." |
| Lesson type is not A or P | **Stop.** "Atsakymų raktai generuojami tik A ir P pamokoms." |
| Some L/I Teacher_Plans missing | **Warn and proceed.** Flag which explanations may lack depth due to missing source material. |
| No Theory_Packs available | **Warn and proceed.** Study Key cross-references will be omitted. |

---

## Reference Files

**Note on paths:** All `references/` paths below are relative to the skill directory (`answer-key-gen/`). External references (lt-mistakes.yaml, tasks/lessons.md, assessment-task-gen refs) use repo-root or absolute paths.

### New files (to create)

| File | Purpose |
|------|---------|
| `references/answer_key_format.md` | Document structure and formatting specs for both modes (see minimum contents below) |
| `references/marking_scheme_guide.md` | Rules for accept/reject/partial credit decisions, boundary case handling, code solution evaluation |
| `references/exemplars/grading_key_safety_example.md` | A-mode key matching the theory_safety_example assessment |
| `references/exemplars/study_key_safety_example.md` | P-mode key for the same content (shows different treatment of same questions) |
| `references/exemplars/grading_key_programming_example.md` | A-mode key for code tasks with canonical + alternatives + accept/reject |

### answer_key_format.md minimum contents

This file must be created before implementation begins. It must cover:

**Grading Key (.docx) format:**
- Heading hierarchy: H1 = document title, H2 = question type section, H3 = individual question
- Table format for accept/reject lists: columns for Answer Variant, Credit, Reasoning
- Footer format: "Vidinis dokumentas. Neskelbti mokiniams." on every page
- Code block formatting: Consolas 10pt, background #F2F2F2
- No visual identity match required (teacher-internal document)

**Study Key (.pdf) format:**
- Matches Student_Task visual identity: Arial, navy #1F4E79 accent, same heading/body sizes
- Header: label line + document title + metadata (same pattern as Student_Task)
- Correct answer highlight style: bold or colored text (to be specified)
- Misconception callout box style: background color, border
- Code block formatting: same as Student_Task (Consolas 10pt, #F2F2F2 background)
- "Kodėl tai veikia" section styling
- Common bugs section styling (broken code + explanation)

### Reused from assessment-task-gen (read at runtime, not copied)

| File | Purpose |
|------|---------|
| `assessment-task-gen/references/grading_policy.md` | Percentage scale, point conversion |
| `assessment-task-gen/references/cs_assessment_progression.md` | Grade-appropriate expectations |

### Skill location

Stored in both:
- `~/.claude/skills/answer-key-gen/` (global, always loads)
- `.claude/skills/answer-key-gen/` (repo, version-controlled)

Both locations kept in sync.

---

## Output Summary

| Lesson Type | File Generated | Format | Audience | Editable |
|-------------|---------------|--------|----------|----------|
| A | Answer_Key.docx | .docx | Teacher | Yes |
| P | Answer_Key.pdf | .pdf | Student | No |

---

## Source Priority

When sources disagree:

1. **Rubric** — point values and criteria are authoritative
2. **Assessment_Task / Student_Task** — question content as written
3. **L/I Teacher_Plans** — learning objectives, common mistakes
4. **L/I Theory_Packs** — content details for explanations
5. **Skill reference docs** — format and marking scheme rules
6. **cs_assessment_progression.md** — grade-appropriate defaults (lowest priority)
