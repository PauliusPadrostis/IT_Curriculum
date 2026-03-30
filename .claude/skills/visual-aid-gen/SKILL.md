---
name: visual-aid-gen
description: >
  Generate Lithuanian-language Visual_Aid.pdf files for L and I lessons in the
  IT Curriculum repo (PauliusPadrostis/IT_Curriculum). Use this skill whenever the
  teacher asks to create, generate, write, or build a visual aid, projection slides,
  or vaizdinė medžiaga. Also triggers on: "sugeneruok vizualinę priemonę", "padaryk
  Visual_Aid", "sukurk vaizdinę medžiagą", "generate visual aid", "create visual aid",
  "make projection slides", "build visual aids for module", or any mention of generating
  Visual_Aid files for lesson folders. This skill handles both single visual aid
  generation and batch generation for entire modules or grades. Only generates for
  L (learning) and I (integration) lesson types, other types (P, A, D, T, MOCK, G)
  do not use projected visual aids. Do NOT use for: lesson plans (use lesson-plan-gen),
  student tasks (use student-task-gen), theory packs (use theory-pack-gen), READMEs
  (use lesson-readme-gen).
---

# Visual Aid Generator

Generates Lithuanian-language Visual_Aid.pdf files for L and I lessons in the
IT Curriculum repo. Each visual aid is a 6-page landscape A4 PDF projected on
the classroom screen during the lesson. The teacher advances slides as the
lesson progresses. All extracted content preserves the original Lithuanian
from the Teacher_Plan. Respond to the teacher in whatever language they use.

**This skill is designed for mass generation.** It uses safe defaults when
optional files are missing and does not pause for approval on structural
decisions. It stops only when Teacher_Plan.docx is missing or lacks required
sections (retrieval questions, objectives).

---

## Core Concept

A Visual_Aid is **not** generated from scratch. It is a **structured extraction**
from Teacher_Plan.docx, optionally enriched by Student_Task.pdf and Theory_Pack.pdf.

The 6 slides map directly to the lesson flow:

| Slide | Content | Typical duration |
|-------|---------|------------------|
| 1 | Title (module + lesson) | ~30 sec |
| 2 | Start retrieval questions | ~5 min |
| 3 | Learning objectives | ~1 min |
| 4 | Task brief or integration targets | ~1 min |
| 5 | Key concepts for the task | ~15-20 min |
| 6 | End retrieval questions | ~5 min |

Slide 5 stays projected the longest: it remains on screen during independent
student work so students can reference key terms without asking the teacher.

---

## Step 0: Read References

**Before generating any visual aid, always read these files:**

1. `references/visual_aid_format.md`: exact document structure, color palette,
   accent bar implementation, typography, and slide-by-slide formatting specs.
   **Primary structural reference.**
2. `/mnt/skills/public/docx/SKILL.md`: docx-js setup, table formatting,
   styles, and validation rules.
3. `/mnt/skills/user/lesson-plan-gen/references/teacher_profile.md`: teaching
   style, constraints, approved software. Sections 9, 10, and 11 are critical.

These files are the skill's operational backbone. Do not generate without them.

---

## Step 1: Gather Context

### What to read, in order:

| Priority | Source | What to extract |
|----------|--------|-----------------|
| 1 | **Teacher_Plan.docx** | Retrieval questions (start + end), objectives, application phase task description, teaching phase content and terminology |
| 2 | **Lesson README** | Title (Pavadinimas), type (must be L or I), grade, module name |
| 3 | **Module README** | Module name (for title slide), lesson position in sequence |
| 4 | **Student_Task.pdf** (optional) | Task requirements, used to prioritize key concepts on slide 5 |
| 5 | **Theory_Pack.pdf** (optional) | Terminology table, provides definitions for slide 5 |

### Hard gates

These conditions abort generation with a Lithuanian-language message:

- **Teacher_Plan.docx must exist.** If missing: "Negalima generuoti Visual_Aid
  be Teacher_Plan.docx. Pirmiausia sugeneruokite pamokos planą naudodami
  /lesson-plan-gen."
