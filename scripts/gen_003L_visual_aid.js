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
      txt("\u25B8 ", { bold: true, color: accentColor, size: 48 }),
      txt(text, { size: 48 }),
    ],
  });
}

function termItem(term, definition) {
  return new Paragraph({
    spacing: { after: 160, line: 340 },
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
              children: [txt("Internetinės rizikos ir saugaus reagavimo logika", { bold: true, color: C.WHITE, size: 96 })],
            }),
          ],
        })],
      })],
    }),
  ],
};

// Slide 2: Start retrieval (from L002 — Privacy & account safety)
const slide2 = {
  properties: pageProps,
  children: [
    accentBar("PAMOKOS PRADŽIOS KLAUSIMAI", C.RETRIEVAL),
    new Paragraph({ spacing: { before: 400 }, children: [] }),
    numberedQ(1, "Įvardinkite bent 3 stipraus slaptažodžio kriterijus.", C.RETRIEVAL),
    numberedQ(2, "Kaip dviejų veiksnių autentifikacija apsaugo paskyrą net tada, kai slaptažodis pavogtas?", C.RETRIEVAL),
    numberedQ(3, "Klasiokas prašo jūsų paskyros slaptažodžio \u201Etik pažiūrėti\u201C. Kaip reaguotumėte ir kodėl?", C.RETRIEVAL),
  ],
};

// Slide 3: Objectives
const slide3 = {
  properties: pageProps,
  children: [
    accentBar("PAMOKOS TIKSLAI", C.OBJ),
    new Paragraph({ spacing: { before: 400 }, children: [] }),
    bulletItem("Atpažinti dažniausias internetines grėsmes: phishing, socialinę inžineriją, melagienų sklaidą.", C.OBJ),
    bulletItem("Apibūdinti tipinius phishing žinutės požymius ir paaiškinti, kodėl jie kelia pavojų.", C.OBJ),
    bulletItem("Pritaikyti saugaus reagavimo algoritmą: sustoti \u2192 patikrinti \u2192 pranešti.", C.OBJ),
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
      children: [txt("4 situacijos apie internetines grėsmes.")],
    }),
    new Paragraph({
      spacing: { after: 200, line: 360 },
      children: [txt("Kiekvienai situacijai:")],
    }),
    new Paragraph({
      spacing: { after: 120, line: 360 },
      indent: { left: 720 },
      children: [txt("1. Nustatykite grėsmės tipą (phishing, socialinė inžinerija, dezinformacija).")],
    }),
    new Paragraph({
      spacing: { after: 120, line: 360 },
      indent: { left: 720 },
      children: [txt("2. Pritaikykite algoritmą: SUSTOTI \u2192 PATIKRINTI \u2192 PRANEŠTI.")],
    }),
    new Paragraph({
      spacing: { after: 200, line: 360 },
      indent: { left: 720 },
      children: [txt("3. Pagrįskite savo sprendimą.")],
    }),
  ],
};

// Slide 5: Key concepts (stays up during independent work)
const slide5 = {
  properties: pageProps,
  children: [
    accentBar("PAGRINDINĖS SĄVOKOS", C.TEACH),
    new Paragraph({ spacing: { before: 300 }, children: [] }),
    termItem("Phishing", "apgaulinga žinutė, bandanti išvilioti jūsų duomenis"),
    termItem("Socialinė inžinerija", "manipuliacija žmogumi, ne kompiuteriu"),
    termItem("Dezinformacija", "sąmoningai platinama melaginga informacija"),
    termItem("Algoritmas", "SUSTOTI \u2192 PATIKRINTI \u2192 PRANEŠTI"),
  ],
};

// Slide 6: End retrieval (from this lesson)
const slide6 = {
  properties: pageProps,
  children: [
    accentBar("PAMOKOS PABAIGOS KLAUSIMAI", C.RETRIEVAL),
    new Paragraph({ spacing: { before: 400 }, children: [] }),
    numberedQ(1, "Įvardinkite 3 tipinius phishing žinutės požymius.", C.RETRIEVAL),
    numberedQ(2, "Kuo skiriasi klaidinga informacija nuo dezinformacijos? Pateikite po vieną pavyzdį.", C.RETRIEVAL),
    numberedQ(3, "Gavote el. laišką iš nežinomo siuntėjo, kuriame teigiama, kad jūsų paskyra pažeista. Kaip pritaikytumėte tris algoritmo žingsnius?", C.RETRIEVAL),
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

const outDir = "Grade_9/Semester_1/01_Safety/003_L - Online risks & safe response logic";
Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync(`${outDir}/Visual_Aid.docx`, buf);
  console.log("\u2713 Visual_Aid.docx generated");
});
