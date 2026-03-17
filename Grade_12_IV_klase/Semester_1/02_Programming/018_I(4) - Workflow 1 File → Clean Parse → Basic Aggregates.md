# I18 (4) — Workflow 1: File → Clean Parse → Basic Aggregates

**Type:** 🔗 Integration
**Grade:** Grade 12 (IV gimnazijos klasė)
**Module:** Programming – File I/O, Parsing & Records
**Semester:** Semester 1
**Sequence:** 18 of grade year
**Lessons allocated:** 4
**Status:** 🚧 WIP

---

## Context

Use file input + representation + sum/min/max/count/avg + formatted output.

## Completion Definition

Student independently completes a full workflow from a file-based dataset by:

- Reading `.txt/.csv` input according to specification

- Parsing fields robustly (correct delimiter, trimming, type conversion)

- Storing data into an appropriate in-memory structure

- Computing required **basic aggregates** (e.g., count, sum, min/max, average) exactly as specified

- Producing output in exact required format (ordering, spacing, precision)

Workflow must be stable on variable dataset size and typical edge cases stated in the spec.

---

## Minimum Evidence

Student submits:

- Program source code

- Input file used

- Output file/text produced

- A short verification note including:

  - record count parsed

  - at least one aggregate value cross-checked manually (one-line justification)

No scaffolded workflow template provided.

---

## Cognitive Level (Bloom's)

**Bloom: Apply → Analyze**

- Apply parsing + aggregation mechanics end-to-end

- Analyze correctness via verification cross-check

---

## Readiness Gate

✔ All must be true:

- File read + parse completes without runtime error on valid input

- Parsed record count matches expected

- Aggregates are correct (verified against at least one manual check)

- Output formatting matches specification exactly

- Program handles “not found / empty-result” conditions if specified

If any parsing/formatting/aggregate mismatch → Gate not met.

---

## Common Failure Modes

- Mis-parsing due to delimiter/whitespace issues

- Incorrect numeric conversion (int/float)

- Wrong aggregate initialization (min/max starting values)

- Division errors (integer division, rounding)

- Off-by-one in loop causing missed first/last record

- Printing debug text or wrong formatting

- Not validating record count, so silent parsing errors pass unnoticed

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
