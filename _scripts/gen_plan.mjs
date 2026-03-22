import { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  BorderStyle, WidthType, TableLayoutType, ShadingType } from "docx";
import { writeFileSync } from "fs";

// ── Color palette ────────────────────────────────────────────────
const C = {
  RETRIEVAL_BG: "FFF3E0", RETRIEVAL_ACCENT: "F57C00",
  TEACHING_BG: "E3F2FD", TEACHING_ACCENT: "1565C0",
  APPLICATION_BG: "E8F5E9", APPLICATION_ACCENT: "2E7D32",
  DIARY_ACCENT: "757575",
  META_BG: "F8F9FA",
  OBJ_BG: "EDE7F6", OBJ_ACCENT: "5E35B1",
  BORDER_LIGHT: "E0E0E0",
  TITLE_LINE: "1565C0", TITLE_COLOR: "1A237E",
  WARNING_BG: "FFF8E1", WARNING_TEXT: "E65100",
  BODY: "212121", LABEL: "424242", MUTED: "757575", BRIDGE: "616161",
};

const NB = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
const noBorders = { top: NB, bottom: NB, left: NB, right: NB };

// ── Helpers ──────────────────────────────────────────────────────
const t = (text, opts = {}) => new TextRun({ text, font: "Arial", size: 22, color: C.BODY, ...opts });
const bodyP = (runs, extra = {}) => new Paragraph({
  spacing: { after: 80 }, ...extra,
  children: typeof runs === "string" ? [t(runs)] : runs,
});
const labeledP = (label, value, extra = {}) => new Paragraph({
  spacing: { after: 80 }, ...extra,
  children: [t(label + " ", { bold: true, color: C.LABEL }), t(value)],
});
const phaseHeader = (title, timing, bg, accent) => new Table({
  layout: TableLayoutType.FIXED, columnWidths: [200, 9400], borders: noBorders,
  rows: [new TableRow({ cantSplit: true, children: [
    new TableCell({ shading: { type: ShadingType.CLEAR, fill: accent },
      width: { size: 200, type: WidthType.DXA }, children: [new Paragraph({})] }),
    new TableCell({ shading: { type: ShadingType.CLEAR, fill: bg },
      width: { size: 9400, type: WidthType.DXA },
      children: [new Paragraph({ children: [
        t(title, { bold: true, color: accent, size: 24 }),
        t(` \u2014 ${timing}`, { color: C.MUTED, size: 20 }),
      ]})] }),
  ]})]
});
const q = (n, text, accent) => new Paragraph({
  indent: { left: 360 }, spacing: { after: 60 }, keepNext: true,
  children: [t(`${n}. `, { bold: true, color: accent }), t(text)],
});
const bridge = (text) => new Paragraph({
  indent: { left: 240 }, spacing: { after: 80 },
  children: [t(text, { italics: true, color: C.BRIDGE, size: 20 })],
});
const warn = (mistake, rule) => new Paragraph({
  indent: { left: 240 }, keepLines: true,
  shading: { type: ShadingType.CLEAR, fill: C.WARNING_BG },
  spacing: { before: 80, after: 80 },
  children: [
    t("\u26A0 Da\u017Ena klaida: ", { bold: true, color: C.WARNING_TEXT }),
    t(mistake + " "),
    t("Taisykl\u0117: " + rule, { bold: true }),
  ],
});
const spacer = (tw = 200) => new Paragraph({ spacing: { before: tw } });
const hr = () => new Paragraph({
  border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: C.MUTED } },
  spacing: { after: 100 }, keepNext: true,
});
const metaRow = (label, value) => new TableRow({ children: [
  new TableCell({
    shading: { type: ShadingType.CLEAR, fill: C.META_BG },
    width: { size: 2400, type: WidthType.DXA },
    borders: { top: NB, left: NB, right: NB,
      bottom: { style: BorderStyle.SINGLE, size: 4, color: "EEEEEE" } },
    margins: { top: 60, bottom: 60, left: 120, right: 120 },
    children: [new Paragraph({ children: [t(label, { bold: true, color: C.LABEL })] })],
  }),
  new TableCell({
    shading: { type: ShadingType.CLEAR, fill: C.META_BG },
    width: { size: 7200, type: WidthType.DXA },
    borders: { top: NB, left: NB, right: NB,
      bottom: { style: BorderStyle.SINGLE, size: 4, color: "EEEEEE" } },
    margins: { top: 60, bottom: 60, left: 120, right: 120 },
    children: [new Paragraph({ children: [t(value)] })],
  }),
]});
const objBullet = (text) => new Paragraph({ spacing: { after: 60 }, children: [
  t("\u25B8 ", { bold: true, color: C.OBJ_ACCENT }), t(text),
]});

// ── Lesson data (passed via CLI arg: lesson number) ──────────────
const lessonNum = parseInt(process.argv[2] || "2");
const lessons = {
  2: buildLesson002,
  3: buildLesson003,
  4: buildLesson004,
  5: buildLesson005,
  6: buildLesson006,
  7: buildLesson007,
};

if (!lessons[lessonNum]) { console.error("Unknown lesson:", lessonNum); process.exit(1); }
const { children: content, outPath } = lessons[lessonNum]();

const doc = new Document({
  sections: [{
    properties: {
      page: {
        size: { width: 11906, height: 16838 },
        margin: { top: 1134, bottom: 1134, left: 1134, right: 1134 },
      },
    },
    children: content,
  }],
});

const buf = await Packer.toBuffer(doc);
writeFileSync(outPath, buf);
console.log("Written:", outPath);

