# QA Report: Safety (Sauga)
Generated: 2026-04-02 | Module: Grade_9/Semester_1/01_Safety | Lessons audited: 7

## Summary
- Issues found: 34
- Critical: 6 | Major: 18 | Minor: 6
- By dimension: Structure (0) | Content (6) | Language (28)
- Lessons skipped (incomplete): none

---

## Critical Issues
> Content is incorrect, misleading, or has major gaps. Fix before using in classroom.

### [C-01] Lesson 001 — Ergonomics: Teacher_Plan systematic diacritical loss
- **Dimension:** Lithuanian Language
- **Location:** `001_L - Ergonomics & healthy computer use/Teacher_Plan.docx`, "Temos ribos" section + metadata
- **Problem:** The "Temos ribos" paragraph has at least 8 words with missing diacritical marks (laikysena→laikyseną, atstuma→atstumą, ranku→rankų, riesu→riešų, taisykle→taisyklę, nuovargi→nuovargį, etc.). Additionally "salinancious" is a nonexistent word (→šalinančius), "siame"→"šiame", "Si"→"Ši". This is a corrupted paragraph, likely an encoding issue during generation.
- **Suggested action:** Re-run lesson-plan-gen for lesson 001. The corruption is too widespread for find-and-replace.
- **Status:** ☑ Fixed (2026-04-02)

### [C-02] Lesson 001 — Ergonomics: "riešųs" hallucinated form (×3)
- **Dimension:** Lithuanian Language
- **Location:** `001_L - Ergonomics & healthy computer use/Teacher_Plan.docx`, student instruction steps 3-4, "Ką stebėti"
- **Problem:** "riešųs" appears 3 times. This is not a Lithuanian word. Accusative plural of "riešas" is "riešus", not "riešųs" (ų is genitive, creating a nonexistent hybrid).
- **Suggested action:** Find-and-replace "riešųs" → "riešus" in Teacher_Plan.docx (3 instances).
- **Status:** ☑ Fixed (2026-04-02)

### [C-03] Lesson 003 — Online risks: Teacher_Plan has 4 hallucinated word forms
- **Dimension:** Lithuanian Language
- **Location:** `003_L - Online risks & safe response logic/Teacher_Plan.docx`, multiple sections
- **Problem:** Four nonexistent word forms: (1) "siųnėjas" ×4 (→siuntėjas), (2) "veikslą" ×2 (→veiksmą, missing -m-), (3) "paspausdamišią" (two words merged → paspausdami šią), (4) "tyia" (→tyčia, missing č). All are teacher-spoken content that would be read aloud in class.
- **Suggested action:** Re-run lesson-plan-gen for lesson 003, or apply 4 targeted find-and-replace edits.
- **Status:** ☑ Fixed (2026-04-02)

### [C-04] Lesson 001 — Ergonomics: Theory_Pack spelling errors in introduction
- **Dimension:** Lithuanian Language
- **Location:** `001_L - Ergonomics & healthy computer use/Theory_Pack.docx`, Įvadas section
- **Problem:** Two errors in student-facing introductory text: "pastėbėsite" (→pastebėsite, wrong vowel in stem) and "aktuālūs" (→aktualūs, ā is not a Lithuanian diacritical mark).
- **Suggested action:** Find-and-replace both forms in Theory_Pack.docx.
- **Status:** ☑ Fixed (2026-04-02)

### [C-05] Lesson 006 — Practice: Teacher_Plan does not reference Practice_Task.docx
- **Dimension:** Content & Pedagogical Coherence
- **Location:** `006_P - Safety checklist rehearsal + common mistake review/Teacher_Plan.docx`
- **Problem:** Teacher_Plan runs its own complete question set (MCQ + scenarios) and never mentions Practice_Task.docx. The two documents contain completely independent question sets with no guidance on their relationship. This is the exact problem documented in lessons.md (2026-03-31): "Practice_Task must be referenced in Teacher_Plan for P lessons."
- **Suggested action:** Add a section to Teacher_Plan explaining Practice_Task's role (homework, self-study, or distributed at lesson end). Include ~2 min in the timeline for distribution and instructions.
- **Status:** ☑ Fixed (2026-04-02)

