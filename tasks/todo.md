# Session TODO

## Canva visual aid pipeline execution plan

- Establish the stable Codex -> Canva contract first:
  - lock the slide archetypes,
  - lock the CSV/schema fields,
  - lock the shared Canva placeholder names.
- Create the new skill skeleton and reference files for `canva-visual-pack-gen`.
- Write the schema spec and template contract into skill reference docs so the workflow is deterministic.
- Define the pilot batch for all Safety lessons that require Visual_Aid: `001_L` through `005_I`.
- After the spec is stable, implement the first version of the skill output package:
  - `canva_rows.csv`
  - `visual_spec.json`
  - `asset_prompts.md`
  - `export_checklist.md`
- Run the pilot on Safety lessons `001_L` through `005_I` and inspect where the template contract breaks or causes ugly layouts.
- Refine the schema/template rules before scaling to more L lessons.

## ~~First execution item - lock the Canva contract~~ DONE (2026-04-02)

- Finalize the 5 slide archetypes: `title`, `questions`, `process`, `comparison`, `scenario`.
- Finalize the row schema fields for `canva_rows.csv`.
- Finalize the exact shared placeholder names every Canva master template must use.
- Decide whether the pilot allows 5-7 slides per lesson or enforces a fixed 6-slide set.
- Produce the reference spec files that all later generation work will follow.

Completed by creating the new project skill scaffold at `.agents/skills/canva-visual-pack-gen/` plus the contract reference docs `contract.md`, `schema.md`, and `template-set.md`. The pilot is now locked to 5-7 slides per lesson, with 5 approved archetypes and one shared placeholder contract for all Canva templates.

## ~~First pilot output package for Safety 001-005~~ DONE (2026-04-02)

- Built a single module-level pilot pack at `Grade_9/Semester_1/01_Safety/Canva_Pilot_Pack_001_005/`.
- Generated `canva_rows.csv`, `visual_spec.json`, `asset_prompts.md`, and `export_checklist.md`.
- Covered all required Visual_Aid lessons in the module scope: `001_L` through `005_I`.
- Locked the first real slide mix counts:
  - `001`: 5 slides
  - `002`: 7 slides
  - `003`: 7 slides
  - `004`: 6 slides
  - `005`: 6 slides
- Verified that the CSV parses cleanly and that the JSON contract file loads without errors.

## Canva template blueprints for pilot pack

- Create 5 local template blueprint pages for the Canva pilot:
  - `VA-Title`
  - `VA-Questions`
  - `VA-Process`
  - `VA-Comparison`
  - `VA-Scenario`
- Store them next to the Safety pilot pack so the CSV/spec and template visuals live together.
- Make the blueprints explicit about placeholder mapping, not just visual style.
- Keep the first version simple and stable rather than polished to death.

## QA remediation plan for 01_Safety module

- Review `tasks/qa-report-01_Safety.md` and group findings by shared root cause rather than fixing duplicated symptoms separately.
- Work through one root-cause cluster at a time, starting with the highest-severity systemic issues.
- For each cluster:
  - identify the concrete broken artifacts,
  - perform root cause analysis,
  - propose a preventative measure,
  - explain why the measure should prevent recurrence,
  - wait for teacher confirmation before applying changes.
- After confirmation, implement both layers:
  - fix the affected lesson files,
  - patch the originating skill/rule/template so the issue does not resurface.
- Verify every regenerated or edited artifact renders correctly before marking the cluster done.
- Record any new durable correction rule in `tasks/lessons.md` if the fix reveals a reusable failure pattern not already covered.
- Continue cluster by cluster until every actionable item in `tasks/qa-report-01_Safety.md` is resolved or explicitly accepted as no-change.

## ~~Cluster 1 - Teacher_Plan language corruption (001, 002, 003, 004, 006)~~ DONE (2026-04-02)

Patched all five affected `Teacher_Plan.docx` files in place to preserve approved formatting while removing the corrupted Lithuanian forms identified in the QA cluster. Added a hard-gate post-generation check to `lesson-plan-gen`, expanded `_references/lt-mistakes.yaml` with the newly observed Teacher_Plan failure stems, and logged the durable prevention rule in `tasks/lessons.md`. Verified all five `.docx` files open successfully in Word after patching.

## ~~Cluster 2 - Theory_Pack scope, language, and source hygiene (001, 002, 003, 004)~~ DONE (2026-04-02)

