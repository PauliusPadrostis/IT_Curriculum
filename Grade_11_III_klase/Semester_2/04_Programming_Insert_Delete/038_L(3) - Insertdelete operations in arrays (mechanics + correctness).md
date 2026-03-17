# L38 (3) — Insert/delete operations in arrays (mechanics + correctness)

**Type:** 📖 Lesson
**Grade:** Grade 11 (III gimnazijos klasė)
**Module:** Programming – Insert/Delete, Files & Subprograms
**Semester:** Semester 2
**Sequence:** 38 of grade year
**Lessons allocated:** 3
**Status:** 🚧 WIP

---

## Context

**Grade 11 anchor:** “šalinimas ir įterpimas”.

## Sub-topics

- Deletion with shifting; insertion with shifting

- Maintaining logical length vs physical capacity (conceptual)

- Edge cases: delete first/last, insert at boundaries, duplicates

## Completion Definition

Student can manually implement:

- Insert element at:

  - end

  - specific index

- Delete element at:

  - specific index

- Shift elements correctly to maintain contiguous structure

- Update logical size correctly

- Explain why shifting direction matters (left vs right shift)

Student demonstrates understanding of:

- Index stability

- Boundary conditions

- Order preservation

- Data loss risks if shift direction is wrong

No built-in insert/remove in this phase.

---

## Minimum Evidence

Student independently writes programs that:

- Insert an element into an array at a given position using manual shifting

- Delete an element and shift remaining values correctly

- Maintain correct logical size after modification

- Handle boundary cases:

  - insert at index 0

  - insert at last index

  - delete first element

  - delete last element

Student provides a short written explanation (2–3 sentences) describing:

- Why the shift direction is chosen

- What would break if done in the opposite order

---

## Cognitive Level (Bloom's)

**Bloom:** Apply → Analyze

- Apply shifting mechanics correctly

- Analyze correctness of boundary conditions

---

## Readiness Gate

✔ All must be true:

- No element overwritten incorrectly during shift

- No index out-of-bounds errors

- Logical size updated correctly

- Edge cases handled correctly

- Explanation demonstrates understanding of shift direction

If any fail → not ready for recomputation workflows (I9–I12).

---

## Learning Objectives

By the end of this node, students will be able to:

- [ ] *(objective 1 — derive from Completion Definition above)*
- [ ] *(objective 2)*
- [ ] *(objective 3)*

---

## Resources & Materials

- [ ] Slides / presentation
- [ ] Student worksheet / task sheet
- [ ] Rubric / marking scheme

---

## Teacher Notes

*(add timing tips, common misconceptions, differentiation strategies)*

---

## TODO / Open Questions

- [ ] *(What still needs to be written, tested, or clarified?)*
