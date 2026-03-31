# IT Curriculum: Repo Status

Last updated: 2026-03-31

## Current State

- **Grades in repo:** Grade 9, Grade 10, Grade 11, Grade 12
- **Modules:** 39 total across all grades
- **Lesson folders:** 351 total
- **File completeness:** 25/25 required files exist (100%) for 01_Safety module
- **Lessons Baigta:** 0 | Failai sukurti: 7 (001-007) | WIP: 0 | Šablonas: 344

## Active Gaps

- **QA report (2026-03-31):** 27 issues total (0 Critical, 8 Major, 19 Minor). Priority fixes: 005_I Teacher_Plan typo + text corruption (M-04, M-05), 007_A Answer_Key grammar (M-07), 003_L Visual_Aid missing slides (M-02), 006_P Teacher_Plan/Practice_Task disconnect (M-06).
- **004_L Theory_Pack:** .docx has m-16 fix but PDF is stale. Needs conversion.
- **005_I Visual_Aid:** Only .docx exists (no LibreOffice for PDF conversion).
- **Em dash regressions:** READMEs for 002, 003, 004 and Teacher_Plan for 007 have em dashes again.
- **Break interval inconsistency:** 4 different values across lessons 001 and 006 for the same HN 32:2004 rule.
- **All other modules (344 lessons):** Šablonas (README only).

## Changelog

| Date | Summary |
|------|---------|
| 2026-03-31 | Re-ran module-qa on 01_Safety (all 7 lessons). 27 issues found. 23/24 prev fixes confirmed. |
| 2026-03-31 | Fixed M-01 (005_I Visual_Aid), m-16 (004_L Theory_Pack phrasing). Audited X-03. Module 7/7. |
| 2026-03-30 | Generated Answer_Key.pdf (006_P) and Answer_Key.docx (007_A). QA: 21/24 fixed. |
| 2026-03-30 | Fixed M-05 (002 scenarios), m-09 (002 VA 7→6 pages), m-15 (004 VA colons). |
| 2026-03-30 | Fixed m-07/08/12/13/14 in 001+004 Teacher_Plans. Em dashes cleared in 001/002/004. |
| 2026-03-30 | Regenerated 003_L Theory_Pack, Teacher_Plan, Visual_Aid (fixes C-01, m-01/02/10/11, X-02). |
| 2026-03-30 | P6 done. Quick fixes (m-03/m-05/m-06/M-07). Regenerated 003_L Student_Task.pdf (C-01, M-06). |
| 2026-03-30 | P5 done: em dash post-processing helper added to all 7 generation skills |
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
| 2026-03-30 | Deleted scripts/ folder, removed build artifacts. Created TODO.md. |
| 2026-03-29 | Generated all L003 materials. Fixed slide 5 overflow in visual-aid-gen. |
