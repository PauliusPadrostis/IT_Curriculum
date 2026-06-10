# IT_Curriculum — project spec

**Status:** v1 · 2026-06-09. The per-project rules the generator skills (theory-pack-gen,
student-task-gen, assessment-task-gen) load when they resolve to **IT_Curriculum**. This file is
the project marker; skills walk up from the cwd to find it.

> **Created by the skills rework** to hold what the generators used to hardcode, so the now
> project-agnostic skills behave **identically** for IT_Curriculum. Most of this project's rules
> already live in this repo's own **`CLAUDE.md`** and **`LESSON_TYPES.md`** — this spec **points to
> them** (single source of truth) and adds only the bits that were previously buried inside the
> skill bodies (the `.docx` render mechanics → `project-spec/render-docx.md`; the grading detail →
> `project-spec/grading.md`).

> **Apply only this project's rules when resolved here.** Never apply PamokosIT's Moodle-HTML rules.

---

## 1. Identity

Lithuanian gymnasium informatics curriculum, grades 9–12. Repo **`PauliusPadrostis/IT_Curriculum`**.
All student-facing content in Lithuanian; respond to the teacher in his language. Full identity,
workflow, and locked decisions: **this repo's `CLAUDE.md`** (read it — it is authoritative).

Status note: content work is **paused as of 2026-06-09** (the teacher is on PamokosIT). This spec
was bootstrapped so the reworked skills don't regress IT_Curriculum when work resumes.

---

## 2. Output format (per artifact)

Per `CLAUDE.md` → "Content Generation Rules" and "Locked Decisions":

| Artifact | Format |
|----------|--------|
| Teacher_Plan, Student_Task, Theory_Pack, Practice_Task, Answer_Key, Rubric | **`.docx`** |
| Assessment_Task | **`.xlsx`** (Testmoz import) — practical-task variants render `Assessment_Task.docx`; **every** assessment also gets `Rubric.docx` |
| Visual_Aid | `.html` (artifact still listed in `CLAUDE.md`; **note:** its generator `visual-aid-gen` was removed from the global skill set, so there is no longer a generator for it and the content skills no longer cross-check it — see §7) |
| README | `.md` |

**Canonical file names**, no lesson-code/title prefixes: `Theory_Pack.docx`, `Student_Task.docx`,
`Assessment_Task.docx`/`.xlsx`, `Rubric.docx`, `Answer_Key.docx`. Saved into the lesson folder.

**`.docx`/`.xlsx` render mechanics (the part that was inside the skills): see
`project-spec/render-docx.md`** — UTF-8 rule, the two-layer em-dash strip, quote normalization,
phantom-vowel + replacement-char scan, keepNext/keepLines/cantSplit, no explicit page breaks, the
Arial/navy visual identity, the QA sidecar, and file validation. Rendering tool: the **docx skill**
(`/mnt/skills/public/docx/SKILL.md`; `npm install -g docx`); **openpyxl** for `.xlsx`; the Testmoz
import template is `~/.claude/skills/assessment-task-gen/references/testmoz_import_template.xlsx`.

---

## 3. Folder grammar & context reads

Layout (per `CLAUDE.md` → "Repo Structure"):

```
Grade_XX/ Semester_X/ Module_Name/
  README.md                       (module index + lesson status rollup)
  NNN_T - Lesson_Title/           (T = lesson type code, see LESSON_TYPES.md)
    README.md  Teacher_Plan.docx  Student_Task.docx  Theory_Pack.docx  *.cpp
```

- **Lesson type codes** `L | I | P | A | D | T | MOCK | G` — canonical definitions in
  **`LESSON_TYPES.md`**. Folder-name suffix drives type/mode detection (e.g. `NNN_A` = assessment,
  `NNN_P` = practice).
- **Context to read** (per artifact): the lesson `README.md` (objectives, success criteria, type,
  grade, module), `Teacher_Plan.docx`, the module `README.md`; for assessments, all in-scope
  `L/I` `Teacher_Plan`/`Theory_Pack`/`Student_Task` files.
