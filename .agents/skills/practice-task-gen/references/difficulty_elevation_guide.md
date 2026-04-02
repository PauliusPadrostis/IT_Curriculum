# Difficulty Elevation Guide

Defines how to elevate A (assessment) questions into harder P (practice) versions.
Used by the practice-task-gen skill when building the A/P question pair table.

---

## Core Principles

- Every P question must be at least as difficult as its paired A question. P cannot be easier.
- Elevation is per-question, not blanket. Each row gets its own technique.
  Do not apply the same technique to every question in a set.
- Elevated questions must still be answerable by a prepared student.
  Harder, not unfair. If a student who studied the material could not reasonably
  answer the P question, the elevation is too aggressive.
- Teacher approves each A/P row before the practice document is generated.
  Never silently substitute or auto-approve elevations.

---

## Technique 1: Bloom's +1

Shift the cognitive demand up one level on Bloom's taxonomy.
The stem changes to require a higher-order operation on the same content.

### Transition table

| From | To | Stem change |
|------|----|-------------|
| Remember | Understand | „Kas yra..." → „Paaiškinkite, kodėl..." |
| Understand | Apply | „Paaiškinkite..." → „Pritaikykite šią taisyklę situacijoje..." |
| Apply | Analyze | „Pritaikykite..." → „Palyginkite du metodus ir nustatykite..." |
| Analyze | Evaluate | „Palyginkite..." → „Įvertinkite, kuris sprendimas geresnis, ir pagrįskite..." |

### MCQ examples

**Remember → Understand**

A version:
> Kas yra ergonomiška darbo vieta?
> A. Darbo vieta, kuri atrodo moderni
> B. Darbo vieta, pritaikyta žmogaus kūno poreikiams
> C. Darbo vieta su naujausiu kompiuteriu
> D. Darbo vieta su daug vietos

P version:
> Mokinys, sėdintis prie kompiuterio, po kelių valandų jaučia nugaros skausmą.
> Kuris paaiškinimas geriausiai apibūdina priežastį?
> A. Kompiuteris yra per senas
> B. Kėdė ir stalas nėra pritaikyti jo kūno matmenims
> C. Kambarys yra per šaltas
> D. Mokinys dirba per ilgai be pertraukos

**Understand → Apply**

A version:
> Paaiškinkite, kas yra slaptažodžių valdyklis (password manager).

P version:
> Jūsų draugas naudoja tą patį slaptažodį visoms paskyroms, nes bijosi pamiršti.
> Kaip jam pritaikytumėte slaptažodžių valdyklio principą, kad tai išspręstų jo problemą?
> Atsakykite 2–3 sakiniais.

**Apply → Analyze**

A version:
> Pritaikykite dviejų veiksnių autentifikacijos taisyklę: aprašykite, kaip
> prisijungtumėte prie paskyros, kuri ją naudoja.

P version:
> Palyginkite dviejų veiksnių autentifikaciją per SMS žinutę ir per autentifikatoriaus
> programėlę. Nustatykite, kuris metodas yra saugesnis, ir paaiškinkite kodėl.
> Atsakykite 3–4 sakiniais.

**Analyze → Evaluate**

A version:
> Palyginkite belaidį ir laidinį interneto ryšį pagal greitį ir patikimumą.

P version:
> Mokykloje planuojama įrengti naują kompiuterių klasę. Įvertinkite, ar labiau
> tiktų belaidis, ar laidinis ryšys, ir pagrįskite sprendimą dviem argumentais.

### Short answer examples

A: „Kas yra atsarginė kopija (backup)?"
P: „Paaiškinkite, kodėl vien tik vienintelė atsarginė kopija tame pačiame įrenginyje
   nėra pakankama apsauga. Atsakykite 2 sakiniais."

### Code task examples (C++ only)

A (Remember/Understand): Perskaitykite kodą ir pasakykite, ką daro kintamasis `sum`.
P (Apply/Analyze): Šiame kode yra klaida: pakeistas sąlygos operatorius. Nustatykite,
  kur yra klaida, paaiškinkite, ką ji sukelia, ir parašykite teisingą eilutę.

---

## Technique 2: Added Complexity

Keep the same Bloom's level but make the question harder by adding a layer:
a distractor, a justification requirement, an edge case, or a constraint.

### MCQ

- Add a 4th plausible distractor if A had 3. The new option must come from
  a real misconception, not a clearly wrong guess.
