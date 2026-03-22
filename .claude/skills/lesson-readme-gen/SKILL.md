---
name: lesson-readme-gen
description: >
  Generate standardized Lithuanian lesson README.md files for the IT Curriculum GitHub repo
  (PauliusPadrostis/IT_Curriculum). Use this skill whenever the teacher asks to create, generate,
  write, rewrite, update, or fix a lesson README. Also triggers on: "sugeneruok README",
  "padaryk README", "perrašyk README", "readme for lesson", "pamokos README", "generate readme",
  "create a readme for", "rewrite this readme", or any mention of generating/updating lesson
  metadata files for the curriculum repo. This skill handles both creating READMEs from scratch
  and rewriting existing READMEs into the standardized format. If the user mentions working on
  the IT curriculum repo or lesson folders and needs a README, use this skill.
---

# Lesson README Generator

Generates standardized Lithuanian-language README.md files for the IT Curriculum repo.
Each README serves as a lesson's index card — metadata, learning objectives, and operational
information. All generated content is in **Lithuanian**. Respond to the teacher in whatever
language they use, but the README itself is always Lithuanian.

The skill operates in three modes: `minimal`, `full`, and `update`.

---

## Modes

### `minimal` — Scaffold mode

Use when: the lesson folder is new or mostly empty. No lesson content files exist yet.
Purpose: create a lightweight but honest README that serves as a planning stub.

Generates: metadata table, overview, learning objectives, and expected file list.
Defers: Bloom level → "TBD", Dažniausios klaidos → placeholder, Pamokos eiga → omitted,
Sėkmės kriterijai → omitted, Pasirengimo vartai → omitted.

Būsena is set to: 📋 Šablonas

This is the default mode for early repo filling. Speed matters more than richness.

### `full` — Complete mode

Use when: the lesson has real content — a Teacher_Plan, slides, task sheets, or at least
a rich description from the teacher. Enough information exists to generate meaningful
pedagogical sections.

Generates: all sections. Infers Bloom level from lesson content if sufficient evidence
exists. Adds readiness baseline, lesson flow summary, and full file table.

Būsena is set to: 🚧 WIP if any required files are missing or TBD sections remain.
✅ Baigta if all type-required files are present and no TBD placeholders remain
(except Dažniausios klaidos, which is allowed to stay as placeholder).

### `update` — Refresh mode

Use when: files were added to or removed from an existing lesson folder, or the teacher
wants to enrich specific sections of an existing README without regenerating everything.

Reads the current README, scans the lesson folder for changes, updates the file table,
and enriches any sections that can be improved from new content. Leaves other sections
untouched. Recalculates Būsena based on current state.

**Structural change escalation:** if any of these metadata fields changed since the
existing README was written — lesson type, grade, tema, or assessment format — update
mode escalates to full regeneration of all dependent sections. A type change from L to A,
for example, invalidates the file table, may require a Vertinimo būdas section, and
changes expected file categories. Simple file additions don't trigger this — only
metadata-level changes do.

**Sequence renumbering:** if a lesson folder is merged into another or deleted, all
downstream `Eilės nr.` values in the same topic/semester must be decremented. This skill
does not auto-scan siblings — but when the teacher reports a merge or deletion, explicitly
flag: *"Eilės nr. NNN ir visi vėlesni tos temos numeriai turi būti atnaujinti."*
List the affected lesson codes so the teacher knows which READMEs need a follow-up
`update` pass. Do not silently skip this.

### Mode detection

If the teacher doesn't specify a mode, infer it:
- Lesson folder is empty or has only a README → `minimal`
- Lesson folder has content files (Teacher_Plan, Student_Task, etc.) → `full`
- Teacher says "update", "refresh", "atnaujink", "papildyk" → `update`
- Teacher provides/uploads an old README and says "rewrite" → `full`

When in doubt, ask.

### Būsena rules

