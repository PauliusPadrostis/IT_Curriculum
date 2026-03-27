# L lesson exemplar: HTML pagrindai

This exemplar demonstrates a Student_Task for an L (learning) lesson.
Key characteristics: micro-step scaffolding, "Stuck?" boxes at high-risk
points, pre-checks after milestones, code typed line by line, edge cases
anticipated. The student should be able to complete the task using ONLY
this document — even if they have never used a computer before.

**Source plan:** HTML pagrindai: pirmasis tinklalapis (Grade 10, L lesson)
**Note:** The scaffolding level shown here is calibrated for Grade 9 as a
reference ceiling. For Grade 10 (the actual grade of this lesson), Steps 1-3
(folder creation, file creation, opening in editor) could be compressed into
a single step — Grade 10 students know File Explorer and file extensions.
The tool-specific steps (4-8) would remain at similar detail.

---

## The document content (what appears in the .docx):

---

UŽDUOTIES LAPAS

# Sukurkite savo pirmąjį HTML puslapį

10 klasė  •  Tinklapių kūrimas  •  L pamoka

---

## Ką padarysite

Sukursite savo pirmąjį veikiantį HTML failą ir atidarysite jį
naršyklėje. Failas turės taisyklingą dokumento struktūrą, antraštes,
pastraipą ir sąrašą. Dirbsite su Notepad arba VS Code programa.
Tema — laisva: apie save, pomėgį ar bet ką, kas jums įdomu.

## Reikalavimai

| Reikalavimas | Elementas | Principas |
|---|---|---|
| Taisyklinga dokumento struktūra | `<!DOCTYPE>`, `<html>`, `<head>`, `<body>` | Naršyklė turi žinoti, ką skaito |
| Puslapio pavadinimas naršyklės kortelėje | `<title>` | |
| Viena pagrindinė antraštė | `<h1>` — tik viena visame puslapyje | Hierarchijos principas |
| Bent du poskyriai | `<h2>` | |
| Viena pastraipa | `<p>` | |
| Vienas sąrašas | `<ul>` arba `<ol>` — pagal turinį | |

## Darbo eiga

### 1 ŽINGSNIS: Sukurkite aplanką savo darbui

Atidarykite „File Explorer" (failų naršyklę) — tai aplanko formos
piktograma užduočių juostoje ekrano apačioje.

Eikite į „Desktop" (darbalaukį) arba bet kurį aplanką, kur norite
saugoti savo darbą.

Spauskite dešinį pelės mygtuką tuščioje vietoje → pasirinkite
„New" (Naujas) → „Folder" (Aplankas). Pavadinkite aplanką
**mano_puslapis**.

✓ *Dabar turėtumėte turėti: aplanką pavadinimu „mano_puslapis"
darbalaukyje arba pasirinktoje vietoje.*

### 2 ŽINGSNIS: Sukurkite HTML failą

Atidarykite ką tik sukurtą aplanką „mano_puslapis".

Spauskite dešinį pelės mygtuką tuščioje vietoje aplanko viduje →
„New" → „Text Document" (Tekstinis dokumentas).

Failas atsiras pavadinimu „New Text Document.txt". Dabar jį
reikia pervadinti:

- Spauskite ant failo pavadinimo **vieną kartą** (ne du kartus!) —
  pavadinimas taps redaguojamas.
- Ištrinkite visą seną pavadinimą **kartu su .txt** galūne.
- Įrašykite: **index.html**
- Spauskite Enter.

Kompiuteris gali paklausti: „Ar tikrai norite pakeisti failo plėtinį?"
Spauskite „Yes" (Taip).

✓ *Dabar turėtumėte turėti: failą pavadinimu „index.html" savo
aplanke. Jo piktograma gali pasikėisti į naršyklės ikoną — tai
normalu.*

> **ĮSTRIGOTE?**
>
> Jei nematote „.txt" galūnės ir failas vadinasi tiesiog
> „New Text Document":
> • File Explorer viršuje spauskite „View" (Rodinys)
> • Pažymėkite „File name extensions" (Failų vardų plėtiniai)
> • Dabar matysite .txt galūnę — ištrinkite ją ir parašykite .html

### 3 ŽINGSNIS: Atidarykite failą redagavimui

Spauskite **dešinį** pelės mygtuką ant „index.html" failo.

Pasirinkite „Open with" (Atidaryti su) → „Notepad" arba „VS Code".

Atsidarys tuščias teksto redaktorius. Čia rašysite HTML kodą.

