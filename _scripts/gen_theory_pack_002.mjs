// Theory Pack 002: Privatumas ir paskyrų sauga
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
  { lt: "Slaptažodis", en: "password",
    def: "Slaptas simbolių rinkinys, naudojamas patvirtinti vartotojo tapatybę jungiantis prie paskyros." },
  { lt: "Dviejų veiksnių autentifikacija", en: "two-factor authentication, 2FA",
    def: "Saugumo priemonė, kai prisijungimui reikia dviejų skirtingo tipo įrodymų: slaptažodžio ir papildomo kodo ar patvirtinimo." },
  { lt: "Asmeniniai duomenys", en: "personal data",
    def: "Bet kokia informacija, pagal kurią galima nustatyti asmens tapatybę: vardas, el. paštas, nuotrauka, adresas." },
  { lt: "Privatumo nustatymai", en: "privacy settings",
    def: "Paskyros ar įrenginio nuostatos, leidžiančios valdyti, kas mato jūsų informaciją ir veiklą." },
  { lt: "Skaitmeninė tapatybė", en: "digital identity",
    def: "Asmens atpažinimo duomenų visuma internete: paskyros, profilis, el. pašto adresas." },
  { lt: "Slaptažodžių tvarkyklė", en: "password manager",
    def: "Programa, saugiai sauganti visus slaptažodžius vienoje šifruotoje saugykloje." },
  { lt: "Socialinė inžinerija", en: "social engineering",
    def: "Apgaulės būdas, kai piktavalis bando išgauti asmeninius duomenis apsimesdamas patikimu asmeniu." },
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
  `NKSC. \u201ESlaptažodžių saugumo biuletenis.\u201c nksc.lt, 2023.`,
  `LRT. \u201E20 populiariausių slaptažodžių Lietuvoje \u2014 juos galima nulaužti greičiau nei per sekundę.\u201c lrt.lt, 2023.`,
  `Microsoft. \u201EKas yra dviejų dalių autentifikavimas (2FA)?\u201c microsoft.com/lt-lt, 2024.`,
  `eSaugumas. \u201EKas yra dviejų faktorių autentifikacija?\u201c esaugumas.lt, 2023.`,
  `NCSC UK. \u201EPassword policy: updating your approach.\u201c ncsc.gov.uk, 2024.`,
  `Europa.eu. \u201EDuomenų apsauga ir privatumas internete.\u201c europa.eu/youreurope, 2024.`,
];

