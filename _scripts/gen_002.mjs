import { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  BorderStyle, WidthType, TableLayoutType, ShadingType, AlignmentType } from "docx";
import { writeFileSync } from "fs";

// ── Color palette ────────────────────────────────────────────────
const C = {
  RETRIEVAL_BG: "FFF3E0", RETRIEVAL_ACCENT: "F57C00",
  TEACHING_BG: "E3F2FD", TEACHING_ACCENT: "1565C0",
  APPLICATION_BG: "E8F5E9", APPLICATION_ACCENT: "2E7D32",
  DIARY_ACCENT: "757575",
  META_BG: "F8F9FA",
  OBJ_BG: "EDE7F6", OBJ_ACCENT: "5E35B1",
  CODE_BG: "F5F5F5",
  TABLE_HEADER: "E3F2FD", TABLE_ALT: "FAFAFA",
  BORDER_LIGHT: "E0E0E0",
  TITLE_LINE: "1565C0", TITLE_COLOR: "1A237E",
  WARNING_BG: "FFF8E1", WARNING_TEXT: "E65100",
  BODY: "212121", LABEL: "424242", MUTED: "757575", BRIDGE: "616161",
};

const NONE_BORDER = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
const noBorders = { top: NONE_BORDER, bottom: NONE_BORDER, left: NONE_BORDER, right: NONE_BORDER };

// ── Helpers ──────────────────────────────────────────────────────
const bodyP = (children, extra = {}) => new Paragraph({
  spacing: { after: 80 }, ...extra,
  children: (typeof children === "string"
    ? [new TextRun({ text: children, font: "Arial", size: 22, color: C.BODY })]
    : children),
});

const labeledP = (label, value, extra = {}) => new Paragraph({
  spacing: { after: 80 }, ...extra,
  children: [
    new TextRun({ text: label + " ", bold: true, color: C.LABEL, font: "Arial", size: 22 }),
    new TextRun({ text: value, color: C.BODY, font: "Arial", size: 22 }),
  ],
});

const phaseHeader = (title, timing, bg, accent) => new Table({
  layout: TableLayoutType.FIXED, columnWidths: [200, 9400],
  borders: noBorders,
  rows: [new TableRow({ cantSplit: true, children: [
    new TableCell({
      shading: { type: ShadingType.CLEAR, fill: accent },
      width: { size: 200, type: WidthType.DXA },
      children: [new Paragraph({})],
    }),
    new TableCell({
      shading: { type: ShadingType.CLEAR, fill: bg },
      width: { size: 9400, type: WidthType.DXA },
      children: [new Paragraph({ children: [
        new TextRun({ text: title, bold: true, color: accent, size: 24, font: "Arial" }),
        new TextRun({ text: ` — ${timing}`, color: C.MUTED, size: 20, font: "Arial" }),
      ]})],
    }),
  ]})],
});

const question = (num, text, accent) => new Paragraph({
  indent: { left: 360 }, spacing: { after: 60 }, keepNext: true,
  children: [
    new TextRun({ text: `${num}. `, bold: true, color: accent, font: "Arial", size: 22 }),
    new TextRun({ text, color: C.BODY, font: "Arial", size: 22 }),
  ],
});

const bridgeP = (text) => new Paragraph({
  indent: { left: 240 }, spacing: { after: 80 },
  children: [new TextRun({ text, italics: true, color: C.BRIDGE, font: "Arial", size: 20 })],
});

const warningP = (mistake, rule) => new Paragraph({
  indent: { left: 240 }, keepLines: true,
  shading: { type: ShadingType.CLEAR, fill: C.WARNING_BG },
  spacing: { before: 80, after: 80 },
  children: [
    new TextRun({ text: "⚠ Dažna klaida: ", bold: true, color: C.WARNING_TEXT, font: "Arial", size: 22 }),
    new TextRun({ text: mistake + " ", color: C.BODY, font: "Arial", size: 22 }),
    new TextRun({ text: "Taisyklė: " + rule, bold: true, color: C.BODY, font: "Arial", size: 22 }),
  ],
});

const spacer = (twips = 200) => new Paragraph({ spacing: { before: twips } });

const hrRule = (color = C.MUTED, sz = 8) => new Paragraph({
  border: { bottom: { style: BorderStyle.SINGLE, size: sz, color } },
  spacing: { after: 100 }, keepNext: true,
});