### [C-06] Lesson 007 — Assessment: Answer_Key covers only 10 of 28 question variants
- **Dimension:** Content & Pedagogical Coherence
- **Location:** `007_A - Safety structured assessment/Answer_Key.docx`
- **Problem:** Assessment_Task.xlsx has 3 variants per MCQ pool (pools 1-6), 3 per open pool (pools 7-8), and 2 per scenario pool (pools 9-10) = 28 variants total. Answer_Key covers only 1 variant per pool (10 total). If Testmoz selects variant 2 or 3, the teacher has no model answers, distractor explanations, or grading guidance.
- **Suggested action:** Re-run answer-key-gen to extend coverage to all 28 variants. Open/essay variants need model answers + acceptable alternatives + rejection criteria.
- **Status:** ☑ Fixed (2026-04-02)

---

## Major Issues
> Weakens quality — misalignment, bad sequencing, scope issues. Should fix before teacher review.

### [M-01] Lessons 001-004, 006 — Teacher_Plan morphology/spelling error pattern
- **Dimension:** Lithuanian Language
- **Location:** Teacher_Plan.docx in lessons 001, 002, 003, 004, 006
- **Problem:** All five Teacher_Plans have high densities of morphology and spelling errors, consistent with the batch generation failure mode documented in lessons.md (2026-04-01). Approximate counts: 001 (8+ errors), 002 (10+ errors), 003 (10+ errors), 004 (12+ errors), 006 (4 errors). Common patterns: missing diacriticals (maždąug, skaicių, didiausią), wrong case forms (stiprių→stiprų, prie atlošą, nelegaliųs sąvartynųs), nonexistent stems (sukiai→sukčiai, pažistos→pažeistos, siuciamas→siunčiamas), and wrong adjective agreement (saugus→saugų, interaktyves→interaktyvius).
- **Suggested action:** Re-run lesson-plan-gen for all 5 affected lessons. Individual find-and-replace is not practical given the error density. The POST-GEN morphology scan from lessons.md must be enforced on output.
- **Status:** ☑ Fixed (2026-04-02)

### [M-02] Lesson 001 — "sekundzių" systematic error in Theory_Pack (×6)
- **Dimension:** Lithuanian Language
- **Location:** `001_L - Ergonomics & healthy computer use/Theory_Pack.docx`, throughout
- **Problem:** "sekundzių" appears 6 times. Correct genitive plural of "sekundė" is "sekundžių" (dž, not dz).
- **Suggested action:** Find-and-replace "sekundzių" → "sekundžių" across Theory_Pack.docx.
- **Status:** ☑ Fixed (2026-04-02)

### [M-03] Lesson 001 — "patyręs" gender agreement in Visual_Aid + Teacher_Plan
- **Dimension:** Lithuanian Language
- **Location:** `001_L - Ergonomics & healthy computer use/Visual_Aid.pdf` slide 2 + Teacher_Plan.docx
- **Problem:** "Ar esate patyręs nugaros ar kaklo skausmą" uses masculine singular participle with formal plural "esate". For a mixed-gender classroom: "patyrę" (plural form).
- **Suggested action:** Replace "patyręs" → "patyrę" in both files. Visual_Aid requires regeneration via visual-aid-gen.
- **Status:** ☑ Fixed (2026-04-02)

### [M-04] Lesson 002 — Theory_Pack teaches phishing despite Teacher_Plan scope exclusion
- **Dimension:** Content & Pedagogical Coherence
- **Location:** `002_L - Privacy & account safety/Teacher_Plan.docx` "Temos ribos" + `Theory_Pack.docx` phishing section
- **Problem:** Teacher_Plan explicitly says "Neapima phishing atakų, socialinės inžinerijos" but Theory_Pack has a full section "Kaip atpažinti sukčiavimą (phishing)?" with 4 recognition criteria. Direct contradiction between teacher guidance and student material.
- **Suggested action:** Either trim phishing from Theory_Pack to a brief forward reference ("apie tai plačiau kitoje pamokoje") or update Teacher_Plan scope to acknowledge that basic phishing recognition is introduced here.
- **Status:** ☑ Fixed (2026-04-02)

### [M-05] Lesson 002 — Theory_Pack "žiūritė" wrong verb form
- **Dimension:** Lithuanian Language
- **Location:** `002_L - Privacy & account safety/Theory_Pack.docx`, Įvadas
- **Problem:** "žiūritė" should be "žiūrite" (2nd person plural present, formal). Also appears in 004 Theory_Pack.
- **Suggested action:** Find-and-replace "žiūritė" → "žiūrite" in both 002 and 004 Theory_Packs.
- **Status:** ☑ Fixed (2026-04-02)

