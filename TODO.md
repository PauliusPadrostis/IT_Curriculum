# TODO

## Docx template library (po formatų stabilizacijos)

**Kada:** kai Teacher_Plan formatas nusistovės (~5-7 planų be formatavimo pakeitimų).

**Kas:** Iškelti stabilią docx formatavimo logiką (spalvos, šriftai, fazių antraštės, metaduomenų kortelės, tikslų langeliai, įspėjimų blokai) į atskirą JS biblioteką. LLM generuotų tik turinio duomenų objektą (JSON), o biblioteka deterministiškai paverčia jį .docx.

**Kodėl:**
- Dabartinis būdas: LLM generuoja ~8-20KB docx builder kodo per dokumentą (formatavimas + turinys kartu).
- Su šablonu: LLM generuoja ~2-4KB struktūrizuotų duomenų.
- Sumažinimas: ~60-75% mažiau output tokenų per dokumentą.
- Formato pakeitimai vienoje vietoje, ne per skill references kiekvieną kartą.

**Priklausomybės:** Stabilizuotas plan_format.md, teacher_profile.md, užbaigti bent 5-7 Teacher_Plan be formatavimo iteracijų.

---

## QA root-cause fixes (iš qa-report-01_Safety.md, 2026-03-30)

### ~~P1 — Cross-file coherence step in generation skills~~ DONE (2026-03-30)

Pridėti cross-file coherence check žingsniai 5 skill'ams:
- student-task-gen: Step 5b
- lesson-plan-gen: Step 3b
- theory-pack-gen: Step 3b
- visual-aid-gen: Step 3e
- lesson-readme-gen: Pamokos eiga timing rule

**Paveikti issues:** C-01, M-05, M-07, m-11, m-14

### ~~P2 — lt-qa: plain-text sidecar mechanizmas~~ DONE (2026-03-30)

**Problema:** lt-qa POST-GEN turėtų tikrinti generuotą tekstą, bet tikrina arba LLM atmintyje esantį tekstą (nepatikima), arba nieko. 4+ kalbos klaidos praėjo pro QA.

**Veiksmas:**
1. Kiekvienas generavimo skriptas rašo `.txt` sidecar šalia `.docx` prieš PDF konversiją
2. lt-qa skaito `.txt` failą, ne binarinį
3. Sidecar trinamas po sėkmingo QA
4. Pridėti į lt-mistakes.yaml: `prisistatoma`→`prisistato`, `Kas yra skirtumas tarp`→`Kuo skiriasi X nuo Y`, tarpas prieš skyrybos ženklą, kartojamas „[Terminas], tai [apibrėžimas]" šablonas

**Paveikti issues:** m-10, m-12, m-15, m-16 (+ prisideda prie m-01, m-02, m-03)

### ~~P3 — Module design document prieš generavimą~~ DONE (2026-03-30)

**Problema:** Bloom lygių regresija (003→004), neišmokyta prielaida 004 pamokoje, Student_Task be laiko pamokoje — dizaino klaidos, kurios kyla generuojant pamokas po vieną be bendro modulio plano.

**Veiksmas:** Prieš generuojant bet kurį naujo modulio turinį, sukurti modulio dizaino dokumentą:
- Bloom lygis kiekvienai pamokai (turi didėti arba būti pagrįstas)
- Prielaidų grandinė: ką kiekviena pamoka tikisi, ar ankstesnė tai moko
- Savarankiškas darbas: kiekviena pamoka su Student_Task turi ≥5 min laiko
- P→A suderinamumas: praktika turi būti sunkesnė nei vertinimas, tas pats formatas

**Paveikti issues:** X-01, X-02, X-03, m-13

### ~~P4 — end-session: tikrinti failus diske, ne README teiginius~~ DONE (2026-03-30)

**Problema:** Kai 2026-03-28 pridėti nauji privalomi failai (Visual_Aid, Answer_Key), esamų pamokų README nebuvo atnaujinti. Būsena liko „✅ Failai sukurti" su trūkstamais failais.

**Veiksmas:**
1. end-session skill: kryžmiškai tikrinti pamokos failus diske pagal `file_requirements.md`, ne pagal README lentelę
2. Jei trūksta privalomo failo — nustatyti Būseną į 🚧 WIP nepriklausomai nuo README teiginio
3. Kai sprendimas prideda naujus privalomus failus — pridėti follow-up užduotį į tasks/todo.md su paveiktų pamokų sąrašu

