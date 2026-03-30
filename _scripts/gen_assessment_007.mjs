// Assessment_Task.xlsx generator for 007_A — Saugos struktūrinis vertinimas
// Grade 9, Safety module, Testmoz import format
// ALL Lithuanian text in plain UTF-8 — no \u escapes for Lithuanian chars
// EXCEPTION: Lithuanian typographic quotes use \u201E (lower „) and \u201C (upper ")
// because the closing quote conflicts with JS string delimiters.
// POOL column B = 1 (pick count, NOT pool ID)
// No header row. Blank rows between variants in pools.
import ExcelJS from "exceljs";
import path from "path";
import { fileURLToPath } from "url";

const Q = "\u201E"; // „
const QC = "\u201C"; // "

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(__dirname,
  "../Grade_9/Semester_1/01_Safety/007_A - Safety structured assessment/Assessment_Task.xlsx");

// ── Helpers ──
// MCQ: returns rows for one variant (question + options + blank)
function mcq(stem, points, options, correctIdx, explanation) {
  // options is array of strings, correctIdx is 0-based index of correct answer
  const rows = [];
  rows.push([stem, points, "", explanation || ""]);
  for (let i = 0; i < options.length; i++) {
    rows.push([i === correctIdx ? "*" : "", options[i], "", ""]);
  }
  rows.push(["", "", "", ""]); // blank row separator
  return rows;
}

// Essay: returns rows for one variant (question + blank)
function essay(stem, points) {
  const rows = [];
  rows.push([stem, points, "long", ""]);
  rows.push(["", "", "", ""]); // blank row separator
  return rows;
}

// Pool wrapper: POOL row, variants, END row
function pool(variantsFn) {
  const rows = [];
  rows.push(["POOL", 1, "", ""]);
  rows.push(["", "", "", ""]); // blank after POOL
  const variants = variantsFn();
  for (const v of variants) {
    rows.push(...v);
  }
  rows.push(["END", "", "", ""]);
  rows.push(["", "", "", ""]); // blank after END
  return rows;
}

// ══════════════════════════════════════════════════════════════
// QUESTION POOLS
// ══════════════════════════════════════════════════════════════

// ── Q1: Slenkstinis, 1 tšk., Ergonomika (Obj #1) ──
const q1 = () => pool(() => [
  mcq(
    "Ką reiškia 20-20-20 akių poilsio taisyklė?",
    1,
    [
      "Kas 20 minučių pažiūrėti į 20 metrų atstumą 20 sekundžių",
      "Kas 20 minučių uždaryti akis 20 sekundžių ir pakartoti 20 kartų",
      "Kas 20 sekundžių pamirksėti 20 kartų ir pakelti žvilgsnį 20 metrų"
    ],
    0, ""
  ),
  mcq(
    "Koks yra rekomenduojamas atstumas nuo akių iki ekrano?",
    1,
    [
      "20-30 cm (viena plaštaka)",
      "50-70 cm (ištiestos rankos atstumas)",
      "100-120 cm (du žingsniai nuo stalo)"
    ],
    1, ""
  ),
  mcq(
    "Kur turėtų būti ekrano viršutinis kraštas, kai sėdite tiesiai?",
    1,
    [
      "Virš akių lygio, kad žiūrėtumėte aukštyn",
      "Akių lygyje arba šiek tiek žemiau jo",
      "Ties smakru, kad žiūrėtumėte žemyn dideliu kampu"
    ],
    1, ""
  ),
]);

// ── Q2: Slenkstinis, 1 tšk., Privatumas (Obj #3) ──
const q2 = () => pool(() => [
  mcq(
    "Kuris slaptažodis geriausiai atitinka saugumo kriterijus?",
    1,
    [
      "labas!2345",
      "Mok!n1s#9k",
      "aabb!cddee",
      "12345!bcde"
    ],
    1, ""
  ),
  mcq(
    "Kuris slaptažodis geriausiai atitinka saugumo kriterijus?",
    1,
    [
      "vasara2024!",
      "Sn!3g@s#7z",
      "qwerty!!!!",
      "jonas!2010a"
    ],
    1, ""
  ),
  mcq(
    "Kuris slaptažodis geriausiai atitinka saugumo kriterijus?",
    1,
    [
      "!!!!!aaaaa",
      "petras!cde",
      "R@1n#8mT!q",
      "abcde12345"
    ],
    2, ""
  ),
]);

