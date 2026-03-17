# L16 (5) — File Input (.txt/.csv) + Robust Parsing

**Type:** 📖 Lesson
**Grade:** Grade 12 (IV gimnazijos klasė)
**Module:** Programming – File I/O, Parsing & Records
**Semester:** Semester 1
**Sequence:** 16 of grade year
**Lessons allocated:** 5
**Status:** 🚧 WIP

---

## Context

**Exam link:** file input is explicitly required.

## Sub-topics

- Reading structured lines; tokenization; handling trailing spaces / empty lines

- CSV realities (delimiters, quoted fields—lightweight handling)

- Defensive parsing: missing values, unexpected formats

- Designing internal representation from file structure

## Completion Definition

Student independently writes a program that:

- Opens and reads data from a structured `.txt` or `.csv` file

- Correctly parses:

  - Delimited fields

  - Numeric and string data types

  - Variable-length datasets

- Detects and safely handles:

  - Empty lines

  - Trailing whitespace

  - Incorrectly formatted rows (as specified)

- Stores parsed data in appropriate in-memory structure (list/array or temporary container)

- Terminates without runtime errors on valid input

Parsing must be deterministic and reproducible.

---

## Minimum Evidence

Student submits:

- Program that:

  - Successfully reads provided dataset file

  - Correctly parses all rows

  - Prints structured verification output (e.g., first and last record, record count)

- Demonstrates handling of:

  - At least one malformed or edge-case row (as specified)

- No scaffolded parsing template provided

---

## Cognitive Level (Bloom's)

**Bloom: Apply → Analyze**

- Apply file reading mechanics

- Analyze row structure and data-type conversion

- Implement correct parsing logic

Appropriate for Grade 12 file realism stage.

---

## Readiness Gate

✔ All must be true:

- All valid rows parsed correctly

- No runtime crash on valid input

- Correct record count reported

- Data types correctly assigned (no numeric stored as string unintentionally)

- Edge-case handling behaves as specified

If parsing breaks on malformed input or type mismatch → Gate not met.

---

## Common Failure Modes

- Splitting incorrectly on delimiter

- Not trimming whitespace

- Failing numeric conversion

- Ignoring empty lines

- Hardcoding row count

- Stopping at first malformed row

- Not verifying record count

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
