# IT Curriculum: Repo Status

Last updated: 2026-03-29

## Current State

- **Grades in repo:** Grade 9, Grade 10, Grade 11, Grade 12
- **Modules:** 7 total (Grade 9 Semester 1)
  - 01_Safety (7 lessons)
  - 02_Technological_Foundations (9 lessons)
  - 03_Computer_Graphics_Intro (2 lessons)
  - 04_Computer_Graphics_Practical (2 lessons)
  - 05_Specialisation_Digital_Printing (10 lessons)
  - 06_Specialisation_Website_Design (10 lessons)
  - 07_Project (6 lessons)
- **Lesson folders:** 46 total
- **File completeness:** 13/46 lessons have at least one content file beyond README
- **Lessons Baigta:** 0 | Failai sukurti: 3 | WIP: 4 | Šablonas: 39

## Active Gaps

- **Lesson 001 (Ergonomics):** All 4 files present. Awaiting teacher review to mark Baigta.
- **Lesson 006 (P type):** All 2 files present (Teacher_Plan.docx, Practice_Task.pdf). Awaiting teacher review to mark Baigta.
- **Lesson 007 (Assessment):** All 4 files present (Teacher_Plan, Assessment_Task.xlsx, Rubric.pdf, Answer_Key.docx). Awaiting teacher review to mark Baigta.
- **Lessons 002-004 (L type):** Have Teacher_Plan.docx + Theory_Pack.docx but missing Student_Task and Visual_Aid.
- **Lesson 005 (I type):** Only Teacher_Plan.docx. Missing Student_Task.
- **Modules 02-07:** All 39 lessons are Šablonas (README only).
- **Format transition:** Lesson 001 student files are PDF. Lessons 002-004 Theory_Pack still .docx.

## Skills Status

- **module-qa:** Design spec + 8-task implementation plan committed. Not yet built. Coordinator + parallel subagent architecture. Audits completed modules across 3 dimensions (structure, content/pedagogy, Lithuanian language). Output: `tasks/qa-report-{module}.md`.
- **practice-task-gen:** Built and smoke-tested. SKILL.md + 3 references. Generated first Practice_Task.pdf for 006_P.
- **answer-key-gen:** Built and smoke-tested on 007_A. P mode patched to expect Practice_Task.pdf. Study Key mode ready for 006_P.
- **assessment-task-gen:** Smoke-tested on 007_A. All Testmoz import issues fixed.
- **student-task-gen:** L and I only. P lessons formally routed to practice-task-gen. Type gate updated.
- **lt-qa:** Step 7 (MCQ-Specific Checks) added. 4 new entries in lt-mistakes.yaml.
- **lesson-readme-gen:** A lesson file requirements migrated from .docx to .pdf/.xlsx.

## Pending Work

- **module-qa implementation:** 8 tasks in plan (5 reference files + SKILL.md + smoke test + iteration). Ready to build.
- **answer-key-gen P mode:** Can now generate Study Key for 006_P (Practice_Task.pdf exists).
- **Next content push:** Generate missing Student_Task + Visual_Aid for lessons 002-004, Student_Task for 005.
- **Module 02+:** No content generated yet. All 39 lessons are Šablonas.
- **Repo health skill:** Brainstormed concept (satellite view across whole repo). Design not started.

## Changelog

| Date | Summary |
|------|---------|
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
