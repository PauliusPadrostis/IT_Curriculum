const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, BorderStyle, ShadingType, AlignmentType, LevelFormat,
  Header, Footer, PageNumber, HeadingLevel
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
const noBorders = { top: NO_BORDER, bottom: NO_BORDER, left: NO_BORDER, right: NO_BORDER };

const PAGE_W = 11906; // A4
const MARGIN = 1440;  // 1 inch
const CONTENT_W = PAGE_W - 2 * MARGIN; // 9026

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

// ─── Term table ──────────────────────────────────────────────────
function termTable(terms) {
  const COL1 = 3200;
  const COL2 = CONTENT_W - COL1;
  const cellMargins = { top: 60, bottom: 60, left: 100, right: 100 };

  const headerRow = new TableRow({
    tableHeader: true,
    cantSplit: true,
    children: [
      new TableCell({
        shading: { type: ShadingType.CLEAR, fill: C.NAVY },
        width: { size: COL1, type: WidthType.DXA },
        borders: stdBorders,
        margins: cellMargins,
        children: [body([txt("Sąvoka", { bold: true, color: C.WHITE })])],
      }),
      new TableCell({
        shading: { type: ShadingType.CLEAR, fill: C.NAVY },
        width: { size: COL2, type: WidthType.DXA },
        borders: stdBorders,
        margins: cellMargins,
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
          borders: stdBorders,
          margins: cellMargins,
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
          borders: stdBorders,
          margins: cellMargins,
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

// ─── Numbered list items ─────────────────────────────────────────
function numberedItem(num, boldLead, rest) {
  return body([
    txt(`${num}. `, { bold: true, color: C.NAVY }),
    txt(boldLead, { bold: true }),
    txt(rest),
  ]);
}

// ─── CONTENT ─────────────────────────────────────────────────────

const terms = [
  { lt: "Ergonomika", en: "ergonomics", def: "Mokslas apie tai, kaip pritaikyti darbo vietą žmogui, kad būtų patogu ir saugu dirbti." },
  { lt: "Laikysena", en: "posture", def: "Kūno padėtis sėdint, stovint ar judant." },
  { lt: "20-20-20 taisyklė", en: "20-20-20 rule", def: "Akių poilsio taisyklė: kas 20 minučių žiūrėti 20 sekundžių į objektą, esantį 6 metrų atstumu." },
  { lt: "Skaitmeninis akių nuovargis", en: "digital eye strain", def: "Akių diskomfortas, atsirandantis ilgai žiūrint į ekraną: sausumas, mirksėjimas, neryškus vaizdas." },
  { lt: "Darbo ir poilsio režimas", en: "work-rest schedule", def: "Darbo ir pertraukų kaita, padedanti išvengti nuovargio." },
  { lt: "Vaizduoklis", en: "monitor/display", def: "Kompiuterio ekranas, kuriame rodomas vaizdas." },
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
    children: [txt("Ergonomika ir sveikas kompiuterio naudojimas", { bold: true, size: 36, color: C.NAVY })],
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
  body([txt("Kiekvieną dieną praleidžiate valandas prie kompiuterio: mokykloje, namuose, žaisdami ar mokydamiesi. Ar pagalvojote, kaip tai veikia jūsų kūną?")]),
  body([txt("Netaisyklinga sėdėjimo poza, per arti pastatytas ekranas, ištisas valandas nejudinamos rankos. Visa tai po truputį kenkia sveikatai. Gera žinia: daugumą problemų galima išvengti, jei žinote kelis paprastus principus.")]),
  body([txt("Šiame teorijos pakete sužinosite, kaip taisyklingai sėdėti prie kompiuterio, kaip apsaugoti akis, rankas ir nugarą, ir kodėl pertraukos yra būtinos.")]),
);

// ── 2. PAGRINDINĖS SĄVOKOS ──────────────────────────────────────
sections.push(
  h1("Pagrindinės sąvokos"),
  termTable(terms),
);

// ── 3. SĖDĖJIMO LAIKYSENA ───────────────────────────────────────
sections.push(
  h1("1. Taisyklinga sėdėjimo laikysena"),
  body([txt("Sėdėjimas prie kompiuterio atrodo paprastas veiksmas. Tačiau netaisyklinga poza sukelia nugaros, kaklo ir pečių skausmus. Jie atsiranda ne iš karto, o po kelių mėnesių ar metų.")]),

  h3("Pagrindiniai principai"),
  body([txt("\u2022 Pėdos turi remtis į grindis (ne kabėti ore, ne būti sukryžiuotos).")]),
  body([txt("\u2022 Nugara tiesi, atremta į kėdės atlošą.")]),
  body([txt("\u2022 Pečiai atpalaiduoti, nenuleidžiami ir nepakelti prie ausų.")]),
  body([txt("\u2022 Galva tiesi, nesulenkta žemyn ir nepasukta į šoną.")]),

  tipBox("Svarbu", [
    "Patogumas dabar nelygu sveikatai ateityje. Sukryžiuotos kojos ar susigūžusi poza gali atrodyti patogiai, bet ilgainiui sukelia stuburo problemas.",
  ]),

  funBox([
    "Lietuvos higienos norma HN 32:2004 nustato, kad darbo kėdė turi būti su reguliuojamu aukščiu ir atlošu. Darbo stalo aukštis turi būti 68\u201376 cm.",
  ]),
);

// ── 4. EKRANO PADĖTIS ───────────────────────────────────────────
sections.push(
  h1("2. Vaizduoklio padėtis ir atstumas"),
  body([txt("Vaizduoklio padėtis tiesiogiai veikia kaklą ir akis. Per žemas ekranas verčia lenkti galvą žemyn. Per aukštas ekranas tempia kaklo raumenis aukštyn.")]),

  h3("Taisyklės"),
  body([txt("\u2022 Ekrano viršutinis kraštas turi būti maždaug akių lygyje arba šiek tiek žemiau.")]),
  body([txt("\u2022 Atstumas nuo akių iki ekrano: 50\u201370 cm (maždaug ištiestos rankos ilgis).")]),
  body([txt("\u2022 Ekranas turi būti tiesiai priešais jus, ne šone.")]),

  tipBox("Kaip patikrinti atstumą?", [
    "Ištiesinkite ranką. Jei pirštų galai liečia ekraną, atstumas yra tinkamas. Jei tenka pasilenkti arba ranka nesiekia, reikia pakoreguoti.",
  ]),

  body([txt("Pagal Lietuvos higienos normą HN 32:2004, rekomenduojamas atstumas nuo akių iki ekrano yra 40\u201375 cm. Moksliniai tyrimai rekomenduoja ne mažiau kaip 50 cm (Sheppard ir Wolffsohn, 2018).")]),
);

// ── 5. RANKŲ PADĖTIS ────────────────────────────────────────────
sections.push(
  h1("3. Rankų ir riešų padėtis"),
  body([txt("Netaisyklinga rankų padėtis prie klaviatūros ar pelės gali sukelti riešų, dilbių ir pečių skausmą. Ilgainiui tai gali virsti rimtesnėmis problemomis.")]),

  h3("Taisyklės"),
  body([txt("\u2022 Alkūnės sulenktos maždaug 90 laipsnių kampu.")]),
  body([txt("\u2022 Riešai tiesūs, nelenkiami nei aukštyn, nei žemyn.")]),
  body([txt("\u2022 Rankos laisvai guli ant klaviatūros, pečiai atpalaiduoti.")]),
  body([txt("\u2022 Pelė turi būti šalia klaviatūros, ne toli nuo kūno.")]),

  funBox([
    "Europos Sąjungos direktyva 90/270/EEB reikalauja, kad klaviatūra būtų atskira nuo ekrano ir turėtų pakankamai vietos rankoms atremti.",
  ]),
);

// ── 6. 20-20-20 ─────────────────────────────────────────────────
sections.push(
  h1("4. Akių poilsis: 20-20-20 taisyklė"),
  body([txt("Ilgai žiūrint į ekraną, akių raumenys įsitempia. Taip atsiranda skaitmeninis akių nuovargis: akys sausėja, vaizdas darosi neryškus, skauda galvą.")]),

  h3("Kaip veikia taisyklė?"),
  body([txt("Kas 20 minučių pažiūrėkite 20 sekundžių į daiktą, esantį bent 6 metrų atstumu (pvz., pro langą arba į tolimiausią klasės kampą). Tai atpalaiduoja akių raumenį, kuris įsitempia žiūrint arti.")]),

  tipBox("Kodėl būtent 6 metrai?", [
    "Žiūrint toliau nei 6 metrų, akių raumenys visiškai atsipalaiduoja. Arčiau esantys objektai vis tiek reikalauja tam tikros įtampos.",
  ]),

  body([txt("Moksliniai tyrimai rodo, kad skaitmeninis akių nuovargis pasireiškia maždaug pusei žmonių, kurie reguliariai dirba kompiuteriu (Sheppard ir Wolffsohn, 2018). Reguliarios pertraukos pagal 20-20-20 taisyklę padeda sumažinti šiuos simptomus.")]),
);

// ── 7. PRATIMAI IR REŽIMAS ───────────────────────────────────────
sections.push(
  h1("5. Pratimai ir darbo bei poilsio režimas"),
  body([txt("Jei sėdėsite valandų valandas be pertraukos, taisyklingos sėdėjimo pozos nepakaks. Kūnui reikia judėjimo. Trumpi pratimai padeda atpalaiduoti raumenis ir pagerinti kraujotaką.")]),

  h3("Trys pratimai, kuriuos galite atlikti prie kompiuterio"),
  body([
    txt("Akių pratimas: ", { bold: true }),
    txt("užsimerkite 5 sekundėms, tada atidarykite akis ir pažiūrėkite į tolimą tašką."),
  ]),
  body([
    txt("Rankų pratimas: ", { bold: true }),
    txt("sukite riešus ratu, tada atgniaužkite ir sugniaužkite kumščius kelis kartus."),
  ]),
  body([
    txt("Nugaros pratimas: ", { bold: true }),
    txt("atsistokite, pakelkite rankas virš galvos, pasitempkite, lėtai nuleiskite."),
  ]),

  h3("Darbo ir poilsio režimas"),
  body([txt("Lietuvos higienos norma HN 32:2004 rekomenduoja: po kiekvienos valandos nepertraukiamo darbo kompiuteriu reikia 5\u201310 minučių pertraukos.")]),
  body([txt("Mokykloje pertraukas reguliuoja skambutis. Tačiau namuose tai jūsų atsakomybė. Naudokite telefoną ar kompiuterio laikmatį, kad primintų apie pertrauką.")]),

  funBox([
    "Moksliniai tyrimai rodo, kad net trumpa pertrauka kas 30 minučių pagerina medžiagų apykaitą ir mažina sėdimo darbo žalą (Dunstan ir kt., 2012).",
  ]),
);

// ── 8. PRAKTINIAI PATARIMAI ──────────────────────────────────────
sections.push(
  h1("Praktiniai patarimai"),
  numberedItem(1, "Patikrinkite savo pozą: ", "ar pėdos ant grindų, ar nugara atremta į atlošą?"),
  numberedItem(2, "Sureguliuokite ekraną: ", "viršus akių lygyje, atstumas apie 50\u201370 cm."),
  numberedItem(3, "Laikykite riešus tiesius: ", "nelenkite nei aukštyn, nei žemyn."),
  numberedItem(4, "Naudokite 20-20-20 taisyklę: ", "kas 20 min. pažiūrėkite į tolį 20 sekundžių."),
  numberedItem(5, "Darykite pertraukas: ", "kas valandą atsistokite ir pajudėkite bent 5 minutes."),
  numberedItem(6, "Atlikite pratimus: ", "akių, rankų ir nugaros pratimus galite daryti net pamokos metu."),
  numberedItem(7, "Priminkite sau: ", "pasidarykite priminimą telefone arba užsirašykite ant lapelio prie kompiuterio."),
  numberedItem(8, "Pasakykite draugui: ", "jei matote, kad šalia sėdintis žmogus susigūžęs, priminkite jam apie taisyklingą pozą."),
);

// ── 9. PASITIKRINK SAVE ──────────────────────────────────────────
const questions = [
  // Slenkstinis (2)
  "Išvardinkite tris ergonomikos principus, kurie padeda saugoti sveikatą dirbant kompiuteriu.",
  "Kas yra 20-20-20 taisyklė?",
  // Patenkinamas (2)
  "Paaiškinkite, kodėl 20-20-20 taisyklė padeda akims. Kas vyksta su akių raumenimis?",
  "Kodėl netaisyklinga sėdėjimo poza sukelia problemas ne iš karto, o po ilgesnio laiko?",
  // Pagrindinis (2)
  "Jūsų draugas sėdi prie kompiuterio: kojos sukryžiuotos, ekranas stovi šone, galva nulenkta žemyn. Ką jam patartumėte pakeisti ir kodėl?",
  "Jūs namuose ruošiate namų darbus prie kompiuterio 2 valandas. Sudarykite pertraukų planą, naudodami 20-20-20 taisyklę ir pratimus.",
  // Aukštesnysis (2)
  "Jūsų klasėje kėdės nereguliuojamos ir ekranai žemiau akių lygio. Pasiūlykite, kaip galima prisitaikyti prie tokios darbo vietos, ir pagrįskite savo sprendimus.",
  "Jei ergonomikos principai tokie svarbūs, kodėl dauguma žmonių jų nesilaiko? Kokias priežastis matote ir ką siūlytumėte keisti?",
];

sections.push(
  h1("Pasitikrink save"),
);

questions.forEach((q, i) => {
  sections.push(body([
    txt(`${i + 1}. `, { bold: true, color: C.NAVY }),
    txt(q),
  ]));
});

// ── 10. SUŽINOK DAUGIAU ─────────────────────────────────────────
sections.push(
  h1("Sužinok daugiau"),
  body([txt("Jei nori giliau suprasti šią temą:")]),
  body([txt("\u2022 Lietuvos higienos norma HN 32:2004 \u201EDarbas su displėjais\u201C. Visą tekstą galima rasti e-tar.lt. Čia rasite tikslius reikalavimus darbo vietai.")]),
  body([txt("\u2022 Europos darbuotojų saugos ir sveikatos agentūra (EU-OSHA) skelbia informaciją apie darbą su ekranais: osha.europa.eu (anglų k.).")]),
  body([txt("\u2022 Jei domina, kaip ekranai veikia akis, paieškokite \u201Edigital eye strain\u201C arba \u201Eskaitmeninis akių nuovargis\u201C. Šia tema yra nemažai mokslinių straipsnių.")]),
  body([txt("\u2022 Pabandykite atlikti savo darbo vietos auditą namuose: patikrinkite kėdę, stalą, ekrano padėtį pagal šio paketo taisykles.")]),
);

// ── 11. ŠALTINIAI ────────────────────────────────────────────────
sections.push(
  rule(C.GREY),
  new Paragraph({
    spacing: { before: 80, after: 40 },
    children: [txt("Šaltiniai", { bold: true, italics: true, size: 18, color: C.GREY })],
  }),
  body([txt("Lietuvos Respublikos sveikatos apsaugos ministerija. (2004). HN 32:2004 \u201EDarbas su displėjais. Saugos ir sveikatos reikalavimai\u201C.", { size: 18, italics: true, color: C.GREY })]),
  body([txt("Europos Tarybos direktyva 90/270/EEB dėl darbo su vaizduokliais.", { size: 18, italics: true, color: C.GREY })]),
  body([txt("Sheppard, A. L., Wolffsohn, J. S. (2018). Digital eye strain: prevalence, measurement and amelioration. BMJ Open Ophthalmology, 3(1), e000146.", { size: 18, italics: true, color: C.GREY })]),
  body([txt("Dunstan, D. W. ir kt. (2012). Too much sitting \u2013 A health hazard. Diabetes Research and Clinical Practice, 97(3), 368\u2013376.", { size: 18, italics: true, color: C.GREY })]),
);

// ─── Build document ──────────────────────────────────────────────
const doc = new Document({
  styles: {
    default: {
      document: { run: { font: "Arial", size: 22, color: C.BODY } },
    },
  },
  numbering: {
    config: [{
      reference: "bullets",
      levels: [{
        level: 0, format: LevelFormat.BULLET, text: "\u2022",
        alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 720, hanging: 360 } } },
      }],
    }],
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
          children: [txt("Ergonomika ir sveikas kompiuterio naudojimas", { size: 16, color: C.GREY, italics: true })],
        })],
      }),
    },
    footers: {
      default: new Footer({
        children: [new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            txt("", { size: 16, color: C.GREY }),
            new TextRun({ font: "Arial", size: 16, color: C.GREY, children: [PageNumber.CURRENT] }),
          ],
        })],
      }),
    },
    children: sections,
  }],
});

// ─── Write ───────────────────────────────────────────────────────
const outDir = "Grade_9/Semester_1/01_Safety/001_L - Ergonomics & healthy computer use";
Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync(`${outDir}/001_L_Ergonomika_Theory_Pack.docx`, buf);
  console.log("✓ 001_L_Ergonomika_Theory_Pack.docx generated");
});
