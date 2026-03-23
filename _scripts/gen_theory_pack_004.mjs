// Theory Pack 004: Skaitmeninių technologijų poveikis aplinkai
// ALL Lithuanian text written in plain UTF-8 — no \u escapes
import { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, LevelFormat, BorderStyle,
  WidthType, ShadingType, PageNumber, PageBreak } from "docx";
import fs from "fs";

// ── Design tokens ──
const NAVY = "1F4E79", BLUE = "2E75B6", BODY = "333333",
      GREY = "808080", GREEN = "548235";
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
// keepNext: true prevents the heading from being orphaned at page bottom
const H1 = t => new Paragraph({ keepNext: true, keepLines: true,
  spacing: { before: 360, after: 200 },
  children: [new TextRun({ text: t, font: "Arial", size: 32, bold: true, color: NAVY })] });
const H3 = t => new Paragraph({ keepNext: true, keepLines: true,
  spacing: { before: 200, after: 120 },
  children: [new TextRun({ text: t, font: "Arial", size: 23, bold: true, color: BLUE })] });
const empty = () => P([], { spacing: { after: 60 } });
const rule = (c, s) => new Paragraph({ spacing: { after: 200 },
  border: { bottom: { style: BorderStyle.SINGLE, size: s, color: c, space: 1 } }, children: [] });