### [M-06] Lesson 003 — Teacher_Plan additional morphology errors (6 distinct)
- **Dimension:** Lithuanian Language
- **Location:** `003_L - Online risks & safe response logic/Teacher_Plan.docx`
- **Problem:** Beyond C-03, six more errors: "melaidingą"→melagingą, "ketėnimų"→ketinimų, "šaltiniį"→šaltinį, "veiktumetė"→veiktumėte, "sukiai"→sukčiai (×2) + "sukius"→sukčius, "atsiųia"→atsiunčia.
- **Suggested action:** Covered by M-01 (re-run lesson-plan-gen for 003).
- **Status:** ☑ Fixed (2026-04-02)

### [M-07] Lesson 003 — "melaidingą" propagated to Visual_Aid
- **Dimension:** Lithuanian Language
- **Location:** `003_L - Online risks & safe response logic/Visual_Aid.pdf` slide 6 + Teacher_Plan closing Q3
- **Problem:** "melaidingą" (→melagingą) appears in both files. Visual_Aid requires regeneration.
- **Suggested action:** Fix Teacher_Plan (M-01), then regenerate Visual_Aid via visual-aid-gen.
- **Status:** ☑ Fixed (2026-04-02)

### [M-08] Lesson 003 — "draugasė" nonexistent word in Teacher_Plan + Visual_Aid
- **Dimension:** Lithuanian Language
- **Location:** `003_L - Online risks & safe response logic/Teacher_Plan.docx` + Visual_Aid.pdf
- **Problem:** "draugasė" is not standard Lithuanian. Should be "draugė" (female friend).
- **Suggested action:** Replace "draugasė" → "draugė" in Teacher_Plan. Regenerate Visual_Aid.
- **Status:** ☑ Fixed (2026-04-02)

### [M-09] Lesson 003 — Unverifiable NKSC "35 000" statistic in Theory_Pack
- **Dimension:** Content & Pedagogical Coherence
- **Location:** `003_L - Online risks & safe response logic/Theory_Pack.docx`, "Ar žinojote?" box
- **Problem:** Claims NKSC tool "Vasaris" protects ~35,000 residents daily. The tool exists, but the specific number is not verifiable from NKSC public sources. Violates the 2026-04-01 lessons.md rule on unverifiable statistics.
- **Suggested action:** Replace with qualitative claim: "kasdien blokuoja tūkstančius bandymų" or cite a specific NKSC publication with URL.
- **Status:** ☑ Fixed (2026-04-02)

### [M-10] Lesson 003 — Potentially fabricated ENISA 2025 citation
- **Dimension:** Content & Pedagogical Coherence
- **Location:** `003_L - Online risks & safe response logic/Theory_Pack.docx`, Šaltiniai section
- **Problem:** Cites "ENISA Threat Landscape 2025" but the latest confirmed edition is 2024 (Oct 2024). The 2025 edition may not exist.
- **Suggested action:** Verify if ENISA Threat Landscape 2025 has been published. If not, change to 2024 edition with correct URL.
- **Status:** ☑ Verified, no change needed (2026-04-02)

### [M-11] Lesson 004 — Theory_Pack "konteineriį" wrong accusative
- **Dimension:** Lithuanian Language
- **Location:** `004_L - Environmental impact of digital technologies/Theory_Pack.docx`
- **Problem:** "konteineriį" should be "konteinerį" (accusative of konteineris). Also "perdirbimu"→"perdirbimą" (accusative to parallel "surinkimą").
- **Suggested action:** Find-and-replace both forms in Theory_Pack.docx.
- **Status:** ☑ Fixed (2026-04-02)

### [M-12] Lesson 004 — Theory_Pack Lithuanian typographic quotes
- **Dimension:** Lithuanian Language
- **Location:** `004_L - Environmental impact of digital technologies/Theory_Pack.docx`
- **Problem:** Lithuanian typographic quotes (U+201E, U+201C) used around "debesis". Project rule requires straight double quotes only.
- **Suggested action:** Replace all Lithuanian quotes with straight double quotes.
- **Status:** ☑ Fixed (2026-04-02)

### [M-13] Lesson 006 — Practice_Task Q5 parenthetical answer hints
- **Dimension:** Content & Pedagogical Coherence
- **Location:** `006_P - Safety checklist rehearsal + common mistake review/Practice_Task.docx`, Q5
- **Problem:** All four MCQ options have parenthetical explanations that evaluate the password for the student: "(atsitiktiniai simboliai)" on the correct answer directly states why it's strongest. Violates the 2026-03-28 lessons.md rule on parenthetical hints.
- **Suggested action:** Remove all parenthetical explanations from Q5 options. Present raw passwords only. Answer_Key already explains the reasoning.
- **Status:** ☑ Fixed (2026-04-02)

