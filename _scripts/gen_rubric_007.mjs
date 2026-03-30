// Rubric.pdf generator for 007_A — Saugos struktūrinis vertinimas
// Grade 9, Safety module
// ALL Lithuanian text in plain UTF-8
import { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  AlignmentType, BorderStyle, WidthType, ShadingType } from "docx";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DOCX = path.resolve(__dirname,
  "../Grade_9/Semester_1/01_Safety/007_A - Safety structured assessment/Rubric.docx");

// ── Design tokens (matches assessment_format.md) ──
const NAVY = "1F4E79", BODY = "333333", GREY = "808080";
const PAGE_W = 11906, PAGE_H = 16838, M = 1440;
const CW = PAGE_W - 2 * M; // 9026

const thinB = { style: BorderStyle.SINGLE, size: 1, color: "BFBFBF" };
const thinBorders = { top: thinB, bottom: thinB, left: thinB, right: thinB };

// ── Builders ──
const R = (t, o = {}) => new TextRun({ text: t, font: "Arial", size: 22, color: BODY, ...o });
const B = (t, o = {}) => R(t, { bold: true, ...o });
const P = (runs, o = {}) => new Paragraph({
  spacing: { after: 120, line: 276 }, ...o,
  children: (Array.isArray(runs) ? runs : [runs]).map(r => typeof r === "string" ? R(r) : r),
});

const H2 = t => new Paragraph({ keepNext: true, keepLines: true,
  spacing: { before: 360, after: 160 },
  children: [new TextRun({ text: t, font: "Arial", size: 26, bold: true, color: NAVY })] });

const rule = () => new Paragraph({ spacing: { after: 200 },
  border: { bottom: { style: BorderStyle.SINGLE, size: 1, color: NAVY, space: 1 } }, children: [] });

// Table cell helper
function tc(text, opts = {}) {
  const { bold, color, bg, width, align } = opts;
  const cellOpts = {
    borders: thinBorders,
    margins: { top: 60, bottom: 60, left: 100, right: 100 },
    children: [new Paragraph({
      alignment: align || AlignmentType.LEFT,
      spacing: { after: 0, line: 276 },
      children: [new TextRun({
        text, font: "Arial", size: 20,
        bold: bold || false,
        color: color || BODY
      })]
    })]
  };
  if (width) cellOpts.width = { size: width, type: WidthType.DXA };
  if (bg) cellOpts.shading = { type: ShadingType.CLEAR, fill: bg };
  return new TableCell(cellOpts);
}

// Header cell (white on navy)
function hc(text, width) {
  return tc(text, { bold: true, color: "FFFFFF", bg: NAVY, width, align: AlignmentType.CENTER });
}

// ══════════════════════════════════════════════════════════════
// DOCUMENT CONTENT
// ══════════════════════════════════════════════════════════════

