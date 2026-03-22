# L83 — Test design and typical pitfalls

**Type:** Lesson
**Grade:** Grade 12
**Module:** Programming – Sort/Search, Modular & Robustness
**Semester:** Semester 2
**Sequence:** 83 of grade year
**Parent topic:** Robustness + Extreme Testing + Program Completeness
**Status:** WIP

---

## Overview

- Test set design: normal, boundary, and adversarial cases
- Typical pitfalls: empty set, single element, all equal keys, max sizes, negative/zero values

## Sub-topics

- Designing test sets with normal-case, boundary-case, and adversarial-case coverage
- Identifying boundary values: min, max, zero, negative, single element, empty collection
- Typical pitfalls that break otherwise correct programs: empty set, single element, all-equal keys, maximum sizes, negative/zero inputs, duplicate values
- Building a personal test checklist from known pitfall categories
- Verifying program behavior against each pitfall category systematically

---

## Completion Definition

Student can design a comprehensive test set covering normal, boundary, and adversarial cases AND identify typical pitfalls that commonly cause program failures.

## Minimum Evidence

- Designs a test set for a given problem that includes normal, boundary, and adversarial inputs
- Identifies at least three typical pitfall categories relevant to a given problem
- Explains why each pitfall causes failure and how to test for it

## Bloom's Taxonomy Level

Level 4 — Analyze

## Readiness Gate

All must be true:

- All defined tests pass (expected == actual)
- No runtime errors on valid inputs
- Handles specified edge cases correctly (empty, single, duplicates, max size)
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
- Not testing with all-equal keys or maximum input sizes
- Ignoring negative or zero values in numeric inputs

---

## Resources

*(Add lesson materials — PDFs, worksheets, slides, data files — to this folder)*