| Būsena          | Condition                                                    |
|-----------------|--------------------------------------------------------------|
| 📋 Šablonas     | Generated in `minimal` mode                                  |
| 🚧 WIP          | Generated in `full`/`update` but: missing required files,    |
|                 | OR has TBD sections (except Dažniausios klaidos placeholder) |
| ✅ Baigta        | All type-required files present, no TBD sections remain      |
|                 | (Dažniausios klaidos placeholder is allowed in Baigta)       |

---

## Step 1 — Gather Context

### 1a — Infer from path

If the teacher provides a file path or lesson folder location, parse it automatically:

```
Grade_9/Semester_1/01_Safety/015_L - Ergonomics/
→ grade: 9, semester: 1, tema: Safety, code: 015_L, type: L
```

Extraction rules:
- **Grade**: from `Grade_N` folder → N
- **Semester**: from `Semester_N` folder → N
- **Tema**: from module folder name (strip leading number + underscore)
- **Lesson code**: from lesson folder prefix (NNN_TYPE)
- **Type**: from the type portion of the code (L, I, P, A, D, T, MOCK, G)

Do not ask the teacher for information that can be parsed from the path.

### 1b — Scan folder contents (if accessible)

If running in an environment where the lesson folder is accessible (e.g., Claude Code
with repo access), scan it:

```
Files found:
- README.md (existing — read for content extraction)
- Teacher_Plan.docx
- Visual_Aid.pdf
```

This scan determines: mode inference, file table population, Būsena calculation,
and whether enough content exists to infer Bloom level.

### 1c — Read existing README (if present)

If an existing README is found or provided, extract usable content:

- Metadata fields (type, grade, semester, etc.)
- Any real content in overview (not title-echo)
- Pasirengimo vartai items (preserve if substantive)
- Dažniausios klaidos items (preserve if from real classroom evidence)
- Bloom level (preserve if explicitly set with justification)
- Any other sections with genuine content

**Title-echo detection**: if a section's content is essentially the lesson title
with minor wrappers (e.g., "Student can explain [title]"), discard it and regenerate.

---

## Step 2 — Interview

After gathering context, identify what's still missing. Ask for missing fields in
**one concise message** — not one field at a time.

### Required for all modes:

| Field               | Source                    | Ask if missing                              |
|---------------------|---------------------------|---------------------------------------------|
| **Pamokos kodas**   | Path parse or teacher     | Lesson code, e.g. 015_L, 033_I, 041_MOCK   |
| **Pavadinimas**     | Old README or teacher     | Lesson title in Lithuanian                   |
| **Tipas**           | Code parse or teacher     | L / I / P / A / D / T / MOCK / G            |
| **Klasė**          | Path parse or teacher     | 9, 10, 11, or 12                            |
| **Semestras**       | Path parse or teacher     | 1 or 2                                      |
| **Tema**            | Path parse or teacher     | Topic name                                  |

### Content input by mode:

| Mode       | Content requirement                                              |
|------------|------------------------------------------------------------------|
| `minimal`  | At least one sentence describing the lesson's focus. Can be      |
|            | brief — even "mokiniai mokosi apie ergonomiką ir sveiką          |
|            | kompiuterio naudojimą" is enough. Title alone is NOT enough.     |
| `full`     | 2+ sentences describing lesson content, OR accessible lesson     |
|            | files that the skill can read for context.                       |
| `update`   | Existing README provides base. Teacher specifies what to change. |

### Additional for `full` mode:

| Field               | Source                    | Ask if missing                              |
|---------------------|---------------------------|---------------------------------------------|
| **Potemė**          | Old README or teacher     | Sub-topic name, if applicable               |
| **Namų darbas**     | Teacher                   | Brief description or "Nėra"                 |
| **Papildomi ištekliai** | Teacher                | Links, videos, sources — or "Nėra"          |
| **Trukmė**          | Default 40 min            | Ask only if teacher indicates otherwise      |

### Additional for A-type lessons (`full` mode):

