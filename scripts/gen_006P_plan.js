const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, TableLayoutType, BorderStyle, ShadingType } = require("docx");
const fs = require("fs");

// Color palette
const C = {
  RETRIEVAL_BG: "FFF3E0", RETRIEVAL_ACCENT: "F57C00",
  TEACHING_BG: "E3F2FD", TEACHING_ACCENT: "1565C0",
  APPLICATION_BG: "E8F5E9", APPLICATION_ACCENT: "2E7D32",
  DIARY_ACCENT: "757575",
  META_BG: "F8F9FA",
  OBJ_BG: "EDE7F6", OBJ_ACCENT: "5E35B1",
  WARNING_BG: "FFF8E1", WARNING_TEXT: "E65100",
  BORDER_LIGHT: "E0E0E0",
  TITLE_COLOR: "1A237E", TITLE_LINE: "1565C0",
  BODY: "212121", LABEL: "424242", MUTED: "757575", BRIDGE: "616161",
};

const NONE_BORDER = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
const noBorders = { top: NONE_BORDER, bottom: NONE_BORDER, left: NONE_BORDER, right: NONE_BORDER };

function txt(text, opts = {}) {
  return new TextRun({ font: "Arial", size: 22, color: C.BODY, ...opts, text });
}

function bodyPara(children, extra = {}) {
  return new Paragraph({ spacing: { after: 80 }, ...extra, children: Array.isArray(children) ? children : [children] });
}

function phaseHeader(title, time, bgColor, accentColor) {
  return new Table({
    layout: TableLayoutType.FIXED,
    columnWidths: [200, 9400],
    borders: noBorders,
    rows: [new TableRow({
      cantSplit: true,
      children: [
        new TableCell({
          shading: { type: ShadingType.CLEAR, fill: accentColor },
          children: [new Paragraph({})],
          width: { size: 200, type: WidthType.DXA },
          borders: noBorders,
        }),
        new TableCell({
          shading: { type: ShadingType.CLEAR, fill: bgColor },
          children: [new Paragraph({
            children: [
              txt(title, { bold: true, color: accentColor, size: 24 }),
              txt(" \u2014 " + time, { color: C.MUTED, size: 20 }),
            ],
          })],
          width: { size: 9400, type: WidthType.DXA },
          borders: noBorders,
        }),
      ],
    })],
  });
}

function question(num, text, accentColor) {
  return new Paragraph({
    indent: { left: 360 },
    spacing: { after: 60 },
    children: [
      txt(num + ". ", { bold: true, color: accentColor }),
      txt(text),
    ],
  });
}

function labeledText(label, value, extra = {}) {
  return bodyPara([
    txt(label, { bold: true, color: C.LABEL }),
    txt(value),
  ], extra);
}

function warningBox(mistake, rule) {
  return new Paragraph({
    indent: { left: 240 },
    shading: { type: ShadingType.CLEAR, fill: C.WARNING_BG },
    spacing: { before: 80, after: 80 },
    keepLines: true,
    children: [
      txt("\u26A0 Dažna klaida: ", { bold: true, color: C.WARNING_TEXT }),
      txt(mistake + " "),
      txt("Taisyklė: " + rule, { bold: true }),
    ],
  });
}

function spacer(before = 200) {
  return new Paragraph({ spacing: { before } });
}

// Build document
const title = "Saugos kontrolinis sąrašas ir dažnų klaidų peržiūra";

