# Exemplar: Grading Key — Algoritmai: masyvo operacijos

**Source assessment:** programming_algorithms_example.md
**Mode:** Grading Key (A lesson, teacher-facing)
**Total points:** 20
**Constraint:** Duoto kodo keisti negalima.

---

## 1 užduotis: Masyvo elementų suma (2 taškai, patenkinamas)

### Kanoninis sprendimas

```cpp
// Ciklas eina per visus masyvo elementus
for (int i = 0; i < n; i++) {
    // Kiekvieno elemento reikšmę pridedame prie sumos
    suma += sk[i];
}
```

### Alternatyvūs sprendimai

- **While ciklas:** naudoja `while` vietoj `for`, logika identiška (kintamasis didinamas rankiniu būdu).
- **Atvirkštinis ciklas:** eina nuo `n-1` iki `0`, rezultatas tas pats.

### Priėmimo kriterijai

- [ ] Ciklas iteruoja per visus `n` elementų
- [ ] Kiekvieno elemento reikšmė pridedama prie `suma`
- [ ] Nenaudoja papildomų kintamųjų, kurie keistų duotą kodą
- [ ] Laukiamas rezultatas: `Suma: 23`

### Atmetimo kriterijai (automatinis 0)

- Rezultatas užkoduotas tiesiogiai (`suma = 23;`)
- Pakeistas kodas už completion zonos ribų
- Kodas nekompiliuojasi dėl sintaksės klaidų, kurios rodo nesupratimą

### Dalinis vertinimas

| Kriterijus | Taškai | Paaiškinimas |
|-----------|-------:|-------------|
| Teisinga logika (ciklas + kaupimas) | 1 | Ciklas eina per visus elementus ir kaupia sumą |
| Kompiliuojasi be klaidų | 1 | Kodas kompiliuojasi ir veikia Code::Blocks aplinkoje |

---

## 2 užduotis: Didžiausio elemento paieška (3 taškai, patenkinamas)

### Kanoninis sprendimas

```cpp
// Pradinė reikšmė: pirmas masyvo elementas
didz = sk[0];

// Lyginame kiekvieną elementą su dabartiniu didžiausiu
for (int i = 1; i < n; i++) {
    if (sk[i] > didz) {
        didz = sk[i];
    }
}
```

### Alternatyvūs sprendimai

- **Ciklas nuo 0:** pradeda nuo `i = 0` vietoj `i = 1`, vienu palyginimu daugiau, bet rezultatas teisingas.
- **While ciklas:** naudoja `while` su rankiniu indekso didinimu.
- **Inicializacija didz = 0:** veikia šiam duomenų rinkiniui (visi teigiami), bet neteisingas bendru atveju. Vertinti kaip dalinį supratimą.

### Priėmimo kriterijai

- [ ] `didz` inicializuotas pirmu masyvo elementu arba kita logiška pradine reikšme
- [ ] Ciklas palygina kiekvieną elementą su `didz`
- [ ] Jei elementas didesnis, `didz` atnaujinamas
- [ ] Laukiamas rezultatas: `Didziausias: 56`

### Atmetimo kriterijai (automatinis 0)

- Rezultatas užkoduotas tiesiogiai (`didz = 56;`)
- Pakeistas kodas už completion zonos ribų
- Naudojamos standartinės bibliotekos funkcijos (`max_element`, `sort`)

### Dalinis vertinimas

| Kriterijus | Taškai | Paaiškinimas |
|-----------|-------:|-------------|
| Teisinga inicializacija + palyginimo logika | 2 | `didz = sk[0]` ir teisingas `if` palyginimas cikle |
| Kompiliuojasi be klaidų | 1 | Kodas kompiliuojasi ir veikia Code::Blocks aplinkoje |

**Pastaba apie didz = 0:** jei mokinys inicializuoja `didz = 0`, kodas veikia su šiais duomenimis, bet logika netinkama bendru atveju. Skirti 1 iš 2 taškų už logiką (ciklas ir palyginimas teisingi, inicializacija ne).

---

## 3 užduotis: Elemento pridėjimas į masyvą (4 taškai, pagrindinis)

