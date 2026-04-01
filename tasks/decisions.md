---
tags:
  - project/it-curriculum
  - decisions
date-created: 2026-03-22
last-updated: 2026-03-22
---

# IT Curriculum Decisions

Append-only log. Never edit or delete existing entries.

## 2026-03-22 — Curriculum Scope

**Decision**: 7-lesson website design curriculum for 9th graders.

**Context**: Students need practical web skills. Module covers HTML/CSS fundamentals through a project-based approach where students build a personal or themed website incrementally across lessons.

**Rationale**: 7 lessons fits a typical Lithuanian gymnasium module block. Enough time to cover structure (HTML), styling (CSS), and basic layout without rushing into JavaScript.

## 2026-03-22 — Pending Decisions

The following are **not yet decided** and need resolution:

- **Lesson structure format**: How each lesson folder is organized in the repo — what files go where, what's generated vs. hand-written
- **Assessment format**: How student work is evaluated — rubric-based? Portfolio? Per-lesson tasks? Final project only?
- **Tool choices**: Do students use a specific editor? Live preview tools? GitHub Pages for hosting?
- **Progression model**: Linear (each lesson builds on previous) vs. modular (lessons can be taught in flexible order)
- **Lithuanian language**: How much of the curriculum content is in Lithuanian vs. English (code comments, instructions, UI labels)

## 2026-03-22 — Reference Documents Location

**Decision**: National curriculum reference documents stored in `_references/` at repo root.

**Context**: The lesson-plan-gen skill (Step 2b) and lesson-readme-gen skill need access to informatika.docx for cross-referencing curriculum requirements. VBE_aprasas.pdf and vertinimo_gaires.pdf support Grade 11–12 exam-aligned content generation.

**Rationale**: Centralizing references in `_references/` keeps them accessible to all skills without duplicating into individual lesson folders. The underscore prefix keeps the folder visually sorted before grade folders.

## 2026-03-22 — Phase naming convention

**Decision**: Retrieval phases renamed from academic terminology to plain Lithuanian: "Pamokos pradžios klausimai" (entry) and "Pamokos pabaigos klausimai" (exit). Format label simplified to just "žodinis".

**Context**: Teacher feedback that "Įžanginis atgaminimas" and "Išėjimo atgaminimas" sound overly academic and "Žodinis šaltojo kvietimo formatas" is unnecessarily wordy.

**Rationale**: The plan is a practical document opened before class — terminology should be immediately scannable, not academic.

## 2026-03-22 — Teacher_Plan.docx visual formatting spec

**Decision**: Adopted a color-coded formatting spec for Teacher_Plan.docx output with phase-specific colors (orange=questions, blue=teaching, green=application), metadata card, objectives box with purple accent, warning boxes, and page break rules.

**Context**: Previous output was visually flat — plain headings, no color differentiation, hard to scan during a live lesson.

**Rationale**: Color-coded phases let the teacher find the current section at a glance. Page break rules prevent orphaned headers.

## 2026-03-22 — Curriculum reference format

**Decision**: Replace `_references/informatika.docx` (mislabeled UTF-8 text file) with `_references/informatika_programa.md` — a structured markdown conversion containing all 6 achievement areas, level descriptors, teaching content per topic, and the full 4-grade lesson structure.

**Context**: The original informatika.docx was not a valid .docx file (UTF-8 text with .docx extension), so python-docx couldn't parse it and the lesson-plan-gen skill's cross-referencing step was always skipped. Additionally, grade-specific curriculum structures existed only as loose .txt files in Downloads.

**Rationale**: A readable .md file enables automatic cross-referencing during plan/README generation. All curriculum info in one place, structured with tables and headings for quick lookup.

## 2026-03-22 — I-lesson generation overhaul in lesson-plan-gen skill

**Decision**: Added Step 1b (L-Content Synthesis), expanded I-lesson decision tree by topic type, added activity palette with rotation rule, enforced teacher-led time cap (≤15 min), required tangible student artifacts, and made exit retrieval metacognitive instead of factual.

**Context**: The skill was treating I lessons as shape-selected L lessons — picking "Trumpas įvadas → ilga praktika" but without analyzing what L lessons taught, what needs integration, or what activity format fits the topic type. This produced I lessons that were either vague ("students apply what they learned") or teacher-dominated (teacher presents scenarios, students answer verbally).

**Rationale**: I lessons are structurally different from L lessons — they consolidate and apply, not teach. The skill needs explicit mechanisms to: (1) identify what to integrate from preceding L lessons, (2) select activity formats by topic type, (3) enforce student-driven structure (≥60% active work), and (4) produce tangible artifacts even for abstract topics. The new I_example_02.md exemplar (knowledge-heavy safety scenario analysis) demonstrates the correct pattern alongside the existing tool-based I_example_01.

## 2026-03-23 — Theory pack skill: "Sužinok daugiau" replaces "Kas toliau?"

**Decision**: The theory pack's final reader-facing section is "Sužinok daugiau" (explore the current topic deeper) not "Kas toliau?" (bridge to next lesson).