// ══════════════════════════════════════════════════════════
//  DOCUMENT CONTENT — plain UTF-8 Lithuanian
// ══════════════════════════════════════════════════════════
const children = [
  // Title
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 40 },
    children: [new TextRun({ text: "TEORIJOS PAKETAS", font: "Arial", size: 18, color: GREY, allCaps: true })] }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 60 },
    children: [new TextRun({ text: "Privatumas ir paskyrų sauga", font: "Arial", size: 36, bold: true, color: NAVY })] }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 100 },
    children: [new TextRun({ text: "9 klasė  •  Sauga  •  1 semestras", font: "Arial", size: 20, color: GREY })] }),
  rule(NAVY, 6),

  // ═══ Įvadas ═══
  H1("Įvadas"),
  P("Kiekvieną dieną jungiamės prie įvairių paskyrų — mokyklos sistemos, socialinių tinklų, el. pašto, žaidimų. Kiekvienai paskyrai sukuriame slaptažodį, bet ar susimąstome, kiek jis tikrai saugus? Ar žinome, ką daryti, jei kas nors sužino mūsų slaptažodį?"),
  P("Šiame teorijos pakete sužinosite, kaip sukurti stiprų slaptažodį, kaip veikia dviejų veiksnių autentifikacija (2FA) ir kodėl ji svarbi. Taip pat išmoksite atpažinti, kurie asmeniniai duomenys yra jautrūs ir kaip apsaugoti savo skaitmeninę tapatybę."),

  // ═══ Pagrindinės sąvokos ═══
  H1("Pagrindinės sąvokos"),
  termTable,
  empty(),

  // ═══ 1. Stiprus slaptažodis ═══
  H1("1. Stiprus slaptažodis"),
  P("Slaptažodis — tai pirmoji apsaugos linija. Jei jis silpnas, įsilaužti į paskyrą gali užtrukti vos kelias sekundes. Stiprus slaptažodis apsaugo ne tik paskyrą, bet ir visus joje esančius duomenis."),

  H3("Ką reiškia \u201Estiprus\u201c?"),
  bul([B("Ilgas: "), R("bent 12 simbolių. Kuo ilgesnis, tuo saugesnis.")]),
  bul([B("Sudėtingas: "), R("naudoja didžiąsias ir mažąsias raides, skaičius ir specialius simbolius (!, @, #, ?).")]),
  bul([B("Unikalus: "), R("kiekvienai paskyrai — atskiras slaptažodis. Jei vienas nuteka, kiti lieka saugūs.")]),
  bul([B("Ne asmeninis: "), R("nerašykite savo vardo, gimimo datos, augintinio vardo ar mokyklos pavadinimo.")]),

  H3("Trijų žodžių metodas"),
  P("Jungtinės Karalystės kibernetinio saugumo centras (NCSC) rekomenduoja paprastą būdą: sugalvokite tris atsitiktinius žodžius ir sujunkite juos. Pavyzdžiui: \u201ESauleLiūtasKnyga42!\u201c — ilgas, įsimintinas, bet sunkiai atspėjamas."),

  tip("Lietuvoje vienas dažniausiai naudojamų slaptažodžių — \u201E123456\u201c. Tokį slaptažodį nulaužti galima greičiau nei per sekundę. Niekada nenaudokite skaičių sekų ar paprastų žodžių kaip slaptažodžio."),
  empty(),

  H3("Slaptažodžių tvarkyklės"),
  P("Kai kiekvienai paskyrai reikia atskiro stipraus slaptažodžio, juos visus atsiminti sunku. Slaptažodžių tvarkyklė — tai programa, kuri saugiai saugo visus slaptažodžius vienoje šifruotoje saugykloje. Jums reikia atsiminti tik vieną pagrindinį slaptažodį."),
  bul("Populiarios tvarkyklės: Bitwarden (nemokama), KeePass (nemokama, atviro kodo), 1Password."),
  bul("Tvarkyklė gali automatiškai sugeneruoti stiprų slaptažodį kiekvienai paskyrai."),
  empty(),

  // ═══ 2. Dviejų veiksnių autentifikacija ═══
  H1("2. Dviejų veiksnių autentifikacija (2FA)"),
  P("Net stipriausias slaptažodis gali būti pavogtas — per duomenų nutekinimą, apgaulę ar kenkėjišką programą. Todėl saugumo specialistai rekomenduoja naudoti papildomą apsaugos sluoksnį — dviejų veiksnių autentifikaciją (2FA)."),

  H3("Kaip veikia 2FA?"),
  P("Prisijungiant prie paskyros reikia dviejų skirtingo tipo įrodymų:"),
  bul([B("1 veiksnys — ką žinai: "), R("slaptažodis arba PIN kodas.")]),
  bul([B("2 veiksnys — ką turi: "), R("telefonas (gauna SMS kodą arba generuoja kodą programėlėje) arba fizinis saugumo raktas.")]),
  P("Net jei kažkas sužino slaptažodį, be antrojo veiksnio prisijungti negalės."),

  H3("2FA būdai"),
  bul([B("SMS kodas: "), R("į telefoną ateina vienkartinis kodas. Paprasčiausia, bet ne pati saugiausia — SMS galima perimti.")]),
  bul([B("Autentifikavimo programėlė: "), R("programa (pvz., Google Authenticator) kas 30 sekundžių generuoja naują kodą. Saugesnė nei SMS.")]),
  bul([B("Fizinis saugumo raktas: "), R("USB įrenginys, kurį prijungiate prie kompiuterio. Saugiausia, bet reikia nusipirkti.")]),

  fun("Trečiasis autentifikacijos veiksnys — biometriniai duomenys: kas tu esi. Tai piršto atspaudas, veido atpažinimas ar balso atitikimas. Šiuolaikiniai telefonai dažnai naudoja šį būdą kartu su slaptažodžiu."),
  empty(),

  // ═══ 3. Asmeninių duomenų apsauga ═══
  H1("3. Asmeninių duomenų apsauga"),
  P("Asmeniniai duomenys — tai bet kokia informacija, pagal kurią galima nustatyti, kas esate: vardas, pavardė, el. pašto adresas, telefono numeris, nuotrauka, buvimo vieta. Europos Sąjungoje šiuos duomenis saugo Bendrasis duomenų apsaugos reglamentas (BDAR)."),

  H3("Jautrūs ir nejautrūs duomenys"),
  P("Ne visi duomenys yra vienodai jautrūs. Svarbu suprasti skirtumą:"),
  bul([B("Jautrūs duomenys: "), R("slaptažodis, asmens kodas, banko sąskaitos numeris, sveikatos informacija, buvimo vieta realiu laiku.")]),
  bul([B("Mažiau jautrūs duomenys: "), R("vardas, mėgstama muzika, mokyklos pavadinimas. Šie duomenys vieni savaime nekelia tiesioginio pavojaus.")]),
  P("Tačiau net mažiau jautrūs duomenys, sujungti kartu, gali atskleisti daug: vardas + mokykla + nuotrauka + buvimo vieta = užtenka, kad kažkas galėtų jus surasti."),

  H3("Privatumo nustatymai"),
  bul("Socialinių tinklų paskyrose patikrinkite, kas mato jūsų įrašus, nuotraukas ir asmeninę informaciją."),
  bul("Nustatykite, kad profilis būtų matomas tik draugams, o ne visiems interneto naudotojams."),
  bul("Reguliariai peržiūrėkite, kokioms programėlėms suteikėte prieigą prie savo paskyros."),

  tip("Prieš dalydamiesi informacija internete, paklauskite savęs: ar norėčiau, kad tai matytų visi mano klasės draugai, mokytojai ir tėvai? Jei ne — geriau neskelbti."),
  empty(),

  // ═══ 4. Socialinė inžinerija ═══
  H1("4. Kaip vagiami duomenys: socialinė inžinerija"),
  P("Dažnai duomenis pavagia ne įsilaužę į sistemą, o apgavę patį žmogų. Tai vadinama socialine inžinerija."),
  H3("Dažniausi būdai"),
  bul([B("Sukčiavimo laiškai (angl. phishing): "), R("el. laiškas, apsimetantis banku ar socialinio tinklo pranešimu, prašantis įvesti slaptažodį.")]),
  bul([B("Netikros svetainės: "), R("puslapis, kuris atrodo kaip tikra prisijungimo forma, bet iš tiesų perduoda duomenis sukčiams.")]),
  bul([B("Skubi žinutė: "), R("\u201EJūsų paskyra užblokuota! Spustelėkite čia!\u201c — spaudimas veikti skubiai, negalvojant.")]),

  P("Pagrindinė apsaugos taisyklė: jei pranešimas kelia skubos jausmą ir prašo asmeninių duomenų — sustokite ir patikrinkite. Tikros organizacijos niekada neprašo slaptažodžio el. laišku."),

  fun("2023 m. Lietuvoje buvo užfiksuota daugiau kaip 4000 kibernetinio saugumo incidentų. Dauguma jų prasidėjo nuo paprasto apgaulės laiško ar žinutės."),
  empty(),

  // ═══ Praktiniai patarimai ═══
  H1("Praktiniai patarimai"),
  num("tips", [B("Naudokite ilgus slaptažodžius: "), R("bent 12 simbolių. Trijų atsitiktinių žodžių metodas — paprastas ir veiksmingas.")]),
  num("tips", [B("Įjunkite 2FA visur, kur galima: "), R("pradėkite nuo el. pašto — tai svarbiausia paskyra, nes per ją galima atkurti kitas.")]),
  num("tips", [B("Naudokite slaptažodžių tvarkyklę: "), R("Bitwarden arba KeePass yra nemokami ir saugūs.")]),
  num("tips", [B("Niekada nesidalykite slaptažodžiu: "), R("net su geriausiu draugu. Jei reikia suteikti prieigą — naudokite dalijimosi funkciją.")]),
  num("tips", [B("Patikrinkite privatumo nustatymus: "), R("bent kartą per mėnesį peržiūrėkite savo socialinių tinklų nustatymus.")]),
  num("tips", [B("Nespauskite įtartinų nuorodų: "), R("jei laiškas ar žinutė kelia abejonių — nespauskite. Patikrinkite siuntėjo adresą.")]),
  num("tips", [B("Paskatinkite vienas kitą: "), R("jei draugas naudoja slaptažodį \u201E123456\u201c — padėkite jam sukurti stipresnį.")]),
  empty(),

  // ═══ Pasitikrink save ═══
  H1("Pasitikrink save"),
  num("qs", [R("Įvardykite tris stipraus slaptažodžio kriterijus.")]),
  num("qs", [R("Kas yra dviejų veiksnių autentifikacija ir iš kokių dviejų dalių ji susideda?")]),
  num("qs", [R("Paaiškinkite, kodėl slaptažodis \u201EJonas2008\u201c yra silpnas, nors jame yra ir raidžių, ir skaičių.")]),
  num("qs", [R("Kodėl autentifikavimo programėlė yra saugesnė nei SMS kodas?")]),
  num("qs", [R("Jūsų draugas gauna el. laišką: \u201EJūsų Instagram paskyra bus ištrinta per 24 val. Spustelėkite čia, kad išsaugotumėte.\u201c Ką patartumėte daryti?")]),
  num("qs", [R("Sukurkite slaptažodį naudodami trijų žodžių metodą. Paaiškinkite, kodėl jis atitinka stiprumo kriterijus.")]),
  num("qs", [R("Įvertinkite savo pagrindines paskyras: kur turite 2FA? Kur slaptažodis kartojasi? Kas būtų pirmas žingsnis jas apsaugoti?")]),
  num("qs", [R("Jūsų mokykla nori sukurti atmintinę apie saugią elgseną internete. Pasiūlykite 5 svarbiausius punktus, kuriuos įtrauktumėte.")]),
  empty(),

  // ═══ Sužinok daugiau ═══
  H1("Sužinok daugiau"),
  P("Jei nori giliau suprasti šią temą:"),
  bul([B("Slaptažodžio stiprumo tikrinimas: "), R("svetainėje bitwarden.com/password-strength gali patikrinti, kiek laiko užtruktų nulaužti slaptažodį (nevesk tikro slaptažodžio — sugalvok panašų).")]),
  bul([B("NKSC rekomendacijos: "), R("Nacionalinio kibernetinio saugumo centro biuletenis apie slaptažodžių saugą — nksc.lt, skyrius \u201ERekomendacijos\u201c.")]),
  bul([B("2FA praktinis vadovas (anglų k.): "), R("2fa.directory rodo, kurios svetainės palaiko 2FA ir kokio tipo.")]),
  bul([B("Have I Been Pwned: "), R("haveibeenpwned.com — patikrink, ar tavo el. pašto adresas nebuvo duomenų nutekinime (saugu naudoti).")]),
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
      children: [new TextRun({ text: "Teorijos paketas • Privatumas ir paskyrų sauga", font: "Arial", size: 16, color: GREY, italics: true })] })] }) },
    footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: "Puslapis ", font: "Arial", size: 16, color: GREY }),
        new TextRun({ children: [PageNumber.CURRENT], font: "Arial", size: 16, color: GREY })] })] }) },
    children }],
});

const outPath = "Grade_9/Semester_1/01_Safety/002_L - Privacy & account safety/002_L_Privatumas_Theory_Pack.docx";
const buf = await Packer.toBuffer(doc);
fs.writeFileSync(outPath, buf);
console.log(`OK: ${outPath} (${buf.length} bytes)`);
