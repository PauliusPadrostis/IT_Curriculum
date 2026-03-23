// Theory Pack 003: Internetinės rizikos ir saugaus reagavimo logika
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
  { lt: "Sukčiavimas internete", en: "phishing",
    def: "Apgaulės būdas, kai piktavalis apsimeta patikima organizacija ir bando išvilioti asmeninius duomenis (slaptažodžius, banko informaciją) per el. laiškus, žinutes ar netikras svetaines." },
  { lt: "Socialinė inžinerija", en: "social engineering",
    def: "Manipuliavimo technikų visuma, kai žmogus apgaunamas psichologiškai — per pasitikėjimą, baimę ar skubos jausmą — siekiant išgauti konfidencialią informaciją." },
  { lt: "Melaginga informacija", en: "misinformation",
    def: "Netiksli ar klaidinga informacija, kuri platinama netyčia, be ketinimo apgauti — dažnai dėl nežinojimo ar neatidumo." },
  { lt: "Dezinformacija", en: "disinformation",
    def: "Tyčia sukurta ir platinama melaginga informacija, skirta klaidinti, manipuliuoti viešąja nuomone arba sukelti chaosą." },
  { lt: "Kibernetinė ataka", en: "cyber attack",
    def: "Tyčinis bandymas pažeisti kompiuterių sistemas, tinklus ar duomenis, siekiant pavogti informaciją, sutrikdyti veiklą arba gauti finansinę naudą." },
  { lt: "Informacinis raštingumas", en: "media literacy",
    def: "Gebėjimas kritiškai vertinti informaciją: atpažinti jos šaltinį, tikslą, patikimumą ir atskirti faktus nuo nuomonių ar melagienų." },
  { lt: "SUSTOTI-PATIKRINTI-PRANEŠTI algoritmas", en: "stop-check-report algorithm",
    def: "Trijų žingsnių saugaus reagavimo schema: sustabdyti veiksmą, patikrinti informacijos tikrumą ir pranešti patikimam asmeniui ar institucijai." },
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
  `NKSC. \u201EKibernetinio saugumo grėsmės ir rekomendacijos.\u201c nksc.lt, 2023.`,
  `Bitė Lietuva. \u201EKaip atpažinti sukčių internete?\u201c bite.lt, 2023.`,
  `VDAI. \u201EAsmens duomenų apsauga skaitmeninėje erdvėje.\u201c vdai.lrv.lt, 2024.`,
  `Microsoft. \u201EKas yra sukčiavimas ir kaip jo išvengti.\u201c microsoft.com/lt-lt, 2024.`,
  `LRT. \u201EMelagienos: kaip jas atpažinti ir kodėl jos plinta.\u201c lrt.lt, 2023.`,
  `Jotvingių gimnazija. \u201EDezinformacija ir informacinis raštingumas.\u201c jotvingiugimnazija.lt, 2023.`,
];

