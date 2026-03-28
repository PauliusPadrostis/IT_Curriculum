# Question Design Reference

Item writing quality standards for assessment generation.

---

## MCQ Rules

| Rule | Details |
|------|---------|
| Options | 3-4 per question. 3 is acceptable (research shows equal effectiveness to 5). |
| Distractors | Must represent real student misconceptions. Source from Teacher_Plan "Dažniausios klaidos" sections. Write distractors before writing the correct answer. |
| Banned patterns | No "all of the above." No "none of the above." |
| Negative stems | Avoid "which is NOT..." unless the objective specifically requires identifying exceptions. |
| Option structure | All options same grammatical structure and approximate length. |
| **Answer length equalization** | **Correct answer must NOT be systematically longer than distractors.** If the correct answer needs qualification, add similar detail/qualification to distractors. Add parenthetical explanations, context, or reasoning to ALL options equally. After writing all MCQs, scan for length bias: if >50% of questions have the correct answer as the longest option, rewrite to equalize. |
| Answer position | Correct answer position varies across questions. No detectable pattern. |
| Stem completeness | Stem should be a complete question or statement. Avoid incomplete sentence stems that rely on options to make grammatical sense. |
| **Stem naturalness (Lithuanian)** | Question stems must sound natural when read aloud in Lithuanian. Avoid translated-from-English constructions (e.g., "Koks rekomenduojamas..." instead of "Koks yra rekomenduojamas..."). Test: would a Lithuanian teacher phrase the question this way verbally? If not, rephrase. |
| **Terminology precision** | Do not combine synonyms or redundant terms (e.g., "monitoriaus ekranas" where monitorius and ekranas mean the same thing). Use one term consistently. |
| **No answer hinting** | Neither the question stem nor the options may hint at the correct answer. Specific violations to avoid: (1) **Stem-answer echo:** stem and correct answer must not share distinctive words (e.g., stem says "patikimą" and correct answer says "patikimuose"). (2) **Definitional stems:** do not define the concept being asked about in the stem (e.g., "Kas yra phishing (sukčiavimas internete)?" gives away the answer). (3) **Parenthetical giveaways:** do not add explanatory parentheticals to options that reveal the selection criteria (e.g., "(raidės, skaičiai, simbolis)" tells the student why that password is strong). (4) **Absurd distractors:** every distractor must be plausible to a student who hasn't studied. If a distractor is obviously wrong to anyone (e.g., "internet slows down from long use"), it narrows the field and hints at the answer. |

---

## Short Answer / Fill-in-Blank Rules

| Rule | Details |
|------|---------|
| Scope | Specify expected length: "1-2 sakiniais paaiškinkite..." or "Parašykite bent du..." |
| Focus | One concept per question. No multi-part "and" questions. |
| Originality | Cannot be answered by copying a definition verbatim from Theory_Pack. Require application or rephrasing. |
| Marking guide | Provide acceptable answer variants in the rubric. Anticipate alternative correct phrasings. |

---

## Scenario Analysis Rules

| Rule | Details |
|------|---------|
| Realism | Scenario must be a realistic situation within the module's domain. |
| Cognitive level | Requires application of principles, not recall of definitions. |
| Justification | Use "nes..." format where the objective requires reasoning. |
| Scope | Clear constraint on expected answer length (e.g., "2-3 sakiniais"). |
| Context | Provide enough detail for the student to analyze, but no irrelevant information that misleads. |

---

## Code Task Hierarchy (Lister et al.)

Tasks must follow this progression. Never assign a higher-level task to students who haven't demonstrated the prerequisite level.

| Level | Task Type | Description | Grade Ceiling |
|-------|-----------|-------------|---------------|
| 1 | Reading | Identify what code does from description | All grades |
| 2 | Tracing | Track variable values through execution | Grade 10+ |
| 3 | Completion | Fill in marked sections of working code | Grade 10+ |
| 4 | Writing | Write a program from specification | Grade 11+ (small), Grade 12 (modular) |

**Critical rule:** Students who cannot trace at >50% accuracy are not ready to write code. Grade 10 ceiling is completion. Grade 11 starts small program writing. Grade 12 expects modular programs with functions.

### Code Task Constraints

- C++ only. No Python, no JavaScript (locked decision).
- Code completion: "Duoto kodo keisti negalima" must be stated explicitly.
- Provide compilable scaffolds with clearly marked completion zones.
- Rubric criteria: correct logic, compiles without errors, handles edge cases (grade 11+).

---

## Rubric Design Rules

| Rule | Details |
|------|---------|
| Criteria count | 3-6 criteria per practical task rubric. |
| Descriptors | Specific, observable, measurable. |
| Performance levels | 3-4 levels per criterion (aligned to competency levels). |
| Sharing | Rubric is shared with students before the assessment. |
| Bad descriptor | "Gerai supranta" (vague, not observable). |
| Good descriptor | "Teisingai identifikuoja abu kintamuosius" (specific, countable). |

### Descriptor Quality Checklist

A good descriptor answers YES to all:
1. Can you observe it in the student's work?
2. Would two teachers agree on whether it's present?
3. Does it specify quantity or quality (not just "good/bad")?

---

## Variant Generation (Testmoz Pools)

Each question pool contains 3-4 variants. Testmoz randomly selects one per student.

| Aspect | Rule |
|--------|------|
| **Change** | Names, numbers, scenario details, example data, ordering of concepts, option ordering |
| **Keep identical** | Structure, cognitive demand, distractor logic, point value, competency level |
| **Never** | Change the concept being tested. Make one variant obviously easier/harder. Reuse the same distractor text across variants. |

### Variant Quality Check

For each pool, verify:
- All variants test the same learning objective
- Difficulty is equivalent (not just "similar")
- A student who masters the concept would answer any variant correctly
- A student with the target misconception would choose the distractor in any variant
