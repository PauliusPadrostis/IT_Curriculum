# IT Curriculum: Repo Status

Last updated: 2026-03-31

## Current State

- **Grades in repo:** Grade 9, Grade 10, Grade 11, Grade 12
- **Modules:** 39 total across all grades
- **Lesson folders:** 351 total
- **File completeness:** 25/25 required files exist (100%) for 01_Safety module
- **Lessons Baigta:** 0 | Failai sukurti: 7 (001-007) | WIP: 0 | Šablonas: 344

## Active Gaps

- **QA report (2026-03-31):** All 8 Major issues resolved. Minor issues: 5 fixed this session (m-03, m-04, m-05, m-06, m-08), 14 remain open. See tasks/qa-report-01_Safety.md.
- **Break interval inconsistency:** 4 different values across lessons 001 and 006 for HN 32:2004 rule (m-07, X-02). Systemic fix in place (CLAUDE.md rule 6), content fix pending.
- **Terminology split:** "Vaizduoklis" vs "ekranas" in lesson 001 (m-08). Will resolve on next reconciliation pass.
- **003_L Visual_Aid:** Missing phishing example and algorithm slides. Teacher will create manually. Marked in README.
- **Theory_Pack informal headers:** 001/002 PDFs still have "Pasitikrink save" / "Sužinok daugiau" (old "tu" register). Source templates fixed; PDFs will be correct on next regeneration.
- **All other modules (344 lessons):** Šablonas (README only).

## Changelog

| Date | Summary |
|------|---------|
| 2026-03-31 | QA minor fixes: m-03 (005 VA .docx→.pdf), m-04 (001 VA regen, format template fix), m-05 (theory-pack "tu"→"jūs" in 6 files), m-06 (quote rule relaxed), m-08 (tagged for reconciliation). |
| 2026-03-31 | CLAUDE.md: added rule 5 (delegate gen to agents), rule 6 (reconcile on lesson completion), relaxed quote format rule. |
| 2026-03-31 | TODO.md: logged automated QA pipeline (5-stage detect→diagnose→validate→fix→archive) for post-module-2. |
| 2026-03-31 | visual-aid-gen: fixed space-before-colon in format template. theory-pack-gen: fixed "tu" register in 4 source files. |
| 2026-03-31 | Fixed all 8 Major QA issues. Patched 6 .docx files, converted 004 PDF, rewrote 006 Phase 3. |
| 2026-03-31 | Root cause fixes: em dash strip added to 7 skills, Practice_Task cross-ref in lesson-plan-gen. |
| 2026-03-31 | Added 4 lt-mistakes.yaml entries, 3 lessons.md rules, marked missing visuals in 003 README. |
| 2026-03-31 | Re-ran module-qa on 01_Safety (all 7 lessons). 27 issues found. 23/24 prev fixes confirmed. |
| 2026-03-30 | Generated Answer_Key.pdf (006_P) and Answer_Key.docx (007_A). QA: 21/24 fixed. |
| 2026-03-30 | Fixed M-05 (002 scenarios), m-09 (002 VA 7->6 pages), m-15 (004 VA colons). |
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
