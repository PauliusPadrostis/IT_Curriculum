const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, BorderStyle, ShadingType, AlignmentType, LevelFormat,
  Header, Footer, PageNumber
} = require("docx");
const fs = require("fs");

// ─── Color palette ───────────────────────────────────────────────
const C = {
  NAVY: "1F4E79",
  BLUE: "2E75B6",
  BODY: "333333",
  GREY: "808080",
  BORDER: "BFBFBF",
  TIP_BG: "DEEAF6",
  TIP_BORDER: "2E75B6",
  FUN_BG: "E2EFDA",
  FUN_BORDER: "548235",
  WHITE: "FFFFFF",
};

// ─── Helpers ─────────────────────────────────────────────────────
const THIN_BORDER = { style: BorderStyle.SINGLE, size: 1, color: C.BORDER };
const stdBorders = { top: THIN_BORDER, bottom: THIN_BORDER, left: THIN_BORDER, right: THIN_BORDER };
const NO_BORDER = { style: BorderStyle.NONE, size: 0, color: C.WHITE };
const PAGE_W = 11906;
const MARGIN = 1440;
const CONTENT_W = PAGE_W - 2 * MARGIN;

function txt(text, opts = {}) {
  return new TextRun({ font: "Arial", size: 22, color: C.BODY, ...opts, text });
}

function body(children, extra = {}) {
  return new Paragraph({
    spacing: { after: 100, line: 276 },
    ...extra,
    children: Array.isArray(children) ? children : [children],
  });
}

function h1(text) {
  return new Paragraph({
    spacing: { before: 360, after: 160 },
    keepNext: true, keepLines: true,
    children: [txt(text, { bold: true, size: 32, color: C.NAVY })],
  });
}

function h2(text) {
  return new Paragraph({
    spacing: { before: 280, after: 120 },
    keepNext: true, keepLines: true,
    children: [txt(text, { bold: true, size: 26, color: C.NAVY })],
  });
}

function h3(text) {
  return new Paragraph({
    spacing: { before: 200, after: 100 },
    keepNext: true, keepLines: true,
    children: [txt(text, { bold: true, size: 23, color: C.BLUE })],
  });
}

function rule(color = C.NAVY) {
  return new Paragraph({
    spacing: { before: 80, after: 80 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color, space: 1 } },
    children: [],
  });
}

function infoBox(title, content, bgColor, borderColor, textColor) {
  const leftBorder = { style: BorderStyle.SINGLE, size: 24, color: borderColor };
  return new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    columnWidths: [CONTENT_W],
    rows: [new TableRow({
      cantSplit: true,
      children: [new TableCell({
        shading: { type: ShadingType.CLEAR, fill: bgColor },
        borders: {
          top: NO_BORDER, bottom: NO_BORDER, right: NO_BORDER,
          left: leftBorder,
        },
        margins: { top: 100, bottom: 100, left: 160, right: 160 },
        width: { size: CONTENT_W, type: WidthType.DXA },
        children: [
          new Paragraph({
            spacing: { after: 60 },
            children: [txt(title, { bold: true, italics: true, color: borderColor, size: 22 })],
          }),
          ...content.map(line =>
            new Paragraph({
              spacing: { after: 40 },
              children: [txt(line, { italics: true, color: textColor || borderColor, size: 21 })],
            })
          ),
        ],
      })],
    })],
  });
}

function tipBox(title, lines) {
  return infoBox(title, lines, C.TIP_BG, C.TIP_BORDER, C.NAVY);
}

function funBox(lines) {
  return infoBox("Ar žinojai?", lines, C.FUN_BG, C.FUN_BORDER, "2D5016");
}