- **Lesson type must be L or I.** If other type: "Visual_Aid generuojamas tik
  L ir I pamokoms. Ši pamoka yra {type} tipo."
- **Both retrieval question phases must exist in the plan.** If missing: "Teacher_Plan
  neturi {missing section} skyriaus. Patikrinkite planą."
- **Objectives must exist in the plan.** If missing: "Teacher_Plan neturi tikslų
  skyriaus. Patikrinkite planą."

### When to stop and ask the teacher

- Retrieval questions exist but are obviously placeholder text ("TODO", "...", single word)
- Objectives are present but only one vague sentence (not actionable learning goals)
- Application phase is empty or contains only timing/logistics, no task description
- The Teacher_Plan structure does not match the expected phase names (custom or legacy format)

In these cases, show the teacher what you found and ask whether to proceed or fix the plan first.

### Content extraction rules per slide

**Slides 2, 6 (retrieval questions):** Extract verbatim from Teacher_Plan.
Do not rephrase, reorder, or edit the question text. Preserve the teacher's
exact wording.

**Slide 3 (objectives):** Extract from the Teacher_Plan objectives box.
Use the concise form. If the plan lists 5+ objectives, select the top 4
that are most directly tied to the lesson task.

**Slide 4 (task brief):** Write in neutral/descriptive voice, not teacher-directed
phrasing from the plan. The Teacher_Plan uses teacher voice ("Mokiniai sukuria...",
"Paaiškinkite..."), but the visual aid is projected to students.
- **L lessons:** 2-4 sentence summary of the hands-on task from the
  application phase ("Taikymo užduotys" / "Savarankiška užduotis").
- **I lessons:** If the application phase names a concrete deliverable,
  describe that task briefly. If no single deliverable exists (multiple
  activities, discussion-based, scenario analysis), use the format:
  "Šios pamokos metu sujungsite:" followed by bullet points listing
  integration targets.

**Slide 5 (key concepts):** Content priority, in strict order:
1. Terms/concepts required to complete the task (from Student_Task if available)
2. Core terms from the teaching phase of Teacher_Plan
3. Terms from Theory_Pack terminology table (if it exists)
4. Hard cap: **4 items maximum** (5 items overflow the landscape page at 28pt/48pt)
5. Each item: **bold term** + colon + one-line definition (~15 words max)

If no Student_Task or Theory_Pack exists, build entirely from the
Teacher_Plan teaching phase content.

---

## Step 2: Lithuanian QA (PRE-GEN)

Load Lithuanian language rules before writing any text:

1. Read the mistake library: `lt-qa/lt-mistakes.yaml`
2. Read `/mnt/skills/user/lt-qa/SKILL.md` Phase 1 (PRE-GEN) and follow all
   loading instructions.
3. Hard rules that apply to Visual_Aid content:
   - No em dashes anywhere. Replace with comma, period, colon, or restructure.
   - Lithuanian „..." quotation marks only (lower-upper).
   - Formal "jūs" address in any student-facing text.
   - No AI text patterns (formulaic openings, triad structures, hedging).
4. **Primary risk areas:** slide 5 term definitions (generated text, not
   verbatim extraction) and slide 4 task brief (summarized, not verbatim).
   These require the most careful Lithuanian.

---

## Step 3: Generate Visual_Aid.docx

Generate using the docx skill (`/mnt/skills/public/docx/SKILL.md`).
Reference `references/visual_aid_format.md` for exact visual specs. Follow
these sub-steps:

### One-page-per-slide rule (CRITICAL)

Every slide's content MUST fit on a single landscape A4 page. Landscape A4
usable height = 11906 - 2×1134 = 9638 DXA (~16.9 cm). The accent bar
consumes ~680 DXA + 300-400 spacer = ~1080 DXA. That leaves ~8558 DXA
(~15 cm) for content. At 28pt body text with 1.5× line spacing, each
line is ~600 DXA. Budget: roughly 14 content lines per slide.

If content overflows, cut items (not font size). Slide 5 is the most
common overflow risk: max 4 terms, spacing after: 160 (not 200).

### 3a. Document setup

