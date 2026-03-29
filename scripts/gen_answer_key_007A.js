const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, BorderStyle, WidthType, ShadingType,
  HeadingLevel
} = require("docx");

// ── Shared constants ──────────────────────────────────────────────
const BLUE = "1F4E79";
const MED_BLUE = "2E75B6";
const GREY = "808080";
const BODY = "333333";
const WHITE = "FFFFFF";
const BORDER_CLR = "BFBFBF";

const border = { style: BorderStyle.SINGLE, size: 1, color: BORDER_CLR };
const borders = { top: border, bottom: border, left: border, right: border };
const cellMargins = { top: 60, bottom: 60, left: 100, right: 100 };

const PAGE_W = 11906; // A4
const MARGIN = 1440;
const CONTENT_W = PAGE_W - 2 * MARGIN; // 9026

const COL_VARIANT = 3600;
const COL_CREDIT  = 1800;
const COL_REASON  = CONTENT_W - COL_VARIANT - COL_CREDIT; // 3626

// ── Helper: accept/reject table ───────────────────────────────────
function arTable(rows) {
  const hdrRow = new TableRow({
    children: [
      hdrCell("Atsakymo variantas", COL_VARIANT),
      hdrCell("Įvertinimas", COL_CREDIT),
      hdrCell("Pagrindimas", COL_REASON),
    ],
  });
  const dataRows = rows.map(
    ([variant, credit, reason]) =>
      new TableRow({
        cantSplit: true,
        children: [
          bodyCell(variant, COL_VARIANT),
          bodyCell(credit, COL_CREDIT),
          bodyCell(reason, COL_REASON),
        ],
      })
  );
  return new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    columnWidths: [COL_VARIANT, COL_CREDIT, COL_REASON],
    rows: [hdrRow, ...dataRows],
  });
}

function hdrCell(text, w) {
  return new TableCell({
    width: { size: w, type: WidthType.DXA },
    borders,
    shading: { fill: BLUE, type: ShadingType.CLEAR },
    margins: cellMargins,
    children: [
      new Paragraph({
        children: [new TextRun({ text, bold: true, color: WHITE, font: "Arial", size: 20 })],
      }),
    ],
  });
}

function bodyCell(text, w) {
  return new TableCell({
    width: { size: w, type: WidthType.DXA },
    borders,
    margins: cellMargins,
    children: [
      new Paragraph({
        spacing: { line: 276 },
        children: [new TextRun({ text, font: "Arial", size: 20, color: BODY })],
      }),
    ],
  });
}

// ── Helper: paragraph shortcuts ───────────────────────────────────
function h2(text) {
  return new Paragraph({
    spacing: { before: 360, after: 120 },
    children: [new TextRun({ text, bold: true, font: "Arial", size: 26, color: BLUE })],
  });
}

function h3(text) {
  return new Paragraph({
    spacing: { before: 240, after: 80 },
    keepNext: true,
    keepLines: true,
    children: [new TextRun({ text, bold: true, font: "Arial", size: 23, color: MED_BLUE })],
  });
}

function body(text, opts = {}) {
  return new Paragraph({
    spacing: { line: 276, after: 80 },
    children: [new TextRun({ text, font: "Arial", size: 22, color: BODY, ...opts })],
  });
}

function boldBody(label, rest) {
  return new Paragraph({
    spacing: { line: 276, after: 80 },
    children: [
      new TextRun({ text: label, bold: true, font: "Arial", size: 22, color: BODY }),
      new TextRun({ text: rest, font: "Arial", size: 22, color: BODY }),
    ],
  });
}

function spacer() {
  return new Paragraph({ spacing: { after: 40 }, children: [] });
}

// ── Document content ──────────────────────────────────────────────
const children = [];

// Header block
children.push(
  new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [new TextRun({ text: "ATSAKYMŲ RAKTAS", font: "Arial", size: 18, color: GREY, allCaps: true })],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 60 },
    children: [new TextRun({ text: "007_A Saugos struktūrinis vertinimas", bold: true, font: "Arial", size: 32, color: BLUE })],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 120 },
    children: [new TextRun({ text: "9 klasė  •  Sauga  •  20 taškų", font: "Arial", size: 20, color: GREY })],
  }),
  new Paragraph({
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: BLUE, space: 1 } },
    children: [],
  }),
);

// ════════════════════════════════════════════════════════════════════
// MCQ SECTION
// ════════════════════════════════════════════════════════════════════
children.push(h2("MCQ klausimai (1-6 kl., po 1 tašką)"));
children.push(body("Testmoz vertina automatiškai. Kiekviename klausime pateikiamas vienas variantas iš 5 galimų (POOL). Žemiau pateikiami visų variantų teisingi atsakymai ir distraktorių analizė."));

// ── Q1: Ergonomikos principai ─────────────────────────────────────
children.push(h3("1 klausimas (1 taškas, slenkstinis): Ergonomikos principai"));
children.push(body("Šiame klausimų telkinyje (pool) yra 5 variantai apie ergonomikos principus. Teisingi atsakymai:"));
children.push(spacer());

