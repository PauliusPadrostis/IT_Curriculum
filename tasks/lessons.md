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

## 2026-03-23 — Keep rubric separate from student-facing document

- Problem: Grading rubric was placed inside the same .docx as the student task description (after a page break). If the teacher prints or distributes the file, students see the rubric and scoring criteria.
- Rule: Rubric and student task are always separate files. Never combine teacher-facing scoring materials with student-facing instructions in one document, even with a page break separator.
- Applies to: cpp-grader, any assessment or savarankiškas darbas generation
