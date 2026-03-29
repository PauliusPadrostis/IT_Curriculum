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
  GREEN: "2E7D32",
  STUCK_BG: "FFF2CC",
  STUCK_BORDER: "BF8F00",
  TIP_BG: "DEEAF6",
  TIP_BORDER: "2E75B6",
  WHITE: "FFFFFF",
};

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

function h2(text) {
  return new Paragraph({
    spacing: { before: 300, after: 120 },
    keepNext: true,
    children: [txt(text, { bold: true, size: 26, color: C.NAVY })],
  });
}

function stepHeading(num, title) {
  return new Paragraph({
    spacing: { before: 360, after: 100 },
    keepNext: true,
    children: [txt(`${num} ŽINGSNIS: ${title}`, { bold: true, size: 23, color: C.BLUE })],
  });
}

function hint(text) {
  return new Paragraph({
    indent: { left: 720 },
    spacing: { before: 120, after: 60 },
    children: [txt(`(Užuomina: ${text})`, { italics: true, color: C.GREY, size: 21 })],
  });
}

function successCheck(text) {
  return new Paragraph({
    indent: { left: 720 },
    spacing: { before: 120, after: 60 },
    children: [txt(`\u2713 ${text}`, { italics: true, color: C.GREEN, size: 21 })],
  });
}

function checklist(text, last = false) {
  return new Paragraph({
    indent: { left: 360 },
    spacing: { after: 60 },
    keepNext: !last,
    children: [txt(`\u2610 ${text}`)],
  });
}

function rule(color = C.NAVY) {
  return new Paragraph({
    spacing: { before: 80, after: 80 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color, space: 1 } },
    children: [],
  });
}

function infoBox(title, lines, bgColor, borderColor) {
  const leftBorder = { style: BorderStyle.SINGLE, size: 24, color: borderColor };
  return new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    columnWidths: [CONTENT_W],
    rows: [new TableRow({
      cantSplit: true,
      children: [new TableCell({
        shading: { type: ShadingType.CLEAR, fill: bgColor },
        borders: { top: NO_BORDER, bottom: NO_BORDER, right: NO_BORDER, left: leftBorder },
        margins: { top: 120, bottom: 120, left: 160, right: 160 },
        width: { size: CONTENT_W, type: WidthType.DXA },
        children: [
          new Paragraph({
            spacing: { after: 60 },
            children: [txt(title, { bold: true, color: borderColor, size: 22 })],
          }),
          ...lines.map(line =>
            new Paragraph({
              spacing: { after: 40 },
              children: [txt(line, { size: 21 })],
            })
          ),
        ],
      })],
    })],
  });
}

function stuckBox(lines) {
  return infoBox("\u0012STRIGOTE?", lines, C.STUCK_BG, C.STUCK_BORDER);
}

function tipBox(lines) {
  return infoBox("Svarbu", lines, C.TIP_BG, C.TIP_BORDER);
}

function bullet(text) {
  return new Paragraph({
    spacing: { after: 60, line: 276 },
    indent: { left: 720, hanging: 360 },
    children: [txt("\u2022 " + text)],
  });
}

function scenarioBlock(num, scenarioText) {
  return [
    new Paragraph({
      spacing: { before: 240, after: 80 },
      shading: { type: ShadingType.CLEAR, fill: "F5F5F5" },
      children: [
        txt(`${num} situacija: `, { bold: true, color: C.NAVY }),
        txt(scenarioText),
      ],
    }),
  ];
}

function responseTemplate() {
  return [
    body([
      txt("Grėsmės tipas: ", { bold: true }),
      txt("(phishing / socialinė inžinerija / dezinformacija) ____________"),
    ]),
    body([txt("SUSTOTI: ", { bold: true, color: C.GREEN }), txt("Ką konkrečiai darytumėte? ____________")]),
    body([txt("PATIKRINTI: ", { bold: true, color: C.GREEN }), txt("Ką ir kaip patikrintumėte? ____________")]),
    body([txt("PRANEŠTI: ", { bold: true, color: C.GREEN }), txt("Kam ir kaip pranešite? ____________")]),
    body([txt("Pagrindimas: ", { bold: true }), txt("Kodėl tai ši grėsmės rūšis? ____________")]),
  ];
}

// ─── CONTENT ─────────────────────────────────────────────────────
const sections = [];

// ── HEADER ───────────────────────────────────────────────────────
sections.push(
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 40 },
    children: [txt("UŽDUOTIES LAPAS", { size: 18, color: C.GREY, allCaps: true })],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 40 },
    children: [txt("Internetinių rizikų analizė", { bold: true, size: 36, color: C.NAVY })],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 80 },
    children: [txt("9 klasė  \u2022  Sauga  \u2022  Mokymosi pamoka", { size: 20, color: C.GREY })],
  }),
  rule(C.NAVY),
);

// ── KĄ PADARYSITE ───────────────────────────────────────────────
sections.push(
  h2("Ką padarysite"),
  body([txt("Perskaitysite 4 situacijas, kuriose susiduriama su internetinėmis grėsmėmis. Kiekvienai situacijai nustatysite grėsmės tipą ir pritaikysite saugaus reagavimo algoritmą: SUSTOTI \u2192 PATIKRINTI \u2192 PRANEŠTI.")]),
  body([txt("Šioje užduotyje kompiuteris nereikalingas. Atsakinėsite žodžiu arba rašysite šiame lape.")]),
);

