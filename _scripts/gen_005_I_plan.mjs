import { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, BorderStyle, ShadingType, TableLayoutType, AlignmentType } from 'docx';
import { writeFileSync } from 'fs';

// ── Color palette ──
const C = {
  RETRIEVAL_BG: 'FFF3E0', RETRIEVAL_ACCENT: 'F57C00',
  TEACHING_BG: 'E3F2FD', TEACHING_ACCENT: '1565C0',
  APPLICATION_BG: 'E8F5E9', APPLICATION_ACCENT: '2E7D32',
  DIARY_ACCENT: '757575',
  META_BG: 'F8F9FA',
  OBJ_BG: 'EDE7F6', OBJ_ACCENT: '5E35B1',
  BORDER_LIGHT: 'E0E0E0',
  TITLE_COLOR: '1A237E', TITLE_LINE: '1565C0',
  TABLE_HEADER: 'E3F2FD', TABLE_ALT: 'FAFAFA',
  WARNING_BG: 'FFF8E1', WARNING_TEXT: 'E65100',
  BODY: '212121', LABEL: '424242', SUBTLE: '757575', BRIDGE: '616161',
};

const noBorders = {
  top: { style: BorderStyle.NONE, size: 0 },
  bottom: { style: BorderStyle.NONE, size: 0 },
  left: { style: BorderStyle.NONE, size: 0 },
  right: { style: BorderStyle.NONE, size: 0 },
};

const font = (text, opts = {}) => new TextRun({
  text, font: 'Arial', size: opts.size || 22, color: opts.color || C.BODY,
  bold: opts.bold, italics: opts.italics,
});

// ── Helpers ──
function phaseHeader(title, time, bgColor, accentColor) {
  return new Table({
    layout: TableLayoutType.FIXED, columnWidths: [200, 9400],
    borders: noBorders,
    rows: [new TableRow({ cantSplit: true, children: [
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
            font(title, { bold: true, color: accentColor, size: 24 }),
            font(` — ${time}`, { color: C.SUBTLE, size: 20 }),
          ],
        })],
        width: { size: 9400, type: WidthType.DXA },
        borders: noBorders,
      }),
    ]})],
  });
}

function question(num, text, accentColor) {
  return new Paragraph({
    indent: { left: 360 }, spacing: { after: 60 },
    children: [
      font(`${num}. `, { bold: true, color: accentColor }),
      font(text),
    ],
  });
}

function label(lbl, value) {
  return new Paragraph({
    spacing: { after: 80 },
    children: [
      font(`${lbl} `, { bold: true, color: C.LABEL }),
      font(value),
    ],
  });
}

function body(text, opts = {}) {
  return new Paragraph({
    spacing: { after: opts.after || 80 },
    keepNext: opts.keepNext,
    keepLines: opts.keepLines,
    indent: opts.indent ? { left: opts.indent } : undefined,
    children: [font(text, { bold: opts.bold, italics: opts.italics, color: opts.color })],
  });
}

function spacer(before = 200) {
  return new Paragraph({ spacing: { before } });
}

function hrule(color = C.SUBTLE, size = 8) {
  return new Paragraph({
    border: { bottom: { style: BorderStyle.SINGLE, size, color } },
    spacing: { after: 100 },
    keepNext: true,
  });
}

function objective(text) {
  return new Paragraph({
    spacing: { after: 60 },
    children: [
      font('▸ ', { bold: true, color: C.OBJ_ACCENT }),
      font(text),
    ],
  });
}

function warning(mistake, rule) {
  return new Paragraph({
    indent: { left: 240 },
    shading: { type: ShadingType.CLEAR, fill: C.WARNING_BG },
    spacing: { before: 80, after: 80 }, keepLines: true,
    children: [
      font('⚠ Dažna klaida: ', { bold: true, color: C.WARNING_TEXT }),
      font(`${mistake} `),
      font(`Taisyklė: ${rule}`, { bold: true }),
    ],
  });
}