**Context**: The original skill version had "Kas toliau?" pointing students to the next lesson. The teacher's corrected version (Downloads/Theory-pack-gen.zip) changed this to "Sužinok daugiau" with 2-4 free, accessible resources for deeper exploration of the current topic.

**Rationale**: A theory pack is a self-contained reference for one lesson. Students should be able to go deeper into what they just learned, not be prematurely pointed toward the next lesson's content.

## 2026-03-23 — Lithuanian text must be UTF-8, never unicode escapes

**Decision**: All Lithuanian text in docx generation scripts must be written as plain UTF-8 characters. Unicode \u escapes are prohibited for Lithuanian letters (ą, č, ę, ė, į, š, ų, ū, ž). Only typographic quotes „" use escapes (\u201E, \u201c) due to JS string delimiter conflict.

**Context**: Across two theory packs, 8 spelling errors were found — all caused by writing Lithuanian via \u escapes. Errors included phantom extra vowels (dažniausiuų), missing diacriticals (jungiames), dropped consonants (įsilauti), and hallucinated verb forms (domėjiesės). These errors were invisible in the source code and undetectable by self-review.

**Rationale**: Unicode escapes remove visual feedback from the authoring process. When you write `\u012frodymu\u0173`, you can't see that there's an extra `u`. When you write `įrodymų`, the error would be visible. This is a structural fix — changing the generation method rather than adding more QA rules.

## 2026-03-23 — No explicit page breaks in theory pack docx generation

**Decision**: Never insert explicit `new Paragraph({ children: [new PageBreak()] })` in theory pack generation scripts. Use `keepNext: true`, `keepLines: true`, and `cantSplit: true` properties instead.

**Context**: Explicit page breaks before sections 3 and "Praktiniai patarimai" in the lesson 002 theory pack created pages that were 30-50% empty.

**Rationale**: The generator cannot accurately predict where content lands on a page. Explicit breaks almost always create large gaps. Word's layout engine handles pagination correctly when given keepNext/keepLines hints on headings and cantSplit on tables/boxes.

## 2026-03-23 — Theory pack skill moved to ~/.claude/skills/

**Decision**: The canonical theory-pack-gen skill lives at `~/.claude/skills/theory-pack-gen/` (3 files: SKILL.md, references/content_format.md, references/quality_checklist.md).

**Context**: The skill was previously only in the anthropic-skills plugin cache, which meant it could be stale or overwritten. Moving to ~/.claude/skills/ makes it persistent, version-controlled, and always loads the latest version.

**Rationale**: All custom skills that evolve during the project should live in a stable, user-controlled location rather than a plugin cache directory.

## 2026-03-27 — Lesson Būsena chain with manual check gate

**Decision**: Lesson status progression is 📋 Šablonas → 🚧 WIP → ✅ Failai sukurti → ✅ Baigta. The final transition to Baigta requires explicit teacher confirmation. The Reikalingi failai table includes a Patikrinta column that only the teacher flips. Lesson is Baigta only when all files are present AND all Patikrinta are ✅.

**Context**: Without a manual gate, lessons could be marked complete purely by file existence, even if the generated content has errors or hasn't been reviewed.

**Rationale**: Automated file detection handles the tedious tracking. The teacher retains final authority over quality. The end-session skill prompts for confirmation when a lesson reaches Failai sukurti status.

## 2026-03-28 — Student-facing files output as PDF

**Decision**: Theory_Pack and Student_Task skills generate .docx internally, convert to PDF via docx2pdf (uses MS Word on Windows), and delete the intermediate .docx. Teacher_Plan remains .docx so teachers can edit.

**Context**: Teacher requested PDF output for student-facing materials. DOCX files risk students accidentally editing content or seeing messy formatting differences across Word versions.

**Rationale**: PDF is the locked distribution format for students. Teachers keep .docx for plans they may need to annotate or adjust before class.

## 2026-03-28 — Format specs include teacher-approved paragraph spacing values

**Decision**: content_format.md and task_format.md now contain exact TWIPs spacing tables extracted from teacher's manually fixed .docx files (e.g., H1: before=360/after=160, body: after=100 for theory packs; H2: before=300/after=120 for student tasks).

**Context**: Generated documents had "poor formatting" per teacher feedback. The specs had correct colors/fonts/sizes but left paragraph spacing vague. Teacher fixed the layout manually in Word and uploaded the corrected files.

**Rationale**: Codifying exact spacing values from the teacher's exemplar files means future generation should match the approved layout without manual fixes.

## 2026-03-28 — Patch .docx XML for text-only fixes instead of regenerating

**Decision**: When only text content needs correction (not formatting/structure), fix errors via XML find-replace inside the .docx zip rather than regenerating from scratch.

**Context**: Teacher manually fixed formatting in all 3 lesson 001 files. Regenerating would have lost those formatting fixes. The only remaining issues were 4 text errors in Teacher_Plan.docx.

**Rationale**: Preserves teacher's manual formatting work. Faster and less error-prone than full regeneration for targeted text corrections.

## 2026-03-28 — Visual Aid uses sections instead of page breaks

**Decision**: The visual-aid-gen skill generates each slide as a separate docx section (6 sections total) rather than using explicit PageBreak paragraphs.

