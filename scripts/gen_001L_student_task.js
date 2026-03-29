const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, BorderStyle, ShadingType, AlignmentType,
  Footer, PageNumber
} = require("docx");
const fs = require("fs");

// ─── Colors ──────────────────────────────────────────────────────
const C = {
  NAVY: "1F4E79",
  BLUE: "2E75B6",
  BODY: "333333",
  GREY: "808080",
  BORDER: "BFBFBF",
  WHITE: "FFFFFF",
  STUCK_BG: "FFF2CC",
  STUCK_BORDER: "BF8F00",
  SVARBU_BG: "DEEAF6",
  SVARBU_BORDER: "2E75B6",
};

const PAGE_W = 11906;
const MARGIN = 1440;
const CONTENT_W = PAGE_W - 2 * MARGIN;

const NO_BORDER = { style: BorderStyle.NONE, size: 0, color: C.WHITE };
const noBorders = { top: NO_BORDER, bottom: NO_BORDER, left: NO_BORDER, right: NO_BORDER };

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

function h1(text, extra = {}) {
  return new Paragraph({
    spacing: { before: 360, after: 160 },
    keepNext: true, keepLines: true,
    ...extra,
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

function stepH(num, title) {
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
    children: [txt(`(Užuomina: ${text})`, { italics: true, size: 21, color: C.GREY })],
  });
}

function check(text) {
  return new Paragraph({
    spacing: { before: 120, after: 80 },
    indent: { left: 720 },
    children: [txt(`✓ ${text}`, { italics: true, size: 21, color: "2E7D32" })],
  });
}

function rule(color = C.NAVY) {
  return new Paragraph({
    spacing: { before: 80, after: 80 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color, space: 1 } },
    children: [],
  });
}

function infoBox(title, lines, bgColor, borderColor) {
  const leftBorder = { style: BorderStyle.SINGLE, size: 24, color: borderColor };
  const thinBorder = { style: BorderStyle.SINGLE, size: 1, color: C.BORDER };
  return new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    columnWidths: [CONTENT_W],
    rows: [new TableRow({
      cantSplit: true,
      children: [new TableCell({
        shading: { type: ShadingType.CLEAR, fill: bgColor },
        borders: { left: leftBorder, top: thinBorder, bottom: thinBorder, right: thinBorder },
        margins: { top: 120, bottom: 120, left: 120, right: 120 },
        width: { size: CONTENT_W, type: WidthType.DXA },
        children: [
          new Paragraph({
            spacing: { after: 60 },
            children: [txt(title, { bold: true, color: borderColor })],
          }),
          ...lines.map(l => new Paragraph({
            spacing: { after: 40 },
            children: [txt(l, { size: 20 })],
          })),
        ],
      })],
    })],
  });
}

function stuckBox(lines) {
  return infoBox("ĮSTRIGOTE?", lines, C.STUCK_BG, C.STUCK_BORDER);
}

function svarbuBox(lines) {
  return infoBox("SVARBU", lines, C.SVARBU_BG, C.SVARBU_BORDER);
}

function checklist(item, isLast = false) {
  return new Paragraph({
    spacing: { after: 60 },
    indent: { left: 360 },
    keepNext: !isLast,
    keepLines: true,
    children: [txt(`☐ ${item}`)],
  });
}

// ─── CONTENT ─────────────────────────────────────────────────────
const sections = [];

// HEADER
sections.push(
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 40 },
    children: [txt("UŽDUOTIES LAPAS", { size: 18, color: C.GREY, allCaps: true })],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 40 },
    children: [txt("Ergonomikos užduotis", { bold: true, size: 36, color: C.NAVY })],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 80 },
    children: [txt("9 klasė  \u2022  Sauga  \u2022  L pamoka", { size: 20, color: C.GREY })],
  }),
  rule(C.NAVY),
);

