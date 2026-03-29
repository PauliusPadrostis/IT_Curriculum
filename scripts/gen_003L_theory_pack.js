const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, BorderStyle, ShadingType, AlignmentType
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
        borders: { top: NO_BORDER, bottom: NO_BORDER, right: NO_BORDER, left: leftBorder },
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

function bullet(text) {
  return new Paragraph({
    spacing: { after: 60, line: 276 },
    indent: { left: 720, hanging: 360 },
    children: [txt("\u2022 " + text)],
  });
}

// ─── CONTENT ─────────────────────────────────────────────────────

const terms = [
  { lt: "Sukčiavimas internete", en: "phishing", def: "Bandymas apgaule išvilioti asmeninius duomenis (slaptažodžius, kortelės numerius) apsimetant patikimu šaltiniu." },
  { lt: "Socialinė inžinerija", en: "social engineering", def: "Manipuliacija žmonėmis siekiant gauti informaciją arba priversti atlikti veiksmą. Atakuojamas žmogus, ne kompiuteris." },
  { lt: "Klaidinga informacija", en: "misinformation", def: "Netiksli informacija, platinama netyčia. Žmogus pats tiki, kad tai tiesa." },
  { lt: "Dezinformacija", en: "disinformation", def: "Sąmoningai kuriama ir platinama melaginga informacija, kurios tikslas yra apgauti." },
  { lt: "Kenkėjiška nuoroda", en: "malicious link", def: "Nuoroda, kuri atrodo kaip tikra, bet veda į pavojingą svetainę arba atsiunčia kenkėjišką programą." },
  { lt: "Skubos spaudimas", en: "urgency pressure", def: "Manipuliacijos technika: aukos verčiamos veikti greitai, nespėjus pagalvoti." },
  { lt: "Saugaus reagavimo algoritmas", en: "safe response protocol", def: "Trijų žingsnių veiksmų seka įtartinai situacijai internete: sustoti, patikrinti, pranešti." },
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
    children: [txt("Internetinės rizikos ir saugaus reagavimo logika", { bold: true, size: 36, color: C.NAVY })],
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
  body([txt("Gavote el. laišką: \u201EJūsų paskyra bus užblokuota per 24 valandas. Spauskite čia.\u201C Širdis pradeda plakti greičiau. Norite paspausti. Bet ar reikia?")]),
  body([txt("Internete ne viskas yra tai, kuo atrodo. Žinutės gali būti suklastotos, naujienos \u2014 prasimanytos, o draugiškas prašymas \u2014 manipuliacija. Gebėjimas atpažinti grėsmes ir tinkamai reaguoti yra vienas svarbiausių įgūdžių skaitmeniniame pasaulyje.")]),
  body([txt("Šiame pakete sužinosite, kaip veikia phishing, socialinė inžinerija ir melagienos. Išmoksite trijų žingsnių algoritmą, kuris padės saugiai reaguoti bet kurioje įtartinoje situacijoje.")]),
);

// ── 2. PAGRINDINĖS SĄVOKOS ──────────────────────────────────────
sections.push(
  h1("Pagrindinės sąvokos"),
  termTable(terms),
);