children.push(boldBody("1a) ", "Koks yra rekomenduojamas atstumas nuo akių iki ekrano?"));
children.push(boldBody("Teisingas: ", "Apie 50-70 cm."));
children.push(arTable([
  ["Apie 50-70 cm.", "Pilnas balas (1 tšk.)", "Atitinka ergonomikos rekomendacijas."],
  ["Apie 20-30 cm.", "0 taškų", "Klaidingas asocijavimas su telefono atstumu. Per arti, kenkia akims."],
  ["Apie 100-120 cm.", "0 taškų", "Perdėtas atstumas. Mokinys negalėtų patogiai skaityti ekrano turinio."],
]));
children.push(spacer());

children.push(boldBody("1b) ", "Kaip teisingai pastatyti ekraną darbo vietoje?"));
children.push(boldBody("Teisingas: ", "Ekrano viršus turi būti akių lygyje arba žemiau."));
children.push(arTable([
  ["Ekrano viršus turi būti akių lygyje arba žemiau.", "Pilnas balas (1 tšk.)", "Teisingas ergonomikos principas: kaklas lieka neutralioje padėtyje."],
  ["Ekrano apačia turi būti tiksliai akių lygyje.", "0 taškų", "Ekranas būtų per aukštai, kaklas lenkiamas atgal."],
  ["Ekranas turi būti kuo aukščiau, virš galvos.", "0 taškų", "Visiškai klaidingas. Sukeltų stiprų kaklo ir akių nuovargį."],
]));
children.push(spacer());

children.push(boldBody("1c) ", "Kaip reikėtų taisyklingai sėdėti prie kompiuterio?"));
children.push(boldBody("Teisingas: ", "Nugara remiasi į atlošą, pėdos ant grindų."));
children.push(arTable([
  ["Nugara remiasi į atlošą, pėdos ant grindų.", "Pilnas balas (1 tšk.)", "Taisyklinga laikysena: nugara atremta, kojos remiasi."],
  ["Sėdėti ant kėdės krašto, kojos sukryžiuotos.", "0 taškų", "Nestabili padėtis, nepalaikoma nugara, sutrinka kraujotaka."],
  ["Pasilenkti į priekį, alkūnės ant stalo.", "0 taškų", "Pasilenkimas sukelia nugaros ir pečių įtampą."],
]));
children.push(spacer());

children.push(boldBody("1d) ", "Kas yra 20-20-20 taisyklė?"));
children.push(boldBody("Teisingas: ", "Kas 20 min. pailsėti 20 s žiūrint 20 m atstumu."));
children.push(arTable([
  ["Kas 20 min. pailsėti 20 s žiūrint 20 m atstumu.", "Pilnas balas (1 tšk.)", "Tikslus 20-20-20 taisyklės apibrėžimas."],
  ["Kas 20 min. mirksėti 20 kartų per 20 sekundžių.", "0 taškų", "Išgalvotas variantas. Mirksėjimo dažnis nėra 20-20-20 taisyklės dalis."],
  ["Dirbti 20 min., ilsėtis 20 min., kartoti 20 kartų.", "0 taškų", "Perdėtos proporcijos. 20 min. pertrauka nerealistiška mokymosi kontekste."],
]));
children.push(spacer());

children.push(boldBody("1e) ", "Kodėl svarbu daryti pertraukas dirbant prie kompiuterio?"));
children.push(boldBody("Teisingas: ", "Kad ilsėtųsi akys, raumenys ir sąnariai."));
children.push(arTable([
  ["Kad ilsėtųsi akys, raumenys ir sąnariai.", "Pilnas balas (1 tšk.)", "Teisingai nurodo sveikatos priežastis."],
  ["Kad pagerėtų interneto sparta ir programų veikimas.", "0 taškų", "Pertraukos neturi įtakos techniniam veikimui."],
  ["Kad kompiuteris spėtų atnaujinti programas.", "0 taškų", "Pertraukos tikslas yra žmogaus sveikata, ne kompiuterio priežiūra."],
]));

// ── Q2: Slaptažodžiai ─────────────────────────────────────────────
children.push(h3("2 klausimas (1 taškas, slenkstinis): Stipraus slaptažodžio atpažinimas"));
children.push(body("5 variantai su ta pa\u010Dia strukt\u016Bra: \u201EPasirinkite saugiausi\u0105 slapta\u017Eod\u017E\u012F.\u201C Kiekviename variante teisingas atsakymas yra slapta\u017Eodis, naudojantis did\u017Ei\u0105sias ir ma\u017E\u0105sias raides, skai\u010Dius ir special\u0173 simbol\u012F."));
children.push(spacer());

const pwVariants = [
  { correct: "K4t1nas!Rudas", wrong: ["mokinys123", "12345678"], reasons: ["Lengvai atspėjamas žodis + nuosekli seka.", "Nuosekli skaičių seka, viena iš dažniausiai nulaužiamų."] },
  { correct: "Zu1k1s#Mork4", wrong: ["vardaspavarde", "qwerty2024"], reasons: ["Asmeninė informacija, lengvai atspėjama.", "Klaviatūros seka + metai, labai dažnas silpnas slaptažodis."] },
  { correct: "Dr3sūra_7", wrong: ["slaptazodis1", "mano_vardas"], reasons: ["\u017Dodis \u201Eslapta\u017Eodis\u201C yra da\u017Eniausiai nulau\u017Eiamas.", "Asmenin\u0117 informacija be sud\u0117tingumo."] },
  { correct: "P1l1s&aKm3n", wrong: ["gimtadienis99", "aaaaaaaaaa"], reasons: ["Asmeninė informacija + dvi skaitmenys.", "Vieno simbolio kartojimas, nulaužiamas per sekundes."] },
  { correct: "S4ul3!Tek4", wrong: ["mokykla2024", "abcdefgh"], reasons: ["Paplitęs žodis + metai, lengvai atspėjamas.", "Abėcėlės seka be skaičių ir simbolių."] },
];