// KĄ PADARYSITE
sections.push(
  h2("Ką padarysite"),
  body([txt("Sureguliuosite savo darbo vietą pagal ergonomikos principus ir atliksite nuovargį šalinančius pratimus. Kiekviename žingsnyje patikrinsite vieną principą ir, jei reikia, pakoreguosite savo padėtį.")]),
);

// REIKALAVIMAI
sections.push(
  h2("Reikalavimai"),
  body([txt("1. Sėdėjimo poza sureguliuota pagal taisykles (pėdos, nugara, pečiai, galva).")]),
  body([txt("2. Ekrano padėtis patikrinta ir pakoreguota (aukštis ir atstumas).")]),
  body([txt("3. Rankų ir riešų padėtis patikrinta (alkūnės, riešai).")]),
  body([txt("4. Atliktas 20-20-20 pratimas.")]),
  body([txt("5. Atlikti trys nuovargį šalinantys pratimai (akių, rankų, nugaros).")]),
);

// DARBO EIGA
sections.push(h2("Darbo eiga"));

// Step 1
sections.push(
  stepH(1, "Patikrinkite sėdėjimo pozą"),
  body([txt("Sėdėkite ant kėdės taip:")]),
  body([txt("\u2022 Abi pėdos turi remtis į grindis. Jei pėdos nesiekia grindų, pakelkite kėdę žemiau arba padėkite po kojomis ką nors tvirtą (pvz., kuprinę).")]),
  body([txt("\u2022 Nugara turi būti tiesi ir atremta į kėdės atlošą. Jei atloše nesiremiate, paslinkite kėdę arčiau stalo.")]),
  body([txt("\u2022 Pečiai atpalaiduoti, nuleidžiami žemyn (ne pakelti prie ausų).")]),
  body([txt("\u2022 Galva tiesi, žiūrite tiesiai į priekį (ne žemyn, ne į šoną).")]),
  hint("Sukryžiuotos kojos atrodo patogiai, bet ilgainiui kenkia stuburui. Laikykite abi pėdas ant grindų."),
  check("Dabar turėtumėte sėdėti: pėdos ant grindų, nugara atremta, pečiai žemyn, galva tiesi."),
);

// Step 2
sections.push(
  stepH(2, "Patikrinkite ekrano padėtį"),
  body([txt("Pažiūrėkite į savo kompiuterio ekraną:")]),
  body([txt("\u2022 Ekrano viršutinis kraštas turi būti maždaug jūsų akių lygyje. Jei ekranas per žemai, jūs lenkiate galvą žemyn ir varginate kaklą.")]),
  body([txt("\u2022 Patikrinkite atstumą: ištiesinkite ranką į priekį. Jei pirštų galai liečia ekraną, atstumas yra tinkamas (apie 50\u201370 cm).")]),
  body([txt("\u2022 Ekranas turi būti tiesiai priešais jus, ne šone. Jei ekranas šone, jūs sukate kaklą.")]),
  check("Dabar turėtumėte matyti: ekrano viršus akių lygyje, atstumas ištiestos rankos, ekranas tiesiai priešais."),

  stuckBox([
    "Jei nešiojamas kompiuteris per žemai ir negalite jo pakelti:",
    "\u2022 Padėkite po kompiuteriu kelias knygas, kad ekranas būtų aukščiau.",
    "\u2022 Jei naudojate nešiojamą kompiuterį, ekrano aukštis dažnai per žemas. Tai normalu, bet namuose verta pagalvoti apie atskirą klaviatūrą ar stovą.",
  ]),
);

