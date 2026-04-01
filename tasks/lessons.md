# Lessons Learned

Accumulated corrections and rules. NEVER delete entries. Read at session start. Follow every rule.

## 2026-03-25 — Format changes don't fix layout problems

- Problem: Teacher_Plan.docx had messy formatting — half-filled pages, orphaned headers, unclean page breaks. Switched Student_Task and Theory_Pack to PDF output, but the underlying layout issues (content flow, spacing, page break logic) persisted in the new format. The format change cost rework across multiple skills and reference files without solving the root cause.
- Rule: When output looks wrong, diagnose whether the problem is the format or the content/layout logic. Fix layout logic first (keepNext, spacing, section lengths). Only change output format if the format itself is the limitation. Before committing to a format change, generate one test file in the new format and confirm it actually fixes the issue.
- Applies to: theory-pack-gen, student-task-gen, any skill that renders documents

## 2026-03-23 — Always include source material in handoffs

- Problem: Teacher referenced a task designed by another AI but didn't paste the actual output. Claude had to reconstruct the task from scratch, losing whatever specific design the other AI produced. The result worked, but the handoff was wasted effort.
- Rule: When the teacher says "take what X designed" or "use this from a prior session," ask for the actual file or paste before proceeding. Don't guess or reconstruct. Say: "Galiu sukurti nuo nulio, bet jei nori panaudoti tą rezultatą, įkelk failą arba tekstą."
- Applies to: all content generation, especially ad-hoc tasks outside the skill system

## 2026-03-27 — Never use \u unicode escapes for Lithuanian text in generation scripts

- Problem: Teacher_Plan and Student_Task generation scripts used JS `\u` escapes for all Lithuanian characters (ą, č, ę, ė, į, š, ų, ū, ž). This made diacritical errors invisible during code review (e.g., "pasiubuoti" instead of "pasiūbuoti" — the missing ū macron was hidden inside `\u` sequences). Four spelling errors shipped in one session.
- Rule: Write all Lithuanian text as plain UTF-8 strings in generation scripts. Never use `\u` escapes for Lithuanian letters. The only exception is Lithuanian typographic quotes (`\u201E` and `\u201C`) because the closing quote conflicts with JS string delimiters. This rule already existed in theory-pack-gen but was not followed in lesson-plan-gen and student-task-gen.
- Applies to: lesson-plan-gen, student-task-gen, any JS script that generates Lithuanian .docx content

## 2026-03-27 — Do not translate pedagogical jargon literally from English

- Problem: Used "šaltojo kvietimo principu" (literal translation of "cold call") in Teacher_Plan retrieval format labels. This phrase is not used in Lithuanian pedagogy and sounds unnatural.
- Rule: Do not calque English pedagogical terms. Use descriptive Lithuanian instead. "Cold call" → just describe what happens: "klausimai mokiniams pasirinktinai" or simply "žodinis formatas". Check lt-mistakes.yaml before using any pedagogical term that might be a calque.
- Applies to: lesson-plan-gen, any teacher-facing document

## 2026-03-27 — POST-GEN Lithuanian QA must actually run, not just be claimed

- Problem: The lt-qa Phase 2 (POST-GEN) checklist was supposed to catch spelling errors, but 4 errors shipped anyway. The generation scripts built docx content inline as unicode escape sequences, making it impossible to do a meaningful text review. The POST-GEN pass was effectively skipped.
- Rule: After generating a .docx, extract the Lithuanian text (read it back or maintain a parallel plain-text version) and explicitly run through every POST-GEN step. If the text is embedded in `\u` escapes inside JS, the QA pass cannot work. Generate in plain UTF-8, QA the plain text, then render.
- Applies to: all Lithuanian content generation skills

## 2026-03-23 — Keep rubric separate from student-facing document