// ── Metadata card ──
function metaCard(rows) {
  const cellBorders = {
    top: { style: BorderStyle.NONE, size: 0 },
    bottom: { style: BorderStyle.SINGLE, size: 4, color: 'EEEEEE' },
    left: { style: BorderStyle.NONE, size: 0 },
    right: { style: BorderStyle.NONE, size: 0 },
  };
  const cellMargins = { top: 60, bottom: 60, left: 120, right: 120 };
  return new Table({
    layout: TableLayoutType.FIXED, columnWidths: [2400, 7200],
    borders: noBorders,
    rows: rows.map(([lbl, val]) => new TableRow({
      children: [
        new TableCell({
          shading: { type: ShadingType.CLEAR, fill: C.META_BG },
          borders: cellBorders, margins: cellMargins,
          width: { size: 2400, type: WidthType.DXA },
          children: [new Paragraph({ children: [font(lbl, { bold: true, color: C.LABEL })] })],
        }),
        new TableCell({
          shading: { type: ShadingType.CLEAR, fill: C.META_BG },
          borders: cellBorders, margins: cellMargins,
          width: { size: 7200, type: WidthType.DXA },
          children: [new Paragraph({ children: [font(val)] })],
        }),
      ],
    })),
  });
}

// ── Task table ──
function taskTable(headers, dataRows) {
  const cellMargins = { top: 60, bottom: 60, left: 120, right: 120 };
  const cellBorders = {
    top: { style: BorderStyle.SINGLE, size: 4, color: C.BORDER_LIGHT },
    bottom: { style: BorderStyle.SINGLE, size: 4, color: C.BORDER_LIGHT },
    left: { style: BorderStyle.SINGLE, size: 4, color: C.BORDER_LIGHT },
    right: { style: BorderStyle.SINGLE, size: 4, color: C.BORDER_LIGHT },
  };
  const headerRow = new TableRow({
    children: headers.map(h => new TableCell({
      shading: { type: ShadingType.CLEAR, fill: C.TABLE_HEADER },
      borders: cellBorders, margins: cellMargins,
      children: [new Paragraph({ children: [font(h, { bold: true, color: C.TEACHING_ACCENT })] })],
    })),
  });
  const rows = dataRows.map((row, i) => new TableRow({
    children: row.map(cell => new TableCell({
      shading: { type: ShadingType.CLEAR, fill: i % 2 === 1 ? C.TABLE_ALT : 'FFFFFF' },
      borders: cellBorders, margins: cellMargins,
      children: [new Paragraph({ children: [font(cell)] })],
    })),
  }));
  return new Table({
    layout: TableLayoutType.FIXED,
    columnWidths: [600, 4000, 5000],
    rows: [headerRow, ...rows],
  });
}

