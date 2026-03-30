---
name: lesson-plan-gen
description: >
  Generate Lithuanian-language Teacher_Plan.docx files for the IT Curriculum repo
  (PauliusPadrostis/IT_Curriculum). Use this skill whenever the teacher asks to create,
  generate, write, or build a lesson plan, teacher plan, or pamokos planas. Also triggers
  on: "sugeneruok planą", "padaryk pamokos planą", "sukurk Teacher_Plan", "generate
  lesson plan", "create teacher plan", "fill out lesson plans", "build plans for module",
  or any mention of generating Teacher_Plan files for lesson folders. This skill handles
  both single lesson plan generation and batch generation for entire modules or grades.
  Even if the user says "make materials" or "fill the repo" — if lesson plans are the
  expected output, use this skill. Do NOT use for README generation (use lesson-readme-gen),
  slide/visual aid creation, or student task sheets.
---

# Lesson Plan Generator

Generates Lithuanian-language Teacher_Plan.docx files for the IT Curriculum repo.
Each plan is a practical, compact document a teacher opens before class to know
exactly what to do. All generated content is in **Lithuanian**. Respond to the
teacher in whatever language they use.

**This skill is designed for mass generation.** It uses safe defaults when context
is incomplete and does not pause for approval on structural decisions. It stops only
when generating would produce an obviously broken plan.

---

## Step 0 — Read References

**Before generating any plan, always read these files:**

1. `references/teacher_profile.md` — teaching style, decision framework, constraints.
   This is the primary style and structure reference. Read it fully.
2. `references/plan_format.md` — the exact .docx output structure and formatting rules.
3. `references/exemplars/` — read the exemplar matching the lesson type being generated
   (L, I, or P). These calibrate tone, density, and type-specific rhythm.

**Lithuanian QA (mandatory):**
4. Read `/mnt/skills/user/lt-qa/SKILL.md` and run **Phase 1 (PRE-GEN)** — load
   the mistake library, AI pattern rules, and audience calibration before writing
   any Lithuanian text.

These files are the skill's operational backbone. Do not generate without them.

---

## Step 0.5 — Module Design Gate

Before generating a plan for the **first lesson of a new module** (no content files
exist in any sibling lesson folder yet), check whether `Module_Design.md` exists in
the module folder.

- **If it exists:** read it and use it as context for Bloom level, prerequisites,
  independent work allocation, and P-A compatibility decisions throughout generation.
- **If it does not exist:** warn the teacher:
  > "Šiam moduliui dar nėra Module_Design.md. Prieš generuojant turinį,
  > rekomenduoju sukurti modulio dizaino dokumentą, kad Bloom lygiai,
  > prielaidos ir P-A suderinamumas būtų suplanuoti iš anksto.
  > Šablonas: `.claude/skills/module-qa/references/module_design_template.md`
  > Ar norite, kad padėčiau jį užpildyti?"
  If the teacher says yes, help fill the template. If they say skip, proceed but
  flag this in the plan's header as a known gap.

**When generating in batch mode** (entire module): read `Module_Design.md` once
at the start. Use it to validate each lesson's Bloom level and prerequisites as
you process the sequence.

This step is a no-op when `Module_Design.md` already exists and has been read,
or when generating a single lesson for an already-populated module.

---

## Step 1 — Gather Context

### What to read, in order:

| Priority | Source | What to extract |
|----------|--------|-----------------|
| 1 | **Lesson README** | Title, type, grade, semester, module, sequence number, overview, learning objectives, success criteria, Bloom level, prerequisites, lesson flow summary |
| 2 | **Module README** (parent folder) | Module theme, lesson index (all lessons in module with types), module learning arc |
| 3 | **Grade/Semester README** (if accessible) | Grade focus, semester goals, assessment schedule |
| 4 | **Adjacent lesson READMEs** in same module | What came before, what comes next — for sequence position and recent pattern analysis |
| 5 | **Curriculum reference** (informatika.docx in project) | Grade-appropriate content scope, terminology, competency expectations |
| 6 | **VBE reference files** (if grade 11-12) | Exam format, task types, assessment structure |

### Path parsing

