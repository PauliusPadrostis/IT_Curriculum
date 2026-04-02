---
name: canva-visual-pack-gen
description: >
  Generate Canva-ready visual aid production packs for the IT Curriculum repo
  (PauliusPadrostis/IT_Curriculum). Use when the teacher wants mass-generated
  Visual_Aid materials through Canva Pro templates instead of direct docx/pdf
  slide generation. Produces a stable schema-driven package such as
  `canva_rows.csv`, `visual_spec.json`, `asset_prompts.md`, and
  `export_checklist.md` for L and I lessons. Also triggers on requests about
  Canva bulk generation, locked visual templates, batch visual aids, Canva data
  contracts, or replacing `visual-aid-gen` with a Canva workflow.
---

# Canva Visual Pack Generator

Generate a Canva-ready production pack for one lesson or a lesson batch. Do
not automate the Canva UI. The stable boundary is:

1. Codex decides the slide mix and writes structured data.
2. Canva renders that data through locked templates.
3. The teacher performs a short visual QA pass and exports PDF.

This skill is for scale and consistency. It replaces ad-hoc visual design with
a deterministic contract between lesson content and Canva templates.

## Step 0: Read the contract

Always read these files before producing a pack:

1. `references/contract.md`
2. `references/schema.md`
3. `references/template-set.md`
4. `tasks/lessons.md`

If any of these files conflict, `contract.md` wins, then `schema.md`, then
`template-set.md`, then older skill assumptions.

## Core rules

- Do not generate the final `Visual_Aid.pdf` directly.
- Do not click through Canva or rely on brittle UI automation.
- Use only the approved template archetypes from the contract.
- Visible student-facing text must never leak repo naming such as `001_L`,
  `Practice_Task`, or `Theory_Pack`.
- Internal metadata fields may contain stable IDs such as `lesson_id`.
- For the pilot, allow **5-7 slides per lesson**. Do not force a fixed 6-slide
  shape if the lesson needs a stronger projection sequence.

## Inputs to read

Read sources in this order:

1. `Teacher_Plan.docx`
2. Lesson `README.md`
3. Module `README.md`
4. `Student_Task.docx` if present
5. `Theory_Pack.docx` if present

If `Teacher_Plan.docx` is missing, stop and tell the teacher the Canva pack
cannot be generated yet.

## What the skill must decide

Before writing any output, identify the lesson's projection-critical content:

- what the teacher must actually show on screen;
- which comparison, process, or worked example would unblock the live lesson;
- which content is too important to leave buried inside `Teacher_Plan.docx`;
- which generic slide should be dropped to make room for a stronger visual.

Do not blindly mirror the old `visual-aid-gen` sequence.

## Output package

Produce these files in the lesson folder, or in a batch output folder for a
module run:

- `canva_rows.csv`
- `visual_spec.json`
- `asset_prompts.md`
- `export_checklist.md`

### `canva_rows.csv`

One row per slide. Follow `references/schema.md` exactly. Every row must target
one template archetype and only use shared placeholder names.

### `visual_spec.json`

Structured record of:

- lesson metadata
- selected slide count
- per-slide purpose
- why each slide exists
- which source file sections drove the choice
- which visuals are mandatory vs optional

### `asset_prompts.md`

List only the visuals that are still missing from the reusable asset library.
Prefer reusable diagrams over one-off decorative prompts.

### `export_checklist.md`

Short final QA list for Canva export. Focus on:

- overflow
- missing visuals
- placeholder mismatch
- broken Lithuanian
- accidental repo naming in visible text

## Slide selection workflow

1. Extract retrieval questions, objectives, task, and core teaching content.
2. Identify the live-teaching bottleneck.
3. Choose a slide mix from the approved archetypes.
4. Prefer `process`, `comparison`, and `scenario` slides over generic summary
   slides when the teacher needs a visual explanation.
5. Keep total slides between 5 and 7 during the pilot.
6. Write the CSV rows and the sidecar spec files.

## Batch workflow

For a module batch:

1. Read the module README.
2. Filter to L and I lessons with `Teacher_Plan.docx`.
3. Process in sequence order.
4. Reuse terminology and visual patterns across the module.
5. Report which lessons fit the contract cleanly and which need custom assets.

## Quality gates

Before finishing:

- verify every CSV row uses a valid `template_type`;
- verify all visible fields use only shared placeholders from the contract;
- verify no slide exceeds the pilot's 5-7 slide limit;
- verify visible Lithuanian text avoids repo naming leaks;
- verify every `must_show=true` slide corresponds to real teaching need, not a
  generic filler block.
