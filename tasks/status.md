# IT Curriculum: Repo Status

Last updated: 2026-03-30

## Current State

- **Grades in repo:** Grade 9, Grade 10, Grade 11, Grade 12
- **Modules:** 39 total across all grades
- **Lesson folders:** 351 total
- **File completeness:** 23/26 required files exist (88%) — based on `file_requirements.md`, not README tables
- **Lessons Baigta:** 0 | Failai sukurti: 4 (001-004) | WIP: 3 (005, 006, 007) | Sablonas: 344

## Active Gaps

- **Lesson 005_I:** Missing Visual_Aid.pdf (required for I-type lessons).
- **Lesson 006_P:** Missing Answer_Key.pdf (required for P-type lessons).
- **Lesson 007_A:** Missing Answer_Key.docx. Rubric.docx intermediate file on disk.
- **Lessons 001-004:** All present files awaiting teacher review (Patikrinta ❌).
- **QA report:** 24 issues found (1 Critical, 7 Major, 16 Minor). See tasks/qa-report-01_Safety.md.
- **TODO.md:** P1-P4 done. 2 remaining QA root-cause fixes (P5-P6) + 1 deferred docx template library.
- **001/002 lock files:** ~$acher_Plan.docx temp files in lesson folders.
- **All other modules (344 lessons):** Sablonas (README only).

## Changelog

| Date | Summary |
|------|---------|
| 2026-03-30 | P4 done: end-session skill now cross-checks files against file_requirements.md |
| 2026-03-30 | P3 done: module design document template + gate in lesson-plan-gen, lesson-readme-gen |
| 2026-03-30 | P2 done: plain-text sidecar mechanism added to lt-qa and 6 generation skills |
| 2026-03-30 | P1 done: added cross-file coherence check to 5 generation skills (TODO.md) |
| 2026-03-30 | Analyzed QA report root causes, added 6 fix items to TODO.md. Fixed status for 005/006. |
| 2026-03-30 | Ran module-qa on 01_Safety: 24 issues (1C/7M/16m). Report at tasks/qa-report-01_Safety.md. |
| 2026-03-30 | Generated Practice_Task.pdf for 006_P. Module now 6/7 complete. |
| 2026-03-30 | Generated Assessment_Task.xlsx + Rubric.pdf for 007_A (Testmoz, 14 pools, 20 pts). |
| 2026-03-30 | Generated Student_Task.pdf for 005_I (scenario rotation). Module now 5/7 complete. |
| 2026-03-30 | Generated Theory_Pack, Student_Task, Visual_Aid for lesson 004 (environmental impact). |
| 2026-03-30 | Deleted scripts/ folder, removed build artifacts. Created TODO.md. Analyzed token-saving workflows. |
| 2026-03-29 | Generated all L003 materials. Fixed slide 5 overflow in visual-aid-gen. |
| 2026-03-29 | Generated all L002 materials. Rewrote lesson-plan-gen format spec. Regenerated Teacher_Plans for L001/L002. |
| 2026-03-29 | Generated all 001_L materials, fixed formatting issues, patched 5 skills |
| 2026-03-29 | Built module-qa skill, smoke-tested on 01_Safety, found 16 issues |
| 2026-03-29 | Designed module-qa skill: spec + 8-task plan, parallel subagent architecture |
| 2026-03-29 | Built practice-task-gen skill, patched answer-key-gen + student-task-gen, generated Practice_Task.pdf for 006_P |
| 2026-03-29 | Designed practice-task-gen skill: spec + 7-task plan |
| 2026-03-28 | Smoke-tested answer-key-gen on 007_A, generated Answer_Key.docx |
| 2026-03-28 | Built answer-key-gen skill (SKILL.md + 2 refs + 3 exemplars) |