const doc = new Document({
  sections: [{
    properties: {
      page: {
        size: { width: 11906, height: 16838 },
        margin: { top: 1134, bottom: 1134, left: 1134, right: 1134 },
      },
    },
    children: [
      // 1. TITLE
      new Paragraph({
        spacing: { after: 120 },
        children: [txt(title, { bold: true, size: 36, color: C.TITLE_COLOR })],
      }),
      new Paragraph({
        border: { bottom: { style: BorderStyle.SINGLE, size: 48, color: C.TITLE_LINE } },
        spacing: { after: 200 },
      }),

      // 2. METADATA CARD
      (function() {
        const metaRows = [
          ["Tipas", "P \u2014 Pasiruošimo vertinimui pamoka (6 iš 7 saugos modulyje)"],
          ["Klasė", "9"],
          ["Trukmė", "~40 min."],
          ["Forma", "Kartojimas + repeticija (~25/75)"],
          ["Temos ribos", "Pamoka apima visų keturių saugos temų kartojimą: ergonomika, privatumas ir paskyrų sauga, internetinės rizikos, skaitmeninių technologijų poveikis aplinkai. Naujos teorijos nėra. Mokiniai atlieka vertinimo formatui artimas užduotis ir peržiūri dažniausias klaidas prieš vertinimą."],
        ];
        const thinBottom = { style: BorderStyle.SINGLE, size: 4, color: "EEEEEE" };
        return new Table({
          layout: TableLayoutType.FIXED,
          columnWidths: [2400, 7200],
          borders: noBorders,
          rows: metaRows.map(([label, value]) => new TableRow({
            children: [
              new TableCell({
                shading: { type: ShadingType.CLEAR, fill: C.META_BG },
                borders: { ...noBorders, bottom: thinBottom },
                margins: { top: 60, bottom: 60, left: 120, right: 120 },
                width: { size: 2400, type: WidthType.DXA },
                children: [bodyPara(txt(label, { bold: true, color: C.LABEL }))],
              }),
              new TableCell({
                shading: { type: ShadingType.CLEAR, fill: C.META_BG },
                borders: { ...noBorders, bottom: thinBottom },
                margins: { top: 60, bottom: 60, left: 120, right: 120 },
                width: { size: 7200, type: WidthType.DXA },
                children: [bodyPara(txt(value))],
              }),
            ],
          })),
        });
      })(),

      // 3. OBJECTIVES
      spacer(),
      (function() {
        const objectives = [
          "Pakartoti ir susisteminti visų 4 saugos temų pagrindines sąvokas.",
          "Išbandyti vertinimo formato užduotis ir įsivertinti savo pasirengimą.",
          "Identifikuoti savo silpnąsias vietas ir suprasti, ką reikia pakartoti prieš vertinimą.",
        ];
        return new Table({
          layout: TableLayoutType.FIXED,
          columnWidths: [9600],
          rows: [new TableRow({
            cantSplit: true,
            children: [new TableCell({
              shading: { type: ShadingType.CLEAR, fill: C.OBJ_BG },
              borders: {
                left: { style: BorderStyle.SINGLE, size: 64, color: C.OBJ_ACCENT },
                top: { style: BorderStyle.SINGLE, size: 4, color: C.BORDER_LIGHT },
                right: { style: BorderStyle.SINGLE, size: 4, color: C.BORDER_LIGHT },
                bottom: { style: BorderStyle.SINGLE, size: 4, color: C.BORDER_LIGHT },
              },
              margins: { top: 120, bottom: 120, left: 120, right: 120 },
              children: [
                new Paragraph({
                  spacing: { after: 80 },
                  children: [txt("PAMOKOS TIKSLAI", { bold: true, color: "4A148C" })],
                }),
                ...objectives.map(o => new Paragraph({
                  spacing: { after: 60 },
                  children: [
                    txt("\u25B8 ", { bold: true, color: C.OBJ_ACCENT }),
                    txt(o),
                  ],
                })),
              ],
            })],
          })],
        });
      })(),

      // 4. ENTRY RETRIEVAL
      spacer(),
      phaseHeader("Pamokos pradžios klausimai", "~4 min.", C.RETRIEVAL_BG, C.RETRIEVAL_ACCENT),
      labeledText("Formatas: ", "žodinis. Klausimai skaidrėje.", { keepNext: true }),
      new Paragraph({
        indent: { left: 240 },
        spacing: { after: 60 },
        children: [txt("(Klausimai iš integravimo pamokos ir ankstesnių temų \u2014 aktyvuoti visą saugos modulio turinį.)", { italics: true, color: C.BRIDGE, size: 20 })],
      }),
      question(1, "Integravimo pamokoje analizavote saugos scenarijus. Kokius tris žingsnius taikėte kiekvienoje situacijoje?", C.RETRIEVAL_ACCENT),
      question(2, "Viename iš scenarijų reikėjo atpažinti phishing. Kokie požymiai padėjo atskirti tikrą laišką nuo suklastoto?", C.RETRIEVAL_ACCENT),
      question(3, "Kuo skiriasi ergonomikos problema nuo skaitmeninės saugos problemos? Pateikite po vieną pavyzdį.", C.RETRIEVAL_ACCENT),

      // 5. REVIEW + ASSESSMENT OVERVIEW
      spacer(),
      phaseHeader("Vertinimo formato apžvalga ir kartojimas", "~7 min.", C.TEACHING_BG, C.TEACHING_ACCENT),
      bodyPara(txt("Trumpai pristatykite vertinimo struktūrą ir lūkesčius:"), { keepNext: true }),
      bodyPara([
        txt("Vertinimo formatas: ", { bold: true, color: C.LABEL }),
        txt("testas Testmoz platformoje. Klausimų tipai: uždari (pasirinkimas iš kelių variantų), trumpi atviri atsakymai, scenarijų analizė."),
      ]),
      bodyPara(txt("Paaiškinkite, kad vertinime bus klausimai iš visų keturių temų. Parodykite skaidrėje saugos temų kontrolinį sąrašą:")),
      bodyPara([txt("1. ", { bold: true, color: C.TEACHING_ACCENT }), txt("Ergonomika: laikysena, ekrano padėtis, 20-20-20 taisyklė, pertraukų svarba, nuovargį šalinantys pratimai.")]),
      bodyPara([txt("2. ", { bold: true, color: C.TEACHING_ACCENT }), txt("Privatumas ir paskyrų sauga: stipraus slaptažodžio kriterijai, 2FA veikimo logika, jautrūs asmeniniai duomenys.")]),
      bodyPara([txt("3. ", { bold: true, color: C.TEACHING_ACCENT }), txt("Internetinės rizikos: phishing požymiai, socialinė inžinerija, melagienos, algoritmas SUSTOTI\u2192PATIKRINTI\u2192PRANEŠTI.")]),
      bodyPara([txt("4. ", { bold: true, color: C.TEACHING_ACCENT }), txt("Aplinkos poveikis: energijos suvartojimas, e-atliekos, skaitmeninis pėdsakas, ST nauda aplinkai.")]),
      bodyPara(txt("Pabrėžkite: vertinime svarbu ne tik prisiminti sąvokas, bet ir pritaikyti jas scenarijuose bei argumentuoti savo atsakymą.")),

      // 6. REPRESENTATIVE TASKS
      spacer(),
      phaseHeader("Reprezentacinės užduotys", "~20 min.", C.APPLICATION_BG, C.APPLICATION_ACCENT),
      bodyPara(txt("Mokiniai dirba individualiai. Užduotys artimos vertinimo formatui. Instrukcijos skaidrėje."), { keepNext: true }),

      bodyPara(txt("1 dalis: trumpieji klausimai (~8 min.)", { bold: true, color: C.APPLICATION_ACCENT })),
      bodyPara(txt("Parodykite skaidrėje 6 klausimus. Mokiniai atsako žodžiu, kai paklausiami. Po kiekvieno klausimo trumpai aptarkite teisingą atsakymą.")),

      question(1, "Koks yra rekomenduojamas atstumas nuo akių iki ekrano ir kodėl jis svarbus?", C.APPLICATION_ACCENT),
      question(2, "Kodėl dviejų veiksnių autentifikacija (2FA) apsaugo net tada, kai slaptažodis pavogtas?", C.APPLICATION_ACCENT),
      question(3, "Kas yra socialinė inžinerija ir kuo ji skiriasi nuo phishing?", C.APPLICATION_ACCENT),
      question(4, "Kodėl srautinis vaizdo įrašas sunaudoja daugiau energijos nei tekstinė žinutė?", C.APPLICATION_ACCENT),
      question(5, "Įvardinkite du e-atliekų pavojus aplinkai.", C.APPLICATION_ACCENT),
      question(6, "Kokie yra trys pagrindiniai stipraus slaptažodžio kriterijai?", C.APPLICATION_ACCENT),

      warningBox(
        "mokiniai atsako bendrai: \u201Eslaptažodis turi būti stiprus\u201C, be konkrečių kriterijų.",
        "reikalaukite tikslių kriterijų: ilgis (12+ simbolių), simbolių įvairovė (didžiosios, mažosios, skaičiai, specialieji), ne asmeninė informacija."
      ),

      bodyPara(txt("2 dalis: scenarijų analizė (~12 min.)", { bold: true, color: C.APPLICATION_ACCENT })),
      bodyPara(txt("Parodykite skaidrėje 3 scenarijus. Kiekvienam mokiniai turi: (a) identifikuoti problemą, (b) nurodyti taisyklę ar principą, (c) pasiūlyti konkretų veiksmą.")),

      bodyPara([txt("A scenarijus: ", { bold: true, color: C.LABEL }), txt("\u201EGavote el. laišką iš banko, kuriame prašoma skubiai patvirtinti savo duomenis paspaudus nuorodą. Laiškas turi banko logotipą, bet siuntėjo adresas yra info@bnak-lt.com.\u201C")]),
      bodyPara([txt("Tikėtinas atsakymas: ", { italics: true, color: C.BRIDGE }), txt("phishing (neteisingas domeno vardas, skubos spaudimas). Veiksmas: nespausti nuorodos, pranešti suaugusiajam arba IT skyriui.")], { indent: { left: 240 } }),

      bodyPara([txt("B scenarijus: ", { bold: true, color: C.LABEL }), txt("\u201EMokinys 6 valandas iš eilės rašo referatą kompiuteriu. Jaučia nugaros skausmą ir akių ašarojimą.\u201C")]),
      bodyPara([txt("Tikėtinas atsakymas: ", { italics: true, color: C.BRIDGE }), txt("ergonomikos pažeidimas (nėra pertraukų, netaikoma 20-20-20 taisyklė). Veiksmas: daryti pertrauką kas 45\u201360 min., taikyti 20-20-20 taisyklę, atlikti akių ir nugaros pratimus.")], { indent: { left: 240 } }),

      bodyPara([txt("C scenarijus: ", { bold: true, color: C.LABEL }), txt("\u201EMokykla keičia 200 senų kompiuterių naujais. Senus kompiuterius planuojama išmesti į buitinių atliekų konteinerį.\u201C")]),
      bodyPara([txt("Tikėtinas atsakymas: ", { italics: true, color: C.BRIDGE }), txt("e-atliekų problema (pavojingos medžiagos: švinas, gyvsidabris). Veiksmas: atiduoti specializuotam e-atliekų perdirbėjui, ne mesti su buitinėmis atliekomis.")], { indent: { left: 240 } }),

      warningBox(
        "mokiniai nurodo problemą, bet nepasiūlo konkretaus veiksmo arba veiksmas per bendras (\u201Ereikia būti atsargiam\u201C).",
        "reikalaukite konkretaus veiksmo: \u201Enespausti nuorodos ir pranešti IT skyriui\u201C, \u201Edaryti pertrauką kas 45 min.\u201C, \u201Eatiduoti e-atliekų surinkimo punktui\u201C."
      ),

      bodyPara(txt("Po scenarijų aptarimo paklauskite klasės: kurioje temoje jaučiatės mažiausiai tikri? Tai padės mokiniams suprasti, ką dar reikia pakartoti.")),

      // 7. EXIT RETRIEVAL
      spacer(),
      phaseHeader("Pamokos pabaigos klausimai", "~3 min.", C.RETRIEVAL_BG, C.RETRIEVAL_ACCENT),
      labeledText("Formatas: ", "žodinis. Klausimai skaidrėje."),
      question(1, "Kokia saugos tema jums atrodo sunkiausia ir kodėl?", C.RETRIEVAL_ACCENT),
      question(2, "Įvardinkite vieną konkretų dalyką, kurį dar reikia pakartoti prieš vertinimą.", C.RETRIEVAL_ACCENT),
      question(3, "Kas šiandien buvo naudingiausia jūsų pasirengimui?", C.RETRIEVAL_ACCENT),

      // DIARY ENTRY
      spacer(),
      new Paragraph({
        border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: C.DIARY_ACCENT } },
        spacing: { after: 80 },
        keepNext: true,
      }),
      new Paragraph({
        spacing: { after: 80 },
        children: [txt("PAMOKOS APRAŠYMAS (DIENYNUI)", { bold: true, color: C.DIARY_ACCENT })],
      }),
      new Paragraph({
        spacing: { after: 80 },
        children: [txt(
          "Pamokoje mokiniai ruošėsi saugos vertinimui: peržiūrėjo kontrolinį sąrašą su visomis keturiomis temomis (ergonomika, privatumas, internetinės rizikos, aplinkos poveikis), atsakė į vertinimo formatui artimus klausimus ir analizavo tris scenarijus, taikydami problemų identifikavimo ir sprendimo logiką. Aptartos dažniausios klaidos: per bendri atsakymai be konkrečių kriterijų, veiksmo nepasiūlymas scenarijuose. Mokiniai įsivertino savo pasirengimą ir nustatė silpnąsias sritis.",
          { italics: true, color: C.BRIDGE, size: 21 }
        )],
      }),
    ],
  }],
});

const outPath = process.argv[2] || "Teacher_Plan.docx";
Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync(outPath, buf);
  console.log("OK: " + outPath + " (" + buf.length + " bytes)");
}).catch(err => {
  console.error("FAIL:", err.message);
  process.exit(1);
});
