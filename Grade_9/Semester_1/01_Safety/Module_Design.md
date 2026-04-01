# Module Design: Sauga (Safety)

**Grade:** 9
**Semester:** 1
**Lessons:** 7
**Created:** 2026-04-01

---

## 1. Bloom Progression

| # | Type | Title | Bloom | Justification |
|---|------|-------|-------|---------------|
| 001 | L | Ergonomika ir sveikas kompiuterio naudojimas | 2: Suprasti | Module opener. Students explain principles, no application task yet. |
| 002 | L | Privatumas ir paskyrų sauga | 2: Suprasti | Continues conceptual layer. Students explain password criteria and 2FA logic. |
| 003 | L | Internetinės rizikos ir saugaus reagavimo logika | 3: Taikyti | First Apply lesson. Students apply STOP-CHECK-REPORT algorithm to new scenarios. |
| 004 | L | Skaitmeninių technologijų poveikis aplinkai | 2: Suprasti | **Justified regression.** Entirely new domain (environmental impact). Students need to understand cause-effect before applying. Bloom resets for new topic cluster. |
| 005 | I | Scenarijų rotacijos užduotis | 3: Taikyti | Integration. Students apply rules from all 4 topics to unseen scenarios. |
| 006 | P | Saugos kontrolinis sąrašas ir dažnų klaidų peržiūra | 3: Taikyti | Updated per 2026-04-01 decision: final 10 min adds scenario analysis block (no scaffolding). Matches assessment ceiling. |
| 007 | A | Saugos struktūrinis vertinimas | 3: Taikyti | Assessment ceiling matches highest L/I level. Scenario analysis requires Apply. |

**Progression check:** Non-decreasing within topic clusters. Two regressions are justified:
- 003→004: new domain introduction (environment). Acceptable.
- 005→006: P lesson consolidation before assessment. Acceptable.

**Assessment ceiling:** 007_A = Bloom 3. Matches 003 and 005. OK.

---

## 2. Prerequisite Chain

| Lesson | Assumes | Source |
|--------|---------|--------|
| 001 | Understands that physical factors cause long-term health consequences | Bendra patirtis (general) |
| 002 | Can log into an account with username/password | Bendra patirtis (Grade 9 school accounts) |
| 002 | Understands that shared info online is visible to others | Bendra patirtis (general) |
| 003 | Understands what a password is and why it matters | 002 |
| 003 | Can distinguish safe vs. unsafe behavior with personal data | 002 |
| 004 | Can recognize phishing signs and apply STOP-CHECK-REPORT | 003 |
| 004 | Understands internet uses physical infrastructure (servers, cables) | ⚠️ GAP -- see below |
| 005 | All 4 L-lesson objectives | 001, 002, 003, 004 |
| 006 | All 4 L-lesson objectives + integration experience | 001-005 |
| 007 | All of the above | 001-006 |

**Gap check:**

> **GAP (004_L) -- RESOLVED (2026-04-01):** Teacher decision A: add a 2-minute infrastructure primer at the start of 004_L Teacher_Plan opening phase. Wording: "Internetas nėra tiesiog 'debesis' -- jis veikia per serverius ir duomenų centrus, kurie naudoja elektrą." This primes students before the environmental impact discussion.

---

## 3. Independent Work Time

| Lesson | Task file | Allocated time | Notes |
|--------|-----------|----------------|-------|
| 001_L | Student_Task.docx | 8 min (23-31) | OK |
| 002_L | Student_Task.docx | 8 min (26-34) | OK |
| 003_L | Student_Task.docx | 10 min (24-34) | OK |
| 004_L | Student_Task.docx | ⚠️ 0 min | See below |
| 005_I | Student_Task.docx | 25 min (8-33) | OK |
| 006_P | Practice_Task.docx | 28 min (4-32) | OK |

**Red flag (004_L) -- RESOLVED (2026-04-01):**

> Teacher decision A: replace verbal reflection (30-34 min) with a written independent task. Students write 2 concrete actions they will take to reduce their digital footprint. 4 min allocated. Student_Task.docx required.

---

## 4. P-A Compatibility

| Aspect | 006_P | 007_A |
|--------|-------|-------|
| Platform | Testmoz-format questions | Testmoz |
| Topic coverage | All 4 topics (001-004) | All 4 topics (001-004) |
| Bloom level | 2: Suprasti | 3: Taikyti |
| Scaffolding | Yes (hints, structure, error review) | None |
| Difficulty | ⚠️ Lower than A (Bloom 2 vs 3) | Standard |

**Compatibility issue -- RESOLVED (2026-04-01):**

> Teacher decision A: add a 10-min scenario analysis block to 006_P. 2-3 assessment-format scenarios, no scaffolding, students apply rules independently. This brings 006_P to Bloom 3 for that block. Bloom level updated below.

---

## 5. Cross-File Alignment Notes

- **Algorithm notation:** SUSTOTI → PATIKRINTI → PRANEŠTI. Use this exact Lithuanian form in all files (003_L Theory_Pack, Student_Task, Visual_Aid, Teacher_Plan; 005_I; 006_P; 007_A).
- **Grading scale:** 1-10. Assessment_Task.xlsx scoring must map to this.
- **No statistics without verifiable source** (lessons.md rule 2026-04-01): 004_L Theory_Pack must not cite unverifiable environmental statistics. Use "vis daugiau" qualitative claims if exact figures are unavailable.
- **Phishing email example (003_L):** Teacher-created asset. Visual_Aid.pdf for 003_L should include a stylized phishing email diagram with 5 labeled signs -- do not leave this to Teacher_Plan description alone.

---

## Sign-off

- [x] Bloom progression is non-decreasing or justified
- [x] All prerequisites traceable -- 004_L gap resolved: infrastructure primer added to Teacher_Plan
- [x] Every task-bearing lesson has >=5 min independent work time -- 004_L fixed: verbal reflection replaced with written task
- [x] P lesson format matches A lesson format (both Testmoz)
- [x] P lesson difficulty >= A lesson difficulty -- 006_P gains scenario analysis block (Bloom 3)