- Problem: Grading rubric was placed inside the same .docx as the student task description (after a page break). If the teacher prints or distributes the file, students see the rubric and scoring criteria.
- Rule: Rubric and student task are always separate files. Never combine teacher-facing scoring materials with student-facing instructions in one document, even with a page break separator.
- Applies to: cpp-grader, any assessment or savarankiškas darbas generation

## 2026-03-28 — Testmoz essay variants in pools need blank rows between them

- Problem: Essay variants within a POOL were on consecutive rows without blank rows. Testmoz treated variants 2-5 as "answer options" for variant 1 instead of separate pool questions. The testmoz_format.md reference doc had the same error in its example.
- Rule: Every variant within a POOL must be followed by a blank row, regardless of question type (MCQ or essay). The `essay()` helper must append a blank row after itself, just like `mcq()` does. The reference doc example must show blank rows between essay variants.
- Applies to: assessment-task-gen, any Testmoz xlsx generation

## 2026-03-28 — MCQ questions and options must never hint at the answer

- Problem: Multiple MCQ answer-hinting patterns found: (1) Stem defined the concept being tested ("phishing (sukčiavimas internete)"), making the answer obvious. (2) Parenthetical explanations on password options ("(raidės, skaičiai, simbolis)") spelled out the selection criteria. (3) Stem and correct answer shared distinctive words ("patikimą" in stem, "patikimuose" in answer). (4) Some distractors were absurdly wrong (e.g., "internet slows down from long use"), narrowing by elimination.
- Rule: (1) Stems must not define or explain the concept being tested. (2) Do not add parenthetical explanations that reveal why an option is correct. (3) No shared distinctive words between stem and correct answer that are absent from distractors. (4) Every distractor must be plausible to an unprepared student. After writing MCQs, review each question: "Could a student who hasn't studied pick the correct answer just from how the question is written?" If yes, rewrite.
- Applies to: assessment-task-gen, student-task-gen, practice-task-gen, theory-pack-gen, any student-facing material with questions or self-check items

## 2026-03-28 — MCQ answer length bias and unnatural Lithuanian question stems

- Problem: Nearly every MCQ had the correct answer as the longest option (easy to spot without knowing content). Question stems were translated-from-English constructions ("Koks rekomenduojamas" instead of "Koks yra rekomenduojamas", "monitoriaus ekranas" combining synonyms, "Kokia taisyklinga sėdėjimo laikysena" instead of action-oriented "Kaip reikėtų taisyklingai sėdėti"). lt-qa POST-GEN was not meaningfully run.
- Rule: (1) After writing all MCQs, scan for length bias: if the correct answer is the longest option in >50% of questions, equalize by adding detail/parentheticals to distractors. (2) Read every question stem aloud. If it sounds like translated English, rephrase. (3) lt-qa POST-GEN Step 7 (natural read test) must actually be performed on the final text, not skipped. (4) Add new patterns to lt-mistakes.yaml when found.
- Applies to: assessment-task-gen, lt-qa, any Lithuanian MCQ generation

## 2026-03-28 — Testmoz POOL column B is pick count, not pool ID

- Problem: Generation script used an incrementing counter (1, 2, 3... 13) in column B of POOL rows. Testmoz interprets column B as "how many questions to show from this pool." Pool 2 showed 2 questions, pool 3 showed 3, etc. Only pool 1 worked correctly by coincidence.
- Rule: Column B on POOL rows must always be `1` (show one question per pool). It is NOT a pool identifier or sequence number. Never use an incrementing counter.
- Applies to: assessment-task-gen, any Testmoz xlsx generation

## 2026-03-28 — Testmoz xlsx must not have a header row

- Problem: Generated Assessment_Task.xlsx included a header row ("Question | Points | Options | Explanation"). Testmoz treated it as a question row and failed import with error: "column B needs to contain a positive number... I got Points".
- Rule: Never include a header row in Testmoz .xlsx files. Start with the first question immediately on row 1. Testmoz does not skip header rows.
- Applies to: assessment-task-gen, any Testmoz xlsx generation

## 2026-03-29 — Condition-last word order is an English calque