```
Orientation:  Landscape A4
Page size:    16838 x 11906 DXA (width x height)
Margins:      2 cm all sides (1134 DXA)
Font:         Arial throughout
Line spacing: 1.5x (360 twips) for all body text
```

### 3b. Build 6 slides

Generate exactly 6 pages. Use one section per slide (6 sections total,
each with identical page properties) instead of explicit page breaks.
This avoids blank pages caused by full-height elements pushing a
PageBreak paragraph to the next page.

**Slide 1 (Title):** Full navy (`1A237E`) background. All text white,
centered horizontally and vertically.
- Module name: 32pt, bold, allcaps, white
- Vertical spacing: 200 twips
- Lesson title: 48pt, bold, white
- No accent bar on this slide

**Slides 2-6:** Each slide follows the same structural pattern:
1. Accent bar: single-row, single-cell table spanning full content width.
   Height 680 DXA (~1.5 cm). Fill color matches the phase color.
   White bold 28pt label text inside, left-aligned with 200 DXA indent.
2. Spacing: 400 twips after the accent bar.
3. Content below on white background using the formatting specified in
   `references/visual_aid_format.md` for each slide.

**Phase-to-color mapping for accent bars:**

| Slide | Label | Fill color |
|-------|-------|------------|
| 2 | PAMOKOS PRADŽIOS KLAUSIMAI | F57C00 (Retrieval) |
| 3 | PAMOKOS TIKSLAI | 5E35B1 (Objectives) |
| 4 | UŽDUOTIS | 2E7D32 (Application) |
| 5 | PAGRINDINĖS SĄVOKOS | 1565C0 (Teaching) |
| 6 | PAMOKOS PABAIGOS KLAUSIMAI | F57C00 (Retrieval) |

### 3c. Lithuanian text encoding

Write all Lithuanian text as plain UTF-8 in the generation script. Never
use `\u` unicode escapes for Lithuanian letters (ą, č, ę, ė, į, š, ų, ū, ž).