// ══════════════════════════════════════════════════════════════════
// LESSON 002 — Privatumas ir paskyr\u0173 sauga
// ══════════════════════════════════════════════════════════════════
function buildLesson002() {
  const base = "C:/Users/Paulius/Documents/informatika-curriculum/Grade_9/Semester_1/01_Safety";
  const LQ = "\u201E"; // „
  const RQ = "\u201C"; // "
  const children = [
    // TITLE
    new Paragraph({ spacing: { after: 120 },
      children: [t("Privatumas ir paskyr\u0173 sauga", { bold: true, size: 36, color: C.TITLE_COLOR })] }),
    new Paragraph({ border: { bottom: { style: BorderStyle.SINGLE, size: 48, color: C.TITLE_LINE } }, spacing: { after: 200 } }),

    // METADATA
    new Table({ layout: TableLayoutType.FIXED, columnWidths: [2400, 7200], borders: noBorders, rows: [
      metaRow("Tipas", "L \u2014 Mokymosi pamoka (2 i\u0161 7 apie saug\u0105)"),
      metaRow("Klas\u0117", "9"),
      metaRow("Trukm\u0117", "~40 min."),
      metaRow("Forma", "Demo \u2192 bandymas"),
      metaRow("Temos ribos", "\u0160i pamoka apima stipri\u0173 slapta\u017Eod\u017Ei\u0173 k\u016Brim\u0105, dviej\u0173 veiksni\u0173 autentifikacijos (2FA) logik\u0105 ir jautri\u0173 asmenini\u0173 duomen\u0173 atpa\u017Einim\u0105. Neapima internetini\u0173 gr\u0117smi\u0173 (phishing), aplinkos poveikio ar ergonomikos."),
    ]}),
    spacer(),

    // OBJECTIVES
    new Table({ layout: TableLayoutType.FIXED, columnWidths: [9600],
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
            new Paragraph({ spacing: { after: 80 }, children: [t("PAMOKOS TIKSLAI", { bold: true, color: "4A148C" })] }),
            objBullet("Paai\u0161kinti, kas daro slapta\u017Eod\u012F stipr\u0173, ir sukurti slapta\u017Eod\u012F pagal saugumo kriterijus."),
            objBullet("Apib\u016Bdinti, kaip veikia dviej\u0173 veiksni\u0173 autentifikacija ir kod\u0117l ji padidina saugum\u0105."),
            new Paragraph({ spacing: { after: 0 }, children: [
              t("\u25B8 ", { bold: true, color: C.OBJ_ACCENT }),
              t("Atskirti saug\u0173 ir nesaug\u0173 elges\u012F su asmeniniais duomenimis konkre\u010Diose situacijose."),
            ]}),
          ],
        }),
      ]})]
    }),
    spacer(),

    // ENTRY RETRIEVAL
    phaseHeader("Pamokos prad\u017Eios klausimai", "~4 min.", C.RETRIEVAL_BG, C.RETRIEVAL_ACCENT),
    labeledP("Formatas:", "\u017Eodinis. Klausimai skaidr\u0117je.", { keepNext: true }),
    bodyP([t("Klausimai i\u0161 pra\u0117jusios pamokos (ergonomika):", { bold: true })], { keepNext: true }),
    q(1, "Kokia tur\u0117t\u0173 b\u016Bti s\u0117d\u0117jimo laikysena prie kompiuterio? \u012Evardinkite 2 taisykles.", C.RETRIEVAL_ACCENT),
    q(2, "K\u0105 rei\u0161kia 20-20-20 taisykl\u0117?", C.RETRIEVAL_ACCENT),
    q(3, "Kod\u0117l reikia daryti pertraukas, net kai nesijau\u010Dia pavarg\u0119s?", C.RETRIEVAL_ACCENT),
    bridge(`Ry\u0161ys: ${LQ}Praeit\u0105 pamok\u0105 kalb\u0117jome apie fizin\u0119 saug\u0105 \u2014 \u0161iandien kalb\u0117sime apie skaitmenin\u0119: kaip apsaugoti savo paskyras ir duomenis.${RQ}`),
    spacer(),

    // TEACHING
    phaseHeader("D\u0117stymas ir vedama praktika", "~22 min.", C.TEACHING_BG, C.TEACHING_ACCENT),
    bodyP([t("Slapta\u017Eod\u017Ei\u0173 sauga \u2014 ~10 min.", { bold: true, color: C.TEACHING_ACCENT })], { keepNext: true }),
    bodyP(`Parodykite skaidr\u0117je silpn\u0173 slapta\u017Eod\u017Ei\u0173 pavyzd\u017Eius: ${LQ}123456${RQ}, ${LQ}slaptazodis${RQ}, vardas+gimimo metai.`),
    bodyP("Paai\u0161kinkite stipraus slapta\u017Eod\u017Eio kriterijus:"),
    bodyP("  \u2022 \u226512 simboli\u0173", { indent: { left: 360 } }),
    bodyP("  \u2022 Did\u017Eiosios ir ma\u017Eosios raid\u0117s", { indent: { left: 360 } }),
    bodyP("  \u2022 Skai\u010Diai ir special\u016Bs simboliai", { indent: { left: 360 } }),
    bodyP("  \u2022 Ne asmenin\u0117 informacija", { indent: { left: 360 } }),
    bodyP("  \u2022 Kiekviena paskyra \u2014 skirtingas slapta\u017Eodis", { indent: { left: 360 } }),
    bodyP([
      t("Supratimo patikrinimas: ", { bold: true, color: C.LABEL }),
      t(`${LQ}Ar slapta\u017Eodis 'Katinas2024!' yra stiprus? Kod\u0117l taip arba ne?${RQ}`),
    ]),
    bodyP(`Praktinis bandymas (~3 min.): Mokiniai sugalvoja stipr\u0173 slapta\u017Eod\u012F pagal kriterijus (\u017Eod\u017Eiu, ne\u012Fvedant \u012F kompiuter\u012F). 2\u20133 mokiniai pasidalina logika, ne pa\u010Diu slapta\u017Eod\u017Eiu.`),

    bodyP([t("Dviej\u0173 veiksni\u0173 autentifikacija \u2014 ~7 min.", { bold: true, color: C.TEACHING_ACCENT })], { keepNext: true }),
    bodyP(`Paai\u0161kinkite 2FA logik\u0105: ka\u017Ekas, k\u0105 \u017Einai (slapta\u017Eodis) + ka\u017Ekas, k\u0105 turi (telefonas/kodas). Parodykite skaidr\u0117je 2FA veikimo schem\u0105.`),
    bodyP("Paai\u0161kinkite: net jei slapta\u017Eodis pavogtas, be antrojo veiksnio prisijungti nepavyks."),
    warn("manyti, kad 2FA = dviej\u0173 slapta\u017Eod\u017Ei\u0173 tur\u0117jimas.", "2FA = du skirtingi veiksniai (\u017Einojimas + tur\u0117jimas), ne du to paties tipo elementai."),

    bodyP([t("Jautr\u016Bs asmeniniai duomenys \u2014 ~5 min.", { bold: true, color: C.TEACHING_ACCENT })], { keepNext: true }),
    bodyP(`Paai\u0161kinkite: ne visi duomenys vienodai jautr\u016Bs. Parodykite pavyzd\u017Ei\u0173 skal\u0119: vardas (ma\u017Eai jautrus) \u2192 adresas \u2192 asmens kodas \u2192 banko duomenys (labai jautrus).`),
    bodyP([
      t("Supratimo patikrinimas: ", { bold: true, color: C.LABEL }),
      t(`${LQ}Ar savo mokyklos pavadinim\u0105 galima skelbti vie\u0161ai? O nam\u0173 adres\u0105?${RQ}`),
    ]),
    spacer(),

    // APPLICATION
    phaseHeader("Savarankišk a u\u017Eduotis", "~8 min.", C.APPLICATION_BG, C.APPLICATION_ACCENT),
    bodyP(`U\u017Eduoties instrukcijos skaidr\u0117je. Mokytojas perskaito 5 situacijas. Mokiniai \u017Eod\u017Eiu atsakin\u0117ja: saugu ar nesaugu? Kod\u0117l?`, { keepNext: true }),
    bodyP([t("Situacijos:", { bold: true, color: C.APPLICATION_ACCENT })], { keepNext: true }),
    bodyP(`1. Draugas pra\u0161o pasidalinti ${LQ}Netflix${RQ} slapta\u017Eod\u017Eiu.`, { indent: { left: 360 } }),
    bodyP("2. Svetain\u0117 pra\u0161o gimimo datos registruojantis \u017Eaidimui.", { indent: { left: 360 } }),
    bodyP("3. Nepa\u017E\u012Fstamas asmuo socialiniame tinkle klausia, kurioje mokykloje mokaisi.", { indent: { left: 360 } }),
    bodyP("4. El. parduotuv\u0117 pra\u0161o nam\u0173 adreso pristatymui.", { indent: { left: 360 } }),
    bodyP(`5. Klasiokas sako: ${LQ}Duok savo slapta\u017Eod\u012F, a\u0161 tik pa\u017Ei\u016Br\u0117siu.${RQ}`, { indent: { left: 360 } }),
    bodyP("Po kiekvienos situacijos trumpai aptarkite teising\u0105 atsakym\u0105."),
    spacer(),

    // EXIT RETRIEVAL
    phaseHeader("Pamokos pabaigos klausimai", "~3 min.", C.RETRIEVAL_BG, C.RETRIEVAL_ACCENT),
    labeledP("Formatas:", "\u017Eodinis. Klausimai skaidr\u0117je.", { keepNext: true }),
    q(1, "Kokie 3 kriterijai daro slapta\u017Eod\u012F stipr\u0173?", C.RETRIEVAL_ACCENT),
    q(2, "Kod\u0117l 2FA padeda, net jei slapta\u017Eodis pavogtas?", C.RETRIEVAL_ACCENT),
    q(3, "Ar savo vard\u0105 ir pavard\u0119 skelbti internete saugu? Nuo ko tai priklauso?", C.RETRIEVAL_ACCENT),
    spacer(),

    // DIARY
    hr(),
    new Paragraph({ spacing: { after: 80 }, children: [t("PAMOKOS APRA\u0160YMAS (DIENYNUI)", { bold: true, color: C.DIARY_ACCENT })] }),
    new Paragraph({ spacing: { after: 80 }, children: [
      t("Pamokoje mokiniai nagrin\u0117jo skaitmenin\u0117s paskyr\u0173 saugos pagrindus: stipri\u0173 slapta\u017Eod\u017Ei\u0173 k\u016Brimo kriterijus, dviej\u0173 veiksni\u0173 autentifikacijos veikimo princip\u0105 ir jautri\u0173 asmenini\u0173 duomen\u0173 atpa\u017Einim\u0105. Analizavo konkre\u010Dias situacijas ir vertino, ar elgesys su duomenimis yra saugus.",
        { italics: true, color: C.BRIDGE, size: 21 }),
    ]}),
  ];
  return { children, outPath: `${base}/002_L - Privacy & account safety/Teacher_Plan.docx` };
}

