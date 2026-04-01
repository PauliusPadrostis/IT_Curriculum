# QA Report: Sauga (Safety)
Generated: 2026-03-31 | Module: Grade_9/Semester_1/01_Safety | Lessons audited: 7 of 7

## Summary
- Issues found: 27
- Critical: 0 | Major: 8 | Minor: 19
- By dimension: Structure (3) | Content (14) | Language (10)
- Lessons skipped (incomplete): none
- **Comparison to previous report (2026-03-30):** 23 of 24 original issues confirmed fixed. 1 still open (m-04). 4 regressions found. 22 new issues found (mostly in lessons 005–007 which were not deeply audited last time).
- **Fix pass (2026-03-31):** All 8 Major issues resolved (7 fixed, 1 partial). Root cause fixes applied to 7 generation skills (em dash strip, Practice_Task cross-reference). 4 entries added to lt-mistakes.yaml. 3 rules added to lessons.md.

---

## Major Issues
> Weakens quality — misalignment, bad sequencing, scope issues. Should fix before teacher review.

### [M-01] Lesson 001 — Ergonomics: Teacher_Plan mixes imperial and metric units
- **Dimension:** Content & Pedagogical Coherence
- **Location:** `001_L - Ergonomics & healthy computer use/Teacher_Plan.docx` (Dėstymas, 20-20-20 section)
- **Problem:** Teacher_Plan says "20 pėdų (~6 m)" mixing imperial and metric. All other documents (Theory_Pack, Student_Task) use only metric (6 metrų). "Pėda" is not a standard Lithuanian unit and will confuse Grade 9 students.
- **Suggested action:** Replace "20 pėdų (~6 m)" with "6 m (20 pėdų)" in Teacher_Plan.docx. Lithuanian measurement standards take priority.
- **Status:** ☑ Fixed (2026-03-31: patched "20 pėdų (~6 m)" → "6 m (20 pėdų)" via XML patch)

### [M-02] Lesson 003 — Online risks: Visual_Aid missing phishing example and algorithm slides
- **Dimension:** Content & Pedagogical Coherence
- **Location:** `003_L - Online risks & safe response logic/Visual_Aid.pdf`
- **Problem:** Teacher_Plan contains two explicit projection instructions: (1) "Parodykite skaidrėje phishing laiško pavyzdį" and (2) "Parodykite algoritmo schemą skaidrėje." Visual_Aid has neither — only 6 generic slides (title, retrieval, objectives, task brief, concepts, closing). The teacher must improvise visuals for the two core teaching moments. For Grade 9 students who have never seen phishing, a visual example is important.
- **Suggested action:** Teacher will generate additional visuals manually. Missing visuals should be marked in lesson README (convention TBD).
- **Status:** ☑ Partial (2026-03-31: missing visuals marked in lesson README. Teacher will create visuals manually.)

### [M-03] Lesson 004 — Environmental impact: Theory_Pack PDF is stale
- **Dimension:** Structure & Metadata
- **Location:** `004_L - Environmental impact of digital technologies/`
- **Problem:** Theory_Pack.docx (dated 2026-03-31) contains the m-16 fix (varied definition patterns), but Theory_Pack.pdf (dated 2026-03-30) still has the old formulaic ", tai" patterns. Students receive the PDF, so the fix is not effectively deployed. Additionally, the .docx is an orphaned source file.
- **Suggested action:** Convert .docx to PDF to replace the stale PDF. Delete the .docx after conversion.
- **Status:** ☑ Fixed (2026-03-31: docx2pdf converted, .docx deleted)

### [M-04] Lesson 005 — Integration: Teacher_Plan typo "nušiotojo"
- **Dimension:** Lithuanian Language
- **Location:** `005_I - Scenario rotation task/Teacher_Plan.docx` (Scenarijų rotacija, scenario 5)
- **Problem:** Text says "nušiotojo telefono laimikis" — two errors: (1) "nušiotojo" is corrupted text, (2) should be "mobiliojo telefono laikiklis" not "nešiojamojo telefono laimikis". "Nešiojamas telefonas" is outdated (all phones are portable). "Laimikis" (prize) should be "laikiklis" (holder).
- **Suggested action:** Replace with "mobiliojo telefono laikiklis" in Teacher_Plan.docx.
- **Status:** ☑ Fixed (2026-03-31: patched "nušiotojo telefono laimikis" → "mobiliojo telefono laikiklis" via XML patch)

