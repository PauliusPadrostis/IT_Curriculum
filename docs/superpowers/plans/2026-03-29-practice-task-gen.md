# practice-task-gen Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a standalone skill that generates `Practice_Task.pdf` for P lessons, with questions cognitively harder than the paired A assessment.

**Architecture:** New skill at `.claude/skills/practice-task-gen/` with SKILL.md + 3 reference files. Two sibling skills patched for cross-skill integration (answer-key-gen, student-task-gen). Skill follows the same conventions as assessment-task-gen and answer-key-gen.

**Tech Stack:** Markdown (SKILL.md + references), python-docx (rendering), docx2pdf (PDF conversion), openpyxl (Testmoz parsing)

**Spec:** `docs/superpowers/specs/2026-03-29-practice-task-gen-design.md`

---

### Task 1: Create reference file — `practice_task_format.md`

**Files:**
- Create: `.claude/skills/practice-task-gen/references/practice_task_format.md`

This defines the exact .docx structure for Practice_Task.pdf. Follows the pattern of `student-task-gen/references/task_format.md` and `assessment-task-gen/references/assessment_format.md`.

- [ ] **Step 1: Read the sibling format references for patterns**

Read these files to extract shared formatting constants (page size, margins, fonts, colors, heading styles):
- `.claude/skills/student-task-gen/references/task_format.md`
- `.claude/skills/assessment-task-gen/references/assessment_format.md`

- [ ] **Step 2: Write `practice_task_format.md`**

Create `.claude/skills/practice-task-gen/references/practice_task_format.md` with:

