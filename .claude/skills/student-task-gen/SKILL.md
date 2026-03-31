---
name: student-task-gen
description: >
  Generate Lithuanian-language Student_Task.pdf files for L and I lessons in the
  IT Curriculum repo (PauliusPadrostis/IT_Curriculum). Use this skill whenever the
  teacher asks to create, generate, write, or build a student task, student worksheet,
  task sheet, or užduoties lapas. Also triggers on: "sugeneruok užduotį", "padaryk
  užduoties lapą", "sukurk Student_Task", "generate student task", "create task sheet",
  "make a worksheet for this lesson", "build student tasks for module", or any mention
  of generating Student_Task files for lesson folders. This skill handles both single
  task generation and batch generation for entire modules or grades. Only generates for
  L (learning) and I (integration) lesson types. P lessons use practice-task-gen,
  A lessons use assessment-task-gen. Do NOT use for lesson plans (use lesson-plan-gen),
  READMEs (use lesson-readme-gen), theory packs (use theory-pack-gen), visual aids,
  or assessment files.
---

# Student Task Generator

Generates Lithuanian-language Student_Task.docx files for L and I lessons in the
IT Curriculum repo. Each task document is a student-facing instruction sheet that
students keep open alongside their work. All generated content is in **Lithuanian**.
Respond to the teacher in whatever language they use.

**This skill is designed for mass generation.** It uses safe defaults when context
is incomplete and does not pause for approval on structural decisions. It stops only
when generating would produce an obviously broken or empty task.

---

## Core Concept

A Student_Task is **not** a new document generated from objectives. It is an
**audience-translated extraction** from the Teacher_Plan.docx, with scaffolding
calibrated by lesson type and grade level.

**The fundamental scaffolding rule:** Grade 9 — assume the student has never
touched a computer. Every click, every menu, every action is explicit. Grade 10 —
assume basic file/folder skills (creating, renaming, navigating, shortcuts up to
archiving); explain only tool-specific actions. Grades 11-12 — assume PC navigation
basics are known; explain only new tools and concepts.

The transformation pipeline:
1. Extract the task section from the teacher plan
2. Decide whether a separate document is warranted (≥3 steps/requirements)
3. Flip audience from teacher to student (second person, formal "jūs")
4. Build the "Darbo eiga" section — structured differently for L and I
5. Add troubleshooting boxes at high-risk points (L only)
6. Adapt to domain (code / spreadsheet / web / design / theory)
7. Render .docx with theory-pack-consistent formatting

---

## Step 0 — Read References

**Before generating any task, always read these files:**

1. `references/task_format.md` — the exact .docx output structure, section rules,
   info box specs, and formatting specifications. **Primary structural reference.**
2. `references/exemplars/` — read the exemplar matching the lesson type being
   generated (L or I). These calibrate scaffolding depth and sub-task structure.

Also read from the lesson-plan-gen skill:
3. `/mnt/skills/user/lesson-plan-gen/references/teacher_profile.md` — teaching
   style, constraints, classroom reality, approved software. §9–§11 are critical.

These files are the skill's operational backbone. Do not generate without them.

---

## Step 1 — Gather Context

### What to read, in order:

| Priority | Source | What to extract |
|----------|--------|-----------------|
| 1 | **Teacher_Plan.docx** | Task section (taikymo užduotys, darbo blokas), instructions, requirements, self-check prompts, differentiation, extension tasks |
| 2 | **Lesson README** | Title, type (must be L or I), grade, learning objectives, success criteria |
| 3 | **Module README** | Module theme, lesson position in sequence, what came before |
| 4 | **Curriculum reference** (informatika.docx) | Grade-appropriate terminology, content scope |

### Type gate

**Only generate for L and I lessons.** If lesson type is:
- **P:** Stop. "P pamokoms naudokite /practice-task-gen."
- **A:** Stop. "A pamokoms naudokite /assessment-task-gen."
- **D, T, MOCK, G:** Stop. Inform the teacher this skill covers L and I only.

---

## Step 2 — Decision Gate: Generate or Skip

Count the distinct requirements, steps, or structured sub-tasks in the teacher
plan's task section.