- **National curriculum reference: `_references/informatika_programa.md`** (canonical). Read it for
  the grade-level „Mokymo(si) turinys" and „pasiekimų lygiai". Grades 11–12 also use
  `_references/VBE_aprasas.pdf` and `_references/vertinimo_gaires.pdf`.
  > **Fix during rework:** student-task-gen previously named this file `informatika.docx` — that is
  > wrong; the real file is `_references/informatika_programa.md`. The reworked skills must use the
  > correct path.
- **Accumulated corrections:** these now live in their canonical homes — language rules in
  `~/.claude/skills/_shared/lt-rulebook.md` (folded in by lt-qa), render/grading rules in this
  spec's `project-spec/` files, pedagogy in `~/.claude/skills/_shared/pedagogy-standards.md`.

---

## 4. Design rules (.docx visual identity)

A4, **body font Arial 11pt `#333333`**, **navy headings `#1e3a8a`** (answer keys / rubrics also use
`#1F4E79` H1 / `#2E75B6` H3; code runs in Consolas). Palette + the full layout rules live in
`project-spec/render-docx.md`. Per `CLAUDE.md`, skills own their detailed formatting specs.

---

## 5. Grading policy & rubric → `project-spec/grading.md`

**Locked: 1–10 scale** (`CLAUDE.md` → "Locked Decisions": 1 = no work, 2 = everything bad, 3–10
proportional). The full percentage→grade band table (Žemynos gimnazija vertinimo tvarka, 2023),
point-allocation rules, competency-level distribution, and the **"every assessment gets a Rubric"**
requirement are in `project-spec/grading.md`. (The school name appears only in this **teacher-internal**
grading/policy provenance; it must never appear in student-facing output — `CLAUDE.md` "No repo
naming in generated content".)

---

## 6. Approved tools (HARD — per CLAUDE.md)

Software **only**: Code::Blocks, Excel, Word, Inkscape, Canva, Google Classroom, Testmoz.
**No phones. No Python (for students). C++ only** for programming. **No paper/notebooks** — students
don't carry them. Lesson-plan timing estimates sum to **≤37 min**.

---

## 7. QA & compliance

- **Lithuanian (mandatory):** all the hard rules in `CLAUDE.md` → "Lithuanian Language" apply
  (em dash banned; straight double quotes only; no AI text patterns; VLKK baseline). PRE-GEN load
  `~/.claude/skills/_shared/lt-mistakes.yaml` (CRITICAL rules); POST-GEN scan a `*_text.txt` sidecar
  against the full rulebook + RESIDUAL, fix, delete sidecar, and **end the turn with the
  `lt-mistakes updated:` marker** (Stop hook enforces it).
- **Pedagogy:** apply `~/.claude/skills/_shared/pedagogy-standards.md` (S1–S5).
- **No repo naming in content (HARD):** never put lesson codes (`001_L`, `007_A`), file-category
  names (`Theory_Pack`, `Student_Task`), or type codes (`P`, `L tipas`) in student-/teacher-facing
  text. Use descriptive Lithuanian ("teorijos santrauka", "užduoties lapas", "praktikos užduotys").
- **Visual_Aid de-scope (rework consequence):** because `visual-aid-gen` was removed, the reworked
  theory-pack-gen / student-task-gen **drop** the old "if `Visual_Aid.html` exists, cross-check
  slide 5 concepts" step. `Visual_Aid.html` remains a valid hand-made artifact type, but the
  generators no longer depend on or verify it. (Re-introduce the cross-check only if a Visual_Aid
  generator returns.)

---

## 8. Known inconsistencies preserved (not silently "fixed" by the rework)

- assessment-task-gen carries **two distribution axes** that are easy to conflate: a *difficulty*
  split (20% easy / 50% medium / 30% hard) and a *competency-level* split (~20% slenkstinis / ~30%
  patenkinamas / ~30% pagrindinis / ~20% aukštesnysis). Both are intentional; keep them distinct.
- answer-key-gen's POST-GEN historically read a `_text.txt` sidecar it never wrote — once merged
  into assessment-task-gen (which does write sidecars), this resolves. See `project-spec/grading.md`.
