// Student Task 004: Skaitmeninių technologijų poveikis aplinkai
// L lesson, Grade 9, theory-analysis domain
// ALL Lithuanian text in plain UTF-8
import { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Footer, AlignmentType, LevelFormat, BorderStyle,
  WidthType, ShadingType, PageNumber } from "docx";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ── Design tokens ──
const NAVY = "1F4E79", BLUE = "2E75B6", BODY = "333333",
      GREY = "808080", GREEN = "2E7D32", AMBER = "BF8F00";
const PAGE_W = 11906, PAGE_H = 16838, M = 1440;
const CW = PAGE_W - 2 * M;

const noB = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
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
const H3 = (t) => new Paragraph({ keepNext: true, keepLines: true,
  spacing: { before: 360, after: 120 },
  children: [new TextRun({ text: t, font: "Arial", size: 23, bold: true, color: BLUE })] });
const empty = () => P([], { spacing: { after: 60 } });
const rule = (c, s) => new Paragraph({ spacing: { after: 200 },
  border: { bottom: { style: BorderStyle.SINGLE, size: s, color: c, space: 1 } }, children: [] });

const hint = t => new Paragraph({
  spacing: { before: 120, after: 60, line: 276 },
  indent: { left: 720 },
  children: [new TextRun({ text: `(Užuomina: ${t})`, font: "Arial", size: 22, italics: true, color: GREY })],
});
const check = t => new Paragraph({
  spacing: { before: 120, after: 60, line: 276 },
  indent: { left: 720 },
  children: [new TextRun({ text: `\u2713 ${t}`, font: "Arial", size: 22, italics: true, color: GREEN })],
});

function infoBox(label, text, bg, accent) {
  return new Table({ width: { size: CW, type: WidthType.DXA }, columnWidths: [CW],
    rows: [new TableRow({ cantSplit: true, children: [new TableCell({
      width: { size: CW, type: WidthType.DXA },
      borders: { top: thinB, bottom: thinB, right: thinB,
        left: { style: BorderStyle.SINGLE, size: 18, color: accent } },
      shading: { fill: bg, type: ShadingType.CLEAR },
      margins: { top: 120, bottom: 120, left: 160, right: 160 },
      children: [
        new Paragraph({ spacing: { after: 60 },
          children: [new TextRun({ text: label, font: "Arial", size: 22, bold: true, color: accent })] }),
        ...(Array.isArray(text) ? text : [new Paragraph({ spacing: { after: 0 },
          children: [new TextRun({ text, font: "Arial", size: 22, color: BODY })] })]),
      ],
    })] })],
  });
}
const stuckBox = (symptom, fixes) => infoBox(
  "\u0012STRIGOTE?",
  [
    new Paragraph({ spacing: { after: 60 },
      children: [R(`Jei ${symptom}:`)] }),
    ...fixes.map(f => new Paragraph({ spacing: { after: 40 },
      indent: { left: 360 },
      children: [R(`\u2022 ${f}`)] })),
  ],
  "FFF2CC", AMBER
);
const svarbuBox = t => infoBox("Svarbu", t, "DEEAF6", BLUE);

