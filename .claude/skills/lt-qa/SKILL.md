---
name: lt-qa
description: >
  Lithuanian language quality assurance for all generated Lithuanian text. This
  skill MUST be used whenever Lithuanian text is being generated — by any other
  skill (lesson-plan-gen, student-task-gen, theory-pack-gen, lesson-readme-gen)
  or ad-hoc. It runs in two phases: PRE-GEN (load mistake library and rules
  before writing) and POST-GEN (structured review after writing). Also triggers
  as a standalone correction tool when the user pastes Lithuanian text for
  review, says "patikrink lietuviškai", "check Lithuanian", "fix the grammar",
  "peržiūrėk tekstą", or flags a specific mistake. Covers grammar, morphology,
  punctuation, terminology (VLKK-based), audience-appropriate complexity,
  anglicism detection, and elimination of AI-generated text patterns. If
  Lithuanian is involved in any way — generation, correction, or review — this
  skill must be consulted.
---

# Lithuanian Language QA

Ensures all generated Lithuanian text is grammatically correct, naturally
phrased, audience-appropriate, and free of AI-generated text patterns.

This skill operates in two modes that work together:

- **Dependency mode** — other Lithuanian-generating skills load this skill's
  rules before and after generation.
- **Standalone mode** — user provides Lithuanian text for review and correction.

---

## Phase 1: PRE-GEN (Before Writing)

Load these resources into working memory before generating any Lithuanian text:

1. Read the mistake library from the repo: `lt-qa/lt-mistakes.yaml` (single source of truth).
   If the local file is unavailable, fetch from GitHub as fallback:
   ```
   https://raw.githubusercontent.com/PauliusPadrostis/IT_Curriculum/main/lt-qa/lt-mistakes.yaml
   ```
   Do not halt generation if both fail.
3. Read `references/ai-patterns.md` — the AI text pattern elimination rules.
4. Read `references/audience-calibration.md` — grade-level complexity rules.
5. Determine the target audience from context (see audience-calibration.md
   detection rules).

With these loaded, actively avoid every mistake in the library while writing.
This is preventive: the model knows its own weak spots and steers around them.

---

## Phase 2: POST-GEN (After Writing)

After the Lithuanian text is complete (whether in a .docx, .md, or plain
text), perform a structured review pass. This is a mandatory checklist, not
optional self-reflection.

### Step 1: Mistake Library Scan

Compare every word and phrase in the generated text against the loaded mistake
library (both seed and GitHub-fetched). For each match:
- Fix it silently in the output.
- Log the fix (for later library update if it was a new pattern).

### Step 2: Grammar & Morphology Check

Scan for these specific Lithuanian error categories:

**Case endings** — verify agreement between:
- Adjective and noun (gender, number, case)
- Subject and predicate (number, gender in past tense)
- Preposition and governed case (e.g., "dėl" + genitive, "su" + instrumental)

**Verb forms** — verify:
- Correct conjugation class (1st, 2nd, 3rd)
- Correct tense suffix (present, past, future)
- Imperative mood: -ite (not -ėte) for 2nd person plural
- Reflexive forms: prefix placement and vowel correctness

**Common morphological traps** — specifically watch for:
- Diphthong errors in suffixes (ei/ė, ai/ė, au/ū)
- Nosinės (ą, ę, į, ų) in wrong positions
- Superlative formation (-iausias, not -ausias for soft-stem adjectives)

### Step 3: Punctuation Audit

- **Em dash (—):** search-and-destroy. Replace every instance with appropriate
  alternative (comma, period, colon, or sentence restructure). Zero tolerance.
- **En dash (–):** allowed ONLY in number/date ranges. Remove all other uses.
- **Semicolons:** remove unless genuinely joining two independent but tightly
  related clauses. Default: split into two sentences.
- **Comma rules** (Lithuanian-specific):
  - Before kad, kuris/kuri, nes, bet, o (conjunction): required.
  - After tačiau/kadangi at sentence start: NOT allowed.
  - Between homogeneous parts: required.
  - Before ir connecting two independent clauses: required.
- **Periods:** verify every sentence ends with one (or ? or !).
- **Quotation marks:** Lithuanian uses „..." (lower-upper), not "..." or «...».

