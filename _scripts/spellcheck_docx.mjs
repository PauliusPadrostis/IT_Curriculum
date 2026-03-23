/**
 * Lithuanian spell-checker for Theory Pack .docx files.
 * Extracts text from docx, runs nspell with lt dictionary,
 * reports misspelled words with context.
 *
 * Usage: node _scripts/spellcheck_docx.mjs <path-to-docx>
 */
import fs from "fs";
import nspell from "nspell";
import dictionaryLt from "dictionary-lt";

// ── Extract text from docx XML ──
async function extractText(docxPath) {
  // docx is a ZIP — extract word/document.xml
  const { Blob } = await import("buffer");
  const JSZip = (await import("jszip")).default;
  const data = fs.readFileSync(docxPath);
  const zip = await JSZip.loadAsync(data);
  const xml = await zip.file("word/document.xml").async("string");

  // Extract text from <w:t> elements
  const texts = [];
  const re = /<w:t[^>]*>([^<]+)<\/w:t>/g;
  let m;
  while ((m = re.exec(xml)) !== null) {
    texts.push(m[1]);
  }
  return texts.join(" ");
}

// ── Tokenize Lithuanian text ──
function tokenize(text) {
  // Split on non-letter characters, keep Lithuanian letters
  return text
    .replace(/[0-9]+/g, " ")          // Remove numbers
    .replace(/[""„"«»()!?;:,./\-–—•\u2022\u2014\u2013@#$%^&*=+\[\]{}|\\<>~`']/g, " ")
    .split(/\s+/)
    .map(w => w.trim())
    .filter(w => w.length >= 2);       // Skip single chars
}

// ── Known-good words (abbreviations, proper nouns, technical terms) ──
const WHITELIST = new Set([
  // Abbreviations
  "2FA", "SMS", "PIN", "USB", "BDAR", "NCSC", "NKSC", "HN", "UK",
  "pvz", "sek", "min", "cm", "angl",
  // Technical terms / proper nouns
  "Bitwarden", "KeePass", "Google", "Authenticator", "Instagram",
  "phishing", "el", "ENISA", "Microsoft", "NordPass",
  // English terms in bilingual format
  "password", "two", "factor", "authentication", "personal", "data",
  "privacy", "settings", "digital", "identity", "manager", "social",
  "engineering", "monitor", "display", "ergonomics", "posture",
  "eye", "strain", "work", "rest", "schedule", "hygiene", "standard",
  "rule",
  // Common Lithuanian words nspell may not know
  "programėlė", "programėlėje", "autentifikacija", "autentifikacijos",
  "autentifikavimas", "autentifikavimo", "kibernetinio", "kibernetinių",
  "skaitmeninė", "skaitmeninę", "skaitmeninės", "skaitmeninis",
  "skaitmeninio", "skaitmeninių",
  "interaktyvus", "interaktyvių",
]);

async function main() {
  const docxPath = process.argv[2];
  if (!docxPath) {
    console.error("Usage: node spellcheck_docx.mjs <path-to-docx>");
    process.exit(1);
  }

  // Load dictionary
  const spell = nspell(dictionaryLt);

  // Extract and tokenize
  const text = await extractText(docxPath);
  const words = tokenize(text);

  // Check each word
  const misspelled = [];
  const seen = new Set();

  for (const word of words) {
    const lower = word.toLowerCase();
    if (seen.has(lower)) continue;
    seen.add(lower);

    // Skip whitelisted
    if (WHITELIST.has(word) || WHITELIST.has(lower)) continue;

    // Skip if it looks like English (in parenthetical bilingual terms)
    if (/^[a-z]+$/.test(word) && !/[ąčęėįšųūž]/.test(word) && word.length <= 15) continue;

    if (!spell.correct(word) && !spell.correct(lower) && !spell.correct(capitalize(word))) {
      const suggestions = spell.suggest(lower).slice(0, 3);
      misspelled.push({ word, suggestions });
    }
  }

  // Report
  if (misspelled.length === 0) {
    console.log("✓ Rašybos klaidų nerasta.");
  } else {
    console.log(`✗ Rasta ${misspelled.length} galimų klaidų:\n`);
    for (const { word, suggestions } of misspelled) {
      const sug = suggestions.length > 0 ? ` → ${suggestions.join(", ")}` : "";
      console.log(`  ${word}${sug}`);
    }
  }

  process.exit(misspelled.length > 0 ? 1 : 0);
}

function capitalize(w) { return w.charAt(0).toUpperCase() + w.slice(1); }

main().catch(e => { console.error(e); process.exit(2); });