function termTable(terms) {
  const COL1 = 3200;
  const COL2 = CONTENT_W - COL1;
  const cellMargins = { top: 60, bottom: 60, left: 100, right: 100 };

  const headerRow = new TableRow({
    tableHeader: true, cantSplit: true,
    children: [
      new TableCell({
        shading: { type: ShadingType.CLEAR, fill: C.NAVY },
        width: { size: COL1, type: WidthType.DXA },
        borders: stdBorders, margins: cellMargins,
        children: [body([txt("Sąvoka", { bold: true, color: C.WHITE })])],
      }),
      new TableCell({
        shading: { type: ShadingType.CLEAR, fill: C.NAVY },
        width: { size: COL2, type: WidthType.DXA },
        borders: stdBorders, margins: cellMargins,
        children: [body([txt("Paaiškinimas", { bold: true, color: C.WHITE })])],
      }),
    ],
  });

  const rows = terms.map((t, i) => {
    const fill = i % 2 === 0 ? "F5F5F5" : C.WHITE;
    return new TableRow({
      cantSplit: true,
      children: [
        new TableCell({
          shading: { type: ShadingType.CLEAR, fill },
          width: { size: COL1, type: WidthType.DXA },
          borders: stdBorders, margins: cellMargins,
          children: [body([
            txt(t.lt, { bold: true }),
            txt(` (angl. `, { size: 20 }),
            txt(t.en, { italics: true, size: 20 }),
            txt(`)`, { size: 20 }),
          ])],
        }),
        new TableCell({
          shading: { type: ShadingType.CLEAR, fill },
          width: { size: COL2, type: WidthType.DXA },
          borders: stdBorders, margins: cellMargins,
          children: [body([txt(t.def)])],
        }),
      ],
    });
  });

  return new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    columnWidths: [COL1, COL2],
    rows: [headerRow, ...rows],
  });
}

function numberedItem(num, boldLead, rest) {
  return body([
    txt(`${num}. `, { bold: true, color: C.NAVY }),
    txt(boldLead, { bold: true }),
    txt(rest),
  ]);
}

// ─── CONTENT ─────────────────────────────────────────────────────

const terms = [
  { lt: "Slaptažodis", en: "password", def: "Slaptas simbolių rinkinys, kuriuo patvirtinate savo tapatybę prisijungdami prie paskyros." },
  { lt: "Stiprus slaptažodis", en: "strong password", def: "Slaptažodis, kurį sunku atspėti: ilgas, sudarytas iš įvairių simbolių, nesusijęs su asmenine informacija." },
  { lt: "Dviejų veiksnių autentifikacija (2FA)", en: "two-factor authentication", def: "Prisijungimo būdas, kai be slaptažodžio reikia dar vieno patvirtinimo, pavyzdžiui, kodo iš telefono." },
  { lt: "Asmeniniai duomenys", en: "personal data", def: "Informacija, pagal kurią galima atpažinti konkretų žmogų: vardas, adresas, telefono numeris." },
  { lt: "Jautrūs duomenys", en: "sensitive data", def: "Ypač saugi asmeninė informacija: asmens kodas, slaptažodis, banko duomenys." },
  { lt: "Slaptažodžių valdyklė", en: "password manager", def: "Programa, kuri saugiai išsaugo visus jūsų slaptažodžius vienoje vietoje." },
  { lt: "Paskyra", en: "account", def: "Jūsų asmeninis prisijungimas prie svetainės ar programos (pvz., el. pašto paskyra)." },
];

const sections = [];

// ── HEADER ───────────────────────────────────────────────────────
sections.push(
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 40 },
    children: [txt("TEORIJOS PAKETAS", { size: 18, color: C.GREY, allCaps: true })],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 40 },
    children: [txt("Privatumas ir paskyrų sauga", { bold: true, size: 36, color: C.NAVY })],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 80 },
    children: [txt("9 klasė  \u2022  Sauga  \u2022  1 semestras", { size: 20, color: C.GREY })],
  }),
  rule(C.NAVY),
);

// ── 1. ĮVADAS ────────────────────────────────────────────────────
sections.push(
  h1("Įvadas"),
  body([txt("Jūs turite el. pašto paskyrą, galbūt naudojatės socialiniu tinklu ar žaidimų platforma. Kiekvienai paskyrai reikia slaptažodžio. O ar jūsų slaptažodis tikrai saugus?")]),
  body([txt("Kasmet nuteka milijonai slaptažodžių. Jei kas nors sužino jūsų slaptažodį, gali perskaityti jūsų žinutes, skelbti dalykus jūsų vardu ar pavogti asmeninius duomenis.")]),
  body([txt("Šiame pakete sužinosite, kaip sukurti stiprų slaptažodį, kas yra dviejų veiksnių autentifikacija ir kaip atskirti jautrią informaciją nuo viešos.")]),
);

// ── 2. PAGRINDINĖS SĄVOKOS ──────────────────────────────────────
sections.push(
  h1("Pagrindinės sąvokos"),
  termTable(terms),
);