- Make distractors closer to the correct answer. Vague, absurd, or obviously
  unrelated distractors make correct answers easier to spot by elimination.
- Add a „partially correct" option that is true in some contexts but not the
  specific context of the stem. Forces precise understanding.

**Example**

A version (3 options):
> Koks yra rekomenduojamas atstumas nuo akių iki monitoriaus ekrano?
> A. 30–40 cm
> B. 50–70 cm
> C. 100–120 cm

P version (4 options, closer distractors):
> Koks yra rekomenduojamas atstumas nuo akių iki monitoriaus ekrano?
> A. 40–50 cm
> B. 50–70 cm
> C. 70–90 cm
> D. 90–110 cm

### Short answer

Require justification with „nes" or „todėl, kad" instead of accepting a bare fact.

A: „Kokio ilgio turėtų būti saugus slaptažodis?"
P: „Kodėl rekomenduojama, kad slaptažodis būtų bent 12 simbolių ilgio? Atsakykite
   1–2 sakiniais, nurodydami tikrąją priežastį."

### Code task (C++ only)

- Add an edge case the student must identify and handle (e.g. division by zero,
  loop that never terminates, array index out of bounds).
- Increase variable count or introduce a second function.
- Insert a subtle bug (off-by-one, wrong operator, uninitialized variable) for
  the student to find.

**Example**

A version:
```cpp
int suma = 0;
for (int i = 1; i <= 5; i++) {
    suma += i;
}
cout << suma;
```
Paaiškinkite, kokią reikšmę išveda ši programa.

P version:
```cpp
int suma = 0;
for (int i = 1; i < 5; i++) {
    suma += i;
}
cout << suma;
```
Šiame kode yra klaida: programa turėtų susumuoti skaičius nuo 1 iki 5, bet
nesumuoja teisingai. Nurodykite, kurioje eilutėje yra klaida, paaiškinkite,
ką ji sukelia, ir parašykite teisingą eilutę.

### Practical task

Add a constraint: time limit, required format, tool restriction, or mandatory
element count.

A: „Sukurkite aplanką ir išsaugokite jame tekstinį failą."
P: „Sukurkite aplanką pavadinimu „Ataskaita". Jame išsaugokite tekstinį failą
   su bent trimis ergonomikos taisyklėmis, surašytomis sunumeruotu sąrašu.
   Naudokite tik Notepad."

---

## Technique 3: Composite Questions

Merge two separate A objectives into one P question. The student must
demonstrate both competencies in a single coherent answer.

### Rule

Maximum 2 objectives per composite. Three or more objectives in one question
produces an unfocused task where partial credit becomes ambiguous and weak
students cannot identify which gap they need to close.

### How to merge

1. Identify two A questions that cover related but distinct skills.
2. Write a single scenario or prompt that genuinely requires both.
3. Confirm the merged question can be answered in the scope hint (2–4 sentences
   or a short list). If it requires more, the objectives are too far apart to merge.

### Example

A question 1: „Išvardykite tris ergonomikos taisykles kompiuterio vartotojui."
A question 2: „Koks yra rekomenduojamas monitoriaus aukštis?"

P composite: „Aprašykite taisyklingai įrengtą darbo vietą: nurodykite, kaip
turėtų būti išdėstytas monitorius, kėdė ir klaviatūra, ir paaišinkite, kodėl
kiekvienas elementas yra svarbus. Atsakykite 3–5 sakiniais arba sunumeruotu sąrašu."

### Another example (data safety)

A question 1: „Kas yra atsarginė kopija?"
A question 2: „Kur rekomenduojama saugoti atsargines kopijas?"

P composite: „Paaiškinkite, kaip teisingai atlikti atsarginę kopiją: ką kopijuoti,
kur saugoti ir kodėl tokia tvarka apsaugo duomenis. Atsakykite 3–4 sakiniais."

---

## Technique 4: Context Shift

Keep the same concept and cognitive level. Change the scenario to one that
is unfamiliar but still within grade-appropriate knowledge.

The student must apply the same principle in a new setting, which tests whether
they understand the rule or just memorized the example from the lesson.

### Rule

Stay within the same knowledge domain. Do not introduce new tools, environments,
or technical concepts that were not covered at the student's grade level.

- Grade 9: contexts must assume zero prior computer experience. A context shift
  moves from classroom to home, not from classroom to network administration.
