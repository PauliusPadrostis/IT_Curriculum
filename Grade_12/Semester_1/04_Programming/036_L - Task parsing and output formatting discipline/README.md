# L29 — Task parsing and output formatting discipline

**Type:** Lesson
**Grade:** Grade 12
**Module:** Programming – File I/O, Parsing & Records
**Semester:** Semester 1
**Sequence:** 29 of grade year
**Parent topic:** Specification Reading + I/O Discipline (Foundation)
**Status:** WIP

---

## Overview

- Parsing a task statement into: inputs, outputs, constraints, and edge cases
- Output formatting for exact spec compliance: spacing, order, precision, delimiters

## Sub-topics

- Breaking a task statement into structured components (inputs, outputs, constraints, edge cases)
- Annotating a specification before writing any code
- Output formatting rules: exact spacing, line breaks, field order, numeric precision
- Verifying output against spec character-by-character

---

## Completion Definition

Student can decompose a task statement into its input/output/constraint/edge-case components AND produce output that matches the required format exactly.

## Minimum Evidence

- Correctly annotates a task statement identifying all inputs, outputs, constraints, and edge cases
- Produces program output that matches the specification exactly (spacing, order, precision, delimiters)
- Explains why even minor formatting deviations cause failure in automated grading

## Bloom's Taxonomy Level

Level 3 — Apply

## Readiness Gate

All must be true:

- Input parsing structure matches spec exactly
- Output formatting matches required format exactly (spacing, order, precision)
- Program runs without runtime error on sample input
- All constraints identified correctly in spec annotation
- No extra debug text or stray whitespace in output

If any formatting mismatch or misread constraint -> Gate not met.

---

## Common Failure Modes

- Skipping constraint reading (e.g., max N)
- Ignoring edge cases mentioned in spec
- Wrong delimiter handling
- Incorrect output spacing or line breaks
- Printing extra debug text
- Assuming input format instead of verifying
- Rounding or precision errors in numeric output
- Wrong field order in output lines

---

## Resources

*(Add lesson materials — PDFs, worksheets, slides, data files — to this folder)*