// ── 3. SLAPTAŽODŽIŲ SAUGA ───────────────────────────────────────
sections.push(
  h1("1. Slaptažodžių sauga"),
  body([txt("Slaptažodis yra pirmoji ir svarbiausia apsaugos priemonė. Tačiau ne kiekvienas slaptažodis yra saugus.")]),

  h3("Kas daro slaptažodį stiprų?"),
  body([txt("\u2022 Ilgis: bent 12 simbolių. Kuo ilgesnis, tuo sunkiau atspėti.")]),
  body([txt("\u2022 Simbolių įvairovė: didžiosios ir mažosios raidės, skaičiai, specialieji simboliai (!@#$).")]),
  body([txt("\u2022 Jokios asmeninės informacijos: ne jūsų vardas, ne gimimo data, ne augintinio vardas.")]),
  body([txt("\u2022 Unikalumas: kiekvienai paskyrai reikia atskiro slaptažodžio.")]),

  h3("Kaip sukurti stiprų ir lengvai įsimenamą slaptažodį?"),
  body([txt("Naudokite frazės metodą. Pasirinkite kelis nesusijusius žodžius ir sujunkite juos su skaičiais ar simboliais.")]),
  body([
    txt("Pavyzdys: ", { bold: true }),
    txt("\u201EDebesis7!Stalas_Raudonas\u201C. Ši frazė ilga, turi įvairių simbolių ir lengvai įsimenama."),
  ]),
  body([
    txt("Blogas pavyzdys: ", { bold: true }),
    txt("\u201Epetras2010!\u201C. Čia yra vardas ir gimimo metai. Tokį slaptažodį lengva atspėti."),
  ]),

  tipBox("Svarbu", [
    "Vienas stiprus slaptažodis visoms paskyroms nepadės. Jei jis nutekės, pažeidžiamos visos jūsų paskyros. Kiekvienai paskyrai naudokite atskirą slaptažodį.",
  ]),

  h3("Slaptažodžių valdyklė"),
  body([txt("Atsiminti daug skirtingų slaptažodžių sunku. Tam yra slaptažodžių valdyklė: programa, kuri saugiai saugo visus slaptažodžius.")]),
  body([txt("Jums tereikia atsiminti vieną pagrindinį slaptažodį. Valdyklė sugeneruos stiprius slaptažodžius visoms paskyroms.")]),

  funBox([
    "Nacionalinis kibernetinio saugumo centras (NKSC) rekomenduoja naudoti slaptažodžių valdykles ir vengti slaptažodžių saugojimo naršyklėje.",
  ]),
);

// ── 4. DVIEJŲ VEIKSNIŲ AUTENTIFIKACIJA ─────────────────────────
sections.push(
  h1("2. Dviejų veiksnių autentifikacija (2FA)"),
  body([txt("Slaptažodis vienas ne visada apsaugo. Kas nutinka, jei jį kažkas sužino? Tam yra papildoma apsauga: dviejų veiksnių autentifikacija.")]),

  h3("Kaip veikia 2FA?"),
  body([txt("Prisijungimas vyksta dviem etapais:")]),
  body([
    txt("1. Pirmas veiksnys: ", { bold: true }),
    txt("tai, ką žinote. Įvedate slaptažodį."),
  ]),
  body([
    txt("2. Antras veiksnys: ", { bold: true }),
    txt("tai, ką turite arba kas esate. Pavyzdžiui, kodas iš telefono programėlės, SMS žinutė arba piršto antspaudas."),
  ]),
  body([txt("Jei kas nors pavogs jūsų slaptažodį, be antrojo veiksnio prisijungti negalės.")]),

  h3("Kasdienė analogija"),
  body([txt("Durų užraktas apsaugo namus. Tačiau signalizacijos kodas suteikia papildomą apsaugą. Net atidarius duris raktu, signalizacija suveiks.")]),
  body([txt("Slaptažodis yra raktas. 2FA yra signalizacija.")]),

  tipBox("Svarbu", [
    "Įjunkite 2FA bent el. pašto paskyroje. El. paštu dažnai atkuriami kitų paskyrų slaptažodžiai. Apsaugojus el. paštą, apsaugomos ir kitos paskyros.",
  ]),

  funBox([
    "Europos Sąjungos kibernetinio saugumo agentūra ENISA rekomenduoja naudoti 2FA visose paskyrose. ENISA nurodo, kad SMS kodai yra geriau nei nieko, bet saugiausi yra specialūs USB raktai arba autentifikavimo programėlės.",
  ]),
);