// ══════════════════════════════════════════════════════════
//  DOCUMENT CONTENT — plain UTF-8 Lithuanian
// ══════════════════════════════════════════════════════════
const children = [
  // Title
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 40 },
    children: [new TextRun({ text: "TEORIJOS PAKETAS", font: "Arial", size: 18, color: GREY, allCaps: true })] }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 60 },
    children: [new TextRun({ text: "Internetinės rizikos ir saugaus reagavimo logika", font: "Arial", size: 36, bold: true, color: NAVY })] }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 100 },
    children: [new TextRun({ text: "9 klasė  •  Sauga  •  1 semestras", font: "Arial", size: 20, color: GREY })] }),
  rule(NAVY, 6),

  // ═══ Įvadas ═══
  H1("Įvadas"),
  P("Įsivaizduokite: gausite el. laišką nuo \u201Ebanko\u201c su pranešimu, kad jūsų sąskaita užblokuota. Laiškas atrodo tikras — yra logotipas, oficialus tonas, nuoroda į \u201Epasskyros atkūrimą\u201c. Reikia tik suvesti slaptažodį. Ką darytumėte?"),
  P("Kasdien internete susiduriame su įvairiais pavojais: sukčiavimo laiškais, manipuliacija socialiniuose tinkluose, melagingomis naujienomis. Šiame teorijos pakete išmoksite atpažinti dažniausias internetines grėsmes ir taikyti saugaus reagavimo algoritmą: SUSTOTI, PATIKRINTI, PRANEŠTI."),

  // ═══ Pagrindinės sąvokos ═══
  H1("Pagrindinės sąvokos"),
  termTable,
  empty(),

  // ═══ 1. Phishing ═══
  H1("1. Sukčiavimas internete (phishing) — kas tai ir kaip atpažinti"),
  P("Sukčiavimas internete (angl. phishing) — tai viena dažniausių kibernetinių atakų. Piktavaliai siunčia el. laiškus, SMS žinutes arba sukuria netikras svetaines, apsimesdami patikimomis organizacijomis: banku, mokykla, socialinio tinklo administracija. Tikslas — priversti jus atskleisti asmeninius duomenis."),

  H3("Tipiški sukčiavimo laiško požymiai"),
  bul([B("Skubos jausmas: "), R("\u201EJūsų paskyra bus ištrinta per 24 valandas!\u201c, \u201ESkubiai patvirtinkite savo tapatybę!\u201c — spaudimas veikti iš karto, negalvojant.")]),
  bul([B("Nežinomas ar įtartinas siuntėjas: "), R("adresas panašus į tikrą, bet su klaidomis — pvz., info@bankos.lt vietoj info@bankas.lt.")]),
  bul([B("Prašoma asmeninių duomenų: "), R("slaptažodžio, asmens kodo, banko kortelės numerio. Tikros organizacijos niekada to neprašo el. laišku.")]),
  bul([B("Įtartinos nuorodos: "), R("nuorodos adresas neatitinka organizacijos svetainės. Užvedus pelę ant nuorodos (nespaudžiant!) galima pamatyti tikrąjį adresą.")]),
  bul([B("Gramatikos ir rašybos klaidos: "), R("oficialūs laiškai paprastai būna be klaidų. Jei laiškas pilnas klaidų — tai rimtas įspėjimo ženklas.")]),

  tip("NKSC rekomenduoja: jei gavote įtartiną el. laišką — nedelsdami uždarykite ir nevykdykite jokių nurodymų. Pranešti galite cert@nksc.lt."),
  empty(),

  H3("Sukčiavimo pavyzdžiai"),
  bul([B("El. laiškas nuo \u201Ebanko\u201c: "), R("\u201EGerbiamas kliente, jūsų sąskaitoje aptikta įtartina veikla. Spustelėkite čia, kad patvirtintumėte savo tapatybę.\u201c")]),
  bul([B("SMS žinutė apie siuntinį: "), R("\u201EJūsų siuntinys sulaikytas. Sumokėkite 1,99 € muitinės mokestį: [nuoroda].\u201c")]),
  bul([B("Socialinio tinklo pranešimas: "), R("\u201EJūsų Facebook paskyra pažeista! Prisijunkite čia, kad ją apsaugotumėte.\u201c")]),
  empty(),

  // ═══ 2. Socialinė inžinerija ═══
  H1("2. Socialinė inžinerija"),
  P("Socialinė inžinerija — tai platesnis terminas nei sukčiavimas. Tai bet koks bandymas manipuliuoti žmogumi, kad jis atliktų veiksmą arba atskleistų informaciją. Sukčiavimas internete yra viena socialinės inžinerijos rūšis, bet yra ir kitų."),

  H3("Manipuliavimo technikos"),
  bul([B("Emocinis spaudimas: "), R("baimė (\u201Eprarasite paskyrą\u201c), godumas (\u201Elaimėjote prizą\u201c), gailestis (\u201Epadėkite man — esu bėdoje\u201c). Stiprios emocijos neleidžia mąstyti kritiškai.")]),
  bul([B("Apsimetimas autoritetu: "), R("piktavalis prisistatys kaip mokyklos IT administratorius, policijos pareigūnas ar įmonės vadovas. Autoriteto pozicija verčia paklusti.")]),
  bul([B("Skubus prašymas: "), R("\u201ETuriu atsakyti per 5 minutes, kitaip bus per vėlu!\u201c — laiko spaudimas trukdo sustoti ir pagalvoti.")]),
  bul([B("Draugystės ar pasitikėjimo kūrimas: "), R("ilgalaikis bendravimas prieš pateikiant prašymą — žmogus jaučiasi skolingas arba nenori nuvilti.")]),

  P("Pagrindinė apsauga nuo socialinės inžinerijos — kritinis mąstymas. Jei kažkas prašo jūsų duomenų ar pinigų, net jei jis atrodo patikimas — sustokite ir patikrinkite kitais kanalais."),

  fun("2023 m. Lietuvoje užfiksuota daugiau kaip 4000 kibernetinio saugumo incidentų. Dauguma prasidėjo nuo paprasto apgaulės laiško."),
  empty(),

  // ═══ 3. Melagienos ir dezinformacija ═══
  H1("3. Melagienos ir dezinformacija"),
  P("Internete plinta ne tik sukčiavimo laiškai, bet ir melaginga informacija. Svarbu suprasti skirtumą tarp melagingos informacijos (angl. misinformation) ir dezinformacijos (angl. disinformation)."),

  H3("Melaginga informacija vs. dezinformacija"),
  bul([B("Melaginga informacija (misinformation): "), R("netiksli informacija, platinama netyčia. Žmogus tiki, kad ji teisinga, ir dalijasi ja iš gerų ketinimų. Pvz., draugas persiunčia nepatikrintą sveikatos patarimą.")]),
  bul([B("Dezinformacija (disinformation): "), R("tyčia sukurta melaginga informacija, skirta klaidinti ar manipuliuoti. Ji kuriama strategiškai — siekiant politinės, ekonominės ar socialinės naudos.")]),

  H3("Kodėl melagienos plinta?"),
  bul([B("Emocinis turinys: "), R("informacija, kelianti pyktį, baimę ar nuostabą, platinama daug greičiau nei neutrali.")]),
  bul([B("Patvirtinimo šališkumas: "), R("žmonės linkę tikėti ir dalytis informacija, kuri atitinka jų jau turimas nuomones.")]),
  bul([B("Algoritmai: "), R("socialinių tinklų algoritmai rodo populiarų turinį — o melagingos naujienos dažnai sulaukia daugiau reakcijų.")]),
  bul([B("Patikimumo iliuzija: "), R("jei informacija atrodo profesionaliai, turi logotipą ar \u201Eekspertų\u201c citatą — jai lengviau patikėti.")]),

  fun("Tyrimai rodo, kad melagingos naujienos socialiniuose tinkluose plinta 6 kartus greičiau nei tikros — nes jos kelia stipresnes emocines reakcijas."),
  empty(),

  H3("Kaip patikrinti informaciją?"),
  bul([B("Patikrinkite šaltinį: "), R("kas paskelbė šią informaciją? Ar tai žinomas, patikimas naujienų portalas?")]),
  bul([B("Ieškokite patvirtinimo: "), R("ar apie tai rašo keli nepriklausomi šaltiniai? Jei informaciją skelbia tik vienas neaiškus puslapis — būkite atsargūs.")]),
  bul([B("Naudokite faktų tikrinimo svetaines: "), R("debunk.eu — Lietuvos ir Europos faktų tikrinimo platforma.")]),
  bul([B("Tikrinkite datą ir kontekstą: "), R("ar informacija aktuali? Kartais senos naujienos platinamos iš naujo, sukuriant klaidingą vaizdą.")]),
  bul([B("Nepasitikėkite antraštėmis: "), R("perskaitykite visą straipsnį — antraštės dažnai būna provokuojančios ir neatspindi turinio.")]),
  empty(),

  // ═══ 4. Saugaus reagavimo algoritmas ═══
  H1("4. Saugaus reagavimo algoritmas: SUSTOTI \u2192 PATIKRINTI \u2192 PRANEŠTI"),
  P("Kai susiduriate su įtartinu el. laišku, žinute, svetaine ar informacija internete, taikykite trijų žingsnių algoritmą:"),

  H3("1 žingsnis: SUSTOTI"),
  P("Nespauskite jokių nuorodų. Neatidarykite priedų. Neatsisiųskite failų. Neatsakykite į žinutę. Tiesiog sustokite ir atidžiai perskaitykite, kas rašoma."),
  bul("Paklauskite savęs: ar tikėjausi šio laiško? Ar pažįstu siuntėją? Ar prašoma asmeninių duomenų?"),
  bul("Jei jaučiate skubos spaudimą — tai pats svarbiausias signalas, kad reikia sustoti."),

  H3("2 žingsnis: PATIKRINTI"),
  P("Patikrinkite informacijos tikrumą nepriklausomu būdu — nespaudžiant laiške esančių nuorodų."),
  bul("Jei laiškas tariamai nuo banko — paskambinkite bankui oficialiu numeriu (ne tuo, kuris nurodytas laiške)."),
  bul("Jei gausite nuorodą — patikrinkite, ar adresas tikras. Užveskite pelę ant nuorodos ir palyginkite su oficialiu adresu."),
  bul("Jei matote naujieną, kuri stebina — patikrinkite ją debunk.eu arba palyginkite su kitais šaltiniais."),
  bul("Jei draugas prašo pinigų ar duomenų — paskambinkite jam ir paklauskite asmeniškai."),

  H3("3 žingsnis: PRANEŠTI"),
  P("Jei nustatėte, kad tai sukčiavimas ar dezinformacija — praneškite."),
  bul([B("Sukčiavimo laiškai: "), R("persiųskite cert@nksc.lt arba praneškite savo el. pašto tiekėjui.")]),
  bul([B("Netikri profiliai ar žinutės socialiniuose tinkluose: "), R("naudokite platformos \u201EPranešti\u201c (Report) funkciją.")]),
  bul([B("Melaginga informacija: "), R("nepersusiųskite — tiesiog pažymėkite kaip melagingą arba praneškite platformai.")]),
  bul([B("Papasakokite patikimam suaugusiajam: "), R("mokytojui, tėvams arba mokyklos IT specialistui.")]),

  H3("Algoritmo taikymo pavyzdys"),
  P([R("Situacija: "), R("gavote SMS žinutę: \u201EJūsų Omnitel paskyra bus užblokuota. Patvirtinkite tapatybę: [nuoroda].\u201c", { italics: true })]),
  bul([B("SUSTOTI: "), R("nespaudžiu nuorodos. Pastebiu, kad Omnitel nebeteikia paslaugų Lietuvoje — dabar tai Telia.")]),
  bul([B("PATIKRINTI: "), R("patikrinu Telia svetainę — tokio pranešimo nėra. Ieškau internete — randu, kad tai žinoma sukčiavimo schema.")]),
  bul([B("PRANEŠTI: "), R("persiuntu žinutę NKSC (cert@nksc.lt) ir užblokuoju siuntėjo numerį.")]),
  empty(),

  // ═══ Praktiniai patarimai ═══
  H1("Praktiniai patarimai"),
  num("tips", [B("Niekada neskubėkite: "), R("jei pranešimas kelia skubos jausmą — tai rimčiausias pavojaus signalas. Tikros organizacijos niekada neverčia veikti per kelias minutes.")]),
  num("tips", [B("Tikrinkite siuntėjo adresą: "), R("atidžiai perskaitykite el. laiško siuntėjo adresą. Viena raidės klaida gali reikšti, kad tai sukčius.")]),
  num("tips", [B("Nespauskite nuorodų el. laiškuose: "), R("jei reikia prisijungti prie banko ar paskyros — atidarykite naršyklę ir įveskite adresą patys.")]),
  num("tips", [B("Niekada nesiųskite slaptažodžių el. paštu ar žinute: "), R("jokia tikra organizacija to neprašys.")]),
  num("tips", [B("Tikrinkite naujienas keliuose šaltiniuose: "), R("prieš dalydamiesi — patikrinkite, ar informacija patvirtinta bent dviejuose patikimuose šaltiniuose.")]),
  num("tips", [B("Naudokite SUSTOTI-PATIKRINTI-PRANEŠTI: "), R("kiekvieną kartą, kai kažkas atrodo įtartina — taikykite šį algoritmą.")]),
  num("tips", [B("Kalbėkite apie tai su draugais ir šeima: "), R("jei pastebite sukčiavimo bandymą — papasakokite kitiems. Taip apsaugosite ne tik save, bet ir artimuosius.")]),
  empty(),

  // ═══ Pasitikrink save ═══
  H1("Pasitikrink save"),
  // Slenkstinis (2)
  num("qs", [R("Įvardykite tris tipiškus sukčiavimo internete (phishing) laiško požymius.")]),
  num("qs", [R("Kas yra socialinė inžinerija ir kuo ji skiriasi nuo techninės kibernetinės atakos?")]),
  // Patenkinamas (2)
  num("qs", [R("Paaiškinkite skirtumą tarp melagingos informacijos (misinformation) ir dezinformacijos (disinformation). Pateikite po vieną pavyzdį.")]),
  num("qs", [R("Kodėl melagingos naujienos socialiniuose tinkluose plinta greičiau nei tikros? Nurodykite bent dvi priežastis.")]),
  // Pagrindinis (2)
  num("qs", [R("Jūsų draugas gauna el. laišką: \u201EJūsų mokyklos paskyra bus ištrinta per 24 val. Spustelėkite čia, kad išsaugotumėte.\u201c Taikydami SUSTOTI-PATIKRINTI-PRANEŠTI algoritmą, apibūdinkite kiekvieną žingsnį.")]),
  num("qs", [R("Socialiniame tinkle matote naujieną su antrašte: \u201EMokslininkų patvirtinta: telefonai sukelia pavojingą ligą!\u201c Kokius žingsnius atliktumėte prieš ja dalydamiesi?")]),
  // Aukštesnysis (2)
  num("qs", [R("Sukurkite savo sukčiavimo laiško pavyzdį (nepavojingą, mokomąjį) ir pažymėkite kiekvieną požymį, pagal kurį galima jį atpažinti kaip sukčiavimą.")]),
  num("qs", [R("Jūsų mokykla nori sukurti informacinį plakatą apie saugų elgesį internete. Pasiūlykite 5 svarbiausius punktus, kuriuos įtrauktumėte, ir pagrįskite kiekvieną pasirinkimą.")]),
  empty(),

  // ═══ Sužinok daugiau ═══
  H1("Sužinok daugiau"),
  P("Jei nori giliau suprasti šią temą:"),
  bul([B("NKSC rekomendacijos dėl sukčiavimo: "), R("nksc.lt — skyriuje \u201ERekomendacijos\u201c rasite informacijos apie naujausias sukčiavimo schemas ir kaip nuo jų apsisaugoti.")]),
  bul([B("Google Phishing Quiz: "), R("phishingquiz.withgoogle.com — interaktyvus testas, padedantis atpažinti sukčiavimo laiškus (anglų kalba).")]),
  bul([B("Debunk.eu: "), R("Lietuvos ir Europos faktų tikrinimo platforma — galite patikrinti bet kurią naujieną arba gandą.")]),
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
      children: [new TextRun({ text: "Teorijos paketas • Internetinės rizikos ir saugaus reagavimo logika", font: "Arial", size: 16, color: GREY, italics: true })] })] }) },
    footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: "Puslapis ", font: "Arial", size: 16, color: GREY }),
        new TextRun({ children: [PageNumber.CURRENT], font: "Arial", size: 16, color: GREY })] })] }) },
    children }],
});

const outPath = "Grade_9/Semester_1/01_Safety/003_L - Online risks & safe response logic/003_L_Internetines_rizikos_Theory_Pack.docx";
const buf = await Packer.toBuffer(doc);
fs.writeFileSync(outPath, buf);
console.log(`OK: ${outPath} (${buf.length} bytes)`);