**Context**: During test generation, explicit page breaks after full-height elements (title slide table filling content area) created blank pages. The PageBreak paragraph had no room on the current page and spilled to the next, producing 8 pages instead of 6.

**Rationale**: Sections naturally start on new pages without requiring a PageBreak element. This eliminates blank page issues regardless of content height.

## 2026-03-28 — Visual_Aid.pdf added to lesson deliverables

**Decision**: L and I lessons now have a fourth deliverable: Visual_Aid.pdf (6-page landscape A4 projection aid). Generated by the visual-aid-gen skill from Teacher_Plan content, optionally enriched by Student_Task and Theory_Pack. Output is PDF only (same docx-to-PDF pipeline as other student-facing materials).

**Context**: Teacher uses a two-monitor setup (plan on laptop, visual aid on projector). Students must not see Teacher_Plan contents. Admin requires learning objectives displayed every lesson.

**Rationale**: A separate projection file keeps the plan private, satisfies the admin objective-display requirement, and provides a key-concepts reference slide that stays up during independent work time.

## 2026-03-28 — Assessment-task-gen skill created

**Decision**: New skill `assessment-task-gen` designed to generate assessment materials for A lessons. Uses backward design (Wiggins & McTighe): assessment first, then practice tasks model it, then answer keys derive from both. Skill proposes assessment format, teacher confirms before generation proceeds.

**Context**: 38 A lessons across the curriculum have no assessment materials. The skill needs a pedagogical knowledge base (7 reference docs + 3 exemplars) rather than ad-hoc reasoning. Design informed by LInMA diagnostic tests, school grading policy (vertinimo tvarka), Bloom's taxonomy mapping, and Lister's code hierarchy.

**Rationale**: A structured skill with condensed reference docs ensures consistent, pedagogically grounded assessments across all modules and grades. The proposal-confirmation gate prevents generating assessments the teacher would reject.

## 2026-03-28 — Assessment files output as PDF + XLSX

**Decision**: A lesson deliverables: Assessment_Task → PDF, Rubric → PDF, Answer_Key → PDF (student-facing), Testmoz question bank → XLSX. Teacher_Plan stays .docx. Existing A lesson READMEs that reference .docx need migration to .pdf.

**Context**: Student-facing materials were already standardized to PDF (Theory_Pack, Student_Task, Visual_Aid). Assessment materials should follow the same pattern. Testmoz requires XLSX import format with specific column structure.

**Rationale**: PDF prevents students from editing assessment materials. XLSX for Testmoz enables direct import of question banks with pools, point values, and explanations.

## 2026-03-28 — Student-task-gen extended for P lessons

**Decision**: The student-task-gen skill will support P (Practice) lesson type. P tasks use assessment-format exercises (matching the upcoming A lesson format) with grade-appropriate scaffolding. Practice_Task_Set is the same document type as Student_Task, not a new file type.

**Context**: student-task-gen currently has a hard type gate blocking P lessons. P lessons need student-facing task documents that model the assessment format so students know what to expect.

**Rationale**: Reusing student-task-gen avoids duplicating the rendering pipeline. P tasks differ from L/I tasks only in content structure (assessment-format exercises), not in document format or generation mechanics.

## 2026-03-28 — Answer-key-gen as separate skill

**Decision**: Answer keys will be generated by a dedicated `answer-key-gen` skill with two modes: Grading Key (A lessons, teacher-facing .docx) and Study Key (P lessons, student-facing .pdf). The A mode produces an exhaustive marking scheme for grading consistency. The P mode produces a teaching document with detailed explanations of correct and incorrect answers.

**Context**: Answer keys serve two lesson types (A and P) with fundamentally different audiences and purposes. A keys ensure grading uniformity across graders (teacher, substitute, AI). P keys help students self-check and learn from mistakes. Embedding in either source skill would create a dependency tangle.

**Rationale**: A dedicated skill can read output from both assessment-task-gen and student-task-gen. Two modes in one skill (not two skills) because inputs are identical and the generation pipeline is the same; only the content lens differs. Output format follows the existing pattern: teacher documents stay .docx (editable), student documents become .pdf (locked). Backward design order: assessment-task-gen → student-task-gen (P extension) → answer-key-gen.

## 2026-03-28 — Assessment-task-gen skill packaged in repo

**Decision**: The full assessment-task-gen skill (SKILL.md + 6 reference docs + 3 exemplars + 1 binary template = 11 files) is stored in both `~/.claude/skills/assessment-task-gen/` (global) and `.claude/skills/assessment-task-gen/` (repo). Both locations are identical.

**Context**: The skill was initially created only in global `~/.claude/skills/`. Teacher requested it be packaged into the repo as well for version control and portability.

**Rationale**: The repo copy is version-controlled and survives across machines. The global copy ensures the skill loads regardless of working directory. When updating the skill, both locations must be kept in sync.

## 2026-03-28 — Never patch generated files in-place after structural changes

**Decision**: After inserting or deleting rows in a generated file (.xlsx, .docx), never do in-place cell edits using hardcoded row numbers. Always regenerate from scratch via a clean script.

**Context**: During assessment-task-gen smoke test, 28 blank rows were inserted into Assessment_Task.xlsx to fix essay pool formatting. Subsequent in-place edits used pre-insertion row numbers, silently overwriting password pool answers with phishing question text. The corruption was invisible without cell-by-cell inspection.

