# Contributing to Informatika Curriculum

## Branch strategy

| Branch | Purpose |
|--------|---------|
| `main` | Stable, reviewed content only |
| `draft/<your-name>/<topic>` | WIP edits to any module |
| `review/<module>` | Ready for peer review before merging to main |

## Making changes

```bash
# 1. Start a new branch from main
git checkout main
git pull
git checkout -b draft/paulius/grade9-safety

# 2. Edit the relevant README.md file(s)

# 3. Commit with a clear message
git add Grade_9_I_klase/Semester_1/01_Safety/README.md
git commit -m "Add learning objectives and rubric to Grade 9 Safety module"

# 4. Push and open a pull request
git push -u origin draft/paulius/grade9-safety
```

## Module file structure

Every module `README.md` follows this template:

1. **Metadata** — grade, semester, section, status, node count
2. **Overview** — 2–3 sentence description
3. **Learning Objectives** — checkbox list (fill these in!)
4. **Lesson Sequence** — all L/I nodes as checkboxes
5. **Assessments & Practice** — all A/P/T nodes
6. **Detailed Node Specs** — collapsible `<details>` blocks with full completion definitions, minimum evidence, Bloom's level, and readiness gates pulled from roadmap.sh
7. **Resources & Materials** — slides, worksheets, rubrics
8. **Teacher Notes** — timing tips, common mistakes
9. **TODO / Open Questions**

## Status flags

Use the **Status** field in each module header:

| Flag | Meaning |
|------|---------|
| 🚧 WIP | Not started or incomplete |
| 🔄 In Review | Ready for peer review |
| ✅ Done | Reviewed and finalised |

## What still needs doing

See the root `README.md` for the full open TODO list.
The highest priority items are:
1. Fill in **Learning Objectives** for every module
2. Add **rubrics/marking schemes** to all Assessment nodes
3. Develop **slide decks** and **student worksheets**
4. Review Grade 12 Exam Prep against the current VBE specification
