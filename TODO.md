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

## Canva visual aid production line

**Kada:** pradeti dabar, pries masinį L pamoku Visual_Aid atnaujinima.

**Tikslas:** pakeisti dabartini standu `visual-aid-gen` docx->pdf istraukimo kelia i Canva pagrista masines gamybos pipeline, kuriame Codex generuoja strukturuota Canva-ready paketa, o Canva atlieka vienoda vizualini renderi per uzrakintus sablonus.

**Kodel:**
- Dabartinis modelis generuoja techniskai tvarkingus, bet vizualiai silpnus PDF.
- Fiksuota 6 skaidriu schema per daznai praleidzia tai, ka mokytojas realiai turi rodyti projektoriuje.
- Canva geriau sprendzia tipografija, kompozicija, vizualini vientisuma ir pakartotini eksporta nei repo-native docx skaidres.
- Rankinis darbas turi buti perkeltas i vienkartini setup, ne kartojamas kiekvienai pamokai.

### Siulomas vykdymo planas

1. Aprasyti stabilu duomenu kontrakta tarp Codex ir Canva.
2. Aprasyti 5 skaidriu archetipus, kurie padengia beveik visas 9 klases L pamokas.
3. Sukurti 3-5 Canva master templates su uzrakintais stiliais ir identiskais placeholder pavadinimais.
4. Sukurti nauja skill `canva-visual-pack-gen`, kuris generuoja batch-ready paketa vietoje galutinio PDF.
5. Istestuoti pipeline ant 2-3 Safety pamoku pries pleciant i kitus modulius.
6. Tik po sekmingo pilotinio bandymo spresti, ar sena `visual-aid-gen`:
   - pakeisti nauju workflow,
   - palikti kaip fallback,
   - ar sumazinti jo role iki preview generatoriaus.

### Canva-ready paketo isvestys

Kiekvienai pamokai skill turi generuoti:
- `canva_rows.csv` - po viena eilute kiekvienai skaidrei
- `visual_spec.json` - strukturuota pamokos vizualine schema ir QA metadata
- `asset_prompts.md` - kokiu vizualu reikia, jei ju dar nera asset library
- `export_checklist.md` - trumpa rankine QA pries PDF eksporta

Jei reikia, veliau galima prideti:
- lokalius SVG asset'us (`assets/visual-aid/`)
- modulio asset kataloga pasikartojantiems diagramu blokams

### Slide archetipu rinkinys

Naudoti tik 5 archetipus:
- `title`
- `questions`
- `process`
- `comparison`
- `scenario`

**Pastabos:**
- `title` - modulio/pamokos atidarymo skaidre
- `questions` - pradzios arba pabaigos klausimai
- `process` - eiga, algoritmas, seka, 2FA veikimas, darbo veiksmai
- `comparison` - saugu/nesaugu, poveikis/nauda, geras/blogas pavyzdys
- `scenario` - worked example, analizes kortele, rotacijos scenarijus

Tai samoningai mazas rinkinys. Kuo maziau layout tipu, tuo stabilesnis batch renderinimas Canva.

### Siulomas CSV / schema kontraktas

Kiekviena `canva_rows.csv` eilute atitinka viena skaidre. Laukai:

| Field | Paskirtis |
|------|-----------|
| `lesson_id` | Pvz. `G9-S1-M01-003` |
| `lesson_folder` | Pilnas lesson folder pavadinimas |
| `grade` | Pvz. `9` |
| `module_name` | Pvz. `Sauga` |
| `lesson_title_lt` | Pilnas lietuviskas pamokos pavadinimas |
| `slide_no` | Skaidres numeris |
| `template_type` | Vienas is 5 archetipu |
| `slide_role` | `title`, `start_questions`, `core_explainer`, `worked_example`, `end_questions` ir pan. |
| `slide_title` | Skaidres antraste |
| `slide_subtitle` | Pasirenkama paantraste |
| `main_text` | Pagrindinis tekstinis blokas |
| `left_title` | Kairio stulpelio antraste |
| `left_text` | Kairio stulpelio turinys |
| `right_title` | Desinio stulpelio antraste |
| `right_text` | Desinio stulpelio turinys |
| `callout_1` | Trumpas isryskinimas / etikete |
| `callout_2` | Antras isryskinimas / etikete |
| `visual_kind` | `diagram`, `icon-grid`, `comparison-cards`, `scenario-card`, `none` |
| `visual_prompt` | Trumpa instrukcija asset'ui arba Canva elementu parinkimui |
| `must_show` | `true/false`, ar si skaidre kritine mokytojo projekcijai |
| `source_refs` | Is kuriu failu ir sekciju paimtas turinys |
| `notes_for_export` | Trumpas QA priminimas pries eksporta |

### Template placeholder taisykle

Visi Canva master templates turi naudoti tuos pacius placeholder vardus, net jei dalis ju konkreciame template lieka tusti:
- `slide_title`
- `slide_subtitle`
- `main_text`
- `left_title`
- `left_text`
- `right_title`
- `right_text`
- `callout_1`
- `callout_2`

Tai yra stabilumo pagrindas. Jokio per-template pervadinimo.

### Siulomas Canva template set

1. `VA-Title`
- Pilno ekrano tituline skaidre
- 1 didelis antrastes blokas + maza modulio eilute

2. `VA-Questions`
- Didele antraste + 3-5 klausimu sarasas
- Tinka pradzios ir pabaigos klausimams

3. `VA-Process`
- Horizontalus arba vertikalus 3-5 zingsniu flow
- Tinka algoritmams, 2FA veikimui, taisykliu sekai

4. `VA-Comparison`
- 2 stulpeliu arba korteliu palyginimas
- Tinka saugu/nesaugu, neigiamas/teigiamas poveikis, gera/bloga praktika

5. `VA-Scenario`
- Vienas worked example arba analizes kortele
- Tinka phishing pavyzdziui, scenarijaus isskaidymui, mokytojo demonstracijai

### Turinio parinkimo taisykles skill'ui

Naujas skill neturi aklai mapinti kiekvienos pamokos i ta pacia 6-slide seka.
Jis pirmiausia turi identifikuoti projection-critical content:
- ka mokytojas turi parodyti ant ekrano, kad pamoka veiktu;
- kokie zingsniai / palyginimai / pavyzdziai turi buti vizualizuoti;
- kurie Teacher_Plan nurodymai negali likti tik tekste.

Tik tada parenkamas slide mix is archetipu.

### Minimalus batch workflow Canva puseje

1. Skill sugeneruoja `canva_rows.csv` visam moduliui.
2. Canva importuoja CSV i vieninga data source.
3. Kiekviena eilute uzpildo atitinkama master template varianta.
4. Sugeneruojamas visas pamokos skaidriu rinkinys.
5. Atliekama greita vizualine perziura:
   - antrastes netelpa?
   - ar kritiniai vizualai tikrai yra?
   - ar nera per tankaus teksto?
6. Eksportuojama i PDF ir perkeliama atgal i lesson folder.

### Pilotinio bandymo seka

Pilotui naudoti visas 5 Safety module pamokas, kurioms Visual_Aid yra privalomas:
- `001_L - Ergonomics & healthy computer use`
- `002_L - Privacy & account safety`
- `003_L - Online risks & safe response logic`
- `004_L - Environmental impact of digital technologies`
- `005_I - Scenario rotation task`

**Kodel visas 1-5, ne tik 2-4:**
- tai realus privalomu Visual_Aid scope siame modulyje;
- 001 duoda paprasciausia bazini L pamokos atveji;
- 002 patikrina `process` + `comparison`;
- 003 patikrina `process` + `scenario`;
- 004 patikrina `comparison` + platesni explanatory turini;
- 005 patikrina I tipo pamokos workflow ir demonstracinio scenarijaus poreiki.