| Field                | Ask                                                        |
|----------------------|------------------------------------------------------------|
| **Vertinimo formatas** | Testas / Praktinė užduotis / Mišrus / Kita              |
| **Vertinimo skalė**   | 1–10 / Įskaityta-neįskaityta / Kita                     |

### Interview style:

Show what was auto-detected and what's missing. Example:

> Iš kelio nustatyčiau: 9 kl., 1 semestras, tema Safety, kodas 015_L.
> Trūksta: pamokos pavadinimo ir bent vieno sakinio apie turinį.

---

## Step 3 — Generate

Read the template from `assets/readme_template.md`. Fill sections according to mode.

### Section generation rules by mode:

| Section                  | `minimal`        | `full`            | `update`         |
|--------------------------|------------------|-------------------|------------------|
| Metadata table           | ✅ Generate       | ✅ Generate        | ✅ Refresh        |
| Apžvalga                 | ✅ Generate       | ✅ Generate        | Keep or improve  |
| Mokymosi tikslai         | ✅ Generate (2–3) | ✅ Generate (2–4)  | Keep or improve  |
| Sėkmės kriterijai        | ❌ Omit           | ✅ Generate        | Keep or improve  |
| Bloom lygis              | "TBD"            | ✅ Infer or ask    | Infer if possible|
| Pasirengimo vartai       | ❌ Omit           | ✅ Generate        | Keep or improve  |
| Dažniausios klaidos      | Placeholder ¹    | Placeholder ¹     | Keep or improve  |
| Pamokos eiga             | ❌ Omit           | ✅ Generate        | Keep or improve  |
| Vertinimo būdas (A only) | ❌ Omit           | ✅ Generate        | Keep or add      |
| Trukmė                   | ✅ Default        | ✅ Generate        | Keep             |
| Namų darbas              | "Nėra" or brief  | ✅ Generate        | Keep or improve  |
| Reikalingi failai        | ✅ From type ref  | ✅ From scan+type  | ✅ Rescan         |
| Papildomi ištekliai      | "Nėra"           | ✅ Generate        | Keep or improve  |

¹ Placeholder text: `Bus papildyta po pirmos pamokos vykdymo.`

### Section-specific rules:

**Metadata table:** Direct mapping. Emoji type codes:
L → 📖, I → 🔧, P → 📝, A → 📊, D → 🎯, T → ⏱, MOCK → 📋, G → 🔄.
Būsena calculated per rules in Modes section.

**Apžvalga:** 2–4 sentences in `full` mode, 1–2 sentences in `minimal` mode.
Must not restate the title — must describe what students actually do and why
this lesson matters in the topic context.

**Mokymosi tikslai:** Each starts with a verb. In `full` mode, if Bloom level is
determined, verbs should match that level (see `references/bloom_taxonomy_lt.md`).
In `minimal` mode, use general action verbs — Bloom alignment happens in `full`/`update`.

**Sėkmės kriterijai** (`full` only): Observable, verifiable. A teacher should be able to
check each criterion during or after the lesson. Avoid vague formulations like "mokinys
supranta" — use "mokinys gali parodyti / paaiškinti / atlikti / atskirti."

**Bloom taksonomijos lygis:**
- In `minimal` mode: `**TBD** — bus nustatyta, kai pamokos turinys bus parengtas.`
- In `full` mode: infer from available evidence using this hierarchy:
  1. Existing README with justified Bloom level → preserve
  2. Readable lesson content (Teacher_Plan text, task descriptions) that clearly shows
     what cognitive demand is placed on students → infer level
  3. Teacher's verbal description of what students DO → suggest level
  4. Only filenames or inaccessible binary files available → keep TBD or ask teacher
  Do NOT infer Bloom from filenames, file counts, or topic titles alone.
- In `update` mode: if currently TBD and new readable content is now available,
  attempt inference using the same hierarchy. Otherwise leave TBD.

