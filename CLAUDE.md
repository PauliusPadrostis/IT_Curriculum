# IT_Curriculum

Lithuanian gymnasium informatics curriculum (grades 9–12).
Repo: PauliusPadrostis/IT_Curriculum. Owner/teacher: Paulius.
All student-facing content in Lithuanian. Respond to the teacher in whatever language he uses.

## Workflow

1. **Plan before generating.** For any task touching 2+ files or lessons, write the plan to tasks/todo.md first. Get confirmation before executing.
2. **One task per session.** Don't mix grading with content generation with skill editing. Start fresh sessions for different task types.
3. **Verify before done.** Open generated .docx/.pdf files and confirm they render. Compile .cpp files. Never mark complete without proof.
4. **Include the artifact.** When the teacher references work from another AI or a prior session, ask for the actual file or paste — don't reconstruct from description.

## Content Generation Rules

- Output formats: Teacher_Plan → .docx. Student_Task → .pdf. Theory_Pack → .pdf. README → .md.
- Approved software ONLY: Code::Blocks, Excel, Word, Inkscape, Canva, Google Classroom, Testmoz.
- No phones. No Python. C++ only for programming.
- No paper/notebooks — students don't carry them.
- Timing estimates in lesson plans must sum to ≤37 min.
- Grade 9: assume student has never touched a computer. Grade 10: basic file skills known. Grade 11–12: tool-specific only.
- Student materials use formal "jūs" address. No motivational fluff.

## Lithuanian Language — Hard Rules

- Em dash (—): banned everywhere. Replace with comma, period, colon, or restructure.
- Quotation marks: „..." (lower-upper) only.
- No AI text patterns: no formulaic openings, no triad structures, no transition stuffing, no hedging.
- VLKK terminology as baseline. Teacher overrides stored in lt-qa mistake library.
- When generating Lithuanian, load lt-qa/lt-mistakes.yaml from this repo before writing.
- After generating, self-check against the mistake library. Fix before presenting output.

## Mistakes Log — Self-Improvement

When the teacher corrects anything — structure, content, language, pedagogy — add a rule to tasks/lessons.md that prevents recurrence. Format:

```
## YYYY-MM-DD — Short title
- Problem: what went wrong
- Rule: what to do instead
- Applies to: which skill or task type
```

Read tasks/lessons.md at session start. Follow every rule in it.

## Repo Structure

```
Grade_XX/
  Semester_X/
    Module_Name/
      README.md                  (module index with lesson status rollup)
      NNN_T - Lesson_Title/      (T = L|I|P|A|D|T|MOCK|G)
        README.md
        Teacher_Plan.docx
        Student_Task.pdf
        Theory_Pack.pdf
        *.cpp (scaffolds, solutions)
lt-qa/
  lt-mistakes.yaml               (growing mistake library)
tasks/
  status.md                      (rolling repo snapshot — rewritten by /end-session)
  decisions.md                   (append-only decision log)
  lessons.md                     (accumulated corrections — NEVER delete entries)
  todo.md                        (ephemeral session plan — cleared per session)
```

## Persistent Context

Tracking files live in `tasks/` within this repo:
- `tasks/status.md` (rolling snapshot of repo state, rewritten by `/end-session` skill)
- `tasks/decisions.md` (locked — append only, never edit existing entries)
- `tasks/lessons.md` (accumulated corrections — never delete entries)
- `tasks/todo.md` (ephemeral session plan — cleared per session)

On session start, read `tasks/status.md`, `tasks/decisions.md`, and `tasks/lessons.md`.
On session end, run `/end-session` skill. Do NOT manually update status.md or decisions.md — the skill handles reconciliation, prompts for decisions/lessons confirmation, and rewrites status.md as a rolling snapshot.

## Locked Decisions

- C++ only for programming (no Python, no JavaScript for teaching)
- 1–10 grading scale (1 = no work, 2 = everything bad, 3–10 proportional)
- No student PII in repo (BDAR/GDPR)
- Student_Task and Theory_Pack output as PDF, not DOCX
- Teacher_Plan stays as DOCX
- Em dash banned in all generated text
- Skills handle their own formatting specs — CLAUDE.md does not duplicate them

## What NOT To Do

- Don't expand lesson scope beyond what the README defines.
- Don't invent learning objectives not in the README.
- Don't generate batch content without reading module README first for sequence context.
- Don't commit format decisions (docx vs pdf, rubric structure) without asking — these have been changed before and the rework is expensive.
- Don't build infrastructure (frameworks, hooks, governance systems) when content is missing. Content first.
