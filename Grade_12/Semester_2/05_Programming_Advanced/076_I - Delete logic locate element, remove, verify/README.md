# I74 — Delete logic: locate element, remove, verify collection invariants

**Type:** 🔗 Integration practice
**Grade:** Grade 12
**Module:** Programming – Sort/Search, Modular & Robustness
**Semester:** Semester 2
**Sequence:** 74 of grade year
**Parent topic:** I13–I16 (4) – Workflow: Modify Collection (Insert/Delete/Update) + Recompute/Report
**Status:** 🚧 WIP

---

## Overview

- Delete logic: locate element, remove, verify collection invariants

## Sub-topics

- Delete logic: locate element, remove, verify collection invariants

---

## 1️⃣ Completion Definition

Student can apply delete logic: locate element, remove, verify collection invariants.

## 2️⃣ Minimum Evidence

Independently completes a task involving delete logic: locate element, remove, verify collection invariants without reference materials.

## 3️⃣ Bloom's Taxonomy Level

Level 3 — Apply

## 4️⃣ Readiness Gate

✔ All must be true:

- Insert/delete/update behavior matches specification

- No runtime errors on missing-key cases

- Recomputed outputs are correct after each mutation

- Required invariants are preserved (verified by output or internal check)

- Output formatting matches specification exactly

If invariants break or recomputation incorrect → Gate not met.

---

## 5️⃣ Common Failure Modes

- Insert appends instead of placing correctly (breaks sorted order)

- Delete shifts indices incorrectly (skips/duplicates records)

- Update changes key field unintentionally

- Not recomputing aggregates after mutation (stale results)

- Crashing on “key not found”

- Mishandling duplicates or ties

- Output format drifting across multiple stages

---

## 📁 Resources

*(Add lesson materials — PDFs, worksheets, slides, data files — to this folder)*
