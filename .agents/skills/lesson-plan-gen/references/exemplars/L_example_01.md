# HTML pagrindai: pirmasis tinklalapis

**Tipas:** L — Mokymosi pamoka (1 iš 3 apie HTML)
**Klasė:** 10
**Trukmė:** ~40 min.
**Forma:** Demo → bandymas
**Temos ribos:** Ši pamoka apima HTML dokumento struktūrą (`<!DOCTYPE>`,
`<html>`, `<head>`, `<body>`), antraščių hierarchiją (`<h1>`–`<h6>`),
pastraipas ir sąrašus. Neapima CSS, nuorodų, paveikslėlių ar formų.

## Pamokos tikslai

- Sukurti veikiantį HTML failą su taisyklinga dokumento struktūra.
- Pasirinkti tinkamą antraštės lygį pagal turinio hierarchiją.
- Taikyti teisingą žymų lizdavimo ir uždarymo tvarką.

---

## Pamokos pradžios klausimai — ~5 min.

Žodinis formatas. Klausimai skaidrėje.

**Klausimai (iš grafikos pamokų):**
1. Kuo skiriasi rastrinė grafika nuo vektorinės? Po vieną formato pavyzdį.
2. Kodėl PNG tinkamesnis logotipui nei JPEG?
3. Kur naudojamas RGB, o kur CMYK? Kodėl jie skiriasi?

Ryšys su nauja tema: „Kaip grafikos failai turi formatą ir struktūrą —
taip ir HTML turi savo struktūrą, kurią naršyklė turi suprasti."

---

## Dėstymas ir vedama praktika — ~20 min.

### Pamokos fokusas — ~2 min.

Parodykite projektoriuje galutinį rezultatą: paprastą veikiantį puslapį
naršyklėje. Pasakykite, ką mokiniai turės pamokos pabaigoje.

### Demonstravimas: HTML struktūra — ~8 min.

Atidarykite VS Code arba Notepad. Nuo nulio sukurkite `index.html`.
Parodykite: tai paprastas tekstas, ne Word — čia nėra mygtukų.

Rašykite kartu su klase:

```html
<!DOCTYPE html>
<html lang="lt">
  <head>
    <title>Mano pirmas puslapis</title>
  </head>
  <body>
    <h1>Sveiki!</h1>
  </body>
</html>
```

Kiekvieną dalį paaiškinkite vienu sakiniu:
- `<!DOCTYPE html>` — pasako naršyklei: tai HTML5 failas.
- `<html>` — viskas viduje yra HTML dokumentas.
- `<head>` — informacija naršyklei, nematoma puslapyje.
- `<title>` — tekstas naršyklės kortelėje.
- `<body>` — viskas, ką mato lankytojas.

**Dažna klaida:** rašyti turinį tiesiai į `<head>`.
Taisyklė: jei nori, kad matytųsi — viskas į `<body>`.

### Demonstravimas: antraštės ir sąrašai — ~7 min.

Tame pačiame faile pridėkite:
- du `<h2>` poskyrius
- pastraipą `<p>`
- sąrašą `<ul>` su keliais `<li>`

Paaiškinkite: antraštės žymi struktūrą, ne dydį. `<h3>` naudojamas ne
todėl, kad „patinka dydis", o todėl, kad tai trečias lygis.

Parodykite, kas nutinka neuždarant žymos — naršyklė „sugadina" puslapį.

**Supratimo patikrinimas** (tik jei natūralu šioje vietoje):
„Jei turiu svetainę su receptais — sriubos ir desertai — kuriuos `<h>`
lygius naudočiau? Kodėl ne du `<h1>`?"

### Vedama praktika su klase — ~3 min.

Paprašykite visų atidaryti savo VS Code, sukurti naują failą ir
pakartoti tą pačią struktūrą. Patikrinkite, ar visi atidaro naršyklėje.

---

## Savarankiška užduotis — ~10 min.

Užduoties instrukcijos skaidrėje:

**Sukurkite HTML puslapį „Apie mane" arba pasirinkta tema.**

| Reikalavimas | Elementas |
|-------------|-----------|
| Taisyklinga dokumento struktūra | `html`, `head`, `body`, `title` |
| Viena pagrindinė antraštė | `<h1>` — tik viena |
| Bent du poskyriai | `<h2>` |
| Viena pastraipa | `<p>` |
| Vienas sąrašas | `<ul>` arba `<ol>` |
| Visos žymos uždarytos | — |

**Prieš atidarant naršyklėje, pasitikrinkite:**
- Ar failas išsaugotas kaip `.html`?
- Ar visos žymos uždarytos?
- Ar `<h1>` tik vienas?

Vaikščiokite po klasę. Stebėkite: ar failas išsaugotas teisingai,
ar puslapis atsidaro, ar nėra tipinių klaidų (neuždarytos žymos,
keli `<h1>`, tekstas `<head>` viduje).

Jei pastebite pasikartojančią klaidą keliuose darbuose — trumpam
sustabdykite klasę ir parodykite ją projektoriuje.

---

## Pamokos pabaigos klausimai — ~3 min.

Žodinis formatas. Klausimai skaidrėje.

1. Kuri HTML dalis skirta naršyklei, o kuri — puslapio lankytojui?
2. Kodėl puslapyje turi būti tik vienas `<h1>`?
3. Kas nutinka, jei `<strong>` žymą atidarai, bet neuždarai?

---

## Pamokos aprašymas (dienynui)

Pamokos metu mokiniai susipažino su HTML žymėjimo kalba ir sukūrė savo
pirmąjį veikiantį tinklalapį. Išmoko taisyklingos HTML dokumento
struktūros (`html`, `head`, `body`, `title`), antraščių hierarchijos
principo bei žymų uždarymo tvarkos. Praktikoje taikė pagrindines žymas
ir atidarė sukurtą failą naršyklėje.