// ══════════════════════════════════════════════════════════════════
// LESSON 003 — Internetin\u0117s rizikos ir saugaus reagavimo logika
// ══════════════════════════════════════════════════════════════════
function buildLesson003() {
  const base = "C:/Users/Paulius/Documents/informatika-curriculum/Grade_9/Semester_1/01_Safety";
  const LQ = "\u201E"; const RQ = "\u201C";
  const children = [
    new Paragraph({ spacing: { after: 120 }, children: [t("Internetin\u0117s rizikos ir saugaus reagavimo logika", { bold: true, size: 36, color: C.TITLE_COLOR })] }),
    new Paragraph({ border: { bottom: { style: BorderStyle.SINGLE, size: 48, color: C.TITLE_LINE } }, spacing: { after: 200 } }),

    new Table({ layout: TableLayoutType.FIXED, columnWidths: [2400, 7200], borders: noBorders, rows: [
      metaRow("Tipas", "L \u2014 Mokymosi pamoka (3 i\u0161 7 apie saug\u0105)"),
      metaRow("Klas\u0117", "9"),
      metaRow("Trukm\u0117", "~40 min."),
      metaRow("Forma", "Demo \u2192 bandymas"),
      metaRow("Temos ribos", "\u0160i pamoka apima da\u017Eniausias internetines gr\u0117smes (phishing, socialin\u0117 in\u017Einerija, melagienos), j\u0173 atpa\u017Einimo po\u017Eymius ir saugaus reagavimo algoritm\u0105. Neapima slapta\u017Eod\u017Ei\u0173, 2FA, aplinkos poveikio ar ergonomikos."),
    ]}),
    spacer(),

    new Table({ layout: TableLayoutType.FIXED, columnWidths: [9600],
      rows: [new TableRow({ cantSplit: true, children: [
        new TableCell({
          shading: { type: ShadingType.CLEAR, fill: C.OBJ_BG },
          borders: { left: { style: BorderStyle.SINGLE, size: 64, color: C.OBJ_ACCENT }, top: { style: BorderStyle.SINGLE, size: 4, color: C.BORDER_LIGHT }, right: { style: BorderStyle.SINGLE, size: 4, color: C.BORDER_LIGHT }, bottom: { style: BorderStyle.SINGLE, size: 4, color: C.BORDER_LIGHT } },
          margins: { top: 120, bottom: 120, left: 120, right: 120 },
          children: [
            new Paragraph({ spacing: { after: 80 }, children: [t("PAMOKOS TIKSLAI", { bold: true, color: "4A148C" })] }),
            objBullet("Atpa\u017Einti da\u017Eniausias internetines gr\u0117smes: phishing, socialin\u0119 in\u017Einerij\u0105, melagien\u0173 sklaid\u0105."),
            objBullet("Apib\u016Bdinti tipinius phishing \u017Einut\u0117s po\u017Eymius ir paai\u0161kinti, kod\u0117l jie kelia pavoj\u0173."),
            new Paragraph({ spacing: { after: 0 }, children: [
              t("\u25B8 ", { bold: true, color: C.OBJ_ACCENT }),
              t("Pritaikyti saugaus reagavimo algoritm\u0105: sustoti \u2192 patikrinti \u2192 prane\u0161ti."),
            ]}),
          ],
        }),
      ]})]
    }),
    spacer(),

    // ENTRY RETRIEVAL
    phaseHeader("Pamokos prad\u017Eios klausimai", "~4 min.", C.RETRIEVAL_BG, C.RETRIEVAL_ACCENT),
    labeledP("Formatas:", "\u017Eodinis. Klausimai skaidr\u0117je.", { keepNext: true }),
    bodyP([t("Klausimai i\u0161 pra\u0117jusios pamokos (privatumas ir paskyr\u0173 sauga):", { bold: true })], { keepNext: true }),
    q(1, "\u012Evardinkite 3 stipraus slapta\u017Eod\u017Eio kriterijus.", C.RETRIEVAL_ACCENT),
    q(2, "Kaip veikia dviej\u0173 veiksni\u0173 autentifikacija? Kod\u0117l ji padeda?", C.RETRIEVAL_ACCENT),
    q(3, "Pateikite pavyzd\u012F: kada dalintis asmenine informacija internete b\u016Bt\u0173 nesaugu?", C.RETRIEVAL_ACCENT),
    bridge(`Ry\u0161ys: ${LQ}Praeitoje pamokoje mok\u0117m\u0117s apsaugoti savo paskyras. \u0160iandien \u017Ei\u016Br\u0117sime, kokios gr\u0117sm\u0117s tykoja internete ir kaip jas atpa\u017Einti.${RQ}`),
    spacer(),

    // TEACHING
    phaseHeader("D\u0117stymas ir vedama praktika", "~20 min.", C.TEACHING_BG, C.TEACHING_ACCENT),
    bodyP([t("Phishing ir socialin\u0117 in\u017Einerija \u2014 ~10 min.", { bold: true, color: C.TEACHING_ACCENT })], { keepNext: true }),
    bodyP(`Paai\u0161kinkite, kas yra phishing: bandymas i\u0161gauti asmenin\u0119 informacij\u0105 apsimetant patikimu \u0161altiniu.`),
    bodyP("Parodykite skaidr\u0117je phishing el. lai\u0161ko pavyzd\u012F. Paklauskite klasi\u0173: kokie \u012Ftartini po\u017Eymiai matomi?"),
    bodyP("Aptarkite tipinius phishing po\u017Eymius:"),
    bodyP("  \u2022 Netik\u0117tas si\u0173st\u0117jas arba keis\u010Diamas domenas", { indent: { left: 360 } }),
    bodyP("  \u2022 Skubos spaudimas: veikti reikia DABAR", { indent: { left: 360 } }),
    bodyP("  \u2022 Pra\u0161oma asmenin\u0117s informacijos arba slapta\u017Eod\u017Eio", { indent: { left: 360 } }),
    bodyP("  \u2022 Nuorodos adresas nesutampa su deklaruojamu \u0161altiniu", { indent: { left: 360 } }),
    bodyP(`Paai\u0161kinkite socialin\u0119 in\u017Einerij\u0105: manipuliacija pasitik\u0117jimu, emocijomis, autoritetu. Pateikite pavyzd\u012F: ${LQ}skambutis i\u0161 banko${RQ} pra\u0161ant patvirtinti duomenis.`),
    warn("manyti, kad phishing ateina tik el. pa\u0161tu.", "Phishing gali b\u016Bti SMS, socialini\u0173 tinkl\u0173 \u017Einut\u0117se, netgi skambu\u010Diais (vishing)."),

    bodyP([t("Melagienos ir dezinformacija \u2014 ~5 min.", { bold: true, color: C.TEACHING_ACCENT })], { keepNext: true }),
    bodyP("Paai\u0161kinkite skirtum\u0105 tarp klaidingos informacijos (netytin\u0117s) ir dezinformacijos (tytin\u0117s)."),
    bodyP("Parodykite pavyzd\u012F: kaip melaginga naujiena gali paskatinti neatsakingus veiksmus (paspausti nuorod\u0105, dalintis duomenimis)."),
    bodyP([
      t("Supratimo patikrinimas: ", { bold: true, color: C.LABEL }),
      t(`${LQ}Draugas atsiuncia nuorod\u0105 su ${LQ}nemokama dovana${RQ} \u2014 kaip elgtum\u0117t\u0117s? Kod\u0117l?${RQ}`),
    ]),

    bodyP([t("Saugaus reagavimo algoritmas \u2014 ~5 min.", { bold: true, color: C.TEACHING_ACCENT })], { keepNext: true }),
    bodyP("Pristatykite 3 \u017Eingsni\u0173 algoritm\u0105: SUSTOTI \u2192 PATIKRINTI \u2192 PRANE\u0160TI."),
    bodyP("  \u2022 Sustoti: ne\u012Fvykdyti pra\u0161ymo i\u0161 karto, nesvarbu koks spaudimas", { indent: { left: 360 } }),
    bodyP("  \u2022 Patikrinti: ar \u0161altinis tikras? Ar nuoroda veda ten, kur teigiama?", { indent: { left: 360 } }),
    bodyP("  \u2022 Prane\u0161ti: informuoti suaugus\u012Fj\u012F, mokytoj\u0105 arba platform\u0105", { indent: { left: 360 } }),
    spacer(),

    // APPLICATION
    phaseHeader("Savarankiška u\u017Eduotis", "~10 min.", C.APPLICATION_BG, C.APPLICATION_ACCENT),
    bodyP("U\u017Eduoties instrukcijos skaidr\u0117je. Mokytojas rodo 4 situacijas. Mokiniai \u017Eod\u017Eiu atsakin\u0117ja: kokia gr\u0117sm\u0117? K\u0105 daryti?", { keepNext: true }),
    bodyP([t("Situacijos:", { bold: true, color: C.APPLICATION_ACCENT })], { keepNext: true }),
    bodyP(`1. Gauni el. lai\u0161k\u0105 i\u0161 ${LQ}banko${RQ}: ${LQ}J\u016Bs\u0173 paskyra u\u017Eblokuota. Paspauskite nuorod\u0105.${RQ}`, { indent: { left: 360 } }),
    bodyP(`2. Socialiniame tinkle pamatai straipsn\u012F: ${LQ}\u012Erodytas b\u016Bdas u\u017Esidirbti 500 \u20AC per dien\u0105.${RQ}`, { indent: { left: 360 } }),
    bodyP(`3. Nepa\u017E\u012Fstamas \u017Emogus skambina ir sako, kad yra i\u0161 IT palaikymo \u2014 pra\u0161o \u012Fdiegti program\u0105.`, { indent: { left: 360 } }),
    bodyP(`4. Draugas persiun\u010Dia nuorod\u0105 su tekstu: ${LQ}Pažiūr\u0117k, \u010Dia tavo nuotrauka!${RQ}`, { indent: { left: 360 } }),
    bodyP("Po kiekvienos situacijos mokiniai taiko SUSTOTI \u2192 PATIKRINTI \u2192 PRANE\u0160TI algoritm\u0105 ir aptaria klas\u0117je."),
    spacer(),

    // EXIT RETRIEVAL
    phaseHeader("Pamokos pabaigos klausimai", "~3 min.", C.RETRIEVAL_BG, C.RETRIEVAL_ACCENT),
    labeledP("Formatas:", "\u017Eodinis. Klausimai skaidr\u0117je.", { keepNext: true }),
    q(1, "\u012Evardinkite 2 tipinius phishing \u017Einut\u0117s po\u017Eymius.", C.RETRIEVAL_ACCENT),
    q(2, "Kokie 3 \u017Eingsniai saugaus reagavimo algoritme?", C.RETRIEVAL_ACCENT),
    q(3, "Kuo skiriasi klaidinga informacija nuo dezinformacijos?", C.RETRIEVAL_ACCENT),
    spacer(),

    // DIARY
    hr(),
    new Paragraph({ spacing: { after: 80 }, children: [t("PAMOKOS APRA\u0160YMAS (DIENYNUI)", { bold: true, color: C.DIARY_ACCENT })] }),
    new Paragraph({ spacing: { after: 80 }, children: [
      t("Pamokoje mokiniai nagrin\u0117jo da\u017Eniausias internetines gr\u0117smes: phishing, socialin\u0119 in\u017Einerij\u0105 ir melagien\u0173 sklaid\u0105. I\u0161moko atpa\u017Einti tipinius phishing po\u017Eymius ir pritaik\u0117 saugaus reagavimo algoritm\u0105 (sustoti \u2192 patikrinti \u2192 prane\u0161ti) analizuodami konkre\u010Dias situacijas.",
        { italics: true, color: C.BRIDGE, size: 21 }),
    ]}),
  ];
  return { children, outPath: `${base}/003_L - Online risks & safe response logic/Teacher_Plan.docx` };
}