**Įgyvendinta:**
- Step 0: pridėtas `file_requirements.md` skaitymas
- Step 1d (naujas): cross-check prieš kanoninį failų sąrašą pagal pamokos tipą
- Step 1e: Būsenos grandinė dabar tikrina failus diske, ne README lentelę
- `references/file_requirements.md` nukopijuotas į end-session skill

**Paveikti issues:** M-01, M-02, M-04 (+ M-03)

### ~~P5 — Automatinis em dash pašalinimas generavimo skriptuose~~ DONE (2026-03-30)

**Problema:** Em dash draudimas egzistuoja 3 vietose (CLAUDE.md, lt-mistakes.yaml, lessons.md), bet kiekvienas Teacher_Plan ir Theory_Pack vis tiek turi em dash. LLM natūraliai juos rašo.

**Veiksmas:** Kiekviename generavimo skripte pridėti mechaninį post-processing žingsnį: `text.replace(/\u2014/g, ':')` (arba kontekstui tinkamą pakaitą). Automatizuojamos taisyklės neturi priklausyti nuo LLM disciplinos.

**Paveikti issues:** m-01, m-02, m-03

### ~~P6 — Atsakymų nutekėjimo taisyklę taikyti visiems student-facing failams~~ DONE (2026-03-30)

**Problema:** Student_Task savikontrolės klausimas tiesiogiai atskleidė 3 situacijos atsakymą. 2026-03-28 MCQ hinting taisyklė taikoma tik assessment-task-gen, bet principas universalus.

**Veiksmas:**
1. Išplėsti 2026-03-28 lessons.md įrašo „Applies to" lauką: visi student-facing materialai
2. student-task-gen kokybės checklist: „Ar kiekvienas savikontrolės klausimas nesusiaurina atsakymų erdvės?"

**Paveikti issues:** M-06

---

## Automated QA pipeline (po 2 modulio turinio generavimo)

**Kada:** kai 2 modulio turinys sugeneruotas ir paruoštas QA.

**Kas:** Pilnas QA pipeline iš skilų:

1. **Detect** (lesson-qa + module-qa) — randa problemas, rašo reportą
2. **Diagnose** — skaito reportą, leidžia lygiagrečius agentus root cause analizei, atnaujina reportą su radiniais
3. **Validate** — tikrina ar root cause tikrai teisingas, konsoliduoja jei keli bugai turi tą patį sprendimą
4. **Fix** — lygiagrečiai agentai taiso problemas, atnaujina reportą
5. **Archive** — reportas keliauja į `qa/` aplanką repo viduje kaip nuolatinė nuoroda

**Kodėl:**
- Dabartinis procesas (rankinis QA su mokytoju) veikia, bet nemastelėjamas 12 modulių.
- 1 modulio QA sesija užtruko ~2 sesijas rankinio darbo. 12 modulių = 24 sesijos vien QA.
- Pipeline automatizuoja detect→diagnose→fix ciklą, mokytojas tik tvirtina kritinius sprendimus.

**Priklausomybės:** Baigtas 1 modulio rankinis QA (šablonas), sugeneruotas 2 modulio turinys (test case).

---

## end-session skill revision: split mechanical vs judgment steps

**Kada:** kai bus laisva sesija skill priežiūrai.

**Kas:** end-session skill dabar deleguoja visus 5 žingsnius vienam agentui su švariu kontekstu. Problema: agentas neturi sesijos konteksto, todėl Step 4 (sprendimų/pamokų siūlymas) yra neefektyvus — orkestratoriui reikia iš anksto susiūti visą sesijos santrauką ir perduoti agentui, o agentas vis tiek negali pasiūlyti to, ko nepastebėjo.

**Siūlomas pakeitimas:**
- Steps 1-3 (folderių skenavimas, README atnaujinimas, status.md perrašymas) — deleguoti agentui (mechaniniai, naudoja švarų kontekstą).
- Steps 4-5 (sprendimai, pamokos, todo valymas) — vykdyti orkestruojančioje sesijoje, kuri turi pilną sesijos kontekstą.

**Kodėl:** Mechaniniai žingsniai naudojasi švariu kontekstu (nėra attention degradation). Sprendimų žingsniai reikalauja sesijos konteksto (ką mokytojas koregavo, kokios klaidos buvo). Dabartinis dizainas priverčia orkestratoriui dubliuoti kontekstą kaip prompt — tai ir brangiau, ir mažiau patikima.