// ── Q3: Slenkstinis, 1 tšk., Rizikos (Obj #6) ──
const q3 = () => pool(() => [
  mcq(
    "Kas yra phishing?",
    1,
    [
      "Kenkėjiška programa, kuri ištrina failus iš kompiuterio",
      "Apgaulinga žinutė, kuria siekiama išvilioti asmeninius duomenis",
      "Socialinis tinklas, kuriame galima anonimiškai bendrauti"
    ],
    1, ""
  ),
  mcq(
    "Kas yra socialinė inžinerija?",
    1,
    [
      "Manipuliavimo būdas, kuriuo žmogus priverčiamas atskleisti informaciją",
      "Inžinerinė disciplina, nagrinėjanti visuomenės struktūras",
      "Socialinių tinklų kūrimo technologija"
    ],
    0, ""
  ),
  mcq(
    "Kas yra dezinformacija?",
    1,
    [
      "Klaidinga informacija, skleidžiama netyčia dėl nežinojimo",
      "Informacija, kurios šaltinis yra nežinomas",
      "Tyčia skleidžiama melaginga informacija siekiant suklaidinti"
    ],
    2, ""
  ),
]);

// ── Q4: Slenkstinis, 1 tšk., Aplinka (Obj #9) ──
const q4 = () => pool(() => [
  mcq(
    "Kuris iš šių teiginių apie e-atliekas yra teisingas?",
    1,
    [
      "E-atliekos yra pavojingos, nes jose yra toksiškų medžiagų, pvz., švino",
      "E-atliekos yra saugios aplinkai, nes elektronika gaminama iš plastiko",
      "E-atliekos susidaro tik iš kompiuterių, bet ne iš telefonų"
    ],
    0, ""
  ),
  mcq(
    "Kas yra duomenų centras?",
    1,
    [
      "Vieta, kur saugomi ir apdorojami didelės apimties duomenys, veikianti visą parą",
      "Parduotuvė, kurioje galima nusipirkti kompiuterių dalis",
      "Programa, skirta duomenų analizei asmeniniame kompiuteryje"
    ],
    0, ""
  ),
  mcq(
    "Kuri veikla sunaudoja daugiausiai energijos internete?",
    1,
    [
      "Tekstinės žinutės siuntimas draugui",
      "Trumpo el. laiško rašymas ir siuntimas",
      "Vaizdo įrašo žiūrėjimas aukšta raiška kelioms valandoms"
    ],
    2, ""
  ),
]);

// ── Q5: Patenkinamas, 1 tšk., Ergonomika (Obj #2) ──
const q5 = () => pool(() => [
  mcq(
    "Kodėl dirbant kompiuteriu rekomenduojama daryti pertraukas kas 30-45 minutes?",
    1,
    [
      "Pertraukos reikalingos tik tada, kai akys pradeda skaudėti",
      "Pertraukos padeda akims, nugarai ir kraujotakai atsipalaiduoti bei atsigauti",
      "Pertraukos reikalingos, kad kompiuteris nesuprastėtų nuo ilgo naudojimo"
    ],
    1, ""
  ),
  mcq(
    "Kodėl svarbu sėdėti tiesiai ir atremti nugarą į kėdės atlošą?",
    1,
    [
      "Tiesi laikysena padeda geriau matyti ekrano turinį net iš toli",
      "Tiesi laikysena reikalinga tik suaugusiems, ne mokiniams",
      "Tiesi laikysena sumažina stuburo ir raumenų apkrovą ilgai dirbant"
    ],
    2, ""
  ),
  mcq(
    "Kodėl rankos dirbant kompiuteriu turėtų būti alkūnių lygyje?",
    1,
    [
      "Tokia padėtis leidžia greičiau spausdinti ir padaryti mažiau klaidų",
      "Tokia padėtis sumažina riešų ir alkūnių įtampą ilgai rašant klaviatūra",
      "Tokia padėtis reikalinga tik programuotojams, ne mokiniams"
    ],
    1, ""
  ),
]);

