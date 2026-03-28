# Answer Key Generator Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the `answer-key-gen` skill that generates Answer_Key.docx (teacher grading key for A lessons) and Answer_Key.pdf (student study key for P lessons).

**Architecture:** Skill follows the standard IT Curriculum pattern: SKILL.md (orchestration) + reference docs (format, marking scheme, exemplars). No code files — the skill is a prompt that instructs Claude to generate .docx via the docx skill and convert to PDF. Two modes (A/P) auto-detected from lesson folder name.

**Tech Stack:** Markdown (skill definition), docx skill (document generation), docx2pdf (PDF conversion), lt-qa skill (Lithuanian QA).

**Spec:** `docs/superpowers/specs/2026-03-28-answer-key-gen-design.md`

---

## File Structure

```
.claude/skills/answer-key-gen/
├── SKILL.md                                          [Main skill definition — orchestration steps]
└── references/
    ├── answer_key_format.md                          [Document structure + formatting for both modes]
    ├── marking_scheme_guide.md                       [Accept/reject/partial credit rules]
    └── exemplars/
        ├── grading_key_safety_example.md             [A-mode key for theory_safety_example assessment]
        ├── study_key_safety_example.md               [P-mode key for same content, different treatment]
        └── grading_key_programming_example.md        [A-mode key for code tasks]
```

After all tasks complete, sync to global: `~/.claude/skills/answer-key-gen/` (handled by Task 7).

---

### Task 1: Create answer_key_format.md

**Files:**
- Create: `.claude/skills/answer-key-gen/references/answer_key_format.md`

This is the formatting specification that the SKILL.md will reference. Must be created first because all exemplars and the SKILL.md depend on it.

- [ ] **Step 1: Create the directory structure**

```bash
mkdir -p ".claude/skills/answer-key-gen/references/exemplars"
```

- [ ] **Step 2: Write answer_key_format.md**

Write the document structure and formatting specs for both modes. Contents must cover:

**Grading Key (.docx) section:**
- Page setup: A4, 1" margins (1440 DXA), content width 9026 DXA
- Font: Arial throughout
- H1: 16pt bold, #1F4E79, centered — document title
- H2: 13pt bold, #1F4E79 — question type section headers (e.g., "MCQ klausimai", "Trumpi atsakymai")
- H3: 11.5pt bold, #2E75B6 — individual question headers (e.g., "1 klausimas (1 taškas, slenkstinis)")
- Body: 11pt, #333333, line spacing 1.15
- Accept/reject table format: 3 columns — "Atsakymo variantas", "Įvertinimas", "Pagrindimas"
  - Table header: white text on #1F4E79
  - Body rows: cantSplit: true, border #BFBFBF
  - Credit column values: "Pilnas balas", "Dalinis balas (X tšk.)", "0 taškų"
