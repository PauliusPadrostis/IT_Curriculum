# L39 — Defensive parsing and error handling

**Type:** Lesson
**Grade:** Grade 12
**Module:** Programming – File I/O, Parsing & Records
**Semester:** Semester 1
**Sequence:** 39 of grade year
**Parent topic:** File Input (.txt/.csv) + Robust Parsing
**Status:** WIP

---

## Overview

- Defensive parsing strategies: missing values, unexpected formats, malformed rows
- Robust parsing patterns: recovering from errors, skipping bad rows, validating before processing

## Sub-topics

- Detecting and handling missing values (empty fields, fewer columns than expected)
- Unexpected format handling: wrong data types, extra columns, truncated lines
- Defensive coding patterns: try/catch for conversion, default values, validation checks
- Deciding when to skip vs reject vs fix malformed data
- End-to-end robust parsing: combining tokenization, validation, and error recovery
- Logging or counting parse errors without crashing

---

## Completion Definition

Student can write parsing code that handles missing values, unexpected formats, and malformed input without crashing, using appropriate defensive strategies.

## Minimum Evidence

- Program does not crash on input with missing values or unexpected formats
- Correctly identifies and handles at least two types of parse errors (missing field, wrong type, extra data)
- Valid rows are still processed correctly even when some rows are malformed

## Bloom's Taxonomy Level

Level 3 — Apply

## Readiness Gate

All must be true:

- All valid rows parsed correctly
- No runtime crash on valid or malformed input
- Correct record count reported (excluding skipped rows if applicable)
- Data types correctly assigned (no numeric stored as string unintentionally)
- Edge-case handling behaves as specified

If parsing crashes on malformed input or silently produces wrong results -> Gate not met.

---

## Common Failure Modes

- Splitting incorrectly on delimiter
- Not trimming whitespace
- Failing numeric conversion (crash on non-numeric string)
- Ignoring empty lines
- Hardcoding row count
- Stopping at first malformed row instead of continuing
- Not verifying record count
- Silently accepting bad data without validation
- No error recovery strategy (crash or infinite loop on bad input)

---

## Resources

*(Add lesson materials — PDFs, worksheets, slides, data files — to this folder)*
