# Programming – Insert/Delete, Files & Subprograms

**Grade:** Grade 11 (III gimnazijos klasė)
**Semester:** Semester 2
**Section:** Programming (continued)
**Status:** 🚧 WIP
**Nodes:** 18 topic nodes

---

## Overview

> *(Add a 2–3 sentence description of what this module covers and why it matters)*

---

## Learning Objectives

By the end of this module, students will be able to:

- [ ] *(objective 1)*
- [ ] *(objective 2)*
- [ ] *(objective 3)*

---

## Lesson Sequence

- [ ] L15–L17 (3) — Insert/delete operations in arrays (mechanics + correctness)
- [ ] I9–I12 (4) — Insert/delete + recomputation workflows
- [ ] L18–L20 (3) — Text Streams & Files (txt/csv) for Algorithm Tasks
- [ ] I13–I16 (4) — File-driven mini tasks (no “full app” yet)
- [ ] L21–L22 (2) — Subprograms: value vs address passing (exam-relevant)
- [ ] L1 (1) — Legal/ethical frame (what’s allowed, what isn’t, and why)
- [ ] L2 (1) — Account/device safety in “real school life”
- [ ] L3 (1) — Health & ergonomics (exam-recognition + habit formation)
- [ ] L4 (1) — Environmental impact + data-based forecasting
- [ ] I1 (1) — Case study pack

---

## Assessments & Practice

- [ ] P5–P6 (2) — Timed integrated mini-set (programming reasoning + light coding)
- [ ] A3 (1) — Insert/Delete Operations
- [ ] A4 (1) — Analytical assessment: VBE 1 style reasoning set + subprograms
- [ ] A1 (1) — Mixed-format assessment
- [ ] D1–D2 (2) — Timed VBE 1 data packet
- [ ] D3–D4 (2) — Error analysis + targeted redo
- [ ] D1–D2 (2) — Timed VBE 1 “programming cluster” packet
- [ ] D3–D4 (2) — Error analysis + targeted redo

---

## Detailed Node Specs