Extract metadata from the lesson folder path:
```
Grade_10/Semester_2/03_Programming_Loops_Functions/019_L - while and or for/
→ grade: 10, semester: 2, module: Programming_Loops_Functions,
  code: 019_L, type: L, title: "while and or for"
```

### Batch mode

When generating plans for a module or grade:
1. Read the module README to get the full lesson index.
2. Process lessons **in sequence order** — this matters because each plan's
   decisions depend on what came before.
3. Track the running context: what shapes were used, how many consecutive
   theory-heavy lessons there have been, what content was covered.

---

## Step 1b — L-Content Synthesis (I lessons only)

This step fires ONLY when generating an I lesson. Skip entirely for L, P, A, T, D, MOCK, G.

### Purpose

Before deciding structure or generating content, determine exactly WHAT the
I lesson should integrate. I lessons do not teach new content — they consolidate
and apply content from preceding L lessons. The skill must identify that content
explicitly, not rely on vague README descriptions.

### 1b.1 — Determine integration scope

Read the module index (from Module README) and identify which L lessons this
I lesson is responsible for integrating.

**Scoping rule:** An I lesson's primary integration scope is the L lessons
since the last I lesson (or since the start of the module if this is the
first I lesson). Earlier L content may appear in retrieval questions but
must NOT dominate the integration task.

Examples:
- Module: L1-L2-L3-L4-I1-I2 → I1 scope: L1-L4 (first I, all preceding Ls)
- Module: L1-L2-I1-L3-L4-I2 → I1 scope: L1-L2. I2 scope: L3-L4.
- Module: L1-I1 → I1 scope: L1 only (narrow scope — see §1b.5)

**Edge case — cross-module prerequisites:** If the I lesson README explicitly
references knowledge from another module, note the dependency in the plan
metadata but do NOT attempt to extract targets from that other module's files.
The integration task stays scoped to the current module.

### 1b.2 — Extract integration candidates

For each L lesson within scope, read (in order of preference):
1. The L lesson's Teacher_Plan (richest source — has objectives, task types, shape)
2. The L lesson's README (if no plan exists)

**In batch mode:** use the L lesson plans you just generated in memory as
source material. Do not rely only on pre-existing files on disk.

From each L lesson, extract:
- Learning objectives (exact text)
- Key concepts/skills introduced
- Task types used in the L lesson (if visible from plan)
- Lesson shape used (from plan metadata — needed for practice deficit detection)

### 1b.3 — Rank into integration targets

Compile all extracted concepts/skills into a single list. Rank by three criteria:

| Criterion | How to assess | Weight |
|-----------|--------------|--------|
| **Curriculum weight** | Is this a named expectation in the curriculum (informatika.docx)? Named expectations rank higher than secondary/supporting skills. | Primary |
| **Practice deficit** | Was the L lesson mostly teacher-led with little student hands-on time? Detect from the L plan's shape: "Pilnas demonstravimas" = high deficit. "Demo → bandymas" = medium. "Trumpas įvadas → ilga praktika" = low. If shape is unknown, use Bloom level as proxy — lower Bloom in L (knowledge/comprehension) = more practice needed in I. | Secondary |
| **Assessment proximity** | When the module index shows A as the next lesson after this I (or within 2 lessons), boost ranking weight of curriculum-named expectations — these are most likely to appear in the assessment. | Modifier |

### 1b.4 — Multi-I distribution (when multiple I lessons exist)

When the module index shows more than one I lesson, distribution MUST happen
BEFORE generating any individual I plan.

**Process:**
1. Extract ALL integration candidates from all L lessons in the combined scope.
2. Count the total I lessons in the block.
3. Partition candidates across the I lessons using two criteria:
   - **Thematic coherence:** group related concepts into the same I lesson
     so the task feels unified, not fragmented.
   - **Cognitive progression:** place more concrete, application-level targets
     in the earlier I lesson. Place more analytical or synthesis-level targets
     in the later I lesson.
4. Each I lesson receives its own scoped target list of 2–4 items.
5. Generate each I lesson ONLY from its assigned list.

