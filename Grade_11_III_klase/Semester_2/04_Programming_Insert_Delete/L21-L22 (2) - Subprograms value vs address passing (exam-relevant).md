# L21–L22 (2) — Subprograms: value vs address passing (exam-relevant)

**Type:** 📖 Lesson
**Grade:** Grade 11 (III gimnazijos klasė)
**Module:** Programming – Insert/Delete, Files & Subprograms
**Semester:** Semester 2
**Status:** 🚧 WIP

---

## Context

**Grade 11 anchor:** “paprogramės su reikšmių ir adresų perdavimu”.\
\

## Sub-topics

- When function returns value vs modifies via parameter

- Designing clean function contracts (input/output responsibility)

- Reading code where passing mode matters (reasoning focus)

## Completion Definition

Student can, in C++:

- Write functions with clean contracts using:

  - **return values** for produced results, and

  - **reference parameters** (`&`) for intentional modification

- Explain, for a given function, which data is:

  - input-only,

  - output-only,

  - input-output

- Read a code snippet and determine whether a variable will be modified after a function call based on the signature (value vs reference)

- Choose between:

  - returning a value

  - modifying via parameter\
    based on clarity and correctness

Student demonstrates “contract thinking”:

> who owns the change, and where is the output declared?

---

## Minimum Evidence

Student independently completes tasks that include:

- Writing **two functions** for the same problem:

  1. one that returns the computed result by value

  2. one that modifies result through a reference parameter

- Annotating each function with a short contract comment:

  - inputs

  - outputs

  - side effects (if any)

- Answering short reasoning questions:

  - “Does this call modify `x`? Why?”

  - “Which signature is safer/clearer here? Why?”

At least one task must involve an **array/vector passed to a function**, requiring clarity about whether it is modified.

---

## Cognitive Level (Bloom's)

**Bloom:** Analyze → Evaluate

- Analyze effects of passing mode by reading signatures and calls

- Evaluate function contract design choices (clarity, side effects, correctness)

---

## Readiness Gate

✔ All must be true:

- Correctly predicts when variables change after calls (value vs reference)

- Writes correct function signatures matching intended behavior

- Contract comments correctly reflect reality (no “lies”)

- Uses return vs reference intentionally (not randomly)

- No unintended side effects in tasks that should be pure

If any fail → not ready for A4.

---

## Learning Objectives

By the end of this node, students will be able to:

- [ ] *(objective 1 — derived from Completion Definition above)*
- [ ] *(objective 2)*
- [ ] *(objective 3)*

---

## Resources & Materials

- [ ] Slides / presentation
- [ ] Student worksheet / task sheet
- [ ] Rubric / marking scheme
- [ ] *(additional resource)*

---

## Teacher Notes

*(add timing tips, common misconceptions, differentiation strategies here)*

---

## TODO / Open Questions

- [ ] *(What still needs to be written, tested, or clarified?)*