// ── 3. PHISHING ─────────────────────────────────────────────────
sections.push(
  h1("1. Sukčiavimas internete (phishing)"),

  h3("Kas tai?"),
  body([txt("Phishing \u2014 tai bandymas apgaule priversti jus atskleisti asmeninius duomenis: slaptažodžius, banko kortelės numerius, prisijungimo informaciją. Sukčius apsimeta patikimu šaltiniu: banku, mokykla, socialinio tinklo administracija.")]),
  body([txt("Žodis kilęs iš anglų kalbos žodžio \u201Efishing\u201C (žvejyba). Sukčius \u201Ežvejoja\u201C aukas: išmeta masalą ir laukia, kas \u201Eįkąs\u201C.")]),

  h3("Kaip atpažinti phishing žinutę?"),
  body([txt("Dauguma phishing žinučių turi bent kelis iš šių požymių:")]),
  bullet("Skubos spaudimas: \u201EPer 24 val. jūsų paskyra bus užblokuota!\u201C, \u201EReaguokite dabar!\u201C"),
  bullet("Netikėtas ar nežinomas siuntėjas: laiškas ateina iš adreso, kurio nepažįstate."),
  bullet("Prašoma asmeninės informacijos: slaptažodžio, kortelės numerio, asmens kodo."),
  bullet("Klaidos tekste: rašybos klaidos, keistas formatavimas, netaisyklingos lietuviškos raidės."),
  bullet("Nuoroda, kuri neatitinka tikrojo adreso: pvz., rašoma \u201Einstagram.com\u201C, bet tikrasis adresas yra \u201Einstagrarn-security.com\u201C (pastebėkite klaidą raidėje)."),

  tipBox("Svarbu", [
    "Phishing gali būti ne tik el. laiške. Sukčiai siunčia apgaulingas žinutes per SMS (tai vadinama smishing), socialinius tinklus ir net telefonu (vishing). Būkite budrūs visur.",
  ]),

  h3("Phishing pavyzdys"),
  body([txt("Gaunate el. laišką:")]),
  body([txt("\u201ENuo: saugumas@faceb00k-security.com"), txt("")]),
  body([txt("Tema: Jūsų paskyra pažeista!")]),
  body([txt("Gerbiamas vartotojau, aptikome įtartiną veiklą jūsų paskyroje. Patvirtinkite savo tapatybę per 12 valandų, kitaip paskyra bus ištrinta. Spauskite čia: www.faceb00k-verify.com\u201C")]),
  body([txt("Požymiai: netikras siuntėjo adresas (faceb00k su nuliais vietoj raidžių \u201Eo\u201C), skubos spaudimas (12 valandų), prašoma paspausti nuorodą, nuoroda nesutampa su tikruoju adresu.")]),

  funBox([
    "Nacionalinis kibernetinio saugumo centras (NKSC) kasmet organizuoja phishing imitacines pratybas \u201EPhishEx\u201C. 2025 m. jose dalyvavo daugiau nei 50 000 žmonių. Rezultatai parodė, kad net patyrę darbuotojai kartais paspaudžia apgaulingas nuorodas.",
  ]),
);

// ── 4. SOCIALINĖ INŽINERIJA ──────────────────────────────────────
sections.push(
  h1("2. Socialinė inžinerija"),

  h3("Kas tai?"),
  body([txt("Socialinė inžinerija \u2014 tai manipuliacija žmonėmis siekiant priversti juos savanoriškai atskleisti informaciją arba atlikti veiksmą. Čia atakuojamas žmogus, ne kompiuteris.")]),
  body([txt("Phishing yra viena socialinės inžinerijos formų. Tačiau socialinė inžinerija apima ir kitus būdus.")]),

  h3("Dažniausios formos"),
  bullet("Apsimetimas kitu asmeniu: sukčius prisistatoma IT darbuotoju, mokytoju ar draugu ir prašo slaptažodžio arba kitų duomenų."),
  bullet("Emocinis spaudimas: \u201EJei neatsiųsi man savo slaptažodžio, nebūsime draugai\u201C arba \u201EMan labai reikia, padėk.\u201C"),
  bullet("Netikri konkursai ir prizai: \u201ELaimėjote 500 \u20AC! Įveskite kortelės duomenis.\u201C"),
  bullet("Pretekstas (angl. pretexting): sukčius sukuria įtikinamą istoriją, kodėl jam reikia jūsų informacijos."),

  body([txt("Pagrindinė taisyklė: jei kas nors bando priversti jus skubėti, jaustis kaltais ar baimintis, tai dažniausiai yra manipuliacija.")]),

  tipBox("Kaip atskirti?", [
    "Tikras žmogus nesistengs jūsų skubinti. Jei kas nors prašo asmeninės informacijos ir spaudžia reaguoti greitai, sustokite ir pagalvokite.",
  ]),
);