// ══════════════════════════════════════════════════════════════════
// LESSON 004 — Skaitmenini\u0173 technologij\u0173 poveikis aplinkai
// ══════════════════════════════════════════════════════════════════
function buildLesson004() {
  const base = "C:/Users/Paulius/Documents/informatika-curriculum/Grade_9/Semester_1/01_Safety";
  const LQ = "\u201E"; const RQ = "\u201C";
  const children = [
    new Paragraph({ spacing: { after: 120 }, children: [t("Skaitmenini\u0173 technologij\u0173 poveikis aplinkai", { bold: true, size: 36, color: C.TITLE_COLOR })] }),
    new Paragraph({ border: { bottom: { style: BorderStyle.SINGLE, size: 48, color: C.TITLE_LINE } }, spacing: { after: 200 } }),

    new Table({ layout: TableLayoutType.FIXED, columnWidths: [2400, 7200], borders: noBorders, rows: [
      metaRow("Tipas", "L \u2014 Mokymosi pamoka (4 i\u0161 7 apie saug\u0105)"),
      metaRow("Klas\u0117", "9"),
      metaRow("Trukm\u0117", "~40 min."),
      metaRow("Forma", "Pilnas demonstravimas"),
      metaRow("Temos ribos", "\u0160i pamoka apima skaitmenini\u0173 technologij\u0173 poveik\u012F aplinkai (energija, e-atliekos, skaitmeninis p\u0117dsakas) ir kaip ST padeda spr\u0119sti aplinkosaugos problemas (monitoringas, duomen\u0173 analiz\u0117). Neapima slapta\u017Eod\u017Ei\u0173, phishing, ergonomikos ar kit\u0173 saugos tem\u0173."),
    ]}),
    spacer(),

    new Table({ layout: TableLayoutType.FIXED, columnWidths: [9600],
      rows: [new TableRow({ cantSplit: true, children: [
        new TableCell({
          shading: { type: ShadingType.CLEAR, fill: C.OBJ_BG },
          borders: { left: { style: BorderStyle.SINGLE, size: 64, color: C.OBJ_ACCENT }, top: { style: BorderStyle.SINGLE, size: 4, color: C.BORDER_LIGHT }, right: { style: BorderStyle.SINGLE, size: 4, color: C.BORDER_LIGHT }, bottom: { style: BorderStyle.SINGLE, size: 4, color: C.BORDER_LIGHT } },
          margins: { top: 120, bottom: 120, left: 120, right: 120 },
          children: [
            new Paragraph({ spacing: { after: 80 }, children: [t("PAMOKOS TIKSLAI", { bold: true, color: "4A148C" })] }),
            objBullet("\u012Evardinti pagrindines skaitmenini\u0173 technologij\u0173 poveikio aplinkai sritis: energija, e-atliekos, duomen\u0173 centrai."),
            objBullet("Paai\u0161kinti, kaip kasdieniai skaitmeniniai veiksmai (el. lai\u0161kai, debesija, srautinis video) sunaudoja i\u0161teklius."),
            objBullet("Pateikti pavyzd\u012F, kaip skaitmenin\u0117s technologijos padeda spr\u0119sti aplinkosaugos problemas (monitoringas, duomen\u0173 analiz\u0117)."),
            new Paragraph({ spacing: { after: 0 }, children: [
              t("\u25B8 ", { bold: true, color: C.OBJ_ACCENT }),
              t("\u012Evardinti bent 2 konkrečius veiksmus, kuriuos gali atlikti mokinys, kad suma\u017Eint\u0173 savo skaitmenin\u012F p\u0117dsak\u0105."),
            ]}),
          ],
        }),
      ]})]
    }),
    spacer(),

    // ENTRY RETRIEVAL
    phaseHeader("Pamokos prad\u017Eios klausimai", "~4 min.", C.RETRIEVAL_BG, C.RETRIEVAL_ACCENT),
    labeledP("Formatas:", "\u017Eodinis. Klausimai skaidr\u0117je.", { keepNext: true }),
    bodyP([t("Klausimai i\u0161 pra\u0117jusios pamokos (internetin\u0117s rizikos):", { bold: true })], { keepNext: true }),
    q(1, "Kokie 3 \u017Eingsniai saugaus reagavimo algoritme?", C.RETRIEVAL_ACCENT),
    q(2, "\u012Evardinkite 2 po\u017Eymius, kad el. lai\u0161kas gali b\u016Bti phishing.", C.RETRIEVAL_ACCENT),
    q(3, "Kuo skiriasi klaidinga informacija nuo dezinformacijos?", C.RETRIEVAL_ACCENT),
    bridge(`Ry\u0161ys: ${LQ}Iki \u0161iol kalb\u0117jome apie tai, kaip technologijos gali pakenkti mums. \u0160iandien pa\u017Ei\u016Br\u0117sime, kaip mes galime pakenkti aplinkai naudodami technologijas.${RQ}`),
    spacer(),

    // TEACHING
    phaseHeader("D\u0117stymas", "~22 min.", C.TEACHING_BG, C.TEACHING_ACCENT),
    bodyP([t("Energijos suvartojimas \u2014 ~7 min.", { bold: true, color: C.TEACHING_ACCENT })], { keepNext: true }),
    bodyP("Paai\u0161kinkite: kiekvienas veiksmas internete naudoja elektr\u0105 \u2014 j\u016Bs\u0173 \u012Frenginys, tinklas, serveris."),
    bodyP("Parodykite skaidr\u0117je statistik\u0105: vienas Google paie\u0161kos u\u017Eklausimas sunaudoja ~0,3 Wh energijos. Viena valanda HD video srautinio transliavimo \u2014 ~0,36 kWh."),
    bodyP("Paai\u0161kinkite duomen\u0173 centr\u0173 s\u0105vok\u0105: did\u017Eiul\u0117s server\u0173 sal\u0117s, kurioms reikia ne tik elektros, bet ir au\u0161inimo."),
    bodyP([
      t("Supratimo patikrinimas: ", { bold: true, color: C.LABEL }),
      t(`${LQ}Kod\u0117l srautinis video sunaudoja daugiau energijos nei teksto \u017Einut\u0117?${RQ}`),
    ]),

    bodyP([t("E-atliekos \u2014 ~6 min.", { bold: true, color: C.TEACHING_ACCENT })], { keepNext: true }),
    bodyP("Paai\u0161kinkite, kas yra e-atliekos: i\u0161mest\u0105 elektronin\u0117 \u012Franga \u2014 telefonai, kompiuteriai, laidai."),
    bodyP("Pateikite fakt\u0105: pasaulyje kasmet susidaro ~62 mln. ton\u0173 e-atliek\u0173 (2024 m. duomenys). Tik ~22% tinkamai perdirbama."),
    bodyP("Paai\u0161kinkite pavoj\u0173: e-atliekose yra \u0161vino, gyvsidabrio, kadmio \u2014 nuod\u0173, kurios kenkia dirvai ir vandeniui."),
    bodyP("Aptarkite: kod\u0117l keisti telefon\u0105 kas metus \u2014 ne tik finansinis, bet ir aplinkos klausimas."),

    bodyP([t("ST kaip aplinkosaugos \u012Frankis \u2014 ~4 min.", { bold: true, color: C.TEACHING_ACCENT })], { keepNext: true }),
    bodyP("Paai\u0161kinkite: technologijos ne tik kenkia aplinkai, bet ir padeda j\u0105 saugoti."),
    bodyP("Pateikite pavyzd\u017Eius:"),
    bodyP("  \u2022 Aplinkos monitoringo sistemos: oro kokyb\u0117s, vandens tar\u0161os steb\u0117jimas realiu laiku", { indent: { left: 360 } }),
    bodyP("  \u2022 Interaktyv\u016Bs u\u017Eter\u0161tumo \u017Eem\u0117lapiai \u2014 duomenimis paremti sprendimai", { indent: { left: 360 } }),
    bodyP("  \u2022 Palydovin\u0117s nuotraukos mi\u0161k\u0173 kirtimui ar led\u0173 tirpimui steb\u0117ti", { indent: { left: 360 } }),
    bodyP([
      t("Supratimo patikrinimas: ", { bold: true, color: C.LABEL }),
      t(`${LQ}Kaip skaitmenin\u0117s technologijos gali pad\u0117ti j\u016Bs\u0173 miesto savivaldybei pri\u017Ei\u016Br\u0117ti aplinkos kokyb\u0119?${RQ}`),
    ]),

    bodyP([t("K\u0105 galiu daryti a\u0161? \u2014 ~5 min.", { bold: true, color: C.TEACHING_ACCENT })], { keepNext: true }),
    bodyP("Prid\u0117kite kontekst\u0105: tai ne vien \u012Fmoni\u0173 ar vyriausybi\u0173 problema. Kiekvienas gali prisid\u0117ti."),
    bodyP("Aptarkite konkrečius veiksmus:"),
    bodyP("  \u2022 Naudoti \u012Frengin\u012F ilgiau, o ne keisti kas metus", { indent: { left: 360 } }),
    bodyP("  \u2022 I\u0161jungti nereikaling\u0105 srautin\u012F transliacij\u0105 (pvz., muzik\u0105 klausyti atsisiuntus)", { indent: { left: 360 } }),
    bodyP("  \u2022 I\u0161trinti senus nebereeikalingus failus i\u0161 debes\u012F", { indent: { left: 360 } }),
    bodyP("  \u2022 Atiduoti nebenaudojam\u0105 elektronik\u0105 \u012F surinkimo punkt\u0105, o ne i\u0161mesti", { indent: { left: 360 } }),

    bodyP([
      t("Supratimo patikrinimas: ", { bold: true, color: C.LABEL }),
      t(`${LQ}Kod\u0117l seno telefono atidavimas perdirbimui yra geriau nei laikymas stal\u010Diaus stalčiuje?${RQ}`),
    ]),
    spacer(),

    // APPLICATION (brief discussion — pilnas demo shape)
    phaseHeader("Trumpa refleksija", "~5 min.", C.APPLICATION_BG, C.APPLICATION_ACCENT),
    bodyP(`\u017Eodinis aptarimas. Paklauskite: ${LQ}\u012Evardinkite po 1 veiksm\u0105, kur\u012F galite padaryti \u0161i\u0105 savait\u0119, kad suma\u017Eintum\u0117te savo skaitmenin\u012F p\u0117dsak\u0105.${RQ}`, { keepNext: true }),
    bodyP("2\u20133 mokiniai pasidalina savo id\u0117jomis. Trumpai aptarkite realisti\u0161kum\u0105."),
    spacer(),

    // EXIT RETRIEVAL
    phaseHeader("Pamokos pabaigos klausimai", "~3 min.", C.RETRIEVAL_BG, C.RETRIEVAL_ACCENT),
    labeledP("Formatas:", "\u017Eodinis. Klausimai skaidr\u0117je.", { keepNext: true }),
    q(1, "Kod\u0117l srautinis video sunaudoja daugiau energijos nei tekstin\u0117 \u017Einut\u0117?", C.RETRIEVAL_ACCENT),
    q(2, "Kas yra e-atliekos ir kod\u0117l jos pavojingos?", C.RETRIEVAL_ACCENT),
    q(3, "Pateikite pavyzd\u012F, kaip skaitmenin\u0117s technologijos padeda saugoti aplink\u0105.", C.RETRIEVAL_ACCENT),
    spacer(),

    hr(),
    new Paragraph({ spacing: { after: 80 }, children: [t("PAMOKOS APRA\u0160YMAS (DIENYNUI)", { bold: true, color: C.DIARY_ACCENT })] }),
    new Paragraph({ spacing: { after: 80 }, children: [
      t("Pamokoje mokiniai nagrin\u0117jo skaitmenini\u0173 technologij\u0173 poveik\u012F aplinkai: energijos suvartojim\u0105, e-atliek\u0173 problem\u0105 ir individualius veiksmus skaitmeninio p\u0117dsako ma\u017Einimui. Taip pat aptart\u0117, kaip skaitmenin\u0117s technologijos padeda spr\u0119sti aplinkosaugos problemas: monitoringas, duomen\u0173 analiz\u0117, interaktyv\u016Bs \u017Eem\u0117lapiai.",
        { italics: true, color: C.BRIDGE, size: 21 }),
    ]}),
  ];
  return { children, outPath: `${base}/004_L - Environmental impact of digital technologies/Teacher_Plan.docx` };
}

