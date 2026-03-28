# Marking Scheme Guide

Rules for writing unambiguous accept/reject/partial credit decisions in answer keys.

---

## General Principles

- Every answer entry must be unambiguous — two graders reading the same student answer must assign the same score
- Never write "panašus atsakymas priimtinas" without defining what "panašus" means
- When in doubt, list more alternatives rather than fewer
- Partial credit thresholds must be quantified (e.g., "bent 2 iš 3 aspektų")
- Use comma as decimal separator in Lithuanian (0,5 not 0.5)
- All Lithuanian text follows lt-qa rules (no em dashes, formal "jūs", no calques)

---

## MCQ Marking Rules

- **Correct answer:** letter + full text + brief justification of why it's correct
- **Each distractor:** one-line explanation of why it's wrong and what misconception it represents
- **Arguable distractors:** pre-emptive ruling with "Nepriimtina, nes..." + specific reasoning that explains why the distractor fails even if it seems partially correct
- **Multiple selections:** if a student selects two answers on paper tests, 0 points unless rubric explicitly allows partial credit for multiple selections
- **No answer:** 0 points (not marked as wrong — just not awarded points)

### MCQ Accept/Reject Table Format

Every MCQ must have a table with these columns:

| Atsakymo variantas | Įvertinimas | Pagrindimas |
|---------------------|-------------|-------------|

---

## Short Answer Marking Rules

- **Model answer:** full ideal answer written as a teacher would write it — complete, precise, using correct terminology
- **Acceptable alternatives:** numbered list, minimum 2 per question, each with credit level (full/partial) and reasoning for why it qualifies
- **Partial credit:** explicit threshold rules with numbers, e.g.:
  - "1 taškas, jei paminėti bent 2 aspektai; 0,5 taško, jei tik 1 aspektas"
  - "Pilnas balas, jei atsakyme yra X ir Y; dalinis, jei tik vienas iš jų"
- **Reject list:** minimum 2 common wrong answers per question, each with reasoning for why it earns zero credit
- **Boundary cases:** technically correct but incomplete answers — explicit scoring decision (e.g., "Teisingas, bet nepilnas: 0,5 taško, nes trūksta pagrindimo")
- **Spelling tolerance:** minor Lithuanian spelling errors in otherwise correct answers do not reduce score unless the error changes meaning (e.g., "ergonomika" vs "ergnomika" = accept; "privatumas" vs "prevencija" = reject, different concept)
- **Verbatim recall:** answers that are word-for-word copies from Theory_Pack earn full credit if correct, but this should be noted in the key as "Atgaminimas, ne supratimas" for teacher awareness

---

## Scenario Analysis Marking Rules

- **Model answer:** must demonstrate the reasoning process, not just the conclusion. Show: identification → principle applied → recommendation
- **Accept:** any reasoning chain that correctly applies the relevant principle, even if phrased differently from the model answer
- **Reject:** answers that reach the correct conclusion by wrong reasoning (e.g., "correct action for wrong reason = 0 taškų for reasoning component")
- **Partial credit rules:**
  - Correct identification + wrong recommendation = partial credit (identification points awarded)
  - Wrong identification + correct general advice = 0 (cannot give credit for lucky guessing)
  - Correct identification + no recommendation = partial (identification points only)
  - Multiple problems identified but only some correct = credit per correct identification
- **"nes..." justification:** when the question requires justification, the answer must contain explicit reasoning. A correct statement without "because" earns partial credit at most.

---

## Code Task Marking Rules

### Canonical Solution
- One complete, compilable, commented C++ solution
- Comments explain the logic, not the syntax (e.g., "// Ieškome didžiausio elemento" not "// for loop")
- Must compile and produce correct output — verify before including

### Alternative Approaches
- List by name + key structural difference (not full code in Grading Key; full code in Study Key)
- Example: "Selection sort: naudoja minimumų paiešką vietoj gretimų elementų lyginimo"
- Only list approaches that are grade-appropriate (don't suggest recursion in Grade 10)

### Accept Criteria (what makes ANY solution valid)
- Produces correct output for all test cases
- Compiles without errors (g++ -std=c++11)
- Does not use banned constructs for the exercise
- Uses only concepts taught in scope L/I lessons
- Variable names may differ from canonical solution

### Reject Criteria (automatic 0 taškų)
- Hardcoded output (e.g., `cout << "3 7 12";` instead of computing)
- Library functions that bypass the exercise (e.g., `std::sort`, `std::reverse`, `std::accumulate` when testing manual algorithm implementation)
- Code that does not compile
- Code from external sources (comments in English, advanced constructs not taught)
- Output formatting errors that are purely cosmetic: do NOT reject (deduct style points if rubric includes them)

### Partial Credit Per Rubric Criterion
- **Logic correctness:** does the algorithm work? (weighted highest, typically 40-60% of points)
- **Compilation:** does it compile? (binary: yes = points, no = 0 for this criterion)
- **Edge cases:** handles boundary inputs? (grade 11+ only, typically 10-20% of points)
- **Code style:** readable variable names, indentation? (lowest weight, grade 12 only, max 10% of points)

### Partial Credit Decision Tree
```
Compiles?
  NO → 0 for compilation criterion. Check logic on paper for logic points.
  YES → Check output:
    Correct for all cases? → Full logic points
    Correct for some cases? → Proportional logic points
    Wrong for all cases? → Check if approach is valid but has a bug:
      Valid approach, minor bug → 50% logic points
      Wrong approach entirely → 0 logic points
```

---

## Practical Tool Task Marking Rules

- Per-criterion evaluation using rubric levels: Aukštesnysis (9-10) / Pagrindinis (7-8) / Patenkinamas (5-6) / Slenkstinis (4)
- Each criterion descriptor must be observable in the student's submitted file (not inferred)
- "Partially meets" = meets the lower level's descriptor, not an average between levels
- When a student's work falls between two levels, award the lower level unless the key explicitly defines intermediate scoring
- Missing deliverable components: 0 for affected criteria (do not penalize unrelated criteria)

---

## Cross-Mode Rules

| Rule | Grading Key (A mode) | Study Key (P mode) |
|------|---------------------|-------------------|
| Point values shown | Yes, always | Never |
| Credit levels stated | Yes (Pilnas/Dalinis/0) | Never |
| "Nepriimtina" rulings | Yes | No (explain misconception instead) |
| Alternative phrasings | Listed with credit level | Not listed (one model answer + reasoning) |
| Reject list | Yes, with zero-credit reasoning | Rephrased as "Dažna klaida" with teaching explanation |
| Code solutions | Canonical + alternatives by name | Canonical + 1 full alternative (if instructive) |
| Tone | Clinical, objective | Teaching, supportive, formal "jūs" |