**Exception:** Lithuanian typographic quotes must use escapes (`\u201E` for
opening „ and `\u201C` for closing ") because the closing quote conflicts
with JavaScript string delimiters.

### 3d. Em dash post-processing

The generation script MUST include a mechanical em dash removal step.
Add this helper and apply it to every text string before inserting into
the document:

```javascript
const noEmDash = (s) => s.replace(/\u2014/g, ':');
```

LLMs naturally produce em dashes regardless of prompt instructions.
Automated code-level replacement is the only reliable fix.

### 3e. Output

Use `Packer.toBuffer()` to write the file as `Visual_Aid.docx` to the
lesson folder.

---

## Step 3f — Cross-file Coherence Check

After generating the Visual_Aid.docx and before Lithuanian QA, verify
alignment between the visual aid content and sibling lesson files.

### What to check:

1. **Slide 5 terms vs. Theory_Pack.pdf (if it exists):**
   - Every term on slide 5 must appear in the Theory_Pack's terminology
     table. If a slide 5 term contradicts the Theory_Pack definition →
     use the Theory_Pack definition (it is the authoritative reference).
   - If slide 5 uses a term the Theory_Pack doesn't cover → flag it.

2. **Slide 4 task brief vs. Student_Task.pdf (if it exists):**
   - The task brief must describe the same activity as the Student_Task.
     Same scenario name, same deliverable, same tools.
   - If they diverge → align slide 4 to match the Student_Task.

3. **Slides 2, 6 retrieval questions vs. Teacher_Plan.docx (mandatory):**
   - Already required to be verbatim extractions. This step explicitly
     verifies: re-read the Teacher_Plan retrieval questions and confirm
     slides 2 and 6 are exact matches. Fix any drift.

4. **Slide 3 objectives vs. Teacher_Plan.docx:**
   - Objectives must match the plan's objectives section. If the plan
     was updated after the visual aid was started → use the plan's
     current objectives.

### On mismatch:

- Visual Aid adapts to match Teacher_Plan (authoritative for questions
  and objectives) and Student_Task (authoritative for task description).
- Theory_Pack is authoritative for term definitions.
- Flag unresolvable contradictions to the teacher.

---

## Step 3f: Write Plain-Text Sidecar

After generating the .docx (Step 3e) and passing the coherence check (Step 3f),
write all Lithuanian text to `Visual_Aid_text.txt` in the same lesson folder.
This sidecar enables reliable lt-qa POST-GEN checking (see lt-qa SKILL.md
"Plain-Text Sidecar Protocol"). Collect all slide text (titles, questions,
objectives, task brief, term definitions) as plain UTF-8, one paragraph per
line, with `## Slide N` headers separating slides.

Delete the sidecar after POST-GEN passes in Step 4.

---

## Step 4: Lithuanian QA (POST-GEN)

After generating the .docx and writing the sidecar, perform a structured review:

1. **Read the sidecar** `Visual_Aid_text.txt` as the canonical text to check.
2. **Mistake library scan:** Compare all text against `lt-qa/lt-mistakes.yaml`.
   Focus on slide 5 definitions and slide 4 task brief (these contain
   generated/summarized text, not verbatim extractions).
3. **Grammar check:** Scan generated text for case agreement, verb form,
   and morphology errors. Verbatim extractions from Teacher_Plan are
   assumed correct and skipped.
4. **Em dash scan:** Search for any em dash in the entire document.
   Zero tolerance. Replace every instance.
5. **Quote format check:** Verify all quotation marks use the Lithuanian
   „..." format (lower-upper). No straight quotes, no guillemets.
6. **Fix and regenerate** if any issues are found. Do not present a
   document with known errors.

---

## Step 5: Spellcheck and PDF Conversion

### 5a. Spellcheck

Run the Lithuanian spellchecker on the generated .docx:

```bash
python _scripts/spellcheck_lt.py {folder}/Visual_Aid.docx
```

Fix any genuine spelling errors flagged by the tool. Technical terms and
proper nouns may be false positives; ignore those.

### 5b. Convert to PDF

```bash
python -c "from docx2pdf import convert; convert('{folder}/Visual_Aid.docx', '{folder}/Visual_Aid.pdf')"
```

If `docx2pdf` is not installed: `pip install docx2pdf`.
If conversion fails (Word not available): keep the .docx and inform the
teacher that PDF conversion requires Microsoft Word.

### 5c. Clean up

Delete the intermediate `Visual_Aid.docx` after confirming the PDF exists
and has non-zero size. The final deliverable is PDF only (per locked
decision in CLAUDE.md).

### 5d. Present output

Verify `Visual_Aid.pdf` exists, then use `present_files` to share it
with the teacher.

---

## Batch Generation

When the teacher requests visual aids for a module or multiple lessons:

1. **Read the module README** to get the full lesson index.
2. **Filter** to L and I lessons only.
3. **Further filter** to lessons that have a `Teacher_Plan.docx` on disk.
   Skip lessons without a plan (do not abort the entire batch).
4. **Process in sequence order** for consistent terminology.
5. **Run Steps 1-5 per lesson.**
6. **Warn on missing optional files** (Student_Task.pdf, Theory_Pack.pdf)
   but continue generation using Teacher_Plan content alone.
7. **Report a summary table** after completion:

```
| Pamoka | Būsena | Pastaba |
|--------|--------|---------|
| 001_L - ... | Sukurta | - |
| 002_L - ... | Praleista | Nėra Teacher_Plan.docx |
| 003_I - ... | Sukurta | Be Theory_Pack |
```

---

## Source Priority

When sources disagree or overlap:

1. **Teacher_Plan.docx**: retrieval questions, objectives, task content, teaching phase
2. **Lesson README**: lesson scope, title, type, grade
3. **Teacher profile**: style constraints, classroom reality
4. **Student_Task.pdf**: concept priority for slide 5
5. **Theory_Pack.pdf**: definitions for slide 5
6. **General defaults**: only when above sources say nothing

---

## Reference Files

Read before every generation:
- `references/visual_aid_format.md`: Structure, colors, accent bar code, typography
- `/mnt/skills/user/lesson-plan-gen/references/teacher_profile.md`: Constraints
- `/mnt/skills/public/docx/SKILL.md`: docx-js generation mechanics
