# Informatika – IT Curriculum (Grades 9–12)

> **Status:** 🚧 Work in Progress
> **Author:** Paulius Padrostis
> **Source:** Migrated from [roadmap.sh](https://roadmap.sh/r/informatika-iiikl)

---

## Structure

```
informatika-curriculum/
├── Grade_9/                         ← Year 9: Safety · Hardware · Graphics · Specialisation
│   ├── README.md
│   ├── Semester_1/
│   │   ├── README.md
│   │   ├── 01_Safety/
│   │   │   ├── README.md            ← module index (lesson list, teacher note)
│   │   │   ├── 001_L - Ergonomics & healthy computer use/
│   │   │   │   └── README.md        ← lesson (overview, Bloom level, evidence, gate)
│   │   │   └── ...
│   │   └── ...
│   └── Semester_2/
│       └── ...
├── Grade_10/                        ← Year 10: Spreadsheets · Programming fundamentals
├── Grade_11/                        ← Year 11: Data · Digital content · Arrays · AI ethics · Networks
└── Grade_12/                        ← Year 12: Advanced data/programming · VBE exam prep
```

Each lesson folder contains a single `README.md` with:
- **Overview** – what the lesson covers
- **Completion definition** – what "done" looks like
- **Minimum evidence** – artefact required
- **Bloom's level** – cognitive demand
- **Readiness gate** – prerequisite check
- **Resources** – placeholder for materials

Lesson folder naming: `NNN_T - Short description/`
- `NNN` – sequence number within the grade year (zero-padded, resets each grade)
- `T` – type code: `L` Learning · `I` Integration · `P` Pre-assessment prep · `A` Assessment · `D` Exam drill · `T` Timed pre-mock · `M` Mock · `G` Gap repair

See [LESSON_TYPES.md](./LESSON_TYPES.md) for full definitions, expectations, and boundary conditions for each type.

---

## How to navigate

New to this repo? Follow this path:

1. **Grade README** → pick a grade, read `Grade_X/README.md` for the year focus, full module list, and progression logic
2. **Semester README** → read `Grade_X/Semester_Y/README.md` for the semester goal, module order, and key assessment points
3. **Module README** → open any `NN_Module/README.md` for the lesson index, teacher notes, and lesson type breakdown
4. **Lesson folder** → open any `NNN_T - Name/README.md` for overview, completion definition, evidence required, Bloom level, and readiness gate

---

## Grades

| Folder | Year | Theme |
|--------|------|-------|
| [Grade_9](./Grade_9/) | Grade 9 | Safety · Hardware · Graphics · Specialisation |
| [Grade_10](./Grade_10/) | Grade 10 | Spreadsheets · Programming fundamentals |
| [Grade_11](./Grade_11/) | Grade 11 | Data · Digital content · Arrays · AI ethics · Networks |
| [Grade_12](./Grade_12/) | Grade 12 | Advanced data/programming · VBE exam prep |

---

## Open TODOs

- [ ] Fill in learning objectives for every lesson
- [ ] Add rubrics/marking schemes to all Assessment nodes
- [ ] Develop slide decks and student worksheets
- [ ] Review Grade 12 Exam Prep against current VBE spec
