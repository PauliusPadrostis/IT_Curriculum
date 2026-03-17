# L36 (1) — Defensive parsing: missing values, unexpected formats

**Type:** 📖 Lesson
**Grade:** Grade 12 (IV gimnazijos klasė)
**Module:** Programming – File I/O, Parsing & Records
**Semester:** Semester 1
**Sequence:** 36 of grade year
**Lessons allocated:** 1
**Parent topic:** L5–L9 (5) – File Input (.txt/.csv) + Robust Parsing
**Status:** 🚧 WIP

---

## Overview

- Defensive parsing: missing values, unexpected formats

## Sub-topics

- Defensive parsing: missing values, unexpected formats

---

## 1️⃣ Completion Definition

Student can explain defensive parsing: missing values, unexpected formats.

## 2️⃣ Minimum Evidence

Correctly explains defensive parsing: missing values, unexpected formats in own words or in response to targeted questions without reference.

## 3️⃣ Bloom's Taxonomy Level

Level 2 — Understand / Remember

## 4️⃣ Readiness Gate

✔ All must be true:

- All valid rows parsed correctly

- No runtime crash on valid input

- Correct record count reported

- Data types correctly assigned (no numeric stored as string unintentionally)

- Edge-case handling behaves as specified

If parsing breaks on malformed input or type mismatch → Gate not met.

---

## 5️⃣ Common Failure Modes

- Splitting incorrectly on delimiter

- Not trimming whitespace

- Failing numeric conversion

- Ignoring empty lines

- Hardcoding row count

- Stopping at first malformed row

- Not verifying record count

---

## 📁 Resources

*(Add lesson materials — PDFs, worksheets, slides, data files — to this folder)*
