# Visual Aid Generator — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create the `visual-aid-gen` skill that generates a 6-page landscape PDF visual aid for classroom projection during L and I lessons.

**Architecture:** A single SKILL.md file that instructs Claude to read lesson files (README, Teacher_Plan.docx, optionally Student_Task.pdf and Theory_Pack.pdf), extract content for 6 slides, generate a landscape .docx using the `docx` npm library, then convert to PDF via `docx2pdf`. Same pipeline as all other gen skills in this repo.

**Tech Stack:** Claude skill (SKILL.md), `docx` npm v9.6.1 (already installed), `docx2pdf` Python (already installed), `spellcheck_lt.py` (existing script)

---

## File Map

| Action | File | Responsibility |
|--------|------|----------------|
| Already exists | `.claude/skills/visual-aid-gen/references/visual_aid_format.md` | Exact formatting spec (colors, sizes, accent bar code, slide layouts) |
| Create | `.claude/skills/visual-aid-gen/SKILL.md` | Skill definition — triggers, steps, content extraction logic, generation workflow, QA |

This is a single-file implementation. The format reference already exists. The only deliverable is `SKILL.md`.

---

## Pre-Implementation: Reference Files to Read

Before writing any code, the implementer MUST read these files to understand the existing skill patterns:

1. **Design spec:** `docs/superpowers/specs/2026-03-28-visual-aid-gen-design.md`
2. **Format reference:** `.claude/skills/visual-aid-gen/references/visual_aid_format.md`
3. **Sibling skill (closest pattern):** `.claude/skills/student-task-gen/SKILL.md` — follow its structure for frontmatter, step numbering, context-gathering, and QA workflow
4. **Sibling skill (plan gen):** `.claude/skills/lesson-plan-gen/SKILL.md` — reference for how it structures Teacher_Plan reading and phase extraction
5. **Teacher profile:** `.claude/skills/lesson-plan-gen/references/teacher_profile.md` — classroom constraints, approved software
6. **lt-qa skill:** `.claude/skills/lt-qa/SKILL.md` — PRE-GEN and POST-GEN phases the skill must integrate
7. **Existing generation scripts:** `_scripts/gen_plan.mjs` (lines 1–80) — for docx library import patterns and helper function conventions used in this repo
8. **CLAUDE.md** — project-level rules that all skills must respect

---

## Task 1: Write SKILL.md Frontmatter + Introduction

**Files:**
- Create: `.claude/skills/visual-aid-gen/SKILL.md`

- [ ] **Step 1: Write the frontmatter block**

Model after `student-task-gen/SKILL.md` frontmatter. Include:
- `name: visual-aid-gen`
- `description:` — comprehensive trigger list covering: "sugeneruok vizualinę priemonę", "padaryk Visual_Aid", "sukurk vaizdinę medžiagą", "generate visual aid", "create visual aid", "make projection slides", "build visual aids for module", and mentions of generating Visual_Aid files for lesson folders. Explicitly state: only L and I lesson types. State what NOT to use this for (lesson plans, student tasks, theory packs, READMEs).

- [ ] **Step 2: Write the introduction section**

```markdown
# Visual Aid Generator

Generates Lithuanian-language Visual_Aid.pdf files for L and I lessons in the
IT Curriculum repo. Each visual aid is a 6-page landscape PDF projected on the
classroom screen during the lesson. All extracted content preserves the original
Lithuanian from the Teacher_Plan. Respond to the teacher in whatever language
they use.

**This skill is designed for mass generation.** It uses safe defaults when
optional context files are missing and does not pause for approval on structural
decisions. It stops only when the Teacher_Plan.docx is missing or lacks required
sections (retrieval questions, objectives).
```

- [ ] **Step 3: Write the Core Concept section**

```markdown
## Core Concept

A Visual_Aid is **not** a new document generated from scratch. It is a
**structured extraction** from the Teacher_Plan.docx (and optionally
Student_Task.pdf and Theory_Pack.pdf), reformatted for large-text
classroom projection.

The visual aid maps directly to the lesson flow:
1. Title → lesson identity
2. Start questions → retrieval practice opening
3. Goals → admin-required objective display
4. Task brief → preview of independent work
5. Key concepts → reference during task execution
6. End questions → retrieval practice closing

The teacher advances slides as the lesson progresses. Slide 5 stays up
the longest (~15-20 min) during independent work time.
```