function box(label, text, bg, accent) {
  return new Table({ width: { size: CW, type: WidthType.DXA }, columnWidths: [CW],
    rows: [new TableRow({ cantSplit: true, children: [new TableCell({
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
const fun = t => box("Ar žinojai?", t, "E2EFDA", GREEN);

const numbering = { config: [
  { reference: "bul", levels: [{ level: 0, format: LevelFormat.BULLET, text: "\u2022",
    alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
  { reference: "tips", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.",
    alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
  { reference: "qs", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.",
    alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
]};
const bul = runs => new Paragraph({ numbering: { reference: "bul", level: 0 },
  spacing: { after: 60, line: 276 },
  children: (Array.isArray(runs) ? runs : [runs]).map(r => typeof r === "string" ? R(r) : r) });
const num = (ref, runs) => new Paragraph({ numbering: { reference: ref, level: 0 },
  spacing: { after: 80, line: 276 },
  children: (Array.isArray(runs) ? runs : [runs]).map(r => typeof r === "string" ? R(r) : r) });

// ── Term table ──
const terms = [
  { lt: "Skaitmeninis pėdsakas", en: "digital footprint",
    def: "Visuma aplinkos poveikių, kuriuos sukelia asmens ar organizacijos skaitmeninė veikla: energijos suvartojimas, emisijos, atliekos." },
  { lt: "Duomenų centras", en: "data center",
    def: "Pastatas su tūkstančiais serverių, kuriuose saugomi ir apdorojami interneto duomenys. Reikalauja daug elektros ir aušinimo." },
  { lt: "Elektroninės atliekos (e-atliekos)", en: "e-waste",
    def: "Pasenę ar sugedę elektroniniai įrenginiai: kompiuteriai, telefonai, planšetės. Dažnai turi pavojingų medžiagų." },
  { lt: "Debesų kompiuterija", en: "cloud computing",
    def: "Duomenų saugojimas ir apdorojimas nutolusiuose serveriuose, pasiekiamuose per internetą, o ne vietiniame kompiuteryje." },
  { lt: "Anglies dioksido emisijos", en: "carbon emissions",
    def: "Šiltnamio efektą sukeliančių dujų (CO₂) kiekis, išmetamas dėl energijos gamybos ir vartojimo." },
  { lt: "Aplinkos monitoringas", en: "environmental monitoring",
    def: "Nuolatinis aplinkos būklės stebėjimas naudojant jutiklius, palydovus ir duomenų analizės sistemas." },
  { lt: "Žiedinė ekonomika", en: "circular economy",
    def: "Ekonomikos modelis, kuriame produktai naudojami kuo ilgiau, taisomi, perdirbami, o atliekų kiekis mažinamas." },
];

const COL1 = 3200, COL2 = CW - COL1;
function tc(children, w, hdr = false) {
  return new TableCell({ width: { size: w, type: WidthType.DXA }, borders: thinBorders,
    shading: hdr ? { fill: NAVY, type: ShadingType.CLEAR } : undefined,
    margins: { top: 60, bottom: 60, left: 100, right: 100 },
    children: [new Paragraph({ spacing: { after: 0 },
      children: Array.isArray(children) ? children
        : [new TextRun({ text: children, font: "Arial", size: 22, color: hdr ? "FFFFFF" : BODY, bold: hdr })] })] });
}
const termTable = new Table({ width: { size: CW, type: WidthType.DXA }, columnWidths: [COL1, COL2],
  rows: [
    new TableRow({ children: [tc("Sąvoka", COL1, true), tc("Paaiškinimas", COL2, true)] }),
    ...terms.map(t => new TableRow({ cantSplit: true, children: [
      tc([B(t.lt), R(` (angl. `, { color: GREY, size: 20 }), R(t.en, { italics: true, color: GREY, size: 20 }), R(")", { color: GREY, size: 20 })], COL1),
      tc(t.def, COL2),
    ] })),
  ],
});

// ── Sources ──
const sources = [
  `Atliekos.lt. \u201EElektroninės atliekos — ką svarbu žinoti.\u201c atliekos.lt, 2024.`,
  `IEA. \u201EData Centres and Data Transmission Networks.\u201c iea.org, 2024.`,
  `European Commission. \u201EEnergy-efficient cloud computing technologies and policies.\u201c energy.ec.europa.eu, 2024.`,
  `Mes rūšiuojam. \u201EElektroninių atliekų tvarkymas Lietuvoje.\u201c mesrusiuojam.lt, 2023.`,
  `Technologijos.lt. \u201ESkaitmeninės technologijos ir aplinkosauga.\u201c technologijos.lt, 2024.`,
  `VLE. \u201EŽiedinė ekonomika.\u201c vle.lt, 2024.`,
];

// ══════════════════════════════════════════════════════════
//  DOCUMENT CONTENT — plain UTF-8 Lithuanian
// ══════════════════════════════════════════════════════════
const children = [
  // Title
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 40 },
    children: [new TextRun({ text: "TEORIJOS PAKETAS", font: "Arial", size: 18, color: GREY, allCaps: true })] }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 60 },
    children: [new TextRun({ text: "Skaitmeninių technologijų poveikis aplinkai", font: "Arial", size: 36, bold: true, color: NAVY })] }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 100 },
    children: [new TextRun({ text: "9 klasė  •  Sauga  •  1 semestras", font: "Arial", size: 20, color: GREY })] }),
  rule(NAVY, 6),

  // ═══ Įvadas ═══
  H1("Įvadas"),
  P("Kai saugome nuotraukas \u201Edebesyje\u201c, žiūrime vaizdo įrašus ar siunčiame el. laiškus, atrodo, kad visa tai vyksta nematomoje erdvėje. Tačiau \u201Edebesis\u201c — tai tūkstančiai fizinių serverių, kurie veikia visą parą, naudoja elektros energiją ir skleidžia šilumą. Kiekvienas mūsų paspaudimas internete turi realų poveikį aplinkai."),
  P("Šiame teorijos pakete sužinosite, kaip skaitmeninės technologijos veikia aplinką — kiek energijos suvartoja duomenų centrai, kodėl elektroninės atliekos yra pavojingos ir kaip kasdienis skaitmeninis elgesys susijęs su anglies dioksido emisijomis. Taip pat sužinosite kitą pusę — kaip tos pačios technologijos padeda stebėti ir saugoti gamtą."),

  // ═══ Pagrindinės sąvokos ═══
  H1("Pagrindinės sąvokos"),
  termTable,
  empty(),

  // ═══ 1. Energijos suvartojimas ═══
  H1("1. Energijos suvartojimas"),
  P("Internetas veikia dėl milžiniškos fizinės infrastruktūros: povandeninių kabelių, ryšio bokštų ir duomenų centrų. Visa tai reikalauja elektros — ir tai labai daug elektros."),

  H3("Duomenų centrai"),
  P("Duomenų centras — tai pastatas, kuriame stovi tūkstančiai serverių. Jie saugo svetainių turinį, el. laiškus, nuotraukas, vaizdo įrašus — viską, ką matome internete. Serveriai veikia visą parą ir juos reikia nuolat aušinti, nes jie skleidžia daug šilumos."),
  P("Pagal Tarptautinės energetikos agentūros (IEA) duomenis, duomenų centrai Europos Sąjungoje 2024 m. suvartojo apie 70 TWh elektros energijos. Tai maždaug tiek, kiek per metus suvartoja visa Belgija."),

  H3("Ne visi veiksmai vienodi"),
  P("Skirtingi skaitmeniniai veiksmai suvartoja labai skirtingą kiekį energijos:"),
  bul([B("Vaizdo transliacija (streaming): "), R("suvartoja daugiausiai, nes duomenys perduodami nuolat ir dideliu srautu.")]),
  bul([B("Vaizdo skambutis: "), R("taip pat reikalauja daug duomenų, ypač jei naudojama HD kokybė.")]),
  bul([B("El. laiškas su priedu: "), R("vidutinis energijos kiekis, nes failas saugomas serveryje ir perduodamas tinklu.")]),
  bul([B("Tekstinė žinutė: "), R("mažiausiai energijos, nes perduodamų duomenų kiekis labai mažas.")]),

  tip("Vienas el. laiškas su priedu generuoja apie 50 g CO₂. Tai atrodo mažai, bet pasaulyje per dieną išsiunčiama apie 300 mlrd. el. laiškų."),
  empty(),

  H3("Saugojimas irgi kainuoja"),
  P("Kiekvienas failas, nuotrauka ar senas el. laiškas, saugomas debesyje, užima vietą serveryje. Serveris naudoja elektros energiją net tada, kai jūs to failo nežiūrite. Kuo daugiau duomenų saugome, tuo daugiau serverių reikia, tuo daugiau energijos suvartojama."),
  empty(),

  // ═══ 2. Elektroninės atliekos ═══
  H1("2. Elektroninės atliekos"),
  P("Elektroninės atliekos (e-atliekos) — tai pasenę, sugedę arba nebenaudojami elektroniniai įrenginiai: kompiuteriai, telefonai, planšetės, ausinės, laidai. Jos yra sparčiausiai augantis atliekų srautas pasaulyje."),

  H3("Kodėl e-atliekos pavojingos?"),
  P("Elektroniniai įrenginiai turi pavojingų medžiagų:"),
  bul([B("Švinas: "), R("randamas lituose ir akumuliatoriuose. Kenkia nervų sistemai.")]),
  bul([B("Gyvsidabris: "), R("naudojamas ekranų apšvietime. Nuodingas žmogui ir gyvūnams.")]),
  bul([B("Kadmis: "), R("randamas baterijose. Kaupiasi dirvožemyje ir vandenyje.")]),
  P("Kai e-atliekos išmetamos netinkamai — į buitines šiukšles ar sąvartyną — šios medžiagos patenka į dirvą ir požeminius vandenis."),

  H3("E-atliekos skaičiais"),
  bul("Lietuvoje vienam gyventojui per metus tenka apie 9 kg elektroninių atliekų."),
  bul("Europos Sąjunga reikalauja surinkti ne mažiau kaip 4 kg e-atliekų vienam gyventojui."),
  bul("Pasaulyje tik 17,4 % elektroninių atliekų yra tinkamai perdirbama."),
  P("Likę įrenginiai dažnai keliauja į sąvartynus arba yra neteisėtai eksportuojami į besivystančias šalis, kur jie ardomi nesaugiomis sąlygomis."),

  fun("Lietuvoje vienam gyventojui per metus tenka apie 9 kg elektroninių atliekų. ES reikalauja surinkti ne mažiau kaip 4 kg."),
  empty(),

  H3("Tinkamas e-atliekų tvarkymas"),
  P("Elektroniniai įrenginiai neturėtų patekti į buitinių atliekų konteinerį. Juos galima:"),
  bul("Atiduoti į specializuotą surinkimo punktą (informacija: atliekos.lt)."),
  bul("Grąžinti pardavėjui — pagal ES taisykles, parduotuvė privalo priimti seną įrenginį perkant naują."),
  bul("Atiduoti perdirbimui per savivaldybės organizuojamas akcijas."),
  empty(),

  // ═══ 3. Kaip ST padeda aplinkai ═══
  H1("3. Kaip ST padeda aplinkai"),
  P("Skaitmeninės technologijos ne tik veikia aplinką — jos taip pat padeda ją saugoti. Jutikliai, palydovai ir duomenų analizės sistemos leidžia stebėti aplinkos būklę ir priimti pagrįstus sprendimus."),

  H3("Aplinkos monitoringas"),
  P("Jutikliai, išdėstyti mieste ar gamtoje, gali matuoti oro kokybę, vandens užterštumą, triukšmo lygį ir kitus rodiklius. Šie duomenys perduodami į duomenų centrus, kur jie analizuojami ir vaizduojami interaktyviuose žemėlapiuose."),
  bul([B("Oro kokybės programėlės: "), R("rodo realaus laiko oro taršos duomenis jūsų mieste (pvz., Airly, BreezoMeter).")]),
  bul([B("Palydovinis miškų stebėjimas: "), R("NASA ir ESA palydovai fiksuoja miškų kirtimą, gaisrus ir žemės naudojimo pokyčius (pvz., NASA Worldview).")]),
  bul([B("Interaktyvūs taršos žemėlapiai: "), R("leidžia matyti, kur ir kiek teršalų patenka į aplinką (pvz., electricitymap.org rodo elektros tinklo anglies intensyvumą).")]),

  H3("Duomenų analizė sprendimams"),
  P("Surinkti aplinkos duomenys padeda valdžios institucijoms ir mokslininkams priimti pagrįstus sprendimus: kur statyti vėjo jėgaines, kuriose vietose mažinti taršą, kaip planuoti miesto žaliąsias zonas. Be skaitmeninių technologijų tokia analizė būtų neįmanoma arba užtruktų dešimtmečius."),

  fun("Viena valanda HD vaizdo transliacijos sunaudoja tiek elektros, kiek reikia 10 šviesos diodų (LED) lempučių maitinti visą valandą."),
  empty(),

  // ═══ 4. Ką galiu padaryti aš? ═══
  H1("4. Ką galiu padaryti aš?"),
  P("Kiekvienas žmogus gali sumažinti savo skaitmeninį pėdsaką paprastais kasdieniais veiksmais. Nereikia atsisakyti technologijų — užtenka jas naudoti sąmoningiau."),

  H3("Sumažink nereikalingų duomenų kiekį"),
  bul("Ištrink senus, nebereikalingus el. laiškus, ypač tuos su dideliais priedais."),
  bul("Reguliariai peržiūrėk ir ištrink nebereikalingus failus iš debesijos (Google Drive, OneDrive)."),
  bul("Atsisakyk nereikalingų naujienų prenumeratų — mažiau siunčiamų laiškų reiškia mažiau serverių darbo."),

  H3("Naudok technologijas protingai"),
  bul("Kai nežiūri atidžiai — sumažink vaizdo kokybę (pvz., 480p vietoj 1080p)."),
  bul("Atsisiųsk muziką ar vaizdo įrašus, jei klausai ar žiūri juos pakartotinai — taip sumažinsi pakartotinį srautinį perdavimą."),
  bul("Išjunk automatinį vaizdo paleidimą socialiniuose tinkluose."),

  H3("Ilgink įrenginių tarnavimo laiką"),
  bul("Prižiūrėk savo įrenginius: naudok dėklą, saugok nuo drėgmės ir kritimų."),
  bul("Prieš pirkdamas naują telefoną ar kompiuterį — paklausk savęs, ar tikrai reikia."),
  bul("Seną, bet veikiantį įrenginį atiduok arba parduok — taip jis dar tarnaus kitam."),

  H3("Tinkamai tvarkyk e-atliekas"),
  P("Niekada nemešk elektroninių įrenginių į buitinių atliekų konteinerį. Atiduok juos į surinkimo punktą arba grąžink pardavėjui."),
  empty(),

  // ═══ Praktiniai patarimai ═══
  H1("Praktiniai patarimai"),
  num("tips", [B("Ištrink senus el. laiškus: "), R("ypač tuos su dideliais priedais. Kiekvienas saugomas failas serveryje naudoja energiją.")]),
  num("tips", [B("Sumažink vaizdo kokybę: "), R("kai nesvarbu detalės, 480p pakanka ir sutaupo energijos.")]),
  num("tips", [B("Ilgink įrenginio tarnavimo laiką: "), R("naudok dėklą, atnaujink programinę įrangą, nevisk po pirmo įbrėžimo.")]),
  num("tips", [B("Atiduok e-atliekas tinkamai: "), R("į surinkimo punktą arba grąžink pardavėjui perkant naują įrenginį.")]),
  num("tips", [B("Atsisakyk nereikalingų prenumeratų: "), R("kiekvienas nereikalingas naujienlaiškis — tai serverio darbas ir energija.")]),
  num("tips", [B("Išjunk automatinį vaizdo paleidimą: "), R("socialiniuose tinkluose automatiškai paleisti vaizdo įrašai suvartoja daug duomenų.")]),
  num("tips", [B("Pasidalyk žiniomis: "), R("papasakok draugams ar šeimos nariams, kaip jie gali sumažinti savo skaitmeninį pėdsaką.")]),
  empty(),

  // ═══ Pasitikrink save ═══
  H1("Pasitikrink save"),
  num("qs", [R("Įvardykite tris pagrindines skaitmeninių technologijų poveikio aplinkai sritis.")]),
  num("qs", [R("Kas yra elektroninės atliekos? Pateikite tris pavyzdžius.")]),
  num("qs", [R("Paaiškinkite, kodėl vaizdo transliacija suvartoja daugiau energijos nei tekstinė žinutė.")]),
  num("qs", [R("Kodėl svarbu tinkamai tvarkyti e-atliekas, o ne mesti jas į buitinių atliekų konteinerį?")]),
  num("qs", [R("Pateikite du pavyzdžius, kaip skaitmeninės technologijos padeda stebėti ar saugoti aplinką.")]),
  num("qs", [R("Jūsų draugas sako: \u201EAš tik žiūriu vaizdo įrašus — tai jokio poveikio aplinkai.\u201c Paaiškinkite, kodėl jis klysta.")]),
  num("qs", [R("Sukurkite veiksmų planą: kokius 3 konkrečius veiksmus galėtumėte atlikti šią savaitę, kad sumažintumėte savo skaitmeninį pėdsaką?")]),
  num("qs", [R("Jūsų mokykla nori sumažinti savo skaitmeninį pėdsaką. Pasiūlykite 4 veiksmus, kuriuos mokykla galėtų įgyvendinti, ir pagrįskite kiekvieną.")]),
  empty(),

  // ═══ Sužinok daugiau ═══
  H1("Sužinok daugiau"),
  P("Jei nori giliau suprasti šią temą:"),
  bul([B("Elektroninių atliekų tvarkymas Lietuvoje: "), R("atliekos.lt — informacija apie surinkimo punktus, taisykles ir statistiką.")]),
  bul([B("IEA duomenų centrai (anglų k.): "), R("iea.org/energy-system/buildings/data-centres-and-data-transmission-networks — naujausios energijos suvartojimo tendencijos.")]),
  bul([B("Elektros tinklo anglies intensyvumas: "), R("electricitymap.org — interaktyvus žemėlapis, rodantis realiu laiku, kiek CO₂ išmeta kiekvienos šalies elektros tinklas.")]),
  bul([B("NASA Worldview (anglų k.): "), R("worldview.earthdata.nasa.gov — palydoviniai vaizdai aplinkos stebėjimui: gaisrai, deforestacija, oro kokybė.")]),
  empty(),

  // ═══ Šaltiniai ═══
  rule(GREY, 4),
  new Paragraph({ spacing: { after: 60 },
    children: [new TextRun({ text: "Šaltiniai", font: "Arial", size: 18, italics: true, color: GREY })] }),
  ...sources.map(s => new Paragraph({ spacing: { after: 40 },
    children: [new TextRun({ text: s, font: "Arial", size: 18, italics: true, color: GREY })] })),
];

// ══════════════════════════════════════════════════════════
const doc = new Document({ numbering,
  sections: [{ properties: { page: { size: { width: PAGE_W, height: PAGE_H }, margin: { top: M, right: M, bottom: M, left: M } } },
    headers: { default: new Header({ children: [new Paragraph({ alignment: AlignmentType.RIGHT,
      children: [new TextRun({ text: "Teorijos paketas • ST poveikis aplinkai", font: "Arial", size: 16, color: GREY, italics: true })] })] }) },
    footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: "Puslapis ", font: "Arial", size: 16, color: GREY }),
        new TextRun({ children: [PageNumber.CURRENT], font: "Arial", size: 16, color: GREY })] })] }) },
    children }],
});

const outPath = "Grade_9/Semester_1/01_Safety/004_L - Environmental impact of digital technologies/004_L_ST_poveikis_aplinkai_Theory_Pack.docx";
const buf = await Packer.toBuffer(doc);
fs.writeFileSync(outPath, buf);
console.log(`OK: ${outPath} (${buf.length} bytes)`);
