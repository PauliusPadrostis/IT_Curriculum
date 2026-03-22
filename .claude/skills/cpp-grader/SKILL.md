---
name: cpp-grader
description: >
  Grade Lithuanian gymnasium students' C++ (.cpp) submissions against a YAML rubric fetched from a public GitHub curriculum repo.
  Use this skill whenever the teacher provides a folder of .cpp files and asks to grade, evaluate, assess, or check student code.
  Also triggers on: "patikrink kodą", "įvertink", "grade these", "check submissions", or any mention of grading C++ files.
  Handles compile-and-run verification, falls back to static analysis if compilation fails, parses student identity from filename,
  and outputs structured JSON grouped by class inside a single per-assessment file.
---

# C++ Student Code Grader

Grades student C++ submissions for a Lithuanian gymnasium (grades 9–12).
Derives student identity and grade level from filenames. Fetches rubric from GitHub.
Compiles and runs code; falls back to static analysis with a warning if compilation fails.
Feedback written in Lithuanian. Output is one JSON file per grading session, grouped by class.

---

## Step 1 — Session Setup

At the start of each grading session, the teacher must provide:

1. **Path to submissions folder** — may contain `.cpp` files, `.zip` archives, or `.docx` files
2. **Assessment topic** — e.g. `Arrays`, `Functions`, `Loops` (used to locate rubric in repo)

That is all. Do not ask for grade level or class — derive them from filenames.

---

## Step 2 — Normalize Submissions

Before parsing filenames, normalize the contents of the submissions folder. Students may submit in non-standard formats.

### ZIP archives

If a `.zip` file is found:

1. **Safety checks BEFORE extraction.** Open with `zipfile.ZipFile` and iterate entries manually. REJECT the archive (do not extract) if ANY of the following are true:
   - Any entry name contains `..` or is an absolute path (starts with `/` or a drive letter)
   - Any entry is a symlink
   - Total file count exceeds 200
   - Total uncompressed size exceeds 100 MB
   - Any single file exceeds 50 MB uncompressed
   If rejected, report to teacher: _"ZIP archyvas atmestas dėl saugumo — per didelis arba turi nesaugių kelių."_

2. **Extract safely** to a temporary subfolder. Extract one entry at a time using `zipfile.ZipFile.extract()` with a checked target path — never use `extractall()`.

3. **Locate project files.** Search recursively for all `.cpp` and `.h` / `.hpp` files inside the extracted folder. Preserve the directory structure.
   - If a **single `.cpp` file** is found → treat as a single-file submission.
   - If **multiple `.cpp` files** are found → treat as a multi-file project (see Step 5b for compilation).
     - Identify the entry point: prefer `main.cpp`, else the `.cpp` containing `int main(` or `int main (`, else shallowest `.cpp`.
   - If **no `.cpp` file** is found → reject, report to teacher.

4. Use the **archive filename** (not internal paths) as the basis for identity parsing in Step 3.

### DOCX files

If a `.docx` file is found:

1. Install `python-docx` if not already available:
   ```bash
   pip install python-docx --break-system-packages -q
   ```

2. Use `python-docx` to extract all text from the document.

3. **Unicode normalization pass** (mandatory before code detection):
   - Replace smart quotes: `\u201c` `\u201d` → `"`, `\u2018` `\u2019` → `'`
   - Remove BOM (`\ufeff`)
   - Remove zero-width characters (`\u200b`, `\u200c`, `\u200d`, `\ufeff`)
   - Normalize whitespace: replace non-breaking spaces with regular spaces
   - Normalize line endings to `\n`

4. Locate C++ code blocks — search for text containing `#include`, `int main`, or balanced `{` `}` patterns.

5. Write the extracted code to a temporary `.cpp` file.

6. **Assess extraction confidence:**
   - `high` — found `#include` AND `int main` AND balanced braces
   - `medium` — found `int main` but missing includes or has minor brace imbalance
   - `low` — found only brace patterns or partial code fragments

7. If extraction confidence is `low`, ask the teacher for confirmation before grading this file:
   ```
   ⚠️ Iš DOCX failo [filename] ištrauktas kodas atrodo nepilnas.
   Ar vertinti šį failą? (taip / ne)
   ```

8. Use the **docx filename** as the basis for identity parsing.
9. Set `submission_format: "docx_extracted"` and `extraction_confidence` in the result JSON.
10. Add to feedback: _"Kodas ištrauktas iš .docx failo — gali būti formatavimo artefaktų."_
11. If no recognizable C++ code found → reject, report to teacher.