- [ ] **Step 4: Commit**

```bash
git add .claude/skills/visual-aid-gen/SKILL.md
git commit -m "feat(visual-aid-gen): add SKILL.md frontmatter and introduction"
```

---

## Task 2: Write Step 0 (Read References) and Step 1 (Gather Context)

**Files:**
- Modify: `.claude/skills/visual-aid-gen/SKILL.md`

- [ ] **Step 1: Write Step 0 — Read References**

```markdown
## Step 0 — Read References

**Before generating any visual aid, always read these files:**

1. `references/visual_aid_format.md` — the exact .docx output structure, slide
   layouts, color palette, accent bar implementation code, and typography specs.
   **Primary structural reference.**
2. `/mnt/skills/public/docx/SKILL.md` — docx-js setup, table formatting helpers,
   styles, and validation rules. **Required for .docx generation mechanics.**

Also read from the lesson-plan-gen skill:
3. `/mnt/skills/user/lesson-plan-gen/references/teacher_profile.md` — teaching
   style, constraints, classroom reality, approved software. Sections §9–§11
   are critical for understanding what the teacher actually does in class.

These files are the skill's operational backbone. Do not generate without them.
```

- [ ] **Step 2: Write Step 1 — Gather Context**

Include a priority table for what to read, modeled on student-task-gen Step 1 but adapted for visual aid sourcing:

```markdown
## Step 1 — Gather Context

### What to read, in order:

| Priority | Source | What to extract |
|----------|--------|-----------------|
| 1 | **Teacher_Plan.docx** | Retrieval questions (start + end), objectives, application phase task description, teaching phase content and terminology |
| 2 | **Lesson README** | Title (Pavadinimas), type (must be L or I), grade, module name |
| 3 | **Module README** | Module name (for title slide), lesson position in sequence |
| 4 | **Student_Task.pdf** (optional) | Task requirements — used to prioritize key concepts on slide 5 |
| 5 | **Theory_Pack.pdf** (optional) | Terminology table — provides definitions for slide 5 key concepts |

### Hard gates

- **Teacher_Plan.docx must exist.** If missing, abort: "Teacher_Plan.docx
  nerastas. Pirmiausia sugeneruokite pamokos planą naudodami /lesson-plan-gen."
- **Lesson type must be L or I.** If P, A, D, T, MOCK, or G — abort:
  "Visual Aid generuojamas tik L ir I tipo pamokoms."
- **Retrieval questions must exist in both phases.** If either "Pamokos pradžios
  klausimai" or "Pamokos pabaigos klausimai" is missing from the plan, abort
  with a specific message naming the missing section.
- **Objectives must exist.** If the objectives box is empty or missing, abort.

### Content extraction rules

**Slides 2 and 6 (retrieval questions):** Extract the numbered questions
verbatim from the "Pamokos pradžios klausimai" and "Pamokos pabaigos
klausimai" phases. Do not rephrase, reorder, or add questions.

**Slide 3 (objectives):** Extract from the objectives box (PAMOKOS TIKSLAI).
Use the concise form. If 5+ objectives, keep only those directly tied to
the lesson task (max 4 displayed).

**Slide 4 (task brief):**
- **L lessons:** Summarize the application phase task in 2–4 sentences.
  Flip from teacher voice to neutral/descriptive. Do not include step-by-step
  instructions (that is the Student_Task's job).
- **I lessons:** If the application phase names a single concrete deliverable
  (e.g., "sukurkite plakatą"), describe it in 2–4 sentences. If no single
  deliverable exists (multiple activities, discussion, scenario analysis),
  use the bullet format: "Šios pamokos metu sujungsite:" + 3–4 integration
  targets from the teaching phase.

**Slide 5 (key concepts):** Apply strict priority order:
1. Terms/concepts the Student_Task requires (if Student_Task.pdf exists)
2. Core terms from the Teacher_Plan teaching phase
3. Terms from the Theory_Pack terminology table (if Theory_Pack.pdf exists)
4. Hard cap: 4–5 items. Each = bold term + colon + one-line definition (~15 words max)
5. If a term appears in the Theory_Pack terminology table, use that definition
   (condensed if needed). Otherwise write a definition from the teaching phase.
6. If no Student_Task or Theory_Pack exist, build entirely from Teacher_Plan.
```