**Rationale**: Row/cell references become stale after any structural change. The only safe approach is full regeneration from a script that builds the file from scratch. This applies to any generated file where structural edits shift content positions.

## 2026-03-29 — module-qa skill designed with parallel subagent architecture

**Decision**: New module-qa skill audits completed modules using a coordinator + parallel per-lesson subagents + cross-lesson synthesis pass. Three check dimensions: Structure & Metadata (mechanical), Content & Pedagogical Coherence (judgment), Lithuanian Language (rule-based). Output is a persistent diagnostic report at `tasks/qa-report-{module-name}.md` with severity tiers (Critical/Major/Minor), issue IDs, file locations, suggested actions, and status checkboxes. READMEs are treated as claims to verify, not sources of truth. The skill does not auto-fix anything.

**Context**: All generation skills (lesson-plan-gen, student-task-gen, theory-pack-gen, assessment-task-gen, practice-task-gen, answer-key-gen) self-check during generation, but no skill audits a completed module as a coherent unit. Cross-lesson issues (Bloom progression, prerequisite gaps, sequencing errors, assessment fairness) are invisible to per-lesson generation skills.

**Rationale**: Parallel subagents give each lesson a dedicated context window for thorough audit without degradation on later lessons. The coordinator handles structural checks (cheap, mechanical) and cross-lesson synthesis (requires seeing the full module picture). Report format with issue IDs enables tracking across sessions. Diagnosis-only design keeps the teacher in control of fixes.

## 2026-03-29 — practice-task-gen as standalone skill (supersedes student-task-gen P extension)

**Decision**: P lesson practice tasks are generated by a dedicated `practice-task-gen` skill, not by extending student-task-gen. The skill hard-gates on the A lesson's Assessment_Task existing, parses it to build a content inventory, proposes a difficulty elevation strategy for teacher approval, then generates Practice_Task.pdf with questions cognitively harder than the A assessment. Output is named Practice_Task.pdf (not Student_Task.pdf). answer-key-gen P mode will be patched to expect Practice_Task.pdf.

**Context**: student-task-gen was extended for P lessons on 2026-03-28, but P lessons have a fundamentally different pipeline: they depend on the A lesson's Assessment_Task as input, require difficulty elevation logic, and use a different document structure (topic-grouped questions, self-assessment checklist, revision pointers). Forcing this into student-task-gen would bloat it with A-lesson parsing and elevation logic that L/I lessons never need.

**Rationale**: Standalone skill keeps single responsibility. The pedagogical innovation (practice harder than assessment) requires its own pipeline: A-assessment analysis → elevation strategy proposal → teacher approval gate → generation. The workflow chain becomes: assessment-task-gen → practice-task-gen → answer-key-gen (both modes). This supersedes the 2026-03-28 decision "Student-task-gen extended for P lessons."

## 2026-03-29 — Lesson plan format: typography-first, no decorative tables

**Decision**: plan_format.md rewritten from scratch. Phase headers are bold colored paragraphs + horizontal rules (no accent stripe tables). Sub-block headings are bold blue text + whitespace. 5 colors instead of 18. Only 2 tables remain (metadata card, objectives box).

**Context**: The previous spec had 18 colors, accent stripe tables for every phase header, mini accent bar tables for sub-blocks, and complex border configurations. The result was visually busy, hard to maintain, and the teacher found it worse than the original formatting.

**Rationale**: Typography-first approach (spacing, bold, color, rules) is simpler to maintain, renders consistently, and makes section boundaries clear without nested table structures.

## 2026-03-29 — Lesson plans flag extra materials needed

**Decision**: lesson-plan-gen Step 5 now scans for references to visual assets (images, diagrams, illustrations) and appends a "REIKALINGOS PAPILDOMOS MEDŽIAGOS" section listing each item with suggested sources.

**Context**: Lesson plans reference visuals ("parodykite ekrane žmogų, sėdintį netaisyklingai", "parodykite pavyzdžių skalę") but those visuals don't exist in the lesson folder. Without flagging, they get forgotten between plan generation and lesson delivery.

**Rationale**: The skill can't generate photos or complex illustrations. Flagging ensures the teacher knows what to source separately (stock photos, Canva, SVG diagrams) before the lesson.

## 2026-03-30 — No generation scripts in repo

**Decision**: Generation scripts (JS files that build .docx programmatically) are not stored in the repo. They are ephemeral session artifacts. The `scripts/` folder, `package.json`, `generate_teacher_plans.js`, and `docs/superpowers/` were deleted.

**Context**: Over multiple sessions, JS generation scripts and npm dependencies accumulated in the repo without explicit approval. 16 scripts (~220KB), package.json, node_modules, and a docs/ folder with design specs were committed as if they were part of the curriculum.

**Rationale**: This is a curriculum content repo, not a build system. Only output files (.docx, .pdf, .md) belong here. If a session uses a JS script to generate a .docx, the script is disposable and only the output gets committed.

## 2026-03-30 — Docx template library (deferred)

