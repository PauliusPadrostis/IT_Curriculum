import { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, LevelFormat, BorderStyle,
  WidthType, ShadingType, PageNumber, PageBreak } from "docx";
import fs from "fs";

// ── Design tokens ──
const NAVY = "1F4E79";
const BLUE = "2E75B6";
const BODY = "333333";
const GREY = "808080";
const GREEN = "548235";
const PAGE_W = 11906;
const PAGE_H = 16838;
const M = 1440;
const CW = PAGE_W - 2 * M; // 9026 DXA content width

const noB = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
const thinB = { style: BorderStyle.SINGLE, size: 1, color: "BFBFBF" };
const thinBorders = { top: thinB, bottom: thinB, left: thinB, right: thinB };

// ── Reusable builders ──
const R = (text, o = {}) => new TextRun({ text, font: "Arial", size: 22, color: BODY, ...o });
const B = (text, o = {}) => R(text, { bold: true, ...o });

const P = (runs, o = {}) => new Paragraph({
  spacing: { after: 120, line: 276 }, ...o,
  children: (Array.isArray(runs) ? runs : [runs]).map(r => typeof r === "string" ? R(r) : r),
});

const H1 = t => new Paragraph({ spacing: { before: 360, after: 200 },
  children: [new TextRun({ text: t, font: "Arial", size: 32, bold: true, color: NAVY })] });

const H2 = t => new Paragraph({ spacing: { before: 280, after: 160 },
  children: [new TextRun({ text: t, font: "Arial", size: 26, bold: true, color: NAVY })] });

const H3 = t => new Paragraph({ spacing: { before: 200, after: 120 },
  children: [new TextRun({ text: t, font: "Arial", size: 23, bold: true, color: BLUE })] });

const empty = () => P([], { spacing: { after: 60 } });

const rule = (color, size) => new Paragraph({
  spacing: { after: 200 },
  border: { bottom: { style: BorderStyle.SINGLE, size, color, space: 1 } },
  children: [],
});

// Info box: single-cell table with left accent border
function box(label, text, bg, accent) {
  return new Table({
    width: { size: CW, type: WidthType.DXA }, columnWidths: [CW],
    rows: [new TableRow({ children: [new TableCell({
      width: { size: CW, type: WidthType.DXA },
      borders: { top: noB, bottom: noB, right: noB,
        left: { style: BorderStyle.SINGLE, size: 18, color: accent } },
      shading: { fill: bg, type: ShadingType.CLEAR },
      margins: { top: 100, bottom: 100, left: 160, right: 160 },
      children: [
        new Paragraph({ spacing: { after: 60 },
          children: [new TextRun({ text: label, font: "Arial", size: 20, bold: true, italics: true, color: accent })] }),
        new Paragraph({ spacing: { after: 0 },
          children: [new TextRun({ text, font: "Arial", size: 20, italics: true, color: accent })] }),
      ],
    })] })],
  });
}

const tip = t => box("Patarimas", t, "DEEAF6", BLUE);
const fun = t => box("Ar \u017einojai?", t, "E2EFDA", GREEN);

