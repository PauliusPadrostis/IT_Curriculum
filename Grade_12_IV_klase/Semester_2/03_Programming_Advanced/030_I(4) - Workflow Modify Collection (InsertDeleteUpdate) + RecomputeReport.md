# I30 (4) — Workflow: Modify Collection (Insert/Delete/Update) + Recompute/Report

**Type:** 🔗 Integration
**Grade:** Grade 12 (IV gimnazijos klasė)
**Module:** Programming – Sort/Search, Modular & Robustness
**Semester:** Semester 2
**Sequence:** 30 of grade year
**Lessons allocated:** 4
**Status:** 🚧 WIP

---

## Context

Implement insert/delete logic, then recompute derived metrics; ensure invariants.

## Completion Definition

Student independently completes a workflow that:

- Loads records into a composite collection

- Applies **mutation operations** exactly as specified:

  - insert new record (with correct placement if sorted invariant required)

  - delete record by key

  - update one or more fields by key

- After each operation:

  - recomputes required aggregates or derived outputs

  - produces correctly formatted report output

- Maintains all required invariants (e.g., “collection remains sorted”, “no duplicates unless allowed”)

- Handles missing-key cases safely (no crash; behavior matches spec)

---

## Minimum Evidence

Student submits:

- Program source code

- Input dataset + operation commands (file or defined inputs as per task)

- Output demonstrating:

  - at least one insert + one delete + one update executed correctly

  - correct recomputed results after mutations

  - correct handling of one “key not found” case

- Verification note stating:

  - invariant(s) preserved (e.g., sorted order)

  - how the program ensures invariant preservation (one sentence)

No scaffolded mutation template.

---

## Cognitive Level (Bloom's)

**Bloom: Apply → Analyze**

- Apply mutation patterns correctly

- Analyze invariant preservation + correctness after state changes

Grade 12 appropriate for exam-realistic stateful tasks.

---

## Readiness Gate

✔ All must be true:

- Insert/delete/update behavior matches specification

- No runtime errors on missing-key cases

- Recomputed outputs are correct after each mutation

- Required invariants are preserved (verified by output or internal check)

- Output formatting matches specification exactly

If invariants break or recomputation incorrect → Gate not met.

---

## Common Failure Modes

- Insert appends instead of placing correctly (breaks sorted order)

- Delete shifts indices incorrectly (skips/duplicates records)

- Update changes key field unintentionally

- Not recomputing aggregates after mutation (stale results)

- Crashing on “key not found”

- Mishandling duplicates or ties

- Output format drifting across multiple stages

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
