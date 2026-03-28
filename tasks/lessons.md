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
- Applies to: assessment-task-gen, any MCQ generation

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