pwVariants.forEach((v, i) => {
  children.push(boldBody(`2${String.fromCharCode(97 + i)}) `, "Pasirinkite saugiausią slaptažodį."));
  children.push(boldBody("Teisingas: ", v.correct));
  const rows = [[v.correct, "Pilnas balas (1 tšk.)", "Naudoja mišrias raides, skaičius, specialų simbolį."]];
  v.wrong.forEach((w, j) => rows.push([w + ".", "0 taškų", v.reasons[j]]));
  children.push(arTable(rows));
  children.push(spacer());
});

// ── Q3: Phishing ──────────────────────────────────────────────────
children.push(h3("3 klausimas (1 taškas, slenkstinis): Phishing atpažinimas"));
children.push(body("5 variantai apie phishing požymius ir reagavimą."));
children.push(spacer());

const phishVariants = [
  { q: "Kas yra phishing?", correct: "Bandymas apgaule išgauti asmeninius duomenis.", wrong: [["Kenkėjiška programa, kuri šifruoja failus.", "Tai ransomware, ne phishing."], ["Programa, kuri siunčia reklamą į el. paštą.", "Tai spam, ne phishing."]] },
  { q: "Kuris iš šių požymių rodo galimą phishing ataką?", correct: "Prašoma skubiai spausti nuorodą ir įvesti slaptažodį.", wrong: [["Laiške pateikta nuoroda į oficialią svetainę.", "Oficiali nuoroda nėra phishing požymis."], ["Laiškas atėjo nuo organizacijos, kurioje turite paskyrą.", "Normalus laiškas iš žinomos organizacijos nėra phishing."]] },
  { q: "Kuris požymis padeda atpažinti phishing žinutę?", correct: "Siuntėjo adresas nesutampa su organizacija.", wrong: [["Žinutė atsiųsta darbo valandomis.", "Siuntimo laikas nėra phishing požymis."], ["Žinutėje yra organizacijos logotipas.", "Phishing žinutės dažnai kopijuoja logotipus."]] },
  { q: "Kuris el. laiško požymis kelia didžiausią įtarimą?", correct: "Laiške grasinama paskyros uždarymu per 24 val.", wrong: [["Laiške pateikta organizacijos kontaktinė informacija.", "Kontaktinė informacija yra normalus laiško elementas."], ["Laiškas atsiųstas iš organizacijos domeno adreso.", "Oficialus domenas yra patikimumo požymis."]] },
  { q: "Ką daryti gavus įtartiną žinutę su nuoroda?", correct: "Susisiekti su organizacija kitu kanalu ir pasitikslinti.", wrong: [["Atidaryti nuorodą naršyklės inkognito režimu.", "Inkognito režimas neapsaugo nuo kenkėjiškų svetainių."], ["Persiųsti žinutę draugui ir paklausti jo nuomonės.", "Draugas nėra saugos ekspertas. Reikia kreiptis į organizaciją."]] },
];

phishVariants.forEach((v, i) => {
  children.push(boldBody(`3${String.fromCharCode(97 + i)}) `, v.q));
  children.push(boldBody("Teisingas: ", v.correct));
  const rows = [[v.correct, "Pilnas balas (1 tšk.)", "Teisingas atsakymas."]];
  v.wrong.forEach(([w, r]) => rows.push([w, "0 taškų", r]));
  children.push(arTable(rows));
  children.push(spacer());
});

// ── Q4: E-atliekos ────────────────────────────────────────────────
children.push(h3("4 klausimas (1 taškas, slenkstinis): E-atliekų apibrėžimas"));
children.push(body("5 variantai apie e-atliekas."));
children.push(spacer());

const ewasteVariants = [
  { q: "Kas yra e-atliekos?", correct: "Išmesti elektroniniai įrenginiai ir jų dalys.", wrong: [["Sugadinti ir ištrinti failai kompiuteryje.", "Failai nėra fizinės atliekos."], ["Gamyklų gamybos proceso metu susidarančios atliekos.", "Tai pramoninės atliekos, ne e-atliekos."]] },
  { q: "Kodėl e-atliekos yra pavojingos aplinkai?", correct: "Jose yra nuodingų medžiagų, pvz., švino.", wrong: [["Jos užima labai daug vietos sąvartynuose.", "Vieta sąvartynuose nėra pagrindinė e-atliekų grėsmė."], ["Jos gadina dirvožemį savo svoriu ir dydžiu.", "Svoris nėra pagrindinis pavojus. Nuodingos medžiagos yra."]] },
  { q: "Kas priskiriama e-atliekoms?", correct: "Nebenaudojami elektroniniai įrenginiai.", wrong: [["Pasenusios programos kompiuteryje.", "Programos nėra fiziniai objektai."], ["Nebegaliojančios elektroninės licencijos.", "Licencijos yra teisiniai dokumentai, ne atliekos."]] },
  { q: "Kur reikėtų atiduoti seną telefoną?", correct: "Į elektronikos atliekų surinkimo punktą.", wrong: [["Į artimiausią buitinių atliekų konteinerį.", "Buitinių atliekų konteineris netinka elektronikai."], ["Į parduotuvę, kur jis buvo pirktas.", "Parduotuvės neprivalo priimti senų įrenginių (nors kai kurios tai daro)."]] },
  { q: "Kuris veiksmas padeda mažinti e-atliekų kiekį?", correct: "Naudoti įrenginį kuo ilgiau ir jį remontuoti.", wrong: [["Pirkti pigesnius įrenginius, kuriuos lengviau pakeisti.", "Dažnesnis keitimas didina e-atliekų kiekį."], ["Laikyti senus įrenginius namuose kaip atsarginius.", "Laikymas stalčiuje nėra utilizavimas. Medžiagos neatgaunamos."]] },
];

