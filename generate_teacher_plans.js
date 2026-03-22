const fs = require('fs');
const path = require('path');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  HeadingLevel, AlignmentType, LevelFormat, BorderStyle, WidthType, ShadingType
} = require('docx');

// ── Constants ────────────────────────────────────────────────────────
const FONT = "Arial";
const BODY = 22; // 11pt
const H1S = 28;  // 14pt
const H2S = 24;  // 12pt
const CONTENT_W = 9026; // A4 minus 1-inch margins
const LQ = "\u201E"; const RQ = "\u201C";
function q(t) { return LQ + t + RQ; }

const border = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
const borders = { top: border, bottom: border, left: border, right: border };
const cellM = { top: 80, bottom: 80, left: 120, right: 120 };

// ── Helpers ──────────────────────────────────────────────────────────
const r = (text, opts={}) => new TextRun({ text, font: FONT, size: BODY, ...opts });
const rb = (text, opts={}) => new TextRun({ text, font: FONT, size: BODY, bold: true, ...opts });

function h1(text) {
  return new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { after: 120 },
    children: [new TextRun({ text, font: FONT, size: H1S, bold: true })] });
}
function h2(text) {
  return new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 240, after: 120 },
    children: [new TextRun({ text, font: FONT, size: H2S, bold: true })] });
}
function p(text, opts={}) {
  return new Paragraph({ spacing: { after: 120 }, children: [r(text, opts)] });
}
function meta(label, value) {
  return new Paragraph({ spacing: { after: 80 }, children: [rb(label + " "), r(value)] });
}
function mp(runs) {
  return new Paragraph({ spacing: { after: 120 }, children: runs });
}
function bp(boldText, normalText) {
  return new Paragraph({ spacing: { after: 120 }, children: [rb(boldText), r(normalText)] });
}
function bi(text, ref="bullets") {
  return new Paragraph({ spacing: { after: 80 }, numbering: { reference: ref, level: 0 },
    children: [r(text)] });
}
function ni(text, ref="n1") {
  return new Paragraph({ spacing: { after: 80 }, numbering: { reference: ref, level: 0 },
    children: [r(text)] });
}

function tbl(rows, c1w, c2w) {
  const w1 = c1w || Math.floor(CONTENT_W * 0.45);
  const w2 = c2w || (CONTENT_W - w1);
  return new Table({
    width: { size: CONTENT_W, type: WidthType.DXA }, columnWidths: [w1, w2],
    rows: rows.map((row, i) => new TableRow({
      children: row.map((t, j) => new TableCell({
        borders, width: { size: j===0?w1:w2, type: WidthType.DXA }, margins: cellM,
        shading: i===0 ? { fill: "D5E8F0", type: ShadingType.CLEAR } : undefined,
        children: [new Paragraph({ children: [new TextRun({ text: t, font: FONT, size: BODY, bold: i===0 })] })]
      }))
    }))
  });
}

// ── Doc builder ──────────────────────────────────────────────────────
function mkNumRef(id) {
  return { reference: id, levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.",
    alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] };
}

