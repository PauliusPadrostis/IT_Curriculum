# L15–L18 (4) – Modular Architecture (Functions + Parameter Discipline)

**Type:** 📖 Lesson
**Grade:** Grade 12 (IV gimnazijos klasė)
**Module:** Programming – File I/O, Parsing & Records
**Semester:** Semester 1
**Status:** 🚧 WIP

---

## Context

**Exam link:** subprograms + passing values/addresses are named.

## Sub-topics

- Decomposing into functions: read(), transform(), compute(), output()

- Functions returning values

- Passing by value vs “by address/reference” (as required by spec)

- Unit-level reasoning: what each function guarantees

## Completion Definition

Student independently refactors a working single-file program into a modular structure that:

- Splits logic into **named functions** with clear responsibilities (e.g., `readData`, `process`, `output`)

- Uses **parameters intentionally** (passes only what is needed)

- Returns values where appropriate (does not rely on global state except constants)

- Preserves identical I/O behavior (same outputs for same inputs)

Modular structure must improve traceability and testability without changing results.

---

## Minimum Evidence

Student submits:

- Two versions:

  1. pre-refactor monolithic version

  2. refactored modular version

- Proof of equivalence:

  - runs both versions on the same input

  - outputs are identical (captured output text or checksum-style comparison)

- Refactored version contains:

  - at least **3 functions**

  - at least **one function returning a value**

  - no unnecessary global variables

No refactoring template provided.

---

## Cognitive Level (Bloom's)

**Bloom: Analyze → Apply**

- Analyze program responsibilities and decomposition points

- Apply modular design using functions and parameters

Appropriate Grade 12 architecture conditioning.

---

## Readiness Gate

✔ All must be true:

- Program output identical before/after refactor on test input

- ≥3 functions with non-trivial responsibilities

- At least one value-returning function used correctly

- No reliance on mutable global state for core logic

- Functions have clear input/output (no “mystery side effects”)

If refactor breaks output equivalence or remains essentially monolithic → Gate not met.

---

## Common Failure Modes

- Splitting into functions that still depend on globals

- “Functions” that just wrap one line (fake modularity)

- Passing everything everywhere (no parameter discipline)

- Duplicating code across functions

- Changing output formatting during refactor

- Mixing reading/parsing/processing/output in one function

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
