# Canva Visual Aid Contract

This document defines the stable boundary between Codex output and Canva
rendering. The purpose is to keep batch generation reliable.

## Contract boundary

Codex is responsible for:

- deciding the slide mix;
- choosing the correct archetype per slide;
- writing the exact visible text;
- identifying projection-critical content;
- marking required visuals;
- writing stable structured data files.

Canva is responsible for:

- applying typography and color;
- placing content into locked layouts;
- rendering visuals through reusable templates;
- exporting final PDF.

Do not cross this boundary with UI automation.

## Pilot decision

For the first production version, allow **5-7 slides per lesson**.

Reason:

- the old fixed 6-slide model was too rigid;
- some lessons need an extra process or scenario slide;
- some lessons do not need both a generic intro and a generic closing content
  block.

This is a controlled flexibility window, not open-ended slide count.

## Approved slide archetypes

Use only these 5 archetypes:

1. `title`
2. `questions`
3. `process`
4. `comparison`
5. `scenario`

### 1. `title`

Use for the opening slide only.

Purpose:

- establish lesson title;
- anchor module identity;
- set the visual tone.

### 2. `questions`

Use for start or end retrieval.

Purpose:

- display 3-5 short questions;
- keep the teacher from reading out of the plan;
- provide a clean list with no extra explanation.

### 3. `process`

Use for algorithms, sequences, and "how it works" visuals.

Examples:

- 2FA flow
- phishing response logic
- workstation setup steps
- safe action sequence

### 4. `comparison`

Use when the lesson is best explained by contrast.

Examples:

- safe vs unsafe
- strong vs weak password
- negative vs positive environmental impact
- correct vs incorrect setup

### 5. `scenario`

Use for one worked example or a teacher-led analysis card.

Examples:

- phishing message breakdown
- demo scenario before rotation task
- analyzed classroom case

## Required contract properties

- Every slide row maps to one approved archetype.
- Every Canva template uses the same shared placeholder names.
- Visible text must stay student-safe and teacher-usable.
- Internal metadata can be richer than visible text.
- A lesson can reuse the same archetype more than once.
- `must_show=true` means the slide exists because the lesson would be weaker
  without that projection aid.

## What not to do

- Do not recreate the old "title -> questions -> goals -> task -> terms ->
  closing questions" sequence by default.
- Do not add decorative slides with no teaching job.
- Do not use a unique layout for every lesson.
- Do not let template-specific placeholder names drift.
