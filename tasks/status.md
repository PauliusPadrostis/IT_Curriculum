# IT Curriculum: Repo Status

Last updated: 2026-03-30

## Current State

- **Grades in repo:** Grade 9, Grade 10, Grade 11, Grade 12
- **Modules:** 39 total across all grades
- **Lesson folders:** 351 total
- **Content files:** ~14 non-README files across 7 lessons (all in Grade 9 Semester 1 01_Safety)
- **Lessons with content:** Failai sukurti: 3 (001, 002, 003) | WIP: 4 (004-007) | Sablonas: 344

## Active Gaps

- **Lesson 001 (Ergonomics):** All 4 files present. Awaiting teacher review.
- **Lesson 002 (Privacy):** All 4 files present. Awaiting teacher review.
- **Lesson 003 (Online risks):** All 4 files present. Awaiting teacher review.
- **Lesson 004 (Environment):** Only Teacher_Plan.docx. Missing Theory_Pack, Student_Task, Visual_Aid. (Theory_Pack.docx was deleted in commit 857c2f0.)
- **Lesson 005 (Integration):** Only Teacher_Plan.docx. Missing Student_Task.
- **Lesson 006 (Practice):** Only Teacher_Plan.docx. Missing Practice_Task.pdf. (Was deleted in commit 857c2f0.)
- **Lesson 007 (Assessment):** Only Teacher_Plan.docx. Missing Assessment_Task.xlsx, Rubric.pdf, Answer_Key.docx. (All three deleted in commit 857c2f0.)
- **004/005 READMEs:** Reference .docx for student files, but convention is .pdf. Needs correction when generating those files.
- **All other modules (344 lessons):** Sablonas (README only).
- **TODO.md created at repo root:** Docx template library planned after format stabilization.

## Pending Work

- **Next content push:** Regenerate missing files for 004-007
- **Teacher review:** 001, 002, and 003 have all files but none reviewed (Patikrinta ❌)
- **All modules beyond 01_Safety:** 344 lessons with no content

## Changelog

| Date | Summary |
|------|---------|
| 2026-03-30 | Deleted scripts/ folder, removed build artifacts (package.json, generate_teacher_plans.js, docs/). Created TODO.md. Analyzed token-saving workflows. |
| 2026-03-29 | Generated all L003 materials. Fixed slide 5 overflow in visual-aid-gen. Updated SKILL.md + visual_aid_format.md. |
| 2026-03-29 | Generated all L002 materials. Rewrote lesson-plan-gen format spec. Regenerated Teacher_Plans for L001/L002. |
| 2026-03-29 | Generated all 001_L materials, fixed formatting issues, patched 5 skills |
| 2026-03-29 | Built module-qa skill, smoke-tested on 01_Safety, found 16 issues |
| 2026-03-29 | Designed module-qa skill: spec + 8-task plan, parallel subagent architecture |
| 2026-03-29 | Built practice-task-gen skill, patched answer-key-gen + student-task-gen, generated Practice_Task.pdf for 006_P |
| 2026-03-29 | Designed practice-task-gen skill: spec + 7-task plan |
| 2026-03-28 | Smoke-tested answer-key-gen on 007_A, generated Answer_Key.docx |
| 2026-03-28 | Built answer-key-gen skill (SKILL.md + 2 refs + 3 exemplars) |
| 2026-03-28 | Smoke-tested assessment-task-gen: generated Assessment_Task.xlsx + Rubric.pdf for 007_A |
| 2026-03-28 | Built assessment-task-gen skill (SKILL.md + 9 refs/exemplars) |
| 2026-03-28 | Designed assessment-task-gen skill: spec + 13-task plan |
| 2026-03-28 | Created visual-aid-gen skill, generated first Visual_Aid.pdf for L001 |
| 2026-03-28 | Fixed L001 text errors, converted student files to PDF, updated format specs |
| 2026-03-27 | Created end-session skill, removed Obsidian refs, reconciled all READMEs |
| 2026-03-25 | Added lesson: format changes don't fix layout problems |
| 2026-03-23 | Theory packs 001-002 generated, skill overhauled, UTF-8 rule |
| 2026-03-22 | I-lesson generation overhaul in lesson-plan-gen skill |
| 2026-03-22 | Bulk generation Safety 002-007 READMEs + Teacher Plans, curriculum reference created |