- Code blocks: Consolas 10pt, background #F2F2F2, 4pt padding
- Footer on every page: "Vidinis dokumentas. Neskelbti mokiniams." — 8pt, #808080, centered
- Header: label line "ATSAKYMŲ RAKTAS" (9pt, #808080, allcaps, centered), then title, then metadata line (grade, module, total points)
- Horizontal rule: #1F4E79, 1pt (after header)

**Study Key (.pdf) section:**
- Matches Student_Task visual identity exactly (same fonts, colors, sizes as student-task-gen format)
- Page setup: A4, 1" margins, same as Student_Task
- Header: label "ATSAKYMAI" (9pt, #808080, allcaps, centered), then title (18pt bold, #1F4E79), then metadata
- H2: 13pt bold, #1F4E79 — section headers
- H3: 11.5pt bold, #2E75B6 — individual question headers
- Body: 11pt, #333333, line spacing 1.15
- Correct answer highlight: bold + #2E7D32 (green) text color
- Misconception callout box: background #FFF3E0 (light orange), left border 3pt #FF9800 (orange), padding 8pt. Header: "Dažna klaida:" in bold.
- "Kodėl tai veikia" box: background #E8F5E9 (light green), left border 3pt #4CAF50 (green), padding 8pt. Header: "Kodėl tai veikia:" in bold.
- Code blocks: Consolas 10pt, background #F2F2F2, 4pt padding
- Broken code blocks (common bugs): Consolas 10pt, background #FFEBEE (light red), left border 3pt #F44336 (red)
- No footer watermark (student-facing)
- Page breaks: never explicit, use keepNext/keepLines/cantSplit only

**Length guidelines:**

| Assessment Type | Grading Key | Study Key |
|----------------|-------------|-----------|
| Theory (MCQ + short answer) | 2-4 pages | 4-8 pages (explanations are longer) |
| Programming (code tasks) | 3-5 pages | 5-10 pages (full code + alternatives + bugs) |
| Mixed format | 3-6 pages | 6-12 pages |

- [ ] **Step 3: Verify the file**

Read back the file and confirm: both mode sections present, all formatting values specified (no "TBD"), table format columns defined, code block styles match existing skills.

- [ ] **Step 4: Commit**

```bash
git add ".claude/skills/answer-key-gen/references/answer_key_format.md"
git commit -m "feat(answer-key-gen): add document format specification for both modes"
```

---

### Task 2: Create marking_scheme_guide.md

**Files:**
- Create: `.claude/skills/answer-key-gen/references/marking_scheme_guide.md`

This is the pedagogical knowledge base for how to write accept/reject/partial credit decisions. Referenced by SKILL.md Step 0.

- [ ] **Step 1: Write marking_scheme_guide.md**

Contents must cover:

**General principles:**
- Every answer entry must be unambiguous — two graders must reach the same score
- Never use "panašus atsakymas priimtinas" without defining what "panašus" means
- When in doubt, list more alternatives rather than fewer
- Partial credit thresholds must be quantified (e.g., "bent 2 iš 3 aspektų")

**MCQ marking rules:**
- Correct answer: letter + full text + brief justification
- Each distractor: one-line explanation of why it's wrong and what misconception it represents
- Arguable distractors: pre-emptive ruling with "Nepriimtina, nes..." + specific reasoning
- If a student selects two answers (on paper tests): 0 points unless rubric says otherwise

**Short answer marking rules:**
- Model answer: full ideal answer as a teacher would write it
- Acceptable alternatives: numbered list, each with credit level (full/partial) and reasoning
- Minimum 2 acceptable alternative phrasings per question
- Partial credit: explicit threshold rules (e.g., "1 tšk. jei paminėti bent 2 aspektai; 0,5 tšk. jei tik 1")
- Reject list: minimum 2 common wrong answers with reasoning
- Boundary cases: technically correct but incomplete — explicit scoring decision
- Spelling tolerance: minor Lithuanian spelling errors in otherwise correct answers do not reduce score unless the error changes meaning

**Scenario analysis marking rules:**
- Model answer must demonstrate the reasoning process, not just the conclusion
- Accept: any reasoning chain that correctly applies the relevant principle
- Reject: answers that reach the correct conclusion by wrong reasoning
- Partial credit: correct identification + wrong recommendation = partial; wrong identification + correct general advice = 0

**Code task marking rules:**
- Canonical solution: one complete, compilable, commented solution
- Alternative approaches: list by name + key structural difference (e.g., "Selection sort: naudoja minimumų paiešką vietoj gretimų lyginimo")
- Accept criteria (what makes ANY solution valid regardless of approach):
  - Produces correct output for all test cases
  - Compiles without errors
  - Does not use banned constructs (e.g., std::sort when testing sort algorithm knowledge)
  - Uses only concepts taught in scope lessons
- Reject criteria (automatic 0):
  - Hardcoded output (e.g., `cout << "3 7 12";`)
  - Using library functions that bypass the exercise (e.g., `std::sort`, `std::reverse` when testing manual algorithm)
  - Code that does not compile
  - Code copied from another student (academic integrity — flag for teacher)
- Partial credit per rubric criterion:
  - Logic correctness: does the algorithm work? (weighted highest)
  - Compilation: does it compile? (binary: yes/no)
  - Edge cases: handles boundary inputs? (grade 11+ only)
  - Code style: readable variable names, indentation? (lowest weight, grade 12 only)

**Practical tool task marking rules:**
- Per-criterion evaluation using rubric levels (Aukštesnysis / Pagrindinis / Patenkinamas / Slenkstinis)
- Each criterion descriptor must be observable in the student's submitted file
- "Partially meets" = meets the lower level's descriptor, not an average

- [ ] **Step 2: Verify the file**

Read back and confirm: all four question types covered, partial credit rules are quantified, accept/reject lists have minimums defined.

- [ ] **Step 3: Commit**

```bash
git add ".claude/skills/answer-key-gen/references/marking_scheme_guide.md"
git commit -m "feat(answer-key-gen): add marking scheme guide for accept/reject/partial credit rules"
```

---

### Task 3: Create grading_key_safety_example.md

**Files:**
- Create: `.claude/skills/answer-key-gen/references/exemplars/grading_key_safety_example.md`
- Read: `.claude/skills/assessment-task-gen/references/exemplars/theory_safety_example.md` (source assessment)

This exemplar demonstrates A-mode (Grading Key) format for the theory safety assessment. It answers every question from the theory_safety_example.md assessment.

- [ ] **Step 1: Read source assessment and Lithuanian QA rules**

Read `.claude/skills/assessment-task-gen/references/exemplars/theory_safety_example.md` to get the exact questions and point values.
Read `lt-qa/lt-mistakes.yaml` and apply all rules to the exemplar Lithuanian text.

- [ ] **Step 2: Write grading_key_safety_example.md**

Structure:

```markdown
# Exemplar: Grading Key — Saugos struktūrinis vertinimas

**Source assessment:** theory_safety_example.md
**Mode:** Grading Key (A lesson, teacher-facing)
**Total points:** 20 (10 testas + 10 praktika)

---

## A dalis: Testmoz testas

### 1 klausimas (1 taškas, slenkstinis)
**Klausimas:** Koks yra rekomenduojamas atstumas nuo akių iki monitoriaus?

**Teisingas atsakymas:** B) 50-70 cm

| Atsakymo variantas | Įvertinimas | Pagrindimas |
|---------------------|-------------|-------------|
| B) 50-70 cm | Pilnas balas (1 tšk.) | Atitinka ergonomikos rekomendacijas (ISO 9241) |
| A) 20-30 cm | 0 taškų | Tai telefono naudojimo atstumas, ne monitoriaus |
| C) 100-120 cm | 0 taškų | Per toli, negalima patogiai skaityti ekrano |

**Nepriimtina:** Jei mokinys pasirenka du atsakymus, 0 taškų.
```

Continue this pattern for all 10 Testmoz questions (A dalis) AND the practical task (B dalis). For short answer questions (6-8), include:
- Model answer
- 2-3 acceptable alternative phrasings with credit level
- Partial credit thresholds
- 2 common wrong answers with reasoning

For scenario questions (9-10), include:
- Full model answer
- Accept: alternative valid reasoning chains
- Reject: correct conclusion by wrong reasoning
- Partial credit: identification without recommendation, etc.

For the practical task (B dalis), include:
- List of all expected ergonomic issues (5+)
- Accept: which issues count, which combinations earn which points
- Reject: issues that don't exist in the scenario
- Per-criterion scoring guide referencing the rubric levels

- [ ] **Step 3: Verify the exemplar**

Read back and confirm: every question from the source has an entry, point values match, accept/reject tables present for MCQ, partial credit rules for short answer, practical task criteria aligned with rubric.

- [ ] **Step 4: Commit**

```bash
git add ".claude/skills/answer-key-gen/references/exemplars/grading_key_safety_example.md"
git commit -m "feat(answer-key-gen): add grading key exemplar for safety assessment"
```

---

### Task 4: Create study_key_safety_example.md

**Files:**
- Create: `.claude/skills/answer-key-gen/references/exemplars/study_key_safety_example.md`
- Read: `.claude/skills/assessment-task-gen/references/exemplars/theory_safety_example.md` (source assessment)

This exemplar demonstrates P-mode (Study Key) for the same safety questions. Shows how the same assessment content gets different treatment for student self-study.

- [ ] **Step 1: Read Lithuanian QA rules**

Read `lt-qa/lt-mistakes.yaml` and apply all rules to the exemplar Lithuanian text.

- [ ] **Step 2: Write study_key_safety_example.md**

Structure:

```markdown
# Exemplar: Study Key — Saugos praktikos užduotis

**Source:** theory_safety_example.md (same questions, different treatment)
**Mode:** Study Key (P lesson, student-facing)
**Audience:** Students, after attempting the practice task

---

## A dalis

### 1 klausimas
**Klausimas:** Koks yra rekomenduojamas atstumas nuo akių iki monitoriaus?

**Teisingas atsakymas:** B) 50-70 cm

**Kodėl teisingas:** Ergonomikos specialistai rekomenduoja 50-70 cm atstumą, nes tokiu atstumu akys gali patogiai fokusuotis be papildomo įtempimo. Tai maždaug ištiestos rankos ilgis.

**Kodėl kiti atsakymai neteisingi:**
- A) 20-30 cm: tai atstumas, kuriuo paprastai laikome telefoną. Monitoriui jis per artimas, nes akys turi fokusuotis labai arti, o tai sukelia nuovargį.
- C) 100-120 cm: per toli. Tokiu atstumu sunku skaityti tekstą ekrane, mokinys pradės nevalingai linkti arčiau.
```

For short answer questions, show step-by-step reasoning:
```markdown
### 6 klausimas
**Klausimas:** 1-2 sakiniais paaiškinkite, kodėl pertraukos svarbios sveikatai...

**Atsakymas:** Pertraukos leidžia akims pailsėti nuo ekrano šviesos ir sumažina regėjimo nuovargį. Taip pat pertraukos metu galima pasikeisti pozą, kas mažina nugaros ir kaklo skausmų riziką.

**Kaip galvoti apie šį klausimą:** Pagalvokite apie dvi skirtingas kūno dalis, kurias veikia ilgas sėdėjimas prie kompiuterio. Pertraukos padeda kiekvienai iš jų.

> **Dažna klaida:** Rašyti tik apie akis. Klausimas prašo bent dviejų aspektų, todėl reikia paminėti ir kūno laikyseną, kraujotaką arba protinį nuovargį.
```

No point values, no grading language. Teaching tone throughout.

- [ ] **Step 3: Verify the exemplar**

Read back and confirm: every question covered, no point values or credit language, explanations are teaching-oriented, misconception callouts present, cross-references to concepts.

- [ ] **Step 4: Commit**

```bash
git add ".claude/skills/answer-key-gen/references/exemplars/study_key_safety_example.md"
git commit -m "feat(answer-key-gen): add study key exemplar for safety practice"
```

---

### Task 5: Create grading_key_programming_example.md

**Files:**
- Create: `.claude/skills/answer-key-gen/references/exemplars/grading_key_programming_example.md`
- Read: `.claude/skills/assessment-task-gen/references/exemplars/programming_algorithms_example.md` (source assessment)

This exemplar demonstrates A-mode grading key for code completion tasks. Shows canonical solution + alternatives + accept/reject criteria.

- [ ] **Step 1: Read source assessment and Lithuanian QA rules**

Read `.claude/skills/assessment-task-gen/references/exemplars/programming_algorithms_example.md` to get the exact tasks.
Read `lt-qa/lt-mistakes.yaml` and apply all rules to the exemplar Lithuanian text.

- [ ] **Step 2: Write grading_key_programming_example.md**

Structure for each code task:

```markdown
### 1 užduotis: Masyvo elementų suma (2 taškai)

**Kanoninis sprendimas:**
```cpp
for (int i = 0; i < n; i++) {
    suma += sk[i];
}
```

**Alternatyvūs sprendimai:**
- While ciklas: `while (i < n) { suma += sk[i]; i++; }` — priimtina, jei logika teisinga.

**Priimtinumo kriterijai:**
- [x] Ciklas iteruoja per visus elementus (0 iki n-1)
- [x] Kiekvienas elementas pridedamas prie suma
- [x] Kompiliuojasi be klaidų

**Nepriimtina (0 taškų):**
- Hardcoded: `suma = 23;`
- Naudoja STL funkciją: `std::accumulate`
- Ciklas neapima visų elementų (pvz., `i <= n` sukelia segfault)

**Dalinio balo taisyklės:**
| Kriterijus | Taškai |
|-----------|--------|
| Teisinga logika (ciklas + kaupimas) | 1 |
| Kompiliuojasi be klaidų | 1 |
| Logika teisinga, bet nekompiliuojasi (sintaksės klaida) | 1 iš 2 |
| Kompiliuojasi, bet logika neteisinga | 0 |
```

Cover all 5 tasks from the programming exemplar. Task 5 (sorting) must show:
- Canonical: bubble sort (simplest for grade 10)
- Alternatives: selection sort (name + key structural difference), insertion sort (name + key difference)
- Accept criteria checklist
- Reject list (std::sort, hardcoded output, copy from internet with comments in English)
- Partial credit per rubric criterion (logic 4 tšk., swap 2 tšk., compilation 1 tšk.)

- [ ] **Step 3: Verify the exemplar**

Read back and confirm: all 5 tasks covered, canonical solutions compile (check mentally against the scaffolds), alternatives listed by name, accept/reject criteria present, partial credit quantified.

- [ ] **Step 4: Commit**

```bash
git add ".claude/skills/answer-key-gen/references/exemplars/grading_key_programming_example.md"
git commit -m "feat(answer-key-gen): add grading key exemplar for programming assessment"
```

---

### Task 6: Write SKILL.md

**Files:**
- Create: `.claude/skills/answer-key-gen/SKILL.md`

The main skill file. Follows the standard curriculum skill pattern: YAML frontmatter + Step 0 (read refs) + Steps 1-7 (pipeline). References all files created in Tasks 1-5.

- [ ] **Step 1: Write SKILL.md**

**YAML frontmatter:**
```yaml
---
name: answer-key-gen
description: >
  Generate answer keys for A and P lessons in the IT Curriculum repo
  (PauliusPadrostis/IT_Curriculum). Use this skill whenever the teacher asks to
  create, generate, write, or build an answer key, marking scheme, grading key,
  atsakymų raktas, or vertinimo schema. Also triggers on: "sugeneruok
  atsakymų raktą", "sukurk answer key", "generate answer key", "paruošk
  atsakymus", "sukurk vertinimo schemą".
  Two modes auto-detected: A lessons produce teacher-facing Grading Key (.docx),
  P lessons produce student-facing Study Key (.pdf).
  Only generates for A and P lesson types. Do NOT use for assessments (use
  assessment-task-gen), student tasks (use student-task-gen), theory packs (use
  theory-pack-gen), or visual aids (use visual-aid-gen).
---
```

**Step structure:**

**Step 0 — Read References**
1. `references/answer_key_format.md` — document structure for both modes
2. `references/marking_scheme_guide.md` — accept/reject/partial credit rules
3. Relevant exemplar from `references/exemplars/`
4. `assessment-task-gen/references/grading_policy.md` — percentage scale (cross-skill read)
5. `assessment-task-gen/references/cs_assessment_progression.md` — grade expectations (cross-skill read)
6. lt-qa skill — Phase 1 (PRE-GEN) before writing Lithuanian
7. `tasks/lessons.md` — accumulated corrections

Note on paths: Items 1-3 use paths relative to this skill's directory (`.claude/skills/answer-key-gen/`). Items 4-5 use sibling skill paths: `.claude/skills/assessment-task-gen/references/grading_policy.md` and `.claude/skills/assessment-task-gen/references/cs_assessment_progression.md`. Items 6-7 use repo-root paths (`lt-qa/lt-mistakes.yaml`, `tasks/lessons.md`).

**Step 1 — Gather Context & Detect Mode**
- Parse lesson folder path: extract grade, semester, module, lesson number, type letter
- Type gate: A → Grading Key, P → Study Key, other → abort
- A mode: read Assessment_Task (.xlsx or .pdf) + Rubric.pdf from lesson folder
- P mode: read Student_Task.pdf from lesson folder. If not found, abort with message.
- Read L/I Teacher_Plans and Theory_Packs in scope (scoping rules from spec)
- A scope: L/I since previous A or module start
- P scope: same as next A in sequence

**Step 2 — Extract Questions**
- Parse the source file question by question
- For .xlsx (Testmoz): read pools, extract one representative question per pool (the first variant). Note: the answer key covers the question concept, not each individual variant.
- For .pdf: extract questions in order
- Build a question inventory: question number, type (MCQ/short/scenario/code), point value, competency level

**Step 3 — Generate Answer Content (mode-dependent)**

**A mode (Grading Key):**
- For each question, apply marking_scheme_guide.md rules:
  - MCQ: correct answer + distractor explanations + arguable distractor rulings
  - Short answer: model answer + alternatives (min 2) + partial credit thresholds + reject list (min 2) + boundary cases
  - Scenario: model answer + accept reasoning chains + reject reasoning + partial credit
  - Code: canonical solution (compilable, commented) + alternative names + accept criteria checklist + reject criteria + partial credit per rubric criterion
- Source explanations from L/I Teacher_Plans (common mistakes → reject list, learning objectives → accept criteria) and Theory_Packs (content details → alternative phrasings)

**P mode (Study Key):**
- For each question:
  - MCQ: correct answer highlighted + why correct (2-3 sentences) + why each wrong option is wrong (1-2 sentences each) + optional Theory_Pack cross-reference
  - Short answer: model answer + step-by-step reasoning + common mistakes callout + key vocabulary
  - Scenario: model answer + reasoning walkthrough + common mistakes
  - Code: canonical solution with inline comments + 1 alternative (when structurally different) + "Kodėl tai veikia" paragraph + common bugs section (2-3 broken snippets with explanations)
- Tone: teaching, not judging. Formal "jūs". No point values or grading language.

**Step 4 — Validity Self-Check**
(Table from spec: coverage, point alignment, no extras, content grounding, mode consistency, code compilation, alternative coverage, reject coverage, em dash ban, language)

**Step 5 — Lithuanian QA**
- Run lt-qa Phase 2 (POST-GEN) on all generated Lithuanian text
- Fix all issues before rendering

**Step 6 — Render Document**
- Use the docx skill to create Answer_Key.docx following answer_key_format.md specs
- A mode: save as .docx in lesson folder. Done.
- P mode: convert to PDF via docx2pdf, delete intermediate .docx. Save Answer_Key.pdf in lesson folder.
- Verify: open generated file, confirm key content at known positions (first question answer, last question answer, footer text for A mode)

**Step 7 — Constraints**
- MUST read source assessment/task file before generating (never generate from memory)
- MUST include footer "Vidinis dokumentas. Neskelbti mokiniams." on every page of A-mode output
- MUST NOT include point values or grading language in P-mode output
- MUST NOT include em dashes anywhere
- MUST compile all C++ code solutions before including them
- MUST run lt-qa POST-GEN on final text

**Abort / Degrade conditions table** (from spec)

**Source priority** (from spec)

- [ ] **Step 2: Verify SKILL.md structure**

Read back and confirm: YAML frontmatter has name + description with trigger phrases, Step 0 lists all references with correct paths, Step 1 has mode detection and scope rules, Step 3 has mode-specific content rules, Step 4 has full validity checklist, abort conditions present, source priority present.

- [ ] **Step 3: Commit**

```bash
git add ".claude/skills/answer-key-gen/SKILL.md"
git commit -m "feat(answer-key-gen): add main skill definition with two-mode pipeline"
```

---

### Task 7: Sync to Global Skills Directory

**Files:**
- Create: `~/.claude/skills/answer-key-gen/` (mirror of repo copy)

- [ ] **Step 1: Copy skill to global directory**

```bash
cp -r ".claude/skills/answer-key-gen" ~/.claude/skills/answer-key-gen
```

- [ ] **Step 2: Verify both copies are identical**

```bash
diff -r ".claude/skills/answer-key-gen" ~/.claude/skills/answer-key-gen
```

Expected: no differences.

- [ ] **Step 3: Commit repo copy (if not already committed)**

Verify all files are committed:
```bash
git status
```

---

### Task 8: Smoke Test on 007_A

**Files:**
- Read: `Grade_9/Semester_1/01_Safety/007_A - Safety structured assessment/Assessment_Task.xlsx`
- Read: `Grade_9/Semester_1/01_Safety/007_A - Safety structured assessment/Rubric.pdf`
- Create: `Grade_9/Semester_1/01_Safety/007_A - Safety structured assessment/Answer_Key.docx`

This is the real test. Invoke the skill on the only A lesson that has assessment materials.

- [ ] **Step 1: Invoke the answer-key-gen skill**

Tell the skill to generate an answer key for:
`Grade_9/Semester_1/01_Safety/007_A - Safety structured assessment/`

The skill should:
1. Detect A mode (from folder name `007_A`)
2. Read Assessment_Task.xlsx and Rubric.pdf
3. Read L/I Teacher_Plans from lessons 001-006
4. Generate Answer_Key.docx with full marking scheme

- [ ] **Step 2: Verify the generated file**

Open Answer_Key.docx and check:
- Every question from Assessment_Task.xlsx has an answer entry
- Point values match Rubric.pdf
- Accept/reject tables present for short answer questions
- Footer "Vidinis dokumentas. Neskelbti mokiniams." on every page
- No em dashes
- Lithuanian text is natural (lt-qa passed)

- [ ] **Step 3: If issues found, fix skill and regenerate**

Common first-run issues to watch for:
- Missing questions (xlsx parsing didn't extract all pools)
- Point values mismatch (rubric points vs key points)
- Footer missing (docx rendering issue)
- Em dashes sneaking in (lt-qa bypass)

Fix the SKILL.md or reference docs, then regenerate from scratch (never patch in-place).

- [ ] **Step 4: Commit the generated file**

```bash
git add "Grade_9/Semester_1/01_Safety/007_A - Safety structured assessment/Answer_Key.docx"
git commit -m "feat(007_A): generate Answer_Key.docx via answer-key-gen skill"
```

- [ ] **Step 5: Sync any skill fixes to global copy**

If SKILL.md or references were modified during smoke testing:
```bash
cp -r ".claude/skills/answer-key-gen" ~/.claude/skills/answer-key-gen
```

---

### Task 9: Update Lesson README

**Files:**
- Modify: `Grade_9/Semester_1/01_Safety/007_A - Safety structured assessment/README.md`

**Important:** The README currently says `Answer_Key.pdf` but the teacher decided A-mode output is `.docx` (editable for teacher annotations). The filename in the Reikalingi failai table must be changed to `Answer_Key.docx` and the Pastaba column updated to clarify it's teacher-facing.

- [ ] **Step 1: Fix the filename in Reikalingi failai table**

Change from:
```markdown
| Answer_Key.pdf        | ❌     | ❌         | Atsakymų raktas                                   |
```

To:
```markdown
| Answer_Key.docx       | ✅     | ❌         | Atsakymų raktas (mokytojui)                       |
```

- [ ] **Step 2: Update Būsena if applicable**

If all 4 files now have ✅, change Būsena from 🚧 WIP to ✅ Failai sukurti.

- [ ] **Step 3: Commit**

```bash
git add "Grade_9/Semester_1/01_Safety/007_A - Safety structured assessment/README.md"
git commit -m "docs(007_A): update README — Answer_Key is .docx (teacher-facing), mark as present"
```

---

### Known Gaps (for future sessions)

- **study_key_programming_example.md**: No P-mode exemplar for code tasks. The safety Study Key exemplar covers MCQ/short answer but not code-specific formatting ("Kodėl tai veikia" paragraphs, common bugs with broken code snippets). Create this when the first P lesson with code tasks needs an answer key.
- **P mode untestable**: student-task-gen P extension not yet implemented. P mode smoke test deferred until that skill is extended.