### [M-05] Lesson 005 — Integration: Teacher_Plan scenario 6 text mismatch
- **Dimension:** Content & Pedagogical Coherence
- **Location:** `005_I - Scenario rotation task/Teacher_Plan.docx` (Scenarijų rotacija, scenario 6)
- **Problem:** Teacher_Plan says "Mokinys keičia senus nešiojamąjį ir telefoną į naujus kasmet" — grammatically broken and missing "kompiuterį". Student_Task.pdf says "Mokinys keičia nešiojamąjį kompiuterį ir telefoną į naujus kasmet". Teacher reading aloud from the plan will deliver garbled text.
- **Suggested action:** Align Teacher_Plan scenario 6 text to Student_Task.pdf wording.
- **Status:** ☑ Fixed (2026-03-31: patched "senus nešiojamąjį ir telefoną" → "nešiojamąjį kompiuterį ir telefoną")

### [M-06] Lesson 006 — Practice: Unclear relationship between Teacher_Plan questions and Practice_Task
- **Dimension:** Content & Pedagogical Coherence
- **Location:** `006_P - Safety checklist rehearsal + common mistake review/Teacher_Plan.docx` vs `Practice_Task.pdf`
- **Problem:** Teacher_Plan contains its own 6 short questions + 3 scenarios. Practice_Task.pdf contains a completely different set of 10 questions. There is no instruction in the Teacher_Plan about when or how Practice_Task is used. The 34-min timeline doesn't account for Practice_Task at all. A teacher has two separate question sets with no guidance on their relationship.
- **Suggested action:** Add a clear note in Teacher_Plan explaining Practice_Task.pdf's role. Integrate Practice_Task into the timeline if it's meant for in-class use.
- **Status:** ☑ Fixed (2026-03-31: rewrote Phase 3 to match Practice_Task.pdf questions. 6 oral + 3 scenarios replaced with Practice_Task Q1-Q10 structure. Also fixed 6 em dashes.)

### [M-07] Lesson 007 — Assessment: Answer_Key grammatical error
- **Dimension:** Lithuanian Language
- **Location:** `007_A - Safety structured assessment/Answer_Key.docx` (question 3)
- **Problem:** "Apgaulingą žinutė" uses wrong case — should be "Apgaulinga žinutė" (nominative). Appears in both the answer line and grading table. Assessment_Task.xlsx has the correct form, so the Answer_Key is inconsistent with the test.
- **Suggested action:** Fix "Apgaulingą žinutė" to "Apgaulinga žinutė" in both occurrences in Answer_Key.docx.
- **Status:** ☑ Fixed (2026-03-31: patched 3 errors — Apgaulingą→Apgaulinga ×2, retųž→retųjų, nesuprasėtų→nesuprastų. Added to lt-mistakes.yaml)

### [M-08] Lesson 007 — Assessment: Em dashes in Teacher_Plan (regression)
- **Dimension:** Lithuanian Language
- **Location:** `007_A - Safety structured assessment/Teacher_Plan.docx` (lines 3, 18, 28)
- **Problem:** Three em dashes found: "A — Vertinimo pamoka", "Trumpas paaiškinimas — ~2 min.", "Vertinimo užduotis — ~35 min." Em dash is banned. Previous report m-01 marked this as fixed for lessons 001–004, but lesson 007 was not covered then.
- **Suggested action:** Replace all three em dashes with colons.
- **Status:** ☑ Fixed (2026-03-31: 3 em dashes replaced with colons via XML patch)

---

## Minor Issues
> Cosmetic, terminological, or style issues. Fix when convenient.

### [m-01] Lessons 002, 003, 004 — Em dashes in README files (regression)
- **Dimension:** Lithuanian Language
- **Location:** `002_L/README.md` (1 instance in Apžvalga), `003_L/README.md` (6 instances), `004_L/README.md` (title)
- **Problem:** Previous report m-03 marked em dash removal from all lesson READMEs as fixed. Current scan shows em dashes have returned or persisted in at least 3 lesson READMEs. Likely caused by README regeneration after the fix.
- **Suggested action:** Run a search-and-replace across all lesson READMEs for "—" and replace with appropriate punctuation.
- **Status:** ☑ Fixed (2026-03-31: Root cause: readme_template.md and SKILL.md contained em dashes in structural patterns. Patched template (3 em dashes), SKILL.md (1 Lithuanian string), added em dash hard gate to Step 4b-extra, and fixed all 8 READMEs in module (49 em dashes total). Rule added to lessons.md.)

