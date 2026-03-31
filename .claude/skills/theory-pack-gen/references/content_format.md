# Theory Pack — Document Structure & Formatting

## Document Header

```
[centered, grey, 9pt, allcaps] TEORIJOS PAKETAS
[centered, navy #1F4E79, 18pt bold] {Topic title in Lithuanian}
[centered, grey, 10pt] {Grade} klasė  •  {Module name}  •  {Semester} semestras
[navy horizontal rule]
```

---

## Section 1: Įvadas

2–3 paragraphs. Hook the student with something relatable. State what they
will learn and why it matters. NEVER start with a dictionary definition.

Good: "Kiekvieną dieną prie kompiuterio praleidžiame po kelias valandas..."
Bad: "Ergonomika — tai mokslas, tiriantis darbo vietos pritaikymą žmogui."

---

## Section 2: Pagrindinės sąvokos

Table with navy header. 5–10 terms per theory pack.

| **Sąvoka** | **Paaiškinimas** |
|---|---|
| **Lietuviškas terminas** (angl. *English term*) | Clear one-sentence definition at target grade level |

Rules: Every term in body must appear in table. Order by appearance, not
alphabetically. English always in parentheses, italicized. Definitions
self-contained.

---

## Sections 3–N: Core Content

2–5 sections based on curriculum sub-topics.

- Paragraphs: 2–4 sentences each
- Bullet lists for rules, steps, enumerations (1–2 sentences per item)
- Explain WHY, not just WHAT
- Lithuanian context (HN 32:2004, NVSC, Lithuanian school reality)
- Concrete examples grounded in student experience

### Info Box: Tip/Research (light blue #DEEAF6, left border #2E75B6)

For important tips or research findings. Max 3–4 per document.

### Info Box: "Ar žinojote?" (light green #E2EFDA, left border #548235)

For extra-curricular interesting content. NOT assessed. 2–4 sentences each.

---

## Section N+1: Praktiniai patarimai

5–8 numbered tips with bold lead phrases.

```
1. Bold lead: explanation.
2. Bold lead: explanation.
```

Every tip must be concrete and actionable. Include at least one
social/collaborative tip.

---

## Section N+2: Pasitikrinkite save

7–8 numbered questions spanning achievement levels:

| Level | Type | Count |
|-------|------|-------|
| Slenkstinis | Simple recall | 2 |
| Patenkinamas | Understanding/explanation | 2 |
| Pagrindinis | Application | 2 |
| Aukštesnysis | Evaluation/creation | 1–2 |

Progress easy to hard. Don't label levels. All answerable from the document.

---

## Section N+3: Sužinokite daugiau

**Purpose:** Guide students who want to go deeper into the CURRENT topic.
This is NOT about the next lesson — it is about extending understanding
of what was just covered.

**Length:** 4–8 lines.

**Content to include:**

- 1–2 specific sub-topics or angles worth exploring further
  (e.g., "Jei domina, kaip veikia melatoninas ir mėlyna šviesa —
  paieškokite informacijos apie cirkadinius ritmus.")
- 2–3 links to quality Lithuanian or English resources for further
  reading (actual URLs when possible, or clear search suggestions)
- Optionally: a YouTube channel, an interactive tool, a simulation,
  or an app relevant to the topic

**Format:**

```
Sužinokite daugiau

Jei norite giliau suprasti šią temą:
• [resource description + link or search term]
• [resource description + link or search term]
• [optional: interesting sub-topic to explore]
```

**Rules:**

- Resources must be free and accessible to students
- Prefer Lithuanian resources, but quality English ones are fine
  (label language: "anglų k.")
- Never link to paywalled content
- Links should be stable (institutional sites, not news articles
  that disappear)
- Keep it inviting, not mandatory — this is for curious students

---

## Section N+4: Šaltiniai

Grey text (#808080), 9pt, after grey horizontal rule. List all sources
with year.

---

## Formatting Specs (docx-js)

| Element | Spec |
|---------|------|
| Page | A4 (11906 × 16838 DXA), 1" margins (1440 DXA), content width 9026 DXA |
| Font | Arial throughout |
| Body | 11pt (size 22), color #333333, spacing after=100 |
| H1 | 16pt bold (size 32), #1F4E79, spacing before=360 after=160, `keepNext: true`, `keepLines: true` |
| H2 | 13pt bold, #1F4E79 |
| H3 | 11.5pt bold (size 23), #2E75B6, spacing before=240 after=100, `keepNext: true`, `keepLines: true` |
| Tables | DXA widths only, cell margins 60/100, border #BFBFBF, ShadingType.CLEAR |
| Term table header | white text on #1F4E79, borders single sz=4 auto |
| Term table rows | `cantSplit: true` |
| Info box (tip) | bg #DEEAF6, left border #2E75B6 (6pt), outer borders none, italic navy text, `cantSplit: true` |
| Info box (ar žinojote) | bg #E2EFDA, left border #548235 (6pt), outer borders none, italic green text, `cantSplit: true` |
| Sources | 9pt (size 18) #808080, spacing after=40 |

### Paragraph Spacing (TWIPs)

These exact values produce the teacher-approved layout:

| Element | before | after |
|---------|--------|-------|
| Header label (TEORIJOS PAKETAS) | — | 60 |
| Title (topic name) | — | 60 |
| Metadata line (grade/module) | — | 80 |
| Section separator (empty para) | — | 200 |
| H1 (section headings) | 360 | 160 |
| H3 (sub-section headings) | 240 | 100 |
| Body paragraphs | — | 100 |
| Bullet items | — | 100 |
| Sources | — | 40 |
| Šaltiniai section rule | 300 | 120 |

**Length:** No fixed target. 4–10 pages depending on scope. Grade 9 simple:
4–5 pp. Grade 11 complex: 7–10 pp.

**Page breaks:** Never explicit. Use keepNext/keepLines/cantSplit only.
