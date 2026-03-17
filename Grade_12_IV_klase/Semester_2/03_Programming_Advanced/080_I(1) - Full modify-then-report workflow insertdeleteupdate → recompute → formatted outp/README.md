# I80 (1) — Full modify-then-report workflow: insert/delete/update → recompute → formatted output

**Type:** 🔗 Integration practice
**Grade:** Grade 12 (IV gimnazijos klasė)
**Module:** Programming – Sort/Search, Modular & Robustness
**Semester:** Semester 2
**Sequence:** 80 of grade year
**Lessons allocated:** 1
**Parent topic:** I13–I16 (4) – Workflow: Modify Collection (Insert/Delete/Update) + Recompute/Report
**Status:** 🚧 WIP

---

## Overview

- Full modify-then-report workflow: insert/delete/update → recompute → formatted output

## Sub-topics

- Full modify-then-report workflow: insert/delete/update → recompute → formatted output

---

## 1️⃣ Completion Definition

Student can apply full modify-then-report workflow: insert/delete/update → recompute → formatted output.

## 2️⃣ Minimum Evidence

Independently completes a task involving full modify-then-report workflow: insert/delete/update → recompute → formatted output without reference materials.

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
