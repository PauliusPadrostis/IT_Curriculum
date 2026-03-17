# I37 (4) — Workflow 6: Two-part composition

**Type:** 🔗 Integration
**Grade:** Grade 12 (IV gimnazijos klasė)
**Module:** Programming – Sort/Search, Modular & Robustness
**Semester:** Semester 2
**Sequence:** 37 of grade year
**Lessons allocated:** 4
**Status:** 🚧 WIP

---

## Context

Task requires chained subresults (e.g., build structure → compute intermediate → reuse in final output) without becoming “project-y”.

## Completion Definition

Student independently develops a two-part exam-style program that:

- Uses a shared data model loaded from file

- Solves **two distinct but related tasks** within the same program

- Ensures:

  - No duplicate parsing logic

  - No duplicated data model

  - Proper reuse of functions across both tasks

- Produces correct and separately formatted outputs for each part

- Maintains architectural compliance and robustness across both parts

Program must behave correctly for both tasks without structural conflict.

---

## Minimum Evidence

Student submits:

- Complete program source

- Input file

- Output demonstrating:

  - Correct results for Part 1

  - Correct results for Part 2

- Verification note explaining:

  - How shared data model is reused

  - Which functions are used by both parts

No structural scaffold or partial template provided.

---

## Cognitive Level (Bloom's)

**Bloom: Apply → Analyze → Evaluate**

- Apply full-stack programming competence

- Analyze how to structure shared logic

- Evaluate correctness across multiple task constraints

Aligned with VBE 2 multi-part program expectations.

---

## Readiness Gate

✔ All must be true:

- File parsed only once (no duplicate reading)

- Shared data model used consistently

- Both parts produce correct outputs

- No unintended interference between parts

- Output formatting correct for both sections

- No runtime errors on valid input

If either part fails or architecture duplicated → Gate not met.

---

## Common Failure Modes

- Re-reading file for second part

- Duplicating parsing logic

- Recomputing data model separately

- Global state side effects between parts

- Incorrect output separation

- One part correct, second part incomplete

- Formatting drift between part outputs

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
