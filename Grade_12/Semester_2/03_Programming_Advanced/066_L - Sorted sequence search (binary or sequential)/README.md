# L66 — Sorted sequence search: binary or sequential-sorted — choice and justification

**Type:** 📖 Lesson
**Grade:** Grade 12
**Module:** Programming – Sort/Search, Modular & Robustness
**Semester:** Semester 2
**Sequence:** 66 of grade year
**Parent topic:** L19–L24 (6) – Sorting/Search Systems + Collection Operations (Algorithm Composition)
**Status:** 🚧 WIP

---

## Overview

- Sorted sequence search: binary or sequential-sorted — choice and justification

## Sub-topics

- Sorted sequence search: binary or sequential-sorted — choice and justification

---

## 1️⃣ Completion Definition

Student can explain sorted sequence search: binary or sequential-sorted — choice and justification.

## 2️⃣ Minimum Evidence

Correctly explains sorted sequence search: binary or sequential-sorted — choice and justification in own words or in response to targeted questions without reference.

## 3️⃣ Bloom's Taxonomy Level

Level 2 — Understand / Remember

## 4️⃣ Readiness Gate

✔ All must be true:

- Search returns correct result for found key and safe behavior for not-found

- Sorting produces correct ordering per specification

- After insert/delete/update, collection invariants still hold (e.g., remains sorted if required)

- Output formatting remains specification-compliant

- No runtime errors on edge cases (empty collection, single record)

If any invariant breaks or search/sort incorrect → Gate not met.

---

## 5️⃣ Common Failure Modes

- Sorting only by visible field, ignoring key specification

- Wrong comparator logic (ascending vs descending)

- Binary search used on unsorted data

- Insert breaks sorted order (appends instead of placing correctly)

- Delete/update fails when key not found (crash)

- Off-by-one errors in loops/indexing

- Mutating while iterating incorrectly

- Output format drift (extra spaces/lines)

---

## 📁 Resources

*(Add lesson materials — PDFs, worksheets, slides, data files — to this folder)*
