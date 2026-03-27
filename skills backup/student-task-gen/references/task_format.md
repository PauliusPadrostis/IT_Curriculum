# Task Format Reference

Defines the exact structure and formatting of Student_Task.docx output.

**For .docx generation mechanics**, read the docx skill at
`/mnt/skills/public/docx/SKILL.md` — it contains the docx-js setup,
table formatting, styles, and validation rules.

---

## Design Philosophy

A Student_Task is a document students keep open alongside their work.
It must be:
- **Self-sufficient** — student can complete the task using only this
  document + their computer. No teacher explanation required.
- **Idiot-proof** — scaffolding depth scales by grade: Grade 9 assumes
  zero computer experience (every click explicit); Grade 10 assumes
  basic file/folder skills (explain tool-specific actions only); Grades
  11-12 assume PC navigation basics (explain new tools and concepts only).
- **Scannable** — clear visual hierarchy, colored sections, short
  paragraphs. Students should find their current step instantly.
- **Anticipatory** — predict where students will get stuck and provide
  pre-emptive troubleshooting at those exact points.

---

## Document Structure

### Document Header

```
[centered, grey, 9pt, allcaps] UŽDUOTIES LAPAS
[centered, navy #1F4E79, 18pt bold] {Task title in Lithuanian}
[centered, grey, 10pt] {Grade} klasė  •  {Module name}  •  {Lesson type}
[navy horizontal rule]
```

### Section Order

Every Student_Task follows this exact order. Sections marked [conditional]
are included only when applicable.

```
1. HEADER — title, grade, module, type (as above)
2. KĄ PADARYSITE — outcome summary (2-3 sentences)
3. REIKALAVIMAI — what the final result must include
4. DARBO EIGA — sub-tasks or micro-steps (structure differs by type)
5. PAVYZDYS [conditional] — expected output, code skeleton, or pattern
6. PATIKRINKITE SAVE — self-check checklist
7. PAPILDOMA UŽDUOTIS [conditional] — extension for stronger students
```

---

## Section Formats

### 1. Header

Matches theory pack header style. Centered, navy, with grey metadata line.

### 2. Ką padarysite

1–3 sentences describing the concrete outcome. Second person formal.

```
Sukursite veikiantį HTML failą ir atidarysite jį naršyklėje.
Failas turės taisyklingą struktūrą, antraštes ir sąrašą.
Tema — laisva: apie save, pomėgį ar bet ką, kas jums įdomu.
```

**Rules:**
- Concrete product, not abstract learning ("Sukursite failą" not
  "Išmoksite apie failus")
- Include the tool they'll use (Notepad, VS Code, Canva, Excel, etc.)
- If relevant, note the submission method ("Įkelsite į Google Classroom")

### 3. Reikalavimai

What the finished product must contain. Two formats:

#### Table format (preferred for structured tasks)

```
| Reikalavimas | Elementas / Priemonė |
|---|---|
| Taisyklinga dokumento struktūra | html, head, body |
| Puslapio pavadinimas kortelėje | title |
```

#### Numbered list format (for simpler tasks)

```
1. Visas tekstas turi likti — trinti negalima.
2. Aiški vizualinė hierarchija.
3. Pasirinktas vienas lygiavimo principas.
```

**Rules:**
- Each requirement must be verifiable (yes/no checkable)
- No vague requirements ("padaryti gerai")
- Requirements describe the END RESULT, not the process
- This section answers "what does my work need to have?"

### 4. Darbo eiga

**This is the core section and differs significantly between L and I.**

#### L lessons — micro-step walkthrough

For L lessons, imagine the student has never used a computer before.
Each step is a granular, explicit instruction. The student follows
steps in order and should arrive at the finished product.

**Step structure:**

```
1 ŽINGSNIS: [short step title]

   [Detailed, explicit instruction. Every click, every menu,
   every keyboard action described. Nothing assumed.]

   [If relevant: code block, formula, or visual reference]

   *(Užuomina: [helper question or reminder about WHY])*

   ✓ Dabar turėtumėte turėti: [observable verification — what
   the student should see on their screen right now]
```

**After major milestones, insert a "Stuck?" info box:**

```
[ĮSTRIGOTE? box — light amber background, amber left border]
Jei [specific problem description]:
• [Solution step 1]
• [Solution step 2]
```

**Step granularity rules for L lessons:**
- "Create a file" is NOT one step. It is:
  1. Where to go (desktop / folder)
  2. How to create (right-click → New → ...)
  3. What to name it (exact filename with extension)
  4. How to verify (what you should see now)
- "Open the file" is NOT one step if there's an edge case.
  Example: HTML files may open in browser by default. The step
  must explain how to open in editor instead (right-click →
  Open with → Notepad / VS Code).
- "Write code" is NOT one step. Break into: what to type first,
  what each line does, where exactly to type it (between which
  existing lines).
- Every step that produces a visible change on screen must end
  with "✓ Dabar turėtumėte turėti/matyti: ..."

**Grade calibration for L steps:**
- Grade 9: Maximum granularity. Assume the student has never
  touched a computer. Describe right-click menus, file extensions,
  window locations, how to navigate File Explorer, how to rename
  files, how to save. Every action is explicit.
