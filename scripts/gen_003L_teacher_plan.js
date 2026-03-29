const { Packer } = require("docx");
const fs = require("fs");
const h = require("./plan_helpers");

const content = [
  // ── Title ──────────────────────────────────────────────────────
  ...h.title("Internetinės rizikos ir saugaus reagavimo logika"),

  // ── Metadata ───────────────────────────────────────────────────
  h.metaCard([
    ["Tipas", "L \u2014 Mokymosi pamoka (3 iš 4 apie saug\u0105)"],
    ["Klas\u0117", "9"],
    ["Trukm\u0117", "~40 min."],
    ["Forma", "Demo \u2192 bandymas"],
    ["Temos ribos", "Pamoka apima dažniausias internetines grėsmes: phishing, socialinę inžineriją ir melagienų sklaidą. Mokiniai mokosi atpažinti tipinius phishing požymius ir taikyti saugaus reagavimo algoritmą: sustoti \u2192 patikrinti \u2192 pranešti. Neapima kibernetinių atakų techninio veikimo, antivirusinių programų ar programinės įrangos saugumo."],
  ]),

  h.spacer(),

  // ── Objectives ─────────────────────────────────────────────────
  h.objectivesBox([
    "Atpažinti dažniausias internetines grėsmes: phishing, socialinę inžineriją, melagienų sklaidą.",
    "Apibūdinti tipinius phishing žinutės požymius ir paaiškinti, kodėl jie kelia pavojų.",
    "Pritaikyti saugaus reagavimo algoritmą: sustoti \u2192 patikrinti \u2192 pranešti.",
  ]),

  // ── Start retrieval ────────────────────────────────────────────
  ...h.phaseHeader("Pamokos pradžios klausimai", "~4 min.", h.C.RETRIEVAL),

  h.labeledText("Formatas:", "žodinis. Klausimai skaidrėje."),
  h.labeledText("Klausimai iš praėjusios pamokos (privatumas ir paskyrų sauga):", ""),

  h.question(1, "Įvardinkite bent 3 stipraus slaptažodžio kriterijus.", h.C.RETRIEVAL),
  h.question(2, "Kaip dviejų veiksnių autentifikacija apsaugo paskyrą net tada, kai slaptažodis pavogtas?", h.C.RETRIEVAL),
  h.question(3, "Klasiokas prašo jūsų paskyros slaptažodžio \u201Etik pažiūrėti\u201C. Kaip reaguotumėte ir kodėl?", h.C.RETRIEVAL),

  h.bridgeText("Ryšys su nauja tema: \u201EPraeitą pamoką kalbėjome apie saugą iš jūsų pusės: slaptažodžiai, 2FA, duomenys. Šiandien pažiūrėsime iš kitos pusės: kaip kiti bando jus apgauti.\u201C"),

  // ── Teaching phase ─────────────────────────────────────────────
  ...h.phaseHeader("Dėstymas ir vedama praktika", "~20 min.", h.C.TEACHING),

  // Sub-block 1: Phishing
  h.subBlockHeading("Phishing", "~7 min."),
  h.labeledText("Apibrėžimas:", "phishing \u2014 bandymas apgaule išvilioti asmeninius duomenis (slaptažodžius, kortelės numerius) apsimetant patikimu šaltiniu."),
  h.bodyPara("Parodykite skaidrėje phishing el. laiško pavyzdį. Kartu su klase aptarkite, kas kelia įtarimą."),
  h.bodyPara("Tipiniai phishing požymiai:"),
  h.bulletPara("Skubos spaudimas (\u201EPer 24 val. jūsų paskyra bus užblokuota!\u201C)"),
  h.bulletPara("Netikėtas arba nežinomas siuntėjas"),
  h.bulletPara("Prašoma asmeninės informacijos (slaptažodžiai, kortelės numeriai)"),
  h.bulletPara("Klaidos tekste, keistas formatavimas"),
  h.bulletPara("Nuoroda, kuri neatitinka tikrojo adreso"),
  h.warningBox(
    "mokiniai mano, kad phishing būna tik el. paštu.",
    "Phishing gali būti el. laiške, SMS žinutėje, socialinio tinklo žinutėje ar net skambutyje."
  ),

  // Sub-block 2: Social engineering
  h.subBlockHeading("Socialinė inžinerija", "~5 min."),
  h.labeledText("Apibrėžimas:", "manipuliacija žmonėmis siekiant, kad jie savanoriškai atiduotų informaciją arba atliktų veiksmą."),
  h.bodyPara("Paaiškinkite: phishing yra viena socialinės inžinerijos formų, bet ne vienintelė."),
  h.bodyPara("Kiti pavyzdžiai:"),
  h.bulletPara("Apsimetimas IT darbuotoju ar mokytoju"),
  h.bulletPara("Emocinis spaudimas per socialinius tinklus (\u201EJei neatsiųsi, nebūsime draugai\u201C)"),
  h.bulletPara("Netikri konkursai ir prizai"),
  h.labeledText("Pagrindinė mintis:", "atakuojamas žmogus, ne kompiuteris."),

  // Sub-block 3: Misinformation vs disinformation
  h.subBlockHeading("Klaidinga informacija ir dezinformacija", "~4 min."),
  h.bodyPara("Klaidinga informacija (angl. misinformation): netiksli informacija, platinama netyčia. Žmogus pats tiki, kad tai tiesa."),
  h.bodyPara("Dezinformacija (angl. disinformation): sąmoningai kuriama ir platinama melaginga informacija. Tikslas \u2014 apgauti."),
  h.labeledText("Skirtumas:", "tikslas. Klaidingą informaciją platina nežinodami, dezinformaciją \u2014 tyčia."),
  h.bodyPara("Pavyzdžiai: netikros naujienos, manipuliuotos nuotraukos, suklastoti vaizdo įrašai."),

  // Sub-block 4: Algorithm
  h.subBlockHeading("Algoritmas: SUSTOTI \u2192 PATIKRINTI \u2192 PRANEŠTI", "~4 min."),
  h.bodyPara("Parodykite skaidrėje algoritmo schemą. Aptarkite kiekvieną žingsnį:"),
  h.bodyParaRuns([h.txt("SUSTOTI: ", { bold: true, color: h.C.APPLICATION }), h.txt("nespausti nuorodų, neatsakyti, nesidalinti informacija.")]),
  h.bodyParaRuns([h.txt("PATIKRINTI: ", { bold: true, color: h.C.APPLICATION }), h.txt("ar siuntėjas tikras? Ar informacija patvirtinta kituose šaltiniuose? Ar nuorodos adresas atrodo teisingas?")]),
  h.bodyParaRuns([h.txt("PRANEŠTI: ", { bold: true, color: h.C.APPLICATION }), h.txt("informuoti mokytoją, tėvus arba paskyros administratorių.")]),
  h.warningBox(
    "mokiniai sako \u201Etiesiog ignoruočiau\u201C vietoj pilno algoritmo.",
    "Ignoruoti neužtenka. Algoritmas reikalauja aktyvaus patikrinimo ir pranešimo, ne tik pasyvaus neveikimo."
  ),

  // ── Application phase ──────────────────────────────────────────
  ...h.phaseHeader("Savarankiška užduotis", "~10 min.", h.C.APPLICATION),

  h.bodyPara("Užduoties instrukcijos skaidrėje. Perskaitysite 4 situacijas. Kiekvienai situacijai mokiniai žodžiu atsako:", { keepNext: true }),
  h.bulletPara("Koks grėsmės tipas? (phishing, socialinė inžinerija, dezinformacija)"),
  h.bulletPara("Ką konkrečiai darytumėte kiekviename algoritmo žingsnyje?"),
  h.bulletPara("Pagrįskite savo sprendimą vienu sakiniu."),

  h.spacer(200),
  h.labeledText("Situacijos:", ""),
  h.bodyParaRuns([h.txt("1. ", { bold: true }), h.txt("Gavote el. laišką: \u201ESveiki, jūsų \u201EInstagram\u201C paskyra bus ištrinta per 12 valandų. Patvirtinkite savo duomenis čia: www.instagrarn-security.com.\u201C")]),
  h.bodyParaRuns([h.txt("2. ", { bold: true }), h.txt("Klasiokas sako: \u201EDuok savo \u201EGoogle Classroom\u201C slaptažodį, aš tau padėsiu padaryti namų darbus, nes mano kompiuteris neveikia.\u201C")]),
  h.bodyParaRuns([h.txt("3. ", { bold: true }), h.txt("Socialiniame tinkle matote straipsnį: \u201EMokslininkai įrodė, kad telefonų spinduliuotė sukelia galvos skausmą.\u201C Straipsnyje nėra nuorodų į tyrimus, svetainė neturi kontaktų skilties.")]),
  h.bodyParaRuns([h.txt("4. ", { bold: true }), h.txt("Gaunate SMS žinutę: \u201ESveikiname! Laimėjote 500 \u20AC dovanų kortelę. Norėdami atsiimti, įveskite banko kortelės duomenis: www.prize-lt.com/claim.\u201C")]),

  h.spacer(120),
  h.bodyPara("Vaikščiokite po klasę. Stebėkite: ar mokiniai ne tik identifikuoja grėsmės tipą, bet ir pritaiko pilną algoritmą. Jei kažkas sako tik \u201Etai phishing\u201C, paklauskite: \u201EGerai, o ką konkrečiai darytumėte? Pradėkite nuo pirmo žingsnio.\u201C"),

  // ── End retrieval ──────────────────────────────────────────────
  ...h.phaseHeader("Pamokos pabaigos klausimai", "~3 min.", h.C.RETRIEVAL),

  h.labeledText("Formatas:", "žodinis. Klausimai skaidrėje."),
  h.question(1, "Įvardinkite 3 tipinius phishing žinutės požymius.", h.C.RETRIEVAL),
  h.question(2, "Kuo skiriasi klaidinga informacija nuo dezinformacijos? Pateikite po vieną pavyzdį.", h.C.RETRIEVAL),
  h.question(3, "Gavote el. laišką iš nežinomo siuntėjo, kuriame teigiama, kad jūsų paskyra pažeista. Kaip pritaikytumėte tris algoritmo žingsnius?", h.C.RETRIEVAL),

  // ── Extra materials ────────────────────────────────────────────
  ...h.diarySection("Mokiniai susipažino su pagrindinėmis internetinėmis grėsmėmis: phishing, socialine inžinerija ir melagienų sklaida. Išmoko atpažinti tipinius phishing požymius ir suprasti manipuliacijos mechanizmus. Pamokos metu įsisavino saugaus reagavimo algoritmą (sustoti, patikrinti, pranešti) ir pritaikė jį analizuodami konkrečias situacijas."),
];

const doc = h.buildPlanDoc(content);
const outPath = "Grade_9/Semester_1/01_Safety/003_L - Online risks & safe response logic/Teacher_Plan.docx";
Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync(outPath, buf);
  console.log("\u2713 " + outPath);
});
