# L57 (1) — Unit-level reasoning: what each function guarantees

**Type:** 📖 Lesson
**Grade:** Grade 12 (IV gimnazijos klasė)
**Module:** Programming – File I/O, Parsing & Records
**Semester:** Semester 1
**Sequence:** 57 of grade year
**Lessons allocated:** 1
**Parent topic:** L15–L18 (4) – Modular Architecture (Functions + Parameter Discipline)
**Status:** 🚧 WIP

---

## Overview

- Unit-level reasoning: what each function guarantees

## Sub-topics

- Unit-level reasoning: what each function guarantees

---

## 1️⃣ Completion Definition

Student can explain unit-level reasoning: what each function guarantees.

## 2️⃣ Minimum Evidence

Correctly explains unit-level reasoning: what each function guarantees in own words or in response to targeted questions without reference.

## 3️⃣ Bloom's Taxonomy Level

Level 2 — Understand / Remember

## 4️⃣ Readiness Gate

✔ All must be true:

- Program output identical before/after refactor on test input

- ≥3 functions with non-trivial responsibilities

- At least one value-returning function used correctly

- No reliance on mutable global state for core logic

- Functions have clear input/output (no “mystery side effects”)

If refactor breaks output equivalence or remains essentially monolithic → Gate not met.

---

## 5️⃣ Common Failure Modes

- Splitting into functions that still depend on globals

- “Functions” that just wrap one line (fake modularity)

- Passing everything everywhere (no parameter discipline)

- Duplicating code across functions

- Changing output formatting during refactor

- Mixing reading/parsing/processing/output in one function

---

## 📁 Resources

*(Add lesson materials — PDFs, worksheets, slides, data files — to this folder)*
