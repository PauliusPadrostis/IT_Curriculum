const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, BorderStyle, ShadingType, AlignmentType, VerticalAlign,
  HeightRule, PageOrientation
} = require("docx");
const fs = require("fs");

// ─── Colors ──────────────────────────────────────────────────────
const C = {
  TITLE_BG: "1A237E",
  WHITE: "FFFFFF",
  RETRIEVAL: "F57C00",
  OBJ: "5E35B1",
  APP: "2E7D32",
  TEACH: "1565C0",
  BODY: "212121",
};

const NO_BORDER = { style: BorderStyle.NONE, size: 0, color: C.WHITE };
const noBorders = { top: NO_BORDER, bottom: NO_BORDER, left: NO_BORDER, right: NO_BORDER };

const PAGE_W = 11906;
const PAGE_H = 16838;
const MARGIN = 1134;
const VISIBLE_H = PAGE_W;
const CONTENT_W = PAGE_H - 2 * MARGIN;

function txt(text, opts = {}) {
  return new TextRun({ font: "Arial", size: 56, color: C.BODY, ...opts, text });
}

function accentBar(label, fillColor) {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [new TableRow({
      height: { value: 680, rule: HeightRule.EXACT },
      children: [new TableCell({
        shading: { type: ShadingType.CLEAR, fill: fillColor },
        verticalAlign: VerticalAlign.CENTER,
        borders: noBorders,
        children: [new Paragraph({
          spacing: { before: 0, after: 0 },
          alignment: AlignmentType.LEFT,
          indent: { left: 200 },
          children: [txt(label, { bold: true, color: C.WHITE, size: 56 })],
        })],
      })],
    })],
  });
}

function numberedQ(num, question, accentColor) {
  return new Paragraph({
    spacing: { after: 200, line: 360 },
    children: [
      txt(`${num}. `, { bold: true, color: accentColor }),
      txt(question),
    ],
  });
}

function bulletItem(text, accentColor) {
  return new Paragraph({
    spacing: { after: 120, line: 320 },
    keepNext: true,
    children: [
      txt("▸ ", { bold: true, color: accentColor, size: 48 }),
      txt(text, { size: 48 }),
    ],
  });
}

function termItem(term, definition) {
  return new Paragraph({
    spacing: { after: 200, line: 360 },
    children: [
      txt(term, { bold: true, color: C.TEACH, size: 56 }),
      txt(` : ${definition}`, { size: 48 }),
    ],
  });
}

const pageProps = {
  page: {
    size: {
      width: PAGE_W,
      height: PAGE_H,
      orientation: PageOrientation.LANDSCAPE,
    },
    margin: { top: MARGIN, right: MARGIN, bottom: MARGIN, left: MARGIN },
  },
};

// ─── SLIDES ──────────────────────────────────────────────────────

// Slide 1: Title
const slide1 = {
  properties: {
    ...pageProps,
    page: {
      ...pageProps.page,
      size: { ...pageProps.page.size },
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
    },
  },
  children: [
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [new TableRow({
        height: { value: VISIBLE_H, rule: HeightRule.EXACT },
        children: [new TableCell({
          shading: { type: ShadingType.CLEAR, fill: C.TITLE_BG },
          verticalAlign: VerticalAlign.CENTER,
          borders: noBorders,
          margins: { top: 0, bottom: 0, left: 400, right: 400 },
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              spacing: { after: 200 },
              children: [txt("SAUGA", { bold: true, color: C.WHITE, size: 64, allCaps: true })],
            }),
            new Paragraph({
              alignment: AlignmentType.CENTER,
              spacing: { before: 200 },
              children: [txt("Privatumas ir paskyrų sauga", { bold: true, color: C.WHITE, size: 96 })],
            }),
          ],
        })],
      })],
    }),
  ],
};