// ── 5. KLAIDINGA INFORMACIJA IR DEZINFORMACIJA ──────────────────
sections.push(
  h1("3. Klaidinga informacija ir dezinformacija"),

  h3("Kuo skiriasi?"),
  body([
    txt("Klaidinga informacija (angl. misinformation): ", { bold: true }),
    txt("netiksli informacija, platinama netyčia. Žmogus tiki, kad tai tiesa, ir pasidalina su kitais. Pavyzdys: draugas persiuntė straipsnį apie sveikatą, kuriame pateikti nepatvirtinti teiginiai."),
  ]),
  body([
    txt("Dezinformacija (angl. disinformation): ", { bold: true }),
    txt("sąmoningai kuriama ir platinama melaginga informacija. Tikslas \u2014 apgauti, sukelti baimę arba paveikti nuomonę. Pavyzdys: suklastotas vaizdo įrašas, paskleistas prieš rinkimus."),
  ]),
  body([txt("Skirtumas vienas: tikslas. Klaidingą informaciją žmonės platina nežinodami, kad ji netiksli. Dezinformaciją kuria ir platina tyčia.")]),

  h3("Kaip atpažinti?"),
  bullet("Šaltinis neaiškus arba jo nėra. Kas parašė straipsnį?"),
  bullet("Nėra nuorodų į tyrimus ar duomenis."),
  bullet("Kiti patikimi šaltiniai šios informacijos nepatvirtina."),
  bullet("Antraštė šokiruoja arba provokuoja: \u201EMokslininkai įrodė, kad...\u201C be jokių įrodymų."),
  bullet("Svetainė neturi kontaktų skilties, redakcijos ar \u201EApie mus\u201C puslapio."),

  funBox([
    "Europos Komisija parengė gaires mokytojams, kaip ugdyti mokinių gebėjimą atpažinti dezinformaciją. Gairėse rekomenduojama šaltinių tikrinimą pradėti nuo paprasto klausimo: \u201EKas tai parašė ir kodėl?\u201C",
  ]),
);

// ── 6. SAUGAUS REAGAVIMO ALGORITMAS ─────────────────────────────
sections.push(
  h1("4. Saugaus reagavimo algoritmas"),

  body([txt("Kai susiduriate su įtartina situacija internete, taikykite trijų žingsnių algoritmą:")]),

  h3("1 žingsnis: SUSTOTI"),
  body([txt("Nespaudykite jokių nuorodų. Neatsakykite į žinutę. Nesidalinkite informacija. Pirmas impulsas dažnai yra neteisingas.")]),
  body([txt("Sukčiai sąmoningai kuria skubos jausmą, kad nespėtumėte pagalvoti. Sustojimas yra pirmoji ir svarbiausia gynyba.")]),

  h3("2 žingsnis: PATIKRINTI"),
  body([txt("Užduokite sau klausimus:")]),
  bullet("Ar siuntėjas tikras? Patikrinkite el. pašto adresą raidė po raidės."),
  bullet("Ar ši informacija patvirtinta kituose šaltiniuose? Paieškokite patys."),
  bullet("Ar nuorodos adresas atrodo teisingas? Užveskite pelę (nespauskite!) ir pažiūrėkite tikrąjį adresą."),
  bullet("Ar kas nors spaudžia jus skubėti? Tai įtartinas požymis."),

  h3("3 žingsnis: PRANEŠTI"),
  body([txt("Informuokite žmogų, kuris gali padėti:")]),
  bullet("Tėvus ar globėjus."),
  bullet("Mokytoją."),
  bullet("Paskyros administratorių (socialinio tinklo, el. pašto)."),
  bullet("Jei reikia: Lietuvos policijos elektroninių nusikaltimų skyrių arba NKSC."),

  tipBox("Svarbu", [
    "Ignoruoti neužtenka. Jei tiesiog ištrinsite žinutę ir nieko nesakysite, sukčius bandys dar kartą \u2014 galbūt su jumis, galbūt su kuo nors kitu. Pranešimas padeda apsaugoti ir kitus žmones.",
  ]),
);

// ── 7. PRAKTINIAI PATARIMAI ──────────────────────────────────────
sections.push(
  h1("Praktiniai patarimai"),
  numberedItem(1, "Neskubėkite: ", "gavę netikėtą žinutę ar el. laišką, visada taikykite algoritmą. Skubėjimas yra sukčių ginklas."),
  numberedItem(2, "Tikrinkite siuntėjo adresą: ", "atidžiai perskaitykite el. pašto adresą. Viena raidė gali skirti tikrą adresą nuo suklastoto."),
  numberedItem(3, "Nesidalinkite slaptažodžiais: ", "niekam, net geriausiam draugui. Tikros organizacijos niekada neprašo slaptažodžio el. laišku."),
  numberedItem(4, "Tikrinkite informaciją keliuose šaltiniuose: ", "jei naujiena atrodo neįtikėtina, suraskite bent 2 kitus patikimus šaltinius, kurie ją patvirtina."),
  numberedItem(5, "Neatidarykite įtartinų priedų: ", "jei el. laiške yra priedas iš nežinomo siuntėjo, jo neatidarykite. Tai gali būti kenkėjiška programa."),
  numberedItem(6, "Pranešite suaugusiajam: ", "jei gavote įtartiną žinutę, papasakokite tėvams arba mokytojui. Pranešti nėra gėda."),
  numberedItem(7, "Padėkite kitiems: ", "jei matote, kad draugas gauna apgaulingą žinutę arba tiki nepatikrinta informacija, perspėkite jį."),
);