### Kanoninis sprendimas

```cpp
// Pastumti elementus į dešinę, pradedant nuo galo
for (int i = n; i > pozicija; i--) {
    sk[i] = sk[i - 1];
}

// Įterpti naują elementą į nurodytą poziciją
sk[pozicija] = naujas;

// Padidinti elementų skaičių
n++;
```

### Alternatyvūs sprendimai

- **While ciklas postūmiui:** naudoja `while (i > pozicija)` su `i--` kūne, logika identiška.
- **Papildomas masyvas:** kopijuoja elementus į naują masyvą su įterpimu. Neoptimalu, bet teisinga (jei duotas kodas nekeičiamas).

### Priėmimo kriterijai

- [ ] Elementai stumiami į dešinę pradedant nuo galo (ne nuo pradžios)
- [ ] Naujas elementas įterpiamas į `sk[pozicija]`
- [ ] `n` padidinamas per 1
- [ ] Laukiamas rezultatas: `5 3 6 8 1 9`

### Atmetimo kriterijai (automatinis 0)

- Rezultatas užkoduotas tiesiogiai
- Postūmis atliekamas iš kairės į dešinę (perrašo duomenis)
- Pakeistas kodas už completion zonos ribų

### Dalinis vertinimas

| Kriterijus | Taškai | Paaiškinimas |
|-----------|-------:|-------------|
| Teisingas postūmis į dešinę (nuo galo) | 2 | Ciklas eina nuo `n` link `pozicija`, kiekvienas elementas kopijuojamas per vieną poziciją į dešinę |
| Teisingas įterpimas ir n padidinimas | 1 | `sk[pozicija] = naujas;` ir `n++` |
| Kompiliuojasi be klaidų | 1 | Kodas kompiliuojasi ir veikia Code::Blocks aplinkoje |

**Dažna klaida:** postūmis iš kairės (`for (int i = pozicija; i < n; i++)`) perrašo reikšmes. Tai rodo, kad mokinys nesupranta postūmio krypties. Skirti 0 iš 2 už postūmio logiką.

---

## 4 užduotis: Elemento šalinimas iš masyvo (4 taškai, pagrindinis)

### Kanoninis sprendimas

```cpp
// Pastumti elementus į kairę, pradedant nuo šalinimo vietos
for (int i = salinti; i < n - 1; i++) {
    sk[i] = sk[i + 1];
}

// Sumažinti elementų skaičių
n--;
```

### Alternatyvūs sprendimai

- **While ciklas postūmiui:** naudoja `while (i < n - 1)` su `i++` kūne, logika identiška.
- **Ciklo riba n vietoj n-1:** riba `i < n` vietoj `i < n - 1`. Viena nereikalinga kopija, bet rezultatas teisingas, nes `n` sumažinamas.
- **Papildomas masyvas:** kopijuoja elementus, praleidžiant šalinamąjį. Veikia, jei duotas kodas nekeičiamas.

### Priėmimo kriterijai

- [ ] Elementai stumiami į kairę pradedant nuo šalinimo pozicijos
- [ ] Ciklo riba neleidžia išeiti už masyvo ribų
- [ ] `n` sumažinamas per 1
- [ ] Laukiamas rezultatas: `10 20 40 50`

### Atmetimo kriterijai (automatinis 0)

- Rezultatas užkoduotas tiesiogiai
- Pakeistas kodas už completion zonos ribų
- Elementai stumiami į neteisingą pusę

### Dalinis vertinimas

| Kriterijus | Taškai | Paaiškinimas |
|-----------|-------:|-------------|
| Teisingas postūmis į kairę | 2 | Ciklas eina nuo `salinti` link `n-1`, kiekvienas elementas kopijuojamas per vieną poziciją į kairę |
| Teisingas n sumažinimas | 1 | `n--` po postūmio |
| Kompiliuojasi be klaidų | 1 | Kodas kompiliuojasi ir veikia Code::Blocks aplinkoje |