### Unrecognized formats

Any file that is not `.cpp`, `.zip`, or `.docx` → skip and report it in the pre-grading summary. Do not skip silently.

### Output of this step

A list of submissions, each containing:
- `cpp_file_path` — path to the main `.cpp` file
- `project_dir` — directory containing all project files (same as file's parent for single-file; extracted folder for multi-file zips). `None` for standalone `.cpp`.
- `source_filename` — original submitted filename (used for identity parsing)
- `submission_format` — `"cpp"`, `"zip_extracted"`, or `"docx_extracted"`
- `is_multi_file` — boolean

Proceed with this list.

---

## Step 3 — Parse and Validate Filenames

### Parsing strategy — parse from the END

For every normalized submission:

1. Strip the file extension (`.cpp`, `.zip`, `.docx`).
2. Normalize separators: replace spaces and hyphens with underscores. Collapse multiple underscores into one.
3. Split by underscore into tokens.
4. **Extract class identifier from the LAST token** that matches the pattern: one or two digits followed by one letter (case-insensitive), e.g. `10A`, `9b`, `12C`. Regex: `^\d{1,2}[A-Za-z]$`
5. If no token matches the class pattern → reject, report.
6. **Everything before the class token** is the student name. Join with spaces. Require at least two name tokens (first name + last name, but allow compound surnames like `Žukaitė-Petrienė`).
7. Reject if fewer than two name tokens remain after extracting the class.

**Reject and explicitly report to teacher** (do not grade) if:
- No class identifier token found
- Fewer than two name tokens (e.g. single name only)
- Any name token is a single character (likely an abbreviation, not a full name)
- Class identifier digit part is outside range 1–12

Report rejected files before proceeding:
```
⚠️ Praleisti failai (nepavyko nustatyti mokinio duomenų):
- J_Jonaitis_10A.cpp — nepilnas vardas (viena raidė)
- Petras_10B.cpp — trūksta pavardės
- random_file.cpp — nėra klasės identifikatoriaus
```

Derive **grade level** from class identifier: `10A` → grade 10, `9B` → grade 9.

### Encoding

When reading filenames or source files, attempt UTF-8 first. If decoding fails, fall back to Latin-1 (ISO 8859-13 / Windows-1257 for Lithuanian). Strip BOM if present. Note non-UTF-8 encoding in the result JSON.

---

## Step 4 — Group by Grade and Fetch Rubrics

### Group submissions FIRST

After parsing ALL filenames, group submissions by grade level.

- If **all submissions share the same grade level** → proceed normally.
- If **multiple grade levels are present** → warn the teacher:
  ```
  ⚠️ Aplanke rasti skirtingų klasių lygių darbai:
  - 10 klasė: 15 failų (10A: 8, 10B: 7)
  - 11 klasė: 3 failai (11B: 3)
  Kiekvienam lygiui bus naudojamas atskiras rubrikas. Tęsti? (taip / ne)
  ```
  If teacher confirms, fetch a separate rubric for each grade level. Grade each group against its own rubric.

### Fetch rubric from GitHub

Base repo URL: `https://raw.githubusercontent.com/PauliusPadrostis/IT_Curriculum/main/`

The rubric path structure is: `{Grade}/{Semester}/{Topic}/rubric.yaml`

Since semester is not provided, **check both**:
- `{Grade}/1/{Topic}/rubric.yaml`
- `{Grade}/2/{Topic}/rubric.yaml`

Use `web_fetch` to attempt both URLs. Use the one that returns a valid YAML file.

If neither semester has the rubric, try case variations of the topic name (e.g. `arrays`, `Arrays`, `ARRAYS`).

### Validate the rubric

After fetching, validate the rubric YAML:
- Must parse as valid YAML
- Must contain `task_title` (string)
- Must contain `criteria` (list with at least one entry)
- Each criterion must have `id`, `label`, `points`

If validation fails → report the specific error and ask teacher to paste a corrected rubric.

### Optional: test_cases in rubric

The rubric MAY contain a `test_cases` field:

```yaml
test_cases:
  - name: "Basic input"
    input: "2\n50\n0\n"
    expected_contains: ["100", "50.00"]
  - name: "Edge case: zero"
    input: "1\n0\n0\n"
    expected_contains: ["0"]
```

When `test_cases` are present, use them as the PRIMARY testing method (see Step 5c). When absent, fall back to model-inferred testing and set `test_mode: "inferred"` in the output.

### Teacher confirmation

**Before grading anything**, present the rubric filename and path to the teacher and ask for confirmation:

```
Rastas rubrikas: 10/1/Arrays/rubric.yaml
Užduoties pavadinimas: [task_title from rubric]
Kriterijai: [list criterion labels]
Test atvejai: [N defined / nėra — bus naudojamas automatinis testavimas]
Ar teisingas rubrikas? (taip / ne)
```

Do not proceed until the teacher confirms.

If no rubric is found in the repo after all attempts, ask the teacher to paste the rubric content directly.

---

## Step 5 — Compile and Run

Process **one student at a time**, sequentially. Never compile or run multiple students in parallel — this causes binary/output misattribution that silently corrupts grades.

### 5a — Verify compiler availability (HARD REQUIREMENT)

```bash
g++ --version
```

If `g++` is not found:
```
❌ Kompiliatorius nerastas. Vertinimas negali būti pradėtas.
Įdiekite g++ ir bandykite iš naujo.
```
**STOP. Do not proceed. Do not fall back to static analysis for all files.** A missing compiler is an environment problem, not a student problem. Grading without a compiler would unfairly penalize every student's output scores.

### 5b — Compile into isolated per-student directory

Each student gets a **unique temp directory**. Never reuse paths across students.

```python
import subprocess, tempfile, shutil, os

def compile_student(submission):
    """
    submission: dict with cpp_file_path, project_dir, is_multi_file, student_slug
    Returns: (tmp_dir, binary_path, compile_result)
    """
    student_slug = submission['student_slug']
    tmp = tempfile.mkdtemp(prefix=f"grade_{student_slug}_")

    try:
        if submission['is_multi_file'] and submission['project_dir']:
            # Multi-file project: copy entire project directory
            proj_dst = os.path.join(tmp, "project")
            shutil.copytree(submission['project_dir'], proj_dst)

            # Find all .cpp files in project
            cpp_files = []
            for root, dirs, files in os.walk(proj_dst):
                for f in files:
                    if f.endswith('.cpp'):
                        cpp_files.append(os.path.join(root, f))

            if not cpp_files:
                return tmp, None, None  # should not happen if normalization was correct

            out = os.path.join(tmp, "out")
            # Compile all .cpp files together with include path
            compile_cmd = [
                "g++", "-std=c++17", "-Wall",
                "-o", out
            ] + cpp_files + [f"-I{proj_dst}"]

        else:
            # Single-file submission
            src = os.path.join(tmp, "code.cpp")
            shutil.copy(submission['cpp_file_path'], src)
            out = os.path.join(tmp, "out")
            compile_cmd = ["g++", "-std=c++17", "-Wall", "-o", out, src]

        # Compile with timeout and resource limits
        # ulimit: 512MB virtual memory, 64 max processes, 16MB max file size
        wrapped_cmd = f"ulimit -v 524288 -u 64 -f 16384 2>/dev/null; {' '.join(compile_cmd)}"

        result = subprocess.run(
            ["bash", "-c", wrapped_cmd],
            capture_output=True,
            text=True,
            timeout=30  # 30-second compile timeout
        )

        return tmp, out if result.returncode == 0 else None, result

    except subprocess.TimeoutExpired:
        return tmp, None, "compile_timeout"
    except Exception as e:
        return tmp, None, str(e)
```

**After grading each student**, always clean up:
```python
shutil.rmtree(tmp, ignore_errors=True)
```

### 5c — Design test inputs

#### When rubric defines `test_cases`: use them directly

```python
for tc in rubric['test_cases']:
    status, stdout, stderr = run_student(binary_path, tc['input'])
    # Compare stdout against tc['expected_contains'] or tc['expected_output']
```

Set `test_mode: "rubric_defined"` in the output.

#### When rubric has NO `test_cases`: infer from source (fallback)

**Before sending any test input**, read the student's source and identify:
- What prompts does the program print? (e.g. `"Įveskite pasirinkimą:"`, `"Ar norite tęsti? (T/N)"`)
- What is the expected input sequence? (menu choice → amount → confirmation, etc.)
- Is the program menu-driven? If yes, what token exits the loop?
- Does the program exit on EOF, or does it loop on empty input?

Build a **per-program** input sequence that:
1. Exercises the functionality being graded
2. Ends with a clean exit (send the exit menu token, or explicit EOF)
3. Does NOT assume all programs share the same I/O contract — inspect each independently

If exit token is unknown, try common ones: `0`, `3`, `q`, `exit`. If none work, send EOF (empty input string) and note the behavior.

Set `test_mode: "inferred"` in the output and include:
```
⚠️ Rubrikoje nėra apibrėžtų test atvejų. Testavimas atliktas automatiškai pagal kodo analizę.
```

### Designing tests that expose stateful output bugs

C++ stream flags (`fixed`, `setprecision`, `hex`, etc.) are **sticky** — once set, they persist for all subsequent output in that process. Test sequence order therefore affects what output you see.

**Rule: always run the operation being graded first, before any other operation that might set stream flags.**

Examples:
- Testing a withdrawal that should print `350.00` — run withdrawal **before** any deposit that might set `fixed << setprecision(2)`. If deposit runs first and sets the flag, withdrawal will inherit it and appear correct even if the student never set it for that path.
- Testing output that should be a plain integer — run it before any `setprecision` call in the session.

When a formatting result is ambiguous across tests, run the operation in **isolation** (fresh input sequence starting directly with that operation, no prior menu choices) to confirm whether formatting is genuinely present or inherited.

Record the test sequence used in the result JSON under `"test_input_used"` so the result is reproducible.

### 5d — Execute with strict limits

```python
import subprocess, threading

def run_student(binary_path, test_input: str):
    """Run student binary with resource limits and streamed output capture."""
    MAX_OUTPUT = 4096  # 4 KB hard cap for both stdout and stderr

    try:
        # Wrap execution with ulimit for runtime safety
        # 256MB virtual memory, 32 processes, 8MB file output, 10 second CPU time
        cmd = f'ulimit -v 262144 -u 32 -f 8192 -t 10 2>/dev/null; "{binary_path}"'

        proc = subprocess.Popen(
            ["bash", "-c", cmd],
            stdin=subprocess.PIPE,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
        )

        # Send input and read output with hard byte limits
        # Use communicate with timeout — but read in chunks to avoid buffering all output
        try:
            if test_input:
                proc.stdin.write(test_input.encode('utf-8', errors='replace'))
            proc.stdin.close()
        except BrokenPipeError:
            pass  # Process may have already exited

        # Read stdout with cap
        stdout_bytes = b""
        try:
            while len(stdout_bytes) < MAX_OUTPUT:
                chunk = proc.stdout.read(1024)
                if not chunk:
                    break
                stdout_bytes += chunk
            stdout_truncated = len(stdout_bytes) >= MAX_OUTPUT
        except Exception:
            stdout_truncated = False

        # Read stderr with cap
        stderr_bytes = b""
        try:
            while len(stderr_bytes) < MAX_OUTPUT:
                chunk = proc.stderr.read(1024)
                if not chunk:
                    break
                stderr_bytes += chunk
        except Exception:
            pass

        # Wait for process with timeout
        try:
            proc.wait(timeout=5)
        except subprocess.TimeoutExpired:
            proc.kill()
            proc.wait()
            return "timeout", "", ""

        stdout = stdout_bytes.decode('utf-8', errors='replace')
        stderr = stderr_bytes.decode('utf-8', errors='replace')

        if stdout_truncated:
            stdout += "\n[...išvestis nukirpta — per daug duomenų...]"

        return "ok", stdout, stderr

    except Exception as e:
        return "error", "", str(e)
```

### 5e — Distinguish timeout causes

When a program times out, read the source to determine why before scoring:

| Likely cause | How to identify | Action |
|---|---|---|
| Infinite loop on bad input | `while(true)` with no invalid-input exit | Penalize — logical error |
| EOF-triggered loop | Program re-prompts on empty stdin, no guard | Resend with explicit exit token; rerun once |
| Missing exit branch in menu | No case for exit | Penalize |

If timeout was caused by EOF handling, resend with an explicit exit token and rerun **once** before marking as `timeout`.

### 5f — Handle outcomes

**Compilation fails:**
- Set `execution_status: "compile_error"`, store errors under `"compiler_errors"` in JSON
- Store warnings under `"compiler_warnings"` if any (from stderr when returncode is 0)
- Feedback: _"Kompiliacija nepavyko — vertinama tik statiškai."_
- → Proceed to static analysis (5g)

**Compilation times out:**
- Set `execution_status: "compile_timeout"`
- Feedback: _"Kompiliacija viršijo laiko limitą (30 sek.)."_
- → Proceed to static analysis (5g)

**Execution times out (after EOF retry if applicable):**
- Set `execution_status: "timeout"`
- Feedback: _"Programa viršijo laiko limitą (5 sek.)."_ + cause if identifiable
- → Proceed to static analysis (5g)

**Runs successfully:**
- Set `execution_status: "ok"`, use captured stdout for output comparison
- If stderr contains warnings (not errors), store under `"runtime_warnings"`

### 5g — Static analysis (fallback)

Used when code does not compile or times out. Scoring is based on **mechanical rules**, not subjective judgment.

**Structural checks:**
- Does the file contain `main()`? If not → structural failure.
- Are `#include` directives present and appropriate?
- Are braces `{` `}` balanced? Count opens vs closes.
- Are there obvious missing semicolons on non-block lines?
- Does the code contain constructs required by the rubric? (search by keyword: `for`, `while`, array declarations, function signatures, etc.)

**Scoring under static analysis — mechanical rules:**

`compiles` criterion:
- `main()` present AND braces balanced AND includes present → **50%** of `compiles` points
- `main()` present but braces imbalanced OR missing includes → **25%** of `compiles` points
- `main()` absent → **0**

`correct_output` criterion:
- **Always 0.** Output cannot be verified without execution. Note explicitly.

All other criteria (structure, naming, required constructs, etc.):
- Score based on source code reading.
- Required constructs present → full or partial credit based on correctness of implementation.
- Required constructs absent → 0 for that criterion.

Round partial points to the nearest integer (half up).

**Always include in feedback when static analysis was used:**
_"Programa nekompiliavosi — išvestis nepatikrinta. Vertinimas atliktas pagal kodo analizę."_

---

## Step 6 — Grade Against Rubric

For each criterion in the rubric, assign a score from `0` to the criterion's `points`.

### Core grading principles

- Evaluate **strictly against the rubric**. Do not award or deduct points for anything not in the rubric.
- Check not just whether code runs, but whether it **fulfills the task requirements**.
- Evaluate: output correctness, required features, program structure, variable naming, comments, edge case handling, written explanations if required.
- Do not over-penalize trivial formatting artifacts unless they affect correctness or readability.
- Criteria marked `required: true` — if failed, score is 0 for that criterion, noted explicitly.

### Grade-level leniency

Read `grade_level_modifiers` from the rubric. If absent, apply defaults:

| Grade | Leniency | Meaning |
|-------|----------|---------|
| 9–10  | high     | Minor logic errors, imperfect structure, basic naming issues do not get full deductions. Reward demonstrated understanding. |
| 11    | medium   | Structure and naming expected mostly correct. Logic errors penalized normally. |
| 12    | none     | Full standard. Clean, correct, well-structured code expected. |

Leniency **never** overrides `required: true` criteria.

### Leniency examples

**Grade 9–10 (high leniency):**
- Variable named `x` instead of `sum` → minor deduction (1 point at most), not full loss of naming criterion
- Off-by-one error in a loop → partial credit for correct approach
- Missing `return 0;` at end of main → no deduction (implicit in C++)
- Output says `"Suma: "` instead of `"Suma = "` → no deduction unless rubric specifies exact format

**Grade 11 (medium leniency):**
- Variable named `x` → moderate deduction
- Off-by-one error → penalize, but note the correct structure
- Inconsistent indentation → minor deduction

**Grade 12 (no leniency):**
- All of the above penalized at full value
- Code style, naming, structure expected to be clean

---

## Step 7 — Calculate Grade

1. Sum criterion scores → `total_points`
2. `percentage = (total_points / max_points) * 100`
3. **Round percentage to nearest integer (0.5 rounds up)** before mapping.
4. Map to 1–10 using school scale:

| Grade | Percentage |
|-------|------------|
| 10    | 95–100%    |
| 9     | 85–94%     |
| 8     | 75–84%     |
| 7     | 65–74%     |
| 6     | 55–64%     |
| 5     | 45–54%     |
| 4     | 30–44%     |
| 3     | 20–29%     |
| 2     | 10–19%     |
| 1     | 0–9%       |

---

## Step 8 — Write Feedback

Feedback written in **Lithuanian**, formal tone (jūsininkas).

Rules:
- Short and scannable. No bloated explanations.
- State what is wrong, why, and what would need to change.
- Per-criterion comment only when points were deducted or something notable occurred.
- Do not hide the main issue behind soft language.
- Curly braces → **riestiniai skliaustai**
- AI references → **DI (Dirbtinis Intelektas)**

---

## Step 9 — Build Output JSON

### Output file naming

Output file is named: `{Topic}_grade{N}_{YYYY-MM-DD}_{HHMMSS}.json`

Example: `Arrays_grade10_2026-03-18_143052.json`

**Each grading session creates a NEW file. Never merge into existing files.** This eliminates statefulness, collision risk, and duplicate-handling complexity.

### Duplicate student handling

If two or more files resolve to the same student name and class, **grade ALL of them**. Never skip, never ask. Mark each with `"duplicate": true` and include both results. The teacher decides which to use.

### Output structure

```json
{
  "task_id": "arrays_basics",
  "task_title": "Masyvai – pagrindai",
  "grade": 10,
  "rubric_source": "10/1/Arrays/rubric.yaml",
  "graded_at": "2026-03-18T14:30:52",
  "test_mode": "rubric_defined",
  "classes": {
    "10A": {
      "results": [
        {
          "student": "Jonas Jonaitis",
          "file": "Jonas_Jonaitis_10A.cpp",
          "submission_format": "cpp",
          "duplicate": false,
          "execution_status": "ok",
          "test_mode": "rubric_defined",
          "test_input_used": "2\n50\n0\n",
          "total_points": 16,
          "max_points": 20,
          "percentage": 80,
          "grade": 8,
          "criteria": [
            {
              "id": "compiles",
              "label": "Programa kompiliuojasi be klaidų",
              "score": 4,
              "max": 4,
              "comment": null
            },
            {
              "id": "correct_output",
              "label": "Programos išvestis atitinka užduotį",
              "score": 6,
              "max": 8,
              "comment": "Išvestis iš dalies teisinga — paskutinis elementas neapdorojamas."
            }
          ],
          "compiler_warnings": null,
          "compiler_errors": null,
          "feedback_lt": "Programa kompiliuojasi ir veikia. Pagrindinė problema — paskutinis masyvo elementas nėra apdorojamas cikle.",
          "prior_work_delta": null
        }
      ]
    },
    "10B": {
      "results": []
    }
  },
  "skipped_files": [
    {
      "file": "random_file.txt",
      "reason": "Neatpažintas formatas"
    }
  ],
  "rejected_files": [
    {
      "file": "J_Jonaitis_10A.cpp",
      "reason": "Nepilnas vardas (viena raidė)"
    }
  ]
}
```

After writing, present the file to the teacher using `present_files`.

### `prior_work_delta` field

This field is reserved for future use. When a student work bank is implemented, it will contain a comparison between the current submission and the student's prior work (style delta, complexity delta, quality delta). This will be the primary authorship review mechanism.

For now, always set to `null`.

---

## Step 10 — In-Chat Summary

After all files are graded, display a summary table:

```
Vertinimas: Masyvai – pagrindai | 10 klasė
Testavimo režimas: rubric_defined / inferred

Klasė | Mokinys            | Taškai     |  % | Pažymys | Vykdymas        | Pastabos
------|--------------------|------------|----|---------|-----------------|----------
10A   | Jonas Jonaitis     | 16 / 20    | 80 | 8       | ✅              | —
10A   | Marta Martienė     | 12 / 20    | 60 | 6       | ✅              | —
10B   | Petras Petraitis   |  8 / 20    | 40 | 4       | ❌ compile_error | —
10B   | Petras Petraitis   |  6 / 20    | 30 | 4       | ❌ compile_error | duplikatas

⚠️ Praleisti failai: 1 (žr. aukščiau)
⚠️ Atmesti failai: 1 (žr. aukščiau)
```

If `test_mode` is `"inferred"` for any student, add at the bottom:
```
ℹ️ Dalis testų buvo sugeneruoti automatiškai (rubrikoje nėra test atvejų).
Rekomenduojama patikrinti test_input_used laukus JSON faile.
```

---

## Edge Cases

- **File not matching naming convention** → reject, report before grading begins (Step 3)
- **Multiple grade levels in one folder** (e.g. 10A and 11B mixed) → warn teacher, ask whether to proceed. If yes, use separate rubrics per grade.
- **Rubric not found** → ask teacher to paste rubric content directly
- **Rubric YAML malformed** → report specific parse error, ask teacher to fix and re-paste
- **Criterion absent in code** → score 0, note it
- **Extra features beyond rubric** → do not award bonus unless rubric explicitly allows it
- **Duplicate student submissions** → grade ALL, mark with `duplicate: true`
- **Output partially correct** → score `correct_output` proportionally
- **Compiler not found** → HARD STOP, do not grade
- **Network failure fetching rubric** → retry once, then ask teacher to paste content
- **DOCX with low extraction confidence** → ask teacher before grading that file
- **Multi-file project** → compile all `.cpp` files together with `-I` include path
