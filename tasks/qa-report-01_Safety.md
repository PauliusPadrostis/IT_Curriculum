# QA Report: Sauga (Safety)
Generated: 2026-03-30 | Module: Grade_9/Semester_1/01_Safety | Lessons audited: 4 of 7

## Summary
- Issues found: 24
- Critical: 1 | Major: 7 | Minor: 16
- By dimension: Structure (5) | Content (10) | Language (9)
- Lessons skipped (incomplete): 005_I, 006_P, 007_A

---

## Critical Issues
> Content is incorrect, misleading, or has major gaps. Fix before using in classroom.

### [C-01] Lesson 003 — Online risks: Student_Task omits "klaidinga informacija" as valid answer option
- **Dimension:** Content & Pedagogical Coherence
- **Location:** `003_L - Online risks & safe response logic/Student_Task.pdf` (page 1, Reikalavimai section)
- **Problem:** The requirements tell students threat types are "phishing, socialinė inžinerija arba dezinformacija." The Theory_Pack teaches "klaidinga informacija" (misinformation) as a distinct concept from "dezinformacija" (disinformation). Situation 3 in the task is a misinformation scenario. A student who correctly identifies it as "klaidinga informacija" will think they chose wrong because that option isn't listed. The Visual_Aid key concepts slide also omits "klaidinga informacija."
- **Suggested action:** Re-run student-task-gen for lesson 003. Add "klaidinga informacija" to the valid answer options. Also update Visual_Aid slide 5 to include it via visual-aid-gen.
- **Status:** ☐ Open

---

## Major Issues
> Weakens quality — misalignment, bad sequencing, scope issues. Should fix before teacher review.

### [M-01] Lesson 005 — Scenario rotation: Missing Visual_Aid.pdf
- **Dimension:** Structure & Metadata
- **Location:** `005_I - Scenario rotation task/`
- **Problem:** I-type lessons require Visual_Aid.pdf per canonical file requirements (decision 2026-03-28). File does not exist on disk. README file table doesn't list it either, and claims "✅ Failai sukurti" status, which is inaccurate.
- **Suggested action:** Generate Visual_Aid.pdf using visual-aid-gen for lesson 005. Update lesson README file table to include it. Update Būsena to 🚧 WIP until generated.
- **Status:** ☐ Open

### [M-02] Lesson 006 — Practice exam: Missing Answer_Key.pdf
- **Dimension:** Structure & Metadata
- **Location:** `006_P - Safety checklist rehearsal + common mistake review/`
- **Problem:** P-type lessons require Answer_Key.pdf per canonical file requirements. File does not exist. README file table doesn't list it and claims "✅ Failai sukurti."
- **Suggested action:** Generate Answer_Key.pdf using answer-key-gen for lesson 006. Update lesson README. Update Būsena to 🚧 WIP until generated.
- **Status:** ☐ Open

### [M-03] Lesson 007 — Assessment: Missing Answer_Key.docx
- **Dimension:** Structure & Metadata
- **Location:** `007_A - Safety structured assessment/`
- **Problem:** A-type lessons require Answer_Key.docx per canonical file requirements. File does not exist. README already shows ❌ for this file and correctly claims 🚧 WIP status.
- **Suggested action:** Generate Answer_Key.docx using answer-key-gen for lesson 007.
- **Status:** ☐ Open

### [M-04] Module README — Rollup status inaccurate
- **Dimension:** Structure & Metadata
- **Location:** `01_Safety/README.md` (line 10)
- **Problem:** Module README claims "6/7 ✅ Failai sukurti, 1/7 🚧 WIP." Per canonical file requirements, lessons 005 and 006 are also incomplete (missing Visual_Aid.pdf and Answer_Key.pdf respectively). Accurate rollup: 4/7 ✅ Failai sukurti, 3/7 🚧 WIP.
- **Suggested action:** Update module README rollup line to "4/7 ✅ Failai sukurti, 3/7 🚧 WIP" after updating individual lesson READMEs.
- **Status:** ☐ Open

### [M-05] Lesson 002 — Privacy: Teacher_Plan scenarios differ from Student_Task scenarios
- **Dimension:** Content & Pedagogical Coherence
- **Location:** `002_L - Privacy & account safety/Teacher_Plan.docx` (Savarankiška užduotis section) vs `Student_Task.pdf`
- **Problem:** Teacher_Plan lists 5 oral scenarios (Netflix password sharing, birth date for game, stranger asks which school, store asks for address, classmate asks for password). Student_Task.pdf lists 5 different scenarios (same password everywhere, stranger asks phone for gift code, turning on 2FA, friend asks for password, game forum asks for address). A teacher following the plan while students hold the task sheet will work on completely different examples.
- **Suggested action:** Align Teacher_Plan scenarios to match the Student_Task. Re-run lesson-plan-gen for lesson 002, using the Student_Task scenarios as the canonical set.
- **Status:** ☐ Open

