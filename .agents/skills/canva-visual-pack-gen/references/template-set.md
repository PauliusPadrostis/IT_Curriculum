# Canva Template Set

This document defines the first template family for the Canva visual aid
pipeline. Keep the set intentionally small.

## Shared styling principles

- High contrast
- Large type for projection
- Minimal decoration
- Consistent spacing
- Locked brand tokens per module family

The template system should feel deliberate, not generic, but still stay stable
under batch population.

## Template 1: `VA-Title`

Maps from `template_type=title`.

Purpose:

- open the lesson cleanly;
- show module and lesson identity;
- carry a strong visual anchor without clutter.

Visible fields:

- `slide_title`
- `slide_subtitle`

Recommended content:

- `slide_title`: lesson title
- `slide_subtitle`: module name or short module line

## Template 2: `VA-Questions`

Maps from `template_type=questions`.

Purpose:

- show retrieval questions;
- support either lesson opening or lesson closing;
- keep the teacher off the laptop plan view.

Visible fields:

- `slide_title`
- `main_text`
- `callout_1`

Recommended content:

- `slide_title`: "Pamokos pradzios klausimai" or "Pamokos pabaigos klausimai"
- `main_text`: numbered or bulleted questions
- `callout_1`: optional short label such as `3 klausimai`

## Template 3: `VA-Process`

Maps from `template_type=process`.

Purpose:

- explain sequence or logic;
- visualize steps instead of leaving them as spoken prose.

Visible fields:

- `slide_title`
- `slide_subtitle`
- `left_title`
- `left_text`
- `right_title`
- `right_text`
- `callout_1`
- `callout_2`

Recommended uses:

- use left/right groups as paired steps, or repeatable blocks in the same
  layout system;
- place the process diagram or arrows as a reusable visual asset layer.

## Template 4: `VA-Comparison`

Maps from `template_type=comparison`.

Purpose:

- teach through contrast;
- show two-column distinctions cleanly.

Visible fields:

- `slide_title`
- `slide_subtitle`
- `left_title`
- `left_text`
- `right_title`
- `right_text`
- `callout_1`
- `callout_2`

Recommended uses:

- safe vs unsafe
- strong vs weak
- negative vs positive impact
- correct vs incorrect setup

## Template 5: `VA-Scenario`

Maps from `template_type=scenario`.

Purpose:

- show one worked example;
- support teacher-led modeling before independent work.

Visible fields:

- `slide_title`
- `slide_subtitle`
- `main_text`
- `left_title`
- `left_text`
- `right_title`
- `right_text`
- `callout_1`

Recommended uses:

- phishing example breakdown
- scenario setup vs recommended action
- evidence vs conclusion

## Template rules

- Every template must preserve the exact shared placeholder names from
  `schema.md`.
- Templates can hide unused placeholders visually, but must not rename them.
- The teacher should be able to look at the design set and know instantly which
  template to use for each row type.
- Do not add a sixth template during the pilot unless a real lesson cannot be
  represented cleanly with the first five.
