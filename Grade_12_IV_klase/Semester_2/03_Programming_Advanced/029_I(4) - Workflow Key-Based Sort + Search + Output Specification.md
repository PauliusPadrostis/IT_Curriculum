# I29 (4) — Workflow: Key-Based Sort + Search + Output Specification

**Type:** 🔗 Integration
**Grade:** Grade 12 (IV gimnazijos klasė)
**Module:** Programming – Sort/Search, Modular & Robustness
**Semester:** Semester 2
**Sequence:** 29 of grade year
**Lessons allocated:** 4
**Status:** 🚧 WIP

---

## Context

Sorting + searching (sorted vs unsorted) combined; verify correctness on edge cases.

## Completion Definition

Student independently completes a workflow that:

- Sorts a collection of composite records by a specified key (and secondary key if required)

- Performs a search operation (linear or binary as appropriate)

- Handles both:

  - key found

  - key not found

- Produces output strictly matching specification (correct ordering, correct format, correct conditional messaging)

Sorting must respect ordering constraints before search if binary search is used.

---

## Minimum Evidence

Student submits:

- Program source code

- Input dataset

- Output demonstrating:

  - sorted result verification (e.g., first/last printed to confirm order)

  - one successful search case

  - one unsuccessful search case handled correctly

- Brief verification note stating:

  - sort key used

  - search method used

  - confirmation that precondition (sorted before binary search) was satisfied

No scaffolded algorithm template.

---

## Cognitive Level (Bloom's)

**Bloom: Apply → Analyze**

- Apply sort/search patterns correctly on composite data

- Analyze preconditions and invariants (e.g., sorted requirement for binary search)

---

## Readiness Gate

✔ All must be true:

- Collection correctly sorted according to specification

- Search returns correct record when found

- Safe and correct behavior when key not found

- Binary search only used when collection is sorted

- Output format exactly matches specification

- No runtime errors on empty or single-record datasets

If invariant violated or search incorrect → Gate not met.

---

## Common Failure Modes

- Sorting by wrong field

- Comparator logic reversed (ascending/descending mismatch)

- Performing binary search on unsorted data

- Off-by-one indexing errors

- Not handling “not found” case safely

- Modifying collection unintentionally during search

- Output format drift after sort/search logic

- Failing on single-element dataset

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
