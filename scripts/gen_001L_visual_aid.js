const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, BorderStyle, ShadingType, AlignmentType, VerticalAlign,
  HeightRule, PageOrientation, SectionType
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

// Landscape A4 — pass PORTRAIT dimensions; docx-js swaps internally
const PAGE_W = 11906;  // short edge as width
const PAGE_H = 16838;  // long edge as height
const MARGIN = 1134; // 2 cm
// In landscape, visible width = long edge, visible height = short edge
const VISIBLE_H = PAGE_W;  // 11906 — the short edge becomes the visible height
const CONTENT_W = PAGE_H - 2 * MARGIN; // 16838 - 2*1134 = 14570

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
    // Full navy background via a table
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
              children: [txt("Ergonomika ir sveikas kompiuterio naudojimas", { bold: true, color: C.WHITE, size: 96 })],
            }),
          ],
        })],
      })],
    }),
  ],
};

// Slide 2: Start questions
const slide2 = {
  properties: pageProps,
  children: [
    accentBar("PAMOKOS PRADŽIOS KLAUSIMAI", C.RETRIEVAL),
    new Paragraph({ spacing: { before: 400 }, children: [] }),
    numberedQ(1, "Kas nutinka, kai ilgai sėdite prie kompiuterio? Ką jaučiate?", C.RETRIEVAL),
    numberedQ(2, "Ar jūsų namuose yra taisyklių, kiek laiko galite būti prie ekrano?", C.RETRIEVAL),
  ],
};

// Slide 3: Objectives
const slide3 = {
  properties: pageProps,
  children: [
    accentBar("PAMOKOS TIKSLAI", C.OBJ),
    new Paragraph({ spacing: { before: 400 }, children: [] }),
    bulletItem("Įvardinti pagrindinius ergonomikos principus (laikysena, ekrano padėtis, rankų pozicija, pertraukos).", C.OBJ),
    bulletItem("Paaiškinti, kaip kiekvienas principas padeda išvengti ilgalaikių sveikatos problemų.", C.OBJ),
    bulletItem("Pademonstruoti taisyklingą sėdėjimo pozą ir ekrano padėtį savo darbo vietoje.", C.OBJ),
    bulletItem("Atlikti kelis nuovargį šalinančius pratimus (akių, rankų, nugaros).", C.OBJ),
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
      children: [txt("Sureguliuokite savo darbo vietą pagal ergonomikos principus: patikrinkite sėdėjimo pozą, ekrano padėtį ir rankų poziciją.")],
    }),
    new Paragraph({
      spacing: { after: 200, line: 360 },
      children: [txt("Atlikite 20-20-20 akių pratimą ir tris nuovargį šalinančius pratimus (akių, rankų, nugaros).")],
    }),
  ],
};

// Slide 5: Key concepts
const slide5 = {
  properties: pageProps,
  children: [
    accentBar("PAGRINDINĖS SĄVOKOS", C.TEACH),
    new Paragraph({ spacing: { before: 400 }, children: [] }),
    termItem("Ergonomika", "darbo vietos pritaikymas žmogui, kad būtų patogu ir saugu"),
    termItem("Taisyklinga laikysena", "pėdos ant grindų, nugara tiesi, atremta į atlošą"),
    termItem("Ekrano atstumas", "50\u201370 cm nuo akių (ištiestos rankos ilgis)"),
    termItem("20-20-20 taisyklė", "kas 20 min. žiūrėti 20 sek. į 6 m atstumą"),
    termItem("Darbo ir poilsio režimas", "kas valandą 5\u201310 min. pertrauka nuo ekrano"),
  ],
};

// Slide 6: End questions
const slide6 = {
  properties: pageProps,
  children: [
    accentBar("PAMOKOS PABAIGOS KLAUSIMAI", C.RETRIEVAL),
    new Paragraph({ spacing: { before: 400 }, children: [] }),
    numberedQ(1, "Kaip reikėtų taisyklingai sėdėti prie kompiuterio? Papasakokite bent 3 dalykus.", C.RETRIEVAL),
    numberedQ(2, "Kas yra 20-20-20 taisyklė ir kodėl ji padeda akims?", C.RETRIEVAL),
    numberedQ(3, "Parodykite vieną pratimą, kurį galima atlikti prie kompiuterio, ir paaiškinkite, kam jis skirtas.", C.RETRIEVAL),
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

const outDir = "Grade_9/Semester_1/01_Safety/001_L - Ergonomics & healthy computer use";
Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync(`${outDir}/Visual_Aid.docx`, buf);
  console.log("✓ Visual_Aid.docx generated");
});