// ══════════════════════════════════════════════════════════════════
// LESSON 005 — Scenarij\u0173 rotacijos u\u017Eduotis
// ══════════════════════════════════════════════════════════════════
function buildLesson005() {
  const base = "C:/Users/Paulius/Documents/informatika-curriculum/Grade_9/Semester_1/01_Safety";
  const LQ = "\u201E"; const RQ = "\u201C";
  const children = [
    new Paragraph({ spacing: { after: 120 }, children: [t("Scenarij\u0173 rotacijos u\u017Eduotis", { bold: true, size: 36, color: C.TITLE_COLOR })] }),
    new Paragraph({ border: { bottom: { style: BorderStyle.SINGLE, size: 48, color: C.TITLE_LINE } }, spacing: { after: 200 } }),

    new Table({ layout: TableLayoutType.FIXED, columnWidths: [2400, 7200], borders: noBorders, rows: [
      metaRow("Tipas", "I \u2014 Integravimo pamoka (5 i\u0161 7 apie saug\u0105)"),
      metaRow("Klas\u0117", "9"),
      metaRow("Trukm\u0117", "~40 min."),
      metaRow("Forma", "Trumpas \u012Fvadas \u2192 ilga praktika"),
      metaRow("Temos ribos", "\u0160i pamoka integruoja visas 4 ankstesni\u0173 pamok\u0173 temas (ergonomika, privatumas, internetin\u0117s rizikos, aplinkos poveikis) per praktini\u0173 scenarij\u0173 analiz\u0119. Naujos teorijos n\u0117ra \u2014 mokiniai taiko jau i\u0161mokt\u0105 med\u017Eiag\u0105."),
    ]}),
    spacer(),

    new Table({ layout: TableLayoutType.FIXED, columnWidths: [9600],
      rows: [new TableRow({ cantSplit: true, children: [
        new TableCell({
          shading: { type: ShadingType.CLEAR, fill: C.OBJ_BG },
          borders: { left: { style: BorderStyle.SINGLE, size: 64, color: C.OBJ_ACCENT }, top: { style: BorderStyle.SINGLE, size: 4, color: C.BORDER_LIGHT }, right: { style: BorderStyle.SINGLE, size: 4, color: C.BORDER_LIGHT }, bottom: { style: BorderStyle.SINGLE, size: 4, color: C.BORDER_LIGHT } },
          margins: { top: 120, bottom: 120, left: 120, right: 120 },
          children: [
            new Paragraph({ spacing: { after: 80 }, children: [t("PAMOKOS TIKSLAI", { bold: true, color: "4A148C" })] }),
            objBullet("Pritaikyti \u017Einias i\u0161 vis\u0173 4 saugos tem\u0173 analizuojant naujus, nematytus scenarijus."),
            objBullet("Argumentuotai pagrįsti savo sprendim\u0105 \u017Eod\u017Eiu: identifikuoti problem\u0105, nurodyti taisykl\u0119, pasi\u016Blyti veiksm\u0105."),
            new Paragraph({ spacing: { after: 0 }, children: [
              t("\u25B8 ", { bold: true, color: C.OBJ_ACCENT }),
              t("Atskirti skirtingus saugos aspektus (fizin\u0117, skaitmenin\u0117, aplinkosaugin\u0117) konkrečiose situacijose."),
            ]}),
          ],
        }),
      ]})]
    }),
    spacer(),

    // ENTRY RETRIEVAL
    phaseHeader("Pamokos prad\u017Eios klausimai", "~4 min.", C.RETRIEVAL_BG, C.RETRIEVAL_ACCENT),
    labeledP("Formatas:", "\u017Eodinis. Klausimai skaidr\u0117je.", { keepNext: true }),
    bodyP([t("Klausimai i\u0161 vis\u0173 ankstesni\u0173 pamok\u0173 (kartojimas):", { bold: true })], { keepNext: true }),
    q(1, "K\u0105 rei\u0161kia 20-20-20 taisykl\u0117?", C.RETRIEVAL_ACCENT),
    q(2, "Kokie 3 \u017Eingsniai saugaus reagavimo algoritme?", C.RETRIEVAL_ACCENT),
    q(3, "\u012Evardinkite 2 b\u016Bdus suma\u017Einti savo skaitmenin\u012F p\u0117dsak\u0105.", C.RETRIEVAL_ACCENT),
    bridge(`Ry\u0161ys: ${LQ}\u0160iandien visk\u0105, k\u0105 i\u0161mokome per 4 pamokas, pritaikysime naujose situacijose. Veiksite savarankiškai.${RQ}`),
    spacer(),

    // SHORT INTRO
    phaseHeader("Trumpas priminimas ir u\u017Eduoties pristatymas", "~4 min.", C.TEACHING_BG, C.TEACHING_ACCENT),
    bodyP("Priminkite 4 temas: ergonomika, privatumas/paskyros, internetin\u0117s rizikos, aplinkos poveikis.", { keepNext: true }),
    bodyP(`Paai\u0161kinkite u\u017Eduoties format\u0105: skaidr\u0117je bus rodomi scenarijai, mokiniai turi ${LQ}diagnozuoti${RQ} situacij\u0105 ir pasi\u016Blyti veiksm\u0105. Atsakymai \u017Eod\u017Eiu.`),
    bodyP("Kiekvienas scenarijus turi strukt\u016Br\u0105: 1) kokia problema? 2) kokia taisykl\u0117 tinka? 3) k\u0105 daryti?"),
    spacer(),

    // PRACTICE
    phaseHeader("Scenarij\u0173 rotacija", "~25 min.", C.APPLICATION_BG, C.APPLICATION_ACCENT),
    bodyP("Scenarijai rodomi skaidr\u0117se. Po kiekvieno scenarijaus \u2014 kelios minut\u0117s m\u0105stymui, tada aptarimas su visa klase.", { keepNext: true }),
    bodyP([t("Scenarijai:", { bold: true, color: C.APPLICATION_ACCENT })], { keepNext: true }),
    bodyP(`1. [Ergonomika] Mokinys skundžiasi nugaros skausmu po 3 valand\u0173 prie kompiuterio. K\u0105 jis daro neteisingai? K\u0105 patarti?`, { indent: { left: 360 } }),
    bodyP(`2. [Privatumas] Nauja svetain\u0117 pra\u0161o \u012Fvesti asmens kod\u0105 ${LQ}am\u017Eiaus patvirtinimui${RQ}. Ar saugu? Kod\u0117l?`, { indent: { left: 360 } }),
    bodyP(`3. [Phishing] Gauni SMS: ${LQ}J\u016Bs\u0173 siunta u\u017Estr\u012Fgo. Paspauskite nuorod\u0105 patvirtinimui.${RQ} Niekada neužsisakei siuntos. K\u0105 daryti?`, { indent: { left: 360 } }),
    bodyP(`4. [Aplinka] Klas\u0117 kiekvien\u0105 dien\u0105 \u017Ei\u016Bri YouTube video per pietaus pertrauk\u0105. Ar tai turi poveik\u012F aplinkai? Kaip?`, { indent: { left: 360 } }),
    bodyP(`5. [Mi\u0161rus] Draugas si\u016Blo parsisi\u0173sti nemokam\u0105 \u017Eaidim\u0105 i\u0161 ne\u017Einomo \u0161altinio. Kokie pavojai? K\u0105 daryti?`, { indent: { left: 360 } }),
    bodyP(`6. [Mi\u0161rus] Mokinys naudoja t\u0105 pat\u012F slapta\u017Eod\u012F visoms paskyroms ir niekada neatnaujina telefono OS. Kokios rizikos?`, { indent: { left: 360 } }),

    bodyP([t("Stipresniems mokiniams:", { bold: true, color: C.LABEL })], {}),
    bodyP("Papildomas i\u0161\u0161\u016Bkis: sugalvoti savo scenarij\u0173, kuris apima bent 2 saugos sritis vienu metu."),
    spacer(),

    // EXIT RETRIEVAL
    phaseHeader("Pamokos pabaigos klausimai", "~3 min.", C.RETRIEVAL_BG, C.RETRIEVAL_ACCENT),
    labeledP("Formatas:", "\u017Eodinis. Klausimai skaidr\u0117je.", { keepNext: true }),
    q(1, "Kuri\u0105 saugos srit\u012F da\u017Eniausiai pa\u017Eeid\u017Eia j\u016Bs\u0173 bendraam\u017Eiai? Kod\u0117l taip manote?", C.RETRIEVAL_ACCENT),
    q(2, "Pateikite vien\u0105 pavyzd\u012F, kaip vienas veiksmas gali palie\u0161ti ir skaitmenin\u0119 saug\u0105, ir aplink\u0105.", C.RETRIEVAL_ACCENT),
    spacer(),

    hr(),
    new Paragraph({ spacing: { after: 80 }, children: [t("PAMOKOS APRA\u0160YMAS (DIENYNUI)", { bold: true, color: C.DIARY_ACCENT })] }),
    new Paragraph({ spacing: { after: 80 }, children: [
      t("Integravimo pamokoje mokiniai pritaik\u0117 vis\u0173 keturi\u0173 saugos tem\u0173 \u017Einias (ergonomika, privatumas, internetin\u0117s rizikos, aplinkos poveikis) analizuodami naujus scenarijus. Kiekvienoje situacijoje identifikavo problem\u0105, prisiminė atitinkam\u0105 taisykl\u0119 ir pasi\u016Bl\u0117 konkret\u0173 veiksm\u0105.",
        { italics: true, color: C.BRIDGE, size: 21 }),
    ]}),
  ];
  return { children, outPath: `${base}/005_I - Scenario rotation task/Teacher_Plan.docx` };
}

