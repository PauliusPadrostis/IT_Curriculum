# Canva Rows Schema

`canva_rows.csv` contains one row per slide.

## Required fields

| Field | Required | Description |
|-------|----------|-------------|
| `lesson_id` | yes | Stable internal ID, e.g. `G9-S1-M01-003` |
| `lesson_folder` | yes | Folder name on disk |
| `grade` | yes | Grade number as text |
| `module_name` | yes | Visible module/topic family label |
| `lesson_title_lt` | yes | Full Lithuanian lesson title |
| `slide_no` | yes | 1-based slide index |
| `template_type` | yes | One of `title`, `questions`, `process`, `comparison`, `scenario` |
| `slide_role` | yes | Functional role such as `title`, `start_questions`, `core_process`, `worked_example`, `end_questions` |
| `slide_title` | yes | Main visible heading |
| `slide_subtitle` | no | Optional supporting heading |
| `main_text` | no | Main paragraph or list body |
| `left_title` | no | Left column/card heading |
| `left_text` | no | Left column/card body |
| `right_title` | no | Right column/card heading |
| `right_text` | no | Right column/card body |
| `callout_1` | no | Short highlight label |
| `callout_2` | no | Short highlight label |
| `visual_kind` | yes | One of `diagram`, `icon-grid`, `comparison-cards`, `scenario-card`, `none` |
| `visual_prompt` | no | Short instruction for the visual element or asset choice |
| `must_show` | yes | `true` or `false` |
| `source_refs` | yes | Short source trace such as `Teacher_Plan: Teaching phase; Student_Task: Task section` |
| `notes_for_export` | no | Final human QA reminder |

## Shared placeholder names

Every Canva master template must expose these exact names:

- `slide_title`
- `slide_subtitle`
- `main_text`
- `left_title`
- `left_text`
- `right_title`
- `right_text`
- `callout_1`
- `callout_2`

Do not invent template-local alternatives.

## Field usage rules

### `lesson_id`

Internal only. Never expose it in visible student-facing text.

### `template_type`

Must match one approved archetype exactly.

### `slide_role`

More specific than `template_type`. Used for orchestration and QA.

Examples:

- `title`
- `start_questions`
- `goals`
- `core_process`
- `safe_vs_unsafe`
- `worked_example`
- `end_questions`

### `main_text`

Use for single-block content. Keep concise enough for projection.

### `left_*` and `right_*`

Use for process lanes, comparisons, or paired scenario views. Leave blank when
the selected template does not need them.

### `callout_*`

Use only for short labels, warnings, or tags. Never store long sentences here.

### `visual_kind`

Use these values:

- `diagram`
- `icon-grid`
- `comparison-cards`
- `scenario-card`
- `none`

### `must_show`

Set to `true` only when the slide supports a real teaching move the teacher was
expected to project.

### `source_refs`

Keep compact but concrete. This is for traceability, not prose.

Good:

- `Teacher_Plan: start questions`
- `Teacher_Plan: teaching phase; Theory_Pack: terminology`
- `Teacher_Plan: demo instruction; Student_Task: scenario 2`

Bad:

- `from plan`
- `lesson files`

## Slide count rule

Pilot runs must keep each lesson between **5 and 7 slides**.

## Example row shape

```csv
lesson_id,lesson_folder,grade,module_name,lesson_title_lt,slide_no,template_type,slide_role,slide_title,slide_subtitle,main_text,left_title,left_text,right_title,right_text,callout_1,callout_2,visual_kind,visual_prompt,must_show,source_refs,notes_for_export
G9-S1-M01-003,003_L - Online risks & safe response logic,9,Sauga,Internetines rizikos ir saugaus reagavimo logika,4,process,core_process,Saugus reagavimas,,Sustokite pries spausdami nuoroda.,SUSTOTI,Neskubeti ir nieko nespausti.,PATIKRINTI,Patikrinti siunteja ir priezasti.,Pranesti mokytojui,,diagram,3-step response flow,true,Teacher_Plan: teaching phase; README: visual aid note,Check arrow order and overflow
```