// ── REIKALAVIMAI ─────────────────────────────────────────────────
sections.push(
  h2("Reikalavimai"),
  bullet("Kiekvienai situacijai nurodytas grėsmės tipas: phishing, socialinė inžinerija arba dezinformacija."),
  bullet("Kiekviename atsakyme yra visi 3 algoritmo žingsniai su konkrečiais veiksmais (ne tik žodžiai \u201Esustoti, patikrinti, pranešti\u201C)."),
  bullet("Kiekvienam atsakymui yra pagrindimas: kodėl tai ši grėsmės rūšis."),
);

// ── DARBO EIGA ───────────────────────────────────────────────────
sections.push(
  h2("Darbo eiga"),

  stepHeading(1, "Prisiminkite algoritmą"),
  body([txt("Prieš pradėdami analizuoti situacijas, prisiminkite tris žingsnius:")]),
  body([txt("SUSTOTI ", { bold: true, color: C.GREEN }), txt("\u2192 nespausti nuorodų, neatsakyti, nesidalinti informacija.")]),
  body([txt("PATIKRINTI ", { bold: true, color: C.GREEN }), txt("\u2192 ar siuntėjas tikras? Ar informacija patvirtinta? Ar nuoroda teisinga?")]),
  body([txt("PRANEŠTI ", { bold: true, color: C.GREEN }), txt("\u2192 informuoti mokytoją, tėvus arba administratorių.")]),
  hint("kiekviename žingsnyje turite aprašyti konkretų veiksmą, ne tik pakartoti žodį."),

  stepHeading(2, "Analizuokite 1 situaciją"),
  ...scenarioBlock(1, "Gavote el. laišką: \u201ESveiki, jūsų \u201EInstagram\u201C paskyra bus ištrinta per 12 valandų. Patvirtinkite savo duomenis čia: www.instagrarn-security.com.\u201C"),
  body([txt("Užpildykite atsakymo šabloną:")]),
  ...responseTemplate(),
  hint("atidžiai pažiūrėkite į nuorodos adresą. Ar pastebite ką nors keisto?"),
  successCheck("Nurodėte grėsmės tipą, 3 algoritmo žingsnius su konkrečiais veiksmais ir pagrindimą."),

  infoBox("ĮSTRIGOTE?", [
    "Jei nežinote, koks tai grėsmės tipas, pagalvokite:",
    "\u2022 Ar čia kas nors bando išvilioti jūsų duomenis? \u2192 Tai phishing.",
    "\u2022 Ar čia kas nors manipuliuoja jūsų jausmais ar pasitikėjimu? \u2192 Tai socialinė inžinerija.",
    "\u2022 Ar čia platinama nepatikrinta arba melaginga informacija? \u2192 Tai klaidinga informacija arba dezinformacija.",
  ], C.STUCK_BG, C.STUCK_BORDER),

  stepHeading(3, "Analizuokite 2 situaciją"),
  ...scenarioBlock(2, "Klasiokas sako: \u201EDuok savo \u201EGoogle Classroom\u201C slaptažodį. Padėsiu padaryti namų darbus, nes mano kompiuteris neveikia.\u201C"),
  ...responseTemplate(),
  hint("pagalvokite: ar čia bandoma išvilioti duomenis per techninę apgaulę, ar manipuliuojama per santykius?"),

  stepHeading(4, "Analizuokite 3 situaciją"),
  ...scenarioBlock(3, "Socialiniame tinkle matote straipsnį: \u201EMokslininkai įrodė, kad telefonų spinduliuotė sukelia galvos skausmą.\u201C Straipsnyje nėra nuorodų į tyrimus. Svetainė neturi kontaktų skilties."),
  ...responseTemplate(),
  hint("tai ne apgaulė, skirta pavogti duomenis. Čia kalba eina apie informacijos patikimumą."),

  stepHeading(5, "Analizuokite 4 situaciją"),
  ...scenarioBlock(4, "Gaunate SMS žinutę: \u201ESveikiname! Laimėjote 500 \u20AC dovanų kortelę. Norėdami atsiimti, įveskite banko kortelės duomenis: www.prize-lt.com/claim.\u201C"),
  ...responseTemplate(),
  successCheck("Visoms 4 situacijoms užpildėte atsakymo šabloną su konkrečiais veiksmais."),

  infoBox("ĮSTRIGOTE?", [
    "Jei atsakyme rašote tik \u201Esustoti, patikrinti, pranešti\u201C be konkrečių veiksmų:",
    "\u2022 SUSTOTI: ką konkrečiai NEdarytumėte? (pvz., \u201Enepaspausčiau nuorodos\u201C)",
    "\u2022 PATIKRINTI: KĄ tikrintumėte ir KAIP? (pvz., \u201Epatikrinčiau siuntėjo adresą raidė po raidės\u201C)",
    "\u2022 PRANEŠTI: KAM pranešite? (pvz., \u201Epasakyčiau tėvams\u201C)",
  ], C.STUCK_BG, C.STUCK_BORDER),
);

// ── PATIKRINKITE SAVE ────────────────────────────────────────────
sections.push(
  h2("Patikrinkite save"),
  checklist("Ar kiekvienai situacijai nurodžiau grėsmės tipą?"),
  checklist("Ar kiekviename atsakyme yra visi 3 algoritmo žingsniai?"),
  checklist("Ar mano \u201EPATIKRINTI\u201C žingsnyje aprašiau konkretų veiksmą, ne tik žodį \u201Epatikrinti\u201C?"),
  checklist("Ar paaiškinau, kodėl pasirinkau tą grėsmės tipą?"),
  checklist("Ar 3 situacijos atsakymas skiriasi nuo 1 ir 4? (Tai kitas grėsmės tipas.)", true),
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
const outPath = outDir + "/Student_Task.docx";
Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync(outPath, buf);
  console.log("\u2713 " + outPath);
});