// ── 8. PASITIKRINK SAVE ──────────────────────────────────────────
sections.push(
  h1("Pasitikrink save"),
  numberedItem(1, "", "Kas yra phishing? Paaiškinkite savo žodžiais."),
  numberedItem(2, "", "Įvardinkite 3 tipinius phishing žinutės požymius."),
  numberedItem(3, "", "Kuo skiriasi klaidinga informacija nuo dezinformacijos? Pateikite po vieną pavyzdį."),
  numberedItem(4, "", "Kodėl socialinė inžinerija yra pavojinga, nors atakuojamas žmogus, o ne kompiuteris?"),
  numberedItem(5, "", "Gavote el. laišką iš \u201Ebanko\u201C, kuriame prašoma skubiai patvirtinti duomenis. Aprašykite, ką darytumėte kiekviename algoritmo žingsnyje."),
  numberedItem(6, "", "Socialiniame tinkle matote straipsnį: \u201EMokslininkai įrodė, kad energiniai gėrimai gerina atmintį.\u201C Straipsnyje nėra nuorodų į tyrimus. Kaip patikrintumėte šią informaciją?"),
  numberedItem(7, "", "Jūsų draugas mano, kad gavo tikrą prizą internete, ir rengiasi įvesti kortelės duomenis. Ką jam pasakytumėte ir kodėl?"),
  numberedItem(8, "", "Sugalvokite savo phishing žinutės pavyzdį. Pažymėkite, kurie požymiai padėtų ją atpažinti."),
);

// ── 9. SUŽINOK DAUGIAU ──────────────────────────────────────────
sections.push(
  h1("Sužinok daugiau"),
  body([txt("Jei nori giliau suprasti šią temą:")]),
  bullet("NKSC kibernetinio saugumo mokymai (nemokami): nksc.lt/mokymai. Rasi interaktyvių pratybų, kaip atpažinti phishing."),
  bullet("Draugiškas internetas (draugiskasinternetas.lt): patarimai moksleiviams apie saugų elgesį internete."),
  bullet("Skaitmeninės etikos centras (e-etika.lt): straipsniai apie dezinformaciją, skaitmeninę apgaulę ir saugumą (lietuvių k.)."),
  bullet("Europos Komisijos gairės mokytojams apie dezinformaciją (anglų k.): education.ec.europa.eu."),
);

// ── 10. ŠALTINIAI ────────────────────────────────────────────────
sections.push(
  new Paragraph({
    spacing: { before: 200, after: 60 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: C.GREY, space: 1 } },
    children: [],
  }),
  body([txt("Šaltiniai", { bold: true, italics: true, size: 18, color: C.GREY })]),
  body([txt("NKSC (2025). Kibernetinio saugumo mokymai. nksc.lt/mokymai", { italics: true, size: 18, color: C.GREY })]),
  body([txt("Draugiškas internetas (2024). Interneto saugumo ugdymo medžiaga. draugiskasinternetas.lt", { italics: true, size: 18, color: C.GREY })]),
  body([txt("Skaitmeninės etikos centras (2025). Saugumas internete. e-etika.lt", { italics: true, size: 18, color: C.GREY })]),
  body([txt("Europos Komisija (2026). Guidelines for Teachers on Tackling Disinformation. education.ec.europa.eu", { italics: true, size: 18, color: C.GREY })]),
  body([txt("ENISA (2025). Threat Landscape Report. enisa.europa.eu", { italics: true, size: 18, color: C.GREY })]),
);

// ── BUILD DOCUMENT ───────────────────────────────────────────────
const doc = new Document({
  styles: {
    default: {
      document: { run: { font: "Arial", size: 22, color: C.BODY } },
    },
  },
  sections: [{
    properties: {
      page: {
        size: { width: PAGE_W, height: 16838 },
        margin: { top: MARGIN, bottom: MARGIN, left: MARGIN, right: MARGIN },
      },
    },
    children: sections,
  }],
});

const outDir = "Grade_9/Semester_1/01_Safety/003_L - Online risks & safe response logic";
const outPath = outDir + "/003_L_Internetines_rizikos_Theory_Pack.docx";
Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync(outPath, buf);
  console.log("\u2713 " + outPath);
});