✓ *Dabar turėtumėte matyti: atvirą Notepad arba VS Code langą.
Langas tuščias — tai gerai.*

> **ĮSTRIGOTE?**
>
> Jei failas atsidaro naršyklėje (matote tuščią puslapį, ne teksto
> redaktorių):
> • Uždarykite naršyklę
> • Grįžkite į aplanką
> • Spauskite **dešinį** pelės mygtuką ant failo
> • Pasirinkite „Open with" → „Notepad"
> • Jei nematote „Open with" — spauskite „Show more options" pirmiau

### 4 ŽINGSNIS: Parašykite HTML struktūrą

Į tuščią redaktorių surinkite šį kodą **tiksliai taip, kaip parašyta**.
Kiekvieną eilutę rašykite naujoje eilutėje (spauskite Enter po
kiekvienos eilutės):

```
<!DOCTYPE html>
<html lang="lt">
  <head>
    <meta charset="UTF-8">
    <title>Mano pirmas puslapis</title>
  </head>
  <body>

  </body>
</html>
```

*(Užuomina: tarpai eilučių pradžioje nėra privalomi — jie tik
padeda matyti struktūrą. Bet jei norite, galite juos pridėti
paspaudę Tarpo klavišą kelis kartus.)*

Paaiškinimas, ką kiekviena eilutė reiškia:
- `<!DOCTYPE html>` — pasako naršyklei: tai HTML5 failas.
- `<html lang="lt">` — viskas viduje yra HTML dokumentas, kalba
  lietuvių.