**Decision**: A JS library encoding the stable Teacher_Plan formatting skeleton (colors, fonts, phase headers, metadata cards) is planned but deferred. The LLM would generate a content data object (~2-4KB) instead of full docx builder code (~8-20KB). Tracked in TODO.md at repo root.

**Context**: Token cost analysis showed ~60-75% output token reduction per document if formatting is separated from content. But the Teacher_Plan format is still being iterated (plan_format.md and teacher_profile.md were modified this week).

**Rationale**: Building the template now would require rebuilding it after every format change. The trigger to start is ~5-7 Teacher_Plans generated without format spec modifications.

## 2026-03-30 — Plain-text sidecar protocol for Lithuanian QA

**Decision**: Every generation skill now writes a `_text.txt` sidecar file alongside the .docx before PDF conversion. lt-qa POST-GEN reads from this sidecar instead of relying on in-memory text. Sidecar naming: `Teacher_Plan_text.txt`, `Student_Task_text.txt`, etc. Sidecar is deleted after QA passes. Format is plain UTF-8, one paragraph per line.

**Context**: QA report on 01_Safety found 4+ language errors that slipped through POST-GEN (issues m-10, m-12, m-15, m-16). Root cause: lt-qa POST-GEN was checking text from LLM memory (unreliable after long generation), not from the actual generated document. Binary .docx files cannot be re-read reliably for text review.

**Rationale**: The sidecar gives POST-GEN a concrete, readable text file to check. It's written at generation time (when all text is in scope), persists through the QA pass, and is cleaned up after. This decouples QA from LLM memory reliability without requiring binary .docx parsing.

## 2026-03-30 — Cross-file coherence checks in generation skills

**Decision**: All 5 content generation skills (student-task-gen, lesson-plan-gen, theory-pack-gen, visual-aid-gen, lesson-readme-gen) now have a mandatory step that reads existing sibling lesson files and verifies alignment before finalizing output. Each skill has a clear authority hierarchy for resolving mismatches: Teacher_Plan is authoritative for questions/objectives, Student_Task for what students see, Theory_Pack for definitions, README for scope.

**Context**: QA report on 01_Safety found cross-file coherence issues (C-01, M-05, M-07, m-11, m-14): Teacher_Plan scenarios didn't match Student_Task, README timing didn't match Teacher_Plan, Theory_Pack concepts weren't reflected in Student_Task answers. Each skill generated files in isolation with no awareness of sibling files.

**Rationale**: Generation order should not determine file coherence. The coherence check is conditional on sibling files existing on disk, so it doesn't break forward generation (when files don't exist yet). When sibling files do exist, mismatches are caught and resolved before output.

## 2026-03-30 — Module design document required before content generation

**Decision**: Before generating content for a new module, a `Module_Design.md` must be created in the module folder. Template at `.claude/skills/module-qa/references/module_design_template.md`. lesson-plan-gen (Step 0.5) and lesson-readme-gen (Step 0.5) now check for this file and warn the teacher if it's missing. The document covers: Bloom progression (must be non-decreasing or justified), prerequisite chain (every assumption traceable to a prior lesson or grade baseline), independent work time (≥5 min for every task-bearing lesson), and P-A compatibility (practice harder than assessment, same format).

**Context**: QA report on 01_Safety found design-level issues that per-lesson generation couldn't catch: Bloom regression from lesson 003 to 004 (X-01), prerequisite "internet = physical infrastructure" not taught in any prior lesson (X-02), Student_Task with 0 min allocated lesson time (m-13), and P-A comparison impossible due to incomplete files (X-03). These are planning failures, not generation failures.

**Rationale**: Per-lesson skills optimize individual outputs but cannot reason about module-wide coherence. A pre-generation design document forces the teacher (with Claude's help) to make explicit decisions about progression, prerequisites, and assessment alignment before any content is generated. The gate is soft (warn, don't block) because rigid enforcement would slow down exploratory work on early modules.

## 2026-03-30 — Em dash removed at code level, not by prompt

**Decision**: All 7 generation skills (lesson-plan-gen, student-task-gen, theory-pack-gen, visual-aid-gen, practice-task-gen, assessment-task-gen, answer-key-gen) require a mechanical `noEmDash` / `no_em_dash` helper in every generation script. The helper strips U+2014 (em dash) from all text strings before document insertion. JS: `const noEmDash = (s) => s.replace(/\u2014/g, ':');`. Python: `def no_em_dash(s): return s.replace('\u2014', ':')`.

**Context**: Em dash appeared repeatedly in generated documents despite being banned in CLAUDE.md, lt-mistakes.yaml, and lessons.md. QA report on 01_Safety confirmed the ban was ineffective (issues m-01, m-02, m-03). LLMs produce em dashes naturally regardless of prompt-level rules.

**Rationale**: Automated code-level replacement is the only reliable fix. Prompt instructions and QA checklists both depend on LLM compliance, which cannot be guaranteed. A one-line string replace in the script is deterministic and costs nothing.

## 2026-03-30 — end-session file verification uses canonical requirements

**Decision**: The end-session skill now reads `.claude/skills/end-session/references/file_requirements.md` (Step 1d) as the source of truth for lesson completeness. Būsena can only reach "✅ Failai sukurti" when all canonically required files exist on disk, not just when the README table has no ❌ rows.