// ── Q6: Patenkinamas, 1 tšk., Privatumas (Obj #4) ──
const q6 = () => pool(() => [
  mcq(
    "Kaip dviejų veiksnių autentifikacija (2FA) padidina paskyros saugumą?",
    1,
    [
      "2FA pakeičia slaptažodį piršto antspaudu, todėl slaptažodžio nebereikia",
      "2FA automatiškai keičia slaptažodį kas mėnesį, todėl jis niekada nepasensta",
      "2FA reikalauja dviejų skirtingų patvirtinimo būdų, todėl vagis negali prisijungti vien su slaptažodžiu"
    ],
    2, ""
  ),
  mcq(
    "Kodėl 2FA apsaugo net tada, kai slaptažodis pavogtas?",
    1,
    [
      "2FA automatiškai išsiunčia policijai pranešimą apie vagystę",
      "Vagis negali prisijungti be antrojo veiksnio, pvz., kodo į telefoną",
      "2FA ištrina visus duomenis iš paskyros, kai aptinkamas nesaugus prisijungimas"
    ],
    1, ""
  ),
  mcq(
    "Koks yra 2FA tikslas prisijungiant prie paskyros?",
    1,
    [
      "Padaryti prisijungimą greitesnį, nes nereikia rašyti ilgo slaptažodžio",
      "Leisti prisijungti iš bet kurio įrenginio be jokio slaptažodžio",
      "Patikrinti tapatybę dviem nepriklausomais būdais, ne tik slaptažodžiu"
    ],
    2, ""
  ),
]);

// ── Q7: Patenkinamas, 1 tšk., Rizikos (Obj #7) ──
const q7 = () => pool(() => [
  mcq(
    "Kuris iš šių požymių rodo galimą phishing žinutę?",
    1,
    [
      "Žinutė siunčiama darbo dienomis iš pažįstamo kolegos el. pašto",
      "Žinutėje reikalaujama skubiai paspausti nuorodą ir patvirtinti duomenis",
      "Žinutėje prašoma perskaityti pridedamą susirinkimo darbotvarkę"
    ],
    1, ""
  ),
  mcq(
    "Kuris iš šių požymių rodo galimą phishing žinutę?",
    1,
    [
      "Žinutė ateina iš mokyklos administracijos su tvarkaraščio pakeitimais",
      "Žinutė ateina iš draugo su kvietimu į gimtadienio vakarėlį",
      "Žinutė ateina iš nežinomo adreso ir siūlo prizą, jei paspausite nuorodą"
    ],
    2, ""
  ),
  mcq(
    "Kuris iš šių požymių rodo galimą phishing žinutę?",
    1,
    [
      "Žinutėje klausiama, ar galėtumėte ateiti į pagalbą po pamokų",
      "Žinutėje rašoma, kad paskyra bus užblokuota per 24 valandas, jei neatsakysite",
      "Žinutėje informuojama apie naują mokyklos tvarkaraštį nuo pirmadienio"
    ],
    1, ""
  ),
]);

// ── Q8: Patenkinamas, 1 tšk., Aplinka (Obj #12) ──
const q8 = () => pool(() => [
  mcq(
    "Kuris veiksmas padeda sumažinti asmeninį skaitmeninį pėdsaką?",
    1,
    [
      "Kuo dažniau siųsti nuotraukas aukšta raiška el. paštu",
      "Palikti kompiuterį įjungtą visą naktį, kad greičiau pasileistų ryte",
      "Ištrinti senus ir nereikalingus el. laiškus iš pašto dėžutės"
    ],
    2, ""
  ),
  mcq(
    "Kuris veiksmas padeda sumažinti asmeninį skaitmeninį pėdsaką?",
    1,
    [
      "Žiūrėti kuo daugiau vaizdo įrašų vienu metu keliuose languose",
      "Pasirinkti žemesnę vaizdo kokybę, kai aukšta raiška nebūtina",
      "Laikyti kuo daugiau failų kopijų skirtingose debesijos paslaugose"
    ],
    1, ""
  ),
  mcq(
    "Kuris veiksmas padeda sumažinti asmeninį skaitmeninį pėdsaką?",
    1,
    [
      "Kasdien siųsti didelius vaizdo failus draugams per socialinius tinklus",
      "Naudoti kelis skirtingus naršyklės langus vienu metu visą dieną",
      "Išjungti kompiuterį, kai juo nesinaudojate ilgiau nei valandą"
    ],
    2, ""
  ),
]);

// ── TEXT BLOCK: section divider ──
const sectionDivider = (text) => [[text, "", "", ""], ["", "", "", ""]];

// ── Q9: Patenkinamas, 2 tšk., Privatumas (Obj #5) — essay ──
const q9 = () => pool(() => [
  essay(
    "Jūsų draugas socialiniame tinkle viešai skelbia savo gimimo datą, mokyklos pavadinimą ir miesto, kuriame gyvena, pavadinimą. 1-2 sakiniais paaiškinkite, kodėl toks elgesys gali būti nesaugus.",
    2
  ),
  essay(
    "Jūsų klasiokas registruodamasis naujoje svetainėje nurodo savo tikrą vardą, pavardę, adresą ir telefono numerį. 1-2 sakiniais paaiškinkite, kodėl toks elgesys gali būti nesaugus.",
    2
  ),
  essay(
    "Jūsų draugė viešame forume atsako į klausimą ir pasirašo savo tikru vardu, nurodo mokyklą ir klasę. 1-2 sakiniais paaiškinkite, kodėl toks elgesys gali būti nesaugus.",
    2
  ),
]);

