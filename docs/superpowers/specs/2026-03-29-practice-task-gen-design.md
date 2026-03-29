# practice-task-gen — Skill Design Spec

**Date:** 2026-03-29
**Skill:** `practice-task-gen`
**Location:** `.claude/skills/practice-task-gen/SKILL.md`
**Output:** `Practice_Task.pdf`

---

## 1. Scope & Trigger

**YAML frontmatter (for SKILL.md):**
```yaml
name: practice-task-gen
description: >
  Generate Practice_Task.pdf for P lessons in the IT Curriculum repo
  (PauliusPadrostis/IT_Curriculum). Use this skill whenever the teacher asks
  to create, generate, write, or build a practice task, practice set,
  praktikos užduotis, or P lesson practice materials.
```

**Trigger phrases:** create/generate a practice task, practice set, „praktikos užduotis", P lesson materials.

**Produces:** `Practice_Task.pdf` — student-facing practice document with questions cognitively harder than the upcoming A assessment. Uses the P lesson's own pedagogical structure (not A's test-paper format).

**Does NOT produce:** Answer keys (handled by `answer-key-gen` P mode), Teacher_Plan, Rubric.

**Hard gate:** The corresponding A lesson's `Assessment_Task` (`.xlsx` or `.pdf`) must exist. If missing, the skill stops and instructs the teacher to run `/assessment-task-gen` first.

**P-to-A pairing rule:** A P lesson maps to the **next A lesson** in the module's numerical sequence. If no A lesson follows the P lesson in the module, abort with: "Modulyje po šios P pamokos nėra A pamokos. Patikrinkite modulio struktūrą."

---

## 2. Pipeline

### Step 0 — Load references & lt-qa Phase 1 (PRE-GEN)

Read before any generation:
- `.claude/skills/practice-task-gen/references/practice_task_format.md`
- `.claude/skills/practice-task-gen/references/difficulty_elevation_guide.md`
- `.claude/skills/practice-task-gen/references/practice_task_example.md`
- `.claude/skills/assessment-task-gen/references/question_design.md`
- `.claude/skills/assessment-task-gen/references/testmoz_format.md`
- `.claude/skills/student-task-gen/references/task_format.md`
- `tasks/lessons.md`

**Run lt-qa Phase 1 (PRE-GEN)** before writing any Lithuanian text:
- Read `lt-qa/lt-mistakes.yaml` (mistake library)
- Read `references/ai-patterns.md` (AI text pattern elimination)
- Read `references/audience-calibration.md` (grade-level complexity rules)
- Determine target audience from P lesson README (grade level)

### Step 1 — Locate, gather context & gate

1. **Read P lesson README** (Priority 1): learning objectives, success criteria, duration, required files, readiness gates.
2. **Find the paired A lesson**: next A lesson in module sequence (by folder number).
3. **Gate check**: Look for `Assessment_Task.xlsx` or `Assessment_Task.pdf` in the A lesson folder. If neither exists → abort: "Pirmiausia sugeneruokite atsiskaitomąjį darbą naudodami /assessment-task-gen."
4. **Read A lesson README** (Priority 2): learning objectives, success criteria.
5. **Read module README**: sequence context, module-level objectives.
6. **Read all preceding L/I lesson Teacher_Plans + Theory_Packs** in module: common mistakes, teaching context.

### Step 2 — Analyze A assessment

Parse the Assessment_Task:
- **`.xlsx` (Testmoz):** Read with openpyxl. Walk rows: `POOL`/`END` markers define question boundaries, question rows have text in column A + points in column B, answer rows have `*` for correct answers. Extract per question: text, type (MCQ/fill-in/essay/matching), correct answer(s), distractors, point value, pool grouping. Use one representative variant per pool (ignore duplicates).
- **`.pdf`:** Read text content. Extract sections by heading structure. Identify question types from format cues (numbered items, code blocks, tables, rubric references). Cross-reference with Rubric.pdf if present for criteria and competency levels.

Also read A lesson Rubric if present (degrade gracefully if absent — use Assessment_Task alone for competency mapping).

Build a **content inventory:** table mapping each A question → topic → Bloom's level → competency tier → question type.

### Step 3 — Propose difficulty elevation strategy

Present the content inventory to the teacher with a proposed elevation plan per question/section:

| # | Topic | A Bloom's | A Tier | A Type | Proposed P Elevation |
|---|-------|-----------|--------|--------|---------------------|
| 1 | Example | Remember | I | MCQ | → Analyze (scenario-based) |

Elevation techniques (mixed as appropriate):
- **Bloom's +1** (e.g., Apply → Analyze)
- **Added complexity** (more plausible distractors, trickier edge cases, longer code)
- **Composite questions** (merge objectives that A tests separately)
- **Context shift** (same concept, unfamiliar scenario)

**Wait for teacher approval before generating.** Teacher can override any row.

### Step 4 — Generate Practice_Task