ewasteVariants.forEach((v, i) => {
  children.push(boldBody(`4${String.fromCharCode(97 + i)}) `, v.q));
  children.push(boldBody("Teisingas: ", v.correct));
  const rows = [[v.correct, "Pilnas balas (1 tšk.)", "Teisingas atsakymas."]];
  v.wrong.forEach(([w, r]) => rows.push([w, "0 taškų", r]));
  children.push(arTable(rows));
  children.push(spacer());
});

// ── Q5: Dezinformacija ────────────────────────────────────────────
children.push(h3("5 klausimas (1 taškas, patenkinamas): Melagienos ir dezinformacija"));
children.push(body("5 variantai apie dezinformaciją ir klaidingą informaciją."));
children.push(spacer());

const disInfoVariants = [
  { q: "Kuo dezinformacija skiriasi nuo klaidingos informacijos?", correct: "Dezinformacija platinama tyčia, siekiant apgauti.", wrong: [["Dezinformacija skelbiama tik internete.", "Dezinformacija gali būti platinama bet kuriuo kanalu."], ["Dezinformacija yra tik apie politinius įvykius.", "Dezinformacija apima visas temas, ne tik politiką."]] },
  { q: "Kodėl dezinformacija yra pavojingesnė nei klaidinga informacija?", correct: "Dezinformacija kuriama tyčia, siekiant manipuliuoti.", wrong: [["Dezinformacija visada pasiekia daugiau žmonių.", "Pasiekiamumas nėra esminis skirtumas."], ["Dezinformacija atrodo labiau profesionali ir įtikinama.", "Ne visada. Esminis skirtumas yra tyčinis ketinimas."]] },
  { q: "Kuris pavyzdys geriausiai atitinka dezinformaciją?", correct: "Organizacija tyčia kuria melagingą naujieną, kad paveiktų nuomonę.", wrong: [["Žmogus pasidalina straipsniu, nežinodamas, kad jis klaidingas.", "Tai klaidinga informacija (netyčinė), ne dezinformacija."], ["Mokslininkas skelbia rezultatus, kurie vėliau pasirodė netikslūs.", "Tai klaida, ne tyčinis apgaudinėjimas."]] },
  { q: "Kaip galima atskirti melagingą informaciją nuo tikros?", correct: "Palyginti informaciją keliuose skirtinguose šaltiniuose.", wrong: [["Tikėti informacija, jei ją pasidalino daug žmonių.", "Populiarumas negarantuoja tiesos."], ["Skaityti tik informaciją iš socialinių tinklų.", "Socialiniai tinklai nėra patikimi šaltiniai."]] },
  { q: "Kuris pavyzdys yra klaidinga informacija, bet ne dezinformacija?", correct: "Žmogus netyčia pasidalina straipsniu su pasenusiais duomenimis.", wrong: [["Įmonė tyčia skelbia neteisingą reklamą apie savo produktą.", "Tai dezinformacija (tyčinė)."], ["Politikas sąmoningai platina melagingą statistiką.", "Tai dezinformacija (sąmoningas klaidinimas)."]] },
];

disInfoVariants.forEach((v, i) => {
  children.push(boldBody(`5${String.fromCharCode(97 + i)}) `, v.q));
  children.push(boldBody("Teisingas: ", v.correct));
  const rows = [[v.correct, "Pilnas balas (1 tšk.)", "Teisingas atsakymas."]];
  v.wrong.forEach(([w, r]) => rows.push([w, "0 taškų", r]));
  children.push(arTable(rows));
  children.push(spacer());
});

// ── Q6: 2FA ───────────────────────────────────────────────────────
children.push(h3("6 klausimas (1 taškas, patenkinamas): 2FA veikimo principas"));
children.push(body("5 variantai apie dviejų veiksnių autentifikaciją."));
children.push(spacer());

