# Visual Aid — Document Structure & Formatting

**For .docx generation mechanics**, read the docx skill at
`/mnt/skills/public/docx/SKILL.md` — it contains the docx-js setup,
table formatting, styles, and validation rules.

**For Lithuanian language rules**, load `lt-qa/SKILL.md` (Phase 1:
PRE-GEN) before writing any Lithuanian text. Slide 5 term definitions
are the primary generated Lithuanian content and must pass lt-qa checks.

## Design Philosophy

A Visual Aid is a 6-page landscape PDF projected on the classroom screen
during L and I lessons. The teacher advances slides as the lesson
progresses. It must be:

- **Readable from 8 meters** — minimum 28pt body text, high contrast
- **Phase-coded** — each slide's accent color matches the Teacher_Plan
  phase palette so students subconsciously track lesson flow
- **Minimal** — large text, maximum whitespace, zero decoration noise
- **Self-pacing** — slide 5 (key concepts) stays up during independent
  work; all others are transitional (30 sec to 5 min each)

---

## Page Setup

```
Orientation:  Landscape A4
Page size:    A4 landscape. CRITICAL: pass PORTRAIT dimensions to docx-js
              (width: 11906, height: 16838) with orientation: LANDSCAPE.
              docx-js swaps internally. Visible: 16838 × 11906 DXA.
Margins:      2 cm all sides (1134 DXA)
Font:         Arial throughout
Line spacing: 1.5× (360 twips) for all body text
Page breaks:  Explicit between each slide (6 pages exactly)
```

---

## Color Palette

Reuses the Teacher_Plan phase-to-color mapping. Hardcode these hex values.

Page background is always white (`FFFFFF`) on slides 2–6. The _BG phase
colors from the Teacher_Plan palette are NOT used here — only accents.

| Token | Hex | Used on |
|-------|-----|---------|
| TITLE_BG | 1A237E | Slide 1 full background |
| TITLE_TEXT | FFFFFF | Slide 1 all text |
| RETRIEVAL_ACCENT | F57C00 | Slides 2, 6 bar fill + question numbers |
| OBJ_ACCENT | 5E35B1 | Slide 3 bar fill + bullet markers |
| APPLICATION_ACCENT | 2E7D32 | Slide 4 bar fill |
| TEACHING_ACCENT | 1565C0 | Slide 5 bar fill + term highlights |
| BODY_TEXT | 212121 | All body text (slides 2–6) |

---

## Slide-by-Slide Structure

### Slide 1: Title

Full navy (`1A237E`) background. All text white, centered horizontally
and vertically.

```
[centered, white, 32pt, bold, allcaps] {Module name}
[vertical spacing: 200 twips]
[centered, white, 48pt, bold] {Lesson title}
```

Vertical centering: use `spacing.before` on the module name paragraph
to push content to approximately vertical center. Calculate based on
page height minus margins minus text block height. Approximate with
`before: 3200` (twips) as starting value.

No accent bar on this slide. No other content.

---

### Slide 2: Pamokos pradžios klausimai

```
[accent bar: full-width table row, 1.5 cm tall, fill RETRIEVAL_ACCENT]
  [inside bar: white, 28pt, bold] PAMOKOS PRADŽIOS KLAUSIMAI
[spacing: 400 twips]
[numbered list, each question on its own line]
  [number: bold, RETRIEVAL_ACCENT, 28pt] 1.
  [question text: BODY_TEXT, 28pt] {question text}
  [spacing between questions: 200 twips]
```

Questions extracted from Teacher_Plan → "Pamokos pradžios klausimai"
phase. Preserve the exact question text. Typically 3–5 questions.

---

### Slide 3: Pamokos tikslai

```
[accent bar: full-width table row, 1.5 cm tall, fill OBJ_ACCENT]
  [inside bar: white, 28pt, bold] PAMOKOS TIKSLAI
[spacing: 400 twips]
[bullet list, each objective on its own line]
  [bullet: bold, OBJ_ACCENT, 28pt] ▸
  [objective text: BODY_TEXT, 28pt] {objective text}
  [spacing between objectives: 200 twips]
```

Objectives extracted from Teacher_Plan → objectives box. Use the
concise form (typically 2–4 objectives). If the plan lists 5+
objectives, prioritize the ones directly tied to the lesson task.

---

### Slide 4: Užduotis

```
[accent bar: full-width table row, 1.5 cm tall, fill APPLICATION_ACCENT]
  [inside bar: white, 28pt, bold] UŽDUOTIS
[spacing: 400 twips]
[body text: BODY_TEXT, 28pt] {task description — 2-4 sentences max}
```

**For L lessons:** Brief description of the hands-on task from the
application phase ("Taikymo užduotys" / "Savarankiška užduotis").

**For I lessons:** If the application phase names a single concrete
deliverable (e.g., "sukurkite plakatą", "parašykite programą"), describe
that task briefly. If the application phase has no single deliverable
(multiple activities, discussion-based, or scenario analysis), list
integration targets instead:

```
[body text: BODY_TEXT, 28pt] Šios pamokos metu sujungsite:
[bullet list]
  [bullet: bold, APPLICATION_ACCENT, 28pt] ▸
  [target: BODY_TEXT, 28pt] {L lesson topic — what will be applied}
```

Keep to 2–4 sentences or 3–4 bullet points maximum. This is a preview,
not the full task sheet.

---

### Slide 5: Pagrindinės sąvokos

```
[accent bar: full-width table row, 1.5 cm tall, fill TEACHING_ACCENT]
  [inside bar: white, 28pt, bold] PAGRINDINĖS SĄVOKOS
[spacing: 400 twips]
[term list, each on its own line]
  [term: bold, TEACHING_ACCENT, 28pt] {Term}
  [colon + definition: BODY_TEXT, 24pt]  : {one-line definition}
  [spacing between terms: 200 twips]
```

**Content priority (strict order):**
1. Terms/concepts required to complete the task (highest priority)
2. Core terms from the teaching phase of Teacher_Plan
3. Terms from Theory_Pack (if it exists)
4. Hard cap: 4–5 items maximum

Each item = bold term + one-line definition. Definition must be a single
sentence, max ~15 words. If the term appears in the Theory_Pack
terminology table, use that definition (condensed if needed).

**Note:** Term definitions use 24pt (not 28pt) to fit more content while
keeping terms themselves prominent at 28pt.

**If no Theory_Pack or Student_Task exists:** Build entirely from the
Teacher_Plan teaching phase content.

---

### Slide 6: Pamokos pabaigos klausimai

```
[accent bar: full-width table row, 1.5 cm tall, fill RETRIEVAL_ACCENT]
  [inside bar: white, 28pt, bold] PAMOKOS PABAIGOS KLAUSIMAI
[spacing: 400 twips]
[numbered list — same format as Slide 2]
  [number: bold, RETRIEVAL_ACCENT, 28pt] 1.
  [question text: BODY_TEXT, 28pt] {question text}
  [spacing between questions: 200 twips]
```

Questions extracted from Teacher_Plan → "Pamokos pabaigos klausimai"
phase. Same formatting rules as Slide 2.

---

## Accent Bar Implementation

The accent bar is a **single-row, single-cell table** spanning the full
content width (page width minus margins).

```javascript
new Table({
  rows: [
    new TableRow({
      height: { value: 680, rule: HeightRule.EXACT },  // ~1.5 cm
      children: [
        new TableCell({
          shading: { type: ShadingType.CLEAR, fill: "{ACCENT_HEX}" },
          verticalAlign: VerticalAlign.CENTER,
          borders: {
            top: { style: BorderStyle.NONE },
            bottom: { style: BorderStyle.NONE },
            left: { style: BorderStyle.NONE },
            right: { style: BorderStyle.NONE },
          },
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: "{SLIDE LABEL}",
                  bold: true,
                  color: "FFFFFF",
                  size: 56,  // 28pt
                  font: "Arial",
                }),
              ],
              spacing: { before: 0, after: 0 },
              alignment: AlignmentType.LEFT,
              indent: { left: 200 },  // small left padding
            }),
          ],
        }),
      ],
    }),
  ],
  width: { size: 100, type: WidthType.PERCENTAGE },
})
```

---

## Content Sourcing Rules

| Slide | Primary source | Fallback |
|-------|---------------|----------|
| 1. Title | Lesson README → Pavadinimas; module from folder path | Folder name parsing |
| 2. Start questions | Teacher_Plan → "Pamokos pradžios klausimai" | FAIL — cannot generate without questions |
| 3. Goals | Teacher_Plan → objectives box | FAIL — cannot generate without objectives |
| 4. Task brief | Teacher_Plan → application phase | For I lessons: teaching phase integration targets |
| 5. Key concepts | Student_Task requirements → Teacher_Plan teaching phase → Theory_Pack | Teacher_Plan teaching phase alone if others missing |
| 6. End questions | Teacher_Plan → "Pamokos pabaigos klausimai" | FAIL — cannot generate without questions |

**Hard requirement:** Teacher_Plan.docx must exist. If it does not, abort
with a message telling the teacher to generate the plan first.

---

## Output

- **File name:** `Visual_Aid.pdf`
- **Pipeline:** Generate `Visual_Aid.docx` → validate → convert via `docx2pdf` → delete intermediate `Visual_Aid.docx`
- **Validation:** Run `python _scripts/spellcheck_lt.py Visual_Aid.docx` before conversion. Fix any flagged errors, then convert.
- **Location:** Same lesson folder as `Teacher_Plan.docx`

---

## What This Document Is NOT

- Not a slide deck — no transitions, no animations, no speaker notes
- Not a handout — never printed, never distributed to students
- Not a full lesson summary — minimal text, maximum readability
- Not a Theory_Pack replacement — key concepts slide is a subset, not a summary