function buildDoc(children) {
  return new Document({
    styles: {
      default: { document: { run: { font: FONT, size: BODY } } },
      paragraphStyles: [
        { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
          run: { size: H1S, bold: true, font: FONT }, paragraph: { spacing: { before: 0, after: 240 }, outlineLevel: 0 } },
        { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
          run: { size: H2S, bold: true, font: FONT }, paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 1 } }
      ]
    },
    numbering: { config: [
      { reference: "bullets", levels: [{ level: 0, format: LevelFormat.BULLET, text: "\u2022",
        alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      mkNumRef("n1"), mkNumRef("n2"), mkNumRef("n3"), mkNumRef("n4"),
      mkNumRef("n5"), mkNumRef("n6"), mkNumRef("n7"), mkNumRef("n8"),
    ] },
    sections: [{ properties: { page: { margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } } }, children }]
  });
}

// ═══════════════════ LESSON 001 ═══════════════════
function plan001() {
  return [
    h1("Ergonomika ir sveikas kompiuterio naudojimas"),
    meta("Tipas:", "L \u2014 Mokymosi pamoka (1 i\u0161 4 apie saug\u0105)"),
    meta("Klas\u0117:", "9"),
    meta("Trukm\u0117:", "~40 min."),
    meta("Forma:", "Pilnas demonstravimas"),
    meta("Temos ribos:", "\u0160i pamoka apima ergonomikos principus dirbant kompiuteriu: taisykling\u0105 s\u0117d\u0117jimo laikysen\u0105, ekrano atstum\u0105 ir kamp\u0105, rank\u0173 pad\u0117t\u012F ant klaviat\u016Bros, aki\u0173 poilsio taisykl\u0119 (20-20-20) ir darbo\u2013poilsio ritm\u0105. Neapima interneto saugos, privatumo ar aplinkosaugos tem\u0173."),

    h2("Pamokos tikslai"),
    bi("\u012Evardinti pagrindinius ergonomikos principus (laikysena, atstumas, pertraukos)."),
    bi("Paai\u0161kinti, kaip kiekvienas principas padeda i\u0161vengti sveikatos problem\u0173."),
    bi("Pademonstruoti taisykling\u0105 s\u0117d\u0117jimo poz\u0105 ir ekrano pad\u0117t\u012F."),

    h2("\u012E\u017Eanginis atgaminimas \u2014 ~3 min."),
    p("\u017Dodinis \u0161altojo kvietimo formatas. Klausimai skaidr\u0117je."),
    p("Pastaba: tai pirma met\u0173 pamoka \u2014 klausimai remiasi bendra patirtimi.", { italics: true }),
    ni("Ar jums kada nors skaud\u0117jo nugar\u0105 ar akis po ilgo darbo prie kompiuterio?", "n1"),
    ni("Kaip manote, kod\u0117l kai kurie \u017Emon\u0117s ne\u0161ioja akinius nuo kompiuterio ekrano?", "n1"),
    ni("Ar esate gird\u0117j\u0119 \u017Eod\u012F " + q("ergonomika") + "? K\u0105 jis gal\u0117t\u0173 reik\u0161ti?", "n1"),
    mp([rb("Ry\u0161ys: "), r(q("\u0160iandien su\u017Einosime, kaip dirbti prie kompiuterio taip, kad k\u016Bnas nenukent\u0117t\u0173."))]),

    h2("D\u0117stymas \u2014 ~25 min."),
    bp("Pamokos fokusas \u2014 ~2 min. ", "Pasakykite mokiniams, kad \u0161iandien kalb\u0117sime apie tai, kaip kompiuteris veikia m\u016Bs\u0173 k\u016Bn\u0105 ir k\u0105 galime padaryti, kad ilgalaikis darbas nepakenkt\u0173 sveikatai."),

    bp("S\u0117d\u0117jimo laikysena ir darbo vieta \u2014 ~8 min. ", "Parodykite skaidr\u0117je teisingos ir neteisingos laikysenos palyginim\u0105. Paai\u0161kinkite:"),
    bi("Kojos ant grind\u0173, keliai ~90\u00B0 kampu."),
    bi("Nugara atremta \u012F k\u0117d\u0117s atlo\u0161\u0105, pe\u010Diai atpalaiduoti."),
    bi("Ekranas aki\u0173 lygyje arba \u0161iek tiek \u017Eemiau, ~50\u201370 cm atstumu."),
    bi("Rankos ant stalo, rie\u0161ai nesulenkti."),
    bp("Supratimo patikrinimas: ", q("Pa\u017Ei\u016Br\u0117kite, kaip dabar s\u0117dite. Kas neatitinka taisykli\u0173?") + " Leiskite 1\u20132 mokiniams pakomentuoti savo poz\u0105."),

    bp("Aki\u0173 sveikata ir 20-20-20 taisykl\u0117 \u2014 ~7 min. ", "Paai\u0161kinkite, kod\u0117l akys pavargsta (retas mirks\u0117jimas, fiksuotas fokusavimo atstumas). Pristatykite 20-20-20 taisykl\u0119: kas 20 minu\u010Di\u0173 \u2014 20 sekund\u017Ei\u0173 \u017Ei\u016Br\u0117ti \u012F ~6 m atstum\u0105."),
    bp("Supratimo patikrinimas: ", q("Kod\u0117l neu\u017Etenka tiesiog u\u017Emerkti akis 20 sekund\u017Ei\u0173?")),

    bp("Darbo\u2013poilsio ritmas ir pertraukos \u2014 ~5 min. ", "Paai\u0161kinkite: rekomenduojama kas 45\u201360 min. daryti 5\u201310 min. pertrauk\u0105. Trumpai aptarkite, k\u0105 daryti per pertrauk\u0105 (pasivaikš\u010Dioti, pasitempti, atsistoti)."),

    bp("Apibendrinimas su klase \u2014 ~3 min. ", "Paklauskite mokini\u0173: " + q("Kokius 3 dalykus pakeistum\u0117te savo darbo vietoje namuose?") + " 2\u20133 mokiniai atsako \u017Eod\u017Eiu."),

    h2("I\u0161\u0117jimo atgaminimas \u2014 ~3 min."),
    p("\u017Dodinis \u0161altojo kvietimo formatas. Klausimai skaidr\u0117je."),
    ni("Kokia taisyklinga s\u0117d\u0117jimo poza prie kompiuterio? \u012Evardinkite bent 2 dalykus.", "n2"),
    ni("K\u0105 rei\u0161kia 20-20-20 taisykl\u0117 ir kod\u0117l ji veikia?", "n2"),
    ni("Kod\u0117l pertraukos svarbios, net jei neskauda?", "n2"),

    h2("Pamokos apra\u0161ymas (dienynui)"),
    p("Pamokoje mokiniai susipa\u017Eino su ergonomikos principais dirbant kompiuteriu. Nagrin\u0117jo taisyklingos s\u0117d\u0117jimo laikysenos, ekrano pad\u0117ties, rank\u0173 pozicijos ir aki\u0173 poilsio taisykles. Aptar\u0117 20-20-20 taisykl\u0119 ir darbo\u2013poilsio ritmo svarb\u0105 ilgalaikei sveikatai.")
  ];
}

// ═══════════════════ LESSON 002 ═══════════════════
function plan002() {
  return [
    h1("Privatumas ir paskyr\u0173 sauga"),
    meta("Tipas:", "L \u2014 Mokymosi pamoka (2 i\u0161 4 apie saug\u0105)"),
    meta("Klas\u0117:", "9"),
    meta("Trukm\u0117:", "~40 min."),
    meta("Forma:", "Demo \u2192 bandymas"),
    meta("Temos ribos:", "\u0160i pamoka apima stipri\u0173 slapta\u017Eod\u017Ei\u0173 k\u016Brim\u0105, dviej\u0173 veiksni\u0173 autentifikacijos (2FA) logik\u0105 ir jautri\u0173 asmenini\u0173 duomen\u0173 atpa\u017Einim\u0105. Neapima internetini\u0173 gr\u0117smi\u0173 (phishing), aplinkos poveikio ar ergonomikos."),

    h2("Pamokos tikslai"),
    bi("Paai\u0161kinti, kas daro slapta\u017Eod\u012F stipr\u0173, ir sukurti slapta\u017Eod\u012F pagal saugumo kriterijus."),
    bi("Apib\u016Bdinti, kaip veikia dviej\u0173 veiksni\u0173 autentifikacija ir kod\u0117l ji padidina saugum\u0105."),
    bi("Atskirti saug\u0173 ir nesaug\u0173 elges\u012F su asmeniniais duomenimis konkre\u010Diose situacijose."),

    h2("\u012E\u017Eanginis atgaminimas \u2014 ~4 min."),
    p("\u017Dodinis \u0161altojo kvietimo formatas. Klausimai skaidr\u0117je."),
    p("Klausimai i\u0161 pra\u0117jusios pamokos (ergonomika):", { bold: true }),
    ni("Kokia tur\u0117t\u0173 b\u016Bti s\u0117d\u0117jimo laikysena prie kompiuterio? \u012Evardinkite 2 taisykles.", "n1"),
    ni("K\u0105 rei\u0161kia 20-20-20 taisykl\u0117?", "n1"),
    ni("Kod\u0117l reikia daryti pertraukas, net kai nesijau\u010Dia pavarg\u0119s?", "n1"),
    mp([rb("Ry\u0161ys: "), r(q("Praeit\u0105 pamok\u0105 kalb\u0117jome apie fizin\u0119 saug\u0105 \u2014 \u0161iandien kalb\u0117sime apie skaitmenin\u0119: kaip apsaugoti savo paskyras ir duomenis."))]),

    h2("D\u0117stymas ir vedama praktika \u2014 ~22 min."),
    bp("Slapta\u017Eod\u017Ei\u0173 sauga \u2014 ~10 min. ", "Parodykite skaidr\u0117je silpn\u0173 slapta\u017Eod\u017Ei\u0173 pavyzd\u017Eius: " + q("123456") + ", " + q("slaptazodis") + ", vardas+gimimo metai."),
    p("Paai\u0161kinkite stipraus slapta\u017Eod\u017Eio kriterijus:"),
    bi("\u226512 simboli\u0173."),
    bi("Did\u017Eiosios ir ma\u017Eosios raid\u0117s."),
    bi("Skai\u010Diai ir special\u016Bs simboliai."),
    bi("Ne asmenin\u0117 informacija."),
    bi("Kiekviena paskyra \u2014 skirtingas slapta\u017Eodis."),
    bp("Supratimo patikrinimas: ", q("Ar slapta\u017Eodis \u2018Katinas2024!\u2019 yra stiprus? Kod\u0117l taip arba ne?")),
    bp("Praktinis bandymas (~3 min.): ", "Mokiniai sugalvoja stipr\u0173 slapta\u017Eod\u012F pagal kriterijus (\u017Eod\u017Eiu, ne\u012Fvedant \u012F kompiuter\u012F). 2\u20133 mokiniai pasidalina logika, ne pa\u010Diu slapta\u017Eod\u017Eiu."),

    bp("Dviej\u0173 veiksni\u0173 autentifikacija \u2014 ~7 min. ", "Paai\u0161kinkite 2FA logik\u0105: ka\u017Ekas, k\u0105 \u017Einai (slapta\u017Eodis) + ka\u017Ekas, k\u0105 turi (telefonas/kodas). Parodykite skaidr\u0117je 2FA veikimo schem\u0105."),
    p("Paai\u0161kinkite: net jei slapta\u017Eodis pavogtas, be antrojo veiksnio prisijungti nepavyks."),
    bp("Da\u017Ena klaida: ", "manyti, kad 2FA = dviej\u0173 slapta\u017Eod\u017Ei\u0173 tur\u0117jimas."),

    bp("Jautr\u016Bs asmeniniai duomenys \u2014 ~5 min. ", "Paai\u0161kinkite: ne visi duomenys vienodai jautr\u016Bs. Parodykite pavyzd\u017Ei\u0173 skal\u0119: vardas (ma\u017Eai jautrus) \u2192 adresas \u2192 asmens kodas \u2192 banko duomenys (labai jautrus)."),
    bp("Paklauskite: ", q("Ar savo mokyklos pavadinim\u0105 galima skelbti vie\u0161ai? O nam\u0173 adres\u0105?")),

    h2("Savarankiška u\u017Eduotis \u2014 ~8 min."),
    p("U\u017Eduoties instrukcijos skaidr\u0117je. Mokytojas perskaito 5 situacijas. Mokiniai \u017Eod\u017Eiu atsakin\u0117ja: saugu ar nesaugu? Kod\u0117l?"),
    ni("Draugas pra\u0161o pasidalinti " + q("Netflix") + " slapta\u017Eod\u017Eiu.", "n2"),
    ni("Svetain\u0117 pra\u0161o gimimo datos registruojantis \u017Eaidimui.", "n2"),
    ni("Nepa\u017E\u012Fstamas asmuo socialiniame tinkle klausia, kurioje mokykloje mokaisi.", "n2"),
    ni("El. parduotuv\u0117 pra\u0161o nam\u0173 adreso pristatymui.", "n2"),
    ni("Klasiokas sako: " + q("Duok savo slapta\u017Eod\u012F, a\u0161 tik pa\u017Ei\u016Br\u0117siu."), "n2"),
    p("Po kiekvienos situacijos trumpai aptarkite teising\u0105 atsakym\u0105."),

    h2("I\u0161\u0117jimo atgaminimas \u2014 ~3 min."),
    p("\u017Dodinis \u0161altojo kvietimo formatas. Klausimai skaidr\u0117je."),
    ni("Kokie 3 kriterijai daro slapta\u017Eod\u012F stipr\u0173?", "n3"),
    ni("Kod\u0117l 2FA padeda, net jei slapta\u017Eodis pavogtas?", "n3"),
    ni("Ar savo vard\u0105 ir pavard\u0119 skelbti internete saugu? Nuo ko tai priklauso?", "n3"),

    h2("Pamokos apra\u0161ymas (dienynui)"),
    p("Pamokoje mokiniai nagrin\u0117jo skaitmenin\u0117s paskyr\u0173 saugos pagrindus: stipri\u0173 slapta\u017Eod\u017Ei\u0173 k\u016Brimo kriterijus, dviej\u0173 veiksni\u0173 autentifikacijos veikimo princip\u0105 ir jautri\u0173 asmenini\u0173 duomen\u0173 atpa\u017Einim\u0105. Analizavo konkre\u010Dias situacijas ir vertino, ar elgesys su duomenimis yra saugus.")
  ];
}

// ═══════════════════ LESSON 003 ═══════════════════
function plan003() {
  return [
    h1("Internetin\u0117s gr\u0117sm\u0117s ir saugaus reagavimo logika"),
    meta("Tipas:", "L \u2014 Mokymosi pamoka (3 i\u0161 4 apie saug\u0105)"),
    meta("Klas\u0117:", "9"),
    meta("Trukm\u0117:", "~40 min."),
    meta("Forma:", "Demo \u2192 bandymas"),
    meta("Temos ribos:", "\u0160i pamoka apima da\u017Eniausias internetines gr\u0117smes: phishing, \u012Ftartinas nuorodas, paty\u010Dias internete ir apgaulingas svetaines. Mokoma atpa\u017Einti gr\u0117sm\u0117s po\u017Eymius ir pasirinkti tinkam\u0105 reagavimo veiksm\u0105. Neapima ergonomikos, slapta\u017Eod\u017Ei\u0173 k\u016Brimo ar aplinkos poveikio."),

    h2("Pamokos tikslai"),
    bi("Atpa\u017Einti pagrindinius suk\u010Diavimo internete po\u017Eymius (phishing, apgaulingos nuorodos, netikri prane\u0161imai)."),
    bi("Klasifikuoti skaitmenines gr\u0117smes pagal tip\u0105 (suk\u010Diavimas, priekabiavimas, duomen\u0173 vagyst\u0117)."),
    bi("Pasirinkti tinkam\u0105 reagavimo veiksm\u0105 konkre\u010Diame gr\u0117sm\u0117s scenarijuje."),

    h2("\u012E\u017Eanginis atgaminimas \u2014 ~4 min."),
    p("\u017Dodinis \u0161altojo kvietimo formatas. Klausimai skaidr\u0117je."),
    p("Klausimai i\u0161 pra\u0117jusios pamokos (privatumas ir paskyr\u0173 sauga):", { bold: true }),
    ni("Kokie kriterijai daro slapta\u017Eod\u012F stipr\u0173? \u012Evardinkite bent 3.", "n1"),
    ni("Kaip veikia dviej\u0173 veiksni\u0173 autentifikacija?", "n1"),
    ni("Kod\u0117l negalima dalintis slapta\u017Eod\u017Eiu net su draugais?", "n1"),
    mp([rb("Ry\u0161ys: "), r(q("Praeit\u0105 pamok\u0105 mok\u0117m\u0117s apsaugoti paskyras. \u0160iandien \u2014 kaip atpa\u017Einti tuos, kurie bando jas atakuoti."))]),

    h2("D\u0117stymas ir vedama praktika \u2014 ~20 min."),
    bp("Phishing ir suk\u010Diavimas \u2014 ~8 min. ", "Parodykite skaidr\u0117je tikro ir suklastoto el. lai\u0161ko palyginim\u0105. Paai\u0161kinkite po\u017Eymius:"),
    bi("Netikslus siunt\u0117jo adresas (pvz., " + q("support@g00gle.com") + ")."),
    bi("Skubus tonas: " + q("J\u016Bs\u0173 paskyra bus u\u017Eblokuota per 24 val.")),
    bi("Nuorodos, kurios veda ne ten, kur ra\u0161o."),
    bi("Pra\u0161ymas pateikti asmeninius duomenis."),
    bp("Supratimo patikrinimas: ", q("Pagal k\u0105 supratote, kad \u0161is lai\u0161kas \u2014 suk\u010Diavimas?") + " (parodykite nauj\u0105 pavyzd\u012F)."),

    bp("Internetin\u0117s paty\u010Dios ir priekabiavimas \u2014 ~5 min. ", "Paai\u0161kinkite: paty\u010Dios \u2260 vienkartis konfliktas. Paty\u010Dios = pasikartojantis, ty\u010Dinis kenkimas."),
    p("K\u0105 daryti: neatsakin\u0117ti, fiksuoti (\u012Frodymai), prane\u0161ti suaugusiam, blokuoti."),
    bp("Paklauskite: ", q("Kuo skiriasi juokas nuo paty\u010Di\u0173 internete?")),

    bp("Apgaulingos svetain\u0117s ir netikri prane\u0161imai \u2014 ~4 min. ", "Parodykite suklastotos svetain\u0117s pavyzd\u012F (neteisingas URL, n\u0117ra HTTPS, prastas dizainas). Paai\u0161kinkite: " + q("Laim\u0117jote iPhone!") + " tipo prane\u0161imai \u2014 visada apgaul\u0117."),

    bp("Praktinis bandymas \u2014 ~3 min. ", "Parodykite 3 situacijas skaidr\u0117je. Mokiniai turi pasakyti gr\u0117sm\u0117s tip\u0105:"),
    bi("El. lai\u0161kas su nuoroda " + q("atnaujinti slapta\u017Eod\u012F") + " i\u0161 ne\u017Einomo adreso \u2192 phishing."),
    bi("Klasiokas nuolat siun\u010Dia \u012F\u017Eeid\u017Eian\u010Dias \u017Einutes grup\u0117je \u2192 paty\u010Dios."),
    bi("I\u0161\u0161okantis langas: " + q("J\u016Bs\u0173 kompiuteris u\u017Ekr\u0117stas!") + " \u2192 apgaulingas prane\u0161imas."),

    h2("Savarankiška u\u017Eduotis \u2014 ~8 min."),
    p("Mokytojas perskaito 4 scenarijus. Mokiniai \u017Eod\u017Eiu atsako: 1) kokia gr\u0117sm\u0117, 2) k\u0105 daryti."),
    ni("Gauni SMS: " + q("J\u016Bs\u0173 banko s\u0105skaita laikinai u\u017Eblokuota. Spauskite nuorod\u0105.") + " K\u0105 darai?", "n2"),
    ni("Socialiniame tinkle nepa\u017E\u012Fstamas \u017Emogus pra\u0161o susitikti gyvai. K\u0105 darai?", "n2"),
    ni("Draugas persiun\u010Dia nuorod\u0105 su tekstu " + q("pa\u017Ei\u016Br\u0117k, kas apie tave para\u0161yta") + ". K\u0105 darai?", "n2"),
    ni("Klasiokas vie\u0161ai dalinasi tavo nuotrauka su pa\u0161aipiomis komentarais. K\u0105 darai?", "n2"),
    p("Po kiekvieno scenarijaus trumpai aptarkite tinkam\u0105 reagavim\u0105."),

    h2("I\u0161\u0117jimo atgaminimas \u2014 ~3 min."),
    p("\u017Dodinis \u0161altojo kvietimo formatas. Klausimai skaidr\u0117je."),
    ni("Kokie 3 po\u017Eymiai rodo, kad el. lai\u0161kas gali b\u016Bti phishing?", "n3"),
    ni("K\u0105 reikia daryti, jei susid\u016Br\u0117i su paty\u010Diomis internete? \u012Evardink 2 veiksmus.", "n3"),
    ni("Kod\u0117l negalima spausti " + q("Laim\u0117jote priz\u0105!") + " tipo nuorod\u0173?", "n3"),

    h2("Pamokos apra\u0161ymas (dienynui)"),
    p("Pamokoje mokiniai susipa\u017Eino su da\u017Eniausiomis internetin\u0117mis gr\u0117sm\u0117mis: phishing suk\u010Diavimu, internetin\u0117mis paty\u010Diomis ir apgaulingomis svetain\u0117mis. Mok\u0117si atpa\u017Einti gr\u0117smi\u0173 po\u017Eymius ir rinkosi tinkam\u0105 reagavimo veiksm\u0105 konkre\u010Diose situacijose. Analizavo tikr\u0173 ir suklastot\u0173 prane\u0161im\u0173 skirtumus.")
  ];
}

// ═══════════════════ LESSON 004 ═══════════════════
function plan004() {
  return [
    h1("Skaitmenini\u0173 technologij\u0173 poveikis aplinkai"),
    meta("Tipas:", "L \u2014 Mokymosi pamoka (4 i\u0161 4 apie saug\u0105)"),
    meta("Klas\u0117:", "9"),
    meta("Trukm\u0117:", "~40 min."),
    meta("Forma:", "Trumpas \u012Fvadas \u2192 ilga praktika"),
    meta("Temos ribos:", "\u0160i pamoka apima skaitmenini\u0173 technologij\u0173 poveik\u012F aplinkai: energijos suvartojim\u0105 (duomen\u0173 centrai, \u012Frenginiai), elektronines atliekas (e-waste) ir galimybes ma\u017Einti neigiam\u0105 poveik\u012F. Neapima ergonomikos, privatumo ar internetini\u0173 gr\u0117smi\u0173."),

    h2("Pamokos tikslai"),
    bi("\u012Evardinti tris pagrindinius b\u016Bdus, kuriais skaitmenin\u0117s technologijos veikia aplink\u0105."),
    bi("Paai\u0161kinti prie\u017Easties\u2013pasekm\u0117s ry\u0161\u012F tarp skaitmeninio elgesio ir aplinkos poveikio."),
    bi("Pasi\u016Blyti bent vien\u0105 konkre\u010Di\u0105 priemon\u0119 neigiamam poveikiui ma\u017Einti."),

    h2("\u012E\u017Eanginis atgaminimas \u2014 ~4 min."),
    p("\u017Dodinis \u0161altojo kvietimo formatas. Klausimai skaidr\u0117je."),
    p("Klausimai i\u0161 pra\u0117jusios pamokos (internetin\u0117s gr\u0117sm\u0117s):", { bold: true }),
    ni("Kokie 3 po\u017Eymiai rodo, kad el. lai\u0161kas gali b\u016Bti phishing?", "n1"),
    ni("K\u0105 daryti, jei kas nors internete nuolat siun\u010Dia \u012F\u017Eeid\u017Eian\u010Dius prane\u0161imus?", "n1"),
    ni("Kod\u0117l " + q("Laim\u0117jote priz\u0105!") + " tipo prane\u0161imai visada apgaul\u0117?", "n1"),
    mp([rb("Ry\u0161ys: "), r(q("Ankstesn\u0117se pamokose kalb\u0117jome apie saug\u0105 \u017Emogui. \u0160iandien \u2014 apie poveik\u012F aplinkai."))]),

    h2("Trumpas \u012Fvadas \u2014 ~8 min."),
    p("Paai\u0161kinkite tris pagrindines poveikio kryptis:"),
    bp("1. Energijos suvartojimas \u2014 ", "duomen\u0173 centrai dirba 24/7, vartoja elektr\u0105 serveriams ir au\u0161inimui. Viena Google paie\u0161ka \u2248 0,3 Wh. Parodykite skaidr\u0117je duomen\u0173 centro nuotrauk\u0105."),
    bp("2. Elektronin\u0117s atliekos (e-waste) \u2014 ", "senus \u012Frenginius da\u017Enai i\u0161metame, o ne perdirbame. E-waste turi kenksming\u0173 med\u017Eiag\u0173 (gyvsidabris, \u0161vinas). Parodykite e-waste statistik\u0105."),
    bp("3. Gamybos p\u0117dsakas \u2014 ", "vieno i\u0161maniojo telefono gamyba sunaudoja daug vandens ir ret\u0173j\u0173 metal\u0173. Da\u017Enesnis keitimas = didesnis poveikis."),
    bp("Supratimo patikrinimas: ", q("Kas sunaudoja daugiau elektros \u2014 j\u016Bs\u0173 kompiuteris ar duomen\u0173 centras, kuris apdoroja j\u016Bs\u0173 u\u017Eklausas?")),

    h2("Prie\u017Eas\u010Di\u0173\u2013pasekmi\u0173 u\u017Eduotis \u2014 ~20 min."),
    p("Mokiniai dirba individualiai. U\u017Eduoties instrukcijos skaidr\u0117je."),
    p("U\u017Eduotis:", { bold: true }),
    p("Perskaitykite 4 situacijas. Kiekvienai nurodykite: 1) poveikio krypt\u012F (energija / e-waste / gamyba), 2) prie\u017East\u012F, 3) pasekm\u0119 aplinkai, 4) k\u0105 galima padaryti kitaip."),
    tbl([
      ["Situacija", "U\u017Eduotis"],
      ["Petras kasdien \u017Ei\u016Bri 3 val. vaizdo \u012Fra\u0161\u0173 HD kokyb\u0117je.", "Kokia poveikio kryptis? K\u0105 gal\u0117t\u0173 pakeisti?"],
      ["Monika kas metus perka nauj\u0105 telefon\u0105, o sen\u0105 i\u0161meta.", "Kokia pasekm\u0117 aplinkai? Koks alternatyvus sprendimas?"],
      ["Mokykloje visi kompiuteriai per nakt\u012F paliekami \u012Fjungti.", "Kokia prie\u017Eastis ir pasekm\u0117? K\u0105 pasi\u016Blytum\u0117te?"],
      ["Jonas naudojasi debesijos saugykla vietoj USB.", "Ar tai geriau aplinkai? Kod\u0117l taip arba ne?"]
    ]),
    p("Vaik\u0161\u010Diokite po klas\u0119. Steb\u0117kite, ar mokiniai teisingai identifikuoja poveikio kryptis. Jei pastebite pasikartojan\u010Di\u0105 klaid\u0105 \u2014 trumpam sustabdykite klas\u0119 ir aptarkite."),
    bp("Stipresniems mokiniams: ", "Para\u0161ykite vien\u0105 papildom\u0105 situacij\u0105 su savo prie\u017Easties\u2013pasekm\u0117s analize."),

    h2("I\u0161\u0117jimo atgaminimas \u2014 ~5 min."),
    p("\u017Dodinis \u0161altojo kvietimo formatas. Klausimai skaidr\u0117je."),
    ni("\u012Evardinkite 3 b\u016Bdus, kuriais skaitmenin\u0117s technologijos veikia aplink\u0105.", "n2"),
    ni("Kod\u0117l da\u017Enas telefono keitimas kenkia aplinkai?", "n2"),
    ni("K\u0105 galite padaryti, kad j\u016Bs\u0173 skaitmeninis p\u0117dsakas b\u016Bt\u0173 ma\u017Eesnis?", "n2"),

    h2("Pamokos apra\u0161ymas (dienynui)"),
    p("Pamokoje mokiniai nagrin\u0117jo skaitmenini\u0173 technologij\u0173 poveik\u012F aplinkai: energijos suvartojim\u0105, elektronines atliekas ir gamybos p\u0117dsak\u0105. Analizavo konkre\u010Dias situacijas, identifikavo prie\u017Easties\u2013pasekm\u0117s ry\u0161ius ir si\u016Bl\u0117 priemones neigiamam poveikiui ma\u017Einti.")
  ];
}

// ═══════════════════ LESSON 005 ═══════════════════
function plan005() {
  return [
    h1("Scenarij\u0173 rotacijos u\u017Eduotis"),
    meta("Tipas:", "I \u2014 Integravimo pamoka (5 i\u0161 7 saugos modulyje)"),
    meta("Klas\u0117:", "9"),
    meta("Trukm\u0117:", "~40 min."),
    meta("Forma:", "Trumpas \u012Fvadas \u2192 ilga praktika"),
    meta("Temos ribos:", "Mokiniai taiko vis\u0173 keturi\u0173 saugos tem\u0173 \u017Einias (ergonomika, privatumas, internetin\u0117s gr\u0117sm\u0117s, aplinkos poveikis) naujuose scenarijuose. Naujos teorijos nepristatoma. Tikslas \u2014 integruoti ir pritaikyti i\u0161mokt\u0105 med\u017Eiag\u0105."),

    h2("Pamokos tikslai"),
    bi("Pritaikyti anks\u010Diau i\u0161moktas saugos \u017Einias naujuose, nematytuose scenarijuose."),
    bi("Priimti pagr\u012Fst\u0105 sprendim\u0105 kiekvienoje saugos situacijoje ir paai\u0161kinti savo logik\u0105."),
    bi("Savarankiš\u0161kai u\u017Epildyti sprendim\u0173 lap\u0105 be mokytojo pagalbos."),

    h2("\u012E\u017Eanginis atgaminimas \u2014 ~4 min."),
    p("\u017Dodinis \u0161altojo kvietimo formatas. Klausimai skaidr\u0117je."),
    p("Klausimai apima visas keturias temas:", { bold: true }),
    ni("K\u0105 rei\u0161kia 20-20-20 taisykl\u0117? (ergonomika)", "n1"),
    ni("Kod\u0117l kiekvienai paskyrai reikia atskiro slapta\u017Eod\u017Eio? (privatumas)", "n1"),
    ni("K\u0105 daryti, gavus \u012Ftartin\u0105 el. lai\u0161k\u0105 su nuoroda? (gr\u0117sm\u0117s)", "n1"),
    ni("Kod\u0117l da\u017Enas \u012Frengini\u0173 keitimas kenkia aplinkai? (aplinka)", "n1"),
    mp([rb("Ry\u0161ys: "), r(q("\u0160iandien visas \u0161ias temas sujungsime \u012F vien\u0105 praktin\u0119 veikl\u0105."))]),

    h2("U\u017Eduoties pristatymas \u2014 ~4 min."),
    p("Paai\u0161kinkite veiklos tvark\u0105:"),
    bi("Kiekvienas mokinys gauna sprendim\u0173 lap\u0105 (Google Classroom)."),
    bi("Ekrane bus rodomos 6 situacijos \u2014 po vien\u0105."),
    bi("Kiekvienai situacijai reikia: 1) identifikuoti saugos srit\u012F, 2) pasirinkti veiksm\u0105, 3) pagr\u012Fsti " + q("nes...") + " formatu."),
    bi("Darbas individualus. Laikas kiekvienai situacijai ~3\u20134 min."),

    h2("Darbo blokas \u2014 ~25 min."),
    p("Mokiniai dirba individualiai su sprendim\u0173 lapu. Situacijos rodomos skaidr\u0117se po vien\u0105."),
    p("Situacij\u0173 pavyzd\u017Eiai:", { bold: true }),
    ni("Kolega mokykloje pra\u0161o pasi\u017Ei\u016Br\u0117ti jo el. pa\u0161t\u0105, nes pamir\u0161o slapta\u017Eod\u012F. K\u0105 darai ir kod\u0117l?", "n2"),
    ni("Dien\u0105 praleidai prie kompiuterio ra\u0161ydamas projekt\u0105. Vakare skauda akis ir sprand\u0105. K\u0105 dar\u0117i ne taip ir k\u0105 keistum?", "n2"),
    ni("Gauni prane\u0161im\u0105: " + q("J\u016Bs\u0173 paskyra buvo pasiekta i\u0161 naujo \u012Frenginio. Jei tai ne j\u016Bs, spauskite \u010Dia.") + " Nuoroda veda \u012F nepa\u017E\u012Fstam\u0105 svetain\u0119. K\u0105 darai?", "n2"),
    ni("T\u0117vai nori nupirkti nauj\u0105 plan\u0161et\u0119, nors senoji dar veikia. Tu galvoji apie aplink\u0105. K\u0105 pasi\u016Blytum ir kaip pagr\u012Fstum?", "n2"),
    ni("Socialiniame tinkle nepa\u017E\u012Fstamas \u017Emogus pra\u0161o tavo mokyklos pavadinimo ir klas\u0117s. K\u0105 atsakai ir kod\u0117l?", "n2"),
    ni("Draugas persiun\u010Dia nuorod\u0105: " + q("Tik pa\u017Ei\u016Br\u0117k, labai juokinga.") + " Nuoroda atrodo keistai. K\u0105 darai?", "n2"),
    bp("Mokytojo veiksmai: ", "Vaik\u0161\u010Diokite po klas\u0119. Nekonsultuokite bendrai \u2014 pad\u0117kite individualiai. Jei mokinys ne\u017Eino saugos srities \u2014 nukreipkite klausimu, neduokite atsakymo."),
    bp("Stipresniems mokiniams: ", "Para\u0161ykite savo situacij\u0105 vienai i\u0161 keturi\u0173 sri\u010Di\u0173 ir pateikite atsakym\u0105 su pagrindimu."),

    h2("I\u0161\u0117jimo atgaminimas \u2014 ~4 min."),
    p("\u017Dodinis \u0161altojo kvietimo formatas. Klausimai skaidr\u0117je."),
    ni("Kuri\u0105 situacij\u0105 buvo sunkiausia i\u0161spr\u0119sti ir kod\u0117l?", "n3"),
    ni("Kokia saugos sritis tau atrodo svarbiausia kasdieniame gyvenime?", "n3"),
    ni("Koks vienas dalykas, kur\u012F nuo \u0161iandien darysi kitaip?", "n3"),

    h2("Diferenciacija"),
    bi("Silpnesniems mokiniams: mokytojo pagalba identifikuojant saugos srit\u012F; u\u017Etenka trumpesnio pagrindimo."),
    bi("Stipresniems mokiniams: papildoma u\u017Eduotis \u2014 sukurti savo scenarij\u0173 ir pateikti atsakym\u0105."),

    h2("Pamokos apra\u0161ymas (dienynui)"),
    p("Pamokoje mokiniai pritaik\u0117 vis\u0173 keturi\u0173 saugos tem\u0173 \u017Einias naujuose scenarijuose: sprend\u0117 situacijas apie ergonomik\u0105, privatumo apsaug\u0105, internetines gr\u0117smes ir skaitmenin\u012F poveik\u012F aplinkai. Kiekvienu atveju identifikavo saugos srit\u012F, pasirinko veiksm\u0105 ir pagrind\u0117 savo sprendim\u0105. Darbas vyko individualiai, naudojant sprendim\u0173 lap\u0105.")
  ];
}

// ═══════════════════ LESSON 006 ═══════════════════
function plan006() {
  return [
    h1("Saugos kontrolinis s\u0105ra\u0161as ir da\u017En\u0173 klaid\u0173 per\u017Ei\u016Bra"),
    meta("Tipas:", "P \u2014 Pasiruo\u0161imo vertinimui pamoka (6 i\u0161 7 saugos modulyje)"),
    meta("Klas\u0117:", "9"),
    meta("Trukm\u0117:", "~40 min."),
    meta("Forma:", "Kartojimas + repeticija"),
    meta("Temos ribos:", "Pamoka apima vis\u0105 saugos modul\u012F: ergonomik\u0105, privatumo apsaug\u0105, internetines gr\u0117smes ir skaitmenin\u012F poveik\u012F aplinkai. Naujos teorijos nepristatoma. Tikslas \u2014 susisteminti \u017Einias, i\u0161siai\u0161kinti spragas ir pasipraktikuoti su vertinimo formato u\u017Eduotimis."),

    h2("Pamokos tikslai"),
    bi("Sudaryti strukt\u016Bruot\u0105 kontrolin\u012F s\u0105ra\u0161\u0105, apimant\u012F visas keturias saugos sritis."),
    bi("Identifikuoti bent 5 tipines klaidas, kurias mokiniai daro saugos temoje."),
    bi("Atlikti trump\u0105 praktikos u\u017Eduot\u012F, atitinkan\u010Di\u0105 vertinimo format\u0105."),

    h2("\u012E\u017Eanginis atgaminimas \u2014 ~5 min."),
    p("\u017Dodinis \u0161altojo kvietimo formatas. Klausimai skaidr\u0117je."),
    p("Klausimai apima visas keturias sritis:", { bold: true }),
    ni("K\u0105 rei\u0161kia 2FA ir kod\u0117l ji svarbi?", "n1"),
    ni("Kokie 3 phishing po\u017Eymiai el. lai\u0161ke?", "n1"),
    ni("Kod\u0117l e-waste yra problema?", "n1"),
    ni("Kokia taisyklinga s\u0117d\u0117jimo poza prie kompiuterio?", "n1"),

    h2("Vertinimo ap\u017Evalga \u2014 ~5 min."),
    p("Paai\u0161kinkite, ko mokiniai gali tik\u0117tis vertinime:"),
    bi("Mi\u0161raus formato u\u017Eduotis: scenarij\u0173 pasirinkimai ir trumpi pagrindimai."),
    bi("Bus 4 sritys: ergonomika, privatumas, gr\u0117sm\u0117s, aplinka."),
    bi("Kiekviename klausime reik\u0117s pagr\u012Fsti " + q("nes...") + " formatu."),
    bi("Da\u017Enos klaidos: per bendras pagrindimas (" + q("tiesiog svarbu") + "), srities supainiojimas."),
    p("Parodykite pasirengimo kontrolin\u012F s\u0105ra\u0161\u0105 skaidr\u0117je: ergonomika \u2192 privatumas \u2192 gr\u0117sm\u0117s \u2192 aplinka \u2192 pagrindimo strukt\u016Bra."),

    h2("Modelin\u0117 u\u017Eduotis su klase \u2014 ~5 min."),
    p("Parodykite vien\u0105 situacij\u0105 skaidr\u0117je:"),
    p(q("Gauni el. lai\u0161k\u0105 i\u0161 \u201Ebankas@secure-login.xyz\u201C su pra\u0161ymu patvirtinti savo duomenis per nuorod\u0105. Lai\u0161ke ra\u0161oma, kad paskyra bus u\u017Edaryta per 12 val."), { italics: true }),
    p("Kartu su klase aptarkite:"),
    bi("Kokia gr\u0117sm\u0117? (phishing)"),
    bi("Kokie po\u017Eymiai? (keistas adresas, skubumas, nuoroda)"),
    bi("K\u0105 daryti? (nespausti, prane\u0161ti, patikrinti tikr\u0105 banko svetain\u0119)"),
    bi("Pagrindimas: " + q("Nespaud\u017Eiu nuorodos, nes siunt\u0117jo adresas n\u0117ra oficialus banko domenas, o skubus tonas yra tipinis phishing po\u017Eymis.")),
    p("Akcentuokite pagrindimo strukt\u016Br\u0105: veiksmas + " + q("nes...") + " + konkretus argumentas."),

    h2("Savarankiška repeticija \u2014 ~12 min."),
    p("Trys trumpos situacin\u0117s u\u017Eduotys. Instrukcijos skaidr\u0117je. Mokiniai dirba individualiai."),
    bp("Situacija A: ", q("Klasiokas si\u016Blo naudoti t\u0105 pat\u012F slapta\u017Eod\u012F visoms paskyroms, nes taip lengviau prisiminti.")),
    p("Atsakykite: ar tai saugu? Pagr\u012Fskite 2 argumentais."),
    bp("Situacija B: ", q("Mokykloje pasteb\u0117jai, kad kolega s\u0117di labai pasilenk\u0119s \u012F ekran\u0105, akys 20 cm atstumu, dirba be pertraukos jau valand\u0105.")),
    p("Kokias 3 klaidas daro? K\u0105 pasi\u016Blytum\u0117te?"),
    bp("Situacija C: ", q("T\u0117vai nori i\u0161mesti sen\u0105, bet veikiant\u012F ne\u0161iojam\u0105j\u012F kompiuter\u012F ir nupirkti nauj\u0105.")),
    p("Kokia aplinkos problema? Pasi\u016Blykite alternatyv\u0105 ir pagr\u012Fskite."),
    bp("Mokytojo veiksmai: ", "Vaik\u0161\u010Diokite po klas\u0119. Steb\u0117kite tipinius klaidingus atsakymus \u2014 jie bus reikalingi kitai fazei."),

    h2("Da\u017Eniausios klaidos \u2014 ~5 min."),
    p("Remdamiesi tuo, k\u0105 mat\u0117te mokini\u0173 darbuose, trumpai per\u017Evelkite da\u017Eniausias klaidas:"),
    bi("Per bendras pagrindimas: " + q("tiesiog nesaugu") + " vietoj konkretaus argumento."),
    bi("Srities supainiojimas (pvz., phishing priskiriamas privatumui, o ne gr\u0117sm\u0117ms)."),
    bi("Ergonomikos taisykli\u0173 pamir\u0161imas (da\u017Enai pamir\u0161tamas 20-20-20)."),
    bi("E-waste ir energijos suvartojimo suplakimas \u012F vien\u0105."),
    bp("Savikontrol\u0117: ", "Paklauskite mokini\u0173 \u2014 k\u0105 dar reikia pasikartoti prie\u0161 vertinim\u0105?"),

    h2("I\u0161\u0117jimo atgaminimas \u2014 ~4 min."),
    p("\u017Dodinis \u0161altojo kvietimo formatas. Klausimai skaidr\u0117je."),
    ni("Vienas dalykas, kuris vertinime tikrai bus, ir kaip jam pasiruoši.", "n2"),
    ni("Viena klaida, kurios nori i\u0161vengti.", "n2"),
    ni("Kas tau dar neai\u0161ku prie\u0161 vertinim\u0105?", "n2"),

    h2("Pamokos apra\u0161ymas (dienynui)"),
    p("Pamokoje mokiniai ruo\u0161\u0117si saugos vertinimui: per\u017Ei\u016Br\u0117jo visas keturias saugos sritis (ergonomika, privatumas, gr\u0117sm\u0117s, aplinka), analizavo modelin\u0119 situacij\u0105 ir atliko tris savarankiš\u0161kas repeticines u\u017Eduotis vertinimo formatu. Aptartos da\u017Eniausios klaidos ir pagrindimo strukt\u016Bra.")
  ];
}

// ═══════════════════ LESSON 007 ═══════════════════
function plan007() {
  return [
    h1("Saugos strukt\u016Bruotas vertinimas"),
    meta("Tipas:", "A \u2014 Vertinimo pamoka (7 i\u0161 7 saugos modulyje)"),
    meta("Klas\u0117:", "9"),
    meta("Trukm\u0117:", "~40 min."),
    meta("Forma:", "Vertinimo pamoka"),
    meta("Temos ribos:", "Formalus vertinimas, apimantis vis\u0105 saugos modul\u012F: ergonomik\u0105, privatumo apsaug\u0105, internetines gr\u0117smes ir skaitmenini\u0173 technologij\u0173 poveik\u012F aplinkai. Mi\u0161raus formato u\u017Eduotis: scenarij\u0173 pasirinkimai ir trumpi ra\u0161ytiniai pagrindimai."),

    h2("Pamokos tikslai"),
    bi("Pritaikyti saugos principus nematytuose scenarijuose ir pasirinkti teising\u0105 veiksm\u0105."),
    bi("Pagr\u012Fsti savo sprendimus trumpais ra\u0161ytiniais argumentais."),
    bi("Parodyti integruot\u0105 supratim\u0105 visose keturiose saugos srityse."),

    h2("Trumpas paai\u0161kinimas \u2014 ~3 min."),
    p("Paai\u0161kinkite vertinimo tvark\u0105:"),
    bi("Vertinimas vyksta individualiai, ra\u0161tu."),
    bi("U\u017Eduoties lap\u0105 gausite per Google Classroom (arba popierine versija)."),
    bi("Laikas: ~35 min."),
    bi("Bus 8\u201310 klausim\u0173 i\u0161 vis\u0173 keturi\u0173 sri\u010Di\u0173."),
    bi("Kiekviename klausime: pasirinkite teising\u0105 veiksm\u0105 ir pagr\u012Fskite " + q("nes...") + " formatu."),
    bi("Kuo konkretesnis pagrindimas \u2014 tuo daugiau ta\u0161k\u0173."),
    p("Atsakykite \u012F mokini\u0173 klausimus d\u0117l tvarkos. Po to \u2014 i\u0161dalinkite u\u017Eduotis."),

    h2("Vertinimo u\u017Eduotis \u2014 ~34 min."),
    p("Mokiniai dirba individualiai ir tyliai."),
    p("Vertinimo u\u017Eduoties pavyzdin\u0117 strukt\u016Bra:", { bold: true }),
    tbl([
      ["Sritis", "Klausim\u0173 tipai"],
      ["Ergonomika", "Situacija + taisyklingos laikysenos identifikavimas, prie\u017Eas\u010Di\u0173 paai\u0161kinimas"],
      ["Privatumas", "Scenarijus + saugaus/nesaugaus elgesio pasirinkimas, slapta\u017Eod\u017Eio vertinimas"],
      ["Internetin\u0117s gr\u0117sm\u0117s", "Gr\u0117sm\u0117s tipo atpa\u017Einimas, reagavimo veiksmo pasirinkimas ir pagrindimas"],
      ["Aplinkos poveikis", "Situacija + poveikio krypties identifikavimas, sprendimo pasi\u016Blymas"]
    ]),
    bp("Mokytojo veiksmai: ", "S\u0117d\u0117kite prie stalo arba tyliai vaik\u0161\u010Diokite. Atsakin\u0117kite tik \u012F klausimus d\u0117l u\u017Eduoties formuluo\u010Di\u0173 (ne turinio). Steb\u0117kite laik\u0105 \u2014 \u012Fpus\u0117jus laikui, prane\u0161kite mokiniams."),
    bp("Likus ~5 min.: ", "Prane\u0161kite, kad laikas baigiasi. Priminkite patikrinti, ar visi klausimai atsakyti."),
    p("Surinkite darbus arba \u012Fsitikinkite, kad visi pateik\u0117 per Google Classroom."),

    h2("Pamokos apra\u0161ymas (dienynui)"),
    p("Pamokoje vyko formalus saugos modulio vertinimas. Mokiniai individualiai atliko mi\u0161raus formato u\u017Eduot\u012F, apiman\u010Di\u0105 ergonomik\u0105, privatumo apsaug\u0105, internetines gr\u0117smes ir skaitmenini\u0173 technologij\u0173 poveik\u012F aplinkai. Kiekviename klausime reik\u0117jo pasirinkti teising\u0105 veiksm\u0105 ir pagr\u012Fsti sprendim\u0105 ra\u0161tu.")
  ];
}

// ═══════════════════ MAIN ═══════════════════
const BASE = "C:/Users/Paulius/Documents/informatika-curriculum/Grade_9/Semester_1/01_Safety";

const plans = [
  { fn: plan001, dir: "001_L - Ergonomics & healthy computer use" },
  { fn: plan002, dir: "002_L - Privacy & account safety" },
  { fn: plan003, dir: "003_L - Online risks & safe response logic" },
  { fn: plan004, dir: "004_L - Environmental impact of digital technologies" },
  { fn: plan005, dir: "005_I - Scenario rotation task" },
  { fn: plan006, dir: "006_P - Safety checklist rehearsal + common mistake review" },
  { fn: plan007, dir: "007_A - Safety structured assessment" },
];

async function main() {
  const results = [];
  for (const { fn, dir } of plans) {
    const doc = buildDoc(fn());
    const buffer = await Packer.toBuffer(doc);
    const outPath = path.join(BASE, dir, "Teacher_Plan.docx");
    try {
      fs.writeFileSync(outPath, buffer);
      console.log("Created:", outPath);
      results.push({ dir, ok: true });
    } catch (e) {
      if (e.code === 'EBUSY') {
        // File locked — write to temp name
        const tmpPath = path.join(BASE, dir, "Teacher_Plan_NEW.docx");
        fs.writeFileSync(tmpPath, buffer);
        console.log("LOCKED — wrote to:", tmpPath);
        results.push({ dir, ok: false, tmp: tmpPath });
      } else { throw e; }
    }
  }
  const locked = results.filter(r => !r.ok);
  if (locked.length) {
    console.log("\n⚠ " + locked.length + " file(s) were locked. Close them in Word, then rename Teacher_Plan_NEW.docx → Teacher_Plan.docx");
  }
  console.log("\nDone. " + results.filter(r=>r.ok).length + "/7 files written directly.");
}

main().catch(err => { console.error(err); process.exit(1); });