- [ ] **Step 3: Commit**

```bash
git add .claude/skills/visual-aid-gen/SKILL.md
git commit -m "feat(visual-aid-gen): add context gathering and reference steps"
```

---

## Task 3: Write Step 2 (Lithuanian QA Pre-Gen) and Step 3 (Generate .docx)

**Files:**
- Modify: `.claude/skills/visual-aid-gen/SKILL.md`

- [ ] **Step 1: Write Step 2 — Lithuanian QA Pre-Gen**

```markdown
## Step 2 — Lithuanian QA (PRE-GEN)

Before writing any Lithuanian text, load the lt-qa rules:

1. Read `lt-qa/lt-mistakes.yaml` from the repo root
2. Read `/mnt/skills/user/lt-qa/SKILL.md` Phase 1 (PRE-GEN) rules
3. Internalize: no em dashes (—), Lithuanian „..." quotes only,
   formal "jūs" register, no AI text patterns

Most visual aid content is extracted verbatim from the Teacher_Plan
(which already passed lt-qa). The primary generation target is
**slide 5 term definitions** — these are the main lt-qa risk.

Also apply to slide 4 task brief (which is a summarized/rephrased
extraction, not verbatim).
```

- [ ] **Step 2: Write Step 3 — Generate .docx**

This is the largest step. Include the full generation instruction with references to the format spec. Structure as sub-steps:

```markdown
## Step 3 — Generate Visual_Aid.docx

Read `references/visual_aid_format.md` now if you haven't already. It contains
the exact color palette, accent bar implementation code, page setup, and
slide-by-slide structure you must follow.

### 3a. Document setup

Create a landscape A4 document:
- Page size: 16838 × 11906 DXA (width × height)
- Margins: 2 cm all sides (1134 DXA)
- Font: Arial throughout
- Use `docx` npm library via inline Node.js script

### 3b. Build slides in order

Generate exactly 6 pages (sections), separated by explicit page breaks.
For each slide, follow the exact structure in `visual_aid_format.md`.

**Slide 1 (Title):**
- Full navy (1A237E) background via paragraph shading on every paragraph
  OR a full-page single-cell table with navy fill
- Module name: 32pt, bold, allcaps, white, centered
- Lesson title: 48pt, bold, white, centered
- Approximate vertical centering with `spacing.before: 3200` on first paragraph

**Slides 2–6 (Content slides):**
Each follows the same pattern:
1. Accent bar (single-row, single-cell table, 100% width, 680 DXA height,
   filled with the slide's accent color, white bold 28pt label inside)
2. Spacing after bar: 400 twips
3. Content paragraphs (see format spec for each slide's structure)
4. Page break after content (except last slide)

### 3c. Lithuanian text encoding

Write all Lithuanian text as plain UTF-8 directly in the script. Never use
`\u` unicode escapes for Lithuanian letters (ą, č, ę, ė, į, š, ų, ū, ž).

Exception: typographic quotes MUST use escapes:
- `\u201E` = „ (opening)
- `\u201C` = " (closing)

### 3d. Write the file

Use `Packer.toBuffer()` to serialize, then write to the lesson folder as
`Visual_Aid.docx`.
```

- [ ] **Step 3: Commit**

```bash
git add .claude/skills/visual-aid-gen/SKILL.md
git commit -m "feat(visual-aid-gen): add QA pre-gen and docx generation steps"
```

---

## Task 4: Write Step 4 (Post-Gen QA), Step 5 (PDF Conversion), and Batch Mode

**Files:**
- Modify: `.claude/skills/visual-aid-gen/SKILL.md`

- [ ] **Step 1: Write Step 4 — Post-Gen QA**

```markdown
## Step 4 — Lithuanian QA (POST-GEN)

After generating Visual_Aid.docx, run a structured review:

1. **Extract text** from the generated .docx (read back the content)
2. **Scan against lt-mistakes.yaml** — check every term definition (slide 5)
   and task brief (slide 4) against the mistake library
3. **Grammar check** — verify declension endings, subject-verb agreement,
   diacritical marks on all generated text (not verbatim extractions)
4. **Em dash scan** — confirm zero em dashes (—) in the entire document
5. **Quote check** — confirm all quotes use „..." format

Fix any issues found, then regenerate the .docx if changes were needed.
```