**Context**: When new required file types were added in 2026-03-28 (Visual_Aid for L/I, Answer_Key for P/A), existing lesson READMEs were not retroactively updated. The end-session skill trusted README table claims and left lessons at "✅ Failai sukurti" with files actually missing.

**Rationale**: README tables are claims, not facts. File existence on disk is the only reliable signal. Decoupling status calculation from README state means adding new required file types to `file_requirements.md` is sufficient — no manual README audit needed.

## 2026-03-31 — Missing visuals marked in lesson README

**Decision**: When Teacher_Plan references visual assets (images, diagrams, illustrations) that don't exist as files in the lesson folder, the lesson README gets a "Trūkstamos vaizdinės medžiagos" section after "Papildomi ištekliai". Each missing visual is listed with the phase it's needed in and a suggested source (Canva, Pixabay, SVG).

**Context**: Lesson 003 Teacher_Plan had two projection instructions ("parodykite phishing laiško pavyzdį", "parodykite algoritmo schemą") but the Visual_Aid contained neither. The existing "REIKALINGOS PAPILDOMOS MEDŽIAGOS" section in Teacher_Plans flags visuals at generation time, but this information is buried inside the .docx and not visible in the README's file overview.

**Rationale**: The README is the lesson's status dashboard. Missing visuals should be visible there, not just inside the Teacher_Plan. This complements the Teacher_Plan flagging (which explains what's needed) with README-level tracking (which makes it visible during module reviews and end-session scans).

## 2026-03-31 — Mechanical post-gen em dash strip in all generation skills

**Decision**: All 7 generation skills now include a mandatory `strip_em_dashes_from_docx()` Python function that runs on the saved .docx file AFTER generation, as a separate post-processing step. This is independent of the in-script `noEmDash` helper. Two-layer defense: the LLM's in-script helper catches most em dashes during generation; the file-level strip catches the rest.

**Context**: Despite the 2026-03-30 decision adding `noEmDash` to all skills, em dashes persisted in lessons 005, 006, and 007 Teacher_Plans. Root cause: the helper is prompt-level (an instruction in SKILL.md telling the LLM to include it), not code-level. The LLM either forgot to include it, or the files were generated before the helper was added and never regenerated.

**Rationale**: Prompt-level enforcement of formatting rules is structurally unreliable. The file-level strip is deterministic: it opens the .docx zip, replaces U+2014 in document.xml, and repackages. It costs nothing and cannot be forgotten because it's a mandatory step in the skill pipeline.

## 2026-03-31 — P lesson Teacher_Plans must reference Practice_Task

**Decision**: lesson-plan-gen Step 3b now includes a Practice_Task.pdf coherence check for P lessons. The plan must explicitly reference Practice_Task.pdf, explain when it's distributed, how students work with it, and allocate timeline. The plan's in-class questions must match Practice_Task content, not be an independent parallel set. practice-task-gen also now warns the teacher if a Teacher_Plan exists but doesn't reference Practice_Task.

**Context**: Lesson 006 Teacher_Plan had 6 oral questions + 3 scenarios. Practice_Task.pdf had 10 completely different questions. Zero overlap. The plan never mentioned Practice_Task. A teacher would have two disconnected question sets with no guidance. Root cause: the two files were generated by different skills (lesson-plan-gen, practice-task-gen) at different times with no cross-reference.

**Rationale**: P lessons exist to prepare students for assessment using the Practice_Task. The Teacher_Plan is the facilitation guide for that task, not a competing activity. Forcing the plan to reference and align with Practice_Task prevents disconnected content.

## 2026-03-31 — Delegate multi-step generation to agents

**Decision**: CLAUDE.md rule 5 — each file requiring a multi-step pipeline (generate, convert, verify) must be dispatched to a dedicated agent with a clean context window. The orchestrating session handles sequencing and decisions; agents handle complete single-file pipelines.

**Context**: QA issue m-03 — lesson 005 Visual_Aid was generated as .docx but never converted to PDF. The conversion step (Step 5b) was silently skipped during a busy fix session handling 8+ issues. Root cause analysis showed that instruction-following degrades over long sessions with accumulated context. Adding "mandatory" labels to skill steps does not fix attention degradation.

**Rationale**: An agent with one job and a fresh context window has no reason to skip steps. The only proven fix for attention degradation is context isolation. This principle was validated by comparing which safeguards work (mechanical code-level fixes like em dash strip) vs. which don't (instruction-level "don't forget" steps).

## 2026-03-31 — Reconcile on lesson completion

**Decision**: CLAUDE.md rule 6 — after generating any file, check the lesson README file table. If all files now show ✅, run a cross-document consistency check comparing key claims (numbers, terminology, rules, scenarios) across all lesson files. The most research-backed source wins (Theory_Pack > Teacher_Plan for factual claims).

**Context**: QA issues m-07 (break interval: "45–50 min" vs "kas valandą") and m-08 (terminology: "vaizduoklis" vs "ekranas") — both caused by documents generated at different times with no backward reconciliation. Skills have forward-only cross-checks that verify against existing sibling files, but never go back to update earlier files when later files find better sources.

