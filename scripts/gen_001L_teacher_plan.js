const { Packer } = require("docx");
const fs = require("fs");
const h = require("./plan_helpers");

const content = [
  // ── Title ──────────────────────────────────────────────────────
  ...h.title("Ergonomika ir sveikas kompiuterio naudojimas"),

  // ── Metadata ───────────────────────────────────────────────────
  h.metaCard([
    ["Tipas", "L \u2014 Mokymosi pamoka (1 iš 4 apie saugą)"],
    ["Klasė", "9"],
    ["Trukmė", "~40 min."],
    ["Forma", "Demo \u2192 bandymas"],
    ["Temos ribos", "Ši pamoka apima ergonomikos principus dirbant kompiuteriu: taisyklingą sėdėjimo laikyseną, ekrano atstumą ir kampą, rankų padėtį, akių poilsio taisyklę (20-20-20), nuovargį šalinančius pratimus ir darbo\u2013poilsio ritmą. Neapima privatumo, paskyrų saugos ar rizikų internete."],
  ]),

  h.spacer(),

  // ── Objectives ─────────────────────────────────────────────────
  h.objectivesBox([
    "Įvardinti pagrindinius ergonomikos principus (laikysena, ekrano padėtis, rankų pozicija, pertraukos).",
    "Paaiškinti, kaip kiekvienas principas padeda išvengti ilgalaikių sveikatos problemų.",
    "Pademonstruoti taisyklingą sėdėjimo pozą ir ekrano padėtį savo darbo vietoje.",
    "Atlikti kelis nuovargį šalinančius pratimus (akių, rankų, nugaros).",
  ]),

  // ── Start retrieval ────────────────────────────────────────────
  ...h.phaseHeader("Pamokos pradžios klausimai", "~3 min.", h.C.RETRIEVAL),

  h.labeledText("Formatas:", "žodinis."),
  h.bodyPara("Tai pirma metų pamoka \u2014 klausimai remiasi bendra patirtimi, ne praeita pamoka.", { keepNext: true }),

  h.question(1, "Ar tau kartais skauda nugarą arba akis po ilgo darbo prie kompiuterio? Kodėl taip manai?", h.C.RETRIEVAL),
  h.question(2, "Kiek laiko iš eilės paprastai sėdi prie ekrano namuose?", h.C.RETRIEVAL),
  h.question(3, "Ar esi girdėjęs kokią nors taisyklę apie sveiką kompiuterio naudojimą?", h.C.RETRIEVAL),

  h.bridgeText("(Ryšys su nauja tema: \u201EŠiandien sužinosime, kodėl šie dalykai vyksta ir kaip jų išvengti \u2014 tai vadinasi ergonomika.\u201C)"),

  // ── Teaching phase ─────────────────────────────────────────────
  ...h.phaseHeader("Dėstymas", "~20 min.", h.C.TEACHING),

  h.bodyPara("Pamokos fokusas (~2 min.): parodykite ekrane žmogų, sėdintį netaisyklingai prie kompiuterio. Paklauskite: \u201EKas čia blogai?\u201C Surinkite 2\u20133 atsakymus ir pasakykite, kad šiandien sistemingai viską aptarsite.", { keepNext: true }),

  // Sub-block 1
  h.subBlockHeading("Laikysena ir sėdėjimas", "~5 min."),
  h.bodyPara("Paaiškinkite taisyklingos laikysenos principus. Demonstruokite prie savo stalo:"),
  h.bulletPara("Nugaros atrama \u2014 nugara liečia kėdės atlošą, ne palinkusi į priekį."),
  h.bulletPara("Pėdos ant grindų \u2014 kojos nesukryžiuotos, keliai ~90\u00B0 kampu."),
  h.bulletPara("Rankos \u2014 alkūnės ~90\u00B0 kampu, riešai tiesūs, ne sulenkti."),
  h.bulletPara("Ekranas \u2014 viršutinė ekrano riba akių lygyje, atstumas ~50\u201370 cm."),
  h.warningBox(
    "mokiniai mano, kad \u201Epatogi poza\u201C = taisyklinga poza.",
    "patogi poza dažnai yra bloga \u2014 taisyklinga poza iš pradžių gali jaustis neįprastai."
  ),

  // Sub-block 2
  h.subBlockHeading("20-20-20 taisyklė", "~4 min."),
  h.bodyPara("Paaiškinkite: kas 20 minučių \u2014 20 sekundžių žiūrėti į objektą, esantį bent 20 pėdų (~6 m) atstumu."),
  h.bodyPara("Kodėl veikia: akių raumenys atsipalaiduoja, kai fokusuojasi į tolimą tašką. Ilgas žiūrėjimas į artimą ekraną sukelia nuovargį ir sausumą."),
  h.warningBox(
    "mokiniai sako \u201Eaš tiesiog mirkteliu \u2014 to pakanka\u201C.",
    "mirksėjimas \u2014 ne tas pats. Reikia 20 sekundžių žiūrėjimo į tolį, kad raumenys atsipalaiduotų."
  ),

  // Sub-block 3
  h.subBlockHeading("Darbo\u2013poilsio ritmas", "~4 min."),
  h.bodyPara("Paaiškinkite, kad po 45\u201350 min. darbo prie ekrano reikia 5\u201310 min. pertraukos."),
  h.bodyPara("Per pertrauką: atsistoti, pasivaikščioti, atlikti pratimus. Ne pereiti prie telefono ekrano."),
  h.bodyPara("Priežastis: ilgas sėdėjimas mažina kraujotaką, didina nugaros ir kaklo įtampą."),

  // Sub-block 4
  h.subBlockHeading("Nuovargį šalinantys pratimai", "~5 min."),
  h.bodyPara("Parodykite ir kartu su klase atlikite:"),
  h.bulletPara("Akių pratimai: žiūrėti į tolį \u2192 į artumą, sukioti akis ratu (po 10 s kiekviena kryptimi)."),
  h.bulletPara("Rankų pratimai: ištiesti rankas į priekį, sukioti riešus, sugniaužti\u2013atgniaužti kumščius."),
  h.bulletPara("Nugaros pratimai: atsistoti, pakelti rankas virš galvos, pasilenkti į šonus."),
  h.bodyPara("Pabrėžkite: šiuos pratimus galima ir reikia daryti namuose."),

  // ── Application phase ──────────────────────────────────────────
  ...h.phaseHeader("Taikymo užduotis", "~8 min.", h.C.APPLICATION),

  h.bodyPara("Mokiniai praktiškai taiko tai, ką išmoko.", { keepNext: true }),
  h.bodyParaRuns([h.txt("Užduotis: ", { bold: true, color: h.C.LABEL }), h.txt("\u201EPatikrinkite ir sureguliuokite savo darbo vietą.\u201C")]),
  h.bodyPara("Kiekvienas mokinys prie savo stalo:"),
  h.bodyParaRuns([h.txt("1. ", { bold: true }), h.txt("Patikrina savo sėdėjimo pozą pagal aptartus principus.")]),
  h.bodyParaRuns([h.txt("2. ", { bold: true }), h.txt("Sureguliuoja kėdės aukštį ir ekrano kampą (kiek leidžia įranga).")]),
  h.bodyParaRuns([h.txt("3. ", { bold: true }), h.txt("Pasako garsiai klasei bent 1 dalyką, kurį pakeitė.")]),
  h.bodyParaRuns([h.txt("4. ", { bold: true }), h.txt("Atlieka 20-20-20 pratimą kartu su klase (mokytojas skaičiuoja 20 s).")]),
  h.labeledText("Stebėkite:", "ar mokiniai tikrai keičia pozą, o ne tik sako \u201Eviskas gerai\u201C. Jei matote tipinę klaidą \u2014 sustabdykite ir parodykite visai klasei."),
  h.bodyPara("Apibendrinimas (~2 min.): paklauskite 2\u20133 mokinių: \u201EKą pakeitei ir kodėl?\u201C Pabrėžkite, kad šiuos principus reikia taikyti kiekvieną dieną, ne tik šiandien."),

  // ── End retrieval ──────────────────────────────────────────────
  ...h.phaseHeader("Pamokos pabaigos klausimai", "~3 min.", h.C.RETRIEVAL),

  h.labeledText("Formatas:", "žodinis."),
  h.question(1, "Įvardink 3 taisyklingos sėdėjimo principus \u2014 negalima kartoti to, ką pasakė prieš tai kalbėjęs.", h.C.RETRIEVAL),
  h.question(2, "Kas yra 20-20-20 taisyklė ir kodėl ji veikia? Paaiškink savais žodžiais.", h.C.RETRIEVAL),
  h.question(3, "Papasakok vieną pratimą, kurį gali daryti namuose po ilgo sėdėjimo prie kompiuterio.", h.C.RETRIEVAL),

  // ── Diary ──────────────────────────────────────────────────────
  ...h.diarySection("Pamokos metu mokiniai susipažino su ergonomikos principais dirbant kompiuteriu: taisyklinga sėdėjimo laikysena, ekrano padėtis, 20-20-20 akių poilsio taisyklė, darbo ir poilsio ritmas. Praktiškai atliko nuovargį šalinančius pratimus (akių, rankų, nugaros) ir sureguliavo savo darbo vietą pagal aptartus principus. Aptarė, kodėl kiekvienas principas padeda išvengti ilgalaikių sveikatos problemų."),
];

const doc = h.buildPlanDoc(content);
const outPath = "Grade_9/Semester_1/01_Safety/001_L - Ergonomics & healthy computer use/Teacher_Plan.docx";
Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync(outPath, buf);
  console.log("✓ " + outPath);
});
