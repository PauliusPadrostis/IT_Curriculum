# Module Design: {Module_Name}

**Grade:** {Grade}
**Semester:** {Semester}
**Lessons:** {count}
**Created:** {date}

---

## 1. Bloom Progression

Each lesson's cognitive level must be non-decreasing within the module,
or the regression must be explicitly justified (e.g., new domain introduction).

| # | Type | Title | Bloom Level | Justification |
|---|------|-------|-------------|---------------|
| 001 | L | ... | 1: Atsiminti / 2: Suprasti / 3: Taikyti / 4: Analizuoti | Why this level? |
| 002 | L | ... | | |
| ... | | | | |
| NNN_A | A | ... | | Assessment ceiling |

**Progression check:** Is each level ≥ the previous? If not, justify the reset.
**Assessment ceiling:** Does the A lesson's Bloom level match the highest L/I level?

---

## 2. Prerequisite Chain

For each lesson, list what it assumes students already know,
and confirm where that knowledge is taught.

| Lesson | Assumes (student must know) | Source |
|--------|----------------------------|--------|
| 001 | Nothing (module opener) | - |
| 002 | ... | 001 |
| 003 | ... | 001, 002 |
| ... | | |

**Gap check:** Any assumption marked "bendra patirtis" (general experience)
must be validated against the grade's baseline. Grade 9 = never touched a computer.
Grade 10 = basic file skills. Grade 11-12 = tool-specific only.

If a prerequisite is not taught by a prior lesson and not in the grade baseline,
flag it here: either add a primer to the lesson that needs it, or add coverage to
a prior lesson.

---

## 3. Independent Work Time

Every lesson that has a Student_Task or Practice_Task must allocate
≥5 min of lesson time for students to work on it.

| Lesson | Task file | Allocated time | Notes |
|--------|-----------|---------------|-------|
| 001 | Student_Task.pdf | _ min | |
| 002 | Student_Task.pdf | _ min | |
| ... | | | |

**Red flag:** If a lesson has a task file but 0 min allocated,
either carve out time or mark the task as optional/homework.

---

## 4. P-A Compatibility

The practice lesson (P) must prepare students for the assessment (A).

| Aspect | P lesson | A lesson |
|--------|----------|----------|
| Format | (e.g., Testmoz MCQ) | (must match) |
| Topic coverage | All L/I topics | Subset or equal |
| Difficulty | Higher than A | Standard |
| Bloom level | ≥ A level | Module ceiling |
| Scaffolding | Yes (hints, structure) | None |

**Check:** Can a student who masters the P task confidently approach the A task?

---

## 5. Cross-File Alignment Notes

Any known constraints between files within the module:
- Statistics, definitions, terminology that must be consistent
- Scenarios or examples that are shared across lessons
- Images or visual aids referenced by Teacher_Plans

---

## Sign-off

- [ ] Bloom progression is non-decreasing or justified
- [ ] All prerequisites are traceable to prior lessons or grade baseline
- [ ] Every task-bearing lesson has ≥5 min independent work time
- [ ] P lesson format matches A lesson format
- [ ] P lesson difficulty > A lesson difficulty