**≥3 requirements/steps → Generate Student_Task.docx.**
**<3 requirements/steps → Skip.** Inform the teacher: "Ši užduotis pakankamai
paprasta, kad tilptų skaidrėje — atskiras dokumentas nereikalingas."

### Counting rules

- Each row in a requirements table = 1 step
- Each numbered instruction = 1 step
- Each bullet with a distinct action = 1 step
- A justification/reflection prompt = 1 step
- A self-check block = 1 step (not counted per item)

**Edge case:** If the teacher plan's task section is sparse (1–2 sentences)
but the README has ≥3 learning objectives that require structured work →
**still generate**, expanding from README objectives + module context.

### Batch mode

When generating tasks for a module or grade:
1. Read the module README to get the full lesson index.
2. Filter to L and I lessons only.
3. For each, apply the decision gate — skip tasks below threshold.
4. Process in sequence order for consistent terminology.
5. Report skipped lessons with reasons.

---

## Step 3 — Extract and Transform

### Audience flip

Every extracted element must be rewritten for the student:

| Teacher plan says | Student task says |
|-------------------|-------------------|
| "Mokiniai sukuria..." | "Sukurkite..." |
| "Paklauskite: ..." | Omitted entirely |
| "Ko stebėti: ..." | Becomes "Stuck?" box or self-check item |
| "Silpnesniems mokiniams: ..." | Becomes a scaffolding step (L) or omitted (I) |
| "Stipresniems mokiniams: ..." | Becomes "Papildoma užduotis" section |
| Teacher timing notes | Omitted entirely |