// ── 5. JAUTRŪS ASMENINIAI DUOMENYS ──────────────────────────────
sections.push(
  h1("3. Asmeniniai duomenys ir jų saugojimas"),
  body([txt("Internete dalinamės įvairia informacija. Tačiau ne visa informacija yra vienodai pavojinga, jei ji pateks į svetimas rankas.")]),

  h3("Trijų lygių skirstymas"),
  body([
    txt("Jautrūs duomenys: ", { bold: true }),
    txt("asmens kodas, slaptažodis, banko kortelės numeris, namų adresas. Šių duomenų niekada nesidalinkite internete."),
  ]),
  body([
    txt("Vidutinio jautrumo duomenys: ", { bold: true }),
    txt("el. pašto adresas, telefono numeris, mokyklos pavadinimas. Dalinkitės tik patikimose svetainėse."),
  ]),
  body([
    txt("Vieša informacija: ", { bold: true }),
    txt("pomėgiai, mėgstama muzika, sporto komanda. Šią informaciją galima dalintis laisviau."),
  ]),

  h3("Situacijos, kurias verta atpažinti"),
  body([txt("Ne visada lengva atskirti, ar prašymas pateikti duomenis yra pagrįstas. Štai keletas pavyzdžių:")]),
  body([txt("\u2022 Draugas prašo jūsų slaptažodžio \u201Etik patikrinti\u201C. Tai nesaugu, net jei draugas patikimas.")]),
  body([txt("\u2022 Svetainė prašo asmens kodo registracijos metu. Pagalvokite: ar tikrai reikia? Žaidimų forumui asmens kodas nereikalingas.")]),
  body([txt("\u2022 Nepažįstamas žmogus socialiniame tinkle siūlo prizą ir prašo telefono numerio. Tai gali būti sukčiavimas.")]),

  tipBox("Svarbu", [
    "Prieš pateikdami bet kokius duomenis, paklauskite savęs: ar ši svetainė tikrai to reikalauja? Ar aš tikrai žinau, kas prašo?",
  ]),

  funBox([
    "Valstybinė duomenų apsaugos inspekcija (VDAI) yra parengusi gaires mokiniams apie saugų elgesį internete. Pagal Europos Sąjungos Bendrąjį duomenų apsaugos reglamentą (BDAR), jaunesniems nei 16 metų asmenims internete teikti paslaugas galima tik su tėvų sutikimu.",
  ]),
);

// ── 6. PRAKTINIAI PATARIMAI ────────────────────────────────────
sections.push(
  h1("Praktiniai patarimai"),
  numberedItem(1, "Sukurkite stiprų slaptažodį: ", "bent 12 simbolių, be vardo ar gimimo datos."),
  numberedItem(2, "Naudokite frazės metodą: ", "sujunkite kelis nesusijusius žodžius su skaičiais ir simboliais."),
  numberedItem(3, "Kiekvienai paskyrai naudokite atskirą slaptažodį: ", "jei vienas nutekės, kitos paskyros liks saugios."),
  numberedItem(4, "Įjunkite 2FA: ", "pradėkite nuo el. pašto paskyros, tada pridėkite prie kitų paskyrų."),
  numberedItem(5, "Nesidalinkite slaptažodžiais: ", "net su draugais. Slaptažodis yra tik jūsų."),
  numberedItem(6, "Patikrinkite svetainę prieš pateikdami duomenis: ", "ar ji tikrai reikalauja tos informacijos?"),
  numberedItem(7, "Naudokite slaptažodžių valdyklę: ", "ji padės sukurti ir atsiminti stiprius slaptažodžius."),
  numberedItem(8, "Padėkite draugui: ", "jei matote, kad kažkas dalijasi jautriais duomenimis, pasakykite jam apie rizikas."),
);