**In single-lesson mode** (generating just one I lesson, not batch):
Check the module index for sibling I lessons. If their plans already exist on
disk, read them and extract what targets they cover. Assign remaining targets
to this lesson. If sibling plans do not exist, treat this as if generating
in batch — produce the full distribution, then generate only this lesson's
portion.

### 1b.5 — Minimum L coverage threshold

If fewer than 2 L lessons precede this I lesson within its scope:
- Flag this as a narrow-scope I lesson.
- Generate a focused, single-skill application task rather than a
  multi-concept integration task.
- Check whether the I lesson README references cross-module prerequisites
  that explain the narrow scope.

### 1b.6 — README reconciliation

The I lesson README may have its own objectives and overview. Reconcile:

- **If the README specifies concrete objectives:** Step 1b targets must
  align with and support those objectives. Targets that contradict the
  README are dropped. Targets that the README doesn't mention can appear
  in retrieval questions but not as the main task focus.
- **If the README is vague or generic** (e.g., "students apply safety
  knowledge," "consolidate prior learning"): Step 1b targets become the
  primary content driver for the plan.

This reconciliation follows the existing source priority: README wins for
scope, but Step 1b fills substantive gaps the README leaves open.

### 1b.7 — Output

The output of Step 1b is an internal working list (NOT included in the
final .docx) containing:
- This I lesson's assigned integration targets (2–4 items), ranked
- The source L lessons for each target
- A note on topic type (knowledge-heavy vs. tool-based vs. programming)
- A note if this is a narrow-scope I lesson (§1b.5)
- A note if pre-A boosting was applied (§1b.3)

This list feeds directly into Step 2 (shape selection) and Step 3
(content generation).

---

## Step 2 — Analyze and Decide Structure

Apply the decision framework from `references/teacher_profile.md` §3.

### Quick summary of the 3-step process:

**Step 2a — Topic analysis.** Classify the lesson topic on three axes:
- Concreteness (can students immediately see/do/build something?)
- Decomposability (can the topic be chunked into try-it-yourself pieces?)
- Tool dependency (does the lesson need students at their computers?)

**Step 2b — Context modifiers.** Check:
- Position in lesson sequence (which lesson of how many?)
- Recent lesson pattern (were last 2-3 lessons theory-heavy?)
- What comes next (assessment approaching?)
- Grade level (9-10 need more structure; 11-12 more autonomy)

**Step 2c — Shape selection.** Pick from the defined palette:

| Shape | Ratio (teacher:student) |
|-------|------------------------|
| Full demo | ~80/20 |
| Demo → try | ~60/40 |
| Short intro → extended practice | ~30/70 |
| Guided exploration | ~20/80 |
| Review + rehearsal (P lessons) | ~25/75 |

**Priority order when modifiers conflict:**
1. Topic logic → 2. Sequence position → 3. Upcoming assessment →
4. Grade level → 5. Pace variation

**For A and T lessons:** skip this analysis. Use fixed A/T structure.

**For P lessons:** always use "Review + rehearsal" shape.

### Unknown context handling

When information is missing, use safe defaults — do not stop:

| Missing info | Default |
|-------------|---------|
| Sequence position unknown | "Demo → try" for L, "Short intro → extended practice" for I |
| Previous lessons unknown | Use topic analysis result unmodified |
| Module context unavailable | Generate from README alone |

**Stop only when:**
- Topic cannot be identified from README
- Lesson type contradicts the described content
- Required software is unknown
- Lesson depends on prior work so strongly that no plan makes sense without it

---

## Step 3 — Generate Plan Content

Generate each section according to the minimum plan schema
(teacher_profile.md §13). All content in Lithuanian, formal imperative voice.

### Section-by-section rules:

**1. Antraštė (title)**
- Use the lesson title from README. Do not rename.

**2. Pamokos tipas ir vieta sekoje**
- State: type code + full type name, lesson N of M in topic (if known).
- Example: `L — Mokymosi pamoka (2 iš 4 apie ciklus)`

**3. Temos ribos**
- 2-3 sentences: what this specific lesson covers and does NOT cover.
- Must align with README scope. Do not expand beyond README.

**4. Pamokos tikslai**
- Pull from README learning objectives. If README has none, derive from
  overview — but flag with `[iš README apžvalgos]`.
- Do NOT invent new goals not present in README.

**5. Fazės su apytiksliais laiko įverčiais**
- Phase structure depends on lesson type and selected shape (Step 2).
- Use approximate times: `~5 min.`, `~15–20 min.`, etc.
- Sum of estimates must be ≤37 min.
- See `references/teacher_profile.md` §4 for phase templates per type.

**6. Phase content — for each phase, specify:**

| Element | Required | Notes |
|---------|----------|-------|
| Mokytojo veiksmai | ✅ Always | What the teacher does/says. Compact, not scripted. |
| Mokinių veiksmai | ✅ Always | What students do during this phase. |
| Tikslūs klausimai | ✅ For retrieval phases | Exact question text for entry/exit retrieval. |
| Užduoties instrukcijos | ✅ When taikymas present | Exact task instructions students will see/hear. |
| Dažna klaida / ko stebėti | Optional | Common mistakes or what to watch for. |

### Retrieval questions (L, I, P only):

**Pamokos pradžios klausimai (entry):**
- 2-4 questions from the **previous lesson** in the module.
- Must be high-value, targeting the most important ideas.
- Verbal / cold-call format. No writing.
- If previous lesson content is unknown, write: `[Klausimai iš praeitos pamokos —
  pritaikyti pagal realų turinį]` and provide example questions from the topic area.

**Pamokos pabaigos klausimai (exit):**
- 2-4 questions from **this lesson**.
- Must test understanding, not echo what was just said.
- Must require reconstruction, application, comparison, or error detection.

**Banned:** echo-type questions where the answer was stated 1-2 minutes ago.

### Comprehension checks during teaching (optional):
- Only when natural and meaningful.
- Must require application/reconstruction, never parroting.
- Good: "Ką gausite, jei pakeisime `<` į `<=`?"
- Bad: "Ką reiškia `<body>`?" right after explaining it.

### Task instructions (when taikymas phase present):

**L lessons:** heavy scaffolding — step-by-step instructions, helper questions,
examples, clear success criteria.

**I lessons:**
- Task must directly target ≥2 integration targets from Step 1b.
- Task instructions must specify three things: (a) what students produce
  (a concrete, tangible output), (b) what criteria their output is evaluated
  against, and (c) how long they have.
- Scaffolding is reduced: no step-by-step instructions. Provide the goal,
  constraints, and available resources only.
- For knowledge-heavy topics: use a structured activity format from the
  §4 activity palette (scenario analysis, decision matrix, classification,
  error detection, etc.). Students MUST write/record their analysis —
  verbal-only discussion is not sufficient for an I lesson.
- For tool-based topics: use a product-creation task combining skills from
  ≥2 preceding L lessons.
- For programming topics: provide only the problem description and expected
  output. No step-by-step code walkthrough.
- Extension task for stronger students (always).
- If the topic has low concreteness (e.g., safety, theory), the I lesson
  must still produce a tangible student artifact — a completed scenario
  worksheet, a decision log, a structured written analysis, a filled
  classification table, etc.
- When multiple I lessons exist in sequence, each must use a DIFFERENT
  activity format (see §4 activity rotation rule). Check what format
  the previous I lesson used before selecting.

**P lessons:** tasks resemble assessment format. For grades 11-12 with VBE
relevance, use structured questions, data analysis tasks, or programming practicals.

### Differentiation:
- L: strong support for all.
- I: reduced support + extra challenge for stronger students.
- Include only when the shape/type calls for it. Don't force it.

**7. Pamokos aprašymas (dienynui)**
- 2-5 medium sentences. Lithuanian, formal.
- A student who missed class should understand what was done.
- Placed at the end of the plan.

### Content constraints (from teacher_profile.md §11):
- No software not in the approved list (Code::Blocks, Excel, Word, Inkscape,
  Canva, Google Classroom, Testmoz). Flag if needed.
- No phones. No Python. C++ only for programming.
- No notebooks/paper — students don't carry them.
- No forced computer use when topic suits verbal analysis or demo.
- Timing estimates must be realistic. If content doesn't fit 37 min → cut scope.

---

## Step 3b — Cross-file Coherence Check

Before rendering, verify alignment with sibling lesson files that already
exist on disk. This step prevents scenario mismatches between the plan and
other lesson materials.

### What to check:

1. **Student_Task.pdf (if it exists on disk):**
   - Read it. The plan's taikymo užduotys / savarankiška užduotis section
     must describe the same task the Student_Task contains: same scenario
     names, same tool references, same deliverable description.
   - If the plan's task section diverges from the Student_Task → align the
     plan to match, since the Student_Task is what students actually see.
   - If Student_Task does not exist yet (common in forward generation) →
     skip this check.

2. **Theory_Pack.pdf (if it exists on disk):**
   - Verify the plan's teaching phase covers the same core concepts that
     the Theory_Pack presents. If the theory pack introduces a term the
     plan never mentions → add it to the teaching phase or retrieval.
   - If Theory_Pack does not exist yet → skip this check.

3. **Visual_Aid.pdf (if it exists on disk):**
   - If the visual aid's slide 5 (key concepts) contains terms not in the
     plan's teaching phase → flag the discrepancy.

### On mismatch:

- The plan adapts to match existing student-facing materials (Student_Task
  and Theory_Pack are authoritative for what students see).
- README remains authoritative for scope — do not expand the plan beyond
  README boundaries even if a sibling file covers more.
- Flag unresolvable contradictions to the teacher.

---

## Step 4 — Render .docx

Read `references/plan_format.md` for the exact .docx structure, formatting,
and code to generate the document.

### Lithuanian text encoding

**Write all Lithuanian text as plain UTF-8 in the generation script.** Never
use `\u` unicode escapes for Lithuanian letters (ą, č, ę, ė, į, š, ų, ū, ž).
Unicode escapes make character-level errors invisible and are the primary root
cause of Lithuanian spelling errors in generated content.

**Exception:** Lithuanian typographic quotes must use escapes (`\u201E` for
opening „ and `\u201C` for closing ") because the closing quote conflicts
with JavaScript string delimiters.

### Em dash post-processing

The generation script MUST include a mechanical em dash removal step.
Add this helper and apply it to every text string before inserting into
the document:

```javascript
const noEmDash = (s) => s.replace(/\u2014/g, ':');
```

LLMs naturally produce em dashes regardless of prompt instructions.
Automated code-level replacement is the only reliable fix.

**Output location:**
- Single plan: save to the lesson folder as `Teacher_Plan.docx`,
  or to `/mnt/user-data/outputs/Teacher_Plan.docx` if folder unknown.
- Batch: save each plan to its respective lesson folder.

After saving, use `present_files` to share the output.

---

## Step 5 — Quality Self-Check

Before finalizing, verify:

| Check | Rule |
|-------|------|
| Timing | Sum of phase estimates ≤37 min |
| Completeness | All items from §13 minimum schema present |
| Retrieval quality | Entry questions from previous lesson, exit from this lesson. No echo questions. |
| Task quality | Instructions are concrete, not vague ("mokiniai dirba" without saying what) |
| Tool reality | Only approved software. No phones. No paper. |
| Scope fidelity | Plan doesn't cover more than README defines |
| Language | Lithuanian throughout, formal imperative, technical terms in original language |
| Type alignment | Plan structure matches lesson type + selected shape |
| Assessment realism | P/A/T tasks resemble actual assessment formats (especially grades 11-12) |
| I-lesson activity ratio | For I lessons: student active work ≥60% of lesson time. Teacher-led ≤15 min total (target ≤12 min). |
| I-lesson content anchor | For I lessons: task targets ≥2 specific concepts/skills from preceding L lessons (from Step 1b). Not vague "apply what you learned." |
| I-lesson tangible output | For I lessons: plan specifies a concrete student artifact — not "discuss" or "answer verbally" as the main deliverable. |
| I-lesson activity rotation | For consecutive I lessons: activity format differs from the previous I lesson in the module. |
| I-lesson exit retrieval | For I lessons: exit questions are metacognitive/reflective, not factual recall. |

| Extra materials needed | Plan references images, diagrams, illustrations, or other visual assets not yet in the lesson folder. Flag each one. |

If a check fails, fix it before outputting. Do not output plans that fail timing
or completeness checks.

### Extra materials flagging

After generating the plan, scan ALL content for references to visual materials
that the teacher would need to source or create. Look for patterns like:

- "parodykite ekrane / skaidrėje [image/picture/diagram]"
- "parodykite pavyzdžių skalę / schemą / diagramą"
- "parodykite paveikslėlį / nuotrauką / iliustraciją"
- Any instruction that implies showing a visual that is NOT just text or questions on a slide

For each found reference, append a flagged item to the output after the plan:

```
--- REIKALINGOS PAPILDOMOS MEDŽIAGOS ---
1. [Fazė: Dėstymas, ~2 min.] Paveikslėlis: žmogus, sėdintis netaisyklingai prie kompiuterio.
   → Šaltinis: nuotrauka (Pixabay/Pexels) arba iliustracija (Canva).
2. [Fazė: Dėstymas, Jautrūs duomenys] Diagrama: duomenų jautrumo skalė (vardas → adresas → asmens kodas → banko duomenys).
   → Šaltinis: galima sugeneruoti kaip SVG diagramą Visual Aid skaidrėje.
```

This ensures visuals don't get forgotten between plan generation and lesson delivery.

---

## Source Priority

When sources disagree:
1. **README** — lesson-specific scope, type, objectives
2. **Teacher profile** — style, constraints, classroom reality
3. **Curriculum files** — content boundaries, terminology
4. **Previous lesson plans in module** — sequence continuity
5. **General defaults** — only when above sources say nothing

If README and curriculum contradict: generate conservatively from README,
do not expand topic beyond README scope.

---

## Step 5 — Write Plain-Text Sidecar

After generating the .docx (Step 4) and before the QA pass, write all
Lithuanian text to `Teacher_Plan_text.txt` in the same lesson folder.
This sidecar enables reliable lt-qa POST-GEN checking (see lt-qa SKILL.md
"Plain-Text Sidecar Protocol"). Collect every paragraph, heading, table
cell, and list item text from the generated document and write as plain
UTF-8, one paragraph per line. Delete the sidecar after POST-GEN passes.

---

## Step 6 — Lithuanian QA Pass

After generating the .docx file and writing the sidecar, run **Phase 2
(POST-GEN)** from `/mnt/skills/user/lt-qa/SKILL.md`, reading from the
`Teacher_Plan_text.txt` sidecar. This includes the full checklist: mistake
library scan, grammar & morphology check, punctuation audit, AI pattern
elimination, audience calibration, VLKK terminology check, and final
natural-read test. Fix all issues found. Delete the sidecar after POST-GEN
passes. Present the .docx to the user.

---

## Reference Files

Read these before every generation:
- `references/teacher_profile.md` — Teaching style, decision framework,
  all constraints and rules. **This is the primary reference.**
- `references/plan_format.md` — Exact .docx structure, formatting code,
  and rendering instructions.

### Exemplar plans

Read these to calibrate tone, density, and type-specific structure:
- `references/exemplars/L_example_01.md` — L lesson: HTML basics.
  Demonstrates demo→try shape, unified teaching flow, heavy task scaffolding.
- `references/exemplars/I_example_01.md` — I lesson: poster composition.
  Demonstrates short intro→extended practice, teacher circulation,
  differentiated support, minimal teaching. Tool-based I pattern.
- `references/exemplars/I_example_02.md` — I lesson: safety scenario analysis.
  Demonstrates knowledge-heavy I pattern, structured written student output,
  scenario-based task, metacognitive exit retrieval.
- `references/exemplars/P_example_01.md` — P lesson: graphics pre-assessment.
  Demonstrates review+rehearsal shape, assessment-format tasks, error review,
  self-check.

**The three exemplars should feel genuinely different from each other.**
If a generated I plan reads like an L plan with shorter teaching blocks,
it is wrong. If a P plan reads like an L plan with review topics, it is wrong.
Each type has its own rhythm — match it.