### [M-06] Lesson 003 — Online risks: Self-check reveals answer to situation 3
- **Dimension:** Content & Pedagogical Coherence
- **Location:** `003_L - Online risks & safe response logic/Student_Task.pdf` (page 3, self-check list)
- **Problem:** Checklist item says "Ar 3 situacijos atsakymas skiriasi nuo 1 ir 4? (Tai kitas grėsmės tipas.)" This reveals that situation 3 has a different threat type from 1 and 4. Since 1 and 4 are obviously phishing, this tells students situation 3 is NOT phishing, undermining independent reasoning.
- **Suggested action:** Re-run student-task-gen for lesson 003. Replace the hint with a generic checklist item: "Ar kiekvienai situacijai nurodžiau skirtingą grėsmės tipą ten, kur jis skiriasi?"
- **Status:** ☐ Open

### [M-07] Lesson 004 — Environmental impact: README timing doesn't match Teacher_Plan
- **Dimension:** Content & Pedagogical Coherence
- **Location:** `004_L - Environmental impact of digital technologies/README.md` (Pamokos eiga table)
- **Problem:** README allocates 22 min to negative impact, 5 min to positive impact. Teacher_Plan allocates 18 min and 8 min respectively (60% difference on positive impact). A teacher consulting the README will prepare differently than one reading the Teacher_Plan.
- **Suggested action:** Update README lesson flow table to match Teacher_Plan: 4 min warm-up, 18 min negative impact, 8 min positive impact, 4 min reflection, 3 min closing. Run lesson-readme-gen or edit manually.
- **Status:** ☐ Open

---

## Minor Issues
> Cosmetic, terminological, or style issues. Fix when convenient.

### [m-01] Lessons 001-004 — Em dashes throughout Teacher_Plan files
- **Dimension:** Lithuanian Language
- **Location:** `001_L/Teacher_Plan.docx` (~20 instances), `002_L/Teacher_Plan.docx` (~10), `003_L/Teacher_Plan.docx` (~12)
- **Problem:** Em dash (—) is banned per project rules. Used pervasively in section headers, timing labels, definitions, and inline text across all audited Teacher_Plans.
- **Suggested action:** When regenerating any Teacher_Plan (e.g., for M-05), ensure lesson-plan-gen replaces all em dashes with colons, commas, or restructured sentences.
- **Status:** ☐ Open

### [m-02] Lesson 003 — Em dashes in Theory_Pack
- **Dimension:** Lithuanian Language
- **Location:** `003_L/003_L_Internetines_rizikos_Theory_Pack.pdf` (pages 1-4, 6 instances)
- **Problem:** Em dashes in definitions: "Phishing — tai bandymas", "inžinerija — tai manipuliacija", etc.
- **Suggested action:** When regenerating Theory_Pack, replace with colons or restructured sentences.
- **Status:** ☐ Open

### [m-03] Lessons 001-004 — Em dashes in README files
- **Dimension:** Lithuanian Language
- **Location:** All lesson README.md files (type field "L — Mokymosi pamoka", Bloom headings, etc.)
- **Problem:** Em dashes used in metadata fields and headings across all lesson READMEs.
- **Suggested action:** Edit READMEs to replace em dashes. In type field: "L: Mokymosi pamoka". In Bloom heading: "Lygis 2: Suprasti".
- **Status:** ☐ Open

### [m-04] Lessons 001-004 — Theory_Pack naming deviates from canonical
- **Dimension:** Structure & Metadata
- **Location:** All L-type lesson folders
- **Problem:** Theory_Pack files use custom names (e.g., `001_L_Ergonomika_Theory_Pack.pdf`) instead of the canonical `Theory_Pack.pdf` from file_requirements.md. Lesson READMEs reference the custom names, so there's no broken-link issue, but it's inconsistent with the standard.
- **Suggested action:** Low priority. If regenerating Theory_Packs for other reasons, use the canonical name `Theory_Pack.pdf`. Update README file tables to match.
- **Status:** ☐ Open