// Bullet / numbered helpers
const numbering = {
  config: [
    { reference: "bul", levels: [{ level: 0, format: LevelFormat.BULLET, text: "\u2022",
      alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
    { reference: "tips", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.",
      alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
    { reference: "qs", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.",
      alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
  ],
};

const bul = runs => new Paragraph({
  numbering: { reference: "bul", level: 0 }, spacing: { after: 60, line: 276 },
  children: (Array.isArray(runs) ? runs : [runs]).map(r => typeof r === "string" ? R(r) : r),
});

const num = (ref, runs) => new Paragraph({
  numbering: { reference: ref, level: 0 }, spacing: { after: 80, line: 276 },
  children: (Array.isArray(runs) ? runs : [runs]).map(r => typeof r === "string" ? R(r) : r),
});

// ── Term table ──
const terms = [
  { lt: "Ergonomika", en: "ergonomics",
    def: "Mokslas apie darbo vietos ir priemoni\u0173 pritaikym\u0105 \u017emogui, kad darbas b\u016bt\u0173 saugus ir patogus." },
  { lt: "Laikysena", en: "posture",
    def: "K\u016bno pad\u0117tis s\u0117dint, stovint ar judant \u2014 taisyklinga laikysena rei\u0161kia, kad stuburas i\u0161laiko nat\u016bralius linkius." },
  { lt: "Vaizduoklis", en: "monitor, display",
    def: "Kompiuterio ekranas, kuriame rodomas vaizdas." },
  { lt: "20-20-20 taisykl\u0117", en: "20-20-20 rule",
    def: "Aki\u0173 poilsio metodas: kas 20 minu\u010di\u0173 pa\u017evelgti 20 sekund\u017ei\u0173 \u012f objekt\u0105, esant\u012f bent 6 metr\u0173 atstumu." },
  { lt: "Skaitmeninis aki\u0173 nuovargis", en: "digital eye strain",
    def: "Aki\u0173 diskomfortas (sausumas, a\u0161arojimas, nery\u0161kus matymas), atsirandantis d\u0117l ilgo darbo su ekranais." },
  { lt: "Darbo ir poilsio re\u017eimas", en: "work-rest schedule",
    def: "Darbo ir pertrauk\u0173 kaitos tvarka, padedanti i\u0161vengti nuovargio." },
  { lt: "Higienos norma", en: "hygiene standard",
    def: "Teis\u0117s aktas, nustatantis sveikatos apsaugos reikalavimus darbo vietoje." },
];

const COL1 = 3200;
const COL2 = CW - COL1;

function termTableCell(children, w, header = false) {
  return new TableCell({
    width: { size: w, type: WidthType.DXA }, borders: thinBorders,
    shading: header ? { fill: NAVY, type: ShadingType.CLEAR } : undefined,
    margins: { top: 60, bottom: 60, left: 100, right: 100 },
    children: [new Paragraph({ spacing: { after: 0 },
      children: Array.isArray(children) ? children
        : [new TextRun({ text: children, font: "Arial", size: 22,
            color: header ? "FFFFFF" : BODY, bold: header })] })] });
}

const termTable = new Table({
  width: { size: CW, type: WidthType.DXA }, columnWidths: [COL1, COL2],
  rows: [
    new TableRow({ children: [
      termTableCell("S\u0105voka", COL1, true),
      termTableCell("Paai\u0161kinimas", COL2, true),
    ] }),
    ...terms.map(t => new TableRow({ children: [
      termTableCell([
        B(t.lt), R(` (angl. `, { color: GREY, size: 20 }),
        R(t.en, { italics: true, color: GREY, size: 20 }),
        R(")", { color: GREY, size: 20 }),
      ], COL1),
      termTableCell(t.def, COL2),
    ] })),
  ],
});

// ── Sources ──
const sources = [
  `Lietuvos higienos norma HN 32:2004 \u201eDarbas su videoterminalais. Saugos ir sveikatos reikalavimai.\u201c LR sveikatos apsaugos ministerija, 2004.`,
  `Sveikatos mokymo ir lig\u0173 prevencijos centras (SMLPC). \u201eAki\u0173 sveikatos apsauga: kaip technologijos veikia mokini\u0173 reg\u0117jim\u0105.\u201c smlpc.lt, 2024.`,
  `Var\u0117nos visuomen\u0117s sveikatos biuras. \u201eVaik\u0173 laikysena \u2014 rekomendacijos t\u0117vams ir pedagogams.\u201c varenosvsb.lt, 2023.`,
  `Klaip\u0117dos miesto visuomen\u0117s sveikatos biuras. \u201eMank\u0161ta dirbantiems su kompiuteriu.\u201c sveikatosbiuras.lt, 2023.`,
  `Palangos visuomen\u0117s sveikatos biuras. \u201ePertraukos ir mank\u0161ta dirbant kompiuteriu.\u201c palangosvsb.lt, 2023.`,
  `LRT. \u201eNetaisyklinga vaik\u0173 laikysena: nekreipiant d\u0117mesio, ateityje gali kilti rimt\u0173 sveikatos problem\u0173.\u201c lrt.lt, 2023.`,
];

// ══════════════════════════════════════════════════════════
//  DOCUMENT CONTENT
// ══════════════════════════════════════════════════════════
const children = [
  // ── Title block ──
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 40 },
    children: [new TextRun({ text: "TEORIJOS PAKETAS", font: "Arial", size: 18, color: GREY, allCaps: true })] }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 60 },
    children: [new TextRun({ text: "Ergonomika ir sveikas kompiuterio naudojimas", font: "Arial", size: 36, bold: true, color: NAVY })] }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 100 },
    children: [new TextRun({ text: "9 klas\u0117  \u2022  Sauga  \u2022  1 semestras", font: "Arial", size: 20, color: GREY })] }),
  rule(NAVY, 6),

  // ═══ \u012evadas ═══
  H1("\u012evadas"),
  P("Kiekvien\u0105 dien\u0105 prie kompiuterio ar telefono ekrano praleid\u017eiame po kelias valandas \u2014 mokykloje, namuose, laisvalaikiu. Da\u017enai net nepastebime, kaip susilenkiame prie ekrano, pakreipiame galv\u0105 ar per arti prisitraukiame klaviat\u016br\u0105. Atrodo \u2014 smulkmena. Ta\u010diau po keli\u0173 m\u0117nesi\u0173 tokio darbo gali prad\u0117ti skaud\u0117ti nugar\u0105, nuovargis apima akis, tirpsta rankos."),
  P("\u0160iame teorijos pakete su\u017einosite, kaip taisyklingai s\u0117d\u0117ti prie kompiuterio, kokiu atstumu turi b\u016bti ekranas, kaip teisingai pad\u0117ti rankas ir kojas, ir kod\u0117l pertraukos yra ne laiko gai\u0161imas, o b\u016btinyb\u0117. Taip pat i\u0161moksite kelis paprastus pratimus, kurie pad\u0117s jaustis geriau net ir po ilgesnio darbo kompiuteriu."),

  // ═══ Pagrindin\u0117s s\u0105vokos ═══
  H1("Pagrindin\u0117s s\u0105vokos"),
  termTable,
  empty(),

  // ═══ 1. Kod\u0117l ergonomika svarbi? ═══
  H1("1. Kod\u0117l ergonomika svarbi?"),
  P([R("\u017dodis \u201eergonomika\u201c kil\u0119s i\u0161 graik\u0173 kalbos: "),
    R("ergon", { italics: true }), R(" (darbas) + "),
    R("nomos", { italics: true }), R(" (d\u0117snis). Tai mokslas, tiriantis, kaip pritaikyti darbo viet\u0105 ir priemones \u017emogui \u2014 o ne atvirk\u0161\u010diai.")]),
  P("Kai s\u0117dime netaisyklingai, k\u016bnas kompensuoja: vieni raumenys pernelyg \u012fsitempia, kiti atsipalaiduoja. I\u0161 prad\u017ei\u0173 to nepastebime. Ta\u010diau po keli\u0173 m\u0117nesi\u0173 ar met\u0173 gali atsirasti nugaros skausmai, kaklo \u012ftampa, rank\u0173 tirpimas ar reg\u0117jimo problemos."),
  P([R("Lietuvoje galioja higienos norma "), B("HN 32:2004"),
    R(" \u201eDarbas su videoterminalais. Saugos ir sveikatos reikalavimai\u201c. Ji nustato, kaip turi b\u016bti \u012frengta darbo vieta su kompiuteriu: kokio dyd\u017eio turi b\u016bti stalas, koks atstumas iki ekrano, kaip da\u017enai reikia daryti pertraukas.")]),
  tip("HN 32:2004 nurodo, kad nepertraukiamai dirbti prie kompiuterio galima ne daugiau kaip valand\u0105. Moksleiviams rekomenduojama dar trumpiau \u2014 iki 45 minu\u010di\u0173."),
  empty(),

  // ═══ 2. Taisyklinga s\u0117d\u0117jimo laikysena ═══
  H1("2. Taisyklinga s\u0117d\u0117jimo laikysena"),
  P("Taisyklinga laikysena \u2014 tai tokia k\u016bno pad\u0117tis, kai stuburas i\u0161laiko nat\u016bralius linkius ir raumenys n\u0117ra pernelyg \u012ftempti. Prie kompiuterio taisyklingai s\u0117d\u0117ti rei\u0161kia:"),

  H3("Nugara ir liemuo"),
  bul("S\u0117d\u0117kite giliai k\u0117d\u0117je \u2014 u\u017eimkite vis\u0105 s\u0117dyn\u0117s plot\u0105."),
  bul("Nugar\u0105 atremkite \u012f k\u0117d\u0117s atlo\u0161\u0105. Kampas tarp atlo\u0161o ir s\u0117dyn\u0117s turi b\u016bti apie 100\u2013110\u00b0."),
  bul("Liemuo turi b\u016bti tiesus, nepasvir\u0119s \u012f priek\u012f ar \u0161onus."),

  H3("Kojos"),
  bul("P\u0117dos turi visi\u0161kai remtis \u012f grindis arba \u012f speciali\u0105 atramin\u0119 kojel\u0119."),
  bul("Keliai sulenkti ma\u017edaug 90\u00b0 kampu."),
  bul("\u0160launys lygiagre\u010dios grindims."),

  H3("Atstumas nuo stalo"),
  bul("Tarp k\u016bno ir stalo kra\u0161to turi likti ma\u017edaug kum\u0161\u010dio atstumas (3\u20134 cm)."),

  empty(),
  fun("Netaisyklinga laikysena \u2014 viena da\u017eniausi\u0173 paaugli\u0173 sveikatos problem\u0173. Specialistai pastebi, kad vis daugiau moksleivi\u0173 skund\u017eiasi nugaros skausmais d\u0117l ilgo s\u0117d\u0117jimo netaisyklingoje pozoje prie kompiuterio ar telefono."),
  empty(),

  // ═══ 3. Ekrano pad\u0117tis ir aki\u0173 apsauga ═══
  H1("3. Ekrano pad\u0117tis ir aki\u0173 apsauga"),

  H3("Ekrano atstumas ir kampas"),
  bul("Ekranas turi b\u016bti 45\u201375 cm atstumu nuo aki\u0173 (ma\u017edaug i\u0161tiestos rankos atstumu)."),
  bul("Ekrano vir\u0161utinis kra\u0161tas turi b\u016bti aki\u0173 lygyje arba \u0161iek tiek \u017eemiau."),
  bul("Ekranas turi b\u016bti \u0161iek tiek pakreiptas atgal (apie 10\u201320\u00b0), kad \u0161viesa neat\u0161vist\u0173."),

  H3("Ap\u0161vietimas"),
  bul("Ekranas neturi atspind\u0117ti lango ar lempos \u0161viesos."),
  bul("Ekrano ry\u0161kumas turi der\u0117ti prie aplinkos ap\u0161vietimo \u2014 nei per \u0161viesus, nei per tamsus."),

  H3("Aki\u0173 nuovargis"),
  P("Kai ilgai \u017ei\u016brime \u012f ekran\u0105, re\u010diau mirksime. Normaliai \u017emogus mirksi apie 15\u201320 kart\u0173 per minut\u0119, o dirbant kompiuteriu \u2014 tik 5\u20137 kartus. D\u0117l to akys i\u0161d\u017ei\u016bsta, pradeda grau\u017eti, matymas tampa nery\u0161kus. Tai vadinama skaitmeniniu aki\u0173 nuovargiu."),

  H3("20-20-20 taisykl\u0117"),
  P("Papras\u010diausias b\u016bdas apsaugoti akis \u2014 laikytis 20-20-20 taisykl\u0117s: kas 20 minu\u010di\u0173 padaryti 20 sekund\u017ei\u0173 pertrauk\u0105 ir pa\u017evelgti \u012f objekt\u0105, esant\u012f bent 6 metr\u0173 (apie 20 p\u0117d\u0173) atstumu. Taip aki\u0173 raumenys atsipalaiduoja."),

  tip("Tyrimai rodo, kad apie 80 % paaugli\u0173 patiria skaitmeninio aki\u0173 nuovargio simptomus. 20-20-20 taisykl\u0117 yra vienas papras\u010diausi\u0173 ir veiksmingiausi\u0173 b\u016bd\u0173 to i\u0161vengti."),
  empty(),

  // ═══ 4. Rank\u0173 pad\u0117tis ═══
  H1("4. Rank\u0173 pad\u0117tis"),
  P("Netaisyklinga rank\u0173 pad\u0117tis dirbant kompiuteriu gali sukelti rie\u0161\u0173 skausm\u0105 ir tirpim\u0105."),

  H3("Taisyklinga rank\u0173 pad\u0117tis"),
  bul("Alk\u016bn\u0117s sulenktos ma\u017edaug 90\u00b0 kampu."),
  bul("Dilbiai lygiagre\u010diai stalui arba \u0161iek tiek nuo\u017euln\u016bs \u017eemyn."),
  bul("Rie\u0161ai ties\u016bs \u2014 nesulenkti nei auk\u0161tyn, nei \u017eemyn."),
  bul("Pir\u0161tai laisvai ilsisi ant klaviat\u016bros, ne\u012ftempti."),

  H3("Pel\u0117"),
  bul("Pel\u0119 laikykite \u0161alia klaviat\u016bros, tame pa\u010diame auk\u0161tyje."),
  bul("Valdykite pel\u0119 visu dilbiu, ne tik rie\u0161u."),
  empty(),

  // ═══ 5. Nuovarg\u012f \u0161alinantys pratimai ═══
  new Paragraph({ children: [new PageBreak()] }),
  H1("5. Nuovarg\u012f \u0161alinantys pratimai"),
  P("Per pertraukas verta atlikti kelis paprastus pratimus. Jie padeda atsipalaiduoti raumenims, pagerina kraujotak\u0105 ir ma\u017eina \u012ftamp\u0105."),

  H3("Aki\u0173 pratimai"),
  bul([B("Mirks\u0117jimas: "), R("Greitai mirks\u0117kite 1\u20132 minutes \u2014 tai sudr\u0117kina akis.")]),
  bul([B("Fokusavimas: "), R("Pa\u017ei\u016br\u0117kite \u012f artim\u0105 objekt\u0105 (pvz., pie\u0161tuk\u0105 30 cm atstumu) 3\u20135 sek., tada \u012f tolim\u0105 objekt\u0105 per lang\u0105. Kartokite 10\u201312 kart\u0173.")]),
  bul([B("U\u017esimerkimas: "), R("Stipriai u\u017esimerkite, palaikykite 3\u20135 sek., atleiskite. Kartokite 6\u20138 kartus.")]),

  H3("Kaklo ir pe\u010di\u0173 pratimai"),
  bul([B("Galvos sukimai: "), R("L\u0117tai pasukite galv\u0105 \u012f vien\u0105 pus\u0119, palaikykite kelias sekundes, tada \u012f kit\u0105. Kartokite 10 kart\u0173.")]),
  bul([B("Pe\u010di\u0173 k\u0117limas: "), R("L\u0117tai pakelkite pe\u010dius auk\u0161tyn, palaikykite 3\u20135 sek., nuleiskite. Kartokite 10 kart\u0173.")]),

  H3("Rank\u0173 pratimai"),
  bul([B("Kum\u0161\u010dio gniau\u017eimas: "), R("I\u0161ties\u0119 rankas prie\u0161 save, l\u0117tai sugniau\u017ekite kum\u0161\u010dius, tada l\u0117tai atleiskite pir\u0161tus. Kartokite 10\u201320 kart\u0173.")]),
  bul([B("Rank\u0173 purtymas: "), R("Nuleiskite rankas ir laisvai jas papurtykite 5 sek. Kartokite 3 kartus.")]),

  H3("Nugaros pratimas"),
  bul([B("Atlo\u0161imas: "), R("Atsistokite, rankas pad\u0117kite ant juosmens ir l\u0117tai palinkite atgal, kol pajusite tempim\u0105. Palaikykite 3 sek. Kartokite 10 kart\u0173.")]),
  empty(),

  // ═══ 6. Darbo ir poilsio re\u017eimas ═══
  H1("6. Darbo ir poilsio re\u017eimas"),
  P("\u017dmogaus k\u016bnas n\u0117ra sukurtas ilgam s\u0117d\u0117jimui vienoje pad\u0117tyje. Net ir tobulai ergonomi\u0161koje darbo vietoje ilgas darbas be pertrauk\u0173 kenkia sveikatai."),

  H3("Pagrindin\u0117s taisykl\u0117s"),
  bul("Nepertraukiamai dirbti prie kompiuterio galima ne daugiau kaip 45\u201360 minu\u010di\u0173."),
  bul("Po tokio darbo b\u016btina padaryti 10\u201315 minu\u010di\u0173 pertrauk\u0105."),
  bul("Per pertrauk\u0105 reikia atsistoti, pajud\u0117ti, atlikti pratimus."),
  bul("Lietuvos higienos norma HN 32:2004 nurodo, kad darbdavys privalo u\u017etikrinti periodines pertraukas dirbant prie vaizduoklio."),

  H3("Kompiuteri\u0173 klas\u0117je"),
  bul("Pamoka trunka 40\u201345 min. \u2014 tai atitinka rekomenduojam\u0105 nepertraukiamo darbo trukm\u0119."),
  bul("Per pertrauk\u0105 tarp pamok\u0173 verta pakilti nuo k\u0117d\u0117s ir pa\u017ei\u016br\u0117ti pro lang\u0105 (priminti 20-20-20 taisykl\u0119)."),
  bul("Namuose dirbant prie kompiuterio ilgiau, b\u016btina s\u0105moningai planuoti pertraukas."),

  empty(),
  fun("Tyrimas, kuriame dalyvavo 642 moksleiviai iki 18 met\u0173, parod\u0117, kad 70 % j\u0173 kompiuteriais naudojosi bent dvi valandas per dien\u0105. Ma\u017edaug pus\u0117 skund\u0117si aki\u0173 nuovargiu, nery\u0161kiu matymu ir galvos skausmu."),
  empty(),

  // ═══ Praktiniai patarimai ═══
  H1("Praktiniai patarimai"),
  num("tips", [B("Patikrinkite savo k\u0117d\u0119: "), R("S\u0117d\u0117kite giliai, nugar\u0105 atremkite \u012f atlo\u0161\u0105. Jei kojos nesiekia grind\u0173 \u2014 naudokite pakoj\u012f.")]),
  num("tips", [B("Nustatykite ekrano auk\u0161t\u012f: "), R("Ekrano vir\u0161us turi b\u016bti aki\u0173 lygyje. Jei naudojate ne\u0161iojam\u0105j\u012f kompiuter\u012f \u2014 pad\u0117kite j\u012f ant knyg\u0173 arba naudokite i\u0161orin\u0119 klaviat\u016br\u0105.")]),
  num("tips", [B("Laikykitės 20-20-20 taisyklės: "), R("Galite nustatyti priminim\u0105 telefone kas 20 minu\u010di\u0173.")]),
  num("tips", [B("Darykite pertraukas kas valand\u0105: "), R("Per pertrauk\u0105 atsistokite, pasivaikš\u010diokite, pajudinkite rankas ir pe\u010dius.")]),
  num("tips", [B("Reguliuokite ekrano ry\u0161kum\u0105: "), R("Ekranas neturi atrodyti kaip \u0161viesos \u0161altinis \u2014 ry\u0161kumas turi der\u0117ti prie aplinkos.")]),
  num("tips", [B("Rankos \u2014 ne ant rie\u0161\u0173: "), R("Valdykite pel\u0119 visu dilbiu, rie\u0161ai turi b\u016bti ties\u016bs.")]),
  num("tips", [B("Paskatinkite vienas kit\u0105: "), R("Jei matote, kad klas\u0117s draugas s\u0117di susik\u016bprin\u0119s \u2014 priminkite jam, kad svarbu s\u0117d\u0117ti taisyklingai. Tai ne priekai\u0161tas, o pagalba.")]),
  empty(),

  // ═══ Pasitikrink save ═══
  H1("Pasitikrink save"),
  num("qs", [R("Kokie trys pagrindiniai ergonomikos principai taikomi dirbant kompiuteriu?")]),
  num("qs", [R("Kas yra 20-20-20 taisyklė ir kam ji skirta?")]),
  num("qs", [R("Paai\u0161kinkite, kod\u0117l svarbu, kad p\u0117dos remt\u0173si \u012f grindis s\u0117dint prie kompiuterio.")]),
  num("qs", [R("Kod\u0117l dirbant kompiuteriu re\u010diau mirksime ir kaip tai veikia akis?")]),
  num("qs", [R("J\u016bs\u0173 draugas skund\u017eiasi, kad po pamok\u0173 namuose dirbant prie kompiuterio jam skauda kakl\u0105 ir tirpsta rankos. Kokius patarimus jam duotum\u0117te?")]),
  num("qs", [R("Mokykloje jums leido pasirinkti k\u0117d\u0119 ir stal\u0105 kompiuteri\u0173 klasei. Kokie trys svarbiausi dalykai, \u012f kuriuos atsi\u017evelgtum\u0117te?")]),
  num("qs", [R("\u012evertinkite savo darbo viet\u0105 namuose pagal \u0161iame pakete pateiktus ergonomikos principus. K\u0105 darote teisingai? K\u0105 reik\u0117t\u0173 pakeisti?")]),
  num("qs", [R("J\u016bs\u0173 mokykla nori sukurti plakat\u0105 kompiuteri\u0173 klasei apie taisykling\u0105 s\u0117d\u0117jim\u0105. Pasi\u016blykite 5 pagrindinius punktus, kurie tur\u0117t\u0173 b\u016bti tame plakate, ir paai\u0161kinkite kod\u0117l.")]),
  empty(),

  // ═══ Su\u017einok daugiau ═══
  H1("Su\u017einok daugiau"),
  P("Jei nori giliau suprasti \u0161i\u0105 tem\u0105:"),
  bul([B("Cirkadiniai ritmai ir m\u0117lyna \u0161viesa: "), R("jei domiesi, kaip ekran\u0173 \u0161viesa veikia mieg\u0105, paie\u0161kokite informacijos apie cirkadinius ritmus ir melatonin\u0105. Tai ai\u0161kina, kod\u0117l prie\u0161 mieg\u0105 rekomenduojama ma\u017einti ekrano laik\u0105.")]),
  bul([B("HN 32:2004 visas tekstas: "), R("Lietuvos higienos normos original\u0105 galite rasti e-seimas.lrs.lt \u2014 paie\u0161koje \u012fveskite \u201eHN 32:2004\u201c.")]),
  bul([B("20-20-20 priminimo \u012frankis: "), R("Nemokama programa \u201eTwenty\u201c (Microsoft Store) kas 20 minu\u010di\u0173 primena padaryti pertrauk\u0105 akims.")]),
  bul([B("Interaktyvi laikysenos pamoka (angl\u0173 k.): "), R("Cornell University ergonomikos laboratorija turi nemokam\u0173 interaktyvi\u0173 priemoni\u0173 \u2014 ie\u0161kokite \u201eCornell ergonomics\u201c.")]),
  empty(),

  // ═══ \u0160altiniai ═══
  rule(GREY, 4),
  new Paragraph({ spacing: { after: 60 },
    children: [new TextRun({ text: "\u0160altiniai", font: "Arial", size: 18, italics: true, color: GREY })] }),
  ...sources.map(s => new Paragraph({ spacing: { after: 40 },
    children: [new TextRun({ text: s, font: "Arial", size: 18, italics: true, color: GREY })] })),
];

