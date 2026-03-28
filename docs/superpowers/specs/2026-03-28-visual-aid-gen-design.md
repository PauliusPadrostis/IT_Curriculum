# Visual Aid Generator — Design Spec

**Date:** 2026-03-28
**Status:** Draft
**Skill name:** `visual-aid-gen`
**Applies to:** L and I lessons only

---

## Problem

The teacher projects visual aids on the classroom screen during lessons
(two-monitor setup: plan on laptop, visual aid on projector). Currently
there is no standardized visual aid generation. The teacher needs a
consistent, phase-color-coded PDF that follows the lesson flow and is
readable from the back of the classroom.

Students must not see the Teacher_Plan contents, so appending projection
pages to the plan is not an option. The visual aid must be a separate
file.

Admin requires that learning objectives are displayed to students every
lesson.

---

## Solution

A new skill (`visual-aid-gen`) that generates a 6-page landscape A4 PDF
for classroom projection. Content is extracted from existing lesson
files. Same `docx` → `docx2pdf` → PDF pipeline as other gen skills.

---

## Slide Structure

| # | Label | Content | Phase Color | Duration |
|---|-------|---------|-------------|----------|
| 1 | Title | Module name + lesson title | Navy 1A237E (full bg) | ~30 sec |
| 2 | Pradžios klausimai | Numbered retrieval questions | Retrieval (F57C00 accent bar) | ~5 min |
| 3 | Tikslai | Learning objectives | Objectives (5E35B1 accent bar) | ~1 min |
| 4 | Užduotis | Task brief or integration targets | Application (2E7D32 accent bar) | ~1 min |
| 5 | Sąvokos | Key concepts needed for the task | Teaching (1565C0 accent bar) | ~15-20 min |
| 6 | Pabaigos klausimai | Numbered retrieval questions | Retrieval (F57C00 accent bar) | ~5 min |

---

## Visual Style

**White canvas + accent strip.** Each slide (except title) has:
- White page background
- Full-width colored accent bar at top (~1.5 cm, solid phase color)
- Phase label in white bold text inside the bar
- Content below in large dark text on white

**Title slide exception:** Full navy background, white centered text.

This mirrors the Teacher_Plan's own accent-strip styling, keeping the
document family visually coherent. White backgrounds maximize contrast
on low-quality classroom projectors.

---

## Typography

| Element | Size | Weight | Color |
|---------|------|--------|-------|
| Title — module name | 32pt | Bold, allcaps | FFFFFF |
| Title — lesson name | 48pt | Bold | FFFFFF |
| Accent bar label | 28pt | Bold | FFFFFF |
| Body text | 28pt | Normal | 212121 |
| Question numbers | 28pt | Bold | Phase accent |
| Bullet markers (▸) | 28pt | Bold | Phase accent |
| Key concept terms | 28pt | Bold | Phase accent |
| Key concept definitions | 24pt | Normal | 212121 |

All text: Arial, 1.5× line spacing.

---

## Content Sourcing

### Required file
- `Teacher_Plan.docx` — MUST exist. Abort if missing.

### Optional files (used for slide 5)
- `Student_Task.pdf` — task requirements inform concept priority
- `Theory_Pack.pdf` — terminology table provides definitions

### Extraction map

| Slide | Source | Extraction target |
|-------|--------|-------------------|
| 1 | README / folder path | Lesson title (Pavadinimas), module name |
| 2 | Teacher_Plan | "Pamokos pradžios klausimai" phase → questions |
| 3 | Teacher_Plan | Objectives box → bullet list |
| 4 | Teacher_Plan | Application phase → task description or integration targets |
| 5 | Student_Task + Teacher_Plan + Theory_Pack | Task-relevant terms (priority), then teaching phase terms |
| 6 | Teacher_Plan | "Pamokos pabaigos klausimai" phase → questions |

### Key Concepts priority (slide 5)

1. Terms/concepts required to complete the task (highest)
2. Core terms from Teacher_Plan teaching phase
3. Terms from Theory_Pack terminology table
4. Hard cap: 4–5 items. Each = bold term + one-line definition (~15 words max)

---

## Slide 4 — L vs I Lesson Behavior

**L lessons:** Brief task description from the application phase
(2–4 sentences).

**I lessons:** If the application phase names a single concrete
deliverable (e.g., "sukurkite plakatą", "parašykite programą"), describe
that task briefly. If the application phase has no single deliverable
(multiple activities, discussion-based, or scenario analysis), list
integration targets as bullets ("Šios pamokos metu sujungsite: ...").

---

## Output

- **File:** `Visual_Aid.pdf`
- **Location:** Lesson folder (alongside Teacher_Plan.docx)
- **Pipeline:** Generate `Visual_Aid.docx` → spellcheck → `docx2pdf` → delete `.docx`
- **Validation:** Run `python _scripts/spellcheck_lt.py Visual_Aid.docx` before PDF conversion
- **Dependencies:** `docx` npm package (already installed), `docx2pdf` Python package (already installed)

---

## Implementation Approach

- `.docx` generation via `docx` npm library (same as all other skills)
- Landscape A4 orientation
- Accent bars as single-row, single-cell tables with colored shading
- Explicit page breaks between slides
- docx2pdf conversion via Python (Microsoft Word backend)
- Follows same Lithuanian language rules as all other skills (no em dashes, „..." quotes, lt-qa checks)

---

## Skill Structure

```
.claude/skills/visual-aid-gen/
  SKILL.md                          (skill definition + steps)
  references/
    visual_aid_format.md            (exact formatting spec — already written)
```

The skill will follow the same pattern as other gen skills:
1. Read lesson context (README, Teacher_Plan, optional files)
2. Load lt-qa pre-gen rules (lt-qa/SKILL.md Phase 1)
3. Extract content per slide
4. Generate .docx with docx library
5. Run lt-qa post-gen check on generated text
6. Run spellcheck: `python _scripts/spellcheck_lt.py Visual_Aid.docx`
7. Convert to PDF via docx2pdf
8. Delete intermediate .docx

---

## What This Is NOT

- Not a PowerPoint/slide deck — no transitions, animations, or builds
- Not a student handout — projection only, never printed or distributed
- Not a Theory_Pack replacement — slide 5 is a task-focused subset
- Not a lesson summary — minimal text, maximum readability

---

## Decisions Made During Design

| Decision | Rationale |
|----------|-----------|
| 6 slides, not 5 | Key concepts reference slide added — stays up during work, provides task-relevant terms students can glance at |
| Landscape orientation | Projected on screen, not printed |
| White + accent strip, not full colored backgrounds | Better projector contrast, matches Teacher_Plan styling, simpler docx implementation |
| docx → PDF, not pptx or direct PDF | Same pipeline as all other skills, zero new dependencies |
| Separate file, not Teacher_Plan appendix | Students must not see plan contents; two-monitor workflow requires separate file |
| Goals slide mandatory | Admin requirement — objectives displayed every lesson |
| 28pt minimum body text | Readability from 8m classroom distance |
| 4–5 key concepts max | Font size constraint at landscape A4 with 28pt/24pt text |
| 2 cm margins (not 1 inch) | Maximizes projection area; matches Teacher_Plan margins, not student-facing doc margins |
| Existing README Visual_Aid entries will be updated | Some READMEs have speculative content-specific descriptions (e.g., "infografika"); these predate the standardized 6-slide format and will be overwritten when the skill generates for those lessons |