> Each node below contains the full completion definition, minimum evidence criteria,
> cognitive level (Bloom's), and binary readiness gate pulled directly from roadmap.sh.

<details>
<summary><strong>L15–L17 (3) — Insert/delete operations in arrays (mechanics + correctness)</strong></summary>

**Sub-topics**

- Deletion with shifting; insertion with shifting

- Maintaining logical length vs physical capacity (conceptual)

- Edge cases: delete first/last, insert at boundaries, duplicates

**Grade 11 anchor:** “šalinimas ir įterpimas”.

## 1️⃣ Completion Definition (Observable Capability)

Student can manually implement:

- Insert element at:

  - end

  - specific index

- Delete element at:

  - specific index

- Shift elements correctly to maintain contiguous structure

- Update logical size correctly

- Explain why shifting direction matters (left vs right shift)

Student demonstrates understanding of:

- Index stability

- Boundary conditions

- Order preservation

- Data loss risks if shift direction is wrong

No built-in insert/remove in this phase.

---

## 2️⃣ Minimum Evidence

Student independently writes programs that:

- Insert an element into an array at a given position using manual shifting

- Delete an element and shift remaining values correctly

- Maintain correct logical size after modification

- Handle boundary cases:

  - insert at index 0

  - insert at last index

  - delete first element

  - delete last element

Student provides a short written explanation (2–3 sentences) describing:

- Why the shift direction is chosen

- What would break if done in the opposite order

---

## 3️⃣ Cognitive Level

**Bloom:** Apply → Analyze

- Apply shifting mechanics correctly

- Analyze correctness of boundary conditions

---

## 4️⃣ Binary Readiness Gate

✔ All must be true:

- No element overwritten incorrectly during shift

- No index out-of-bounds errors

- Logical size updated correctly

- Edge cases handled correctly

- Explanation demonstrates understanding of shift direction

If any fail → not ready for recomputation workflows (I9–I12).

</details>

- **Formative check (mini-quiz)**
<details>
<summary><strong>I9–I12 (4) — Insert/delete + recomputation workflows</strong></summary>

- Modify array then recompute metrics
- Typical failure patterns intentionally triggered and corrected.
- 

## 1️⃣ Completion Definition (Observable Capability)

Student can execute a complete workflow that:

- Modifies an array (insert/delete/update) using correct mechanics

- Then recomputes required metrics from the updated array (full recompute)

- Produces correct, specification-matching output after each modification

- Identifies and corrects typical failure patterns when they appear

The point is reliability:

> “After changing the data, can you re-derive truth from it?”

Built-ins may be introduced here **only if** the student can explain what the built-in is doing conceptually (shift, size change, order effects).

---

## 2️⃣ Minimum Evidence

Student completes an independent task set that includes:

- At least **2 modifications** (e.g., insert then delete; delete then update)

- After each modification:

  - recompute at least **two metrics** (e.g., sum + conditional count; min + average; top-1 + range)

  - output updated metrics correctly

- At least **one intentionally “booby-trapped” scenario** where the student must detect + fix an error pattern (see below)

Evidence includes:

- working code

- before/after array states printed (or clearly logged)

- final outputs matching spec

---

## 3️⃣ Cognitive Level

**Bloom:** Apply → Analyze

- Apply modification + recomputation correctly

- Analyze mismatches between expected and actual results to locate the error pattern

---

## 4️⃣ Binary Readiness Gate

✔ All must be true:

- Array modification is correct (no lost/duplicated elements)

- Recomputed metrics match expected results after each change

- Student can correctly correct at least **one** typical failure pattern when triggered

- Output formatting consistent and spec-correct

If any fail → not ready for P5–P6 timed integrated mini-set.

</details>

<details>
<summary><strong>P5–P6 (2) — Timed integrated mini-set (programming reasoning + light coding)</strong></summary>

- One integrated task under time
- Marking emphasizes reasoning steps + correctness, not speed.

## 1️⃣ Completion Definition (Observable Capability)

Student can complete, under controlled time pressure, a full mini-workflow that:

- Reads or initializes structured array data

- Performs at least one modification (insert/delete/update)

- Recomputes required metrics

- Applies sort or search if required by the task

- Produces formatted output matching the specification exactly

Student demonstrates:

- Logical sequencing of operations

- Clear reasoning steps

- Stable index discipline

- Ability to maintain correctness under time pressure

This is not a speed race.\
It is a correctness-under-constraint exercise.

---

## 2️⃣ Minimum Evidence

Student completes one integrated task containing:

- Defined input dataset (provided)

- ≥1 modification operation

- ≥2 recomputed metrics

- ≥1 decision (e.g., must sort before searching, or justify not sorting)

- Structured final output

Submission must include:

- Final working code

- Short written reasoning notes (3–5 concise bullet points):

  - Why operation order was chosen

  - Why recomputation was necessary

  - Why chosen algorithm was valid

---

## 3️⃣ Cognitive Level

**Bloom:** Analyze → Evaluate

- Analyze task structure and determine correct workflow order

- Evaluate algorithm preconditions and correctness

---

## 4️⃣ Binary Readiness Gate

✔ All must be true:

- Modification correct (no index errors)

- Metrics correctly recomputed

- Algorithm choice logically justified

- Output matches specification exactly

- Reasoning notes logically consistent with implementation

If any fail → not ready for A3 (next practical assessment).

</details>

<details>
<summary><strong>A3 (1) — Insert/Delete Operations</strong></summary>

## 1️⃣ Completion Definition (Observable Capability)

Student independently completes a practical task where they must:

- Perform at least one **manual** array modification (insert or delete) correctly

- Recompute required metrics **after** the modification (full recompute)

- Produce output exactly matching a provided specification

- Demonstrate correct indexing discipline and correct logical size handling

This assessment targets correctness and workflow order:

> modify → recompute → report

---

## 2️⃣ Minimum Evidence

Student submits:

- Source code

- Output (console or file)

- The given input dataset (if provided)

- A brief comment header stating:

  - which modification operation was implemented

  - which metrics were recomputed

Task requirements:

- Array length ≥ 12 elements

- Must include at least:

  - one insert OR delete at a specified index

  - recompute **two** metrics (e.g., sum + conditional count; min + average)

- Must handle at least one edge case:

  - delete first/last

  - insert at index 0 or end

No scaffolds, no partially written loops.

---

## 3️⃣ Cognitive Level

**Bloom:** Apply → Analyze

- Apply correct modification mechanics

- Analyze and preserve correctness through recomputation and output rules

---

## 4️⃣ Binary Readiness Gate

✔ All must be true:

- Modification is correct (no lost/duplicated elements)

- Logical size correct after change

- Metrics correctly recomputed from updated array

- Output matches specification exactly

- No index out-of-bounds or runtime errors

If any fail → not ready for Mini-block 4 (file-driven mini tasks + subprograms).

</details>

<details>
<summary><strong>L18–L20 (3) — Text Streams & Files (txt/csv) for Algorithm Tasks</strong></summary>

**Sub-topics**

- Reading structured lines; tokenization/splitting

- Writing results back (format discipline)

- Mapping file structure → arrays/strings representation

**Grade 11 anchor:** “darbas su tekstinių duomenų srautais (.txt, .csv)”.\
\
1️⃣ Completion Definition (Observable Capability)

Student can independently:

- Open and read data from:

  - a `.txt` file (line-based structure)

  - a `.csv` file (delimiter-based structure)

- Parse data correctly into appropriate in-memory structures (arrays)

- Handle:

  - trimming whitespace

  - delimiter splitting

  - type conversion (string → int/float)

- Detect and safely handle malformed lines (skip, report, or validate)

Student understands the difference between:

- Line-based reading logic (txt)

- Delimiter-based parsing logic (csv)

- Header handling (if present)

No hardcoded fallback data.

---

## 2️⃣ Minimum Evidence

Student independently completes tasks that:

- Read at least one `.txt` file with ≥10 records

- Read at least one `.csv` file with ≥2 columns

- Correctly split csv fields using a delimiter

- Convert at least one numeric field properly

- Handle at least one malformed record gracefully

Student must include short header comment describing:

- How parsing is implemented

- How malformed lines are handled

---

## 3️⃣ Cognitive Level

**Bloom:** Apply → Analyze

- Apply file-reading mechanics correctly

- Analyze input structure and adapt parsing strategy

---

## 4️⃣ Binary Readiness Gate

✔ All must be true:

- File opened and read correctly (no hardcoded arrays)

- CSV fields split correctly (no off-by-one field errors)

- Numeric conversion correct

- Malformed lines handled explicitly (not crash)

- Data correctly stored for later processing

If any fail → not ready for file-driven integration tasks (I13–I16).

</details>

- **Formative check (mini-quiz)**
<details>
<summary><strong>I13–I16 (4) — File-driven mini tasks (no “full app” yet)</strong></summary>

- Read .txt/.csv → build arrays → sort/search/aggregate → output
- Output format correctness enforced. 

## 1️⃣ Completion Definition (Observable Capability)

Student can complete an end-to-end workflow that:

- Reads data from a `.txt` or `.csv` file

- Parses it into array structures correctly

- Performs at least one of the following processing operations:

  - sort

  - search

  - aggregate (sum/count/min/max/conditional)

  - or a chained combination (sort + search, filter + aggregate)

- Produces output that matches a specification **exactly** (format, ordering, labels)

These are algorithm tasks, not software products:

- No UI design

- No multi-module “app” structure

- Focus: correctness pipeline under constraints

---

## 2️⃣ Minimum Evidence

Student independently completes at least one mini-task that includes:

- Input: `.txt` or `.csv` (≥10 records)

- Processing:

  - at least **one sort/search**, and

  - at least **one aggregate**

- Output:

  - structured format (e.g., header + lines, or specified print schema)

  - correct order (as required)

  - exact formatting compliance

Evidence submission:

- code

- input file

- output (console capture or output file)

No scaffolds. No partially provided parsing logic.

---

## 3️⃣ Cognitive Level

**Bloom:** Apply → Analyze

- Apply file parsing and processing correctly

- Analyze specification constraints (ordering, formatting, preconditions)

---

## 4️⃣ Binary Readiness Gate

✔ All must be true:

- Correct parsing (no field misalignment, correct numeric conversion)

- Processing logic correct (sort/search/aggregate correct on provided dataset)

- Output matches specification exactly (format + ordering)

- Handles at least one irregular record without crashing

- No hardcoded outputs or hardcoded record counts

If any fail → not ready for Subprograms (L21–L22) and final analytical assessment (A4).

</details>

<details>
<summary><strong>L21–L22 (2) — Subprograms: value vs address passing (exam-relevant)</strong></summary>

**Sub-topics**

- When function returns value vs modifies via parameter

- Designing clean function contracts (input/output responsibility)

- Reading code where passing mode matters (reasoning focus)

**Grade 11 anchor:** “paprogramės su reikšmių ir adresų perdavimu”.\
\
1️⃣ Completion Definition (Observable Capability)

Student can, in C++:

- Write functions with clean contracts using:

  - **return values** for produced results, and

  - **reference parameters** (`&`) for intentional modification

- Explain, for a given function, which data is:

  - input-only,

  - output-only,

  - input-output

- Read a code snippet and determine whether a variable will be modified after a function call based on the signature (value vs reference)

- Choose between:

  - returning a value

  - modifying via parameter\
    based on clarity and correctness

Student demonstrates “contract thinking”:

> who owns the change, and where is the output declared?

---

## 2️⃣ Minimum Evidence

Student independently completes tasks that include:

- Writing **two functions** for the same problem:

  1. one that returns the computed result by value

  2. one that modifies result through a reference parameter

- Annotating each function with a short contract comment:

  - inputs

  - outputs

  - side effects (if any)

- Answering short reasoning questions:

  - “Does this call modify `x`? Why?”

  - “Which signature is safer/clearer here? Why?”

At least one task must involve an **array/vector passed to a function**, requiring clarity about whether it is modified.

---

## 3️⃣ Cognitive Level

**Bloom:** Analyze → Evaluate

- Analyze effects of passing mode by reading signatures and calls

- Evaluate function contract design choices (clarity, side effects, correctness)

---

## 4️⃣ Binary Readiness Gate

✔ All must be true:

- Correctly predicts when variables change after calls (value vs reference)

- Writes correct function signatures matching intended behavior

- Contract comments correctly reflect reality (no “lies”)

- Uses return vs reference intentionally (not randomly)

- No unintended side effects in tasks that should be pure

If any fail → not ready for A4.

</details>

- **Formative check (mini-quiz)**
<details>
<summary><strong>A4 (1) — Analytical assessment: VBE 1 style reasoning set + subprograms</strong></summary>

- Code tracing + algorithm interpretation + short answers
- Focus: explain/justify, not just run.\
  \
  1️⃣ Completion Definition (Observable Capability)

  Student independently completes an analytical assessment demonstrating:

  **A) Function contract reasoning (C++)**
  - Predicts program behavior based on function signatures

  - Distinguishes return-by-value vs modify-by-reference effects

  - Identifies side effects and contract violations

  - Traces state changes across calls

  **B) File parsing + algorithm workflow reasoning**
  - Reads a short file-parsing snippet (txt/csv)

  - Predicts array state after parsing

  - Identifies parsing/format risks (field split, conversion, boundary)

  - Justifies correct processing order (parse → process → output spec)

  Student responses must be short-answer, exam style.

  ---

  ## 2️⃣ Minimum Evidence

  Timed assessment packet includes:

  ### Part A — Functions (major component)
  - ≥2 questions: “Will variable X change after call? Why?” (signature-based)

  - ≥1 tracing question involving reference parameters and array/vector passed into a function

  - ≥1 “choose the cleaner contract” item (return vs reference) with 1–2 sentence justification

  ### Part B — File workflow reasoning
  - ≥1 parsing trace question (csv split + numeric conversion)

  - ≥1 identify-error-type question (e.g., delimiter issue, header handling, conversion failure)

  - ≥1 workflow ordering justification (parse → validate → compute → output spec)

  No coding required beyond filling small missing fragments (optional and short, if present).\
  No scaffolding.

  ---

  ## 3️⃣ Cognitive Level

  **Bloom:** Analyze → Evaluate
  - Analyze state changes and parsing logic

  - Evaluate contract clarity and workflow correctness

  ---

  ## 4️⃣ Binary Readiness Gate

  ✔ All must be true:
  - Correctly predicts side effects from pass-by-reference vs value

  - Tracing is consistent (no missing state transitions)

  - Correctly identifies at least one real parsing/format risk

  - Workflow reasoning matches specification discipline

  - Short-answer responses are concise and logically correct

  If any fail → student not ready for Grade 11 end-of-year drill cluster / Grade 12 transition expectations.