// ══════════════════════════════════════════════════════════
//  BUILD & WRITE
// ══════════════════════════════════════════════════════════
const doc = new Document({
  numbering,
  sections: [{
    properties: {
      page: {
        size: { width: PAGE_W, height: PAGE_H },
        margin: { top: M, right: M, bottom: M, left: M },
      },
    },
    headers: {
      default: new Header({ children: [new Paragraph({
        alignment: AlignmentType.RIGHT,
        children: [new TextRun({ text: "Teorijos paketas \u2022 Ergonomika ir sveikas kompiuterio naudojimas",
          font: "Arial", size: 16, color: GREY, italics: true })],
      })] }),
    },
    footers: {
      default: new Footer({ children: [new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({ text: "Puslapis ", font: "Arial", size: 16, color: GREY }),
          new TextRun({ children: [PageNumber.CURRENT], font: "Arial", size: 16, color: GREY }),
        ],
      })] }),
    },
    children,
  }],
});

const outPath = "Grade_9/Semester_1/01_Safety/001_L - Ergonomics & healthy computer use/001_L_Ergonomika_Theory_Pack.docx";
const buf = await Packer.toBuffer(doc);
fs.writeFileSync(outPath, buf);
console.log(`OK: ${outPath} (${buf.length} bytes)`);
