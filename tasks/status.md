# IT Curriculum: Repo Status

Last updated: 2026-03-29

## Current State

- **Grades in repo:** Grade 9, Grade 10, Grade 11, Grade 12
- **Modules:** 26 total across all grades
  - Grade 9 Semester 1: 01_Safety (7), 02_Technological_Foundations (9), 03_Computer_Graphics_Intro (2)
  - Grade 9 Semester 2: 04_Computer_Graphics_Practical (2), 05_Specialisation_Digital_Printing (10), 06_Specialisation_Website_Design (10), 07_Project (6)
  - Grade 10 Semester 1: 01_Data (10), 02_Programming (8)
  - Grade 10 Semester 2: 03_Programming_Loops_Functions (18)
  - Grade 11 Semester 1: 01_Data (27), 02_Digital_Content (17)
  - Grade 11 Semester 2: 03_Programming_Strings_Arrays (32), 04_Programming_Insert_Delete (20), 05_Data_Presentation_AI_Ethics (11), 06_Safety (8), 07_Virtual_Communications (6), 08_Networks (6), 09_VBE_Diagnostic (10), 10_Theory_Assessment (2)
  - Grade 12 Semester 1: 01_Data_Reporting (28), 02_AI_Practical (4), 03_E_Publishing_Refresher (3), 04_Programming (30)
  - Grade 12 Semester 2: 05_Programming_Advanced (33), 06_Exam_Prep (32)
- **Lesson folders:** 351 total
- **Content files:** 17 non-README files across 7 lessons (all in Grade 9 Semester 1 01_Safety)
- **Lessons with content:** Failai sukurti: 3 (001, 006, 007) | WIP: 4 (002, 003, 004, 005) | Sablonas: 344

## Active Gaps

- **Lesson 001 (Ergonomics):** All 4 files present (non-canonical Theory_Pack name). Awaiting teacher review.
- **Lesson 006 (P type):** Has 2/3 required files (Teacher_Plan, Practice_Task). Missing Answer_Key.pdf. README incorrectly claims Failai sukurti.
- **Lesson 007 (Assessment):** All 4 files present. Awaiting teacher review.
- **Lessons 002-004 (L type):** Have Teacher_Plan.docx + Theory_Pack.docx (wrong format, should be .pdf). Missing Student_Task.pdf, Visual_Aid.pdf.
- **Lesson 005 (I type):** Only Teacher_Plan.docx. Missing Student_Task.pdf, Visual_Aid.pdf.
- **All other modules (344 lessons):** Sablonas (README only).
- **Format inconsistency:** 001 Theory_Pack is .pdf. 002-004 Theory_Packs are .docx.
- **QA report:** `tasks/qa-report-01_Safety.md` has 16 issues (1 Critical, 5 Major, 9 Minor, 1 Cross-lesson).

## Skills Status

- **module-qa:** Built and smoke-tested. SKILL.md + 5 references. Ran first audit on 01_Safety, produced qa-report. Found 16 issues including factually incorrect WEEE answer, missing Answer_Key.pdf, em dash violations, practice easier than assessment.
- **practice-task-gen:** Built and smoke-tested. SKILL.md + 3 references. Generated first Practice_Task.pdf for 006_P.
- **answer-key-gen:** Built and smoke-tested on 007_A. P mode patched to expect Practice_Task.pdf. Study Key mode ready for 006_P.
- **assessment-task-gen:** Smoke-tested on 007_A. All Testmoz import issues fixed.
- **student-task-gen:** L and I only. P lessons formally routed to practice-task-gen.
- **lt-qa:** Step 7 (MCQ-Specific Checks) added. 4 new entries in lt-mistakes.yaml.
- **lesson-readme-gen:** A lesson file requirements migrated from .docx to .pdf/.xlsx.
- **visual-aid-gen:** Built. Generated Visual_Aid.pdf for 001_L.

## Pending Work

- **Fix QA report issues:** 16 issues in tasks/qa-report-01_Safety.md need attention (Critical: WEEE answer, Major: 006_P missing file, em dashes, timing).
- **answer-key-gen P mode:** Generate Study Key (Answer_Key.pdf) for 006_P.
- **Next content push:** Generate missing Student_Task.pdf + Visual_Aid.pdf for 002-004, Student_Task.pdf + Visual_Aid.pdf for 005.
- **Theory Pack format migration:** Convert 002-004 Theory_Packs from .docx to .pdf.
- **All modules beyond 01_Safety:** 344 lessons with no content.

## Changelog

| Date | Summary |
|------|---------|
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