function buildDoc() {
  // ── Per-question point map ──
  const questionRows = [
    ["1", "MCQ: Ergonomika (20-20-20, atstumas, ekrano padėtis)", "Slenkstinis", "1"],
    ["2", "MCQ: Slaptažodžio stiprumas", "Slenkstinis", "1"],
    ["3", "MCQ: Phishing / socialinė inžinerija / dezinformacija", "Slenkstinis", "1"],
    ["4", "MCQ: E-atliekos, duomenų centrai, energija", "Slenkstinis", "1"],
    ["5", "MCQ: Pertraukų, laikysenos, rankų padėties nauda", "Patenkinamas", "1"],
    ["6", "MCQ: 2FA veikimo principas", "Patenkinamas", "1"],
    ["7", "MCQ: Phishing požymių atpažinimas", "Patenkinamas", "1"],
    ["8", "MCQ: Skaitmeninio pėdsako mažinimas", "Patenkinamas", "1"],
    ["9", "Atviras: asmeninių duomenų sauga situacijoje", "Patenkinamas", "2"],
    ["10", "Atviras: trumpalaikis vs ilgalaikis poveikis (ergonomika / aplinka)", "Pagrindinis", "2"],
    ["11", "Atviras: slaptažodžio / 2FA klaidingo teiginio vertinimas", "Pagrindinis", "2"],
    ["12", "Atviras: phishing požymiai + saugaus reagavimo algoritmas", "Pagrindinis", "2"],
    ["13", "Scenarijus: integruota fizinė ir skaitmeninė sauga", "Aukštesnysis", "2"],
    ["14", "Scenarijus: skaitmeninio pėdsako / e-atliekų klaidingas teiginys", "Aukštesnysis", "2"],
  ];

  // Column widths (total = CW = 9026)
  const qW = [600, 4226, 1800, 1200, 1200]; // Nr, Klausimas, Lygis, Taškai, Pastabos

  const qHeaderRow = new TableRow({
    tableHeader: true,
    children: [
      hc("Nr.", qW[0]),
      hc("Klausimas", qW[1]),
      hc("Kompetencijos lygis", qW[2]),
      hc("Taškai", qW[3]),
    ]
  });

  const qDataRows = questionRows.map(([nr, desc, level, pts]) =>
    new TableRow({ cantSplit: true, children: [
      tc(nr, { width: qW[0], align: AlignmentType.CENTER }),
      tc(desc, { width: qW[1] }),
      tc(level, { width: qW[2], align: AlignmentType.CENTER }),
      tc(pts, { width: qW[3], align: AlignmentType.CENTER }),
    ]})
  );

  // Total row
  const totalRow = new TableRow({ cantSplit: true, children: [
    tc("", { width: qW[0] }),
    tc("Iš viso", { width: qW[1], bold: true }),
    tc("", { width: qW[2] }),
    tc("20", { width: qW[3], bold: true, align: AlignmentType.CENTER }),
  ]});

  const questionTable = new Table({
    width: { size: CW, type: WidthType.DXA },
    rows: [qHeaderRow, ...qDataRows, totalRow],
  });

  // ── Conversion table ──
  const convData = [
    ["19-20", "10"], ["17-18", "9"], ["15-16", "8"],
    ["13-14", "7"], ["11-12", "6"], ["9-10", "5"],
    ["6-8", "4"], ["4-5", "3"], ["2-3", "2"], ["0-1", "1"],
  ];

  const convW = [4513, 4513]; // half each
  const convHeader = new TableRow({ tableHeader: true, children: [
    hc("Taškai", convW[0]), hc("Pažymys", convW[1]),
  ]});
  const convRows = convData.map(([pts, grade]) =>
    new TableRow({ cantSplit: true, children: [
      tc(pts, { width: convW[0], align: AlignmentType.CENTER }),
      tc(grade, { width: convW[1], align: AlignmentType.CENTER }),
    ]})
  );

  const convTable = new Table({
    width: { size: CW, type: WidthType.DXA },
    rows: [convHeader, ...convRows],
  });

  // ── Essay grading guide ──
  const essayGuideRows = [
    ["2 taškai", "Atsakymas pilnas: teisingai identifikuoja problemą, paaiškina ryšį ar priežastį, pateikia konkretų veiksmą ar pavyzdį. Atsakymas logiškas ir rišlus."],
    ["1 taškas", "Atsakymas dalinis: teisingai identifikuoja problemą, bet paaiškinimas neišsamus arba trūksta konkretaus veiksmo / pavyzdžio."],
    ["0 taškų", "Atsakymas neteisingas, neatitinka klausimo arba nepateiktas."],
  ];

  const egW = [1500, 7526];
  const egHeader = new TableRow({ tableHeader: true, children: [
    hc("Taškai", egW[0]), hc("Aprašymas", egW[1]),
  ]});
  const egRows = essayGuideRows.map(([pts, desc]) =>
    new TableRow({ cantSplit: true, children: [
      tc(pts, { width: egW[0], align: AlignmentType.CENTER, bold: true }),
      tc(desc, { width: egW[1] }),
    ]})
  );

  const essayGuideTable = new Table({
    width: { size: CW, type: WidthType.DXA },
    rows: [egHeader, ...egRows],
  });

  // ── Competency distribution summary ──
  const distData = [
    ["Slenkstinis (I)", "4 taškai (20%)", "Klausimai 1-4: bazinis atpažinimas"],
    ["Patenkinamas (II)", "6 taškai (30%)", "Klausimai 5-9: paaiškinimas savais žodžiais"],
    ["Pagrindinis (III)", "6 taškai (30%)", "Klausimai 10-12: taikymas naujoje situacijoje"],
    ["Aukštesnysis (IV)", "4 taškai (20%)", "Klausimai 13-14: scenarijų analizė ir argumentavimas"],
  ];

  const dW = [2000, 2200, 4826];
  const dHeader = new TableRow({ tableHeader: true, children: [
    hc("Lygis", dW[0]), hc("Taškai", dW[1]), hc("Aprašymas", dW[2]),
  ]});
  const dRows = distData.map(([level, pts, desc]) =>
    new TableRow({ cantSplit: true, children: [
      tc(level, { width: dW[0], bold: true }),
      tc(pts, { width: dW[1], align: AlignmentType.CENTER }),
      tc(desc, { width: dW[2] }),
    ]})
  );

  const distTable = new Table({
    width: { size: CW, type: WidthType.DXA },
    rows: [dHeader, ...dRows],
  });

  // ── Build document ──
  return new Document({
    sections: [{
      properties: {
        page: {
          size: { width: PAGE_W, height: PAGE_H },
          margin: { top: M, bottom: M, left: M, right: M },
        },
      },
      children: [
        // Header
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 60 },
          children: [new TextRun({ text: "VERTINIMO KRITERIJAI", font: "Arial",
            size: 18, color: GREY, allCaps: true })] }),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 60 },
          children: [new TextRun({ text: "007_A Saugos struktūrinis vertinimas", font: "Arial",
            size: 36, bold: true, color: NAVY })] }),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 120 },
          children: [new TextRun({ text: "9 klasė  \u2022  Sauga", font: "Arial",
            size: 20, color: GREY })] }),
        rule(),

        // Competency distribution
        H2("Kompetencijų lygių paskirstymas"),
        distTable,

        // Per-question points
        H2("Taškų paskirstymas pagal klausimus"),
        questionTable,

        // Essay grading guide
        H2("Atvirų klausimų vertinimo gairės"),
        P("Kiekvienas atviras klausimas ir scenarijaus analizė vertinami pagal šią skalę:"),
        essayGuideTable,

        // Conversion table
        H2("Taškų konvertavimas į pažymį"),
        P("Iš viso: 20 taškų"),
        convTable,

        // Notes
        H2("Pastabos"),
        P("Testmoz automatiškai vertina uždarus klausimus (MCQ). Atvirus klausimus ir scenarijų analizes mokytojas vertina rankiniu būdu Testmoz platformoje."),
        P("Kiekvienas klausimas turi 3 variantus. Testmoz kiekvienam mokiniui atsitiktinai parenka po vieną variantą iš kiekvieno klausimų rinkinio."),
      ],
    }],
  });
}

// ══════════════════════════════════════════════════════════════
// WRITE
// ══════════════════════════════════════════════════════════════

async function main() {
  const doc = buildDoc();
  const buf = await Packer.toBuffer(doc);
  fs.writeFileSync(OUT_DOCX, buf);
  console.log("Rubric.docx written to:", OUT_DOCX);

  // Verify: read back and check key content
  console.log("File size:", fs.statSync(OUT_DOCX).size, "bytes");
  console.log("NOTE: Convert to PDF manually or via docx2pdf.");
}

main().catch(e => { console.error(e); process.exit(1); });
