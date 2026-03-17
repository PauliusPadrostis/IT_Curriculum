# I92 — Problem decomposition: plan required functions, identify interfaces

**Type:** 🔗 Integration practice
**Grade:** Grade 12
**Module:** Programming – Sort/Search, Modular & Robustness
**Semester:** Semester 2
**Sequence:** 92 of grade year
**Parent topic:** I17–I20 (4) — Workflow 5: Modular architecture enforcement
**Status:** 🚧 WIP

---

## Overview

- Problem decomposition: plan required functions, identify interfaces

## Sub-topics

- Problem decomposition: plan required functions, identify interfaces

---

## 1️⃣ Completion Definition

Student can apply problem decomposition: plan required functions, identify interfaces.

## 2️⃣ Minimum Evidence

Independently completes a task involving problem decomposition: plan required functions, identify interfaces without reference materials.

## 3️⃣ Bloom's Taxonomy Level

Level 3 — Apply

## 4️⃣ Readiness Gate

✔ All must be true:

- Required structure present (functions/modules as specified)

- No core logic remains in `main` beyond orchestration

- No hidden dependency on mutable globals for core behavior

- Output is identical before/after on verification tests

- Program still compiles/runs without errors

If structure non-compliant or output changes → Gate not met.

---

## 5️⃣ Common Failure Modes

- “Refactor” that only renames functions without real separation

- Leaving parsing/processing inside `main`

- Breaking behavior due to changed variable scope

- Introducing side effects via globals

- Not verifying outputs (assumes equivalence)

- Accidentally changing formatting during refactor

---

## 📁 Resources

*(Add lesson materials — PDFs, worksheets, slides, data files — to this folder)*
