# L19–L24 (6) – Sorting/Search Systems + Collection Operations (Algorithm Composition)

**Type:** 📖 Lesson
**Grade:** Grade 12 (IV gimnazijos klasė)
**Module:** Programming – Sort/Search, Modular & Robustness
**Semester:** Semester 2
**Status:** 🚧 WIP

---

## Context

### 1️⃣ Completion Definition (Observable Capability)

Student independently implements, on a collection of composite records:

- **Search** (linear and/or binary where applicable) using a specified key

- **Sorting** by one key (and, if specified, secondary key) with correct ordering rules

- **Collection operations**:

  - insert a new record (into correct position if sorted constraint applies)

  - delete a record by key

  - update a record field by key

- Maintains all required invariants (e.g., “collection remains sorted”) and produces correct outputs after operations.

---

## Completion Definition

> *(to be defined)*

## Minimum Evidence

Student submits a program that:

- Loads records (file input or provided in-code dataset)

- Demonstrates:

  - one successful search

  - one unsuccessful search (key not found) handled safely

  - sort result verified (prints first/last after sort + confirms ordering condition)

  - one insert + one delete + one update

- Produces required formatted output after operations (not debug text)

- No scaffolded algorithm templates provided

---

## Cognitive Level (Bloom's)

**Bloom: Apply → Analyze**

- Apply algorithm patterns correctly on composite structures

- Analyze invariants and correctness after each operation

Grade 12 appropriate: composition + correctness discipline.

---

## Readiness Gate

✔ All must be true:

- Search returns correct result for found key and safe behavior for not-found

- Sorting produces correct ordering per specification

- After insert/delete/update, collection invariants still hold (e.g., remains sorted if required)

- Output formatting remains specification-compliant

- No runtime errors on edge cases (empty collection, single record)

If any invariant breaks or search/sort incorrect → Gate not met.

---

## Common Failure Modes

- Sorting only by visible field, ignoring key specification

- Wrong comparator logic (ascending vs descending)

- Binary search used on unsorted data

- Insert breaks sorted order (appends instead of placing correctly)

- Delete/update fails when key not found (crash)

- Off-by-one errors in loops/indexing

- Mutating while iterating incorrectly

- Output format drift (extra spaces/lines)

---

## Learning Objectives

By the end of this node, students will be able to:

- [ ] *(objective 1 — derived from Completion Definition above)*
- [ ] *(objective 2)*
- [ ] *(objective 3)*

---

## Resources & Materials

- [ ] Slides / presentation
- [ ] Student worksheet / task sheet
- [ ] Rubric / marking scheme
- [ ] *(additional resource)*

---

## Teacher Notes

*(add timing tips, common misconceptions, differentiation strategies here)*

---

## TODO / Open Questions

- [ ] *(What still needs to be written, tested, or clarified?)*
