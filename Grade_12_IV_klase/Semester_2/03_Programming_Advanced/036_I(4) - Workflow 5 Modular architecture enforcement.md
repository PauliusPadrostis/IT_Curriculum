# I36 (4) — Workflow 5: Modular architecture enforcement

**Type:** 🔗 Integration
**Grade:** Grade 12 (IV gimnazijos klasė)
**Module:** Programming – Sort/Search, Modular & Robustness
**Semester:** Semester 2
**Sequence:** 36 of grade year
**Lessons allocated:** 4
**Status:** 🚧 WIP

---

## Context

Same problem solved with required function decomposition + required parameter passing style.

## Completion Definition

Student independently takes a working solution and refactors it to comply with a required program architecture, such that:

- Code is reorganized into required functions/modules (as specified)

- Responsibilities are correctly separated (read/parse/process/output)

- Parameter passing and return values are used appropriately (no unnecessary globals)

- Program behavior is preserved: **outputs remain identical** for the same inputs

Student demonstrates **structure compliance without regression**.

---

## Minimum Evidence

Student submits:

- “Before” (working but non-compliant) version

- “After” (refactored compliant) version

- Proof of equivalence:

  - both run on the same input set

  - outputs are identical (captured output text for at least 2 test cases)

- Refactored version includes:

  - required function names/signatures (if specified)

  - clear separation of read/parse/process/output

No refactor template provided.

---

## Cognitive Level (Bloom's)

**Bloom: Analyze → Apply → Evaluate**

- Analyze architectural requirements and existing code structure

- Apply refactoring to meet constraints

- Evaluate equivalence via output verification

Appropriate Grade 12 robustness + exam-style compliance conditioning.

---

## Readiness Gate

✔ All must be true:

- Required structure present (functions/modules as specified)

- No core logic remains in `main` beyond orchestration

- No hidden dependency on mutable globals for core behavior

- Output is identical before/after on verification tests

- Program still compiles/runs without errors

If structure non-compliant or output changes → Gate not met.

---

## Common Failure Modes

- “Refactor” that only renames functions without real separation

- Leaving parsing/processing inside `main`

- Breaking behavior due to changed variable scope

- Introducing side effects via globals

- Not verifying outputs (assumes equivalence)

- Accidentally changing formatting during refactor

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