**Rationale**: Documents are generated sequentially, often across sessions. The first file makes claims from general knowledge; later files do source research and find authoritative figures. Without reconciliation, divergence is guaranteed. The README file table already tracks completion — using it as the trigger is zero-cost.

## 2026-03-31 — Straight double quotes only

**Decision**: All generated content uses straight double quotes "..." exclusively. Lithuanian lower-upper „..." quotation marks are no longer required. No guillemets. CLAUDE.md updated.

**Context**: QA issue m-06 — Theory_Pack had straight quotes instead of Lithuanian „..." format. Root cause: no mechanical quote replacement existed (unlike em dashes), and the LLM defaults to straight quotes. The `\u201E`/`\u201C` escape requirement added complexity to every generation skill's encoding rules for zero pedagogical benefit.

**Rationale**: Straight quotes are what LLMs produce naturally. Requiring Lithuanian quotes created a failure mode with no upside — no student or teacher would notice or care about quote style. Eliminating the requirement removes escape complexity from all generation skills and closes an entire category of QA findings.

## 2026-04-01 — "Ekranas" as default term, "vaizduoklis" only in vocabulary tables

**Decision**: Generated content uses "ekranas" (and its declensions) in all running text. "Vaizduoklis" appears only in vocabulary/glossary tables where formal VLKK terms are introduced alongside the natural equivalent. The curriculum reference file (`informatika_programa.md`) is annotated with "(ekrano)" next to "vaizduoklio" so generation skills see both terms at the source.

**Context**: QA issue m-08 — Theory_Pack introduced "Vaizduoklis" as a key term and used "vaizduoklio" in running text (HN 32:2004 reference). Student_Task and Visual_Aid used "ekranas" exclusively. Root cause: each skill independently chose terms based on whatever source it read. The curriculum reference used the formal term, so theory-pack-gen adopted it; other skills used natural language.

**Rationale**: Grade 9 students need to recognize "vaizduoklis" (it may appear on exams) but shouldn't be forced to use it in daily materials. The vocabulary table already bridges the terms ("Vaizduoklis — Kompiuterio ekranas, kuriame rodomas vaizdas"). Annotating the source file is zero-cost prevention — no per-generation overhead, no glossary files, no mechanical replacement. Module-qa catches recurrence if it happens.

## 2026-04-01 — End-session propagates decisions/lessons to affected skills via agents

**Decision**: end-session Step 4d added. After confirming decisions and lessons, the skill identifies affected generation skills and dispatches two agents: (1) Updater agent — reads each affected skill, encodes the new rule, removes contradictory old rules; (2) Verifier agent — checks every affected skill and its reference files, confirms the rule is present and no contradictions remain. The orchestrator reviews the verifier report and fixes stragglers. If agents fail, pending updates are logged in status.md for the next session.

**Context**: Audit on 2026-04-01 found that 5 of 8 generation skills didn't read tasks/lessons.md, the straight quotes decision (2026-03-31) was contradicted by 7 skills + 2 reference files, and module-qa's subagent would flag the correct behavior as an error. Root cause: decisions were logged but never propagated to affected skills. There was no step in the workflow that said "after confirming a rule, go update the skills."

**Rationale**: Agents with fresh context windows reliably execute mechanical tasks (proven by em dash strip, file generation). The updater-verifier pattern catches mistakes the updater makes. The orchestrator's role is review, not execution — avoiding the attention degradation that caused the problem in the first place. Fallback to status.md ensures nothing is silently lost if agents fail.

## 2026-04-01 — Project-specific skills live only in repo, not global

**Decision**: All IT curriculum skills removed from `~/.claude/skills/` (global/personal). They now exist only in `.claude/skills/` (project/repo). Only truly cross-project skills (like context7-mcp) remain in global. Supersedes the 2026-03-28 decision "Assessment-task-gen skill packaged in repo" which said both locations should be kept in sync.

**Context**: Claude Code skill resolution: personal (`~/.claude/skills/`) beats project (`.claude/skills/`). For 10+ days, every skill update made to the repo copy was silently ignored — Claude Code loaded the stale global copies instead. 8 of 9 shared skills had diverged, student-task-gen by 803 lines. All improvements (lessons.md reading, quote rule fix, coherence checks, em dash strips, module design gate) were in project files that were never loaded.

**Rationale**: (1) These skills are useless outside this repo — they reference repo-specific paths. (2) The repo copy is version-controlled and maintained; the global copy was never updated after initial creation. (3) Keeping both in sync was stated as a requirement but never actually done. (4) One source of truth eliminates the sync problem entirely.

## 2026-04-01 — lt-qa demoted from dependency skill to standalone tool

**Decision**: lt-qa is no longer invoked by other skills. It was a checklist pretending to be a skill — its only function was telling the LLM "read these files." All 8 generation skills now read `lt-qa/lt-mistakes.yaml` directly: CRITICAL section (top ~15 entries) at Step 0 before generation, full file at POST-GEN for sidecar verification. lt-qa survives as a standalone text review tool (triggered by "patikrink lietuviškai" etc.).

