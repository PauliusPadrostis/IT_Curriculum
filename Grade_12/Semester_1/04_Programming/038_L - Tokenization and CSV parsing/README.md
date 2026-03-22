# L38 — Tokenization and CSV parsing

**Type:** Lesson
**Grade:** Grade 12
**Module:** Programming – File I/O, Parsing & Records
**Semester:** Semester 1
**Sequence:** 38 of grade year
**Parent topic:** File Input (.txt/.csv) + Robust Parsing
**Status:** WIP

---

## Overview

- Reading structured lines from files and tokenizing/splitting them into fields
- CSV realities: delimiters, quoted fields, lightweight handling strategies

## Sub-topics

- Reading lines from .txt and .csv files
- Tokenization: splitting lines by delimiter (comma, semicolon, tab)
- Handling trailing spaces, empty lines, and whitespace trimming
- CSV specifics: delimiter variations, quoted fields containing delimiters
- Lightweight approaches to quoted-field handling without full CSV parsers
- Type conversion after tokenization (string to int/float)

---

## Completion Definition

Student can read structured text files, tokenize lines by delimiter, and handle common CSV realities including quoted fields and delimiter variations.

## Minimum Evidence

- Correctly parses a multi-line structured file into individual fields
- Handles at least one CSV edge case (quoted field, embedded delimiter, trailing comma)
- Produces correct record count and field values after parsing

## Bloom's Taxonomy Level

Level 3 — Apply

## Readiness Gate

All must be true:

- All valid rows parsed correctly
- No runtime crash on valid input
- Correct record count reported
- Data types correctly assigned (no numeric stored as string unintentionally)
- Edge-case handling behaves as specified (quoted fields, empty fields)

If parsing breaks on malformed input or type mismatch -> Gate not met.

---

## Common Failure Modes

- Splitting incorrectly on delimiter
- Not trimming whitespace
- Failing numeric conversion
- Ignoring empty lines
- Hardcoding row count
- Stopping at first malformed row
- Not verifying record count
- Splitting inside quoted fields (breaking quoted CSV values)

---

## Resources

*(Add lesson materials — PDFs, worksheets, slides, data files — to this folder)*
