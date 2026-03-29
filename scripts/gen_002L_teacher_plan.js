const { Packer } = require("docx");
const fs = require("fs");
const h = require("./plan_helpers");

const content = [
  // ── Title ──────────────────────────────────────────────────────
  ...h.title("Privatumas ir paskyrų sauga"),

  // ── Metadata ───────────────────────────────────────────────────
  h.metaCard([
    ["Tipas", "L \u2014 Mokymosi pamoka (2 iš 7 apie saugą)"],
    ["Klasė", "9"],
    ["Trukmė", "~40 min."],
    ["Forma", "Demo \u2192 bandymas"],
    ["Temos ribos", "Ši pamoka apima stiprių slaptažodžių kūrimą, dviejų veiksnių autentifikacijos (2FA) logiką ir jautrių asmeninių duomenų atpažinimą. Neapima internetinių grėsmių (phishing), aplinkos poveikio ar ergonomikos."],
  ]),

  h.spacer(),

  // ── Objectives ─────────────────────────────────────────────────
  h.objectivesBox([
    "Paaiškinti, kas daro slaptažodį stiprų, ir sukurti slaptažodį pagal saugumo kriterijus.",
    "Apibūdinti, kaip veikia dviejų veiksnių autentifikacija ir kodėl ji padidina saugumą.",
    "Atskirti saugų ir nesaugų elgesį su asmeniniais duomenimis konkrečiose situacijose.",
  ]),

  // ── Start retrieval ────────────────────────────────────────────
  ...h.phaseHeader("Pamokos pradžios klausimai", "~4 min.", h.C.RETRIEVAL),

  h.labeledText("Formatas:", "žodinis. Klausimai skaidrėje."),
  h.labeledText("Klausimai iš praėjusios pamokos (ergonomika):", ""),

  h.question(1, "Kokia turėtų būti sėdėjimo laikysena prie kompiuterio? Įvardinkite 2 taisykles.", h.C.RETRIEVAL),
  h.question(2, "Ką reiškia 20-20-20 taisyklė?", h.C.RETRIEVAL),
  h.question(3, "Kodėl reikia daryti pertraukas, net kai nesijaučia pavargęs?", h.C.RETRIEVAL),

  h.bridgeText("Ryšys: \u201EPraeitą pamoką kalbėjome apie fizinę saugą \u2014 šiandien kalbėsime apie skaitmeninę: kaip apsaugoti savo paskyras ir duomenis.\u201C"),

  // ── Teaching phase ─────────────────────────────────────────────
  ...h.phaseHeader("Dėstymas ir vedama praktika", "~22 min.", h.C.TEACHING),

  // Sub-block 1
  h.subBlockHeading("Slaptažodžių sauga", "~10 min."),
  h.bodyPara("Parodykite skaidrėje silpnų slaptažodžių pavyzdžius: \u201E123456\u201C, \u201Eslaptazodis\u201C, vardas+gimimo metai."),
  h.bodyPara("Paaiškinkite stipraus slaptažodžio kriterijus:"),
  h.bulletPara("\u226512 simbolių"),
  h.bulletPara("Didžiosios ir mažosios raidės"),
  h.bulletPara("Skaičiai ir specialūs simboliai"),
  h.bulletPara("Ne asmeninė informacija"),
  h.bulletPara("Kiekviena paskyra \u2014 skirtingas slaptažodis"),
  h.labeledText("Supratimo patikrinimas:", "\u201EAr slaptažodis \u2018Katinas2024!\u2019 yra stiprus? Kodėl taip arba ne?\u201C"),
  h.bodyPara("Praktinis bandymas (~3 min.): Mokiniai sugalvoja stiprų slaptažodį pagal kriterijus (žodžiu, neįvedant į kompiuterį). 2\u20133 mokiniai pasidalina logika, ne pačiu slaptažodžiu."),

  // Sub-block 2
  h.subBlockHeading("Dviejų veiksnių autentifikacija", "~7 min."),
  h.bodyPara("Paaiškinkite 2FA logiką: kažkas, ką žinai (slaptažodis) + kažkas, ką turi (telefonas/kodas). Parodykite skaidrėje 2FA veikimo schemą."),
  h.bodyPara("Paaiškinkite: net jei slaptažodis pavogtas, be antrojo veiksnio prisijungti nepavyks."),
  h.warningBox(
    "manyti, kad 2FA = dviejų slaptažodžių turėjimas.",
    "2FA = du skirtingi veiksniai (žinojimas + turėjimas), ne du to paties tipo elementai."
  ),

  // Sub-block 3
  h.subBlockHeading("Jautrūs asmeniniai duomenys", "~5 min."),
  h.bodyPara("Paaiškinkite: ne visi duomenys vienodai jautrūs. Parodykite pavyzdžių skalę: vardas (mažai jautrus) \u2192 adresas \u2192 asmens kodas \u2192 banko duomenys (labai jautrus)."),
  h.labeledText("Supratimo patikrinimas:", "\u201EAr savo mokyklos pavadinimą galima skelbti viešai? O namų adresą?\u201C"),

  // ── Application phase ──────────────────────────────────────────
  ...h.phaseHeader("Savarankiška užduotis", "~8 min.", h.C.APPLICATION),

  h.bodyPara("Užduoties instrukcijos skaidrėje. Mokytojas perskaito 5 situacijas. Mokiniai žodžiu atsakinėja: saugu ar nesaugu? Kodėl?", { keepNext: true }),
  h.labeledText("Situacijos:", ""),
  h.bodyParaRuns([h.txt("1. ", { bold: true }), h.txt("Draugas prašo pasidalinti \u201ENetflix\u201C slaptažodžiu.")]),
  h.bodyParaRuns([h.txt("2. ", { bold: true }), h.txt("Svetainė prašo gimimo datos registruojantis žaidimui.")]),
  h.bodyParaRuns([h.txt("3. ", { bold: true }), h.txt("Nepažįstamas asmuo socialiniame tinkle klausia, kurioje mokykloje mokaisi.")]),
  h.bodyParaRuns([h.txt("4. ", { bold: true }), h.txt("El. parduotuvė prašo namų adreso pristatymui.")]),
  h.bodyParaRuns([h.txt("5. ", { bold: true }), h.txt("Klasiokas sako: \u201EDuok savo slaptažodį, aš tik pažiūrėsiu.\u201C")]),
  h.bodyPara("Po kiekvienos situacijos trumpai aptarkite teisingą atsakymą."),

  // ── End retrieval ──────────────────────────────────────────────
  ...h.phaseHeader("Pamokos pabaigos klausimai", "~3 min.", h.C.RETRIEVAL),

  h.labeledText("Formatas:", "žodinis. Klausimai skaidrėje."),
  h.question(1, "Kokie 3 kriterijai daro slaptažodį stiprų?", h.C.RETRIEVAL),
  h.question(2, "Kodėl 2FA padeda, net jei slaptažodis pavogtas?", h.C.RETRIEVAL),
  h.question(3, "Ar savo vardą ir pavardę skelbti internete saugu? Nuo ko tai priklauso?", h.C.RETRIEVAL),

  // ── Diary ──────────────────────────────────────────────────────
  ...h.diarySection("Pamokoje mokiniai nagrinėjo skaitmeninės paskyrų saugos pagrindus: stiprių slaptažodžių kūrimo kriterijus, dviejų veiksnių autentifikacijos veikimo principą ir jautrių asmeninių duomenų atpažinimą. Analizavo konkrečias situacijas ir vertino, ar elgesys su duomenimis yra saugus."),
];

const doc = h.buildPlanDoc(content);
const outPath = "Grade_9/Semester_1/01_Safety/002_L - Privacy & account safety/Teacher_Plan.docx";
Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync(outPath, buf);
  console.log("✓ " + outPath);
});