// Step 3
sections.push(
  stepH(3, "Patikrinkite rankų padėtį"),
  body([txt("Padėkite rankas ant klaviatūros ir patikrinkite:")]),
  body([txt("\u2022 Alkūnės turi būti sulenktos maždaug 90 laipsnių kampu (sudarykite tiesų kampą). Jei alkūnės per žemai, kėdė per žema. Jei per aukštai, kėdė per aukšta.")]),
  body([txt("\u2022 Riešai turi būti tiesūs. Jie neturi būti atlošti aukštyn arba nulenkti žemyn.")]),
  body([txt("\u2022 Pečiai turi būti atpalaiduoti, ne pakelti.")]),
  body([txt("\u2022 Pelė (jei naudojate) turi būti šalia klaviatūros, ne toli nuo kūno.")]),
  hint("Pažiūrėkite į savo riešus dabar. Ar jie tiesūs? Jei ne, pakoreguokite rankų padėtį arba kėdės aukštį."),
  check("Dabar turėtumėte jausti: alkūnės 90\u00B0 kampu, riešai tiesūs, pečiai atpalaiduoti."),
);

// Step 4
sections.push(
  stepH(4, "Atlikite 20-20-20 pratimą"),
  body([txt("Dabar atliksite 20-20-20 pratimą:")]),
  body([txt("1. Pažiūrėkite pro langą arba į tolimiausią klasės tašką (bent 6 metrai nuo jūsų).")]),
  body([txt("2. Žiūrėkite į tą tašką 20 sekundžių. Galite skaičiuoti mintyse arba mokytojas laikys laiką.")]),
  body([txt("3. Po 20 sekundžių grįžkite žvilgsniu prie ekrano.")]),
  hint("Ši taisyklė veikia, nes žiūrint arti akių raumenys įsitempia. Žiūrint toliau nei 6 metrų, jie visiškai atsipalaiduoja."),
  check("Dabar turėtumėte jausti: akys šiek tiek pailsėjusios po 20 sekundžių žiūrėjimo į tolį."),
);

// Step 5
sections.push(
  stepH(5, "Atlikite tris pratimus"),
  body([txt("Atlikite visus tris pratimus po vieną:")]),
  body([
    txt("Akių pratimas: ", { bold: true }),
    txt("užsimerkite 5 sekundėms. Tada atidarykite akis ir pažiūrėkite į tolimą tašką. Pakartokite 2 kartus."),
  ]),
  body([
    txt("Rankų pratimas: ", { bold: true }),
    txt("sukite riešus ratu (5 ratai į vieną pusę, 5 į kitą). Tada atgniaužkite ir sugniaužkite kumščius 5 kartus."),
  ]),
  body([
    txt("Nugaros pratimas: ", { bold: true }),
    txt("atsistokite nuo kėdės. Pakelkite rankas virš galvos ir pasitempkite aukštyn. Lėtai nuleiskite rankas žemyn. Pakartokite 3 kartus."),
  ]),
  check("Dabar turėtumėte jausti: akys pailsėjusios, riešai atpalaidavę, nugara prasitempusi."),

  svarbuBox([
    "Šiuos pratimus galite atlikti bet kada: per pamoką, namuose prie kompiuterio, ar per pertrauką. Jie trunka tik 1\u20132 minutes.",
  ]),
);

// PATIKRINKITE SAVE
sections.push(
  h2("Patikrinkite save"),
  checklist("Ar mano pėdos remiasi į grindis (ne sukryžiuotos, ne kabančios)?"),
  checklist("Ar mano nugara tiesi ir atremta į atlošą?"),
  checklist("Ar ekrano viršus yra maždaug mano akių lygyje?"),
  checklist("Ar atstumas iki ekrano yra ištiestos rankos ilgis (50\u201370 cm)?"),
  checklist("Ar mano riešai tiesūs prie klaviatūros?"),
  checklist("Ar atlikau 20-20-20 pratimą?"),
  checklist("Ar atlikau visus tris pratimus (akių, rankų, nugaros)?", true),
);

// ─── Build ───────────────────────────────────────────────────────
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

const outDir = "Grade_9/Semester_1/01_Safety/001_L - Ergonomics & healthy computer use";
Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync(`${outDir}/Student_Task.docx`, buf);
  console.log("✓ Student_Task.docx generated");
});
