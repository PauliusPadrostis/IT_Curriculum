# Practice Task Format Reference

Defines the exact structure and formatting of Practice_Task.pdf output.

---

## Design Philosophy

A Practice_Task is a self-sufficient practice document. The student works through it
independently before an A (assessment) lesson. It must:

- **Self-sufficient** — student can complete all questions without teacher guidance.
  No explanation required to begin.
- **Grouped by topic** — questions are organized by topic so the student can
  identify exactly where their gaps are (self-diagnosis).
- **No grading pressure** — no point values anywhere in the document. This is
  preparation, not evaluation. The student should feel safe attempting every item.
- **Revision-ready** — the KĄ DARYTI, JEI SUNKU section gives concrete pointers
  back to specific lesson materials so the student can close gaps independently.

---

## Document Structure

### Section Order (exact)

```
1. HEADER
2. KĄ PADARYSITE
3. UŽDUOTYS
4. PATIKRINKITE SAVE
5. KĄ DARYTI, JEI SUNKU
```

---

### 1. HEADER

```
[centered, grey #808080, 9pt, allcaps] PRAKTINĖS UŽDUOTYS
[centered, navy #1F4E79, 18pt bold] {Practice task title in Lithuanian}
[centered, grey #808080, 10pt] {Grade} klasė  •  {Module name}  •  tipas „P"
[navy #1F4E79 horizontal rule, 1pt]
```

---

### 2. KĄ PADARYSITE

**H2 heading.** 2–3 sentences linking this practice to the upcoming A lesson.
Explains what the student is preparing for and why the practice is useful.

```
Šiomis užduotimis pasiruošite atsiskaitomajam darbui apie {topic}.
Pasitikrinsite, ką prisimenate iš {lesson references}.
Jei kai kurių atsakymų neprisimenat, skyriuje „Ką daryti, jei sunku"
rasite nuorodas į konkrečias temas.
```

**Rules:**
- Second person formal ("jūs" form).
- Reference the A lesson this practice prepares for.
- No motivational fluff. Plain statement of purpose.

---

### 3. UŽDUOTYS

**H2 heading.** Questions grouped by topic.

**Structure:**
- One H3 heading per topic group: numbered, e.g. `1. Ergonomika`, `2. Duomenų sauga`.
- Questions numbered within each group (restart numbering per group or continue
  sequentially — be consistent within the document).
- No point values anywhere.
- Mix of question types (MCQ, short answer, scenario, code task, practical task)
  as appropriate for the topic.

**Topic group example:**

```
[H3] 1. Ergonomika

1. [MCQ question]
   A. ...
   B. ...
   C. ...
   D. ...

2. [Short answer question] Atsakykite 1–2 sakiniais.

3. [Scenario question] Atsakykite 2–3 sakiniais.
```

**Rules:**
- H3 heading for every topic group. No unnested questions.
- No correct answer marking anywhere.
- No scoring breakdown visible to the student.
- 2–5 questions per topic group.
- Total question count across all groups: 8–16 questions (to fit 2–4 pages).

---

### 4. PATIKRINKITE SAVE

**H2 heading.** Self-assessment checklist. Items in "Ar galiu užtikrintai [verb]?"
format, using ☐ (U+2610).

```
☐ Ar galiu užtikrintai paaiškinti, kas yra ergonomiška darbo vieta?
☐ Ar galiu užtikrintai nurodyti bent tris duomenų saugos taisykles?
☐ Ar galiu užtikrintai apibūdinti, kaip veikia slaptažodžių valdymas?
```

**Rules:**
- 4–8 items, one per major competency covered in UŽDUOTYS.
- Every item starts "Ar galiu užtikrintai".
- Items are yes/no. No partial or graded options.
- Follow the order of topic groups in UŽDUOTYS.

---

### 5. KĄ DARYTI, JEI SUNKU

**H2 heading.** Revision pointers per topic. Table format.

| Tema | Kur peržiūrėti |
|------|----------------|
| Ergonomika | {Lesson number}, Theory_Pack p. {section} |
| Duomenų sauga | {Lesson number}, Theory_Pack p. {section} |

