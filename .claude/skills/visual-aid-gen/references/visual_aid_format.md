# Visual Aid Ã¢â‚¬â€ Document Structure & Formatting

**For .docx generation mechanics**, read the docx skill at
`/mnt/skills/public/docx/SKILL.md` Ã¢â‚¬â€ it contains the docx-js setup,
table formatting, styles, and validation rules.

**For Lithuanian language rules**, read `_references/lt-mistakes.yaml` (CRITICAL
section only) before writing any Lithuanian text. Slide 5 term definitions
are the primary generated Lithuanian content and must pass POST-GEN checks.

## Design Philosophy

A Visual Aid is a 6-page landscape PDF projected on the classroom screen
during L and I lessons. The teacher advances slides as the lesson
progresses. It must be:

- **Readable from 8 meters** Ã¢â‚¬â€ minimum 28pt body text, high contrast
- **Phase-coded** Ã¢â‚¬â€ each slide's accent color matches the Teacher_Plan
  phase palette so students subconsciously track lesson flow
- **Minimal** Ã¢â‚¬â€ large text, maximum whitespace, zero decoration noise
- **Self-pacing** ? slide 5 stays up during independent work or the
  densest teacher-led explanation; it may show terms, warning signs,
  or algorithm steps depending on what the plan needs projected
- **One page per slide** Ã¢â‚¬â€ every slide MUST fit on a single landscape A4
  page. Usable height after margins: ~9638 DXA. Accent bar + spacer
  consume ~1080 DXA, leaving ~8558 DXA (~14 lines at 28pt). If content
  overflows, cut items, never reduce font size.

---

## Page Setup

```
Orientation:  Landscape A4
Page size:    A4 landscape. CRITICAL: pass PORTRAIT dimensions to docx-js
              (width: 11906, height: 16838) with orientation: LANDSCAPE.
              docx-js swaps internally. Visible: 16838 Ãƒâ€” 11906 DXA.
Margins:      2 cm all sides (1134 DXA)
Font:         Arial throughout
Line spacing: 1.5Ãƒâ€” (360 twips) for all body text
Page breaks:  Explicit between each slide (6 pages exactly)
```

---

## Color Palette

Reuses the Teacher_Plan phase-to-color mapping. Hardcode these hex values.

Page background is always white (`FFFFFF`) on slides 2Ã¢â‚¬â€œ6. The _BG phase
colors from the Teacher_Plan palette are NOT used here Ã¢â‚¬â€ only accents.

| Token | Hex | Used on |
|-------|-----|---------|
| TITLE_BG | 1A237E | Slide 1 full background |
| TITLE_TEXT | FFFFFF | Slide 1 all text |
| RETRIEVAL_ACCENT | F57C00 | Slides 2, 6 bar fill + question numbers |
| OBJ_ACCENT | 5E35B1 | Slide 3 bar fill + bullet markers |
| APPLICATION_ACCENT | 2E7D32 | Slide 4 bar fill |
| TEACHING_ACCENT | 1565C0 | Slide 5 bar fill + term highlights |
| BODY_TEXT | 212121 | All body text (slides 2Ã¢â‚¬â€œ6) |

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

### Slide 2: Pamokos pradÃ…Â¾ios klausimai

```
[accent bar: full-width table row, 1.5 cm tall, fill RETRIEVAL_ACCENT]
  [inside bar: white, 28pt, bold] PAMOKOS PRADÃ…Â½IOS KLAUSIMAI
[spacing: 400 twips]
[numbered list, each question on its own line]
  [number: bold, RETRIEVAL_ACCENT, 28pt] 1.
  [question text: BODY_TEXT, 28pt] {question text}
  [spacing between questions: 200 twips]
```

Questions extracted from Teacher_Plan Ã¢â€ â€™ "Pamokos pradÃ…Â¾ios klausimai"
phase. Preserve the exact question text. Typically 3Ã¢â‚¬â€œ5 questions.

---

### Slide 3: Pamokos tikslai

```
[accent bar: full-width table row, 1.5 cm tall, fill OBJ_ACCENT]
  [inside bar: white, 28pt, bold] PAMOKOS TIKSLAI
[spacing: 400 twips]
[bullet list, each objective on its own line]
  [bullet: bold, OBJ_ACCENT, 28pt] Ã¢â€“Â¸
  [objective text: BODY_TEXT, 28pt] {objective text}
  [spacing between objectives: 200 twips]
```

Objectives extracted from Teacher_Plan Ã¢â€ â€™ objectives box. Use the
concise form (typically 2Ã¢â‚¬â€œ4 objectives). If the plan lists 5+
objectives, prioritize the ones directly tied to the lesson task.

---

### Slide 4: U?duotis / vizualinis orientyras

```
[accent bar: full-width table row, 1.5 cm tall, fill APPLICATION_ACCENT]
  [inside bar: white, 28pt, bold] UÃ…Â½DUOTIS
[spacing: 400 twips]
[body text: BODY_TEXT, 28pt] {task description Ã¢â‚¬â€ 2-4 sentences max}
```

**For L lessons:** Brief description of the hands-on task from the
application phase ("Taikymo uÃ…Â¾duotys" / "SavarankiÃ…Â¡ka uÃ…Â¾duotis").