</details>

<details>
<summary><strong>L1 (1) — Legal/ethical frame (what’s allowed, what isn’t, and why)</strong></summary>

Copyright/licensing basics, personal data, consent logic.\
\
Completion Definition\
Student can distinguish between legal violations, ethical violations, and acceptable digital behavior, and can explain why specific actions are restricted in school and public digital environments.

Minimum Evidence\
Given 5 short scenarios, student correctly classifies each as legal violation, ethical issue, or acceptable behavior, with justification referencing rules or principles (not opinion).

Bloom\
Understand → Analyze

Binary Readiness Gate\
Can the student justify decisions using rule-based reasoning rather than personal belief? Yes/No

</details>

<details>
<summary><strong>L2 (1) — Account/device safety in “real school life”</strong></summary>

Threat models: phishing, credential reuse, 2FA, safe sharing.\
\
1️⃣ Completion Definition\
Student can identify common real-world account and device risks in school contexts (shared devices, weak passwords, unattended sessions, unsafe downloads, phishing in school email, removable media misuse) and propose concrete preventive behaviors.

2️⃣ Minimum Evidence\
Given 5 realistic school-based scenarios, student identifies the primary risk in each and proposes at least one specific preventive measure that directly addresses that risk.

3️⃣ Bloom\
Apply → Analyze

