---
name: theory-pack-gen
description: >
  Generate Lithuanian-language Theory Pack (.pdf) study materials for the
  IT Curriculum repo (PauliusPadrostis/IT_Curriculum). Use this skill whenever
  the teacher asks to create, generate, write, or build a theory pack, study
  guide, study material, or reference material for students. Also triggers on:
  "sugeneruok teorijos paketą", "padaryk medžiagą mokiniams", "sukurk Theory Pack",
  "generate theory pack", "create study material", "build reference material for
  lesson", or any mention of generating Theory_Pack files for lesson folders.
  This skill handles single lesson theory pack generation only (no batch mode).
  Do NOT use for lesson plans (use lesson-plan-gen), READMEs (use lesson-readme-gen),
  visual aids (use visual-aid-gen), or student task sheets.
---

# Theory Pack Generator

Generates Lithuanian-language Theory_Pack.docx study materials for the IT
Curriculum repo. Each theory pack is a self-contained reference document that
students use for post-lesson review and in-lesson reference. Quality target:
e-textbook chapter level.

**All content is in Lithuanian.** Technical terms include English equivalents
in parentheses. Respond to the teacher in whatever language they use.

**This skill generates one theory pack at a time.** The teacher reviews and
approves each before moving to the next.

---

## Step 0 — Read References

**Before generating any theory pack, always read these files:**

1. `references/content_format.md` — document structure, section specifications,
   formatting rules, term table format, info box types, self-check question design.
2. `references/quality_checklist.md` — Lithuanian language quality rules,
   terminology conventions, grammar pitfalls, QA pass procedure, source evaluation
   criteria, curriculum alignment checks.

**Lithuanian QA (mandatory):**
3. Read `/mnt/skills/user/lt-qa/SKILL.md` and run **Phase 1 (PRE-GEN)** — load
   the mistake library, AI pattern rules, and audience calibration before writing
   any Lithuanian text. This supplements (not replaces) the quality_checklist.md.

Read all fully before proceeding.

---

## Step 1 — Gather Context

### 1a. Lesson metadata

Read from the lesson folder, in order:

| Priority | Source | What to extract |
|----------|--------|-----------------|
| 1 | **Lesson README** | Title, type, grade, semester, module, learning objectives, success criteria, sub-topics, Bloom level, lesson flow summary |
| 2 | **Teacher_Plan.docx** | Content phases, terminology, depth indicators, task descriptions, recall questions |
| 3 | **Module README** | Module theme, lesson sequence, where this lesson sits |

### 1b. Curriculum scoping (MANDATORY)

Read `_references/informatika_programa.md` for exact curriculum requirements
at the relevant grade level. Extract:

- The **mokymo(si) turinys** section for this topic
- The **pasiekimų lygiai** table (slenkstinis to aukštesnysis)
- Specific terminology the curriculum uses
- Scope boundary: what students ARE and ARE NOT expected to know

This is the **content boundary**: inside it = main text, interesting extras =
"Ar žinojai?" boxes, irrelevant = excluded.

### 1c. Grade-level calibration

| Grade band | Depth | Vocabulary | Abstraction |
|-----------|-------|------------|-------------|
| 9–10 | Concrete, practical | Simple Lithuanian, minimal jargon | Examples first, principles second |
| 11–12 | Conceptual + practical | More technical vocabulary | Principles first, examples to illustrate |

For Grade 11–12, also check vertinimo gairės and VBE aprašas for exam relevance.

---

## Step 2 — Source Research

Conduct web searches. **Minimum 4 sources per theory pack.** Priority order:

| Priority | Source type | Examples |
|----------|-----------|----------|
| 1 | Lithuanian institutional | NVSC, LR teisės aktai, emokykla.lt, NKSC |
| 2 | Lithuanian educational | VLE, Lithuanian textbook publishers, university materials |
| 3 | EU-level | EU directives, ENISA, European Commission |
| 4 | International peer-reviewed | JAMA, PubMed/PMC, IEEE, ACM |
| 5 | Quality English educational | NCSC UK, AAO, Cleveland Clinic |

**Rules:** Prefer last 3 years. Never use Reddit, Quora, personal blogs, SEO
content farms. Never use American-specific regulatory content unless topic
requires it.

**When Lithuanian sources are scarce:** Use English sources, translate
carefully, flag: "Šio paketo rengimui naudoti tarptautiniai šaltiniai, nes
lietuviškų šaltinių šia tema nepakanka."

---

## Step 3 — Content Generation

Write as a **seasoned Lithuanian IT teacher** — formal but warm, direct,
example-driven, Lithuanian-contextual.

### Structure (exact specs in content_format.md):