**For I lessons:** If the application phase names a single concrete
deliverable (e.g., "sukurkite plakatÃ„â€¦", "paraÃ…Â¡ykite programÃ„â€¦"), describe
that task briefly. If the application phase has no single deliverable
(multiple activities, discussion-based, or scenario analysis), list
integration targets instead:

```
[body text: BODY_TEXT, 28pt] Ã…Â ios pamokos metu sujungsite:
[bullet list]
  [bullet: bold, APPLICATION_ACCENT, 28pt] Ã¢â€“Â¸
  [target: BODY_TEXT, 28pt] {L lesson topic Ã¢â‚¬â€ what will be applied}
```

Keep to 2Ã¢â‚¬â€œ4 sentences or 3Ã¢â‚¬â€œ4 bullet points maximum. This is a preview,
not the full task sheet.
**Projection-critical exception:** If the Teacher_Plan explicitly says to
show an example, schema, warning-sign list, or worked analysis on screen,
Slide 4 may show that visual scaffold instead of a generic task summary.
Keep the same accent bar and typography. If the lesson also has a task,
end with one short sentence linking the scaffold to the task.

---

### Slide 5: Pagrindin?s s?vokos / sprendimo orientyrai

```
[accent bar: full-width table row, 1.5 cm tall, fill TEACHING_ACCENT]
  [inside bar: white, 28pt, bold] PAGRINDINÃ„â€“S SÃ„â€žVOKOS
[spacing: 400 twips]
[term list, each on its own line]
  [term: bold, TEACHING_ACCENT, 28pt] {Term}
  [colon + definition: BODY_TEXT, 24pt]: {one-line definition}
  [spacing between terms: 160 twips]
```

**Content priority (strict order):**
1. Projection-critical cues from Teacher_Plan that students must keep
   seeing during the main lecture/work block
2. Terms/concepts required to complete the task (highest priority)
3. Core terms from the teaching phase of Teacher_Plan
4. Terms from Theory_Pack (if it exists)
5. Hard cap: **4 items maximum** (5 overflows the page at 28pt/48pt)

Each item = bold cue/term + one-line explanation. Explanation must be a
single sentence, max ~15 words. If the slide uses terminology from the
Theory_Pack table, use that definition (condensed if needed). If the slide
uses an algorithm or warning-sign scaffold, phrase each line as a cue plus
an actionable explanation.

**Note:** Term definitions use 24pt (not 28pt) to fit more content while
keeping terms themselves prominent at 28pt.

**If no Theory_Pack or Student_Task exists:** Build entirely from the
Teacher_Plan teaching phase content.

**If no Theory_Pack or Student_Task exists:** Build entirely from the
Teacher_Plan teaching phase content.

---

### Slide 6: Pamokos pabaigos klausimai

```
[accent bar: full-width table row, 1.5 cm tall, fill RETRIEVAL_ACCENT]
  [inside bar: white, 28pt, bold] PAMOKOS PABAIGOS KLAUSIMAI
[spacing: 400 twips]
[numbered list Ã¢â‚¬â€ same format as Slide 2]
  [number: bold, RETRIEVAL_ACCENT, 28pt] 1.
  [question text: BODY_TEXT, 28pt] {question text}
  [spacing between questions: 200 twips]
```

Questions extracted from Teacher_Plan Ã¢â€ â€™ "Pamokos pabaigos klausimai"
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
| 1. Title | Lesson README Ã¢â€ â€™ Pavadinimas; module from folder path | Folder name parsing |
| 2. Start questions | Teacher_Plan Ã¢â€ â€™ "Pamokos pradÃ…Â¾ios klausimai" | FAIL Ã¢â‚¬â€ cannot generate without questions |
| 3. Goals | Teacher_Plan Ã¢â€ â€™ objectives box | FAIL Ã¢â‚¬â€ cannot generate without objectives |
| 4. Task brief | Teacher_Plan Ã¢â€ â€™ application phase | For I lessons: teaching phase integration targets |
| 5. Key concepts | Student_Task requirements Ã¢â€ â€™ Teacher_Plan teaching phase Ã¢â€ â€™ Theory_Pack | Teacher_Plan teaching phase alone if others missing |
| 6. End questions | Teacher_Plan Ã¢â€ â€™ "Pamokos pabaigos klausimai" | FAIL Ã¢â‚¬â€ cannot generate without questions |

**Hard requirement:** Teacher_Plan.docx must exist. If it does not, abort
with a message telling the teacher to generate the plan first.

---

## Output

- **File name:** `Visual_Aid.pdf`
- **Pipeline:** Generate `Visual_Aid.docx` Ã¢â€ â€™ validate Ã¢â€ â€™ convert via `docx2pdf` Ã¢â€ â€™ delete intermediate `Visual_Aid.docx`
- **Validation:** Run `python _scripts/spellcheck_lt.py Visual_Aid.docx` before conversion. Fix any flagged errors, then convert.
- **Location:** Same lesson folder as `Teacher_Plan.docx`

---

## What This Document Is NOT

- Not a slide deck Ã¢â‚¬â€ no transitions, no animations, no speaker notes
- Not a handout Ã¢â‚¬â€ never printed, never distributed to students
- Not a full lesson summary Ã¢â‚¬â€ minimal text, maximum readability
- Not a Theory_Pack replacement Ã¢â‚¬â€ key concepts slide is a subset, not a summary