- Problem: Generated "Net taisyklinga poza nepakanka, jei sėdite valandų valandas be pertraukos." This is a direct calque of English "Even X isn't enough if Y" — condition at the end, nominative + nepakanka construction. Natural Lithuanian puts the condition first and uses genitive-negative: "Jei sėdėsite valandų valandas be pertraukos, taisyklingos pozos nepakaks."
- Rule: (1) Place "jei" clauses first in Lithuanian, not at the end as in English. (2) "X nepakanka" with nominative subject is an English pattern. Use genitive + nepakaks/neužtenka instead. Both patterns added to lt-mistakes.yaml and .claude/skills/lt-qa/references/ai-patterns.md.
- Applies to: theory-pack-gen, lt-qa, any Lithuanian content generation

## 2026-03-29 — Visual Aid landscape: pass portrait dimensions to docx-js

- Problem: Visual Aid rendered as portrait instead of landscape. The script passed landscape dimensions (width: 16838, height: 11906) with LANDSCAPE orientation. docx-js swaps dimensions internally, so the swap produced portrait.
- Rule: When generating landscape documents with docx-js, pass PORTRAIT dimensions (width: short edge, height: long edge) and set orientation: PageOrientation.LANDSCAPE. docx-js swaps them internally. For A4 landscape: width=11906, height=16838.
- Applies to: visual-aid-gen, any landscape docx generation

## 2026-03-29 — Student Task formatting: step spacing, hint colors, checklist keepNext

- Problem: (1) Step gaps too small (before: 240). (2) Hints (Užuomina) and success checks (✓) same color as body text, no visual differentiation. (3) Checklist section split across pages. (4) Title "vertinimo lapas" implied assessment when it's just a task sheet. (5) Running header repeated the misleading title.
- Rule: (1) Step headings: spacing.before: 360. (2) Hints: color #808080 grey, spacing.before: 120. (3) Success checks: color #2E7D32 green, spacing.before: 120. (4) All checklist items except last: keepNext: true. (5) Student tasks don't get running headers. (6) Don't call student tasks "vertinimo lapas" unless they're actual assessments.
- Applies to: student-task-gen

## 2026-03-29 — Teacher Plan: warning box spacing and diary page integrity

- Problem: (1) "Dažna klaida" warning boxes had spacing.before: 80, which collapsed with the preceding paragraph's after: 80, creating no visible gap. (2) "Pamokos aprašymas (dienynui)" label could split from its content across pages because it lacked keepNext.
- Rule: (1) Warning box paragraphs: spacing.before: 200 (not 80). (2) Diary label paragraph must have keepNext: true in addition to the horizontal rule above it.
- Applies to: lesson-plan-gen

## 2026-03-29 — Missing diphthong u in gniaužti derivatives

- Problem: Generated "sugniažti–atgniažti" instead of "sugniaužti–atgniaužti". Missing u in the -iaužt- consonant cluster.
- Rule: gniaužti stem always keeps the u: sugniaužti, atgniaužti. Check all -iaužt- words letter-by-letter. Added to lt-mistakes.yaml.
- Applies to: all Lithuanian content generation

## 2026-03-29 — "Pertraukėje" is a hallucinated word form

- Problem: Generated "Pertraukėje" as locative of pertrauka. This form doesn't exist. It's a hallucinated blend of pertrauka and pertraukėlė stems.
- Rule: pertrauka → per pertrauką or pertraukoje. pertraukėlė → pertraukėlėje. Never "pertraukėje". Added to lt-mistakes.yaml.
- Applies to: all Lithuanian content generation

## 2026-03-29 — Visual Aid slide content must fit one landscape page