**Dažna klaida:** `off-by-one` klaida ciklo riboje (`i <= n - 1` arba `i < n`). Jei rezultatas teisingas, vertinti pilnais taškais. Jei sukelia klaidą, atimti 1 tšk. nuo postūmio logikos.

---

## 5 užduotis: Rikiavimas didėjimo tvarka (7 taškai, aukštesnysis)

### Kanoninis sprendimas (burbulo rikiavimas)

```cpp
// Išorinis ciklas: kartojame n-1 kartą
for (int i = 0; i < n - 1; i++) {
    // Vidinis ciklas: lyginame gretimus elementus
    for (int j = 0; j < n - 1 - i; j++) {
        // Jei kairysis didesnis už dešinįjį, sukeičiame
        if (sk[j] > sk[j + 1]) {
            int temp = sk[j];
            sk[j] = sk[j + 1];
            sk[j + 1] = temp;
        }
    }
}
```

### Alternatyvūs sprendimai

- **Išrinkimo rikiavimas (selection sort):** naudoja vidinį ciklą minimumui rasti vietoj gretimų elementų lyginimo. Išorinis ciklas fiksuoja poziciją, vidinis ieško mažiausio likusio elemento.
- **Įterpimo rikiavimas (insertion sort):** stato elementus į teisingą poziciją po vieną. Kiekvienas naujas elementas lyginamas su jau surikiuotais ir stumiamas į tinkamą vietą.
- **Burbulo be optimizacijos:** vidinis ciklas eina iki `n - 1` kiekvienoje iteracijoje (be `- i`). Neoptimalu, bet teisinga.

### Priėmimo kriterijai

- [ ] Naudojamas bet kuris teisingas rikiavimo algoritmas
- [ ] Du įdėtiniai ciklai (arba ekvivalenti struktūra)
- [ ] Teisingas elementų keitimas vietomis (swap su laikinu kintamuoju)
- [ ] Rikiuoja didėjimo tvarka
- [ ] Laukiamas rezultatas: `3 7 12 18 23 34 45 56`

### Atmetimo kriterijai (automatinis 0)

- Naudojama `std::sort` ar kita standartinė bibliotekos funkcija
- Rezultatas užkoduotas tiesiogiai
- Kodas nukopijuotas iš interneto be supratimo (identifikuojama per netipines konstrukcijas ar angliškas komentarus)
- Pakeistas kodas už completion zonos ribų

### Dalinis vertinimas

| Kriterijus | Taškai | Paaiškinimas |
|-----------|-------:|-------------|
| Teisinga rikiavimo logika (bet kuris algoritmas) | 4 | Du įdėtiniai ciklai su teisinga palyginimo sąlyga ir ribomis |
| Teisingas keitimas vietomis (swap) | 2 | Naudojamas laikinas kintamasis (`temp`), trys priskyrimo operacijos teisingos |
| Kompiliuojasi be klaidų | 1 | Kodas kompiliuojasi ir veikia Code::Blocks aplinkoje |

**Dalinio vertinimo pavyzdžiai:**

- **5/7:** Rikiavimo logika teisinga, swap teisingas, bet nekompiliuojasi (pvz., trūksta kabliataškio). Skirti: 4 + 2 + 0 = 6. Arba: logika su viena klaida ribose (3 + 2 + 1 = 6).
- **3/7:** Mokinys parašė du ciklus, bet palyginimo sąlyga neteisinga arba rikiuoja mažėjimo tvarka. Skirti: 2 + 0 + 1 = 3.
- **1/7:** Kodas kompiliuojasi, bet nerikiuoja (pvz., tik vienas ciklas arba tuščias kūnas). Skirti: 0 + 0 + 1 = 1.

---

## Bendras taškų pasiskirstymas

| Užduotis | Taškai | Lygis |
|----------|-------:|-------|
| 1. Masyvo elementų suma | 2 | Patenkinamas |
| 2. Didžiausio elemento paieška | 3 | Patenkinamas |
| 3. Elemento pridėjimas | 4 | Pagrindinis |
| 4. Elemento šalinimas | 4 | Pagrindinis |
| 5. Rikiavimas | 7 | Aukštesnysis |
| **Iš viso** | **20** | |
