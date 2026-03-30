// Student Task 005: Saugos scenarijų analizė
// I lesson, Grade 9, theory-analysis domain (verbal scenario rotation)
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
      GREY = "808080";
const PAGE_W = 11906, PAGE_H = 16838, M = 1440;
const CW = PAGE_W - 2 * M;

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
const H3 = t => new Paragraph({ keepNext: true, keepLines: true,
  spacing: { before: 360, after: 120 },
  children: [new TextRun({ text: t, font: "Arial", size: 23, bold: true, color: BLUE })] });
const rule = (c, s) => new Paragraph({ spacing: { after: 200 },
  border: { bottom: { style: BorderStyle.SINGLE, size: s, color: c, space: 1 } }, children: [] });

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
const svarbuBox = t => infoBox("Svarbu", t, "DEEAF6", BLUE);

const numbering = { config: [
  { reference: "num", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.",
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

// ── Scenario box: light grey background ──
function scenarioBox(number, area, description) {
  return new Table({
    width: { size: CW, type: WidthType.DXA }, columnWidths: [CW],
    rows: [new TableRow({ cantSplit: true, children: [new TableCell({
      width: { size: CW, type: WidthType.DXA },
      borders: { top: thinB, bottom: thinB, left: thinB, right: thinB },
      shading: { fill: "F2F2F2", type: ShadingType.CLEAR },
      margins: { top: 100, bottom: 100, left: 160, right: 160 },
      children: [
        new Paragraph({ spacing: { after: 60 },
          children: [
            new TextRun({ text: `${number} scenarijus`, font: "Arial", size: 22, bold: true, color: BLUE }),
            new TextRun({ text: `  (${area})`, font: "Arial", size: 20, color: GREY }),
          ] }),
        new Paragraph({ spacing: { after: 0, line: 276 },
          children: [new TextRun({ text: description, font: "Arial", size: 22, color: BODY })] }),
      ],
    })] })],
  });
}

// ── Content ──
const scenarios = [
  { n: 1, area: "Ergonomika",
    text: "Mokinys 3 valandas iš eilės dirba kompiuteriu, žiūri į ekraną iš 30 cm atstumo, sukėlęs kojas po kėde. Akys peršti, kaklas įsitempęs." },
  { n: 2, area: "Privatumas ir paskyrų sauga",
    text: "Draugas prašo pasidalinti savo mokyklos prisijungimo duomenimis, nes pamiršo savus. Žada grąžinti per pertrauką." },
  { n: 3, area: "Internetinės rizikos",
    text: "Ateina el. laiškas nuo \u201Emokykla.lt@gmail.com\u201C su pranešimu, kad jūsų pažymiai bus ištrinti, jei per 24 val. nepatvirtinsite per nuorodą." },
  { n: 4, area: "Aplinkos poveikis",
    text: "Mokinys kasdien žiūri 4 valandas srautinio vaizdo įrašų aukščiausia kokybe. Sako: \u201ENa ir kas, juk tai tik internetas, nieko nesunaudoja.\u201C" },
  { n: 5, area: "Privatumas + internetinės rizikos",
    text: "Socialiniame tinkle nepažįstamas asmuo siūlo pildyti apklausą \u201Enešiojamojo telefono laimikis\u201C. Apklausa prašo vardo, mokyklos pavadinimo ir el. pašto." },
  { n: 6, area: "Ergonomika + aplinkos poveikis",
    text: "Mokinys keičia nešiojamąjį kompiuterį ir telefoną į naujus kasmet. Seni įrenginiai tiesiog išmetami į šiukšliadėžę. Prie kompiuterio darbo vieta nereguliuojama." },
];

const children = [
  // ── Header ──
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 40 },
    children: [new TextRun({ text: "UŽDUOTIES LAPAS", font: "Arial", size: 18, color: GREY,
      allCaps: true, characterSpacing: 60 })] }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 60 },
    children: [new TextRun({ text: "Saugos scenarijų analizė", font: "Arial", size: 36, bold: true, color: NAVY })] }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 80 },
    children: [new TextRun({ text: "9 klasė  \u2022  Sauga  \u2022  I pamoka", font: "Arial", size: 20, color: GREY })] }),
  rule(NAVY, 6),

  // ── Ką padarysite ──
  H2("Ką padarysite"),
  P("Analizuosite šešis saugaus elgesio scenarijus, apimančius visas keturias modulio temas: ergonomiką, privatumą, internetines rizikas ir aplinkos poveikį. Kiekvienoje situacijoje identifikuosite problemą, nurodysite tinkamą taisyklę ir pasiūlysite konkretų veiksmą. Atsakymus pateiksite žodžiu."),

  // ── Reikalavimai ──
  H2("Reikalavimai"),
  P("Kiekvieno scenarijaus analizė turi atitikti tris žingsnius:"),
  new Paragraph({ numbering: { reference: "num", level: 0 },
    spacing: { after: 60, line: 276 },
    children: [B("Problema: "), R("kas šioje situacijoje neteisinga ar rizikinga?")] }),
  new Paragraph({ numbering: { reference: "num", level: 0 },
    spacing: { after: 60, line: 276 },
    children: [B("Taisyklė: "), R("koks saugos principas ar taisyklė tinka šiai situacijai?")] }),
  new Paragraph({ numbering: { reference: "num", level: 0 },
    spacing: { after: 120, line: 276 },
    children: [B("Veiksmas: "), R("ką konkrečiai turėtų daryti žmogus šioje situacijoje?")] }),

  svarbuBox([
    new Paragraph({ spacing: { after: 0 },
      children: [R("Atsakymas \u201Ereikia būti atsargesniam\u201C nėra konkretus veiksmas. Nurodykite, ką tiksliai žmogus turėtų padaryti: kokį veiksmą atlikti, ką pakeisti, į ką kreiptis.")] }),
  ]),

  // ── Darbo eiga ──
  H2("Darbo eiga"),

  // 1 DALIS
  H3("1 DALIS: Vienos srities scenarijai"),
  P("Kiekvienas scenarijus aprašo situaciją, susijusią su viena saugos sritimi. Perskaitykite scenarijų, pagalvokite individualiai ir atsakykite pagal trijų žingsnių struktūrą: problema, taisyklė, veiksmas."),

  scenarioBox(scenarios[0].n, scenarios[0].area, scenarios[0].text),
  P([], { spacing: { after: 80 } }),
  scenarioBox(scenarios[1].n, scenarios[1].area, scenarios[1].text),
  P([], { spacing: { after: 80 } }),
  scenarioBox(scenarios[2].n, scenarios[2].area, scenarios[2].text),
  P([], { spacing: { after: 80 } }),
  scenarioBox(scenarios[3].n, scenarios[3].area, scenarios[3].text),

  // 2 DALIS
  H3("2 DALIS: Kelių sričių scenarijai"),
  P("Šiuose scenarijuose gali būti pažeistos kelios saugos sritys vienu metu. Identifikuokite visas susijusias sritis ir kiekvienai pritaikykite analizės struktūrą."),

  scenarioBox(scenarios[4].n, scenarios[4].area, scenarios[4].text),
  P([], { spacing: { after: 80 } }),
  scenarioBox(scenarios[5].n, scenarios[5].area, scenarios[5].text),

  // 3 DALIS
  H3("3 DALIS: Apibendrinamasis scenarijus"),
  P("Grįžkite prie scenarijaus, kuris jums buvo sudėtingiausias. Dar kartą atsakykite pagal trijų žingsnių struktūrą ir patikrinkite, ar jūsų atsakymas tikrai konkretus."),

  // ── Patikrinkite save ──
  H2("Patikrinkite save"),
  checkItem("Ar kiekvienam scenarijui identifikavau konkrečią problemą?"),
  checkItem("Ar nurodžiau taisyklę ar principą, kuris tinka situacijai?"),
  checkItem("Ar pasiūliau konkretų veiksmą, ne tik bendrą patarimą?"),
  checkItem("Ar 5 ir 6 scenarijuose atpažinau visas susijusias saugos sritis?"),
  checkItem("Ar galiu paaiškinti, kodėl pasirinkau būtent šią taisyklę?", true),

  // ── Papildoma užduotis ──
  H2("Papildoma užduotis"),
  P("Pasirinkite du scenarijus ir paaiškinkite, kokios būtų ilgalaikės pasekmės, jei žmogus nieko nekeistų savo elgesyje. Kiekvienam pagrindimui: 2\u20133 sakiniai."),
];

// ── Build document ──
const doc = new Document({
  numbering,
  styles: {
    default: { document: { run: { font: "Arial", size: 22 } } },
  },
  sections: [{
    properties: {
      page: {
        size: { width: PAGE_W, height: PAGE_H },
        margin: { top: M, right: M, bottom: M, left: M },
      },
    },
    footers: {
      default: new Footer({ children: [
        new Paragraph({ alignment: AlignmentType.CENTER,
          children: [new TextRun({ children: [PageNumber.CURRENT], font: "Arial", size: 18, color: GREY })] }),
      ] }),
    },
    children,
  }],
});

// ── Write ──
const outDir = path.resolve(__dirname,
  "../Grade_9/Semester_1/01_Safety/005_I - Scenario rotation task");
const outPath = path.join(outDir, "Student_Task.docx");

Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync(outPath, buf);
  console.log(`✓ Written: ${outPath} (${buf.length} bytes)`);
});
