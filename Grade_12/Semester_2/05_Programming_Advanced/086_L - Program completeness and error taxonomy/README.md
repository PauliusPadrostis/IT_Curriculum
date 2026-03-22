# L86 — Program completeness and error taxonomy

**Type:** Lesson
**Grade:** Grade 12
**Module:** Programming – Sort/Search, Modular & Robustness
**Semester:** Semester 2
**Sequence:** 86 of grade year
**Parent topic:** Robustness + Extreme Testing + Program Completeness
**Status:** WIP

---

## Overview

- Program completeness criteria: handles all cases, correct I/O, no undefined behavior
- Error taxonomy: classifying errors as logic vs parsing vs formatting vs off-by-one

## Sub-topics

- Defining program completeness: all input cases handled, correct output for each, no undefined behavior
- Completeness checklist: all branches covered, all edge cases addressed, no silent failures
- Error taxonomy categories: logic errors, parsing errors, formatting errors, off-by-one errors
- Diagnosing which error category a bug belongs to
- Using error classification to guide debugging strategy
- Connecting completeness criteria to error prevention

---

## Completion Definition

Student can evaluate whether a program is complete (handles all cases with correct I/O and no undefined behavior) AND classify errors into the correct taxonomy category to guide debugging.

## Minimum Evidence

- Evaluates a given program against completeness criteria and identifies gaps
- Classifies at least three sample bugs into correct error categories (logic, parsing, formatting, off-by-one)
- Explains the debugging strategy appropriate for each error category

## Bloom's Taxonomy Level

Level 4 — Analyze

## Readiness Gate

All must be true:

- All defined tests pass (expected == actual)
- No runtime errors on valid inputs
- Handles specified edge cases correctly
- Output format matches specification exactly (no extra text)
- Code contains no obvious completeness violations (e.g., missing branches, unhandled not-found)

If any test fails or format deviates -> Gate not met.

---

## Common Failure Modes

- Only testing "happy path" inputs
- Missing empty/single-element cases
- Incorrect tie handling in sort
- Not-found cases cause crash or garbage output
- Off-by-one errors only visible at boundaries
- Leaving debug prints in output
- Assuming file always non-empty / well-formed beyond spec
- Passing local tests but failing due to output formatting drift
- Misclassifying error type and applying wrong fix strategy
- Treating formatting errors as logic errors (or vice versa)

---

## Resources

*(Add lesson materials — PDFs, worksheets, slides, data files — to this folder)*
