# AI-Generated Text Patterns — Lithuanian Context

This reference lists structural and lexical patterns that betray AI-generated
Lithuanian text. The QA pass must detect and eliminate all of these.

---

## 1. Banned Punctuation

| Pattern | Rule |
|---------|------|
| Em dash `—` | **Absolute ban.** Replace with comma, period, colon, or restructure the sentence. No exceptions. |
| En dash `–` used as em dash | Same rule. En dashes are only acceptable in number ranges (pvz., 2024–2025). |
| Semicolons between simple clauses | Restructure into two sentences or use a conjunction. Semicolons are a strong AI tell. |

---

## 2. Structural Tells

### Paragraph uniformity
AI produces paragraphs of nearly identical length. Vary paragraph length
deliberately: some 1-sentence, some 3-4 sentences. Educational materials
especially benefit from short, punchy paragraphs.

### Formulaic openings
Ban these sentence starters in Lithuanian educational materials:

- "Šiame skyriuje..." / "Šioje pamokoje..." — too meta, tells the student
  what they're about to read instead of just saying it.
- "Svarbu pažymėti, kad..." / "Verta paminėti, kad..." — filler. Delete
  and state the important thing directly.
- "Kaip jau minėjome..." — AI loves to reference itself. Remove unless
  there's a genuine cross-reference.
- "Apibendrinant..." / "Apibendrinimas" — AI conclusions are bloated
  restatements. Conclusions should add, not repeat.

### The "triad" pattern
AI loves grouping things in threes with parallel structure:
- "X yra svarbus, naudingas ir reikalingas."
- "Tai padeda mokytis, tobulėti ir augti."

This is a dead giveaway. Break parallel triads. Use two items, or four, or
restructure entirely.

### Correlative conjunction overuse
Lithuanian AI text overuses "tiek...tiek", "ne tik...bet ir", "arba...arba"
in repetitive patterns. Use these naturally, not as structural crutches.

### Transition word stuffing
AI overuses: "Be to", "Taip pat", "Vis dėlto", "Tačiau", "Todėl" as
sentence starters. Limit to max 2 per page. Prefer implicit transitions
through sentence flow.

---

## 3. Lexical Tells

### Pompous vocabulary in student materials
AI defaults to formal/academic Lithuanian even for 9th graders. Flag and
replace:

| AI tends to write | Natural Lithuanian alternative |
|-------------------|-------------------------------|
| "įgyvendinti" | "padaryti / sukurti / atlikti" |
| "optimizuoti" | "patobulinti / pagerinti" |
| "funkcionalumas" | "galimybės / veikimas" |
| "implementuoti" | "įdiegti / pritaikyti" |
| "konceptas" | "sąvoka / idėja" |
| "integruoti" | "sujungti / prijungti" |
| "parametras" | "nustatymas / reikšmė" |

Exception: IT-specific terms that students must learn (pvz., "funkcija",
"kintamasis", "masyvas") should stay as-is. The rule targets unnecessary
pomposity, not legitimate technical vocabulary.

### Generic praise / filler
AI inserts motivational fluff. Nuke:
- "Puiku! Dabar galite..."
- "Sveikiname! Jūs sėkmingai..."
- "Tai puiki pradžia!"
- Any sentence that praises the student for nothing.

### Hedging language
AI hedges to avoid commitment. In educational materials, be direct:

| Hedged (bad) | Direct (good) |
|--------------|---------------|
| "Galima teigti, kad..." | Just state the fact. |
| "Tam tikra prasme..." | Delete. |
| "Vienaip ar kitaip..." | Delete. |
| "Galėtų būti naudinga..." | "Naudinga..." |

---

## 4. Lithuanian-Specific Grammar Traps

### Case ending errors
AI frequently produces wrong case endings, especially:
- Genitive plural (-ų vs -ių): watch nouns/adjectives carefully
- Instrumental singular (-u vs -umi for some declensions)
- Locative (-yje vs -uje): depends on stem vowel

### Verb conjugation errors
Most common: wrong vowel in 2nd/3rd conjugation past tense and imperative
forms. The seed-mistakes.yaml contains known examples. Every new one found
must be appended.

### Word order
Lithuanian has flexible word order, but AI defaults to rigid SVO (Subject-
Verb-Object) every sentence. Vary word order:
- Start some sentences with the verb
- Use inverted order for emphasis
- Place time/place adverbs at sentence start naturally

### Comma rules (Lithuanian-specific)
- Before "kad" (that): always comma
- Before "kuris/kuri" (which/who): always comma
- Before "nes" (because): always comma
- Before "bet" (but): always comma
- After "tačiau" at sentence start: NO comma (common AI error)
- After "kadangi" at sentence start: NO comma (common AI error)
- Between homogeneous parts: comma required

---

## 5. VLKK Terminology Preferences

For IT/CS terminology, follow VLKK (Valstybinė lietuvių kalbos komisija)
recommendations as the baseline:

| English | VLKK-preferred Lithuanian | Common but incorrect |
|---------|--------------------------|---------------------|
| file | failas / rinkmena | failas is acceptable |
| folder | aplankas | folderis |
| browser | naršyklė | brauzėris |
| website | svetainė | vebsaitas |
| download | atsisiųsti | parsisiųsti (acceptable variant) |
| upload | įkelti | uploadinti |
| password | slaptažodis | passwordas |
| software | programinė įranga | softas |
| hardware | aparatinė įranga | hardas |
| link | nuoroda / saitas | linkas |
| update | atnaujinimas / atnaujinti | updateas |
| bug | klaida / triktis | bagas |
| database | duomenų bazė | duombazė (informal, avoid) |
| variable | kintamasis | (correct as-is) |
| function | funkcija | (correct as-is) |
| array | masyvas | (correct as-is) |
| loop | ciklas | (correct as-is) |
| string | eilutė / simbolių eilutė | stringas |
| integer | sveikasis skaičius | integeris |
| boolean | loginis tipas / loginė reikšmė | booleanas |
| compile | kompiliuoti | (correct as-is) |
| debug | derinti / šalinti klaidas | debuginti |

When the teacher has expressed a preference that differs from VLKK, the
teacher's preference wins. Store these in the GitHub mistake library under
category "preference".