### Step 4: AI Pattern Elimination

Run through the full checklist from `references/ai-patterns.md`:

- [ ] No em dashes anywhere
- [ ] No formulaic openings ("Šiame skyriuje...", "Svarbu pažymėti...")
- [ ] No triad patterns (X, Y ir Z parallel constructions repeated)
- [ ] No transition word stuffing (max 2 of "Be to/Taip pat/Tačiau/Todėl" per page)
- [ ] No hedging ("Galima teigti...", "Tam tikra prasme...")
- [ ] No generic praise filler ("Puiku!", "Sveikiname!")
- [ ] No uniform paragraph lengths — deliberately vary
- [ ] No rigid SVO word order in every sentence — vary
- [ ] Sentence length variation exists (mix short punchy with longer ones)
- [ ] No elegant variation (saying "kintamasis" then switching to "reikšmė"
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

## Standalone Correction Mode

When the user provides Lithuanian text for review (not through another skill):

1. Load the mistake library (same as PRE-GEN phase).
2. Run all POST-GEN steps on the provided text.
3. Present corrections as a table:

```
| Eilutė | Buvo | Tapo | Kategorija |
|--------|------|------|------------|
| 3 | pakėitėte | pakeitėte | morfologija |
| 7 | — | , | skyrybos ženklas |
```

4. Below the table, note any stylistic suggestions separately (these are
   recommendations, not errors).

---

## Mistake Library Management

### When Claude finds a new mistake during POST-GEN

If a correction was made that does NOT already exist in the loaded library:
- Note it internally as a candidate for the library.
- After presenting results to the user, ask:
  "Radau naują klaidų šabloną: [wrong] → [correct]. Ar įtraukti į klaidų
  biblioteką?"
- If user confirms, append to the GitHub file via the skill's update protocol.

### When the user flags a mistake

The user may flag mistakes in any format:
- "That's wrong, it should be X"
- "lt-fix: pakėitėte → pakeitėte"
- "čia klaida"
- Simply correcting inline

Regardless of format:
1. Identify the wrong→correct pair.
2. Categorize it (morphology, calque, spelling, punctuation, register, preference).
3. Confirm with user: "Įtraukiu į klaidų biblioteką: [wrong] → [correct] ([category]). Gerai?"
4. On confirmation, append to GitHub file.

### Updating the GitHub mistake library

The live library lives at:
```
github.com/PauliusPadrostis/IT_Curriculum/lt-qa/lt-mistakes.yaml
```

To update, generate the YAML entry in correct format and either:
- If the user has GitHub tools available: commit directly.
- If not: present the YAML snippet for the user to add manually.

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

## Integration with Other Skills

Other Lithuanian-generating skills should include these instructions at
their appropriate points:

**At the start of generation (add to Step 0 or equivalent):**
```
Before generating Lithuanian text, read the lt-qa skill:
/mnt/skills/user/lt-qa/SKILL.md
Follow Phase 1 (PRE-GEN) to load the mistake library and rules.
```

**After generation is complete (add as final step):**
```
After generating the Lithuanian .docx file, run Phase 2 (POST-GEN)
from the lt-qa skill on the generated content. Fix all issues found
before presenting the file to the user.
```

Skills that need this integration:
- student-task-gen
- lesson-plan-gen
- theory-pack-gen
- lesson-readme-gen

---

## Critical Rules (Never Violate)

1. **Em dash = death.** There is no valid use case. Replace every instance.
2. **The mistake library is canonical.** If it says X→Y, do X→Y. No exceptions.
3. **VLKK is the baseline.** Teacher preferences override VLKK only when
   explicitly stored in the library with category "preference".
4. **Student materials use formal "jūs".** Always. No exceptions.
5. **Never generate motivational fluff.** Students don't need to be told
   "Puiku!" by a worksheet. Just give instructions.
6. **When in doubt, shorter sentences win.** Especially for grades 9-10.
7. **Self-learning is mandatory.** Every new mistake pattern found or flagged
   must be offered for library inclusion. The library grows over time.
8. **POST-GEN is not optional.** Even if PRE-GEN was perfect, run the review.
   The same brain that wrote it has blind spots — the checklist compensates.
