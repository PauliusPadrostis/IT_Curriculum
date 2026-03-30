// Visual Aid 004: Skaitmeninių technologijų poveikis aplinkai
// 6-page landscape A4 projection aid
// ALL Lithuanian text in plain UTF-8
import { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  AlignmentType, BorderStyle, WidthType, ShadingType,
  HeightRule, VerticalAlign, PageOrientation } from "docx";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ── Colors ──
const TITLE_BG = "1A237E", WHITE = "FFFFFF",
      RETRIEVAL = "F57C00", OBJ = "5E35B1",
      APP = "2E7D32", TEACH = "1565C0",
      BODY = "212121";

// ── Page: pass portrait dims, docx-js swaps for landscape ──
const PAGE_W = 11906, PAGE_H = 16838, MARGIN = 1134;
const noB = { style: BorderStyle.NONE, size: 0, color: WHITE };
const noBorders = { top: noB, bottom: noB, left: noB, right: noB };

// ── Helpers ──
const R = (t, o = {}) => new TextRun({ text: t, font: "Arial", ...o });

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
          children: [R(label, { bold: true, color: WHITE, size: 56 })],
        })],
      })],
    })],
  });
}

const spacer = (twips = 400) => new Paragraph({ spacing: { before: twips, after: 0 }, children: [] });

function questionItem(num, text, accentColor) {
  return new Paragraph({
    spacing: { before: 200, after: 0 },
    children: [
      R(`${num}. `, { bold: true, color: accentColor, size: 56 }),
      R(text, { color: BODY, size: 56 }),
    ],
  });
}

function bulletItem(text, accentColor) {
  return new Paragraph({
    spacing: { before: 200, after: 0 },
    children: [
      R("\u25B8 ", { bold: true, color: accentColor, size: 56 }),
      R(text, { color: BODY, size: 56 }),
    ],
  });
}

function termItem(term, definition) {
  return new Paragraph({
    spacing: { before: 160, after: 0 },
    children: [
      R(term, { bold: true, color: TEACH, size: 56 }),
      R(` : ${definition}`, { color: BODY, size: 48 }),
    ],
  });
}

const pageProps = {
  page: {
    size: { width: PAGE_W, height: PAGE_H, orientation: PageOrientation.LANDSCAPE },
    margin: { top: MARGIN, right: MARGIN, bottom: MARGIN, left: MARGIN },
  },
};

// ══════════════════════════════════════════════════════════
// SLIDE 1: Title
// ══════════════════════════════════════════════════════════
const slide1 = {
  properties: {
    ...pageProps,
    page: {
      ...pageProps.page,
      // Full navy background via section shading
    },
  },
  children: [
    // Navy background table filling the page
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [new TableRow({
        height: { value: 9638, rule: HeightRule.EXACT },
        children: [new TableCell({
          shading: { type: ShadingType.CLEAR, fill: TITLE_BG },
          verticalAlign: VerticalAlign.CENTER,
          borders: noBorders,
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              spacing: { after: 200 },
              children: [R("SAUGA", { bold: true, color: WHITE, size: 64, allCaps: true })],
            }),
            new Paragraph({
              alignment: AlignmentType.CENTER,
              spacing: { after: 0 },
              children: [R("Skaitmeninių technologijų poveikis aplinkai", { bold: true, color: WHITE, size: 96 })],
            }),
          ],
        })],
      })],
    }),
  ],
};

// ══════════════════════════════════════════════════════════
// SLIDE 2: Pamokos pradžios klausimai
// ══════════════════════════════════════════════════════════
const slide2 = {
  properties: pageProps,
  children: [
    accentBar("PAMOKOS PRADŽIOS KLAUSIMAI", RETRIEVAL),
    spacer(),
    questionItem(1, "Įvardinkite bent 2 tipiškus phishing žinutės požymius.", RETRIEVAL),
    questionItem(2, "Kuo skiriasi klaidinga informacija nuo dezinformacijos?", RETRIEVAL),
    questionItem(3, "Gaunate el. laišką su nuoroda ir prašymu skubiai patvirtinti paskyrą. Kokius 3 žingsnius atliekate?", RETRIEVAL),
  ],
};