// ── Q10: Pagrindinis, 2 tšk., Ergonomika + Aplinka (Obj #2, #10) — essay ──
const q10 = () => pool(() => [
  essay(
    "Paaiškinkite, kuo skiriasi trumpalaikis ir ilgalaikis netaisyklingos sėdėsenos poveikis sveikatai. Atsakykite 2-3 sakiniais ir pateikite po vieną pavyzdį kiekvienam.",
    2
  ),
  essay(
    "Paaiškinkite, kuo skiriasi srautinio vaizdo įrašo ir tekstinės žinutės poveikis energijos suvartojimui. Atsakykite 2-3 sakiniais ir pateikite konkrečių skaičių ar palyginimų.",
    2
  ),
  essay(
    "Paaiškinkite, kuo skiriasi e-atliekų ir įprastų buitinių atliekų pavojingumas aplinkai. Atsakykite 2-3 sakiniais ir pateikite po vieną pavyzdį kiekvienam.",
    2
  ),
]);

// ── Q11: Pagrindinis, 2 tšk., Privatumas (Obj #3, #4) — essay ──
const q11 = () => pool(() => [
  essay(
    `Jūsų draugas sako: ${Q}Mano slaptažodis yra labai ilgas, todėl jis tikrai saugus.${QC} Ar jis teisus? Paaiškinkite 2-3 sakiniais, remdamiesi slaptažodžio stiprumo kriterijais.`,
    2
  ),
  essay(
    `Jūsų klasiokas sako: ${Q}Aš naudoju vienodą slaptažodį visur, nes jis labai stiprus.${QC} Ar toks elgesys saugus? Paaiškinkite 2-3 sakiniais, remdamiesi saugumo principais.`,
    2
  ),
  essay(
    `Jūsų draugė sako: ${Q}Man nereikia 2FA, nes mano slaptažodis yra labai sudėtingas.${QC} Ar ji teisi? Paaiškinkite 2-3 sakiniais, kodėl 2FA vis tiek svarbi.`,
    2
  ),
]);

// ── Q12: Pagrindinis, 2 tšk., Rizikos (Obj #7, #8) — essay ──
const q12 = () => pool(() => [
  essay(
    `Gaunate el. laišką: ${Q}Sveiki, jūsų paskyra bus užblokuota. Paspauskite nuorodą ir patvirtinkite duomenis per 24 val.${QC} Įvardinkite 2 phishing požymius šiame laiške ir paaiškinkite, ką darytumėte pagal saugaus reagavimo algoritmą.`,
    2
  ),
  essay(
    `Gaunate žinutę socialiniame tinkle: ${Q}Laimėjote telefoną! Paspaudę nuorodą, užpildykite formą su adresu ir telefono numeriu.${QC} Įvardinkite 2 phishing požymius šioje žinutėje ir paaiškinkite, ką darytumėte pagal saugaus reagavimo algoritmą.`,
    2
  ),
  essay(
    `Gaunate SMS žinutę: ${Q}Jūsų siunta laukia. Patvirtinkite pristatymą paspaudę nuorodą ir įvedę kortelės duomenis.${QC} Įvardinkite 2 phishing požymius šioje žinutėje ir paaiškinkite, ką darytumėte pagal saugaus reagavimo algoritmą.`,
    2
  ),
]);

// ── Q13: Aukštesnysis, 2 tšk., Integracija (Obj #13) — scenario ──
const q13 = () => pool(() => [
  essay(
    `Situacija: Mokinys sėdi labai arti ekrano, nedarė pertraukos 2 valandas, o greta jo ant stalo guli prijungtas telefonas, kuriame matosi nepažįstamo žmogaus žinutė su nuoroda ir tekstu ${Q}Skubiai patikrink!${QC}. Identifikuokite visas saugos problemas (fizinę ir skaitmeninę) ir kiekvienai pasiūlykite konkretų veiksmą. Atsakykite 3-4 sakiniais.`,
    2
  ),
  essay(
    `Situacija: Mokinė naudoja tą patį slaptažodį visoms paskyroms, sėdi ant žemos kėdės su pakeltu žvilgsniu į ekraną ir ką tik parsisiuntė failą iš nežinomo el. laiško, kuriame rašoma ${Q}Tavo foto iš vakarėlio!${QC}. Identifikuokite visas saugos problemas (fizinę ir skaitmeninę) ir kiekvienai pasiūlykite konkretų veiksmą. Atsakykite 3-4 sakiniais.`,
    2
  ),
  essay(
    `Situacija: Mokinys viešame ${Q}Wi-Fi${QC} tinkle prisijungia prie savo banko paskyros, naudoja trumpą slaptažodį be 2FA, o sėdėdamas laiko nešiojamąjį kompiuterį ant kelių jau trečią valandą be pertraukos. Identifikuokite visas saugos problemas (fizinę ir skaitmeninę) ir kiekvienai pasiūlykite konkretų veiksmą. Atsakykite 3-4 sakiniais.`,
    2
  ),
]);

