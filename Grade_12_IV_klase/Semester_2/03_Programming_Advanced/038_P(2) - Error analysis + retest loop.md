# P38 (2) — Error analysis + retest loop

**Type:** 🏃 Practice
**Grade:** Grade 12 (IV gimnazijos klasė)
**Module:** Programming – Sort/Search, Modular & Robustness
**Semester:** Semester 2
**Sequence:** 38 of grade year
**Lessons allocated:** 2
**Status:** 🚧 WIP

---

## Context

Identify top 3 recurring error classes per student; redo with “no-repeat” constraint.

## Completion Definition

Student independently:

- Analyzes a completed programming solution (own or provided) to identify errors

- Classifies each error by type (e.g., parsing, data model, key logic, algorithm, edge-case handling, output formatting)

- Applies targeted fixes

- Re-tests using a defined test subset to confirm the fix resolves the issue without introducing regressions

Student demonstrates a repeatable debug-and-verify loop, not random trial-and-error.

---

## Minimum Evidence

Student submits:

- Error log containing at least **4** items, each with:

  - Symptom (what failed)

  - Cause (what in code/data caused it)

  - Category (error type)

  - Fix applied (what changed)

  - Verification (which test confirms it’s fixed)

- Updated program version

- Retest evidence:

  - inputs used

  - expected vs actual outputs for at least **2** targeted tests

No teacher-guided pointing to the exact lines.

---

## Cognitive Level (Bloom's)

**Bloom: Analyze → Evaluate**

- Analyze failure causes (not just surface symptoms)

- Evaluate whether the fix is sufficient via retesting

---

## Readiness Gate

✔ All must be true:

- ≥4 errors correctly identified and categorized

- Fixes are technically valid and address root cause

- Retests confirm corrected behavior (expected == actual)

- No regressions introduced in retest set

- Output formatting remains specification-compliant

If fixes are unverified or regressions appear → Gate not met.

---

## Common Failure Modes

- Describing symptoms only (“wrong answer”) without cause

- Misclassifying errors (formatting vs logic vs parsing)

- Applying fixes without retesting

- “Fixing” by hardcoding expected outputs

- Introducing new bugs while patching

- Retesting only the same happy-path case

- Ignoring edge cases that originally triggered failure

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