### [M-14] Lesson 006 — "pažistos" nonexistent word (Teacher_Plan)
- **Dimension:** Lithuanian Language
- **Location:** `006_P - Safety checklist rehearsal + common mistake review/Teacher_Plan.docx`, warm-up Q1
- **Problem:** "pažistos" should be "pažeistos" (violated/breached). Same error also in 002 Teacher_Plan and Theory_Pack.
- **Suggested action:** Replace "pažistos" → "pažeistos". Covered by M-01 for Teacher_Plans.
- **Status:** ☑ Fixed (2026-04-02)

### [M-15] Lesson 006 — "skiriamūsios" wrong adjective form (Teacher_Plan)
- **Dimension:** Lithuanian Language
- **Location:** `006_P - Safety checklist rehearsal + common mistake review/Teacher_Plan.docx`
- **Problem:** "skiriamūsios gebos" should be "skiriamosios gebos" (genitive singular feminine of skiriamoji).
- **Suggested action:** Replace "skiriamūsios" → "skiriamosios".
- **Status:** ☑ Fixed (2026-04-02)

### [M-16] Lesson 006 — "buitių atliekų" non-standard collocation (Answer_Key)
- **Dimension:** Lithuanian Language
- **Location:** `006_P - Safety checklist rehearsal + common mistake review/Answer_Key.docx`, Q10
- **Problem:** "buitių atliekų" uses noun genitive where adjective is standard. Should be "buitinių atliekų".
- **Suggested action:** Replace "buitių atliekų" → "buitinių atliekų".
- **Status:** ☑ Fixed (2026-04-02)

### [M-17] Lesson 002 — "L pamoka" type code in Student_Task header
- **Dimension:** Content & Pedagogical Coherence
- **Location:** `002_L - Privacy & account safety/Student_Task.docx`, header
- **Problem:** Header shows "9 klasė - Sauga - L pamoka". Per CLAUDE.md rules, type codes (L, I, P, A) must not appear in student-facing materials. Students should see a descriptive name.
- **Suggested action:** Replace "L pamoka" with "Mokymosi pamoka" or remove the type indicator entirely.
- **Status:** ☑ Fixed (2026-04-02)

### [M-18] Lesson 002 — "pavojįngą" wrong diacritical in Theory_Pack
- **Dimension:** Lithuanian Language
- **Location:** `002_L - Privacy & account safety/Theory_Pack.docx`, phishing definition
- **Problem:** "pavojįngą" has a nosinė on i that doesn't belong. Correct: "pavojingą".
- **Suggested action:** Replace "pavojįngą" → "pavojingą".
- **Status:** ☑ Fixed (2026-04-02)

---

## Minor Issues
> Cosmetic, terminological, or style issues. Fix when convenient.

### [m-01] Lesson 003 — Visual_Aid missing key instructional slides
- **Dimension:** Content & Pedagogical Coherence
- **Location:** `003_L - Online risks & safe response logic/Visual_Aid.pdf`
- **Problem:** Visual_Aid has no slide showing phishing signs or the SUSTOTI→PATIKRINTI→PRANEŠTI algorithm visually, despite README stating the Visual Aid should contain "Phishing požymiai, algoritmo schema." These are the primary projection materials for the 20-min lecture.
- **Suggested action:** Add 1-2 slides: one for 6 phishing signs, one for algorithm flow. Regenerate via visual-aid-gen.
- **Status:** ☑ Fixed (2026-04-02)

### [m-02] Lesson 004 — Visual_Aid missing lecture block support
- **Dimension:** Content & Pedagogical Coherence
- **Location:** `004_L - Environmental impact of digital technologies/Visual_Aid.pdf`
- **Problem:** Visual_Aid has 6 slides but none covering the 18-min "negative impact" or 8-min "positive impact" lecture content (data centers, e-waste, digital footprint). Slides jump from objectives to task to closing questions.
- **Suggested action:** Consider adding 2-3 slides for lecture content if teacher needs projection support. Otherwise acceptable if teacher prefers verbal delivery.
- **Status:** ☑ Fixed (2026-04-02)