4️⃣ Binary Readiness Gate\
Can the student connect a concrete behavior (e.g., enable MFA, lock screen, verify sender domain) directly to the specific vulnerability described in the scenario?\
Yes → Ready for L3\
No → Reinforce threat–mitigation linkage

</details>

<details>
<summary><strong>L3 (1) — Health & ergonomics (exam-recognition + habit formation)</strong></summary>

Work-rest cycles, posture, eye strain prevention; risk identification.\
\
1️⃣ Completion Definition\
Student can identify unhealthy computer use patterns (posture, screen distance, lighting, break cycles, repetitive strain risk) and explain both short-term and long-term consequences. Student can also recognize how such topics may appear in exam-style recognition tasks.

2️⃣ Minimum Evidence\
Given a workstation image and 4 short behavior descriptions, student identifies at least 4 concrete ergonomic issues and proposes specific corrections (e.g., monitor height adjustment, 20-20-20 rule, chair positioning, wrist alignment).

3️⃣ Bloom\
Understand → Apply

4️⃣ Binary Readiness Gate\
Can the student move beyond generic advice (“sit properly”) and name specific biomechanical adjustments or behavioral routines?\
Yes → Ready for L4\
No → Reinforce specificity and applied correction logic

</details>

<details>
<summary><strong>L4 (1) — Environmental impact + data-based forecasting</strong></summary>