**Voice:** Second person formal imperative ("Sukurkite...", "Patikrinkite...",
"Pagrįskite..."). No teacher jargon (Bloom's, "pasiekimų lygis", etc.).

### Building the Darbo eiga

**This is the most important section and the core difference between L and I.**

#### For L lessons: micro-step walkthrough

Think like a student who has never used a computer.

For EVERY action in the task, ask:
- Does the student know where to click?
- Does the student know what menu to open?
- Could the student get confused by a default behavior (file opening
  in wrong program, extensions hidden, etc.)?
- What will the student see after this action? Can I describe it?

**Each step must include:**
1. Exact instruction (where to click, what to type, what menu to open)
2. Code/formula/example if relevant
3. Hint about WHY (optional, in italics)
4. Verification: "✓ Dabar turėtumėte turėti/matyti: ..."

**After high-risk steps, add "ĮSTRIGOTE?" (Stuck?) boxes:**
Identify 2-3 points where students predictably jam and add a
troubleshooting box with the specific symptom + exact fix.

**Grade calibration:**
- Grade 9: Maximum granularity. Assume the student has never used
  a computer. "Create a file" = 4 sub-steps. Describe right-click
  menus, file extensions, File Explorer navigation, saving.
- Grade 10: Moderate. Students can navigate File Explorer, create/
  rename/move files, understand extensions, use basic shortcuts
  (Ctrl+S, Ctrl+C/V). Knowledge ceiling ≈ archiving files. Explain
  tool-specific actions, skip basic OS navigation.
- Grade 11-12: Minimal OS scaffolding. Students know PC navigation
  basics. Only explain tool-specific or concept-specific actions.

#### For I lessons: structured sub-tasks

Students know the tools. Break the task into 3-6 meaningful work chunks.

**Each sub-task (DALIS) includes:**
1. What to accomplish (2-4 sentences)
2. Relevant constraints or criteria
3. NO hints, NO verification checks, NO troubleshooting

**Sub-tasks are NOT just requirements re-numbered.** Requirements describe
the end product. Sub-tasks describe work chunks in sequence.

Example: Requirement "Aiški vizualinė hierarchija" →
Sub-task "Nuspręskite, kas plakate yra #1, kas #2, kas #3.
Pakeiskite elementų dydžius ir pozicijas atitinkamai."

---

## Step 4 — Domain Adaptation

Detect the domain from the teacher plan content, README, and module path.

### Programming (C++, HTML/CSS)

- Steps include exact code to type, line by line
- Planning prompts before coding: "Kokius kintamuosius naudosite?"
- "Stuck?" boxes for: compile errors, file extension issues, runtime problems
- Self-check includes "Ar kodas kompiliuojasi be klaidų?"
- Pavyzdys shows expected output or code skeleton

### Spreadsheet (Excel)

- Steps include exact cell references and formula patterns
- "Stuck?" boxes for: formula errors, wrong cell references
- Self-check includes "Ar formulės rodo teisingus rezultatus?"

### Design/visual (Canva, Inkscape)

- No Pavyzdys section (creative output)
- Sub-tasks reference design principles, not exact appearance
- Self-check uses principle-based items

### Theory/analysis

- No Pavyzdys section
- L steps become guiding questions with expected reasoning structure
- Requirements become "demonstrate understanding" prompts

---

## Step 5 — Generate Content

Generate each section according to `references/task_format.md`.

### Sparse plan expansion

When the teacher plan's task section has only 1–2 sentences:
1. Read the README learning objectives
2. Read the module context
3. Derive 3–5 concrete requirements from objectives
4. Build appropriate Darbo eiga from derived requirements
5. Do not invent objectives not in the README or plan

### Content constraints

All constraints from teacher profile apply:
- Only approved software (Code::Blocks, Excel, Word, Inkscape,
  Canva, Google Classroom, Testmoz)
- No phones, no Python — C++ only for programming
- No paper/notebooks
- Technical terms in original language

---

## Step 5b — Cross-file Coherence Check

Before rendering, verify alignment with sibling lesson files. This step
prevents scenario mismatches, modality drift, and terminology gaps between
the Student_Task and other lesson materials.

### What to check:

1. **Teacher_Plan.docx (mandatory — already read in Step 1):**
   - Every scenario, activity name, and task modality (digital/verbal/written)
     in the Student_Task must match what the Teacher_Plan describes in its
     taikymo užduotys / savarankiška užduotis section.
   - If the plan says students use Excel but the task says Word → fix the task.
   - If the plan describes 3 sub-tasks but the task has 5 → reconcile.

2. **Theory_Pack.pdf (if it exists on disk):**
   - Every technical term used in the Student_Task should appear in the
     Theory_Pack. If a term is missing from the theory pack, either remove
     it from the task or flag it for the teacher.

3. **Visual_Aid.pdf (if it exists on disk):**
   - Slide 5 key concepts should cover the terms the Student_Task relies on.
     If a critical task term is absent from the visual aid, flag it.

### On mismatch:

- Fix the Student_Task content to align with the Teacher_Plan (plan is
  authoritative for task design).
- For Theory_Pack/Visual_Aid mismatches: flag to the teacher rather than
  silently modifying the task, since those files may need updating instead.

---

## Step 6 — Render .docx and convert to PDF

Read `references/task_format.md` for formatting specs. Use theory-pack-consistent
visual identity: navy headings, colored info boxes, grey metadata.

### 6a. Lithuanian text encoding

**Write all Lithuanian text as plain UTF-8 in the generation script.** Never
use `\u` unicode escapes for Lithuanian letters (ą, č, ę, ė, į, š, ų, ū, ž).
Unicode escapes make character-level errors invisible and are the primary root
cause of Lithuanian spelling errors in generated content.

**Exception:** Lithuanian typographic quotes must use escapes (`\u201E` for
opening „ and `\u201C` for closing ") because the closing quote conflicts
with JavaScript string delimiters.

### 6b. Em dash post-processing

The generation script MUST include a mechanical em dash removal step.
Add this helper and apply it to every text string before inserting into
the document:

```javascript
const noEmDash = (s) => s.replace(/\u2014/g, ':');
```

LLMs naturally produce em dashes regardless of prompt instructions.
Automated code-level replacement is the only reliable fix.

### 6b-ii. Mechanical Em Dash Strip (mandatory, non-skippable)

After the .docx file is saved to disk and BEFORE any QA or sidecar steps,
run this standalone post-processing step. This is NOT part of the generation
script — it runs on the saved .docx file as a separate operation.

```python
import zipfile, os, shutil, tempfile

def strip_em_dashes_from_docx(docx_path):
    """Strip all em dashes from a .docx file. Runs on the saved file."""
    tmpdir = tempfile.mkdtemp()
    with zipfile.ZipFile(docx_path, 'r') as z:
        z.extractall(tmpdir)
    docxml = os.path.join(tmpdir, 'word', 'document.xml')
    with open(docxml, 'rb') as f:
        data = f.read()
    em = '\u2014'.encode('utf-8')
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
                    arcname = os.path.relpath(fpath, tmpdir)
                    zout.write(fpath, arcname)
        os.remove(docx_path)
        shutil.move(outfile, docx_path)
    shutil.rmtree(tmpdir)
    return count
```

This step is SEPARATE from the noEmDash helper in the generation script.
Both layers must exist. This step must run even if the generation script claims to
have handled em dashes.

### 6c. Write plain-text sidecar

After building the .docx but before PDF conversion, write all Lithuanian
text to `Student_Task_text.txt` in the same lesson folder. This sidecar
enables reliable lt-qa POST-GEN checking (see lt-qa SKILL.md "Plain-Text
Sidecar Protocol"). Collect every paragraph, heading, table cell, and list
item text during generation and write as plain UTF-8, one paragraph per line.

After lt-qa POST-GEN passes (Step 7 or equivalent), delete the sidecar file.
If POST-GEN finds issues, fix them in the .docx, regenerate the sidecar,
and re-run POST-GEN.

### 6d. Convert to PDF

After generating the .docx and writing the sidecar, convert to PDF:

```bash
python -c "from docx2pdf import convert; convert('input.docx', 'output.pdf')"
```

This uses Microsoft Word for high-fidelity conversion. After confirming the
PDF exists and has non-zero size, **delete the intermediate .docx file**.
The final deliverable is PDF only (per locked decision in CLAUDE.md).

If `docx2pdf` is not installed: `pip install docx2pdf`.
If conversion fails (Word not available): keep the .docx and inform the
teacher that PDF conversion requires Microsoft Word.

**Output location:**
- Single: lesson folder as `Student_Task.pdf`
- Batch: each task to its respective lesson folder

After saving, use `present_files` to share.

---

## Step 7 — Quality Self-Check

| Check | Rule |
|-------|------|
| Type gate | Lesson is L or I |
| Threshold | ≥3 steps/requirements (or expanded from README) |
| Audience | Zero teacher-facing content |
| Voice | Second person formal imperative |
| Darbo eiga | L has micro-steps with hints, checks, Stuck? boxes. I has sub-tasks without scaffolding. |
| Scaffolding depth | Grade 9 = maximum (assume zero PC experience). Grade 10 = moderate (basic file skills known, ceiling ≈ archiving). Grade 11-12 = tool/concept-specific only. |
| Stuck? boxes | L only, 1-3 per doc, at genuine high-risk points |
| Extension | I has Papildoma užduotis. L usually does not (exception: grade 11-12). |
| Self-check | Simple ☐ checklist, no explanations |
| Answer leakage | Every self-check question must not narrow the answer space for any task step or scenario. If a checklist item reveals whether the student's work is correct, rephrase to check process, not outcome. |
| Domain | Code/formula examples match lesson's actual tools |
| Scope | Requirements don't exceed README/plan scope |
| Tools | Only approved software |
| Language | Lithuanian throughout, technical terms original |
| Formatting | Navy headings, info boxes, consistent with theory pack |

---

## Source Priority

1. **Teacher_Plan.docx** — task content, requirements, instructions
2. **README** — lesson scope, objectives, type, grade
3. **Teacher profile** — style constraints, classroom reality
4. **Curriculum files** — content boundaries, terminology
5. **General defaults** — only when above say nothing

---

## Reference Files

Read before every generation:
- `references/task_format.md` — Structure, formatting, info box specs
- `/mnt/skills/user/lesson-plan-gen/references/teacher_profile.md` — Constraints

### Exemplars

- `references/exemplars/L_example_01.md` — L lesson: HTML basics.
  Demonstrates micro-step scaffolding, Stuck? boxes, edge case handling,
  pre-checks after every step. 8 steps, 3 Stuck? boxes, 1 Svarbu box.
- `references/exemplars/I_example_01.md` — I lesson: poster composition.
  Demonstrates structured sub-tasks, no scaffolding, extension task.
  5 sub-tasks, no troubleshooting, principle-based self-check.

**The two exemplars must feel genuinely different.**
L guides the student through HOW to do each action.
I structures WHAT to do and releases the student to figure out HOW.