// ── Q14: Aukštesnysis, 2 tšk., Aplinka + kritinis mąstymas (Obj #10, #11) — scenario ──
const q14 = () => pool(() => [
  essay(
    `Jūsų draugas sako: ${Q}Aš niekuo neprisidedu prie aplinkos taršos, nes naudoju tik telefoną, o ne gamyklą.${QC} Paaiškinkite 2-3 sakiniais, kodėl šis teiginys yra klaidingas, remdamiesi žiniomis apie skaitmeninį pėdsaką ir e-atliekas.`,
    2
  ),
  essay(
    `Jūsų klasiokė sako: ${Q}Debesija yra ekologiška, nes failai saugomi internete, o ne popieriuje.${QC} Paaiškinkite 2-3 sakiniais, kodėl šis teiginys yra klaidingas, remdamiesi žiniomis apie duomenų centrus ir energijos suvartojimą.`,
    2
  ),
  essay(
    `Jūsų draugas sako: ${Q}Seni telefonai niekam nekenkia, jei juos tiesiog išmetu į šiukšlių dėžę.${QC} Paaiškinkite 2-3 sakiniais, kodėl šis teiginys yra klaidingas, remdamiesi žiniomis apie e-atliekas ir jų poveikį aplinkai.`,
    2
  ),
]);

// ══════════════════════════════════════════════════════════════
// BUILD WORKBOOK
// ══════════════════════════════════════════════════════════════

async function build() {
  const wb = new ExcelJS.Workbook();
  const ws = wb.addWorksheet("Testmoz");

  // Collect all rows
  const allRows = [
    // Section: Slenkstinis MCQ
    ...sectionDivider("I DALIS. Uždari klausimai (8 taškai)"),
    ...q1(), ...q2(), ...q3(), ...q4(),
    // Section: Patenkinamas MCQ
    ...q5(), ...q6(), ...q7(), ...q8(),
    // Section: Essay
    ...sectionDivider("II DALIS. Atviri klausimai (8 taškai)"),
    ...q9(), ...q10(), ...q11(), ...q12(),
    // Section: Scenario
    ...sectionDivider("III DALIS. Scenarijų analizė (4 taškai)"),
    ...q13(), ...q14(),
  ];

  // Write rows to worksheet (no header row!)
  for (const row of allRows) {
    ws.addRow(row);
  }

  // Set column widths for readability (Testmoz ignores formatting)
  ws.getColumn(1).width = 80;
  ws.getColumn(2).width = 15;
  ws.getColumn(3).width = 10;
  ws.getColumn(4).width = 40;

  await wb.xlsx.writeFile(OUT);
  console.log("Assessment_Task.xlsx written to:", OUT);

  // ── Verification ──
  const verify = new ExcelJS.Workbook();
  await verify.xlsx.readFile(OUT);
  const vs = verify.getWorksheet("Testmoz");
  const totalRows = vs.rowCount;
  const poolCount = allRows.filter(r => r[0] === "POOL").length;
  const endCount = allRows.filter(r => r[0] === "END").length;
  console.log(`Verification: ${totalRows} rows, ${poolCount} POOLs, ${endCount} ENDs`);
  if (poolCount !== endCount) {
    console.error("ERROR: POOL/END mismatch!");
    process.exit(1);
  }
  if (poolCount !== 14) {
    console.error(`ERROR: Expected 14 pools, got ${poolCount}`);
    process.exit(1);
  }

  // Check first data row is NOT a header
  const r1 = vs.getRow(1);
  if (r1.getCell(1).value === "Question" || r1.getCell(2).value === "Points") {
    console.error("ERROR: Row 1 looks like a header row!");
    process.exit(1);
  }

  console.log("All checks passed.");
}

build().catch(e => { console.error(e); process.exit(1); });
