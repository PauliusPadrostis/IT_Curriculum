# Plan Format Reference

Defines the exact structure and formatting of Teacher_Plan.docx output.

**For .docx generation mechanics**, read the docx skill at
`/mnt/skills/public/docx/SKILL.md` — it contains the docx-js setup,
table formatting, styles, and validation rules.

---

## Document Structure

The plan is a single-page-flow Word document. No table of contents,
no page numbers, no headers/footers. Clean and compact.

### Section Order

Every plan follows this exact order. Sections marked [conditional]
are included only when applicable.

```
1. ANTRAŠTĖ (lesson title) — styled paragraph, NOT a heading style
2. PAMOKOS KONTEKSTAS — metadata card table
3. PAMOKOS TIKSLAI — objectives box
4. FAZĖ: Pamokos pradžios klausimai [if L/I/P] — phase block
5. FAZĖ: Dėstymas / Taikymas / etc. — one or more phase blocks
6. FAZĖ: Pamokos pabaigos klausimai [if L/I/P] — phase block
7. NAMŲ DARBAS [conditional] — homework section
8. PAMOKOS APRAŠYMAS (dienynui) — diary entry
```

---

## Color Palette

Hardcode these hex values. Never approximate or substitute.

| Token | Hex | Use |
|-------|-----|-----|
| RETRIEVAL_BG | FFF3E0 | Entry/exit retrieval phase background |
| RETRIEVAL_ACCENT | F57C00 | Retrieval phase accent stripe + question numbers |
| TEACHING_BG | E3F2FD | Teaching/demo phase background |
| TEACHING_ACCENT | 1565C0 | Teaching phase accent stripe |
| APPLICATION_BG | E8F5E9 | Application phase background |
| APPLICATION_ACCENT | 2E7D32 | Application phase accent stripe |
| DIARY_ACCENT | 757575 | Homework and diary section labels |
| META_BG | F8F9FA | Metadata card background |
| OBJ_BG | EDE7F6 | Objectives box background |
| OBJ_ACCENT | 5E35B1 | Objectives box left border |
| CODE_BG | F5F5F5 | Code block shading |
| TABLE_HEADER | E3F2FD | Table header row |
| TABLE_ALT | FAFAFA | Table alternating row |
| BORDER_LIGHT | E0E0E0 | General light borders |
| TITLE_LINE | 1565C0 | Blue line under lesson title |
| WARNING_BG | FFF8E1 | Common mistake warning box |
| WARNING_TEXT | E65100 | Warning label color |
| TITLE_COLOR | 1A237E | Lesson title text |

### Phase-to-color mapping

| Phase name pattern | Background | Accent |
|-------------------|------------|--------|
| Pamokos pradžios klausimai | RETRIEVAL_BG | RETRIEVAL_ACCENT |
| Pamokos pabaigos klausimai | RETRIEVAL_BG | RETRIEVAL_ACCENT |

Phase name detection regex (for code): `/pradžios klausimai|pabaigos klausimai/i` → RETRIEVAL
| Dėstymas / any teaching block | TEACHING_BG | TEACHING_ACCENT |
| Taikymo užduotys / application | APPLICATION_BG | APPLICATION_ACCENT |

---

## Section Formats

### 1. Antraštė (Title)

A styled paragraph — **NOT** a Word heading style (no HeadingLevel).

- Font: Arial **18pt bold**, color `1A237E` (TITLE_COLOR)
- Followed by a **blue horizontal rule**: a separate paragraph with
  `border.bottom` set to `single`, size 6pt (48 eighths-of-a-point),
  color `1565C0` (TITLE_LINE). The paragraph itself has no text content.
- Spacing: 120 TWIPs after the title paragraph, 0 after the rule paragraph.

```js
// Title paragraph
new Paragraph({
  children: [new TextRun({ text: title, bold: true, size: 36, font: "Arial", color: "1A237E" })],
  spacing: { after: 120 },
}),
// Blue horizontal rule
new Paragraph({
  border: { bottom: { style: BorderStyle.SINGLE, size: 48, color: "1565C0" } },
  spacing: { after: 200 },
}),
```

### 2. Pamokos kontekstas (Metadata card)

A **two-column borderless table** on META_BG (`F8F9FA`) background.