const tfaVariants = [
  { q: "Kaip veikia dviejų veiksnių autentifikacija (2FA)?", correct: "Reikia slaptažodžio ir patvirtinimo iš telefono.", wrong: [["Reikia įvesti du atskirus slaptažodžius.", "Du slaptažodžiai nėra du veiksniai. Veiksniai turi būti skirtingo tipo."], ["Du žmonės turi patvirtinti kiekvieną prisijungimą.", "2FA reiškia du veiksnius, ne du žmones."]] },
  { q: "Kodėl 2FA apsaugo paskyrą, net jei slaptažodis pavogtas?", correct: "Be patvirtinimo iš telefono prisijungti nepavyks.", wrong: [["2FA automatiškai pakeičia slaptažodį po kiekvieno prisijungimo.", "2FA nekeičia slaptažodžio automatiškai."], ["2FA užšifruoja slaptažodį, kad niekas jo nematytų.", "2FA nesusijusi su slaptažodžio šifravimu."]] },
  { q: "Kas yra dviejų veiksnių autentifikacija (2FA)?", correct: "Prisijungimas naudojant slaptažodį ir papildomą kodą.", wrong: [["Sistema, kuri reikalauja dviejų skirtingų slaptažodžių.", "Du slaptažodžiai nėra du veiksniai."], ["Programa, kuri automatiškai prisijungia prie paskyrų.", "Automatinis prisijungimas nėra autentifikacija."]] },
  { q: "Kuris yra antrojo veiksnio pavyzdys 2FA sistemoje?", correct: "Vienkartinis kodas, gautas SMS žinute į telefoną.", wrong: [["Atsarginis slaptažodis, saugomas užrašuose.", "Atsarginis slaptažodis nėra antrasis veiksnys (abu yra \u201Ežinių\u201C veiksniai)."], ["Saugos klausimas apie gimimo vietą ar mokyklą.", "Saugos klausimas yra \u201Ežinių\u201C veiksnys, ne atskiras tipas."]] },
  { q: "Kurioje situacijoje 2FA labiausiai padėtų apsaugoti paskyrą?", correct: "Kai naudotojas prisijungia iš viešo Wi-Fi tinklo.", wrong: [["Kai naudotojas naudoja naują naršyklę savo kompiuteryje.", "Nauja naršyklė savo kompiuteryje nėra didelė rizika."], ["Kai naudotojas keičia profilio nuotrauką.", "Profilio nuotraukos keitimas nekelia saugos rizikos."]] },
];

tfaVariants.forEach((v, i) => {
  children.push(boldBody(`6${String.fromCharCode(97 + i)}) `, v.q));
  children.push(boldBody("Teisingas: ", v.correct));
  const rows = [[v.correct, "Pilnas balas (1 tšk.)", "Teisingas atsakymas."]];
  v.wrong.forEach(([w, r]) => rows.push([w, "0 taškų", r]));
  children.push(arTable(rows));
  children.push(spacer());
});

// ════════════════════════════════════════════════════════════════════
// OPEN QUESTIONS SECTION
// ════════════════════════════════════════════════════════════════════
children.push(h2("Atviri klausimai (7-11 kl., po 2 taškus)"));
children.push(body("Testmoz rodo vieną variantą iš 5 galimų kiekvienam mokiniui. Visi variantai tikrina tą pačią kompetenciją. Vertinimo kriterijai taikomi vienodai visiems variantams."));

// ── Q7: Saugaus reagavimo algoritmas (2 tšk., patenkinamas) ──────
children.push(h3("7 klausimas (2 taškai, patenkinamas): Saugaus reagavimo algoritmas"));
children.push(body("Variantai prašo aprašyti 3 saugaus reagavimo žingsnius. Visi variantai remiasi algoritmu: SUSTOTI \u2192 PATIKRINTI \u2192 PRANEŠTI."));
children.push(spacer());

children.push(boldBody("Modelinis atsakymas: ", "1) Sustoti: nespausti jokių nuorodų ir neatidaryti priedų. 2) Patikrinti: įvertinti siuntėjo adresą, ieškoti skubumo ženklų, palyginti su oficialiais šaltiniais. 3) Pranešti: informuoti mokytoją, tėvus arba organizaciją kitu kanalu."));
children.push(spacer());

children.push(boldBody("Priimtini alternatyvūs atsakymai:", ""));
children.push(body("1. Bet koks trijų žingsnių aprašymas, kuriame yra sustojimo, patikrinimo ir pranešimo elementai, net jei žingsniai pavadinti kitaip."));
children.push(body("2. Vietoj \u201Epranešti\u201C priimtinas \u201Eištrinti žinutę\u201C kaip trečiasis žingsnis, jei pirmieji du teisingi."));
children.push(spacer());

children.push(boldBody("Dalinio kredito taisyklės:", ""));
children.push(body("2 tšk.: visi 3 žingsniai įvardyti ir kiekvienas paaiškinti bent 1 sakiniu."));
children.push(body("1,5 tšk.: 3 žingsniai įvardyti, bet vieno paaiškinimo trūksta."));
children.push(body("1 tšk.: 2 žingsniai teisingi su paaiškinimais ARBA 3 žingsniai be paaiškinimų."));
children.push(body("0,5 tšk.: 1 žingsnis teisingas su paaiškinimu."));
children.push(body("0 tšk.: neatsakyta arba žingsniai nesusiję su saugaus reagavimo logika."));
children.push(spacer());

children.push(boldBody("Atmestini atsakymai:", ""));
children.push(body("\u201EPaskambinti policijai\u201C kaip vienintelis veiksmas: per radikalus, nėra sustojimo ir patikrinimo etapų."));
children.push(body("\u201EIgnoruoti ir pamiršti\u201C be jokių veiksmų: nepakankama reakcija, nes nekontaktuojama su organizacija."));

// ── Q8: Energijos suvartojimas (2 tšk., patenkinamas) ─────────────
children.push(h3("8 klausimas (2 taškai, patenkinamas): Energijos suvartojimas"));
children.push(body("Variantai prašo paaiškinti 1-2 sakiniais, kaip skaitmeniniai veiksmai susiję su energijos suvartojimu."));
children.push(spacer());