// ══════════════════════════════════════════════════════════
// SLIDE 3: Pamokos tikslai
// ══════════════════════════════════════════════════════════
const slide3 = {
  properties: pageProps,
  children: [
    accentBar("PAMOKOS TIKSLAI", OBJ),
    spacer(),
    bulletItem("Įvardinti ST poveikio aplinkai sritis: energija, e-atliekos, duomenų centrai.", OBJ),
    bulletItem("Paaiškinti, kaip kasdieniai skaitmeniniai veiksmai sunaudoja išteklius.", OBJ),
    bulletItem("Pateikti pavyzdį, kaip ST padeda spręsti aplinkosaugos problemas.", OBJ),
    bulletItem("Įvardinti 2 veiksmus savo skaitmeniniam pėdsakui mažinti.", OBJ),
  ],
};

// ══════════════════════════════════════════════════════════
// SLIDE 4: Užduotis
// ══════════════════════════════════════════════════════════
const slide4 = {
  properties: pageProps,
  children: [
    accentBar("UŽDUOTIS", APP),
    spacer(),
    new Paragraph({
      spacing: { before: 0, after: 200 },
      children: [R("Užpildykite lentelę \u201EPriežastis, poveikis, sprendimas\u201c.", { color: BODY, size: 56 })],
    }),
    new Paragraph({
      spacing: { before: 0, after: 200 },
      children: [R("Kiekvienai sričiai (duomenų centrai, e-atliekos, skaitmeninis pėdsakas) įrašykite priežastį, poveikį aplinkai ir galimą sprendimą.", { color: BODY, size: 56 })],
    }),
    new Paragraph({
      spacing: { before: 0, after: 0 },
      children: [R("Ketvirtoje eilutėje pasirinkite pavyzdį, kaip ST padeda aplinkai.", { color: BODY, size: 56 })],
    }),
  ],
};

// ══════════════════════════════════════════════════════════
// SLIDE 5: Pagrindinės sąvokos
// ══════════════════════════════════════════════════════════
const slide5 = {
  properties: pageProps,
  children: [
    accentBar("PAGRINDINĖS SĄVOKOS", TEACH),
    spacer(),
    termItem("Duomenų centras", "pastatas su serveriais, veikiančiais visą parą ir naudojančiais daug elektros."),
    termItem("E-atliekos", "išmesti elektroniniai prietaisai su pavojingomis medžiagomis (švinas, gyvsidabris)."),
    termItem("Skaitmeninis pėdsakas", "jūsų kasdienės skaitmeninės veiklos sukuriama CO\u2082 emisija."),
    termItem("Aplinkos monitoringas", "aplinkos stebėjimas palydovais ir jutikliais realiuoju laiku."),
  ],
};

// ══════════════════════════════════════════════════════════
// SLIDE 6: Pamokos pabaigos klausimai
// ══════════════════════════════════════════════════════════
const slide6 = {
  properties: pageProps,
  children: [
    accentBar("PAMOKOS PABAIGOS KLAUSIMAI", RETRIEVAL),
    spacer(),
    questionItem(1, "Kodėl srautinis vaizdo įrašas sunaudoja daugiau energijos nei tekstinė žinutė?", RETRIEVAL),
    questionItem(2, "Įvardinkite 2 pavojus, kuriuos kelia netinkamai pašalintos e-atliekos.", RETRIEVAL),
    questionItem(3, "Pateikite vieną pavyzdį, kaip ST padeda spręsti aplinkos problemas.", RETRIEVAL),
  ],
};

// ══════════════════════════════════════════════════════════
// BUILD DOCUMENT
// ══════════════════════════════════════════════════════════
const doc = new Document({
  sections: [slide1, slide2, slide3, slide4, slide5, slide6],
});

const outPath = path.join(__dirname, "..", "Grade_9", "Semester_1", "01_Safety",
  "004_L - Environmental impact of digital technologies", "Visual_Aid.docx");
const buf = await Packer.toBuffer(doc);
fs.writeFileSync(outPath, buf);
console.log(`OK: ${outPath} (${buf.length} bytes)`);