const numbering = { config: [
  { reference: "bul", levels: [{ level: 0, format: LevelFormat.BULLET, text: "\u2022",
    alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
  { reference: "check", levels: [{ level: 0, format: LevelFormat.BULLET, text: "\u2610",
    alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
]};

const checkItem = (t, last = false) => new Paragraph({
  numbering: { reference: "check", level: 0 },
  spacing: { after: 60, line: 276 },
  keepNext: !last,
  children: [R(t)],
});

// ── Fillable table for cause-impact-solution ──
const CIS_COL1 = 2200, CIS_COL2 = 2400, CIS_COL3 = 2200, CIS_COL4 = 2226;

function cisCell(text, w, hdr = false) {
  return new TableCell({
    width: { size: w, type: WidthType.DXA }, borders: thinBorders,
    shading: hdr ? { fill: NAVY, type: ShadingType.CLEAR } : undefined,
    margins: { top: 60, bottom: 60, left: 80, right: 80 },
    children: [new Paragraph({ spacing: { after: 0 },
      children: [new TextRun({ text, font: "Arial", size: 20, color: hdr ? "FFFFFF" : BODY, bold: hdr })] })],
  });
}
function cisEmptyCell(w, h = 600) {
  return new TableCell({
    width: { size: w, type: WidthType.DXA }, borders: thinBorders,
    margins: { top: 60, bottom: 60, left: 80, right: 80 },
    children: [new Paragraph({ spacing: { after: h }, children: [] })],
  });
}

const cisTable = new Table({
  width: { size: CW, type: WidthType.DXA },
  columnWidths: [CIS_COL1, CIS_COL2, CIS_COL3, CIS_COL4],
  rows: [
    // Header
    new TableRow({ children: [
      cisCell("Sritis", CIS_COL1, true),
      cisCell("Priežastis (kodėl kenkia?)", CIS_COL2, true),
      cisCell("Poveikis aplinkai", CIS_COL3, true),
      cisCell("Sprendimas (ką galime daryti?)", CIS_COL4, true),
    ] }),
    // Row 1: pre-filled topic
    new TableRow({ cantSplit: true, children: [
      cisCell("Duomenų centrai ir energija", CIS_COL1),
      cisEmptyCell(CIS_COL2),
      cisEmptyCell(CIS_COL3),
      cisEmptyCell(CIS_COL4),
    ] }),
    // Row 2: pre-filled topic
    new TableRow({ cantSplit: true, children: [
      cisCell("E-atliekos", CIS_COL1),
      cisEmptyCell(CIS_COL2),
      cisEmptyCell(CIS_COL3),
      cisEmptyCell(CIS_COL4),
    ] }),
    // Row 3: pre-filled topic
    new TableRow({ cantSplit: true, children: [
      cisCell("Skaitmeninis pėdsakas (kasdienė veikla)", CIS_COL1),
      cisEmptyCell(CIS_COL2),
      cisEmptyCell(CIS_COL3),
      cisEmptyCell(CIS_COL4),
    ] }),
    // Row 4: student chooses topic
    new TableRow({ cantSplit: true, children: [
      cisCell("ST nauda aplinkai (pasirinkite pavyzdį)", CIS_COL1),
      cisEmptyCell(CIS_COL2),
      cisEmptyCell(CIS_COL3),
      cisEmptyCell(CIS_COL4),
    ] }),
  ],
});

// ══════════════════════════════════════════════════════════
//  DOCUMENT CONTENT
// ══════════════════════════════════════════════════════════
const children = [
  // Header
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 40 },
    children: [new TextRun({ text: "UŽDUOTIES LAPAS", font: "Arial", size: 18, color: GREY, allCaps: true })] }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 60 },
    children: [new TextRun({ text: "Priežastis, poveikis, sprendimas", font: "Arial", size: 36, bold: true, color: NAVY })] }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 100 },
    children: [new TextRun({ text: "9 klasė  \u2022  Sauga  \u2022  Mokymosi pamoka", font: "Arial", size: 20, color: GREY })] }),
  rule(NAVY, 6),

  // ═══ Ką padarysite ═══
  H2("Ką padarysite"),
  P("Užpildysite lentelę, kurioje nurodysite, kaip skaitmeninės technologijos veikia aplinką. Kiekvienai sričiai įrašysite priežastį (kodėl kenkia), poveikį aplinkai ir galimą sprendimą."),
  P("Ketvirtoje eilutėje patys pasirinksite pavyzdį, kaip technologijos padeda aplinkai."),

  // ═══ Reikalavimai ═══
  H2("Reikalavimai"),
  P([B("1. "), R("Visos keturios lentelės eilutės užpildytos.")]),
  P([B("2. "), R("Kiekviename langelyje yra bent vienas sakinys.")]),
  P([B("3. "), R("Trečia eilutė apie skaitmeninį pėdsaką turi konkretų kasdienės veiklos pavyzdį (ne bendras teiginys).")]),
  P([B("4. "), R("Ketvirta eilutė apie ST naudą aplinkai turi konkretų pavyzdį (ne \u201Epadeda aplinkai\u201c, o kas tiksliai ir kaip).")]),

  // ═══ Darbo eiga ═══
  H2("Darbo eiga"),

  H3("1 ŽINGSNIS: Susipažinkite su lentele"),
  P("Pažvelkite į lentelę žemiau. Joje yra keturios eilutės. Pirmame stulpelyje nurodytos sritys. Likusius tris stulpelius turite užpildyti patys."),
  hint("Kiekvienas stulpelis atsako į atskirą klausimą: kodėl? kas nutinka? ką daryti?"),
  check("Matote lentelę su keturiomis eilutėmis ir tuščiais langeliais."),

  H3("2 ŽINGSNIS: Užpildykite pirmą eilutę (duomenų centrai)"),
  P("Prisiminkite, ką sužinojote apie duomenų centrus ir jų energijos suvartojimą."),
  P([B("Priežastis: "), R("parašykite, kodėl duomenų centrai naudoja daug energijos (serveriai, aušinimas, visą parą veikia).")]),
  P([B("Poveikis: "), R("parašykite, kokią žalą tai daro aplinkai (CO\u2082 emisijos, elektros suvartojimas).")]),
  P([B("Sprendimas: "), R("parašykite, ką galima padaryti (atsinaujinanti energija, efektyvesnis aušinimas).")]),
  hint("Galite naudoti pamokoje girdėtus pavyzdžius arba savo žodžiais perpasakoti."),
  check("Pirmoje eilutėje visi trys langeliai užpildyti bent vienu sakiniu."),

  H3("3 ŽINGSNIS: Užpildykite antrą eilutę (e-atliekos)"),
  P("Prisiminkite, kas yra e-atliekos ir kodėl jos pavojingos."),
  P([B("Priežastis: "), R("kodėl susidaro e-atliekos (seni prietaisai išmetami, greitai keičiami nauji).")]),
  P([B("Poveikis: "), R("kokią žalą daro (pavojingos medžiagos dirvožemyje, mažas perdirbimo lygis).")]),
  P([B("Sprendimas: "), R("ką daryti (taisyti, perdirbti, rinktis ilgaamžiškesnius prietaisus).")]),
  check("Antroje eilutėje visi trys langeliai užpildyti."),

  H3("4 ŽINGSNIS: Užpildykite trečią eilutę (skaitmeninis pėdsakas)"),
  P("Čia reikia konkretumo. Nepakanka parašyti \u201Einternetas naudoja energiją\u201c."),
  P([B("Priežastis: "), R("pasirinkite vieną konkretų kasdienį veiksmą (pvz., vaizdo įrašų žiūrėjimas, el. laiškų siuntimas) ir paaiškinkite, kodėl jis naudoja energiją.")]),
  P([B("Poveikis: "), R("kiek CO\u2082 tai sukuria? (Galite naudoti skaičius iš pamokos.)")]),
  P([B("Sprendimas: "), R("ką konkrečiai galite pakeisti savo elgesyje?")]),

  svarbuBox("Trečioje eilutėje būtina pateikti konkretų kasdienės veiklos pavyzdį. \u201EInternetas naudoja energiją\u201c yra per bendra. Geriau: \u201EViena valanda HD vaizdo įrašo sukuria apie 36\u2013100 g CO\u2082, nes duomenys keliauja iš serverio.\u201c"),
  empty(),

  check("Trečioje eilutėje yra konkretus pavyzdys su skaičiumi arba veikla."),

  H3("5 ŽINGSNIS: Užpildykite ketvirtą eilutę (ST nauda aplinkai)"),
  P("Ši eilutė kitokia. Čia reikia parodyti teigiamą pusę."),
  P([B("Pasirinkite vieną pavyzdį: "), R("aplinkos monitoringas, duomenų analizė, interaktyvūs žemėlapiai ar kitas pamokoje minėtas atvejis.")]),
  P([B("Priežastis: "), R("šiame stulpelyje parašykite, kokią problemą sprendžia jūsų pasirinktas pavyzdys.")]),
  P([B("Poveikis: "), R("parašykite, kokią naudą tai duoda aplinkai.")]),
  P([B("Sprendimas: "), R("šiame stulpelyje parašykite, kaip ši technologija veikia (trumpai).")]),
  hint("Pvz., jei pasirinkote aplinkos monitoringą: problema \u2014 nežinome, kur tarša didžiausia; nauda \u2014 galime greitai reaguoti; veikimas \u2014 palydovai fiksuoja oro kokybę realiuoju laiku."),
  check("Ketvirtoje eilutėje yra konkretus pavyzdys, ne bendras teiginys."),

  // ═══ Lentelė ═══
  H2("Lentelė"),
  cisTable,
  empty(),

  // ═══ Patikrinkite save ═══
  H2("Patikrinkite save"),
  checkItem("Ar visos keturios eilutės užpildytos?"),
  checkItem("Ar kiekviename langelyje yra bent vienas pilnas sakinys?"),
  checkItem("Ar trečioje eilutėje nurodėte konkretų kasdienės veiklos pavyzdį (ne bendrą teiginį)?"),
  checkItem("Ar ketvirtoje eilutėje pasirinkote konkretų ST naudos aplinkai pavyzdį?"),
  checkItem("Ar galite paaiškinti, kodėl debesija naudoja energiją, nors atrodo \u201Enemateriali\u201c?", true),
];

// ══════════════════════════════════════════════════════════
const doc = new Document({ numbering,
  sections: [{ properties: { page: { size: { width: PAGE_W, height: PAGE_H }, margin: { top: M, right: M, bottom: M, left: M } } },
    footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: "Puslapis ", font: "Arial", size: 16, color: GREY }),
        new TextRun({ children: [PageNumber.CURRENT], font: "Arial", size: 16, color: GREY })] })] }) },
    children }],
});

const outPath = path.join(__dirname, "..", "Grade_9", "Semester_1", "01_Safety",
  "004_L - Environmental impact of digital technologies", "Student_Task.docx");
const buf = await Packer.toBuffer(doc);
fs.writeFileSync(outPath, buf);
console.log(`OK: ${outPath} (${buf.length} bytes)`);