// ══════════════════════════════════════════════════════════════════
// LESSON 006 — Saugos kontrolinis s\u0105ra\u0161as + da\u017En\u0173 klaid\u0173 per\u017Ei\u016Bra
// ══════════════════════════════════════════════════════════════════
function buildLesson006() {
  const base = "C:/Users/Paulius/Documents/informatika-curriculum/Grade_9/Semester_1/01_Safety";
  const LQ = "\u201E"; const RQ = "\u201C";
  const children = [
    new Paragraph({ spacing: { after: 120 }, children: [t("Saugos kontrolinis s\u0105ra\u0161as + da\u017En\u0173 klaid\u0173 per\u017Ei\u016Bra", { bold: true, size: 36, color: C.TITLE_COLOR })] }),
    new Paragraph({ border: { bottom: { style: BorderStyle.SINGLE, size: 48, color: C.TITLE_LINE } }, spacing: { after: 200 } }),

    new Table({ layout: TableLayoutType.FIXED, columnWidths: [2400, 7200], borders: noBorders, rows: [
      metaRow("Tipas", "P \u2014 Pasiruo\u0161imo vertinimui pamoka (6 i\u0161 7 apie saug\u0105)"),
      metaRow("Klas\u0117", "9"),
      metaRow("Trukm\u0117", "~40 min."),
      metaRow("Forma", "Kartojimas + repeticija"),
      metaRow("Temos ribos", "Visos saugos modulio temos: ergonomika, privatumas, internetin\u0117s rizikos, aplinkos poveikis. Pamoka skirta pasiruo\u0161imui vertinimui \u2014 kartojimas, tipini\u0173 klaid\u0173 analiz\u0117, reprezentacin\u0117s u\u017Eduotys artimos vertinimo formatui."),
    ]}),
    spacer(),

    new Table({ layout: TableLayoutType.FIXED, columnWidths: [9600],
      rows: [new TableRow({ cantSplit: true, children: [
        new TableCell({
          shading: { type: ShadingType.CLEAR, fill: C.OBJ_BG },
          borders: { left: { style: BorderStyle.SINGLE, size: 64, color: C.OBJ_ACCENT }, top: { style: BorderStyle.SINGLE, size: 4, color: C.BORDER_LIGHT }, right: { style: BorderStyle.SINGLE, size: 4, color: C.BORDER_LIGHT }, bottom: { style: BorderStyle.SINGLE, size: 4, color: C.BORDER_LIGHT } },
          margins: { top: 120, bottom: 120, left: 120, right: 120 },
          children: [
            new Paragraph({ spacing: { after: 80 }, children: [t("PAMOKOS TIKSLAI", { bold: true, color: "4A148C" })] }),
            objBullet("Pakartoti ir susisteminti vis\u0173 4 saugos tem\u0173 pagrindines s\u0105vokas."),
            objBullet("I\u0161bandyti vertinimo formato u\u017Eduotis ir \u012Fsivertinti savo pasirengim\u0105."),
            new Paragraph({ spacing: { after: 0 }, children: [
              t("\u25B8 ", { bold: true, color: C.OBJ_ACCENT }),
              t("Identifikuoti savo silpn\u0105sias vietas ir suprasti, k\u0105 reikia pakartoti prie\u0161 vertinim\u0105."),
            ]}),
          ],
        }),
      ]})]
    }),
    spacer(),

    // ENTRY RETRIEVAL
    phaseHeader("Pamokos prad\u017Eios klausimai", "~4 min.", C.RETRIEVAL_BG, C.RETRIEVAL_ACCENT),
    labeledP("Formatas:", "\u017Eodinis. Klausimai skaidr\u0117je.", { keepNext: true }),
    bodyP([t("Greitas kartojimas (visos temos):", { bold: true })], { keepNext: true }),
    q(1, "\u012Evardinkite 3 ergonomikos principus.", C.RETRIEVAL_ACCENT),
    q(2, "K\u0105 daryti gavus \u012Ftartin\u0105 el. lai\u0161k\u0105? (3 \u017Eingsniai)", C.RETRIEVAL_ACCENT),
    q(3, "\u012Evardinkite 2 b\u016Bdus suma\u017Einti skaitmenin\u012F p\u0117dsak\u0105.", C.RETRIEVAL_ACCENT),
    bridge(`Ry\u0161ys: ${LQ}Kit\u0105 pamok\u0105 \u2014 vertinimas. \u0160iandien pasiruošime: pakartosime, pabandysime panašias u\u017Eduotis ir pamatysime, kur dar reikia pasitempti.${RQ}`),
    spacer(),

    // REVIEW + PRACTICE
    phaseHeader("Kartojimas ir reprezentacin\u0117s u\u017Eduotys", "~28 min.", C.APPLICATION_BG, C.APPLICATION_ACCENT),
    bodyP([t("1 dalis: Greitas kartojimas \u2014 ~8 min.", { bold: true, color: C.APPLICATION_ACCENT })], { keepNext: true }),
    bodyP("Skaidr\u0117se \u2014 pagrindin\u0117s s\u0105vokos trumpomis korel\u0117mis (ne ilgas d\u0117stymas). Kiekvienai temai ~2 min.:"),
    bodyP("  \u2022 Ergonomika: laikysena, 20-20-20, pertraukos, pratimai", { indent: { left: 360 } }),
    bodyP("  \u2022 Privatumas: stiprus slapta\u017Eodis, 2FA, jautr\u016Bs duomenys", { indent: { left: 360 } }),
    bodyP("  \u2022 Internetin\u0117s rizikos: phishing po\u017Eymiai, algoritmas sustoti-patikrinti-prane\u0161ti", { indent: { left: 360 } }),
    bodyP("  \u2022 Aplinkos poveikis: energija, e-atliekos, skaitmeninis p\u0117dsakas", { indent: { left: 360 } }),

    bodyP([t("2 dalis: Reprezentacin\u0117s u\u017Eduotys \u2014 ~15 min.", { bold: true, color: C.APPLICATION_ACCENT })], { keepNext: true }),
    bodyP("U\u017Eduotys \u017Eodžiu, artimos vertinimo formatui. Skaidr\u0117je rodomi klausimai, mokiniai atsako ir aptariame."),
    bodyP(`1. ${LQ}Slapta\u017Eodis 'Mokykla2024' \u2014 stiprus ar silpnas? Kod\u0117l? Kaip pagerinti?${RQ}`, { indent: { left: 360 } }),
    bodyP(`2. ${LQ}Apra\u0161ykite, kas yra 2FA ir kaip ji apsaugo paskyr\u0105.${RQ}`, { indent: { left: 360 } }),
    bodyP(`3. ${LQ}Kokie 3 po\u017Eymiai rodo, kad el. lai\u0161kas gali b\u016Bti phishing?${RQ}`, { indent: { left: 360 } }),
    bodyP(`4. ${LQ}Pateikite 2 konkrečius pavyzd\u017Eius, kaip mokinys gali suma\u017Einti savo skaitmenin\u012F p\u0117dsak\u0105.${RQ}`, { indent: { left: 360 } }),
    bodyP(`5. Scenarijus: ${LQ}Gauni \u017Einut\u0119 socialiniame tinkle nuo nepa\u017E\u012Fstamo \u017Emogaus, kuris si\u016Blo nemokam\u0105 dovan\u0105. K\u0105 daryti ir kod\u0117l?${RQ}`, { indent: { left: 360 } }),
    bodyP("Po kiekvien\u0173 2\u20133 klausim\u0173 \u2014 trumpas aptarimas ir teisingo atsakymo i\u0161skyrimas."),

    bodyP([t("3 dalis: Da\u017En\u0173 klaid\u0173 analiz\u0117 \u2014 ~5 min.", { bold: true, color: C.APPLICATION_ACCENT })], { keepNext: true }),
    bodyP("Parodykite skaidr\u0117je da\u017Eniausias klaidas i\u0161 ankstesni\u0173 pamok\u0173:"),
    warn("pai\u0161ti 2FA kaip dviej\u0173 slapta\u017Eod\u017Ei\u0173 turėjim\u0105.", "2FA = \u017Einojimas + tur\u0117jimas."),
    warn("galvoti, kad phishing ateina tik el. pa\u0161tu.", "Phishing = SMS, skambučiai, socialiniai tinklai."),
    warn("sakyti, kad e-atliekos \u2014 tik senus kompiuterius i\u0161mesti.", "E-atliekos = visi elektroniniai \u012Frenginiai, \u012Fskaitant laidus ir akumuliatorius."),
    spacer(),

    // EXIT RETRIEVAL
    phaseHeader("Pamokos pabaigos klausimai", "~3 min.", C.RETRIEVAL_BG, C.RETRIEVAL_ACCENT),
    labeledP("Formatas:", "\u017Eodinis. Klausimai skaidr\u0117je.", { keepNext: true }),
    q(1, "Kuri tema jums atrodo sunkiausia? Kod\u0117l?", C.RETRIEVAL_ACCENT),
    q(2, "K\u0105 dar reikia pakartoti prie\u0161 vertinim\u0105?", C.RETRIEVAL_ACCENT),
    spacer(),

    hr(),
    new Paragraph({ spacing: { after: 80 }, children: [t("PAMOKOS APRA\u0160YMAS (DIENYNUI)", { bold: true, color: C.DIARY_ACCENT })] }),
    new Paragraph({ spacing: { after: 80 }, children: [
      t("Pasiruo\u0161imo vertinimui pamokoje mokiniai pakartojo vis\u0173 keturi\u0173 saugos tem\u0173 pagrindines s\u0105vokas, atliko vertinimo formatui artimas u\u017Eduotis ir i\u0161nagrin\u0117jo da\u017Eniausias klaidas. \u012Esivertino savo pasirengim\u0105 ir identifikavo sritis, kurias reikia sustiprinti.",
        { italics: true, color: C.BRIDGE, size: 21 }),
    ]}),
  ];
  return { children, outPath: `${base}/006_P - Safety checklist rehearsal + common mistake review/Teacher_Plan.docx` };
}