// ── 7. PASITIKRINK SAVE ─────────────────────────────────────────
const questions = [
  // Slenkstinis (2)
  "Išvardinkite bent tris stipraus slaptažodžio kriterijus.",
  "Kas yra dviejų veiksnių autentifikacija?",
  // Patenkinamas (2)
  "Paaiškinkite, kodėl vienas slaptažodis visoms paskyroms yra pavojingas.",
  "Kodėl el. pašto adresas laikomas vidutinio jautrumo duomenimis, o ne viešais?",
  // Pagrindinis (2)
  "Jūsų draugas naudoja slaptažodį \u201EJonas2010!\u201C visoms savo paskyroms. Ką jam patartumėte pakeisti ir kodėl?",
  "Žaidimų svetainė registracijos metu prašo nurodyti namų adresą ir telefono numerį. Kaip pasielgtumėte ir kodėl?",
  // Aukštesnysis (2)
  "Kodėl net stiprus slaptažodis vienas negarantuoja visiškos apsaugos? Kaip ją sustiprinti?",
  "Jūsų klasės draugas sako: \u201ENiekada nenaudosiu 2FA, nes tai per sudėtinga.\u201C Pateikite argumentus, kurie galėtų pakeisti jo nuomonę.",
];

sections.push(h1("Pasitikrink save"));
questions.forEach((q, i) => {
  sections.push(body([
    txt(`${i + 1}. `, { bold: true, color: C.NAVY }),
    txt(q),
  ]));
});

// ── 8. SUŽINOK DAUGIAU ──────────────────────────────────────────
sections.push(
  h1("Sužinok daugiau"),
  body([txt("Jei nori giliau suprasti šią temą:")]),
  body([txt("\u2022 Nacionalinis kibernetinio saugumo centras (NKSC) skelbia rekomendacijas apie slaptažodžių saugumą: nksc.lt.")]),
  body([txt("\u2022 Valstybinė duomenų apsaugos inspekcija (VDAI) turi gaires mokiniams apie saugų elgesį internete: vdai.lrv.lt.")]),
  body([txt("\u2022 Jei domina, kaip veikia slaptažodžių valdyklės, paieškok \u201Epassword manager for students\u201C (anglų k.).")]),
  body([txt("\u2022 Pabandyk patikrinti, ar tavo el. pašto adresas nebuvo nutekėjime: haveibeenpwned.com (anglų k.).")]),
);

// ── 9. ŠALTINIAI ────────────────────────────────────────────────
sections.push(
  rule(C.GREY),
  new Paragraph({
    spacing: { before: 80, after: 40 },
    children: [txt("Šaltiniai", { bold: true, italics: true, size: 18, color: C.GREY })],
  }),
  body([txt("Nacionalinis kibernetinio saugumo centras (NKSC). Slaptažodžių saugumo biuletenis. nksc.lt.", { size: 18, italics: true, color: C.GREY })]),
  body([txt("Valstybinė duomenų apsaugos inspekcija (VDAI). Saugaus elgesio internete gairės vaikams ir paaugliams. vdai.lrv.lt.", { size: 18, italics: true, color: C.GREY })]),
  body([txt("Europos Sąjungos kibernetinio saugumo agentūra (ENISA). Tips for secure user authentication. enisa.europa.eu.", { size: 18, italics: true, color: C.GREY })]),
  body([txt("Microsoft. Kas yra dviejų dalių autentifikavimas (2FA)? microsoft.com/lt-lt/security.", { size: 18, italics: true, color: C.GREY })]),
);

// ─── Build document ──────────────────────────────────────────────
const doc = new Document({
  styles: {
    default: {
      document: { run: { font: "Arial", size: 22, color: C.BODY } },
    },
  },
  sections: [{
    properties: {
      page: {
        size: { width: 11906, height: 16838 },
        margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 },
      },
    },
    headers: {
      default: new Header({
        children: [new Paragraph({
          alignment: AlignmentType.RIGHT,
          children: [txt("Privatumas ir paskyrų sauga", { size: 16, color: C.GREY, italics: true })],
        })],
      }),
    },
    footers: {
      default: new Footer({
        children: [new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({ font: "Arial", size: 16, color: C.GREY, children: [PageNumber.CURRENT] }),
          ],
        })],
      }),
    },
    children: sections,
  }],
});

// ─── Write ───────────────────────────────────────────────────────
const outDir = "Grade_9/Semester_1/01_Safety/002_L - Privacy & account safety";
Packer.toBuffer(doc).then(buf => {
  const outPath = `${outDir}/002_L_Privatumas_Theory_Pack.docx`;
  fs.writeFileSync(outPath, buf);
  console.log(`✓ ${outPath} generated`);
});
