# IT Curriculum: Repo Status

Last updated: 2026-04-01

## Current State

- **Grades in repo:** Grade 9, Grade 10, Grade 11, Grade 12
- **Modules:** 39 total across all grades
- **Lesson folders:** 351 total
- **File completeness:** 0 content files exist. All Safety module content deleted for regeneration.
- **Lessons Baigta:** 0 | Failai sukurti: 0 | WIP: 0 | Sablonas: 351

## Active Gaps

- **01_Safety module:** All 7 lessons reset to Sablonas. Ready for regeneration with updated skills (DOCX format, patched references, lessons.md integration).
- **Module_Design.md:** Does not exist for 01_Safety. Required before content generation (2026-03-30 decision). Create before regenerating.
- **003_L missing visuals:** Phishing example and algorithm schema still needed (teacher-created). Tracked in lesson README.
- **All other modules (344 lessons):** Sablonas (README only). No content generation started.

## Structural Notes

- **Output format:** DOCX for all documents except Visual_Aid (PDF) and Assessment_Task (XLSX). Reversed the 2026-03-28 PDF decision.
- **lt-mistakes.yaml:** Moved from lt-qa/ to _references/. All 45 path references updated across skills.
- **Skills:** All 22 skill/reference files patched for DOCX format, _references/ path, lessons.md reading. Project-only (no global copies).
- **Deleted:** 26 stale content files (01_Safety), 17 banned scripts (_scripts/), 24 stale skill backups, seed-mistakes.yaml, package.json + node_modules, lt-qa/ folder.

## Changelog

| Date | Summary |
|------|---------|
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
| 2026-03-28 | Skills created: assessment-task-gen, practice-task-gen, answer-key-gen, visual-aid-gen. |