What can be measured; what conclusions are valid; avoiding false certainty.\
\
1️⃣ Completion Definition\
Student can explain how digital technologies impact the environment (energy consumption, e-waste, data center load, device lifecycle) and can interpret simple data trends to make a basic forecast or sustainability recommendation.

2️⃣ Minimum Evidence\
Given a small dataset or chart (e.g., device usage growth, energy consumption trend), student identifies the trend direction, explains one environmental implication, and proposes one evidence-based action (e.g., device lifecycle extension, energy-saving policy).

3️⃣ Bloom\
Analyze → Evaluate

4️⃣ Binary Readiness Gate\
Can the student use the provided data trend to justify a forecast or recommendation rather than making a general sustainability statement?\
Yes → Ready for I1\
No → Reinforce data-to-conclusion reasoning

</details>

- **Formative check (mini-quiz)**
<details>
<summary><strong>I1 (1) — Case study pack</strong></summary>

3 short cases: legal/ethics + safety response + environment claim evaluation.\
\
1️⃣ Completion Definition\
Student analyzes a multi-factor safety case combining legal/ethical judgment, account/device risk, health considerations, and environmental impact, and produces a structured response identifying issues and prioritizing actions.

2️⃣ Minimum Evidence\
Given a structured case packet (short narrative + data snippet + policy excerpt), student:\
Identifies at least 3 distinct issue types (e.g., legal, security, ergonomic, environmental)\
Explains risk or consequence for each\
Proposes a prioritized action plan with justification

