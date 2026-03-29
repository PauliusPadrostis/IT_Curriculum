# IT Curriculum: Repo Status

Last updated: 2026-03-29

## Current State

- **Grades in repo:** Grade 9, Grade 10, Grade 11, Grade 12
- **Modules:** 26 total across all grades
- **Lesson folders:** 351 total
- **Content files:** 11 non-README files across 7 lessons (all in Grade 9 Semester 1 01_Safety)
- **Lessons with content:** Failai sukurti: 1 (001) | WIP: 6 (002-007) | Sablonas: 344

## Active Gaps

- **Lesson 001 (Ergonomics):** All 4 files present (Teacher_Plan, Theory_Pack, Student_Task, Visual_Aid). Awaiting teacher review.
- **Lessons 002-004 (L type):** Only Teacher_Plan.docx. Missing Theory_Pack.pdf, Student_Task.pdf, Visual_Aid.pdf.
- **Lesson 005 (I type):** Only Teacher_Plan.docx. Missing Student_Task.pdf, Visual_Aid.pdf.
- **Lesson 006 (P type):** Only Teacher_Plan.docx. Missing Practice_Task.pdf, Answer_Key.pdf.
- **Lesson 007 (A type):** Only Teacher_Plan.docx. Missing Assessment_Task.xlsx, Rubric.pdf, Answer_Key.pdf.
- **All other modules (344 lessons):** Sablonas (README only).
- **QA report:** `tasks/qa-report-01_Safety.md` has 16 issues from prior session (some may be resolved by file deletions).

## Skills Status

- All generation skills operational: lesson-plan-gen, theory-pack-gen, student-task-gen, visual-aid-gen, assessment-task-gen, practice-task-gen, answer-key-gen
- **lt-qa:** Updated with 2 new calque patterns (condition-last word order, nominative+nepakanka)
- **student-task-gen:** Format spec updated (hint/check colors, step spacing, checklist keepNext, no running header)
- **visual-aid-gen:** Landscape dimension instructions fixed in format reference
- **lesson-plan-gen:** Warning box spacing and diary keepNext rules updated

## Pending Work

- **Next content push:** Generate missing files for 002-007 (Theory_Pack, Student_Task, Visual_Aid for L/I; Practice_Task + Answer_Key for P; Assessment materials for A)
- **All modules beyond 01_Safety:** 344 lessons with no content

## Changelog

| Date | Summary |
|------|---------|
| 2026-03-29 | Generated all 001_L materials (Theory_Pack, Student_Task, Visual_Aid), fixed formatting issues, patched 5 skills |
| 2026-03-29 | Built module-qa skill (SKILL.md + 5 refs), smoke-tested on 01_Safety, found 16 issues |
| 2026-03-29 | Designed module-qa skill: spec + 8-task implementation plan, parallel subagent architecture |
| 2026-03-29 | Built practice-task-gen skill (SKILL.md + 3 refs), patched answer-key-gen + student-task-gen, generated Practice_Task.pdf for 006_P |
| 2026-03-29 | Designed practice-task-gen skill: spec + 7-task implementation plan, brainstormed P lesson pedagogy |
| 2026-03-28 | Smoke-tested answer-key-gen on 007_A, generated Answer_Key.docx, updated README |
| 2026-03-28 | Built answer-key-gen skill (SKILL.md + 2 refs + 3 exemplars), design spec + plan committed |
| 2026-03-28 | Smoke-tested assessment-task-gen: generated Assessment_Task.xlsx + Rubric.pdf for 007_A, fixed Testmoz issues, packaged skill to repo |
| 2026-03-28 | Built assessment-task-gen skill (SKILL.md + 9 refs/exemplars), extended student-task-gen for P type, migrated A file refs to PDF |
| 2026-03-28 | Designed assessment-task-gen skill: spec + 13-task implementation plan, P lesson extension planned |
| 2026-03-28 | Created visual-aid-gen skill (design, spec, SKILL.md), generated first Visual_Aid.pdf for L001 |
| 2026-03-28 | Fixed L001 text errors, converted student files to PDF, updated format specs with teacher-approved spacing |
| 2026-03-27 | Created end-session skill, removed Obsidian refs, updated CLAUDE.md + hooks, reconciled all 46 lesson READMEs + 7 module READMEs |
| 2026-03-25 | Added lesson: format changes don't fix layout problems |
| 2026-03-23 | Theory packs 001-002 generated, skill overhauled, UTF-8 rule, spellcheck script |
| 2026-03-22 | I-lesson generation overhaul in lesson-plan-gen skill |
| 2026-03-22 | Bulk generation Safety 002-007 READMEs + Teacher Plans, curriculum reference created |
| 2026-03-22 | Plan format visual upgrade, retrieval phase renaming |
| 2026-03-22 | Lesson 001 README + Teacher_Plan generated, reference docs added |
