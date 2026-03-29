# QA Report: Safety
Generated: 2026-03-29 | Module: Grade_9/Semester_1/01_Safety | Lessons audited: 2

## Summary
- Issues found: 16
- Critical: 1 | Major: 5 | Minor: 9
- By dimension: Structure (7) | Content (5) | Language (4)
- Lessons skipped (incomplete): 002, 003, 004, 005, 006
- Cross-lesson findings: 1

## Critical Issues
> Content is incorrect, misleading, or has major gaps. Fix before using in classroom.

### [C-01] Lesson 007 — Safety structured assessment: Factually incorrect answer key reasoning
- **Dimension:** Content & Pedagogical Coherence
- **Location:** `007_A - Safety structured assessment/Assessment_Task.xlsx` (question 4d) + `Answer_Key.docx`
- **Problem:** Question 4d asks "Kur reikėtų atiduoti seną telefoną?" with distractor "Į parduotuvę, kur jis buvo pirktas." The Answer_Key rejects this with "Parduotuvės neprivalo priimti senų įrenginių." Under Lithuanian WEEE regulations, electronics retailers are actually required to accept old electronics for free. The answer key reasoning is factually incorrect, which could mislead the teacher during grading.
- **Suggested action:** Replace the distractor with something clearly wrong (e.g., "Išmesti į mišrių atliekų konteinerį gatvėje") or update the Answer_Key reasoning to acknowledge the retailer option. Re-run assessment-task-gen and answer-key-gen.
- **Status:** ☐ Open

## Major Issues
> Weakens quality. Should fix before teacher review.

### [M-01] Lesson 006 — Safety checklist rehearsal: README claims ✅ Failai sukurti but Answer_Key.pdf is missing
- **Dimension:** Structure & Metadata
- **Location:** `006_P - Safety checklist rehearsal + common mistake review/README.md`
- **Problem:** P-type lessons require Teacher_Plan.docx, Practice_Task.pdf, and Answer_Key.pdf per canonical file list. Answer_Key.pdf does not exist on disk, but the README shows Būsena as "✅ Failai sukurti". This is inaccurate. Should be 🚧 WIP.
- **Suggested action:** Generate Answer_Key.pdf using answer-key-gen skill in P/study-key mode. Then update lesson README Būsena. Until Answer_Key.pdf exists, change Būsena to 🚧 WIP.
- **Status:** ☐ Open

### [M-02] Lesson 006 — Safety checklist rehearsal: README file table missing Answer_Key.pdf
- **Dimension:** Structure & Metadata
- **Location:** `006_P - Safety checklist rehearsal + common mistake review/README.md` (Reikalingi failai table)
- **Problem:** The README's file table only lists Teacher_Plan.docx and Practice_Task.pdf. Per file_requirements.md, P-type also requires Answer_Key.pdf. The file is not listed at all.
- **Suggested action:** Re-run lesson-readme-gen for 006_P to include Answer_Key.pdf in the file table.
- **Status:** ☐ Open

### [M-03] Lesson 005 — Scenario rotation task: README file table missing Visual_Aid.pdf
- **Dimension:** Structure & Metadata
- **Location:** `005_I - Scenario rotation task/README.md` (Reikalingi failai table)
- **Problem:** I-type lessons require Visual_Aid.pdf per canonical file list. The 005 README only lists Teacher_Plan.docx and Student_Task.docx (also wrong format, should be .pdf). Visual_Aid.pdf is completely absent from the file table.
- **Suggested action:** Re-run lesson-readme-gen for 005_I to include Visual_Aid.pdf and fix Student_Task format (.pdf not .docx).
- **Status:** ☐ Open

### [M-04] Lesson 007 — Safety structured assessment: Timing exceeds 37-minute limit
- **Dimension:** Content & Pedagogical Coherence
- **Location:** `007_A - Safety structured assessment/Teacher_Plan.docx`
- **Problem:** Timing sums to ~38 min (3 min instruction + 35 min assessment). CLAUDE.md mandates ≤37 min. README corroborates with timeline ending at 38 min.
- **Suggested action:** Reduce assessment time to 34 min (3 + 34 = 37). Re-run lesson-plan-gen and update README timeline.
- **Status:** ☐ Open

### [M-05] Lesson 007 — Safety structured assessment: Em dashes in Teacher_Plan
- **Dimension:** Lithuanian Language
- **Location:** `007_A - Safety structured assessment/Teacher_Plan.docx` (5 instances)
- **Problem:** Em dash (—) is banned but appears 5 times: "Vaikščiokite po klasę — stebėkite...", "Baigusiems anksčiau — leisti peržiūrėti...", "A — Vertinimo pamoka", "Trumpas paaiškinimas — ~3 min.", "Vertinimo užduotis — ~35 min."
- **Suggested action:** Re-run lesson-plan-gen or manually replace em dashes with colons/commas.
- **Status:** ☐ Open

## Minor Issues
> Cosmetic, terminological, or style issues. Fix when convenient.

### [m-01] Lessons 002-004 — Theory Pack naming and format deviation
- **Dimension:** Structure & Metadata
- **Location:** `002_L`, `003_L`, `004_L` folders
- **Problem:** Theory Pack files use non-canonical names (e.g., `002_L_Privatumas_Theory_Pack.docx`) and wrong format (.docx instead of .pdf). Per file_requirements.md, they should be `Theory_Pack.pdf`.
- **Suggested action:** When regenerating these Theory Packs, use the canonical name `Theory_Pack.pdf`. Re-run theory-pack-gen for each.
- **Status:** ☐ Open