// ── Metadata row helper ──────────────────────────────────────────
const metaRow = (label, value) => new TableRow({ children: [
  new TableCell({
    shading: { type: ShadingType.CLEAR, fill: C.META_BG },
    width: { size: 2400, type: WidthType.DXA },
    borders: { top: NONE_BORDER, left: NONE_BORDER, right: NONE_BORDER,
      bottom: { style: BorderStyle.SINGLE, size: 4, color: "EEEEEE" } },
    margins: { top: 60, bottom: 60, left: 120, right: 120 },
    children: [new Paragraph({ children: [
      new TextRun({ text: label, bold: true, color: C.LABEL, font: "Arial", size: 22 }),
    ]})],
  }),
  new TableCell({
    shading: { type: ShadingType.CLEAR, fill: C.META_BG },
    width: { size: 7200, type: WidthType.DXA },
    borders: { top: NONE_BORDER, left: NONE_BORDER, right: NONE_BORDER,
      bottom: { style: BorderStyle.SINGLE, size: 4, color: "EEEEEE" } },
    margins: { top: 60, bottom: 60, left: 120, right: 120 },
    children: [new Paragraph({ children: [
      new TextRun({ text: value, color: C.BODY, font: "Arial", size: 22 }),
    ]})],
  }),
]});

// ── BUILD DOCUMENT ───────────────────────────────────────────────
const children = [

  // ── TITLE ──
  new Paragraph({
    spacing: { after: 120 },
    children: [new TextRun({ text: "Privatumas ir paskyrų sauga", bold: true, size: 36, font: "Arial", color: C.TITLE_COLOR })],
  }),
  new Paragraph({
    border: { bottom: { style: BorderStyle.SINGLE, size: 48, color: C.TITLE_LINE } },
    spacing: { after: 200 },
  }),

  // ── METADATA CARD ──
  new Table({
    layout: TableLayoutType.FIXED, columnWidths: [2400, 7200],
    borders: noBorders,
    rows: [
      metaRow("Tipas", "L — Mokymosi pamoka (2 iš 7 apie saugą)"),
      metaRow("Klasė", "9"),
      metaRow("Trukmė", "~40 min."),
      metaRow("Forma", "Demo → bandymas"),
      metaRow("Temos ribos", "Ši pamoka apima stiprių slaptažodžių kūrimą, dviejų veiksnių autentifikacijos (2FA) logiką ir jautrių asmeninių duomenų atpažinimą. Neapima internetinių grėsmių (phishing), aplinkos poveikio ar ergonomikos."),
    ],
  }),

  spacer(),

  // ── OBJECTIVES BOX ──
  new Table({
    layout: TableLayoutType.FIXED, columnWidths: [9600],
    rows: [new TableRow({ cantSplit: true, children: [
      new TableCell({
        shading: { type: ShadingType.CLEAR, fill: C.OBJ_BG },
        borders: {
          left: { style: BorderStyle.SINGLE, size: 64, color: C.OBJ_ACCENT },
          top: { style: BorderStyle.SINGLE, size: 4, color: C.BORDER_LIGHT },
          right: { style: BorderStyle.SINGLE, size: 4, color: C.BORDER_LIGHT },
          bottom: { style: BorderStyle.SINGLE, size: 4, color: C.BORDER_LIGHT },
        },
        margins: { top: 120, bottom: 120, left: 120, right: 120 },
        children: [
          new Paragraph({ spacing: { after: 80 }, children: [
            new TextRun({ text: "PAMOKOS TIKSLAI", bold: true, color: "4A148C", font: "Arial", size: 22 }),
          ]}),
          new Paragraph({ spacing: { after: 60 }, children: [
            new TextRun({ text: "▸ ", bold: true, color: C.OBJ_ACCENT, font: "Arial", size: 22 }),
            new TextRun({ text: "Paaiškinti, kas daro slaptažodį stiprų, ir sukurti slaptažodį pagal saugumo kriterijus.", color: C.BODY, font: "Arial", size: 22 }),
          ]}),
          new Paragraph({ spacing: { after: 60 }, children: [
            new TextRun({ text: "▸ ", bold: true, color: C.OBJ_ACCENT, font: "Arial", size: 22 }),
            new TextRun({ text: "Apibūdinti, kaip veikia dviejų veiksnių autentifikacija ir kodėl ji padidina saugumą.", color: C.BODY, font: "Arial", size: 22 }),
          ]}),
          new Paragraph({ spacing: { after: 0 }, children: [
            new TextRun({ text: "▸ ", bold: true, color: C.OBJ_ACCENT, font: "Arial", size: 22 }),
            new TextRun({ text: "Atskirti saugų ir nesaugų elgesį su asmeniniais duomenimis konkrečiose situacijose.", color: C.BODY, font: "Arial", size: 22 }),
          ]}),
        ],
      }),
    ]})],
  }),

  spacer(),

  // ── PHASE: ENTRY RETRIEVAL ──
  phaseHeader("Pamokos pradžios klausimai", "~4 min.", C.RETRIEVAL_BG, C.RETRIEVAL_ACCENT),
  labeledP("Formatas:", "žodinis. Klausimai skaidrėje.", { keepNext: true }),
  bodyP([new TextRun({ text: "Klausimai iš praėjusios pamokos (ergonomika):", bold: true, color: C.BODY, font: "Arial", size: 22 })], { keepNext: true }),
  question(1, "Kokia turėtų būti sėdėjimo laikysena prie kompiuterio? Įvardinkite 2 taisykles.", C.RETRIEVAL_ACCENT),
  question(2, "Ką reiškia 20-20-20 taisyklė?", C.RETRIEVAL_ACCENT),
  question(3, "Kodėl reikia daryti pertraukas, net kai nesijaučia pavargęs?", C.RETRIEVAL_ACCENT),
  bridgeP("Ryšys: „Praeitą pamoką kalbėjome apie fizinę saugą — šiandien kalbėsime apie skaitmeninę: kaip apsaugoti savo paskyras ir duomenis.""),

  spacer(),

  // ── PHASE: TEACHING ──
  phaseHeader("Dėstymas ir vedama praktika", "~22 min.", C.TEACHING_BG, C.TEACHING_ACCENT),

  bodyP([new TextRun({ text: "Slaptažodžių sauga — ~10 min.", bold: true, color: C.TEACHING_ACCENT, font: "Arial", size: 22 })], { keepNext: true }),
  bodyP("Parodykite skaidrėje silpnų slaptažodžių pavyzdžius: „123456", „slaptazodis", vardas+gimimo metai."),
  bodyP("Paaiškinkite stipraus slaptažodžio kriterijus:"),
  bodyP("  • ≥12 simbolių", { indent: { left: 360 } }),
  bodyP("  • Didžiosios ir mažosios raidės", { indent: { left: 360 } }),
  bodyP("  • Skaičiai ir specialūs simboliai", { indent: { left: 360 } }),
  bodyP("  • Ne asmeninė informacija", { indent: { left: 360 } }),
  bodyP("  • Kiekviena paskyra — skirtingas slaptažodis", { indent: { left: 360 } }),

  bodyP([
    new TextRun({ text: "Supratimo patikrinimas: ", bold: true, color: C.LABEL, font: "Arial", size: 22 }),
    new TextRun({ text: "„Ar slaptažodis 'Katinas2024!' yra stiprus? Kodėl taip arba ne?"", color: C.BODY, font: "Arial", size: 22 }),
  ]),
  bodyP("Praktinis bandymas (~3 min.): Mokiniai sugalvoja stiprų slaptažodį pagal kriterijus (žodžiu, neįvedant į kompiuterį). 2–3 mokiniai pasidalina logika, ne pačiu slaptažodžiu."),

  bodyP([new TextRun({ text: "Dviejų veiksnių autentifikacija — ~7 min.", bold: true, color: C.TEACHING_ACCENT, font: "Arial", size: 22 })], { keepNext: true }),
  bodyP("Paaiškinkite 2FA logiką: kažkas, ką žinai (slaptažodis) + kažkas, ką turi (telefonas/kodas). Parodykite skaidrėje 2FA veikimo schemą."),
  bodyP("Paaiškinkite: net jei slaptažodis pavogtas, be antrojo veiksnio prisijungti nepavyks."),
  warningP("manyti, kad 2FA = dviejų slaptažodžių turėjimas.", "2FA = du skirtingi veiksniai (žinojimas + turėjimas), ne du to paties tipo elementai."),

  bodyP([new TextRun({ text: "Jautrūs asmeniniai duomenys — ~5 min.", bold: true, color: C.TEACHING_ACCENT, font: "Arial", size: 22 })], { keepNext: true }),
  bodyP("Paaiškinkite: ne visi duomenys vienodai jautrūs. Parodykite pavyzdžių skalę: vardas (mažai jautrus) → adresas → asmens kodas → banko duomenys (labai jautrus)."),
  bodyP([
    new TextRun({ text: "Supratimo patikrinimas: ", bold: true, color: C.LABEL, font: "Arial", size: 22 }),
    new TextRun({ text: "„Ar savo mokyklos pavadinimą galima skelbti viešai? O namų adresą?"", color: C.BODY, font: "Arial", size: 22 }),
  ]),

  spacer(),

  // ── PHASE: APPLICATION ──
  phaseHeader("Savarankiška užduotis", "~8 min.", C.APPLICATION_BG, C.APPLICATION_ACCENT),
  bodyP("Užduoties instrukcijos skaidrėje. Mokytojas perskaito 5 situacijas. Mokiniai žodžiu atsakinėja: saugu ar nesaugu? Kodėl?", { keepNext: true }),

  bodyP([new TextRun({ text: "Situacijos:", bold: true, color: C.APPLICATION_ACCENT, font: "Arial", size: 22 })], { keepNext: true }),
  bodyP("1. Draugas prašo pasidalinti „Netflix" slaptažodžiu.", { indent: { left: 360 } }),
  bodyP("2. Svetainė prašo gimimo datos registruojantis žaidimui.", { indent: { left: 360 } }),
  bodyP("3. Nepažįstamas asmuo socialiniame tinkle klausia, kurioje mokykloje mokaisi.", { indent: { left: 360 } }),
  bodyP("4. El. parduotuvė prašo namų adreso pristatymui.", { indent: { left: 360 } }),
  bodyP("5. Klasiokas sako: „Duok savo slaptažodį, aš tik pažiūrėsiu."", { indent: { left: 360 } }),

  bodyP("Po kiekvienos situacijos trumpai aptarkite teisingą atsakymą."),

  spacer(),

  // ── PHASE: EXIT RETRIEVAL ──
  phaseHeader("Pamokos pabaigos klausimai", "~3 min.", C.RETRIEVAL_BG, C.RETRIEVAL_ACCENT),
  labeledP("Formatas:", "žodinis. Klausimai skaidrėje.", { keepNext: true }),
  question(1, "Kokie 3 kriterijai daro slaptažodį stiprų?", C.RETRIEVAL_ACCENT),
  question(2, "Kodėl 2FA padeda, net jei slaptažodis pavogtas?", C.RETRIEVAL_ACCENT),
  question(3, "Ar savo vardą ir pavardę skelbti internete saugu? Nuo ko tai priklauso?", C.RETRIEVAL_ACCENT),

  spacer(),

  // ── DIARY ──
  hrRule(),
  new Paragraph({ spacing: { after: 80 }, children: [
    new TextRun({ text: "PAMOKOS APRAŠYMAS (DIENYNUI)", bold: true, color: C.DIARY_ACCENT, font: "Arial", size: 22 }),
  ]}),
  new Paragraph({ spacing: { after: 80 }, children: [
    new TextRun({
      text: "Pamokoje mokiniai nagrinėjo skaitmeninės paskyrų saugos pagrindus: stiprių slaptažodžių kūrimo kriterijus, dviejų veiksnių autentifikacijos veikimo principą ir jautrių asmeninių duomenų atpažinimą. Analizavo konkrečias situacijas ir vertino, ar elgesys su duomenimis yra saugus.",
      italics: true, color: C.BRIDGE, font: "Arial", size: 21,
    }),
  ]}),
];

const doc = new Document({
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

const buf = await Packer.toBuffer(doc);
const outPath = "C:/Users/Paulius/Documents/informatika-curriculum/Grade_9/Semester_1/01_Safety/002_L - Privacy & account safety/Teacher_Plan.docx";
writeFileSync(outPath, buf);
console.log("Written:", outPath);