1. **Įvadas** — contextual hook, why this matters
2. **Pagrindinės sąvokos** — bilingual term table (5–10 terms)
3. **Core content sections** (2–5) — curriculum sub-topics with info boxes,
   practical examples, simple embedded diagrams where helpful
4. **Praktiniai patarimai** — 5–8 actionable tips
5. **Pasitikrink save** — 7–8 self-check questions spanning all achievement levels
6. **Sužinok daugiau** — resources for deeper exploration of the current topic
7. **Šaltiniai** — sources

### Content depth rules

- Curriculum-required: full explanation, no shortcuts
- Directly supporting: include if helps understanding
- Interesting tangential: "Ar žinojai?" boxes only
- Unrelated: excluded

### Diagrams

Generate simple SVG diagrams where helpful (posture angles, flowcharts,
comparisons). Convert to PNG, embed. Insert placeholders for complex
illustrations.

---

## Step 3b — Cross-file Coherence Check

Before the terminology pass, verify alignment with sibling lesson files.
This prevents concept gaps where the Student_Task tests knowledge the
Theory_Pack never covers.

### What to check:

1. **Student_Task.pdf (if it exists on disk):**
   - Read it. For every concept, term, or skill the Student_Task requires
     the student to know or apply, verify it appears in the theory pack's
     main content sections.
   - For every self-check question in the theory pack's "Pasitikrink save"
     section, verify the answer is findable within the theory pack text.
   - Flag any concept in the Student_Task that the theory pack doesn't cover.
     Either add coverage or flag to the teacher.

2. **Teacher_Plan.docx (if it exists on disk):**
   - Verify the teaching phase terminology matches the theory pack's
     "Pagrindinės sąvokos" term table. If the plan introduces a term
     the theory pack omits → add it to the term table.
   - Verify the plan's scope aligns with the theory pack's scope. If the
     plan covers less than the theory pack → the extra content should be
     in "Ar žinojai?" boxes, not main text.

3. **Visual_Aid.pdf (if it exists on disk):**
   - Slide 5 key concepts should match theory pack terms. Flag mismatches.

### On mismatch:

- Add missing concepts to the theory pack (within README scope).
- If the Student_Task requires knowledge beyond README scope → flag to
  the teacher as a potential Student_Task issue.
- Never silently drop coverage that sibling files depend on.

---

## Step 4 — Terminology Pass

Separate pass after content is written.

### Bilingual format

First use: **Lietuviškas terminas** (angl. *English term*) — definition.
Subsequent: Lithuanian only.

### Verification

For each term: check VLE (vle.lt) → check informatika_programa.md → if
uncertain, flag: `[TERMINIJA: "suggested term" — patikrinti vertimą]`

---

## Step 5 — Grammar & Naturalness QA

**This is the most important quality step. Do not rush it.**

Third separate pass. Full procedure in quality_checklist.md.

**Before running QA, write a plain-text sidecar:** Write all Lithuanian text
to `Theory_Pack_text.txt` in the same lesson folder (see lt-qa SKILL.md
"Plain-Text Sidecar Protocol"). Collect every paragraph, heading, table cell,
info box, and list item text as plain UTF-8, one paragraph per line.

**Run Phase 2 (POST-GEN) from `/mnt/skills/user/lt-qa/SKILL.md`, reading
from the `Theory_Pack_text.txt` sidecar.** This adds: mistake library scan,
AI pattern elimination, audience calibration, and VLKK terminology
enforcement on top of the quality_checklist.md checks. The lt-qa checklist
catches patterns that quality_checklist.md does not cover (em dashes,
structural AI tells, grade-level sentence complexity).

**After POST-GEN passes, delete the sidecar file.**

### 5a. Mechanical grammar check

Read every sentence individually. For each, verify:

- Correct declension endings (especially after prepositions: dėl + kilm.,
  prie + kilm., su + įnag.)
- **No phantom extra vowels before endings** (e.g., "dažniausiuų" instead of
  "dažniausių"). Re-read each declined word letter-by-letter.
- **Locative stem vowels match nominative** (poza → pozoje, NOT pozėje)
- Subject-verb agreement
- Correct Lithuanian diacritics on every word (a/e/i/u vs ą/ę/į/ų/ū,
  s vs š, c vs č, z vs ž)
- No missing words or broken sentence fragments

### 5b. Naturalness check

Read the full document aloud (mentally). Flag any sentence that:

- Sounds like translated English (word order, phrasing)
- Uses a calque (check the calque table in quality_checklist.md)
- Is longer than 25 words — split it
- Repeats a word used in the previous sentence
- Uses passive voice where active would be more natural

### 5c. Web verification — MANDATORY for declined forms and verb conjugations

