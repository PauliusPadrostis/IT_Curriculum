# L66 — Sorting algorithms and correctness analysis

**Type:** Lesson
**Grade:** Grade 12
**Module:** Programming – Sort/Search, Modular & Robustness
**Semester:** Semester 2
**Sequence:** 66 of grade year
**Parent topic:** Sorting/Search Systems + Collection Operations (Algorithm Composition)
**Status:** WIP

---

## Overview

- Sorting algorithms: selection sort, insertion sort, bubble sort — logic and step-by-step tracing
- Correctness analysis: choosing the right sort algorithm for the task and verifying results

## Sub-topics

- Selection sort: algorithm logic, step-by-step tracing, when to use
- Insertion sort: algorithm logic, step-by-step tracing, when to use
- Bubble sort: algorithm logic, step-by-step tracing, when to use
- Comparing sort algorithms: stability, best/worst case behavior, suitability for different data patterns
- Correctness analysis: verifying that sorted output matches specification
- Choosing the right sort for the task: criteria for algorithm selection

---

## Completion Definition

Student can implement and trace selection, insertion, and bubble sort AND analyze which algorithm is appropriate for a given task, verifying correctness of results.

## Minimum Evidence

- Traces at least two sort algorithms step-by-step on a sample dataset
- Correctly implements a sort algorithm that produces specification-compliant output
- Explains criteria for choosing one sort algorithm over another for a given scenario

## Bloom's Taxonomy Level

Level 4 — Analyze

## Readiness Gate

All must be true:

- Sorting produces correct ordering per specification
- Search returns correct result for found key and safe behavior for not-found
- After insert/delete/update, collection invariants still hold (e.g., remains sorted if required)
- Output formatting remains specification-compliant
- No runtime errors on edge cases (empty collection, single record)

If any invariant breaks or search/sort incorrect -> Gate not met.

---

## Common Failure Modes

- Sorting only by visible field, ignoring key specification
- Wrong comparator logic (ascending vs descending)
- Binary search used on unsorted data
- Insert breaks sorted order (appends instead of placing correctly)
- Delete/update fails when key not found (crash)
- Off-by-one errors in loops/indexing
- Mutating while iterating incorrectly
- Output format drift (extra spaces/lines)
- Choosing an unstable sort when stability is required
- Not verifying sorted output against expected results

---

## Resources

*(Add lesson materials — PDFs, worksheets, slides, data files — to this folder)*