### [m-02] Lesson 001 — Theory Pack naming deviation
- **Dimension:** Structure & Metadata
- **Location:** `001_L - Ergonomics & healthy computer use/001_L_Ergonomika_Theory_Pack.pdf`
- **Problem:** Theory Pack uses `001_L_Ergonomika_Theory_Pack.pdf` instead of canonical `Theory_Pack.pdf`. Format is correct (.pdf) but name is non-standard.
- **Suggested action:** Rename to `Theory_Pack.pdf` and update README file table. Or accept this naming convention as a project decision and document it.
- **Status:** ☐ Open

### [m-03] Lessons 002-004 — READMEs list Student_Task as .docx
- **Dimension:** Structure & Metadata
- **Location:** `002_L/README.md`, `003_L/README.md`, `004_L/README.md` (Reikalingi failai tables)
- **Problem:** These READMEs list `Student_Task.docx` but the canonical format is `Student_Task.pdf` per file_requirements.md.
- **Suggested action:** Re-run lesson-readme-gen for these lessons to fix file format references.
- **Status:** ☐ Open

### [m-04] Module README — Rollup count inaccurate
- **Dimension:** Structure & Metadata
- **Location:** `01_Safety/README.md` (Modulio būsena line)
- **Problem:** Module README says "3/7 ✅ Failai sukurti". Since 006_P is actually WIP (missing Answer_Key.pdf), the correct count is 2/7 Failai sukurti, 5/7 WIP.
- **Suggested action:** Update module README after fixing 006_P status. Re-run lesson-readme-gen for module README or edit manually.
- **Status:** ☐ Open

### [m-05] Lesson 001 — Timing discrepancy between README and Teacher_Plan
- **Dimension:** Content & Pedagogical Coherence
- **Location:** `001_L - Ergonomics & healthy computer use/README.md` vs `Teacher_Plan.docx`
- **Problem:** README timeline ends at 34 min (31-34 for closing). Teacher_Plan sums to ~37 min. The two don't match.
- **Suggested action:** Synchronize README timeline with Teacher_Plan. Edit README.md manually.
- **Status:** ☐ Open

### [m-06] Lesson 001 — Teacher_Plan lesson count label
- **Dimension:** Content & Pedagogical Coherence
- **Location:** `001_L - Ergonomics & healthy computer use/Teacher_Plan.docx` (header)
- **Problem:** Says "L — Mokymosi pamoka (1 iš 4 apie saugą)". The "1 iš 4" refers to 4 L-type lessons, but could confuse teacher about total module scope (7 lessons total).
- **Suggested action:** Change to "1 iš 7 modulyje" or remove count. Edit Teacher_Plan.docx or re-run lesson-plan-gen.
- **Status:** ☐ Open

### [m-07] Lesson 001 — Informal register in Theory_Pack
- **Dimension:** Lithuanian Language
- **Location:** `001_L - Ergonomics & healthy computer use/001_L_Ergonomika_Theory_Pack.pdf` (page 4)
- **Problem:** Section headers "Sužinok daugiau" and "Pasitikrink save" plus intro line "Jei nori giliau suprasti šią temą:" use informal "tu" register. Student materials must use formal "jūs".
- **Suggested action:** Change to "Sužinokite daugiau", "Pasitikrinkite save", "Jei norite giliau suprasti šią temą:". Re-run theory-pack-gen.
- **Status:** ☐ Open

### [m-08] Lesson 001 — Stray character in Student_Task
- **Dimension:** Lithuanian Language
- **Location:** `001_L - Ergonomics & healthy computer use/Student_Task.pdf` (page 2, step 3)
- **Problem:** Text reads "Pakartokite 5 kartus.4" with a stray "4" appended. Likely a generation artifact.
- **Suggested action:** Re-run student-task-gen to fix.
- **Status:** ☐ Open

### [m-09] Lesson 007 — Em dashes in README
- **Dimension:** Lithuanian Language
- **Location:** `007_A - Safety structured assessment/README.md` (6 instances)
- **Problem:** Em dashes in title, type field, Bloom level label. Banned per project rules.
- **Suggested action:** Edit README.md to replace em dashes with colons or restructure.
- **Status:** ☐ Open

## Cross-Lesson Findings
> Issues that span multiple lessons (Bloom progression, prerequisite gaps, etc.)

### [X-01] Practice (006_P) is easier than Assessment (007_A)
- **Dimension:** Content & Pedagogical Coherence
- **Lessons involved:** 006, 007
- **Problem:** 006_P Practice lesson operates at Bloom Level 2 (Understand) per its README. 007_A Assessment operates at Bloom Level 3 (Apply). The practice should be cognitively harder than the assessment to properly prepare students. Currently practice is easier, meaning students who pass practice may still struggle on the assessment.
- **Suggested action:** Redesign 006_P Practice_Task to include scenario analysis and application exercises at Bloom Level 3-4 (Apply/Analyze). Re-run practice-task-gen with higher cognitive demand specified.
- **Status:** ☐ Open