children.push(boldBody("Modelinis atsakymas (vaizdo transliavimo variantas): ", "Vaizdo transliavimas reikalauja nuolat siųsti didelius duomenų kiekius iš duomenų centrų, kurie veikia 24/7 ir naudoja daug elektros tiek serveriams, tiek jų aušinimui. Teksto skaitymas perduoda daug mažesnį duomenų kiekį, todėl sunaudoja mažiau energijos."));
children.push(spacer());

children.push(boldBody("Priimtini alternatyvūs atsakymai:", ""));
children.push(body("1. Bet koks paaiškinimas, nurodantis duomenų kiekio ir energijos suvartojimo ryšį."));
children.push(body("2. Paminėjimas duomenų centrų, serverių aušinimo, tinklo infrastruktūros."));
children.push(body("3. Konkretus pavyzdys: \u201EEl. laiškas keliauja per kelis serverius, kiekvienas naudoja elektrą.\u201C"));
children.push(spacer());

children.push(boldBody("Dalinio kredito taisyklės:", ""));
children.push(body("2 tšk.: teisingas paaiškinimas su priežastimi (kodėl) ir konkrečiu mechanizmu (kaip)."));
children.push(body("1 tšk.: teisingas teiginys be gilesnio paaiškinimo (pvz., \u201Einternetas naudoja elektrą\u201C be mechanizmo)."));
children.push(body("0 tšk.: klaidingas teiginys arba neatsakyta."));
children.push(spacer());

children.push(boldBody("Atmestini atsakymai:", ""));
children.push(body("\u201EInternetas neina be elektros\u201C be jokio paaiškinimo: per bendras, neatsakyta į klausimą."));
children.push(body("\u201EKompiuteris naudoja elektrą\u201C: tiesa, bet klausimas apie duomenų centrų energiją, ne vietinį kompiuterį."));

// ── Q9: Ergonomikos principų taikymas (2 tšk., pagrindinis) ──────
children.push(h3("9 klausimas (2 taškai, pagrindinis): Ergonomikos principų taikymas"));
children.push(body("Variantai pateikia draugo klaidingą teiginį apie ergonomiką. Mokinys turi pagrįsti, kodėl teiginys klaidingas, 2-3 sakiniais."));
children.push(spacer());

children.push(boldBody("Modelinis atsakymas (laikysenos variantas): ", "Jis neteisus. Net jei dabar neskauda nugaros, ilgas sėdėjimas netaisyklinga laikysena kaupia įtampą raumenyse ir sąnariuose. Pasekmės pasireiškia ne iš karto, o po savaičių ar mėnesių: nugaros skausmai, laikysenos sutrikimai, galvos skausmai. Prevencija yra efektyvesnė nei gydymas, kai simptomai jau atsirado."));
children.push(spacer());

children.push(boldBody("Priimtini alternatyvūs argumentai:", ""));
children.push(body("1. Kaupiamasis poveikis: simptomai atsiranda ne iš karto, o ilgainiui."));
children.push(body("2. Prevencija vs reakcija: geriau vengti problemos nei laukti simptomų."));
children.push(body("3. Daugiau nei vienas aspektas: akys, laikysena, kraujotaka, psichinis nuovargis."));
children.push(spacer());

children.push(boldBody("Dalinio kredito taisyklės:", ""));
children.push(body("2 tšk.: teisingai identifikuoja klaidą + pateikia bent 2 argumentus su paaiškinimu."));
children.push(body("1 tšk.: teisingai identifikuoja klaidą + 1 argumentas su paaiškinimu ARBA 2 argumentai be gilesnio paaiškinimo."));
children.push(body("0 tšk.: sutinka su draugu arba argumentai nesusiję su ergonomika."));
children.push(spacer());

children.push(boldBody("Ribiniai atvejai:", ""));
children.push(body("Jei mokinys rašo \u201Egal jis teisus, bet vis tiek reikia sėdėti teisingai\u201C: vertinti kaip dalinį (1 tšk.), nes nepakankamai griežtai atmeta klaidingą teiginį."));

// ── Q10: Jautrių duomenų vertinimas (2 tšk., pagrindinis) ────────
children.push(h3("10 klausimas (2 taškai, pagrindinis): Jautrių duomenų vertinimas"));
children.push(body("Variantai prašo skirti asmeninius duomenis nuo viešų, vertinti jautrumą arba patarti dėl duomenų atskleidimo."));
children.push(spacer());

children.push(boldBody("Modelinis atsakymas (asmeniniai vs viešai prieinami): ", "Asmeniniai duomenys yra informacija, pagal kurią galima nustatyti konkretų asmenį: vardas, pavardė, asmens kodas, adresas. Viešai prieinami duomenys yra laisvai skelbiami ir nesusieti su konkrečiu asmeniu: oro prognozė, miesto gyventojų skaičius. Skirtumas yra tas, kad asmeniniai duomenys saugomi įstatymų (BDAR), o vieši duomenys prieinami visiems."));
children.push(spacer());

children.push(boldBody("Priimtini alternatyvūs atsakymai:", ""));
children.push(body("1. Bet koks teisingas asmeninio ir viešo duomens pavyzdžių pateikimas su paaiškinimu."));
children.push(body("2. Priimtini asmeninių duomenų pavyzdžiai: asmens kodas, telefono numeris, adresas, el. paštas, gimimo data."));
children.push(body("3. Priimtini viešų duomenų pavyzdžiai: oro prognozė, miesto populiacija, viešos įstaigos darbo laikas."));
children.push(spacer());

