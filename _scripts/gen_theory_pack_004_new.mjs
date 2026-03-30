// Theory Pack 004: Skaitmeninių technologijų poveikis aplinkai
// ALL Lithuanian text written in plain UTF-8 — no \u escapes
import { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, LevelFormat, BorderStyle,
  WidthType, ShadingType, PageNumber } from "docx";
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
  { lt: "Duomenų centras", en: "data centre",
    def: "Pastatas su daugybe serverių (galingų kompiuterių), kurie saugo ir apdoroja interneto duomenis. Veikia visą parą ir reikalauja daug elektros energijos bei aušinimo." },
  { lt: "Srautinis vaizdo įrašas", en: "streaming video",
    def: "Vaizdo įrašo žiūrėjimas internetu, kai duomenys perduodami iš serverio į jūsų įrenginį realiuoju laiku. Tai sudaro didžiausią interneto srauto dalį." },
  { lt: "E-atliekos", en: "e-waste",
    def: "Išmesti arba nebenaudojami elektroniniai prietaisai: telefonai, kompiuteriai, planšetės, laidai. Juose yra pavojingų medžiagų." },
  { lt: "Skaitmeninis pėdsakas", en: "digital carbon footprint",
    def: "Bendra CO\u2082 emisija, kurią sukuria asmens skaitmeninė veikla: el. laiškai, vaizdo įrašų žiūrėjimas, paieškos, failų saugojimas debesyje." },
  { lt: "Debesija", en: "cloud computing",
    def: "Duomenų saugojimas ir programų naudojimas per internetą, kai failai laikomi ne jūsų kompiuteryje, o nutolusiuose serveriuose (duomenų centruose)." },
  { lt: "Aplinkos monitoringas", en: "environmental monitoring",
    def: "Nuolatinis aplinkos stebėjimas naudojant jutiklius, palydovus ir kitas technologijas. Padeda sekti oro kokybę, vandens taršą, miškų kirtimą." },
  { lt: "Perdirbimas", en: "recycling",
    def: "Panaudotų medžiagų ar prietaisų perdarymas į naujas žaliavas ar produktus, užuot juos išmetus." },
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
  `ITU / UNITAR. \u201EThe Global E-waste Monitor 2024.\u201c ewastemonitor.info, 2024.`,
  `IEA. \u201EData Centres and Data Transmission Networks.\u201c iea.org, 2024.`,
  `Carbon Brief. \u201EAI: Five charts that put data-centre energy use into context.\u201c carbonbrief.org, 2025.`,
  `LR Aplinkos ministerija. \u201EWEEE ir e-atliekų tvarkymas Lietuvoje.\u201c am.lrv.lt, 2024.`,
  `NASA. \u201EClimate Change: Vital Signs of the Planet.\u201c climate.nasa.gov, 2024.`,
  `WEF. \u201ENew Earth observation tech is boosting climate intelligence.\u201c weforum.org, 2024.`,
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
  P("Kiekvieną dieną naudojatės internetu: žiūrite vaizdo įrašus, siunčiate žinutes, ieškote informacijos. Visa tai atrodo nematerialu, lyg vyksta \u201Edebesyje\u201c. Iš tikrųjų kiekvienas paspaudimas naudoja elektros energiją ir fizinę infrastruktūrą."),
  P("Šiame teorijos pakete sužinosite, kaip skaitmeninės technologijos veikia aplinką. Nagrinėsime dvi puses: neigiamą poveikį (energijos suvartojimas, e-atliekos, skaitmeninis pėdsakas) ir teigiamą (aplinkos stebėjimas, duomenų analizė)."),

  // ═══ Pagrindinės sąvokos ═══
  H1("Pagrindinės sąvokos"),
  termTable,
  empty(),

  // ═══ 1. Energijos suvartojimas ir duomenų centrai ═══
  H1("1. Energijos suvartojimas ir duomenų centrai"),
  P("Visa interneto veikla remiasi fizine infrastruktūra. Duomenų centrai yra dideli pastatai, kuriuose stovi tūkstančiai serverių. Jie veikia visą parą, todėl naudoja labai daug elektros."),

  H3("Kiek energijos naudoja duomenų centrai?"),
  bul("2024 m. duomenų centrai sunaudojo apie 415 TWh elektros. Tai maždaug 1,5 % visos pasaulio elektros."),
  bul("Iki 2030 m. šis skaičius gali padvigubėti ir pasiekti 945 TWh."),
  bul("Vienas didelis duomenų centras sunaudoja tiek elektros, kiek nedidelis miestas."),

  P("Didelę dalį energijos naudoja ne patys serveriai, o jų aušinimas. Serveriai generuoja daug šilumos, todėl reikia galingų aušinimo sistemų."),

  fun("Dirbtinio intelekto sistemos sparčiai didina energijos poreikį. 2024 m. dirbtinis intelektas naudojo 5\u201315 % duomenų centrų energijos. Iki 2030 m. ši dalis gali išaugti iki 35\u201350 %."),
  empty(),

  H3("Srautinis vaizdo įrašas (streaming)"),
  P("Žiūrint vaizdo įrašą internetu, duomenys keliauja iš duomenų centro per tinklą iki jūsų ekrano. Kiekvienas šio kelio etapas naudoja energiją."),
  bul([B("1 valanda HD vaizdo įrašo"), R(" sukuria maždaug 36\u2013100 g CO\u2082. Tai priklauso nuo vaizdo kokybės ir tiekėjo.")]),
  bul("Srautiniai vaizdo įrašai sudaro didžiausią interneto srauto dalį."),

  tip("Jei sumažinsite vaizdo kokybę iš 4K į HD, sumažinsite energijos suvartojimą kelis kartus. Tai vienas paprasčiausių būdų sumažinti savo skaitmeninį pėdsaką."),
  empty(),

  H3("El. paštas ir debesija"),
  P("Kiekvienas el. laiškas irgi naudoja energiją, nes duomenys saugomi serveriuose."),
  bul([B("El. laiškas be priedo"), R(" sukuria apie 4 g CO\u2082.")]),
  bul([B("El. laiškas su priedu (1 MB)"), R(" sukuria apie 19 g CO\u2082.")]),
  bul("Seni, neskaitomi laiškai ir debesyje saugomi failai nuolat naudoja serverių energiją."),

  // ═══ 2. E-atliekos ═══
  H1("2. E-atliekos"),
  P("E-atliekos, tai išmesti elektroniniai prietaisai: telefonai, kompiuteriai, planšetės, laidai, ausinės. Kai šie prietaisai nustoja veikti arba tampa nebereikalingi, dažnai tiesiog išmetami."),

  H3("Kodėl e-atliekos pavojingos?"),
  bul([B("Pavojingos medžiagos: "), R("elektroniniuose prietaisuose yra švino, gyvsidabrio, kadmio. Netinkamai šalinant, šios medžiagos patenka į dirvožemį ir vandenį.")]),
  bul([B("Mastas: "), R("2022 m. pasaulyje susidarė 62 mln. tonų e-atliekų. Tai 7,8 kg kiekvienam Žemės gyventojui.")]),
  bul([B("Mažas perdirbimo lygis: "), R("tik apie 22 % e-atliekų perdirbama tinkamai. Likusi dalis atsiduria sąvartynuose.")]),

  fun("Per pastarąjį dešimtmetį e-atliekų kiekis išaugo 82 %. Iki 2030 m. prognozuojama 82 mln. tonų per metus. Europoje perdirbama daugiausiai, apie 46 %."),
  empty(),

  H3("Ką galite padaryti?"),
  bul([B("Taisyti, ne keisti: "), R("sugedusį prietaisą pirmiausia bandykite pataisyti, o ne pirkti naują.")]),
  bul([B("Atiduoti perdirbimui: "), R("neišmeskite senų telefonų ar kompiuterių į šiukšliadėžę. Pristatykite juos į specialius surinkimo punktus.")]),
  bul([B("Rinktis ilgaamžiškesnius prietaisus: "), R("perkant naują prietaisą, rinkitės tokį, kuris tarnaus ilgiau ir kuriam galima keisti dalis.")]),

  // ═══ 3. Skaitmeninis pėdsakas ═══
  H1("3. Jūsų skaitmeninis pėdsakas"),
  P("Skaitmeninis pėdsakas, tai bendra CO\u2082 emisija, kurią sukuria jūsų skaitmeninė veikla. Kiekviena paieška, kiekvienas el. laiškas, kiekvienas vaizdo įrašas prisideda prie šio pėdsako."),

  H3("Kasdienių veiksmų palyginimas"),
  bul([B("Google paieška: "), R("apie 0,2 g CO\u2082.")]),
  bul([B("El. laiškas be priedo: "), R("apie 4 g CO\u2082.")]),
  bul([B("El. laiškas su priedu: "), R("apie 19 g CO\u2082.")]),
  bul([B("1 val. HD vaizdo įrašo: "), R("apie 36\u2013100 g CO\u2082.")]),

  P("Vienas žmogus per dieną gali sukurti dešimtis gramų CO\u2082 vien skaitmenine veikla. Padauginkite tai iš visos mokyklos ar visos šalies, ir skaičiai tampa reikšmingi."),

  // ═══ 4. ST kaip aplinkosaugos įrankis ═══
  H1("4. Kaip skaitmeninės technologijos padeda aplinkai"),
  P("Skaitmeninės technologijos ne tik kenkia aplinkai, bet ir padeda ją saugoti. Pažvelkime į tris svarbiausias sritis."),

  H3("Aplinkos monitoringas"),
  P("Palydovai ir jutikliai stebi Žemės aplinką realiuoju laiku. Jie fiksuoja oro kokybę, miškų būklę, jūros temperatūrą, ledynų tirpimą."),
  bul([B("Pavyzdys: "), R("NASA palydovai kas dieną fiksuoja ledynų tirpimo greitį. Šie duomenys padeda mokslininkams prognozuoti klimato pokyčius.")]),
  bul([B("MethaneSAT: "), R("2024 m. paleistas palydovas, kuris aptinka metano nuotėkius iš naftos ir dujų įmonių. Metanas yra viena galingiausių šiltnamio dujų.")]),

  H3("Duomenų analizė"),
  P("Dideli duomenų kiekiai padeda priimti geresnius sprendimus."),
  bul([B("Išmaniosios elektros sistemos: "), R("analizuoja energijos vartojimą ir mažina švaistymą. Elektra paskirstoma ten, kur jos labiausiai reikia.")]),
  bul([B("Gyvūnų migracijos stebėjimas: "), R("mokslininkai naudoja jutiklius ir GPS, kad sektų gyvūnų keliavimo maršrutus ir apsaugotų jų buveines.")]),

  H3("Interaktyvūs žemėlapiai"),
  P("Internete galima rasti žemėlapius, kurie rodo taršos lygius, atliekų surinkimo vietas, ekologinius duomenis."),
  bul([B("Oro kokybės žemėlapiai: "), R("rodo taršos lygį jūsų mieste realiuoju laiku.")]),
  bul([B("Atliekų surinkimo žemėlapiai: "), R("padeda rasti artimiausią e-atliekų surinkimo punktą.")]),

  tip("Skaitmeninės technologijos yra ir problema, ir sprendimo dalis. Svarbu jas naudoti sąmoningai: mažinti nereikalingą vartojimą ir naudotis galimybėmis stebėti bei saugoti aplinką."),
  empty(),

  // ═══ Praktiniai patarimai ═══
  H1("Praktiniai patarimai"),
  num("tips", [B("Sumažinkite vaizdo kokybę: "), R("žiūrėdami vaizdo įrašus, rinkitės HD vietoj 4K. Skirtumas ekrane nedidelis, bet energijos suvartojama mažiau.")]),
  num("tips", [B("Ištrinkite senus el. laiškus: "), R("reguliariai išvalykite el. pašto dėžutę. Kiekvienas senas laiškas serveryje naudoja energiją.")]),
  num("tips", [B("Išjunkite nenaudojamus prietaisus: "), R("nepalikite kompiuterio ar planšetės įjungtų visą parą. Užmigdykite arba išjunkite.")]),
  num("tips", [B("Taisykite, o ne keiskite: "), R("prieš pirkdami naują telefoną ar kompiuterį, paklauskite, ar senąjį galima pataisyti.")]),
  num("tips", [B("Atiduokite e-atliekas perdirbimui: "), R("neišmeskite elektronikos į šiukšliadėžę. Pristatykite į surinkimo punktą.")]),
  num("tips", [B("Naudokite debesijos paslaugas sąmoningai: "), R("nekelkite failų į debesį, jei jų nebenaudosite. Reguliariai peržiūrėkite, ką saugote.")]),
  num("tips", [B("Papasakokite kitiems: "), R("pasikalbėkite su šeima ir draugais apie skaitmeninį pėdsaką. Sąmoningas naudojimas prasideda nuo žinojimo.")]),
  empty(),

  // ═══ Pasitikrink save ═══
  H1("Pasitikrink save"),
  // Slenkstinis (2)
  num("qs", [R("Kas yra duomenų centras? Kodėl jis naudoja daug elektros energijos?")]),
  num("qs", [R("Įvardykite dvi pavojingas medžiagas, kurios yra e-atliekose.")]),
  // Patenkinamas (2)
  num("qs", [R("Paaiškinkite, kodėl vaizdo įrašo žiūrėjimas internetu naudoja daugiau energijos nei tekstinės žinutės siuntimas.")]),
  num("qs", [R("Kas yra skaitmeninis pėdsakas? Kokios kasdienės veiklos jį didina?")]),
  // Pagrindinis (2)
  num("qs", [R("Pateikite du pavyzdžius, kaip skaitmeninės technologijos padeda stebėti arba saugoti aplinką.")]),
  num("qs", [R("Jūsų draugas sako: \u201EInternetas neužteršia aplinkos, nes viskas vyksta debesyje.\u201c Paaiškinkite, kodėl šis teiginys klaidingas.")]),
  // Aukštesnysis (2)
  num("qs", [R("Sudarykite 3 veiksmų planą, kaip jūsų klasė galėtų sumažinti savo skaitmeninį pėdsaką per vieną mėnesį.")]),
  num("qs", [R("Skaitmeninės technologijos ir kenkia aplinkai, ir padeda ją saugoti. Pagrįskite šį teiginį pateikdami argumentų iš abiejų pusių.")]),
  empty(),

  // ═══ Sužinok daugiau ═══
  H1("Sužinok daugiau"),
  P("Jei nori giliau suprasti šią temą:"),
  bul([B("Global E-waste Monitor 2024: "), R("ewastemonitor.info \u2014 interaktyvus žemėlapis, kuriame gali pamatyti, kiek e-atliekų susidaro skirtingose šalyse (anglų k.).")]),
  bul([B("NASA Climate: "), R("climate.nasa.gov \u2014 palydoviniai duomenys apie klimato pokyčius, ledynų tirpimą, CO\u2082 lygį (anglų k.).")]),
  bul([B("Aplinkos ministerija: "), R("am.lrv.lt \u2014 informacija apie atliekų tvarkymą Lietuvoje, surinkimo punktai, taisyklės.")]),
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
      children: [new TextRun({ text: "Teorijos paketas • Skaitmeninių technologijų poveikis aplinkai", font: "Arial", size: 16, color: GREY, italics: true })] })] }) },
    footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: "Puslapis ", font: "Arial", size: 16, color: GREY }),
        new TextRun({ children: [PageNumber.CURRENT], font: "Arial", size: 16, color: GREY })] })] }) },
    children }],
});

import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outPath = path.join(__dirname, "..", "Grade_9", "Semester_1", "01_Safety", "004_L - Environmental impact of digital technologies", "004_L_ST_poveikis_aplinkai_Theory_Pack.docx");
const buf = await Packer.toBuffer(doc);
fs.writeFileSync(outPath, buf);
console.log(`OK: ${outPath} (${buf.length} bytes)`);