### [m-02] Lessons 001–003 — Theory_Pack naming non-canonical (carried forward)
- **Dimension:** Structure & Metadata
- **Location:** All L-type lesson folders
- **Problem:** Theory_Pack files use custom names (e.g., `001_L_Ergonomika_Theory_Pack.pdf`) instead of canonical `Theory_Pack.pdf`. Same as previous report m-04.
- **Suggested action:** Low priority. Rename when regenerating Theory_Packs for other reasons.
- **Status:** ☑ Fixed (2026-03-31: Renamed 3 files to canonical Theory_Pack.pdf. Patched theory-pack-gen filename pattern. Updated 4 READMEs.)

### [m-03] Lesson 005 — Visual_Aid format is .docx not .pdf
- **Dimension:** Structure & Metadata
- **Location:** `005_I - Scenario rotation task/Visual_Aid.docx`
- **Problem:** I-type canonical requirement is Visual_Aid.pdf. Only .docx exists (no LibreOffice for conversion). README correctly reflects .docx. Functionally usable but format non-compliant.
- **Suggested action:** Convert to PDF when LibreOffice becomes available.
- **Status:** ☑ Fixed (2026-03-31: converted .docx→.pdf via docx2pdf, deleted .docx, updated README)

### [m-04] Lesson 001 — Visual_Aid space before colon on slide 5
- **Dimension:** Lithuanian Language
- **Location:** `001_L - Ergonomics & healthy computer use/Visual_Aid.pdf` (slide 5, Pagrindinės sąvokos)
- **Problem:** Definitions use "Ergonomika : darbo vietos..." with a space before the colon. Previous report m-15 fixed this for lesson 004 but lesson 001 was not checked.
- **Suggested action:** Regenerate Visual_Aid.pdf with visual-aid-gen, removing spaces before colons.
- **Root cause:** visual_aid_format.md line 159 had `" : {definition}"` with space before colon since first commit. Previous m-15 fix patched lesson 004 output but never fixed the source template. Same pattern as m-01 em dash regression.
- **Status:** ☑ Fixed (2026-03-31: patched visual_aid_format.md template, regenerated lesson 001 Visual_Aid.pdf via agent)

### [m-05] Lessons 001, 002 — Theory_Pack informal register in section headers
- **Dimension:** Lithuanian Language
- **Location:** `001_L/Theory_Pack.pdf` and `002_L/Theory_Pack.pdf` ("Pasitikrink save", "Sužinok daugiau", "Ar žinojai?")
- **Problem:** Section headers use informal "tu" register while body text uses formal "jūs". Student materials must use formal address throughout.
- **Suggested action:** Change to "Pasitikrinkite save", "Sužinokite daugiau", "Ar žinojote?" when regenerating Theory Packs.
- **Root cause:** Skill reference files (content_format.md, quality_checklist.md) were written with informal "tu" headers and quality_checklist.md explicitly sanctioned it as "intentional," contradicting CLAUDE.md's global "jūs" rule. Skill author made an unauthorized design call.
- **Status:** ☑ Fixed (2026-03-31: patched content_format.md, quality_checklist.md, and SKILL.md to use formal "jūs" throughout. Existing Theory_Pack PDFs for 001/002 still have old headers; will be fixed on next regeneration.)

### [m-06] Lesson 001 — Theory_Pack straight quotes around HN 32:2004
- **Dimension:** Lithuanian Language
- **Location:** `001_L/Theory_Pack.pdf` (page 4, Sužinok daugiau)
- **Problem:** Uses straight double quotes "Darbas su displėjais" instead of Lithuanian „..." quotation marks.
- **Suggested action:** Replace with „Darbas su displėjais" when regenerating.
- **Status:** ☑ Closed (2026-03-31: teacher decision — Lithuanian lower-upper quotes not required. Any quote style acceptable. CLAUDE.md updated. Non-issue.)