**Content to include:**
1. **Design philosophy:** Self-sufficient practice document. Student can work through it independently. Grouped by topic for self-diagnosis. No grading pressure.
2. **Document structure (exact section order):**
   - HEADER: title (navy #1F4E79, 18pt bold, centered), subtitle line (grey #666666, 10pt: grade, module, type „P")
   - KĄ PADARYSITE: 2-3 sentences linking to upcoming A lesson. H2 heading.
   - UŽDUOTYS: Questions grouped by topic. H2 for section, H3 for each topic group ("1. Ergonomika", "2. Duomenų sauga", etc.). Questions numbered within each group. No point values anywhere.
   - PATIKRINKITE SAVE: Self-assessment checklist. ☐ items in "Ar galiu užtikrintai [verb]?" format. H2 heading.
   - KĄ DARYTI, JEI SUNKU: Revision pointers per topic. Table format: Topic | Kur peržiūrėti (lesson number + Theory_Pack section). H2 heading.
3. **Formatting specs** (identical to Student_Task):
   - Page: A4, 1" margins (2.54 cm), content width 9026 DXA
   - Font: Arial throughout
   - Body: 11pt, #333333, line spacing 1.15, spacing after 80
   - H1: 18pt bold, #1F4E79, centered (task title only)
   - H2: 13pt bold, #1F4E79 (section headings: KĄ PADARYSITE, UŽDUOTYS, etc.)
   - H3: 11.5pt bold, #2E75B6 (topic group headings within UŽDUOTYS)
   - Code blocks: Consolas 10pt, background #F2F2F2, 4pt padding
   - Tables: DXA widths, cell margins 60/100, border #BFBFBF, header row white on #1F4E79
   - Checklist: ☐ (U+2610) + space
   - MCQ options: lettered (A, B, C, D), indented, no bullet
4. **Question formatting by type:**
   - MCQ: Question text (bold number + topic label), options lettered A-D, no correct answer marking
   - Short answer / scenario: Question text + "Atsakykite 1-2 sakiniais" or similar scope hint
   - Code tasks: Question text + code block (Consolas, grey background), instruction below
   - Practical tasks: Task description + numbered requirements
5. **Length target:** 2-4 pages
6. **.docx generation notes:** Use python-docx. Convert to PDF via docx2pdf. Delete intermediate .docx. Verify PDF non-zero size.

- [ ] **Step 3: Verify the file is well-formed**

Read back the file, confirm all sections present, no formatting spec contradictions with sibling files.

- [ ] **Step 4: Commit**

```bash
git add .claude/skills/practice-task-gen/references/practice_task_format.md
git commit -m "feat(practice-task-gen): add practice task format reference"
```

---

### Task 2: Create reference file — `difficulty_elevation_guide.md`

**Files:**
- Create: `.claude/skills/practice-task-gen/references/difficulty_elevation_guide.md`

- [ ] **Step 1: Read question_design.md for question type taxonomy**

Read `.claude/skills/assessment-task-gen/references/question_design.md` to understand the question types and Bloom's levels the elevation guide must cover.

- [ ] **Step 2: Write `difficulty_elevation_guide.md`**

Create `.claude/skills/practice-task-gen/references/difficulty_elevation_guide.md` with:

**Content to include:**

1. **Elevation principles:**
   - Every P question must be ≥ difficulty of its paired A question
   - Elevation is per-question, not blanket — teacher approves each row
   - Mix techniques for variety; don't apply same technique to every question
   - Elevated questions must still be answerable by a prepared student — harder, not unfair

2. **Technique catalogue (with examples per question type):**

   **Technique 1: Bloom's +1**
   - Remember → Understand: "Kas yra..." → "Paaiškinkite, kodėl..."
   - Understand → Apply: "Paaiškinkite..." → "Pritaikykite šią taisyklę situacijoje..."
   - Apply → Analyze: "Pritaikykite..." → "Palyginkite du metodus ir nustatykite..."
   - Analyze → Evaluate: "Palyginkite..." → "Įvertinkite, kuris sprendimas geresnis, ir pagrįskite..."
   - Include MCQ, short answer, and code examples for each transition

   **Technique 2: Added complexity**
   - MCQ: Add a 4th plausible distractor (if A had 3). Make distractors closer to correct answer. Add "partially correct" options that test precise understanding.
   - Short answer: Require justification ("nes..."), not just the fact
   - Code: Add an edge case the student must handle. Increase variable count. Add a subtle bug to find.
   - Practical: Add a constraint (time, format, tool limitation)

   **Technique 3: Composite questions**
   - Merge 2 A objectives into 1 P question
   - Example: A tests "name ergonomic rules" (Q1) and "identify monitor distance" (Q2) separately → P asks "Describe a properly set up workstation and explain why each element matters" (combines both)
   - Limit: max 2 objectives per composite. More = unfocused.

   **Technique 4: Context shift**
   - Same concept, unfamiliar scenario
   - Example: A asks about classroom computer safety → P asks about a home office setup or a school server room
   - Must stay within grade-appropriate knowledge — don't introduce new domains

3. **Constraints:**
   - C++ only for code tasks (no Python, no JavaScript)
   - Grade scaffolding applies to elevated questions too (Grade 9 questions can be harder but must still assume zero prior computer experience)
   - MCQ quality rules from question_design.md still apply (no answer-hinting, no length bias, natural Lithuanian stems)

- [ ] **Step 3: Verify the file is well-formed**

Read back, confirm all 4 techniques covered with concrete examples, constraints section present.

- [ ] **Step 4: Commit**

```bash
git add .claude/skills/practice-task-gen/references/difficulty_elevation_guide.md
git commit -m "feat(practice-task-gen): add difficulty elevation guide reference"
```

---

### Task 3: Create reference file — `practice_task_example.md`

**Files:**
- Create: `.claude/skills/practice-task-gen/references/practice_task_example.md`

This is an exemplar Practice_Task for the Safety module (Grade 9, 006_P), derived from 007_A's Assessment_Task.

- [ ] **Step 1: Read the source materials**

Read these files to understand what the exemplar is based on:
- `Grade_9/Semester_1/01_Safety/007_A - Safety structured assessment/README.md`
- `Grade_9/Semester_1/01_Safety/007_A - Safety structured assessment/Assessment_Task.xlsx` (if exists, parse with openpyxl). If neither `.xlsx` nor `.pdf` exists, write the exemplar based solely on the 007_A README learning objectives and flag this limitation in the exemplar header comment.
- `Grade_9/Semester_1/01_Safety/006_P - Safety checklist rehearsal/README.md` (this is P lesson's own README, now called whatever it's named)
- `Grade_9/Semester_1/01_Safety/README.md` (module README)
- L lesson READMEs in 01_Safety module (001-004) for topic coverage

- [ ] **Step 2: Write `practice_task_example.md`**

Create `.claude/skills/practice-task-gen/references/practice_task_example.md` with:

**Structure:**
1. **Header comment:** "This exemplar shows a complete Practice_Task for Grade 9, Module 01_Safety, Lesson 006_P. It was derived from the 007_A Assessment_Task with difficulty elevation applied."
2. **Content inventory table** (what the A assessment tests, with the elevation applied):

| # | Topic | A Bloom's | A Tier | A Type | P Elevation |
|---|-------|-----------|--------|--------|-------------|
| ... | ... | ... | ... | ... | ... |

3. **Full exemplar document content** (the actual Lithuanian text that would appear in Practice_Task.pdf):
   - HEADER section
   - KĄ PADARYSITE section
   - UŽDUOTYS section with elevated questions grouped by topic (Ergonomika, Duomenų sauga, Slaptažodžių saugumas, Kibernetinės grėsmės — or whatever topics 007_A covers)
   - PATIKRINKITE SAVE section
   - KĄ DARYTI, JEI SUNKU section

4. **Annotation comments** in `<!-- -->` markers explaining which elevation technique was used for each question and why.

**Important:** All Lithuanian text must follow lt-qa rules. Run Phase 1 (read lt-mistakes.yaml) before writing. Run Phase 2 checklist after writing. Em dash banned. „..." quotes. Formal "jūs". No AI patterns. Plain UTF-8.

- [ ] **Step 3: Run lt-qa POST-GEN on the exemplar text**

Explicitly verify: no em dashes, correct quotes, no AI patterns, natural Lithuanian, correct case endings.

- [ ] **Step 4: Commit**

```bash
git add .claude/skills/practice-task-gen/references/practice_task_example.md
git commit -m "feat(practice-task-gen): add practice task exemplar for safety module"
```

---

### Task 4: Write the SKILL.md

**Files:**
- Create: `.claude/skills/practice-task-gen/SKILL.md`

- [ ] **Step 1: Read the spec for the complete pipeline**

Read `docs/superpowers/specs/2026-03-29-practice-task-gen-design.md` — Sections 1-8 define everything the SKILL.md must contain.

- [ ] **Step 2: Read a sibling SKILL.md for structural patterns**

Read `.claude/skills/assessment-task-gen/SKILL.md` — use its structure as the template: YAML frontmatter → overview → step-by-step pipeline → abort/degrade table → constraints → source priority.

- [ ] **Step 3: Write `SKILL.md`**

Create `.claude/skills/practice-task-gen/SKILL.md` with:

**YAML frontmatter** (use this version, which supersedes the shorter version in the spec — it has richer trigger coverage and explicit negative routing):
```yaml
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
```

**Body — follow spec sections in this order:**
1. Overview (what, why, output, hard gate, P-to-A pairing rule)
2. Step 0: Load references + lt-qa Phase 1 (list all files from spec Section 2)
3. Step 1: Locate, gather context & gate (P README → find A → gate → A README → module README → L/I context)
4. Step 2: Analyze A assessment (Testmoz .xlsx parsing + PDF parsing + content inventory)
5. Step 3: Propose difficulty elevation strategy (content inventory table + teacher approval gate)
6. Step 4: Generate Practice_Task (document structure from spec Section 3 + grade scaffolding + UTF-8 rule)
7. Step 5: Quality self-check (coverage, difficulty, grade, time, question quality)
8. Step 6: Lithuanian QA Phase 2 POST-GEN (7-step checklist)
9. Step 7: Render (python-docx → docx2pdf → verify → delete .docx)
10. Abort / Degrade Conditions table (from spec Section 4)
11. Source Priority (from spec Section 5)
12. Constraints (from spec Section 8)

- [ ] **Step 4: Verify the skill file**

Read back SKILL.md. Verify:
- YAML frontmatter parses correctly
- All 8 pipeline steps present
- Abort/degrade table has all 7 conditions
- Source priority has 6 levels
- All 10 constraints present
- All reference file paths are correct (relative to `.claude/skills/`)

- [ ] **Step 5: Commit**

```bash
git add .claude/skills/practice-task-gen/SKILL.md
git commit -m "feat(practice-task-gen): add main skill definition with pipeline"
```

---

### Task 5: Patch `answer-key-gen` for Practice_Task.pdf

**Files:**
- Modify: `.claude/skills/answer-key-gen/SKILL.md`

- [ ] **Step 1: Read the current answer-key-gen SKILL.md**

Read `.claude/skills/answer-key-gen/SKILL.md` in full to understand current P-mode logic.

- [ ] **Step 2: Patch P-mode input file reference**

Find and replace this exact string in the P mode input section:
```
1. Student_Task.pdf — questions and structure
```
Replace with:
```
1. Practice_Task.pdf — questions and structure
```

- [ ] **Step 3: Patch abort message**

Find and replace this exact string in the Abort / Degrade Conditions table:
```
| No Student_Task in P lesson folder | **Stop.** "Pirma sugeneruokite praktikos užduotį (student-task-gen su P tipo palaikymu)." |
```
Replace with:
```
| No Practice_Task in P lesson folder | **Stop.** "Pirma sugeneruokite praktikos užduotį naudodami /practice-task-gen." |
```

- [ ] **Step 4: Verify no other Student_Task references in P-mode context**

Search `answer-key-gen/SKILL.md` for any remaining occurrences of `Student_Task` that appear within P mode sections (between the P mode header and the next mode/section header). Replace with `Practice_Task` if found.

- [ ] **Step 5: Commit**

```bash
git add .claude/skills/answer-key-gen/SKILL.md
git commit -m "fix(answer-key-gen): update P-mode to expect Practice_Task.pdf from practice-task-gen"
```

---

### Task 6: Update `student-task-gen` type gate to reference practice-task-gen

**Files:**
- Modify: `.claude/skills/student-task-gen/SKILL.md`

**Context:** `student-task-gen` already rejects P lessons at its type gate (L and I only). The only change needed is to make the rejection message specifically direct to `practice-task-gen` instead of a generic suggestion.

- [ ] **Step 1: Read the current student-task-gen SKILL.md**

Read `.claude/skills/student-task-gen/SKILL.md` in full. Confirm:
- The YAML description already says "L (learning) and I (integration) lesson types"
- The type gate already rejects P lessons
- Note the exact text of the current type gate rejection (around the "Only generate for L and I lessons" section)

- [ ] **Step 2: Update the type gate rejection to specifically name practice-task-gen**

In the type gate section, find the block that rejects non-L/I lesson types. Update it so that when lesson type is P, the message specifically says: "P pamokoms naudokite /practice-task-gen." Keep existing rejection messages for other types (A, D, T, MOCK, G).

- [ ] **Step 3: Update YAML description to reference practice-task-gen for P lessons**

In the YAML frontmatter description, find the text listing other skills. Add `P (use practice-task-gen)` to the exclusion list if not already present.

- [ ] **Step 4: Check for P_example_01.md reference file**

Check if `.claude/skills/student-task-gen/references/P_example_01.md` exists. If it does, delete it (the new exemplar in practice-task-gen supersedes it). If it does not exist, skip this step.

- [ ] **Step 5: Verify student-task-gen cleanly rejects P lessons**

Read the modified file, confirm P lesson type hits the type gate and stops with a reference to practice-task-gen.

- [ ] **Step 6: Commit**

```bash
git add .claude/skills/student-task-gen/SKILL.md
git commit -m "refactor(student-task-gen): remove P lesson support, defer to practice-task-gen"
```

---

### Task 7: Final integration verification

**Files:**
- Read: all modified/created files

- [ ] **Step 1: Verify skill file structure**

```
.claude/skills/practice-task-gen/
├── SKILL.md
└── references/
    ├── practice_task_format.md
    ├── difficulty_elevation_guide.md
    └── practice_task_example.md
```

Confirm all 4 files exist and are non-empty.

- [ ] **Step 2: Verify cross-skill references are consistent**

Check that:
- `answer-key-gen` P mode references `Practice_Task.pdf` (not `Student_Task.pdf`)
- `answer-key-gen` abort message references `practice-task-gen` (not `student-task-gen`)
- `student-task-gen` rejects P lessons and points to `practice-task-gen`
- `practice-task-gen` SKILL.md references correct paths for all sibling skill reference files

- [ ] **Step 3: Verify all reference file paths in SKILL.md resolve**

For each file listed in Step 0 of the SKILL.md, confirm the file exists at that path:
- `.claude/skills/practice-task-gen/references/practice_task_format.md` ✓
- `.claude/skills/practice-task-gen/references/difficulty_elevation_guide.md` ✓
- `.claude/skills/practice-task-gen/references/practice_task_example.md` ✓
- `.claude/skills/assessment-task-gen/references/question_design.md` ✓
- `.claude/skills/assessment-task-gen/references/testmoz_format.md` ✓
- `.claude/skills/student-task-gen/references/task_format.md` ✓
- `lt-qa/lt-mistakes.yaml` ✓
- `.claude/skills/lt-qa/references/ai-patterns.md` ✓
- `.claude/skills/lt-qa/references/audience-calibration.md` ✓
- `tasks/lessons.md` ✓

- [ ] **Step 4: Verify the skill appears in the skill list**

The skill should be discoverable. Check that the YAML frontmatter `name` and `description` fields are present and correctly formatted.

- [ ] **Step 5: Final commit if any fixes were needed**

```bash
git add .claude/skills/practice-task-gen/ .claude/skills/answer-key-gen/SKILL.md .claude/skills/student-task-gen/SKILL.md
git commit -m "chore(practice-task-gen): integration verification fixes"
```

Only commit if changes were made. Skip if everything passed clean.