**This step is not optional.** AI models routinely generate plausible-looking
but non-existent Lithuanian word forms. You MUST web-verify:

1. **Every declined word that is not a common nominative form.** Search the
   exact declined form in quotes (e.g., "dažniausių", "pozoje"). If zero
   results — the form does not exist. Fix it.
2. **Every verb conjugation in "tu" form.** These are especially error-prone
   for reflexive verbs. Search in quotes (e.g., "domiesi"). If zero results
   — it is a hallucinated form.
3. **Every genitive plural.** Search in quotes to verify the ending is real.
4. Verb-preposition combinations and technical term forms in different cases.
5. Any phrase you are less than 90% confident about.

Do NOT limit web verification to terminology or multi-word phrases. Individual
word forms are where the most insidious errors hide — they look correct but
are not real Lithuanian words.

### 5d. Report to teacher

After the QA pass, include at the end of your response:

- Number of grammar fixes made
- Any terms still flagged for review
- Any sentences where you chose between two Lithuanian phrasings and are not
  fully certain which is better — present both options and let the teacher decide

---

## Step 6 — Render .docx

Generate using the docx skill. A4, Arial, navy headings, structured term table,
info boxes, numbered self-check.

### 6a. Lithuanian text encoding

**Write all Lithuanian text as plain UTF-8 in the generation script.** Never
use `\u` unicode escapes for Lithuanian letters (ą, č, ę, ė, į, š, ų, ū, ž).
Unicode escapes make character-level errors invisible and are the primary root
cause of Lithuanian spelling errors in generated content.

**Exception:** Lithuanian typographic quotes must use escapes (`\u201E` for
opening „ and `\u201c` for closing ") because the closing quote conflicts
with JavaScript string delimiters.

### 6b. Em dash post-processing

The generation script MUST include a mechanical em dash removal step.
Add this helper and apply it to every text string before inserting into
the document:

```javascript
const noEmDash = (s) => s.replace(/\u2014/g, ':');
```

LLMs naturally produce em dashes regardless of prompt instructions.
Automated code-level replacement is the only reliable fix.

### 6c. Page breaks

Use `keepNext: true` and `keepLines: true` on all H1 and H3 paragraphs to
prevent orphaned headings. Use `cantSplit: true` on info box and term table
rows to prevent mid-element breaks.

**Do NOT insert explicit page breaks.** You cannot accurately predict where
content will land on the page. Explicit page breaks almost always create
large empty gaps (30–50% of a page). Let Word's layout engine handle
pagination naturally via keepNext/keepLines.

### 6d. Post-generation spell-check

After generating the .docx, run the Lithuanian spell-checker:

```bash
python _scripts/spellcheck_lt.py <output.docx>
```

This catches phantom vowels (uų, aą patterns) and known diacritical errors.
Fix any reported issues before delivering to teacher.

Note: the checker catches ~50% of error categories (phantom vowels + known
diacritical errors). The remaining categories (wrong stem vowels, dropped
consonants, hallucinated verb forms) require Step 5c web verification.
Both safeguards are needed together.

### 6e. Convert to PDF

After generating and spell-checking the .docx, convert to PDF:

```bash
python -c "from docx2pdf import convert; convert('input.docx', 'output.pdf')"
```

This uses Microsoft Word for high-fidelity conversion. After confirming the
PDF exists and has non-zero size, **delete the intermediate .docx file**.
The final deliverable is PDF only (per locked decision in CLAUDE.md).

If `docx2pdf` is not installed: `pip install docx2pdf`.
If conversion fails (Word not available): keep the .docx and inform the
teacher that PDF conversion requires Microsoft Word.

### File naming

`{NNN}_{T}_{Short_Title}_Theory_Pack.pdf`

The generation script creates `.docx` intermediately, but the final output
file in the lesson folder must be `.pdf`.

---

## Constraints

### MUST do

- Read lesson README + Teacher_Plan before writing
- Check curriculum scope before writing
- Search for sources (min 4, Lithuanian-first)
- Use bilingual term format
- Do separate terminology + grammar QA passes
- Align self-check questions to achievement levels
- Flag uncertain translations
- Run spell-checker after generation

### MUST NOT do

- Include irrelevant content in main text
- Use American-specific references as primary context
- Use unnecessary medical/scientific terminology
- Skip curriculum scoping or QA passes
- Pad content to reach a length target
- Write in English except bilingual term parentheses
- Use `\u` escapes for Lithuanian letters in generation scripts
- Insert explicit page breaks in docx generation

### When to stop and ask

- README too vague to scope content
- No curriculum mokymo(si) turinys for this topic
- Cannot find any Lithuanian sources on culturally specific topic
- Lesson type is not L — confirm with teacher