children.push(boldBody("Dalinio kredito taisyklės:", ""));
children.push(body("2 tšk.: teisingas skirtumas + teisingi abu pavyzdžiai (po vieną kiekvienai kategorijai)."));
children.push(body("1 tšk.: teisingas skirtumas be pavyzdžių ARBA teisingi pavyzdžiai be paaiškinimo ARBA viena pusė pilna, kita trūksta."));
children.push(body("0 tšk.: klaidingas skirtumas arba neatsakyta."));
children.push(spacer());

children.push(boldBody("Ribiniai atvejai:", ""));
children.push(body("\u201ETelefono numeris\u201C kaip asmeninis: priimtina. \u201EFacebook profilis\u201C kaip viešas: priimtina tik jei mokinys patikslina, kad tai vieša profilio dalis."));

// ── Q11: Skaitmeninio pėdsako mažinimas (2 tšk., pagrindinis) ────
children.push(h3("11 klausimas (2 taškai, pagrindinis): Skaitmeninio pėdsako mažinimas"));
children.push(body("Variantai apie skaitmeninį pėdsaką, e-atliekas arba technologijų poveikį aplinkai."));
children.push(spacer());

children.push(boldBody("Modelinis atsakymas (du veiksmai variantas): ", "1) Išjungti vietos nustatymo paslaugas programėlėse, kurioms jų nereikia. Tai sumažina duomenų rinkimą apie jūsų buvimo vietą. 2) Reguliariai peržiūrėti ir ištrinti senas paskyras svetainėse, kuriomis nebesinaudojate. Tai sumažina asmeninių duomenų kiekį internete."));
children.push(spacer());

children.push(boldBody("Priimtini alternatyvūs veiksmai:", ""));
children.push(body("Naudoti privatumo naršyklę arba VPN; riboti informaciją socialiniuose tinkluose; naudoti įrenginį ilgiau; remontuoti vietoj keitimo; rūšiuoti e-atliekas; naudoti energiją taupančius nustatymus."));
children.push(spacer());

children.push(boldBody("Dalinio kredito taisyklės:", ""));
children.push(body("2 tšk.: du konkretūs veiksmai, kiekvienas su paaiškinimu, kodėl svarbus."));
children.push(body("1 tšk.: vienas teisingas veiksmas su paaiškinimu ARBA du veiksmai be paaiškinimų."));
children.push(body("0 tšk.: bendri teiginiai be konkretumo (pvz., \u201Ebūti atsargesniems internete\u201C) arba neatsakyta."));

// ════════════════════════════════════════════════════════════════════
// SCENARIO SECTION
// ════════════════════════════════════════════════════════════════════
children.push(h2("Scenarijų analizė (12-13 kl., po 2 taškus)"));
children.push(body("Aukštesniojo lygio klausimai. Mokinys turi identifikuoti grėsmę, nurodyti požymius ir aprašyti reagavimą 3-5 sakiniais."));

// ── Q12: Socialinė inžinerija (2 tšk., aukštesnysis) ─────────────
children.push(h3("12 klausimas (2 taškai, aukštesnysis): Scenarijus: socialinė inžinerija"));
children.push(body("5 variantai: Discord IT administratorius, SMS nuo banko, draugo žinutė su nuoroda, interneto konkursas, el. laiškas nuo mokyklos."));
children.push(spacer());

children.push(boldBody("Modelinis atsakymas (Discord variantas): ", "Požymiai: 1) IT administratorius niekada neprašytų slaptažodžio per Discord. 2) \u201ESistemos atnaujinimas\u201C yra tipinis pretekstas sukčiavimui. 3) Nepažįstamas asmuo prisistato autoritetu. Reagavimas: neatskleisti jokių duomenų, pranešti mokytojui arba tikrajam IT administratoriui, užblokuoti siuntėją."));
children.push(spacer());

children.push(boldBody("Vertinimo struktūra:", ""));
children.push(body("Atsakymas vertinamas pagal du komponentus:"));
children.push(body("A) Požymių identifikavimas (1 tšk.): mokinys turi identifikuoti bent 2 socialinės inžinerijos / phishing požymius."));
children.push(body("B) Reagavimo aprašymas (1 tšk.): mokinys turi aprašyti teisingą veiksmų seką (sustoti, patikrinti, pranešti)."));
children.push(spacer());

children.push(boldBody("Dalinio kredito taisyklės:", ""));
children.push(body("2 tšk.: bent 2 požymiai + teisingas reagavimas."));
children.push(body("1 tšk.: 1 požymis + teisingas reagavimas ARBA 2+ požymiai be reagavimo aprašo."));
children.push(body("0,5 tšk.: tik 1 požymis be reagavimo ARBA tik bendras reagavimas be požymių."));
children.push(body("0 tšk.: neatsakyta arba visiškai neteisingas atsakymas."));
children.push(spacer());

children.push(boldBody("Atmestini atsakymai:", ""));
children.push(body("\u201ETai normalu, nes IT administratorius turi žinoti slaptažodį\u201C: visiškai klaidingas supratimas."));
children.push(body("Teisinga išvada, bet klaidinga argumentacija (pvz., \u201Enereikia atsiųsti, nes gali įsilaužti į Discord\u201C): 0,5 tšk. už dalinį supratimą."));

// ── Q13: Ergonomika + aplinka (2 tšk., aukštesnysis) ──────────────
children.push(h3("13 klausimas (2 taškai, aukštesnysis): Scenarijus: ergonomika + aplinka"));
children.push(body("5 variantai, kombinuojantys ergonomikos ir aplinkos poveikio temas."));
children.push(spacer());

