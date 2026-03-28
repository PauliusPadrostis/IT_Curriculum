# IT Curriculum: Repo Status

Last updated: 2026-03-28

## Current State

- **Grades in repo:** Grade 9
- **Modules:** 7 total
  - 01_Safety (7 lessons)
  - 02_Technological_Foundations (9 lessons)
  - 03_Computer_Graphics_Intro (2 lessons)
  - 04_Computer_Graphics_Practical (2 lessons)
  - 05_Specialisation_Digital_Printing (10 lessons)
  - 06_Specialisation_Website_Design (10 lessons)
  - 07_Project (6 lessons)
- **Lesson folders:** 46 total
- **File completeness:** 11/46 lessons have at least one content file beyond README
- **Lessons Baigta:** 0 | Failai sukurti: 1 | WIP: 6 | Šablonas: 39

## Active Gaps

- **Lesson 001 (Ergonomics):** All 4 files present. Awaiting teacher review to mark Baigta.
- **Lessons 002-004 (L type):** Have Teacher_Plan.docx + Theory_Pack.docx but missing Student_Task and Visual_Aid.
- **Lesson 005 (I type):** Only Teacher_Plan.docx. Missing Student_Task.
- **Lesson 006 (P type):** Only Teacher_Plan.docx. Missing Practice_Task_Set.
- **Lesson 007 (A type):** Teacher_Plan.docx + Assessment_Task.xlsx + Rubric.pdf present. Missing Answer_Key.pdf.
- **Modules 02-07:** All 39 lessons are Šablonas (README only).
- **Format transition:** Lesson 001 student files are PDF. Lessons 002-004 Theory_Pack still .docx.

## Skills Status

- **assessment-task-gen:** Smoke-tested on 007_A. All Testmoz import issues fixed. Skill packaged in both global (~/.claude/skills/) and repo (.claude/skills/) with all 11 files. lt-qa MCQ checks (Step 7) added. question_design.md updated with answer hinting, length bias, stem naturalness rules.
- **lt-qa:** Step 7 (MCQ-Specific Checks) added. 4 new entries in lt-mistakes.yaml.
- **student-task-gen:** Extended to support P lesson type.
- **lesson-readme-gen:** A lesson file requirements migrated from .docx to .pdf/.xlsx.

## Changelog

| Date | Summary |
|------|---------|
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