3️⃣ Bloom\
Analyze → Evaluate

4️⃣ Binary Readiness Gate\
Can the student integrate multiple safety dimensions in one coherent reasoning chain rather than treating each issue in isolation?\
Yes → Ready for A1\
No → Reinforce cross-dimension synthesis

</details>

<details>
<summary><strong>A1 (1) — Mixed-format assessment</strong></summary>

Identify violations, choose correct actions, short justification for one case.\
\
1️⃣ Completion Definition\
Student demonstrates independent competence across the Safety block by solving a mixed-format assessment: scenario classification (legal/ethical), applied security decisions (account/device), ergonomics recognition + correction, and data-based environmental reasoning.

2️⃣ Minimum Evidence\
Assessed submission includes:\
Correct classification with justification in legal/ethical items\
Correct risk identification + targeted mitigation in account/device items\
Accurate ergonomic issue recognition + concrete correction actions\
Interpretation of a simple dataset/chart leading to a defensible forecast or recommendation

3️⃣ Bloom\
Analyze → Evaluate

4️⃣ Binary Readiness Gate\
Does the student consistently justify answers with explicit reasoning (rules, threat–mitigation linkage, ergonomics specifics, data evidence) rather than unsupported claims?\
Yes → Pass Safety block\
No → Not sufficient

</details>

<details>
<summary><strong>D1–D2 (2) — Timed VBE 1 data packet</strong></summary>

High-density: identify best operation, interpret chart/table, choose correct sequence.

</details>

<details>
<summary><strong>D3–D4 (2) — Error analysis + targeted redo</strong></summary>

Students redo only their failed archetypes with “no-repeat error” rule.

</details>

<details>
<summary><strong>D1–D2 (2) — Timed VBE 1 “programming cluster” packet</strong></summary>

High-density: short items that force fast, accurate tracing/choice

</details>

<details>
<summary><strong>D3–D4 (2) — Error analysis + targeted redo</strong></summary>

- Students redo only failed archetypes with “no-repeat error” rule
- Builds reliability habits before Grade 12

</details>



---

## Resources & Materials

- [ ] Slides / presentation
- [ ] Student worksheet
- [ ] Rubric / marking scheme

---

## Teacher Notes

Continues from 03. Insert/delete (L15–L17), text streams + files (L18–L20), subprograms (L21–L22). Common error: off-by-one on insert/delete index. Build deliberate debugging exercises.

---

## TODO / Open Questions

- [ ] *(What still needs to be written, tested, or clarified?)*