- Layout: `TableLayoutType.FIXED`, columnWidths `[2400, 7200]` (narrow label, wide value)
- **No outer borders** — all borders `BorderStyle.NONE`
- Each row has a thin bottom border: `EEEEEE`, 4 eighths-of-a-point
- Left column: bold labels in `424242` — Tipas, Klasė, Trukmė, Forma, Temos ribos
- Right column: normal text in `212121`
- Cell shading: `ShadingType.CLEAR`, fill `F8F9FA` on all cells
- Cell margins: 60 DXA top/bottom, 120 DXA left/right

Fields:
- **Tipas** — code + full name + position in sequence (if known)
- **Klasė** — grade number
- **Trukmė** — always `~40 min.`
- **Forma** — selected shape from decision framework
- **Temos ribos** — 2-3 sentences on scope

### 3. Pamokos tikslai (Objectives box)

A **single-cell table** with colored background and thick left accent border.

- Background: `EDE7F6` (OBJ_BG), `ShadingType.CLEAR`
- Left border: **8pt** (64 eighths), color `5E35B1` (OBJ_ACCENT), `BorderStyle.SINGLE`
- Top/right/bottom borders: 4 eighths, `E0E0E0` (BORDER_LIGHT), `BorderStyle.SINGLE`
- Label: "PAMOKOS TIKSLAI" — bold, color `4A148C`, Arial 11pt, spacing after 80
- Objectives: bullet list using `▸` character prefix (TextRun, not numbering)
  - Each objective: `▸` in bold `5E35B1`, then space, then objective text in `212121`
  - One paragraph per objective
- Cell margins: 120 DXA all sides

### 4–6. Fazės (Phase blocks)

#### Phase header

A **two-column table** acting as a colored banner:

- Layout: `TableLayoutType.FIXED`, columnWidths `[200, 9400]`
- **No borders** — all `BorderStyle.NONE`
- Left cell: filled entirely with the phase accent color (solid stripe).
  Shading: `ShadingType.CLEAR`, fill = accent hex. Contains an empty paragraph.
- Right cell: filled with the phase background color.
  Contains two TextRuns in one paragraph:
  - Phase title: bold, accent color, Arial **12pt** (size: 24)
  - Timing: normal, color `757575`, Arial **10pt** (size: 20), preceded by " — "

```js
// Example for retrieval phase
new Table({
  layout: TableLayoutType.FIXED,
  columnWidths: [200, 9400],
  borders: /* all NONE */,
  rows: [new TableRow({
    children: [
      new TableCell({
        shading: { type: ShadingType.CLEAR, fill: "F57C00" },
        children: [new Paragraph({})],
        width: { size: 200, type: WidthType.DXA },
      }),
      new TableCell({
        shading: { type: ShadingType.CLEAR, fill: "FFF3E0" },
        children: [new Paragraph({
          children: [
            new TextRun({ text: "Pamokos pradžios klausimai", bold: true, color: "F57C00", size: 24, font: "Arial" }),
            new TextRun({ text: " — ~5 min.", color: "757575", size: 20, font: "Arial" }),
          ],
        })],
        width: { size: 9400, type: WidthType.DXA },
      }),
    ],
  })],
})
```

#### Phase content

After the phase header table, the phase body follows as normal paragraphs.
Content depends on phase type (see Section Formats in SKILL.md for content rules).
All content paragraphs use Arial 11pt (size: 22), color `212121`.

#### Retrieval phases (entry/exit)

- Format reminder: labeled text (see §9 below). "Formatas:" bold `424242`,
  then "žodinis" in normal `212121`.
- Questions: numbered with accent-colored bold numbers.
  Each question is one paragraph, indent `360 DXA` (left).
  Number TextRun: bold, color = phase accent (e.g., `F57C00`), text "1. "
  Question TextRun: normal, color `212121`.
- Bridge text: italic, 10pt, color `616161`, indent 240 DXA (see §10 below).

#### Teaching/demo phases

- Teacher actions in imperative voice as body paragraphs.
- Code examples: see §7 below.
- Common mistake warnings: see §6 below.
- Labeled explanations: see §9 below.

#### Application/practice phases

- Brief intro paragraph.
- Task tables: see §8 below.
- Self-check: body paragraph.
- Extension: labeled text for stronger students.

