# Exemplar: Programming Algorithms Assessment

**Topic:** Algoritmai: masyvo operacijos
**Grade:** 10-11
**Duration:** 40 min
**Format:** Praktinis darbas (Code::Blocks)
**Bloom's levels:** Apply, Analyze
**Constraint:** Duoto kodo keisti negalima.

---

## Užduotys (5 užduotys, 20 taškų)

Kiekvienoje užduotyje pateiktas veikiantis C++ kodas su pažymėta vieta, kurią turite užpildyti. Keisti galima TIK pažymėtą vietą. Likęs kodas turi likti nepakeistas.

---

### 1 užduotis: Masyvo elementų suma (2 taškai, patenkinamas)

```cpp
#include <iostream>
using namespace std;

int main() {
    int sk[] = {4, 7, 2, 9, 1};
    int n = 5;
    int suma = 0;

    // === JŪSŲ KODAS ČIA ===
    // Apskaičiuokite visų masyvo elementų sumą
    // ir išsaugokite kintamajame suma.


    // === PABAIGA ===

    cout << "Suma: " << suma << endl;
    return 0;
}
```

**Laukiamas rezultatas:** `Suma: 23`

> *Design note: Basic loop + accumulation. Slenkstinis/patenkinamas boundary. Tests: can student write a for loop that iterates and sums.*

---

### 2 užduotis: Didžiausio elemento paieška (3 taškai, patenkinamas)

```cpp
#include <iostream>
using namespace std;

int main() {
    int sk[] = {12, 45, 7, 23, 56, 3};
    int n = 6;
    int didz;

    // === JŪSŲ KODAS ČIA ===
    // Raskite didžiausią masyvo elementą
    // ir išsaugokite kintamajame didz.


    // === PABAIGA ===

    cout << "Didziausias: " << didz << endl;
    return 0;
}
```

**Laukiamas rezultatas:** `Didziausias: 56`

> *Design note: Requires initialization (didz = sk[0]) + comparison loop. Common mistake: initializing didz = 0 (fails with all-negative arrays, but works here). Distractor logic built in.*

---

### 3 užduotis: Elemento pridėjimas į masyvą (4 taškai, pagrindinis)

```cpp
#include <iostream>
using namespace std;

int main() {
    int sk[10] = {5, 3, 8, 1, 9};
    int n = 5;
    int naujas = 6;
    int pozicija = 2; // Įterpti PRIEŠ šį indeksą

    // === JŪSŲ KODAS ČIA ===
    // Įterpkite 'naujas' elementą į masyvą prieš nurodytą poziciją.
    // Pastumkite esamus elementus į dešinę.
    // Padidinkite n.


    // === PABAIGA ===

    for (int i = 0; i < n; i++)
        cout << sk[i] << " ";
    cout << endl;
    return 0;
}
```

**Laukiamas rezultatas:** `5 3 6 8 1 9`

> *Design note: Requires right-shift loop (from end to position) + insert + increment. Pagrindinis level: must handle index arithmetic correctly. Common mistake: shifting left-to-right (overwrites).*

---

### 4 užduotis: Elemento šalinimas iš masyvo (4 taškai, pagrindinis)

```cpp
#include <iostream>
using namespace std;

int main() {
    int sk[] = {10, 20, 30, 40, 50};
    int n = 5;
    int salinti = 2; // Šalinti elementą su šiuo indeksu

    // === JŪSŲ KODAS ČIA ===
    // Pašalinkite elementą, kurio indeksas 'salinti'.
    // Pastumkite likusius elementus į kairę.
    // Sumažinkite n.


    // === PABAIGA ===

    for (int i = 0; i < n; i++)
        cout << sk[i] << " ";
    cout << endl;
    return 0;
}
```

**Laukiamas rezultatas:** `10 20 40 50`

> *Design note: Inverse of Task 3. Left-shift from deletion point. Common mistake: off-by-one in loop bounds.*

---

### 5 užduotis: Rikiavimas didėjimo tvarka (7 taškai, aukštesnysis)

```cpp
#include <iostream>
using namespace std;

int main() {
    int sk[] = {34, 12, 45, 7, 23, 56, 3, 18};
    int n = 8;

    // === JŪSŲ KODAS ČIA ===
    // Surikiuokite masyvą didėjimo tvarka
    // naudodami bet kurį rikiavimo algoritmą.


    // === PABAIGA ===

    for (int i = 0; i < n; i++)
        cout << sk[i] << " ";
    cout << endl;
    return 0;
}
```

**Laukiamas rezultatas:** `3 7 12 18 23 34 45 56`

> *Design note: Aukštesnysis. Student chooses algorithm (bubble, selection, insertion). Tests: correct nested loops, proper swap logic, termination. Most points because most complex.*

---

## Vertinimo kriterijai

| Užduotis | Kriterijus | Taškai |
|----------|-----------|--------|
| 1. Suma | Teisinga logika (ciklas + kaupimas) | 1 |
| | Kompiliuojasi be klaidų | 1 |
| 2. Didžiausias | Teisinga inicializacija + palyginimo logika | 2 |
| | Kompiliuojasi be klaidų | 1 |
| 3. Įterpimas | Teisingas postūmis į dešinę (nuo galo) | 2 |
| | Teisingas įterpimas ir n padidinimas | 1 |
| | Kompiliuojasi be klaidų | 1 |
| 4. Šalinimas | Teisingas postūmis į kairę | 2 |
| | Teisingas n sumažinimas | 1 |
| | Kompiliuojasi be klaidų | 1 |
| 5. Rikiavimas | Teisinga rikiavimo logika (bet kuris algoritmas) | 4 |
| | Teisingas keitimas vietomis (swap) | 2 |
| | Kompiliuojasi be klaidų | 1 |

**Iš viso: 20 taškų**

### Konvertavimas į pažymį

| Taškai | Pažymys |
|-------:|--------:|
| 19-20 | 10 |
| 17-18 | 9 |
| 15-16 | 8 |
| 13-14 | 7 |
| 11-12 | 6 |
| 9-10 | 5 |
| 6-8 | 4 |
| 4-5 | 3 |
| 2-3 | 2 |
| 0-1 | 1 |

---

## Design Notes

- All tasks use code completion format (not writing from scratch), appropriate for Grade 10
- Grade 11 variant would include one code-writing-from-scratch task
- "Duoto kodo keisti negalima" stated at the top, reinforced by scaffold structure
- Tasks progress easy to hard: sum (basic) -> find max -> insert -> delete -> sort
- Competency levels: Tasks 1-2 patenkinamas, Tasks 3-4 pagrindinis, Task 5 aukštesnysis
- Point distribution: 20% easy (5 tšk.), 30% medium (8 tšk.), 30% hard (0 tšk. overlap), 20% hard (7 tšk.)
- Common mistakes from Teacher_Plans inform distractor patterns in code structure
- C++ only (locked decision)