- `<head>` — informacija naršyklei. Jos puslapyje nesimato.
- `<title>` — tekstas, kuris matosi naršyklės kortelėje (tab'e).
- `<body>` — viskas, ką lankytojas mato puslapyje.

Išsaugokite failą: spauskite **Ctrl + S** (laikykite Ctrl ir
spauskite S).

✓ *Dabar turėtumėte turėti: failą su 10 eilučių kodo. Tarp
`<body>` ir `</body>` kol kas tuščia — turinį pridėsite kitame
žingsnyje.*

> **SVARBU**
>
> Viskas, ką norite matyti puslapyje, rašoma tarp `<body>` ir
> `</body>`. Jei parašysite turinį į `<head>` dalį — jis puslapyje
> nesimatos.

### 5 ŽINGSNIS: Pridėkite pagrindinę antraštę

Raskite tuščią eilutę tarp `<body>` ir `</body>`.

Parašykite ten savo puslapio antraštę naudodami `<h1>` žymą.
Pavyzdžiui:

```
<h1>Apie mane</h1>
```

arba

```
<h1>Mano mėgstamiausi žaidimai</h1>
```

Parašykite bet ką, kas jums patinka — tai jūsų puslapio pavadinimas.

Išsaugokite: **Ctrl + S**.

✓ *Dabar turėtumėte turėti: vieną `<h1>` eilutę tarp `<body>` ir
`</body>`.*

### 6 ŽINGSNIS: Pridėkite poskyrių antraštes, pastraipą ir sąrašą

Po savo `<h1>` eilutės (bet vis dar prieš `</body>`) pridėkite:

**Bent dvi `<h2>` poskyrių antraštes** — tai jūsų puslapio skyriai.

**Bent vieną pastraipą** su `<p>` žyma — keliais sakiniais apie
pasirinktą temą.

**Bent vieną sąrašą** — pasirinkite tipą pagal turinį:
- `<ul>` — kai elementų tvarka nesvarbi (pvz., pomėgių sąrašas)
- `<ol>` — kai tvarka svarbi (pvz., žingsnių seka)

Sąrašo pavyzdys:
```
<ul>
  <li>Pirmas punktas</li>
  <li>Antras punktas</li>
  <li>Trečias punktas</li>
</ul>
```

*(Užuomina: kiekvienas sąrašo punktas rašomas tarp `<li>` ir
`</li>`. Visi punktai — tarp `<ul>` ir `</ul>` arba `<ol>` ir
`</ol>`.)*

Išsaugokite: **Ctrl + S**.

✓ *Dabar turėtumėte turėti: kodą su `<h1>`, dviem `<h2>`, `<p>`
ir sąrašu — visa tai tarp `<body>` ir `</body>`.*

### 7 ŽINGSNIS: Atidarykite puslapį naršyklėje

Eikite į aplanką „mano_puslapis".

Du kartus spauskite ant „index.html" failo. Jis turėtų atsidaryti
naršyklėje (Chrome, Edge arba kt.).

Patikrinkite:
- Ar naršyklės kortelėje matote savo `<title>` tekstą?
- Ar puslapyje matote antraštę, poskyrių pavadinimus, pastraipą
  ir sąrašą?

*(Užuomina: jei pakeitėte kodą ir norite matyti pakeitimus
naršyklėje — išsaugokite failą redaktoriuje (Ctrl + S), tada
naršyklėje spauskite F5 arba Ctrl + R, kad puslapis
atsinaujintų.)*

✓ *Dabar turėtumėte matyti: savo sukurtą puslapį naršyklėje —
su antrašte, poskyriais, tekstu ir sąrašu.*

> **ĮSTRIGOTE?**
>
> Jei puslapyje matote HTML kodą vietoj suformatuoto teksto
> (matote `<h1>` ir pan.):
> • Patikrinkite, ar failo pavadinimas tikrai baigiasi `.html`
>   (ne `.txt`)
> • Jei ne — pervadinkite failą ir pabandykite dar kartą

### 8 ŽINGSNIS: Patikrinkite žymų uždarymo tvarką

Peržiūrėkite savo kodą redaktoriuje. Patikrinkite:
- Ar kiekviena atidaryta žyma (pvz., `<h2>`) turi atitinkamą
  uždarančiąją (`</h2>`)?
- Ar žymos uždarytos teisinga tvarka? Taisyklė: **pirma atidaryta —
  paskutinė uždaryta**.

Teisinga: `<p>Šis <strong>žodis</strong> paryškintas.</p>`
Neteisinga: `<p>Šis <strong>žodis</p></strong>`

Jei radote klaidų — ištaisykite, išsaugokite (Ctrl + S) ir
atnaujinkite naršyklę (F5).

✓ *Dabar turėtumėte turėti: veikiantį, taisyklingą HTML puslapį
be klaidų.*

## Pavyzdys

Jūsų kodo struktūra turėtų atrodyti maždaug taip:

```
<!DOCTYPE html>
<html lang="lt">
  <head>
    <meta charset="UTF-8">
    <title>...</title>
  </head>
  <body>
    <h1>...</h1>
    <h2>...</h2>
    <p>...</p>
    <h2>...</h2>
    <ul>
      <li>...</li>
      <li>...</li>
    </ul>
  </body>
</html>
```

## Patikrinkite save

☐ Ar failas vadinasi „index.html" (ne „index.txt")?
☐ Ar failas turi `<!DOCTYPE html>` pačioje pradžioje?
☐ Ar yra `<html>`, `<head>` ir `<body>` žymos?
☐ Ar `<title>` yra `<head>` viduje (ne `<body>`)?
☐ Ar yra tik vienas `<h1>`?
☐ Ar yra bent du `<h2>`?
☐ Ar yra bent viena `<p>` pastraipa?
☐ Ar yra sąrašas (`<ul>` arba `<ol>` su `<li>` punktais)?
☐ Ar visos žymos uždarytos teisinga tvarka?
☐ Ar failas atsidaro naršyklėje ir viskas matosi?

---

## Design notes (not in the .docx — for skill calibration only):

**What changed from v1:**
- Step 1 now explains how to create a folder (not assumed knowledge)
- Step 2 breaks file creation into: right-click → rename → change
  extension, with edge case about hidden extensions
- Step 3 is a separate step for opening in editor (not bundled with
  creation), with edge case about files opening in browser by default
- Step 4 explains each line of the structure code
- Steps 5-6 separate content addition from structure writing
- Step 7 is explicit about HOW to open in browser and HOW to refresh
- Step 8 adds explicit nesting/closing check as its own step
- 3 "Stuck?" boxes at the three highest-risk points:
  1. File extensions not visible (can't rename to .html)
  2. File opens in browser instead of editor
  3. HTML code shows as text (wrong file extension)
- 1 "Svarbu" box about body vs head
- Pre-checks (✓) after every step, not just major milestones

**Scaffolding philosophy:**
The student should NEVER have to think "what do I do next?" or
"how do I do this?" Each step answers both questions. The only
creative decisions are: what topic to write about, and what
content to put in their headings/paragraphs/list.

**What was removed from teacher plan:**
- All teacher-facing content (timing, cold-call, circulation)
- The justification writing prompt (plan's "Kodėl pasirinkote
  <ul> arba <ol>?") — removed because it's more natural as a
  teacher verbal check than a written student task component
- Entry/exit retrieval questions
- Diary entry
