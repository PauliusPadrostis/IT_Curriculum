# L89 (1) — Program completeness criteria (handles all cases; correct I/O; no undefined behavior)

**Type:** 📖 Lesson
**Grade:** Grade 12 (IV gimnazijos klasė)
**Module:** Programming – Sort/Search, Modular & Robustness
**Semester:** Semester 2
**Sequence:** 89 of grade year
**Lessons allocated:** 1
**Parent topic:** L25–L28 (4) – Robustness + Extreme Testing + Program Completeness
**Status:** 🚧 WIP

---

## Overview

- Program completeness criteria (handles all cases; correct I/O; no undefined behavior)

## Sub-topics

- Program completeness criteria (handles all cases; correct I/O; no undefined behavior)

---

## 1️⃣ Completion Definition

Student can explain program completeness criteria (handles all cases; correct i/o; no undefined behavior).

## 2️⃣ Minimum Evidence

Correctly explains program completeness criteria (handles all cases; correct i/o; no undefined behavior) in own words or in response to targeted questions without reference.

## 3️⃣ Bloom's Taxonomy Level

Level 2 — Understand / Remember

## 4️⃣ Readiness Gate

✔ All must be true:

- All defined tests pass (expected == actual)

- No runtime errors on valid inputs

- Handles specified edge cases correctly

- Output format matches specification exactly (no extra text)

- Code contains no obvious completeness violations (e.g., missing branches, unhandled not-found)

If any test fails or format deviates → Gate not met.

---

## 5️⃣ Common Failure Modes

- Only testing “happy path” inputs

- Missing empty/single-element cases

- Incorrect tie handling in sort

- Not-found cases cause crash or garbage output

- Off-by-one errors only visible at boundaries

- Leaving debug prints in output

- Assuming file always non-empty / well-formed beyond spec

- Passing local tests but failing due to output formatting drift

---

## 📁 Resources

*(Add lesson materials — PDFs, worksheets, slides, data files — to this folder)*