### [m-03] Lesson 005 — Visual_Aid missing demo scenario slide
- **Dimension:** Content & Pedagogical Coherence
- **Location:** `005_I - Scenario rotation task/Visual_Aid.pdf` + Teacher_Plan.docx
- **Problem:** Teacher_Plan says "Parodykite skaidrėje pavyzdinį scenarijų" but no demo scenario slide exists in Visual_Aid. Also, "Pagrindinės sąvokos" slides omit password safety concept despite scenario 3 testing it.
- **Suggested action:** Add demo scenario slide to Visual_Aid, and add password safety to concepts slides.
- **Status:** ☑ Fixed (2026-04-02)

### [m-04] Lesson 003 — Student_Task hint gives away answer classification
- **Dimension:** Content & Pedagogical Coherence
- **Location:** `003_L - Online risks & safe response logic/Student_Task.docx`, situation 2 hint
- **Problem:** Hint says "2 situacija susijusi su socialine inžinerija" which gives away the threat type classification the student should be deducing.
- **Suggested action:** Replace with a non-classifying hint: "Atkreipkite dėmesį į tai, kas atsiunčia žinutę ir ar tai jam būdingas elgesys."
- **Status:** ☑ Fixed (2026-04-02)

### [m-05] Lesson 006 — MCQ Q7 slight length bias in Practice_Task
- **Dimension:** Content & Pedagogical Coherence
- **Location:** `006_P - Safety checklist rehearsal + common mistake review/Practice_Task.docx`, Q7
- **Problem:** Correct answer B (58 chars) is the longest option. Not systemic across the test, but worth noting per lessons.md rule.
- **Suggested action:** Consider adding a few words to another distractor to equalize. Low priority since overall set is balanced.
- **Status:** ☑ Fixed (2026-04-02)

### [m-06] Lesson 007 — Rubric assumes fixed question-topic mapping
- **Dimension:** Content & Pedagogical Coherence
- **Location:** `007_A - Safety structured assessment/Rubric.docx`, section 2
- **Problem:** Rubric maps "questions 1-2" to "Ergonomika", etc. This only holds if Testmoz preserves pool presentation order. If Testmoz randomizes pool order, question numbers won't match topics.
- **Suggested action:** Verify Testmoz pool order behavior. If randomized, rewrite Rubric to reference topics instead of question numbers.
- **Status:** ☑ Fixed (2026-04-02)

---

## Cross-Lesson Findings

### [X-01] Bloom level regression at lesson 004
- **Dimension:** Content & Pedagogical Coherence
- **Lessons involved:** 003, 004
- **Problem:** Bloom level drops from Apply (3) in lesson 003 back to Understand (2) in lesson 004. While contextually justified (004 introduces a new topic — environment), the regression breaks the expected upward progression across L lessons.
- **Suggested action:** Acceptable as-is. The environment topic requires establishing new knowledge before application. No change needed unless the teacher wants to restructure.
- **Status:** ☑ Accepted as-is (2026-04-02)

### [X-02] Practice lesson (006) Bloom level equals assessment (007), not higher
- **Dimension:** Content & Pedagogical Coherence
- **Lessons involved:** 006, 007
- **Problem:** Both 006_P and 007_A operate at Bloom 3 (Apply). Best practice is for practice to be cognitively harder than the assessment (e.g., Bloom 4 — Analyze). Currently they are equal, which is the minimum acceptable threshold.
- **Suggested action:** Consider adding 1-2 Analyze-level questions to Practice_Task (e.g., "compare two scenarios and explain which poses a greater risk and why"). Low priority.
- **Status:** ☑ Accepted as-is (2026-04-02)

### [X-03] Teacher_Plan batch quality is the dominant module-wide issue
- **Dimension:** Lithuanian Language
- **Lessons involved:** 001, 002, 003, 004, 006
- **Problem:** All five non-assessment Teacher_Plans (001-004 + 006) share the same pattern: high density of morphology, spelling, and diacritical errors consistent with the agent generation failure mode documented in lessons.md (2026-04-01). Total estimated errors across all Teacher_Plans: 40+. Student-facing documents (Theory_Pack, Student_Task) are significantly cleaner. This is a systemic generation quality issue, not a per-lesson problem.
- **Suggested action:** Re-run lesson-plan-gen for all 5 affected lessons with enforced POST-GEN morphology scanning. Alternatively, do a targeted batch XML edit pass across all Teacher_Plan docx files.
- **Status:** ☑ Fixed (2026-04-02)