### 5. Questions (numbered, accent-colored)

One paragraph per question. Left indent: 360 DXA.

```js
new Paragraph({
  indent: { left: 360 },
  spacing: { after: 60 },
  children: [
    new TextRun({ text: "1. ", bold: true, color: "F57C00", font: "Arial", size: 22 }),
    new TextRun({ text: "Kuo skiriasi rastrinė grafika nuo vektorinės?", color: "212121", font: "Arial", size: 22 }),
  ],
})
```

### 6. Common mistake warnings

Paragraph with WARNING_BG shading, indented 240 DXA.

- Shading: `ShadingType.CLEAR`, fill `FFF8E1` (WARNING_BG)
- First TextRun: bold "⚠ Dažna klaida: " in `E65100` (WARNING_TEXT)
- Description TextRun: normal `212121`
- Rule TextRun (at end): bold `212121`, starts with "Taisyklė: "

```js
new Paragraph({
  indent: { left: 240 },
  shading: { type: ShadingType.CLEAR, fill: "FFF8E1" },
  spacing: { before: 80, after: 80 },
  children: [
    new TextRun({ text: "⚠ Dažna klaida: ", bold: true, color: "E65100", font: "Arial", size: 22 }),
    new TextRun({ text: "rašyti turinį tiesiai į <head>. ", color: "212121", font: "Arial", size: 22 }),
    new TextRun({ text: "Taisyklė: jei nori, kad matytųsi — viskas į <body>.", bold: true, color: "212121", font: "Arial", size: 22 }),
  ],
})
```

### 7. Code blocks

Each line of code as a **separate paragraph** with CODE_BG shading.

- Font: Consolas **9.5pt** (size: 19)
- Color: `37474F`
- Shading: `ShadingType.CLEAR`, fill `F5F5F5` (CODE_BG)
- Indent: left 240 DXA
- Spacing: 0 after (lines pack tightly), 80 before first code line, 80 after last

```js
new Paragraph({
  indent: { left: 240 },
  shading: { type: ShadingType.CLEAR, fill: "F5F5F5" },
  spacing: { after: 0 },
  children: [
    new TextRun({ text: '  <html lang="lt">', font: "Consolas", size: 19, color: "37474F" }),
  ],
})
```

### 8. Task tables

- Borders: all `BORDER_LIGHT` (`E0E0E0`), thin (4 eighths)
- Header row: shading `E3F2FD` (TABLE_HEADER), bold text color `1565C0`
- Data rows: alternating — odd rows white, even rows `FAFAFA` (TABLE_ALT)
- Cell margins: 60 DXA top/bottom, 120 DXA left/right
- Font: Arial 11pt (size: 22)

### 9. Labeled text

Bold label followed by normal text in the **same paragraph**. No line break.

- Label TextRun: bold, color `424242`
- Value TextRun: normal, color `212121`
- Used for: "Formatas:", "Apibrėžimas:", "Greitas atgaminimas:", etc.

```js
new Paragraph({
  children: [
    new TextRun({ text: "Formatas: ", bold: true, color: "424242", font: "Arial", size: 22 }),
    new TextRun({ text: "žodinis.", color: "212121", font: "Arial", size: 22 }),
  ],
})
```

### 10. Bridge / connection text

Italic, 10pt, color `616161`, indented 240 DXA. Used for retrieval-to-topic
bridges and transitional notes.

```js
new Paragraph({
  indent: { left: 240 },
  children: [
    new TextRun({ text: "(Ryšys su nauja tema: ...)", italics: true, color: "616161", font: "Arial", size: 20 }),
  ],
})
```

### 11. Homework section

- Preceded by a **horizontal rule** in DIARY_ACCENT: paragraph with
  `border.bottom` single, size 8, color `757575`
- Label: "NAMŲ DARBAS" — bold, color `757575` (DIARY_ACCENT), Arial 11pt
- Content: normal body text, Arial 11pt, color `212121`

### 12. Diary entry

- Preceded by a **horizontal rule** in DIARY_ACCENT (same as homework)
- Label: "PAMOKOS APRAŠYMAS (DIENYNUI)" — bold, color `757575`
- Content: italic **10.5pt** (size: 21), color `616161`

---

## Formatting Rules