**Pasirengimo vartai** (`full` only): Recommended competency baseline — not a hard gate.
These describe what a student should ideally be able to do before this lesson. They serve
as diagnostic signals for the teacher, not as binary pass/fail blockers.
Each item should be a testable competency, not a topic name.
Bad: "Žino apie ciklus." Good: "Gali parašyti for ciklą, kuris iteruoja per masyvą."

**Dažniausios klaidos:** Always use placeholder in initial generation:
`Bus papildyta po pirmos pamokos vykdymo.`
Only populate with real mistakes if the teacher explicitly provides them from classroom
experience, or during `update` mode when the teacher supplies observed mistakes.
Do not fabricate common mistakes from topic descriptions.

**Pamokos eiga** (`full` only): 3–4 rows. Time blocks should sum to the lesson duration
(default 40 min, adjustable). This is a summary — detailed plan lives in Teacher_Plan.docx.

**Terminology for lesson phases:**
- Use "Pamokos pradžios klausimai" (NOT "Įžanginis atgaminimas") for entry retrieval.
- Use "Pamokos pabaigos klausimai" (NOT "Išėjimo atgaminimas") for exit retrieval.
- Use "žodinis" as the format label (NOT "žodinis šaltojo kvietimo formatas").
These names must be used in the Pamokos eiga table and anywhere phases are referenced.

**Vertinimo būdas** (A-type only, `full` mode): Insert between Pamokos eiga and Trukmė.

**Integruota formatyvinė patikra** (optional, any type): A short embedded check at the end
of a lesson — not separately graded. Use this field when the lesson design explicitly
includes a low-stakes check (exit ticket, quick quiz, verbal check) that was not split into
its own lesson folder, but was instead merged into this lesson.

Format:
```markdown
## 📌 Integruota formatyvinė patikra

~10 min. Žemos rizikos patikra pamokos pabaigoje, prieš pereinant prie kito skyriaus.

**Formatas:** [pvz., išėjimo bilietas / trumpa apklausa / žodinis patikrinimas]
**Klausimai / užduotis:** [konkretus turinys arba placeholder]
```

Do NOT include this section by default. Only add it when:
- The teacher explicitly requests it, OR
- The lesson folder previously contained a standalone formative check folder that was
  merged into this lesson.

When generating in `minimal` mode and a formative check merge is indicated, include the
section with a placeholder for format and questions.

**Reikalingi failai:**
- List file categories appropriate for this lesson type (consult `references/lesson_types.md`
  and the File Categories table below).
- **If Būsena = Šablonas or WIP:** show all expected categories with ✅/❌ status markers.
  This makes the README an actionable checklist during development.
- **If Būsena = Baigta:** list only files that actually exist. No ❌ markers.
  Mature lessons should look clean, not like an unfinished checklist.
- If folder is NOT accessible: list expected categories without status markers.

**Papildomi ištekliai:** Brief descriptions with links, or "Nėra."

---

## File Categories

All lesson material files use canonical category names. Each category has a preferred
format and allowed alternatives. This is an IT curriculum — lesson assets may legitimately
be code files, notebooks, spreadsheets, or other technical formats.

| Category               | Preferred    | Also allowed              | Used by types      | Description                          |
|------------------------|-------------|---------------------------|--------------------|------------------------------------|
| Teacher_Plan           | .docx       | .md                       | All                | Timed lesson plan (privalomas)       |
| Visual_Aid             | .pdf        | .pptx                     | L, I, P, D         | Slides / visual materials            |
| Student_Task           | .docx       | .md, .pdf                 | L, I, P            | Task sheet / activity instructions   |
| Project_Brief          | .docx       | .md, .pdf                 | I                  | Multi-step project description       |
| Homework               | .docx       | .md, .pdf                 | L, I               | Homework instructions                |
| Answer_Key             | .docx       | .md, .pdf, .py, .xlsx     | P, A, D, T, MOCK   | Answers / exemplar solutions         |
| Rubric                 | .docx       | .md, .pdf, .xlsx          | A                  | Grading criteria                     |
| Marking_Guide          | .docx       | .md, .pdf, .xlsx          | A, T, MOCK          | Marking scheme                       |
| Assessment_Task        | .docx       | .md, .pdf, .py, .html     | A                  | The assessment itself                |
| Practice_Task_Set      | .docx       | .md, .pdf, .py            | P                  | Practice problems                    |
| Drill_Task_Set         | .docx       | .md, .pdf, .py            | D                  | Exam-style drill problems            |
| Timed_Task_Set         | .docx       | .md, .pdf                 | T                  | Timed exam-section task              |
| Mock_Paper             | .docx       | .pdf                      | MOCK               | Full/partial mock exam               |
| Reflection_Sheet       | .docx       | .md                       | MOCK, G            | Post-assessment reflection           |
| Targeted_Task_Set      | .docx       | .md, .pdf, .py            | G                  | Gap-repair tasks                     |
| Starter_Files          | / (folder)  | .zip                      | L, I               | Code, datasets, templates, etc.      |