### [m-05] Lessons 001, 002 — Orphaned Word temp files
- **Dimension:** Structure & Metadata
- **Location:** `001_L/~$acher_Plan.docx`, `002_L/~$acher_Plan.docx`
- **Problem:** Word lock/temp files left on disk. These are artifacts of Teacher_Plan.docx being open in Word. They should not be committed to the repo.
- **Suggested action:** Delete both `~$acher_Plan.docx` files. Add `~$*` to .gitignore if not already present.
- **Status:** ☐ Open

### [m-06] Lesson 007 — Orphaned Rubric.docx
- **Dimension:** Structure & Metadata
- **Location:** `007_A - Safety structured assessment/Rubric.docx`
- **Problem:** Rubric.docx exists but is not in the canonical file list for A-type lessons (Rubric.pdf is). This is likely the source file used to generate Rubric.pdf.
- **Suggested action:** If Rubric.docx is the editable source, consider keeping it but noting it as a source file. If not needed, delete it.
- **Status:** ☐ Open

### [m-07] Lesson 001 — Teacher_Plan references image not provided
- **Dimension:** Content & Pedagogical Coherence
- **Location:** `001_L/Teacher_Plan.docx` (Dėstymas section)
- **Problem:** Plan says "parodykite ekrane žmogų, sėdintį netaisyklingai prie kompiuterio" (show image of incorrect posture) but no such image is in the Visual_Aid or any other material.
- **Suggested action:** Either add an incorrect-posture example to Visual_Aid, or change the Teacher_Plan instruction to describe the scenario verbally.
- **Status:** ☐ Open

### [m-08] Lesson 001 — Informal "tu" in Teacher_Plan scripted question
- **Dimension:** Lithuanian Language
- **Location:** `001_L/Teacher_Plan.docx` (opening question 1)
- **Problem:** "Ar tau kartais skauda nugarą..." uses informal singular. Student-facing text should use formal "jūs". This is a scripted question the teacher reads aloud.
- **Suggested action:** Change to "Ar jums kartais skauda nugarą..." when regenerating. Accept as-is if the teacher deliberately uses informal register in spoken interaction.
- **Status:** ☐ Open

### [m-09] Lesson 002 — Visual_Aid key concepts split across two slides
- **Dimension:** Content & Pedagogical Coherence
- **Location:** `002_L/Visual_Aid.pdf` (slides 5-6)
- **Problem:** 5 concept definitions split across 2 slides, with just "Slaptažodžių valdyklė" alone on slide 6. Awkward projection flow.
- **Suggested action:** Consolidate to 4 terms on one slide (per lessons.md hard cap of 4 terms per slide). Cut or combine one term.
- **Status:** ☐ Open

### [m-10] Lesson 003 — Grammatical error "prisistatoma"
- **Dimension:** Lithuanian Language
- **Location:** `003_L/003_L_Internetines_rizikos_Theory_Pack.pdf` (page 3, socialinė inžinerija section)
- **Problem:** "sukčius prisistatoma IT darbuotoju" uses impersonal passive. Should be "sukčius prisistato IT darbuotoju" (masculine singular active).
- **Suggested action:** Fix to "sukčius prisistato IT darbuotoju" when regenerating Theory Pack.
- **Status:** ☐ Open

### [m-11] Lesson 003 — Oral/written modality mismatch
- **Dimension:** Content & Pedagogical Coherence
- **Location:** `003_L/Teacher_Plan.docx` (savarankiška užduotis) vs `Student_Task.pdf`
- **Problem:** Teacher_Plan says students answer "žodžiu" (orally). Student_Task says "Atsakinėsite žodžiu arba rašysite šiame lape." Teacher_Plan doesn't mention the written option.
- **Suggested action:** Update Teacher_Plan to mention both modalities.
- **Status:** ☐ Open

### [m-12] Lesson 004 — Calque "Kas yra skirtumas tarp X ir Y"
- **Dimension:** Lithuanian Language
- **Location:** `004_L/Teacher_Plan.docx` (warm-up question 2)
- **Problem:** "Kas yra skirtumas tarp klaidingos informacijos ir dezinformacijos?" is an English calque of "What is the difference between X and Y?" The Visual_Aid correctly uses "Kuo skiriasi X nuo Y?"
- **Suggested action:** Replace with "Kuo skiriasi klaidinga informacija nuo dezinformacijos?" to match Visual_Aid.
- **Status:** ☐ Open