// Slide 2: Start retrieval questions (from Teacher_Plan, verbatim)
const slide2 = {
  properties: pageProps,
  children: [
    accentBar("PAMOKOS PRADŽIOS KLAUSIMAI", C.RETRIEVAL),
    new Paragraph({ spacing: { before: 400 }, children: [] }),
    numberedQ(1, "Kaip reikėtų taisyklingai sėdėti prie kompiuterio? Įvardinkite bent du principus.", C.RETRIEVAL),
    numberedQ(2, "Kas yra 20-20-20 taisyklė ir kodėl ji padeda akims?", C.RETRIEVAL),
    numberedQ(3, "Kokius pratimus galima atlikti per pertrauką, kad sumažintumėte rankų ir nugaros įtampą?", C.RETRIEVAL),
  ],
};

// Slide 3: Objectives (from Teacher_Plan)
const slide3 = {
  properties: pageProps,
  children: [
    accentBar("PAMOKOS TIKSLAI", C.OBJ),
    new Paragraph({ spacing: { before: 400 }, children: [] }),
    bulletItem("Paaiškinti, kas daro slaptažodį stiprų, ir sukurti slaptažodį pagal saugumo kriterijus.", C.OBJ),
    bulletItem("Apibūdinti, kaip veikia dviejų veiksnių autentifikacija ir kodėl ji padidina saugumą.", C.OBJ),
    bulletItem("Atskirti saugų ir nesaugų elgesį su asmeniniais duomenimis konkrečiose situacijose.", C.OBJ),
  ],
};

// Slide 4: Task brief
const slide4 = {
  properties: pageProps,
  children: [
    accentBar("UŽDUOTIS", C.APP),
    new Paragraph({ spacing: { before: 400 }, children: [] }),
    new Paragraph({
      spacing: { after: 200, line: 360 },
      children: [txt("5 situacijos apie elgesį internete.")],
    }),
    new Paragraph({
      spacing: { after: 200, line: 360 },
      children: [txt("Kiekvienai situacijai nurodykite: saugu ar nesaugu?")],
    }),
    new Paragraph({
      spacing: { after: 200, line: 360 },
      children: [txt("Pagrįskite savo atsakymą: paaiškinkite, kodėl taip manote.")],
    }),
  ],
};

// Slide 5: Key concepts (from Theory_Pack + Teacher_Plan)
const slide5 = {
  properties: pageProps,
  children: [
    accentBar("PAGRINDINĖS SĄVOKOS", C.TEACH),
    new Paragraph({ spacing: { before: 400 }, children: [] }),
    termItem("Stiprus slaptažodis", "bent 12 simbolių, įvairūs ženklai, ne asmeninė info, unikalus"),
    termItem("2FA", "prisijungimas dviem etapais: slaptažodis + kodas iš telefono"),
    termItem("Jautrūs duomenys", "asmens kodas, slaptažodis, banko numeris, namų adresas"),
    termItem("Vidutinio jautrumo duomenys", "el. paštas, telefono numeris, mokyklos pavadinimas"),
    termItem("Slaptažodžių valdyklė", "programa, sauganti visus slaptažodžius vienoje vietoje"),
  ],
};

// Slide 6: End retrieval questions (from Teacher_Plan, verbatim)
const slide6 = {
  properties: pageProps,
  children: [
    accentBar("PAMOKOS PABAIGOS KLAUSIMAI", C.RETRIEVAL),
    new Paragraph({ spacing: { before: 400 }, children: [] }),
    numberedQ(1, "Įvardinkite tris stipraus slaptažodžio kriterijus.", C.RETRIEVAL),
    numberedQ(2, "Kodėl 2FA apsaugo paskyrą net tada, kai slaptažodis pavogtas?", C.RETRIEVAL),
    numberedQ(3, "Jūsų draugas skelbia savo gimimo datą ir mokyklos pavadinimą socialiniame tinkle. Kuo tai gali būti pavojinga?", C.RETRIEVAL),
  ],
};

// ─── Build ───────────────────────────────────────────────────────
const doc = new Document({
  styles: {
    default: {
      document: { run: { font: "Arial", size: 56, color: C.BODY } },
    },
  },
  sections: [slide1, slide2, slide3, slide4, slide5, slide6],
});

const outDir = "Grade_9/Semester_1/01_Safety/002_L - Privacy & account safety";
Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync(`${outDir}/Visual_Aid.docx`, buf);
  console.log("✓ Visual_Aid.docx generated");
});