- Problem: Slide 5 (Pagrindinės sąvokos) had 5 term items at 28pt/48pt with 200 twip inter-term spacing. Content spilled onto a second page because the vertical budget was never calculated. The skill spec said "4-5 items maximum" without checking whether 5 actually fits.
- Rule: (1) Every visual aid slide MUST fit on one landscape A4 page. Usable height after margins = ~9638 DXA. Accent bar + spacer = ~1080 DXA. Remaining = ~8558 DXA (~14 content lines at 28pt). (2) Slide 5 hard cap is 4 terms, not 5. (3) Term spacing is 160 twips (not 200). (4) If content overflows, cut items, never reduce font size.
- Applies to: visual-aid-gen

## 2026-03-31 — Do not create scripts/ or package.json in the repo

- Problem: Created scripts/gen_004L_theory_pack.js and scripts/gen_005I_visual_aid.js in the repo, plus added mammoth to package.json. This directly violates the 2026-03-30 decision "No generation scripts in repo." The decisions file was read at session start but the rule was not followed.
- Rule: Generation scripts are ephemeral. Run them in-session, keep the output (.docx/.pdf), discard the script. Never write JS files to the repo. Never create or modify package.json. If npm packages are needed for a one-off generation, install them, use them, and clean up before session end.
- Applies to: all content generation, any session that uses Node.js scripts

## 2026-03-31 — "Nešiojamas telefonas" is outdated; use "mobilusis telefonas"

- Problem: Generated "nešiojamojo telefono" in a phishing scenario. All phones are portable now; "nešiojamas telefonas" is an outdated term that sounds like a literal translation.
- Rule: Use "mobilusis telefonas" or just "telefonas" in all generated content. Never "nešiojamas telefonas" or "nešiojamasis telefonas" when referring to a mobile phone. Added to lt-mistakes.yaml.
- Applies to: all Lithuanian content generation

## 2026-03-31 — Practice_Task must be referenced in Teacher_Plan for P lessons

- Problem: 006_P Teacher_Plan ran a full 34-min oral session with its own 6 questions + 3 scenarios. Practice_Task.pdf (10 completely different questions) existed in the folder but was never mentioned in the plan. Teacher had two disconnected question sets with no guidance on their relationship.
- Rule: When generating a P lesson Teacher_Plan where Practice_Task already exists, the plan MUST reference Practice_Task.docx and explain its role (in-class handout, homework, or self-study). The timeline must account for Practice_Task distribution. Similarly, when practice-task-gen creates a task, it should flag if the Teacher_Plan doesn't reference it.
- Applies to: lesson-plan-gen, practice-task-gen

## 2026-03-31 — Patching .docx requires PDF reconversion [OBSOLETE as of 2026-04-01]

- Problem: 004 Theory_Pack.docx was patched with text fixes but the PDF was not regenerated. Students receive PDF, so the fix was not effectively deployed. The .docx sat orphaned for a day.
- Rule: ~~After patching a student-facing .docx, always reconvert to PDF immediately.~~ **OBSOLETE:** All student-facing documents are now DOCX (2026-04-01 format decision). Only Visual_Aid remains PDF. No reconversion needed.
- Applies to: N/A (superseded)

## 2026-03-31 — Em dashes in README template caused recurring regressions

- Problem: The lesson-readme-gen template (assets/readme_template.md) contained em dashes in 3 structural patterns: heading (`# NNN_TYPE — Title`), Bloom level (`**Lygis N — Name**`), and readiness gate boilerplate. Every README generated from this template inherited em dashes. Previous fix sessions did search-and-replace on generated files, but the next regeneration reintroduced them because the template was never patched. The SKILL.md also had one Lithuanian string with an em dash (`**TBD** — bus nustatyta...`) that got copied into generated content.
- Rule: (1) When fixing a recurring issue in generated content, always check the template/source that generates it, not just the output files. Fixing outputs without fixing the source guarantees regression on next generation. (2) The readme_template.md and all Lithuanian strings in SKILL.md must be em-dash-free. (3) The lesson-readme-gen skill now has a mandatory em dash hard gate (Step 4b-extra) that scans the entire generated README for U+2014 before output.
- Applies to: lesson-readme-gen, any skill with templates or boilerplate strings that get copied into generated content

