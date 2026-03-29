const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, BorderStyle, ShadingType, AlignmentType,
  Footer, PageNumber
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
  STUCK_BG: "FFF2CC",
  STUCK_BORDER: "BF8F00",
  HINT: "808080",
  CHECK: "2E7D32",
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

function h1(text, centered = false) {
  return new Paragraph({
    spacing: { before: 360, after: 160 },
    keepNext: true, keepLines: true,
    alignment: centered ? AlignmentType.CENTER : undefined,
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

function stepHeading(num, title) {
  return new Paragraph({
    spacing: { before: 360, after: 100 },
    keepNext: true, keepLines: true,
    children: [txt(`${num} ŽINGSNIS: ${title}`, { bold: true, size: 23, color: C.BLUE })],
  });
}

function hint(text) {
  return new Paragraph({
    spacing: { before: 120, after: 80 },
    indent: { left: 720 },
    children: [txt(`(Užuomina: ${text})`, { italics: true, size: 21, color: C.HINT })],
  });
}

function successCheck(text) {
  return new Paragraph({
    spacing: { before: 120, after: 80 },
    indent: { left: 720 },
    children: [txt(`✓ ${text}`, { italics: true, size: 21, color: C.CHECK })],
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

function svarbuBox(lines) {
  return infoBox("Svarbu", lines, C.TIP_BG, C.TIP_BORDER, C.NAVY);
}

function stuckBox(lines) {
  return infoBox("Įstrigote?", lines, C.STUCK_BG, C.STUCK_BORDER, C.BODY);
}

function checkItem(text, isLast = false) {
  return new Paragraph({
    spacing: { after: 80, line: 276 },
    indent: { left: 360 },
    keepNext: !isLast,
    children: [txt(`☐ ${text}`)],
  });
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
    children: [txt("Privatumas ir paskyrų sauga: situacijų vertinimas", { bold: true, size: 36, color: C.NAVY })],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 80 },
    children: [txt("9 klasė  \u2022  Sauga  \u2022  Mokymosi pamoka", { size: 20, color: C.GREY })],
  }),
  rule(C.NAVY),
);

// ── KĄ PADARYSITE ────────────────────────────────────────────────
sections.push(
  h2("Ką padarysite"),
  body([txt("Išklausysite penkias situacijas apie elgesį internete. Kiekvienai situacijai nuspręsite: ar tai saugu, ar nesaugu? Turėsite pagrįsti savo atsakymą, remdamiesi pamokoje išmoktais principais.")]),
);

// ── REIKALAVIMAI ─────────────────────────────────────────────────
sections.push(
  h2("Reikalavimai"),
  body([txt("Kiekvienai situacijai turite:")]),
  body([txt("\u2022 Atsakyti: saugu ar nesaugu.")]),
  body([txt("\u2022 Pagrįsti atsakymą: paaiškinti, kodėl taip manote.")]),
  body([txt("\u2022 Jei nesaugu: pasakyti, ką reikėtų daryti kitaip.")]),
);

// ── DARBO EIGA ───────────────────────────────────────────────────
sections.push(
  h2("Darbo eiga"),

  svarbuBox([
    "Kiekvieną situaciją mokytojas perskaitys garsiai. Klausykite atidžiai. Kai mokytojas paklaus jūsų nuomonės, atsakykite žodžiu. Neužtenka pasakyti tik \u201Esaugu\u201C ar \u201Enesaugu\u201C. Turite paaiškinti, kodėl taip manote.",
  ]),

  // Situation 1
  stepHeading(1, "Vienas slaptažodis visoms paskyroms"),
  body([txt("Situacija: naudojate tą patį slaptažodį visoms savo paskyroms, nes jis ilgas ir sudėtingas.")]),
  hint("Pagalvokite: kas nutiks, jei šis slaptažodis nutekės? Ar kitos paskyros liks saugios?"),
  successCheck("Galite paaiškinti, kuo pavojingas vienas slaptažodis visoms paskyroms."),

  // Situation 2
  stepHeading(2, "Nepažįstamas asmuo prašo telefono numerio"),
  body([txt("Situacija: nepažįstamas asmuo socialiniame tinkle prašo jūsų telefono numerio, kad galėtų atsiųsti dovanų kodą.")]),
  hint("Pagalvokite: ar pažįstate šį žmogų? Ar tikrai reikia duoti telefono numerį, kad gautumėte dovaną?"),
  successCheck("Galite paaiškinti, kodėl nereikėtų dalintis telefono numeriu su nepažįstamaisiais."),

  // Situation 3
  stepHeading(3, "Dviejų veiksnių autentifikacija"),
  body([txt("Situacija: įjungiate dviejų veiksnių autentifikaciją savo el. pašto paskyroje.")]),
  hint("Prisiminkite: ką suteikia 2FA? Kaip ji apsaugo paskyrą?"),
  successCheck("Galite paaiškinti, kodėl 2FA įjungimas yra saugus sprendimas."),

  // Situation 4
  stepHeading(4, "Draugas prašo slaptažodžio"),
  body([txt("Situacija: draugas klasėje prašo pasakyti jūsų slaptažodį, kad patikrintų, ar paskyra veikia.")]),
  hint("Pagalvokite: ar yra svarbi priežastis duoti slaptažodį kitam žmogui? Ar draugas galėtų patikrinti kitaip?"),
  successCheck("Galite paaiškinti, kodėl slaptažodžio negalima duoti net draugui."),

  stuckBox([
    "Jei nežinote, ar situacija saugu, ar nesaugu:",
    "\u2022 Prisiminkite tris klausimus: kas prašo? Ko prašo? Ar tikrai to reikia?",
    "\u2022 Pagalvokite, kas blogiausia galėtų nutikti, jei pateiktumėte duomenis.",
  ]),

  // Situation 5
  stepHeading(5, "Svetainė prašo namų adreso"),
  body([txt("Situacija: užsiregistruojate naujoje svetainėje ir ji prašo nurodyti namų adresą, nors tai yra žaidimų forumas.")]),
  hint("Pagalvokite: ar žaidimų forumui tikrai reikia žinoti, kur gyvenate?"),
  successCheck("Galite paaiškinti, kodėl nereikėtų pateikti namų adreso svetainei, kuriai jo nereikia."),
);

// ── PATIKRINKITE SAVE ───────────────────────────────────────────
sections.push(
  h2("Patikrinkite save"),
  checkItem("Ar kiekvienai situacijai atsakiau: saugu ar nesaugu?"),
  checkItem("Ar kiekvieną atsakymą pagrindžiau argumentu?"),
  checkItem("Ar galiu paaiškinti, kas daro slaptažodį stiprų?"),
  checkItem("Ar galiu pasakyti, kaip veikia 2FA?"),
  checkItem("Ar galiu atskirti jautrius duomenis nuo viešos informacijos?"),
  checkItem("Ar nesaugiose situacijose pasakiau, ką reikėtų daryti kitaip?", true),
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

const outDir = "Grade_9/Semester_1/01_Safety/002_L - Privacy & account safety";
Packer.toBuffer(doc).then(buf => {
  const outPath = `${outDir}/Student_Task.docx`;
  fs.writeFileSync(outPath, buf);
  console.log(`✓ ${outPath} generated`);
});