Patched four `Theory_Pack.docx` files in place: fixed the Lithuanian spelling errors in lessons 001 and 004, removed the 002 phishing scope bleed by downgrading it to a one-sentence bridge, and made the 003 NKSC statistic traceable to a specific official publication while confirming the ENISA 2025 source is real. Also aligned `002/Teacher_Plan.docx` with the narrowed Theory_Pack scope, strengthened `.claude/skills/theory-pack-gen/SKILL.md` with a hard rule against front-running neighboring topics, exact-source traceability checks, and mechanical quote normalization, then logged the reusable rule in `tasks/lessons.md`.

## ~~Cluster 3 - Practice and assessment chain coherence (006, 007)~~ DONE (2026-04-02)

Aligned `006_P/Teacher_Plan.docx` with the existing praktikos uzduotis by replacing the detached scenario block with direct facilitation of the practice task and updating the diary summary to match. Removed answer-hint parentheses plus a couple of leftover text errors in `006_P/Practice_Task.docx`, fixed the `006_P/Answer_Key.docx` wording issue, and extended `007_A/Answer_Key.docx` with explicit coverage for every remaining Testmoz variant. Hardened `.claude/skills/answer-key-gen`, `.claude/skills/practice-task-gen`, and `.claude/skills/lesson-plan-gen` so the same mismatch cannot recur, logged the new durable variant-coverage rule in `tasks/lessons.md`, and verified the edited `.docx` artifacts reopen successfully in Word.

## ~~Cluster 4 - Student_Task header and hint leakage (002, 003)~~ DONE (2026-04-02)

Replaced the student-facing `L pamoka` type code in `002_L/Student_Task.docx` with a descriptive Lithuanian label and rewrote the `003_L/Student_Task.docx` hint so it points students to evidence instead of naming the correct threat category. Strengthened `.claude/skills/student-task-gen/SKILL.md` against both failure modes and logged the reusable rule in `tasks/lessons.md`. Verified both edited `.docx` files reopen successfully in Word.

## ~~Cluster 5 - Residual visual aid, rubric, and typo cleanup (001, 003, 004, 005, 006, 007)~~ DONE (2026-04-02)

Regenerated four `Visual_Aid.pdf` files so the remaining projection issues closed cleanly: 001 now uses the plural-compatible `patyre`, 003 carries the phishing signs plus `SUSTOTI -> PATIKRINTI -> PRANESTI`, 004 now supports the lecture block, and 005 includes the demonstration scenario plus password-safety coverage. Also patched the last residual `Theory_Pack.docx`/`Practice_Task.docx` text issues, rebuilt `007_A/Rubric.docx` so it no longer depends on fixed Testmoz question numbering, and updated `visual-aid-gen` plus `assessment-task-gen` with the new prevention rules. Marked the two remaining cross-lesson QA notes as accepted-as-is in `tasks/qa-report-01_Safety.md` because they are low-priority design choices, not defects.

## ~~Safety module final pass for rendering corruption and residual quality issues~~ DONE (2026-04-02)

- Audit every lesson artifact in `Grade_9/Semester_1/01_Safety`, with priority on `Visual_Aid.pdf`, for `?` replacement characters, broken diacritics, non-capital sentence starts, title-slide alignment drift, and any remaining rendering regressions.
- Build a file-by-file issue list first, separating output-only defects, artifacts that must be regenerated, and systemic generator/template defects.
- Dispatch any multi-step artifact repair to dedicated agents, one artifact pipeline per agent, while the orchestrator handles sequencing, review, and consistency checks.
- For each confirmed root cause, apply both layers:
  - fix the broken module artifacts,
  - patch the originating skill, template, or QA gate so the same corruption cannot recur.
- Log durable new rules in `tasks/lessons.md` and add recurring bad forms or scan patterns to `_references/lt-mistakes.yaml`.
- Verify every edited `.docx` opens correctly in Word, every regenerated `Visual_Aid.pdf` renders correctly page by page, and any touched `.xlsx` remains readable.
- Finish with a cross-document consistency pass for any lesson whose full file set becomes clean after remediation.

Completed a full final-pass audit across the Grade 9 Safety module and repaired the broken artifacts that still had real render or encoding defects. All five `Visual_Aid.pdf` files were regenerated and re-verified page by page, `007_A/Rubric.docx` was rebuilt cleanly, and a module-wide post-pass scan found no remaining `?` replacement corruption inside Lithuanian words in the lesson `docx` files or visual aid PDFs.

Root cause analysis pointed to three process gaps rather than one-off typos: visual-aid title slides were centered with approximate spacing instead of a deterministic layout container, PDF QA stopped too early at source text instead of checking the final rendered PDF, and rubric generation lacked a replacement-character hard gate plus a real open-check in Word. I logged those rules in `tasks/lessons.md` and hardened the relevant skill instructions so the same failure modes are now blocked earlier.