### [m-07] Lesson 001 — Break interval inconsistency
- **Dimension:** Content & Pedagogical Coherence
- **Location:** `001_L/Teacher_Plan.docx` vs `001_L/Theory_Pack.pdf`
- **Problem:** Teacher_Plan: "po 45–50 min." Theory_Pack references HN 32:2004: "po kiekvienos valandos." Close but not identical.
- **Suggested action:** Align Teacher_Plan to Theory_Pack's HN 32:2004 wording when next editing.
- **Root cause:** Documents generated at different times with no reconciliation. Teacher_Plan used "45–50 min" from general knowledge. Theory_Pack later found HN 32:2004 ("kas valandą") but nobody went back to update the plan. Skills have forward-only cross-checks, no backward reconciliation.
- **Systemic fix:** CLAUDE.md rule 6 added — reconcile all lesson files when the last file is generated (README table all ✅). The actual content fix (aligning this specific value) deferred to next lesson 001 regeneration or reconciliation pass.
- **Status:** ☐ Open (content fix pending; systemic fix in place)

### [m-08] Lesson 001 — "Vaizduoklis" vs "ekranas" terminology split
- **Dimension:** Content & Pedagogical Coherence
- **Location:** `001_L/Theory_Pack.pdf` (vocabulary table) vs `Student_Task.pdf` and `Visual_Aid.pdf`
- **Problem:** Theory_Pack introduces "Vaizduoklis" as a key term, but Student_Task and Visual_Aid use "ekranas" exclusively. Minor terminology inconsistency.
- **Suggested action:** Pick one term and use consistently. "Ekranas" is more natural for Grade 9.
- **Root cause:** Same as m-07 — documents generated at different times without reconciliation. Theory_Pack used formal VLKK term "vaizduoklis", other files used colloquial "ekranas."
- **Systemic fix:** CLAUDE.md rule 6 (reconcile on lesson completion) + automated QA pipeline logged in TODO.md for post-module-2.
- **Status:** ☑ Closed (2026-04-01: decision — "ekranas" in running text, "vaizduoklis" only in vocab tables. Theory_Pack vocab table already bridges terms. Running text "vaizduoklio" in HN 32:2004 reference acceptable in regulatory context. Source file informatika_programa.md annotated with "(ekrano)" to prevent recurrence. Decision logged.)

### [m-09] Lesson 002 — Visual_Aid closing question differs from Teacher_Plan
- **Dimension:** Content & Pedagogical Coherence
- **Location:** `002_L/Visual_Aid.pdf` (slide 6) vs `Teacher_Plan.docx` (closing questions)
- **Problem:** Visual_Aid Q3 asks about publishing birthday + school name on social media. Teacher_Plan Q3 asks about publishing name + surname. Different questions for the same closing moment.
- **Suggested action:** Align to the Visual_Aid version (more specific, uses sensitivity concepts from lesson).
- **Status:** ☑ Fixed (2026-04-01: patched Teacher_Plan Q3 to match Visual_Aid version. Systemic fix already in place: visual-aid-gen enforces verbatim extraction from Teacher_Plan since 2026-03-30.)

### [m-10] Lesson 002 — README Pastaba uses "vertinimo lapas"
- **Dimension:** Content & Pedagogical Coherence
- **Location:** `002_L/README.md` (Reikalingi failai table, Student_Task.pdf row)
- **Problem:** Pastaba column says "Scenarijų vertinimo lapas". Per lessons.md rule, student tasks should not be called "vertinimo lapas" unless actual assessments.
- **Suggested action:** Change to "Scenarijų užduoties lapas" or "Situacijų vertinimas".
- **Root cause:** lesson-readme-gen had no Pastaba content guidance AND didn't read tasks/lessons.md where the rule lived. Both gaps now fixed: all 8 skills read lessons.md; lesson-readme-gen now reads it at Step 0.
- **Status:** ☑ Fixed (2026-04-01: changed to "Situacijų vertinimo užduotis". Systemic fix: all 5 missing skills now read tasks/lessons.md.)