### Page setup
- **Page size:** A4
- **Margins:** 2 cm all sides = **1134 DXA** each (top, bottom, left, right)
- **Font:** Arial 11pt (size: 22) body text, Consolas 9.5pt (size: 19) for code
- **Body text color:** `212121`

### Typography
- **Paragraph spacing:** 80 TWIPs after body paragraphs (default)
- **Section spacing:** 200 TWIPs before each new section (phase headers, objectives box, etc.)
- No extra spacing inside phase content blocks beyond default

### Spacers between sections
- Use empty paragraphs with `spacing.before` set as needed
- Value in TWIPs = desired points × 20 (e.g., 10pt gap = 200 TWIPs)

### Horizontal rules
- Always rendered as paragraphs with `border.bottom`, **never** as tables
- Title rule: size 48 (6pt), color `1565C0`
- Section divider rules: size 8 (1pt), color `757575`

### Page breaks

Page breaks must be **purposeful** — never allow a phase header to sit alone
at the bottom of a page with its content on the next page.

Rules:
1. **Phase headers keep with next.** Every phase header table must have
   `cantSplit: true` on the TableRow, AND the first 2–3 content paragraphs
   after the header must have `keepNext: true`. This prevents Word from
   placing the header at the bottom of a page and the content on the next.
2. **Objectives box keeps together.** The objectives table must have
   `cantSplit: true` so it is never split across pages.
3. **Warning boxes keep together.** Warning paragraphs must use
   `keepLines: true` so they don't break mid-paragraph.
4. **Explicit page breaks before phases when needed.** If the teaching
   phase or application phase would start in the bottom third of a page
   (estimated by content volume), insert an explicit page break before the
   phase header spacer: `new Paragraph({ pageBreakBefore: true })`.
   - As a heuristic: if the entry retrieval + teaching intro together
     occupy roughly 20+ paragraphs, consider a page break before the
     application phase.
5. **Never break inside code blocks.** All consecutive code-line paragraphs
   should have `keepNext: true` (except the last one) to keep the block
   on one page.
6. **Diary section starts on same page as its rule.** The horizontal rule
   before the diary entry must have `keepNext: true`.

docx-js implementation:
```js
// Phase header table — prevent orphaned header
new TableRow({ cantSplit: true, children: [...] })

// First content paragraph after phase header — keep with header
new Paragraph({ keepNext: true, ... })

// Explicit page break when needed
new Paragraph({ pageBreakBefore: true })

// Warning paragraph — keep together
new Paragraph({ keepLines: true, ... })
```

### Language
- Lithuanian throughout
- Technical terms (HTML, C++, Excel, etc.) in original language
- Formal imperative: „Paaiškinkite…", „Parodykite…", „Paklauskite…"

---

## .docx Generation

Use the docx skill (`/mnt/skills/public/docx/SKILL.md`) for creation mechanics.

Key setup:
```bash
npm install -g docx
```

Generate with docx-js. Structure the document as a single section with
children array containing all paragraphs, tables, and formatted elements.

### Section configuration

```js
{
  properties: {
    page: {
      size: { width: 11906, height: 16838 }, // A4
      margin: { top: 1134, bottom: 1134, left: 1134, right: 1134 }, // 2cm
    },
  },
  children: [ /* all content elements */ ],
}
```

### Essential docx-js patterns

- **NO HeadingLevel styles** — title and phase headers are styled paragraphs
- Phase header tables: `TableLayoutType.FIXED`, all borders `BorderStyle.NONE`,
  explicit `columnWidths: [200, 9400]`
- Metadata table: `TableLayoutType.FIXED`, no outer borders, row-level bottom
  borders via cell border config
- Objectives box: single-cell table with mixed border styles (thick left 64 eighths
  `5E35B1`, thin others 4 eighths `E0E0E0`)
- Bullets in objectives: `▸` character in TextRun, bold accent color — NOT via
  numbering config
- All shading uses `ShadingType.CLEAR`, **never** `SOLID`
- Horizontal rules: Paragraph with `border.bottom`, never tables
- Separate Paragraph elements for every line (never `\n` in text)
- Code blocks: individual Paragraphs with shading + Consolas font TextRun

After creation, validate:
```bash
python scripts/office/validate.py Teacher_Plan.docx
```

Refer to the docx skill for complete code patterns.
