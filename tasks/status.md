# IT Curriculum: Repo Status

Last updated: 2026-03-29

## Current State

- **Grades in repo:** Grade 9, Grade 10, Grade 11, Grade 12
- **Modules:** 39 total across all grades
- **Lesson folders:** 351 total
- **Content files:** ~17 non-README files across 7 lessons (all in Grade 9 Semester 1 01_Safety)
- **Lessons with content:** Failai sukurti: 3 (001, 002, 003) | WIP: 4 (004-007) | Sablonas: 344

## Active Gaps

- **Lesson 001 (Ergonomics):** All 4 files present (Teacher_Plan, Theory_Pack, Student_Task, Visual_Aid). Awaiting teacher review.
- **Lesson 002 (Privacy):** All 4 files present (Teacher_Plan, Theory_Pack, Student_Task, Visual_Aid). Awaiting teacher review.
- **Lesson 003 (Online risks):** All 4 files present (Teacher_Plan, Theory_Pack, Student_Task, Visual_Aid). Awaiting teacher review.
- **Lesson 004 (Environment):** Only Teacher_Plan.docx. Missing Theory_Pack.pdf, Student_Task.pdf, Visual_Aid.pdf.
- **Lesson 005 (Integration):** Only Teacher_Plan.docx. Missing Student_Task.pdf.
- **Lesson 006 (Practice):** Teacher_Plan.docx + Practice_Task.pdf. Missing Answer_Key.
- **Lesson 007 (Assessment):** Teacher_Plan.docx + Assessment_Task.xlsx + Rubric.pdf + Answer_Key.docx. All files present.
- **All other modules (344 lessons):** Sablonas (README only).

## Skills Status

- All generation skills operational: lesson-plan-gen, theory-pack-gen, student-task-gen, visual-aid-gen, assessment-task-gen, practice-task-gen, answer-key-gen
- **lesson-plan-gen:** Format spec rewritten from scratch (typography-first, 5 colors, no decorative tables). Extra-materials flagging added.
- **lt-qa:** Updated with entries for pertraukeje, sugniazti, condition-last calque pattern, jei clause ordering
- **student-task-gen:** Format spec updated (hint/check colors, step spacing, checklist keepNext, no running header)
- **visual-aid-gen:** Landscape dimension fix + slide 5 hard cap 4 terms + 160 twip spacing + one-page-per-slide budget math added to SKILL.md and visual_aid_format.md

## Pending Work

- **Next content push:** Generate missing files for 004-006 (Theory_Pack, Student_Task, Visual_Aid for L/I)
- **Teacher review:** 001, 002, and 003 have all files but none reviewed (Patikrinta ❌)
- **All modules beyond 01_Safety:** 344 lessons with no content

## Changelog

| Date | Summary |
|------|---------|
| 2026-03-29 | Generated all L003 materials (Teacher_Plan, Theory_Pack, Student_Task, Visual_Aid). Fixed slide 5 overflow in visual-aid-gen. Updated SKILL.md + visual_aid_format.md with 4-term hard cap and one-page budget rule. |
| 2026-03-29 | Generated all L002 materials (Theory_Pack, Student_Task, Visual_Aid). Rewrote lesson-plan-gen format spec from scratch (typography-first, 5 colors, no decorative tables). Regenerated Teacher_Plan.docx for L001 and L002. Fixed spelling errors (pertraukeje, sugniazti). Added extra-materials flagging to lesson-plan-gen skill. Updated lt-mistakes.yaml with 3 new entries. |
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