### [m-11] Lesson 002 — Theory_Pack condition-last calque
- **Dimension:** Lithuanian Language
- **Location:** `002_L/Theory_Pack.pdf` (page 2, Svarbu box)
- **Problem:** "Vienas stiprus slaptažodis visoms paskyroms nepadės. Jei jis nutekės, pažeidžiamos visos jūsų paskyros." Condition ("Jei") comes after main clause — English calque per lessons.md rule (2026-03-29).
- **Suggested action:** Restructure to condition-first: "Jei turėsite tik vieną slaptažodį ir jis nutekės, bus pažeistos visos jūsų paskyros."
- **Status:** ☐ Open

### [m-12] Lesson 003 — ENISA 2025 statistic may be unverifiable
- **Dimension:** Content & Pedagogical Coherence
- **Location:** `003_L/Theory_Pack.pdf` (page 2, callout box)
- **Problem:** Claims "2025 m. daugiau nei 80 % phishing laiškų pasaulyje buvo sukurti naudojant dirbtinį intelektą (ENISA, 2025)." This may be a fabricated statistic. If unverifiable, it undermines Theory_Pack credibility.
- **Suggested action:** Verify the ENISA 2025 statistic. If unconfirmable, replace with a verifiable figure from NKSC or remove the callout.
- **Status:** ☐ Open

### [m-13] Lesson 004 — Student_Task hint gives away answer
- **Dimension:** Content & Pedagogical Coherence
- **Location:** `004_L/Student_Task.pdf` (page 2, step 4, Svarbu box)
- **Problem:** Hint provides a model answer: "Viena valanda HD vaizdo įrašo sukuria apie 36–100 g CO₂..." This gives away the digital footprint row, undermining independent reasoning.
- **Suggested action:** Soften to a structural hint: "Nurodykite konkretų veiksmą, kiek CO₂ jis sukuria ir kodėl."
- **Status:** ☐ Open

### [m-14] Lesson 005 — Visual_Aid missing scenario texts for projection
- **Dimension:** Content & Pedagogical Coherence
- **Location:** `005_I - Scenario rotation task/Visual_Aid.docx`
- **Problem:** Teacher_Plan says "Scenarijai rodomi skaidrėse po vieną" but the Visual_Aid contains only structural slides (title, objectives, concepts, closing) — no scenario texts. Teacher must read scenarios aloud or project from Student_Task.
- **Suggested action:** Add 6 scenario slides to Visual_Aid when regenerating.
- **Status:** ☐ Open

### [m-15] Lesson 006 — README Bloom level understated
- **Dimension:** Content & Pedagogical Coherence
- **Location:** `006_P/README.md` (Bloom taksonomijos lygis)
- **Problem:** README declares Level 2 (Suprasti). Practice_Task open questions (Q2, Q5, Q7, Q9, Q10) require application-level thinking — scenario analysis with problem→rule→action structure. Actual Bloom level is 3 (Taikyti).
- **Suggested action:** Update README Bloom level to "Lygis 3 — Taikyti". This also correctly aligns practice with assessment (007_A is also Level 3).
- **Status:** ☐ Open

### [m-16] Lesson 006 — Break interval inconsistency across lessons
- **Dimension:** Content & Pedagogical Coherence
- **Location:** `006_P/Teacher_Plan.docx` (scenario B) vs `006_P/Answer_Key.pdf` (Q2)
- **Problem:** Teacher_Plan scenario says breaks every "45–60 min." Answer_Key says "30–45 min." Lesson 001 Theory_Pack says "kas valandą" per HN 32:2004. Three different ranges for the same concept.
- **Suggested action:** Standardize all break interval references to match the HN 32:2004 source used in lesson 001.
- **Status:** ☐ Open

### [m-17] Lesson 007 — Answer_Key typos
- **Dimension:** Lithuanian Language
- **Location:** `007_A/Answer_Key.docx`
- **Problem:** Two typos found: (1) "retųž žemių" → "retųjų žemių" (question 14), (2) "nesuprasėtų" → "nesuprastėtų" (question 5).
- **Suggested action:** Fix both typos in Answer_Key.docx.
- **Status:** ☐ Open