**Rules:**
- One row per topic group from UŽDUOTYS. Same order.
- "Kur peržiūrėti" column: lesson number (e.g. `001_L`) and Theory_Pack section
  reference where the topic was taught.
- Table has a header row (navy background, white text).
- No additional commentary. The table is the entire section.

---

## Formatting Specs

Identical to Student_Task visual identity. Uses python-docx for generation.

| Element | Specification |
|---------|--------------|
| Page | A4 (11906 x 16838 DXA), 1" margins (2.54 cm / 1440 DXA), content width 9026 DXA |
| Font | Arial throughout |
| Body | 11pt, color #333333, line spacing 1.15, spacing after 80 |
| H1 (task title) | 18pt bold, #1F4E79, centered |
| H2 (section headings) | 13pt bold, #1F4E79, spacing before 300, spacing after 120 |
| H3 (topic group headings) | 11.5pt bold, #2E75B6, spacing before 240, spacing after 80 |
| Label line (PRAKTINĖS UŽDUOTYS) | 9pt, #808080, centered, allcaps |
| Metadata line (grade / module / type) | 10pt, #808080, centered |
| Horizontal rule | #1F4E79, 1pt |
| Code blocks | Consolas 10pt, background #F2F2F2, 4pt padding |
| Tables | DXA widths, cell margins 60/100, border #BFBFBF single sz=4 |
| Table header row | White text on #1F4E79, shading clear |
| Checklist items | ☐ (U+2610) + space, spacing after 60 |
| MCQ options | Lettered (A, B, C, D), indented, no bullet character |
| Page breaks | Never explicit. Use keepNext/keepLines/cantSplit only. |

### Paragraph Spacing (TWIPs)

| Element | before | after |
|---------|--------|-------|
| Label line (PRAKTINĖS UŽDUOTYS) | — | 60 |
| Title (task name) | — | 60 |
| Metadata line (grade/module) | — | 80 |
| H2 (section headings) | 300 | 120 |
| H3 (topic group headings) | 240 | 80 |
| Body paragraphs | — | 80 |
| MCQ option lines | — | 40 |
| Checklist items | — | 60 |

---

## Question Formatting by Type

### MCQ

Question text as a plain paragraph. Bold question number + topic label optional.
Options lettered A–D, each on its own line, indented (left indent ~360 DXA).
No correct answer marking. No point value.

```
1. Klausimo tekstas?
   A. Pirmas atsakymas
   B. Antras atsakymas
   C. Trečias atsakymas
   D. Ketvirtas atsakymas
```

### Short Answer / Scenario

Question text as a plain paragraph followed by a scope hint in parentheses.

```
2. Klausimo tekstas. Atsakykite 1–2 sakiniais.

3. Situacijos aprašymas. Atsakykite 2–3 sakiniais.
```

### Code Task

Question text as a plain paragraph, then a code block (Consolas 10pt, #F2F2F2
background), then an instruction line below the block.

```
4. Klausimo tekstas apie kodą.

[code block]

Paaiškinkite, ką šis kodas daro. Atsakykite 1–2 sakiniais.
```

### Practical Task

Task description as a plain paragraph followed by numbered requirements.

```
5. Užduoties aprašymas.
   1. Pirmas reikalavimas.
   2. Antras reikalavimas.
   3. Trečias reikalavimas.
```

---

## Length Target

2–4 pages. If exceeding 4 pages: reduce question count per topic group, shorten
scenario texts, or split into two separate practice documents.

---

## .docx Generation Notes

- Use **python-docx** (not docx-js).
- Generate intermediate `.docx`, then convert to PDF via **docx2pdf**.
- Delete the intermediate `.docx` after successful PDF conversion.
- Verify PDF file size is non-zero before reporting success.
- All Lithuanian text as plain UTF-8 strings. No `\u` unicode escapes for
  Lithuanian letters (ą, č, ę, ė, į, š, ų, ū, ž). Exception: typographic quotes
  `\u201E` and `\u201C` if needed in string context.
- Run lt-qa POST-GEN check on all Lithuanian text before finalizing.