- Grade 10+: basic file and OS skills are assumed. Contexts can include slightly
  more technical settings (shared drive, school network folder).

### Examples

**Safety topic**

A: „Klasės kompiuteryje matote atvirą kito mokinio paskyrą. Ką turėtumėte daryti?"
P: „Namuose naudojatės šeimos kompiuteriu ir pastebite, kad kitas šeimos narys
   paliko atidarytą savo el. pašto paskyrą. Ką turėtumėte daryti ir kodėl?
   Atsakykite 2–3 sakiniais."

**Ergonomics topic**

A: „Apibūdinkite taisyklingą sėdėjimo pozą prie mokyklos kompiuterio."
P: „Jūsų tėvai dirba namuose prie nešiojamo kompiuterio, padėto ant sofos.
   Nurodykite, kurios ergonomikos taisyklės yra pažeidžiamos šioje situacijoje,
   ir pasiūlykite bent du patobulinimus. Atsakykite 3–4 sakiniais."

**Code task (C++ only)**

A: Klasėje buvo mokyta programa, kuri skaičiuoja dviejų skaičių sumą.
   Perskaitykite kodą ir pasakykite, ką daro kintamasis `rezultatas`.

P: Ta pati struktūra, bet programa skaičiuoja vidurkį, o ne sumą (nepažįstama
   operacija, ta pati kodo skaitymo užduotis).
   Perskaitykite kodą ir pasakykite, kokią reikšmę programa išveda, jei
   vartotojas įveda skaičius 8 ir 4.

**MCQ context shift**

A: „Kuris iš šių veiksmų padeda apsaugoti klasės kompiuterį?
   A. Palikti kompiuterį įjungtą, kai jis nenaudojamas
   B. Atsijungti nuo paskyros prieš išeinant
   C. Naudoti tą patį slaptažodį visoms paskyroms
   D. Išjungti antivirusinę programą, nes ji lėtina kompiuterį"

P: „Bibliotekoje viešuoju kompiuteriu naudojasi daug žmonių. Kuris iš šių
   veiksmų yra svarbiausias prieš paliekant kompiuterį?
   A. Uždaryti naršyklės langą
   B. Atsijungti nuo visų paskyrų ir išvalyti naršymo istoriją
   C. Išjungti monitorių
   D. Sumažinti ekrano ryškumą"

---

## Constraints

The following constraints apply to all elevated questions, regardless of technique.

### Language and format

- All elevated questions follow the same Lithuanian language rules as A questions:
  formal „jūs" address, „..." quotation marks, no em dashes.
- MCQ quality rules from `question_design.md` apply without exception:
  - 3–4 options per MCQ question.
  - Distractors from real misconceptions.
  - No „all of the above" or „none of the above".
  - Answer length equalization: the correct answer must not be systematically longer.
  - No answer hinting: no stem-answer echo, no definitional stems, no parenthetical
    giveaways, no absurd distractors.
  - Natural Lithuanian question stems (copula „yra" required where needed).

### Code tasks

- C++ only. No Python, no JavaScript, no pseudocode as a substitute for real code.
- Follow the code task hierarchy from `question_design.md`:
  - Level 1 Reading: all grades.
  - Level 2 Tracing: Grade 10 and above.
  - Level 3 Completion: Grade 10 and above.
  - Level 4 Writing: Grade 11 and above.
- An elevated code question cannot move to a higher level than the grade allows.
  A Grade 9 A question at Level 1 (Reading) can only be elevated within Level 1
  (e.g. Technique 2: add a subtle bug to find). It cannot be promoted to Level 2 Tracing.

### Grade scaffolding

- Grade 9 elevated questions must still assume zero prior computer experience.
  A harder Grade 9 question uses a more complex scenario or requires justification,
  but never introduces tools or concepts the student has not encountered.
- Grade 10 elevated questions may assume basic file management and OS navigation.
- Grades 11–12 elevated questions may assume tool-specific knowledge for the
  tools taught in the curriculum (Code::Blocks, Excel, Word, Inkscape).

### Difficulty ceiling

- Elevated questions must remain answerable by a student who studied the material.
  If constructing a P question requires knowledge not covered in the module,
  simplify the elevation — apply a less aggressive technique or use a different
  technique from the catalogue.
- When in doubt, use Technique 2 (Added Complexity) rather than jumping straight
  to Technique 3 (Composite) or Technique 4 (Context Shift). Complexity is the
  safest elevation path.
