---
tags:
  - project/it-curriculum
  - decisions
date-created: 2026-03-22
last-updated: 2026-03-22
---

# IT Curriculum Decisions

Append-only log. Never edit or delete existing entries.

## 2026-03-22 — Curriculum Scope

**Decision**: 7-lesson website design curriculum for 9th graders.

**Context**: Students need practical web skills. Module covers HTML/CSS fundamentals through a project-based approach where students build a personal or themed website incrementally across lessons.

**Rationale**: 7 lessons fits a typical Lithuanian gymnasium module block. Enough time to cover structure (HTML), styling (CSS), and basic layout without rushing into JavaScript.

## 2026-03-22 — Pending Decisions

The following are **not yet decided** and need resolution:

- **Lesson structure format**: How each lesson folder is organized in the repo — what files go where, what's generated vs. hand-written
- **Assessment format**: How student work is evaluated — rubric-based? Portfolio? Per-lesson tasks? Final project only?
- **Tool choices**: Do students use a specific editor? Live preview tools? GitHub Pages for hosting?
- **Progression model**: Linear (each lesson builds on previous) vs. modular (lessons can be taught in flexible order)
- **Lithuanian language**: How much of the curriculum content is in Lithuanian vs. English (code comments, instructions, UI labels)

## 2026-03-22 — Reference Documents Location

**Decision**: National curriculum reference documents stored in `_references/` at repo root.

**Context**: The lesson-plan-gen skill (Step 2b) and lesson-readme-gen skill need access to informatika.docx for cross-referencing curriculum requirements. VBE_aprasas.pdf and vertinimo_gaires.pdf support Grade 11–12 exam-aligned content generation.

**Rationale**: Centralizing references in `_references/` keeps them accessible to all skills without duplicating into individual lesson folders. The underscore prefix keeps the folder visually sorted before grade folders.

## 2026-03-22 — Phase naming convention

**Decision**: Retrieval phases renamed from academic terminology to plain Lithuanian: "Pamokos pradžios klausimai" (entry) and "Pamokos pabaigos klausimai" (exit). Format label simplified to just "žodinis".

**Context**: Teacher feedback that "Įžanginis atgaminimas" and "Išėjimo atgaminimas" sound overly academic and "Žodinis šaltojo kvietimo formatas" is unnecessarily wordy.

**Rationale**: The plan is a practical document opened before class — terminology should be immediately scannable, not academic.

## 2026-03-22 — Teacher_Plan.docx visual formatting spec

**Decision**: Adopted a color-coded formatting spec for Teacher_Plan.docx output with phase-specific colors (orange=questions, blue=teaching, green=application), metadata card, objectives box with purple accent, warning boxes, and page break rules.

**Context**: Previous output was visually flat — plain headings, no color differentiation, hard to scan during a live lesson.

**Rationale**: Color-coded phases let the teacher find the current section at a glance. Page break rules prevent orphaned headers.

## 2026-03-22 — Curriculum reference format

**Decision**: Replace `_references/informatika.docx` (mislabeled UTF-8 text file) with `_references/informatika_programa.md` — a structured markdown conversion containing all 6 achievement areas, level descriptors, teaching content per topic, and the full 4-grade lesson structure.

**Context**: The original informatika.docx was not a valid .docx file (UTF-8 text with .docx extension), so python-docx couldn't parse it and the lesson-plan-gen skill's cross-referencing step was always skipped. Additionally, grade-specific curriculum structures existed only as loose .txt files in Downloads.

**Rationale**: A readable .md file enables automatic cross-referencing during plan/README generation. All curriculum info in one place, structured with tables and headings for quick lookup.

## 2026-03-22 — I-lesson generation overhaul in lesson-plan-gen skill

**Decision**: Added Step 1b (L-Content Synthesis), expanded I-lesson decision tree by topic type, added activity palette with rotation rule, enforced teacher-led time cap (≤15 min), required tangible student artifacts, and made exit retrieval metacognitive instead of factual.

**Context**: The skill was treating I lessons as shape-selected L lessons — picking "Trumpas įvadas → ilga praktika" but without analyzing what L lessons taught, what needs integration, or what activity format fits the topic type. This produced I lessons that were either vague ("students apply what they learned") or teacher-dominated (teacher presents scenarios, students answer verbally).

**Rationale**: I lessons are structurally different from L lessons — they consolidate and apply, not teach. The skill needs explicit mechanisms to: (1) identify what to integrate from preceding L lessons, (2) select activity formats by topic type, (3) enforce student-driven structure (≥60% active work), and (4) produce tangible artifacts even for abstract topics. The new I_example_02.md exemplar (knowledge-heavy safety scenario analysis) demonstrates the correct pattern alongside the existing tool-based I_example_01.

## 2026-03-23 — Theory pack skill: "Sužinok daugiau" replaces "Kas toliau?"

**Decision**: The theory pack's final reader-facing section is "Sužinok daugiau" (explore the current topic deeper) not "Kas toliau?" (bridge to next lesson).

**Context**: The original skill version had "Kas toliau?" pointing students to the next lesson. The teacher's corrected version (Downloads/Theory-pack-gen.zip) changed this to "Sužinok daugiau" with 2-4 free, accessible resources for deeper exploration of the current topic.

**Rationale**: A theory pack is a self-contained reference for one lesson. Students should be able to go deeper into what they just learned, not be prematurely pointed toward the next lesson's content.

## 2026-03-23 — Lithuanian text must be UTF-8, never unicode escapes