Build the document following the P lesson's own structure (Section 3 below). Apply approved difficulty elevation strategy. Scaffolding calibrated by grade level per standard rules (Grade 9 = maximum detail, Grade 10 = moderate, Grades 11-12 = tool-specific only).

Write all Lithuanian as **plain UTF-8**. No `\u` escapes for Lithuanian letters. Exception: Lithuanian typographic quotes use `\u201E` and `\u201C` because closing quote conflicts with JS string delimiters.

### Step 5 — Quality self-check

- **Coverage:** Every A learning objective represented in at least one practice question
- **Difficulty:** Every practice item ≥ corresponding A item difficulty
- **Grade appropriateness:** Language, scaffolding, content complexity match grade level
- **Time realism:** Total practice work fits within P lesson duration (from P lesson README, default ≤37 min if not specified)
- **Question quality:** MCQ rules from `question_design.md` (no answer-hinting, no length bias, plausible distractors, natural Lithuanian stems)

### Step 6 — Lithuanian QA Phase 2 (POST-GEN)

Run lt-qa Phase 2 POST-GEN checklist on all generated text:
1. Mistake library scan (compare against lt-mistakes.yaml)
2. Grammar & morphology check (case endings, verb forms, diphthongs)
3. Punctuation audit (em dash banned everywhere, „..." quotes only)
4. AI pattern elimination (no formulaic openings, no triads, no transition stuffing, no hedging)
5. Audience calibration (sentence length vs grade, vocabulary complexity)
6. VLKK terminology check (eliminate anglicisms unless teacher-stored override)
7. Final natural-read test (would a Lithuanian teacher stumble?)

### Step 7 — Render

1. Generate `.docx` using python-docx, following formatting specs from `practice_task_format.md`.
2. Convert to PDF: `python -c "from docx2pdf import convert; convert('Practice_Task.docx', 'Practice_Task.pdf')"`
3. Verify PDF exists and has non-zero size.
4. Delete intermediate `.docx`.

---

## 3. Practice_Task.pdf Document Structure

### Sections (exact order)

1. **HEADER**
   - Title: navy 18pt bold
   - Grade/module/type „P": grey 10pt
   - Same visual style as Student_Task

2. **KĄ PADARYSITE**
   - 2-3 sentences: what this practice covers
   - Explicit link to upcoming A lesson: "Šios užduotys padės pasiruošti atsiskaitomajam darbui apie [topic]"

3. **UŽDUOTYS**
   - Practice questions grouped by **topic or competency area** (not by question type)
   - Each question block:
     - Question number + topic label (student knows which area they're practicing)
     - The question itself (elevated difficulty per approved strategy)
   - **No point values shown** (not graded, removes test anxiety, keeps focus on learning)

4. **PATIKRINKITE SAVE**
   - Self-assessment checklist tied to A lesson's learning objectives
   - Format: "Ar galiu užtikrintai [objective]?" (not "did you answer all questions")
   - Students identify their weak areas

5. **KĄ DARYTI, JEI SUNKU**
   - Short guidance: which Theory_Pack/lesson to revisit per topic area
   - Concrete pointers (lesson number, Theory_Pack section), not generic "review your notes"
   - If no Theory_Pack exists for a topic, point to the L lesson Teacher_Plan topic instead

### Deliberately absent (vs A assessment)
- No time limit stated
- No point values on questions
- No submission instructions
- No formal conditions ("allowed tools" etc.)

### Present (that A wouldn't have)
- Topic labels on questions
- Self-assessment checklist
- Revision pointers

### Formatting
Same specs as Student_Task: Arial, A4, 1" margins, same heading/body/code block styles. Visual consistency across all student-facing materials. Full spec in `practice_task_format.md`.

### Length target
2-4 pages depending on assessment scope.

---

## 4. Abort & Degrade Conditions

| Condition | Action |
|-----------|--------|
| A lesson `Assessment_Task` (.xlsx or .pdf) missing | **Abort.** "Pirmiausia sugeneruokite atsiskaitomąjį darbą naudodami /assessment-task-gen." |
| No A lesson follows P lesson in module sequence | **Abort.** "Modulyje po šios P pamokos nėra A pamokos. Patikrinkite modulio struktūrą." |
| P lesson README missing or has no learning objectives | **Abort.** "P pamokos README nerastas arba neturi mokymosi tikslų." |
| A lesson Rubric missing | **Degrade.** Proceed using Assessment_Task alone for competency mapping. Warn teacher. |
| No L/I Teacher_Plans in module scope | **Degrade.** Generate without common-mistakes context. Warn teacher that elevation strategy may miss recurring student errors. |
| No Theory_Packs available | **Degrade.** Omit "KĄ DARYTI, JEI SUNKU" section. Warn teacher. |
| Module README missing | **Degrade.** Proceed without module-level sequence context. |

---

## 5. Source Priority

When sources disagree, prefer in this order:

1. **P lesson README** (defines scope, objectives, duration)
2. **Teacher-approved elevation strategy** (Step 3 overrides)
3. **A lesson Assessment_Task content** (ground truth for what's being tested)
4. **A lesson README + Rubric** (learning objectives, competency levels)
5. **L/I lesson Teacher_Plans + Theory_Packs** (common mistakes, teaching context)
6. **Skill reference docs** (formatting, question design rules)

---

## 6. Cross-Skill Integration

### answer-key-gen dependency

`answer-key-gen` P mode currently looks for `Student_Task.pdf` in P lesson folders. This skill produces `Practice_Task.pdf` instead.

**Required patch:** Update `answer-key-gen` SKILL.md to:
- In P mode, look for `Practice_Task.pdf` (not `Student_Task.pdf`)
- Update abort message to reference `practice-task-gen` (not `student-task-gen`)

### student-task-gen scope

`student-task-gen` was extended to support P lessons on 2026-03-28. With this new skill taking over P lessons:
- **Remove P lesson support from `student-task-gen`** (revert to L/I only)
- This avoids confusion about which skill to use for P lessons

### Workflow chain

The intended generation order for a complete module arc:
1. `assessment-task-gen` → generates A lesson Assessment_Task + Rubric
2. `practice-task-gen` → generates P lesson Practice_Task (reads A lesson output)
3. `answer-key-gen` A mode → generates A lesson Answer_Key (reads Assessment_Task)
4. `answer-key-gen` P mode → generates P lesson Answer_Key (reads Practice_Task)

---

## 7. Reference Files

### New (to create under `.claude/skills/practice-task-gen/references/`)

| File | Purpose |
|------|---------|
| `practice_task_format.md` | Exact `.docx` structure, section specs, formatting rules for Practice_Task.pdf |
| `difficulty_elevation_guide.md` | Catalogue of elevation techniques with examples per question type |
| `practice_task_example.md` | Exemplar Practice_Task for Safety module (Grade 9, 006_P) derived from 007_A |

### Reused from other skills (read at runtime)

| File | Source Skill |
|------|-------------|
| `.claude/skills/assessment-task-gen/references/question_design.md` | assessment-task-gen |
| `.claude/skills/assessment-task-gen/references/testmoz_format.md` | assessment-task-gen |
| `.claude/skills/student-task-gen/references/task_format.md` | student-task-gen |

### Loaded from repo root

| File | Purpose |
|------|---------|
| `lt-qa/lt-mistakes.yaml` | Lithuanian mistake library |
| `.claude/skills/lt-qa/references/ai-patterns.md` | AI text pattern elimination |
| `.claude/skills/lt-qa/references/audience-calibration.md` | Grade-level complexity rules |
| `tasks/lessons.md` | Accumulated corrections |

---

## 8. Constraints

Hard rules that apply to all generation:

1. **Lithuanian only** for student-facing content. Formal "jūs" address. No motivational fluff.
2. **Em dash (—) banned everywhere.** Replace with comma, period, colon, or restructure.
3. **Quotation marks: „..." only** (lower-upper).
4. **No AI text patterns.** No formulaic openings, no triads, no transition stuffing, no hedging.
5. **Plain UTF-8 for Lithuanian text.** No `\u` escapes except typographic quotes (`\u201E`, `\u201C`).
6. **C++ only** for programming tasks. No Python, no JavaScript.
7. **Approved software only:** Code::Blocks, Excel, Word, Inkscape, Canva, Google Classroom, Testmoz.
8. **Grade scaffolding:** Grade 9 = assume never touched a computer. Grade 10 = basic file skills. Grades 11-12 = tool-specific only.
9. **No point values** on practice questions (this is not a graded task).
10. **Never regenerate in-place after structural changes.** Always regenerate from scratch.

---

## 9. Design Decisions

| Decision | Rationale |
|----------|-----------|
| Standalone skill (not extending student-task-gen) | P practice tasks have a fundamentally different pipeline: A-lesson-dependent, difficulty elevation, different document structure |
| Hard gate on A lesson existing | No guessing/inference — clean dependency. Teacher runs assessment-task-gen first |
| Cognitively harder than A | Pedagogical strategy: overshoot on P so A feels manageable. Genuine preparation, not surface rehearsal |
| Own document structure (not mirroring A format) | P goal is deep cognitive preparation, not format familiarity. Scaffolding sections (self-check, revision pointers) serve learning |
| No point values shown | Removes test anxiety, keeps focus on learning rather than grade calculation |
| Questions grouped by topic, not type | Students can identify which areas they're strong/weak in |
| Teacher approval gate on elevation strategy | Teacher controls difficulty calibration. Elevation proposal is transparent and overridable |
| Answer key handled by answer-key-gen P mode | No duplication. answer-key-gen already has Study Key mode for P lessons |
| Output named Practice_Task.pdf (not Student_Task.pdf) | Distinct artifact name reflects distinct purpose. Requires answer-key-gen patch (Section 6) |
| Remove P support from student-task-gen | Single responsibility. Avoids ambiguity about which skill handles P lessons |