**Format selection guidance:**
- .docx = default for structured documents, rubrics, formal assessments
- .md = lightweight alternative, good for tasks that live naturally in the repo
- .pdf = exported/finalized materials, visual aids from Canva
- .py, .html, .xlsx, .csv, .ipynb = technical assets appropriate for IT lessons
- / (folder) = when multiple related files are needed (code projects, datasets)

When scanning a folder, match files to categories by prefix, not by extension.
`Student_Task.md` and `Student_Task.docx` both belong to the Student_Task category.

---

## Lesson Code Format

Lesson folders use the format: `NNN_[TYPE] - Short description`

Where:
- `NNN` = three-digit sequence number (zero-padded)
- `[TYPE]` = lesson type code: L, I, P, A, D, T, MOCK, G

Examples:
- `015_L - Ergonomika ir sveikas kompiuterio naudojimas`
- `033_I - Ciklų taikymas praktinėje užduotyje`
- `041_MOCK - Bandomasis egzaminas nr. 1`

Note: MOCK is a multi-character type code. All other types are single characters.

---

## Step 4 — Validate

Run these checks before presenting the README:

### 4a — Bloom consistency (skip if TBD)

If Bloom level is set: verify that learning objective verbs match the stated level.
Read `references/bloom_taxonomy_lt.md` for validation rules.
If mismatch: suggest correction to teacher rather than silently adjusting.

### 4b — Content quality

- Apžvalga must not be a restatement of the title.
- No section should contain only "[...]" or template placeholder text.
- Every section must have real content or an explicit "Nėra" / "TBD" / placeholder
  where the template allows it.

### 4c — Lesson type validation

- Check lesson type against grade recommendations (see `references/lesson_types.md`).
  D is primarily 11–12. T, MOCK, G are primarily 12.
- If a restricted type is requested for an unusual grade → ask, don't block.

### 4d — File requirements

Compare the file table against minimum requirements for the lesson type
(from `references/lesson_types.md`). If a required category is missing → add it.

### 4e — Būsena consistency

Verify that the Būsena value matches actual README state:
- Šablonas: only if generated in minimal mode
- WIP: if any required files missing OR any TBD sections (except Dažniausios klaidos)
- Baigta: only if all type-required files present and no TBDs remain

---

## Step 5 — Output

1. Present the complete README in a code block for review.
2. Ask: "Ar viskas gerai? Ar reikia kažką pakeisti?"
3. If approved:
   - If a target path is known → save to that path.
   - Otherwise → save to `/mnt/user-data/outputs/README.md`.
4. After saving, use `present_files` to share the file.

If changes requested → apply and re-validate.

---

## Reference Files

- `assets/readme_template.md` — Canonical README template. Read before every generation.
- `references/bloom_taxonomy_lt.md` — Bloom taxonomy levels, Lithuanian verbs, validation rules.
  Read during `full` mode generation and validation.
- `references/lesson_types.md` — Lesson type definitions, grade recommendations, file requirements.
  Read during file table generation and type validation.
