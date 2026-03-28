# Answer Key Document Format Specification

Two output modes with distinct formatting. Both generated as .docx, Study Key converted to .pdf before delivery.

---

## Grading Key (.docx)

Teacher-internal document. No visual identity matching required.

### Page Setup

- Paper: A4
- Margins: 1" all sides (1440 DXA)
- Content width: 9026 DXA

### Header Structure

1. Label line: "ATSAKYMŲ RAKTAS" — 9pt, #808080, allcaps, centered
2. Title: 16pt bold, #1F4E79, centered
3. Metadata line: grade, module, total points — 10pt, #808080, centered
4. Horizontal rule: #1F4E79, 1pt

### Typography

- Font: Arial throughout
- H1: 16pt bold, #1F4E79, centered — document title
- H2: 13pt bold, #1F4E79 — question type section headers (e.g., "MCQ klausimai", "Trumpi atsakymai")
- H3: 11.5pt bold, #2E75B6 — individual question headers (e.g., "1 klausimas (1 taškas, slenkstinis)")
- Body: 11pt, #333333, line spacing 1.15 (276 TWIPs)

### Accept/Reject Table

3 columns: "Atsakymo variantas", "Įvertinimas", "Pagrindimas"

| Property | Value |
|----------|-------|
| Header row | White text on #1F4E79, ShadingType.CLEAR |
| Body rows | cantSplit: true, border #BFBFBF |
| Cell margins | 60 DXA top/bottom, 100 DXA left/right |
| Credit column values | "Pilnas balas", "Dalinis balas (X tšk.)", "0 taškų" |
| Decimal separator | Comma (Lithuanian): 0,5 not 0.5 |

### Code Blocks

- Font: Consolas 10pt
- Background: #F2F2F2
- Padding: 4pt

### Footer

- Every page: "Vidinis dokumentas. Neskelbti mokiniams."
- Style: 8pt, #808080, centered

### Page Breaks

Never use explicit page breaks. Control flow with keepNext, keepLines, and cantSplit only.

### Section Order Per Question

1. Question number + text + point value + competency level
2. Correct answer (bold)
3. Accept/reject table (for MCQ) or model answer + alternatives table (for open questions)
4. Partial credit rules
5. Boundary cases (if applicable)

---

## Study Key (.pdf)

Student-facing document. Matches Student_Task visual identity exactly (same fonts, colors, sizes).

### Page Setup

- Paper: A4
- Margins: 1" all sides (1440 DXA)
- Content width: 9026 DXA

### Header Structure

1. Label: "ATSAKYMAI" — 9pt, #808080, allcaps, centered
2. Title: 18pt bold, #1F4E79, centered
3. Metadata: 10pt, #808080, centered
4. Horizontal rule: #1F4E79, 1pt

### Typography

- H2: 13pt bold, #1F4E79 — section headers
- H3: 11.5pt bold, #2E75B6, keepNext, keepLines — individual question headers
- Body: 11pt, #333333, line spacing 1.15 (276 TWIPs)

### Correct Answer Highlight

- Bold + #2E7D32 (green) text color

### Callout Boxes

**Misconception callout ("Dažna klaida:"):**

| Property | Value |
|----------|-------|
| Background | #FFF3E0 (light orange) |
| Left border | 3pt #FF9800 (orange) |
| Padding | 8pt |
| Header | "Dažna klaida:" in bold 11pt |

**Explanation callout ("Kodėl tai veikia:"):**

| Property | Value |
|----------|-------|
| Background | #E8F5E9 (light green) |
| Left border | 3pt #4CAF50 (green) |
| Padding | 8pt |
| Header | "Kodėl tai veikia:" in bold 11pt |

### Code Blocks

**Standard code:**
- Font: Consolas 10pt
- Background: #F2F2F2
- Padding: 4pt

**Broken code (common bugs):**
- Font: Consolas 10pt
- Background: #FFEBEE (light red)
- Left border: 3pt #F44336 (red)

### Footer

No footer watermark (student-facing document).

### Page Breaks

Never use explicit page breaks. Control flow with keepNext, keepLines, and cantSplit only.

### Section Order Per Question

1. Question number + text (no point value)
2. Correct answer (highlighted green)
3. Explanation of why correct
4. Explanation of why each wrong option is wrong
5. "Dažna klaida" callout box (if applicable)
6. Cross-reference to Theory_Pack (if applicable)

---

## Length Guidelines

| Assessment Type | Grading Key | Study Key |
|----------------|-------------|-----------|
| Theory (MCQ + short answer) | 2-4 pages | 4-8 pages |
| Programming (code tasks) | 3-5 pages | 5-10 pages |
| Mixed format | 3-6 pages | 6-12 pages |