Jei 001-005 iseina stabiliai, pipeline tiketina pakels beveik visa L/I Visual_Aid generavimo poreiki moduliuose.

### Sekmes kriterijai

- Vienam moduliui skill gali sugeneruoti pilna `canva_rows.csv` be rankinio skaidriu perrasinejimo.
- Canva master templates priima ta pati lauku rinkini be rankinio placeholder taisymo.
- Vizualu kokybe aiskiai aukstesne nei dabartinio docx pagrindo Visual_Aid.
- Rankinis darbas po setup sutrumpeja iki importo, trumpos perziuros ir eksporto.

### Sprendimai, kuriuos reikes priimti po spec patvirtinimo

- Ar `Visual_Aid.pdf` lieka 6 skaidres, ar leidziame 5-7 pagal pamokos poreiki
- Ar batch generavimas eis per viena bendra modulio CSV, ar po viena CSV kiekvienai pamokai
- Kur laikyti pasikartojancius Canva / SVG asset'us repo viduje
- Ar sena `visual-aid-gen` skill laikyti kaip fallback, ar palaipsniui isjungti

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

## ~~end-session skill revision: split mechanical vs judgment steps~~ DONE (2026-04-01)

Skill perskirstytas į dvi fazes: Phase 1 (agentas) vykdo Steps 0-3 (mechaninis disko skenavimas), Phase 2 (orkestratoriaus sesija) vykdo Steps 1g, 4, 5 (reikalauja sesijos konteksto). Atlikta 22 simuliacijos (2 rundai), rasti ir pataisyti: explicit scope instrukcija agento prompte, AGENT STOP HERE marker tarp 1f/1g, Contract Validation blokas su recovery keliu, pašalinta pasenusi „end-session agent" kalba Step 4e, 80-char limitas matomas dispatch metu, Step 1g Skip scope ir failo sąrašo šaltinis, Phase 2 handoff trigger, tuščio repo division-by-zero fix.

---

## Safety module remaining phases (4–7)

**Phase 4 — 005_I (Scenario rotation task): 3 files**
- [x] Teacher_Plan.docx (must come first)
- [x] Student_Task.docx
- [x] Visual_Aid.pdf

**~~Phase 5 — 006_P (Safety checklist rehearsal): 3 files~~ DONE (2026-04-01)**
- [x] Teacher_Plan.docx
- [x] Practice_Task.docx (elevated from 007_A Assessment_Task)
- [x] Answer_Key.docx (study key, student-facing)

Corrected: canonical P-lesson files are Teacher_Plan + Practice_Task + Answer_Key (not Visual_Aid.pdf).

**~~Phase 6 — 007_A (Safety structured assessment): 4 files~~ DONE (2026-04-01)**
- [x] Teacher_Plan.docx
- [x] Assessment_Task.xlsx (Testmoz, 10 pools, 30 pts, 3 variants/pool)
- [x] Rubric.docx (student-facing, shared before assessment)
- [x] Answer_Key.docx (grading key, teacher-only)

Corrected: canonical A-lesson files are Teacher_Plan + Assessment_Task + Rubric + Answer_Key (not Visual_Aid.pdf).
Phase 6 was executed before Phase 5 because Practice_Task depends on Assessment_Task existing.

**Phase 7 — Module close-out**
- [x] Update lesson READMEs 001–007: flip file statuses (done by end-session 2026-04-01)
- [x] Update module README busena summary (done by end-session 2026-04-01)
- [ ] Cross-document consistency check across all 7 lessons
- [ ] Run /module-qa on 01_Safety

**Notes:**
- 001–004_L complete (Teacher_Plan, Theory_Pack, Student_Task, Visual_Aid all exist). Await Patikrinta review.
- 005_I type I: no Theory_Pack needed.
- 006_P type P: Practice_Task replaces Student_Task.
- 007_A type A: Assessment_Task.xlsx + Rubric.docx replace Student_Task.
- 005–007 Teacher_Plans should be generated sequentially (retrieval questions chain).

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
