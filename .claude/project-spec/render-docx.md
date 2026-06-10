# IT_Curriculum — `.docx` / `.xlsx` render mechanics (verbatim)

Extracted from the generator skills during the 2026-06-09 rework so the project-agnostic skills can
say "render per the project's spec." These mechanics apply to **every** IT_Curriculum `.docx`
(Theory_Pack, Student_Task, Assessment_Task, Rubric, Answer_Key) and, where noted, the Testmoz
`.xlsx`. Rendering tool: the **docx skill** (`/mnt/skills/public/docx/SKILL.md`, `npm install -g
docx`); **openpyxl** for `.xlsx`.

## Visual identity
- A4. **Body: Arial 11pt `#333333`.** Headings **navy `#1e3a8a`**. Code/filenames: Consolas.
- Answer keys / rubrics additionally use H1 `#1F4E79`, H3 `#2E75B6`; code blocks Consolas 10pt on
  `#F2F2F2`. Study Key (P) callouts: "Dažna klaida" bg `#FFF3E0` / border `#FF9800`; "Kodėl tai
  veikia" bg `#E8F5E9` / border `#4CAF50`; correct-answer highlight green `#2E7D32`; broken-code
  block bg `#FFEBEE` / border `#F44336`. Grading Key (A) footer watermark on every page:
  **"Vidinis dokumentas. Neskelbti mokiniams."** (8pt `#808080`, centered).

## Encoding (root-cause rule)
Write all Lithuanian text as **plain UTF-8** in the generation script. **Never** use `\u` unicode
escapes for Lithuanian letters (ą č ę ė į š ų ū ž) — escapes hide character-level errors and are the
primary cause of LT spelling errors. Use straight double quotes `"..."` only (no escapes needed).

## Em dash — TWO mandatory layers (both must exist)
**Layer 1 — in the generation script**, applied to every string before insertion:
```javascript
const noEmDash = (s) => s.replace(/—/g, ':');
```
```python
def no_em_dash(s):  # openpyxl / .xlsx path
    return s.replace('—', ':')
```
**Layer 2 — standalone post-process on the SAVED `.docx`** (runs even if Layer 1 "handled" it):
```python
import zipfile, os, shutil, tempfile

def strip_em_dashes_from_docx(docx_path):
    """Strip all em dashes from a saved .docx file."""
    tmpdir = tempfile.mkdtemp()
    with zipfile.ZipFile(docx_path, 'r') as z:
        z.extractall(tmpdir)
    docxml = os.path.join(tmpdir, 'word', 'document.xml')
    with open(docxml, 'rb') as f:
        data = f.read()
    em = '—'.encode('utf-8')
    count = data.count(em)
    if count > 0:
        data = data.replace(em, ':'.encode('utf-8'))
        with open(docxml, 'wb') as f:
            f.write(data)
        outfile = docx_path + '.tmp'
        with zipfile.ZipFile(outfile, 'w', zipfile.ZIP_DEFLATED) as zout:
            for root, dirs, files in os.walk(tmpdir):
                for fn in files:
                    fpath = os.path.join(root, fn)
                    zout.write(fpath, os.path.relpath(fpath, tmpdir))
        os.remove(docx_path); shutil.move(outfile, docx_path)
    shutil.rmtree(tmpdir)
    return count
```

## Quote normalization (curly → straight), same saved-file stage
```python
def normalize_quotes_in_docx_bytes(data):
    return (data
        .replace('„'.encode('utf-8'), '"'.encode('utf-8'))
        .replace('“'.encode('utf-8'), '"'.encode('utf-8'))
        .replace('”'.encode('utf-8'), '"'.encode('utf-8')))
```

## Phantom-vowel scan (after generation)
```python
import re
# Flag phantom double-vowel endings (hallucinated declensions): uų, aą, eę, iį
phantoms = re.findall(r'[uųaąeęiį]{2,}', text)
```
Fix matches. Remaining classes (wrong stem vowels, dropped consonants, hallucinated verb forms)
need the lt-qa POST-GEN web-verification pass.

## Replacement-character scan (assessments / `Rubric.docx`, zero tolerance)
Scan for corruption like `klas?`, `ta?kai`, `u?daro`, `trukm?`, `Internetin?s`, or any
`\p{L}\?\p{L}` match. After fixing, **reopen every generated `Rubric.docx` in Word** and confirm it
still opens cleanly. Do not present a rubric that passes the sidecar but fails in the real document.

## Pagination
**Never insert explicit page breaks** (they create 30–50% empty gaps). Use `keepNext: true` +
`keepLines: true` on all H1/H3 paragraphs (no orphaned headings) and `cantSplit: true` on info-box
and term-table rows.

## Paragraph spacing & box styling (teacher-approved)
Exact TWIPs values extracted from the teacher's manually fixed exemplar `.docx` files. Use these
verbatim — do not round or re-estimate.

**Theory_Pack spacing:** H1 `before=360`, `after=160`; body `after=100`.

**Student_Task spacing:** H2 `before=300`, `after=120`.

**Student_Task step / hint / checklist styling:**
- Step headings: `spacing.before: 360`.
- Hints (Užuomina): color `#808080` grey, `spacing.before: 120`.
- Success checks (✓): color `#2E7D32` green, `spacing.before: 120`.
- All checklist items except the last: `keepNext: true`.

**Teacher_Plan warning box & diary label:**
- "Dažna klaida" warning-box paragraphs: `spacing.before: 200` (not 80 — `before: 80` collapses
  with the preceding paragraph's `after: 80`, leaving no visible gap).
- "Pamokos aprašymas (dienynui)" diary label paragraph: `keepNext: true` (plus the horizontal rule
  above it) so the label cannot split from its content across pages.

After a structural change, regenerate the file from source; never patch the generated .docx in place.

## QA sidecar (mandatory — also trips the lt-mistakes hook)
Before the grammar QA pass, write all Lithuanian text to a plain-UTF-8 sidecar named
`<Artifact>_text.txt` (e.g. `Theory_Pack_text.txt`, `Student_Task_text.txt`, `Rubric_text.txt`,
`Assessment_Task_text.txt`), one paragraph/heading/cell/list-item per line. Run lt-qa POST-GEN over
it, fix the real file, then **delete the sidecar**. The sidecar write sets the Stop-hook pending
flag, so the turn must end with `lt-mistakes updated:`.

## Validation
Open the generated file and confirm it renders / `python scripts/office/validate.py <file>.docx`.
Verify key content at known positions (first/last answer, footer text for Grading Keys). Share with
`present_files`.

## File naming
Canonical names only — `Theory_Pack.docx`, `Student_Task.docx`, `Assessment_Task.docx`/`.xlsx`,
`Rubric.docx`, `Answer_Key.docx`. Never prefix with lesson codes or titles.