**Context**: lt-qa had a two-hop dependency chain: skill says "run lt-qa Phase 1" → LLM reads lt-qa SKILL.md → lt-qa says "read lt-mistakes.yaml." Under attention pressure, hop 2 got skipped — the LLM "ran Phase 1" from memory without actually reading the yaml. The yaml is also restructured: CRITICAL section at top (~15 high-frequency patterns, cheap to load), FULL LIBRARY below (complete archive, used only in POST-GEN verification).

**Rationale**: (1) No skill should call another skill just to read a file — that's indirection with no benefit. (2) Direct file reads are one hop instead of two. (3) The CRITICAL/FULL split keeps PRE-GEN context cost low (~15 entries vs 266 lines). (4) POST-GEN scans the full file against the sidecar text, where context cost doesn't matter. (5) Standalone mode preserved for ad-hoc text review — that's a legitimate use case.

## 2026-04-01 — DOCX as canonical output for all editable documents (reverses 2026-03-28 PDF decision)

**Decision**: All document outputs are now DOCX. Only Visual_Aid stays PDF (projection-only, no manual edits needed). Assessment_Task stays XLSX (Testmoz import format). This reverses the 2026-03-28 decision "Student-facing files output as PDF" and the 2026-03-28 decision "Assessment files output as PDF + XLSX" (for Rubric and Answer_Key).

| File type | Old format | New format |
|-----------|-----------|------------|
| Student_Task | .pdf | .docx |
| Theory_Pack | .pdf | .docx |
| Practice_Task | .pdf | .docx |
| Answer_Key | .pdf | .docx |
| Rubric | .pdf | .docx |
| Visual_Aid | .pdf | .pdf (unchanged) |
| Teacher_Plan | .docx | .docx (unchanged) |
| Assessment_Task | .xlsx | .xlsx (unchanged) |

**Context**: Teacher found that PDF output creates a costly maintenance loop: any minor mistake or preference change requires a full token-burning regeneration cycle, which risks introducing new errors. DOCX files can be edited manually in Word in seconds.

**Rationale**: The original PDF rationale (students can't edit, consistent rendering) doesn't outweigh the maintenance cost. Teachers distribute materials via Google Classroom where file editing is controlled by sharing permissions, not file format. The third format change in 10 days, but this time the reasoning addresses the actual pain point (editability for corrections) rather than aesthetics.

## 2026-04-01 — lt-mistakes.yaml canonical location is _references/

**Decision**: lt-mistakes.yaml moved from `lt-qa/` to `_references/`. The `lt-qa/` data folder at repo root is deleted. All 8 generation skills and lt-qa standalone skill now reference `_references/lt-mistakes.yaml`. This is the single source of truth for the Lithuanian mistake library.

**Context**: lt-qa was demoted to standalone tool (2026-04-01). The yaml file logically belongs with other reference materials (`informatika_programa.md`, VBE docs) in `_references/`. The `lt-qa/` folder held only this one file after `seed-mistakes.yaml` was deleted as redundant.

**Rationale**: Consolidating reference materials in one folder. The lt-qa skill definition still lives at `.claude/skills/lt-qa/` — only the data file moved.

## 2026-04-01 — _scripts/ folder permanently banned

**Decision**: The `_scripts/` folder and its contents are permanently deleted. The 2026-03-30 decision "No generation scripts in repo" is now enforced at the structural level — the folder itself no longer exists, not just the files within it. `package.json` at repo root also removed. `.gitignore` already blocks `node_modules/` and `package-lock.json`.

**Context**: 17 generation scripts and `package.json` persisted in `_scripts/` for 2 days after the ban decision was logged. The folder's existence invited reuse. Root-level `package.json` implied the repo is a Node project.

**Rationale**: Deleting the folder itself prevents drift. Generation scripts are ephemeral session artifacts — run them, keep the output, discard the script. If npm packages are needed for a one-off generation, install them transiently and clean up.

## 2026-04-01 — end-session skill split into Phase 1 (agent) / Phase 2 (orchestrator)

**Decision**: The end-session skill now runs in two phases with a clean boundary at "disk vs. session context". Phase 1 dispatches a clean-context agent to run Steps 0–3 (mechanical filesystem work: read context files, scan lesson READMEs, update module READMEs, rewrite status.md). Phase 2 runs in the orchestrating session to execute Steps 1g, 4, and 5 (judgment work requiring conversation history). The boundary is enforced three ways: scope instruction at agent prompt top, imperative `AGENT: STOP HERE` marker between Steps 1f/1g, and `AGENT STOP POINT` at end of Step 3. The agent returns a structured Agent Return Contract; the orchestrator validates it before proceeding.

**Context**: The previous design dispatched all 5 steps to a single agent. Step 4 (propose decisions/lessons) requires knowing what the teacher said, what was corrected, what format choices were made — context the agent never had. Passing a session summary to the agent is lossy and expensive; the orchestrator already has the full context for free.

**Rationale**: Mechanical steps benefit from clean context (no attention degradation on repetitive file scanning). Judgment steps require session context (decisions and lessons can only be identified from the conversation, not from disk state). Splitting on this boundary gives each phase the right executor for its work type. Three enforcement layers ensure the agent cannot accidentally execute Phase 2 steps.
