# L34 (4) — Robustness + Extreme Testing + Program Completeness

**Type:** 📖 Lesson
**Grade:** Grade 12 (IV gimnazijos klasė)
**Module:** Programming – Sort/Search, Modular & Robustness
**Semester:** Semester 2
**Sequence:** 34 of grade year
**Lessons allocated:** 4
**Status:** 🚧 WIP

---

## Context

**Grade 12 anchor:** “testavimas su įprastais ir ekstremaliais duomenų rinkiniais”. \
**Exam link:** “programos išbaigtumas”.

## Sub-topics

- Test set design: normal + boundary + adversarial

- Typical pitfalls: empty set, single element, all equal keys, max sizes, negative/zero

- Program completeness criteria (handles all cases; correct I/O; no undefined behavior)

- Error taxonomy: logic vs parsing vs formatting vs off-by-one

## Completion Definition

Student independently hardens a program to be exam-robust by:

- Designing and running a test set that includes **extreme and edge cases** (min/max sizes, empty/single, duplicates, malformed rows if specified)

- Ensuring the program:

  - never crashes on valid input

  - handles all specified edge cases correctly

  - produces output in exact required format

- Demonstrating **program completeness**:

  - correct results for all test cases

  - correct termination

  - no leftover debug output

  - no undefined behavior (e.g., out-of-bounds, uninitialized values)

---

## Minimum Evidence

Student submits:

- A written test plan listing **at least 6** test cases including:

  - 2 edge/min-max cases

  - 1 “not found” / empty-result case

  - 1 duplicate / tie-handling case

  - 1 format stress case (whitespace / delimiter nuance) if relevant

- For each test:

  - input

  - expected output

  - actual output

- Final corrected program version that passes all tests

No teacher-provided test suite.

---

## Cognitive Level (Bloom's)

**Bloom: Analyze → Evaluate**

- Analyze failure risks and boundary conditions

- Evaluate correctness against expected outputs

- Improve program to meet completeness criteria

Appropriate Grade 12 VBE 2 conditioning level.

---

## Readiness Gate

✔ All must be true:

- All defined tests pass (expected == actual)

- No runtime errors on valid inputs

- Handles specified edge cases correctly

- Output format matches specification exactly (no extra text)

- Code contains no obvious completeness violations (e.g., missing branches, unhandled not-found)

If any test fails or format deviates → Gate not met.

---

## Common Failure Modes

- Only testing “happy path” inputs

- Missing empty/single-element cases

- Incorrect tie handling in sort

- Not-found cases cause crash or garbage output

- Off-by-one errors only visible at boundaries

- Leaving debug prints in output

- Assuming file always non-empty / well-formed beyond spec

- Passing local tests but failing due to output formatting drift

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
