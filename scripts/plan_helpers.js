const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, BorderStyle, ShadingType, AlignmentType
} = require("docx");

// ─── 5-color palette ─────────────────────────────────────────────
const C = {
  TITLE: "1A237E",
  TEACHING: "1565C0",
  RETRIEVAL: "F57C00",
  APPLICATION: "2E7D32",
  SECONDARY: "757575",
  BODY: "333333",
  WHITE: "FFFFFF",
  META_BG: "F8F9FA",
  OBJ_BG: "EDE7F6",
  OBJ_LABEL: "4A148C",
  WARNING_BG: "FFF8E1",
  WARNING_LABEL: "E65100",
  LABEL: "424242",
  BRIDGE: "616161",
  ROW_BORDER: "EEEEEE",
  LIGHT_BORDER: "E0E0E0",
};

const CONTENT_W = 11906 - 2 * 1134; // 9638 DXA
const NO_BORDER = { style: BorderStyle.NONE, size: 0, color: C.WHITE };
const noBorders = { top: NO_BORDER, bottom: NO_BORDER, left: NO_BORDER, right: NO_BORDER };

function txt(text, opts = {}) {
  return new TextRun({ font: "Arial", size: 22, color: C.BODY, ...opts, text });
}

function bodyPara(text, extra = {}) {
  return new Paragraph({
    spacing: { after: 80, line: 276 },
    ...extra,
    children: [txt(text)],
  });
}

function bodyParaRuns(runs, extra = {}) {
  return new Paragraph({
    spacing: { after: 80, line: 276 },
    ...extra,
    children: runs,
  });
}

function bulletPara(text) {
  return new Paragraph({
    spacing: { after: 60, line: 276 },
    indent: { left: 720, hanging: 360 },
    children: [txt("\u2022 " + text)],
  });
}

function title(text) {
  return [
    new Paragraph({
      spacing: { after: 120 },
      children: [txt(text, { bold: true, size: 36, color: C.TITLE })],
    }),
    new Paragraph({
      border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: C.TEACHING, space: 1 } },
      spacing: { after: 200 },
      children: [],
    }),
  ];
}

function metaCard(rows) {
  const COL1 = 2400;
  const COL2 = CONTENT_W - COL1;
  const rowBorder = { style: BorderStyle.SINGLE, size: 4, color: C.ROW_BORDER };
  const cellMargins = { top: 60, bottom: 60, left: 120, right: 120 };

  const tableRows = rows.map(([label, value]) =>
    new TableRow({
      children: [
        new TableCell({
          shading: { type: ShadingType.CLEAR, fill: C.META_BG },
          width: { size: COL1, type: WidthType.DXA },
          borders: { ...noBorders, bottom: rowBorder },
          margins: cellMargins,
          children: [new Paragraph({ children: [txt(label, { bold: true, color: C.LABEL })] })],
        }),
        new TableCell({
          shading: { type: ShadingType.CLEAR, fill: C.META_BG },
          width: { size: COL2, type: WidthType.DXA },
          borders: { ...noBorders, bottom: rowBorder },
          margins: cellMargins,
          children: [new Paragraph({ children: [txt(value)] })],
        }),
      ],
    })
  );

  return new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    columnWidths: [COL1, COL2],
    rows: tableRows,
  });
}

function objectivesBox(objectives) {
  const leftBorder = { style: BorderStyle.SINGLE, size: 48, color: C.TEACHING };
  const thinBorder = { style: BorderStyle.SINGLE, size: 4, color: C.LIGHT_BORDER };

  const children = [
    new Paragraph({
      spacing: { after: 80 },
      children: [txt("PAMOKOS TIKSLAI", { bold: true, color: C.OBJ_LABEL })],
    }),
    ...objectives.map(obj =>
      new Paragraph({
        spacing: { after: 60 },
        children: [
          txt("\u25B8 ", { bold: true, color: C.TEACHING }),
          txt(obj),
        ],
      })
    ),
  ];

  return new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    columnWidths: [CONTENT_W],
    rows: [new TableRow({
      cantSplit: true,
      children: [new TableCell({
        shading: { type: ShadingType.CLEAR, fill: C.OBJ_BG },
        borders: { left: leftBorder, top: thinBorder, right: thinBorder, bottom: thinBorder },
        margins: { top: 120, bottom: 120, left: 120, right: 120 },
        width: { size: CONTENT_W, type: WidthType.DXA },
        children,
      })],
    })],
  });
}

