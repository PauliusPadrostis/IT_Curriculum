# Plan Format Reference

Typography-first formatting for Teacher_Plan.docx. Clear section boundaries
through spacing, bold headings, colored text, and horizontal rules. No
decorative tables.

---

## Color Palette (5 colors)

| Token | Hex | Use |
|-------|-----|-----|
| TITLE | 1A237E | Lesson title text |
| TEACHING | 1565C0 | Teaching phase header, sub-block headings, title rule, objectives accent |
| RETRIEVAL | F57C00 | Retrieval phase headers, question numbers |
| APPLICATION | 2E7D32 | Application phase header |
| SECONDARY | 757575 | Metadata labels, timing text, diary section, horizontal rules |

Body text: `333333`. White: `FFFFFF`.

---

## Page Setup

- A4 portrait: 11906 × 16838 DXA
- Margins: 2 cm all sides (1134 DXA)
- Font: Arial 11pt (size: 22) body, Consolas 9.5pt (size: 19) code
- Body text color: `333333`
- Line spacing: 1.15 (276 twips)

---

## Section Order

```
1. Title + blue rule
2. Metadata card (table)
3. Objectives box (table)
4. Phase: Pamokos pradžios klausimai
5. Phase: Dėstymas (with sub-blocks)
6. Phase: Taikymo užduotis / Savarankiška užduotis
7. Phase: Pamokos pabaigos klausimai
8. Grey rule + Diary entry
```

---

## Section Formats

### 1. Title

Bold 18pt (size: 36), color TITLE (`1A237E`). Not a HeadingLevel — plain styled paragraph.

Followed by a thin horizontal rule: empty paragraph with `border.bottom`:
`{ style: BorderStyle.SINGLE, size: 6, color: "1565C0", space: 1 }`.
Spacing after rule: 200 twips.

### 2. Metadata Card

Two-column borderless table. Background `F8F9FA` on all cells.

- Column widths: `[2400, 7238]` (total = content width 9638)
- No outer borders. Thin bottom border per row: `EEEEEE`, size 4
- Left column: bold `424242` labels (Tipas, Klasė, Trukmė, Forma, Temos ribos)
- Right column: normal `333333` values
- Cell margins: 60 top/bottom, 120 left/right

### 3. Objectives Box

Single-cell table. Background `EDE7F6`.

- Left border: 6pt (48 eighths), color TEACHING (`1565C0`)
- Other borders: thin `E0E0E0`
- Label: "PAMOKOS TIKSLAI" — bold `4A148C`, 11pt, spacing.after: 80
- Objectives: `▸` in bold TEACHING color, then objective text
- Cell margins: 120 all sides
- `cantSplit: true`

### 4. Phase Headers

**A bold paragraph + horizontal rule underneath.** No tables.

- Text: bold 14pt (size: 28), color = phase color
- Timing appended in same paragraph: normal 10pt (size: 20), color SECONDARY
- `spacing.before: 400` — generous gap above to mark section boundary
- `keepNext: true`
- Followed by: horizontal rule paragraph with `border.bottom` in phase color,
  size 4, then `spacing.after: 120`

Phase-to-color:
- Pamokos pradžios/pabaigos klausimai → RETRIEVAL (`F57C00`)
- Dėstymas → TEACHING (`1565C0`)
- Taikymo užduotis / Savarankiška užduotis → APPLICATION (`2E7D32`)

```js
// Phase header
new Paragraph({
  spacing: { before: 400, after: 0 },
  keepNext: true,
  children: [
    new TextRun({ text: "Dėstymas ir vedama praktika", bold: true, color: "1565C0", size: 28, font: "Arial" }),
    new TextRun({ text: " — ~22 min.", color: "757575", size: 20, font: "Arial" }),
  ],
}),
// Rule under phase header
new Paragraph({
  border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: "1565C0", space: 1 } },
  spacing: { after: 120 },
  keepNext: true,
  children: [],
}),
```

### 5. Teaching Sub-block Headings

**Bold colored text + generous whitespace above.** No tables, no backgrounds, no borders.

- Text: bold 12pt (size: 24), color TEACHING (`1565C0`)
- Timing appended: normal 10pt (size: 20), color SECONDARY
- `spacing.before: 300` — visible gap separating sub-blocks
- `keepNext: true`

```js
new Paragraph({
  spacing: { before: 300, after: 80 },
  keepNext: true,
  children: [
    new TextRun({ text: "Slaptažodžių sauga", bold: true, color: "1565C0", size: 24, font: "Arial" }),
    new TextRun({ text: " — ~8 min.", color: "757575", size: 20, font: "Arial" }),
  ],
}),
```

### 6. Questions (numbered)

One paragraph per question. Indent 360 DXA.

- Number: bold, phase color, 11pt
- Question text: normal `333333`
- Spacing.after: 60

### 7. Warning Boxes

Shaded paragraph. Background `FFF8E1`. Indent 240 DXA.

- `spacing.before: 200, after: 80`
- `keepLines: true`
- First run: bold "⚠ Dažna klaida: " in `E65100`
- Description: normal `333333`
- Rule (at end): bold `333333`, starts with "Taisyklė: "

### 8. Labeled Text

Bold label + normal value in one paragraph.

- Label: bold `424242`
- Value: normal `333333`

Used for: "Formatas:", "Mokytojo veiksmai:", "Mokinių veiksmai:", "Ką stebėti:" etc.

### 9. Bridge Text

Italic 10pt, color `616161`, indent 240 DXA. For retrieval-to-topic transitions.

### 10. Body Paragraphs

Normal 11pt `333333`. Spacing.after: 80. Bullet paragraphs use `•` character
with indent 720/360 (left/hanging).

### 11. Diary Section

- Grey horizontal rule: `border.bottom` size 8, color SECONDARY. `keepNext: true`.
- Label: "PAMOKOS APRAŠYMAS (DIENYNUI)" — bold SECONDARY. `keepNext: true`.
- Content: italic 10.5pt (size: 21), color `616161`.

---

## Page Break Rules

1. Phase headers `keepNext: true` — prevents orphaned headers
2. First 2 body paragraphs after a phase header: `keepNext: true`
3. Objectives box: `cantSplit: true`
4. Warning paragraphs: `keepLines: true`
5. Diary rule + label: both `keepNext: true`
6. No explicit page breaks unless estimated content volume exceeds 1.5 pages before the application phase

---

## docx-js Setup

```js
// Document structure
new Document({
  styles: {
    default: { document: { run: { font: "Arial", size: 22, color: "333333" } } },
  },
  sections: [{
    properties: {
      page: {
        size: { width: 11906, height: 16838 },
        margin: { top: 1134, bottom: 1134, left: 1134, right: 1134 },
      },
    },
    children: [ /* all content */ ],
  }],
});
```

No HeadingLevel styles. No headers/footers. No page numbers.
All shading uses `ShadingType.CLEAR`, never SOLID.
Lithuanian text as plain UTF-8, never `\u` escapes (except `\u201E`/`\u201C` for quotes).
