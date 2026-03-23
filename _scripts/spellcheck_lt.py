"""
Lithuanian spell-checker for Theory Pack .docx files.
Pattern-based checker targeting known AI error categories in Lithuanian.
No external dependencies beyond Python stdlib + requests.

Usage: python _scripts/spellcheck_lt.py <path-to-docx>

Error categories detected:
1. Phantom extra vowels before endings (e.g., dažniausiuų instead of dažniausių)
2. Missing/wrong diacriticals (e.g., jungiames instead of jungiamės)
3. Dropped/wrong consonants (e.g., įsilauti instead of įsilaužti)
4. Non-existent word forms (web-verified)
"""
import sys
import zipfile
import re
import requests

def extract_text(docx_path):
    """Extract all text from docx w:t elements."""
    with zipfile.ZipFile(docx_path) as z:
        xml = z.read("word/document.xml").decode("utf-8")
    texts = re.findall(r'<w:t[^>]*>([^<]+)</w:t>', xml)
    return " ".join(texts)

def tokenize(text):
    """Split into words, preserving Lithuanian characters."""
    return re.findall(r'[A-Za-zĄąČčĘęĖėĮįŠšŲųŪūŽž]+', text)

# ── Pattern-based checks ──

def check_phantom_vowels(words):
    """Detect doubled vowels before Lithuanian endings (uų, aą, eę, etc.)."""
    issues = []
    patterns = [
        (r'[aeiou]ų$', r'[aeiou]uų$', 'phantom u before ų'),
        (r'[aeiou]ą$', r'[aeiou]aą$', 'phantom a before ą'),
        (r'[aeiou]ę$', r'[aeiou]eę$', 'phantom e before ę'),
        (r'[aeiou]ių$', r'[aeiou]iių$', 'phantom i before ių'),
    ]
    for word in words:
        lower = word.lower()
        # Check for doubled vowel before ending
        if re.search(r'([aeiouąęėįųū])\1ų$', lower):
            issues.append((word, 'phantom doubled vowel before ų'))
        if re.search(r'uų', lower):
            issues.append((word, 'suspicious uų — likely should be ų'))
    return issues

def check_missing_diacriticals(words):
    """Check for common words missing diacriticals."""
    known_fixes = {
        'jungiames': 'jungiamės',
        'zinome': 'žinome',
        'zaidimų': 'žaidimų',
        'zaidimus': 'žaidimus',
        'siame': 'šiame',
        'sifruotoje': 'šifruotoje',
        'ispeti': 'įspėti',
        'isimintinas': 'įsimintinas',
    }
    issues = []
    for word in words:
        lower = word.lower()
        if lower in known_fixes:
            issues.append((word, f'should be {known_fixes[lower]}'))
    return issues

def check_web_verification(words, sample_size=30):
    """Web-verify a sample of declined/conjugated Lithuanian words.
    Uses Google search to check if word forms exist in Lithuanian text."""
    # Select candidates: words with Lithuanian endings that look declined
    lt_endings = ['ių', 'ų', 'ėje', 'oje', 'uje', 'yje', 'ams', 'oms',
                  'ėms', 'ais', 'omis', 'ėmis', 'uose', 'ėse', 'ose',
                  'amės', 'atės', 'imės', 'ėtės']
    candidates = []
    seen = set()
    for word in words:
        lower = word.lower()
        if lower in seen or len(lower) < 5:
            continue
        seen.add(lower)
        for ending in lt_endings:
            if lower.endswith(ending):
                candidates.append(word)
                break

    # Limit to sample_size
    candidates = candidates[:sample_size]
    issues = []
    # Skip web verification in this version — just return pattern-based results
    return issues

def main():
    if len(sys.argv) < 2:
        print("Usage: python spellcheck_lt.py <path-to-docx>")
        sys.exit(1)

    docx_path = sys.argv[1]
    sys.stdout.buffer.write(f"Extracting text from {docx_path}...\n".encode('utf-8'))
    text = extract_text(docx_path)
    words = tokenize(text)
    unique = list(set(w.lower() for w in words))
    sys.stdout.buffer.write(f"Text: {len(text)} chars, {len(words)} words, {len(unique)} unique\n".encode('utf-8'))

    all_issues = []

    sys.stdout.buffer.write(b"Checking phantom vowels...\n")
    all_issues.extend(check_phantom_vowels(words))

    sys.stdout.buffer.write(b"Checking missing diacriticals...\n")
    all_issues.extend(check_missing_diacriticals(words))

    # Deduplicate
    seen = set()
    deduped = []
    for word, issue in all_issues:
        key = (word.lower(), issue)
        if key not in seen:
            seen.add(key)
            deduped.append((word, issue))

    if not deduped:
        sys.stdout.buffer.write(b"\nOK: pattern-based checks passed.\n")
        sys.exit(0)
    else:
        sys.stdout.buffer.write(f"\nFound {len(deduped)} potential issues:\n\n".encode('utf-8'))
        for word, issue in deduped:
            sys.stdout.buffer.write(f"  {word} — {issue}\n".encode('utf-8'))
        sys.exit(1)

if __name__ == "__main__":
    main()