// ── Build document ──
const doc = new Document({
  sections: [{
    properties: {
      page: {
        size: { width: 11906, height: 16838 },
        margin: { top: 1134, bottom: 1134, left: 1134, right: 1134 },
      },
    },
    children: [
      // ═══ TITLE ═══
      new Paragraph({
        children: [font('Scenarijų rotacijos užduotis', { bold: true, size: 36, color: C.TITLE_COLOR })],
        spacing: { after: 120 },
      }),
      new Paragraph({
        border: { bottom: { style: BorderStyle.SINGLE, size: 48, color: C.TITLE_LINE } },
        spacing: { after: 200 },
      }),

      // ═══ METADATA ═══
      metaCard([
        ['Tipas', 'I — Integravimo pamoka (5 iš 7 apie saugumą)'],
        ['Klasė', '9'],
        ['Trukmė', '~40 min.'],
        ['Forma', 'Trumpas įvadas → ilga praktika'],
        ['Temos ribos', 'Mokiniai taiko visų keturių saugos temų žinias (ergonomika, privatumas, internetinės rizikos, aplinkos poveikis) analizuodami naujus scenarijus. Kiekvienoje situacijoje reikia identifikuoti problemą, prisiminti taisyklę ir pasiūlyti veiksmą. Naujos teorijos nepristatoma.'],
      ]),

      // ═══ OBJECTIVES ═══
      spacer(),
      new Table({
        layout: TableLayoutType.FIXED, columnWidths: [9600],
        rows: [new TableRow({ cantSplit: true, children: [new TableCell({
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
              children: [font('PAMOKOS TIKSLAI', { bold: true, color: '4A148C' })],
            }),
            objective('Pritaikyti žinias iš visų 4 saugos temų analizuojant naujus, nematytus scenarijus.'),
            objective('Raštu identifikuoti problemą, nurodyti taisyklę ir pasiūlyti konkretų veiksmą kiekvienam scenarijui.'),
            objective('Atskirti skirtingus saugos aspektus (fizinė, skaitmeninė, aplinkosauginė) konkrečiose situacijose.'),
          ],
        })]})],
      }),

      // ═══ PHASE 1: ENTRY RETRIEVAL ═══
      spacer(),
      phaseHeader('Pamokos pradžios klausimai', '~4 min.', C.RETRIEVAL_BG, C.RETRIEVAL_ACCENT),
      label('Formatas:', 'žodinis.'),
      new Paragraph({
        indent: { left: 240 }, spacing: { after: 80 },
        children: [font('(Klausimai apima visas 4 saugos sritis — po vieną iš kiekvienos L pamokos.)', { italics: true, color: C.BRIDGE, size: 20 })],
      }),
      question(1, 'Kokie 3 ergonomikos principai padeda išvengti nugaros skausmo dirbant kompiuteriu?', C.RETRIEVAL_ACCENT),
      question(2, 'Kodėl dviejų veiksnių autentifikacija apsaugo paskyrą, net jei slaptažodis pavogtas?', C.RETRIEVAL_ACCENT),
      question(3, 'Kokius 3 žingsnius reikia atlikti, kai gauni įtartiną el. laišką?', C.RETRIEVAL_ACCENT),
      question(4, 'Kodėl srautinis video sunaudoja daugiau energijos nei tekstinė žinutė?', C.RETRIEVAL_ACCENT),

      // ═══ PHASE 2: TASK PRESENTATION ═══
      spacer(),
      phaseHeader('Užduoties pristatymas', '~5 min.', C.TEACHING_BG, C.TEACHING_ACCENT),
      body('Skaidrėje parodykite vieną pavyzdinį scenarijų ir kartu su klase trumpai aptarkite sprendimo logiką (1–2 min.). Tai vienintelis bendras aptarimas — likę scenarijai sprendžiami individualiai.', { keepNext: true }),
      body('Paaiškinkite užduotį ir vertinimo kriterijus. Instrukcijos lieka skaidrėje visą pamoką:', { keepNext: true }),
      spacer(80),
      body('Užduotis: gavote 6 scenarijus iš skirtingų saugos sričių. Kiekvienam scenarijui užpildykite lentelę Google Classroom dokumente:', { bold: true, keepNext: true }),
      spacer(80),
      taskTable(
        ['#', 'Stulpelis', 'Ką rašyti'],
        [
          ['1', 'Saugos sritis', 'Kurios saugos srities problema? (ergonomika / privatumas / internetinės rizikos / aplinkos poveikis)'],
          ['2', 'Problema', 'Kokia konkreti rizika ar klaida aprašyta scenarijuje? (1 sakinys)'],
          ['3', 'Taisyklė', 'Kokį L pamokose išmoktą principą ar taisyklę čia reikia taikyti?'],
          ['4', 'Veiksmas', 'Ką konkrečiai darytumėte šioje situacijoje? (2–3 sakiniai)'],
          ['5', 'Pagrindimas', 'Kodėl jūsų pasirinktas veiksmas yra tinkamas? (1–2 sakiniai)'],
        ],
      ),
      spacer(80),
      body('Laikas: 23 minutės. Stipresniems — papildoma užduotis baigus visus 6.', { bold: true }),

      // ═══ PHASE 3: WORK BLOCK ═══
      spacer(),
      new Paragraph({ pageBreakBefore: true }),
      phaseHeader('Darbo blokas', '~23 min.', C.APPLICATION_BG, C.APPLICATION_ACCENT),
      body('Mokiniai dirba individualiai. Scenarijai ir lentelė pateikti Google Classroom dokumente.', { keepNext: true }),
      spacer(80),
      body('Scenarijai:', { bold: true, keepNext: true }),

      // Scenario 1
      new Paragraph({
        indent: { left: 360 }, spacing: { after: 80 },
        children: [
          font('1. ', { bold: true, color: C.APPLICATION_ACCENT }),
          font('[Ergonomika] '),
          font('Mokinys žaidžia kompiuterinį žaidimą 3 valandas be pertraukos. Sėdi sulinkęs, ekranas per arti, rankos pakelta aukščiau alkūnių. Po žaidimo skauda nugarą ir akis.', { italics: true }),
        ],
      }),
      // Scenario 2
      new Paragraph({
        indent: { left: 360 }, spacing: { after: 80 },
        children: [
          font('2. ', { bold: true, color: C.APPLICATION_ACCENT }),
          font('[Privatumas] '),
          font('Draugas prašo pasidalinti „Netflix" paskyros slaptažodžiu. Mokinys naudoja tą patį slaptažodį ir el. paštui, ir socialiniams tinklams.', { italics: true }),
        ],
      }),
      // Scenario 3
      new Paragraph({
        indent: { left: 360 }, spacing: { after: 80 },
        children: [
          font('3. ', { bold: true, color: C.APPLICATION_ACCENT }),
          font('[Internetinės rizikos] '),
          font('Ateina el. laiškas nuo „bank@lltuvos-bankas.com" su prašymu skubiai patvirtinti tapatybę per nuorodą, kitaip paskyra bus užblokuota.', { italics: true }),
        ],
      }),
      // Scenario 4
      new Paragraph({
        indent: { left: 360 }, spacing: { after: 80 },
        children: [
          font('4. ', { bold: true, color: C.APPLICATION_ACCENT }),
          font('[Aplinkos poveikis] '),
          font('Klasiokas sako: „Aš kasdien žiūriu 4 val. TikTok, bet tai tik telefonas — jokio poveikio aplinkai." Ar jis teisus?', { italics: true }),
        ],
      }),
      // Scenario 5
      new Paragraph({
        indent: { left: 360 }, spacing: { after: 80 },
        children: [
          font('5. ', { bold: true, color: C.APPLICATION_ACCENT }),
          font('[Privatumas + 2FA] '),
          font('Mokinio Instagram paskyra nulaužta. Paaiškėja, kad slaptažodis buvo „Futbolas123" ir dviejų veiksnių autentifikacija nebuvo įjungta. Ką daryti dabar ir ką reikėjo daryti anksčiau?', { italics: true }),
        ],
      }),
      // Scenario 6
      new Paragraph({
        indent: { left: 360 }, spacing: { after: 80 },
        children: [
          font('6. ', { bold: true, color: C.APPLICATION_ACCENT }),
          font('[Socialinė inžinerija] '),
          font('Per „Discord" nepažįstamas asmuo, prisistato mokyklos IT administratoriumi ir prašo atsiųsti prisijungimo duomenis „sistemos atnaujinimui."', { italics: true }),
        ],
      }),

      spacer(80),
      body('Mokytojo veiksmai:', { bold: true }),
      body('Vaikščiokite po klasę. Nekonsultuokite bendrai — dirbkite individualiai.'),
      spacer(40),
      body('Tiksliniai klausimai, jei mokinys stringa:', { bold: true }),
      body('• „Kokios srities tai problema — fizinė, skaitmeninė ar aplinkos?"', { indent: 360 }),
      body('• „Kokią taisyklę ar principą mokėmės L pamokoje apie šią sritį?"', { indent: 360 }),
      body('• „Kas nutiktų, jei nieko nedarytum?"', { indent: 360 }),

      spacer(80),
      warning(
        'mokinys rašo „reikia būti atsargiam" — per bendras atsakymas.',
        'reikalauti konkrečių veiksmų, pvz., „pakeisti slaptažodį", „taikyti 20-20-20", „patikrinti domeno pavadinimą".',
      ),

      spacer(80),
      body('Silpnesniems mokiniams:', { bold: true }),
      body('Pasiūlykite pradėti nuo 1-o arba 4-o scenarijaus (aiškiausios situacijos). Jei mokinys neįsitraukia per 3 min. — nurodykite konkretų pirmą žingsnį: „Pirmiausia nuspręsk — kokios srities tai problema."'),

      spacer(80),
      body('Stipresniems mokiniams (kai baigia 6 scenarijus):', { bold: true }),
      body('7-as scenarijus: „Sugalvokite savo scenarijų, kuriame susikerta bent dvi skirtingos saugos sritys (pvz., ergonomika + aplinkos poveikis). Parašykite scenarijų ir idealų atsakymą pagal tą pačią lentelės struktūrą."'),

      // ═══ PHASE 4: EXIT RETRIEVAL ═══
      spacer(),
      phaseHeader('Pamokos pabaigos klausimai', '~4 min.', C.RETRIEVAL_BG, C.RETRIEVAL_ACCENT),
      label('Formatas:', 'žodinis.'),
      new Paragraph({
        indent: { left: 240 }, spacing: { after: 80 },
        children: [font('(Refleksija apie taikymo procesą, ne faktų prisiminimas.)', { italics: true, color: C.BRIDGE, size: 20 })],
      }),
      question(1, 'Kurią saugos sritį buvo lengviausia atpažinti scenarijuose ir kodėl?', C.RETRIEVAL_ACCENT),
      question(2, 'Kuriame scenarijuje tavo sprendimas buvo mažiausiai tikras — kas sukėlė abejonių?', C.RETRIEVAL_ACCENT),
      question(3, 'Ką šiandien supratai kitaip nei per L pamokas, kai teko pačiam taikyti taisykles?', C.RETRIEVAL_ACCENT),

      // ═══ DIARY ═══
      spacer(200),
      hrule(),
      new Paragraph({
        spacing: { after: 80 },
        children: [font('PAMOKOS APRAŠYMAS (DIENYNUI)', { bold: true, color: C.DIARY_ACCENT })],
      }),
      new Paragraph({
        spacing: { after: 80 },
        children: [font(
          'Integravimo pamokoje mokiniai individualiai analizavo šešis saugaus elgesio scenarijus, apimančius visas keturias saugos sritis: ergonomiką, privatumą ir paskyrų saugą, internetines rizikas bei skaitmeninių technologijų poveikį aplinkai. Kiekvienam scenarijui mokiniai raštu identifikavo saugos sritį, įvardijo problemą, nurodė taikytiną taisyklę iš L pamokų, pasiūlė konkretų veiksmą ir pagrindė savo sprendimą. Stipresni mokiniai kūrė savo scenarijų su dviejų sričių sankirtumu.',
          { italics: true, color: C.BRIDGE, size: 21 },
        )],
      }),
    ],
  }],
});

const buf = await Packer.toBuffer(doc);
const outPath = 'Grade_9/Semester_1/01_Safety/005_I - Scenario rotation task/Teacher_Plan.docx';
writeFileSync(outPath, buf);
console.log(`Written: ${outPath} (${buf.length} bytes)`);