- Grade 10: Moderate granularity. Students can navigate File
  Explorer, create/rename/move files, understand file extensions,
  and use basic keyboard shortcuts (Ctrl+S, Ctrl+C/V). Knowledge
  ceiling is roughly at archiving/extracting files. Explain
  tool-specific actions (new IDE features, new software menus)
  but skip basic OS navigation.
- Grade 11-12: Minimal OS scaffolding. Students know PC navigation
  basics. Only explain actions specific to the tool or concept
  being taught (new programming constructs, new Excel functions,
  new HTML elements). Skip file creation, saving, folder navigation.

**Typical L task: 5-10 steps, 1-3 "Stuck?" boxes, ~2-4 pages.**

#### I lessons — structured sub-tasks

For I lessons, students know the tools and concepts. They need
structured WHAT to do, not HOW to do it. The work is broken into
sub-tasks (dalys), each describing a chunk of work.

**Sub-task structure:**

```
1 DALIS: [sub-task title]

   [What to accomplish in this part. 2-4 sentences.
   Describes the goal of this chunk, not the click-by-click
   procedure. May include specific constraints or criteria.]
```

**No hints, no success indicators, no "Stuck?" boxes** in I lessons.
The student plans and executes independently. If they're truly stuck,
they ask the teacher — that's the I lesson model.

**Sub-task granularity rules for I lessons:**
- Each sub-task is a meaningful chunk of the final product
- 3-6 sub-tasks typical
- Sub-tasks should be roughly sequential but may allow flexibility
- Each sub-task references the relevant requirements it addresses

**Typical I task: 3-6 sub-tasks, ~1-2 pages.**

### 5. Pavyzdys (conditional)

Show the expected result or a pattern. Include when:
- Task produces code → show expected output or skeleton
- Task uses formulas → show formula pattern
- Task has a specific expected structure → show it

**Do NOT include when:**
- Task is creative/open-ended (poster, free design)
- Showing the answer defeats the learning purpose

For code, use a skeleton with `...` placeholders.

### 6. Patikrinkite save

Simple checklist. Yes/no items only. No explanations.

```
☐ Ar failas turi taisyklingą HTML struktūrą?
☐ Ar yra tik vienas <h1>?
☐ Ar visos žymos uždarytos?
```

**Rules:**
- 4-8 items
- Follow the requirements order
- L lessons: element-specific checks
- I lessons: principle-based checks
- Include technical self-checks where relevant

### 7. Papildoma užduotis (I lessons primarily; sometimes L for grade 11-12)

Extension for stronger students. Self-contained, clearly optional.

---

## Info Boxes

Two types of callout boxes, matching theory pack visual identity:

### "Stuck?" box (light amber #FFF2CC, left border #BF8F00, 6pt)

Used in L lessons at high-risk points where students predictably jam.

**Rules:**
- Place immediately after the step that causes the problem
- Describe the SPECIFIC symptom ("Jei matote..." / "Jei failas...")
- Give exact solution steps (click-by-click)
- Maximum 3-4 solution steps per box
- 1-3 boxes per document — only at genuine high-risk points

### "Svarbu" box (light blue #DEEAF6, left border #2E75B6, 6pt)

Used sparingly for critical warnings or key principles.

**Rules:**
- Maximum 1-2 per document
- Only for things that would cause serious problems if ignored
- Short — 2-3 sentences max

### Info box implementation (docx-js)
Table with 1 row, 1 cell. Left border thick (6pt, colored), other
borders thin (0.5pt, #BFBFBF). Cell shading with ShadingType.CLEAR.
Header text bold, in the border color. Body text 10pt #333333.
Cell padding 120 DXA all sides.

---

## Formatting Specs (docx-js)

### Page: A4 (11906 x 16838 DXA), 1" margins (1440 DXA), content width 9026 DXA
### Font: Arial throughout
### Body: 11pt (size 22), line spacing 1.15 (line 276), color #333333
### H1: 16pt bold, #1F4E79 (task title — centered)
### H2: 13pt bold, #1F4E79 (section headings: Reikalavimai, Darbo eiga, etc.)
### H3: 11.5pt bold, #2E75B6 (step/sub-task headings within Darbo eiga)
### Metadata line: 10pt, #808080, centered
### Horizontal rule: #1F4E79, 1pt

### Code blocks
- Consolas or Courier New 10pt
- Light gray background (fill: "F2F2F2")
- 4pt padding inside

### Tables
- DXA widths only, cell margins 60/100
- Border: #BFBFBF
- Header row: white text on #1F4E79
- ShadingType.CLEAR

### Checklist: ☐ (U+2610) + space, indent 360 DXA
### Step headings (L): Bold #2E75B6, "1 ŽINGSNIS: [title]"
### Sub-task headings (I): Bold #2E75B6, "1 DALIS: [title]"
### Hints (L only): Italic, parentheses, indent 720 DXA
### Success indicators (L only): ✓ + italic, indent 720 DXA

### Length
- L lesson task: 2-4 pages
- I lesson task: 1-2 pages

---

## .docx Generation

Use the docx skill (`/mnt/skills/public/docx/SKILL.md`) for creation mechanics.

```bash
npm install -g docx
```

Validate after creation:
```bash
python scripts/office/validate.py Student_Task.docx
```
