# Assessment Output Format Reference

Defines the document structure for Assessment_Task.docx and Rubric.docx. Matches the visual identity of Student_Task and Theory_Pack.

**Note:** For Testmoz-based assessments, Assessment_Task is an .xlsx file (see `testmoz_format.md`). This format spec applies only to practical/mixed assessments that produce a PDF.

---

## Assessment_Task.docx Structure

### Header

```
[centered, grey #808080, 9pt, allcaps] ATSISKAITOMASIS DARBAS
[centered, navy #1F4E79, 18pt bold] {Lesson code} {Assessment title}
[centered, grey #808080, 10pt] {Grade} klasė  •  Trukmė: {duration} min  •  {Conditions}
[centered, grey #808080, 10pt] Leidžiamos priemonės: {allowed tools}
[navy #1F4E79 horizontal rule, 1pt]
```

### Body Sections (in order)

| # | Section | H2 Title | Content |
|---|---------|----------|---------|
| 1 | Task description | Užduoties aprašymas | What the student must do (2-4 sentences). Concrete outcome, formal "jūs" address. |
| 2 | Requirements | Reikalavimai | Numbered list. Each item: concrete requirement + point value in parentheses. |
| 3 | Input data (if applicable) | Pradiniai duomenys | Description of provided data files, format, record count. |
| 4 | Submission instructions | Pateikimo tvarka | What to submit: file names, formats, naming conventions. |
| 5 | Grading summary | Vertinimo kriterijai | Brief reference to Rubric document. "Išsamus vertinimo aprašas pateiktas Vertinimo kriterijų lape." |

### Programming Task Addenda

For C++ programming assessments, add after Reikalavimai:

| Section | H2 Title | Content |
|---------|----------|---------|
| Input format | Įvesties formatas | Exact input specification with data types and constraints |
| Output format | Išvesties formatas | Exact expected output specification |
| Examples | Pavyzdžiai | 2-3 sample input/output pairs in code block format |

Code blocks: Consolas 10pt, background #F2F2F2, 4pt padding.

---

## Rubric.docx Structure

### Header

```
[centered, grey #808080, 9pt, allcaps] VERTINIMO KRITERIJAI
[centered, navy #1F4E79, 18pt bold] {Lesson code} {Assessment title}
[centered, grey #808080, 10pt] {Grade} klasė  •  {Module name}
[navy #1F4E79 horizontal rule, 1pt]
```

### Body — Practical Task Rubric

Criteria table with performance levels:

| Kriterijus | Aukštesnysis (9-10) | Pagrindinis (7-8) | Patenkinamas (5-6) | Slenkstinis (4) | Max taškai |
|------------|--------------------|--------------------|--------------------|-----------------|----|
| {Criterion 1} | {Specific descriptor} | {Specific descriptor} | {Specific descriptor} | {Specific descriptor} | {N} |

- 3-6 criteria rows
- Descriptors must be specific and observable (not "gerai supranta")
- Total row at bottom

### Body — MCQ/Short Answer Rubric

Point-per-question table:

| Klausimas | Kompetencijos lygis | Taškai | Pastabos |
|-----------|--------------------:|-------:|----------|
| 1. {Question summary} | Slenkstinis | 1 | |
| 2. {Question summary} | Patenkinamas | 2 | Priimtini atsakymo variantai: ... |

### Conversion Table (always included)

| Taškai | Pažymys |
|-------:|--------:|
| {95%+} | 10 |
| {85-94%} | 9 |
| {75-84%} | 8 |
| {65-74%} | 7 |
| {55-64%} | 6 |
| {45-54%} | 5 |
| {30-44%} | 4 |
| {20-29%} | 3 |
| {10-19%} | 2 |
| {0-9%} | 1 |

**Iš viso: {total} taškų**

---

## Formatting Specs (docx-js)

Matches existing student-facing document visual identity:

| Element | Specification |
|---------|--------------|
| Page | A4 (11906 x 16838 DXA), 1" margins (1440 DXA), content width 9026 DXA |
| Font | Arial throughout |
| Body | 11pt (size 22), line spacing 1.15 (line 276), color #333333 |
| H1 | 16pt bold, #1F4E79, centered, keepNext, keepLines |
| H2 | 13pt bold, #1F4E79 |
| H3 | 11.5pt bold, #2E75B6, keepNext, keepLines |
| Label line | 9pt, #808080, centered, allcaps |
| Metadata | 10pt, #808080, centered |
| Horizontal rule | #1F4E79, 1pt |
| Tables | DXA widths, cell margins 60/100, border #BFBFBF |
| Table header row | White text on #1F4E79, ShadingType.CLEAR |
| Table body rows | cantSplit: true |
| Code blocks | Consolas 10pt, background #F2F2F2, 4pt padding |
| Page breaks | Never explicit. Use keepNext/keepLines/cantSplit only. |

### Length Guidelines

| Assessment Type | Assessment_Task | Rubric |
|----------------|-----------------|--------|
| Practical task | 1-2 pages | 1 page |
| Programming task | 2-3 pages (includes I/O specs + examples) | 1 page |
| Mixed format | 2-3 pages | 1-2 pages |