- [ ] **Step 2: Write Step 5 — Spellcheck + PDF Conversion**

```markdown
## Step 5 — Spellcheck and PDF Conversion

### 5a. Spellcheck

Run the Lithuanian spellchecker on the intermediate .docx:

```bash
python _scripts/spellcheck_lt.py {lesson_folder}/Visual_Aid.docx
```

Review flagged words. Fix genuine errors (regenerate .docx if needed).
Ignore technical terms that are correctly spelled but not in the dictionary.

### 5b. Convert to PDF

```bash
python -c "from docx2pdf import convert; convert('{lesson_folder}/Visual_Aid.docx', '{lesson_folder}/Visual_Aid.pdf')"
```

### 5c. Delete intermediate .docx

```bash
rm {lesson_folder}/Visual_Aid.docx
```

### 5d. Verify

Confirm `Visual_Aid.pdf` exists and is non-empty. Use `present_files`
to share the output with the teacher.
```

- [ ] **Step 3: Write batch generation section**

```markdown
## Batch Generation

When the teacher requests visual aids for an entire module or multiple lessons:

1. Read the module README to identify all L and I lessons in sequence
2. Filter to only lessons that have a Teacher_Plan.docx
3. Process each lesson in sequence order (001, 002, ...)
4. For each lesson, run Steps 1–5 independently
5. Report a summary table after completion:

| Pamoka | Būsena | Pastaba |
|--------|--------|---------|
| 001_L, Ergonomika | ✅ | Visual_Aid.pdf sukurtas |
| 002_L, Privatumas | ✅ | Visual_Aid.pdf sukurtas |
| 005_I, Integracija | ⚠️ | Nėra Teacher_Plan.docx, praleista |

Skip lessons without Teacher_Plan.docx (don't abort the batch). Warn but
continue if optional files (Student_Task, Theory_Pack) are missing.
```

- [ ] **Step 4: Commit**

```bash
git add .claude/skills/visual-aid-gen/SKILL.md
git commit -m "feat(visual-aid-gen): add post-gen QA, PDF conversion, and batch mode"
```

---

## Task 5: Final Review and Registration

**Files:**
- Modify: `.claude/skills/visual-aid-gen/SKILL.md` (final polish)

- [ ] **Step 1: Re-read the complete SKILL.md**

Read the entire file top to bottom. Check for:
- All steps referenced in the correct order (0 → 1 → 2 → 3 → 4 → 5)
- No em dashes in the skill file itself
- Consistent terminology (Visual_Aid, not Visual-Aid or visual_aid)
- Format reference path is correct: `references/visual_aid_format.md`
- lt-qa integration matches how other skills do it

- [ ] **Step 2: Test the skill trigger**

Verify the skill appears in the Claude skill list. Ask: "sugeneruok vizualinę priemonę" and confirm the skill is invoked.

- [ ] **Step 3: Generate a test Visual_Aid.pdf**

Pick a lesson that has Teacher_Plan.docx (e.g., `Grade_9/Semester_1/01_Safety/001_L - Ergonomika darbo vietoje`). Run the skill end-to-end. Verify:
- Output is landscape A4 PDF
- 6 pages exactly
- Accent bars are colored correctly
- Text is readable at large font sizes
- No em dashes in output
- Lithuanian text is correct

- [ ] **Step 4: Commit final version**

```bash
git add .claude/skills/visual-aid-gen/SKILL.md
git commit -m "feat(visual-aid-gen): complete skill with QA and batch support"
```

---

## Summary

| Task | Description | Files | Commits |
|------|-------------|-------|---------|
| 1 | Frontmatter + introduction | Create SKILL.md | 1 |
| 2 | Step 0 (references) + Step 1 (context) | Modify SKILL.md | 1 |
| 3 | Step 2 (pre-gen QA) + Step 3 (docx generation) | Modify SKILL.md | 1 |
| 4 | Step 4 (post-gen QA) + Step 5 (PDF) + batch mode | Modify SKILL.md | 1 |
| 5 | Final review + test generation | Modify SKILL.md | 1 |

**Total: 5 tasks, 5 commits, 1 file created.**
