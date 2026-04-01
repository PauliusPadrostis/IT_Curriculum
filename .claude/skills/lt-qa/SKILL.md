---
name: lt-qa
description: >
  Standalone Lithuanian language quality assurance tool. Triggers when the user
  pastes Lithuanian text for review, says "patikrink lietuviškai", "check
  Lithuanian", "fix the grammar", "peržiūrėk tekstą", or flags a specific
  mistake. Covers grammar, morphology, punctuation, terminology (VLKK-based),
  audience-appropriate complexity, anglicism detection, and elimination of
  AI-generated text patterns.
---

# Lithuanian Language QA (Standalone)

Reviews Lithuanian text for correctness, natural phrasing, audience fit, and
AI pattern contamination. The user provides text, this skill checks it and
reports findings with corrections.

---

## Trigger Conditions

Activate this skill when the user:
- Says "patikrink lietuviškai", "check Lithuanian", "fix the grammar",
  "peržiūrėk tekstą"
- Pastes Lithuanian text and asks for review or correction
- Flags a specific Lithuanian language mistake

---

## Review Procedure

### Step 0: Load Resources

1. Read `_references/lt-mistakes.yaml` (full file, both sections).
2. Read `references/ai-patterns.md`.
3. Read `references/audience-calibration.md`.
4. Determine the target audience from context (see audience-calibration.md
   detection rules). If unclear, ask the user.

### Step 1: Mistake Library Scan

Compare every word and phrase in the provided text against the loaded mistake
library. For each match:
- Fix it in the corrected output.
- Log the fix for the report.

### Step 2: Grammar & Morphology Check

Scan for these specific Lithuanian error categories:

**Case endings** -- verify agreement between:
- Adjective and noun (gender, number, case)
- Subject and predicate (number, gender in past tense)
- Preposition and governed case (e.g., "del" + genitive, "su" + instrumental)

**Verb forms** -- verify:
- Correct conjugation class (1st, 2nd, 3rd)
- Correct tense suffix (present, past, future)
- Imperative mood: -ite (not -ete) for 2nd person plural
- Reflexive forms: prefix placement and vowel correctness

**Common morphological traps** -- specifically watch for:
- Diphthong errors in suffixes (ei/e, ai/e, au/u)
- Nosines (a, e, i, u with ogoneks) in wrong positions
- Superlative formation (-iausias, not -ausias for soft-stem adjectives)

### Step 3: Punctuation Audit

- **Em dash:** search-and-destroy. Replace every instance with appropriate
  alternative (comma, period, colon, or sentence restructure). Zero tolerance.
- **En dash:** allowed ONLY in number/date ranges. Remove all other uses.
- **Semicolons:** remove unless genuinely joining two independent but tightly
  related clauses. Default: split into two sentences.
- **Comma rules** (Lithuanian-specific):
  - Before kad, kuris/kuri, nes, bet, o (conjunction): required.
  - After taciau/kadangi at sentence start: NOT allowed.
  - Between homogeneous parts: required.
  - Before ir connecting two independent clauses: required.
- **Periods:** verify every sentence ends with one (or ? or !).
- **Quotation marks:** straight double quotes "..." only. No Lithuanian
  low-high marks, no guillemets.

### Step 4: AI Pattern Elimination

Run through the full checklist from `references/ai-patterns.md`:

- [ ] No em dashes anywhere
- [ ] No formulaic openings ("Siame skyriuje...", "Svarbu pazymeti...")
- [ ] No triad patterns (X, Y ir Z parallel constructions repeated)
- [ ] No transition word stuffing (max 2 of "Be to/Taip pat/Taciau/Todel"
      per page)
- [ ] No hedging ("Galima teigti...", "Tam tikra prasme...")
- [ ] No generic praise filler ("Puiku!", "Sveikiname!")
- [ ] No uniform paragraph lengths -- deliberately vary
- [ ] No rigid SVO word order in every sentence -- vary
- [ ] Sentence length variation exists (mix short punchy with longer ones)
- [ ] No elegant variation (saying "kintamasis" then switching to "reiksme"
      for the same concept just to avoid repetition)

### Step 5: Audience Calibration

Apply the rules from `references/audience-calibration.md` for the detected
audience:

- Check average sentence length against grade limit
- Flag vocabulary that exceeds grade-appropriate complexity
- Verify technical term introduction pattern matches grade level
- Check instruction granularity (one action per step for grade 9, etc.)

### Step 6: VLKK Terminology Check

Scan for anglicisms and non-VLKK IT terminology. Refer to the terminology
table in `references/ai-patterns.md` section 5. Replace unless the teacher
has expressed a specific preference stored in the mistake library.

### Step 7: Final Natural-Read Test

Read the text as if you were the target audience. Ask:
- Does any sentence sound "translated from English"?
- Does any sentence sound unnecessarily complex for the audience?
- Would a Lithuanian teacher reading this aloud stumble on any phrasing?
- Does the text flow naturally from paragraph to paragraph?

Fix anything that fails this test. This step catches issues the mechanical
checks miss.

---

## Reporting

Present corrections as a table:

```
| Eilute | Buvo | Tapo | Kategorija |
|--------|------|------|------------|
| 3 | pakeitete | pakeitete | morfologija |
| 7 | -- | , | skyrybos zenklas |
```

Below the table, note any stylistic suggestions separately (these are
recommendations, not errors).

---

## Mistake Library Management

### When a new mistake is found during review

If a correction was made that does NOT already exist in the loaded library:
- Note it as a candidate for the library.
- After presenting results, ask:
  "Radau nauja klaidu sablona: [wrong] -> [correct]. Ar itraukti i klaidu
  biblioteka?"
- If user confirms, append to `_references/lt-mistakes.yaml`.

### When the user flags a mistake

The user may flag mistakes in any format:
- "That's wrong, it should be X"
- "lt-fix: pakeitete -> pakeitete"
- "cia klaida"
- Simply correcting inline

Regardless of format:
1. Identify the wrong->correct pair.
2. Categorize it (morphology, calque, spelling, punctuation, register,
   preference).
3. Confirm with user: "Itraukiu i klaidu biblioteka: [wrong] -> [correct]
   ([category]). Gerai?"
4. On confirmation, append to `_references/lt-mistakes.yaml`.

Format for new entries:
```yaml
- wrong: "incorrect form"
  correct: "correct form"
  category: morphology|calque|spelling|punctuation|register|preference
  note: "explanation"
  source: "auto-detected|user-flagged"
  date: "YYYY-MM-DD"
```

---

## Critical Rules (Never Violate)

1. **Em dash = death.** There is no valid use case. Replace every instance.
2. **The mistake library is canonical.** If it says X->Y, do X->Y. No
   exceptions.
3. **VLKK is the baseline.** Teacher preferences override VLKK only when
   explicitly stored in the library with category "preference".
4. **Student materials use formal "jus".** Always. No exceptions.
5. **Never generate motivational fluff.** Students don't need to be told
   "Puiku!" by a worksheet. Just give instructions.
6. **When in doubt, shorter sentences win.** Especially for grades 9-10.
7. **Self-learning is mandatory.** Every new mistake pattern found or flagged
   must be offered for library inclusion. The library grows over time.