## 2026-03-31 — Repo naming conventions must never appear in generated content

- Problem: Four skills leaked internal repo naming into student-facing and teacher-facing materials. practice-task-gen put lesson codes (001_L), type codes (tipas "P"), and file categories (Theory_Pack) into Practice_Task text and help tables. theory-pack-gen used non-canonical filenames ({NNN}_{T}_{Title}_Theory_Pack) that exposed lesson codes to students via the filename. answer-key-gen used "Theory_Pack section" in student study key cross-references. lesson-plan-gen referenced "Practice_Task.pdf" by filename in generated teacher plan text. Skills were written from a developer mental model where these names felt natural, but students and teachers should never see repo internals.
- Rule: (1) Generated content must never contain lesson codes (001_L, 007_A), file category names (Theory_Pack, Student_Task, Practice_Task), or type codes (tipas "P", L tipas). Use descriptive Lithuanian: topic names, "teorijos santrauka", "praktikos užduotis". (2) File outputs use canonical names only (Theory_Pack.docx, not 001_L_Ergonomika_Theory_Pack.docx). (3) This rule is now in CLAUDE.md under Content Generation Rules. (4) When writing skill templates or exemplars, always ask: "Would a student understand this text without knowing how the repo is organized?" If no, rewrite.
- Applies to: practice-task-gen, theory-pack-gen, answer-key-gen, lesson-plan-gen, all content generation skills

## 2026-04-01 — No unverifiable statistics in generated content

- Problem: Lesson 003 Theory_Pack cited "2025 m. daugiau nei 80 % phishing laiškų pasaulyje buvo sukurti naudojant dirbtinį intelektą (ENISA, 2025)." This statistic could not be verified against any ENISA publication. Fabricated statistics undermine Theory_Pack credibility.
- Rule: Never cite statistics that cannot be traced to a specific, publicly accessible source document. If a statistic sounds plausible but you cannot confirm the exact publication, do not include it. Replace with a verifiable source (NKSC, Eurostat, or other official body with a confirmable URL or document title). When in doubt, use qualitative claims ("vis daugiau") instead of fake precision.
- Applies to: theory-pack-gen, any content generation that includes statistical claims

## 2026-04-01 — Do not delete files the teacher didn't ask to delete

- Problem: During a cleanup session, Claude deleted root TODO.md assuming it was redundant because tasks/todo.md exists. TODO.md holds project-level deferred items (docx template library, automated QA pipeline). tasks/todo.md holds session-level ephemeral plans. Different purpose, different scope.
- Rule: Never delete a file the teacher didn't explicitly ask to delete, even if it looks redundant during a cleanup. If you think a file should be removed, say so and wait for confirmation. This applies especially to files at repo root that aren't obviously generated content.
- Applies to: all cleanup and reorganization tasks

## 2026-04-01 — Decisions must be encoded into all affected skills, not just logged

- Problem: decisions.md accumulated 30+ decisions over 10 days. Most content-affecting decisions were only encoded into whichever skill was being worked on at the time. The 5 oldest, highest-volume skills (lesson-plan-gen, student-task-gen, theory-pack-gen, visual-aid-gen, lesson-readme-gen) never read tasks/lessons.md. The straight quotes decision (2026-03-31) was logged in decisions.md and CLAUDE.md but 7 skills still actively enforced the opposite rule. module-qa's subagent prompt would flag the correct behavior as an error.
- Rule: (1) When logging a decision that affects content generation, immediately check ALL skills that produce that content type and update each one. Don't assume logging the decision is sufficient. (2) All generation skills must read tasks/lessons.md at session start. This is now added to all 8 generation skills. (3) decisions.md is an architect's log, not an operational input. Its rules must be encoded into skills when made, not re-read at runtime. (4) After adding a lessons.md entry, scan for skills that need the correction and update them in the same session.
- Applies to: all skills, decision-making process, skill maintenance