### [m-13] Lesson 004 — Student_Task has no allocated lesson time
- **Dimension:** Content & Pedagogical Coherence
- **Location:** `004_L/Teacher_Plan.docx` and `Student_Task.pdf`
- **Problem:** The lesson is ~80/20 teacher-led lecture with no independent writing phase. The Student_Task (fill a 4-row table) has no time allocated. README says no homework. Unclear when students complete it.
- **Suggested action:** Add a note in Teacher_Plan: Student_Task is an optional reinforcement sheet. Or carve out 5-8 min of lesson time for at least one row.
- **Status:** ☐ Open

### [m-14] Lesson 004 — Statistics inconsistency between Teacher_Plan and Theory_Pack
- **Dimension:** Content & Pedagogical Coherence
- **Location:** `004_L/Teacher_Plan.docx` vs `Theory_Pack`
- **Problem:** Teacher_Plan: "~60 mln. tonų, ~20 %." Theory_Pack: "62 mln. tonų, ~22 %." Close but not identical.
- **Suggested action:** Align Teacher_Plan to Theory_Pack's figures (62 mln. t, 22 %), or mark Teacher_Plan values as rounded.
- **Status:** ☐ Open

### [m-15] Lesson 004 — Space before colon in Visual_Aid
- **Dimension:** Lithuanian Language
- **Location:** `004_L/Visual_Aid.pdf` (slide 5, all 4 concept definitions)
- **Problem:** "Duomenų centras : pastatas..." has a space before colon. Lithuanian punctuation requires no space before colon.
- **Suggested action:** Remove space before colon in all 4 definitions when regenerating.
- **Status:** ☐ Open

### [m-16] Lesson 004 — Formulaic definitional pattern in Theory_Pack
- **Dimension:** Lithuanian Language
- **Location:** `004_L/004_L_ST_poveikis_aplinkai_Theory_Pack.pdf` (pages 2-3)
- **Problem:** Repeated "[Term], tai [definition]" pattern for multiple definitions. This is a detectable AI text pattern.
- **Suggested action:** Vary phrasing when regenerating: "E-atliekomis vadinami...", "Kas yra skaitmeninis pėdsakas? Tai...", etc.
- **Status:** ☐ Open

---

## Cross-Lesson Findings
> Issues that span multiple lessons (Bloom progression, prerequisite gaps, etc.)

### [X-01] Bloom regression from lesson 003 to 004
- **Dimension:** Content & Pedagogical Coherence
- **Lessons involved:** 003, 004
- **Problem:** Lesson 003 reaches Bloom level 3 (Apply: students apply the safe response algorithm to new scenarios). Lesson 004 drops back to level 2 (Understand: students explain cause-effect relationships). While the topic change (online risks → environmental impact) can justify a reset, the downward progression within the same module is worth noting. The integration lesson (005) and assessment (007) both operate at Apply level, so the module's arc is: Understand → Understand → Apply → Understand → Apply → Understand → Apply. The mid-module dip in 004 breaks the upward trend.
- **Suggested action:** Consider whether lesson 004 could include an Apply-level component (e.g., students evaluate their own digital footprint or propose a reduction plan rather than just explaining concepts). This is a design decision, not a defect.
- **Status:** ☐ Open

### [X-02] Lesson 004 prerequisite not taught in prior lessons
- **Dimension:** Content & Pedagogical Coherence
- **Lessons involved:** 001, 002, 003, 004
- **Problem:** Lesson 004 README lists as prerequisite: "Supranta, kad internetas naudoja fizinę infrastruktūrą (serverius, laidus), o ne tik 'debesis'." This concept is not explicitly taught in lessons 001-003. It's labeled as "bendra patirtis" (general experience), which may be a stretch for Grade 9 students who are assumed to have never touched a computer.
- **Suggested action:** Either add a brief mention of internet infrastructure to lesson 003 (e.g., in the phishing section: "phishing emails travel through physical servers"), or add a 2-minute primer to lesson 004's warm-up. Alternatively, accept as-is if the teacher handles it verbally.
- **Status:** ☐ Open

### [X-03] Practice-vs-assessment comparison not possible
- **Dimension:** Content & Pedagogical Coherence
- **Lessons involved:** 006, 007
- **Problem:** Both the practice lesson (006_P) and assessment lesson (007_A) are incomplete per canonical file requirements. Content audit was skipped for both. Cannot verify whether practice is harder than assessment, whether assessment only tests taught material, or whether there is proper scaffolding between the two.
- **Suggested action:** Complete missing files for lessons 006 and 007, then re-run module QA or manually verify practice-harder-than-assessment principle.
- **Status:** ☐ Open