children.push(boldBody("Modelinis atsakymas (žaidimų variantas): ", "Ergonomikos pažeidimai: 1) Dirba be pertraukos 4 val. (reikia pertraukų kas 20-30 min.). 2) Sėdi pasilenkęs į priekį (turi sėdėti nugara atremta į atlošą). 3) Kojos sukryžiuotos (pėdos turi būti ant grindų). 4) Dirba tamsiame kambaryje (reikia tinkamo apšvietimo, kad nekentėtų akys). Pasekmės: akių nuovargis, nugaros skausmai, galvos skausmas, kraujotakos sutrikimai kojose."));
children.push(spacer());

children.push(boldBody("Vertinimo struktūra:", ""));
children.push(body("A) Problemų identifikavimas (1 tšk.): mokinys turi identifikuoti bent 3 problemas."));
children.push(body("B) Pasekmių / sprendimų aprašymas (1 tšk.): mokinys turi paaiškinti pasekmes arba pasiūlyti sprendimus."));
children.push(spacer());

children.push(boldBody("Dalinio kredito taisyklės:", ""));
children.push(body("2 tšk.: 3+ problemos + pasekmės ar sprendimai."));
children.push(body("1 tšk.: 2 problemos su pasekmėmis ARBA 3+ problemos be paaiškinimų."));
children.push(body("0,5 tšk.: 1 problema su paaiškinimu."));
children.push(body("0 tšk.: neatsakyta arba visiškai klaidingas atsakymas."));
children.push(spacer());

children.push(boldBody("Ribiniai atvejai:", ""));
children.push(body("Jei mokinys identifikuoja problemą, kuri nėra akivaizdi scenarijuje, bet yra teisinga ergonomikos prasme (pvz., \u201Enaudoja nekokybišką kėdę\u201C): priimti, jei argumentuota."));
children.push(body("Jei ta pati problema pakartota kitais žodžiais: skaičiuoti kaip vieną."));

// ════════════════════════════════════════════════════════════════════
// TAŠKŲ SUVESTINĖ
// ════════════════════════════════════════════════════════════════════
children.push(h2("Taškų suvestinė ir pažymio skalė"));

const summaryRows = [
  ["1-4 kl. (MCQ, slenkstinis)", "4 × 1 = 4"],
  ["5-6 kl. (MCQ, patenkinamas)", "2 × 1 = 2"],
  ["7-8 kl. (atviri, patenkinamas)", "2 × 2 = 4"],
  ["9-11 kl. (atviri, pagrindinis)", "3 × 2 = 6"],
  ["12-13 kl. (scenarijai, aukštesnysis)", "2 × 2 = 4"],
  ["IŠ VISO", "20"],
];

const sBorder = { style: BorderStyle.SINGLE, size: 1, color: BORDER_CLR };
const sBorders = { top: sBorder, bottom: sBorder, left: sBorder, right: sBorder };
const sColW1 = 6000;
const sColW2 = CONTENT_W - sColW1;

const summaryTable = new Table({
  width: { size: CONTENT_W, type: WidthType.DXA },
  columnWidths: [sColW1, sColW2],
  rows: [
    new TableRow({
      children: [
        hdrCell("Klausimai", sColW1),
        hdrCell("Taškai", sColW2),
      ],
    }),
    ...summaryRows.map(
      ([q, pts]) =>
        new TableRow({
          children: [
            new TableCell({
              width: { size: sColW1, type: WidthType.DXA },
              borders: sBorders,
              margins: cellMargins,
              children: [new Paragraph({ children: [new TextRun({ text: q, font: "Arial", size: 20, color: BODY, bold: q === "IŠ VISO" })] })],
            }),
            new TableCell({
              width: { size: sColW2, type: WidthType.DXA },
              borders: sBorders,
              margins: cellMargins,
              children: [new Paragraph({ children: [new TextRun({ text: pts, font: "Arial", size: 20, color: BODY, bold: pts === "20" })] })],
            }),
          ],
        })
    ),
  ],
});
children.push(summaryTable);
children.push(spacer());

// Grade scale
children.push(boldBody("Pažymio skalė: ", "19-20 → 10 | 17-18 → 9 | 15-16 → 8 | 13-14 → 7 | 11-12 → 6 | 9-10 → 5 | 6-8 → 4 | 4-5 → 3 | 2-3 → 2 | 0-1 → 1"));

// ── Build document ────────────────────────────────────────────────
const doc = new Document({
  styles: {
    default: {
      document: { run: { font: "Arial", size: 22, color: BODY } },
    },
  },
  sections: [
    {
      properties: {
        page: {
          size: { width: PAGE_W, height: 16838 },
          margin: { top: MARGIN, right: MARGIN, bottom: MARGIN, left: MARGIN },
        },
      },
      footers: {
        default: new Footer({
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({
                  text: "Vidinis dokumentas. Neskelbti mokiniams.",
                  font: "Arial",
                  size: 16,
                  color: GREY,
                }),
              ],
            }),
          ],
        }),
      },
      children,
    },
  ],
});

const outPath = "Grade_9/Semester_1/01_Safety/007_A - Safety structured assessment/Answer_Key.docx";
Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync(outPath, buffer);
  console.log("OK: " + outPath + " (" + buffer.length + " bytes)");
});