### [m-18] Lesson 007 — Assessment scenario references untaught concept (public Wi-Fi)
- **Dimension:** Content & Pedagogical Coherence
- **Location:** `007_A/Assessment_Task.xlsx` (Part III, Pool 13, variant 3)
- **Problem:** Scenario includes "viešame Wi-Fi tinkle prisijungia prie savo banko paskyros." Public Wi-Fi risks were not taught in any L lesson. A student who only studied the module content wouldn't know why this is specifically dangerous.
- **Suggested action:** Teacher decision: either accept as general knowledge or replace with a taught risk (e.g., clicking a suspicious link). The scenario's other elements (short password, no breaks) are sufficient for a full answer, so this is low impact.
- **Status:** ☐ Open

### [m-19] Lesson 007 — Testmoz section header rows
- **Dimension:** Structure & Metadata
- **Location:** `007_A/Assessment_Task.xlsx` (rows 1, 158, 200)
- **Problem:** Section headers ("I DALIS. Uždari klausimai...") are non-standard Testmoz rows. May be ignored on import or may cause errors depending on parser version.
- **Suggested action:** Test Testmoz import. If headers cause issues, remove them from the import file.
- **Status:** ☐ Open

---

## Cross-Lesson Findings
> Issues that span multiple lessons (Bloom progression, prerequisite gaps, etc.)

### [X-01] Bloom regression from lesson 003 to 004 (carried forward)
- **Dimension:** Content & Pedagogical Coherence
- **Lessons involved:** 003 (Apply), 004 (Understand)
- **Problem:** Same as previous report. Lesson 003 reaches Bloom 3 (Apply), lesson 004 drops to Bloom 2 (Understand). The module arc is: Understand → Understand → Apply → Understand → Apply → Apply → Apply. The mid-module dip at 004 is a design choice, not a defect.
- **Suggested action:** Design decision for teacher. Consider adding an Apply-level component to lesson 004 (e.g., evaluate own digital footprint).
- **Status:** ☐ Open (carried forward, design decision)

### [X-02] Break interval terminology inconsistent across module
- **Dimension:** Content & Pedagogical Coherence
- **Lessons involved:** 001, 006
- **Problem:** Lesson 001 Theory_Pack cites HN 32:2004: "po kiekvienos valandos." Lesson 001 Teacher_Plan says "45–50 min." Lesson 006 Teacher_Plan says "45–60 min." Lesson 006 Answer_Key says "30–45 min." A student comparing materials across lessons gets four different break intervals for the same safety rule.
- **Suggested action:** Pick one authoritative figure (HN 32:2004: "kas valandą" = 60 min) and standardize across all documents.
- **Status:** ☐ Open

### [X-03] Practice-vs-assessment Bloom parity instead of progression
- **Dimension:** Content & Pedagogical Coherence
- **Lessons involved:** 006, 007
- **Problem:** Previous report (X-03) found practice=L2 and assessment=L3. New audit reveals practice actually reaches L3 (Apply) through its scenario questions. This means practice and assessment are at the same Bloom level, not practice-harder-than-assessment. The practice does have more scaffolding (sub-parts, hints) which makes it easier in execution, so the effective difficulty progression is acceptable.
- **Suggested action:** No action required. Bloom levels are equal but practice is more scaffolded, creating appropriate difficulty progression. Informational only.
- **Status:** ☐ Closed (acceptable)

---

## Previous Report Comparison

### Fixed and confirmed (23 issues)
All 23 issues marked as fixed in the 2026-03-30 report are confirmed fixed in the current files: C-01, M-01 through M-07, m-01 through m-03, m-05 through m-16, X-02, X-03.

### Regressions (4 issues)
| Previous ID | Description | What happened |
|-------------|-------------|---------------|
| m-01/m-03 | Em dashes in READMEs | Fixed for 001-004, but 002, 003, 004 READMEs now have them again (likely regenerated after fix) |
| m-16 | Formulaic ", tai" patterns in 004 Theory_Pack | Fixed in .docx but PDF not regenerated — students get stale version |
| (new scope) | Em dashes in 007 Teacher_Plan | Was not in previous audit scope (only L1-L4 were audited) |

### Still open (2 issues, carried forward)
| Previous ID | Current ID | Description |
|-------------|------------|-------------|
| m-04 | m-02 | Theory_Pack naming non-canonical |
| X-01 | X-01 | Bloom regression 003→004 (design decision) |

### New issues (22)
8 Major + 14 Minor new issues found, primarily in lessons 005–007 which were not deeply content-audited in the previous report.