function phaseHeader(name, timing, color) {
  return [
    new Paragraph({
      spacing: { before: 400, after: 0 },
      keepNext: true,
      children: [
        txt(name, { bold: true, size: 28, color }),
        txt(` \u2014 ${timing}`, { size: 20, color: C.SECONDARY }),
      ],
    }),
    new Paragraph({
      border: { bottom: { style: BorderStyle.SINGLE, size: 4, color, space: 1 } },
      spacing: { after: 120 },
      keepNext: true,
      children: [],
    }),
  ];
}

function subBlockHeading(name, timing) {
  return new Paragraph({
    spacing: { before: 300, after: 80 },
    keepNext: true,
    children: [
      txt(name, { bold: true, size: 24, color: C.TEACHING }),
      txt(` \u2014 ${timing}`, { size: 20, color: C.SECONDARY }),
    ],
  });
}

function question(num, text, color) {
  return new Paragraph({
    spacing: { after: 60 },
    indent: { left: 360 },
    children: [
      txt(`${num}. `, { bold: true, color }),
      txt(text),
    ],
  });
}

function warningBox(mistake, rule) {
  return new Paragraph({
    indent: { left: 240 },
    shading: { type: ShadingType.CLEAR, fill: C.WARNING_BG },
    spacing: { before: 200, after: 80 },
    keepLines: true,
    children: [
      txt("\u26A0 Dažna klaida: ", { bold: true, color: C.WARNING_LABEL }),
      txt(mistake + " "),
      txt("Taisyklė: " + rule, { bold: true }),
    ],
  });
}

function labeledText(label, value) {
  return new Paragraph({
    spacing: { after: 80 },
    children: [
      txt(label, { bold: true, color: C.LABEL }),
      txt(" " + value),
    ],
  });
}

function bridgeText(text) {
  return new Paragraph({
    indent: { left: 240 },
    spacing: { after: 80 },
    children: [txt(text, { italics: true, size: 20, color: C.BRIDGE })],
  });
}

function diarySection(content) {
  return [
    new Paragraph({
      border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: C.SECONDARY, space: 1 } },
      spacing: { before: 300, after: 80 },
      keepNext: true,
      children: [],
    }),
    new Paragraph({
      spacing: { after: 80 },
      keepNext: true,
      children: [txt("PAMOKOS APRAŠYMAS (DIENYNUI)", { bold: true, color: C.SECONDARY })],
    }),
    new Paragraph({
      spacing: { after: 80 },
      children: [txt(content, { italics: true, size: 21, color: C.BRIDGE })],
    }),
  ];
}

function spacer(before = 120) {
  return new Paragraph({ spacing: { before }, children: [] });
}

function buildPlanDoc(children) {
  return new Document({
    styles: {
      default: {
        document: { run: { font: "Arial", size: 22, color: C.BODY } },
      },
    },
    sections: [{
      properties: {
        page: {
          size: { width: 11906, height: 16838 },
          margin: { top: 1134, bottom: 1134, left: 1134, right: 1134 },
        },
      },
      children,
    }],
  });
}

module.exports = {
  C, CONTENT_W,
  txt, bodyPara, bodyParaRuns, bulletPara,
  title, metaCard, objectivesBox,
  phaseHeader, subBlockHeading,
  question, warningBox,
  labeledText, bridgeText,
  diarySection, spacer,
  buildPlanDoc,
};
