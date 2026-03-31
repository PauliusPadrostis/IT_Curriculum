# Theory Pack — Quality Checklist

Run this AFTER content is fully drafted. This is a separate pass.

---

## Phase 1: Grammar Check

### Declensions (7 cases — most common AI errors)

- **Kilmininkas (gen.):** "pagal higienos normą" (specific norm) vs.
  "higienos normų reikalavimai" (plural genitive for requirements)
- **Galininkas (acc.):** "naudokite kompiuterį" (direct object, not
  nominative "kompiuteris")
- **Įnagininkas (instr.):** "dirbti kompiuteriu" (prefer instrumental
  over "su kompiuteriu" in formal text)
- **Vietininkas (loc.):** "mokykloje" (full form, not shortened "mokykloj")

### Verb forms

- Present tense for descriptions: "ergonomika tiria"
- Imperative for tips: "patikrinkite" (direct, natural for students)
- Conditional for hypotheticals: "ką darytumėte, jei...?"
- Consistent "jūs" form throughout (formal/plural)

### Agreement

- Adjective gender matches noun: "taisyklinga laikysena" (f.),
  "taisyklingas sėdėjimas" (m.)
- Plural: "ergonominiai reikalavimai" (m. pl.)

### Common AI errors in Lithuanian

- Missing soft sign: "žinių" not "žiniu"
- Wrong genitive plural: "kompiuterių" not "kompiuterų"
- **Phantom extra vowel before ending:** "dažniausiuų" instead of
  "dažniausių", "įrodymuų" instead of "įrodymų". After writing any
  declined form, re-read the stem letter-by-letter to confirm no extra
  vowels were inserted.
- **Wrong locative stem vowel:** "pozėje" (from "pozė"?) instead of
  "pozoje" (from "poza"). Always verify the nominative form before
  building the locative — the locative preserves the stem vowel
  (a→oje, as→e, is→yje, us→uje, ė→ėje).
- **Hallucinated verb forms:** "domėjiesės" is not a real Lithuanian
  word. AI often generates plausible-looking but non-existent
  conjugations, especially for reflexive verbs and "tu" forms. For any
  verb form you are not 100% certain about, web-search the exact form
  in quotes. If zero results → it does not exist.
- Confusion of -imas/-ymas suffixes
- Wrong reflexive forms: "mokytis" vs. "mokyti"
- Wrong case after prepositions: "dėl + gen." not "dėl + acc."

### Register consistency

- Main body uses **"jūs"** (formal/plural) throughout
- "Sužinok daugiau" section uses **"tu"** (informal) — this is
  intentional (inviting, personal tone for optional exploration)
- **Never mix registers within the same section.** If a section starts
  with "jūs", every verb in that section must be "jūs" form.

---

## Phase 2: Naturalness Check

### English calques to catch and fix

| Wrong (calque) | Correct |
|----------------|---------|
| daryti prasmę | turėti prasmės |
| daryti sprendimą | priimti sprendimą |
| pagal nutylėjimą | numatytasis (IT) |
| aplikacija | programėlė, taikomoji programa |
| klikinti | spustelėti, paspausti |
| downloadinti | atsisiųsti |
| loginintis | prisijungti |
| passwordas | slaptažodis |
| updateinti | atnaujinti |
| deletinti | ištrinti, pašalinti |
| forwardinti | persiųsti |

### The "nobody says it" test

| Awkward but correct | Natural alternative |
|--------------------|---------------------|
| kaitaliokite | keiskite, darykite pakaitomis |
| pastarasis | šis (when "most recent") |
| vykdykite | atlikite, darykite |
| tinkamiausias | geriausias (when "best") |
| atžvilgiu | požiūriu (lighter) |

### Word order

- Don't start with long prepositional phrases (English habit)
- Important info goes at sentence END (rhematic position)
- Break relative clauses >15 words into two sentences
- Bad: "Pagal 2025 m. JAMA tyrimo duomenis, rizika..."
- Good: "Rizika didėja — tai rodo 2025 m. JAMA tyrimas."

### Register

- GOOD: clear, confident teacher voice
- BAD: academic ("tad galima teigti, kad...")
- BAD: childish ("žiūrėkite, kaip įdomu!")
- Target: 12–20 words per sentence, max 25

### Web verification for uncertain phrases

When you are less than 90% confident a Lithuanian phrase is natural:

1. **Search the exact phrase in quotes** on the web (e.g., "darbo ir
   poilsio režimas")
2. **Check results:**
   - Many hits from quality Lithuanian sites (lrt.lt, vle.lt, gov.lt,
     university sites) → phrase is natural, keep it
   - Few or zero hits → phrase is likely unnatural or a calque. Reformulate.
   - Hits only from AI-generated content or SEO sites → not reliable
3. **For technical terms:** search `site:vle.lt "term"` to check if VLE
   uses this exact form
4. **For verb+preposition combos:** search to verify the preposition
   takes the right case with that verb

This is the single most effective technique for catching unnatural Lithuanian.
Use it liberally.

---

## Phase 3: Content Verification Checklist

- [ ] Every curriculum sub-topic has a section
- [ ] No main-text content exceeds curriculum scope
- [ ] Terminology matches informatika_programa.md
- [ ] Achievement levels align with self-check questions
- [ ] All claims supported by cited sources
- [ ] No source older than 5 years (unless a standard like HN 32:2004)
- [ ] At least 1 Lithuanian source
- [ ] All document sections present (Įvadas through Šaltiniai)
- [ ] Term table: 5–10 entries, bilingual format
- [ ] Self-check: 7–8 questions, graduated difficulty
- [ ] Self-check questions do not leak answers to Student_Task scenarios or exercises (check process, not outcome)
- [ ] "Sužinok daugiau" has 2–4 current-topic resources (free, accessible)
- [ ] Spell-checker passes with no issues

---

## Phase 4: Flag Report for Teacher

```
--- TIKRINIMO ATASKAITA ---
Šaltiniai: X iš Y lietuviški
Terminologija: [OK | Neaiškių terminų — žr. sąrašą]
Gramatika: [OK | Pataisyta N vietų]
Papildomas turinys: [N "Ar žinojai?" intarpų]
Diagramos: [Įdėta N | N vietos žymeklių]
Pastabos mokytojui: [jei yra]
```