// ══════════════════════════════════════════════════════════════════
// LESSON 007 — Saugos strukt\u016Brinis vertinimas
// ══════════════════════════════════════════════════════════════════
function buildLesson007() {
  const base = "C:/Users/Paulius/Documents/informatika-curriculum/Grade_9/Semester_1/01_Safety";
  const children = [
    new Paragraph({ spacing: { after: 120 }, children: [t("Saugos strukt\u016Brinis vertinimas", { bold: true, size: 36, color: C.TITLE_COLOR })] }),
    new Paragraph({ border: { bottom: { style: BorderStyle.SINGLE, size: 48, color: C.TITLE_LINE } }, spacing: { after: 200 } }),

    new Table({ layout: TableLayoutType.FIXED, columnWidths: [2400, 7200], borders: noBorders, rows: [
      metaRow("Tipas", "A \u2014 Vertinimo pamoka (7 i\u0161 7 apie saug\u0105)"),
      metaRow("Klas\u0117", "9"),
      metaRow("Trukm\u0117", "~40 min."),
      metaRow("Forma", "Trumpa instrukcija \u2192 vertinimo u\u017Eduotis"),
      metaRow("Temos ribos", "Visos saugos modulio temos: ergonomika, privatumas ir paskyr\u0173 sauga, internetin\u0117s rizikos, aplinkos poveikis. Strukt\u016Brinis vertinimas apima \u017Eini\u0173 ir taikymo klausimus."),
    ]}),
    spacer(),

    new Table({ layout: TableLayoutType.FIXED, columnWidths: [9600],
      rows: [new TableRow({ cantSplit: true, children: [
        new TableCell({
          shading: { type: ShadingType.CLEAR, fill: C.OBJ_BG },
          borders: { left: { style: BorderStyle.SINGLE, size: 64, color: C.OBJ_ACCENT }, top: { style: BorderStyle.SINGLE, size: 4, color: C.BORDER_LIGHT }, right: { style: BorderStyle.SINGLE, size: 4, color: C.BORDER_LIGHT }, bottom: { style: BorderStyle.SINGLE, size: 4, color: C.BORDER_LIGHT } },
          margins: { top: 120, bottom: 120, left: 120, right: 120 },
          children: [
            new Paragraph({ spacing: { after: 80 }, children: [t("PAMOKOS TIKSLAI", { bold: true, color: "4A148C" })] }),
            objBullet("Pademonstruoti saugos modulio \u017Eini\u0173 \u012Fsisavinim\u0105 atsakant \u012F strukt\u016Brinius klausimus."),
            new Paragraph({ spacing: { after: 0 }, children: [
              t("\u25B8 ", { bold: true, color: C.OBJ_ACCENT }),
              t("Pritaikyti i\u0161moktas taisykles naujose situacijose analizuojant scenarijus."),
            ]}),
          ],
        }),
      ]})]
    }),
    spacer(),

    // INSTRUCTION PHASE
    phaseHeader("Trumpas paai\u0161kinimas", "~3 min.", C.TEACHING_BG, C.TEACHING_ACCENT),
    bodyP("Paai\u0161kinkite vertinimo format\u0105:", { keepNext: true }),
    bodyP("  \u2022 Testas Testmoz platformoje", { indent: { left: 360 } }),
    bodyP("  \u2022 Klausim\u0173 tipai: u\u017Edari (pasirinkimas), trumpi atviri, scenarij\u0173 analiz\u0117", { indent: { left: 360 } }),
    bodyP("  \u2022 Visos 4 temos: ergonomika, privatumas, internetin\u0117s rizikos, aplinkos poveikis", { indent: { left: 360 } }),
    bodyP("  \u2022 Laikas: ~35 min.", { indent: { left: 360 } }),
    bodyP("  \u2022 Dirba individualiai, be pagalbini\u0173 priemoni\u0173", { indent: { left: 360 } }),
    bodyP("Nurodykite Testmoz nuorod\u0105 skaidr\u0117je arba Google Classroom."),
    spacer(),

    // ASSESSMENT
    phaseHeader("Vertinimo u\u017Eduotis", "~35 min.", C.APPLICATION_BG, C.APPLICATION_ACCENT),
    bodyP("Mokiniai dirba individualiai prie kompiuterio. Testmoz testas.", { keepNext: true }),
    bodyP([t("Klausim\u0173 strukt\u016Bra (orientacin\u0117):", { bold: true, color: C.APPLICATION_ACCENT })]),
    bodyP("  \u2022 2\u20133 u\u017Edari klausimai (pasirinkimas) i\u0161 kiekvienos temos", { indent: { left: 360 } }),
    bodyP("  \u2022 2\u20133 trumpi atviri klausimai (apibr\u0117\u017Eimas, paai\u0161kinimas)", { indent: { left: 360 } }),
    bodyP("  \u2022 1\u20132 scenarij\u0173 analiz\u0117s klausimai (situacija \u2192 identifikuoti problem\u0105 \u2192 pasi\u016Blyti sprendim\u0105)", { indent: { left: 360 } }),
    bodyP("Vaikščiokite po klas\u0119 \u2014 steb\u0117kite, ar mokiniai dirba savarankiškai."),
    bodyP("Baigusiems anksčiau \u2014 leisti per\u017Ei\u016Br\u0117ti atsakymus, bet ne keisti jau pateikt\u0173."),
    spacer(),

    // DIARY
    hr(),
    new Paragraph({ spacing: { after: 80 }, children: [t("PAMOKOS APRA\u0160YMAS (DIENYNUI)", { bold: true, color: C.DIARY_ACCENT })] }),
    new Paragraph({ spacing: { after: 80 }, children: [
      t("Pamokoje mokiniai atliko strukt\u016Brin\u012F saugos modulio vertinim\u0105 Testmoz platformoje. Testas apima visas keturias modulio temas: ergonomik\u0105, privatumo ir paskyr\u0173 saug\u0105, internetines rizikas ir skaitmenini\u0173 technologij\u0173 poveik\u012F aplinkai. Klausimai apima tiek \u017Einias, tiek j\u0173 pritaikym\u0105 analizuojant scenarijus.",
        { italics: true, color: C.BRIDGE, size: 21 }),
    ]}),
  ];
  return { children, outPath: `${base}/007_A - Safety structured assessment/Teacher_Plan.docx` };
}
