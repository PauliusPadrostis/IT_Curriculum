# IT Curriculum: Repo Status

Last updated: 2026-04-02

## Current State

- **Grades in repo:** Grade 9, Grade 10, Grade 11, Grade 12
- **Modules:** 26 total (Grade 9: 7, Grade 10: 3, Grade 11: 10, Grade 12: 6)
- **Lesson folders:** 341 total (L: 137, I: 96, P: 30, A: 40, D: 8, T: 12, M: 9, G: 9)
- **File completeness:** 26/1086 required content files exist (2%) -- based on file_requirements.md (L: 4 files, I: 3 files, P: 3 files, A: 4 files; D/T/M/G: no canonical list)
- **Lessons Baigta:** 0 | Failai sukurti: 7 | WIP: 0 | Sablonas: 334

## Active Gaps

- **001_L-007_A (Safety module):** All 7 lessons have all required files generated. None teacher-verified yet (Patikrinta = X). Module content complete, pending teacher review.
- **All other modules (334 lessons):** No content generation started. All Sablonas.
- **D, T, M, G lesson types (38 lessons):** No canonical file requirements defined. File checks skipped for these types.

## Structural Notes

- **Output format:** DOCX for all documents except Visual_Aid (PDF) and Assessment_Task (XLSX).
- **lt-mistakes.yaml:** Lives in _references/. All skill path references updated.
- **Module READMEs:** All 26 module-level READMEs have Busena column and summary line.
- **_Theory_Load folders:** Grade 11 (6 packs) and Grade 12 (7 packs). Non-standard folder naming (TL01_ prefix); no lesson README scan applies.
- **Module_Design.md:** Created in Grade_9/Semester_1/01_Safety/. Not a lesson folder; not subject to lesson file checks.

## Changelog

| Date | Summary |
|------|---------|
| 2026-04-02 | Ran module-qa on 01_Safety: 34 issues found, wrote qa-report-01_Safety.md. |
| 2026-04-02 | Cross-document consistency check for 01_Safety. Fixed jaur-->jautr, algorithm arrow format. |
| 2026-04-01 | Phase 5-6: Generated 7 files for 006_P (3) and 007_A (4). Safety module content complete. |
| 2026-04-01 | Phase 4: Teacher_Plan + Student_Task + Visual_Aid generated for Safety 005_I. |
| 2026-04-01 | Phase 3: Student_Task.docx x4 + Visual_Aid.pdf x4 generated for Safety 001-004_L. |
| 2026-04-01 | Safety module: Teacher_Plans x4 generated (001-004_L). Theory_Packs x4 already existed. |
| 2026-04-01 | Safety module: Module_Design.md created, 3 design decisions resolved, 003_L README updated |
| 2026-04-01 | end-session skill: Phase 1/2 split implemented; 22 sim tests; 13 patches |
| 2026-04-01 | Prep session for Safety module regeneration. DOCX canonical format decision. |
| 2026-04-01 | Systemic: deleted 9 stale global skills, fixed skill resolution (personal>project). |
| 2026-04-01 | Systemic: all 8 gen skills now read tasks/lessons.md. 5 were missing it. |
| 2026-04-01 | Systemic: stale Lithuanian quote rule removed from 7 skills + 3 reference files. |
| 2026-04-01 | Systemic: lt-qa demoted to standalone tool. Gen skills read lt-mistakes.yaml directly. |
| 2026-04-01 | Systemic: end-session gains Step 4d (yaml check) + Step 4e (updater-verifier agents). |
| 2026-04-01 | Systemic: coherence checks added to practice-task-gen, assessment-task-gen, answer-key-gen. |
| 2026-04-01 | Systemic: lesson-readme-gen gains "Trukstamos vaizdinės medžiagos" section. |
| 2026-04-01 | QA fixes: m-08 closed (ekranas decision), m-09 fixed (002 Q3 patch), m-10 fixed (README). |
| 2026-04-01 | Decisions: ekranas default, skills in repo only, lt-qa standalone, end-session propagation. |
| 2026-03-31 | QA minor fixes: m-03, m-04, m-05, m-06, m-08 tagged. |
| 2026-03-31 | CLAUDE.md: rule 5 (delegate to agents), rule 6 (reconcile on completion). |
