# IT_Curriculum — grading policy, rubric & answer-key surface

Extracted from `assessment-task-gen/references/grading_policy.md`, `assessment_format.md`, and the
(merged-in) `answer-key-gen` during the 2026-06-09 rework. The detailed marking *craft*
(accept/reject tables, partial-credit prose, boundary cases) stays in the merged assessment skill's
references **`answer_key_format.md`** and **`marking_scheme_guide.md`**; this file holds the
project-specific **policy**.

## Scale — LOCKED 1–10
`CLAUDE.md` "Locked Decisions": 1 = no work, 2 = everything bad, 3–10 proportional. Full
percentage→grade band table (Žemynos gimnazija vertinimo tvarka, 2023):

| Grade | % | Competency level |
|------:|---|------------------|
| 10 | 95–100 | Aukštesnysis (IV) |
| 9 | 85–94 | Aukštesnysis (IV) |
| 8 | 75–84 | Pagrindinis (III) |
| 7 | 65–74 | Pagrindinis (III) |
| 6 | 55–64 | Patenkinamas (II) |
| 5 | 45–54 | Patenkinamas (II) |
| 4 | 30–44 | Slenkstinis (I) |
| 3 | 20–29 | below slenkstinis |
| 2 | 10–19 | below slenkstinis |
| 1 | 0–9 | no work / no understanding |

> **School name caveat:** "Žemynos gimnazija" appears only as **teacher-internal** policy
> provenance. It must never appear in student-facing output (`CLAUDE.md` "No repo naming").

## Competency levels (four) & distributions (two distinct axes — do not conflate)
- Levels: **I Slenkstinis** (gr 4, 30–44%), **II Patenkinamas** (gr 5–6, 45–64%), **III Pagrindinis**
  (gr 7–8, 65–84%), **IV Aukštesnysis** (gr 9–10, 85–100%).
- **Competency-level distribution** across an assessment: ~20% I / ~30% II / ~30% III / ~20% IV.
- **Difficulty distribution** (separate axis): 20% easy / 50% medium / 30% hard; items progress
  easy→hard.

## Point allocation
- Choose totals that make % boundaries land on clean numbers — **preferred totals 10, 20, or 30**.
- **Every question/task shows its point value. No hidden scoring.**

## Rubric requirement — every assessment gets a `Rubric.docx`
- The rubric is **student-facing** and shared **before** the assessment (≥1 week, §29.2).
- **Practical-task rubric:** criteria table, columns *Kriterijus | Aukštesnysis (9–10) | Pagrindinis
  (7–8) | Patenkinamas (5–6) | Slenkstinis (4) | Max taškai*; **max 6 criteria**; concrete
  descriptors ("Teisingai identifikuoja abu kintamuosius", not "Gerai supranta"); + Total row.
- **MCQ/short-answer rubric:** point-per-question table *Klausimas | Kompetencijos lygis | Taškai |
  Pastabos*. Testmoz rubrics describe coverage by topic/type/point-value, not fixed question numbers.
- **Always include** the 1–10 conversion table + "Iš viso: {total} taškų".

## Other policy rules (from grading_policy.md §29–§30)
- §29.2 notify students ≥1 week before (share structure/scope/goals/criteria); §29.7 grade & return
  within 2 weeks; §30 max **1 graded assessment per day** for grades I–II (gymnasium). Durations:
  Atsiskaitomasis darbas ≥30 min, Apklausa raštu 15–20 min, Savarankiškas darbas 10–20 min.
- Formative (P) vs summative (A): A = broad cumulative coverage spanning levels I–IV, no hints,
  contributes to grade. **Do not reuse P items verbatim in A assessments.**

## Answer key (answer-key-gen MERGED into assessment-task-gen)
Filename `Answer_Key.docx`, saved to the lesson folder. Mode auto-detected from the folder suffix;
any type other than A/P aborts ("Atsakymų raktai generuojami tik A ir P pamokoms.").

- **A (`NNN_A`) → Grading Key (teacher-facing):** shows point values + credit levels (Pilnas /
  Dalinis (X tšk.) / 0 taškų), "Nepriimtina, nes…" rulings, accept/reject tables, model answers +
  ≥2 acceptable alternatives with credit level, partial-credit thresholds, boundary cases.
  **Footer watermark on every page** (see render-docx.md). Inputs: the `Assessment_Task` (.xlsx/.pdf)
  + `Rubric.docx`. Testmoz: include an entry for **every variant**, labelled ("1 klausimas, 2
  variantas"); never collapse a pool to "same as variant 1".
- **P (`NNN_P`) → Study Key (student-facing):** **no** point values, **no** grading language;
  teaching tone, formal **jūs**; "Dažna klaida:" and "Kodėl tai veikia:" callouts instead of reject
  lists; matches the Student_Task visual identity; **no** footer watermark. Inputs:
  `Practice_Task.docx` + (optional) sibling A `Rubric.docx`.
- The authoritative A-vs-P contrast is the **Cross-Mode Rules** table in `marking_scheme_guide.md`
  (carry it over with the merge). Decimal separator is a **comma** ("0,5" not "0.5"). Two-grader
  unambiguity; never write "panašus atsakymas priimtinas" without defining "panašus".

## C++ grading specifics (C++ only)
Canonical solution compilable with `g++ -std=c++11`. Reject: hardcoded output, non-compiling code,
English-comment/external code, and **banned library functions where the task is to implement the
logic** (e.g. `std::sort`, `std::reverse`, `std::accumulate`). Partial-credit weights: logic 40–60%,
compilation binary, edge cases 10–20% (gr 11+), style ≤10% (gr 12). Use the decision tree in
`marking_scheme_guide.md`.
