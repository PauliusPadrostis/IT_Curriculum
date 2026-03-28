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
