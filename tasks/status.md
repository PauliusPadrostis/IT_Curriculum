# IT Curriculum: Repo Status

Last updated: 2026-04-01

## Current State

- **Grades in repo:** Grade 9, Grade 10, Grade 11, Grade 12
- **Modules:** 26 total (Grade 9: 7, Grade 10: 3, Grade 11: 10, Grade 12: 6)
- **Lesson folders:** 351 total
- **File completeness:** 0/351 required content files exist (0%) — all folders contain README.md only
- **Lessons Baigta:** 0 | Failai sukurti: 0 | WIP: 0 | Sablonas: 351

## Active Gaps

- **All 351 lessons:** Sablonas (README only). No content generation started for any module.
- **01_Safety (Grade 9):** 7 lessons ready for regeneration. Skills patched and canonical format locked (DOCX). Must create Module_Design.md before generating (2026-03-30 decision).
- **003_L missing visuals:** Phishing example and algorithm schema still needed (teacher-created). Tracked in lesson README.
- **All other modules (344 lessons):** No content generation started.

## Structural Notes

- **Output format:** DOCX for all documents except Visual_Aid (PDF) and Assessment_Task (XLSX).
- **lt-mistakes.yaml:** Lives in _references/. All skill path references updated.
- **Module READMEs:** All module-level READMEs now have Busena column and summary line (updated this session for Grade 10, 11, 12).
- **_Theory_Load folders:** Grade 11 (6 packs) and Grade 12 (7 packs). Non-standard folder naming (TL01_ prefix); no lesson README scan applies.

## Changelog

| Date | Summary |
|------|---------|
| 2026-04-01 | end-session skill: Phase 1/2 split implemented; 22 sim tests; 13 patches |
| 2026-04-01 | Prep session for Safety module regeneration. DOCX canonical format decision. Patched 22 skill/reference files. Deleted 26 stale content files, 17 banned scripts, 24 stale backups, seed-mistakes.yaml, package.json + node_modules. Moved lt-mistakes.yaml to _references/. Updated 45 path refs. Added 2 lessons learned. All 7 Safety lessons reset to Sablonas. |
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
| 2026-03-31 | Fixed all 8 Major QA issues. Patched 6 .docx, converted 004 PDF, rewrote 006 Phase 3. |
| 2026-03-31 | Root cause fixes: em dash strip in 7 skills, Practice_Task cross-ref in lesson-plan-gen. |
| 2026-03-31 | Re-ran module-qa on 01_Safety. 27 issues found. 23/24 prev fixes confirmed. |
| 2026-03-30 | Generated Answer_Key.pdf (006_P) and Answer_Key.docx (007_A). |
| 2026-03-30 | Analyzed QA root causes, added 6 TODO items. Multiple fix passes. |
| 2026-03-30 | Ran module-qa on 01_Safety: 24 issues (1C/7M/16m). |
| 2026-03-29 | First generation pass: all 7 Safety lesson content files. |