**Decision**: All Lithuanian text in docx generation scripts must be written as plain UTF-8 characters. Unicode \u escapes are prohibited for Lithuanian letters (ą, č, ę, ė, į, š, ų, ū, ž). Only typographic quotes „" use escapes (\u201E, \u201c) due to JS string delimiter conflict.

**Context**: Across two theory packs, 8 spelling errors were found — all caused by writing Lithuanian via \u escapes. Errors included phantom extra vowels (dažniausiuų), missing diacriticals (jungiames), dropped consonants (įsilauti), and hallucinated verb forms (domėjiesės). These errors were invisible in the source code and undetectable by self-review.

**Rationale**: Unicode escapes remove visual feedback from the authoring process. When you write `\u012frodymu\u0173`, you can't see that there's an extra `u`. When you write `įrodymų`, the error would be visible. This is a structural fix — changing the generation method rather than adding more QA rules.

## 2026-03-23 — No explicit page breaks in theory pack docx generation

**Decision**: Never insert explicit `new Paragraph({ children: [new PageBreak()] })` in theory pack generation scripts. Use `keepNext: true`, `keepLines: true`, and `cantSplit: true` properties instead.

**Context**: Explicit page breaks before sections 3 and "Praktiniai patarimai" in the lesson 002 theory pack created pages that were 30-50% empty.

**Rationale**: The generator cannot accurately predict where content lands on a page. Explicit breaks almost always create large gaps. Word's layout engine handles pagination correctly when given keepNext/keepLines hints on headings and cantSplit on tables/boxes.

## 2026-03-23 — Theory pack skill moved to ~/.claude/skills/

**Decision**: The canonical theory-pack-gen skill lives at `~/.claude/skills/theory-pack-gen/` (3 files: SKILL.md, references/content_format.md, references/quality_checklist.md).

**Context**: The skill was previously only in the anthropic-skills plugin cache, which meant it could be stale or overwritten. Moving to ~/.claude/skills/ makes it persistent, version-controlled, and always loads the latest version.

**Rationale**: All custom skills that evolve during the project should live in a stable, user-controlled location rather than a plugin cache directory.

## 2026-03-27 — Lesson Būsena chain with manual check gate

**Decision**: Lesson status progression is 📋 Šablonas → 🚧 WIP → ✅ Failai sukurti → ✅ Baigta. The final transition to Baigta requires explicit teacher confirmation. The Reikalingi failai table includes a Patikrinta column that only the teacher flips. Lesson is Baigta only when all files are present AND all Patikrinta are ✅.

**Context**: Without a manual gate, lessons could be marked complete purely by file existence, even if the generated content has errors or hasn't been reviewed.

**Rationale**: Automated file detection handles the tedious tracking. The teacher retains final authority over quality. The end-session skill prompts for confirmation when a lesson reaches Failai sukurti status.

## 2026-03-28 — Student-facing files output as PDF

**Decision**: Theory_Pack and Student_Task skills generate .docx internally, convert to PDF via docx2pdf (uses MS Word on Windows), and delete the intermediate .docx. Teacher_Plan remains .docx so teachers can edit.

**Context**: Teacher requested PDF output for student-facing materials. DOCX files risk students accidentally editing content or seeing messy formatting differences across Word versions.

**Rationale**: PDF is the locked distribution format for students. Teachers keep .docx for plans they may need to annotate or adjust before class.

## 2026-03-28 — Format specs include teacher-approved paragraph spacing values

**Decision**: content_format.md and task_format.md now contain exact TWIPs spacing tables extracted from teacher's manually fixed .docx files (e.g., H1: before=360/after=160, body: after=100 for theory packs; H2: before=300/after=120 for student tasks).

**Context**: Generated documents had "poor formatting" per teacher feedback. The specs had correct colors/fonts/sizes but left paragraph spacing vague. Teacher fixed the layout manually in Word and uploaded the corrected files.

**Rationale**: Codifying exact spacing values from the teacher's exemplar files means future generation should match the approved layout without manual fixes.

## 2026-03-28 — Patch .docx XML for text-only fixes instead of regenerating

**Decision**: When only text content needs correction (not formatting/structure), fix errors via XML find-replace inside the .docx zip rather than regenerating from scratch.

**Context**: Teacher manually fixed formatting in all 3 lesson 001 files. Regenerating would have lost those formatting fixes. The only remaining issues were 4 text errors in Teacher_Plan.docx.

**Rationale**: Preserves teacher's manual formatting work. Faster and less error-prone than full regeneration for targeted text corrections.

## 2026-03-28 — Visual Aid uses sections instead of page breaks

**Decision**: The visual-aid-gen skill generates each slide as a separate docx section (6 sections total) rather than using explicit PageBreak paragraphs.

**Context**: During test generation, explicit page breaks after full-height elements (title slide table filling content area) created blank pages. The PageBreak paragraph had no room on the current page and spilled to the next, producing 8 pages instead of 6.

**Rationale**: Sections naturally start on new pages without requiring a PageBreak element. This eliminates blank page issues regardless of content height.

## 2026-03-28 — Visual_Aid.pdf added to lesson deliverables

**Decision**: L and I lessons now have a fourth deliverable: Visual_Aid.pdf (6-page landscape A4 projection aid). Generated by the visual-aid-gen skill from Teacher_Plan content, optionally enriched by Student_Task and Theory_Pack. Output is PDF only (same docx-to-PDF pipeline as other student-facing materials).

**Context**: Teacher uses a two-monitor setup (plan on laptop, visual aid on projector). Students must not see Teacher_Plan contents. Admin requires learning objectives displayed every lesson.

**Rationale**: A separate projection file keeps the plan private, satisfies the admin objective-display requirement, and provides a key-concepts reference slide that stays up during independent work time.
